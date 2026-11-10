import React from 'react';
import { SubjectItem, GradeScaleType } from '../types/academic';
import { GRADE_SCALES, BRANCH_PRESETS } from '../data/presets';
import { Plus, Trash2, BookOpen, Layers, RotateCcw, AlertTriangle } from 'lucide-react';

interface SubjectManagerProps {
  subjects: SubjectItem[];
  gradeScale: GradeScaleType;
  setGradeScale: (scale: GradeScaleType) => void;
  onAddSubject: () => void;
  onUpdateSubject: (id: string, field: keyof SubjectItem, value: any) => void;
  onRemoveSubject: (id: string) => void;
  onLoadBranchPreset: (presetIndex: number) => void;
  onClearSubjects: () => void;
}

export const SubjectManager: React.FC<SubjectManagerProps> = ({
  subjects,
  gradeScale,
  setGradeScale,
  onAddSubject,
  onUpdateSubject,
  onRemoveSubject,
  onLoadBranchPreset,
  onClearSubjects,
}) => {
  const currentScaleDefinitions = GRADE_SCALES[gradeScale];

  const handleGradeChange = (subjectId: string, selectedGrade: string) => {
    const found = currentScaleDefinitions.find((g) => g.grade === selectedGrade);
    const points = found ? found.points : 0;
    onUpdateSubject(subjectId, 'grade', selectedGrade);
    onUpdateSubject(subjectId, 'gradePoints', points);
  };

  const totalCredits = subjects.reduce((sum, s) => sum + (Number(s.credits) || 0), 0);
  const totalPoints = subjects.reduce((sum, s) => {
    const cred = Number(s.credits) || 0;
    const pts = Number(s.gradePoints) || 0;
    return sum + cred * pts;
  }, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      {/* Header with Title and Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span>Current Semester Subjects & Grades</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Specify course credits and assigned grade points to compute current SGPA
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Branch Preset Dropdown */}
          <div className="relative">
            <select
              aria-label="Load Subject Preset"
              onChange={(e) => {
                if (e.target.value !== '') {
                  onLoadBranchPreset(Number(e.target.value));
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="" disabled>
                ⚡ Load Syllabus Preset...
              </option>
              {BRANCH_PRESETS.map((p, idx) => (
                <option key={p.name} value={idx}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Scale Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setGradeScale('10-point')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                gradeScale === '10-point'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              10-Point Scale
            </button>
            <button
              type="button"
              onClick={() => setGradeScale('4-point')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                gradeScale === '4-point'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4.0 Scale
            </button>
          </div>

          <button
            type="button"
            onClick={onClearSubjects}
            title="Clear all subject rows"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subjects Table */}
      {subjects.length === 0 ? (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-xl">
          <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-700">No Subjects Added Yet</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Add your semester courses manually or load a pre-configured branch preset above.
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onAddSubject}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Subject</span>
            </button>
            <button
              type="button"
              onClick={() => onLoadBranchPreset(0)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
            >
              <span>Load Computer Science Sem 5</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-2 w-10 text-center">#</th>
                <th className="py-2.5 px-2 w-28">Subject Code</th>
                <th className="py-2.5 px-2">Subject / Course Title</th>
                <th className="py-2.5 px-2 w-24">Credits (Ci)</th>
                <th className="py-2.5 px-2 w-28">Grade</th>
                <th className="py-2.5 px-2 w-24">Points (Gi)</th>
                <th className="py-2.5 px-2 w-24 text-right">Points (Ci×Gi)</th>
                <th className="py-2.5 px-2 w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((sub, index) => {
                const creditVal = Number(sub.credits) || 0;
                const pointVal = Number(sub.gradePoints) || 0;
                const earnedPoints = creditVal * pointVal;
                const isFail = sub.grade === 'F' || pointVal === 0;

                return (
                  <tr
                    key={sub.id}
                    className={`group hover:bg-slate-50/80 transition-colors ${
                      isFail ? 'bg-rose-50/40' : ''
                    }`}
                  >
                    {/* Index */}
                    <td className="py-2.5 px-2 text-center text-slate-400 font-mono text-[11px]">
                      {index + 1}
                    </td>

                    {/* Code */}
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={sub.code}
                        onChange={(e) =>
                          onUpdateSubject(sub.id, 'code', e.target.value.toUpperCase())
                        }
                        placeholder="CS501"
                        className="w-full px-2 py-1.5 text-xs font-mono font-medium uppercase bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </td>

                    {/* Course Title */}
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={sub.name}
                        onChange={(e) => onUpdateSubject(sub.id, 'name', e.target.value)}
                        placeholder="e.g. Database Systems"
                        className="w-full px-2.5 py-1.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </td>

                    {/* Credits */}
                    <td className="py-2 px-2">
                      <select
                        value={sub.credits}
                        onChange={(e) =>
                          onUpdateSubject(sub.id, 'credits', parseFloat(e.target.value))
                        }
                        className="w-full px-2 py-1.5 text-xs font-semibold tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-amber-500 outline-none cursor-pointer"
                      >
                        {[1, 1.5, 2, 3, 4, 5, 6].map((cr) => (
                          <option key={cr} value={cr}>
                            {cr} {cr === 1 ? 'Credit' : 'Credits'}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Grade Selector */}
                    <td className="py-2 px-2">
                      <select
                        value={sub.grade}
                        onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                        className={`w-full px-2 py-1.5 text-xs font-bold rounded-md border focus:bg-white focus:border-amber-500 outline-none cursor-pointer ${
                          isFail
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        {currentScaleDefinitions.map((g) => (
                          <option key={g.grade} value={g.grade}>
                            {g.grade} ({g.points} pts)
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Grade Points */}
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max={gradeScale === '10-point' ? 10 : 4}
                        value={sub.gradePoints}
                        onChange={(e) =>
                          onUpdateSubject(
                            sub.id,
                            'gradePoints',
                            e.target.value === '' ? 0 : parseFloat(e.target.value)
                          )
                        }
                        className="w-full px-2 py-1.5 text-xs font-semibold tabular-nums text-slate-700 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-amber-500 outline-none"
                      />
                    </td>

                    {/* Credit Points Total */}
                    <td className="py-2 px-2 text-right font-mono font-bold tabular-nums text-slate-800">
                      {earnedPoints.toFixed(1)}
                    </td>

                    {/* Delete Action */}
                    <td className="py-2 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => onRemoveSubject(sub.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 bg-slate-50/70 font-semibold text-slate-700">
                <td colSpan={3} className="py-2.5 px-3 text-xs">
                  Current Semester Total ({subjects.length} Courses)
                </td>
                <td className="py-2.5 px-2 font-mono font-bold tabular-nums text-slate-900">
                  {totalCredits} Credits
                </td>
                <td colSpan={2} className="py-2.5 px-2 text-slate-500 text-[11px]">
                  Total Credit Points:
                </td>
                <td className="py-2.5 px-2 text-right font-mono font-bold tabular-nums text-amber-700">
                  {totalPoints.toFixed(1)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Add Row Button & Status Warnings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onAddSubject}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer self-start"
        >
          <Plus className="w-4 h-4 text-slate-600" />
          <span>Add Another Subject</span>
        </button>

        {subjects.some((s) => s.grade === 'F' || s.gradePoints === 0) && (
          <div className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 px-2.5 py-1.5 rounded-md border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Note: 1 or more subjects have F/Arrear grade (0 points)</span>
          </div>
        )}
      </div>
    </div>
  );
};
