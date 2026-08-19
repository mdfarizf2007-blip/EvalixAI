import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Filter, 
  Download, 
  Sparkles,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  classPerformanceTrendData, 
  conceptMasteryClassData, 
  scoreDistributionData, 
  commonMistakesDistribution,
  sampleStudents,
  sampleExaminations 
} from '../../data/mockData';

interface ClassAnalyticsViewProps {
  onSelectStudent: (studentId: string) => void;
}

export const ClassAnalyticsView: React.FC<ClassAnalyticsViewProps> = ({
  onSelectStudent
}) => {
  const [selectedSubject, setSelectedSubject] = useState('Data Structures & Algorithms');
  const [selectedExam, setSelectedExam] = useState('CS301-IA1');
  const [performanceFilter, setPerformanceFilter] = useState('All');

  const questionDifficultyData = [
    { qNo: 'Q1', topic: 'Stack LIFO', avgPct: 84, difficulty: 'Easy', discIndex: 0.38 },
    { qNo: 'Q2', topic: 'Circular Queue', avgPct: 66, difficulty: 'Medium', discIndex: 0.45 },
    { qNo: 'Q3', topic: 'Tree Traversals', avgPct: 88, difficulty: 'Easy', discIndex: 0.32 },
    { qNo: 'Q4', topic: 'DLL Deletions', avgPct: 54, difficulty: 'Hard', discIndex: 0.62 },
    { qNo: 'Q5', topic: 'Recursion Trees', avgPct: 58, difficulty: 'Hard', discIndex: 0.58 },
    { qNo: 'Q6', topic: 'Infix to Postfix', avgPct: 78, difficulty: 'Medium', discIndex: 0.40 },
    { qNo: 'Q7', topic: 'Big-O Formal Bounds', avgPct: 46, difficulty: 'Hard', discIndex: 0.68 },
    { qNo: 'Q8', topic: 'Binary Search', avgPct: 82, difficulty: 'Easy', discIndex: 0.35 },
    { qNo: 'Q9', topic: 'Hash Collisions', avgPct: 72, difficulty: 'Medium', discIndex: 0.42 },
    { qNo: 'Q10', topic: 'Graph BFS', avgPct: 76, difficulty: 'Medium', discIndex: 0.44 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Class Learning Analytics</h2>
            <span className="text-xs px-2.5 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded border border-blue-200">
              Aggregated Cohort Diagnostics
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-0.5">
            Holistic assessment metrics, concept gaps, item response difficulty, and cognitive taxonomy
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2 text-xs font-semibold border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-600"
          >
            {sampleExaminations.map(ex => (
              <option key={ex.id} value={ex.code}>{ex.code} - {ex.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Average Class Score</span>
          <p className="text-2xl font-bold text-blue-700 mt-1">72.4%</p>
          <p className="text-[11px] text-emerald-700 mt-1">Benchmark: 70.0%</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Highest Score</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">94%</p>
          <p className="text-[11px] text-slate-500 mt-1">Aakash R (23CS0107)</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Lowest Score</span>
          <p className="text-2xl font-bold text-rose-700 mt-1">38%</p>
          <p className="text-[11px] text-rose-600 mt-1">Target for support</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Pass Percentage</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">84%</p>
          <p className="text-[11px] text-slate-500 mt-1">Threshold: &gt;= 40%</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Students At Risk</span>
          <p className="text-2xl font-bold text-amber-700 mt-1">18</p>
          <p className="text-[11px] text-amber-600 mt-1">Intervention needed</p>
        </div>
      </div>

      {/* Row 1 Charts: Score Distribution + Common Mistakes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Distribution Histogram (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Score Distribution Curve</h3>
              <p className="text-xs text-slate-500">Frequency distribution across performance brackets</p>
            </div>
            <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-700">
              N = 32 Students
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} allowDecimals={false} />
                <Tooltip 
                  formatter={(val: number) => [`${val} Students`, 'Count']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]}>
                  {scoreDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : index === 4 ? '#10b981' : '#2563eb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Common Mistakes Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Cognitive Error Classification</h3>
            <p className="text-xs text-slate-500">Root-cause categorizations identified in student answer sheets</p>

            <div className="h-52 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={commonMistakesDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {commonMistakesDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: number, name: string) => [`${val}% of errors`, name]}
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
            {commonMistakesDistribution.map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }}></span>
                  <span className="text-slate-700 font-medium">{m.name}</span>
                </div>
                <span className="font-bold text-slate-900">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Question Difficulty & Discrimination Index Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Question Difficulty & Discrimination Analysis</h3>
            <p className="text-xs text-slate-500">Item response statistics to evaluate question validity and concept clarity</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-200 text-slate-700">
            Psychometric Rubric
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider bg-slate-50/60">
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Topic / Concept</th>
                <th className="py-3 px-4">Cohort Average Score</th>
                <th className="py-3 px-4">Difficulty Rating</th>
                <th className="py-3 px-4">Discrimination Index (d)</th>
                <th className="py-3 px-4">Diagnostic Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {questionDifficultyData.map((q) => (
                <tr key={q.qNo} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-700">{q.qNo}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{q.topic}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{q.avgPct}%</span>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${q.avgPct}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      q.difficulty === 'Hard' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">
                    +{q.discIndex.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-[11px]">
                    {q.discIndex > 0.5 ? 'High discriminator (separates top vs struggling students effectively)' :
                     q.avgPct < 50 ? 'Significant class-wide misconception; review in next lecture' :
                     'Well-understood foundational concept'}
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
