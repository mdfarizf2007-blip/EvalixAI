import { 
  EvaluationResult, 
  QuestionEvaluation, 
  MistakeType, 
  MistakeBreakdownItem,
  ConceptMasteryItem,
  RecommendedLearningPathItem,
  PerformanceTier
} from '../types';
import { examDSQuestions, defaultEvaluationResult } from '../data/mockData';

export interface AnalysisPipelineStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  durationMs: number;
}

export const defaultPipelineSteps: AnalysisPipelineStep[] = [
  {
    id: 'upload',
    label: 'Uploading document',
    description: 'Verifying file integrity and checksum (PDF/PNG/JPG format)',
    status: 'pending',
    durationMs: 400
  },
  {
    id: 'ocr_read',
    label: 'Reading answer sheet',
    description: 'Multi-resolution preprocessing, de-skewing & noise reduction',
    status: 'pending',
    durationMs: 500
  },
  {
    id: 'extract_text',
    label: 'Extracting text',
    description: 'Neural optical character recognition on handwritten & typed blocks',
    status: 'pending',
    durationMs: 600
  },
  {
    id: 'segment_questions',
    label: 'Identifying questions',
    description: 'Segmenting answer boundaries and matching question identifiers (Q1-Q10)',
    status: 'pending',
    durationMs: 450
  },
  {
    id: 'compare_key',
    label: 'Comparing with answer key',
    description: 'Evaluating semantic similarity against official model solutions & marking rubric',
    status: 'pending',
    durationMs: 650
  },
  {
    id: 'analyze_concepts',
    label: 'Analyzing concepts',
    description: 'Mapping extracted keywords to syllabus knowledge graph taxonomy',
    status: 'pending',
    durationMs: 500
  },
  {
    id: 'classify_mistakes',
    label: 'Classifying mistakes',
    description: 'Categorizing conceptual, calculation, careless, and incomplete anomalies',
    status: 'pending',
    durationMs: 450
  },
  {
    id: 'generate_recommendations',
    label: 'Generating recommendations',
    description: 'Synthesizing targeted remedial practice paths and revision plans',
    status: 'pending',
    durationMs: 450
  }
];

// Helper to generate deterministic hash from string
function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Deterministically generates realistic evaluation results from a file and student name
 */
export function generateSimulatedEvaluation(
  fileName: string,
  studentName: string = 'Arun Kumar',
  rollNumber: string = '23CS0101',
  examTitle: string = 'Data Structures – Internal Assessment 1'
): EvaluationResult {
  const seed = stringHash(fileName + studentName);
  
  // If analyzing Arun Kumar or default file, return rich default
  if (studentName.toLowerCase().includes('arun') || fileName.toLowerCase().includes('arun')) {
    return {
      ...defaultEvaluationResult,
      studentName: 'Arun Kumar',
      rollNumber: rollNumber || '23CS0101',
      examTitle
    };
  }

  // Generate scores based on student profile determinism
  const isHighPerformer = seed % 4 === 0;
  const isMediumPerformer = seed % 4 === 1 || seed % 4 === 2;
  
  const questionEvaluations: QuestionEvaluation[] = examDSQuestions.map((q, idx) => {
    let awardedMarks = 10;
    let errorType: MistakeType = 'None';
    let resultStatus: 'Correct' | 'Good' | 'Partial' | 'Weak' = 'Correct';
    let feedback = 'Strong explanation covering core concepts and edge conditions.';
    let recommendedAction = 'Proceed with advanced problems.';
    let missingConcepts: string[] = [];

    const variance = (seed + idx * 7) % 10;

    if (isHighPerformer) {
      if (variance > 7) {
        awardedMarks = 8;
        errorType = 'Careless';
        resultStatus = 'Good';
        missingConcepts = ['Minor omission in edge case documentation'];
        feedback = 'Well structured answer. Minor omission in secondary boundary constraint.';
        recommendedAction = 'Ensure all boundary conditions are formally verified.';
      } else {
        awardedMarks = 10;
        errorType = 'None';
        resultStatus = 'Correct';
      }
    } else if (isMediumPerformer) {
      if (variance > 7) {
        awardedMarks = 5;
        errorType = 'Conceptual';
        resultStatus = 'Partial';
        missingConcepts = ['Pointer re-assignment order', 'Null-pointer safety check'];
        feedback = 'Basic logic is outlined, but key conceptual steps in pointer mutation were omitted.';
        recommendedAction = 'Practice memory tracing diagrams step-by-step.';
      } else if (variance > 4) {
        awardedMarks = 7;
        errorType = 'Calculation';
        resultStatus = 'Good';
        missingConcepts = ['Accurate base case derivation'];
        feedback = 'Overall solid grasp, with minor calculation anomaly in asymptotic recurrence.';
        recommendedAction = 'Review recurrence tree arithmetic.';
      } else {
        awardedMarks = 9;
        errorType = 'Careless';
        resultStatus = 'Good';
      }
    } else {
      // Lower performer
      if (variance > 6) {
        awardedMarks = 4;
        errorType = 'Incomplete';
        resultStatus = 'Weak';
        missingConcepts = ['Formal definition inequalities', 'Cartesian graphing'];
        feedback = 'The answer was cut short and lacked formal definitions and diagrams.';
        recommendedAction = 'Schedule remedial revision on formal definitions.';
      } else if (variance > 3) {
        awardedMarks = 5;
        errorType = 'Conceptual';
        resultStatus = 'Partial';
        missingConcepts = ['Core invariant explanation'];
        feedback = 'Gaps in theoretical foundations and core algorithmic invariants.';
        recommendedAction = 'Revisit foundational lecture slides and review worksheets.';
      } else {
        awardedMarks = 7;
        errorType = 'Calculation';
        resultStatus = 'Good';
      }
    }

    return {
      questionId: q.id,
      questionNumber: q.questionNumber,
      questionText: q.questionText,
      maxMarks: q.maxMarks,
      awardedMarks,
      studentAnswerText: `Extracted student handwritten transcription for Question ${q.questionNumber}: Concept demonstrates ${q.concept} utilizing standard data structures notation.`,
      confidenceScore: +(0.88 + (variance * 0.01)).toFixed(2),
      resultStatus,
      errorType,
      missingConcepts,
      feedback,
      recommendedAction,
      rubricBreakdown: [
        { criterion: 'Core Definition & Principles', maxMarks: 4, awardedMarks: Math.min(4, Math.round(awardedMarks * 0.4 * 10) / 10), comment: 'Evaluated against master key' },
        { criterion: 'Algorithmic Execution', maxMarks: 4, awardedMarks: Math.min(4, Math.round(awardedMarks * 0.4 * 10) / 10), comment: 'Analyzed step-by-step' },
        { criterion: 'Boundary & Asymptotics', maxMarks: 2, awardedMarks: Math.min(2, Math.round(awardedMarks * 0.2 * 10) / 10), comment: 'Edge condition check' }
      ]
    };
  });

  const totalScore = questionEvaluations.reduce((acc, curr) => acc + curr.awardedMarks, 0);
  const maxMarks = 100;
  const percentage = Math.round((totalScore / maxMarks) * 100);
  const accuracy = Math.round(percentage * 1.05 > 100 ? 98 : percentage * 1.05);

  let performanceRating: PerformanceTier = 'Good';
  if (percentage >= 85) performanceRating = 'Distinction';
  else if (percentage >= 70) performanceRating = 'Good';
  else if (percentage >= 55) performanceRating = 'Average';
  else if (percentage >= 40) performanceRating = 'Needs Support';
  else performanceRating = 'Critical';

  // Count mistake types
  const mistakeCounts: Record<MistakeType, number> = {
    Conceptual: 0,
    Calculation: 0,
    Careless: 0,
    Incomplete: 0,
    None: 0
  };
  questionEvaluations.forEach(q => {
    mistakeCounts[q.errorType] = (mistakeCounts[q.errorType] || 0) + 1;
  });

  const mistakeBreakdown: MistakeBreakdownItem[] = [
    {
      type: 'Conceptual',
      count: mistakeCounts.Conceptual,
      description: 'Gaps in theoretical foundations, pointer manipulation, and asymptotic definitions.',
      affectedTopics: ['Doubly Linked Lists', 'Asymptotic Notations']
    },
    {
      type: 'Calculation',
      count: mistakeCounts.Calculation,
      description: 'Minor algebraic and index evaluation inconsistencies.',
      affectedTopics: ['Recurrence Relations', 'Space Complexity']
    },
    {
      type: 'Careless',
      count: mistakeCounts.Careless,
      description: 'Omission of secondary parameters or boundary conditions.',
      affectedTopics: ['Precedence Associativity', 'Hash Load Factors']
    },
    {
      type: 'Incomplete',
      count: mistakeCounts.Incomplete,
      description: 'Incomplete proofs or missing graphical illustrations.',
      affectedTopics: ['Formal Growth Notations']
    },
    {
      type: 'None',
      count: mistakeCounts.None,
      description: 'Accurately solved questions without notable conceptual defects.',
      affectedTopics: ['Tree Traversals', 'Binary Search', 'Stack Operations']
    }
  ];

  const conceptMastery: ConceptMasteryItem[] = [
    { concept: 'Stack Operations', mastery: Math.min(100, percentage + 12), status: percentage + 12 >= 80 ? 'Strong' : 'Good', totalQuestions: 2, questionsAttempted: 2 },
    { concept: 'Queue Implementation', mastery: Math.min(100, percentage + 8), status: percentage + 8 >= 80 ? 'Strong' : 'Good', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Tree Traversals', mastery: Math.min(100, percentage + 6), status: 'Good', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Binary Search', mastery: percentage, status: percentage >= 75 ? 'Good' : 'Needs Improvement', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Linked Lists', mastery: Math.max(35, percentage - 18), status: percentage - 18 < 60 ? 'Needs Improvement' : 'Good', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Recursion Call Tracing', mastery: Math.max(30, percentage - 24), status: percentage - 24 < 50 ? 'Weak' : 'Needs Improvement', totalQuestions: 1, questionsAttempted: 1 }
  ];

  const learningPath: RecommendedLearningPathItem[] = [
    {
      priority: 1,
      topic: 'Recursion & Call Stack Modeling',
      reason: 'Answers indicate difficulty in calculating auxiliary call stack depth and recurrence trees.',
      recommendations: [
        'Review recursion fundamentals and stack frame lifecycle',
        'Practice recursive Fibonacci, Tower of Hanoi, and binary tree height computations',
        'Solve 5 recursion tracing questions by drawing call stacks explicitly'
      ],
      difficulty: 'Beginner → Intermediate',
      estimatedHours: '3 - 4 hours',
      practiceResources: ['Module 3: Stack Memory & Recursion', 'Problem Set 4: Recursion Tree Tracing']
    },
    {
      priority: 2,
      topic: 'Linked List Pointer Manipulation',
      reason: 'Pointer updates during deletion operations missed double-link boundary checks.',
      recommendations: [
        'Review doubly linked list insertion and deletion invariants',
        'Practice drawing 4-step pointer re-assignment diagrams before coding',
        'Implement singly and doubly linked lists with null-check safety assertions'
      ],
      difficulty: 'Intermediate',
      estimatedHours: '2.5 hours',
      practiceResources: ['Lab 2: Dynamic Node Linking', 'Visualizer: DLL Pointer Mutator']
    }
  ];

  return {
    id: `eval-${seed}`,
    answerSheetId: `sheet-${seed}`,
    studentId: `std-${seed}`,
    studentName,
    rollNumber,
    examId: 'exam-ds-ia1',
    examTitle,
    subject: 'Data Structures & Algorithms',
    date: new Date().toISOString().split('T')[0],
    totalScore,
    maxMarks,
    percentage,
    accuracy,
    questionsAttempted: 10,
    totalQuestions: 10,
    conceptsMasteredCount: conceptMastery.filter(c => c.mastery >= 75).length,
    totalConceptsCount: conceptMastery.length,
    performanceRating,
    strengths: ['Stack Operations & Invariants', 'Queue Modulo Arithmetic', 'Tree Traversals'],
    areasForImprovement: ['Recursion Call Stack Analysis', 'Linked List Deletions', 'Formal Asymptotics'],
    questionEvaluations,
    mistakeBreakdown,
    conceptMastery,
    learningPath,
    teacherNotes: 'Evaluated using AI-assisted academic rubric analysis.'
  };
}
