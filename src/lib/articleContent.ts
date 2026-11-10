import * as cheerio from 'cheerio';
import { LEGACY_LINKS } from '@/config/legacyLinks.mjs';
import { ARTICLE_COVER_SLUGS } from '@/config/articleCovers';
import { sanitizeArticleHtml } from '@/lib/sanitizeArticleHtml';

const FALLBACK_COVER = '/images/blog/research-methodology-chapter.jpg';
const SLUG_COVERS: Record<string, string> = {
  'machine-learning-social-science-research': '/images/blog/python-regression-analysis-research-data.jpg',
};
const LEGACY = LEGACY_LINKS as Record<string, string>;

/** Unsplash photos that have been removed upstream and now return 404. */
const DEAD_REMOTE_IMAGES = ['photo-1455390582262-044cdead27d8', 'photo-1518932945647-7a3c969f4144'];

/** Stored image paths from older imports point at files saved under another name. */
function repairImagePath(src: string): string {
  const scholarship = src.match(/^(\/images\/blog\/scholarships\/[^/]+?)(?<!-hero)\.jpg$/);
  if (scholarship) return `${scholarship[1]}-hero.jpg`;

  const diagram = src.match(/^\/images\/research\/path\/masters-thesis\/([^/]+)\.png$/);
  if (diagram) return `/images/blog/masters-roadmap/${diagram[1]}.svg`;

  return src;
}

/** The one place that decides which cover image an article shows. */
export function resolveArticleImage(src: string | null | undefined, slug: string): string {
  if (ARTICLE_COVER_SLUGS.has(slug)) return `/images/blog/headers/${slug}-hero.png`;
  if (!src || DEAD_REMOTE_IMAGES.some((id) => src.includes(id))) return SLUG_COVERS[slug] ?? FALLBACK_COVER;
  return repairImagePath(src);
}

export function resolveInternalLink(path: string): string {
  return LEGACY[path] ?? path;
}

export function absoluteUrl(path: string): string {
  return /^https?:/.test(path) ? path : `https://ceewriting.com${path}`;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 70);
}

const fileKey = (src: string) =>
  src.split('?')[0].split('/').pop()!.replace(/-hero(?=\.)/, '').replace(/\.[a-z]+$/i, '');

export interface ArticleHeading { id: string; text: string; level: 2 | 3 }
export interface ArticleFaq { question: string; answer: string }

export interface ProcessedArticle {
  html: string;
  headings: ArticleHeading[];
  faqs: ArticleFaq[];
  wordCount: number;
  markdown: string;
}

/**
 * Repairs stored article HTML: duplicate covers, broken image paths, dead links,
 * stray H1s, corrupted table markup and classes written for a light theme.
 */
export function processArticle(rawHtml: string, title: string, coverSrc: string): ProcessedArticle {
  const repaired = rawHtml
    .replace(/(<table\b[^>]*>\s*)<th\b[^>]*>(\s*<tr\b)/gi, '$1<thead>$2')
    .replace(/<\/tr>(\s*)<\/th>(\s*<tbody\b)/gi, '</tr>$1</thead>$2');

  const $ = cheerio.load(repaired, null, false);

  $('h1').each((_, el) => {
    const node = $(el);
    if (node.text().trim().toLowerCase() === title.trim().toLowerCase()) node.remove();
    else el.tagName = 'h2';
  });

  const coverKey = fileKey(coverSrc);
  const seenImages = new Set<string>();
  $('img').each((_, el) => {
    const node = $(el);
    const src = repairImagePath(node.attr('src') ?? '');
    const key = fileKey(src);
    const dead = DEAD_REMOTE_IMAGES.some((id) => src.includes(id));

    if (!src || dead || key === coverKey || seenImages.has(key)) {
      const figure = node.closest('figure');
      (figure.length ? figure : node).remove();
      return;
    }

    seenImages.add(key);
    node.attr('src', src).attr('loading', 'lazy').attr('decoding', 'async');
    if (!node.attr('alt')?.trim()) node.attr('alt', title);
  });

  $('a').each((_, el) => {
    const node = $(el);
    const href = (node.attr('href') ?? '').replace(/^https?:\/\/(www\.)?ceewriting\.com/, '') || '/';

    if (href === '#' || href === '/#') {
      node.replaceWith(node.html() ?? '');
      return;
    }
    if (href.startsWith('/')) {
      const [path, hash] = href.split('#');
      node.attr('href', resolveInternalLink(path) + (hash ? `#${hash}` : ''));
    } else if (/^https?:/.test(href)) {
      node.attr('target', '_blank');
    }
  });

  // Tailwind classes in stored articles target an old light theme; the article stylesheet owns the look.
  $('[class]').each((_, el) => {
    const node = $(el);
    if (node.hasClass('cta-box')) node.attr('class', 'cta-box');
    else node.removeAttr('class');
  });

  $('table').each((_, el) => {
    const node = $(el);
    if (!node.parent().is('[data-table-scroll]')) node.wrap('<div class="table-scroll"></div>');
  });

  const headings: ArticleHeading[] = [];
  const usedIds = new Set<string>();
  $('h2, h3').each((_, el) => {
    const node = $(el);
    const text = node.text().trim();
    if (!text) return;
    let id = slugify(text) || 'section';
    for (let n = 2; usedIds.has(id); n += 1) id = `${slugify(text)}-${n}`;
    usedIds.add(id);
    node.attr('id', id);
    headings.push({ id, text, level: el.tagName === 'h2' ? 2 : 3 });
  });

  const faqs: ArticleFaq[] = [];
  $('h2, h3, h4').each((_, el) => {
    if (faqs.length >= 10) return;
    const node = $(el);
    const question = node.text().trim();
    if (!question.endsWith('?')) return;

    const answer = node.nextUntil('h1, h2, h3, h4').filter('p, ul, ol').map((__, a) => $(a).text().trim()).get().join(' ');
    if (answer.length >= 40) faqs.push({ question, answer: answer.slice(0, 900) });
  });

  const html = sanitizeArticleHtml($.html());
  const text = cheerio.load(html, null, false).text();

  return {
    html,
    headings,
    faqs,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    markdown: toMarkdown(html),
  };
}

/** Compact Markdown for AI crawlers: structure and text, without presentation. */
export function toMarkdown(html: string): string {
  const $ = cheerio.load(html, null, false);
  const out: string[] = [];
  const clean = (value: string) => value.replace(/\s+/g, ' ').trim();

  const walk = (nodes: ReturnType<typeof $>) => {
    nodes.each((_, el) => {
      if (el.type !== 'tag') return;
      const node = $(el);
      const tag = el.tagName;

      if (/^h[1-6]$/.test(tag)) out.push(`${'#'.repeat(Number(tag[1]))} ${clean(node.text())}`);
      else if (tag === 'p') { const t = clean(node.text()); if (t) out.push(t); }
      else if (tag === 'ul' || tag === 'ol') node.children('li').each((i, li) => { out.push(`${tag === 'ol' ? `${i + 1}.` : '-'} ${clean($(li).text())}`); });
      else if (tag === 'blockquote') out.push(`> ${clean(node.text())}`);
      else if (tag === 'pre') out.push(`\`\`\`\n${node.text().trim()}\n\`\`\``);
      else if (tag === 'table') {
        node.find('tr').each((i, tr) => {
          const cells = $(tr).children('th, td').map((__, c) => clean($(c).text())).get();
          if (!cells.length) return;
          out.push(`| ${cells.join(' | ')} |`);
          if (i === 0) out.push(`| ${cells.map(() => '---').join(' | ')} |`);
        });
      } else walk(node.children());
    });
  };

  walk($.root().children());
  return out.join('\n\n');
}
