import React from 'react';
import Icon, { type IconName } from './Icon';

export { default as Icon, IconTile, CountryTag, type IconName } from './Icon';

interface GlyphProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Named glyph components with the same props as the previous icon library, so call sites stay unchanged. */
function glyph(name: IconName) {
  function Glyph({ size = 24, strokeWidth = 1.4, color, className, style }: GlyphProps) {
    return <Icon name={name} size={size} strokeWidth={Math.min(strokeWidth, 2)} className={className} style={color ? { color, ...style } : style} />;
  }
  Glyph.displayName = `Glyph(${name})`;
  return Glyph;
}

export const TrendingUp = glyph('trendUp');
export const TrendingDown = glyph('trendDown');
export const Minus = glyph('minus');
export const Plus = glyph('plus');
export const CheckCircle = glyph('checkCircle');
export const XCircle = glyph('crossCircle');
export const AlertTriangle = glyph('warning');
export const ChevronDown = glyph('chevronDown');
export const ChevronUp = glyph('chevronUp');
export const ArrowRight = glyph('arrowRight');
export const Repeat = glyph('repeat');
export const Check = glyph('check');
export const HelpCircle = glyph('help');
export const Clock = glyph('clock');
export const Trash2 = glyph('trash');
export const ShoppingCart = glyph('bag');
export const Package = glyph('package');
export const X = glyph('cross');
export const Send = glyph('send');
export const FileText = glyph('document');
export const PenTool = glyph('pen');
export const Search = glyph('search');
export const BarChart3 = glyph('chart');
export const BookOpen = glyph('book');
export const Download = glyph('download');
export const Loader2 = glyph('loader');
