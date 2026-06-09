import axios from 'axios';
import * as cheerio from 'cheerio';

async function testJobberman() {
  try {
    const { data } = await axios.get('https://www.jobberman.com/jobs', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }});
    const $ = cheerio.load(data);
    console.log('--- Jobberman ---');
    
    // Look for article or div elements containing jobs. Jobberman usually uses a specific wrapper for listings.
    // They often have links that look like "/jobs/view/..." or "/job/..."
    const jobs = [];
    $('a').each((i, el) => {
      const link = $(el).attr('href');
      if (link && (link.includes('/jobs/') || link.includes('/job/')) && !link.includes('category') && !link.includes('location')) {
        const title = $(el).text().trim();
        if (title.length > 5 && title.split(' ').length > 1) {
            jobs.push({ title, link });
        }
      }
    });
    
    // Deduplicate by link
    const uniqueJobs = [];
    const seenLinks = new Set();
    for (const job of jobs) {
      if (!seenLinks.has(job.link)) {
        seenLinks.add(job.link);
        uniqueJobs.push(job);
      }
    }

    console.log(uniqueJobs.slice(0, 5));

  } catch (e) { console.error('Jobberman error:', e.message); }
}

testJobberman();
