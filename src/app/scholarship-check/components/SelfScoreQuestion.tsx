'use client';

import { useState, useCallback, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import type { Question, Answer } from '../types';
import { SELF_SCORE_LABELS } from '../constants';

interface SelfScoreQuestionProps {
  question: Question;
  answer?: Answer;
  onAnswer: (answer: Answer) => void;
}

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export default function SelfScoreQuestion({ question, answer, onAnswer }: SelfScoreQuestionProps) {
  const [selectedScore, setSelectedScore] = useState<number | undefined>(answer?.selfScore);
  const [textValue, setTextValue] = useState<string>(answer?.textAnswer || '');
  const [showHelp, setShowHelp] = useState(false);

  const minWords = question.minWords ?? 80;
  const maxWords = question.maxWords ?? 300;
  const wordCount = useMemo(() => countWords(textValue), [textValue]);

  const wordCountClass = useMemo(() => {
    if (wordCount > maxWords) return 'sc-word-count over';
    if (wordCount >= minWords) return 'sc-word-count met';
    if (wordCount >= minWords * 0.75) return 'sc-word-count warning';
    return 'sc-word-count';
  }, [wordCount, minWords, maxWords]);

  const emitAnswer = useCallback(
    (score: number | undefined, text: string) => {
      onAnswer({
        questionId: question.id,
        type: 'self-score-text',
        selfScore: score,
        textAnswer: text,
        value: text,
      });
    },
    [onAnswer, question.id],
  );

  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
    emitAnswer(score, textValue);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setTextValue(newText);
    emitAnswer(selectedScore, newText);
  };

  const isValid = selectedScore !== undefined && wordCount >= minWords && wordCount <= maxWords;

  return (
    <div className="sc-question-card">
      {/* Question text */}
      <div className="sc-question-text">
        {question.text}
        {question.required !== false && <span className="sc-required">*</span>}
        {question.helpText && (
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '8px',
              color: 'var(--muted)',
              verticalAlign: 'middle',
            }}
            aria-label="Show help"
          >
            <HelpCircle size={18} />
          </button>
        )}
      </div>

      {/* Help text */}
      {showHelp && question.helpText && (
        <p className="sc-help-text" style={{ marginBottom: '16px' }}>
          {question.helpText}
        </p>
      )}

      {/* Self-score selector — appears first */}
      <div style={{ marginBottom: '24px' }}>
        <label className="sc-label" style={{ marginBottom: '10px', display: 'block' }}>
          Rate yourself
        </label>
        <div className="sc-self-score">
          {([1, 2, 3, 4] as const).map((score) => (
            <button
              key={score}
              type="button"
              className={`sc-self-score-option ${selectedScore === score ? 'selected' : ''}`}
              onClick={() => handleScoreSelect(score)}
            >
              <div className="score-number">{score}</div>
              <span className="sc-self-score-label">{SELF_SCORE_LABELS[score]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text area with word count */}
      <div className="sc-form-group">
        <label className="sc-label">
          Your answer
          <span className="sc-required">*</span>
        </label>
        <textarea
          className="sc-textarea"
          value={textValue}
          onChange={handleTextChange}
          placeholder="Provide a specific example with a clear outcome…"
          rows={6}
        />
        <div className={wordCountClass}>
          {wordCount} / {maxWords} words
          {wordCount < minWords && (
            <span style={{ marginLeft: '8px' }}>
              (min {minWords} required)
            </span>
          )}
        </div>
      </div>

      {/* Validation hint */}
      {!isValid && (selectedScore !== undefined || wordCount > 0) && (
        <div className="sc-error" style={{ marginTop: '4px' }}>
          {selectedScore === undefined && '• Select a score'}
          {selectedScore !== undefined && wordCount < minWords && (
            <>• Write at least {minWords} words ({minWords - wordCount} more needed)</>
          )}
          {wordCount > maxWords && <>• Exceeds maximum of {maxWords} words</>}
        </div>
      )}
    </div>
  );
}
