"use client";
import React, { useEffect, useRef, useState } from 'react';

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const duration = 1500;
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{
      fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 900, color: 'white',
    }}>
      {count}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <div style={{ background: 'var(--gold)', position: 'relative', zIndex: 10 }}>
      <div className="stats-grid" style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {[
          { num: 500, suffix: '+', label: 'Happy Clients' },
          { num: 24, suffix: 'hrs', label: 'Avg Turnaround' },
          { num: 98, suffix: '%', label: 'Satisfaction Rate' },
          { num: 15, suffix: '+', label: 'Services Offered' },
        ].map((stat, i) => (
          <div key={i} style={{
            textAlign: 'center', padding: '32px 20px',
            borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none',
          }}>
            <AnimatedNumber target={stat.num} suffix={stat.suffix} />
            <div style={{
              fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
