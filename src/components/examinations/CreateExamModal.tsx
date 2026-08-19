import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { Examination, Question } from '../../types';

interface CreateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateExam?: (exam: Examination) => void;
  onSubmit?: (exam: Examination) => void;
}

export const CreateExamModal: React.FC<CreateExamModalProps> = ({
  isOpen,
  onClose,
  onCreateExam,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Data Structures & Algorithms');
  const [code, setCode] = useState('CS301-IA2');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [semester, setSemester] = useState(3);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalMarks, setTotalMarks] = useState(100);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [questionPaperFile, setQuestionPaperFile] = useState<File | null>(null);
  const [answerKeyFile, setAnswerKeyFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please provide an examination title.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newExam: Examination = {
        id: `exam-${Date.now()}`,
        code: code || `EXAM-${Math.floor(100 + Math.random() * 900)}`,
        title,
        subject,
        department,
        semester: Number(semester),
        academicYear: '2025-2026',
        date,
        totalMarks: Number(totalMarks),
        durationMinutes: Number(durationMinutes),
        totalQuestions: Number(totalQuestions),
        totalStudents: 32,
        evaluatedCount: 0,
        averageScore: 0,
        status: 'Active',
        questionPaperName: questionPaperFile ? questionPaperFile.name : 'Question_Paper_Master.pdf',
        answerKeyName: answerKeyFile ? answerKeyFile.name : 'Master_Answer_Scheme.pdf'
      };

      if (onCreateExam) onCreateExam(newExam);
      else if (onSubmit) onSubmit(newExam);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
      <div 
        id="create-exam-modal"
        className="bg-white w-full max-w-2xl rounded-xl border border-slate-200 shadow-xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">Create Examination</h3>
            <p className="text-xs text-slate-500">Configure new assessment, rubric schemes, and answer keys</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Exam Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Examination Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Data Structures – Internal Assessment 2"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Database Management Systems">Database Management Systems</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Design & Analysis of Algorithms">Design & Analysis of Algorithms</option>
                <option value="Discrete Mathematics">Discrete Mathematics</option>
              </select>
            </div>

            {/* Course Code */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Course Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CS301-IA2"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Semester */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                <option value={1}>Semester I</option>
                <option value={2}>Semester II</option>
                <option value={3}>Semester III</option>
                <option value={4}>Semester IV</option>
                <option value={5}>Semester V</option>
                <option value={6}>Semester VI</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assessment Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Total Marks */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Total Marks
              </label>
              <input
                type="number"
                min="10"
                max="200"
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Number of Questions */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Number of Questions
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min="15"
                max="300"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Upload Question Paper and Answer Key */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Question Paper Upload */}
            <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 text-center">
              <FileText className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-slate-800">Upload Question Paper</p>
              <p className="text-[11px] text-slate-500 mb-2">PDF, DOCX up to 10MB</p>
              <label className="inline-block px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded text-xs font-medium text-slate-700 cursor-pointer shadow-2xs">
                {questionPaperFile ? questionPaperFile.name.substring(0, 18) + '...' : 'Browse File'}
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setQuestionPaperFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            {/* Answer Key Upload */}
            <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 text-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-slate-800">Upload Master Answer Key</p>
              <p className="text-[11px] text-slate-500 mb-2">Scheme of valuation & rubrics</p>
              <label className="inline-block px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded text-xs font-medium text-slate-700 cursor-pointer shadow-2xs">
                {answerKeyFile ? answerKeyFile.name.substring(0, 18) + '...' : 'Browse Key File'}
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAnswerKeyFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
            <strong>Evaluation Pipeline Note:</strong> After creating this examination, you can immediately begin uploading student answer sheets (PDF/JPG/PNG) for automated evaluation.
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors shadow-xs flex items-center gap-2"
            >
              {isSubmitting ? 'Creating...' : 'Create Examination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
