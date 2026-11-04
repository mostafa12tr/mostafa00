import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { Language } from '../../types.ts';
import { detectionAndPrevention } from '../../data/presentationContent.ts';

interface Props {
  language: Language;
  isPresentationMode: boolean;
}

export const Section09DefensePrevention: React.FC<Props> = ({ language, isPresentationMode }) => {
  const [activeTab, setActiveTab] = useState<'lists' | 'comparison'>('lists');
  const [comparisonState, setComparisonState] = useState<'unprotected' | 'protected'>('protected');

  const detectionItems =
    language === 'ar' ? detectionAndPrevention.detectionAr : detectionAndPrevention.detectionEn;
  const preventionItems =
    language === 'ar' ? detectionAndPrevention.preventionAr : detectionAndPrevention.preventionEn;

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-mono font-bold text-[#20D6C2] uppercase tracking-wider px-2.5 py-1 rounded bg-[#20D6C2]/10 border border-[#20D6C2]/20">
          SECTION 09
        </span>
        <h2
          className={`font-extrabold text-[#F4F7FA] mt-2 mb-2 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar' ? 'الكشف والوقاية' : 'Detection and Prevention'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          {language === 'ar'
            ? 'الاستراتيجيات الدفاعية المتكاملة لكشف محاولات الاعتراض وحماية قنوات البيانات'
            : 'Comprehensive defensive framework for detecting interception attempts and hardening communication channels'}
        </p>
      </div>

      {/* View Switcher: Checklist vs Interactive Comparison */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('lists')}
          className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'lists'
              ? 'bg-[#20D6C2] text-[#0B1118] shadow-md shadow-[#20D6C2]/20'
              : 'bg-[#121D29] border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {language === 'ar' ? 'قوائم الكشف والوقاية' : 'Detection & Prevention Measures'}
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'comparison'
              ? 'bg-[#FFB454] text-[#0B1118] shadow-md shadow-[#FFB454]/20'
              : 'bg-[#121D29] border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {language === 'ar' ? 'مقارنة تفاعلية: غير محمي مقابل محمي' : 'Interactive Comparison Mode'}
        </button>
      </div>

      {activeTab === 'lists' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Column 1: Detection */}
          <div className="p-6 rounded-2xl bg-[#121D29] border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB454] font-bold">
                  {language === 'ar' ? 'رصد ومراقبة' : 'Network Monitoring'}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {language === 'ar' ? 'آليات الكشف والتشخيص' : 'Detection Strategies'}
                </h3>
              </div>
            </div>

            <ul className="space-y-3">
              {detectionItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1118] border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Prevention */}
          <div className="p-6 rounded-2xl bg-[#121D29] border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#20D6C2]/10 border border-[#20D6C2]/30 flex items-center justify-center text-[#20D6C2]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#20D6C2] font-bold">
                  {language === 'ar' ? 'حماية وتحصين' : 'Channel Hardening'}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {language === 'ar' ? 'سبل الوقاية والمكافحة' : 'Prevention Best Practices'}
                </h3>
              </div>
            </div>

            <ul className="space-y-3">
              {preventionItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1118] border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#20D6C2] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        /* Interactive Side-by-Side Comparison */
        <div className="p-6 rounded-2xl bg-[#121D29] border border-slate-800 shadow-2xl mb-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <button
              onClick={() => setComparisonState('unprotected')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                comparisonState === 'unprotected'
                  ? 'bg-amber-500 text-[#0B1118] font-bold shadow-md'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Unlock className="w-4 h-4" />
              <span>{language === 'ar' ? 'اتصال غير محمي (HTTP)' : 'Unprotected Communication'}</span>
            </button>

            <button
              onClick={() => setComparisonState('protected')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                comparisonState === 'protected'
                  ? 'bg-[#20D6C2] text-[#0B1118] font-bold shadow-md'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>{language === 'ar' ? 'اتصال محمي (TLS 1.3 / HSTS)' : 'Protected Communication'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0B1118] border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block mb-2">
                {language === 'ar' ? 'حالة القناة والبروتوكول:' : 'Channel Protocol & Security State:'}
              </span>
              <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                {comparisonState === 'protected' ? (
                  <>
                    <Lock className="w-4 h-4 text-[#20D6C2]" />
                    <span className="text-[#20D6C2]">HTTPS with TLS 1.3 + Signed X.509 Certificate</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400">Cleartext HTTP / Weak Ciphers / No Mutual Trust</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {comparisonState === 'protected'
                  ? language === 'ar'
                    ? 'يتم تشفير البيانات بمفاتيح جلسة مؤقتة (Diffie-Hellman Ephemeral) مع التحقق من هوية الخادم عبر سلطة الشهادات (CA).'
                    : 'Data is protected via Perfect Forward Secrecy (PFS), authenticated with validated X.509 certificates, resisting passive & active wire-tapping.'
                  : language === 'ar'
                    ? 'البيانات تُنقل كنصوص صريحة دون أي توثيق، مما يتيح لأي جهاز على نفس المحول أو الشبكة اللاسلكية قراءتها أو تعديلها.'
                    : 'Packets traverse the wire in cleartext without cryptographic integrity checks, enabling trivial interception and injection on the local collision domain.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1118] border border-slate-800">
              <span className="text-xs font-mono text-slate-400 block mb-2">
                {language === 'ar' ? 'ما يراه المهاجم المعترض:' : 'What the Intermediary Observes:'}
              </span>
              <div className="font-mono text-xs p-3 rounded bg-slate-950 border border-slate-900">
                {comparisonState === 'protected' ? (
                  <span className="text-emerald-400 break-all">
                    0x7a89f302b1c4e99d... [Encrypted TLS Records — Infeasible to decrypt without private ephemeral keys]
                  </span>
                ) : (
                  <span className="text-red-400">
                    Cookie: session_auth=plain_token_xyz908
                    <br />
                    Authorization: Basic c3R1ZGVudDpwYXNzd29yZDEyMw==
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Critical Academic Caveat (Mandatory Requirement) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#121D29] border border-[#20D6C2]/40 shadow-xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#20D6C2]/15 border border-[#20D6C2]/30 flex items-center justify-center text-[#20D6C2] flex-shrink-0 mt-0.5">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#20D6C2] mb-1 font-mono uppercase tracking-wider">
            {language === 'ar' ? 'ملاحظة أكاديمية جوهرية: حدود التشفير' : 'Academic Insight: Boundaries of Cryptographic Defense'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'ar'
              ? detectionAndPrevention.academicCaveatAr
              : detectionAndPrevention.academicCaveatEn}
          </p>
        </div>
      </div>
    </div>
  );
};
