import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Groq from 'groq-sdk';
import crypto from 'crypto';

// Initialize external clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// Use the service role key if available for trusted backend operations, otherwise fallback to anon
const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = '@ceewritingservice'; // The channel username

export async function GET(request: Request) {
  // 1. Basic Security: Only allow Vercel Cron or manual triggers with a secret key
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && key !== process.env.CRON_SECRET) {
    if (process.env.NODE_ENV === 'production' && !process.env.CRON_SECRET) {
      console.warn("CRON_SECRET is not set in production. Endpoint is unprotected.");
    } else if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    // 2. Fetch Writing Jobs from Remotive API (Free, JSON)
    console.log("Fetching writing jobs from Remotive...");
    const res = await fetch('https://remotive.com/api/remote-jobs?category=writing&limit=15');
    const data = await res.json();
    const jobs = data.jobs || [];

    if (jobs.length === 0) {
      return NextResponse.json({ message: 'No jobs found from API.' });
    }

    // 3. Find the first UNPOSTED job by checking the database
    let selectedJob = null;
    let jobFingerprint = '';

    for (const job of jobs) {
      const fingerprint = crypto.createHash('md5').update(job.url + job.title).digest('hex');
      
      const { data: existing } = await supabase
        .from('bot_posted_items')
        .select('id')
        .eq('fingerprint', fingerprint)
        .single();

      if (!existing) {
        selectedJob = job;
        jobFingerprint = fingerprint;
        break;
      }
    }

    if (!selectedJob) {
      return NextResponse.json({ message: 'No new jobs to post at this time. All recent jobs are already processed.' });
    }

    console.log(`Selected new job: ${selectedJob.title} at ${selectedJob.company_name}`);

    // 4. Use Groq AI (Llama 3) to summarize and format the Telegram Message
    const prompt = `
      You are an expert social media manager for "Cee Writing Services".
      Write a highly engaging, super short Telegram channel post (max 4-5 lines) about this remote writing job.
      Use emojis. 
      Format exactly like this:
      
      🚨 **New Remote Writing Job!**
      [Job Title] at [Company Name]
      💰 [Salary if provided, or "Competitive"] | 🌍 [Location/Remote]
      
      Brief 1-sentence summary of the role.
      
      Link to apply: [Job URL]
      
      ---
      P.S. Need a killer CV, Cover Letter, or Portfolio to land this? Contact us at @ceewritingservice to get it done professionally!
      
      Here is the job data:
      Title: ${selectedJob.title}
      Company: ${selectedJob.company_name}
      Location: ${selectedJob.candidate_required_location}
      Salary: ${selectedJob.salary || 'Competitive'}
      URL: ${selectedJob.url}
      Description: ${selectedJob.description.substring(0, 800)}...
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 300,
    });

    let messageText = chatCompletion.choices[0]?.message?.content?.trim();
    if (!messageText) throw new Error("Groq returned an empty response.");

    // Replace the literal "[Job URL]" string if the AI hallucinated it instead of injecting the real URL
    if (messageText.includes('[Job URL]')) {
       messageText = messageText.replace('[Job URL]', selectedJob.url);
    }

    // 5. Blast to Telegram
    const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    });

    const tgData = await tgRes.json();
    if (!tgData.ok) {
      throw new Error(`Telegram Error: ${tgData.description}`);
    }

    // 6. Record the job as posted to prevent duplicate spam tomorrow
    await supabase.from('bot_posted_items').insert([{
      source: 'remotive_writing',
      title: selectedJob.title,
      url: selectedJob.url,
      fingerprint: jobFingerprint
    }]);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully posted new job to Telegram!',
      job: selectedJob.title
    });

  } catch (error: any) {
    console.error('Bot Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to execute bot cron' }, { status: 500 });
  }
}
