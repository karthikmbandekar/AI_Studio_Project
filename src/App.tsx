/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { StudentInfoForm } from './components/StudentInfoForm';
import { SubjectManager } from './components/SubjectManager';
import { CalculationSummary } from './components/CalculationSummary';
import { CertificateView } from './components/CertificateView';
import { GradingScaleModal } from './components/GradingScaleModal';
import { SavedCertificatesModal } from './components/SavedCertificatesModal';
import {
  StudentInfo,
  SubjectItem,
  GradeScaleType,
  CertificateTheme,
  SavedCertificate,
} from './types/academic';
import {
  SAMPLE_STUDENT,
  SAMPLE_SUBJECTS,
  BRANCH_PRESETS,
  GRADE_SCALES,
} from './data/presets';
import {
  calculateAcademicMetrics,
  generateCertificateId,
} from './utils/calculator';
import {
  Award,
  Sparkles,
  FileCheck2,
  BookmarkCheck,
  HelpCircle,
  BookOpen,
  GraduationCap,
  ChevronRight,
  Printer,
} from 'lucide-react';

const STORAGE_KEY = 'gradify_academic_certificates_v1';

export default function App() {
  // Student & Academic State
  const [student, setStudent] = useState<StudentInfo>(SAMPLE_STUDENT);
  const [subjects, setSubjects] = useState<SubjectItem[]>(SAMPLE_SUBJECTS);
  const [gradeScale, setGradeScale] = useState<GradeScaleType>('10-point');
  const [percentageFormula, setPercentageFormula] = useState<'vtu' | 'aicte' | 'direct'>('vtu');
  
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<'calculator' | 'certificate' | 'history'>('calculator');
  const [certificateId, setCertificateId] = useState<string>(() =>
    generateCertificateId(SAMPLE_STUDENT.usn)
  );
  
  // Modals
  const [isGradeScaleModalOpen, setIsGradeScaleModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Local Storage for Saved Certificates
  const [savedCertificates, setSavedCertificates] = useState<SavedCertificate[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Keep certificate ID in sync with USN if changed
  useEffect(() => {
    if (student.usn) {
      setCertificateId((prev) => {
        if (!prev.includes(student.usn.slice(0, 4).toUpperCase())) {
          return generateCertificateId(student.usn);
        }
        return prev;
      });
    }
  }, [student.usn]);

  // Save to localStorage whenever savedCertificates changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCertificates));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [savedCertificates]);

  // Real-time calculation of SGPA and CGPA
  const calculationResult = useMemo(() => {
    return calculateAcademicMetrics(student, subjects, percentageFormula);
  }, [student, subjects, percentageFormula]);

  // Handlers for Student Profile
  const handleStudentChange = (field: keyof StudentInfo, value: any) => {
    setStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLoadSample = () => {
    setStudent(SAMPLE_STUDENT);
    setSubjects(SAMPLE_SUBJECTS);
    setCertificateId(generateCertificateId(SAMPLE_STUDENT.usn));
  };

  const handleClearStudent = () => {
    setStudent({
      studentName: '',
      usn: '',
      institution: '',
      degree: 'Bachelor of Technology (B.Tech)',
      department: '',
      semester: '1st Semester',
      academicYear: '2025 - 2026',
      previousCgpa: '',
      previousCredits: '',
      isFirstSemester: false,
    });
  };

  // Handlers for Subjects
  const handleAddSubject = () => {
    const defaultScale = GRADE_SCALES[gradeScale];
    const newSub: SubjectItem = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      code: '',
      name: '',
      credits: 3,
      grade: defaultScale[0]?.grade || 'O',
      gradePoints: defaultScale[0]?.points || 10,
    };
    setSubjects((prev) => [...prev, newSub]);
  };

  const handleUpdateSubject = (id: string, field: keyof SubjectItem, value: any) => {
    setSubjects((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, [field]: value } : sub))
    );
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects((prev) => prev.filter((sub) => sub.id !== id));
  };

  const handleLoadBranchPreset = (presetIndex: number) => {
    const preset = BRANCH_PRESETS[presetIndex];
    if (!preset) return;

    const defaultScale = GRADE_SCALES[gradeScale];

    const newSubjects: SubjectItem[] = preset.subjects.map((item, index) => {
      const match = defaultScale.find((g) => g.grade === item.defaultGrade);
      return {
        id: `preset-${Date.now()}-${index}`,
        code: item.code,
        name: item.name,
        credits: item.credits,
        grade: match ? match.grade : defaultScale[0].grade,
        gradePoints: match ? match.points : defaultScale[0].points,
      };
    });

    setSubjects(newSubjects);
    if (preset.department) {
      handleStudentChange('department', preset.department);
    }
  };

  const handleClearSubjects = () => {
    setSubjects([]);
  };

  // Certificate Actions
  const handleSaveToHistory = (theme: CertificateTheme) => {
    const newEntry: SavedCertificate = {
      id: `cert-${Date.now()}`,
      savedAt: new Date().toISOString(),
      studentInfo: { ...student },
      subjects: [...subjects],
      result: { ...calculationResult },
      theme,
      certificateNumber: certificateId,
    };

    setSavedCertificates((prev) => [newEntry, ...prev]);
  };

  const handleLoadSavedCertificate = (cert: SavedCertificate) => {
    setStudent(cert.studentInfo);
    setSubjects(cert.subjects);
    setCertificateId(cert.certificateNumber || generateCertificateId(cert.studentInfo.usn));
    setActiveTab('certificate');
  };

  const handleDeleteSavedCertificate = (id: string) => {
    setSavedCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to delete all saved certificates?')) {
      setSavedCertificates([]);
    }
  };

  const handlePrintCertificate = () => {
    if (activeTab !== 'certificate') {
      setActiveTab('certificate');
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar Contract (3 zones) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGradeScale={() => setIsGradeScaleModalOpen(true)}
        onPrintCertificate={handlePrintCertificate}
        hasCalculated={subjects.length > 0}
      />

      {/* Main Body */}
      <main className="flex-1">
        {/* TAB 1: CALCULATOR & DATA ENTRY */}
        {activeTab === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Friendly Student Hero Banner */}
            <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-amber-200 text-xs font-semibold tracking-wide uppercase mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student CGPA & SGPA Engine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Calculate Semester SGPA & Updated Cumulative CGPA
                </h1>
                <p className="text-sm text-amber-100/90 mt-2 leading-relaxed">
                  Enter your previous cumulative academic record and current semester subject credits. Your SGPA and CGPA will calculate automatically and generate a formal, university-ready grade certificate!
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
                  <button
                    onClick={handleLoadSample}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold backdrop-blur-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Try With Sample Student</span>
                  </button>
                  <button
                    onClick={() => setIsGradeScaleModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-amber-100 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                    <span>Grading Formula Guide</span>
                  </button>
                </div>
              </div>

              {/* Quick Summary Pill / Highlight Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 min-w-[240px] text-center shrink-0">
                <span className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold block">
                  Current Live Results
                </span>
                <div className="flex items-center justify-center gap-6 mt-2">
                  <div>
                    <span className="text-xs text-amber-100/70 block">SGPA</span>
                    <span className="text-2xl font-black font-mono tracking-tight text-white">
                      {calculationResult.sgpa > 0 ? calculationResult.sgpa.toFixed(2) : '—'}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div>
                    <span className="text-xs text-amber-100/70 block">CGPA</span>
                    <span className="text-2xl font-black font-mono tracking-tight text-amber-300">
                      {calculationResult.cgpa > 0 ? calculationResult.cgpa.toFixed(2) : '—'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('certificate')}
                  className="w-full mt-4 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Open Certificate</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live Metrics Bar */}
            <CalculationSummary
              result={calculationResult}
              student={student}
              onViewCertificate={() => setActiveTab('certificate')}
              percentageFormula={percentageFormula}
              setPercentageFormula={setPercentageFormula}
            />

            {/* Student Profile & Academic Inputs */}
            <StudentInfoForm
              student={student}
              onChange={handleStudentChange}
              onLoadSample={handleLoadSample}
              onClear={handleClearStudent}
            />

            {/* Current Semester Subjects & Grade Manager */}
            <SubjectManager
              subjects={subjects}
              gradeScale={gradeScale}
              setGradeScale={setGradeScale}
              onAddSubject={handleAddSubject}
              onUpdateSubject={handleUpdateSubject}
              onRemoveSubject={handleRemoveSubject}
              onLoadBranchPreset={handleLoadBranchPreset}
              onClearSubjects={handleClearSubjects}
            />
          </div>
        )}

        {/* TAB 2: CERTIFICATE VIEW */}
        {activeTab === 'certificate' && (
          <CertificateView
            student={student}
            subjects={subjects}
            result={calculationResult}
            certificateId={certificateId}
            onBackToCalculator={() => setActiveTab('calculator')}
            onSaveToHistory={handleSaveToHistory}
          />
        )}

        {/* TAB 3: SAVED CERTIFICATES RECORD */}
        {activeTab === 'history' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Archived Academic Certificates</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your saved calculations and generated provisional grade certificates
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Back to Calculator
                </button>
              </div>

              {savedCertificates.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <BookmarkCheck className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <h3 className="text-base font-bold text-slate-700">No Certificates Saved</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                    Calculate your semester GPA, click "Save Record" on the certificate preview, and it will be stored here permanently for future reference.
                  </p>
                  <button
                    onClick={() => setActiveTab('certificate')}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Current Certificate</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedCertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/60 hover:bg-white transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-slate-900">
                            {cert.studentInfo.studentName || 'Student'}
                          </span>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                            {cert.studentInfo.usn || 'N/A'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                          <span>{cert.studentInfo.institution || 'University'}</span>
                          <span>·</span>
                          <span>{cert.studentInfo.department}</span>
                          <span>·</span>
                          <span>{cert.studentInfo.semester}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2.5 text-xs font-medium text-slate-700">
                          <span>
                            SGPA: <strong className="text-slate-900 font-mono">{cert.result.sgpa}</strong>
                          </span>
                          <span>
                            CGPA: <strong className="text-amber-800 font-mono">{cert.result.cgpa}</strong>
                          </span>
                          <span>
                            Total Credits: <strong className="text-slate-900 font-mono">{cert.result.totalCreditsEarned}</strong>
                          </span>
                          <span className="text-emerald-700 font-semibold">{cert.result.academicStanding}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleLoadSavedCertificate(cert)}
                          className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View & Print</span>
                        </button>
                        <button
                          onClick={() => handleDeleteSavedCertificate(cert.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 flex justify-between items-center text-xs text-slate-500">
                    <span>{savedCertificates.length} saved certificate(s)</span>
                    <button
                      onClick={handleClearAllHistory}
                      className="text-rose-600 hover:text-rose-700 font-medium hover:underline cursor-pointer"
                    >
                      Clear All Saved Records
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="font-semibold text-slate-800">Gradify Academic Certificate Engine</span>
            <span>·</span>
            <span>Official SGPA & CGPA Computation System</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setIsGradeScaleModalOpen(true)}
              className="hover:text-slate-800 hover:underline cursor-pointer"
            >
              Grading Scales
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className="hover:text-slate-800 hover:underline cursor-pointer"
            >
              Certificate Preview
            </button>
            <span>Standard UGC & AICTE Compliant</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GradingScaleModal
        isOpen={isGradeScaleModalOpen}
        onClose={() => setIsGradeScaleModalOpen(false)}
      />

      <SavedCertificatesModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        savedList={savedCertificates}
        onLoadCertificate={handleLoadSavedCertificate}
        onDeleteCertificate={handleDeleteSavedCertificate}
        onClearAll={handleClearAllHistory}
      />
    </div>
  );
}
