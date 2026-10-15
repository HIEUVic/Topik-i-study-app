import { UserProgress, ErrorItem, VocabStatus } from '../types';

const STORAGE_KEY = 'topik1_8week_user_progress_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  currentWeek: 1,
  dailyGoalMinutes: 120,
  todayMinutes: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakDays: 1,
  completedLessonIds: [],
  vocabStatus: {},
  vocabReviewDue: [],
  completedGrammarQuizIds: {},
  completedPracticeIds: {},
  errorNotebook: [],
  dailyStudyLogs: [
    { date: new Date().toISOString().split('T')[0], minutes: 0 }
  ]
};

/**
 * Load user progress with validation and graceful fallback
 */
export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initializeFreshDate(DEFAULT_PROGRESS);
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return initializeFreshDate(DEFAULT_PROGRESS);
    }

    const today = new Date().toISOString().split('T')[0];
    const progress: UserProgress = {
      currentWeek: typeof parsed.currentWeek === 'number' && parsed.currentWeek >= 1 && parsed.currentWeek <= 8 ? parsed.currentWeek : 1,
      dailyGoalMinutes: parsed.dailyGoalMinutes || 120,
      todayMinutes: parsed.lastActiveDate === today ? (Number(parsed.todayMinutes) || 0) : 0,
      lastActiveDate: today,
      streakDays: calculateStreak(parsed.lastActiveDate, Number(parsed.streakDays) || 1, today),
      completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [],
      vocabStatus: parsed.vocabStatus && typeof parsed.vocabStatus === 'object' ? parsed.vocabStatus : {},
      vocabReviewDue: Array.isArray(parsed.vocabReviewDue) ? parsed.vocabReviewDue : [],
      completedGrammarQuizIds: parsed.completedGrammarQuizIds && typeof parsed.completedGrammarQuizIds === 'object' ? parsed.completedGrammarQuizIds : {},
      completedPracticeIds: parsed.completedPracticeIds && typeof parsed.completedPracticeIds === 'object' ? parsed.completedPracticeIds : {},
      errorNotebook: Array.isArray(parsed.errorNotebook) ? parsed.errorNotebook : [],
      dailyStudyLogs: Array.isArray(parsed.dailyStudyLogs) ? parsed.dailyStudyLogs : []
    };

    // Ensure today's date exists in study logs
    const logIndex = progress.dailyStudyLogs.findIndex(log => log.date === today);
    if (logIndex === -1) {
      progress.dailyStudyLogs.push({ date: today, minutes: progress.todayMinutes });
    }

    saveUserProgress(progress);
    return progress;
  } catch (err) {
    console.error('Failed to load progress from localStorage:', err);
    return initializeFreshDate(DEFAULT_PROGRESS);
  }
}

function calculateStreak(lastActiveDate: string | undefined, previousStreak: number, today: string): number {
  if (!lastActiveDate) return 1;
  if (lastActiveDate === today) return Math.max(1, previousStreak);

  const last = new Date(lastActiveDate);
  const now = new Date(today);
  const diffTime = Math.abs(now.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return previousStreak + 1; // Consecutive day!
  } else if (diffDays > 1) {
    return 1; // Streak reset
  }
  return previousStreak;
}

function initializeFreshDate(base: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  return {
    ...base,
    lastActiveDate: today,
    todayMinutes: 0,
    dailyStudyLogs: [{ date: today, minutes: 0 }]
  };
}

/**
 * Save user progress safely
 */
export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

/**
 * Reset progress with confirmation
 */
export function resetUserProgress(): UserProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to remove progress:', err);
  }
  const fresh = initializeFreshDate(DEFAULT_PROGRESS);
  saveUserProgress(fresh);
  return fresh;
}

/**
 * Export progress data as JSON file
 */
export function exportProgressJSON(progress: UserProgress): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `topik1_study_progress_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Update study minutes
 */
export function logStudyMinutes(minutes: number, currentProgress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const newTodayMinutes = currentProgress.todayMinutes + minutes;
  
  const updatedLogs = [...currentProgress.dailyStudyLogs];
  const todayIndex = updatedLogs.findIndex(l => l.date === today);
  if (todayIndex >= 0) {
    updatedLogs[todayIndex] = { date: today, minutes: updatedLogs[todayIndex].minutes + minutes };
  } else {
    updatedLogs.push({ date: today, minutes: newTodayMinutes });
  }

  const updated: UserProgress = {
    ...currentProgress,
    todayMinutes: newTodayMinutes,
    dailyStudyLogs: updatedLogs
  };

  saveUserProgress(updated);
  return updated;
}

/**
 * Add or update an error item
 */
export function recordErrorItem(item: Omit<ErrorItem, 'timestamp' | 'retryCount'>, currentProgress: UserProgress): UserProgress {
  const existingIndex = currentProgress.errorNotebook.findIndex(e => e.id === item.id);
  let updatedNotebook = [...currentProgress.errorNotebook];

  if (existingIndex >= 0) {
    updatedNotebook[existingIndex] = {
      ...updatedNotebook[existingIndex],
      userAnswerIndex: item.userAnswerIndex,
      timestamp: Date.now(),
      retryCount: updatedNotebook[existingIndex].retryCount + 1
    };
  } else {
    updatedNotebook.unshift({
      ...item,
      timestamp: Date.now(),
      retryCount: 0
    });
  }

  const updated: UserProgress = {
    ...currentProgress,
    errorNotebook: updatedNotebook
  };
  saveUserProgress(updated);
  return updated;
}

/**
 * Remove an error item upon successful retry
 */
export function removeErrorItem(id: string, currentProgress: UserProgress): UserProgress {
  const updatedNotebook = currentProgress.errorNotebook.filter(e => e.id !== id);
  const updated: UserProgress = {
    ...currentProgress,
    errorNotebook: updatedNotebook
  };
  saveUserProgress(updated);
  return updated;
}
