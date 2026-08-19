import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  UploadCloud, 
  Users, 
  BarChart3, 
  ChevronRight,
  Download,
  Eye,
  Sliders,
  HelpCircle
} from 'lucide-react';
import { Examination, Question, Student } from '../../types';
import { examDSQuestions, sampleStudents, sampleUploadedSheets } from '../../data/mockData';

interface ExamDetailViewProps {
  exam: Examination;
  onBack: () => void;
  onNavigateToUpload: (examId: string) => void;
  onInspectAnswerSheet: (sheetId: string) => void;
  onSelectStudent: (studentId: string) => void;
}

export const ExamDetailView: React.FC<ExamDetailViewProps> = ({
  exam,
  onBack,
  onNavigateToUpload,
  onInspectAnswerSheet,
  onSelectStudent
}) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'questions' | 'rubric'>('submissions');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>('q1');

  const questions = examDSQuestions;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Examinations</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToUpload(exam.id)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors shadow-xs"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Student Answer Sheets</span>
          </button>
        </div>
      </div>

      {/* Exam Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {exam.code}
              </span>
              <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded">
                Semester {exam.semester} • {exam.department}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {exam.status}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">{exam.title}</h2>
            <p className="text-xs text-slate-500 mt-1">
              Assessment Date: {exam.date} • Total Marks: {exam.totalMarks} • Duration: {exam.durationMinutes} mins • Questions: {exam.totalQuestions}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center min-w-24">
              <p className="text-[10px] uppercase font-semibold text-slate-400">Class Average</p>
              <p className="text-xl font-bold text-blue-700">{exam.averageScore}%</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center min-w-24">
              <p className="text-[10px] uppercase font-semibold text-slate-400">Evaluated</p>
              <p className="text-xl font-bold text-slate-900">{exam.evaluatedCount} / {exam.totalStudents}</p>
            </div>
          </div>
        </div>

        {/* Attached Files Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-4 flex-wrap text-xs">
          <span className="text-slate-500 font-medium">Master Assets:</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-slate-700">
            <FileText className="w-3.5 h-3.5 text-blue-700" />
            <span>Question Paper: {exam.questionPaperName || 'Master_Paper.pdf'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Answer Scheme: {exam.answerKeyName || 'Official_Key.pdf'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'submissions'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Submissions ({sampleStudents.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'questions'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Question Blueprint & Rubrics ({questions.length})</span>
        </button>
      </div>

      {/* Tab 1: Submissions */}
      {activeTab === 'submissions' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Evaluated Answer Sheets</h3>
              <p className="text-xs text-slate-500">Student answers processed with AI extraction and conceptual scoring</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200">
              AI-assisted evaluation
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-3 px-4">Roll No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Performance</th>
                  <th className="py-3 px-4">Weak Concept Detected</th>
                  <th className="py-3 px-4">Risk Status</th>
                  <th className="py-3 px-4 text-right">Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(sampleStudents || []).map((std) => {
                  const scoreObj = (std.recentScores || []).find(s => s.examName.includes('CS301')) || (std.recentScores || [])[0];
                  const score = scoreObj ? scoreObj.score : std.currentAverage;
                  return (
                    <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{std.rollNumber}</td>
                      <td className="py-3 px-4">
                        <span 
                          onClick={() => onSelectStudent(std.id)}
                          className="font-bold text-slate-900 hover:text-blue-700 cursor-pointer"
                        >
                          {std.name}
                        </span>
                        <p className="text-[11px] text-slate-400">{std.email}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-sm text-slate-900">{score}</span>
                        <span className="text-slate-400"> / 100</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          score >= 80 ? 'bg-emerald-50 text-emerald-700' :
                          score >= 65 ? 'bg-blue-50 text-blue-700' :
                          score >= 50 ? 'bg-amber-50 text-amber-700' :
                          'bg-rose-50 text-rose-700'
                        }`}>
                          {score >= 80 ? 'Distinction' : score >= 65 ? 'Good' : score >= 50 ? 'Average' : 'Needs Support'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {(std.weakConcepts || []).length > 0 ? (
                          <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 text-[11px] font-medium">
                            {std.weakConcepts[0]}
                          </span>
                        ) : (
                          <span className="text-emerald-700 text-[11px]">All Concepts Cleared</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          std.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          std.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {std.riskLevel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onInspectAnswerSheet('sheet-001')}
                          className="px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Sheet Analysis</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Questions & Rubrics */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Question Blueprint</h3>
              <p className="text-xs text-slate-500">Official model answers, marking rubrics, and taxonomy mapping</p>
            </div>
            <span className="text-xs font-mono text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200">
              Total 100 Marks
            </span>
          </div>

          <div className="space-y-3">
            {(questions || []).map((q) => {
              const isExpanded = expandedQuestion === q.id;
              return (
                <div 
                  key={q.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                >
                  <div 
                    onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                    className="p-4 flex items-start justify-between cursor-pointer hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0 border border-blue-200">
                        Q{q.questionNumber}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{q.questionText}</h4>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                          <span>Topic: <strong className="text-slate-700">{q.topic}</strong></span>
                          <span>•</span>
                          <span>Concept: <strong className="text-slate-700">{q.concept}</strong></span>
                          <span>•</span>
                          <span className={`font-semibold ${q.difficulty === 'Hard' ? 'text-rose-600' : q.difficulty === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {q.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                        {q.maxMarks} Marks
                      </span>
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-3 text-xs">
                      <div>
                        <p className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">Model Solution Answer:</p>
                        <p className="text-slate-800 bg-white p-3 rounded-lg border border-slate-200 mt-1 font-mono text-[11px] leading-relaxed">
                          {q.modelAnswer}
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">Marking Scheme & Rubric Points:</p>
                        <ul className="mt-1 space-y-1 list-disc list-inside text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                          {(q.rubricKeypoints || []).map((rk, idx) => (
                            <li key={idx}>{rk}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
