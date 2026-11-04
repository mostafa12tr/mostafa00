import React from 'react';

export const NetworkBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-60" />

      {/* Radial Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0B1118]/70 to-[#0B1118]" />

      {/* Cyber glow accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#20D6C2]/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FFB454]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Subtle floating cyber network nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="cyberLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#20D6C2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#20D6C2" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Constellation lines */}
        <line x1="12%" y1="20%" x2="28%" y2="35%" stroke="url(#cyberLineGrad)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="28%" y1="35%" x2="45%" y2="18%" stroke="url(#cyberLineGrad)" strokeWidth="1" />
        <line x1="45%" y1="18%" x2="72%" y2="28%" stroke="url(#cyberLineGrad)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="72%" y1="28%" x2="88%" y2="15%" stroke="url(#cyberLineGrad)" strokeWidth="1" />
        <line x1="28%" y1="35%" x2="35%" y2="65%" stroke="url(#cyberLineGrad)" strokeWidth="1" />
        <line x1="35%" y1="65%" x2="62%" y2="75%" stroke="url(#cyberLineGrad)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="62%" y1="75%" x2="82%" y2="60%" stroke="url(#cyberLineGrad)" strokeWidth="1" />

        {/* Nodes */}
        <circle cx="12%" cy="20%" r="3" fill="#20D6C2" opacity="0.6" />
        <circle cx="28%" cy="35%" r="4" fill="#20D6C2" opacity="0.8" />
        <circle cx="45%" cy="18%" r="3" fill="#20D6C2" opacity="0.5" />
        <circle cx="72%" cy="28%" r="4" fill="#FFB454" opacity="0.7" />
        <circle cx="88%" cy="15%" r="3" fill="#20D6C2" opacity="0.5" />
        <circle cx="35%" cy="65%" r="4" fill="#20D6C2" opacity="0.6" />
        <circle cx="62%" cy="75%" r="3" fill="#FFB454" opacity="0.5" />
        <circle cx="82%" cy="60%" r="4" fill="#20D6C2" opacity="0.7" />
      </svg>
    </div>
  );
};
