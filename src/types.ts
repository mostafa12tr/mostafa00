export type Language = 'en' | 'ar';

export type SimulationMode = 'normal' | 'mitm' | 'protected';

export interface PacketInfo {
  id: number;
  source: string;
  destination: string;
  protocol: 'HTTP (Plaintext)' | 'HTTPS (TLS 1.3)';
  payload: string;
  isEncrypted: boolean;
  isIntercepted: boolean;
  status: 'transiting' | 'inspected' | 'delivered';
}

export interface SecurityTool {
  id: string;
  name: string;
  category: 'testing' | 'defense';
  badgeEn: string;
  badgeAr: string;
  purposeEn: string;
  purposeAr: string;
  detailsEn: string;
  detailsAr: string;
  iconName: 'network' | 'shield' | 'search' | 'alert' | 'lock' | 'cpu';
  isPacketAnalyzerOnly?: boolean;
}

export interface TechniqueItem {
  id: string;
  number: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  mechanismEn: string;
  mechanismAr: string;
  mitigationEn: string;
  mitigationAr: string;
  iconName: 'arp' | 'dns' | 'wifi' | 'session' | 'https';
}

export interface RiskItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  impactLevelEn: string;
  impactLevelAr: string;
  examplesEn: string[];
  examplesAr: string[];
  icon: 'data' | 'privacy' | 'account' | 'finance';
}

export interface StageItem {
  stage: number;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  statusTextEn: string;
  statusTextAr: string;
  victimViewEn?: string;
  victimViewAr?: string;
  attackerActionEn?: string;
  attackerActionAr?: string;
  serverViewEn?: string;
  serverViewAr?: string;
  packetSampleEn?: string;
  packetSampleAr?: string;
  takeawayEn?: string;
  takeawayAr?: string;
}
