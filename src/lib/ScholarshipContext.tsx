"use client";

/* ============================================================
   Scholarship Readiness Checker — React Context
   State management with useReducer + sessionStorage persistence
   ============================================================ */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

import type {
  AssessmentState,
  AssessmentAction,
  Answer,
  AIEvaluation,
  OnboardingProfile,
  TrackId,
  ScoreResult,
  EmploymentPeriod,
} from '../app/scholarship-check/types';

// ── Session storage key ──
const STORAGE_KEY = 'cee-scholarship-assessment';

// ── Initial state ──
const initialState: AssessmentState = {
  profile: null,
  selectedTrack: null,
  currentSectionIndex: 0,
  answers: {},
  aiEvaluations: {},
  gatePassed: true,
  gateFailedAt: undefined,
  employmentPeriods: [],
  results: null,
  isLoading: false,
  leadId: null,
};

// ── Reducer ──
function assessmentReducer(
  state: AssessmentState,
  action: AssessmentAction,
): AssessmentState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };

    case 'SET_LEAD_ID':
      return { ...state, leadId: action.payload };

    case 'SELECT_TRACK':
      return {
        ...state,
        selectedTrack: action.payload,
        currentSectionIndex: 0,
        answers: {},
        aiEvaluations: {},
        gatePassed: true,
        gateFailedAt: undefined,
        employmentPeriods: [],
        results: null,
      };

    case 'SET_SECTION':
      return { ...state, currentSectionIndex: action.payload };

    case 'SAVE_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload,
        },
      };

    case 'SET_AI_EVALUATION':
      return {
        ...state,
        aiEvaluations: {
          ...state.aiEvaluations,
          [action.payload.questionId]: action.payload.evaluation,
        },
      };

    case 'GATE_FAILED':
      return {
        ...state,
        gatePassed: false,
        gateFailedAt: action.payload,
      };

    case 'GATE_PASSED':
      return {
        ...state,
        gatePassed: true,
        gateFailedAt: undefined,
      };

    case 'ADD_EMPLOYMENT_PERIOD':
      return {
        ...state,
        employmentPeriods: [...state.employmentPeriods, action.payload],
      };

    case 'REMOVE_EMPLOYMENT_PERIOD':
      return {
        ...state,
        employmentPeriods: state.employmentPeriods.filter(
          p => p.id !== action.payload,
        ),
      };

    case 'UPDATE_EMPLOYMENT_PERIOD':
      return {
        ...state,
        employmentPeriods: state.employmentPeriods.map(p =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case 'SET_RESULTS':
      return { ...state, results: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

// ── Context shape ──
interface ScholarshipContextValue {
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;

  /* Convenience actions */
  setProfile: (profile: OnboardingProfile) => void;
  selectTrack: (track: TrackId) => void;
  saveAnswer: (answer: Answer) => void;
  setAIEvaluation: (questionId: string, evaluation: AIEvaluation) => void;
  gateFailed: (questionId: string) => void;
  gatePassed: () => void;
  setSection: (index: number) => void;
  nextSection: () => void;
  prevSection: () => void;
  addEmploymentPeriod: (period: EmploymentPeriod) => void;
  removeEmploymentPeriod: (id: string) => void;
  updateEmploymentPeriod: (period: EmploymentPeriod) => void;
  setResults: (results: ScoreResult) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const ScholarshipContext = createContext<ScholarshipContextValue | undefined>(
  undefined,
);

// ── Hydrate from sessionStorage ──
function loadPersistedState(): AssessmentState {
  if (typeof window === 'undefined') return initialState;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AssessmentState;
      // Ensure all fields exist (forward-compatibility)
      return { ...initialState, ...parsed };
    }
  } catch {
    // Corrupted data — start fresh
    sessionStorage.removeItem(STORAGE_KEY);
  }
  return initialState;
}

// ── Provider ──
export function ScholarshipProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState, loadPersistedState);

  // Persist to sessionStorage on every state change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // sessionStorage full or unavailable — silently fail
    }
  }, [state]);

  // ── Convenience wrappers ──
  const setProfile = useCallback(
    (profile: OnboardingProfile) => dispatch({ type: 'SET_PROFILE', payload: profile }),
    [],
  );
  const selectTrack = useCallback(
    (track: TrackId) => dispatch({ type: 'SELECT_TRACK', payload: track }),
    [],
  );
  const saveAnswer = useCallback(
    (answer: Answer) => dispatch({ type: 'SAVE_ANSWER', payload: answer }),
    [],
  );
  const setAIEvaluation = useCallback(
    (questionId: string, evaluation: AIEvaluation) =>
      dispatch({ type: 'SET_AI_EVALUATION', payload: { questionId, evaluation } }),
    [],
  );
  const gateFailed = useCallback(
    (questionId: string) => dispatch({ type: 'GATE_FAILED', payload: questionId }),
    [],
  );
  const gatePassedFn = useCallback(
    () => dispatch({ type: 'GATE_PASSED' }),
    [],
  );
  const setSection = useCallback(
    (index: number) => dispatch({ type: 'SET_SECTION', payload: index }),
    [],
  );
  const nextSection = useCallback(
    () => dispatch({ type: 'SET_SECTION', payload: state.currentSectionIndex + 1 }),
    [state.currentSectionIndex],
  );
  const prevSection = useCallback(
    () => dispatch({ type: 'SET_SECTION', payload: Math.max(0, state.currentSectionIndex - 1) }),
    [state.currentSectionIndex],
  );
  const addEmploymentPeriod = useCallback(
    (period: EmploymentPeriod) => dispatch({ type: 'ADD_EMPLOYMENT_PERIOD', payload: period }),
    [],
  );
  const removeEmploymentPeriod = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_EMPLOYMENT_PERIOD', payload: id }),
    [],
  );
  const updateEmploymentPeriod = useCallback(
    (period: EmploymentPeriod) => dispatch({ type: 'UPDATE_EMPLOYMENT_PERIOD', payload: period }),
    [],
  );
  const setResults = useCallback(
    (results: ScoreResult) => dispatch({ type: 'SET_RESULTS', payload: results }),
    [],
  );
  const setLoading = useCallback(
    (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    [],
  );
  const reset = useCallback(
    () => {
      dispatch({ type: 'RESET' });
      try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
    },
    [],
  );

  return (
    <ScholarshipContext.Provider
      value={{
        state,
        dispatch,
        setProfile,
        selectTrack,
        saveAnswer,
        setAIEvaluation,
        gateFailed,
        gatePassed: gatePassedFn,
        setSection,
        nextSection,
        prevSection,
        addEmploymentPeriod,
        removeEmploymentPeriod,
        updateEmploymentPeriod,
        setResults,
        setLoading,
        reset,
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
}

// ── Hook ──
export function useScholarship(): ScholarshipContextValue {
  const ctx = useContext(ScholarshipContext);
  if (!ctx) {
    throw new Error(
      'useScholarship must be used inside a <ScholarshipProvider>. ' +
      'Wrap your scholarship pages with <ScholarshipProvider> in the layout.',
    );
  }
  return ctx;
}
