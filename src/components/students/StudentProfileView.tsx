import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Printer, 
  Calendar, 
  FileText,
  Mail,
  Award,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Student, NavigationTab } from '../../types';

interface StudentProfileViewProps {
  student: Student;
  onBack: () => void;
  onSelectTab: (tab: NavigationTab) => void;
  onInspectAnswerSheet: (sheetId: string) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  student,
  onBack,
  onSelectTab,
  onInspectAnswerSheet
}) => {
  const isImproving = (student?.improvementPercentage ?? 0) >= 0;

  const trajectoryData = (student?.recentScores || []).map(score => ({
    exam: score.examName,
    studentScore: score.score,
    classAverage: 72
  }));

  const studentInitials = (student?.name || 'Student')
    .split(' ')
    .filter(Boolean)
    .map(n => n[0] || '')
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students Directory</span>
        </button>

        <button
          onClick={() => onSelectTab('reports')}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Generate Student Diagnostic Report</span>
        </button>
      </div>

      {/* Student Profile Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-bold text-xl flex items-center justify-center shadow-xs">
              {studentInitials || 'ST'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold text-slate-900">{student?.name || 'Student Profile'}</h2>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {student?.rollNumber || 'N/A'}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                  student?.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  student?.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {student?.riskLevel === 'None' ? 'Good Standing' : `Risk: ${student?.riskLevel || 'None'}`}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                <span>{student?.department || 'CSE'} • Semester {student?.semester || 3} (Sec {student?.section || 'A'})</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {student?.email || 'N/A'}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center min-w-28">
              <p className="text-[10px] uppercase font-semibold text-slate-400">Current Average</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{student?.currentAverage ?? 0}%</p>
              <p className="text-[10px] text-slate-400">Previous: {student?.previousAverage ?? 0}%</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center min-w-28">
              <p className="text-[10px] uppercase font-semibold text-slate-400">Improvement</p>
              <p className={`text-2xl font-bold mt-0.5 flex items-center justify-center gap-0.5 ${
                isImproving ? 'text-emerald-700' : 'text-rose-700'
              }`}>
                {isImproving ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                {isImproving ? `+${student?.improvementPercentage ?? 0}%` : `${student?.improvementPercentage ?? 0}%`}
              </p>
              <p className="text-[10px] text-slate-400">Across 4 tests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart & Concept Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Longitudinal Trajectory Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Academic Trajectory Over Time</h3>
              <p className="text-xs text-slate-500">Student score vs cohort benchmark</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-700 inline-block"></span>
                <span className="text-slate-600 font-medium">Student Score</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 border-t-2 border-dashed border-slate-400 inline-block"></span>
                <span className="text-slate-500">Class Average</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="exam" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} unit="%" />
                <Tooltip 
                  formatter={(val: number) => [`${val}%`, 'Score']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="classAverage" 
                  stroke="#94a3b8" 
                  strokeDasharray="4 4" 
                  strokeWidth={1.5}
                  name="Class Average"
                />
                <Line 
                  type="monotone" 
                  dataKey="studentScore" 
                  stroke="#1d4ed8" 
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#1d4ed8', stroke: '#ffffff', strokeWidth: 2 }}
                  name="Student Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strong & Weak Concepts (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Concept Mastery Profile</h3>
            <p className="text-xs text-slate-500">Synthesized cognitive strengths & focus areas</p>

            {/* Strong Concepts */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Strongest Concepts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(student?.strongConcepts || []).map((c, i) => (
                  <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Weak Concepts */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                Weak Concepts (Target Gaps):
              </span>
              {(student?.weakConcepts || []).length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {(student?.weakConcepts || []).map((c, i) => (
                    <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 border border-rose-200">
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200">
                  No critical concept deficiencies detected.
                </p>
              )}
            </div>
          </div>

          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
            <strong>Recommended Teacher Action:</strong> Focus on pointer re-assignment trace diagrams during tutorial sessions.
          </div>
        </div>
      </div>

      {/* Recent Assessment Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Assessments & Answer Sheets</h3>
            <p className="text-xs text-slate-500">History of evaluated scripts and diagnostic breakdown</p>
          </div>
          <span className="text-xs font-medium text-slate-500">{(student?.recentScores || []).length} Evaluations on Record</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
                <th className="py-3 px-4">Examination</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Score Awarded</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Performance Rating</th>
                <th className="py-3 px-4 text-right">Answer Sheet Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(student?.recentScores || []).map((rec, idx) => {
                const pct = Math.round((rec.score / rec.maxScore) * 100);
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{rec.examName}</td>
                    <td className="py-3.5 px-4 text-slate-600">{rec.date}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 text-sm">
                      {rec.score} <span className="text-slate-400 text-xs font-normal">/ {rec.maxScore}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{pct}%</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        pct >= 80 ? 'bg-emerald-50 text-emerald-700' :
                        pct >= 65 ? 'bg-blue-50 text-blue-700' :
                        pct >= 50 ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {pct >= 80 ? 'Distinction' : pct >= 65 ? 'Good' : pct >= 50 ? 'Average' : 'Needs Support'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onInspectAnswerSheet('sheet-001')}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Inspect Script</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
