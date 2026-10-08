import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsyiylazielwbelfzsqo.supabase.co';
const supabaseKey = 'sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // Get schema
  // Note: PostgREST doesn't expose information_schema directly by default unless exposed in API.
  // We can just fetch a single row from `services` and see the fields.
  const { data: serviceData, error: serviceError } = await supabase.from('services').select('*');
  console.log('Services Sample:', serviceData ? serviceData[0] : serviceError);
  console.log('Total services:', serviceData ? serviceData.length : 0);

  // Maybe get categories too?
  const { data: categoryData } = await supabase.from('categories').select('*');
  console.log('Categories:', categoryData);

  // Let's log all services with pricing info for the pricing table
  if (serviceData) {
    const pricingTable = serviceData.map(s => ({
      id: s.id,
      name: s.name,
      category: s.category,
      price: s.price,
      high_price: s.high_price,
      pricelabel: s.pricelabel,
      currency: s.currency,
      unit: s.unit,
      display_order: s.display_order,
      sort_order: s.sort_order
    }));
    console.log(JSON.stringify(pricingTable, null, 2));
  }
}

run();
