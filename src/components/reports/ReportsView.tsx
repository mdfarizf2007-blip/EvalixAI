import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  FileSpreadsheet, 
  Sparkles, 
  Calendar, 
  Filter, 
  Layers, 
  BookOpen, 
  Check, 
  Loader2,
  Share2
} from 'lucide-react';
import { Examination, Student } from '../../types';
import { sampleExaminations, sampleStudents } from '../../data/mockData';

interface ReportsViewProps {
  examinations: Examination[];
  students: Student[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  examinations = [],
  students = []
}) => {
  const [selectedExamId, setSelectedExamId] = useState(examinations[0]?.id || 'exam-ds-ia1');
  const [selectedReportType, setSelectedReportType] = useState<'student_diagnostic' | 'class_summary' | 'concept_mastery' | 'item_analysis'>('student_diagnostic');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'std-001');
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [includeMistakeBreakdown, setIncludeMistakeBreakdown] = useState(true);
  const [includeOcrTranscript, setIncludeOcrTranscript] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  const selectedStudent = (students || []).find(s => s.id === selectedStudentId) || students[0] || sampleStudents[0];
  const selectedExam = (examinations || []).find(e => e.id === selectedExamId) || examinations[0] || sampleExaminations[0];

  const handleGenerate = (format: 'pdf' | 'csv') => {
    setIsGenerating(true);
    setGeneratedSuccess(false);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedSuccess(true);

      // Trigger a browser print or download alert
      if (format === 'pdf') {
        window.print();
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Reports & Exports</h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Generate and export pedagogical diagnostic dossiers, class summaries, and psychometric logs
          </p>
        </div>
      </div>

      {generatedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>
              Report generated successfully for <strong>{selectedExam.title}</strong>. Ready for download and printing.
            </span>
          </div>
          <button onClick={() => setGeneratedSuccess(false)} className="text-emerald-700 font-bold ml-2">×</button>
        </div>
      )}

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Report Configuration Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-200">
            Report Parameters
          </h3>

          {/* Report Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Select Report Type</label>
            <div className="space-y-2">
              {[
                { id: 'student_diagnostic', title: 'Student Diagnostic Report', desc: 'Detailed marks, error breakdown, and learning path' },
                { id: 'class_summary', title: 'Class Performance Summary', desc: 'Cohort score distributions, averages, and pass rate' },
                { id: 'concept_mastery', title: 'Concept Mastery & Gaps', desc: 'Topic-wise syllabus clearance statistics' },
                { id: 'item_analysis', title: 'Question Difficulty & Discrimination', desc: 'Item response metrics and error taxonomy' }
              ].map((rpt) => (
                <div
                  key={rpt.id}
                  onClick={() => setSelectedReportType(rpt.id as any)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedReportType === rpt.id
                      ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{rpt.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{rpt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Examination</label>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-medium text-slate-800"
            >
              {examinations.map(ex => (
                <option key={ex.id} value={ex.id}>{ex.code} - {ex.title}</option>
              ))}
            </select>
          </div>

          {/* Student Selection (if individual report) */}
          {selectedReportType === 'student_diagnostic' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Target Student</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-medium text-slate-800"
              >
                {students.map(std => (
                  <option key={std.id} value={std.id}>{std.rollNumber} - {std.name} ({std.currentAverage}%)</option>
                ))}
              </select>
            </div>
          )}

          {/* Checkbox Options */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="text-xs font-bold text-slate-700">Include Sections</label>
            
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeRecommendations}
                onChange={(e) => setIncludeRecommendations(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>AI Pedagogical Recommendations & Remedial Steps</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMistakeBreakdown}
                onChange={(e) => setIncludeMistakeBreakdown(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>Cognitive Mistake Taxonomy (Conceptual vs Calculation)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeOcrTranscript}
                onChange={(e) => setIncludeOcrTranscript(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>Extracted OCR Handwriting Text Transcript</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex gap-2">
            <button
              onClick={() => handleGenerate('pdf')}
              disabled={isGenerating}
              className="flex-1 py-2.5 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={() => handleGenerate('csv')}
              disabled={isGenerating}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>CSV Data</span>
            </button>
          </div>
        </div>

        {/* Right: Real-time Formatted Report Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Live Preview</span>
              <h3 className="text-base font-bold text-slate-900">
                {selectedReportType === 'student_diagnostic' ? 'Student Learning Diagnostic Report' :
                 selectedReportType === 'class_summary' ? 'Class Performance Dossier' :
                 selectedReportType === 'concept_mastery' ? 'Concept Mastery Report' :
                 'Question Discrimination & Item Analysis'}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200">
              Evalix Academic Template
            </span>
          </div>

          {/* Academic Report Document Preview Box */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-300 space-y-5 text-xs text-slate-800 font-sans shadow-inner">
            {/* Institution / Report Title Header */}
            <div className="text-center pb-4 border-b border-slate-300">
              <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Department of Computer Science & Engineering</h4>
              <p className="text-xs text-slate-600">Student Learning Performance & Diagnostic Evaluation</p>
              <p className="text-[10px] text-slate-400 mt-1">Generated by Evalix AI Analytics Engine • Confidential Academic Record</p>
            </div>

            {/* Assessment Meta Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-white p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-400">Examination:</span>
                <p className="font-bold text-slate-900">{selectedExam.title}</p>
              </div>
              <div>
                <span className="text-slate-400">Course Code:</span>
                <p className="font-bold text-slate-900">{selectedExam.code}</p>
              </div>
              <div>
                <span className="text-slate-400">Target Student:</span>
                <p className="font-bold text-slate-900">{selectedStudent.name} ({selectedStudent.rollNumber})</p>
              </div>
              <div>
                <span className="text-slate-400">Assessment Score:</span>
                <p className="font-bold text-blue-700">{selectedStudent.currentAverage}% ({selectedStudent.currentAverage >= 70 ? 'Distinction' : 'Standard'})</p>
              </div>
            </div>

            {/* Concept Mastery Preview */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
              <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Concept Understanding Metrics:</p>
              <div className="space-y-1.5">
                {[
                  { concept: 'Stack & Queue Operations', score: 90, status: 'Mastered' },
                  { concept: 'Binary Tree Traversals', score: 85, status: 'Mastered' },
                  { concept: 'Doubly Linked List Deletion', score: 55, status: 'Target Deficit' },
                  { concept: 'Recursion Call Tracing', score: 48, status: 'Critical Weakness' }
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{c.concept}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900">{c.score}%</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        c.score >= 75 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Pedagogical Feedback Box */}
            {includeRecommendations && (
              <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">AI Pedagogical Recommendations:</p>
                <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-md text-slate-700 text-xs leading-relaxed">
                  <strong>Priority Action (Recursion & Pointers):</strong> {selectedStudent.name} demonstrates solid retention on core structures but shows opportunities for refinement in recursive unwind tracing. Recommend providing targeted practice exercises before the next assessment.
                </div>
              </div>
            )}

            {/* Signature & Verification Footer */}
            <div className="pt-4 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500">
              <div>
                <p>Evaluator: DR.RAGAVI PRIYA, Ph.D.</p>
                <p>Course Instructor & Head, CSE</p>
              </div>
              <div className="text-right">
                <p>System Signature: EVALIX-VERIFIED-9821</p>
                <p>Timestamp: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
