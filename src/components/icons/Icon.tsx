import React from 'react';

/**
 * Cee Writing icon set.
 *
 * Every glyph is drawn on the same 24-point grid with a fine 1.4 line and exactly one
 * gold accent detail (a tassel, a seal, a node, a pupil). The accent is the signature of
 * the set: keep it to one element per icon when adding new glyphs.
 */

const ACCENT = 'var(--icon-accent, #C5A059)';

/** Accent element drawn as a line. */
const A = (props: React.SVGProps<SVGPathElement>) => <path {...props} style={{ stroke: ACCENT }} />;
/** Accent element drawn as a solid shape. */
const Dot = ({ cx, cy, r = 1.4 }: { cx: number; cy: number; r?: number }) => (
  <circle cx={cx} cy={cy} r={r} style={{ fill: ACCENT, stroke: 'none' }} />
);

const GLYPHS = {
  cap: (<>
    <path d="M2.5 9.5 12 5l9.5 4.5L12 14z" />
    <path d="M6.5 11.6V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.4" />
    <A d="M21.5 9.5v5" /><Dot cx={21.5} cy={15.6} r={1.2} />
  </>),
  path: (<>
    <path d="M5.5 18.5c3.5 0 3.5-6.5 7-6.5s3.5-5.5 6-5.5" />
    <circle cx="19" cy="6.5" r="1.8" />
    <Dot cx={5} cy={18.5} r={1.8} />
  </>),
  thesis: (<>
    <path d="M6 3h8.5L19 7.5V21H6z" /><path d="M14.5 3v4.5H19" /><path d="M9 11h7M9 14h4.5" />
    <circle cx="15.5" cy="17.5" r="2.2" style={{ stroke: ACCENT }} />
  </>),
  target: (<>
    <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" />
    <Dot cx={12} cy={12} r={1.5} />
  </>),
  sigma: (<>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
    <path d="M15.5 8H9l3.5 4L9 16h6.5" />
    <Dot cx={17.6} cy={6.4} r={1.1} />
  </>),
  blueprint: (<>
    <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="14" y="14" width="6.5" height="6.5" rx="1.5" />
    <path d="M10 6.75h3.5a3.75 3.75 0 0 1 3.75 3.75V14" />
    <path d="M3.5 17.25h6.5" />
    <circle cx="17.25" cy="6.75" r="2.4" style={{ stroke: ACCENT }} />
  </>),
  network: (<>
    <path d="M6.2 7.2 10.6 11M17.8 7.2 13.4 11M6.2 16.8l4.4-3.8M17.8 16.8 13.4 13" />
    <circle cx="5" cy="6" r="1.7" /><circle cx="19" cy="6" r="1.7" /><circle cx="5" cy="18" r="1.7" /><circle cx="19" cy="18" r="1.7" />
    <circle cx="12" cy="12" r="2.2" style={{ stroke: ACCENT }} />
  </>),
  curve: (<>
    <path d="M4 3.5V20h16.5" />
    <path d="M7 16.5c2.6 0 3.6-9 6.8-9 2.4 0 2.8 3.5 6.2 3.5" />
    <Dot cx={13.8} cy={7.5} r={1.5} />
  </>),
  book: (<>
    <path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1z" /><path d="M12 6.5V20" />
    <A d="M15.5 4.6v4.6l1.5-1.1 1.5 1.1V4.4" />
  </>),
  briefcase: (<>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h7.5M13.5 12.5H21" />
    <rect x="10.5" y="11" width="3" height="3" rx="0.6" style={{ fill: ACCENT, stroke: 'none' }} />
  </>),
  document: (<>
    <path d="M6 3h8.5L19 7.5V21H6z" /><path d="M14.5 3v4.5H19" /><path d="M9 11h7M9 14h7" />
    <A d="M9 17h4" />
  </>),
  lock: (<>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <Dot cx={12} cy={15} r={1.4} /><A d="M12 15.6v2" />
  </>),
  eye: (<>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" style={{ stroke: ACCENT }} />
  </>),
  shield: (<>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" />
    <A d="m8.8 12.2 2.2 2.2 4.3-4.6" />
  </>),
  scale: (<>
    <path d="M12 5v15M8 20h8M5 7h14" />
    <path d="M5 7 2.8 12.5a2.4 2.4 0 0 0 4.4 0zM19 7l-2.2 5.5a2.4 2.4 0 0 0 4.4 0z" />
    <Dot cx={12} cy={4.4} r={1.4} />
  </>),
  chart: (<>
    <path d="M3 20.5h18" /><path d="M6 20.5V12M10.5 20.5V7M15 20.5v-6" />
    <A d="M19.5 20.5V9.5" />
  </>),
  institution: (<>
    <path d="M3 9 12 4l9 5z" /><path d="M6 11v7M10 11v7M14 11v7M18 11v7M3 20.5h18" />
    <Dot cx={12} cy={7.2} r={1} />
  </>),
  globe: (<>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5z" />
    <Dot cx={18.4} cy={6.3} r={1.3} />
  </>),
  search: (<>
    <circle cx="10.5" cy="10.5" r="6.2" /><A d="m15.2 15.2 5.3 5.3" />
  </>),
  calendar: (<>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" /><path d="M3.5 9.8h17M8 3v4M16 3v4" />
    <rect x="14" y="13.5" width="3" height="3" rx="0.6" style={{ fill: ACCENT, stroke: 'none' }} />
  </>),
  clock: (<>
    <circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12" /><A d="m12 12 3.2 2" />
  </>),
  insight: (<>
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" />
    <path d="M9.5 19h5M10.5 21.5h3" /><A d="M12 8v4.2" />
  </>),
  download: (<>
    <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" /><A d="M4.5 19.5h15" />
  </>),
  copy: (<>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
    <path d="M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" style={{ stroke: ACCENT }} />
  </>),
  warning: (<>
    <path d="M12 4 2.8 19.5h18.4z" /><path d="M12 10v4.2" /><Dot cx={12} cy={16.9} r={1.1} />
  </>),
  check: (<A d="m5 12.5 4.5 4.5L19 7.5" />),
  checkCircle: (<>
    <circle cx="12" cy="12" r="8.5" /><A d="m8.3 12.3 2.6 2.6 4.9-5.2" />
  </>),
  cross: (<path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />),
  crossCircle: (<>
    <circle cx="12" cy="12" r="8.5" /><A d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" />
  </>),
  star: (<path d="m12 3.6 2.5 5.3 5.8.7-4.3 4 1.1 5.8L12 16.6l-5.1 2.8 1.1-5.8-4.3-4 5.8-.7z" style={{ fill: ACCENT, stroke: ACCENT }} />),
  spark: (<>
    <path d="M12 3.5c.6 4.4 2.1 5.9 6.5 6.5-4.4.6-5.9 2.1-6.5 6.5-.6-4.4-2.1-5.9-6.5-6.5 4.4-.6 5.9-2.1 6.5-6.5z" />
    <Dot cx={18.5} cy={17.5} r={1.4} />
  </>),
  mail: (<>
    <rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="m3.6 7.2 8.4 6 8.4-6" />
    <Dot cx={18.4} cy={16} r={1.1} />
  </>),
  chat: (<>
    <path d="M4 5.5h16v10.5H10l-5 4V16H4z" />
    <Dot cx={8.6} cy={10.8} r={0.95} /><Dot cx={12} cy={10.8} r={0.95} /><Dot cx={15.4} cy={10.8} r={0.95} />
  </>),
  trendUp: (<><path d="M3.5 17 9 11.5l4 4 7-7" /><A d="M15 8.5h5v5" /></>),
  trendDown: (<><path d="M3.5 7 9 12.5l4-4 7 7" /><A d="M15 15.5h5v-5" /></>),
  flat: (<><path d="M4 12h12" /><A d="m16 8.5 3.5 3.5-3.5 3.5" /></>),
  arrowRight: (<><path d="M4.5 12h14" /><A d="m13.5 7 5 5-5 5" /></>),
  repeat: (<>
    <path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5" />
    <A d="m16 3 3 3-3 3M8 21l-3-3 3-3" />
  </>),
  help: (<>
    <circle cx="12" cy="12" r="8.5" /><path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.6" />
    <Dot cx={12} cy={16.8} r={1.05} />
  </>),
  plus: (<A d="M12 5v14M5 12h14" />),
  minus: (<path d="M5 12h14" />),
  trash: (<>
    <path d="M4 7h16M9.5 7V4.5h5V7M6 7l1 13h10l1-13" /><A d="M10 11v5.5M14 11v5.5" />
  </>),
  send: (<><path d="m3.5 11.5 17-7.5-6 16.5-3.2-6.8z" /><A d="m11.3 13.7 4-4" /></>),
  bag: (<>
    <path d="M5 8h14l-1.2 12.5H6.2z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    <Dot cx={12} cy={13.5} r={1.2} />
  </>),
  package: (<>
    <path d="M12 3 4 7v10l8 4 8-4V7z" /><path d="M4 7l8 4 8-4M12 11v10" /><A d="M8 5l8 4" />
  </>),
  chevronDown: (<path d="m6 9.5 6 6 6-6" />),
  chevronUp: (<path d="m6 14.5 6-6 6 6" />),
  pen: (<><path d="M4 20l1.2-4.6L15.8 4.8a2.2 2.2 0 0 1 3.1 3.1L8.3 18.5z" /><A d="m13.5 7 3.5 3.5" /></>),
  loader: (<><path d="M12 3.5a8.5 8.5 0 1 1-8.5 8.5" style={{ opacity: 0.35 }} /><A d="M3.5 12A8.5 8.5 0 0 1 12 3.5" /></>),
  layers: (<>
    <path d="M12 3.5 3 8l9 4.5L21 8z" /><path d="m3 12 9 4.5 9-4.5" /><A d="m3 16 9 4.5 9-4.5" />
  </>),
} satisfies Record<string, React.ReactNode>;

export type IconName = keyof typeof GLYPHS;

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Accessible name. Omit for decorative icons, which are then hidden from screen readers. */
  label?: string;
}

export default function Icon({ name, size = 24, strokeWidth = 1.4, className, style, label }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, ...style }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}

/** Icon inside the house tile: hairline gold frame on a near-black square. */
export function IconTile({ name, size = 52, iconSize, className }: { name: IconName; size?: number; iconSize?: number; className?: string }) {
  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Math.round(size * 0.24),
        border: '1px solid rgba(197,160,89,0.22)',
        background: 'linear-gradient(160deg, rgba(197,160,89,0.10), rgba(197,160,89,0.02))',
        color: '#EAEAEA',
        flexShrink: 0,
      }}
    >
      <Icon name={name} size={iconSize ?? Math.round(size * 0.48)} />
    </span>
  );
}

/** Typographic country tag used instead of flag emoji, which many systems render as letters anyway. */
export function CountryTag({ code }: { code: string }) {
  return (
    <span
      className="font-space"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 28,
        height: 20,
        padding: '0 6px',
        border: '1px solid rgba(197,160,89,0.35)',
        borderRadius: 4,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.08em',
        color: '#C5A059',
        lineHeight: 1,
      }}
    >
      {code}
    </span>
  );
}
