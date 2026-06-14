'use client';

import { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type { EligibilityStatus } from '../types';

interface EligibilityBadgeProps {
  status: EligibilityStatus;
  text: string;
  reasons?: string[];
}

const statusConfig: Record<EligibilityStatus, {
  icon: typeof CheckCircle;
  className: string;
}> = {
  eligible: { icon: CheckCircle, className: 'sc-badge sc-badge-green' },
  'possible-issue': { icon: AlertTriangle, className: 'sc-badge sc-badge-yellow' },
  ineligible: { icon: XCircle, className: 'sc-badge sc-badge-red' },
};

export default function EligibilityBadge({ status, text, reasons }: EligibilityBadgeProps) {
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[status];
  const Icon = config.icon;
  const hasReasons = reasons && reasons.length > 0;

  return (
    <div>
      <button
        type="button"
        className={config.className}
        onClick={() => hasReasons && setExpanded(!expanded)}
        style={{
          cursor: hasReasons ? 'pointer' : 'default',
          border: 'none',
          ...(hasReasons ? {} : {}),
        }}
        aria-expanded={hasReasons ? expanded : undefined}
      >
        <Icon size={15} strokeWidth={2.5} />
        <span>{text}</span>
        {hasReasons && (
          expanded
            ? <ChevronUp size={14} />
            : <ChevronDown size={14} />
        )}
      </button>

      {expanded && hasReasons && (
        <ul className="sc-badge-reasons">
          {reasons.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
