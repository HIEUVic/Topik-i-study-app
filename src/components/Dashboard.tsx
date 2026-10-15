import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  BookOpen, 
  Flame, 
  Clock, 
  Sparkles, 
  Headphones, 
  BookText, 
  BookA, 
  AlertCircle,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { TabType, UserProgress } from '../types';
import { ROADMAP_DATA } from '../data/roadmapData';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { GRAMMAR_DATA } from '../data/grammarData';
import { PRACTICE_QUESTIONS } from '../data/practiceData';

interface DashboardProps {
  progress: UserProgress;
  onNavigate: (tab: TabType) => void;
  onAddMinutes: (mins: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onNavigate,
  onAddMinutes
}) => {
  // Real calculations
  const totalRoadmapLessons = ROADMAP_DATA.reduce((acc, w) => acc + w.lessons.length, 0); // 32
  const completedLessonsCount = progress.completedLessonIds.length;
  const overallPercent = Math.round((completedLessonsCount / totalRoadmapLessons) * 100);

  const totalVocab = VOCABULARY_DATA.length;
  const masteredVocabCount = Object.values(progress.vocabStatus).filter(s => s === 'mastered').length;
  const learningVocabCount = Object.values(progress.vocabStatus).filter(s => s === 'learning').length;
  const dueReviewCount = progress.vocabReviewDue.length;

  const totalGrammar = GRAMMAR_DATA.length;
  const completedGrammarCount = Object.keys(progress.completedGrammarQuizIds).length;

  const listeningQuestions = PRACTICE_QUESTIONS.filter(q => q.type === 'listening');
  const readingQuestions = PRACTICE_QUESTIONS.filter(q => q.type === 'reading');
  const completedListening = listeningQuestions.filter(q => progress.completedPracticeIds[q.id] !== undefined).length;
  const completedReading = readingQuestions.filter(q => progress.completedPracticeIds[q.id] !== undefined).length;

  const currentWeekData = ROADMAP_DATA.find(w => w.weekNumber === progress.currentWeek) || ROADMAP_DATA[0];

  // Today's tasks evaluation
  const taskMinutesDone = progress.todayMinutes >= progress.dailyGoalMinutes;
  const taskVocabDone = masteredVocabCount > 0 || learningVocabCount >= 5;
  const taskGrammarDone = completedGrammarCount > 0;
  const taskPracticeDone = (completedListening + completedReading) > 0;

  const dailyGoalPercent = Math.min(100, Math.round((progress.todayMinutes / progress.dailyGoalMinutes) * 100));

  return (
    <div className="space-y-6">
      {/* Welcome & Primary CTA Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-indigo-200 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Lộ trình chinh phục TOPIK I — Level 2 (140+ Điểm)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Chào mừng bạn đến với {currentWeekData.title}
          </h1>
          <p className="mt-2 text-indigo-100 text-sm sm:text-base leading-relaxed">
            {currentWeekData.focus}. Tiếp tục hoàn thành các bài học hôm nay để giữ vững chuỗi học {progress.streakDays} ngày liên tiếp.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('roadmap')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition shadow-sm"
            >
              <span>Tiếp tục học Tuần {progress.currentWeek}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('vocabulary')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition backdrop-blur-xs"
            >
              <BookA className="w-4 h-4 text-indigo-200" />
              <span>Luyện 10 từ vựng</span>
            </button>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none text-9xl font-extrabold select-none">
          한국어
        </div>
      </div>

      {/* Primary Metrics Grid (Calculated from real data) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Study Goal */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Mục tiêu hàng ngày</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{progress.todayMinutes}</span>
            <span className="text-xs text-slate-400">/ {progress.dailyGoalMinutes} phút</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                dailyGoalPercent >= 100 ? 'bg-emerald-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${dailyGoalPercent}%` }}
            />
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
            <span>Đạt {dailyGoalPercent}%</span>
            <button 
              type="button"
              onClick={() => onAddMinutes(30)}
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              +30 phút
            </button>
          </div>
        </div>

        {/* Overall Roadmap Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Tiến độ toàn khóa</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{overallPercent}%</span>
            <span className="text-xs text-slate-400">({completedLessonsCount}/{totalRoadmapLessons} bài)</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          <p className="mt-2.5 text-[11px] text-slate-500 truncate">
            Đang ở Tuần {progress.currentWeek} / 8 tuần
          </p>
        </div>

        {/* Vocabulary Metrics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Từ vựng đã thuộc</span>
            <BookA className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{masteredVocabCount}</span>
            <span className="text-xs text-slate-400">/ {totalVocab} từ</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((masteredVocabCount / totalVocab) * 100)}%` }}
            />
          </div>
          <p className="mt-2.5 text-[11px] text-slate-500">
            {dueReviewCount > 0 ? (
              <span className="text-amber-600 font-semibold">{dueReviewCount} từ cần ôn tập lại</span>
            ) : (
              <span>Chưa có từ nào bị quá hạn</span>
            )}
          </p>
        </div>

        {/* Grammar & Streak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Ngữ pháp & Chuỗi học</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900">{completedGrammarCount}</span>
            <span className="text-xs text-slate-400">/ {totalGrammar} bài ngữ pháp</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((completedGrammarCount / totalGrammar) * 100)}%` }}
            />
          </div>
          <p className="mt-2.5 text-[11px] text-orange-600 font-semibold">
            🔥 Chuỗi {progress.streakDays} ngày liên tiếp
          </p>
        </div>
      </div>

      {/* Two Column Layout: Today's Tasks & Skills Practice Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks Checklist */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Nhiệm vụ học tập hôm nay</h2>
              <p className="text-xs text-slate-500">Cập nhật tự động theo tiến độ học thực tế</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-indigo-50 text-indigo-700">
              Mục tiêu: 120 phút
            </span>
          </div>

          <div className="space-y-3">
            {/* Task 1: Time */}
            <div className={`flex items-start justify-between p-3.5 rounded-xl border transition ${
              taskMinutesDone ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start space-x-3">
                {taskMinutesDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Học đủ 120 phút trong ngày
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Hiện tại: {progress.todayMinutes} phút / 120 phút ({dailyGoalPercent}%)
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onAddMinutes(15)}
                className="text-xs font-semibold px-2.5 py-1 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-700 shadow-2xs"
              >
                +15p
              </button>
            </div>

            {/* Task 2: Vocab */}
            <div className={`flex items-start justify-between p-3.5 rounded-xl border transition ${
              taskVocabDone ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start space-x-3">
                {taskVocabDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Luyện từ vựng Flashcard theo chủ đề
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Đã thuộc: {masteredVocabCount} từ • Cần ôn: {dueReviewCount} từ
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('vocabulary')}
                className="text-xs font-semibold px-3 py-1 bg-white hover:bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 shadow-2xs flex items-center space-x-1"
              >
                <span>Học từ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Task 3: Grammar */}
            <div className={`flex items-start justify-between p-3.5 rounded-xl border transition ${
              taskGrammarDone ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start space-x-3">
                {taskGrammarDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Làm bài tập trắc nghiệm ngữ pháp Tuần {progress.currentWeek}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Đã hoàn thành {completedGrammarCount}/{totalGrammar} điểm ngữ pháp cốt lõi
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('grammar')}
                className="text-xs font-semibold px-3 py-1 bg-white hover:bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 shadow-2xs flex items-center space-x-1"
              >
                <span>Ngữ pháp</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Task 4: Listening / Reading */}
            <div className={`flex items-start justify-between p-3.5 rounded-xl border transition ${
              taskPracticeDone ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start space-x-3">
                {taskPracticeDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Thực hành bài luyện Nghe hoặc Đọc hiểu TOPIK
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Đã làm: {completedListening}/{listeningQuestions.length} câu nghe, {completedReading}/{readingQuestions.length} câu đọc
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('listening')}
                className="text-xs font-semibold px-3 py-1 bg-white hover:bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 shadow-2xs flex items-center space-x-1"
              >
                <span>Luyện nghe</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Practice Skills & Error Notebook Quick Card */}
        <div className="space-y-4">
          {/* Skill Performance Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Tiến độ kỹ năng thi TOPIK I</h3>
            
            {/* Listening */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-700 flex items-center">
                  <Headphones className="w-3.5 h-3.5 text-indigo-500 mr-1.5" />
                  Kỹ năng Nghe (듣기)
                </span>
                <span className="text-slate-500 font-semibold">{completedListening}/{listeningQuestions.length} câu</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${Math.round((completedListening / listeningQuestions.length) * 100)}%` }}
                />
              </div>
            </div>

            {/* Reading */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-700 flex items-center">
                  <BookText className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                  Kỹ năng Đọc (읽기)
                </span>
                <span className="text-slate-500 font-semibold">{completedReading}/{readingQuestions.length} câu</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: `${Math.round((completedReading / readingQuestions.length) * 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Đề thi TOPIK I gồm 70 câu</span>
              <button
                type="button"
                onClick={() => onNavigate('reading')}
                className="text-xs text-indigo-600 font-semibold hover:text-indigo-800"
              >
                Luyện đọc ngay &rarr;
              </button>
            </div>
          </div>

          {/* Error Notebook Card */}
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl border border-rose-200 p-5 shadow-2xs">
            <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm mb-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Sổ tay lỗi sai</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {progress.errorNotebook.length > 0 ? (
                <>Bạn đang có <strong className="text-rose-700 font-semibold">{progress.errorNotebook.length}</strong> câu làm sai cần xem lại và luyện tập lại.</>
              ) : (
                'Chưa có câu hỏi nào bị làm sai. Tiếp tục phát huy nhé!'
              )}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('errors')}
              className="mt-3.5 w-full py-2 px-3 bg-white hover:bg-rose-100/50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition text-center shadow-2xs flex items-center justify-center space-x-1"
            >
              <span>Xem và làm lại lỗi sai ({progress.errorNotebook.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
