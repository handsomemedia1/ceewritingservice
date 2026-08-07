const STORAGE_KEY = 'cwds_scholarship_progress';

export interface ScholarshipProgress {
  track: string;
  currentStep: number;
  answers: Record<string, any>;
  lastUpdated: number;
}

export function saveProgress(data: ScholarshipProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save scholarship progress:', error);
  }
}

export function loadProgress(): ScholarshipProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load scholarship progress:', error);
    return null;
  }
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
