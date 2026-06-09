import axios from 'axios';
import * as cheerio from 'cheerio';

async function testNyscJobs() {
  try {
    const { data } = await axios.get('https://www.myjobmag.com/jobs/nysc', { headers: { 'User-Agent': 'Mozilla/5.0' }});
    const $ = cheerio.load(data);
    console.log('--- MyJobMag NYSC ---');
    $('.job-info').slice(0, 3).each((i, el) => {
      const title = $(el).find('h2 a').text().trim();
      const link = $(el).find('h2 a').attr('href');
      const desc = $(el).find('.job-desc').text().trim();
      console.log(`Title: ${title}\nLink: https://www.myjobmag.com${link}\nDesc: ${desc}\n`);
    });
  } catch (e) { console.error('MyJobMag error:', e.message); }
}

testNyscJobs();
