export type NavigationTab = 
  | 'overview'
  | 'examinations'
  | 'exam-detail'
  | 'upload'
  | 'analysis'
  | 'students'
  | 'student-profile'
  | 'analytics'
  | 'risk'
  | 'reports'
  | 'settings';

export type RiskLevel = 'High' | 'Medium' | 'Low' | 'None';
export type MistakeType = 'Conceptual' | 'Calculation' | 'Careless' | 'Incomplete' | 'None';
export type EvaluationStatus = 'Uploaded' | 'Processing' | 'Evaluated' | 'Flagged';
export type ConceptStatus = 'Strong' | 'Good' | 'Needs Improvement' | 'Weak';
export type PerformanceTier = 'Distinction' | 'Good' | 'Average' | 'Needs Support' | 'Critical';

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  department: string;
  semester: number;
  section: string;
  avatarUrl?: string;
  currentAverage: number;
  previousAverage: number;
  improvementPercentage: number;
  riskLevel: RiskLevel;
  totalEvaluated: number;
  weakConcepts: string[];
  strongConcepts: string[];
  recentScores: { examName: string; date: string; score: number; maxScore: number }[];
}

export interface Question {
  id: string;
  examId: string;
  questionNumber: number;
  questionText: string;
  maxMarks: number;
  topic: string;
  concept: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  modelAnswer: string;
  rubricKeypoints: string[];
  keywords: string[];
}

export interface Examination {
  id: string;
  code: string;
  title: string;
  subject: string;
  department: string;
  semester: number;
  academicYear: string;
  date: string;
  totalMarks: number;
  durationMinutes: number;
  totalQuestions: number;
  totalStudents: number;
  evaluatedCount: number;
  averageScore: number;
  status: 'Active' | 'Graded' | 'In Progress' | 'Draft';
  questionPaperName?: string;
  answerKeyName?: string;
  questions?: Question[];
}

export interface QuestionEvaluation {
  questionId: string;
  questionNumber: number;
  questionText: string;
  maxMarks: number;
  awardedMarks: number;
  studentAnswerText: string;
  confidenceScore: number;
  resultStatus: 'Correct' | 'Good' | 'Partial' | 'Weak';
  errorType: MistakeType;
  missingConcepts: string[];
  feedback: string;
  recommendedAction: string;
  rubricBreakdown?: {
    criterion: string;
    maxMarks: number;
    awardedMarks: number;
    comment: string;
  }[];
}

export interface ConceptMasteryItem {
  concept: string;
  mastery: number; // 0 - 100
  status: ConceptStatus;
  totalQuestions: number;
  questionsAttempted: number;
}

export interface MistakeBreakdownItem {
  type: MistakeType;
  count: number;
  description: string;
  affectedTopics: string[];
}

export interface RecommendedLearningPathItem {
  priority: number;
  topic: string;
  reason: string;
  recommendations: string[];
  difficulty: 'Beginner' | 'Beginner → Intermediate' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  practiceResources?: string[];
}

export interface EvaluationResult {
  id: string;
  answerSheetId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  examId: string;
  examTitle: string;
  subject: string;
  date: string;
  totalScore: number;
  maxMarks: number;
  percentage: number;
  accuracy: number;
  questionsAttempted: number;
  totalQuestions: number;
  conceptsMasteredCount: number;
  totalConceptsCount: number;
  performanceRating: PerformanceTier;
  strengths: string[];
  areasForImprovement: string[];
  questionEvaluations: QuestionEvaluation[];
  mistakeBreakdown: MistakeBreakdownItem[];
  conceptMastery: ConceptMasteryItem[];
  learningPath: RecommendedLearningPathItem[];
  teacherNotes?: string;
  isOverridden?: boolean;
}

export interface AnswerSheetFile {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  status: EvaluationStatus;
  progress: number;
  studentName?: string;
  rollNumber?: string;
  examId: string;
  previewUrl?: string;
  evaluationResultId?: string;
}

export interface AtRiskStudent {
  studentId: string;
  name: string;
  rollNumber: string;
  score: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  reason: string;
  weakArea: string;
  suggestedAction: string;
  trend: 'declining' | 'stagnant' | 'monitor';
  lastActive: string;
}

export interface TeacherProfile {
  name: string;
  title: string;
  department: string;
  institution: string;
  email: string;
  avatarInitials: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  department: string;
  avatarUrl?: string;
  institution?: string;
}
