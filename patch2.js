const fs = require('fs');
let content = fs.readFileSync('src/components/FloatingCart.tsx', 'utf8');

content = content.replace(/const \{ items, totalItems, removeItem, updateQty, clearCart, whatsappUrl \} = useCart\(\);/, 'const { items, totalItems, removeItem, updateQty, clearCart, whatsappUrl, totalPrice } = useCart();');

content = content.replace(/\{formatPrice\(item\.price\)\.formatted\}/g, '{item.priceLabel}');

content = content.replace(/\{formatPrice\(items\.reduce\(\(sum, item\) => sum \+ item\.price \* item\.qty, 0\)\)\.formatted\}/g, '{formatPrice(totalPrice).formatted}');

// Also add 'hasVariablePricing' logic to total.
content = content.replace(/<span style=\{\{\s*fontFamily: "'Playfair Display', serif", fontSize: '24px',\s*fontWeight: 900, color: 'var\(--navy\)',\s*\}\}>\{formatPrice\(totalPrice\)\.formatted\}<\/span>/, 
`{items.some(i => i.has_variable_pricing) && <span style={{fontSize: '12px', color: 'var(--muted)', marginRight: '8px'}}>Est. Start:</span>}
<span style={{
  fontFamily: "'Playfair Display', serif", fontSize: '24px',
  fontWeight: 900, color: 'var(--navy)',
}}>{formatPrice(totalPrice).formatted}</span>`);

fs.writeFileSync('src/components/FloatingCart.tsx', content);
console.log("Done");
