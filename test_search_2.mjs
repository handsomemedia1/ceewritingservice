import https from 'https';

async function fetchSearch(query) {
  const url = `https://ceewriting.com/search?q=${encodeURIComponent(query)}`;
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

const queries = [
  "CV / Resume Writing",
  "resume",
  "cover letter",
  "thesis",
  "project", // descriptive term
  "Mastering the Literature Review", // exact blog
  "Literature", // partial blog
  "Job Seeker Pack", // exact package
  "Pack", // partial package
  "Career & Professional", // category
  "xyznonexistent98765", // no results
  "", // empty query
  "   " // whitespace
];

async function run() {
  for (const q of queries) {
    const res = await fetchSearch(q);
    
    let count = 0;
    const titles = [];
    
    // The payload contains JSON fragments with `"title":"..."`
    // So we can find them.
    const titleRegex = /"title":"([^"]+)"/g;
    let match;
    while ((match = titleRegex.exec(res.content)) !== null) {
      if (match[1] !== "Search | Cee Writing Hub" && match[1] !== "Search" && !titles.includes(match[1])) {
        titles.push(match[1]);
      }
    }
    
    // We can count valid search result IDs, usually UUIDs like "id":"..."
    // Wait, let's just look at the titles and consider count = titles.length
    
    console.log(`Query: "${q}" | Status: ${res.status}`);
    console.log(`  Titles: ${titles.length > 0 ? titles.join(', ') : 'None'}`);
  }
}

run();
