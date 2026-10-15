import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  Calendar, 
  Target, 
  Sparkles, 
  BookOpen, 
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TabType, UserProgress } from '../types';
import { ROADMAP_DATA } from '../data/roadmapData';

interface RoadmapViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onNavigate: (tab: TabType) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(progress.currentWeek);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    [progress.currentWeek]: true
  });

  const toggleWeekExpand = (weekNum: number) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }));
  };

  const handleToggleLesson = (lessonId: string) => {
    const isCompleted = progress.completedLessonIds.includes(lessonId);
    let updatedCompleted: string[];

    if (isCompleted) {
      updatedCompleted = progress.completedLessonIds.filter(id => id !== lessonId);
    } else {
      updatedCompleted = [...progress.completedLessonIds, lessonId];
    }

    onUpdateProgress({
      ...progress,
      completedLessonIds: updatedCompleted
    });
  };

  const handleSetCurrentWeek = (weekNum: number) => {
    onUpdateProgress({
      ...progress,
      currentWeek: weekNum
    });
    setSelectedWeek(weekNum);
  };

  const totalLessons = ROADMAP_DATA.reduce((acc, w) => acc + w.lessons.length, 0);
  const totalCompleted = progress.completedLessonIds.length;
  const totalPercent = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Chương trình chuẩn 8 tuần</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Lộ trình 8 Tuần Tự Học TOPIK I
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-2xl">
              Được thiết kế chuyên biệt cho người Việt bắt đầu từ số 0 đến tự tin đạt TOPIK Level 2 (140+ / 200 điểm). Tích chọn bài học khi hoàn thành để hệ thống tự động tính tỷ lệ tiến độ.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[200px] shrink-0">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
              <span>Tiến độ toàn khóa</span>
              <span className="font-bold text-slate-900">{totalCompleted}/{totalLessons} bài</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${totalPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-indigo-600 font-bold">{totalPercent}% Hoàn thành</span>
              <span className="text-slate-400">Tuần hiện tại: {progress.currentWeek}</span>
            </div>
          </div>
        </div>

        {/* Horizontal Week Pill Navigation */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {ROADMAP_DATA.map((week) => {
            const weekCompletedCount = week.lessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
            const isCurrent = progress.currentWeek === week.weekNumber;
            const isSelected = selectedWeek === week.weekNumber;
            const isAllDone = weekCompletedCount === week.lessons.length;

            return (
              <button
                key={week.weekNumber}
                type="button"
                onClick={() => {
                  setSelectedWeek(week.weekNumber);
                  setExpandedWeeks(prev => ({ ...prev, [week.weekNumber]: true }));
                }}
                className={`shrink-0 flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : isCurrent
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>Tuần {week.weekNumber}</span>
                {isAllDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {weekCompletedCount}/4
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Week Cards Accordion List */}
      <div className="space-y-4">
        {ROADMAP_DATA.map((week) => {
          const isExpanded = expandedWeeks[week.weekNumber] !== false;
          const isCurrentWeek = progress.currentWeek === week.weekNumber;
          const weekCompletedCount = week.lessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
          const weekPercent = Math.round((weekCompletedCount / week.lessons.length) * 100);

          return (
            <div 
              key={week.weekNumber}
              className={`bg-white rounded-2xl border transition-all shadow-2xs overflow-hidden ${
                isCurrentWeek ? 'border-indigo-300 ring-2 ring-indigo-500/10' : 'border-slate-200'
              }`}
            >
              {/* Week Header */}
              <div 
                className="p-5 sm:p-6 cursor-pointer select-none hover:bg-slate-50/70 transition flex items-start justify-between gap-4"
                onClick={() => toggleWeekExpand(week.weekNumber)}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-korean text-xs px-2.5 py-0.5 rounded-md font-bold bg-slate-100 text-slate-700">
                      {week.koreanTheme}
                    </span>
                    {isCurrentWeek && (
                      <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-indigo-500 text-white animate-pulse">
                        Đang học
                      </span>
                    )}
                    {weekCompletedCount === week.lessons.length && (
                      <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-emerald-100 text-emerald-800 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Đã xong 100%
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-lg font-bold text-slate-900 pt-1">
                    {week.title}
                  </h2>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    {week.description}
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-700">
                      {weekCompletedCount}/{week.lessons.length} bài
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {weekPercent}%
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    aria-label="Thu gọn/mở rộng"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 bg-white">
                  {/* Focus & Objectives Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center space-x-2 font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
                      <Target className="w-4 h-4 text-indigo-600" />
                      <span>Mục tiêu trọng tâm của tuần</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
                      {week.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-indigo-500 font-bold">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Change current week button */}
                    {!isCurrentWeek && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Bạn muốn chuyển trạng thái học sang tuần này?
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetCurrentWeek(week.weekNumber);
                          }}
                          className="text-xs font-semibold px-3 py-1 bg-white hover:bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-200 transition"
                        >
                          Đặt làm tuần hiện tại
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Lessons List */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Danh sách bài học ({week.lessons.length} bài)
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                      {week.lessons.map((lesson) => {
                        const isDone = progress.completedLessonIds.includes(lesson.id);

                        return (
                          <div 
                            key={lesson.id}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition ${
                              isDone 
                                ? 'bg-emerald-50/50 border-emerald-200' 
                                : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start space-x-3.5 mb-3 sm:mb-0">
                              <button
                                type="button"
                                onClick={() => handleToggleLesson(lesson.id)}
                                className="mt-0.5 shrink-0 focus:outline-hidden"
                                title={isDone ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành bài học'}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-500 transition" />
                                )}
                              </button>

                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className={`text-sm font-bold ${isDone ? 'text-slate-800 line-through decoration-emerald-500/50' : 'text-slate-900'}`}>
                                    {lesson.title}
                                  </h4>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                  {lesson.summary}
                                </p>
                                <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-slate-400">
                                  <span className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {lesson.estimatedMinutes} phút
                                  </span>
                                  <span>•</span>
                                  <span>{lesson.objectives.join(' • ')}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center pl-8 sm:pl-0">
                              <button
                                type="button"
                                onClick={() => onNavigate(lesson.targetTab)}
                                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
                              >
                                <span>Vào học</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
