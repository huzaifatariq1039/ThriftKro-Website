import { useState } from 'react';
import { X, Upload, Sparkles, Image, Loader2 } from 'lucide-react';

export default function VTONModal({ isOpen, onClose, productName }) {
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F0F0]">
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
            className="btn-ghost"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Upload area */}
        <div className="p-6">
          {processing ? (
            // Loading / Processing skeleton
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 animate-pulse">
                <Loader2 className="w-7 h-7 text-accent animate-spin" />
              </div>
              <p className="text-sm font-semibold text-charcoal mb-1">Generating Try-On...</p>
              <p className="text-xs text-text-muted text-center">Our AI is fitting the garment to your photo. This typically takes 10-15 seconds.</p>
              <div className="w-48 h-1.5 bg-border/40 rounded-full overflow-hidden mt-5">
                <div className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full" style={{ animation: 'shimmer 1.5s infinite', width: '60%' }} />
              </div>
            </div>
          ) : (
            <>
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
              <div className="mt-4 p-3 rounded-lg bg-surface border border-[#F0F0F0]">
                <p className="text-[11px] font-medium text-text-secondary leading-relaxed">
                  💡 For best results: use a well-lit, front-facing photo with a plain background. Arms slightly away from body.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleGenerate}
            disabled={processing}
            className="btn-accent w-full py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {processing ? 'Processing...' : 'Generate Try-On'}
          </button>
        </div>
      </div>
    </div>
  );
}
