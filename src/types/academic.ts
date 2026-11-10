export type GradeScaleType = '10-point' | '4-point';

export interface GradeDefinition {
  grade: string;
  points: number;
  description: string;
  minPercentage?: number;
}

export interface SubjectItem {
  id: string;
  code: string;
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
}

export interface StudentInfo {
  studentName: string;
  usn: string; // University Seat Number / Roll No
  institution: string;
  degree: string;
  department: string;
  semester: string;
  academicYear: string;
  previousCgpa: number | '';
  previousCredits: number | '';
  isFirstSemester: boolean;
}

export interface CalculationResult {
  currentCredits: number;
  currentCreditsEarned: number;
  currentCreditPoints: number;
  sgpa: number;
  totalCredits: number;
  totalCreditsEarned: number;
  totalCreditPoints: number;
  cgpa: number;
  percentage: number;
  academicStanding: string;
  hasArrears: boolean;
}

export type CertificateTheme = 'royal-gold' | 'crimson-ivy' | 'emerald-classic' | 'modern-slate';

export interface SavedCertificate {
  id: string;
  savedAt: string;
  studentInfo: StudentInfo;
  subjects: SubjectItem[];
  result: CalculationResult;
  theme: CertificateTheme;
  certificateNumber: string;
}
