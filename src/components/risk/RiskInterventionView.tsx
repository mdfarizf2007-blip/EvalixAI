import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  UserX, 
  TrendingDown, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  FileText,
  Clock,
  Send,
  Plus
} from 'lucide-react';
import { AtRiskStudent } from '../../types';
import { sampleAtRiskStudents } from '../../data/mockData';

interface RiskInterventionViewProps {
  onSelectStudent: (studentId: string) => void;
  onInspectAnswerSheet: (sheetId: string) => void;
}

export const RiskInterventionView: React.FC<RiskInterventionViewProps> = ({
  onSelectStudent,
  onInspectAnswerSheet
}) => {
  const [selectedRisk, setSelectedRisk] = useState<'All' | 'High' | 'Medium'>('All');
  const [interventionSuccessMsg, setInterventionSuccessMsg] = useState('');

  const filteredStudents = sampleAtRiskStudents.filter(std => 
    selectedRisk === 'All' ? true : std.riskLevel === selectedRisk
  );

  const handleAction = (studentName: string, actionType: string) => {
    setInterventionSuccessMsg(`Intervention "${actionType}" dispatched for ${studentName}. Notification sent to student and assigned TA.`);
    setTimeout(() => setInterventionSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">At-Risk Student Prediction</h2>
            <span className="text-xs px-2.5 py-0.5 bg-amber-50 text-amber-800 font-semibold rounded border border-amber-200">
              Prototype Risk Analysis
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-0.5">
            Automated pedagogical early-warning system identifying downward score vectors and conceptual bottlenecks
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['All', 'High', 'Medium'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedRisk(lvl)}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${
                selectedRisk === lvl
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {lvl} Priority ({lvl === 'All' ? sampleAtRiskStudents.length : sampleAtRiskStudents.filter(s => s.riskLevel === lvl).length})
            </button>
          ))}
        </div>
      </div>

      {interventionSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{interventionSuccessMsg}</span>
          </div>
          <button onClick={() => setInterventionSuccessMsg('')} className="text-emerald-700 font-bold ml-2">×</button>
        </div>
      )}

      {/* Advisory Banner */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-3">
        <div className="p-1 rounded bg-amber-100 text-amber-800 shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <strong className="text-slate-900">Academic Prototype Notice:</strong> Risk categorizations are generated algorithmically from student answer sheet evaluation patterns, missing concepts, and historical scoring trajectories. Teachers should review qualitative context before finalizing remediation plans.
        </div>
      </div>

      {/* Table of Students Requiring Intervention */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Students Requiring Intervention</h3>
            <p className="text-xs text-slate-500">Early warning indicators and actionable remedial pathways</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-800 rounded border border-rose-200">
            {filteredStudents.length} Active Flags
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Current Score</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Diagnostic Reason</th>
                <th className="py-3 px-4">Primary Weak Area</th>
                <th className="py-3 px-4">Suggested Pedagogical Action</th>
                <th className="py-3 px-4 text-right">Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((std) => (
                <tr key={std.studentId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div 
                      className="cursor-pointer"
                      onClick={() => onSelectStudent(std.studentId)}
                    >
                      <p className="font-bold text-slate-900 text-sm hover:text-blue-700">{std.name}</p>
                      <p className="text-[11px] font-mono text-slate-400">{std.rollNumber}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 text-sm">{std.score}%</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                      std.riskLevel === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {std.riskLevel} Priority
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium max-w-xs">
                    {std.reason}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-100 font-semibold text-[11px]">
                      {std.weakArea}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs text-[11px]">
                    {std.suggestedAction}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleAction(std.name, 'Assign Worksheet')}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded font-semibold text-[11px] transition-colors"
                      >
                        Assign Task
                      </button>
                      <button
                        onClick={() => onSelectStudent(std.studentId)}
                        className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold text-[11px] transition-colors"
                      >
                        Profile
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
