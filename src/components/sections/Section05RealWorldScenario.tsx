import React, { useState } from 'react';
import {
  Wifi,
  Laptop,
  Server,
  Skull,
  AlertOctagon,
  ArrowRight,
  ShieldAlert,
  Coffee,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../../types.ts';
import { publicWifiScenario } from '../../data/presentationContent.ts';

interface Props {
  language: Language;
  isPresentationMode: boolean;
}

export const Section05RealWorldScenario: React.FC<Props> = ({ language, isPresentationMode }) => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = language === 'ar' ? publicWifiScenario.stepsAr : publicWifiScenario.stepsEn;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-mono font-bold text-[#FFB454] uppercase tracking-wider px-2.5 py-1 rounded bg-[#FFB454]/10 border border-[#FFB454]/20">
          SECTION 05
        </span>
        <h2
          className={`font-extrabold text-[#F4F7FA] mt-2 mb-2 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar' ? publicWifiScenario.titleAr : publicWifiScenario.titleEn}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          {language === 'ar' ? publicWifiScenario.subtitleAr : publicWifiScenario.subtitleEn}
        </p>
      </div>

      {/* Golden Rule Warning Banner (Prominent Requirement) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-[#121D29] to-amber-500/20 border-2 border-[#FFB454] shadow-xl shadow-[#FFB454]/10 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#FFB454]/20 border border-[#FFB454] flex items-center justify-center text-[#FFB454] flex-shrink-0">
          <AlertOctagon className="w-7 h-7" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB454] font-bold">
            {language === 'ar' ? 'القاعدة الذهبية لأمن الشبكات العامة' : 'CYBERSECURITY GOLDEN PRINCIPLE'}
          </span>
          <h3 className="text-base sm:text-xl font-extrabold text-white">
            "{language === 'ar' ? publicWifiScenario.goldenRuleAr : publicWifiScenario.goldenRuleEn}"
          </h3>
        </div>
      </div>

      {/* Network Scenario Architecture & Illustrations */}
      <div className="p-6 rounded-2xl bg-[#121D29] border border-slate-800 shadow-2xl mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Coffee className="w-4 h-4 text-[#FFB454]" />
            <span>
              {language === 'ar'
                ? 'محيط بيئة الشبكة: مقهى الحرم الجامعي (نقطة وصول مفتوحة)'
                : 'Scenario Context: Campus Cafeteria / Open Public Wi-Fi Hotspot'}
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            SSID: Campus_Guest_Free
          </span>
        </div>

        {/* Visual Architecture Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center py-4 relative">
          {/* 1. Student Laptop */}
          <div
            onClick={() => setActiveStep(1)}
            className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
              activeStep === 1
                ? 'border-[#20D6C2] bg-[#20D6C2]/15 shadow-lg'
                : 'border-slate-800 bg-[#0B1118]/80 hover:border-slate-700'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2">
              <Laptop className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-white">1. Student Laptop</h4>
            <p className="text-[11px] text-slate-400 mt-1">Accessing university portal</p>
          </div>

          {/* 2. Public Wi-Fi Access Point */}
          <div
            onClick={() => setActiveStep(2)}
            className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
              activeStep === 2
                ? 'border-[#20D6C2] bg-[#20D6C2]/15 shadow-lg'
                : 'border-slate-800 bg-[#0B1118]/80 hover:border-slate-700'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
              <Wifi className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-white">2. Public Wi-Fi AP</h4>
            <p className="text-[11px] text-slate-400 mt-1">Open broadcast, no isolation</p>
          </div>

          {/* 3. Intermediary Threat */}
          <div
            onClick={() => setActiveStep(3)}
            className={`p-4 rounded-xl border text-center cursor-pointer transition-all relative ${
              activeStep === 3
                ? 'border-red-500 bg-red-500/15 shadow-lg ring-1 ring-red-500'
                : 'border-red-500/30 bg-[#0B1118]/80 hover:border-red-500/60'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 mb-2">
              <Skull className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-red-400">3. Intermediary Threat</h4>
            <p className="text-[11px] text-slate-400 mt-1">Sniffing local broadcast</p>
          </div>

          {/* 4. University Destination Server */}
          <div
            onClick={() => setActiveStep(4)}
            className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
              activeStep === 4
                ? 'border-[#20D6C2] bg-[#20D6C2]/15 shadow-lg'
                : 'border-slate-800 bg-[#0B1118]/80 hover:border-slate-700'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              <Server className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-white">4. Destination Server</h4>
            <p className="text-[11px] text-slate-400 mt-1">University Cloud Portal</p>
          </div>
        </div>

        {/* Step-by-Step Narrative Walkthrough */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="text-xs font-mono text-[#20D6C2] uppercase font-bold tracking-wider mb-3">
            {language === 'ar' ? 'تسلسل السيناريو الأكاديمي:' : 'Scenario Walkthrough Sequence:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((st) => (
              <div
                key={st.step}
                onClick={() => setActiveStep(st.step)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeStep === st.step
                    ? 'border-[#20D6C2] bg-[#0B1118]'
                    : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                      activeStep === st.step
                        ? 'bg-[#20D6C2] text-[#0B1118]'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {st.step}
                  </span>
                  <h5 className="text-xs font-bold text-slate-200 truncate">{st.title}</h5>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sensitive Data at Risk Callout Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#121D29] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#FFB454] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white">
              {language === 'ar' ? 'البيانات الحساسة المعرضة للخطر في هذا السيناريو:' : 'Sensitive Data Exposed in this Scenario:'}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {language === 'ar'
                ? 'بيانات تسجيل الدخول للجامعة، ملفات الكوكيز للجلسات النشطة، مراسلات البريد الإلكتروني غير المشفرة، والملفات الأكاديمية الشخصية.'
                : 'Campus portal login credentials, active session tokens, unencrypted student emails, and academic submissions.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
