import React from 'react';
import { 
  Users, 
  FileCheck2, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  BookOpen, 
  UploadCloud, 
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  Student, 
  Examination, 
  AtRiskStudent, 
  NavigationTab 
} from '../../types';
import { 
  classPerformanceTrendData, 
  conceptMasteryClassData,
  sampleAtRiskStudents 
} from '../../data/mockData';

interface OverviewDashboardProps {
  onSelectTab?: (tab: NavigationTab) => void;
  onNavigateTab?: (tab: NavigationTab) => void;
  onSelectStudent?: (studentId: string) => void;
  onSelectExam?: (examId: string) => void;
  onInspectAnswerSheet?: (sheetId: string) => void;
  onOpenCreateExam?: () => void;
  examinations?: Examination[];
  userName?: string;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onSelectTab,
  onNavigateTab,
  onSelectStudent,
  onSelectExam,
  onInspectAnswerSheet,
  onOpenCreateExam,
  examinations = [],
  userName = 'DR.RAGAVI PRIYA'
}) => {
  const handleTabChange = (tab: NavigationTab) => {
    if (onSelectTab) onSelectTab(tab);
    else if (onNavigateTab) onNavigateTab(tab);
  };

  const handleStudentSelect = (id: string) => {
    if (onSelectStudent) onSelectStudent(id);
  };

  const handleExamSelect = (id: string) => {
    if (onSelectExam) onSelectExam(id);
    else handleTabChange('examinations');
  };
  return (
    <div className="space-y-6 pb-12">
      {/* Top Greeting Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Good morning, {userName}
            </h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              Active Term
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Here's an overview of your students' learning performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="dashboard-upload-cta"
            onClick={() => handleTabChange('upload')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <UploadCloud className="w-4 h-4" />
            Evaluate Answer Sheets
          </button>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Students */}
        <div 
          id="metric-total-students"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">120</span>
            <span className="text-xs text-slate-500 font-medium">Across 4 batches</span>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <span className="text-emerald-700 font-semibold inline-flex items-center">
              <ArrowUpRight className="w-3 h-3" /> 100%
            </span>
            enrolled in active term
          </p>
        </div>

        {/* Metric 2: Evaluated Scripts */}
        <div 
          id="metric-evaluated-scripts"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Evaluated Scripts</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">96</span>
            <span className="text-xs text-slate-500 font-medium">/ 120 total</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-700 h-full rounded-full" style={{ width: '80%' }}></div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">24 scripts pending review</p>
        </div>

        {/* Metric 3: Average Score */}
        <div 
          id="metric-average-score"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Score</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">72.4%</span>
            <span className="text-xs font-semibold text-emerald-700 inline-flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +4.4%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Vs previous internal assessment (68.0%)
          </p>
        </div>

        {/* Metric 4: Students Needing Support */}
        <div 
          id="metric-students-needing-support"
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors cursor-pointer"
          onClick={() => handleTabChange('risk')}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Students Needing Support</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-700">18</span>
            <span className="text-xs text-slate-500 font-medium">15% of cohort</span>
          </div>
          <p className="text-xs text-amber-700 font-medium mt-2 flex items-center gap-1">
            <span>Action required: 6 high priority</span>
            <ChevronRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* Main Analytics Row: Line Chart + Concept Mastery Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Class Performance Line Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Class Performance Trend</h3>
              <p className="text-xs text-slate-500">Progressive cohort trajectory across internal assessments</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-700 inline-block"></span>
                <span className="text-slate-600 font-medium">Class Average</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 border-t-2 border-dashed border-slate-400 inline-block"></span>
                <span className="text-slate-500">Department Target</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={classPerformanceTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="testName" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} unit="%" />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Score']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#94a3b8" 
                  strokeDasharray="4 4" 
                  strokeWidth={1.5}
                  dot={false}
                  name="Target Benchmark"
                />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#1d4ed8" 
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#1d4ed8', stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                  name="Class Average"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Test 1</p>
              <p className="text-sm font-bold text-slate-800">64%</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Test 2</p>
              <p className="text-sm font-bold text-slate-800">68%</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Test 3</p>
              <p className="text-sm font-bold text-slate-800">71%</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Test 4</p>
              <p className="text-sm font-bold text-blue-700">76%</p>
            </div>
          </div>
        </div>

        {/* Concept Mastery Horizontal Bar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Concept Mastery</h3>
                <p className="text-xs text-slate-500">Domain-wise cohort comprehension index</p>
              </div>
              <button 
                onClick={() => handleTabChange('analytics')}
                className="text-xs text-blue-700 font-semibold hover:underline"
              >
                Deep Dive
              </button>
            </div>

            <div className="space-y-3.5 mt-4">
              {(conceptMasteryClassData || []).map((item) => (
                <div key={item.concept} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-800">{item.concept}</span>
                    <span className="font-bold text-slate-900">{item.mastery}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.mastery >= 75 ? 'bg-blue-700' :
                        item.mastery >= 65 ? 'bg-blue-500' :
                        'bg-amber-600'
                      }`} 
                      style={{ width: `${item.mastery}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg mt-4">
            <div className="flex items-start gap-2">
              <div className="p-1 rounded bg-amber-100 text-amber-800 shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-900">Key Insight:</strong> Operating Systems (57%) and Computer Networks (61%) show concept gaps in memory management and packet routing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Students Requiring Attention Table + Active Examinations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Students Requiring Attention (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Students Requiring Attention</h3>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded">
                  Prototype Risk Analysis
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Automated detection based on evaluation results and concept gaps</p>
            </div>
            <button
              onClick={() => handleTabChange('risk')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <span>View All (18)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Weak Area</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(sampleAtRiskStudents || []).slice(0, 4).map((student) => (
                  <tr key={student.studentId} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-semibold text-slate-900">{student.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{student.rollNumber}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {student.score}%
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {student.weakArea}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        student.riskLevel === 'High' 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {student.riskLevel === 'High' ? 'Needs Support' : 'Monitor'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleStudentSelect(student.studentId)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 rounded border border-blue-200 transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Examinations Quick Access (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Current Examinations</h3>
                <p className="text-xs text-slate-500">Assessments in progress & graded</p>
              </div>
              <button 
                onClick={() => handleTabChange('examinations')}
                className="text-xs text-blue-700 font-semibold hover:underline"
              >
                Manage
              </button>
            </div>

            <div className="space-y-3 mt-3">
              {(examinations || []).map((exam) => (
                <div 
                  key={exam.id}
                  onClick={() => handleExamSelect(exam.id)}
                  className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-slate-500">{exam.code}</span>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-1">{exam.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{exam.subject} • {exam.date}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      exam.status === 'Graded'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : exam.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {exam.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    <span>Evaluated: <strong>{exam.evaluatedCount}/{exam.totalStudents}</strong></span>
                    <span>Class Avg: <strong className="text-slate-900">{exam.averageScore}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => handleTabChange('upload')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs rounded-lg border border-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5 text-slate-600" />
              Upload New Student Batch (PDF/JPG)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
