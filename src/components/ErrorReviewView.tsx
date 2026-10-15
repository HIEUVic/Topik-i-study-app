import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  BookOpen,
  Filter,
  Check
} from 'lucide-react';
import { ErrorItem, UserProgress } from '../types';
import { removeErrorItem } from '../utils/storage';

interface ErrorReviewViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const ErrorReviewView: React.FC<ErrorReviewViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [retryingItem, setRetryingItem] = useState<ErrorItem | null>(null);
  const [retryAnswer, setRetryAnswer] = useState<number | null>(null);
  const [retryResult, setRetryResult] = useState<'correct' | 'wrong' | null>(null);

  const errors = progress.errorNotebook;

  const filteredErrors = errors.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const handleRemoveError = (id: string) => {
    const updated = removeErrorItem(id, progress);
    onUpdateProgress(updated);
    if (retryingItem?.id === id) {
      setRetryingItem(null);
      setRetryAnswer(null);
      setRetryResult(null);
    }
  };

  const handleStartRetry = (item: ErrorItem) => {
    setRetryingItem(item);
    setRetryAnswer(null);
    setRetryResult(null);
  };

  const handleSubmitRetry = () => {
    if (!retryingItem || retryAnswer === null) return;

    if (retryAnswer === retryingItem.correctAnswerIndex) {
      setRetryResult('correct');
      // Auto remove or let user remove
    } else {
      setRetryResult('wrong');
    }
  };

  const handleResolveAndClose = () => {
    if (retryingItem) {
      handleRemoveError(retryingItem.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Sổ tay lỗi sai & Luyện tập lại</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Ôn Tập Lỗi Sai (오답 노트)
            </h1>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl">
              Tự động lưu lại mọi câu trả lời chưa chính xác trong quá trình học ngữ pháp, luyện nghe và luyện đọc. Làm lại cho đến khi thành thạo 100% để biến điểm yếu thành điểm mạnh.
            </p>
          </div>

          <div className="bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl shrink-0 text-right">
            <span className="text-xs text-rose-700 font-medium">Số lỗi cần xử lý</span>
            <div className="text-2xl font-extrabold text-rose-900">
              {errors.length} câu
            </div>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              filterType === 'all'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tất cả lỗi ({errors.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('grammar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              filterType === 'grammar'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Ngữ pháp ({errors.filter(e => e.type === 'grammar').length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('listening')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              filterType === 'listening'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Luyện nghe ({errors.filter(e => e.type === 'listening').length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('reading')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              filterType === 'reading'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Luyện đọc ({errors.filter(e => e.type === 'reading').length})
          </button>
        </div>
      </div>

      {/* Empty State */}
      {errors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-2xs space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Sổ tay lỗi sai trống!
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Bạn chưa có câu nào làm sai, hoặc đã giải quyết hết các lỗi trước đó. Hãy tiếp tục làm bài luyện tập ở phần Ngữ pháp, Nghe và Đọc nhé.
          </p>
        </div>
      ) : filteredErrors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
          Không có lỗi sai nào thuộc danh mục này.
        </div>
      ) : (
        /* Error List */
        <div className="space-y-4">
          {filteredErrors.map((item, idx) => {
            const typeLabel = item.type === 'grammar' ? 'Ngữ pháp' : item.type === 'listening' ? 'Luyện nghe' : 'Luyện đọc';
            const typeColor = item.type === 'grammar' ? 'bg-indigo-50 text-indigo-700' : item.type === 'listening' ? 'bg-purple-50 text-purple-700' : 'bg-emerald-50 text-emerald-700';

            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4 hover:border-slate-300 transition"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2.5 py-0.5 rounded-md font-bold ${typeColor}`}>
                      {typeLabel}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {item.questionTitle}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveError(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition text-xs flex items-center space-x-1"
                      title="Đã nắm vững, xóa khỏi sổ tay"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Đã hiểu</span>
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-900 whitespace-pre-line">
                    {item.questionPrompt}
                  </p>
                </div>

                {/* Compare: Previous Wrong Answer vs Correct Answer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* User Wrong Answer */}
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
                    <span className="font-bold text-rose-800 block mb-1">
                      Đáp án bạn đã chọn (Chưa đúng):
                    </span>
                    <span className="font-korean font-semibold text-rose-950">
                      {item.options[item.userAnswerIndex] || 'Chưa chọn'}
                    </span>
                  </div>

                  {/* Correct Answer */}
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <span className="font-bold text-emerald-800 block mb-1">
                      Đáp án đúng chuẩn:
                    </span>
                    <span className="font-korean font-semibold text-emerald-950">
                      {item.options[item.correctAnswerIndex]}
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-slate-700">Giải thích cặn kẽ:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>

                {/* Action button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => handleStartRetry(item)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Luyện lại câu này ngay</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Retrying Modal */}
      {retryingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-indigo-600" />
                <span className="font-bold text-slate-900 text-sm">Thử sức lại lỗi sai</span>
              </div>
              <button
                type="button"
                onClick={() => setRetryingItem(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-600">{retryingItem.questionTitle}</span>
              <p className="text-sm font-bold text-slate-900 whitespace-pre-line">
                {retryingItem.questionPrompt}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {retryingItem.options.map((option, idx) => {
                const isSelected = retryAnswer === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={retryResult !== null}
                    onClick={() => setRetryAnswer(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center space-x-2.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 font-bold text-indigo-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-korean">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Result Feedback in Modal */}
            {retryResult === 'correct' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2 text-emerald-900">
                <div className="flex items-center space-x-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Chúc mừng! Bạn đã trả lời hoàn toàn chính xác.</span>
                </div>
                <p className="text-emerald-800">
                  Bạn có muốn xóa câu hỏi này khỏi Sổ tay lỗi sai không?
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleResolveAndClose}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs transition shadow-2xs"
                  >
                    Xóa khỏi sổ tay lỗi sai & Đóng
                  </button>
                </div>
              </div>
            )}

            {retryResult === 'wrong' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs space-y-1 text-rose-900">
                <div className="flex items-center space-x-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Vẫn chưa đúng. Hãy đọc lại giải thích bên dưới:</span>
                </div>
                <p className="text-slate-600 mt-1">
                  {retryingItem.explanation}
                </p>
              </div>
            )}

            {/* Modal Footer */}
            {retryResult === null && (
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRetryingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  disabled={retryAnswer === null}
                  onClick={handleSubmitRetry}
                  className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl disabled:opacity-40 shadow-xs"
                >
                  Kiểm tra
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
