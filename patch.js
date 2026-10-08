const fs = require('fs');
let content = fs.readFileSync('src/components/ServicesSection.tsx', 'utf8');

content = content.replace(/const { formatPrice } = useCurrency\(\);/, 'const { formatServicePrice } = useCurrency();');
content = content.replace(/const { price, formatted } = formatPrice\(item\.price\);/, 'const priceDisplay = formatServicePrice(item);');

// Remove dynamicHighPrice block
content = content.replace(/let dynamicHighPrice[\s\S]*?hpConverted\);\n\s*\}\n\s*\}/, '');

// Replace addToCart
content = content.replace(/addItem\(\{ id: item\.id, name: item\.name, category: categoryTitle, price, priceLabel: formatted \}\);/, 'addItem({ id: item.id, name: item.name, category: categoryTitle, price: item.price, priceLabel: priceDisplay, pricing_type: item.pricing_type, has_variable_pricing: item.pricing_type !== "fixed" && item.pricing_type !== "free" });');

// Replace {formatted}
content = content.replace(/\{formatted\}/, '{priceDisplay}');

// Remove dynamicHighPrice usage
content = content.replace(/\{dynamicHighPrice && \([\s\S]*?\{dynamicHighPrice\.includes\('\/'\).*?\}\n\s*<\/div>\n\s*\)\}/, '');

fs.writeFileSync('src/components/ServicesSection.tsx', content);
console.log("Done");
