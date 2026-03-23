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
const MAX_POSTS_PER_RUN = 2; // Max per category per run

// --- INIT CLIENTS ---
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
const rssParser = new Parser({ timeout: 15000 });

// --- RSS SOURCES ---
const SCHOLARSHIP_FEEDS = [
  { url: 'https://opportunitydesk.org/feed/', name: 'OpportunityDesk' },
  { url: 'https://afterschoolafrica.com/feed/', name: 'AfterSchoolAfrica' },
  { url: 'https://www.opportunitiesforafricans.com/feed/', name: 'OpportunitiesForAfricans' },
];

const JOB_FEEDS = [
  { url: 'https://weworkremotely.com/remote-jobs.rss', name: 'WeWorkRemotely' },
  { url: 'https://remoteok.com/remote-jobs.rss', name: 'RemoteOK' },
];

// --- HELPERS ---
function fingerprint(url: string, title: string): string {
  return crypto.createHash('md5').update(`${url}||${title}`).digest('hex');
}

async function isAlreadyPosted(fp: string): Promise<boolean> {
  const { data } = await supabase.from('bot_posted_items').select('id').eq('fingerprint', fp).limit(1);
  return !!(data && data.length > 0);
}

async function markAsPosted(source: string, title: string, url: string, fp: string) {
  await supabase.from('bot_posted_items').insert([{ source, title, url, fingerprint: fp }]);
}

// --- AI FORMATTER (with clear visual distinction) ---
async function formatPost(rawTitle: string, rawDesc: string, type: 'scholarship' | 'job', sourceUrl: string): Promise<string> {
  const header = type === 'scholarship'
    ? '🎓🎓🎓 𝗦𝗖𝗛𝗢𝗟𝗔𝗥𝗦𝗛𝗜𝗣 𝗔𝗟𝗘𝗥𝗧 🎓🎓🎓'
    : '💼💼💼 𝗝𝗢𝗕 𝗢𝗣𝗣𝗢𝗥𝗧𝗨𝗡𝗜𝗧𝗬 💼💼💼';

  const cta = type === 'scholarship'
    ? '📝 Need a winning Statement of Purpose or Scholarship Essay?\n👉 Let Cee Writing Service craft yours\n🌐 ceewriting.com\n🤖 Chat our AI bot: @Ceewritingbot'
    : '📄 Make sure your CV passes the ATS scan!\n👉 Get a professional CV from Cee Writing Service\n🌐 ceewriting.com\n🤖 Chat our AI bot: @Ceewritingbot';

  try {
    const prompt = type === 'scholarship'
      ? `Summarize this scholarship in 4-5 bullet points. Extract: Title, Who can apply, Funding amount, Deadline, How to apply. Keep it punchy and clear, use emojis on each bullet point. No markdown, just plain text with emojis and line breaks.

Title: ${rawTitle}
Info: ${rawDesc?.slice(0, 800)}`
      : `Summarize this job posting in 4-5 bullet points. Extract: Job Title, Company, Salary/Pay range if mentioned, Location/Remote status, Key requirements. Keep it punchy, use emojis on each bullet point. No markdown, just plain text with emojis and line breaks.

Title: ${rawTitle}
Info: ${rawDesc?.slice(0, 800)}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      max_tokens: 300,
    });

    const summary = completion.choices[0]?.message?.content || rawDesc?.slice(0, 200) || '';

    return `${header}\n\n${summary}\n\n🔗 Apply here: ${sourceUrl}\n\n━━━━━━━━━━━━━━━━━━━━\n\n${cta}`;
  } catch {
    // Fallback without AI
    return `${header}\n\n📌 ${rawTitle}\n\n${rawDesc?.slice(0, 200) || ''}...\n\n🔗 ${sourceUrl}\n\n━━━━━━━━━━━━━━━━━━━━\n\n${cta}`;
  }
}

// --- AI STORY ENGINE ---
async function generateDailyStory(): Promise<string> {
  // Check if we already posted a story today
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const { data } = await supabase.from('bot_posted_items').select('id').eq('source', 'daily_story').gte('posted_at', `${today}T00:00:00`).limit(1);
  
  if (data && data.length > 0) {
    console.log('📖 Story already posted today, skipping.');
    return '';
  }

  // --- Dynamic Story Elements for Endless Variety ---
  const protagonists = [
    "a fresh graduate", "an experienced banker trying to switch to tech", 
    "a mother returning to the workforce", "a student applying for a masters abroad", 
    "a skilled manual worker who struggles with writing", "a brilliant Nigerian developer with a terrible CV",
    "someone laid off after 5 years at the same company", "a freelancer trying to get full-time corporate roles",
    "a Chevening scholarship hopeful", "someone who has been rejected for 6 months straight"
  ];
  
  const problems = [
    "getting rejected by ATS algorithms instantly", "a poorly formatted, 5-page CV", 
    "a completely generic Statement of Purpose copied from the internet", 
    "failing interviews because they don't know how to sell themselves on paper first", 
    "listing duties instead of quantifiable achievements", 
    "starting a cover letter with 'Dear Sir/Madam' and no customization",
    "having great skills but a LinkedIn profile that looks abandoned",
    "writing an academic essay that lacks a clear thesis statement"
  ];

  const settings = [
    "stuck in Lagos traffic reading another 'Unfortunately...' email", 
    "late at night in a university library feeling defeated", 
    "a Zoom interview where they asked about a gap in the CV", 
    "a casual chat with a friend who just got hired",
    "staring at a blank Word document not knowing where to start",
    "overhearing a recruiter at a career fair complain about bad CVs",
    "realizing the deadline is in 24 hours and the essay is awful"
  ];

  const randomProtagonist = protagonists[Math.floor(Math.random() * protagonists.length)];
  const randomProblem = problems[Math.floor(Math.random() * problems.length)];
  const randomSetting = settings[Math.floor(Math.random() * settings.length)];

  try {
    const prompt = `You are a gifted storyteller who writes for a Nigerian/African professional audience. Your client is "Cee Writing Service" — a premium CV, Cover Letter, SOP, and academic writing company.

Write a SHORT, captivating story (max 250 words) that hooks readers instantly.

CRITICAL: To ensure the story is 100% unique and never repeats, revolve the plot heavily around this specific combination:
- Protagonist: ${randomProtagonist}
- Core Struggle: ${randomProblem}
- Setting/Context: ${randomSetting}

The story MUST:
1. Start with an emotionally gripping opening line (DO NOT use "Once upon a time").
2. Tell a highly relatable story based on the combination above.
3. Include a turning point or harsh lesson.
4. End naturally with a smooth transition to how professional writing services (specifically Cee Writing Service) can fix this exact issue.
5. Use conversational, warm Nigerian/African tone (e.g., slight relatable nuances, but keep it professional).
6. NO hashtags. NO emojis overload. Just a few well-placed emojis.
7. Make it read like a friend telling a compelling real-life story, not an advertisement.

IMPORTANT: Be extremely creative. Surprise the reader. NEVER repeat old formats.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.95, // High creativity
      max_tokens: 400,
    });

    const story = completion.choices[0]?.message?.content;
    if (!story) return '';

    const storyPost = `📖📖📖 𝗦𝗧𝗢𝗥𝗬 𝗧𝗜𝗠𝗘 📖📖📖\n\n${story}\n\n━━━━━━━━━━━━━━━━━━━━\n\n✍️ Cee Writing Service\n🌐 ceewriting.com\n🤖 Chat our AI bot: @Ceewritingbot\n📩 DM us to get started today`;

    // Mark story as posted today
    const fp = fingerprint('daily_story', today);
    await markAsPosted('daily_story', `Story - ${today}`, 'daily_story', fp);

    return storyPost;
  } catch (error) {
    console.error('❌ Story generation failed:', error);
    return '';
  }
}

// --- SOURCE FETCHERS ---
async function fetchScholarships() {
  const results: Array<{ title: string; description: string; url: string; source: string }> = [];
  for (const feed of SCHOLARSHIP_FEEDS) {
    try {
      console.log(`📡 Fetching from ${feed.name}...`);
      const parsed = await rssParser.parseURL(feed.url);
      for (const item of (parsed.items || []).slice(0, 5)) {
        if (!item.title || !item.link) continue;
        const fp = fingerprint(item.link, item.title);
        if (await isAlreadyPosted(fp)) continue;
        results.push({ title: item.title, description: item.contentSnippet || item.content || '', url: item.link, source: `rss_${feed.name}` });
      }
    } catch (error) {
      console.error(`⚠️  ${feed.name} failed (skipping):`, (error as Error).message);
    }
  }
  return results;
}

async function fetchJobs() {
  const results: Array<{ title: string; description: string; url: string; source: string }> = [];
  for (const feed of JOB_FEEDS) {
    try {
      console.log(`💼 Fetching from ${feed.name}...`);
      const parsed = await rssParser.parseURL(feed.url);
      for (const item of (parsed.items || []).slice(0, 5)) {
        if (!item.title || !item.link) continue;
        const fp = fingerprint(item.link, item.title);
        if (await isAlreadyPosted(fp)) continue;
        results.push({ title: item.title, description: item.contentSnippet || item.content || '', url: item.link, source: `rss_${feed.name}` });
      }
    } catch (error) {
      console.error(`⚠️  ${feed.name} failed (skipping):`, (error as Error).message);
    }
  }
  return results;
}

// --- POST TO CHANNEL ---
async function postToChannel(text: string): Promise<boolean> {
  try {
    await bot.api.sendMessage(CHANNEL_ID, text);
    return true;
  } catch (err) {
    console.error('❌ Failed to send to channel:', (err as Error).message);
    return false;
  }
}

// --- MAIN ENGINE ---
async function runChannelEngine() {
  console.log('\n🚀 === CEE WRITING SERVICE CHANNEL ENGINE ===\n');
  console.log(`⏰ ${new Date().toLocaleString()}\n`);
  
  let totalPosted = 0;

  // 1. Daily Story (only once per day)
  try {
    const story = await generateDailyStory();
    if (story) {
      if (await postToChannel(story)) {
        totalPosted++;
        console.log('📖 ✅ Daily story posted!');
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  } catch (e) { console.error('❌ Story engine failed:', (e as Error).message); }

  // 2. Scholarships
  try {
    const scholarships = await fetchScholarships();
    console.log(`\n🎓 Found ${scholarships.length} new scholarship(s)`);
    for (const item of scholarships.slice(0, MAX_POSTS_PER_RUN)) {
      const formatted = await formatPost(item.title, item.description, 'scholarship', item.url);
      if (await postToChannel(formatted)) {
        await markAsPosted(item.source, item.title, item.url, fingerprint(item.url, item.title));
        totalPosted++;
        console.log(`  ✅ ${item.title}`);
        await new Promise(r => setTimeout(r, 4000));
      }
    }
  } catch (e) { console.error('❌ Scholarships failed:', (e as Error).message); }

  // 3. Jobs
  try {
    const jobs = await fetchJobs();
    console.log(`\n💼 Found ${jobs.length} new job(s)`);
    for (const item of jobs.slice(0, MAX_POSTS_PER_RUN)) {
      const formatted = await formatPost(item.title, item.description, 'job', item.url);
      if (await postToChannel(formatted)) {
        await markAsPosted(item.source, item.title, item.url, fingerprint(item.url, item.title));
        totalPosted++;
        console.log(`  ✅ ${item.title}`);
        await new Promise(r => setTimeout(r, 4000));
      }
    }
  } catch (e) { console.error('❌ Jobs failed:', (e as Error).message); }

  console.log(`\n✨ Done! ${totalPosted} post(s) published.\n`);
}

// --- SCHEDULE ---
const SCHEDULE_HOURS = [8, 13, 18]; // 8 AM, 1 PM, 6 PM

function msUntilNextRun(): number {
  const now = new Date();
  for (const hour of SCHEDULE_HOURS) {
    const target = new Date(now);
    target.setHours(hour, 0, 0, 0);
    if (target > now) return target.getTime() - now.getTime();
  }
  // Next day 8 AM
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(SCHEDULE_HOURS[0], 0, 0, 0);
  return tomorrow.getTime() - now.getTime();
}

async function startScheduler() {
  console.log('🕐 Channel Engine Scheduler Started');
  console.log(`📅 Posts scheduled at: ${SCHEDULE_HOURS.map(h => `${h}:00`).join(', ')}`);
  
  // Run immediately on start
  await runChannelEngine();

  // Then schedule future runs
  const scheduleNext = () => {
    const delay = msUntilNextRun();
    const nextRun = new Date(Date.now() + delay);
    console.log(`\n⏳ Next run: ${nextRun.toLocaleString()} (in ${Math.round(delay / 60000)} minutes)\n`);
    
    setTimeout(async () => {
      await runChannelEngine();
      scheduleNext(); // Reschedule
    }, delay);
  };

  scheduleNext();
}

// --- RUN ---
startScheduler().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
