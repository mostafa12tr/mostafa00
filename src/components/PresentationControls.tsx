import React from 'react';
import { ArrowLeft, ArrowRight, CornerDownRight } from 'lucide-react';
import { Language } from '../types.ts';
import { presentationSections } from '../data/presentationContent.ts';

interface Props {
  currentSection: number;
  totalSections: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSection: (id: number) => void;
  language: Language;
  isPresentationMode: boolean;
}

export const PresentationControls: React.FC<Props> = ({
  currentSection,
  totalSections,
  onPrev,
  onNext,
  onSelectSection,
  language,
  isPresentationMode,
}) => {
  const isFirst = currentSection === 1;
  const isLast = currentSection === totalSections;

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all ${
        isPresentationMode
          ? 'py-2 px-4 bg-[#0B1118]/80 backdrop-blur-md border-t border-slate-900/60 opacity-80 hover:opacity-100'
          : 'py-3 px-4 sm:px-6 bg-[#0B1118]/90 backdrop-blur-md border-t border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Previous Button */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            isFirst
              ? 'opacity-30 cursor-not-allowed border border-slate-800 bg-[#121D29]/40 text-slate-500'
              : 'border border-slate-700 bg-[#121D29] text-slate-200 hover:text-white hover:border-[#20D6C2]/50 hover:bg-[#121D29]/90 shadow-md active:scale-95'
          }`}
          title={language === 'ar' ? 'السابق (سهم يسار)' : 'Previous Slide (Left Arrow)'}
        >
          {language === 'ar' ? (
            <>
              <ArrowRight className="w-4 h-4 text-[#20D6C2]" />
              <span>السابق</span>
            </>
          ) : (
            <>
              <ArrowLeft className="w-4 h-4 text-[#20D6C2]" />
              <span>Previous</span>
            </>
          )}
          <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
            {language === 'ar' ? '→' : '←'}
          </kbd>
        </button>

        {/* Center: Slide dots / Quick jumpers */}
        <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
          {presentationSections.map((sec) => {
            const isActive = sec.id === currentSection;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`transition-all rounded-full ${
                  isActive
                    ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#20D6C2] shadow-[0_0_8px_rgba(32,214,194,0.6)]'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`${sec.number}: ${language === 'ar' ? sec.titleAr : sec.titleEn}`}
                aria-label={`Jump to slide ${sec.number}`}
              />
            );
          })}
        </div>

        {/* Mobile current counter */}
        <div className="sm:hidden font-mono text-xs text-slate-400">
          <span className="text-[#20D6C2] font-bold">{currentSection}</span> / {totalSections}
        </div>

        {/* Right: Next or Finish Button */}
        <button
          onClick={onNext}
          disabled={isLast}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            isLast
              ? 'opacity-40 cursor-not-allowed border border-slate-800 bg-[#121D29]/40 text-slate-500'
              : 'border border-[#20D6C2]/60 bg-gradient-to-r from-[#20D6C2]/20 to-[#20D6C2]/10 text-[#20D6C2] hover:bg-[#20D6C2]/30 hover:border-[#20D6C2] shadow-lg shadow-[#20D6C2]/10 active:scale-95'
          }`}
          title={language === 'ar' ? 'التالي (سهم يمين أو مسافة)' : 'Next Slide (Right Arrow or Space)'}
        >
          {language === 'ar' ? (
            <>
              <span>التالي</span>
              <ArrowLeft className="w-4 h-4 text-[#20D6C2]" />
            </>
          ) : (
            <>
              <span>Next</span>
              <ArrowRight className="w-4 h-4 text-[#20D6C2]" />
            </>
          )}
          <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
            {language === 'ar' ? '←' : '→'}
          </kbd>
        </button>
      </div>

      {/* Keyboard hints info bar (discrete) */}
      {!isPresentationMode && (
        <div className="hidden lg:flex items-center justify-center gap-4 text-[10px] text-slate-500 mt-1 font-mono">
          <span>
            <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400">←</kbd>{' '}
            <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400">→</kbd> /{' '}
            <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400">Space</kbd>{' '}
            {language === 'ar' ? 'للتنقل' : 'Navigate'}
          </span>
          <span>•</span>
          <span>
            <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400">F</kbd>{' '}
            {language === 'ar' ? 'وضع البروجكتر' : 'Presentation Mode'}
          </span>
          <span>•</span>
          <span>
            <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400">-</kbd>{' '}
            <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400">+</kbd>{' '}
            {language === 'ar' ? 'حجم الصفحة' : 'Zoom Size'}
          </span>
        </div>
      )}
    </footer>
  );
};
