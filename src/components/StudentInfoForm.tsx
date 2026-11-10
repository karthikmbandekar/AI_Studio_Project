import React from 'react';
import { StudentInfo } from '../types/academic';
import { User, Hash, School, BookOpen, Layers, Calendar, Sparkles, HelpCircle } from 'lucide-react';

interface StudentInfoFormProps {
  student: StudentInfo;
  onChange: (field: keyof StudentInfo, value: any) => void;
  onLoadSample: () => void;
  onClear: () => void;
}

export const StudentInfoForm: React.FC<StudentInfoFormProps> = ({
  student,
  onChange,
  onLoadSample,
  onClear,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Student & Academic Profile</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Details will appear accurately on your official Grade Certificate
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Load Demo Student</span>
          </button>
          <button
            type="button"
            onClick={onClear}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Student Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Student Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={student.studentName}
              onChange={(e) => onChange('studentName', e.target.value)}
              placeholder="e.g. Aarav M. Sharma"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* USN / Roll No */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            USN / Registration Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={student.usn}
              onChange={(e) => onChange('usn', e.target.value.toUpperCase())}
              placeholder="e.g. 1MS21CS084"
              className="w-full pl-9 pr-3 py-2 text-sm font-mono uppercase bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* College / Institution */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            University / Institution Name
          </label>
          <div className="relative">
            <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={student.institution}
              onChange={(e) => onChange('institution', e.target.value)}
              placeholder="e.g. Visvesvaraya Technological University"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Degree / Program */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Degree / Program
          </label>
          <div className="relative">
            <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={student.degree}
              onChange={(e) => onChange('degree', e.target.value)}
              placeholder="e.g. Bachelor of Technology (B.Tech)"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Department / Branch */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Branch / Department
          </label>
          <div className="relative">
            <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={student.department}
              onChange={(e) => onChange('department', e.target.value)}
              placeholder="e.g. Computer Science & Engineering"
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Current Semester & Academic Year */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Current Semester
            </label>
            <select
              value={student.semester}
              onChange={(e) => onChange('semester', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={`${sem}${sem === 1 ? 'st' : sem === 2 ? 'nd' : sem === 3 ? 'rd' : 'th'} Semester`}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Academic Year
            </label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={student.academicYear}
                onChange={(e) => onChange('academicYear', e.target.value)}
                placeholder="2025 - 2026"
                className="w-full pl-7 pr-2 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Previous Year / Semester Academic Data */}
      <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-6 rounded-b-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Prior Academic History (For CGPA Computation)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your previous cumulative records, or mark as 1st semester
            </p>
          </div>
          <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
            <input
              type="checkbox"
              checked={student.isFirstSemester}
              onChange={(e) => onChange('isFirstSemester', e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
            />
            <span>I am in Semester 1 (No prior credits)</span>
          </label>
        </div>

        {!student.isFirstSemester ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Previous CGPA (Up to Last Sem) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">Scale 0 - 10</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={student.previousCgpa}
                onChange={(e) =>
                  onChange('previousCgpa', e.target.value === '' ? '' : parseFloat(e.target.value))
                }
                placeholder="e.g. 8.42"
                className="w-full px-3 py-2 text-sm font-semibold tabular-nums bg-white border border-slate-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Your cumulative GPA before this current examination.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Total Previous Credits Earned <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">e.g. ~20/sem</span>
              </div>
              <input
                type="number"
                step="1"
                min="0"
                max="300"
                value={student.previousCredits}
                onChange={(e) =>
                  onChange('previousCredits', e.target.value === '' ? '' : parseInt(e.target.value, 10))
                }
                placeholder="e.g. 80"
                className="w-full px-3 py-2 text-sm font-semibold tabular-nums bg-white border border-slate-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Sum of all credit hours completed in previous semesters.
              </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 sm:col-span-2 lg:col-span-1 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Weighted CGPA Formula</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed font-mono">
                New CGPA = (Prev Credits × Prev CGPA + Curr Credits × SGPA) / (Total Credits)
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-sky-50 border border-sky-100 rounded-lg text-xs text-sky-800 flex items-center gap-2">
            <span className="font-semibold">Semester 1 Mode:</span>
            <span>Your Cumulative CGPA will match your Current Semester SGPA upon completion.</span>
          </div>
        )}
      </div>
    </div>
  );
};
