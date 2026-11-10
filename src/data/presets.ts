import { GradeDefinition, GradeScaleType, StudentInfo, SubjectItem } from '../types/academic';

export const GRADE_SCALES: Record<GradeScaleType, GradeDefinition[]> = {
  '10-point': [
    { grade: 'O', points: 10, description: 'Outstanding (90% - 100%)', minPercentage: 90 },
    { grade: 'A+', points: 9, description: 'Excellent (80% - 89%)', minPercentage: 80 },
    { grade: 'A', points: 8, description: 'Very Good (70% - 79%)', minPercentage: 70 },
    { grade: 'B+', points: 7, description: 'Good (60% - 69%)', minPercentage: 60 },
    { grade: 'B', points: 6, description: 'Above Average (55% - 59%)', minPercentage: 55 },
    { grade: 'C', points: 5, description: 'Average (50% - 54%)', minPercentage: 50 },
    { grade: 'P', points: 4, description: 'Pass (40% - 49%)', minPercentage: 40 },
    { grade: 'F', points: 0, description: 'Fail / Arrear (< 40%)', minPercentage: 0 },
  ],
  '4-point': [
    { grade: 'A', points: 4.0, description: 'Superior (93% - 100%)' },
    { grade: 'A-', points: 3.7, description: 'Excellent (90% - 92%)' },
    { grade: 'B+', points: 3.3, description: 'Very Good (87% - 89%)' },
    { grade: 'B', points: 3.0, description: 'Good (83% - 86%)' },
    { grade: 'B-', points: 2.7, description: 'Above Average (80% - 82%)' },
    { grade: 'C+', points: 2.3, description: 'Average (77% - 79%)' },
    { grade: 'C', points: 2.0, description: 'Below Average (70% - 76%)' },
    { grade: 'D', points: 1.0, description: 'Minimum Pass (60% - 69%)' },
    { grade: 'F', points: 0.0, description: 'Failing (< 60%)' },
  ],
};

export const SAMPLE_STUDENT: StudentInfo = {
  studentName: 'Aarav M. Sharma',
  usn: '1MS21CS084',
  institution: 'Visvesvaraya Technological University (VTU)',
  degree: 'Bachelor of Technology (B.Tech)',
  department: 'Computer Science & Engineering',
  semester: '5th Semester',
  academicYear: '2025 - 2026',
  previousCgpa: 8.46,
  previousCredits: 82,
  isFirstSemester: false,
};

export const SAMPLE_SUBJECTS: SubjectItem[] = [
  {
    id: 'sub-1',
    code: '21CS51',
    name: 'Management, Entrepreneurship & IPR',
    credits: 3,
    grade: 'A',
    gradePoints: 8,
  },
  {
    id: 'sub-2',
    code: '21CS52',
    name: 'Computer Networks',
    credits: 4,
    grade: 'A+',
    gradePoints: 9,
  },
  {
    id: 'sub-3',
    code: '21CS53',
    name: 'Database Management Systems',
    credits: 4,
    grade: 'O',
    gradePoints: 10,
  },
  {
    id: 'sub-4',
    code: '21CS54',
    name: 'Theory of Computation',
    credits: 3,
    grade: 'A',
    gradePoints: 8,
  },
  {
    id: 'sub-5',
    code: '21CSL55',
    name: 'Database Management Systems Laboratory',
    credits: 1,
    grade: 'O',
    gradePoints: 10,
  },
  {
    id: 'sub-6',
    code: '21CSL56',
    name: 'Web Technology Laboratory',
    credits: 1,
    grade: 'O',
    gradePoints: 10,
  },
  {
    id: 'sub-7',
    code: '21CIV57',
    name: 'Environmental Studies & Professional Ethics',
    credits: 1,
    grade: 'A+',
    gradePoints: 9,
  },
  {
    id: 'sub-8',
    code: '21CSMP58',
    name: 'Mini Project in Cloud Computing',
    credits: 2,
    grade: 'O',
    gradePoints: 10,
  },
];

export const BRANCH_PRESETS = [
  {
    name: 'Computer Science (Sem 5)',
    department: 'Computer Science & Engineering',
    subjects: [
      { code: 'CS501', name: 'Computer Networks & Protocols', credits: 4, defaultGrade: 'A+' },
      { code: 'CS502', name: 'Database Management Systems', credits: 4, defaultGrade: 'O' },
      { code: 'CS503', name: 'Theory of Computation', credits: 3, defaultGrade: 'A' },
      { code: 'CS504', name: 'Design & Analysis of Algorithms', credits: 3, defaultGrade: 'A' },
      { code: 'CS505L', name: 'DBMS & Network Laboratory', credits: 2, defaultGrade: 'O' },
      { code: 'CS506P', name: 'Full Stack Mini Project', credits: 2, defaultGrade: 'O' },
      { code: 'HU507', name: 'Professional Ethics & Cyber Law', credits: 1, defaultGrade: 'A+' },
    ],
  },
  {
    name: 'AI & Data Science (Sem 4)',
    department: 'Artificial Intelligence & Data Science',
    subjects: [
      { code: 'AI401', name: 'Machine Learning Foundations', credits: 4, defaultGrade: 'O' },
      { code: 'AI402', name: 'Mathematical Statistics & Probability', credits: 4, defaultGrade: 'A+' },
      { code: 'AI403', name: 'Operating Systems Architecture', credits: 3, defaultGrade: 'A' },
      { code: 'AI404', name: 'Big Data Processing with PySpark', credits: 3, defaultGrade: 'A+' },
      { code: 'AI405L', name: 'Data Engineering & ML Lab', credits: 2, defaultGrade: 'O' },
      { code: 'AI406P', name: 'Exploratory Data Analysis Project', credits: 2, defaultGrade: 'O' },
    ],
  },
  {
    name: 'Electronics & Communication (Sem 4)',
    department: 'Electronics & Communication Engineering',
    subjects: [
      { code: 'EC401', name: 'Analog Circuits & Applications', credits: 4, defaultGrade: 'A+' },
      { code: 'EC402', name: 'Microcontroller & Embedded Systems', credits: 4, defaultGrade: 'A' },
      { code: 'EC403', name: 'Signals & Systems', credits: 3, defaultGrade: 'B+' },
      { code: 'EC404', name: 'Electromagnetic Field Theory', credits: 3, defaultGrade: 'A' },
      { code: 'EC405L', name: 'Embedded Systems Lab', credits: 2, defaultGrade: 'O' },
      { code: 'EC406L', name: 'Simulation Lab', credits: 2, defaultGrade: 'A+' },
    ],
  },
  {
    name: 'First Year (Sem 1 Foundation)',
    department: 'General Engineering',
    subjects: [
      { code: 'MA101', name: 'Engineering Mathematics I', credits: 4, defaultGrade: 'A+' },
      { code: 'PH102', name: 'Engineering Physics', credits: 4, defaultGrade: 'A' },
      { code: 'CS103', name: 'Problem Solving & C Programming', credits: 3, defaultGrade: 'O' },
      { code: 'ME104', name: 'Basic Mechanical Engineering', credits: 3, defaultGrade: 'B+' },
      { code: 'PH105L', name: 'Physics Laboratory', credits: 1, defaultGrade: 'O' },
      { code: 'CS106L', name: 'Computer Programming Laboratory', credits: 1, defaultGrade: 'O' },
      { code: 'EN107', name: 'Technical English Communication', credits: 2, defaultGrade: 'A+' },
    ],
  },
];
