import React, { useState } from 'react';
import {
  ShieldAlert,
  Maximize2,
  Minimize2,
  List,
  Languages,
  ChevronDown,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Language } from '../types.ts';
import { presentationSections } from '../data/presentationContent.ts';

interface Props {
  currentSection: number;
  totalSections: number;
  onSelectSection: (sectionId: number) => void;
  language: Language;
  onToggleLanguage: () => void;
  isPresentationMode: boolean;
  onTogglePresentationMode: () => void;
  zoomScale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const HeaderNav: React.FC<Props> = ({
  currentSection,
  totalSections,
  onSelectSection,
  language,
  onToggleLanguage,
  isPresentationMode,
  onTogglePresentationMode,
  zoomScale,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  const [outlineOpen, setOutlineOpen] = useState(false);

  const progressPercent = ((currentSection - 1) / (totalSections - 1)) * 100;
  const currentSectionMeta = presentationSections.find((s) => s.id === currentSection);

  return (
    <header className="relative z-40 bg-[#0B1118]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top progress indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800/80 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#20D6C2] via-[#20D6C2] to-[#FFB454] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand & Topic (Hidden or minimized in Presentation Mode) */}
        {!isPresentationMode ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#20D6C2]/15 border border-[#20D6C2]/30 text-[#20D6C2] shadow-sm">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider text-[#F4F7FA] uppercase font-mono">
                  MITM ATTACK
                </span>
                <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  SEC-401
                </span>
              </div>
              <div className="text-[11px] text-slate-400 truncate max-w-[140px] sm:max-w-[280px]">
                {language === 'ar' ? 'هندسة الشبكات والأمن السيبراني' : 'Networks Engineering & Cybersecurity'}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#20D6C2] px-2 py-0.5 rounded bg-[#20D6C2]/10 border border-[#20D6C2]/30">
              PROJECTOR MODE
            </span>
          </div>
        )}

        {/* Center: Slide Switcher / Outline Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOutlineOpen(!outlineOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-[#121D29] hover:border-slate-700 text-slate-200 transition-all text-xs font-medium"
            title={language === 'ar' ? 'فهرس الشرائح' : 'Slide Directory'}
          >
            <List className="w-3.5 h-3.5 text-[#20D6C2]" />
            <span className="font-mono text-[#20D6C2] font-bold">
              {String(currentSection).padStart(2, '0')}
            </span>
            <span className="text-slate-500">/</span>
            <span className="font-mono text-slate-400">
              {String(totalSections).padStart(2, '0')}
            </span>
            <span className="hidden md:inline-block text-slate-300 max-w-[180px] truncate border-l border-slate-700/80 pl-2 ml-1">
              {language === 'ar' ? currentSectionMeta?.titleAr : currentSectionMeta?.titleEn}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${outlineOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Slide dropdown outline */}
          {outlineOpen && (
            <div
              className={`absolute top-full mt-2 ${
                language === 'ar' ? 'right-0 sm:left-0' : 'left-0 sm:right-0'
              } z-50 w-72 max-h-96 overflow-y-auto rounded-xl border border-slate-700 bg-[#121D29] shadow-2xl p-2 backdrop-blur-xl`}
            >
              <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                {language === 'ar' ? 'أقسام العرض التقديمي (10)' : 'Presentation Agenda (10 Sections)'}
              </div>
              <div className="space-y-1">
                {presentationSections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      onSelectSection(sec.id);
                      setOutlineOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors ${
                      sec.id === currentSection
                        ? 'bg-[#20D6C2]/15 text-[#20D6C2] font-semibold border border-[#20D6C2]/30'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[11px] opacity-70">{sec.number}</span>
                      <span className="truncate">{language === 'ar' ? sec.titleAr : sec.titleEn}</span>
                    </div>
                    {sec.id === currentSection && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#20D6C2]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Controls: Zoom, Language, Presentation Mode */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom / Size Controls */}
          <div className="flex items-center gap-0.5 rounded-md border border-slate-800 bg-[#121D29] px-1 py-0.5 text-xs text-slate-300 shadow-sm">
            <button
              onClick={onZoomOut}
              className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title={language === 'ar' ? 'تصغير حجم الصفحة (-)' : 'Zoom Out (-)'}
            >
              <ZoomOut className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={onResetZoom}
              className="px-1.5 font-mono text-[11px] font-bold text-[#20D6C2] hover:underline"
              title={language === 'ar' ? 'إعادة ضبط الحجم' : 'Reset Zoom'}
            >
              {Math.round(zoomScale * 100)}%
            </button>
            <button
              onClick={onZoomIn}
              className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title={language === 'ar' ? 'تكبير حجم الصفحة (+)' : 'Zoom In (+)'}
            >
              <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-slate-800 bg-[#121D29] text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-all"
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
          >
            <Languages className="w-3.5 h-3.5 text-[#20D6C2]" />
            <span className="font-semibold text-xs">{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={onTogglePresentationMode}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-medium transition-all ${
              isPresentationMode
                ? 'border-[#20D6C2] bg-[#20D6C2]/20 text-[#20D6C2]'
                : 'border-slate-800 bg-[#121D29] text-slate-300 hover:text-white hover:border-slate-700'
            }`}
            title={
              language === 'ar'
                ? isPresentationMode
                  ? 'الخروج من وضع البروجكتر'
                  : 'وضع العرض (بروجكتر)'
                : isPresentationMode
                ? 'Exit Presentation Mode'
                : 'Presentation Mode (Projector)'
            }
          >
            {isPresentationMode ? (
              <Minimize2 className="w-3.5 h-3.5 text-[#20D6C2]" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-[#20D6C2]" />
            )}
            <span className="hidden lg:inline">
              {language === 'ar'
                ? isPresentationMode
                  ? 'عرض عادي'
                  : 'وضع البروجكتر'
                : isPresentationMode
                ? 'Standard'
                : 'Projector'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
