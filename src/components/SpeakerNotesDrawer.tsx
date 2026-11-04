import React from 'react';
import { X, Lightbulb, Clock } from 'lucide-react';
import { Language } from '../types.ts';

interface Props {
  currentSection: number;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const speakerNotesData: Record<number, { en: string[]; ar: string[]; pacingEn: string; pacingAr: string }> = {
  1: {
    en: [
      'Welcome professors and colleagues. Introduce yourself, department, and academic course.',
      'State the presentation goal: demystifying how unauthorized actors intercept network traffic.',
      'Highlight that this 10-minute presentation covers theory, practical simulation, tools, and defenses.',
    ],
    ar: [
      'الترحيب بلجنة المناقشة والزملاء، مع ذكر الاسم والقسم (هندسة الشبكات والأمن السيبراني).',
      'بيان هدف العرض: تفكيك آلية اعتراض حركة الشبكة وفهم مواطن الضعف في الاتصالات.',
      'الإشارة إلى أن العرض يستغرق 10 دقائق ويتضمن الجانب النظري، المحاكاة العملية، وأدوات الدفاع.',
    ],
    pacingEn: 'Pacing: 0:00 - 1:00 (1 minute)',
    pacingAr: 'التوقيت المقترح: 0:00 - 1:00 (دقيقة واحدة)',
  },
  2: {
    en: [
      'Read the clear formal definition of a Man-in-the-Middle attack.',
      'Walk through the 3 entities: Client (victim originator), Attacker (secret interceptor), and Server (trusted endpoint).',
      'Emphasize that the core violation is the breach of confidentiality and integrity.',
    ],
    ar: [
      'قراءة التعريف الأكاديمي الدقيق لهجوم رجل في المنتصف (MITM).',
      'شرح الأطراف الثلاثة: العميل (الضحية)، المهاجم (الوسيط الخفي)، والخادم (الوجهة الموثوقة).',
      'التأكيد على أن الهجوم يمثل انتهاكاً جوهرياً للسرية (Confidentiality) وسلامة البيانات (Integrity).',
    ],
    pacingEn: 'Pacing: 1:00 - 2:00 (1 minute)',
    pacingAr: 'التوقيت المقترح: 1:00 - 2:00 (دقيقة واحدة)',
  },
  3: {
    en: [
      'Explain the 4 stages: Normal Communication -> Interception -> Data Exposure -> Transparent Forwarding.',
      'Clarify why both ends remain unaware: the attacker preserves the TCP handshake or HTTP session.',
      'State clearly that only fictional tokens and mock endpoints are shown for ethical demonstration.',
    ],
    ar: [
      'شرح المراحل الأربع: الاتصال الطبيعي -> التسلل والاعتراض -> انكشاف البيانات -> استمرار الاتصال.',
      'توضيح سبب عدم شك الطرفين: المهاجم يقوم بتمرير الحزم بشفافية دون قطع اتصال TCP.',
      'التأكيد على أن البيانات المعروضة وهمية وأكاديمية فقط لأغراض التوضيح التعليمي.',
    ],
    pacingEn: 'Pacing: 2:00 - 3:15 (1.25 minutes)',
    pacingAr: 'التوقيت المقترح: 2:00 - 3:15 (دقيقة وربع)',
  },
  4: {
    en: [
      'Cover the 5 core techniques. Focus on Layer 2 (ARP Spoofing) and Layer 3/Application (DNS Spoofing, Rogue Wi-Fi, Session Hijacking, HTTPS Downgrade).',
      'Point out that ARP has no built-in authentication, making local broadcast domains inherently vulnerable without DAI.',
      'Mention how SSL stripping tricks users if HSTS is not preloaded.',
    ],
    ar: [
      'شرح التقنيات الخمس: انتحال ARP في الطبقة الثانية، وتسميم DNS، والشبكات اللاسلكية المزيفة، واختطاف الجلسات، وتخفيض HTTPS.',
      'التنبيه إلى افتقار بروتوكول ARP للمصادقة الأصلية، مما يجعل نطاق البث المحلي عرضة للاستغلال.',
      'توضيح كيف تمنع سياسة HSTS التحميل المسبق هجمات تجريد التشفير SSL Stripping.',
    ],
    pacingEn: 'Pacing: 3:15 - 4:45 (1.5 minutes)',
    pacingAr: 'التوقيت المقترح: 3:15 - 4:45 (دقيقة ونصف)',
  },
  5: {
    en: [
      'Ground the theory in a relatable campus scenario: students connecting to open cafeteria Wi-Fi.',
      'Explain that rogue access points can broadcast the exact same SSID with stronger transmit power.',
      'Emphasize the golden rule: "Never assume that a public Wi-Fi network is trustworthy."',
    ],
    ar: [
      'ربط المفاهيم النظرية بسيناريو عملي مألوف: اتصال الطالب بشبكة مقهى أو مكتبة عامة مفتوحة.',
      'شرح قدرة المهاجم على بث نفس اسم الشبكة (Evil Twin) بإشارة أعلى ليجبر الأجهزة على الاتصال به.',
      'التشديد على القاعدة الذهبية: "لا تفترض أبداً أن أي شبكة Wi-Fi عامة شبكة آمنة أو موثوقة".',
    ],
    pacingEn: 'Pacing: 4:45 - 5:45 (1 minute)',
    pacingAr: 'التوقيت المقترح: 4:45 - 5:45 (دقيقة واحدة)',
  },
  6: {
    en: [
      'Differentiate ethical testing tools (Ettercap, Bettercap) from defensive platforms (Snort, Suricata, Cisco DAI).',
      'CRITICAL: Explicitly clarify that Wireshark is a packet analyzer and diagnostic tool, not an attack execution software.',
      'Explain how Cisco DAI validates ARP packets against the DHCP snooping binding table at hardware wire-speed.',
    ],
    ar: [
      'التفريق الصارم بين أدوات الاختبار الأمني المصرح بها (Ettercap, Bettercap) والحلول الدفاعية (Snort, Suricata, Cisco DAI).',
      'نقطة جوهرية: التأكيد للجنة على أن برنامج Wireshark هو محلل حزم سلبية وليس أداة لشن الهجمات.',
      'شرح كيفية عمل Cisco DAI في فحص حزم ARP ومطابقتها مع جدول DHCP Snooping بسرعة العتاد.',
    ],
    pacingEn: 'Pacing: 5:45 - 7:00 (1.25 minutes)',
    pacingAr: 'التوقيت المقترح: 5:45 - 7:00 (دقيقة وربع)',
  },
  7: {
    en: [
      'Interactive Simulator demonstration: click through Mode 1 (Normal), Mode 2 (MITM), Mode 3 (Protected TLS 1.3).',
      'Show packet inspector: compare unencrypted plaintext JSON vs AES-GCM ciphertext payload.',
      'Play the built-in animated practical demonstration video to illustrate interception dynamics.',
    ],
    ar: [
      'العرض العملي للمحاكي التفاعلي: التنقل بين الوضع 1 (عادي)، الوضع 2 (اعتراض MITM)، والوضع 3 (اتصال محمي بـ TLS 1.3).',
      'فحص محتوى الحزمة: إظهار الفارق بين قراءة البيانات الصريحة وبين رؤية النص المشفر (Ciphertext).',
      'تشغيل العرض التوضيحي العملي المتحرك لشرح آليات انتقال الحزم.',
    ],
    pacingEn: 'Pacing: 7:00 - 8:15 (1.25 minutes)',
    pacingAr: 'التوقيت المقترح: 7:00 - 8:15 (دقيقة وربع)',
  },
  8: {
    en: [
      'Summarize the four key impacts: Data Theft, Privacy Violation, Account Compromise, and Financial Loss.',
      'Discuss how stolen session cookies bypass MFA if tokens lack cryptographic client binding.',
    ],
    ar: [
      'استعراض الآثار الأربعة الرئيسية: سرقة البيانات، انتهاك الخصوصية، اختراق الحسابات، والخسائر المالية.',
      'مناقشة كيف يمكن لملفات تعريف الارتباط المسروقة تجاوز المصادقة الثنائية في حال غياب ربط الجلسة بالعميل.',
    ],
    pacingEn: 'Pacing: 8:15 - 9:00 (45 seconds)',
    pacingAr: 'التوقيت المقترح: 8:15 - 9:00 (45 ثانية)',
  },
  9: {
    en: [
      'Review detection methods (traffic monitoring, IDS/IPS, certificate audits).',
      'Review prevention best practices (TLS 1.3, verified Wi-Fi, VPNs, MFA, DAI).',
      'Academic caveat: highlight that encryption mitigates in-transit sniffing, but endpoint compromise requires defense-in-depth.',
    ],
    ar: [
      'استعراض آليات الكشف (مراقبة حركة الشبكة، أنظمة كشف التسلل، تدقيق الشهادات).',
      'استعراض سبل الوقاية (تشفير TLS 1.3، شبكات موثوقة، VPN، المصادقة المتعددة).',
      'الملاحظة الأكاديمية: التشفير يحمي البيانات أثناء النقل لكن الدفاع المتكامل يتطلب حماية الأجهزة الطرفية.',
    ],
    pacingEn: 'Pacing: 9:00 - 9:30 (30 seconds)',
    pacingAr: 'التوقيت المقترح: 9:00 - 9:30 (30 ثانية)',
  },
  10: {
    en: [
      'Deliver the 3 key takeaways with confidence.',
      'Read the final thesis statement: "Securing communication is essential for protecting digital information."',
      'Open the floor for questions with the provided discussion prompts.',
    ],
    ar: [
      'تقديم الخلاصات الثلاث بثقة ووضوح.',
      'إلقاء الخاتمة النهائية: "تأمين قنوات الاتصال هو حجر الأساس لحماية المعلومات الرقمية في عالمنا المترابط".',
      'فتح باب النقاش والأسئلة مع اللجنة باستخدام محاور الأسئلة المقترحة.',
    ],
    pacingEn: 'Pacing: 9:30 - 10:00 (30 seconds)',
    pacingAr: 'التوقيت المقترح: 9:30 - 10:00 (30 ثانية)',
  },
};

export const SpeakerNotesDrawer: React.FC<Props> = ({
  currentSection,
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const notes = speakerNotesData[currentSection] || {
    en: ['No notes available for this slide.'],
    ar: ['لا توجد ملاحظات لهذه الشريحة.'],
    pacingEn: '0:00 - 1:00',
    pacingAr: '0:00 - 1:00',
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#121D29]/95 border-l border-slate-700/80 shadow-2xl backdrop-blur-xl p-6 flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-[#FFB454]">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-bold text-sm text-[#F4F7FA]">
              {language === 'ar'
                ? `ملاحظات العرض: الشريحة ${String(currentSection).padStart(2, '0')}`
                : `Speaker Cues: Slide ${String(currentSection).padStart(2, '0')}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFB454]/10 border border-[#FFB454]/20 text-[#FFB454] text-xs font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? notes.pacingAr : notes.pacingEn}</span>
        </div>

        <div className="mt-5 space-y-3">
          {(language === 'ar' ? notes.ar : notes.en).map((note, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs sm:text-sm leading-relaxed"
            >
              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-[#20D6C2]/15 text-[#20D6C2] font-mono text-[11px] font-bold">
                {index + 1}
              </span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 text-center">
        {language === 'ar'
          ? 'إرشادات مخصصة لتقديم دفاع جامعي متزن ومقنع في 10 دقائق'
          : 'Tailored talking points for a 10-minute university presentation'}
      </div>
    </div>
  );
};
