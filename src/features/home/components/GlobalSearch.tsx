'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

const suggestions = [
  'Turnitin report',
  'Chevening scholarship',
  'Data analysis',
  'Thesis editing',
  'Literature review',
  'Proofreading',
];

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    trackEvent('search', { query: trimmed });
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSuggestion = (term: string) => {
    trackEvent('search_suggestion', { query: term });
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <section
      style={{
        backgroundColor: '#141414',
        borderTop: '1px solid rgba(197,160,89,0.1)',
        paddingTop: '100px',
        paddingBottom: '100px',
        paddingLeft: 'clamp(24px, 6vw, 100px)',
        paddingRight: 'clamp(24px, 6vw, 100px)',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(197,160,89,0.7)',
            marginBottom: '20px',
          }}
        >
          Search the Ecosystem
        </p>

        {/* Headline */}
        <h2
          style={{
            fontSize: 'clamp(30px, 3.5vw, 50px)',
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            color: '#EAEAEA',
            marginBottom: '16px',
          }}
        >
          Find exactly what you&rsquo;re looking for.
        </h2>

        {/* Sub-copy */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.85,
            color: '#999999',
            fontWeight: 300,
            marginBottom: '48px',
          }}
        >
          Search across guides, tools, services, and the repository.
        </p>

        {/* Search form */}
        <SearchBar
          query={query}
          onChange={setQuery}
          onSubmit={handleSearch}
        />

        {/* Suggestion pills — plain text links separated by / */}
        <div
          style={{
            marginTop: '28px',
            fontSize: '13px',
            color: '#999999',
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          <span style={{ marginRight: '6px' }}>Try:</span>
          {suggestions.map((term, i) => (
            <React.Fragment key={term}>
              <button
                onClick={() => handleSuggestion(term)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(197,160,89,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLButtonElement).style.color = '#C5A059')
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    'rgba(197,160,89,0.75)')
                }
              >
                {term}
              </button>
              {i < suggestions.length - 1 && (
                <span style={{ margin: '0 8px', color: 'rgba(153,153,153,0.4)' }}>
                  /
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Isolated sub-component so focus-within state is clean ─── */
function SearchBar({
  query,
  onChange,
  onSubmit,
}: {
  query: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: focused
          ? '2px solid #C5A059'
          : '2px solid rgba(197,160,89,0.2)',
        transition: 'border-color 0.25s ease',
        paddingBottom: '2px',
      }}
    >
      {/* Search icon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(197,160,89,0.6)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0, marginRight: '4px' }}
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search services, guides, tools…"
        aria-label="Search"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: '18px',
          fontWeight: 300,
          color: '#EAEAEA',
          padding: '20px 16px',
          caretColor: '#C5A059',
        }}
      />

      {/* Submit */}
      <button
        type="submit"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: query.trim() ? '#C5A059' : 'rgba(197,160,89,0.35)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          padding: '0 0 0 12px',
          transition: 'color 0.2s ease',
          flexShrink: 0,
        }}
        disabled={!query.trim()}
      >
        Search →
      </button>
    </form>
  );
}
