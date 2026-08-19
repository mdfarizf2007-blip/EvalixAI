import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  UploadCloud, 
  Users, 
  BarChart3, 
  AlertTriangle, 
  FileText, 
  Settings, 
  LogOut,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NavigationTab, TeacherProfile, UserProfile } from '../../types';

export interface SidebarProps {
  activeTab?: NavigationTab;
  currentTab?: NavigationTab;
  isCollapsed?: boolean;
  onTabChange?: (tab: NavigationTab) => void;
  onSelectTab?: (tab: NavigationTab) => void;
  onToggleCollapse?: () => void;
  onOpenAuthModal?: () => void;
  teacher?: TeacherProfile;
  user?: UserProfile;
  evaluatedCount?: number;
  atRiskCount?: number;
  onLogout?: () => void;
}

const getInitials = (name?: string, fallback = 'DR'): string => {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  currentTab,
  isCollapsed = false,
  onTabChange,
  onSelectTab,
  onToggleCollapse,
  onOpenAuthModal,
  teacher,
  user,
  evaluatedCount = 452,
  atRiskCount = 18,
  onLogout
}) => {
  const currentActiveTab = activeTab || currentTab || 'overview';
  const handleTabClick = (tab: NavigationTab) => {
    if (onTabChange) onTabChange(tab);
    else if (onSelectTab) onSelectTab(tab);
  };

  const handleLogoutClick = () => {
    if (onOpenAuthModal) onOpenAuthModal();
    else if (onLogout) onLogout();
  };

  const userName = user?.name || teacher?.name || 'DR.RAGAVI PRIYA';
  const userDept = user?.department || teacher?.department || 'Computer Science & Engineering';
  const avatarInitials = teacher?.avatarInitials || getInitials(userName);

  const navItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: string | number; badgeColor?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'examinations', label: 'Examinations', icon: BookOpen, badge: '4' },
    { id: 'upload', label: 'Answer Sheets', icon: UploadCloud, badge: `${evaluatedCount}`, badgeColor: 'bg-blue-100 text-blue-800' },
    { id: 'students', label: 'Students', icon: Users, badge: '64' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'risk', label: 'Risk Analysis', icon: AlertTriangle, badge: `${atRiskCount}`, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside 
      id="main-sidebar"
      aria-label="Sidebar Navigation"
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-white border-r border-slate-200 flex flex-col h-screen shrink-0 sticky top-0 transition-all duration-200 z-30`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-sm shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 tracking-tight">Evalix</span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded">AI</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate">Learning Analytics</p>
            </div>
          )}
        </div>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 py-4 space-y-1 overflow-y-auto" aria-label="Main Navigation">
        {!isCollapsed && (
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Academic Management
          </div>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActiveTab === item.id || 
            (item.id === 'examinations' && currentActiveTab === 'exam-detail') ||
            (item.id === 'upload' && currentActiveTab === 'analysis') ||
            (item.id === 'students' && currentActiveTab === 'student-profile');

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleTabClick(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3 py-2.5'
              } rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
              {!isCollapsed && item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${item.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status Banner (only shown if expanded) */}
      {!isCollapsed && (
        <div className="px-3 py-2.5 bg-slate-50 border border-slate-200 mx-3 rounded-lg my-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-700">Evaluation Engine</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">AI-assisted analysis active</p>
        </div>
      )}

      {/* Teacher Profile Footer */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-1.5 rounded-lg hover:bg-slate-50 transition-colors`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-semibold flex items-center justify-center text-xs shrink-0 shadow-xs">
              {avatarInitials}
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900 truncate">{userName}</p>
                <p className="text-[11px] text-slate-500 truncate">{userDept}</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              id="sidebar-logout-btn"
              onClick={handleLogoutClick}
              title="Sign in / Switch account"
              aria-label="Sign in or switch account"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
