import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { ExaminationsList } from './components/examinations/ExaminationsList';
import { ExamDetailView } from './components/examinations/ExamDetailView';
import { CreateExamModal } from './components/examinations/CreateExamModal';
import { UploadAnswerSheets } from './components/upload/UploadAnswerSheets';
import { AnswerSheetAnalysisView } from './components/analysis/AnswerSheetAnalysisView';
import { StudentsList } from './components/students/StudentsList';
import { StudentProfileView } from './components/students/StudentProfileView';
import { ClassAnalyticsView } from './components/analytics/ClassAnalyticsView';
import { RiskInterventionView } from './components/risk/RiskInterventionView';
import { ReportsView } from './components/reports/ReportsView';
import { AuthModal } from './components/auth/AuthModal';

import { 
  NavigationTab, 
  Examination, 
  Student, 
  EvaluationResult, 
  UserProfile 
} from './types';
import { 
  sampleExaminations, 
  sampleStudents, 
  defaultEvaluationResult 
} from './data/mockData';
import { generateSimulatedEvaluation } from './services/analysisEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [examinations, setExaminations] = useState<Examination[]>(sampleExaminations);
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  
  // Active detail selection states
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [currentEvaluationResult, setCurrentEvaluationResult] = useState<EvaluationResult>(defaultEvaluationResult);
  
  // Modals
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    name: 'DR.RAGAVI PRIYA',
    email: 'ragavipriya@cse.edu',
    role: 'Professor & Head',
    department: 'Computer Science & Engineering',
    avatarUrl: ''
  });

  // Handler to navigate to exam detail
  const handleSelectExam = (examId: string) => {
    setSelectedExamId(examId);
    setActiveTab('examinations');
  };

  // Handler to navigate to student profile
  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveTab('students');
  };

  // Handler to create new examination
  const handleCreateExam = (newExamData: Omit<Examination, 'id' | 'status' | 'evaluatedCount' | 'totalStudents' | 'averageScore'>) => {
    const newExam: Examination = {
      ...newExamData,
      id: `exam-${Date.now()}`,
      status: 'In Progress',
      evaluatedCount: 0,
      totalStudents: 32,
      averageScore: 0
    };
    setExaminations(prev => [newExam, ...prev]);
    setSelectedExamId(newExam.id);
  };

  // Handler when simulated analysis completes
  const handleAnalysisComplete = (result: EvaluationResult) => {
    setCurrentEvaluationResult(result);
    setActiveTab('analysis');
  };

  // Handler to inspect answer sheet
  const handleInspectAnswerSheet = (sheetId: string) => {
    // If student ID or specific sheet is linked, load/ensure deterministic result
    setActiveTab('analysis');
  };

  // Quick navigation to upload from exam or dashboard
  const handleNavigateToUpload = (examId?: string) => {
    if (examId) setSelectedExamId(examId);
    setActiveTab('upload');
  };

  const selectedExam = examinations.find(e => e.id === selectedExamId);
  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased text-slate-900 selection:bg-blue-200">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        user={currentUser}
        onToggleSidebar={() => setSidebarCollapsed(prev => !prev)}
        onOpenCreateExam={() => setIsCreateExamOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'examinations') setSelectedExamId(null);
          if (tab === 'students') setSelectedStudentId(null);
        }}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          user={currentUser}
          isCollapsed={sidebarCollapsed}
          atRiskCount={18}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'examinations') setSelectedExamId(null);
            if (tab === 'students') setSelectedStudentId(null);
          }}
          onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <OverviewDashboard
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                if (tab === 'examinations') setSelectedExamId(null);
                if (tab === 'students') setSelectedStudentId(null);
              }}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                if (tab === 'examinations') setSelectedExamId(null);
                if (tab === 'students') setSelectedStudentId(null);
              }}
              onSelectStudent={handleSelectStudent}
              onSelectExam={handleSelectExam}
              onInspectAnswerSheet={handleInspectAnswerSheet}
              onOpenCreateExam={() => setIsCreateExamOpen(true)}
              examinations={examinations}
            />
          )}

          {/* TAB 2: EXAMINATIONS (LIST OR DETAIL) */}
          {activeTab === 'examinations' && (
            selectedExamId && selectedExam ? (
              <ExamDetailView
                exam={selectedExam}
                onBack={() => setSelectedExamId(null)}
                onNavigateToUpload={handleNavigateToUpload}
                onInspectAnswerSheet={handleInspectAnswerSheet}
                onSelectStudent={handleSelectStudent}
              />
            ) : (
              <ExaminationsList
                examinations={examinations}
                onSelectExam={handleSelectExam}
                onOpenCreateExam={() => setIsCreateExamOpen(true)}
                onNavigateToUpload={handleNavigateToUpload}
              />
            )
          )}

          {/* TAB 3: UPLOAD ANSWER SHEETS */}
          {activeTab === 'upload' && (
            <UploadAnswerSheets
              examinations={examinations}
              selectedExamId={selectedExamId || 'exam-ds-ia1'}
              onAnalysisComplete={handleAnalysisComplete}
            />
          )}

          {/* TAB 4: ANSWER SHEET ANALYSIS RESULT */}
          {activeTab === 'analysis' && (
            <AnswerSheetAnalysisView
              result={currentEvaluationResult}
              onBack={() => setActiveTab('upload')}
              onSelectTab={setActiveTab}
              onSelectStudentProfile={handleSelectStudent}
            />
          )}

          {/* TAB 5: STUDENTS (LIST OR PROFILE) */}
          {activeTab === 'students' && (
            selectedStudentId && selectedStudent ? (
              <StudentProfileView
                student={selectedStudent}
                onBack={() => setSelectedStudentId(null)}
                onSelectTab={setActiveTab}
                onInspectAnswerSheet={handleInspectAnswerSheet}
              />
            ) : (
              <StudentsList
                students={students}
                onSelectStudent={handleSelectStudent}
                onInspectAnswerSheet={handleInspectAnswerSheet}
              />
            )
          )}

          {/* TAB 6: CLASS ANALYTICS */}
          {activeTab === 'analytics' && (
            <ClassAnalyticsView
              onSelectStudent={handleSelectStudent}
            />
          )}

          {/* TAB 7: RISK ANALYSIS / AT-RISK INTERVENTION */}
          {activeTab === 'risk' && (
            <RiskInterventionView
              onSelectStudent={handleSelectStudent}
              onInspectAnswerSheet={handleInspectAnswerSheet}
            />
          )}

          {/* TAB 8: REPORTS & EXPORTS */}
          {activeTab === 'reports' && (
            <ReportsView
              examinations={examinations}
              students={students}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <CreateExamModal
        isOpen={isCreateExamOpen}
        onClose={() => setIsCreateExamOpen(false)}
        onSubmit={handleCreateExam}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(prev => ({
            ...prev,
            name: user.name,
            email: user.email,
            role: user.role
          }));
        }}
      />
    </div>
  );
}

