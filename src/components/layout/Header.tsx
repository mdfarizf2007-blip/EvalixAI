import React from 'react';
import { 
  Bell, 
  Plus, 
  UploadCloud, 
  Menu,
  Sparkles,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { NavigationTab, TeacherProfile, UserProfile } from '../../types';

export interface HeaderProps {
  activeTab?: NavigationTab;
  currentTab?: NavigationTab;
  onNavigateTab?: (tab: NavigationTab) => void;
  onSelectTab?: (tab: NavigationTab) => void;
  onOpenCreateExam: () => void;
  onOpenAuthModal?: () => void;
  onToggleSidebar?: () => void;
  onToggleMobileMenu?: () => void;
  teacher?: TeacherProfile;
  user?: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  currentTab,
  onNavigateTab,
  onSelectTab,
  onOpenCreateExam,
  onOpenAuthModal,
  onToggleSidebar,
  onToggleMobileMenu,
  teacher,
  user
}) => {
  const handleTabClick = (tab: NavigationTab) => {
    if (onNavigateTab) onNavigateTab(tab);
    else if (onSelectTab) onSelectTab(tab);
  };

  const handleToggle = onToggleSidebar || onToggleMobileMenu;
  const userName = user?.name || teacher?.name || 'DR.RAGAVI PRIYA';

  return (
    <header 
      id="main-app-header" 
      className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs"
    >
      <div className="flex items-center gap-3">
        {handleToggle && (
          <button
            id="mobile-menu-btn"
            onClick={handleToggle}
            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Department of Computer Science & Engineering
            </h1>
            <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded border border-slate-200">
              Semester III • 2025-2026
            </span>
          </div>
          <p className="text-xs text-slate-500 hidden sm:block">
            Turning Student Performance into Actionable Insights
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Quick Action: Upload Answer Sheet */}
        <button
          id="header-upload-btn"
          onClick={() => handleTabClick('upload')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 shadow-2xs"
        >
          <UploadCloud className="w-3.5 h-3.5 text-slate-600" />
          <span className="hidden md:inline">Upload Answer Sheets</span>
          <span className="md:hidden">Upload</span>
        </button>

        {/* Primary Action: Create Examination */}
        <button
          id="header-create-exam-btn"
          onClick={onOpenCreateExam}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Create Exam</span>
          <span className="md:hidden">Exam</span>
        </button>

        {/* Account / Sign-In Button */}
        {onOpenAuthModal && (
          <button
            id="header-auth-btn"
            onClick={onOpenAuthModal}
            title={`Signed in as ${userName}`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden lg:inline truncate max-w-[120px]">{userName}</span>
          </button>
        )}

        {/* Notification Bell */}
        <button
          id="header-notifications-btn"
          title="Notifications (2 updates pending)"
          aria-label="Notifications"
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};
