import React, { useState } from 'react';
import {
  Network,
  Shield,
  Search,
  AlertTriangle,
  Lock,
  Cpu,
  Info,
  ShieldCheck,
  FlaskConical,
  Filter,
} from 'lucide-react';
import { Language, SecurityTool } from '../../types.ts';
import { toolsData } from '../../data/presentationContent.ts';

interface Props {
  language: Language;
  isPresentationMode: boolean;
}

export const Section06Tools: React.FC<Props> = ({ language, isPresentationMode }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'testing' | 'defense'>('all');

  const filteredTools =
    filterCategory === 'all'
      ? toolsData
      : toolsData.filter((t) => t.category === filterCategory);

  const getToolIcon = (iconName: SecurityTool['iconName']) => {
    switch (iconName) {
      case 'network':
        return <Network className="w-5 h-5 text-amber-400" />;
      case 'search':
        return <Search className="w-5 h-5 text-amber-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-[#20D6C2]" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-[#20D6C2]" />;
      case 'lock':
        return <Lock className="w-5 h-5 text-[#20D6C2]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#20D6C2]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-mono font-bold text-[#20D6C2] uppercase tracking-wider px-2.5 py-1 rounded bg-[#20D6C2]/10 border border-[#20D6C2]/20">
          SECTION 06
        </span>
        <h2
          className={`font-extrabold text-[#F4F7FA] mt-2 mb-2 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar'
            ? 'الأدوات المستخدمة في اختبار ودفاع هجمات MITM'
            : 'Tools Used in MITM Testing and Defense'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          {language === 'ar'
            ? 'التمييز الأكاديمي الصارم بين أدوات التحليل المخبري المصرح بها ومنظومات الحماية والدفاع'
            : 'Clear academic demarcation between authorized assessment frameworks and defensive counter-technologies'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            filterCategory === 'all'
              ? 'bg-[#20D6C2] text-[#0B1118] font-bold shadow-md shadow-[#20D6C2]/20'
              : 'bg-[#121D29] border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {language === 'ar' ? 'جميع الأدوات (6)' : 'All Tools (6)'}
        </button>
        <button
          onClick={() => setFilterCategory('testing')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
            filterCategory === 'testing'
              ? 'bg-[#FFB454] text-[#0B1118] font-bold shadow-md shadow-[#FFB454]/20'
              : 'bg-[#121D29] border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'أدوات الاختبار والتحليل (3)' : 'Testing & Analysis (3)'}</span>
        </button>
        <button
          onClick={() => setFilterCategory('defense')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
            filterCategory === 'defense'
              ? 'bg-[#20D6C2] text-[#0B1118] font-bold shadow-md shadow-[#20D6C2]/20'
              : 'bg-[#121D29] border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'أدوات الكشف والدفاع (3)' : 'Detection & Defense (3)'}</span>
        </button>
      </div>

      {/* Tools Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredTools.map((tool) => {
          const isDefense = tool.category === 'defense';
          return (
            <div
              key={tool.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isDefense
                  ? 'border-[#20D6C2]/30 bg-[#121D29] hover:border-[#20D6C2]/60'
                  : 'border-[#FFB454]/30 bg-[#121D29] hover:border-[#FFB454]/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDefense ? 'bg-[#20D6C2]/10 border border-[#20D6C2]/30' : 'bg-[#FFB454]/10 border border-[#FFB454]/30'
                    }`}
                  >
                    {getToolIcon(tool.iconName)}
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                      isDefense
                        ? 'bg-[#20D6C2]/15 text-[#20D6C2] border border-[#20D6C2]/30'
                        : 'bg-[#FFB454]/15 text-[#FFB454] border border-[#FFB454]/30'
                    }`}
                  >
                    {language === 'ar' ? tool.badgeAr : tool.badgeEn}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white mb-1.5 flex items-center gap-2">
                  <span>{tool.name}</span>
                </h3>

                <p className="text-xs font-semibold text-slate-200 mb-2 leading-relaxed">
                  {language === 'ar' ? tool.purposeAr : tool.purposeEn}
                </p>

                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                  {language === 'ar' ? tool.detailsAr : tool.detailsEn}
                </p>
              </div>

              {tool.isPacketAnalyzerOnly && (
                <div className="mt-3 p-2 rounded-lg bg-sky-950/40 border border-sky-800/50 flex items-start gap-1.5 text-[10px] text-sky-300">
                  <Info className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar'
                      ? 'توضيح أكاديمي: Wireshark أداة تشخيص سلبية لتحليل الحزم ولا تنفذ أي هجوم MITM.'
                      : 'Academic Note: Wireshark is purely a passive analyzer and diagnostic tool, not an attack weapon.'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ethical Research & Laboratory Boundary Banner */}
      <div className="p-4 rounded-xl bg-[#0B1118] border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
        <Info className="w-5 h-5 text-[#20D6C2] flex-shrink-0" />
        <p className="leading-relaxed">
          {language === 'ar'
            ? 'ميثاق الأخلاقيات الأكاديمية: يتم تشغيل أدوات التقييم (Ettercap / Bettercap) حصراً في مختبرات جامعية معزولة ومصرح بها بهدف فحص استجابة أنظمة الدفاع. لا يتضمن هذا العرض أي أوامر هجومية أو برمجيات خبيثة.'
            : 'Ethical Academic Statement: Testing frameworks are utilized exclusively within controlled, isolated university lab environments to audit defense mechanisms. No exploit commands or real-world interception instructions are presented.'}
        </p>
      </div>
    </div>
  );
};
