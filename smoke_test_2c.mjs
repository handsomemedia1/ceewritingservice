const urls = [
  { q: "Turnitin", expected: "Don't Submit", expectResource: "Turnitin Score Guide Nigeria", resourceUrl: "/resources" },
  { q: "Turnitin Score Guide Nigeria", expected: "Turnitin Score Guide Nigeria", resourceUrl: "/resources" },
  { q: "Academic", expected: "Plagiarism", expectResource: "Turnitin Score Guide" },
  { q: "resume", expected: "CV / Resume Writing" },
  { q: "thesis", expected: "Master's Thesis Data" },
  { q: "Job Seeker Pack", expected: "Job Seeker Pack" },
  { q: "shark attacks", expected: "Pearson Correlation" },
  { q: "xyznonexistent98765", expected: "No direct matches found" },
  { q: "", expected: "No results found" } // For an empty query, the client redirects or displays empty. We'll check HTTP status and basic text.
];

async function run() {
  for (const item of urls) {
    const url = `https://ceewriting.com/search${item.q !== "" ? `?q=${encodeURIComponent(item.q)}` : ""}`;
    const res = await fetch(url, { headers: { 'RSC': '1' }});
    if (!res.ok) {
      console.log(`FAIL HTTP ${res.status}: ${item.q || "empty query"}`);
      continue;
    }
    const html = await res.text();
    let passed = true;

    if (item.expected && !html.includes(item.expected)) {
      console.log(`FAIL MATCH (${item.q}): did not find "${item.expected}"`);
      passed = false;
    }
    if (item.expectResource && !html.includes(item.expectResource)) {
      console.log(`FAIL MATCH (${item.q}): did not find resource "${item.expectResource}"`);
      passed = false;
    }
    if (item.resourceUrl && !html.includes(item.resourceUrl)) {
      console.log(`FAIL MATCH (${item.q}): did not find resource URL "${item.resourceUrl}"`);
      passed = false;
    }

    if (passed) {
      console.log(`PASS: ${item.q === "" ? "empty query" : item.q}`);
    } else {
      console.log("Response sample: " + html.slice(0, 150));
    }
  }

  // Check /resources
  const resHub = await fetch('https://ceewriting.com/resources');
  console.log(`\n/resources HTTP: ${resHub.status}`);
}
run();
