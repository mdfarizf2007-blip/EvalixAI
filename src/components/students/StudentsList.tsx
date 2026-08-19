import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Mail
} from 'lucide-react';
import { Student, RiskLevel } from '../../types';

interface StudentsListProps {
  students: Student[];
  onSelectStudent: (studentId: string) => void;
  onInspectAnswerSheet: (sheetId: string) => void;
}

export const StudentsList: React.FC<StudentsListProps> = ({
  students = [],
  onSelectStudent,
  onInspectAnswerSheet
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'All' | RiskLevel>('All');

  const filteredStudents = (students || []).filter(student => {
    if (!student) return false;
    const matchesSearch = (student.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (student.rollNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (student.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'All' || student.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Student Directory</h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Longitudinal student learning trajectories, concept mastery profiles, and risk flags
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200">
            Total Cohort: {students.length} Students
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name, roll number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">Risk Status:</span>
          {(['All', 'High', 'Medium', 'Low', 'None'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setRiskFilter(lvl)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                riskFilter === lvl
                  ? 'bg-blue-700 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Current Average</th>
                <th className="py-3 px-4">Trajectory</th>
                <th className="py-3 px-4">Primary Weak Concept</th>
                <th className="py-3 px-4">Risk Flag</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((std) => {
                const isImproving = std.improvementPercentage >= 0;
                return (
                  <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div 
                        className="cursor-pointer"
                        onClick={() => onSelectStudent(std.id)}
                      >
                        <p className="font-bold text-slate-900 text-sm hover:text-blue-700">{std.name}</p>
                        <p className="text-[11px] text-slate-400">{std.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{std.rollNumber}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-sm text-slate-900">{std.currentAverage}%</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 font-semibold ${
                        isImproving ? 'text-emerald-700' : 'text-rose-700'
                      }`}>
                        {isImproving ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {isImproving ? `+${std.improvementPercentage}%` : `${std.improvementPercentage}%`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {(std.weakConcepts || []).length > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-100 font-medium text-[11px]">
                          {std.weakConcepts[0]}
                        </span>
                      ) : (
                        <span className="text-emerald-700 text-[11px]">All Concepts Clear</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        std.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        std.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        std.riskLevel === 'Low' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {std.riskLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onInspectAnswerSheet('sheet-001')}
                          title="Inspect latest answer sheet"
                          className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded border border-slate-200"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onSelectStudent(std.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors"
                        >
                          View Profile
                        </button>
                      </div>
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
