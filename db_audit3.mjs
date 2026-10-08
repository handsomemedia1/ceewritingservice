import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsyiylazielwbelfzsqo.supabase.co';
const supabaseKey = 'sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: categories } = await supabase.from('categories').select('*');
  const catMap = {};
  if (categories) categories.forEach(c => catMap[c.id] = c.title);

  const { data: services } = await supabase.from('services').select('*');
  if (services) {
    const result = services.map(s => ({
      id: s.id,
      name: s.name,
      category_id: s.category_id,
      category_name: catMap[s.category_id] || 'Unknown',
      price: s.price,
      pricelabel: s.pricelabel,
      high_price: s.high_price
    }));
    console.log(JSON.stringify(result, null, 2));
  }
}
run();
