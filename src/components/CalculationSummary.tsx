import React, { useState } from 'react';
import { CalculationResult, StudentInfo } from '../types/academic';
import { Award, TrendingUp, TrendingDown, Minus, CheckCircle2, ChevronDown, ChevronUp, Sparkles, FileBadge } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CalculationSummaryProps {
  result: CalculationResult;
  student: StudentInfo;
  onViewCertificate: () => void;
  percentageFormula: 'vtu' | 'aicte' | 'direct';
  setPercentageFormula: (formula: 'vtu' | 'aicte' | 'direct') => void;
}

export const CalculationSummary: React.FC<CalculationSummaryProps> = ({
  result,
  student,
  onViewCertificate,
  percentageFormula,
  setPercentageFormula,
}) => {
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  const prevCgpa = student.isFirstSemester ? 0 : Number(student.previousCgpa) || 0;
  const cgpaDelta = prevCgpa > 0 ? Number((result.cgpa - prevCgpa).toFixed(2)) : 0;

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
    });
    onViewCertificate();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span>Academic Performance Metrics</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time computed grade points, SGPA, and cumulative CGPA
          </p>
        </div>

        {/* Honor / Standing Text */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
            {result.academicStanding}
          </span>
        </div>
      </div>

      {/* Main KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Semester SGPA */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Semester SGPA
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight mt-1">
              {result.sgpa > 0 ? result.sgpa.toFixed(2) : '—'}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Points: <span className="font-semibold text-slate-700">{result.currentCreditPoints}</span> / {result.currentCredits} Cr.
          </p>
        </div>

        {/* Cumulative CGPA */}
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900 block">
                Cumulative CGPA
              </span>
              {!student.isFirstSemester && prevCgpa > 0 && (
                <span
                  className={`inline-flex items-center text-[11px] font-bold ${
                    cgpaDelta > 0
                      ? 'text-emerald-700'
                      : cgpaDelta < 0
                      ? 'text-rose-700'
                      : 'text-slate-500'
                  }`}
                >
                  {cgpaDelta > 0 ? (
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                  ) : cgpaDelta < 0 ? (
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                  ) : (
                    <Minus className="w-3 h-3 mr-0.5" />
                  )}
                  {cgpaDelta > 0 ? `+${cgpaDelta}` : cgpaDelta}
                </span>
              )}
            </div>
            <div className="text-3xl font-extrabold text-amber-950 font-mono tabular-nums tracking-tight mt-1">
              {result.cgpa > 0 ? result.cgpa.toFixed(2) : '—'}
            </div>
          </div>
          <p className="text-[11px] text-amber-800 mt-2">
            Overall cumulative average
          </p>
        </div>

        {/* Credits Earned */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
              Credits Earned
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight mt-1">
              {result.totalCreditsEarned}{' '}
              <span className="text-sm font-normal text-slate-400">/ {result.totalCredits}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Current Sem: {result.currentCreditsEarned} credits
          </p>
        </div>

        {/* Equivalent Percentage */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                Approx. Marks %
              </span>
              <select
                value={percentageFormula}
                onChange={(e) => setPercentageFormula(e.target.value as any)}
                aria-label="Conversion Formula"
                className="text-[10px] bg-white border border-slate-200 rounded px-1 py-0.5 text-slate-600 focus:outline-none"
              >
                <option value="vtu">VTU [ (CGPA-0.75)×10 ]</option>
                <option value="aicte">AICTE [ CGPA×9.5 ]</option>
                <option value="direct">Direct [ CGPA×10 ]</option>
              </select>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight mt-1">
              {result.percentage > 0 ? `${result.percentage.toFixed(1)}%` : '—'}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Based on {percentageFormula.toUpperCase()} formula
          </p>
        </div>
      </div>

      {/* Primary Action Button to View Certificate */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-50 to-slate-50 border border-amber-200">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Official Academic Certificate Ready</span>
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Your results, subject breakdown, and university credentials have been compiled into a formal grade certificate.
          </p>
        </div>

        <button
          type="button"
          onClick={triggerCelebration}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all hover:shadow cursor-pointer shrink-0"
        >
          <FileBadge className="w-4 h-4" />
          <span>Generate Certificate</span>
        </button>
      </div>

      {/* Accordion: Calculation Math Breakdown */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setShowFormulaDetails(!showFormulaDetails)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-600 hover:text-slate-900 py-1 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
            <span>How were SGPA and CGPA calculated? (Detailed Formula Breakdown)</span>
          </span>
          {showFormulaDetails ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showFormulaDetails && (
          <div className="mt-3 p-4 bg-slate-50 rounded-lg text-xs text-slate-700 space-y-3 font-mono">
            <div>
              <p className="font-bold text-slate-900 mb-1">1. SGPA (Semester Grade Point Average):</p>
              <p className="text-slate-600">
                Formula: SGPA = Σ (Course Credits × Grade Point) / Σ (Course Credits)
              </p>
              <p className="text-slate-800 font-semibold mt-1">
                = {result.currentCreditPoints} / {result.currentCredits} ={' '}
                <span className="text-amber-700">{result.sgpa.toFixed(2)}</span>
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-900 mb-1">2. Cumulative CGPA (Cumulative Grade Point Average):</p>
              {student.isFirstSemester ? (
                <p className="text-slate-600">
                  Semester 1 student: CGPA matches SGPA = <span className="font-semibold text-amber-700">{result.sgpa.toFixed(2)}</span>
                </p>
              ) : (
                <>
                  <p className="text-slate-600">
                    Formula: CGPA = (Previous Total Points + Current Points) / (Previous Credits + Current Credits)
                  </p>
                  <p className="text-slate-800 font-semibold mt-1">
                    = ({prevCgpa} × {Number(student.previousCredits) || 0} + {result.currentCreditPoints}) / ({Number(student.previousCredits) || 0} + {result.currentCredits}) ={' '}
                    <span className="text-amber-700">{result.cgpa.toFixed(2)}</span>
                  </p>
                </>
              )}
            </div>

            <div>
              <p className="font-bold text-slate-900 mb-1">3. Percentage Conversion:</p>
              <p className="text-slate-600">
                {percentageFormula === 'vtu' && 'VTU Standard: (CGPA - 0.75) × 10 = '}
                {percentageFormula === 'aicte' && 'AICTE Standard: CGPA × 9.5 = '}
                {percentageFormula === 'direct' && 'Direct Scale: CGPA × 10 = '}
                <span className="font-semibold text-slate-900">{result.percentage.toFixed(1)}%</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
