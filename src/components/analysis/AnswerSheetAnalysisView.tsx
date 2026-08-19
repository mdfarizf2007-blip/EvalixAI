import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Download, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Eye, 
  ChevronRight, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  User, 
  Share2,
  Printer,
  ShieldCheck,
  Target
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { EvaluationResult, QuestionEvaluation, MistakeType, NavigationTab } from '../../types';
import { QuestionDetailModal } from './QuestionDetailModal';

interface AnswerSheetAnalysisViewProps {
  result: EvaluationResult;
  onBack: () => void;
  onSelectTab: (tab: NavigationTab) => void;
  onSelectStudentProfile: (studentId: string) => void;
}

export const AnswerSheetAnalysisView: React.FC<AnswerSheetAnalysisViewProps> = ({
  result,
  onBack,
  onSelectTab,
  onSelectStudentProfile
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'concepts' | 'mistakes' | 'recommendations' | 'extracted'>('overview');
  const [selectedQuestionForModal, setSelectedQuestionForModal] = useState<QuestionEvaluation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<EvaluationResult>(result);

  const handleOpenQuestionModal = (question: QuestionEvaluation) => {
    setSelectedQuestionForModal(question);
    setIsModalOpen(true);
  };

  const handleUpdateQuestionMarks = (questionId: string, newMarks: number) => {
    setCurrentResult(prev => {
      const updatedQuestions = (prev.questionEvaluations || []).map(q => {
        if (q.questionId === questionId) {
          return { ...q, awardedMarks: newMarks };
        }
        return q;
      });

      const newTotal = updatedQuestions.reduce((sum, q) => sum + q.awardedMarks, 0);
      const newPct = Math.round((newTotal / (prev.maxMarks || 100)) * 100);

      return {
        ...prev,
        totalScore: newTotal,
        percentage: newPct,
        questionEvaluations: updatedQuestions,
        isOverridden: true
      };
    });
  };

  const mistakeChartData = (currentResult?.mistakeBreakdown || []).map(item => {
    let color = '#2563eb';
    if (item.type === 'Conceptual') color = '#2563eb';
    else if (item.type === 'Calculation') color = '#f59e0b';
    else if (item.type === 'Careless') color = '#64748b';
    else if (item.type === 'Incomplete') color = '#ef4444';
    else if (item.type === 'None') color = '#10b981';

    return {
      name: item.type,
      value: item.count,
      color,
      description: item.description,
      topics: item.affectedTopics || []
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          id="back-to-upload-btn"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-2xs transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Uploads & Answer Sheets</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectStudentProfile(currentResult.studentId)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Profile</span>
          </button>
          <button
            onClick={() => onSelectTab('reports')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {currentResult.rollNumber}
              </span>
              <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded">
                {currentResult.subject}
              </span>
              <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded">
                {currentResult.examTitle}
              </span>
              {currentResult.isOverridden && (
                <span className="text-[11px] font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded">
                  Teacher Adjusted
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Answer Sheet Analysis: {currentResult.studentName}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Evaluated on {currentResult.date} • AI-assisted OCR & conceptual diagnostic evaluation
            </p>
          </div>

          {/* Key Score Highlight Cards */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-center min-w-28">
              <p className="text-[10px] uppercase font-semibold text-slate-400">Total Score</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {currentResult.totalScore} <span className="text-sm font-normal text-slate-400">/ {currentResult.maxMarks}</span>
              </p>
            </div>

            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-center min-w-28">
              <p className="text-[10px] uppercase font-semibold text-blue-600">Percentage</p>
              <p className="text-2xl font-bold text-blue-700 mt-0.5">{currentResult.percentage}%</p>
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center min-w-28">
              <p className="text-[10px] uppercase font-semibold text-emerald-600">Performance</p>
              <p className="text-base font-bold text-emerald-800 mt-1">{currentResult.performanceRating}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-6 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'questions', label: 'Question Analysis' },
          { id: 'concepts', label: 'Concept Analysis' },
          { id: 'mistakes', label: 'Mistakes Breakdown' },
          { id: 'recommendations', label: 'Recommendations' },
          { id: 'extracted', label: 'Extracted Script' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap px-1 ${
              activeTab === tab.id
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Overall Score</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{currentResult.totalScore} / {currentResult.maxMarks}</p>
              <p className="text-[11px] text-slate-400 mt-1">Rubric aligned</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Accuracy</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{currentResult.accuracy}%</p>
              <p className="text-[11px] text-emerald-700 mt-1">Normalized response accuracy</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Questions Attempted</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{currentResult.questionsAttempted} / {currentResult.totalQuestions}</p>
              <p className="text-[11px] text-slate-400 mt-1">100% submission rate</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Concepts Mastered</p>
              <p className="text-xl font-bold text-blue-700 mt-1">{currentResult.conceptsMasteredCount} / {currentResult.totalConceptsCount}</p>
              <p className="text-[11px] text-slate-400 mt-1">58% syllabus clearance</p>
            </div>
          </div>

          {/* Strengths & Areas for Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Demonstrated Strengths</h3>
                  <p className="text-[11px] text-slate-500">Concepts with high conceptual fidelity</p>
                </div>
              </div>

              <ul className="space-y-2.5 mt-4">
                {currentResult.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                    <span className="font-medium text-slate-800">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Areas for Improvement</h3>
                  <p className="text-[11px] text-slate-500">Targeted gaps requiring pedagogical intervention</p>
                </div>
              </div>

              <ul className="space-y-2.5 mt-4">
                {currentResult.areasForImprovement.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 p-2.5 bg-rose-50/50 border border-rose-100 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0"></span>
                    <span className="font-medium text-slate-800">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Snapshot Table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Question Performance Summary</h3>
                <p className="text-xs text-slate-500">Quick view of awarded marks per question</p>
              </div>
              <button
                onClick={() => setActiveTab('questions')}
                className="text-xs text-blue-700 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Full Question Analysis</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
              {currentResult.questionEvaluations.map((q) => (
                <div
                  key={q.questionId}
                  onClick={() => handleOpenQuestionModal(q)}
                  className="p-2.5 bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-lg text-center cursor-pointer transition-all hover:bg-blue-50/40"
                >
                  <p className="text-[10px] font-bold text-slate-400">Q{q.questionNumber}</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{q.awardedMarks}/{q.maxMarks}</p>
                  <span className={`inline-block w-2 h-2 rounded-full mt-1 ${
                    q.awardedMarks >= 8 ? 'bg-emerald-500' :
                    q.awardedMarks >= 5 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUESTION ANALYSIS */}
      {activeTab === 'questions' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Question-wise Evaluation Table</h3>
              <p className="text-xs text-slate-500">Click any row to inspect extracted student handwriting, rubric breakdown, and AI feedback</p>
            </div>
            <span className="text-xs font-medium text-slate-500">
              10 Questions Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider bg-slate-50/60">
                  <th className="py-3 px-4">Question</th>
                  <th className="py-3 px-4">Question Prompt</th>
                  <th className="py-3 px-4">Marks</th>
                  <th className="py-3 px-4">Max</th>
                  <th className="py-3 px-4">Result</th>
                  <th className="py-3 px-4">Error Type</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentResult.questionEvaluations.map((q) => (
                  <tr 
                    key={q.questionId}
                    onClick={() => handleOpenQuestionModal(q)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-blue-700">
                      Q{q.questionNumber}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 max-w-xs truncate">
                      {q.questionText}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                      {q.awardedMarks}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {q.maxMarks}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        q.resultStatus === 'Correct' ? 'bg-emerald-50 text-emerald-700' :
                        q.resultStatus === 'Good' ? 'bg-blue-50 text-blue-700' :
                        q.resultStatus === 'Partial' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {q.resultStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        q.errorType === 'Conceptual' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                        q.errorType === 'Calculation' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        q.errorType === 'Careless' ? 'bg-slate-100 text-slate-700' :
                        q.errorType === 'Incomplete' ? 'bg-rose-50 text-rose-800' :
                        'text-emerald-700'
                      }`}>
                        {q.errorType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleOpenQuestionModal(q); }}
                        className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-50 border border-blue-200 rounded transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CONCEPT ANALYSIS */}
      {activeTab === 'concepts' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Concept Mastery Dashboard</h3>
                <p className="text-xs text-slate-500">Fine-grained conceptual understanding mapped to course syllabus</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                {currentResult.conceptMastery.length} Concepts Analyzed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="py-3 px-4">Concept</th>
                    <th className="py-3 px-4 text-right">Mastery %</th>
                    <th className="py-3 px-4 w-1/3">Mastery Level Bar</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Diagnostic Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentResult.conceptMastery.map((item) => (
                    <tr key={item.concept} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{item.concept}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">{item.mastery}%</td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.mastery >= 80 ? 'bg-emerald-600' :
                              item.mastery >= 70 ? 'bg-blue-600' :
                              item.mastery >= 55 ? 'bg-amber-600' :
                              'bg-rose-600'
                            }`}
                            style={{ width: `${item.mastery}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.status === 'Strong' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          item.status === 'Good' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          item.status === 'Needs Improvement' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {item.status === 'Strong' ? 'High retention & correct edge case execution.' :
                         item.status === 'Good' ? 'Clear foundational grasp; minor precision gaps.' :
                         item.status === 'Needs Improvement' ? 'Needs additional pointer-tracking practice.' :
                         'Critical gap; schedule remedial concept session.'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MISTAKES BREAKDOWN */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Donut Chart (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Mistake Taxonomy</h3>
                <p className="text-xs text-slate-500">Distribution of errors classified by underlying cognitive cause</p>
                
                <div className="h-56 w-full mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mistakeChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {mistakeChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(val: number, name: string) => [`${val} Questions`, name]}
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
                {mistakeChartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-700 font-medium">{item.name}: <strong>{item.value}</strong></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mistake Detail Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {currentResult.mistakeBreakdown.map((item) => (
                <div key={item.type} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        item.type === 'Conceptual' ? 'bg-blue-600' :
                        item.type === 'Calculation' ? 'bg-amber-500' :
                        item.type === 'Careless' ? 'bg-slate-500' :
                        item.type === 'Incomplete' ? 'bg-rose-500' :
                        'bg-emerald-500'
                      }`}></span>
                      <h4 className="text-sm font-bold text-slate-900">{item.type} Errors</h4>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-800">
                      {item.count} Questions
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                  {item.affectedTopics.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-slate-400 font-medium">Affected Topics:</span>
                      {item.affectedTopics.map((topic, i) => (
                        <span key={i} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RECOMMENDATIONS */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-blue-700" />
              <h3 className="text-base font-bold text-slate-900">Recommended Learning Path</h3>
            </div>
            <p className="text-xs text-slate-500">
              Personalized revision modules synthesized from error patterns and syllabus taxonomy
            </p>

            <div className="space-y-4 mt-6">
              {currentResult.learningPath.map((item) => (
                <div 
                  key={item.priority}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        P{item.priority}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.topic}</h4>
                        <span className="text-[11px] text-slate-500">Estimated Effort: {item.estimatedHours} • {item.difficulty}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200 self-start sm:self-auto">
                      Priority {item.priority}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Diagnostic Reasoning:</p>
                    <p className="text-slate-700 mt-0.5 italic">"{item.reason}"</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800 mb-1.5">Actionable Steps:</p>
                    <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                      {item.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  {item.practiceResources && item.practiceResources.length > 0 && (
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 flex-wrap">
                      <span className="font-semibold text-slate-700">Course Materials:</span>
                      {item.practiceResources.map((res, i) => (
                        <span key={i} className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-mono">
                          {res}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: EXTRACTED SCRIPT */}
      {activeTab === 'extracted' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Extracted Answer Script & OCR Logs</h3>
              <p className="text-xs text-slate-500">Transcribed student handwriting with bounding box segmentations</p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
              Confidence Avg: 94.2%
            </span>
          </div>

          <div className="space-y-3">
            {currentResult.questionEvaluations.map((q) => (
              <div key={q.questionId} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700">Q{q.questionNumber}: {q.questionText}</span>
                  <span className="text-xs font-mono font-bold text-slate-700">{q.awardedMarks} / {q.maxMarks} M</span>
                </div>
                <div className="p-3 bg-slate-900 text-slate-200 font-mono text-xs rounded-lg overflow-x-auto leading-relaxed">
                  {q.studentAnswerText}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Detail Modal */}
      <QuestionDetailModal
        isOpen={isModalOpen}
        question={selectedQuestionForModal}
        onClose={() => setIsModalOpen(false)}
        onUpdateQuestionMarks={handleUpdateQuestionMarks}
      />
    </div>
  );
};
