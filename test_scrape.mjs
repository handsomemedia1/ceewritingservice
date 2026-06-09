import https from 'https';

const urls = [
  'https://www.myjobmag.com/jobs-for-nysc',
  'https://www.myjobmag.com/search/jobs?q=nysc'
];

urls.forEach(url => {
  https.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  }, (res) => {
    console.log(url, 'Status:', res.statusCode);
  }).on('error', err => console.error(url, err.message));
});
