import { 
  Student, 
  Examination, 
  Question, 
  EvaluationResult, 
  AtRiskStudent, 
  TeacherProfile,
  AnswerSheetFile
} from '../types';

export const currentTeacher: TeacherProfile = {
  name: 'Dr. Ragavi Priya',
  title: 'Professor & Head',
  department: 'Department of Computer Science & Engineering',
  institution: 'School of Computing & Data Sciences',
  email: 'ragavipriya@cse.edu',
  avatarInitials: 'RP'
};

export const sampleExaminations: Examination[] = [
  {
    id: 'exam-ds-ia1',
    code: 'CS301-IA1',
    title: 'Data Structures – Internal Assessment 1',
    subject: 'Data Structures & Algorithms',
    department: 'Computer Science & Engineering',
    semester: 3,
    academicYear: '2025-2026',
    date: '2026-07-28',
    totalMarks: 100,
    durationMinutes: 90,
    totalQuestions: 10,
    totalStudents: 64,
    evaluatedCount: 60,
    averageScore: 74.2,
    status: 'In Progress',
    questionPaperName: 'CS301_IA1_Question_Paper_Final.pdf',
    answerKeyName: 'CS301_IA1_Master_Answer_Key.pdf'
  },
  {
    id: 'exam-cn-ut',
    code: 'CS304-UT',
    title: 'Computer Networks – Unit Test',
    subject: 'Computer Networks',
    department: 'Computer Science & Engineering',
    semester: 5,
    academicYear: '2025-2026',
    date: '2026-07-15',
    totalMarks: 50,
    durationMinutes: 60,
    totalQuestions: 8,
    totalStudents: 64,
    evaluatedCount: 64,
    averageScore: 71.5,
    status: 'Graded',
    questionPaperName: 'CS304_UT_Packet_Protocols.pdf',
    answerKeyName: 'CS304_UT_Answer_Scheme.pdf'
  },
  {
    id: 'exam-dbms-ia2',
    code: 'CS302-IA2',
    title: 'Database Management Systems – Internal Assessment 2',
    subject: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    semester: 4,
    academicYear: '2025-2026',
    date: '2026-06-20',
    totalMarks: 100,
    durationMinutes: 90,
    totalQuestions: 10,
    totalStudents: 64,
    evaluatedCount: 64,
    averageScore: 76.8,
    status: 'Graded',
    questionPaperName: 'CS302_IA2_Relational_Algebra_SQL.pdf',
    answerKeyName: 'CS302_IA2_Official_Key.pdf'
  },
  {
    id: 'exam-os-mid',
    code: 'CS303-MID',
    title: 'Operating Systems – Midterm Assessment',
    subject: 'Operating Systems',
    department: 'Computer Science & Engineering',
    semester: 4,
    academicYear: '2025-2026',
    date: '2026-05-18',
    totalMarks: 100,
    durationMinutes: 120,
    totalQuestions: 10,
    totalStudents: 64,
    evaluatedCount: 64,
    averageScore: 68.4,
    status: 'Graded',
    questionPaperName: 'CS303_Midterm_Process_Memory.pdf',
    answerKeyName: 'CS303_Midterm_Evaluation_Rubric.pdf'
  }
];

export const examDSQuestions: Question[] = [
  {
    id: 'q1',
    examId: 'exam-ds-ia1',
    questionNumber: 1,
    questionText: 'Explain the push and pop operations on a stack with their algorithmic time complexities.',
    maxMarks: 10,
    topic: 'Stacks',
    concept: 'Stack Operations & Invariants',
    difficulty: 'Easy',
    modelAnswer: 'A stack is a LIFO linear data structure. Push inserts an element at Top; Pop removes from Top. Underflow occurs when Pop is called on an empty stack; Overflow occurs when Push is called on a full array stack. Both operations operate in O(1) time complexity.',
    rubricKeypoints: [
      'Definition of LIFO principle (2 marks)',
      'Push algorithm and top pointer update (3 marks)',
      'Pop algorithm and boundary conditions underflow check (3 marks)',
      'Time complexity stated as O(1) (2 marks)'
    ],
    keywords: ['LIFO', 'Top', 'Underflow', 'Overflow', 'O(1)']
  },
  {
    id: 'q2',
    examId: 'exam-ds-ia1',
    questionNumber: 2,
    questionText: 'What is a Circular Queue? How does it resolve the space limitation issue of a Linear Queue?',
    maxMarks: 10,
    topic: 'Queues',
    concept: 'Circular Queue & Modulo Arithmetic',
    difficulty: 'Medium',
    modelAnswer: 'In a linear queue, once Rear reaches capacity, elements cannot be inserted even if Front has moved forward (false overflow). Circular Queue connects Rear to Front using modulo arithmetic: (rear + 1) % MAX_SIZE. Front and Rear move cyclically, reusing freed memory cells.',
    rubricKeypoints: [
      'Explanation of False Overflow in linear queues (3 marks)',
      'Modulo arithmetic formula for rear update (3 marks)',
      'Full and empty condition checks (2 marks)',
      'Diagram or implementation details (2 marks)'
    ],
    keywords: ['False Overflow', 'Modulo', '(rear+1)%MAX', 'Front', 'Rear']
  },
  {
    id: 'q3',
    examId: 'exam-ds-ia1',
    questionNumber: 3,
    questionText: 'Perform Inorder, Preorder, and Postorder traversals for the given Binary Search Tree.',
    maxMarks: 10,
    topic: 'Trees',
    concept: 'Tree Traversal Algorithms',
    difficulty: 'Easy',
    modelAnswer: 'Inorder: Left -> Root -> Right (produces sorted order in BST). Preorder: Root -> Left -> Right. Postorder: Left -> Right -> Root. Correct sequential traversal nodes matching the given tree structure.',
    rubricKeypoints: [
      'Inorder traversal correct sequence (4 marks)',
      'Preorder traversal correct sequence (3 marks)',
      'Postorder traversal correct sequence (3 marks)'
    ],
    keywords: ['Inorder', 'Preorder', 'Postorder', 'Left', 'Root', 'Right']
  },
  {
    id: 'q4',
    examId: 'exam-ds-ia1',
    questionNumber: 4,
    questionText: 'Explain insertion and deletion operations in a doubly linked list with edge cases.',
    maxMarks: 10,
    topic: 'Linked Lists',
    concept: 'Doubly Linked List Operations',
    difficulty: 'Hard',
    modelAnswer: 'A Doubly Linked List node has data, prev, and next pointers. For insertion at position k: update new_node->next = curr, new_node->prev = curr->prev, curr->prev->next = new_node, curr->prev = new_node. For deletion: update curr->prev->next = curr->next and curr->next->prev = curr->prev. Edge cases include deleting head, deleting single-node list, and deleting tail.',
    rubricKeypoints: [
      'Node structure definition with prev and next pointers (2 marks)',
      'Insertion algorithm with all 4 pointer updates (3 marks)',
      'Deletion algorithm with pointer updates (3 marks)',
      'Handling boundary conditions like null pointers and head node (2 marks)'
    ],
    keywords: ['prev pointer', 'next pointer', 'head', 'boundary conditions', 'NULL check']
  },
  {
    id: 'q5',
    examId: 'exam-ds-ia1',
    questionNumber: 5,
    questionText: 'Write a recursive function to compute the Fibonacci series and analyze its time complexity using a recursion tree.',
    maxMarks: 10,
    topic: 'Recursion',
    concept: 'Recursive Call Tracing & Complexity',
    difficulty: 'Hard',
    modelAnswer: 'Base cases: fib(0) = 0, fib(1) = 1. Recursive case: fib(n) = fib(n-1) + fib(n-2). The recursion tree branches twice at each level up to depth n, yielding O(2^n) exponential time complexity and O(n) call stack space.',
    rubricKeypoints: [
      'Base cases correctly defined (2 marks)',
      'Recursive relation accurately formulated (2 marks)',
      'Recursion tree diagram showing branching (3 marks)',
      'Time complexity derived as O(2^n) and space O(n) (3 marks)'
    ],
    keywords: ['Base case', 'fib(n-1)+fib(n-2)', 'Recursion tree', 'O(2^n)', 'Call stack']
  },
  {
    id: 'q6',
    examId: 'exam-ds-ia1',
    questionNumber: 6,
    questionText: 'Describe how infix expressions are converted to postfix using a Stack.',
    maxMarks: 10,
    topic: 'Stacks',
    concept: 'Expression Conversion & Operator Precedence',
    difficulty: 'Medium',
    modelAnswer: 'Scan from left to right. Operands go directly to output. Operators are pushed onto stack after popping higher or equal precedence operators. Left parentheses are pushed unconditionally; right parentheses pop until matching left parenthesis.',
    rubricKeypoints: [
      'Operator precedence rules table (2 marks)',
      'Step-by-step algorithm using stack (5 marks)',
      'Parentheses handling logic (3 marks)'
    ],
    keywords: ['Precedence', 'Associativity', 'Left parenthesis', 'Postfix string']
  },
  {
    id: 'q7',
    examId: 'exam-ds-ia1',
    questionNumber: 7,
    questionText: 'Define Big-O, Big-Omega, and Big-Theta notations with mathematical bounds and graphical representations.',
    maxMarks: 10,
    topic: 'Time Complexity',
    concept: 'Asymptotic Analysis & Formal Bounds',
    difficulty: 'Medium',
    modelAnswer: 'Big-O represents the asymptotic upper bound: f(n) <= c*g(n) for n >= n0. Big-Omega represents the asymptotic lower bound: f(n) >= c*g(n). Big-Theta represents the tight bound: c1*g(n) <= f(n) <= c2*g(n).',
    rubricKeypoints: [
      'Formal mathematical inequalities for all three notations (4 marks)',
      'Graphical sketches indicating constants c and threshold n0 (3 marks)',
      'Practical engineering examples (3 marks)'
    ],
    keywords: ['Upper bound', 'Lower bound', 'Tight bound', 'c*g(n)', 'n >= n0']
  },
  {
    id: 'q8',
    examId: 'exam-ds-ia1',
    questionNumber: 8,
    questionText: 'Explain the working of Binary Search on a sorted array with worst-case recurrence relation.',
    maxMarks: 10,
    topic: 'Algorithms',
    concept: 'Divide & Conquer Searching',
    difficulty: 'Easy',
    modelAnswer: 'Binary search compares key with mid = low + (high-low)/2. If key == arr[mid], return mid. If key < arr[mid], search left half (high = mid-1). Else search right half. Recurrence: T(n) = T(n/2) + O(1), which solves to O(log n) via Master Theorem.',
    rubricKeypoints: [
      'Precondition: sorted array requirement (1 mark)',
      'Midpoint formula and pointer updates (4 marks)',
      'Recurrence relation formulation T(n)=T(n/2)+1 (3 marks)',
      'Master theorem solution O(log n) (2 marks)'
    ],
    keywords: ['Sorted', 'mid', 'T(n)=T(n/2)+c', 'O(log n)', 'Divide and conquer']
  },
  {
    id: 'q9',
    examId: 'exam-ds-ia1',
    questionNumber: 9,
    questionText: 'What is a Hash Collision? Explain Linear Probing and Chaining methods of collision resolution.',
    maxMarks: 10,
    topic: 'Hashing',
    concept: 'Hash Functions & Collision Resolution',
    difficulty: 'Medium',
    modelAnswer: 'A collision occurs when hash(k1) == hash(k2) for distinct keys k1 != k2. Linear Probing searches next sequential slot: (hash(k) + i) % TableSize. Chaining attaches a linked list to each table index to hold colliding entries.',
    rubricKeypoints: [
      'Definition of collision and load factor alpha (2 marks)',
      'Linear probing open addressing mechanism & clustering issue (4 marks)',
      'Separate chaining with linked lists and performance analysis (4 marks)'
    ],
    keywords: ['Collision', 'hash(k)', 'Linear probing', 'Chaining', 'Primary clustering']
  },
  {
    id: 'q10',
    examId: 'exam-ds-ia1',
    questionNumber: 10,
    questionText: 'Explain Breadth First Search (BFS) graph traversal with queue state at each step.',
    maxMarks: 10,
    topic: 'Graphs',
    concept: 'Graph Traversal & Queue Exploration',
    difficulty: 'Medium',
    modelAnswer: 'BFS explores graph level by level using a FIFO Queue and visited boolean array. Enqueue source, mark visited. While queue not empty: dequeue current node, process it, enqueue all unvisited adjacent neighbors and mark them visited. Time complexity O(V + E).',
    rubricKeypoints: [
      'Use of Queue and Visited array (3 marks)',
      'Algorithm step-by-step logic (4 marks)',
      'Queue trace demonstration on example graph (2 marks)',
      'Time complexity O(V+E) and space O(V) (1 mark)'
    ],
    keywords: ['FIFO Queue', 'Visited array', 'Level-order', 'O(V+E)', 'Adjacency']
  }
];

export const sampleStudents: Student[] = [
  {
    id: 'std-001',
    rollNumber: '23CS0101',
    name: 'KAVIYA K',
    email: 'kaviya.k@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 86.5,
    previousAverage: 82.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Analysis Notations'],
    strongConcepts: ['Stack Operations', 'Tree Traversals', 'Binary Search'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 88, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 44, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 89, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 85, maxScore: 100 }
    ]
  },
  {
    id: 'std-002',
    rollNumber: '23CS0102',
    name: 'KAVIYA SRI S',
    email: 'kaviyasri.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 79.0,
    previousAverage: 74.0,
    improvementPercentage: 5.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked Lists'],
    strongConcepts: ['Queue Implementation', 'BFS Graph Traversal'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 80, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 39, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 82, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 75, maxScore: 100 }
    ]
  },
  {
    id: 'std-003',
    rollNumber: '23CS0103',
    name: 'KEERTHIKA T',
    email: 'keerthika.t@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 92.0,
    previousAverage: 88.5,
    improvementPercentage: 3.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: [],
    strongConcepts: ['Recursion Call Tracing', 'Trees', 'Graphs', 'Hashing'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 94, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 47, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 95, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 90, maxScore: 100 }
    ]
  },
  {
    id: 'std-004',
    rollNumber: '23CS0104',
    name: 'KEVIN CHRISTIAN JOSE',
    email: 'kevin.cj@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 84.0,
    previousAverage: 79.0,
    improvementPercentage: 5.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Graph Adjacency Lists'],
    strongConcepts: ['Stack Applications', 'Binary Search', 'Linear Probing'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 85, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 42, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 87, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 81, maxScore: 100 }
    ]
  },
  {
    id: 'std-005',
    rollNumber: '23CS0105',
    name: 'KIRAN D',
    email: 'kiran.d@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 68.5,
    previousAverage: 65.0,
    improvementPercentage: 3.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Tree Analysis', 'Modulo Arithmetic'],
    strongConcepts: ['Linear Queue', 'Infix to Postfix'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 70, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 34, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 72, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 66, maxScore: 100 }
    ]
  },
  {
    id: 'std-006',
    rollNumber: '23CS0106',
    name: 'KIRIVANTHAN .M',
    email: 'kirivanthan.m@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 44.0,
    previousAverage: 56.0,
    improvementPercentage: -12.0,
    riskLevel: 'High',
    totalEvaluated: 4,
    weakConcepts: ['Linked Lists', 'Recursion', 'Time Complexity'],
    strongConcepts: ['Basic Arrays', 'Stack Push/Pop'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 44, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 21, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 48, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 51, maxScore: 100 }
    ]
  },
  {
    id: 'std-007',
    rollNumber: '23CS0107',
    name: 'KIRTHIKA S',
    email: 'kirthika.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 76.0,
    previousAverage: 72.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Deletion'],
    strongConcepts: ['Queue Operations', 'BFS Traversal', 'Tree Traversals'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 77, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 38, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 79, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 73, maxScore: 100 }
    ]
  },
  {
    id: 'std-008',
    rollNumber: '23CS0108',
    name: 'KIRUBA R',
    email: 'kiruba.r@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 49.0,
    previousAverage: 58.0,
    improvementPercentage: -9.0,
    riskLevel: 'High',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Call Tracing', 'Binary Search Trees', 'Pointer Safety'],
    strongConcepts: ['Linear Queue', 'Basic Sorting'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 48, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 25, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 52, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 55, maxScore: 100 }
    ]
  },
  {
    id: 'std-009',
    rollNumber: '23CS0109',
    name: 'KIRUBA SANKAR .S',
    email: 'kirubasankar.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 73.5,
    previousAverage: 70.0,
    improvementPercentage: 3.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Tight Bounds'],
    strongConcepts: ['Circular Queue', 'Tree Traversals', 'Hash Chaining'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 75, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 37, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 76, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 71, maxScore: 100 }
    ]
  },
  {
    id: 'std-010',
    rollNumber: '23CS0110',
    name: 'KIRUBANANDHAN M',
    email: 'kirubanandhan.m@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 46.0,
    previousAverage: 55.0,
    improvementPercentage: -9.0,
    riskLevel: 'High',
    totalEvaluated: 4,
    weakConcepts: ['Graph Traversal', 'Recursion Trees', 'Dynamic Memory'],
    strongConcepts: ['Array Traversal', 'Stack Basics'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 46, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 23, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 50, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 52, maxScore: 100 }
    ]
  },
  {
    id: 'std-011',
    rollNumber: '23CS0111',
    name: 'KIRUTHIKSHA K P',
    email: 'kiruthiksha.kp@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 88.0,
    previousAverage: 83.0,
    improvementPercentage: 5.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Worst-case Recurrence Bounds'],
    strongConcepts: ['Trees', 'Graphs', 'Hash Tables', 'Stack Invariants'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 90, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 45, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 91, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 86, maxScore: 100 }
    ]
  },
  {
    id: 'std-012',
    rollNumber: '23CS0112',
    name: 'KISHAUNISH GK',
    email: 'kishaunish.gk@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 71.0,
    previousAverage: 67.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Collision Resolution Probing'],
    strongConcepts: ['Stack Applications', 'Binary Search'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 72, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 35, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 74, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 70, maxScore: 100 }
    ]
  },
  {
    id: 'std-013',
    rollNumber: '23CS0113',
    name: 'KISHORE KUMAR P',
    email: 'kishorekumar.p@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 81.5,
    previousAverage: 78.0,
    improvementPercentage: 3.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Big-Omega Proofs'],
    strongConcepts: ['Queue Modulo', 'Inorder Tree Traversal', 'BFS Algorithm'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 83, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 41, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 85, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 79, maxScore: 100 }
    ]
  },
  {
    id: 'std-014',
    rollNumber: '23CS0114',
    name: 'KRISHNAPRIYA S',
    email: 'krishnapriya.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 95.0,
    previousAverage: 92.0,
    improvementPercentage: 3.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: [],
    strongConcepts: ['All Data Structures', 'Algorithms', 'Mathematical Bounds', 'Recursion Trees'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 96, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 49, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 97, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 93, maxScore: 100 }
    ]
  },
  {
    id: 'std-015',
    rollNumber: '23CS0115',
    name: 'KRISHNA VISHAL M',
    email: 'krishnavishal.m@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 53.0,
    previousAverage: 57.0,
    improvementPercentage: -4.0,
    riskLevel: 'Medium',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Call Tracing', 'Pointer Updates in DLL'],
    strongConcepts: ['Stack Operations', 'Linear Queue'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 52, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 27, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 56, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 55, maxScore: 100 }
    ]
  },
  {
    id: 'std-016',
    rollNumber: '23CS0116',
    name: 'LEKSHMITA R',
    email: 'lekshmita.r@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 83.0,
    previousAverage: 79.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Hash Primary Clustering'],
    strongConcepts: ['Tree Traversals', 'Stack Evaluation', 'BFS Traversal'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 84, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 42, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 86, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 80, maxScore: 100 }
    ]
  },
  {
    id: 'std-017',
    rollNumber: '23CS0117',
    name: 'LOKESH WARI',
    email: 'lokeshwari@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 77.5,
    previousAverage: 73.0,
    improvementPercentage: 4.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Edge Cases'],
    strongConcepts: ['Queue Implementation', 'Binary Search', 'Infix to Postfix'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 78, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 39, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 81, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 75, maxScore: 100 }
    ]
  },
  {
    id: 'std-018',
    rollNumber: '23CS0118',
    name: 'N. MAGITHA',
    email: 'n.magitha@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 89.0,
    previousAverage: 85.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Call Stack Bounds'],
    strongConcepts: ['Tree Traversals', 'Graph Search', 'Stack Invariants', 'Hashing'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 91, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 45, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 92, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 87, maxScore: 100 }
    ]
  },
  {
    id: 'std-019',
    rollNumber: '23CS0119',
    name: 'MAHALAKSHMI.L',
    email: 'mahalakshmi.l@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 86.0,
    previousAverage: 81.0,
    improvementPercentage: 5.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Formal Limits'],
    strongConcepts: ['BST Operations', 'Queue Modulo', 'Stack Algorithms'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 87, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 43, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 89, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 83, maxScore: 100 }
    ]
  },
  {
    id: 'std-020',
    rollNumber: '23CS0120',
    name: 'MANASHA S',
    email: 'manasha.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 75.0,
    previousAverage: 71.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Deletion'],
    strongConcepts: ['Stack Mechanics', 'Binary Search', 'Linear Queue'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 76, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 37, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 78, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 72, maxScore: 100 }
    ]
  },
  {
    id: 'std-021',
    rollNumber: '23CS0121',
    name: 'MANIKANDAN J',
    email: 'manikandan.j@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 57.0,
    previousAverage: 61.0,
    improvementPercentage: -4.0,
    riskLevel: 'Medium',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Tree Analysis', 'Doubly Linked List'],
    strongConcepts: ['Linear Search', 'Stack Push/Pop'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 56, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 29, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 60, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 57, maxScore: 100 }
    ]
  },
  {
    id: 'std-022',
    rollNumber: '23CS0122',
    name: 'MANIKANDAN S',
    email: 'manikandan.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 72.5,
    previousAverage: 69.0,
    improvementPercentage: 3.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Hash Collision Probing'],
    strongConcepts: ['Queue Operations', 'BFS Traversal', 'Tree Traversals'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 73, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 36, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 75, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 70, maxScore: 100 }
    ]
  },
  {
    id: 'std-023',
    rollNumber: '23CS0123',
    name: 'MANOBHARATHI G',
    email: 'manobharathi.g@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 80.0,
    previousAverage: 76.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Big-Theta Inequalities'],
    strongConcepts: ['Binary Search Trees', 'Queue Modulo', 'Stack Conversions'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 81, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 40, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 83, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 78, maxScore: 100 }
    ]
  },
  {
    id: 'std-024',
    rollNumber: '23CS0124',
    name: 'MANOJ KUMAR S',
    email: 'manojkumar.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 69.0,
    previousAverage: 66.0,
    improvementPercentage: 3.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Head Deletions'],
    strongConcepts: ['BFS Graph Traversal', 'Stack Operations'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 70, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 35, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 71, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 67, maxScore: 100 }
    ]
  },
  {
    id: 'std-025',
    rollNumber: '23CS0125',
    name: 'MELVIN RAJ T',
    email: 'melvinraj.t@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 82.5,
    previousAverage: 78.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Notation Graphs'],
    strongConcepts: ['Tree Traversals', 'Hash Tables', 'Queue Modulo'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 84, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 41, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 85, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 80, maxScore: 100 }
    ]
  },
  {
    id: 'std-026',
    rollNumber: '23CS0126',
    name: 'MIRACLIN RENITH .S',
    email: 'miraclin.renith@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 78.0,
    previousAverage: 74.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Auxiliary Stack Space'],
    strongConcepts: ['Infix to Postfix', 'Binary Search Trees', 'Queue State'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 79, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 39, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 81, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 75, maxScore: 100 }
    ]
  },
  {
    id: 'std-027',
    rollNumber: '23CS0127',
    name: 'MIRACLIN JEBA S',
    email: 'miraclin.jeba@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 87.0,
    previousAverage: 82.5,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Hash Primary Clustering'],
    strongConcepts: ['Trees', 'Graphs', 'Recursion', 'Stack Invariants'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 88, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 44, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 90, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 84, maxScore: 100 }
    ]
  },
  {
    id: 'std-028',
    rollNumber: '23CS0128',
    name: 'MITHRA SRI M',
    email: 'mithrasri.m@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 91.5,
    previousAverage: 87.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: [],
    strongConcepts: ['Data Structures', 'Tree Traversals', 'Graph BFS', 'Asymptotic Proofs'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 93, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 46, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 94, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 89, maxScore: 100 }
    ]
  },
  {
    id: 'std-029',
    rollNumber: '23CS0129',
    name: 'MOGITHA T',
    email: 'mogitha.t@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 74.0,
    previousAverage: 70.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Pointer Links'],
    strongConcepts: ['Queue Modulo Arithmetic', 'Stack Operations', 'Binary Search'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 75, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 37, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 77, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 71, maxScore: 100 }
    ]
  },
  {
    id: 'std-030',
    rollNumber: '23CS0130',
    name: 'MOHAMMED FARIZ.F',
    email: 'mohammedfariz.f@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 96.0,
    previousAverage: 92.5,
    improvementPercentage: 3.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: [],
    strongConcepts: ['Advanced Algorithms', 'Trees & Graphs', 'Complex Recurrences', 'Dynamic Memory & Pointer Optimization'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 98, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 50, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 98, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 95, maxScore: 100 }
    ]
  },
  {
    id: 'std-031',
    rollNumber: '23CS0131',
    name: 'MOHANA SRI A',
    email: 'mohanasri.a@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 85.0,
    previousAverage: 80.0,
    improvementPercentage: 5.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Upper Bounds Proofs'],
    strongConcepts: ['Tree Traversals', 'Stack Evaluation', 'BFS Traversal'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 86, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 43, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 88, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 82, maxScore: 100 }
    ]
  },
  {
    id: 'std-032',
    rollNumber: '23CS0132',
    name: 'MOORTHI S',
    email: 'moorthi.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 67.0,
    previousAverage: 63.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Call Stack Trace', 'Hash Tables'],
    strongConcepts: ['Binary Search', 'Linear Queue', 'Stack Push/Pop'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 68, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 33, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 70, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 65, maxScore: 100 }
    ]
  },
  {
    id: 'std-033',
    rollNumber: '23CS0133',
    name: 'MUGHIL.T',
    email: 'mughil.t@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 73.0,
    previousAverage: 69.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Modulo Arithmetic Edge Cases'],
    strongConcepts: ['Queue Operations', 'BFS Traversal', 'Tree Traversals'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 74, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 36, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 76, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 71, maxScore: 100 }
    ]
  },
  {
    id: 'std-034',
    rollNumber: '23CS0134',
    name: 'MUGILAN.D',
    email: 'mugilan.d@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 47.5,
    previousAverage: 57.0,
    improvementPercentage: -9.5,
    riskLevel: 'High',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Call Tracing', 'Doubly Linked List Deletions', 'Asymptotic Definitions'],
    strongConcepts: ['Simple Arrays', 'Stack Push'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 47, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 24, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 51, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 53, maxScore: 100 }
    ]
  },
  {
    id: 'std-035',
    rollNumber: '23CS0135',
    name: 'MUHAMMED RIDZWAN M',
    email: 'muhammed.ridzwan@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 88.5,
    previousAverage: 84.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Worst-case Graph Cycles'],
    strongConcepts: ['Trees', 'Graphs', 'Hash Tables', 'Stack Invariants', 'Recursion Trees'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 90, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 45, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 91, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 86, maxScore: 100 }
    ]
  },
  {
    id: 'std-036',
    rollNumber: '23CS0136',
    name: 'MUKESH G',
    email: 'mukesh.g@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 81.0,
    previousAverage: 77.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Big-Omega Proofs'],
    strongConcepts: ['Queue Modulo', 'Inorder Tree Traversal', 'BFS Algorithm'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 82, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 41, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 84, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 79, maxScore: 100 }
    ]
  },
  {
    id: 'std-037',
    rollNumber: '23CS0137',
    name: 'MUKESH S N',
    email: 'mukesh.sn@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 76.5,
    previousAverage: 72.0,
    improvementPercentage: 4.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Collision Resolution Chaining'],
    strongConcepts: ['Tree Traversals', 'Stack Evaluation', 'BFS Traversal'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 77, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 38, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 80, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 74, maxScore: 100 }
    ]
  },
  {
    id: 'std-038',
    rollNumber: '23CS0138',
    name: 'MUSTHAFAH H',
    email: 'musthafah.h@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 83.5,
    previousAverage: 79.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Formal Bounds'],
    strongConcepts: ['BST Operations', 'Queue Modulo', 'Stack Algorithms'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 85, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 42, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 86, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 81, maxScore: 100 }
    ]
  },
  {
    id: 'std-039',
    rollNumber: '23CS0139',
    name: 'NAGADEV I M',
    email: 'nagadev.im@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 70.5,
    previousAverage: 67.0,
    improvementPercentage: 3.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Pointer Links'],
    strongConcepts: ['Queue Operations', 'BFS Traversal', 'Tree Traversals'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 71, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 35, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 73, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 68, maxScore: 100 }
    ]
  },
  {
    id: 'std-040',
    rollNumber: '23CS0140',
    name: 'NAMIYA HANAN S',
    email: 'namiya.hanan@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 90.0,
    previousAverage: 86.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Analysis Limits'],
    strongConcepts: ['Trees', 'Graphs', 'Hash Tables', 'Stack Invariants', 'Recursion Trees'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 92, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 46, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 93, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 88, maxScore: 100 }
    ]
  },
  {
    id: 'std-041',
    rollNumber: '23CS0141',
    name: 'NANDHINI N',
    email: 'nandhini.n@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 89.5,
    previousAverage: 85.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Worst-case Graph Traversals'],
    strongConcepts: ['All Data Structures', 'Infix Parsing', 'Modulo Arithmetic'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 91, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 45, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 92, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 87, maxScore: 100 }
    ]
  },
  {
    id: 'std-042',
    rollNumber: '23CS0142',
    name: 'NANDHINI V',
    email: 'nandhini.v@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 84.5,
    previousAverage: 80.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Call Stack Trace'],
    strongConcepts: ['Tree Traversals', 'Stack Evaluation', 'BFS Traversal'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 86, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 43, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 88, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 82, maxScore: 100 }
    ]
  },
  {
    id: 'std-043',
    rollNumber: '23CS0143',
    name: 'NARAIN KARTHICK V',
    email: 'narain.karthick@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 79.5,
    previousAverage: 75.0,
    improvementPercentage: 4.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Formal Limits'],
    strongConcepts: ['Queue Operations', 'BFS Traversal', 'Tree Traversals'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 81, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 40, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 83, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 77, maxScore: 100 }
    ]
  },
  {
    id: 'std-044',
    rollNumber: '23CS0144',
    name: 'NASEEM KHAN R',
    email: 'naseem.khan@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 77.0,
    previousAverage: 73.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Deletion'],
    strongConcepts: ['Stack Mechanics', 'Binary Search', 'Linear Queue'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 78, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 39, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 80, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 74, maxScore: 100 }
    ]
  },
  {
    id: 'std-045',
    rollNumber: '23CS0145',
    name: 'NATHEESWARAN S',
    email: 'natheeswaran.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 72.0,
    previousAverage: 68.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Tree Analysis'],
    strongConcepts: ['Queue Modulo', 'Inorder Tree Traversal', 'BFS Algorithm'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 73, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 36, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 75, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 69, maxScore: 100 }
    ]
  },
  {
    id: 'std-046',
    rollNumber: '23CS0146',
    name: 'NATRAMIZH R',
    email: 'natramizh.r@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 86.0,
    previousAverage: 81.5,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Formal Limits'],
    strongConcepts: ['Trees', 'Graphs', 'Hash Tables', 'Stack Invariants'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 87, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 43, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 89, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 83, maxScore: 100 }
    ]
  },
  {
    id: 'std-047',
    rollNumber: '23CS0147',
    name: 'NAVANEETH T',
    email: 'navaneeth.t@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 80.5,
    previousAverage: 76.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Pointer Links'],
    strongConcepts: ['Tree Traversals', 'Stack Evaluation', 'BFS Traversal'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 82, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 40, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 84, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 78, maxScore: 100 }
    ]
  },
  {
    id: 'std-048',
    rollNumber: '23CS0148',
    name: 'NAVANEETHA PANDIG G',
    email: 'navaneetha.pandig@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 74.5,
    previousAverage: 70.0,
    improvementPercentage: 4.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Hash Collision Probing'],
    strongConcepts: ['Queue Operations', 'BFS Traversal', 'Tree Traversals'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 75, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 37, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 77, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 72, maxScore: 100 }
    ]
  },
  {
    id: 'std-049',
    rollNumber: '23CS0149',
    name: 'NAVEEN B',
    email: 'naveen.b@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 48.0,
    previousAverage: 57.0,
    improvementPercentage: -9.0,
    riskLevel: 'High',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Call Tracing', 'Doubly Linked List Deletions', 'Asymptotic Proofs'],
    strongConcepts: ['Array Operations', 'Stack Push/Pop'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 48, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 24, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 51, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 54, maxScore: 100 }
    ]
  },
  {
    id: 'std-050',
    rollNumber: '23CS0150',
    name: 'NAVEEN KUMAR.P',
    email: 'naveenkumar.p@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 82.0,
    previousAverage: 78.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Formal Limits'],
    strongConcepts: ['Tree Traversals', 'Stack Evaluation', 'BFS Traversal'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 83, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 41, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 85, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 79, maxScore: 100 }
    ]
  },
  {
    id: 'std-051',
    rollNumber: '23CS0151',
    name: 'NAVYA J',
    email: 'navya.j@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 87.5,
    previousAverage: 83.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Worst-case Graph Recurrences'],
    strongConcepts: ['Trees', 'Graphs', 'Hash Tables', 'Stack Invariants', 'Recursion Trees'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 89, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 44, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 90, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 85, maxScore: 100 }
    ]
  },
  {
    id: 'std-052',
    rollNumber: '23CS0152',
    name: 'NETHRA S',
    email: 'nethra.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 92.5,
    previousAverage: 88.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: [],
    strongConcepts: ['Data Structures', 'Tree Traversals', 'Graph BFS', 'Asymptotic Proofs'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 94, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 47, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 95, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 90, maxScore: 100 }
    ]
  },
  {
    id: 'std-053',
    rollNumber: '23CS0153',
    name: 'NILANI',
    email: 'nilani@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 78.5,
    previousAverage: 74.0,
    improvementPercentage: 4.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Deletion'],
    strongConcepts: ['Stack Mechanics', 'Binary Search', 'Linear Queue'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 80, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 39, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 81, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 76, maxScore: 100 }
    ]
  },
  {
    id: 'std-054',
    rollNumber: '23CS0154',
    name: 'NIRANJANA S',
    email: 'niranjana.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 85.5,
    previousAverage: 81.0,
    improvementPercentage: 4.5,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Formal Limits'],
    strongConcepts: ['Trees', 'Graphs', 'Hash Tables', 'Stack Invariants'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 87, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 43, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 88, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 83, maxScore: 100 }
    ]
  },
  {
    id: 'std-055',
    rollNumber: '23CS0155',
    name: 'NISANTH.S',
    email: 'nisanth.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 69.5,
    previousAverage: 66.0,
    improvementPercentage: 3.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Head Deletions'],
    strongConcepts: ['BFS Graph Traversal', 'Stack Operations'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 71, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 35, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 72, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 67, maxScore: 100 }
    ]
  },
  {
    id: 'std-056',
    rollNumber: '23CS0156',
    name: 'NISHANTH',
    email: 'nishanth@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 76.0,
    previousAverage: 72.0,
    improvementPercentage: 4.0,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Recursion Tree Analysis'],
    strongConcepts: ['Queue Modulo', 'Inorder Tree Traversal', 'BFS Algorithm'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 77, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 38, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 79, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 73, maxScore: 100 }
    ]
  },
  {
    id: 'std-057',
    rollNumber: '23CS0157',
    name: 'NITHISH G',
    email: 'nithish.g@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 81.0,
    previousAverage: 77.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Hash Primary Clustering'],
    strongConcepts: ['Tree Traversals', 'Stack Evaluation', 'BFS Traversal'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 82, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 41, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 84, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 79, maxScore: 100 }
    ]
  },
  {
    id: 'std-058',
    rollNumber: '23CS0158',
    name: 'NITHYA SHRI G I',
    email: 'nithyashri.gi@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 93.0,
    previousAverage: 89.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: [],
    strongConcepts: ['Data Structures', 'Tree Traversals', 'Graph BFS', 'Asymptotic Proofs'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 95, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 48, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 96, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 91, maxScore: 100 }
    ]
  },
  {
    id: 'std-059',
    rollNumber: '23CS0159',
    name: 'NITTISH D',
    email: 'nittish.d@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 75.5,
    previousAverage: 71.0,
    improvementPercentage: 4.5,
    riskLevel: 'Low',
    totalEvaluated: 4,
    weakConcepts: ['Doubly Linked List Pointer Links'],
    strongConcepts: ['Queue Operations', 'BFS Traversal', 'Tree Traversals'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 77, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 38, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 79, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 73, maxScore: 100 }
    ]
  },
  {
    id: 'std-060',
    rollNumber: '23CS0160',
    name: 'NIVETHA M',
    email: 'nivetha.m@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 88.0,
    previousAverage: 84.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Tight Bounds'],
    strongConcepts: ['Trees', 'Graphs', 'Hash Tables', 'Stack Invariants'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 89, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 44, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 91, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 85, maxScore: 100 }
    ]
  },
  {
    id: 'std-061',
    rollNumber: '23CS0161',
    name: 'NIVETHA S',
    email: 'nivetha.s@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 84.0,
    previousAverage: 80.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Hash Collision Probing'],
    strongConcepts: ['Tree Traversals', 'Stack Evaluation', 'BFS Traversal'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 85, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 42, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 87, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 81, maxScore: 100 }
    ]
  },
  {
    id: 'std-062',
    rollNumber: '23CS0162',
    name: 'PASUPATHI T',
    email: 'pasupathi.t@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 45.5,
    previousAverage: 55.0,
    improvementPercentage: -9.5,
    riskLevel: 'High',
    totalEvaluated: 4,
    weakConcepts: ['Graph Traversal', 'Recursion Trees', 'Dynamic Memory'],
    strongConcepts: ['Array Traversal', 'Stack Basics'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 45, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 23, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 49, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 52, maxScore: 100 }
    ]
  },
  {
    id: 'std-063',
    rollNumber: '23CS0163',
    name: 'JEEVAN K',
    email: 'jeevan.k@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 82.0,
    previousAverage: 78.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Asymptotic Formal Limits'],
    strongConcepts: ['BST Operations', 'Queue Modulo', 'Stack Algorithms'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 84, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 41, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 85, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 80, maxScore: 100 }
    ]
  },
  {
    id: 'std-064',
    rollNumber: '23CS0164',
    name: 'KATHIRESH',
    email: 'kathireesh@univ.edu.in',
    department: 'Computer Science & Engineering',
    semester: 3,
    section: 'A',
    currentAverage: 80.0,
    previousAverage: 76.0,
    improvementPercentage: 4.0,
    riskLevel: 'None',
    totalEvaluated: 4,
    weakConcepts: ['Modulo Arithmetic Edge Cases'],
    strongConcepts: ['Queue Operations', 'BFS Traversal', 'Tree Traversals'],
    recentScores: [
      { examName: 'CS301-IA1', date: '2026-07-28', score: 81, maxScore: 100 },
      { examName: 'CS304-UT', date: '2026-07-15', score: 40, maxScore: 50 },
      { examName: 'CS302-IA2', date: '2026-06-20', score: 83, maxScore: 100 },
      { examName: 'CS303-MID', date: '2026-05-18', score: 78, maxScore: 100 }
    ]
  }
];

export const sampleAtRiskStudents: AtRiskStudent[] = [
  {
    studentId: 'std-006',
    name: 'KIRIVANTHAN .M',
    rollNumber: '23CS0106',
    score: 44,
    riskLevel: 'High',
    reason: 'Low concept mastery in Linked Lists & Recursion (< 50%)',
    weakArea: 'Linked Lists & Recursion',
    suggestedAction: 'Individual practice with pointer trace diagrams & 1-on-1 TA review',
    trend: 'declining',
    lastActive: '2 hours ago'
  },
  {
    studentId: 'std-008',
    name: 'KIRUBA R',
    rollNumber: '23CS0108',
    score: 48,
    riskLevel: 'High',
    reason: 'Continuous drop across 3 assessments; conceptual errors in recursion',
    weakArea: 'Recursion Call Tracing & BSTs',
    suggestedAction: 'Assign targeted revision worksheet on recursive call trees',
    trend: 'declining',
    lastActive: 'Yesterday'
  },
  {
    studentId: 'std-010',
    name: 'KIRUBANANDHAN M',
    rollNumber: '23CS0110',
    score: 46,
    riskLevel: 'High',
    reason: 'Score fell by 9% from previous assessment; multiple incomplete answers',
    weakArea: 'Graph Traversal & Recursion Trees',
    suggestedAction: 'Remedial lab session on queue and stack state exploration',
    trend: 'declining',
    lastActive: '3 hours ago'
  },
  {
    studentId: 'std-034',
    name: 'MUGILAN.D',
    rollNumber: '23CS0134',
    score: 47,
    riskLevel: 'High',
    reason: 'Struggling with boundary condition logic in pointer-based questions',
    weakArea: 'Doubly Linked List Deletions',
    suggestedAction: 'Topic intervention during tutorial hour',
    trend: 'declining',
    lastActive: '1 day ago'
  },
  {
    studentId: 'std-049',
    name: 'NAVEEN B',
    rollNumber: '23CS0149',
    score: 48,
    riskLevel: 'High',
    reason: 'Weak in theoretical asymptotic definitions; slow question completion',
    weakArea: 'Recursion & Asymptotics',
    suggestedAction: 'Provide step-by-step mathematical proof reference guide',
    trend: 'declining',
    lastActive: '5 hours ago'
  },
  {
    studentId: 'std-062',
    name: 'PASUPATHI T',
    rollNumber: '23CS0162',
    score: 45,
    riskLevel: 'High',
    reason: 'Stagnant low score range; repeated mistakes in dynamic memory allocation',
    weakArea: 'Graph Traversal & Pointer Allocation',
    suggestedAction: 'Peer study group assignment for data structures implementation',
    trend: 'stagnant',
    lastActive: 'Yesterday'
  },
  {
    studentId: 'std-015',
    name: 'KRISHNA VISHAL M',
    rollNumber: '23CS0115',
    score: 52,
    riskLevel: 'Medium',
    reason: 'Downward trend in recursion call tracing and DLL pointer updates',
    weakArea: 'Recursion Call Tracing',
    suggestedAction: 'Worksheet on pointer diagrams & step trace',
    trend: 'monitor',
    lastActive: '4 hours ago'
  },
  {
    studentId: 'std-021',
    name: 'MANIKANDAN J',
    rollNumber: '23CS0121',
    score: 56,
    riskLevel: 'Medium',
    reason: 'Borderline mastery in doubly linked list manipulations',
    weakArea: 'Doubly Linked Lists',
    suggestedAction: 'Hands-on practice during tutorial lab',
    trend: 'monitor',
    lastActive: '6 hours ago'
  }
];

export const defaultEvaluationResult: EvaluationResult = {
  id: 'eval-kaviya-ds-ia1',
  answerSheetId: 'sheet-001',
  studentId: 'std-001',
  studentName: 'KAVIYA K',
  rollNumber: '23CS0101',
  examId: 'exam-ds-ia1',
  examTitle: 'Data Structures – Internal Assessment 1',
  subject: 'Data Structures & Algorithms',
  date: '2026-07-28',
  totalScore: 88,
  maxMarks: 100,
  percentage: 88,
  accuracy: 90,
  questionsAttempted: 10,
  totalQuestions: 10,
  conceptsMasteredCount: 9,
  totalConceptsCount: 12,
  performanceRating: 'Distinction',
  strengths: [
    'Stack operations & LIFO mechanics',
    'Queue implementation & Modulo indexing',
    'Tree traversal (Inorder, Preorder, Postorder)',
    'Binary Search & Asymptotic Divide and Conquer'
  ],
  areasForImprovement: [
    'Doubly linked list pointer synchronization edge cases',
    'Recursion tree auxiliary space complexity derivations',
    'Asymptotic notation mathematical definitions'
  ],
  questionEvaluations: [
    {
      questionId: 'q1',
      questionNumber: 1,
      questionText: 'Explain the push and pop operations on a stack with their algorithmic time complexities.',
      maxMarks: 10,
      awardedMarks: 8,
      studentAnswerText: 'A stack is a linear data structure working on Last In First Out (LIFO). In Push operation, we increment top pointer: top = top + 1 and insert element at arr[top]. In Pop operation, we retrieve arr[top] and decrement top: top = top - 1. Time complexity for push is O(1) and pop is O(1). Underflow occurs when stack is empty.',
      confidenceScore: 0.94,
      resultStatus: 'Good',
      errorType: 'Minor Error' as any,
      missingConcepts: ['Array overflow condition when top == MAX-1'],
      feedback: 'Excellent explanation of LIFO and pointer arithmetic. The answer missed explicitly showing the overflow boundary check before incrementing top.',
      recommendedAction: 'Include both underflow and overflow pre-condition checks in pseudocode answers.',
      rubricBreakdown: [
        { criterion: 'LIFO Definition', maxMarks: 2, awardedMarks: 2, comment: 'Clear and correct definition' },
        { criterion: 'Push logic', maxMarks: 3, awardedMarks: 2.5, comment: 'Correct logic, missed overflow guard' },
        { criterion: 'Pop logic & Underflow', maxMarks: 3, awardedMarks: 2.5, comment: 'Underflow mentioned' },
        { criterion: 'Time Complexity', maxMarks: 2, awardedMarks: 1, comment: 'Stated O(1) correctly' }
      ]
    },
    {
      questionId: 'q2',
      questionNumber: 2,
      questionText: 'What is a Circular Queue? How does it resolve the space limitation issue of a Linear Queue?',
      maxMarks: 10,
      awardedMarks: 6,
      studentAnswerText: 'Circular queue connects the last position back to first. In normal queue, if we delete elements from front, empty spaces in front cannot be reused when rear reaches end. Circular queue uses (rear + 1) % MAX. This prevents wasted memory space.',
      confidenceScore: 0.89,
      resultStatus: 'Partial',
      errorType: 'Conceptual',
      missingConcepts: ['Full condition formula: (rear + 1) % MAX == front', 'Front pointer cyclic advancement logic'],
      feedback: 'The student correctly identified the false overflow limitation of linear queues and stated the rear formula, but did not define the complete full condition or front update mechanics.',
      recommendedAction: 'Practice implementing circular queue enqueue and dequeue with full condition check in code.',
      rubricBreakdown: [
        { criterion: 'Limitation explanation', maxMarks: 3, awardedMarks: 3, comment: 'Well articulated false overflow' },
        { criterion: 'Modulo rear formula', maxMarks: 3, awardedMarks: 2, comment: 'Formula given without step derivation' },
        { criterion: 'Full/Empty conditions', maxMarks: 2, awardedMarks: 0.5, comment: 'Missed explicit modulo full check' },
        { criterion: 'Diagram / Structure', maxMarks: 2, awardedMarks: 0.5, comment: 'No diagram provided' }
      ]
    },
    {
      questionId: 'q3',
      questionNumber: 3,
      questionText: 'Perform Inorder, Preorder, and Postorder traversals for the given Binary Search Tree.',
      maxMarks: 10,
      awardedMarks: 10,
      studentAnswerText: 'Inorder (Left, Root, Right): 12, 18, 25, 30, 45, 50, 60. Preorder (Root, Left, Right): 30, 18, 12, 25, 50, 45, 60. Postorder (Left, Right, Root): 12, 25, 18, 45, 60, 50, 30.',
      confidenceScore: 0.98,
      resultStatus: 'Correct',
      errorType: 'None',
      missingConcepts: [],
      feedback: 'Flawless traversal execution for all three recursive orders. Sorted order property correctly demonstrated in Inorder.',
      recommendedAction: 'Ready to proceed to non-recursive tree traversals using explicit stacks.',
      rubricBreakdown: [
        { criterion: 'Inorder Sequence', maxMarks: 4, awardedMarks: 4, comment: 'Completely accurate' },
        { criterion: 'Preorder Sequence', maxMarks: 3, awardedMarks: 3, comment: 'Completely accurate' },
        { criterion: 'Postorder Sequence', maxMarks: 3, awardedMarks: 3, comment: 'Completely accurate' }
      ]
    },
    {
      questionId: 'q4',
      questionNumber: 4,
      questionText: 'Explain insertion and deletion operations in a doubly linked list with edge cases.',
      maxMarks: 10,
      awardedMarks: 5,
      studentAnswerText: 'In doubly linked list, every node has previous and next pointers. For insertion: new_node->next = current->next; new_node->prev = current; current->next = new_node. For deletion: temp = target_node; target_node->prev->next = target_node->next. Free temp.',
      confidenceScore: 0.91,
      resultStatus: 'Partial',
      errorType: 'Conceptual',
      missingConcepts: [
        'Previous pointer update on next node: target_node->next->prev = target_node->prev',
        'Boundary condition: Deletion of Head node (head = head->next, prev = NULL)',
        'Boundary condition: Deletion of Tail node (next is NULL)'
      ],
      feedback: 'The student understands the basic structure of a doubly linked list but has not correctly updated the backward pointer on adjacent nodes during deletion, and missed head deletion edge cases.',
      recommendedAction: 'Revise insertion and deletion operations and practice pointer-update diagrams with 4-step pointer synchronization.',
      rubricBreakdown: [
        { criterion: 'Structure & Pointers', maxMarks: 2, awardedMarks: 2, comment: 'Good concept of prev/next' },
        { criterion: 'Insertion updates', maxMarks: 3, awardedMarks: 2, comment: 'Missed curr->next->prev update' },
        { criterion: 'Deletion updates', maxMarks: 3, awardedMarks: 1, comment: 'Incomplete pointer linking' },
        { criterion: 'Edge cases handling', maxMarks: 2, awardedMarks: 0, comment: 'No boundary condition handling' }
      ]
    },
    {
      questionId: 'q5',
      questionNumber: 5,
      questionText: 'Write a recursive function to compute the Fibonacci series and analyze its time complexity using a recursion tree.',
      maxMarks: 10,
      awardedMarks: 7,
      studentAnswerText: 'int fib(int n) { if(n==0) return 0; if(n==1) return 1; return fib(n-1) + fib(n-2); } The recursion tree branches into 2 calls for each n. At level 0: 1 call, level 1: 2 calls, level 2: 4 calls... up to depth n. Total nodes = 1 + 2 + 4 + ... + 2^n = 2^(n+1) - 1. So time complexity is O(2^n). Space is O(n^2).',
      confidenceScore: 0.93,
      resultStatus: 'Good',
      errorType: 'Calculation',
      missingConcepts: ['Space complexity is O(n) determined by maximum call stack recursion depth, not O(n^2)'],
      feedback: 'Recursive implementation and time complexity derivation are very clear. However, space complexity was incorrectly computed as O(n^2) rather than O(n) call stack depth.',
      recommendedAction: 'Review auxiliary stack space in recursive algorithms vs total tree node count.',
      rubricBreakdown: [
        { criterion: 'Base cases & Code', maxMarks: 4, awardedMarks: 4, comment: 'Accurate base cases and syntax' },
        { criterion: 'Recursion tree explanation', maxMarks: 3, awardedMarks: 2.5, comment: 'Good level branching explanation' },
        { criterion: 'Time Complexity', maxMarks: 2, awardedMarks: 2, comment: 'Derived O(2^n) accurately' },
        { criterion: 'Space Complexity', maxMarks: 1, awardedMarks: 0.5, comment: 'Calculation error on stack space' }
      ]
    },
    {
      questionId: 'q6',
      questionNumber: 6,
      questionText: 'Describe how infix expressions are converted to postfix using a Stack.',
      maxMarks: 10,
      awardedMarks: 9,
      studentAnswerText: 'Scan infix left to right. If operand, add to postfix output. If "(", push to stack. If ")", pop and append until "(". If operator, pop operators from stack with greater or equal precedence and append to output, then push current operator. At end, pop remaining operators.',
      confidenceScore: 0.96,
      resultStatus: 'Good',
      errorType: 'Careless',
      missingConcepts: ['Associativity rule handling (Right-to-Left for exponentiation ^)'],
      feedback: 'Strong grasp of stack-based expression evaluation. Almost complete; only omitted operator associativity special rule for exponentiation.',
      recommendedAction: 'Add right-associativity check for power operator ^ during precedence comparison.',
      rubricBreakdown: [
        { criterion: 'Operator Precedence', maxMarks: 2, awardedMarks: 2, comment: 'Clear precedence logic' },
        { criterion: 'Stack Algorithm Steps', maxMarks: 5, awardedMarks: 4.5, comment: 'Clear, concise step listing' },
        { criterion: 'Parentheses Logic', maxMarks: 3, awardedMarks: 2.5, comment: 'Handled properly' }
      ]
    },
    {
      questionId: 'q7',
      questionNumber: 7,
      questionText: 'Define Big-O, Big-Omega, and Big-Theta notations with mathematical bounds and graphical representations.',
      maxMarks: 10,
      awardedMarks: 4,
      studentAnswerText: 'Big-O means worst case scenario of an algorithm. Big-Omega means best case scenario. Big-Theta is average case. In Big-O, f(n) <= c*g(n).',
      confidenceScore: 0.90,
      resultStatus: 'Weak',
      errorType: 'Incomplete',
      missingConcepts: [
        'Mathematical definition of Big-Omega: f(n) >= c*g(n) for n >= n0',
        'Mathematical definition of Big-Theta: c1*g(n) <= f(n) <= c2*g(n)',
        'Threshold n0 specification and positive constant constraints (c > 0)',
        'Graphical sketches showing upper, lower, and tight bounding curves'
      ],
      feedback: 'The student confused asymptotic growth bounds (Upper, Lower, Tight) with case analyses (Worst, Best, Average). Graphical diagrams and mathematical inequality constants were missing.',
      recommendedAction: 'Study formal asymptotic definitions and practice drawing graphs depicting bounding constants c and n0.',
      rubricBreakdown: [
        { criterion: 'Mathematical inequalities', maxMarks: 4, awardedMarks: 1.5, comment: 'Only Big-O stated partially' },
        { criterion: 'Graphical representations', maxMarks: 3, awardedMarks: 0.5, comment: 'Diagrams omitted' },
        { criterion: 'Explanation & Concept', maxMarks: 3, awardedMarks: 2, comment: 'Confused bounds with case scenarios' }
      ]
    },
    {
      questionId: 'q8',
      questionNumber: 8,
      questionText: 'Explain the working of Binary Search on a sorted array with worst-case recurrence relation.',
      maxMarks: 10,
      awardedMarks: 8,
      studentAnswerText: 'Binary Search requires a sorted array. Find mid = (low + high)/2. If key == arr[mid] return mid. If key < arr[mid] high = mid - 1. Else low = mid + 1. Recurrence: T(n) = T(n/2) + 1. Solving gives T(n) = O(log n). Worst case happens when element is not present or at the leaf level.',
      confidenceScore: 0.95,
      resultStatus: 'Good',
      errorType: 'None',
      missingConcepts: ['Integer overflow safe formula: mid = low + (high - low) / 2'],
      feedback: 'Very good solution with recurrence relation and asymptotic derivation. Consider using low + (high-low)/2 to prevent arithmetic overflow.',
      recommendedAction: 'Practice boundary analysis on binary search edge cases (empty array, single element).',
      rubricBreakdown: [
        { criterion: 'Precondition', maxMarks: 1, awardedMarks: 1, comment: 'Sorted array mentioned' },
        { criterion: 'Algorithm & mid update', maxMarks: 4, awardedMarks: 3.5, comment: 'Clean algorithm' },
        { criterion: 'Recurrence relation', maxMarks: 3, awardedMarks: 2.5, comment: 'T(n)=T(n/2)+1 correct' },
        { criterion: 'Master theorem derivation', maxMarks: 2, awardedMarks: 1, comment: 'Correct O(log n)' }
      ]
    },
    {
      questionId: 'q9',
      questionNumber: 9,
      questionText: 'What is a Hash Collision? Explain Linear Probing and Chaining methods of collision resolution.',
      maxMarks: 10,
      awardedMarks: 7,
      studentAnswerText: 'Collision happens when two keys hash to the same table slot: h(k1) == h(k2). Linear Probing checks the next slot h(k)+1, h(k)+2 until an empty slot is found. Chaining creates a linked list at each array bucket so colliding keys are appended in the list.',
      confidenceScore: 0.91,
      resultStatus: 'Good',
      errorType: 'Careless',
      missingConcepts: ['Primary clustering phenomenon in linear probing', 'Load factor formula alpha = n/m'],
      feedback: 'Good fundamental understanding of both open addressing and closed addressing. Did not mention primary clustering drawbacks in linear probing.',
      recommendedAction: 'Study load factor thresholds and clustering degradation in hash tables.',
      rubricBreakdown: [
        { criterion: 'Collision definition', maxMarks: 2, awardedMarks: 2, comment: 'Accurate' },
        { criterion: 'Linear probing logic', maxMarks: 4, awardedMarks: 2.5, comment: 'Good, missed clustering detail' },
        { criterion: 'Chaining explanation', maxMarks: 4, awardedMarks: 2.5, comment: 'Linked list chaining correct' }
      ]
    },
    {
      questionId: 'q10',
      questionNumber: 10,
      questionText: 'Explain Breadth First Search (BFS) graph traversal with queue state at each step.',
      maxMarks: 10,
      awardedMarks: 8,
      studentAnswerText: 'BFS visits graph level by level. It uses a FIFO Queue and a visited array. Start from node S, mark visited, push to queue. While queue not empty, pop node U, print it, and push all unvisited neighbors of U to queue marking them visited. Time complexity is O(V + E).',
      confidenceScore: 0.97,
      resultStatus: 'Good',
      errorType: 'None',
      missingConcepts: ['Explicit trace table on an example graph diagram'],
      feedback: 'Accurate algorithm and time complexity. Adding a small trace table on a 4-node graph would secure full marks.',
      recommendedAction: 'Practice tracing BFS on disconnected components and bipartite graphs.',
      rubricBreakdown: [
        { criterion: 'Data Structures used', maxMarks: 3, awardedMarks: 3, comment: 'Queue & visited array correctly identified' },
        { criterion: 'Algorithm steps', maxMarks: 4, awardedMarks: 3.5, comment: 'Correct logic' },
        { criterion: 'Trace demonstration', maxMarks: 2, awardedMarks: 0.5, comment: 'No diagram traced' },
        { criterion: 'Complexity', maxMarks: 1, awardedMarks: 1, comment: 'O(V+E) correct' }
      ]
    }
  ],
  mistakeBreakdown: [
    {
      type: 'Conceptual',
      count: 2,
      description: 'Difficulty in understanding underlying theoretical pointer invariants and asymptotic definition bounds rather than superficial errors.',
      affectedTopics: ['Doubly Linked Lists', 'Asymptotic Analysis Notations']
    },
    {
      type: 'Calculation',
      count: 1,
      description: 'Errors during mathematical recurrence derivation or auxiliary space computation.',
      affectedTopics: ['Recursion Call Tree Space Complexity']
    },
    {
      type: 'Careless',
      count: 2,
      description: 'Omission of secondary conditions such as operator associativity rules or primary clustering descriptions.',
      affectedTopics: ['Infix to Postfix Operator Precedence', 'Hash Collisions']
    },
    {
      type: 'Incomplete',
      count: 1,
      description: 'Answer terminated early without graphs, inequalities, or full boundary condition handling.',
      affectedTopics: ['Big-O / Big-Omega / Big-Theta Formal Graphs']
    },
    {
      type: 'None',
      count: 4,
      description: 'Accurate conceptual execution with correct logic and calculations.',
      affectedTopics: ['Tree Traversals', 'Binary Search', 'BFS Graph Traversal', 'Stack Operations']
    }
  ],
  conceptMastery: [
    { concept: 'Stack Operations', mastery: 92, status: 'Strong', totalQuestions: 2, questionsAttempted: 2 },
    { concept: 'Queue Implementation', mastery: 87, status: 'Strong', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Tree Traversals', mastery: 81, status: 'Good', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Graph Traversal (BFS)', mastery: 80, status: 'Good', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Binary Search', mastery: 80, status: 'Good', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Hashing & Collisions', mastery: 70, status: 'Good', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Linked Lists (DLL)', mastery: 59, status: 'Needs Improvement', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Time Complexity (Bounds)', mastery: 52, status: 'Weak', totalQuestions: 1, questionsAttempted: 1 },
    { concept: 'Recursion Call Tracing', mastery: 48, status: 'Weak', totalQuestions: 1, questionsAttempted: 1 }
  ],
  learningPath: [
    {
      priority: 1,
      topic: 'Recursion & Call Stack Modeling',
      reason: 'Your recent answers indicate difficulty in calculating auxiliary space and tracing recursive tree depth.',
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
      topic: 'Doubly Linked List Operations & Edge Cases',
      reason: 'Pointer synchronizations in deletion and head/tail boundary updates were incomplete.',
      recommendations: [
        'Review doubly linked list insertion and deletion invariants',
        'Practice drawing 4-step pointer re-assignment diagrams before coding',
        'Implement singly and doubly linked lists with null-check safety assertions'
      ],
      difficulty: 'Intermediate',
      estimatedHours: '2.5 hours',
      practiceResources: ['Lab 2: Dynamic Node Linking', 'Visualizer: DLL Pointer Mutator']
    },
    {
      priority: 3,
      topic: 'Asymptotic Analysis & Formal Mathematical Bounds',
      reason: 'Confused asymptotic bounding notations (Upper/Lower/Tight) with execution cases (Worst/Best/Average).',
      recommendations: [
        'Study mathematical definitions of c, n0, and limit comparisons',
        'Practice plotting f(n) vs c*g(n) on Cartesian graphs',
        'Differentiate between case analysis (Best/Worst) and asymptotic notation (O, Ω, Θ)'
      ],
      difficulty: 'Intermediate',
      estimatedHours: '2 hours',
      practiceResources: ['Chapter 1: Growth of Functions', 'Worksheet 1: Asymptotic Bounds']
    }
  ]
};

export const sampleUploadedSheets: AnswerSheetFile[] = [
  {
    id: 'sheet-001',
    fileName: 'kaviya_k_23CS0101_IA1.pdf',
    fileSize: '3.4 MB',
    fileType: 'application/pdf',
    uploadedAt: '2026-07-28 10:14 AM',
    status: 'Evaluated',
    progress: 100,
    studentName: 'KAVIYA K',
    rollNumber: '23CS0101',
    examId: 'exam-ds-ia1',
    evaluationResultId: 'eval-kaviya-ds-ia1'
  },
  {
    id: 'sheet-002',
    fileName: 'kevin_jose_23CS0104_IA1.pdf',
    fileSize: '2.8 MB',
    fileType: 'application/pdf',
    uploadedAt: '2026-07-28 10:16 AM',
    status: 'Evaluated',
    progress: 100,
    studentName: 'KEVIN CHRISTIAN JOSE',
    rollNumber: '23CS0104',
    examId: 'exam-ds-ia1'
  },
  {
    id: 'sheet-003',
    fileName: 'krishnapriya_s_23CS0114_IA1.jpg',
    fileSize: '4.1 MB',
    fileType: 'image/jpeg',
    uploadedAt: '2026-07-28 10:18 AM',
    status: 'Evaluated',
    progress: 100,
    studentName: 'KRISHNAPRIYA S',
    rollNumber: '23CS0114',
    examId: 'exam-ds-ia1'
  },
  {
    id: 'sheet-004',
    fileName: 'mohammed_fariz_23CS0130_IA1.png',
    fileSize: '3.9 MB',
    fileType: 'image/png',
    uploadedAt: '2026-07-28 10:21 AM',
    status: 'Evaluated',
    progress: 100,
    studentName: 'MOHAMMED FARIZ.F',
    rollNumber: '23CS0130',
    examId: 'exam-ds-ia1'
  },
  {
    id: 'sheet-005',
    fileName: 'nandhini_n_23CS0141_IA1.pdf',
    fileSize: '3.2 MB',
    fileType: 'application/pdf',
    uploadedAt: '2026-07-28 10:25 AM',
    status: 'Evaluated',
    progress: 100,
    studentName: 'NANDHINI N',
    rollNumber: '23CS0141',
    examId: 'exam-ds-ia1'
  },
  {
    id: 'sheet-006',
    fileName: 'naveen_kumar_23CS0150_IA1.pdf',
    fileSize: '3.1 MB',
    fileType: 'application/pdf',
    uploadedAt: '2026-07-28 10:28 AM',
    status: 'Evaluated',
    progress: 100,
    studentName: 'NAVEEN KUMAR.P',
    rollNumber: '23CS0150',
    examId: 'exam-ds-ia1'
  }
];

export const classPerformanceTrendData = [
  { testName: 'Test 1 (Foundations)', average: 64, target: 70, highest: 88, lowest: 35 },
  { testName: 'Test 2 (Linear DS)', average: 68, target: 72, highest: 92, lowest: 38 },
  { testName: 'Test 3 (Trees & Graphs)', average: 71, target: 75, highest: 95, lowest: 40 },
  { testName: 'Test 4 (Mid-Term Assessment)', average: 76, target: 75, highest: 98, lowest: 42 }
];

export const conceptMasteryClassData = [
  { concept: 'Data Structures', mastery: 82, benchmark: 75, category: 'Core' },
  { concept: 'Algorithms', mastery: 74, benchmark: 70, category: 'Core' },
  { concept: 'Database Concepts', mastery: 68, benchmark: 65, category: 'Applications' },
  { concept: 'Computer Networks', mastery: 61, benchmark: 65, category: 'Systems' },
  { concept: 'Operating Systems', mastery: 57, benchmark: 65, category: 'Systems' }
];

export const scoreDistributionData = [
  { range: '0 - 40% (Fail)', count: 3, percentage: 9 },
  { range: '41 - 60% (Pass)', count: 7, percentage: 22 },
  { range: '61 - 75% (Good)', count: 11, percentage: 34 },
  { range: '76 - 89% (Very Good)', count: 8, percentage: 25 },
  { range: '90 - 100% (Distinction)', count: 3, percentage: 10 }
];

export const commonMistakesDistribution = [
  { name: 'Conceptual Errors', value: 42, color: '#2563eb', description: 'Gaps in theoretical foundations & invariants' },
  { name: 'Calculation & Tracing', value: 24, color: '#f59e0b', description: 'Errors in arithmetic, indices & recursion' },
  { name: 'Careless Omissions', value: 18, color: '#64748b', description: 'Missed minor constraints or boundary keywords' },
  { name: 'Incomplete Responses', value: 16, color: '#ef4444', description: 'Time-out or missing diagrams / proof steps' }
];
