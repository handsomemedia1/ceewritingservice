const urls = [
  { q: "resume", expected: "CV / Resume Writing" },
  { q: "thesis", expected: "Thesis" }, // "Thesis Writing" or "Thesis Data"
  { q: "How to Write a Literature Review That Gets Published", expected: "/blog/literature-review-published" },
  { q: "shark attacks", expected: "Pearson Correlation in SPSS" },
  { q: "Job Seeker Pack", expected: "Job Seeker Pack" },
  { q: "xyznonexistent98765", expected: "No results found" }
];

async function run() {
  for (const item of urls) {
    const url = `https://ceewriting.com/search?q=${encodeURIComponent(item.q)}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`FAIL HTTP ${res.status}: ${item.q}`);
      continue;
    }
    const html = await res.text();
    if (html.includes(item.expected)) {
      console.log(`PASS: ${item.q} (found "${item.expected}")`);
    } else {
      console.log(`FAIL MATCH: ${item.q} (did not find "${item.expected}")`);
      // Debug what we actually got
      const h = html.slice(0, 100);
      console.log("Response start: " + h);
    }
  }
}
run();
