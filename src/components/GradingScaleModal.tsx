import React from 'react';
import { X, HelpCircle, Check, Award } from 'lucide-react';
import { GRADE_SCALES } from '../data/presets';

interface GradingScaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GradingScaleModal: React.FC<GradingScaleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Grading Scale & Calculation Guide</h3>
              <p className="text-xs text-slate-500">Official standard 10-point AICTE / UGC & VTU grade point system</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* 10-Point Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Standard 10-Point Academic Grade Scale
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2 px-3">Letter Grade</th>
                    <th className="py-2 px-3">Grade Points</th>
                    <th className="py-2 px-3">Performance Category</th>
                    <th className="py-2 px-3">Marks Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {GRADE_SCALES['10-point'].map((g) => (
                    <tr key={g.grade} className="hover:bg-slate-50/60">
                      <td className="py-2 px-3 font-bold text-slate-900 font-mono">{g.grade}</td>
                      <td className="py-2 px-3 font-semibold text-amber-800 font-mono">{g.points}</td>
                      <td className="py-2 px-3">{g.description}</td>
                      <td className="py-2 px-3 text-slate-500 font-mono">
                        {g.minPercentage ? `≥ ${g.minPercentage}%` : '< 40%'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Formulas */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 font-mono">
            <h4 className="font-bold text-slate-900 font-sans text-xs">Essential Academic Formulas:</h4>
            
            <div>
              <p className="font-bold text-slate-800">1. SGPA (Semester Grade Point Average):</p>
              <p className="text-slate-600 mt-0.5">
                SGPA = Σ (Ci × Gi) / Σ (Ci)
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Where Ci is Course Credit and Gi is Grade Points earned in that subject.
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-800">2. Cumulative CGPA:</p>
              <p className="text-slate-600 mt-0.5">
                CGPA = [ (Prev CGPA × Prev Credits) + Σ(Curr Ci × Gi) ] / (Prev Credits + Curr Credits)
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-800">3. Class / Distinction Classification:</p>
              <ul className="space-y-1 text-slate-600 list-disc list-inside mt-1">
                <li><span className="font-semibold text-slate-800">Distinction:</span> CGPA ≥ 7.75 (or 8.0) without backlogs</li>
                <li><span className="font-semibold text-slate-800">First Class:</span> 6.75 ≤ CGPA &lt; 7.75</li>
                <li><span className="font-semibold text-slate-800">Second Class:</span> 5.75 ≤ CGPA &lt; 6.75</li>
                <li><span className="font-semibold text-slate-800">Pass Class:</span> 4.00 ≤ CGPA &lt; 5.75</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
