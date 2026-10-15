import React, { useState, useEffect } from 'react';
import { TabType, UserProgress } from './types';
import { loadUserProgress, saveUserProgress, logStudyMinutes } from './utils/storage';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { RoadmapView } from './components/RoadmapView';
import { VocabularyView } from './components/VocabularyView';
import { GrammarView } from './components/GrammarView';
import { ListeningView } from './components/ListeningView';
import { ReadingView } from './components/ReadingView';
import { ErrorReviewView } from './components/ErrorReviewView';
import { StatsView } from './components/StatsView';
import { StudyTimerModal } from './components/StudyTimerModal';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [timerModalOpen, setTimerModalOpen] = useState<boolean>(false);

  // Sync state to LocalStorage whenever progress changes
  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
    saveUserProgress(updated);
  };

  const handleAddMinutes = (mins: number) => {
    const updated = logStudyMinutes(mins, progress);
    setProgress(updated);
  };

  const handleNavigate = (tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <Header 
        progress={progress}
        onAddMinutes={handleAddMinutes}
        onOpenTimerModal={() => setTimerModalOpen(true)}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
      />

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Slide-over Navigation Drawer */}
        <Navigation
          currentTab={currentTab}
          onSelectTab={handleNavigate}
          progress={progress}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen(prev => !prev)}
        />

        {/* Content Area (Full width, no permanent left indent) */}
        <main className="flex-1 pb-20 md:pb-12 pt-6 px-4 sm:px-6 lg:px-8 max-w-full overflow-x-hidden">
          {currentTab === 'dashboard' && (
            <Dashboard 
              progress={progress}
              onNavigate={handleNavigate}
              onAddMinutes={handleAddMinutes}
            />
          )}

          {currentTab === 'roadmap' && (
            <RoadmapView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNavigate={handleNavigate}
            />
          )}

          {currentTab === 'vocabulary' && (
            <VocabularyView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {currentTab === 'grammar' && (
            <GrammarView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {currentTab === 'listening' && (
            <ListeningView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {currentTab === 'reading' && (
            <ReadingView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {currentTab === 'errors' && (
            <ErrorReviewView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {currentTab === 'stats' && (
            <StatsView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
            />
          )}
        </main>
      </div>

      {/* Study Timer Stopwatch Modal */}
      <StudyTimerModal
        isOpen={timerModalOpen}
        onClose={() => setTimerModalOpen(false)}
        onAddMinutes={handleAddMinutes}
        todayMinutes={progress.todayMinutes}
        dailyGoalMinutes={progress.dailyGoalMinutes}
      />
    </div>
  );
}
