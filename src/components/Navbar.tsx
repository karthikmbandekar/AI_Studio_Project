import React from 'react';
import { Award, FileText, BookmarkCheck, HelpCircle, Printer } from 'lucide-react';

interface NavbarProps {
  activeTab: 'calculator' | 'certificate' | 'history';
  setActiveTab: (tab: 'calculator' | 'certificate' | 'history') => void;
  onOpenGradeScale: () => void;
  onPrintCertificate: () => void;
  hasCalculated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenGradeScale,
  onPrintCertificate,
  hasCalculated,
}) => {
  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => setActiveTab('calculator')}
            className="flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block leading-tight">
                Gradify Academic
              </span>
              <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap hidden sm:block">
                CGPA & SGPA Certificate Suite
              </span>
            </div>
          </button>

          {/* Zone 2: Single-line clean navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-1 border-b-2 ${
                activeTab === 'calculator'
                  ? 'border-amber-500 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Calculator & Data
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-1 border-b-2 ${
                activeTab === 'certificate'
                  ? 'border-amber-500 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Academic Certificate
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-1 border-b-2 ${
                activeTab === 'history'
                  ? 'border-amber-500 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600'
              }`}
            >
              Saved Records
            </button>
            <button
              onClick={onOpenGradeScale}
              className="hover:text-slate-900 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Grading Scale</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {activeTab === 'certificate' ? (
              <button
                onClick={onPrintCertificate}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('certificate')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors shadow-sm whitespace-nowrap"
              >
                <Award className="w-4 h-4" />
                <span>View Certificate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
