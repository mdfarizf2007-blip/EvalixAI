import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  Edit3, 
  Save, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { QuestionEvaluation, MistakeType } from '../../types';

interface QuestionDetailModalProps {
  isOpen: boolean;
  question: QuestionEvaluation | null;
  onClose: () => void;
  onUpdateQuestionMarks?: (questionId: string, newMarks: number, teacherFeedback?: string) => void;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  isOpen,
  question,
  onClose,
  onUpdateQuestionMarks
}) => {
  if (!isOpen || !question) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedMarks, setEditedMarks] = useState(question.awardedMarks);
  const [teacherNote, setTeacherNote] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    if (onUpdateQuestionMarks) {
      onUpdateQuestionMarks(question.questionId, editedMarks, teacherNote);
    }
    setSavedSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Correct':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Partial':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Weak':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div 
        id="question-detail-modal"
        className="bg-white w-full max-w-3xl rounded-xl border border-slate-200 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              Q{question.questionNumber}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Question {question.questionNumber} Evaluation
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${getStatusBadge(question.resultStatus)}`}>
                  {question.resultStatus} Result
                </span>
              </div>
              <p className="text-xs text-slate-500">AI-assisted OCR transcription & rubric breakdown</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close question detail"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Question Text Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question Statement</span>
            <p className="text-sm font-semibold text-slate-900 mt-1 leading-relaxed">
              {question.questionText}
            </p>
          </div>

          {/* Student Extracted Answer */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Extracted Student Response (OCR Transcription):
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                OCR Confidence: {Math.round(question.confidenceScore * 100)}%
              </span>
            </div>
            <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded-xl border border-slate-800 leading-relaxed overflow-x-auto">
              {question.studentAnswerText}
            </div>
          </div>

          {/* Evaluation Score Banner */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-700 text-white flex flex-col items-center justify-center font-bold">
                <span className="text-lg leading-none">{editedMarks}</span>
                <span className="text-[9px] text-blue-200">/{question.maxMarks}</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Marks Awarded: {editedMarks} / {question.maxMarks}
                </p>
                <p className="text-[11px] text-slate-600">
                  Mistake Classification: <strong className="text-blue-800">{question.errorType} Error</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={question.maxMarks}
                    value={editedMarks}
                    onChange={(e) => setEditedMarks(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-xs border border-slate-300 rounded bg-white font-bold text-center"
                  />
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded flex items-center gap-1 shadow-2xs"
                  >
                    <Save className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-2 py-1 bg-slate-200 text-slate-700 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold rounded-lg shadow-2xs flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Adjust Mark</span>
                </button>
              )}
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Mark adjustment and teacher rubric notes updated successfully.</span>
            </div>
          )}

          {/* Rubric Breakdown Table */}
          {question.rubricBreakdown && question.rubricBreakdown.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Rubric Criteria Breakdown:
              </span>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-2 px-3">Criterion</th>
                      <th className="py-2 px-3">Max</th>
                      <th className="py-2 px-3">Awarded</th>
                      <th className="py-2 px-3">Evaluation Observation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {question.rubricBreakdown.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-medium text-slate-800">{r.criterion}</td>
                        <td className="py-2 px-3 text-slate-500">{r.maxMarks}</td>
                        <td className="py-2 px-3 font-bold text-slate-900">{r.awardedMarks}</td>
                        <td className="py-2 px-3 text-slate-600 text-[11px]">{r.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Missing Concepts */}
          {question.missingConcepts && question.missingConcepts.length > 0 && (
            <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Missing Concepts & Key Deficits</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-rose-900 text-[11px] pl-1">
                {question.missingConcepts.map((mc, idx) => (
                  <li key={idx}>{mc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* AI Pedagogical Feedback */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <span>AI Pedagogical Feedback</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs italic bg-white p-3 rounded-lg border border-slate-200">
              "{question.feedback}"
            </p>
          </div>

          {/* Recommended Action */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Recommended Remedial Action</span>
            </div>
            <p className="text-emerald-900 text-xs font-medium">
              {question.recommendedAction}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Evalix AI Evaluation Engine • Question {question.questionNumber}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors shadow-2xs"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
