export type TabType = 
  | 'dashboard'
  | 'roadmap'
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'reading'
  | 'errors'
  | 'stats';

export type VocabTopic = 
  | 'chao-hoi'
  | 'so-dem-thoi-gian'
  | 'gia-dinh'
  | 'do-an-uong'
  | 'mua-sam'
  | 'giao-thong-dia-diem'
  | 'thoi-tiet-doi-song'
  | 'truong-hoc-cong-viec';

export type VocabStatus = 'unlearned' | 'learning' | 'mastered';

export interface VocabWord {
  id: string;
  korean: string;
  vietnamese: string;
  hanja?: string;
  partOfSpeech: 'Danh từ' | 'Động từ' | 'Tính từ' | 'Phó từ' | 'Đại từ' | 'Cụm từ';
  topic: VocabTopic;
  week: number;
  pronunciation?: string;
  exampleKorean: string;
  exampleVietnamese: string;
  notes?: string;
}

export interface GrammarQuiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GrammarLesson {
  id: string;
  week: number;
  pattern: string;
  title: string;
  vietnameseMeaning: string;
  explanation: string;
  formationRules: {
    rule: string;
    description: string;
    example: string;
  }[];
  examples: {
    korean: string;
    vietnamese: string;
  }[];
  commonMistakes: string;
  quizzes: GrammarQuiz[];
}

export interface PracticeQuestion {
  id: string;
  type: 'listening' | 'reading';
  category: string; // e.g. "Biển báo", "Điền từ", "Hội thoại"
  week: number;
  title: string;
  passage?: string; // Text or dialog script
  audioScript?: string; // Dialogue for TTS
  audioSpeaker?: string; // e.g., "Nam & Nữ"
  hasVisual?: boolean;
  visualNotice?: {
    header: string;
    body: string[];
    subtext?: string;
    badge?: string;
  };
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface RoadmapLesson {
  id: string;
  title: string;
  summary: string;
  objectives: string[];
  estimatedMinutes: number;
  targetTab: TabType;
  targetId?: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  koreanTheme: string;
  focus: string;
  description: string;
  objectives: string[];
  lessons: RoadmapLesson[];
}

export interface ErrorItem {
  id: string; // Question id
  type: 'grammar' | 'listening' | 'reading';
  questionTitle: string;
  questionPrompt: string;
  userAnswerIndex: number;
  correctAnswerIndex: number;
  options: string[];
  explanation: string;
  timestamp: number;
  retryCount: number;
  sourceLessonId?: string;
}

export interface UserProgress {
  currentWeek: number;
  dailyGoalMinutes: number;
  todayMinutes: number;
  lastActiveDate: string; // YYYY-MM-DD
  streakDays: number;
  completedLessonIds: string[];
  vocabStatus: Record<string, VocabStatus>; // wordId -> status
  vocabReviewDue: string[]; // wordIds flagged for review
  completedGrammarQuizIds: Record<string, number>; // quizId -> score
  completedPracticeIds: Record<string, boolean>; // questionId -> isCorrect
  errorNotebook: ErrorItem[];
  dailyStudyLogs: { date: string; minutes: number }[];
}
