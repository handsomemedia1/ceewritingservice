import React from 'react';

interface ArticleProseProps {
  html: string;
  id?: string;
}

export default function ArticleProse({ html, id = 'article-prose' }: ArticleProseProps) {
  return (
    <>
      <div
        id={id}
        className="article-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <style>{`
        .article-prose {
          font-size: 18px;
          color: #CCCCCC;
          line-height: 1.9;
          font-family: 'Inter', 'Georgia', serif;
          font-weight: 300;
        }
        .article-prose h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 700;
          color: #EAEAEA;
          margin-top: 72px;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
          line-height: 1.15;
          scroll-margin-top: 100px;
        }
        .article-prose h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(20px, 2.5vw, 26px);
          font-weight: 700;
          color: #EAEAEA;
          margin-top: 56px;
          margin-bottom: 20px;
          scroll-margin-top: 100px;
          letter-spacing: -0.01em;
        }
        .article-prose h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #EAEAEA;
          margin-top: 40px;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .article-prose p {
          margin-bottom: 28px;
          color: #AAAAAA;
        }
        .article-prose > p:first-child {
          font-size: 20px;
          color: #CCCCCC;
          line-height: 1.8;
        }
        .article-prose ul, .article-prose ol {
          padding-left: 0;
          margin-bottom: 32px;
          list-style: none;
        }
        .article-prose li {
          margin-bottom: 14px;
          line-height: 1.8;
          color: #AAAAAA;
          padding-left: 24px;
          position: relative;
        }
        .article-prose ul li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: rgba(197,160,89,0.6);
          font-weight: 700;
        }
        .article-prose ol {
          counter-reset: list-counter;
        }
        .article-prose ol li {
          counter-increment: list-counter;
        }
        .article-prose ol li::before {
          content: counter(list-counter, decimal-leading-zero);
          position: absolute;
          left: 0;
          color: rgba(197,160,89,0.6);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          top: 4px;
        }
        .article-prose blockquote {
          background: transparent;
          border: none;
          border-left: 2px solid rgba(197,160,89,0.4);
          padding: 8px 32px;
          margin: 48px 0;
          font-style: italic;
          color: #CCCCCC;
          font-size: 20px;
          line-height: 1.7;
        }
        .article-prose blockquote p {
          margin: 0;
          color: #CCCCCC;
        }
        .article-prose img {
          max-width: 100%;
          height: auto;
          margin: 48px 0;
          display: block;
        }
        .article-prose a {
          color: #C5A059;
          text-decoration: none;
          border-bottom: 1px solid rgba(197,160,89,0.3);
          transition: border-color 0.2s ease, color 0.2s ease;
          padding-bottom: 1px;
        }
        .article-prose a:hover {
          color: #E8C980;
          border-bottom-color: #C5A059;
        }
        .article-prose strong {
          font-weight: 700;
          color: #EAEAEA;
        }
        .article-prose em {
          font-style: italic;
          color: #BBBBBB;
        }
        .article-prose code {
          font-family: 'Courier New', monospace;
          background: rgba(197,160,89,0.08);
          border: 1px solid rgba(197,160,89,0.15);
          padding: 2px 10px;
          font-size: 15px;
          color: #C5A059;
        }
        .article-prose pre {
          background: #111111;
          border: 1px solid rgba(197,160,89,0.15);
          padding: 32px;
          overflow-x: auto;
          margin: 40px 0;
          font-size: 14px;
          line-height: 1.7;
        }
        .article-prose pre code {
          background: transparent;
          border: none;
          padding: 0;
          color: #C5A059;
        }
        .article-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 40px 0;
          font-size: 15px;
        }
        .article-prose th {
          background: #111111;
          color: #C5A059;
          padding: 14px 20px;
          text-align: left;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1px solid rgba(197,160,89,0.2);
        }
        .article-prose td {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(197,160,89,0.08);
          color: #AAAAAA;
        }
        .article-prose tr:hover td {
          background: rgba(197,160,89,0.03);
        }
        .article-prose hr {
          border: none;
          border-top: 1px solid rgba(197,160,89,0.15);
          margin: 56px 0;
        }
      `}</style>
    </>
  );
}
