import { useState } from 'react';
import { X, Upload, Sparkles, Image } from 'lucide-react';

export default function VTONModal({ isOpen, onClose, productName }) {
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-depth-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-light">
          <div>
            <h3 className="text-base font-semibold text-charcoal">
              Virtual Try-On
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              See how "{productName}" looks on you
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-text-muted" />
          </button>
        </div>

        {/* Upload area */}
        <div className="p-6">
          <div
            className={`
              relative flex flex-col items-center justify-center
              py-12 px-6 rounded-xl border-2 border-dashed
              transition-all duration-200 cursor-pointer
              ${dragActive
                ? 'border-accent bg-accent/5 scale-[1.01]'
                : 'border-border hover:border-accent/60 hover:bg-surface'
              }
            `}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center mb-4">
              <Image className="w-6 h-6 text-accent-dark" />
            </div>
            <p className="text-sm font-medium text-charcoal mb-1">
              Upload your photo
            </p>
            <p className="text-xs text-text-muted text-center">
              Drag & drop or click to browse. Full-body photo works best.
            </p>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Tips */}
          <div className="mt-4 p-3 rounded-lg bg-surface border border-border-light">
            <p className="text-[11px] font-medium text-text-secondary leading-relaxed">
              💡 For best results: use a well-lit, front-facing photo with a plain background. Arms slightly away from body.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button className="
            w-full flex items-center justify-center gap-2
            px-6 py-3.5 rounded-xl
            bg-accent text-charcoal font-semibold text-sm
            hover:bg-accent-dark transition-colors duration-200
            shadow-depth-sm hover:shadow-depth
          ">
            <Sparkles className="w-4 h-4" />
            Generate Try-On
          </button>
        </div>
      </div>
    </div>
  );
}
