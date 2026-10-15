import React, { useState } from 'react';
import { 
  BarChart3, 
  RotateCcw, 
  Download, 
  Upload, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Clock, 
  BookA, 
  BookOpenCheck, 
  Headphones, 
  BookText,
  Calendar,
  ShieldAlert
} from 'lucide-react';
import { UserProgress } from '../types';
import { ROADMAP_DATA } from '../data/roadmapData';
import { VOCABULARY_DATA } from '../data/vocabularyData';
import { GRAMMAR_DATA } from '../data/grammarData';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { exportProgressJSON, resetUserProgress, saveUserProgress } from '../utils/storage';

interface StatsViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [resetConfirmInput, setResetConfirmInput] = useState<string>('');
  const [importNotice, setImportNotice] = useState<string | null>(null);

  // Real data calculations
  const totalRoadmapLessons = ROADMAP_DATA.reduce((acc, w) => acc + w.lessons.length, 0);
  const completedLessons = progress.completedLessonIds.length;
  const overallRoadmapPercent = Math.round((completedLessons / totalRoadmapLessons) * 100);

  const totalVocab = VOCABULARY_DATA.length;
  const masteredVocab = Object.values(progress.vocabStatus).filter(s => s === 'mastered').length;
  const learningVocab = Object.values(progress.vocabStatus).filter(s => s === 'learning').length;
  const reviewDueVocab = progress.vocabReviewDue.length;

  const totalGrammar = GRAMMAR_DATA.length;
  const completedGrammar = Object.keys(progress.completedGrammarQuizIds).length;

  const listeningTotal = PRACTICE_QUESTIONS.filter(q => q.type === 'listening').length;
  const readingTotal = PRACTICE_QUESTIONS.filter(q => q.type === 'reading').length;
  const listeningDone = PRACTICE_QUESTIONS.filter(q => q.type === 'listening' && progress.completedPracticeIds[q.id] !== undefined).length;
  const readingDone = PRACTICE_QUESTIONS.filter(q => q.type === 'reading' && progress.completedPracticeIds[q.id] !== undefined).length;

  // Study log sum
  const totalMinutesAllTime = progress.dailyStudyLogs.reduce((sum, log) => sum + (log.minutes || 0), 0);

  const handleExport = () => {
    exportProgressJSON(progress);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === 'object') {
          saveUserProgress(parsed);
          onUpdateProgress(parsed);
          setImportNotice('Khôi phục dữ liệu học tập thành công!');
          setTimeout(() => setImportNotice(null), 4000);
        } else {
          alert('Tệp dữ liệu không hợp lệ!');
        }
      } catch (err) {
        alert('Lỗi đọc tệp JSON: Định dạng không tương thích.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleConfirmReset = () => {
    if (resetConfirmInput.trim().toUpperCase() !== 'RESET') {
      alert('Vui lòng nhập chính xác chữ "RESET" để xác nhận.');
      return;
    }
    const fresh = resetUserProgress();
    onUpdateProgress(fresh);
    setShowResetModal(false);
    setResetConfirmInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Phân tích & Quản lý dữ liệu</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Thống Kê Tiến Độ Học Tập
            </h1>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl">
              Dữ liệu được lưu trữ trực tiếp trên trình duyệt của bạn (LocalStorage). Bạn có thể xuất tệp dự phòng hoặc khôi phục dữ liệu bất cứ lúc nào.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Sao lưu JSON</span>
            </button>
          </div>
        </div>
      </div>

      {importNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{importNotice}</span>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Time */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Tổng thời gian học</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">
            {totalMinutesAllTime} <span className="text-xs font-normal text-slate-400">phút</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Hôm nay: {progress.todayMinutes} / {progress.dailyGoalMinutes} phút
          </p>
        </div>

        {/* Streak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Chuỗi ngày học</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-orange-600">
            {progress.streakDays} <span className="text-xs font-normal text-slate-400">ngày</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Duy trì học mỗi ngày để đạt hiệu quả
          </p>
        </div>

        {/* Vocab Mastered */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Từ vựng đã thuộc</span>
            <BookA className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">
            {masteredVocab} <span className="text-xs font-normal text-slate-400">/ {totalVocab} từ</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Đang học: {learningVocab} • Cần ôn: {reviewDueVocab}
          </p>
        </div>

        {/* Practice Done */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Luyện nghe & đọc</span>
            <BookText className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">
            {listeningDone + readingDone} <span className="text-xs font-normal text-slate-400">/ {listeningTotal + readingTotal} câu</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Nghe: {listeningDone}/{listeningTotal} • Đọc: {readingDone}/{readingTotal}
          </p>
        </div>
      </div>

      {/* 8-Week Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Chi tiết hoàn thành theo từng tuần học
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ROADMAP_DATA.map((week) => {
            const weekDoneCount = week.lessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
            const weekPct = Math.round((weekDoneCount / week.lessons.length) * 100);

            return (
              <div 
                key={week.weekNumber} 
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  progress.currentWeek === week.weekNumber 
                    ? 'border-indigo-300 bg-indigo-50/40' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Tuần {week.weekNumber}</span>
                  <span className="text-indigo-600">{weekDoneCount}/{week.lessons.length} bài ({weekPct}%)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-1.5 rounded-full"
                    style={{ width: `${weekPct}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 truncate">
                  {week.focus}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Management & Reset Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">Quản lý dữ liệu học tập</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Xuất dữ liệu dự phòng để không lo mất tiến độ khi đổi thiết bị hoặc xóa lịch sử duyệt web.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Backup */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-xs text-slate-800">
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Sao lưu dữ liệu ra máy tính (JSON)</span>
            </div>
            <p className="text-xs text-slate-500">
              Tải toàn bộ tiến độ, từ vựng đã thuộc, danh sách lỗi sai và nhật ký giờ học về máy dưới dạng tệp .json.
            </p>
            <button
              type="button"
              onClick={handleExport}
              className="mt-2 px-3.5 py-2 bg-white hover:bg-slate-100 text-indigo-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs transition"
            >
              Tải tệp JSON ngay
            </button>
          </div>

          {/* Restore */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-xs text-slate-800">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>Khôi phục tiến độ từ tệp JSON</span>
            </div>
            <p className="text-xs text-slate-500">
              Chọn tệp .json đã lưu trước đó để nạp lại tiến độ học tập trên trình duyệt này.
            </p>
            <label className="mt-2 inline-block px-3.5 py-2 bg-white hover:bg-slate-100 text-emerald-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-2xs transition cursor-pointer">
              <span>Chọn tệp JSON...</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Reset Progress Section (Dangerous) */}
        <div className="pt-4 border-t border-slate-200">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Đặt lại toàn bộ tiến độ học tập (Reset)</span>
              </div>
              <p className="text-xs text-rose-800/80 mt-1">
                Thao tác này sẽ xóa sạch danh sách bài học đã hoàn thành, từ vựng đã nhớ và số lỗi sai về trạng thái ban đầu.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="shrink-0 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center space-x-1.5 self-start sm:self-center"
            >
              <Trash2 className="w-4 h-4" />
              <span>Đặt lại tiến độ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-rose-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center space-x-2 text-rose-600">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Xác nhận xóa tiến độ?</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Bạn sắp xóa toàn bộ dữ liệu tự học bao gồm: {completedLessons} bài học đã tích, {masteredVocab} từ vựng đã thuộc và toàn bộ Sổ tay lỗi sai. Hành động này không thể hoàn tác.
            </p>

            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-bold text-slate-700 block">
                Nhập chữ <span className="text-rose-600 font-mono font-bold">RESET</span> vào ô dưới đây để xác nhận:
              </label>
              <input
                type="text"
                placeholder="RESET"
                value={resetConfirmInput}
                onChange={(e) => setResetConfirmInput(e.target.value)}
                className="w-full p-2.5 text-xs font-mono border border-slate-300 rounded-xl focus:border-rose-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3">
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  setResetConfirmInput('');
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                disabled={resetConfirmInput.trim().toUpperCase() !== 'RESET'}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl disabled:opacity-40 shadow-xs"
              >
                Xác nhận đặt lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
