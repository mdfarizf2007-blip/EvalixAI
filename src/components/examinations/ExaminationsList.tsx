import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  BookOpen, 
  Calendar, 
  Users, 
  FileCheck, 
  BarChart2, 
  UploadCloud, 
  ChevronRight,
  Download,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';
import { Examination, NavigationTab } from '../../types';

interface ExaminationsListProps {
  examinations: Examination[];
  onSelectExam: (examId: string) => void;
  onOpenCreateExam: () => void;
  onNavigateToUpload: (examId?: string) => void;
}

export const ExaminationsList: React.FC<ExaminationsListProps> = ({
  examinations,
  onSelectExam,
  onOpenCreateExam,
  onNavigateToUpload
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Graded' | 'In Progress'>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const filteredExams = examinations.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exam.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || exam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Examinations</h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Manage course assessments, evaluation schemes, and student response scripts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="create-examination-btn"
            onClick={onOpenCreateExam}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            + Create Examination
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, course code, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Status:</span>
          </div>
          {(['All', 'Active', 'In Progress', 'Graded'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-blue-700 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}

          <div className="border-l border-slate-200 pl-3 flex items-center gap-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 py-1 text-xs rounded font-medium ${viewMode === 'cards' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 text-xs rounded font-medium ${viewMode === 'table' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredExams.length === 0 && (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-xs">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No examinations found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            No assessment matching your search or filters. Create a new examination or clear the filters.
          </p>
          <button
            onClick={onOpenCreateExam}
            className="px-4 py-2 bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-blue-800 transition-colors"
          >
            + Create Examination
          </button>
        </div>
      )}

      {/* Cards View */}
      {viewMode === 'cards' && filteredExams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExams.map((exam) => {
            const completionPct = Math.round((exam.evaluatedCount / exam.totalStudents) * 100);
            return (
              <div
                key={exam.id}
                id={`exam-card-${exam.id}`}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {exam.code}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-2 hover:text-blue-700 transition-colors cursor-pointer" onClick={() => onSelectExam(exam.id)}>
                        {exam.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">{exam.subject} • Semester {exam.semester}</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                      exam.status === 'Graded'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : exam.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {exam.status}
                    </span>
                  </div>

                  {/* Metadata stats */}
                  <div className="grid grid-cols-3 gap-3 my-4 p-3 bg-slate-50 border border-slate-100 rounded-lg text-center">
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-400">Date</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{exam.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-400">Total Marks</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{exam.totalMarks} M ({exam.totalQuestions} Qs)</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-400">Class Avg</p>
                      <p className="text-xs font-bold text-blue-700 mt-0.5">{exam.averageScore > 0 ? `${exam.averageScore}%` : 'Pending'}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Evaluated Answer Sheets</span>
                      <span className="font-semibold text-slate-900">{exam.evaluatedCount} / {exam.totalStudents} ({completionPct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${completionPct === 100 ? 'bg-emerald-600' : 'bg-blue-700'}`}
                        style={{ width: `${completionPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onNavigateToUpload(exam.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    Upload Scripts
                  </button>
                  <button
                    onClick={() => onSelectExam(exam.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 px-3.5 py-1.5 rounded-lg transition-colors shadow-2xs"
                  >
                    <span>View Analysis</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filteredExams.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Exam & Subject</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Enrolled</th>
                  <th className="py-3 px-4">Evaluated</th>
                  <th className="py-3 px-4">Average Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-mono text-[10px] text-blue-700 font-bold">{exam.code}</span>
                        <p className="font-bold text-slate-900 text-sm">{exam.title}</p>
                        <p className="text-[11px] text-slate-500">{exam.subject} • Sem {exam.semester}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{exam.date}</td>
                    <td className="py-3.5 px-4 text-slate-700">{exam.totalStudents} Students</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900">{exam.evaluatedCount}</span>
                      <span className="text-slate-400"> / {exam.totalStudents}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {exam.averageScore > 0 ? `${exam.averageScore}%` : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        exam.status === 'Graded'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : exam.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {exam.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onNavigateToUpload(exam.id)}
                          title="Upload answer sheets"
                          className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded border border-slate-200"
                        >
                          <UploadCloud className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onSelectExam(exam.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors"
                        >
                          Open
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
