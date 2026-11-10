import { CalculationResult, StudentInfo, SubjectItem } from '../types/academic';

/**
 * Calculates current semester SGPA and updated cumulative CGPA
 */
export function calculateAcademicMetrics(
  student: StudentInfo,
  subjects: SubjectItem[],
  percentageFormula: 'vtu' | 'aicte' | 'direct' = 'vtu'
): CalculationResult {
  const currentCredits = subjects.reduce((sum, s) => sum + (Number(s.credits) || 0), 0);
  
  // Credits earned only count non-failing subjects (gradePoints > 0)
  const currentCreditsEarned = subjects.reduce((sum, s) => {
    return sum + (s.gradePoints > 0 ? (Number(s.credits) || 0) : 0);
  }, 0);

  const currentCreditPoints = subjects.reduce((sum, s) => {
    const cred = Number(s.credits) || 0;
    const pts = Number(s.gradePoints) || 0;
    return sum + cred * pts;
  }, 0);

  const sgpa = currentCredits > 0 ? currentCreditPoints / currentCredits : 0;
  const hasArrears = subjects.some((s) => s.grade === 'F' || s.gradePoints === 0);

  const prevCreditsNum = student.isFirstSemester ? 0 : Number(student.previousCredits) || 0;
  const prevCgpaNum = student.isFirstSemester ? 0 : Number(student.previousCgpa) || 0;

  let totalCredits = 0;
  let totalCreditsEarned = 0;
  let totalCreditPoints = 0;
  let cgpa = 0;

  if (student.isFirstSemester || prevCreditsNum === 0) {
    totalCredits = currentCredits;
    totalCreditsEarned = currentCreditsEarned;
    totalCreditPoints = currentCreditPoints;
    cgpa = sgpa;
  } else {
    const prevPoints = prevCgpaNum * prevCreditsNum;
    totalCredits = prevCreditsNum + currentCredits;
    totalCreditsEarned = prevCreditsNum + currentCreditsEarned;
    totalCreditPoints = prevPoints + currentCreditPoints;
    cgpa = totalCredits > 0 ? totalCreditPoints / totalCredits : 0;
  }

  // Calculate equivalent percentage
  let percentage = 0;
  if (cgpa > 0) {
    if (percentageFormula === 'vtu') {
      // VTU / Standard Indian engineering: (CGPA - 0.75) * 10
      percentage = Math.max(0, Math.min(100, (cgpa - 0.75) * 10));
    } else if (percentageFormula === 'aicte') {
      // AICTE: CGPA * 9.5
      percentage = Math.max(0, Math.min(100, cgpa * 9.5));
    } else {
      // Direct 10x
      percentage = Math.max(0, Math.min(100, cgpa * 10));
    }
  }

  // Determine Academic Standing / Division
  let academicStanding = 'Pass Class';
  if (hasArrears) {
    academicStanding = 'Provisional (Contains Arrear/Backlog)';
  } else if (cgpa >= 7.75) {
    academicStanding = 'First Class with Distinction (Exemplary)';
  } else if (cgpa >= 6.75) {
    academicStanding = 'First Class';
  } else if (cgpa >= 5.75) {
    academicStanding = 'Second Class';
  } else if (cgpa >= 4.0) {
    academicStanding = 'Pass Class';
  } else if (cgpa > 0) {
    academicStanding = 'Unsatisfactory';
  } else {
    academicStanding = 'Incomplete';
  }

  return {
    currentCredits,
    currentCreditsEarned,
    currentCreditPoints,
    sgpa: Number(sgpa.toFixed(2)),
    totalCredits,
    totalCreditsEarned,
    totalCreditPoints: Number(totalCreditPoints.toFixed(2)),
    cgpa: Number(cgpa.toFixed(2)),
    percentage: Number(percentage.toFixed(1)),
    academicStanding,
    hasArrears,
  };
}

/**
 * Generate a unique verification code for the academic certificate
 */
export function generateCertificateId(usn: string = ''): string {
  const cleanUsn = usn.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6) || 'STUD';
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `ACAD-${year}-${cleanUsn}-${randomSuffix}`;
}

/**
 * Formats date into standard academic certificate format
 */
export function formatCertificateDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
