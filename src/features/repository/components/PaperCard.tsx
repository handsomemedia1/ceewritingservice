import React from 'react';
import Link from 'next/link';
import { RepositoryPaper } from '../types';

interface PaperCardProps {
  paper: RepositoryPaper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  const authorNames = paper.authors?.map(a => a.name).join(', ') || 'Unknown Author';
  
  const formattedDate = new Date(paper.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      padding: '40px 0', borderBottom: '1px solid rgba(2,58,34,0.15)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--sage)',
          background: 'var(--green-dark)', padding: '4px 10px'
        }}>
          {paper.discipline}
        </span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px', fontWeight: 700,
          letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--green-dark)', opacity: 0.6
        }}>
          {paper.paper_type}
        </span>
      </div>
      
      <Link href={`/repository/paper/${paper.slug}`} style={{ textDecoration: 'none' }}>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 700,
          color: 'var(--green-dark)', lineHeight: 1.2, marginBottom: '16px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {paper.title}
        </h3>
      </Link>
      
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600,
        color: 'var(--green-dark)', opacity: 0.8, marginBottom: '16px'
      }}>
        {authorNames}
      </div>
      
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--green-dark)',
        lineHeight: 1.6, opacity: 0.8, marginBottom: '32px',
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
      }}>
        {paper.abstract}
      </p>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 700,
          letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--green-dark)', opacity: 0.5
        }}>
          {formattedDate}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {paper.downloads_count > 0 && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'var(--green-dark)', opacity: 0.5 }}>
              ↓ {paper.downloads_count}
            </span>
          )}
          <Link href={`/repository/paper/${paper.slug}`} style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--green-dark)', textDecoration: 'none'
          }}>
            Read Full →
          </Link>
        </div>
      </div>
    </div>
  );
}
