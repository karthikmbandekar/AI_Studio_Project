import React from 'react';
import { SavedCertificate } from '../types/academic';
import { X, Award, Trash2, ExternalLink, Calendar, User, FileText } from 'lucide-react';

interface SavedCertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedList: SavedCertificate[];
  onLoadCertificate: (cert: SavedCertificate) => void;
  onDeleteCertificate: (id: string) => void;
  onClearAll: () => void;
}

export const SavedCertificatesModal: React.FC<SavedCertificatesModalProps> = ({
  isOpen,
  onClose,
  savedList,
  onLoadCertificate,
  onDeleteCertificate,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Saved Academic Certificates</h3>
              <p className="text-xs text-slate-500">Access and re-print your previously generated certificates</p>
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
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {savedList.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">No Certificates Saved Yet</p>
              <p className="text-xs text-slate-400 mt-1">
                When you click "Save Record" on the certificate page, your semester transcript will be stored here.
              </p>
            </div>
          ) : (
            savedList.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {cert.studentInfo.studentName || 'Student Record'}
                    </span>
                    <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {cert.studentInfo.usn || 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                    <span>{cert.studentInfo.semester}</span>
                    <span>·</span>
                    <span>{cert.studentInfo.department || 'Engineering'}</span>
                    <span>·</span>
                    <span className="font-mono text-[11px]">{new Date(cert.savedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className="font-semibold text-slate-700">
                      SGPA: <span className="font-mono font-bold text-amber-700">{cert.result.sgpa}</span>
                    </span>
                    <span className="font-semibold text-slate-700">
                      CGPA: <span className="font-mono font-bold text-amber-700">{cert.result.cgpa}</span>
                    </span>
                    <span className="text-slate-400">({cert.subjects.length} subjects)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onLoadCertificate(cert);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View / Print</span>
                  </button>
                  <button
                    onClick={() => onDeleteCertificate(cert.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedList.length > 0 && (
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {savedList.length} certificate{savedList.length !== 1 ? 's' : ''} stored locally
            </span>
            <button
              onClick={onClearAll}
              className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
            >
              Clear All Records
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
