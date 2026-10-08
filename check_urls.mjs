import https from 'https';
import fs from 'fs';

const slugs = JSON.parse(fs.readFileSync('slugs.json', 'utf8'));

const results = [];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, content: data });
      });
    }).on('error', (err) => {
      resolve({ url, status: err.message, content: null });
    });
  });
}

async function run() {
  const urls = [
    'https://ceewriting.com/',
    'https://ceewriting.com/services',
    ...slugs.map(slug => `https://ceewriting.com/services/${slug.slug}`)
  ];

  let failures = 0;
  for (const url of urls) {
    const res = await checkUrl(url);
    const has500 = res.content && res.content.includes('500 Internal Server Error');
    const hasNaN = res.content && (res.content.includes('NaN') || res.content.includes('undefined') || res.content.includes('₦0'));
    console.log(`URL: ${url} | Status: ${res.status} | has500: ${has500} | hasNaN_or_0: ${hasNaN}`);
    if (res.status !== 200 || has500 || hasNaN) failures++;
  }
  
  console.log(`\nTotal Failures: ${failures}`);
}

run();
