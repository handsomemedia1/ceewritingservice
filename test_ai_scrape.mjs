import https from 'https';
import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching MyJobMag...');
  let html = await fetchHTML('https://www.myjobmag.com/');
  
  // Strip scripts, styles, and SVG to save tokens
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  html = html.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  html = html.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
  
  // Take first 30,000 characters just in case it's huge
  html = html.substring(0, 30000);
  
  console.log('HTML size:', html.length);
  
  console.log('Asking Groq to extract jobs...');
  const prompt = `Extract the top 5 latest job postings from this raw HTML. 
Return ONLY a valid JSON array of objects. Each object should have:
- "title": Job title
- "url": The full absolute URL to apply (base is https://www.myjobmag.com)
- "description": A short 1 sentence summary (if available, otherwise empty)
- "source": "myjobmag"

HTML snippet:
${html}
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      response_format: { type: "json_object" }
    });
    
    console.log('Result:', completion.choices[0]?.message?.content);
  } catch (err) {
    console.error('Groq Error:', err.message);
  }
}

run();
