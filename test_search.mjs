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
    
    // Attempt to extract the initialData or just parse RSC payload.
    // The easiest is just regex for 'Search Results <span class="text-muted text-lg font-normal ml-2">(X)</span>'
    // But since it's tailwind classes, it might be in the RSC payload. Let's just look for 'Search Results'
    
    const countMatch = res.content.match(/Search Results <span[^>]*>\((\d+)\)<\/span>/);
    let count = countMatch ? countMatch[1] : "0";
    if (res.content.includes("Enter a search term to begin") || q.trim() === "") {
        count = "0";
    } else if (res.content.includes("No results found")) {
        count = "0";
    }
    
    console.log(`Query: "${q}" | Status: ${res.status} | Count: ${count}`);
    
    // Try to extract titles
    // Look for h3 inside SearchResults
    // In RSC payload, they might appear as: `"title":"CV / Resume Writing"`
    const titles = [];
    const titleRegex = /"title":"([^"]+)"/g;
    let match;
    while ((match = titleRegex.exec(res.content)) !== null) {
      if (!titles.includes(match[1])) titles.push(match[1]);
    }
    
    console.log(`  Titles extracted from payload:`, titles);
  }
}

run();
