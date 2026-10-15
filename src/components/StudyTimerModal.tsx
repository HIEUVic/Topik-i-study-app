import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Clock, Plus, Check } from 'lucide-react';

interface StudyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMinutes: (minutes: number) => void;
  todayMinutes: number;
  dailyGoalMinutes: number;
}

export const StudyTimerModal: React.FC<StudyTimerModalProps> = ({
  isOpen,
  onClose,
  onAddMinutes,
  todayMinutes,
  dailyGoalMinutes
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  if (!isOpen) return null;

  const handleSaveRecordedTime = () => {
    const mins = Math.max(1, Math.round(seconds / 60));
    onAddMinutes(mins);
    setIsActive(false);
    setSeconds(0);
    onClose();
  };

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">Ghi Nhận Giờ Tự Học</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Stopwatch */}
        <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Thời gian phiên học hiện tại
          </span>
          <div className="text-4xl sm:text-5xl font-mono font-bold text-slate-900 tracking-tight">
            {formatTime(seconds)}
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs ${
                isActive
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isActive ? 'Tạm dừng' : 'Bắt đầu bấm giờ'}</span>
            </button>

            {seconds > 0 && (
              <button
                type="button"
                onClick={() => {
                  setIsActive(false);
                  setSeconds(0);
                }}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition"
                title="Đặt lại về 0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {seconds >= 60 && (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSaveRecordedTime}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                Lưu {Math.round(seconds / 60)} phút vào hôm nay
              </button>
            </div>
          )}
        </div>

        {/* Quick Add Presets */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 block">
            Ghi nhanh thời gian đã học ngoài ứng dụng:
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => {
                  onAddMinutes(mins);
                  onClose();
                }}
                className="py-2.5 px-2 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/60 text-slate-800 text-xs font-bold transition text-center shadow-2xs"
              >
                +{mins} phút
              </button>
            ))}
          </div>
        </div>

        {/* Summary note */}
        <div className="text-center text-xs text-slate-500 pt-1 border-t border-slate-100">
          Hôm nay bạn đã học: <strong className="text-slate-900 font-bold">{todayMinutes}</strong> / {dailyGoalMinutes} phút
        </div>
      </div>
    </div>
  );
};
