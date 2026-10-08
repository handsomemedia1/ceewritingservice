import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsyiylazielwbelfzsqo.supabase.co';
const supabaseKey = 'sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const query = 'resume';
  const searchPattern = `%${query}%`;
  
  const res1 = await supabase
      .from('blog_posts')
      .select('id, title, meta_description, slug, topic_pillar, difficulty, estimated_read_time, published_at, tags')
      .eq('status', 'published')
      .or(`title.ilike.${searchPattern},meta_description.ilike.${searchPattern},content.ilike.${searchPattern}`)
      .limit(30);
      
  const res2 = await supabase
      .from('services')
      .select('id, name, desc_text, slug, category_id')
      .or(`name.ilike.${searchPattern},desc_text.ilike.${searchPattern}`)
      .limit(30);

  const res3 = await supabase
      .from('packages')
      .select('id, name, desc_text')
      .or(`name.ilike.${searchPattern},desc_text.ilike.${searchPattern}`)
      .limit(30);
      
  console.log("Blog:", res1.error ? res1.error : res1.data.length);
  console.log("Services:", res2.error ? res2.error : res2.data.length);
  console.log("Packages:", res3.error ? res3.error : res3.data.length);
}

run();
