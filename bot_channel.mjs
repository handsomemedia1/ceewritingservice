import { Bot, InlineKeyboard } from 'grammy';
import { createClient } from '@supabase/supabase-js';
import Groq from 'groq-sdk';
import Parser from 'rss-parser';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const CHANNEL_ID = '@ceewritingservice';
const MAX_POSTS_PER_RUN = 2;

// --- INIT CLIENTS ---
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
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
function fingerprint(url, title) {
  return crypto.createHash('md5').update(`${url}||${title}`).digest('hex');
}

async function isAlreadyPosted(fp) {
  const { data } = await supabase.from('bot_posted_items').select('id').eq('fingerprint', fp).limit(1);
  return !!(data && data.length > 0);
}

async function markAsPosted(source, title, url, fp) {
  await supabase.from('bot_posted_items').insert([{ source, title, url, fingerprint: fp }]);
}

// --- AI FORMATTER ---
async function formatPost(rawTitle, rawDesc, type, sourceUrl) {
  const header = type === 'scholarship'
    ? '🎓🎓🎓 𝗦𝗖𝗛𝗢𝗟𝗔𝗥𝗦𝗛𝗜𝗣 𝗔𝗟𝗘𝗥𝗧 🎓🎓🎓'
    : '💼💼💼 𝗝𝗢𝗕 𝗢𝗣𝗣𝗢𝗥𝗧𝗨𝗡𝗜𝗧𝗬 💼💼💼';

  const cta = type === 'scholarship'
    ? '📝 Need a winning Statement of Purpose or Scholarship Essay?\n👉 Let Cee Writing Service craft yours\n🌐 ceewriting.com\n🤖 Chat our AI bot: @Ceewritingbot'
    : '📄 Make sure your CV passes the ATS scan!\n👉 Get a professional CV from Cee Writing Service\n🌐 ceewriting.com\n🤖 Chat our AI bot: @Ceewritingbot';

  try {
    const prompt = type === 'scholarship'
      ? `Summarize this scholarship in 4-5 bullet points. Extract: Title, Who can apply, Funding amount, Deadline, How to apply. Keep it punchy and clear, use emojis on each bullet point. No markdown, just plain text with emojis and line breaks.\n\nTitle: ${rawTitle}\nInfo: ${rawDesc?.slice(0, 800)}`
      : `Summarize this job posting in 4-5 bullet points. Extract: Job Title, Company, Salary/Pay range if mentioned, Location/Remote status, Key requirements. Keep it punchy, use emojis on each bullet point. No markdown, just plain text with emojis and line breaks.\n\nTitle: ${rawTitle}\nInfo: ${rawDesc?.slice(0, 800)}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      max_tokens: 300,
    });

    const summary = completion.choices[0]?.message?.content || rawDesc?.slice(0, 200) || '';
    return `${header}\n\n${summary}\n\n🔗 Apply here: ${sourceUrl}\n\n━━━━━━━━━━━━━━━━━━━━\n\n${cta}`;
  } catch {
    return `${header}\n\n📌 ${rawTitle}\n\n${rawDesc?.slice(0, 200) || ''}...\n\n🔗 ${sourceUrl}\n\n━━━━━━━━━━━━━━━━━━━━\n\n${cta}`;
  }
}

// --- AI STORY ENGINE ---
async function generateDailyStory() {
  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase.from('bot_posted_items').select('id').eq('source', 'daily_story').gte('posted_at', `${today}T00:00:00`).limit(1);

  if (data && data.length > 0) {
    console.log('📖 Story already posted today, skipping.');
    return '';
  }

  try {
    const prompt = `You are a gifted storyteller who writes for a Nigerian/African audience on Telegram. Your client is "Cee Writing Service" — a professional CV, Cover Letter, SOP, and academic writing company.

Write a SHORT, captivating story (max 250 words) that hooks readers instantly. The story must:
1. Be 100% UNIQUE and NEW. INVENT your own creative scenario about career struggles, job hunting, ATS rejection, academic applications (Chevening, Commonwealth, PTDF), or professional challenges. DO NOT REPEAT old stories.
2. Start with an emotionally gripping opening line.
3. Include a turning point or hard truth lesson.
4. End naturally with a subtle transition to how professional writing services (specifically Cee Writing Service) can solve this exact problem.
5. Use a conversational, warm Nigerian/African tone.
6. NO hashtags. NO emoji overload. Just a few well-placed emojis.
7. Make it read like a friend telling you a story, not an advertisement.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.98, // High temperature for maximum creativity and variance
      max_tokens: 400,
    });

    const story = completion.choices[0]?.message?.content;
    if (!story) return '';

    const storyPost = `📖📖📖 𝗦𝗧𝗢𝗥𝗬 𝗧𝗜𝗠𝗘 📖📖📖\n\n${story}\n\n━━━━━━━━━━━━━━━━━━━━\n\n✍️ Cee Writing Service\n🌐 ceewriting.com\n🤖 Chat our AI bot: @Ceewritingbot\n📩 DM us to get started today`;

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
  const results = [];
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
      console.error(`⚠️  ${feed.name} failed (skipping):`, error.message);
    }
  }
  return results;
}

async function fetchJobs() {
  const results = [];
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
      console.error(`⚠️  ${feed.name} failed (skipping):`, error.message);
    }
  }
  return results;
}

// --- POST TO CHANNEL ---
async function postToChannel(text) {
  try {
    const keyboard = new InlineKeyboard()
      .url("📱 Open Cee Writing App", "https://ceewriting.com");
      
    await bot.api.sendMessage(CHANNEL_ID, text, { reply_markup: keyboard });
    return true;
  } catch (err) {
    console.error('❌ Failed to send to channel:', err.message);
    return false;
  }
}

// --- MAIN ENGINE ---
async function runChannelEngine() {
  console.log('\n🚀 === CEE WRITING SERVICE CHANNEL ENGINE ===\n');
  console.log(`⏰ ${new Date().toLocaleString()}\n`);

  let totalPosted = 0;

  // 1. Daily Story
  try {
    const story = await generateDailyStory();
    if (story) {
      if (await postToChannel(story)) {
        totalPosted++;
        console.log('📖 ✅ Daily story posted!');
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  } catch (e) { console.error('❌ Story engine failed:', e.message); }

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
  } catch (e) { console.error('❌ Scholarships failed:', e.message); }

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
  } catch (e) { console.error('❌ Jobs failed:', e.message); }

  console.log(`\n✨ Done! ${totalPosted} post(s) published.\n`);
}

// --- SCHEDULE ---
const SCHEDULE_HOURS = [8, 13, 18]; // 8 AM, 1 PM, 6 PM

function msUntilNextRun() {
  const now = new Date();
  for (const hour of SCHEDULE_HOURS) {
    const target = new Date(now);
    target.setHours(hour, 0, 0, 0);
    if (target > now) return target.getTime() - now.getTime();
  }
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
      scheduleNext();
    }, delay);
  };

  scheduleNext();
}

// --- RUN ---
startScheduler().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
