import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Laptop,
  Server,
  Skull,
  ShieldCheck,
  AlertTriangle,
  Eye,
  CheckCircle2,
  LockOpen,
  ArrowRight,
  ArrowLeft,
  XCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { Language } from '../../types.ts';
import { howItWorksStages } from '../../data/presentationContent.ts';

interface Props {
  language: Language;
  isPresentationMode: boolean;
}

export const Section03HowItWorks: React.FC<Props> = ({ language, isPresentationMode }) => {
  const [activeStage, setActiveStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const currentStage = howItWorksStages.find((s) => s.stage === activeStage) || howItWorksStages[0];

  const stageIcons = [
    <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    <AlertTriangle className="w-5 h-5 text-amber-400" />,
    <Eye className="w-5 h-5 text-rose-400" />,
    <CheckCircle2 className="w-5 h-5 text-[#20D6C2]" />,
  ];

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="text-xs font-mono font-bold text-[#20D6C2] uppercase tracking-wider px-2.5 py-1 rounded bg-[#20D6C2]/10 border border-[#20D6C2]/20">
          SECTION 03
        </span>
        <h2
          className={`font-extrabold text-[#F4F7FA] mt-2 mb-1.5 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar' ? 'كيف يعمل هجوم رجل في المنتصف؟' : 'How Does MITM Work?'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          {language === 'ar'
            ? 'شرح مبسط وتفاعلي لمراحل الهجوم الأربعة وكيف تقع الضحية في الفخ دون أن تشعر'
            : 'Interactive step-by-step breakdown of the 4 sequential attack phases and how interception occurs'}
        </p>
      </div>

      {/* 4 Interactive Step Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
        {howItWorksStages.map((stg, idx) => {
          const isActive = stg.stage === activeStage;
          return (
            <button
              key={stg.stage}
              onClick={() => {
                setActiveStage(stg.stage);
                setIsPlaying(false);
              }}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                isActive
                  ? 'border-[#20D6C2] bg-[#162534] shadow-lg shadow-[#20D6C2]/15'
                  : 'border-slate-800 bg-[#121D29]/90 hover:border-slate-700 text-slate-400 hover:bg-[#152230]'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#20D6C2] to-teal-400" />
              )}
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isActive
                      ? 'bg-[#20D6C2]/20 text-[#20D6C2] border border-[#20D6C2]/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {language === 'ar' ? `المرحلة ${stg.stage}` : `Phase ${stg.stage}`}
                </span>
                <div className="flex-shrink-0">{stageIcons[idx]}</div>
              </div>
              <div
                className={`text-xs font-bold leading-snug line-clamp-2 ${
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                }`}
              >
                {language === 'ar' ? stg.titleAr : stg.titleEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Visual Canvas */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#121D29] border border-slate-800 shadow-2xl mb-5 relative overflow-hidden">
        {/* Controls Bar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#20D6C2] animate-ping" />
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>{language === 'ar' ? currentStage.titleAr : currentStage.titleEn}</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStage((prev) => (prev > 1 ? prev - 1 : 4))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Previous Phase"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#FFB454]" /> : <Play className="w-3.5 h-3.5 text-[#20D6C2]" />}
              <span>
                {isPlaying
                  ? language === 'ar' ? 'إيقاف مؤقت' : 'Pause'
                  : language === 'ar' ? 'تشغيل تلقائي' : 'Auto-Play'}
              </span>
            </button>
            <button
              onClick={() => setActiveStage((prev) => (prev < 4 ? prev + 1 : 1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Next Phase"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clear Educational Architecture Diagram with Physical Cables (Always Left-to-Right: User on Left, Server on Right) */}
        <div
          dir="ltr"
          className="relative py-4 px-2 sm:px-6 bg-[#0B1118]/90 rounded-2xl border border-slate-800/80 min-h-[340px] sm:min-h-[330px] flex flex-col justify-between overflow-hidden shadow-inner"
        >
          {/* Dynamic SVG Physical Cables Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 330"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* STAGE 1: Direct Normal Cable Between User and Server */}
            {activeStage === 1 && (
              <g>
                {/* Thick background cable */}
                <line x1="160" y1="58" x2="640" y2="58" stroke="#042F2E" strokeWidth="8" strokeLinecap="round" />
                {/* Glowing neon core */}
                <line
                  x1="160"
                  y1="58"
                  x2="640"
                  y2="58"
                  stroke="#20D6C2"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#glow-cyan)"
                />
                {/* Animated traveling packet: User ➔ Server and returns upon arrival */}
                <circle r="6" fill="#FFFFFF" filter="url(#glow-cyan)">
                  <animate
                    attributeName="cx"
                    values="160;640;640;160;160"
                    keyTimes="0;0.46;0.50;0.96;1"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="58;58;58;58;58"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )}

            {/* STAGES 2, 3, 4: Severed Direct Route + Physical Cables Routing Through Attacker */}
            {activeStage >= 2 && (
              <g>
                {/* Severed Direct Line */}
                <line
                  x1="160"
                  y1="58"
                  x2="640"
                  y2="58"
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  opacity="0.35"
                />

                {/* === CABLE 1: User ──> Attacker (Left side to Center) === */}
                {/* Outer thick cable casing */}
                <path
                  d="M 140 95 C 140 205, 250 235, 330 235"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                {/* Glowing neon signal wire */}
                <path
                  d="M 140 95 C 140 205, 250 235, 330 235"
                  fill="none"
                  stroke={activeStage === 3 ? '#F43F5E' : '#FFB454'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter={activeStage === 3 ? 'url(#glow-rose)' : 'url(#glow-amber)'}
                />
                {/* Single Animated Packet: Goes User ➔ Attacker ➔ Server, and upon arrival returns Server ➔ Attacker ➔ User */}
                <circle r="6.5" fill="#FFFFFF" filter={activeStage === 3 ? 'url(#glow-rose)' : 'url(#glow-cyan)'}>
                  <animateMotion
                    dur={activeStage === 3 ? '3.5s' : '4s'}
                    repeatCount="indefinite"
                    keyPoints="0;0.5;0.5;1;1"
                    keyTimes="0;0.46;0.50;0.96;1"
                    calcMode="linear"
                    path="M 140 95 C 140 205, 250 235, 330 235 L 470 235 C 550 235, 660 205, 660 95 C 660 205, 550 235, 470 235 L 330 235 C 250 235, 140 205, 140 95"
                  />
                </circle>
              </g>
            )}
          </svg>

          {/* Top Row: User (Left) <===> Status (Center) <===> Server (Right) */}
          <div className="flex items-center justify-between relative px-2 sm:px-6 z-10">
            {/* 1. Client Node (Always on the LEFT) */}
            <div className="flex flex-col items-center w-28 sm:w-36 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-500/15 border-2 border-sky-400/50 flex items-center justify-center text-sky-400 shadow-lg shadow-sky-500/10">
                <Laptop className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="text-xs font-bold text-white mt-1.5" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 'المستخدم (الضحية)' : 'User (Victim)'}
              </span>
              <span className="text-[10px] font-mono text-sky-400">192.168.1.45</span>
            </div>

            {/* Direct Connection Status Indicator (Center) */}
            <div className="flex-1 px-4 flex flex-col items-center justify-center relative">
              {activeStage === 1 ? (
                <div className="text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'سلك الاتصال المباشر (سليم وآمن)' : 'Direct Legitimate Wire (Secure)'}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold shadow-lg shadow-rose-500/10 animate-pulse">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>{language === 'ar' ? 'انقطع الاتصال المباشر! يمر السلك عبر المهاجم' : 'Direct Connection Cut! Routed via Attacker Cable'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Server Node (Always on the RIGHT) */}
            <div className="flex flex-col items-center w-28 sm:w-36 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/15 border-2 border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                <Server className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="text-xs font-bold text-white mt-1.5" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 'الخادم الحقيقي' : 'Real Server'}
              </span>
              <span className="text-[10px] font-mono text-emerald-400">104.21.32.90</span>
            </div>
          </div>

          {/* Bottom Center Node: The Attacker in the Middle */}
          <div className="flex justify-center pb-1 z-10 relative">
            <div
              className={`p-3 sm:p-3.5 rounded-2xl border transition-all max-w-lg w-full text-center ${
                activeStage === 1
                  ? 'border-slate-800 bg-slate-900/40 opacity-40'
                  : activeStage === 3
                  ? 'border-rose-500 bg-rose-950/40 shadow-xl shadow-rose-500/15 ring-2 ring-rose-500/30'
                  : 'border-[#FFB454] bg-[#162534] shadow-xl shadow-[#FFB454]/10'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    activeStage === 1
                      ? 'bg-slate-800 text-slate-500'
                      : activeStage === 3
                      ? 'bg-rose-500/20 text-rose-400 animate-pulse'
                      : 'bg-[#FFB454]/20 text-[#FFB454]'
                  }`}
                >
                  <Skull className="w-4 h-4" />
                </div>
                <div className="text-left rtl:text-right">
                  <div
                    className={`text-xs font-bold ${
                      activeStage === 1
                        ? 'text-slate-500'
                        : activeStage === 3
                        ? 'text-rose-400'
                        : 'text-[#FFB454]'
                    }`}
                  >
                    {language === 'ar' ? 'المهاجم في المنتصف (MITM Attacker)' : 'Attacker in the Middle (MITM)'}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">IP: 192.168.1.99 • في مسار السلكين</div>
                </div>
              </div>

              {/* Status Message Inside Attacker Box */}
              <div className="text-xs font-medium text-slate-200 mt-1.5" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {activeStage === 1 && (
                  <span className="text-slate-500 text-[11px]">
                    {language === 'ar' ? '⚪ المهاجم غير متصل بالأسلاك حالياً' : '⚪ Disconnected from wire path'}
                  </span>
                )}
                {activeStage === 2 && (
                  <span className="text-amber-300 text-[11px] font-mono">
                    {language === 'ar'
                      ? '⚠️ السلك يمر الآن عبر المهاجم بعد تسميم ARP/DNS، وكل البيانات تجبر على دخول جهازه أولاً!'
                      : '⚠️ Wire now re-routed through attacker via ARP/DNS poisoning; all packets pass here!'}
                  </span>
                )}
                {activeStage === 3 && (
                  <div className="bg-rose-950/70 p-2 rounded-lg border border-rose-500/40 text-left rtl:text-right mt-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-300 mb-1">
                      <LockOpen className="w-3.5 h-3.5 text-rose-400" />
                      <span>{language === 'ar' ? 'قراءة محتوى السلك غير المشفر:' : 'Sniffing Unencrypted Wire Payload:'}</span>
                    </div>
                    <div className="font-mono text-[10px] space-y-0.5 text-slate-200 bg-[#0B1118]/90 p-1.5 rounded border border-rose-500/30" dir="ltr">
                      <div><span className="text-slate-400">User:</span> <span className="text-sky-300">student@uni.edu</span></div>
                      <div><span className="text-slate-400">Password:</span> <span className="text-rose-400 font-bold">P@ssw0rd2026</span></div>
                      <div><span className="text-slate-400">Action:</span> <span className="text-amber-300">Transfer $500</span></div>
                    </div>
                  </div>
                )}
                {activeStage === 4 && (
                  <span className="text-[#20D6C2] text-[11px] font-mono">
                    {language === 'ar'
                      ? '🔄 يمرر المهاجم البيانات عبر السلك الثاني للخادم ويعيد الاستجابة للضحية خلسة!'
                      : '🔄 Relaying packets through the second wire to server and returning response stealthily!'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Perspectives: What each party experiences in this phase */}
      <div className="mb-5">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#20D6C2]" />
          <span>
            {language === 'ar'
              ? 'ماذا يحدث لكل طرف في هذه اللحظة؟ (منظور الأطراف الثلاثة)'
              : 'What Happens to Each Party at This Moment?'}
          </span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* 1. Victim Perspective */}
          <div className="p-3.5 rounded-xl bg-[#121D29] border border-sky-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Laptop className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-sky-400">
                  {language === 'ar' ? 'منظور الضحية (المستخدم)' : "Victim's Perspective"}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ar' ? currentStage.victimViewAr : currentStage.victimViewEn}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] font-mono text-sky-400/80">
              {language === 'ar' ? 'الحالة: لا يظهر أي إنذار خطأ' : 'Status: Normal User Experience'}
            </div>
          </div>

          {/* 2. Attacker Perspective */}
          <div className="p-3.5 rounded-xl bg-[#121D29] border border-[#FFB454]/30 flex flex-col justify-between shadow-md shadow-[#FFB454]/5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-[#FFB454]/20 text-[#FFB454] flex items-center justify-center">
                  <Skull className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#FFB454]">
                  {language === 'ar' ? 'فعل المهاجم (الوسيط الخفي)' : "Attacker's Action"}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ar' ? currentStage.attackerActionAr : currentStage.attackerActionEn}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] font-mono text-[#FFB454]">
              {language === 'ar' ? 'الحالة: اعتراض صامت لحركة المرور' : 'Status: Covert In-Line Control'}
            </div>
          </div>

          {/* 3. Server Perspective */}
          <div className="p-3.5 rounded-xl bg-[#121D29] border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Server className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-emerald-400">
                  {language === 'ar' ? 'منظور الخادم (الوجهة)' : "Server's Perspective"}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'ar' ? currentStage.serverViewAr : currentStage.serverViewEn}
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] font-mono text-emerald-400/80">
              {language === 'ar' ? 'الحالة: يستقبل الطلب وينفذه بشكل روتيني' : 'Status: Routine Request Processing'}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Takeaway Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#20D6C2]/10 via-[#121D29] to-[#20D6C2]/10 border border-[#20D6C2]/30 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#20D6C2]/20 border border-[#20D6C2]/40 flex items-center justify-center text-[#20D6C2] flex-shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#20D6C2] font-bold block mb-0.5">
            {language === 'ar' ? 'الخلاصة الأكاديمية للمرحلة:' : 'Core Academic Takeaway:'}
          </span>
          <p className="text-xs sm:text-sm text-slate-200 font-medium">
            {language === 'ar' ? currentStage.takeawayAr : currentStage.takeawayEn}
          </p>
        </div>
      </div>
    </div>
  );
};
