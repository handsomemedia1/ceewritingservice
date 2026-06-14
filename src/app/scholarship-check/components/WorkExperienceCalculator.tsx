'use client';

import { useState, useMemo, useCallback } from 'react';
import { Plus, Trash2, AlertTriangle, Clock } from 'lucide-react';
import type { EmploymentPeriod } from '../types';
import { CHEVENING_HOURS_THRESHOLD, CHEVENING_MAX_EMPLOYMENT_PERIODS } from '../constants';

interface WorkExperienceCalculatorProps {
  periods: EmploymentPeriod[];
  onAdd: (period: EmploymentPeriod) => void;
  onRemove: (id: string) => void;
  onUpdate: (period: EmploymentPeriod) => void;
}

const EMPLOYMENT_TYPES = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'voluntary', label: 'Voluntary' },
  { value: 'self-employed', label: 'Self-employed' },
  { value: 'internship', label: 'Internship' },
];

function calculateHours(startDate: string, endDate: string, hoursPerWeek: number): number {
  if (!startDate || !endDate || !hoursPerWeek) return 0;
  const start = new Date(startDate + '-01');
  const end = new Date(endDate + '-01');
  if (end <= start) return 0;
  const diffMs = end.getTime() - start.getTime();
  const weeks = diffMs / (1000 * 60 * 60 * 24 * 7);
  return Math.round(weeks * hoursPerWeek);
}

function generateId(): string {
  return `ep_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

const emptyPeriod: Omit<EmploymentPeriod, 'id'> = {
  startDate: '',
  endDate: '',
  hoursPerWeek: 40,
  type: 'full-time',
  duringUndergrad: false,
};

export default function WorkExperienceCalculator({
  periods,
  onAdd,
  onRemove,
}: WorkExperienceCalculatorProps) {
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<Omit<EmploymentPeriod, 'id'>>(emptyPeriod);

  const totalHours = useMemo(
    () => periods.reduce((sum, p) => sum + calculateHours(p.startDate, p.endDate, p.hoursPerWeek), 0),
    [periods],
  );

  const meetsThreshold = totalHours >= CHEVENING_HOURS_THRESHOLD;
  const diff = Math.abs(totalHours - CHEVENING_HOURS_THRESHOLD);
  const canAddMore = periods.length < CHEVENING_MAX_EMPLOYMENT_PERIODS;

  const handleSubmit = useCallback(() => {
    if (!draft.startDate || !draft.endDate || !draft.hoursPerWeek) return;
    onAdd({ ...draft, id: generateId() });
    setDraft(emptyPeriod);
    setShowForm(false);
  }, [draft, onAdd]);

  const draftHours = calculateHours(draft.startDate, draft.endDate, draft.hoursPerWeek);

  return (
    <div className="sc-calculator">
      <h4 className="sc-calculator-header">
        <Clock size={22} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
        Work Experience Calculator
      </h4>

      {/* Period list */}
      {periods.map((period) => {
        const hours = calculateHours(period.startDate, period.endDate, period.hoursPerWeek);
        return (
          <div key={period.id} className="sc-period-card">
            <div className="sc-period-info">
              <div className="sc-period-dates">
                {period.startDate} → {period.endDate}
              </div>
              <div className="sc-period-details">
                {EMPLOYMENT_TYPES.find(t => t.value === period.type)?.label || period.type}
                {' · '}
                {period.hoursPerWeek} hrs/week
              </div>
              {period.duringUndergrad && (
                <div className="sc-period-undergrad-warning">
                  <AlertTriangle size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                  During undergraduate studies
                </div>
              )}
            </div>
            <div className="sc-period-hours">
              {hours.toLocaleString()} hrs
            </div>
            <button
              type="button"
              className="sc-period-remove"
              onClick={() => onRemove(period.id)}
              aria-label="Remove period"
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      })}

      {/* Add form */}
      {showForm && (
        <div className="sc-add-form">
          <div className="sc-add-form-grid">
            <div className="sc-form-group">
              <label className="sc-label">Start date</label>
              <input
                type="month"
                className="sc-input"
                value={draft.startDate}
                onChange={(e) => setDraft({ ...draft, startDate: e.target.value })}
              />
            </div>
            <div className="sc-form-group">
              <label className="sc-label">End date</label>
              <input
                type="month"
                className="sc-input"
                value={draft.endDate}
                onChange={(e) => setDraft({ ...draft, endDate: e.target.value })}
              />
            </div>
            <div className="sc-form-group">
              <label className="sc-label">Hours per week</label>
              <input
                type="number"
                className="sc-input"
                min={1}
                max={80}
                value={draft.hoursPerWeek}
                onChange={(e) => setDraft({ ...draft, hoursPerWeek: Number(e.target.value) || 0 })}
              />
            </div>
            <div className="sc-form-group">
              <label className="sc-label">Employment type</label>
              <select
                className="sc-select"
                value={draft.type}
                onChange={(e) =>
                  setDraft({ ...draft, type: e.target.value as EmploymentPeriod['type'] })
                }
              >
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="sc-checkbox" style={{ marginTop: '12px' }}>
            <input
              type="checkbox"
              checked={draft.duringUndergrad}
              onChange={(e) => setDraft({ ...draft, duringUndergrad: e.target.checked })}
            />
            This employment was during my undergraduate studies
          </label>

          {draftHours > 0 && (
            <p className="sc-help-text" style={{ marginTop: '10px' }}>
              This period = <strong>{draftHours.toLocaleString()} hours</strong>
            </p>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button type="button" className="sc-btn-primary" onClick={handleSubmit}>
              <span>Add Period</span>
            </button>
            <button
              type="button"
              className="sc-btn-secondary"
              onClick={() => { setShowForm(false); setDraft(emptyPeriod); }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add button */}
      {!showForm && canAddMore && (
        <button
          type="button"
          className="sc-period-add"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add employment period
          {periods.length > 0 && (
            <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '12px' }}>
              ({periods.length}/{CHEVENING_MAX_EMPLOYMENT_PERIODS})
            </span>
          )}
        </button>
      )}

      {!canAddMore && (
        <p className="sc-help-text" style={{ textAlign: 'center', marginTop: '12px' }}>
          Maximum of {CHEVENING_MAX_EMPLOYMENT_PERIODS} periods reached
        </p>
      )}

      {/* Total display */}
      {periods.length > 0 && (
        <div className={`sc-period-total ${meetsThreshold ? 'meets-threshold' : 'below-threshold'}`}>
          <div
            className="sc-period-total-number"
            style={{ color: meetsThreshold ? '#10b981' : '#ef4444' }}
          >
            {totalHours.toLocaleString()}
          </div>
          <div className="sc-period-total-label" style={{ color: 'var(--text)' }}>
            total hours
          </div>
          <div
            className="sc-period-total-label"
            style={{
              marginTop: '6px',
              color: meetsThreshold ? '#059669' : '#dc2626',
              fontWeight: 700,
            }}
          >
            {meetsThreshold
              ? `✓ ${diff.toLocaleString()} hours above the ${CHEVENING_HOURS_THRESHOLD.toLocaleString()} requirement`
              : `✗ ${diff.toLocaleString()} hours short of ${CHEVENING_HOURS_THRESHOLD.toLocaleString()} requirement`
            }
          </div>
        </div>
      )}
    </div>
  );
}
