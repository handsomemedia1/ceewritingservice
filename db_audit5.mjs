import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsyiylazielwbelfzsqo.supabase.co';
const supabaseKey = 'sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh';
const supabase = createClient(supabaseUrl, supabaseKey);

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function run() {
  const { data: categories } = await supabase.from('categories').select('*');
  const catMap = {};
  if (categories) categories.forEach(c => catMap[c.id] = c.title);

  const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: true });
  if (services) {
    const result = services.map((s, index) => {
      let type = 'fixed';
      let maxPrice = null;
      let unit = null;
      let propPrice = s.price;
      
      // Basic deterministic mapping based on string patterns
      if (s.high_price && s.high_price.includes('1000 w')) {
        type = 'per_unit';
        unit = '1000 words';
      } else if (s.high_price && /\d/.test(s.high_price)) {
        type = 'range';
        maxPrice = parseInt(s.high_price.replace(/\D/g, ''), 10);
      }
      
      if (s.price === 0 && s.pricelabel) {
        propPrice = parseInt(s.pricelabel.replace(/\D/g, ''), 10);
      }
      
      return {
        id: s.id,
        name: s.name,
        category: catMap[s.category_id] || 'Unknown',
        current_price: s.price,
        current_pricelabel: s.pricelabel,
        current_high_price: s.high_price,
        proposed_price: propPrice,
        proposed_max_price: maxPrice,
        pricing_type: type,
        pricing_unit: unit,
        proposed_slug: slugify(s.name),
        proposed_display_order: (index + 1) * 10
      };
    });
    console.log(JSON.stringify(result, null, 2));
  }
}
run();
