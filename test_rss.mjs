import Parser from 'rss-parser';
const rssParser = new Parser({ timeout: 15000 });

async function testFeeds() {
  const feeds = [
    'https://jobs.instantsdata.com.ng/rss/latest-posts',
    'https://jobs.delon.ng/feed'
  ];
  
  for (let feed of feeds) {
    try {
      console.log(`Fetching ${feed}...`);
      const parsed = await rssParser.parseURL(feed);
      console.log(`${feed} SUCCESS! Found ${parsed.items?.length || 0} items.`);
      if (parsed.items?.length > 0) {
        console.log(`Sample: ${parsed.items[0].title}`);
      }
    } catch (e) {
      console.error(`${feed} FAILED: ${e.message}`);
    }
  }
}

testFeeds();
