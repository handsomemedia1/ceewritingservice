import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsyiylazielwbelfzsqo.supabase.co';
const supabaseKey = 'sb_publishable_MoTvPzdwdjsAWLH8wxbzxw_zdauAXzh';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: serviceData } = await supabase.from('services').select('name, slug, price, max_price, pricing_type, pricing_unit, currency, display_order');
  
  if (serviceData) {
    console.log(JSON.stringify(serviceData, null, 2));
  }
}

run();
