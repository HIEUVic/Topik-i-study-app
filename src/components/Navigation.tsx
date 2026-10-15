import React, { useEffect } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  BookA, 
  BookOpenCheck, 
  Headphones, 
  BookText, 
  AlertCircle, 
  BarChart3,
  CalendarDays,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { TabType, UserProgress } from '../types';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  progress: UserProgress;
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  progress,
  isOpen,
  onClose,
  onToggle
}) => {
  const errorCount = progress.errorNotebook.length;
  const reviewCount = progress.vocabReviewDue.length;

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: number | string; badgeColor?: string }[] = [
    {
      id: 'dashboard',
      label: 'Tổng quan',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'roadmap',
      label: 'Lộ trình 8 tuần',
      icon: <Map className="w-5 h-5" />,
      badge: `T${progress.currentWeek}`,
      badgeColor: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: 'vocabulary',
      label: 'Từ vựng Flashcard',
      icon: <BookA className="w-5 h-5" />,
      badge: reviewCount > 0 ? `${reviewCount} cần ôn` : undefined,
      badgeColor: 'bg-amber-100 text-amber-700'
    },
    {
      id: 'grammar',
      label: 'Ngữ pháp TOPIK I',
      icon: <BookOpenCheck className="w-5 h-5" />
    },
    {
      id: 'listening',
      label: 'Luyện nghe (듣기)',
      icon: <Headphones className="w-5 h-5" />
    },
    {
      id: 'reading',
      label: 'Luyện đọc (읽기)',
      icon: <BookText className="w-5 h-5" />
    },
    {
      id: 'errors',
      label: 'Sổ tay lỗi sai',
      icon: <AlertCircle className="w-5 h-5" />,
      badge: errorCount > 0 ? `${errorCount}` : undefined,
      badgeColor: 'bg-rose-100 text-rose-700'
    },
    {
      id: 'stats',
      label: 'Thống kê & Cài đặt',
      icon: <BarChart3 className="w-5 h-5" />
    }
  ];

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleTabClick = (tab: TabType) => {
    onSelectTab(tab);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Slide-over Drawer & Overlay (Dùng chung cho cả Desktop & Mobile khi trượt ra) */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Lớp nền mờ (Backdrop overlay - nhấn ra ngoài để đóng) */}
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Khung Sidebar trượt từ bên trái ra đè lên màn hình */}
        <aside 
          className={`fixed inset-y-0 left-0 w-72 sm:w-80 flex flex-col bg-white border-r border-slate-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-label="Menu điều hướng"
        >
          {/* Header của Drawer */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-bold text-sm shadow-xs">
                한
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">Danh Mục Học Tập</span>
                <span className="text-[11px] text-slate-500 font-medium">Lộ trình TOPIK I sơ cấp</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
              title="Đóng menu"
              aria-label="Đóng menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Danh sách 8 mục điều hướng */}
          <div className="flex-1 flex flex-col justify-between overflow-y-auto px-3.5 py-4">
            <nav className="space-y-1">
              <div className="px-3 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Các Phần Học & Thực Hành
              </div>

              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-xl transition ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      {item.badge && (
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-4 h-4 text-indigo-500" />}
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Khung nhắc nhở mục tiêu phía dưới drawer */}
            <div className="p-3.5 mt-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-slate-800">
                <CalendarDays className="w-4 h-4 text-indigo-600" />
                <span>Mục tiêu 8 tuần</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Mỗi ngày học 120 phút theo lộ trình để tự tin đạt chứng chỉ TOPIK Level 2.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Thanh điều hướng nhanh dưới đáy màn hình trên Mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200 px-2 py-1.5 flex items-center justify-around">
        <button
          type="button"
          onClick={() => handleTabClick('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] transition ${
            currentTab === 'dashboard' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Tổng quan</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('roadmap')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] transition ${
            currentTab === 'roadmap' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Map className="w-5 h-5" />
          <span>Lộ trình</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('vocabulary')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] transition ${
            currentTab === 'vocabulary' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookA className="w-5 h-5" />
          <span>Từ vựng</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('grammar')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] transition ${
            currentTab === 'grammar' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpenCheck className="w-5 h-5" />
          <span>Ngữ pháp</span>
        </button>

        <button
          type="button"
          onClick={onToggle}
          className="flex flex-col items-center py-1 px-2 rounded-lg text-[11px] text-slate-500 hover:text-slate-900 relative transition"
        >
          <Menu className="w-5 h-5" />
          <span>Menu</span>
          {errorCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </button>
      </nav>
    </>
  );
};
