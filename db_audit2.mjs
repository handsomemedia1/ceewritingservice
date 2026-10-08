import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsyiylazielwbelfzsqo.supabase.co';
const supabaseKey = 'sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const tables = ['services', 'blog_posts', 'resources', 'scholarship_tracks'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    console.log(`\nTable: ${table}`);
    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log('Columns:', data && data.length > 0 ? Object.keys(data[0]) : 'Empty table');
    }
  }
}
run();
