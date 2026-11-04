import React, { useState, useEffect, useCallback } from 'react';
import { Language } from './types.ts';
import { presentationSections } from './data/presentationContent.ts';
import { NetworkBackground } from './components/NetworkBackground.tsx';
import { HeaderNav } from './components/HeaderNav.tsx';
import { PresentationControls } from './components/PresentationControls.tsx';
import { SpeakerNotesDrawer } from './components/SpeakerNotesDrawer.tsx';

// 10 Section Components
import { Section01Intro } from './components/sections/Section01Intro.tsx';
import { Section02Definition } from './components/sections/Section02Definition.tsx';
import { Section03HowItWorks } from './components/sections/Section03HowItWorks.tsx';
import { Section04Techniques } from './components/sections/Section04Techniques.tsx';
import { Section05RealWorldScenario } from './components/sections/Section05RealWorldScenario.tsx';
import { Section06Tools } from './components/sections/Section06Tools.tsx';
import { Section07Simulation } from './components/sections/Section07Simulation.tsx';
import { Section08RisksImpact } from './components/sections/Section08RisksImpact.tsx';
import { Section09DefensePrevention } from './components/sections/Section09DefensePrevention.tsx';
import { Section10Conclusion } from './components/sections/Section10Conclusion.tsx';

export default function App() {
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [language, setLanguage] = useState<Language>('en');
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(0.85); // Compact 85% scale by default

  const handleZoomIn = () => setZoomScale((prev) => Math.min(1.25, +(prev + 0.05).toFixed(2)));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(0.65, +(prev - 0.05).toFixed(2)));
  const handleResetZoom = () => setZoomScale(0.85);

  const totalSections = presentationSections.length;

  // Handle autostart query param if provided
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setCurrentSection(2);
    }
  }, []);

  // Update HTML title & RTL dir on language change
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.title =
      language === 'ar'
        ? 'هجوم رجل في المنتصف (MITM) — عرض أكاديمي'
        : 'Man-in-the-Middle (MITM) Attack — Academic Presentation';
  }, [language]);

  const goToNext = useCallback(() => {
    setCurrentSection((prev) => (prev < totalSections ? prev + 1 : prev));
  }, [totalSections]);

  const goToPrev = useCallback(() => {
    setCurrentSection((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goToSection = useCallback(
    (id: number) => {
      if (id >= 1 && id <= totalSections) {
        setCurrentSection(id);
      }
    },
    [totalSections]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        if (language === 'ar' && e.key === 'ArrowRight') {
          goToPrev();
        } else {
          goToNext();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        if (language === 'ar' && e.key === 'ArrowLeft') {
          goToNext();
        } else {
          goToPrev();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setIsPresentationMode((prev) => !prev);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '0') {
        e.preventDefault();
        handleResetZoom();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowSpeakerNotes((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (showSpeakerNotes) {
          setShowSpeakerNotes(false);
        } else if (isPresentationMode) {
          setIsPresentationMode(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, language, showSpeakerNotes, isPresentationMode]);

  // Render current slide
  const renderSlideContent = () => {
    switch (currentSection) {
      case 1:
        return (
          <Section01Intro
            language={language}
            onStart={goToNext}
            isPresentationMode={isPresentationMode}
          />
        );
      case 2:
        return (
          <Section02Definition
            language={language}
            isPresentationMode={isPresentationMode}
          />
        );
      case 3:
        return (
          <Section03HowItWorks
            language={language}
            isPresentationMode={isPresentationMode}
          />
        );
      case 4:
        return (
          <Section04Techniques
            language={language}
            isPresentationMode={isPresentationMode}
          />
        );
      case 5:
        return (
          <Section05RealWorldScenario
            language={language}
            isPresentationMode={isPresentationMode}
          />
        );
      case 6:
        return (
          <Section06Tools
            language={language}
            isPresentationMode={isPresentationMode}
          />
        );
      case 7:
        return (
          <Section07Simulation
            language={language}
            isPresentationMode={isPresentationMode}
          />
        );
      case 8:
        return (
          <Section08RisksImpact
            language={language}
            isPresentationMode={isPresentationMode}
          />
        );
      case 9:
        return (
          <Section09DefensePrevention
            language={language}
            isPresentationMode={isPresentationMode}
          />
        );
      case 10:
        return (
          <Section10Conclusion
            language={language}
            onRestart={() => goToSection(1)}
            isPresentationMode={isPresentationMode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0B1118] text-[#F4F7FA] font-sans relative selection:bg-[#20D6C2]/30 selection:text-[#20D6C2] flex flex-col justify-between ${
        language === 'ar' ? 'font-tajawal' : ''
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Cybersecurity animated background mesh */}
      <NetworkBackground />

      {/* Top Header Navigation */}
      <HeaderNav
        currentSection={currentSection}
        totalSections={totalSections}
        onSelectSection={goToSection}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'en' ? 'ar' : 'en'))}
        isPresentationMode={isPresentationMode}
        onTogglePresentationMode={() => setIsPresentationMode((m) => !m)}
        zoomScale={zoomScale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
      />

      {/* Main Slide Body with Scaled / Compact Container */}
      <main
        className={`relative z-10 flex-1 flex flex-col justify-center transition-all ${
          isPresentationMode ? 'py-2 pb-16' : 'py-3 pb-16 sm:pb-20'
        }`}
        style={{
          zoom: zoomScale,
        }}
      >
        <div className="w-full">{renderSlideContent()}</div>
      </main>

      {/* Bottom Presentation Controls */}
      <PresentationControls
        currentSection={currentSection}
        totalSections={totalSections}
        onPrev={goToPrev}
        onNext={goToNext}
        onSelectSection={goToSection}
        language={language}
        isPresentationMode={isPresentationMode}
      />

      {/* Slide Speaker Notes Drawer */}
      <SpeakerNotesDrawer
        currentSection={currentSection}
        isOpen={showSpeakerNotes}
        onClose={() => setShowSpeakerNotes(false)}
        language={language}
      />
    </div>
  );
}
