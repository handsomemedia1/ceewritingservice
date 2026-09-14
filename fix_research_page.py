import re

filepath = r'src\app\research\page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the main element class
content = content.replace(
    '<main className="min-h-screen bg-gold/20">',
    '<main style={{ minHeight: \'100vh\', background: \'#0A0A0A\' }}>'
)

# Replace the latest articles section
old_section = '''      {/* Latest Methodology Feed */}
      <section className="py-24 bg-transparent relative">
        <div className="container mx-auto px-6 max-w-5xl">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-text-primary/70 font-bold tracking-wider uppercase mb-3 block text-sm">Latest Articles</span>
              <h2 className="text-3xl font-serif font-bold text-text-primary">
                Methodology & Insights
              </h2>
            </div>
            <Link href="/blog?topic=Research" className="text-sm font-semibold text-text-primary hover:text-text-primary/70 transition-colors">
              View All Research Guides →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {latestGuides && latestGuides.length > 0 ? (
              latestGuides.map((guide, idx) => (
                <Link key={idx} href={`/blog/${guide.slug}`} className="group p-6 rounded-none border border-border/10 hover:border-border/20/30 hover: transition-all block">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-bg-main/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-text-primary/60">
                      Guide
                    </span>
                    <span className="text-xs text-muted font-medium">5 min read</span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-text-primary/70 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <div className="text-sm font-semibold text-text-primary/70 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    Read Guide →
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 p-12 text-center border border-dashed border-border/20 rounded-none bg-gold/20">
                <p className="text-muted">No research guides published yet. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>'''

new_section = '''      {/* Latest Methodology Feed */}
      <section style={{
        padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 80px)',
        background: 'linear-gradient(180deg, #0d0d12 0%, #0A0A0A 100%)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(197,160,89,0.15), transparent)' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#C5A059', marginBottom: '14px' }}>
                Latest Articles
              </div>
              <div className="section-divider" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                Methodology &amp; Insights
              </h2>
            </div>
            <Link href="/blog?topic=Research" style={{ fontSize: '13px', fontWeight: 700, color: '#C5A059', textDecoration: 'none' }}>
              View All Research Guides →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {latestGuides && latestGuides.length > 0 ? (
              latestGuides.map((guide, idx) => (
                <Link key={idx} href={`/blog/${guide.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '50px', background: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.2)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#C5A059' }}>Guide</span>
                      <span style={{ fontSize: '11px', color: 'rgba(234,234,234,0.35)', fontWeight: 500 }}>5 min read</span>
                    </div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '17px', fontWeight: 700, color: 'white', lineHeight: 1.4, marginBottom: '16px', flex: 1 }}>
                      {guide.title}
                    </h3>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#C5A059', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Read Guide →
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', borderRadius: '20px', border: '1px dashed rgba(197,160,89,0.12)' }}>
                <p style={{ color: 'rgba(234,234,234,0.35)', fontSize: '15px' }}>No research guides published yet. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>'''

content = content.replace(old_section, new_section)

# Replace the bottom CTA strip
old_cta = '''      {/* Ecosystem Conversion Strip */}
      <section className="py-20 bg-bg-main text-gold text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-2xl font-serif font-bold mb-4">Need expert execution?</h2>
          <p className="text-gold/70 mb-8 leading-relaxed">
            If you're stuck on your methodology or struggling with statistical software, our consultants can jump in and deliver guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/services" className="px-8 py-4 bg-bg-main/10 text-text-primary font-bold rounded-full hover:bg-bg-main/10-light transition-colors">
              Explore Research Services
            </Link>
          </div>
        </div>
      </section>'''

new_cta = '''      {/* CTA Strip */}
      <section style={{
        padding: 'clamp(80px, 10vw, 100px) clamp(24px, 6vw, 80px)',
        background: 'linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(197,160,89,0.03) 100%)',
        borderTop: '1px solid rgba(197,160,89,0.12)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
            Need expert execution?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(234,234,234,0.45)', lineHeight: 1.8, marginBottom: '36px' }}>
            If you are stuck on your methodology or struggling with statistical software, our consultants can jump in and deliver guaranteed results.
          </p>
          <Link href="/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(135deg, #C5A059, #D8B470)',
            color: '#0A0A0A', padding: '14px 32px', borderRadius: '8px',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none', boxShadow: '0 8px 32px rgba(197,160,89,0.25)',
          }}>
            Explore Research Services
          </Link>
        </div>
      </section>'''

content = content.replace(old_cta, new_cta)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done. Checking for remaining bg-gold/20...")
import re
matches = re.findall(r'bg-gold/20', content)
print(f"  bg-gold/20 occurrences remaining: {len(matches)}")
matches2 = re.findall(r'bg-transparent', content)
print(f"  bg-transparent occurrences remaining: {len(matches2)}")
