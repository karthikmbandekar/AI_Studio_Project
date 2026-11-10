import React, { useState } from 'react';
import { CalculationResult, CertificateTheme, StudentInfo, SubjectItem } from '../types/academic';
import { Printer, Download, ArrowLeft, BookmarkCheck, Share2, Check, ShieldCheck, QrCode } from 'lucide-react';
import { formatCertificateDate } from '../utils/calculator';

interface CertificateViewProps {
  student: StudentInfo;
  subjects: SubjectItem[];
  result: CalculationResult;
  certificateId: string;
  onBackToCalculator: () => void;
  onSaveToHistory: (theme: CertificateTheme) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  student,
  subjects,
  result,
  certificateId,
  onBackToCalculator,
  onSaveToHistory,
}) => {
  const [theme, setTheme] = useState<CertificateTheme>('royal-gold');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentDate = formatCertificateDate(new Date());

  const handlePrint = () => {
    window.print();
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(certificateId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveToHistory(theme);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Theme-based styling variables
  const themeStyles = {
    'royal-gold': {
      outerBorder: 'border-amber-600/60',
      innerBorder: 'border-amber-500/40',
      headerText: 'text-slate-900',
      accentColor: 'text-amber-800',
      accentBg: 'bg-amber-50',
      tableHeaderBg: 'bg-slate-900 text-white',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      containerBg: 'bg-[#FCFCFA]',
    },
    'crimson-ivy': {
      outerBorder: 'border-rose-900/60',
      innerBorder: 'border-amber-600/40',
      headerText: 'text-rose-950',
      accentColor: 'text-rose-900',
      accentBg: 'bg-rose-50',
      tableHeaderBg: 'bg-rose-950 text-white',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
      containerBg: 'bg-[#FFFDFB]',
    },
    'emerald-classic': {
      outerBorder: 'border-emerald-800/60',
      innerBorder: 'border-emerald-600/40',
      headerText: 'text-emerald-950',
      accentColor: 'text-emerald-800',
      accentBg: 'bg-emerald-50',
      tableHeaderBg: 'bg-emerald-950 text-white',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      containerBg: 'bg-[#FAFDFB]',
    },
    'modern-slate': {
      outerBorder: 'border-slate-800/60',
      innerBorder: 'border-slate-400/40',
      headerText: 'text-slate-900',
      accentColor: 'text-slate-800',
      accentBg: 'bg-slate-100',
      tableHeaderBg: 'bg-slate-900 text-white',
      badgeBg: 'bg-slate-200 text-slate-900 border-slate-400',
      containerBg: 'bg-white',
    },
  }[theme];

  return (
    <div className="py-6 max-w-5xl mx-auto px-2 sm:px-4">
      {/* Top Controls Toolbar (Hidden when printing) */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={onBackToCalculator}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Data</span>
          </button>

          {/* Theme Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <span className="text-[11px] font-medium text-slate-500 px-2">Theme:</span>
            <button
              onClick={() => setTheme('royal-gold')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                theme === 'royal-gold' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Royal Gold
            </button>
            <button
              onClick={() => setTheme('crimson-ivy')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                theme === 'crimson-ivy' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Crimson
            </button>
            <button
              onClick={() => setTheme('emerald-classic')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                theme === 'emerald-classic' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Emerald
            </button>
            <button
              onClick={() => setTheme('modern-slate')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                theme === 'modern-slate' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Monochrome
            </button>
          </div>
        </div>

        {/* Certificate Export Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleCopyId}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Copy unique certificate verification ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied ID' : 'Copy ID'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
          >
            {savedSuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-700" />
            )}
            <span>{savedSuccess ? 'Saved' : 'Save Record'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* THE OFFICIAL CERTIFICATE / GRADE CARD DOCUMENT */}
      <div
        id="certificate-print-area"
        className={`certificate-print-container relative ${themeStyles.containerBg} text-slate-900 p-6 sm:p-10 border-8 ${themeStyles.outerBorder} rounded-xl shadow-xl transition-all`}
      >
        {/* Inner Ornamental Double Frame */}
        <div className={`border-2 ${themeStyles.innerBorder} p-5 sm:p-7 relative overflow-hidden`}>
          
          {/* Subtle Watermark in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
            <img
              src="/src/assets/images/academic_gold_crest_1791969566443.jpg"
              alt="Seal Watermark"
              className="w-96 h-96 object-contain"
            />
          </div>

          {/* Top Corner Flourishes */}
          <div className="absolute top-2 left-2 text-amber-700/60 font-cinzel text-xs select-none">✦</div>
          <div className="absolute top-2 right-2 text-amber-700/60 font-cinzel text-xs select-none">✦</div>
          <div className="absolute bottom-2 left-2 text-amber-700/60 font-cinzel text-xs select-none">✦</div>
          <div className="absolute bottom-2 right-2 text-amber-700/60 font-cinzel text-xs select-none">✦</div>

          {/* 1. Header with University Crest and Official Titles */}
          <div className="text-center relative z-10 pb-5 border-b border-slate-200">
            <div className="flex justify-center mb-3">
              <img
                src="/src/assets/images/academic_gold_crest_1791969566443.jpg"
                alt="University Seal Emblem"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-sm rounded-full"
              />
            </div>

            <h1 className="text-lg sm:text-2xl font-cinzel font-bold tracking-widest text-slate-900 uppercase">
              {student.institution || 'ACADEMIC INSTITUTION OF TECHNOLOGY'}
            </h1>
            
            <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-amber-800 mt-1 font-cinzel">
              OFFICE OF THE REGISTRAR & BOARD OF EXAMINATIONS
            </p>

            <div className="my-3 inline-block">
              <h2 className="text-base sm:text-xl font-cinzel font-extrabold uppercase px-6 py-1 tracking-wider border-y-2 border-amber-600/50 text-slate-900">
                PROVISIONAL GRADE CARD & PERFORMANCE CERTIFICATE
              </h2>
            </div>

            <p className="text-xs text-slate-500 italic">
              Formal Statement of Semester Grade Point Average (SGPA) & Cumulative Grade Point Average (CGPA)
            </p>
          </div>

          {/* 2. Formal Student Preamble & Credentials */}
          <div className="py-5 text-center relative z-10">
            <p className="text-xs font-serif-academic italic text-slate-600 text-base">
              This is to formally certify that
            </p>

            <div className="text-xl sm:text-3xl font-cinzel font-bold text-slate-900 my-1 tracking-wide">
              {student.studentName || 'STUDENT NAME'}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-slate-700 font-medium mt-2">
              <div>
                <span className="text-slate-500">University Seat Number (USN): </span>
                <span className="font-mono font-bold text-slate-900">{student.usn || 'N/A'}</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <div>
                <span className="text-slate-500">Degree: </span>
                <span className="font-semibold text-slate-900">{student.degree || 'Bachelor of Technology'}</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <div>
                <span className="text-slate-500">Branch: </span>
                <span className="font-semibold text-slate-900">{student.department || 'Engineering'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              has completed the curriculum requirements for{' '}
              <span className="font-bold text-slate-900">{student.semester}</span> in the Academic Session{' '}
              <span className="font-bold text-slate-900">{student.academicYear || '2025 - 2026'}</span> with the following grades:
            </p>
          </div>

          {/* 3. Subjects & Grades Table */}
          <div className="relative z-10 my-2 overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-300 border-collapse">
              <thead>
                <tr className={`${themeStyles.tableHeaderBg} text-center font-cinzel tracking-wider uppercase text-[11px]`}>
                  <th className="py-2 px-2 border border-slate-600 w-12">No.</th>
                  <th className="py-2 px-2 border border-slate-600 w-28">Course Code</th>
                  <th className="py-2 px-3 border border-slate-600 text-left">Course / Subject Title</th>
                  <th className="py-2 px-2 border border-slate-600 w-20">Credits (Ci)</th>
                  <th className="py-2 px-2 border border-slate-600 w-20">Grade</th>
                  <th className="py-2 px-2 border border-slate-600 w-24">Grade Points (Gi)</th>
                  <th className="py-2 px-2 border border-slate-600 w-24">Credit Points (Ci × Gi)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subjects.length > 0 ? (
                  subjects.map((sub, idx) => (
                    <tr key={sub.id} className="text-slate-800 text-center hover:bg-slate-50">
                      <td className="py-2 px-2 border border-slate-300 font-mono text-[11px] text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-2 px-2 border border-slate-300 font-mono font-semibold uppercase text-[11px]">
                        {sub.code || `SUB${idx + 1}`}
                      </td>
                      <td className="py-2 px-3 border border-slate-300 text-left font-medium">
                        {sub.name || 'Course Subject'}
                      </td>
                      <td className="py-2 px-2 border border-slate-300 font-mono font-semibold tabular-nums">
                        {sub.credits}
                      </td>
                      <td className="py-2 px-2 border border-slate-300 font-bold font-mono">
                        {sub.grade}
                      </td>
                      <td className="py-2 px-2 border border-slate-300 font-mono tabular-nums">
                        {sub.gradePoints}
                      </td>
                      <td className="py-2 px-2 border border-slate-300 font-mono font-bold tabular-nums text-slate-900">
                        {(Number(sub.credits) * Number(sub.gradePoints)).toFixed(1)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-slate-400 italic">
                      No subjects entered yet.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-semibold text-slate-900 text-center border-t-2 border-slate-400">
                  <td colSpan={3} className="py-2.5 px-3 text-left font-bold text-xs uppercase tracking-wider">
                    Current Semester Subtotal
                  </td>
                  <td className="py-2.5 px-2 font-mono font-bold tabular-nums text-slate-900">
                    {result.currentCredits} Cr.
                  </td>
                  <td colSpan={2} className="py-2.5 px-2 text-right text-slate-600 text-[11px]">
                    Earned Points:
                  </td>
                  <td className="py-2.5 px-2 font-mono font-bold tabular-nums text-slate-900">
                    {result.currentCreditPoints.toFixed(1)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 4. Official Academic Performance Summary Card */}
          <div className="mt-5 p-4 rounded-lg bg-amber-50/50 border border-amber-200/90 relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-amber-200/80">
              
              {/* Prior Data */}
              <div className="pt-2 sm:pt-0">
                <span className="text-[10px] uppercase font-cinzel font-semibold tracking-wider text-slate-500 block">
                  Prior Cumulative Record
                </span>
                <div className="mt-1 font-mono font-bold text-slate-800 text-sm">
                  {student.isFirstSemester ? (
                    'Semester 1 (N/A)'
                  ) : (
                    <>
                      <span>CGPA: {student.previousCgpa || '—'}</span>
                      <span className="block text-[11px] font-normal text-slate-500">
                        ({student.previousCredits || 0} Credits)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* SGPA */}
              <div className="pt-2 sm:pt-0">
                <span className="text-[10px] uppercase font-cinzel font-semibold tracking-wider text-amber-900 block">
                  Current Semester SGPA
                </span>
                <div className="mt-1 text-2xl font-extrabold font-mono text-slate-900 tracking-tight">
                  {result.sgpa > 0 ? result.sgpa.toFixed(2) : '0.00'}
                </div>
                <span className="text-[11px] text-slate-500 block font-medium">
                  {result.currentCreditsEarned} Credits Earned
                </span>
              </div>

              {/* Cumulative CGPA */}
              <div className="pt-2 sm:pt-0">
                <span className="text-[10px] uppercase font-cinzel font-bold tracking-wider text-amber-900 block">
                  Overall Cumulative CGPA
                </span>
                <div className="mt-1 text-2xl font-extrabold font-mono text-amber-900 tracking-tight">
                  {result.cgpa > 0 ? result.cgpa.toFixed(2) : '0.00'}
                </div>
                <span className="text-[11px] text-amber-800 block font-semibold">
                  Total {result.totalCreditsEarned} Credits
                </span>
              </div>

              {/* Classification */}
              <div className="pt-2 sm:pt-0">
                <span className="text-[10px] uppercase font-cinzel font-semibold tracking-wider text-slate-500 block">
                  Academic Classification
                </span>
                <div className="mt-1 font-cinzel font-bold text-xs text-slate-900 leading-snug">
                  {result.academicStanding}
                </div>
                {result.percentage > 0 && (
                  <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                    Approx. {result.percentage.toFixed(1)}% Marks
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* 5. Authentication, Signatures & Digital Seal Verification */}
          <div className="mt-8 pt-6 border-t border-slate-200 relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* Left: Certificate Metadata & Verification Code */}
              <div className="text-left space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-mono text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">Certificate ID:</span>
                  <span className="font-bold text-slate-900">{certificateId}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Date of Issue: <span className="font-medium text-slate-700">{currentDate}</span>
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="p-1 bg-white border border-slate-200 rounded">
                    <QrCode className="w-8 h-8 text-slate-800" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono leading-tight max-w-[140px]">
                    Verified digital academic transcript document
                  </span>
                </div>
              </div>

              {/* Center: Gold Foil Stamp Emblem */}
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-amber-600/70 p-1 flex items-center justify-center bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-sm">
                  <div className="w-full h-full rounded-full border border-dashed border-amber-900/40 flex flex-col items-center justify-center text-[8px] font-cinzel font-bold text-amber-950 uppercase leading-none">
                    <span>OFFICIAL</span>
                    <span className="my-0.5">★ ★ ★</span>
                    <span>SEAL</span>
                  </div>
                </div>
                <span className="text-[9px] font-cinzel font-semibold tracking-wider text-amber-900 mt-1 uppercase">
                  Institutional Seal
                </span>
              </div>

              {/* Right: Signature Blocks */}
              <div className="flex items-center gap-8 text-center">
                {/* Controller of Examinations */}
                <div className="flex flex-col items-center">
                  <div className="h-10 flex items-end justify-center">
                    <span className="font-serif-academic italic text-xl text-slate-800 -rotate-3 select-none">
                      K. M. Bandekar
                    </span>
                  </div>
                  <div className="w-32 border-b border-slate-700 mt-1"></div>
                  <span className="text-[10px] font-cinzel font-bold tracking-wider text-slate-800 uppercase mt-1">
                    Controller of Exams
                  </span>
                </div>

                {/* Dean / Principal */}
                <div className="flex flex-col items-center">
                  <div className="h-10 flex items-end justify-center">
                    <span className="font-serif-academic italic text-xl text-slate-800 -rotate-2 select-none">
                      Dr. V. R. Sharma
                    </span>
                  </div>
                  <div className="w-32 border-b border-slate-700 mt-1"></div>
                  <span className="text-[10px] font-cinzel font-bold tracking-wider text-slate-800 uppercase mt-1">
                    Dean of Academics
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
