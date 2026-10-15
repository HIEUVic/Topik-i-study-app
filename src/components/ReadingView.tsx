import React, { useState } from 'react';
import { 
  BookText, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  FileText, 
  Tag, 
  Sparkles, 
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PracticeQuestion, UserProgress } from '../types';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { recordErrorItem, removeErrorItem } from '../utils/storage';

interface ReadingViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const ReadingView: React.FC<ReadingViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const readingQuestions = PRACTICE_QUESTIONS.filter(q => q.type === 'reading');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [submittedStatus, setSubmittedStatus] = useState<Record<string, boolean>>({});

  const currentQ = readingQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (submittedStatus[currentQ.id]) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleSubmitAnswer = () => {
    const selectedIdx = selectedAnswers[currentQ.id];
    if (selectedIdx === undefined || selectedIdx === null) return;

    const isCorrect = selectedIdx === currentQ.correctAnswer;
    setSubmittedStatus(prev => ({ ...prev, [currentQ.id]: true }));

    let updatedProgress = { ...progress };
    updatedProgress.completedPracticeIds = {
      ...updatedProgress.completedPracticeIds,
      [currentQ.id]: isCorrect
    };

    if (isCorrect) {
      updatedProgress = removeErrorItem(currentQ.id, updatedProgress);
    } else {
      updatedProgress = recordErrorItem({
        id: currentQ.id,
        type: 'reading',
        questionTitle: currentQ.category,
        questionPrompt: `${currentQ.question}\n(Đoạn văn: ${currentQ.passage || currentQ.visualNotice?.header || ''})`,
        userAnswerIndex: selectedIdx,
        correctAnswerIndex: currentQ.correctAnswer,
        options: currentQ.options,
        explanation: currentQ.explanation
      }, updatedProgress);
    }

    onUpdateProgress(updatedProgress);
  };

  const handleRetryQuestion = () => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: null }));
    setSubmittedStatus(prev => ({ ...prev, [currentQ.id]: false }));
  };

  const isSubmitted = submittedStatus[currentQ.id] || progress.completedPracticeIds[currentQ.id] !== undefined;
  const userSelected = selectedAnswers[currentQ.id];
  const isCorrect = isSubmitted && (userSelected === currentQ.correctAnswer || progress.completedPracticeIds[currentQ.id] === true);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
              <BookText className="w-3.5 h-3.5" />
              <span>Kỹ năng Đọc Hiểu (읽기)</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Luyện Đọc TOPIK I Sơ Cấp
            </h1>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl">
              Luyện tập các dạng bài đọc đặc trưng: đọc hiểu biển báo công cộng, điền liên từ vào chỗ trống và đọc hiểu mẩu tin ngắn với lời giải thích tại sao đáp án đúng là chính xác.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl shrink-0 text-right">
            <span className="text-xs text-slate-500 font-medium">Tiến độ bài đọc</span>
            <div className="text-base font-bold text-slate-900">
              {readingQuestions.filter(q => progress.completedPracticeIds[q.id] !== undefined).length} / {readingQuestions.length} câu
            </div>
          </div>
        </div>

        {/* Question Selector Tabs */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin pt-3 border-t border-slate-100">
          {readingQuestions.map((q, idx) => {
            const isAnswered = progress.completedPracticeIds[q.id] !== undefined;
            const isRight = progress.completedPracticeIds[q.id] === true;
            const isSelected = currentIndex === idx;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`shrink-0 flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>Câu {idx + 1}</span>
                {isAnswered && (
                  <span className={`w-2 h-2 rounded-full ${isRight ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
        {/* Category & Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
            {currentQ.category}
          </span>

          <span className="text-xs font-semibold text-slate-400">
            Câu {currentIndex + 1} / {readingQuestions.length}
          </span>
        </div>

        {/* Visual Notice Display (If signboard type) */}
        {currentQ.hasVisual && currentQ.visualNotice && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200/90 shadow-2xs space-y-3 text-center sm:text-left">
            <div className="inline-block text-[11px] font-bold text-amber-800 bg-amber-200/60 px-2.5 py-0.5 rounded-md">
              {currentQ.visualNotice.badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-korean">
              {currentQ.visualNotice.header}
            </h2>
            <div className="space-y-1.5 text-xs sm:text-sm font-semibold text-slate-700 font-korean py-1">
              {currentQ.visualNotice.body.map((line, lIdx) => (
                <div key={lIdx}>{line}</div>
              ))}
            </div>
            {currentQ.visualNotice.subtext && (
              <div className="text-[11px] text-slate-500 pt-2 border-t border-amber-200/60">
                {currentQ.visualNotice.subtext}
              </div>
            )}
          </div>
        )}

        {/* Reading Passage (If text paragraph) */}
        {!currentQ.hasVisual && currentQ.passage && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 font-korean text-sm sm:text-base font-medium text-slate-900 leading-relaxed space-y-2">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold block">Đoạn văn đọc hiểu:</span>
            <p className="whitespace-pre-line">
              {currentQ.passage}
            </p>
          </div>
        )}

        {/* Question Prompt */}
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {currentQ.question}
          </h3>
        </div>

        {/* 4 Multiple Choice Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((option, optIdx) => {
            const isChecked = userSelected === optIdx;
            const isTheCorrectAnswer = optIdx === currentQ.correctAnswer;

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
              optionStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold';
            }

            return (
              <button
                key={optIdx}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center space-x-3 ${optionStyle}`}
              >
                <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="font-korean">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Submit or Explanation Area */}
        {!isSubmitted ? (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              disabled={userSelected === undefined || userSelected === null}
              onClick={handleSubmitAnswer}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:pointer-events-none transition shadow-2xs"
            >
              Nộp bài & Xem giải thích
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isCorrect ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Chính xác!
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    Chưa đúng (Đã lưu vào Sổ tay lỗi sai)
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleRetryQuestion}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại câu này</span>
              </button>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-800">Giải thích chi tiết tại sao đáp án đúng:</span>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                {currentQ.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
