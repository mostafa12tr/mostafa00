import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Unlock,
  Radio,
  FileVideo,
  Upload,
  Cpu,
  Server,
  Skull,
  Eye,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { Language, SimulationMode } from '../../types.ts';
import {
  generateFictionalPacket,
  computeModeProperties,
  getInitialSimulationState,
} from '../../utils/simulationLogic.ts';

interface Props {
  language: Language;
  isPresentationMode: boolean;
}

export const Section07Simulation: React.FC<Props> = ({ language, isPresentationMode }) => {
  const [mode, setMode] = useState<SimulationMode>('normal');
  const [isSimulating, setIsSimulating] = useState(true);
  const [packetCount, setPacketCount] = useState(1);
  const [packetPosition, setPacketPosition] = useState(0); // 0 to 100%
  const [activeTab, setActiveTab] = useState<'simulator' | 'video'>('simulator');

  // Local Video Player State
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Packet animation loop
  useEffect(() => {
    let animFrame: number;
    if (isSimulating) {
      const step = () => {
        setPacketPosition((prev) => {
          if (prev >= 100) {
            setPacketCount((c) => c + 1);
            return 0;
          }
          return prev + 1.2;
        });
        animFrame = requestAnimationFrame(step);
      };
      animFrame = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animFrame);
  }, [isSimulating]);

  // Video demo animated scrub simulation if no external file loaded
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (videoPlaying && !videoFile) {
      timer = setInterval(() => {
        setVideoProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 300);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [videoPlaying, videoFile]);

  const modeProps = computeModeProperties(mode);
  const currentPacket = generateFictionalPacket(mode, packetCount);

  const handleReset = () => {
    setMode('normal');
    setPacketCount(1);
    setPacketPosition(0);
    setIsSimulating(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFile(url);
      setVideoFileName(file.name);
      setVideoPlaying(false);
      setVideoProgress(0);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-mono font-bold text-[#20D6C2] uppercase tracking-wider px-2.5 py-1 rounded bg-[#20D6C2]/10 border border-[#20D6C2]/20">
          SECTION 07
        </span>
        <h2
          className={`font-extrabold text-[#F4F7FA] mt-2 mb-2 ${
            isPresentationMode ? 'text-3xl sm:text-5xl' : 'text-2xl sm:text-4xl'
          }`}
        >
          {language === 'ar' ? 'المحاكي التفاعلي لهجوم MITM' : 'Practical MITM Simulation'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          {language === 'ar'
            ? 'محاكاة محلية مرئية متكاملة لثلاثة أوضاع اتصال مع مشغل فيديو للعرض التطبيقي'
            : 'Interactive self-contained educational simulator with three modes and dedicated laboratory demonstration video player'}
        </p>
      </div>

      {/* Main Mode / Video Selector Tabs */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'simulator'
              ? 'bg-[#20D6C2] text-[#0B1118] shadow-lg shadow-[#20D6C2]/20'
              : 'bg-[#121D29] border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>{language === 'ar' ? 'المحاكي الشبكي المباشر' : 'Live Network Simulator'}</span>
        </button>

        <button
          onClick={() => setActiveTab('video')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'video'
              ? 'bg-[#FFB454] text-[#0B1118] shadow-lg shadow-[#FFB454]/20'
              : 'bg-[#121D29] border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileVideo className="w-4 h-4" />
          <span>{language === 'ar' ? 'عرض تطبيقي بالفيديو' : 'Practical Demonstration Video'}</span>
        </button>
      </div>

      {activeTab === 'simulator' ? (
        <div className="space-y-6">
          {/* Simulator Control Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#121D29] border border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              {/* Button 1: Normal Connection */}
              <button
                onClick={() => setMode('normal')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  mode === 'normal'
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 shadow-md'
                    : 'bg-[#0B1118] text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Unlock className="w-3.5 h-3.5 text-yellow-400" />
                <span>{language === 'ar' ? 'اتصال طبيعي' : 'Normal Connection'}</span>
              </button>

              {/* Button 2: Simulate MITM */}
              <button
                onClick={() => setMode('mitm')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  mode === 'mitm'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 shadow-md shadow-amber-500/10'
                    : 'bg-[#0B1118] text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Skull className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ar' ? 'محاكاة MITM' : 'Simulate MITM'}</span>
              </button>

              {/* Button 3: Enable Protection */}
              <button
                onClick={() => setMode('protected')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  mode === 'protected'
                    ? 'bg-[#20D6C2]/20 text-[#20D6C2] border border-[#20D6C2]/60 shadow-md shadow-[#20D6C2]/10'
                    : 'bg-[#0B1118] text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-[#20D6C2]" />
                <span>{language === 'ar' ? 'تفعيل الحماية' : 'Enable Protection'}</span>
              </button>
            </div>

            {/* Play/Pause & Reset Simulation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title={isSimulating ? 'Pause simulation' : 'Resume simulation'}
              >
                {isSimulating ? <Pause className="w-4 h-4 text-[#FFB454]" /> : <Play className="w-4 h-4 text-[#20D6C2]" />}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'إعادة ضبط المحاكاة' : 'Reset Simulation'}</span>
              </button>
            </div>
          </div>

          {/* Educational Visual Simulator Canvas */}
          <div className="p-6 rounded-2xl bg-[#121D29] border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Mode Banner Indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${modeProps.badgeColor}`}>
                  {modeProps.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {language === 'ar' ? `الحزمة رقم #${packetCount}` : `Packet #${packetCount}`}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                {language === 'ar' ? 'مستوى التعرض:' : 'Exposure Risk:'}{' '}
                <span
                  className={
                    mode === 'mitm'
                      ? 'text-red-400 font-bold'
                      : mode === 'protected'
                      ? 'text-[#20D6C2] font-bold'
                      : 'text-yellow-400 font-bold'
                  }
                >
                  {modeProps.exposureRisk}
                </span>
              </div>
            </div>

            {/* Network Nodes Simulation Track */}
            <div className="relative py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[260px]">
              {/* Node 1: Client */}
              <div className="flex flex-col items-center z-20">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border-2 border-sky-500/50 flex items-center justify-center text-sky-400 shadow-lg">
                  <Cpu className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-slate-200 mt-2">Client (Student Laptop)</span>
                <span className="text-[10px] font-mono text-slate-400">192.168.1.45</span>
                {mode === 'protected' && (
                  <span className="mt-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> TLS Verified
                  </span>
                )}
              </div>

              {/* Connecting Wire & Traveling Packet */}
              <div className="flex-1 w-full relative px-4 flex flex-col items-center">
                {/* Visual Line */}
                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden ${
                    mode === 'protected'
                      ? 'bg-gradient-to-r from-[#20D6C2]/40 via-[#20D6C2] to-[#20D6C2]/40'
                      : mode === 'mitm'
                      ? 'bg-gradient-to-r from-yellow-500/30 via-red-500/50 to-emerald-500/30'
                      : 'bg-slate-700'
                  }`}
                />

                {/* Animated Packet Ball */}
                <div
                  className="absolute top-[-10px] transition-all duration-75 z-30"
                  style={{
                    left: `${Math.min(94, Math.max(6, packetPosition))}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
                      mode === 'protected'
                        ? 'bg-[#20D6C2] text-[#0B1118] shadow-[#20D6C2]/60 animate-pulse'
                        : mode === 'mitm'
                        ? 'bg-amber-400 text-[#0B1118] shadow-amber-500/60'
                        : 'bg-yellow-400 text-[#0B1118]'
                    }`}
                  >
                    {mode === 'protected' ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                  </div>
                </div>

                {/* Intermediary Attacker (Visible in MITM or Protected when positioned) */}
                {(mode === 'mitm' || mode === 'protected') && (
                  <div
                    className={`mt-6 p-3 rounded-2xl border flex items-center gap-3 transition-all z-10 ${
                      mode === 'mitm'
                        ? 'border-amber-500 bg-amber-500/15 shadow-xl shadow-amber-500/20'
                        : 'border-slate-700 bg-slate-900/80 opacity-70'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        mode === 'mitm' ? 'bg-amber-500/20 text-[#FFB454]' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {mode === 'mitm' ? <Eye className="w-5 h-5 animate-pulse" /> : <Skull className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{language === 'ar' ? 'الوسيط المعترض (MITM)' : 'Untrusted Intermediary'}</span>
                        {mode === 'mitm' && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500 text-slate-900 font-bold uppercase">
                            Reading Cleartext
                          </span>
                        )}
                        {mode === 'protected' && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                            Payload Encrypted (Blocked)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {mode === 'mitm'
                          ? language === 'ar'
                            ? 'الحزم غير المشفرة مكشوفة بالكامل للمهاجم!'
                            : 'Intercepting and reading plain HTTP packets!'
                          : language === 'ar'
                          ? 'المهاجم يرى فقط نصاً مشفراً (Ciphertext) غير مفهوم.'
                          : 'Attacker only sees cryptographic ciphertext!'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Node 2: Server */}
              <div className="flex flex-col items-center z-20">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg">
                  <Server className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-slate-200 mt-2">Destination Server</span>
                <span className="text-[10px] font-mono text-slate-400">104.21.32.90:443</span>
                {mode === 'protected' && (
                  <span className="mt-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Valid Cert
                  </span>
                )}
              </div>
            </div>

            {/* Live Packet Payload Inspector */}
            <div className="mt-6 p-4 rounded-xl bg-[#0B1118] border border-slate-800">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#20D6C2]">
                    {language === 'ar' ? 'فاحص الحزم أثناء النقل (Fictional Educational Payload)' : 'In-Transit Packet Inspector'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {currentPacket.protocol}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {currentPacket.source} → {currentPacket.destination}
                </span>
              </div>

              <div className="font-mono text-xs p-3 rounded-lg bg-slate-950 border border-slate-900 text-slate-300 overflow-x-auto">
                {mode === 'protected' ? (
                  <div className="text-emerald-400">
                    <span className="text-slate-500">// TLS 1.3 Application Data (Ciphertext)</span>
                    <br />
                    {currentPacket.payload}
                    <br />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      SHA256 Authenticated HMAC verified. Attacker cannot decrypt without session key.
                    </span>
                  </div>
                ) : (
                  <div className={mode === 'mitm' ? 'text-amber-300' : 'text-slate-200'}>
                    <span className="text-slate-500">// Unencrypted HTTP Cleartext Transmission</span>
                    <br />
                    {currentPacket.payload}
                    {mode === 'mitm' && (
                      <span className="text-[10px] text-red-400 mt-1 block font-bold">
                        ⚠️ WARNING: Sensitive session token and user credentials are visible to any intermediary on this channel!
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mode Explanation Narrative */}
            <div className="mt-4 p-4 rounded-xl bg-[#121D29]/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-bold text-[#20D6C2] mr-2">
                {language === 'ar' ? 'التحليل الأكاديمي:' : 'Academic Analysis:'}
              </span>
              {language === 'ar' ? modeProps.descriptionAr : modeProps.descriptionEn}
            </div>
          </div>
        </div>
      ) : (
        /* Video Demonstration Panel */
        <div className="p-6 rounded-2xl bg-[#121D29] border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileVideo className="w-5 h-5 text-[#FFB454]" />
                <span>MITM Attack — Practical Demonstration</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'ar'
                  ? 'مشغل فيديو محلي للمختبر الجامعي، يدعم تحميل ملفات الفيديو أو تشغيل العرض المتحرك التوضيحي'
                  : 'Classroom laboratory video player. Supports loading custom local MP4 files or playing the interactive animated demonstration'}
              </p>
            </div>

            {/* Video File Upload Trigger */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-[#20D6C2]" />
                <span>{language === 'ar' ? 'تحميل فيديو محلي (.mp4)' : 'Load Custom Video (.mp4)'}</span>
              </button>
            </div>
          </div>

          {/* Video Player Display Container */}
          <div className="relative w-full aspect-video rounded-2xl bg-[#0B1118] border border-slate-800 overflow-hidden flex flex-col items-center justify-center">
            {videoFile ? (
              <video
                src={videoFile}
                controls
                className="w-full h-full object-contain"
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
              />
            ) : (
              /* Built-in Interactive Animated Video Simulation Placeholder */
              <div className="w-full h-full p-6 flex flex-col justify-between relative bg-gradient-to-b from-[#0B1118] to-[#121D29]">
                {/* Video Header Overlay */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-xs font-mono text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>LAB DEMO: ARP Cache Poisoning Simulation</span>
                  </div>
                  <span className="text-xs font-mono text-[#20D6C2]">
                    Timecode: 00:{String(Math.floor(videoProgress / 10)).padStart(2, '0')}:
                    {String((videoProgress * 3) % 60).padStart(2, '0')}
                  </span>
                </div>

                {/* Simulated Screen Visual */}
                <div className="flex-1 flex flex-col items-center justify-center text-center my-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFB454]/15 border border-[#FFB454]/40 flex items-center justify-center text-[#FFB454] mb-3">
                    <Play className="w-8 h-8 fill-current" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {language === 'ar'
                      ? 'العرض التوضيحي العملي: آلية اعتراض الحزم عبر انتحال ARP'
                      : 'Practical Lab Walkthrough: ARP Spoofing Packet Relay'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-lg mb-4">
                    {language === 'ar'
                      ? 'محاكاة مرئية لحركة مرور الحزم من الضحية إلى البوابة الافتراضية عبر المضيف الوسيط في بيئة معزولة.'
                      : 'Visual animation illustrating packet redirection between victim host and default gateway via intermediary in an isolated sandbox.'}
                  </p>
                  <button
                    onClick={() => setVideoPlaying(!videoPlaying)}
                    className="px-4 py-2 rounded-xl bg-[#20D6C2] text-[#0B1118] font-bold text-xs shadow-lg shadow-[#20D6C2]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    {videoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{videoPlaying ? (language === 'ar' ? 'إيقاف مؤقت' : 'Pause Demo') : (language === 'ar' ? 'تشغيل العرض التوضيحي' : 'Play Animated Demonstration')}</span>
                  </button>
                </div>

                {/* Scrub Bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-[#FFB454] transition-all duration-300"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {videoFileName && (
            <div className="mt-3 text-xs text-slate-400 font-mono text-center">
              Loaded file: <span className="text-[#20D6C2]">{videoFileName}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
