import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { GrammarLesson, GrammarQuiz, UserProgress } from '../types';
import { GRAMMAR_DATA } from '../data/grammarData';
import { speakKorean } from '../utils/audio';
import { recordErrorItem, removeErrorItem } from '../utils/storage';

interface GrammarViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const GrammarView: React.FC<GrammarViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [expandedLessonId, setExpandedLessonId] = useState<string>(GRAMMAR_DATA[0].id);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  const filteredGrammar = selectedWeek === 'all' 
    ? GRAMMAR_DATA 
    : GRAMMAR_DATA.filter(g => g.week === Number(selectedWeek));

  const handlePlayAudio = (text: string) => {
    speakKorean(text, { rate: 0.85 });
  };

  const handleSelectOption = (quizId: string, optionIndex: number) => {
    if (quizSubmitted[quizId]) return; // lock once submitted
    setQuizAnswers(prev => ({ ...prev, [quizId]: optionIndex }));
  };

  const handleSubmitQuiz = (lesson: GrammarLesson, quiz: GrammarQuiz) => {
    const selectedIdx = quizAnswers[quiz.id];
    if (selectedIdx === undefined || selectedIdx === null) return;

    setQuizSubmitted(prev => ({ ...prev, [quiz.id]: true }));

    const isCorrect = selectedIdx === quiz.correctAnswer;

    let updatedProgress = { ...progress };

    // Record quiz completion in progress
    updatedProgress.completedGrammarQuizIds = {
      ...updatedProgress.completedGrammarQuizIds,
      [quiz.id]: isCorrect ? 100 : 0
    };

    if (isCorrect) {
      // Remove from error notebook if it was there
      updatedProgress = removeErrorItem(quiz.id, updatedProgress);
    } else {
      // Record into error notebook
      updatedProgress = recordErrorItem({
        id: quiz.id,
        type: 'grammar',
        questionTitle: `Ngữ pháp: ${lesson.pattern}`,
        questionPrompt: quiz.question,
        userAnswerIndex: selectedIdx,
        correctAnswerIndex: quiz.correctAnswer,
        options: quiz.options,
        explanation: quiz.explanation,
        sourceLessonId: lesson.id
      }, updatedProgress);
    }

    onUpdateProgress(updatedProgress);
  };

  const handleRetryQuiz = (quizId: string) => {
    setQuizAnswers(prev => ({ ...prev, [quizId]: null }));
    setQuizSubmitted(prev => ({ ...prev, [quizId]: false }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <BookOpenCheck className="w-3.5 h-3.5" />
              <span>Ngữ pháp trọng tâm TOPIK I</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Bài Giảng & Bài Tập Ngữ Pháp
            </h1>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl">
              Tổng hợp toàn bộ các cấu trúc ngữ pháp nền tảng hay thi nhất, có quy tắc ghép âm có patchim/không patchim, lỗi thường gặp và bài tập trắc nghiệm giải thích chi tiết.
            </p>
          </div>

          {/* Week Filter */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs text-slate-500 font-medium">Lọc theo:</span>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:bg-white"
            >
              <option value="all">Tất cả các tuần ({GRAMMAR_DATA.length} bài)</option>
              <option value="2">Tuần 2: Câu cơ bản & Đuôi câu</option>
              <option value="3">Tuần 3: Tiểu từ & Quá khứ</option>
              <option value="4">Tuần 4: Tương lai, Khả năng & Liên từ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grammar Cards List */}
      <div className="space-y-4">
        {filteredGrammar.map((lesson) => {
          const isExpanded = expandedLessonId === lesson.id;
          const completedQuizzesForThisLesson = lesson.quizzes.filter(q => progress.completedGrammarQuizIds[q.id] !== undefined);
          const isAllQuizzesPassed = lesson.quizzes.length > 0 && lesson.quizzes.every(q => progress.completedGrammarQuizIds[q.id] === 100);

          return (
            <div
              key={lesson.id}
              className={`bg-white rounded-2xl border transition-all shadow-2xs overflow-hidden ${
                isExpanded ? 'border-indigo-300 ring-2 ring-indigo-500/10' : 'border-slate-200'
              }`}
            >
              {/* Lesson Bar Header */}
              <div
                className="p-5 cursor-pointer select-none hover:bg-slate-50/70 transition flex items-start justify-between gap-4"
                onClick={() => setExpandedLessonId(isExpanded ? '' : lesson.id)}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-indigo-50 text-indigo-700">
                      Tuần {lesson.week}
                    </span>
                    <span className="font-korean text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {lesson.pattern}
                    </span>
                    {isAllQuizzesPassed && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Đã làm đúng bài tập
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
                    {lesson.title}
                  </h2>
                  <p className="text-xs text-indigo-700 font-semibold">
                    Ý nghĩa: {lesson.vietnameseMeaning}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="button"
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                    aria-label="Chi tiết"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Lesson Expanded Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-6">
                  {/* Detailed Explanation */}
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                    <p>{lesson.explanation}</p>
                  </div>

                  {/* Formation Rules */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      Quy tắc thành lập (Cách ghép)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {lesson.formationRules.map((rule, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                          <h4 className="text-xs font-bold text-indigo-900">
                            {rule.rule}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {rule.description}
                          </p>
                          <div className="mt-1.5 p-2 rounded-lg bg-indigo-50/50 text-indigo-800 font-korean font-semibold text-xs">
                            {rule.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examples with Audio */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Ví dụ thực tế ({lesson.examples.length} câu)
                      </h3>
                      <span className="text-[11px] text-slate-400">Nhấn biểu tượng loa để nghe phát âm</span>
                    </div>

                    <div className="space-y-2.5">
                      {lesson.examples.map((ex, i) => (
                        <div key={i} className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <div>
                            <p className="font-korean text-sm font-bold text-slate-900">
                              {ex.korean}
                            </p>
                            <p className="text-xs text-slate-600 mt-1 italic">
                              &rarr; {ex.vietnamese}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handlePlayAudio(ex.korean)}
                            className="p-2 rounded-full text-indigo-600 hover:bg-indigo-100 transition shrink-0 ml-3"
                            title="Nghe phát âm ví dụ"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes Warning */}
                  {lesson.commonMistakes && (
                    <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 space-y-1">
                      <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Lưu ý tránh bẫy & Lỗi thường gặp trong đề thi:</span>
                      </div>
                      <p className="text-xs text-amber-800 leading-relaxed pl-6">
                        {lesson.commonMistakes}
                      </p>
                    </div>
                  )}

                  {/* Interactive Quizzes */}
                  {lesson.quizzes.length > 0 && (
                    <div className="pt-2">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Bài tập trắc nghiệm củng cố ({lesson.quizzes.length} câu)
                      </h3>

                      <div className="space-y-4">
                        {lesson.quizzes.map((quiz, qIdx) => {
                          const selectedOption = quizAnswers[quiz.id];
                          const isSubmitted = quizSubmitted[quiz.id] || progress.completedGrammarQuizIds[quiz.id] !== undefined;
                          const isCorrect = isSubmitted && ((selectedOption !== undefined && selectedOption === quiz.correctAnswer) || progress.completedGrammarQuizIds[quiz.id] === 100);

                          return (
                            <div key={quiz.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                              <div className="flex items-start justify-between">
                                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                                  Câu hỏi {qIdx + 1}
                                </span>
                                {isSubmitted && (
                                  <span className={`text-xs font-bold flex items-center space-x-1 ${
                                    isCorrect ? 'text-emerald-600' : 'text-rose-600'
                                  }`}>
                                    {isCorrect ? (
                                      <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Chính xác</span>
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="w-4 h-4" />
                                        <span>Chưa chính xác (Đã lưu vào Sổ tay lỗi sai)</span>
                                      </>
                                    )}
                                  </span>
                                )}
                              </div>

                              <p className="text-sm font-semibold text-slate-900">
                                {quiz.question}
                              </p>

                              {/* Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {quiz.options.map((option, optIdx) => {
                                  const isChecked = selectedOption === optIdx;
                                  const isTheCorrectAnswer = optIdx === quiz.correctAnswer;

                                  let optionStyle = 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800';

                                  if (isSubmitted) {
                                    if (isTheCorrectAnswer) {
                                      optionStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
                                    } else if (isChecked && !isCorrect) {
                                      optionStyle = 'border-rose-300 bg-rose-50 text-rose-900 font-semibold';
                                    } else {
                                      optionStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                                    }
                                  } else if (isChecked) {
                                    optionStyle = 'border-indigo-500 bg-indigo-50 text-indigo-900 font-bold';
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      type="button"
                                      disabled={isSubmitted}
                                      onClick={() => handleSelectOption(quiz.id, optIdx)}
                                      className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center space-x-2.5 ${optionStyle}`}
                                    >
                                      <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0">
                                        {String.fromCharCode(65 + optIdx)}
                                      </span>
                                      <span className="font-korean">{option}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Action or Explanation */}
                              {!isSubmitted ? (
                                <div className="flex justify-end pt-1">
                                  <button
                                    type="button"
                                    disabled={selectedOption === undefined || selectedOption === null}
                                    onClick={() => handleSubmitQuiz(lesson, quiz)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none transition shadow-2xs"
                                  >
                                    Kiểm tra đáp án
                                  </button>
                                </div>
                              ) : (
                                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 mt-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-700">Giải thích chi tiết:</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRetryQuiz(quiz.id)}
                                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1"
                                    >
                                      <RotateCcw className="w-3 h-3" />
                                      <span>Làm lại câu này</span>
                                    </button>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed">
                                    {quiz.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
