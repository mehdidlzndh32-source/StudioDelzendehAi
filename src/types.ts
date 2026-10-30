export type Language = 'fa' | 'en';

export type UserRole = 
  | 'owner' 
  | 'admin' 
  | 'accountant' 
  | 'reviewer' 
  | 'operator' 
  | 'member' 
  | 'viewer';

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  email: string;
  personalEmail?: string;
  phone?: string;
  role: UserRole;
  nationalId?: string;
  avatar?: string;
  organization: string;
}

export type MainSection =
  | 'overview'
  | 'cosmic-galaxy'
  | 'code-studio'
  | 'tasks-gazette'
  | 'super-app-builder'
  | 'cinematic-studio'
  | 'enterprise-editor'
  | '3d-studio'
  | 'telephony'
  | 'music-podcast'
  | 'agents'
  | 'truth-gate'
  | 'about-team'
  | 'enterprise'
  | 'crypto-bot'
  | 'psychotherapy'
  | 'smart-shopping'
  | 'content-factory'
  | 'banking-vault'
  | 'finance-fund'
  | 'omnicursor'
  | 'api-center'
  | 'system-guardian'
  | 'domainbrain'
  | 'deploy-wizard';

export interface AgentInfo {
  id: string;
  number: number;
  name: string;
  nameFa: string;
  category: 'core' | 'engineering' | 'content' | 'compliance' | 'finance' | 'social';
  role: string;
  roleFa: string;
  status: 'idle' | 'running' | 'completed' | 'verifying';
  accuracy: number;
  lastAction: string;
  channel?: string;
}

export interface TruthInspection {
  id: string;
  title: string;
  source: string;
  credibilityScore: number; // 0-100
  hallucinationRisk: 'low' | 'medium' | 'high';
  copyrightStatus: 'verified' | 'pending' | 'flagged';
  decision: 'approved' | 'approved_with_edits' | 'needs_human_review' | 'rejected';
  auditLog: string[];
  submittedBy: string;
  timestamp: string;
}

export interface FinancialEntry {
  id: string;
  title: string;
  type: 'income' | 'expense' | 'fund_allocation' | 'trading_fee';
  amount: number;
  currency: 'IRR' | 'USD' | 'USDT' | 'EUR';
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected';
  scope: 'personal' | 'organization';
  preparedByRole: 'accountant' | 'owner';
  approvedBy?: string;
  rejectionReason?: string;
  category: string;
  date: string;
}

export interface TradingPair {
  symbol: string;
  exchange: 'Nobitex' | 'Wallex' | 'Binance' | 'Kraken';
  price: number;
  change24h: number;
  rsi: number;
  macd: 'bullish' | 'bearish' | 'neutral';
  signal: 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL';
  winRate: number;
}

export interface EmployeeStatus {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'on_site' | 'remote' | 'leave';
  lat: number;
  lng: number;
  locationName: string;
  faceVerified: boolean;
  tasksCompleted: number;
  totalTasks: number;
}

export interface ShoppingOrder {
  id: string;
  itemTitle: string;
  platform: 'Digikala' | 'SnappExpress' | 'Amazon' | 'Direct';
  priceToman: number;
  priceCrypto: string;
  status: 'scanned' | 'purchased' | 'in_transit' | 'delivered';
  currentCheckpoint: string;
  blockchainHash: string;
  trackingCode: string;
}

export interface ExecutiveTeamMember {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  department: string;
  officialEmail: string;
  avatar: string;
  bio: string;
  specializations: string[];
  education: string;
  clearanceLevel: 'Root Owner' | 'Executive VP' | 'Chief Officer' | 'Director';
  privateAccessToken: string;
  tokenExpires: string;
  status: 'active' | 'on_mission' | 'online';
  tasksHandled: number;
}
