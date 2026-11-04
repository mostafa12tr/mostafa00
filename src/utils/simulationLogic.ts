import { SimulationMode, PacketInfo } from '../types.ts';

export interface SimulationState {
  mode: SimulationMode;
  packetCount: number;
  packets: PacketInfo[];
  alertLevel: 'safe' | 'warning' | 'danger';
  activeNode: 'client' | 'attacker' | 'server' | null;
  encryptionActive: boolean;
  tamperDetected: boolean;
}

export function getInitialSimulationState(mode: SimulationMode = 'normal'): SimulationState {
  return {
    mode,
    packetCount: 0,
    packets: [],
    alertLevel: mode === 'mitm' ? 'danger' : mode === 'protected' ? 'safe' : 'warning',
    activeNode: null,
    encryptionActive: mode === 'protected',
    tamperDetected: false,
  };
}

export function generateFictionalPacket(mode: SimulationMode, sequence: number): PacketInfo {
  const isProtected = mode === 'protected';
  
  if (isProtected) {
    return {
      id: sequence,
      source: '192.168.1.45 (Student Laptop)',
      destination: '104.21.32.90 (University Portal:443)',
      protocol: 'HTTPS (TLS 1.3)',
      payload: `0x7f4c91a0${(sequence * 1337).toString(16)}... [AEAD_AES_256_GCM Encrypted Application Data]`,
      isEncrypted: true,
      isIntercepted: false,
      status: 'delivered',
    };
  }

  // Unprotected / Plaintext
  const fictionalCredentials = [
    'POST /api/v1/auth HTTP/1.1 \\n{"user": "student_jdoe", "token": "FICTIONAL_SESS_8971"}',
    'GET /student/portal/grades HTTP/1.1 \\nHost: unencrypted-portal.local \\nCookie: sess_id=74102',
    'POST /api/messages HTTP/1.1 \\n{"to": "advisor", "body": "Thesis submission request"}',
    'GET /api/financial/status HTTP/1.1 \\nAuthorization: Bearer mock_jwt_token_unencrypted_99',
  ];

  const payload = fictionalCredentials[sequence % fictionalCredentials.length];

  return {
    id: sequence,
    source: '192.168.1.45 (Student Laptop)',
    destination: '192.168.1.1 (Gateway) -> 203.0.113.15',
    protocol: 'HTTP (Plaintext)',
    payload,
    isEncrypted: false,
    isIntercepted: mode === 'mitm',
    status: mode === 'mitm' ? 'inspected' : 'delivered',
  };
}

export function computeModeProperties(mode: SimulationMode) {
  switch (mode) {
    case 'normal':
      return {
        badge: 'Normal Communication',
        badgeColor: 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10',
        channelStatus: 'Normal Communication',
        tlsActive: false,
        attackerPresent: false,
        exposureRisk: 'Medium — Vulnerable if on untrusted network',
        descriptionEn: 'Client communicates directly with the Server via standard unencrypted protocol. Traffic is not actively intercepted in this baseline test, but remains vulnerable to passive sniffing.',
        descriptionAr: 'يتصل العميل مباشرة بالخادم عبر بروتوكول قياسي غير مشفر. لا يتم اعتراض حركة المرور في هذا الاختبار المرجعي، لكنها تظل عرضة للتنصت.',
      };
    case 'mitm':
      return {
        badge: 'Interception Active (Untrusted Intermediary)',
        badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
        channelStatus: 'Compromised Channel (MITM)',
        tlsActive: false,
        attackerPresent: true,
        exposureRisk: 'High — Plaintext data exposed to unauthorized party',
        descriptionEn: 'An unauthorized intermediary secretly redirects network traffic. Because the communication is unencrypted HTTP, the attacker reads credentials and sensitive tokens in transit.',
        descriptionAr: 'يقوم وسيط غير مصرح بإعادة توجيه حركة الشبكة سراً. ونظراً لأن الاتصال غير مشفر (HTTP)، يستطيع المهاجم قراءة بيانات الاعتماد والرموز الحساسة أثناء نقلها.',
      };
    case 'protected':
      return {
        badge: 'Protected via TLS 1.3 / Certificate Validated',
        badgeColor: 'border-[#20D6C2]/40 text-[#20D6C2] bg-[#20D6C2]/10',
        channelStatus: 'Encrypted & Authenticated',
        tlsActive: true,
        attackerPresent: true,
        exposureRisk: 'Low — Ciphertext payload prevents eavesdropping',
        descriptionEn: 'Client and Server authenticate each other and negotiate an encrypted TLS channel. Even if the attacker inspects traffic or relays packets, the payload is cryptographic ciphertext.',
        descriptionAr: 'يتحقق العميل والخادم من هوية بعضهما البعض ويتفاوضان على قناة TLS مشفرة. حتى لو اعترض المهاجم حركة المرور، فإن الحمولة عبارة عن نص مشفر يستحيل فكه.',
      };
  }
}
