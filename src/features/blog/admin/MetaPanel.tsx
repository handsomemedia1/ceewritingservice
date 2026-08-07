'use client';
import React from 'react';
import { Loader2 } from 'lucide-react';

const TOPIC_PILLARS = [
  'Research', 'Research Methodology', 'Data Analysis',
  'Scholarships', 'Academic Writing', 'Career Development',
  'Graduate School', 'Professional Skills',
];

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

interface MetaPanelProps {
  topicPillar: string;
  setTopicPillar: (v: string) => void;
  subtopic: string;
  setSubtopic: (v: string) => void;
  difficulty: string;
  setDifficulty: (v: string) => void;
  learningPath: string;
  setLearningPath: (v: string) => void;
  executiveSummary: string;
  setExecutiveSummary: (v: string) => void;
  referencesList: string;
  setReferencesList: (v: string) => void;
}

export default function MetaPanel({
  topicPillar, setTopicPillar,
  subtopic, setSubtopic,
  difficulty, setDifficulty,
  learningPath, setLearningPath,
  executiveSummary, setExecutiveSummary,
  referencesList, setReferencesList,
}: MetaPanelProps) {
  const inputClass = 'w-full px-3 py-2.5 rounded-lg border border-green-dark/10 text-sm outline-none focus:border-green-dark/20 transition-colors';
  const labelClass = 'block text-xs font-bold text-green-dark mb-1.5 uppercase tracking-wider';

  return (
    <div className="bg-white rounded-2xl border border-green-dark/8 p-5 space-y-4">
      <h3 className="font-bold text-green-dark text-sm flex items-center gap-2">
        <span>🏛️</span> Knowledge Hub Classification
      </h3>

      <div>
        <label className={labelClass}>Topic Pillar</label>
        <select value={topicPillar} onChange={(e) => setTopicPillar(e.target.value)}
          className={inputClass}>
          <option value="">— Select Pillar —</option>
          {TOPIC_PILLARS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass}>Subtopic</label>
        <input type="text" value={subtopic} onChange={(e) => setSubtopic(e.target.value)}
          placeholder="e.g. Sampling Techniques" className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Difficulty</label>
        <div className="flex gap-2">
          {DIFFICULTIES.map((d) => (
            <button key={d} type="button"
              onClick={() => setDifficulty(d)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                difficulty === d
                  ? 'bg-green-dark text-white border-green-dark'
                  : 'bg-white text-green-dark border-green-dark/15 hover:border-green-dark/40'
              }`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Learning Path</label>
        <input type="text" value={learningPath} onChange={(e) => setLearningPath(e.target.value)}
          placeholder="e.g. Research Fundamentals" className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Executive Summary</label>
        <textarea value={executiveSummary} onChange={(e) => setExecutiveSummary(e.target.value)}
          placeholder="A 1-2 sentence summary shown at the top of the article..." rows={3}
          className={`${inputClass} resize-none`} />
      </div>

      <div>
        <label className={labelClass}>References & Further Reading</label>
        <textarea value={referencesList} onChange={(e) => setReferencesList(e.target.value)}
          placeholder="One reference per line..." rows={4}
          className={`${inputClass} resize-none text-xs leading-relaxed`} />
      </div>
    </div>
  );
}
