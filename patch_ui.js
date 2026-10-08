const fs = require('fs');

let pageStr = fs.readFileSync('src/app/(admin)/dashboard/services/page.tsx', 'utf8');

const UI_FIELDS = `
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px'}}>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Pricing Type</label><select name="pricing_type" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} defaultValue="unconfigured"><option value="unconfigured">Unconfigured (Use Legacy)</option><option value="fixed">Fixed</option><option value="range">Range</option><option value="per_unit">Per Unit</option><option value="starting_at">Starting At</option><option value="free">Free</option></select></div>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Price (Number)</label><input type="number" name="price" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} placeholder="e.g. 15000" /></div>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Max Price (Number)</label><input type="number" name="max_price" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} placeholder="e.g. 30000" /></div>
  </div>
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px'}}>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Pricing Unit</label><input name="pricing_unit" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} placeholder="e.g. 1000 words" /></div>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Currency</label><input name="currency" defaultValue="NGN" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} /></div>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Display Order</label><input type="number" name="display_order" defaultValue="0" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} /></div>
  </div>
`;

// Insert after High Price in add form
pageStr = pageStr.replace(
  /<input name="highPrice" style=\{\{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var\(--border\)'\}\} placeholder="e\.g \?30,000" \/>\s*<\/div>\s*<\/div>/,
  `<input name="highPrice" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} placeholder="e.g ?30,000" />
                    </div>
                  </div>` + UI_FIELDS
);

const EDIT_UI_FIELDS = `
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px'}}>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Pricing Type</label><select name="pricing_type" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} defaultValue={showEditSvcModal.pricing_type || 'unconfigured'}><option value="unconfigured">Unconfigured (Use Legacy)</option><option value="fixed">Fixed</option><option value="range">Range</option><option value="per_unit">Per Unit</option><option value="starting_at">Starting At</option><option value="free">Free</option></select></div>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Price (Number)</label><input type="number" name="price" defaultValue={showEditSvcModal.price ?? ''} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} /></div>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Max Price (Number)</label><input type="number" name="max_price" defaultValue={showEditSvcModal.max_price ?? ''} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} /></div>
  </div>
  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px'}}>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Pricing Unit</label><input name="pricing_unit" defaultValue={showEditSvcModal.pricing_unit || ''} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} /></div>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Currency</label><input name="currency" defaultValue={showEditSvcModal.currency || 'NGN'} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} /></div>
    <div><label style={{display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--navy)'}}>Display Order</label><input type="number" name="display_order" defaultValue={showEditSvcModal.display_order ?? 0} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} /></div>
  </div>
`;

pageStr = pageStr.replace(
  /<input name="highPrice" defaultValue=\{showEditSvcModal\.high_price \|\| ''\} style=\{\{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var\(--border\)'\}\} \/>\s*<\/div>\s*<\/div>/,
  `<input name="highPrice" defaultValue={showEditSvcModal.high_price || ''} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)'}} />
                    </div>
                  </div>` + EDIT_UI_FIELDS
);


// Also patch the addService call in page.tsx
pageStr = pageStr.replace(
  /fd\.get\('badge'\) as string,\s*features\s*\);/,
  `fd.get('badge') as string,
        features,
        fd.get('price') as string,
        fd.get('max_price') as string,
        fd.get('pricing_type') as string,
        fd.get('pricing_unit') as string,
        fd.get('currency') as string,
        fd.get('display_order') as string
      );`
);

fs.writeFileSync('src/app/(admin)/dashboard/services/page.tsx', pageStr);
console.log("page.tsx updated");
