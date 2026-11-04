import React, { useState } from 'react';
import { Shield, Play, User, BookOpen, GraduationCap, Clock, Sparkles } from 'lucide-react';
import { Language } from '../../types.ts';
import { introData } from '../../data/presentationContent.ts';

interface Props {
  language: Language;
  onStart: () => void;
  isPresentationMode: boolean;
}

export const Section01Intro: React.FC<Props> = ({ language, onStart, isPresentationMode }) => {
  const [customStudentName, setCustomStudentName] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);

  const defaultName = language === 'ar' ? 'طالب / باحث الأمن السيبراني' : 'Cybersecurity Scholar / Student';
  const displayedName = customStudentName !== null ? customStudentName : defaultName;

  return (
    <div className="relative min-h-[calc(100vh-180px)] flex flex-col justify-center items-center text-center px-4 py-4 sm:py-6 max-w-5xl mx-auto">
      {/* Top Academic Metadata Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#20D6C2]/30 bg-[#121D29]/80 backdrop-blur-md mb-4 shadow-lg shadow-[#20D6C2]/5">
        <GraduationCap className="w-4 h-4 text-[#20D6C2]" />
        <span className="text-xs font-mono font-medium text-slate-300">
          {language === 'ar' ? introData.departmentAr : introData.departmentEn}
        </span>
        <span className="text-slate-600">•</span>
        <span className="text-xs font-mono text-[#20D6C2] font-semibold">
          {language === 'ar' ? introData.courseAr : introData.courseEn}
        </span>
      </div>

      {/* Main Title */}
      <h1
        className={`font-extrabold tracking-tight text-[#F4F7FA] mb-4 ${
          isPresentationMode ? 'text-4xl sm:text-6xl lg:text-7xl' : 'text-3xl sm:text-5xl lg:text-6xl'
        }`}
      >
        <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          {language === 'ar' ? introData.titleAr : introData.titleEn}
        </span>
      </h1>

      {/* Subtitle */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="h-[1px] w-8 sm:w-16 bg-[#20D6C2]/40" />
        <h2
          className={`font-semibold tracking-wide text-[#20D6C2] uppercase font-mono ${
            isPresentationMode ? 'text-xl sm:text-2xl' : 'text-base sm:text-xl'
          }`}
        >
          {language === 'ar' ? introData.subtitleAr : introData.subtitleEn}
        </h2>
        <div className="h-[1px] w-8 sm:w-16 bg-[#20D6C2]/40" />
      </div>

      {/* Supporting Text */}
      <p
        className={`text-slate-300 max-w-2xl mx-auto mb-5 leading-relaxed ${
          isPresentationMode ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
        }`}
      >
        {language === 'ar' ? introData.supportingAr : introData.supportingEn}
      </p>

      {/* Presenter & Academic Details Card */}
      <div className="w-full max-w-xl p-4 sm:p-5 rounded-2xl bg-[#121D29] border border-slate-800 shadow-xl mb-5 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#20D6C2]/10 border border-[#20D6C2]/20 flex items-center justify-center text-[#20D6C2] flex-shrink-0 mt-0.5">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {language === 'ar' ? 'مقدم العرض / الطالب' : 'Presenter / Student'}
              </div>
              {isEditingName ? (
                <input
                  type="text"
                  value={displayedName}
                  onChange={(e) => setCustomStudentName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                  className="mt-1 w-full bg-slate-900 border border-[#20D6C2]/50 rounded px-2 py-0.5 text-xs text-white font-medium focus:outline-none"
                />
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="font-medium text-slate-100 text-sm mt-0.5 cursor-pointer hover:text-[#20D6C2] transition-colors flex items-center gap-1.5"
                  title={language === 'ar' ? 'انقر لتعديل اسم الطالب' : 'Click to edit student name'}
                >
                  <span>{displayedName}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ({language === 'ar' ? 'تعديل' : 'edit'})
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFB454]/10 border border-[#FFB454]/20 flex items-center justify-center text-[#FFB454] flex-shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {language === 'ar' ? 'المدة الزمنية المقدرة' : 'Target Duration'}
              </div>
              <div className="font-medium text-slate-100 text-sm mt-0.5 font-mono">
                {language === 'ar' ? introData.estimatedTimeAr : introData.estimatedTimeEn}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-2xl bg-gradient-to-r from-[#20D6C2] to-[#12b9a7] text-[#0B1118] font-bold text-sm sm:text-base shadow-xl shadow-[#20D6C2]/20 hover:shadow-[#20D6C2]/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <Play className="w-5 h-5 fill-current transition-transform group-hover:translate-x-0.5" />
        <span>{language === 'ar' ? 'بدء العرض التقديمي' : 'Start Presentation'}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-[#0B1118]/20 font-mono font-semibold">
          {language === 'ar' ? '10 شرائح' : '10 Slides'}
        </span>
      </button>

      {/* Academic Classroom Notice */}
      <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 font-mono">
        <BookOpen className="w-3.5 h-3.5 text-[#20D6C2]" />
        <span>
          {language === 'ar'
            ? 'مجهز للعرض على شاشات البروجكتر الجامعية (استخدم الأسهم للتنقل)'
            : 'Optimized for university projector & defense (Use arrow keys to navigate)'}
        </span>
      </div>
    </div>
  );
};
