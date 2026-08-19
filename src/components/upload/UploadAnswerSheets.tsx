import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Image, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  Trash2, 
  Eye, 
  Sparkles,
  Layers,
  HelpCircle,
  FileCheck,
  Check
} from 'lucide-react';
import { AnswerSheetFile, Examination, EvaluationResult } from '../../types';
import { defaultPipelineSteps, AnalysisPipelineStep, generateSimulatedEvaluation } from '../../services/analysisEngine';

interface UploadAnswerSheetsProps {
  examinations: Examination[];
  selectedExamId?: string;
  onAnalysisComplete: (result: EvaluationResult) => void;
}

export const UploadAnswerSheets: React.FC<UploadAnswerSheetsProps> = ({
  examinations,
  selectedExamId = 'exam-ds-ia1',
  onAnalysisComplete
}) => {
  const [currentExamId, setCurrentExamId] = useState(selectedExamId);
  const [uploadedFiles, setUploadedFiles] = useState<AnswerSheetFile[]>([
    {
      id: 'sheet-001',
      fileName: 'kaviya_k_23CS0101_DS_IA1.pdf',
      fileSize: '3.4 MB',
      fileType: 'application/pdf',
      uploadedAt: 'Just now',
      status: 'Uploaded',
      progress: 100,
      studentName: 'KAVIYA K',
      rollNumber: '23CS0101',
      examId: 'exam-ds-ia1'
    }
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileForAnalysis, setSelectedFileForAnalysis] = useState<string>('sheet-001');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [pipelineSteps, setPipelineSteps] = useState<AnalysisPipelineStep[]>(defaultPipelineSteps);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeExam = examinations.find(e => e.id === currentExamId) || examinations[0];

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage('');

    const newFiles: AnswerSheetFile[] = [];
    const validExtensions = ['pdf', 'jpg', 'jpeg', 'png'];

    Array.from(files).forEach((file, index) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (!validExtensions.includes(ext)) {
        setErrorMessage(`"${file.name}" is not a supported format. Please upload PDF, JPG, or PNG files.`);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(`"${file.name}" exceeds the maximum limit of 10 MB.`);
        return;
      }

      const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      
      newFiles.push({
        id: `upload-${Date.now()}-${index}`,
        fileName: file.name,
        fileSize: sizeStr,
        fileType: file.type || `image/${ext}`,
        uploadedAt: 'Just now',
        status: 'Uploaded',
        progress: 100,
        studentName: cleanName.split('_')[0] ? cleanName.split('_')[0].replace(/-/g, ' ') : 'Student Script',
        rollNumber: '23CS0' + Math.floor(100 + Math.random() * 25),
        examId: currentExamId
      });
    });

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...newFiles, ...prev]);
      setSelectedFileForAnalysis(newFiles[0].id);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const loadSampleFile = (name: string, roll: string, ext: string, size: string) => {
    const sample: AnswerSheetFile = {
      id: `sample-${Date.now()}`,
      fileName: `${name.toLowerCase().replace(/\s+/g, '_')}_${roll}_IA1.${ext}`,
      fileSize: size,
      fileType: ext === 'pdf' ? 'application/pdf' : `image/${ext}`,
      uploadedAt: 'Just now',
      status: 'Uploaded',
      progress: 100,
      studentName: name,
      rollNumber: roll,
      examId: currentExamId
    };
    setUploadedFiles(prev => [sample, ...prev]);
    setSelectedFileForAnalysis(sample.id);
  };

  const removeFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
    if (selectedFileForAnalysis === id) {
      const remaining = uploadedFiles.filter(f => f.id !== id);
      setSelectedFileForAnalysis(remaining.length > 0 ? remaining[0].id : '');
    }
  };

  const startAnalysis = () => {
    const targetFile = uploadedFiles.find(f => f.id === selectedFileForAnalysis) || uploadedFiles[0];
    if (!targetFile) return;

    setIsAnalyzing(true);
    setCurrentStepIndex(0);

    // Reset pipeline steps status
    const initialSteps = defaultPipelineSteps.map(s => ({ ...s, status: 'pending' as const }));
    setPipelineSteps(initialSteps);

    let step = 0;
    const runStep = () => {
      if (step < initialSteps.length) {
        setPipelineSteps(prev => 
          prev.map((s, idx) => {
            if (idx < step) return { ...s, status: 'completed' };
            if (idx === step) return { ...s, status: 'in_progress' };
            return { ...s, status: 'pending' };
          })
        );
        setCurrentStepIndex(step);

        const duration = initialSteps[step].durationMs;
        step++;
        setTimeout(runStep, duration);
      } else {
        // Complete
        setPipelineSteps(prev => prev.map(s => ({ ...s, status: 'completed' })));
        setTimeout(() => {
          setIsAnalyzing(false);
          const evalResult = generateSimulatedEvaluation(
            targetFile.fileName,
            targetFile.studentName || 'Arun Kumar',
            targetFile.rollNumber || '23CS0101',
            activeExam.title
          );
          onAnalysisComplete(evalResult);
        }, 500);
      }
    };

    runStep();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Upload Answer Sheets</h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Upload student answer sheets for automated evaluation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs">
            <span className="text-slate-500 mr-2">Target Exam:</span>
            <select
              value={currentExamId}
              onChange={(e) => setCurrentExamId(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-blue-600"
            >
              {examinations.map(ex => (
                <option key={ex.id} value={ex.id}>{ex.code} - {ex.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-rose-600 font-bold ml-2">×</button>
        </div>
      )}

      {/* Main Upload Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Drag & Drop Zone (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            id="drag-drop-upload-zone"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer bg-white ${
              isDragging
                ? 'border-blue-700 bg-blue-50/50 scale-[0.99]'
                : 'border-slate-300 hover:border-blue-600 hover:bg-slate-50/50 shadow-xs'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-100">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-slate-900">Upload Answer Sheets</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Drag and drop student answer sheet files here, or click to browse.
            </p>

            <div className="flex items-center justify-center gap-3 mt-4 text-[11px] text-slate-500">
              <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 font-medium">PDF</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 font-medium">JPG</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 font-medium">PNG</span>
              <span>• Max 10 MB per file</span>
            </div>
          </div>

          {/* Quick Demo Preloads */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Quick Test Samples:
              </span>
              <span className="text-[11px] text-slate-500">Click to instantly populate mock answer script</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => loadSampleFile('Arun Kumar', '23CS0101', 'pdf', '3.4 MB')}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-blue-700" />
                Arun Kumar (23CS0101).pdf
              </button>
              <button
                type="button"
                onClick={() => loadSampleFile('Priya S', '23CS0102', 'jpg', '2.9 MB')}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Image className="w-3.5 h-3.5 text-emerald-700" />
                Priya S (23CS0102).jpg
              </button>
              <button
                type="button"
                onClick={() => loadSampleFile('Rahul M', '23CS0103', 'png', '4.1 MB')}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Image className="w-3.5 h-3.5 text-amber-700" />
                Rahul M (23CS0103).png
              </button>
            </div>
          </div>
        </div>

        {/* Right: Uploaded Batch Queue & Action Trigger (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Upload Queue ({uploadedFiles.length})</h3>
                <p className="text-xs text-slate-500">Ready for automated OCR and semantic evaluation</p>
              </div>
              {uploadedFiles.length > 0 && (
                <button
                  onClick={() => setUploadedFiles([])}
                  className="text-xs text-slate-400 hover:text-rose-600 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Files list */}
            {uploadedFiles.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p>No answer sheets staged yet.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Upload a PDF/image or pick a quick test sample.</p>
              </div>
            ) : (
              <div className="space-y-2.5 mt-3 max-h-72 overflow-y-auto pr-1">
                {uploadedFiles.map((file) => {
                  const isSelected = selectedFileForAnalysis === file.id;
                  const isPdf = file.fileName.toLowerCase().endsWith('.pdf');
                  return (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFileForAnalysis(file.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${isPdf ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'}`}>
                          {isPdf ? <FileText className="w-4 h-4" /> : <Image className="w-4 h-4" />}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">{file.fileName}</p>
                          <p className="text-[11px] text-slate-500">
                            {file.fileSize} • {file.studentName} ({file.rollNumber})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Ready
                        </span>
                        <button
                          onClick={(e) => removeFile(file.id, e)}
                          title="Remove file"
                          className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Trigger */}
          <div className="mt-5 pt-4 border-t border-slate-200 space-y-2">
            <button
              id="analyze-answer-sheet-btn"
              disabled={uploadedFiles.length === 0 || isAnalyzing}
              onClick={startAnalysis}
              className={`w-full py-3 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                uploadedFiles.length === 0 || isAnalyzing
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Answer Sheet</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center">
              AI-assisted evaluation mapped to master answer key and rubric scheme
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Processing Modal Dialog */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-xl border border-slate-200 shadow-2xl p-6 space-y-5">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-100">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Processing Answer Sheet</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Executing automated OCR extraction and conceptual rubric analysis...
              </p>
            </div>

            {/* Pipeline Stage Indicators */}
            <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              {pipelineSteps.map((step, idx) => {
                const isDone = step.status === 'completed';
                const isCurrent = step.status === 'in_progress';
                return (
                  <div key={step.id} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 flex items-center justify-center shrink-0">
                        {isDone ? (
                          <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                        ) : isCurrent ? (
                          <Loader2 className="w-3.5 h-3.5 text-blue-700 animate-spin" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        )}
                      </div>
                      <span className={`font-medium ${isDone ? 'text-slate-800' : isCurrent ? 'text-blue-800 font-bold' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400">
                      {isDone ? 'Done' : isCurrent ? 'Analyzing...' : 'Waiting'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.round(((currentStepIndex + 1) / pipelineSteps.length) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
