const fs = require('fs');

let actionsStr = fs.readFileSync('src/app/(admin)/dashboard/services/actions.ts', 'utf8');

// Update addService definition
actionsStr = actionsStr.replace(
  /export async function addService\(categoryId: string, name: string, desc: string, priceLabel: string, highPrice: string, popular: boolean, badge\?: string, features\?: string\[\]\) \{/,
  `export async function addService(categoryId: string, name: string, desc: string, priceLabel: string, highPrice: string, popular: boolean, badge?: string, features?: string[], priceStr?: string, maxPriceStr?: string, pricingTypeStr?: string, pricingUnitStr?: string, currencyStr?: string, displayOrderStr?: string) {`
);

// Update addService insert
actionsStr = actionsStr.replace(
  /const \{ error \} = await supabase\.from\('services'\)\.insert\(\[\{([^}]+)\}\]\)/,
  `
  let parsedPrice = priceStr && priceStr.trim() !== '' ? parseInt(priceStr, 10) : null;
  let parsedMaxPrice = maxPriceStr && maxPriceStr.trim() !== '' ? parseInt(maxPriceStr, 10) : null;
  let pType = pricingTypeStr && pricingTypeStr.trim() !== '' ? pricingTypeStr : 'unconfigured';
  let pUnit = pricingUnitStr && pricingUnitStr.trim() !== '' ? pricingUnitStr : null;
  let dOrder = displayOrderStr && displayOrderStr.trim() !== '' ? parseInt(displayOrderStr, 10) : 0;
  let curr = currencyStr && currencyStr.trim() !== '' ? currencyStr : 'NGN';

  const { error } = await supabase.from('services').insert([{ 
    category_id: categoryId, name, desc_text: desc, pricelabel: priceLabel, high_price: highPrice, popular, badge, features,
    price: parsedPrice, max_price: parsedMaxPrice, pricing_type: pType, pricing_unit: pUnit, display_order: dOrder, currency: curr
  }])`
);


// Update editService definition
actionsStr = actionsStr.replace(
  /export async function editService\(id: string, name: string, desc: string, priceLabel: string, highPrice: string, popular: boolean, badge\?: string, features\?: string\[\]\) \{/,
  `export async function editService(id: string, name: string, desc: string, priceLabel: string, highPrice: string, popular: boolean, badge?: string, features?: string[], priceStr?: string, maxPriceStr?: string, pricingTypeStr?: string, pricingUnitStr?: string, currencyStr?: string, displayOrderStr?: string) {`
);

// Update editService update
actionsStr = actionsStr.replace(
  /const \{ error \} = await supabase\.from\('services'\)\.update\(\{\s*name, desc_text: desc, pricelabel: priceLabel, high_price: highPrice, popular, badge, features\s*\}\)\.eq\('id', id\)/,
  `
  let parsedPrice = priceStr && priceStr.trim() !== '' ? parseInt(priceStr, 10) : null;
  let parsedMaxPrice = maxPriceStr && maxPriceStr.trim() !== '' ? parseInt(maxPriceStr, 10) : null;
  let pType = pricingTypeStr && pricingTypeStr.trim() !== '' ? pricingTypeStr : 'unconfigured';
  let pUnit = pricingUnitStr && pricingUnitStr.trim() !== '' ? pricingUnitStr : null;
  let dOrder = displayOrderStr && displayOrderStr.trim() !== '' ? parseInt(displayOrderStr, 10) : 0;
  let curr = currencyStr && currencyStr.trim() !== '' ? currencyStr : 'NGN';

  const { error } = await supabase.from('services').update({ 
    name, desc_text: desc, pricelabel: priceLabel, high_price: highPrice, popular, badge, features,
    price: parsedPrice, max_price: parsedMaxPrice, pricing_type: pType, pricing_unit: pUnit, display_order: dOrder, currency: curr
  }).eq('id', id)`
);

fs.writeFileSync('src/app/(admin)/dashboard/services/actions.ts', actionsStr);
console.log("Actions updated");
