"use client";
import React from 'react';
import { Briefcase, GraduationCap, Building2, Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const categories = [
  {
    icon: <Briefcase size={26} strokeWidth={1.5} color="white" />, title: 'Career & Professional', desc: 'Get hired. Look professional. Stand out.',
    items: [
      { id: 'cv-writing', name: 'CV / Resume Writing', desc: 'ATS-friendly CV that makes recruiters call you first.', price: 15000, priceLabel: '₦15,000', high: '₦30,000', popular: true },
      { id: 'cover-letter', name: 'Cover Letter Writing', desc: 'Compelling cover letter tailored to your target job.', price: 10000, priceLabel: '₦10,000', high: '₦20,000' },
      { id: 'linkedin', name: 'LinkedIn Optimization', desc: 'Rewrite your LinkedIn so recruiters find and contact you.', price: 25000, priceLabel: '₦25,000', high: '₦45,000' },
    ]
  },
  {
    icon: <GraduationCap size={28} strokeWidth={1.5} color="white" />, title: 'Academic Support', desc: 'For students who need quality, not shortcuts.',
    items: [
      { id: 'personal-statement', name: 'Personal Statement', desc: 'University admissions. We tell your story compellingly.', price: 25000, priceLabel: '₦25,000', high: '₦40,000', popular: true },
      { id: 'sop', name: 'Statement of Purpose', desc: 'Masters & PhD applications that win admissions abroad.', price: 25000, priceLabel: '₦25,000', high: '₦50,000', popular: true },
      { id: 'scholarship-essay', name: 'Scholarship Essay', desc: 'Chevening, Commonwealth, DAAD and more. Essays that win.', price: 25000, priceLabel: '₦25,000', high: '₦50,000' },
      { id: 'paraphrasing', name: 'Paraphrasing & Rewriting', desc: 'Reduce plagiarism while keeping your original meaning.', price: 5000, priceLabel: '₦5,000', high: '/ 1000 wds' },
    ]
  },
  {
    icon: <Building2 size={26} strokeWidth={1.5} color="white" />, title: 'Business Writing', desc: 'Impress clients, investors and partners.',
    items: [
      { id: 'business-proposal', name: 'Business Proposal', desc: 'Proposals for loans, tenders, grants or partnerships.', price: 25000, priceLabel: '₦25,000', high: '₦60,000' },
      { id: 'company-profile', name: 'Company Profile', desc: 'A compelling profile that tells your brand story.', price: 30000, priceLabel: '₦30,000', high: '₦60,000' },
      { id: 'grant-proposal', name: 'Grant Proposal', desc: 'NGOs, startups and researchers. Applications that get funded.', price: 30000, priceLabel: '₦30,000', high: '₦50,000', popular: true },
    ]
  },
];

function ServiceCard({ item, categoryTitle }: { item: typeof categories[0]['items'][0], categoryTitle: string }) {
  const { items, addItem } = useCart();
  const isInCart = items.some(i => i.id === item.id);

  return (
    <div className="glass-card-light" style={{
      padding: '0', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {item.popular && (
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
        }} />
      )}

      <div style={{padding: '28px 26px', flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
          <h4 style={{
            fontSize: '17px', fontWeight: 700, color: 'var(--navy)',
            fontFamily: "'Playfair Display', serif",
          }}>{item.name}</h4>
          {item.popular && (
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              color: '#92400e', fontSize: '10px', fontWeight: 700,
              padding: '4px 10px', borderRadius: '50px',
              display: 'flex', alignItems: 'center', gap: '4px',
              flexShrink: 0, marginLeft: '12px',
            }}>
              <Star size={10} fill="#92400e" strokeWidth={0} /> Popular
            </div>
          )}
        </div>

        <p style={{
          fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '24px',
          flex: 1,
        }}>{item.desc}</p>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '18px', borderTop: '1px solid rgba(201,147,58,0.1)',
        }}>
          <div>
            <span style={{
              fontFamily: "'Playfair Display', serif", fontSize: '20px',
              fontWeight: 700, color: 'var(--gold)',
            }}>{item.priceLabel}</span>
            <span style={{
              fontSize: '12px', color: 'var(--muted)', marginLeft: '6px',
            }}>{item.high ? (item.high.includes('/') ? item.high : `– ${item.high}`) : ''}</span>
          </div>

          <button
            onClick={() => addItem({
              id: item.id,
              name: item.name,
              category: categoryTitle,
              price: item.price,
              priceLabel: item.priceLabel,
            })}
            style={{
              background: isInCart
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
              color: 'white', fontSize: '12px', fontWeight: 600,
              padding: '10px 20px', borderRadius: '50px', border: 'none',
              cursor: 'pointer', transition: 'all 0.3s ease',
              display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: isInCart
                ? '0 4px 12px rgba(16,185,129,0.3)'
                : '0 4px 12px rgba(11,31,58,0.2)',
              fontFamily: 'inherit',
            }}
          >
            {isInCart ? <><Check size={12} /> Added</> : <><ShoppingCart size={12} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <div style={{padding: '80px 24px 60px', maxWidth: '1280px', margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: '64px'}}>
        <div className="section-label" style={{color: 'var(--gold)', justifyContent: 'center'}}>Complete Catalog</div>
        <h2 className="section-title" style={{color: 'var(--navy)'}}>Browse All Services</h2>
        <p className="section-subtitle" style={{color: 'var(--muted)', margin: '0 auto'}}>
          Add services to your cart and send your order via WhatsApp in one click.
        </p>
      </div>

      {categories.map((cat, i) => (
        <div key={i} style={{marginBottom: '72px'}}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px',
            background: 'linear-gradient(135deg, rgba(11,31,58,0.04) 0%, rgba(201,147,58,0.06) 100%)',
            borderRadius: '16px', padding: '24px 28px',
            border: '1px solid rgba(201,147,58,0.12)',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(11,31,58,0.25)',
              flexShrink: 0,
            }}>
              {cat.icon}
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif", fontSize: '24px',
                fontWeight: 700, color: 'var(--navy)', marginBottom: '4px',
              }}>{cat.title}</h3>
              <p style={{fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5}}>{cat.desc}</p>
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {cat.items.map((item, j) => (
              <ServiceCard key={j} item={item} categoryTitle={cat.title} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
