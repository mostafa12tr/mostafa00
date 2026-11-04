import React, { useState } from 'react';
import {
  Network,
  Globe,
  Wifi,
  KeyRound,
  ShieldAlert,
  ChevronRight,
  ShieldCheck,
  Radio,
  FileCode,
} from 'lucide-react';
import { Language, TechniqueItem } from '../../types.ts';
import { commonTechniques } from '../../data/presentationContent.ts';

interface Props {
  language: Language;
  isPresentationMode: boolean;
}

export const Section04Techniques: React.FC<Props> = ({ language, isPresentationMode }) => {
  const [selectedTechId, setSelectedTechId] = useState<string>(commonTechniques[0].id);

  const selectedTech =
    commonTechniques.find((t) => t.id === selectedTechId) || commonTechniques[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'arp':
        return <Network className="w-5 h-5 text-[#20D6C2]" />;
      case 'dns':
        return <Globe className="w-5 h-5 text-sky-400" />;
      case 'wifi':
        return <Wifi className="w-5 h-5 text-[#FFB454]" />;
      case 'session':
        return <KeyRound className="w-5 h-5 text-purple-400" />;
      case 'https':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      default:
        return <Radio className="w-5 h-5 text-[#20D6C2]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-mono font-bold text-[#20D6C2] uppercase tracking-wider px-2.5 py-1 rounded bg-[#20D6C2]/10 border border-[#20D6C2]/20">
          SECTION 04
        </span>
        <h2
          className={`font-extrabold text-[#F4F7FA] mt-2 mb-2 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar' ? 'أبرز تقنيات هجوم رجل في المنتصف' : 'Common MITM Techniques'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          {language === 'ar'
            ? 'خمس استراتيجيات رئيسية يستخدمها المهاجمون لاختراق طبقات الشبكة المختلفة'
            : 'Five prominent interception vectors across Layer 2, Layer 3, and Application layers'}
        </p>
      </div>

      {/* 5 Techniques Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
        {commonTechniques.map((tech) => {
          const isSelected = tech.id === selectedTechId;
          return (
            <button
              key={tech.id}
              onClick={() => setSelectedTechId(tech.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#20D6C2] bg-[#121D29] shadow-lg shadow-[#20D6C2]/10 ring-1 ring-[#20D6C2]/50'
                  : 'border-slate-800 bg-[#121D29]/60 hover:border-slate-700 hover:bg-[#121D29]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/80 flex items-center justify-center">
                    {getIcon(tech.iconName)}
                  </div>
                  <span className="font-mono text-xs text-slate-500 font-bold">{tech.number}</span>
                </div>
                <h4
                  className={`font-bold text-sm mb-1.5 ${
                    isSelected ? 'text-[#20D6C2]' : 'text-slate-100'
                  }`}
                >
                  {language === 'ar' ? tech.titleAr : tech.titleEn}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {language === 'ar' ? tech.summaryAr : tech.summaryEn}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className={isSelected ? 'text-[#20D6C2] font-medium' : 'text-slate-500'}>
                  {language === 'ar' ? 'استعراض الآلية' : 'Inspect Details'}
                </span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isSelected ? 'translate-x-1 text-[#20D6C2]' : 'text-slate-600'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Educational Deep Dive & Mini Diagram for Selected Technique */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#121D29] border border-slate-800 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mechanism & Mitigation Explanation */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-[#20D6C2]/15 border border-[#20D6C2]/30 flex items-center justify-center text-[#20D6C2]">
                {getIcon(selectedTech.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#20D6C2] uppercase font-bold tracking-wider">
                  Technique Vector {selectedTech.number}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {language === 'ar' ? selectedTech.titleAr : selectedTech.titleEn}
                </h3>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-[#FFB454]" />
                <span>{language === 'ar' ? 'آلية العمل التقنية:' : 'Technical Mechanism:'}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0B1118] p-3 rounded-xl border border-slate-800/80">
                {language === 'ar' ? selectedTech.mechanismAr : selectedTech.mechanismEn}
              </p>
            </div>

            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#20D6C2]" />
                <span>{language === 'ar' ? 'طرق الوقاية والتخفيف الأكاديمية:' : 'Recommended Mitigations:'}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0B1118] p-3 rounded-xl border border-slate-800/80">
                {language === 'ar' ? selectedTech.mitigationAr : selectedTech.mitigationEn}
              </p>
            </div>
          </div>

          {/* Small Educational Schematic Visualization */}
          <div className="lg:w-80 flex flex-col justify-center p-4 rounded-xl bg-[#0B1118] border border-slate-800 text-center">
            <span className="text-[11px] font-mono text-[#20D6C2] font-semibold mb-3">
              {language === 'ar' ? 'رسم تخطيطي تعليمي مبسط' : 'Educational Schematic'}
            </span>

            {selectedTech.id === 'arp-spoofing' && (
              <div className="space-y-2 text-xs font-mono text-slate-300 py-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-sky-400">Victim PC</span>: Who has 192.168.1.1?
                </div>
                <div className="text-amber-400 font-bold">↓ (Poisoned Reply)</div>
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/40 text-[#FFB454]">
                  Attacker: 192.168.1.1 is at <span className="underline">Attacker_MAC</span>
                </div>
                <div className="text-slate-500 text-[10px]">Result: Packets routed to attacker</div>
              </div>
            )}

            {selectedTech.id === 'dns-spoofing' && (
              <div className="space-y-2 text-xs font-mono text-slate-300 py-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-sky-400">DNS Query</span>: university.edu?
                </div>
                <div className="text-amber-400 font-bold">↓ (Forged Answer)</div>
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/40 text-[#FFB454]">
                  Spoofed DNS: university.edu → <span className="underline">Attacker_IP</span>
                </div>
                <div className="text-slate-500 text-[10px]">Result: Redirected to fake portal</div>
              </div>
            )}

            {selectedTech.id === 'rogue-wifi' && (
              <div className="space-y-2 text-xs font-mono text-slate-300 py-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  Target Device scans for SSID: "Campus_WiFi"
                </div>
                <div className="text-amber-400 font-bold">↓ (Stronger Signal Beacon)</div>
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/40 text-[#FFB454]">
                  Rogue AP broadcasts "Campus_WiFi" (Evil Twin)
                </div>
                <div className="text-slate-500 text-[10px]">Result: Victim auto-connects to rogue hotspot</div>
              </div>
            )}

            {selectedTech.id === 'session-hijacking' && (
              <div className="space-y-2 text-xs font-mono text-slate-300 py-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  Legitimate user authenticates successfully
                </div>
                <div className="text-amber-400 font-bold">↓ (Unencrypted Cookie Sniffed)</div>
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/40 text-[#FFB454]">
                  Attacker clones: <span className="text-xs">Cookie: session_auth=xyz</span>
                </div>
                <div className="text-slate-500 text-[10px]">Result: Unauthorized session takeover</div>
              </div>
            )}

            {selectedTech.id === 'https-downgrade' && (
              <div className="space-y-2 text-xs font-mono text-slate-300 py-2">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  Browser requests: <span className="text-sky-400">http://bank.local</span>
                </div>
                <div className="text-amber-400 font-bold">↓ (Stripping 301/302 Redirect)</div>
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/40 text-[#FFB454]">
                  Attacker communicates HTTP with victim & HTTPS with server
                </div>
                <div className="text-slate-500 text-[10px]">Result: Secure padlock disappears</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
