'use client';

import { openConsentPreferences } from '@/lib/consent';

/** Lets visitors change or withdraw consent as easily as they gave it (NDPA s.26(3)). */
export default function CookieSettingsButton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, ...style }}>
      Cookie settings
    </button>
  );
}
