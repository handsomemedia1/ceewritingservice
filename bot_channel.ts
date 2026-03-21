import { Bot } from 'grammy';
import { createClient } from '@supabase/supabase-js';
import Groq from 'groq-sdk';
import Parser from 'rss-parser';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const CHANNEL_ID = '@ceewritingservice';
const MAX_POSTS_PER_RUN = 3; // Never flood the channel

// --- INIT CLIENTS ---
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
const rssParser = new Parser({ timeout: 10000 });

// --- RSS SOURCES (All verified, official sources) ---
const SCHOLARSHIP_FEEDS = [
  { url: 'https://opportunitydesk.org/feed/', name: 'OpportunityDesk' },
  { url: 'https://afterschoolafrica.com/feed/', name: 'AfterSchoolAfrica' },
  { url: 'https://www.scholarshipsads.com/feed/', name: 'ScholarshipsAds' },
  { url: 'https://www.opportunitiesforafricans.com/feed/', name: 'OpportunitiesForAfricans' },
];

const JOB_FEEDS = [
  { url: 'https://weworkremotely.com/remote-jobs.rss', name: 'WeWorkRemotely' },
  { url: 'https://remoteok.com/remote-jobs.rss', name: 'RemoteOK' },
];

// --- HELPER: Generate fingerprint for deduplication ---
function fingerprint(url: string, title: string): string {
  return crypto.createHash('md5').update(`${url}||${title}`).digest('hex');
}

// --- HELPER: Check if already posted ---
async function isAlreadyPosted(fp: string): Promise<boolean> {
  const { data } = await supabase.from('bot_posted_items').select('id').eq('fingerprint', fp).limit(1);
  return !!(data && data.length > 0);
}

// --- HELPER: Mark as posted ---
async function markAsPosted(source: string, title: string, url: string, fp: string) {
  await supabase.from('bot_posted_items').insert([{ source, title, url, fingerprint: fp }]);
}

// --- HELPER: AI Format the post ---
async function formatWithAI(rawTitle: string, rawDescription: string, type: 'scholarship' | 'job', sourceUrl: string): Promise<string> {
  try {
    const prompt = type === 'scholarship'
      ? `You are a Telegram channel content creator for "Cee Writing Service", a premium academic writing company.
Format this scholarship opportunity into an engaging Telegram post (max 280 words).
Use emojis strategically. Include: title, key details, deadline if mentioned, eligibility.
End with a CTA: "📝 Need a winning Statement of Purpose or Scholarship Essay? Let Cee Writing Service craft yours → ceewritingservice.com"
Include the source link.

Title: ${rawTitle}
Description: ${rawDescription}
Link: ${sourceUrl}`
      : `You are a Telegram channel content creator for "Cee Writing Service", a premium CV and cover letter writing company.
Format this remote job posting into an engaging Telegram post (max 280 words).
Use emojis strategically. Include: job title, company if known, key requirements, salary if mentioned.
End with a CTA: "📄 Make sure your CV passes the ATS scan. Get a professional CV from Cee Writing Service → ceewritingservice.com"
Include the source link.

Title: ${rawTitle}
Description: ${rawDescription}
Link: ${sourceUrl}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 400,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('AI formatting failed:', error);
    // Fallback: simple format without AI
    return `📢 *${rawTitle}*\n\n${rawDescription?.slice(0, 200) || ''}...\n\n🔗 ${sourceUrl}\n\n📝 Need professional writing help? Visit ceewritingservice.com`;
  }
}

// --- SOURCE 1: Scholarship RSS Feeds ---
async function fetchScholarships(): Promise<Array<{ title: string; description: string; url: string; source: string }>> {
  const results: Array<{ title: string; description: string; url: string; source: string }> = [];

  for (const feed of SCHOLARSHIP_FEEDS) {
    try {
      console.log(`📡 Fetching from ${feed.name}...`);
      const parsed = await rssParser.parseURL(feed.url);
      
      for (const item of (parsed.items || []).slice(0, 5)) {
        if (!item.title || !item.link) continue;
        
        const fp = fingerprint(item.link, item.title);
        if (await isAlreadyPosted(fp)) continue;

        results.push({
          title: item.title,
          description: item.contentSnippet || item.content || '',
          url: item.link,
          source: `rss_${feed.name}`,
        });
      }
    } catch (error) {
      // FAULT TOLERANCE: If one feed fails, continue with others
      console.error(`⚠️  ${feed.name} failed (skipping):`, (error as Error).message);
    }
  }

  return results;
}

// --- SOURCE 2: Remote Job RSS Feeds ---
async function fetchJobs(): Promise<Array<{ title: string; description: string; url: string; source: string }>> {
  const results: Array<{ title: string; description: string; url: string; source: string }> = [];

  for (const feed of JOB_FEEDS) {
    try {
      console.log(`💼 Fetching jobs from ${feed.name}...`);
      const parsed = await rssParser.parseURL(feed.url);

      for (const item of (parsed.items || []).slice(0, 5)) {
        if (!item.title || !item.link) continue;

        const fp = fingerprint(item.link, item.title);
        if (await isAlreadyPosted(fp)) continue;

        results.push({
          title: item.title,
          description: item.contentSnippet || item.content || '',
          url: item.link,
          source: `rss_${feed.name}`,
        });
      }
    } catch (error) {
      console.error(`⚠️  ${feed.name} failed (skipping):`, (error as Error).message);
    }
  }

  return results;
}

// --- MAIN ENGINE ---
async function runChannelEngine() {
  console.log('\n🚀 === CEE WRITING SERVICE CHANNEL ENGINE STARTING ===\n');
  console.log(`⏰ Time: ${new Date().toLocaleString()}`);
  
  let totalPosted = 0;

  // 1. Fetch scholarships (fault-tolerant)
  try {
    const scholarships = await fetchScholarships();
    console.log(`\n🎓 Found ${scholarships.length} new scholarship(s)`);

    for (const item of scholarships.slice(0, MAX_POSTS_PER_RUN)) {
      const formatted = await formatWithAI(item.title, item.description, 'scholarship', item.url);
      if (!formatted) continue;

      try {
        await bot.api.sendMessage(CHANNEL_ID, formatted, { parse_mode: 'Markdown' });
        const fp = fingerprint(item.url, item.title);
        await markAsPosted(item.source, item.title, item.url, fp);
        totalPosted++;
        console.log(`  ✅ Posted scholarship: ${item.title}`);
        // Wait 3 seconds between posts to avoid flooding
        await new Promise(r => setTimeout(r, 3000));
      } catch (postError) {
        // If Markdown fails, try without formatting
        try {
          await bot.api.sendMessage(CHANNEL_ID, formatted);
          const fp = fingerprint(item.url, item.title);
          await markAsPosted(item.source, item.title, item.url, fp);
          totalPosted++;
          console.log(`  ✅ Posted scholarship (plain): ${item.title}`);
        } catch (retryError) {
          console.error(`  ❌ Failed to post: ${item.title}`, (retryError as Error).message);
        }
      }
    }
  } catch (error) {
    console.error('❌ Scholarship source completely failed:', (error as Error).message);
  }

  // 2. Fetch jobs (fault-tolerant, independent from scholarships)
  try {
    const jobs = await fetchJobs();
    console.log(`\n💼 Found ${jobs.length} new job(s)`);

    for (const item of jobs.slice(0, MAX_POSTS_PER_RUN)) {
      const formatted = await formatWithAI(item.title, item.description, 'job', item.url);
      if (!formatted) continue;

      try {
        await bot.api.sendMessage(CHANNEL_ID, formatted, { parse_mode: 'Markdown' });
        const fp = fingerprint(item.url, item.title);
        await markAsPosted(item.source, item.title, item.url, fp);
        totalPosted++;
        console.log(`  ✅ Posted job: ${item.title}`);
        await new Promise(r => setTimeout(r, 3000));
      } catch (postError) {
        try {
          await bot.api.sendMessage(CHANNEL_ID, formatted);
          const fp = fingerprint(item.url, item.title);
          await markAsPosted(item.source, item.title, item.url, fp);
          totalPosted++;
          console.log(`  ✅ Posted job (plain): ${item.title}`);
        } catch (retryError) {
          console.error(`  ❌ Failed to post: ${item.title}`, (retryError as Error).message);
        }
      }
    }
  } catch (error) {
    console.error('❌ Job source completely failed:', (error as Error).message);
  }

  console.log(`\n✨ === ENGINE COMPLETE: ${totalPosted} new posts published ===\n`);
}

// --- RUN THE ENGINE ---
runChannelEngine()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
