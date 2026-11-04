import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { Language } from '../types.ts';

interface Props {
  language: Language;
}

export const PresentationTimer: React.FC<Props> = ({ language }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const targetSeconds = 10 * 60; // 10-minute target university presentation

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = Math.min(100, (secondsElapsed / targetSeconds) * 100);
  const isOvertime = secondsElapsed > targetSeconds;
  const isWarning = secondsElapsed > 8 * 60 && !isOvertime;

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={language === 'ar' ? 'مؤقت العرض التقديمي (10 دقائق)' : '10-Minute Presentation Timer'}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono transition-all ${
          isOvertime
            ? 'border-red-500/50 bg-red-500/10 text-red-400'
            : isWarning
            ? 'border-[#FFB454]/50 bg-[#FFB454]/10 text-[#FFB454]'
            : isRunning
            ? 'border-[#20D6C2]/40 bg-[#20D6C2]/10 text-[#20D6C2]'
            : 'border-slate-800 bg-[#121D29] text-slate-300 hover:border-slate-700'
        }`}
      >
        <Timer className="w-3.5 h-3.5" />
        <span>{formattedTime}</span>
        <span className="text-[10px] text-slate-500 hidden sm:inline">/ 10:00</span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 ${
            language === 'ar' ? 'left-0' : 'right-0'
          } z-50 w-56 p-3 rounded-xl border border-slate-700 bg-[#121D29] shadow-2xl backdrop-blur-md`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">
              {language === 'ar' ? 'مؤقت العرض (10 د)' : 'Presentation Timer'}
            </span>
            <span
              className={`text-xs font-mono font-bold ${
                isOvertime ? 'text-red-400' : isWarning ? 'text-[#FFB454]' : 'text-[#20D6C2]'
              }`}
            >
              {formattedTime}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-300 ${
                isOvertime ? 'bg-red-500' : isWarning ? 'bg-[#FFB454]' : 'bg-[#20D6C2]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-1">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#20D6C2]/15 text-[#20D6C2] hover:bg-[#20D6C2]/25 text-xs font-medium transition-colors"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>
                {language === 'ar'
                  ? isRunning
                    ? 'إيقاف'
                    : 'بدء'
                  : isRunning
                  ? 'Pause'
                  : 'Start'}
              </span>
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsElapsed(0);
              }}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
              title={language === 'ar' ? 'إعادة ضبط' : 'Reset'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[10px] text-slate-500 mt-2 text-center">
            {language === 'ar'
              ? 'مُعاير لعرض مدته 10 دقائق في قاعة المحاضرات'
              : 'Calibrated for a 10-minute classroom defense'}
          </p>
        </div>
      )}
    </div>
  );
};
