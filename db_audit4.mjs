import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsyiylazielwbelfzsqo.supabase.co';
const supabaseKey = 'sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const tables = ['blog_posts', 'services', 'packages', 'resources'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.log(`Error fetching ${table}:`, error.message);
      continue;
    }
    if (data && data.length > 0) {
      console.log(`\n--- Table: ${table} ---`);
      for (const [key, value] of Object.entries(data[0])) {
        let type = typeof value;
        if (value === null) type = 'null';
        else if (Array.isArray(value)) type = 'array';
        console.log(`${key}: ${type}`);
      }
    } else {
      console.log(`\n--- Table: ${table} is empty ---`);
    }
  }
}

run();
