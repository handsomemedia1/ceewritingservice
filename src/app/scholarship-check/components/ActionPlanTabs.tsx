'use client';

import { useState } from 'react';
import type { ActionPlan, ActionItem } from '../types';

interface ActionPlanTabsProps {
  plan: ActionPlan;
}

const TABS = [
  { key: 'thirtyDays' as const, label: '30 Days' },
  { key: 'sixtyDays' as const, label: '60 Days' },
  { key: 'ninetyDays' as const, label: '90 Days' },
];

function ActionItemRow({ item, index }: { item: ActionItem; index: number }) {
  return (
    <div className="sc-action-item">
      <div className="sc-action-number">{index + 1}</div>
      <div className="sc-action-content">
        <p className="sc-action-task">{item.task}</p>
        <div className="sc-action-meta">
          <span className="sc-action-category">{item.category}</span>
          <span className={`sc-action-priority ${item.priority.toLowerCase()}`}>
            {item.priority}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ActionPlanTabs({ plan }: ActionPlanTabsProps) {
  const [activeTab, setActiveTab] = useState<keyof ActionPlan>('thirtyDays');
  const items = plan[activeTab];

  return (
    <div>
      {/* Tabs */}
      <div className="sc-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`sc-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="sc-tab-content">
        {items.length === 0 ? (
          <p style={{
            textAlign: 'center',
            color: 'var(--muted)',
            padding: '32px 0',
            fontSize: '14px',
          }}>
            No action items for this period — you are on track! 🎉
          </p>
        ) : (
          items.map((item, i) => (
            <ActionItemRow key={i} item={item} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
