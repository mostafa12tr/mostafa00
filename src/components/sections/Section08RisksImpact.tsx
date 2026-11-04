import React from 'react';
import { Database, EyeOff, UserX, DollarSign, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { Language, RiskItem } from '../../types.ts';
import { risksData } from '../../data/presentationContent.ts';

interface Props {
  language: Language;
  isPresentationMode: boolean;
}

export const Section08RisksImpact: React.FC<Props> = ({ language, isPresentationMode }) => {
  const getRiskIcon = (icon: RiskItem['icon']) => {
    switch (icon) {
      case 'data':
        return <Database className="w-6 h-6 text-[#20D6C2]" />;
      case 'privacy':
        return <EyeOff className="w-6 h-6 text-sky-400" />;
      case 'account':
        return <UserX className="w-6 h-6 text-[#FFB454]" />;
      case 'finance':
        return <DollarSign className="w-6 h-6 text-emerald-400" />;
      default:
        return <AlertOctagon className="w-6 h-6 text-[#20D6C2]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-mono font-bold text-[#FFB454] uppercase tracking-wider px-2.5 py-1 rounded bg-[#FFB454]/10 border border-[#FFB454]/20">
          SECTION 08
        </span>
        <h2
          className={`font-extrabold text-[#F4F7FA] mt-2 mb-2 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar' ? 'المخاطر والتأثير الأمني' : 'Risks and Impact'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          {language === 'ar'
            ? 'الأضرار الوخيمة المترتبة على نجاح اعتراض قنوات الاتصال على الأفراد والمؤسسات'
            : 'Evaluating the systemic consequences of successful interception on confidentiality, integrity, and asset security'}
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {risksData.map((risk) => (
          <div
            key={risk.id}
            className="p-6 rounded-2xl bg-[#121D29] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                  {getRiskIcon(risk.icon)}
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800/90 text-[#FFB454] border border-[#FFB454]/30 font-bold">
                  {language === 'ar' ? risk.impactLevelAr : risk.impactLevelEn}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {language === 'ar' ? risk.titleAr : risk.titleEn}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {language === 'ar' ? risk.descriptionAr : risk.descriptionEn}
              </p>
            </div>

            {/* Real-World Concrete Examples */}
            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                {language === 'ar' ? 'أمثلة واقعية على التأثير:' : 'Concrete Impact Scenarios:'}
              </span>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {(language === 'ar' ? risk.examplesAr : risk.examplesEn).map((ex, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#20D6C2]" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Banner */}
      <div className="p-4 rounded-xl bg-[#0B1118] border border-slate-800 flex items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <span>
          {language === 'ar'
            ? 'الخلاصة: لا يقتصر هجوم MITM على التنصت السلبي، بل يمتد للتلاعب النشط بالحسابات والأموال.'
            : 'Key Takeaway: MITM extends beyond passive eavesdropping into active session impersonation and financial fraud.'}
        </span>
        <span className="text-[#FFB454] font-bold">CIA Triad Impact: High</span>
      </div>
    </div>
  );
};
