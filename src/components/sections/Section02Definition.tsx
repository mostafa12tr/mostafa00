import React, { useState } from 'react';
import { Laptop, Server, Skull, ArrowRight, ShieldAlert, Info, Radio, Target } from 'lucide-react';
import { Language } from '../../types.ts';
import { definitionData } from '../../data/presentationContent.ts';

interface Props {
  language: Language;
  isPresentationMode: boolean;
}

export const Section02Definition: React.FC<Props> = ({ language, isPresentationMode }) => {
  const [selectedEntity, setSelectedEntity] = useState<'client' | 'attacker' | 'server'>('attacker');

  const parties = definitionData.parties;
  const clientInfo = language === 'ar' ? parties.clientAr : parties.clientEn;
  const attackerInfo = language === 'ar' ? parties.attackerAr : parties.attackerEn;
  const serverInfo = language === 'ar' ? parties.serverAr : parties.serverEn;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center mb-5">
        <span className="text-xs font-mono font-bold text-[#20D6C2] uppercase tracking-wider px-2.5 py-1 rounded bg-[#20D6C2]/10 border border-[#20D6C2]/20">
          SECTION 02
        </span>
        <h2
          className={`font-extrabold text-[#F4F7FA] mt-2 mb-1.5 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar' ? 'ما هو هجوم رجل في المنتصف (MITM)؟' : 'What is a MITM Attack?'}
        </h2>
      </div>

      {/* Formal Definition & Objective Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#121D29] border border-[#20D6C2]/30 shadow-xl mb-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#20D6C2]" />
        <div className="space-y-3.5">
          {/* Definition */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#20D6C2]/15 border border-[#20D6C2]/30 flex items-center justify-center text-[#20D6C2] flex-shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#20D6C2] font-bold">
                  {language === 'ar' ? 'التعريف:' : 'Definition / التعريف:'}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#20D6C2]/10 text-[#20D6C2] border border-[#20D6C2]/20">
                  Academic Concept
                </span>
              </div>
              <p
                className={`text-slate-100 font-medium leading-relaxed ${
                  isPresentationMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                }`}
              >
                {language === 'ar' ? definitionData.definitionAr : definitionData.definitionEn}
              </p>
              {language === 'en' && (
                <p className="text-xs text-[#20D6C2]/90 mt-1.5 font-medium border-t border-slate-800/60 pt-1.5 text-right" dir="rtl">
                  <span className="font-bold ml-1 text-[#20D6C2]">التعريف:</span> {definitionData.definitionAr}
                </p>
              )}
            </div>
          </div>

          {/* Goal / Objective */}
          <div className="flex items-start gap-3 pt-3 border-t border-slate-800/80">
            <div className="w-8 h-8 rounded-lg bg-[#FFB454]/15 border border-[#FFB454]/30 flex items-center justify-center text-[#FFB454] flex-shrink-0 mt-0.5">
              <Target className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#FFB454] font-bold">
                  {language === 'ar' ? 'الهدف:' : 'Goal & Objective / الهدف:'}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFB454]/10 text-[#FFB454] border border-[#FFB454]/20">
                  Attacker Motive
                </span>
              </div>
              <p
                className={`text-slate-200 font-medium leading-relaxed ${
                  isPresentationMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                }`}
              >
                {language === 'ar' ? definitionData.goalAr : definitionData.goalEn}
              </p>
              {language === 'en' && (
                <p className="text-xs text-[#FFB454]/90 mt-1.5 font-medium border-t border-slate-800/60 pt-1.5 text-right" dir="rtl">
                  <span className="font-bold ml-1 text-[#FFB454]">الهدف:</span> {definitionData.goalAr}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Visual Diagram Container */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#121D29] border border-slate-800 shadow-2xl mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#20D6C2]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>
              {language === 'ar'
                ? 'مخطط هجوم رجل في المنتصف (قطع الاتصال الأصلي والتحويل عبر المهاجم)'
                : 'MITM Attack Model: Severed Original Connection & Intermediary Reroute'}
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            Attack Architecture
          </span>
        </div>

        {/* Image Display Frame */}
        <div className="w-full bg-white rounded-xl p-3 sm:p-4 flex items-center justify-center shadow-inner overflow-hidden border border-slate-200/20">
          <img
            src="/assets/aistudio/image_c8afecfc.png"
            alt="Man in the Middle Attack Architecture: Original connection between User and Server broken, new connection routed through Attacker"
            className="max-h-[260px] sm:max-h-[300px] w-auto object-contain mx-auto transition-transform hover:scale-[1.02]"
            loading="eager"
          />
        </div>
      </div>

      {/* Explanation of the 3 Key Parties (User, Attacker, Server) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Entity 1: User / Client */}
        <div className="p-4 rounded-xl bg-[#121D29] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                  {language === 'ar' ? 'الطرف الأول' : 'Originating Party'}
                </span>
                <h4 className="text-xs font-bold text-white">
                  {language === 'ar' ? 'المستخدم / العميل (User)' : 'User / Client'}
                </h4>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {clientInfo.desc}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
            IP: {parties.clientEn.ip}
          </div>
        </div>

        {/* Entity 2: Attacker */}
        <div className="p-4 rounded-xl bg-[#121D29] border border-[#FFB454]/40 flex flex-col justify-between relative shadow-lg shadow-[#FFB454]/5">
          <div className="absolute -top-2.5 right-4 px-2 py-0.2 rounded-full bg-[#FFB454] text-[#0B1118] text-[9px] font-mono font-bold uppercase">
            {language === 'ar' ? 'الوسيط الخفي' : 'Intermediary'}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFB454]/15 border border-[#FFB454]/30 flex items-center justify-center text-[#FFB454]">
                <Skull className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#FFB454] font-bold block">
                  {language === 'ar' ? 'الطرف المعترض' : 'Untrusted Intermediary'}
                </span>
                <h4 className="text-xs font-bold text-white">
                  {language === 'ar' ? 'المهاجم (Attacker)' : 'Attacker'}
                </h4>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {attackerInfo.desc}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-[#FFB454]">
            IP: {parties.attackerEn.ip}
          </div>
        </div>

        {/* Entity 3: Server */}
        <div className="p-4 rounded-xl bg-[#121D29] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  {language === 'ar' ? 'الطرف المستهدف' : 'Destination Endpoint'}
                </span>
                <h4 className="text-xs font-bold text-white">
                  {language === 'ar' ? 'الخادم (Server)' : 'Server'}
                </h4>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {serverInfo.desc}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500">
            IP: {parties.serverEn.ip}
          </div>
        </div>
      </div>
    </div>
  );
};
