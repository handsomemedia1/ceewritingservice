import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function formatPost(rawTitle, rawDesc, type, sourceUrl) {
  const header = type === 'scholarship'
    ? '🎓🎓🎓 𝗦𝗖𝗛𝗢𝗟𝗔𝗥𝗦𝗛𝗜𝗣 𝗔𝗟𝗘𝗥𝗧 🎓🎓🎓'
    : '💼💼💼 𝗝𝗢𝗕 𝗢𝗣𝗣𝗢𝗥𝗧𝗨𝗡𝗜𝗧𝗬 💼💼💼';

  const cta = type === 'scholarship'
    ? '📝 Need a winning Statement of Purpose or Scholarship Essay?\n👉 Let Cee Writing Service craft yours\n🌐 ceewriting.com\n🤖 Chat our AI bot: @Ceewritingbot'
    : '📄 Make sure your CV passes the ATS scan!\n👉 Get a professional CV from Cee Writing Service\n🌐 ceewriting.com\n🤖 Chat our AI bot: @Ceewritingbot';

  try {
    const prompt = type === 'scholarship'
      ? `Summarize this scholarship in 4-5 bullet points. Extract: Title, Target Audience (e.g., For Africans, Nigerians, International), Funding amount, Deadline, How to apply.
Keep it punchy, use emojis on each bullet point. Add 3-4 relevant hashtags at the bottom (e.g. #Scholarship #ForAfricans). No markdown, just plain text with emojis and line breaks.

Title: ${rawTitle}
Info: ${rawDesc?.slice(0, 800)}`
      : `Summarize this job posting in 4-5 bullet points. Extract: Job Title, Company, Job Category (e.g., NYSC, Graduate Trainee, Nigerian Job, Remote, US-based), Salary/Pay, Location, Key requirements.
Keep it punchy, use emojis on each bullet point. Add 3-4 relevant hashtags at the bottom (e.g. #NYSC #NigerianJobs #RemoteWork). No markdown, just plain text with emojis and line breaks.

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
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

async function run() {
  console.log('--- TEST 1: NYSC JOB ---');
  const nyscTitle = 'Account Assistant (NYSC) at Zenith Bank';
  const nyscDesc = 'We are looking for currently serving NYSC members to join our accounting team in Lagos. Must have a B.Sc in Accounting or Finance. You will assist the senior accountant with daily reconciliations. Stipend is NGN 50,000 monthly.';
  console.log(await formatPost(nyscTitle, nyscDesc, 'job', 'https://example.com/nysc-job'));

  console.log('\n--- TEST 2: SCHOLARSHIP ---');
  const scholTitle = 'PTDF Overseas Scholarship for Nigerians';
  const scholDesc = 'The Petroleum Technology Development Fund invites applications from qualified Nigerians for overseas MSc and PhD scholarships. Full tuition, accommodation, and living expenses provided. Deadline is Jan 30th.';
  console.log(await formatPost(scholTitle, scholDesc, 'scholarship', 'https://example.com/scholarship'));
}

run();
