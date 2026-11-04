import React from 'react';
import {
  Award,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { Language } from '../../types.ts';
import { conclusionData } from '../../data/presentationContent.ts';

interface Props {
  language: Language;
  onRestart: () => void;
  isPresentationMode: boolean;
}

export const Section10Conclusion: React.FC<Props> = ({ language, onRestart, isPresentationMode }) => {
  const takeaways = language === 'ar' ? conclusionData.takeawaysAr : conclusionData.takeawaysEn;
  const discussionPrompts =
    language === 'ar' ? conclusionData.discussionPromptsAr : conclusionData.discussionPromptsEn;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 text-center">
      {/* Section Header */}
      <div className="mb-6">
        <span className="text-xs font-mono font-bold text-[#20D6C2] uppercase tracking-wider px-2.5 py-1 rounded bg-[#20D6C2]/10 border border-[#20D6C2]/20">
          SECTION 10
        </span>
        <h2
          className={`font-extrabold text-[#F4F7FA] mt-2 mb-2 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar' ? 'الخاتمة والخلاصات الأكاديمية' : 'Conclusion & Core Takeaways'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          {language === 'ar'
            ? 'الملخص التنفيذي لمحاور العرض التقديمي وجلسة الأسئلة والمناقشة'
            : 'Executive summary of key findings and open floor for defense questions'}
        </p>
      </div>

      {/* 3 Core Takeaways Grid (Explicit Requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
        {takeaways.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-[#121D29] border border-slate-800 hover:border-[#20D6C2]/40 transition-all shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#20D6C2]/15 border border-[#20D6C2]/30 flex items-center justify-center text-[#20D6C2] font-mono font-bold text-sm mb-3">
                0{index + 1}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-[#20D6C2] font-mono">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Core Principle</span>
            </div>
          </div>
        ))}
      </div>

      {/* Final Thesis Statement Banner (Explicit Requirement) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121D29] via-slate-900 to-[#121D29] border-2 border-[#20D6C2] shadow-2xl shadow-[#20D6C2]/15 mb-8">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#20D6C2] font-bold block mb-1">
          {language === 'ar' ? 'الخلاصة الختامية للبحث' : 'FINAL CORE STATEMENT'}
        </span>
        <h3
          className={`font-extrabold text-white leading-snug ${
            isPresentationMode ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          }`}
        >
          "{language === 'ar' ? conclusionData.finalStatementAr : conclusionData.finalStatementEn}"
        </h3>
      </div>

      {/* THANK YOU — ANY QUESTIONS? (Explicit Requirement) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#121D29]/90 border border-slate-800 shadow-2xl mb-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FFB454]/15 border border-[#FFB454]/40 flex items-center justify-center text-[#FFB454] mb-4">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h3
          className={`font-extrabold text-[#F4F7FA] tracking-wide mb-2 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar' ? conclusionData.thankYouAr : conclusionData.thankYouEn}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6">
          {language === 'ar'
            ? 'باب الأسئلة والمناقشة مفتوح لأعضاء لجنة التقييم والأساتذة الكرام'
            : 'The floor is open for academic defense and committee inquiries.'}
        </p>

        {/* Discussion Prompt Cards */}
        <div className="text-left max-w-2xl mx-auto space-y-2 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block text-center">
            {language === 'ar' ? 'محاور ونقاط مقترحة للنقاش الأكاديمي:' : 'Recommended Defense Discussion Prompts:'}
          </span>
          {discussionPrompts.map((q, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#0B1118] border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300"
            >
              <MessageSquare className="w-4 h-4 text-[#FFB454] flex-shrink-0" />
              <span>{q}</span>
            </div>
          ))}
        </div>

        {/* Restart Presentation Action */}
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-[#20D6C2]" />
          <span>{language === 'ar' ? 'العودة لبداية العرض' : 'Restart Presentation'}</span>
        </button>
      </div>
    </div>
  );
};
