import React, { useState, useEffect } from 'react';
import { Clock, Flame, Volume2, VolumeX, Plus, Play, Pause, Menu } from 'lucide-react';
import { UserProgress } from '../types';
import { isSpeechSynthesisSupported } from '../utils/audio';

interface HeaderProps {
  progress: UserProgress;
  onAddMinutes: (minutes: number) => void;
  onOpenTimerModal: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ progress, onAddMinutes, onOpenTimerModal, onToggleSidebar }) => {
  const [audioSupported, setAudioSupported] = useState<boolean>(true);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  useEffect(() => {
    setAudioSupported(isSpeechSynthesisSupported());
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    if (timerSeconds >= 60) {
      const mins = Math.floor(timerSeconds / 60);
      onAddMinutes(mins);
      setTimerSeconds(timerSeconds % 60);
    }
  }, [timerSeconds, onAddMinutes]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const todayFormatted = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  const goalPercent = Math.min(100, Math.round((progress.todayMinutes / progress.dailyGoalMinutes) * 100));

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo, Toggle Button & Current Date */}
          <div className="flex items-center space-x-3">
            {/* Nút bấm ẩn/hiện Sidebar trượt ra đè lên màn hình */}
            <button
              type="button"
              onClick={onToggleSidebar}
              className="flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition shadow-2xs border border-slate-200"
              title="Mở menu điều hướng"
              aria-label="Mở menu điều hướng"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-bold text-lg shadow-sm shadow-indigo-200">
              한
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                  TOPIK I
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Lộ Trình 8 Tuần
                </span>
              </div>
              <p className="text-xs text-slate-500 capitalize hidden sm:block">
                {todayFormatted} • Tuần {progress.currentWeek}
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Audio Capability Badge */}
            <div 
              className={`hidden md:flex items-center text-xs px-2.5 py-1 rounded-full border ${
                audioSupported 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {audioSupported ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 mr-1" />
                  <span>Phát âm ko-KR</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 mr-1" />
                  <span>Không có audio</span>
                </>
              )}
            </div>

            {/* Streak Counter */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-100 text-orange-700 text-xs sm:text-sm font-semibold">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{progress.streakDays} ngày</span>
            </div>

            {/* Daily Goal Mini Widget */}
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 sm:px-3 py-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              <div className="text-left">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 space-x-1">
                  <span>{progress.todayMinutes}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-500">{progress.dailyGoalMinutes}p</span>
                </div>
                <div className="w-16 sm:w-20 bg-slate-200 rounded-full h-1.5 mt-0.5 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${goalPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Live Stopwatch */}
            <div className="hidden lg:flex items-center space-x-1 bg-indigo-50 border border-indigo-200 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setTimerActive(!timerActive)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium transition ${
                  timerActive 
                    ? 'bg-rose-500 text-white animate-pulse' 
                    : 'bg-white text-indigo-700 hover:bg-indigo-100 shadow-xs'
                }`}
              >
                <Pause className="w-3.5 h-3.5" />
                <span>{timerActive ? formatTimer(timerSeconds) : 'Bấm giờ học'}</span>
              </button>
              <button
                type="button"
                onClick={() => onAddMinutes(15)}
                className="px-2 py-1 bg-white hover:bg-indigo-100 text-indigo-700 text-xs font-medium rounded transition shadow-xs"
              >
                +15p
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenTimerModal}
              className="lg:hidden p-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};