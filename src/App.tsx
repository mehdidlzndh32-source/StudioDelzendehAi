import React, { useState, useEffect } from 'react';
import { MainSection, UserRole } from './types';
import { INITIAL_USER } from './data/mockData';
import { TopNavbar } from './components/TopNavbar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { CosmicGalaxyStudio } from './components/CosmicGalaxyStudio';
import { FullstackSuperAppBuilder } from './components/FullstackSuperAppBuilder';
import { CinematicVideoStudio } from './components/CinematicVideoStudio';
import { AllInOneEnterpriseEditor } from './components/AllInOneEnterpriseEditor';
import { ThreeStudio } from './components/ThreeStudio';
import { DubbingStudioModule } from './components/DubbingStudioModule';
import { TruthGatePanel } from './components/TruthGatePanel';
import { AgentsOrchestrator } from './components/AgentsOrchestrator';
import { CryptoBotModule } from './components/CryptoBotModule';
import { PsychotherapyModule } from './components/PsychotherapyModule';
import { SmartShoppingModule } from './components/SmartShoppingModule';
import { FinanceFundModule } from './components/FinanceFundModule';
import { EnterpriseModule } from './components/EnterpriseModule';
import { ContentFactoryModule } from './components/ContentFactoryModule';
import { OmniCursorModule } from './components/OmniCursorModule';
import { ApiKeyCenterModule } from './components/ApiKeyCenterModule';
import { SystemGuardianModule } from './components/SystemGuardianModule';
import { DomainBrainModule } from './components/DomainBrainModule';
import { DeploymentGuide } from './components/DeploymentGuide';
import { VirtualTelephonyModule } from './components/VirtualTelephonyModule';
import { MusicPodcastFactoryModule } from './components/MusicPodcastFactoryModule';
import { CodeStudioModule } from './components/CodeStudioModule';
import { DailyGazetteAndTasksModule } from './components/DailyGazetteAndTasksModule';
import { GlobalBankingLogisticsModule } from './components/GlobalBankingLogisticsModule';
import { AboutUsTeamModule } from './components/AboutUsTeamModule';
import { FloatingOmniCursorFAB } from './components/FloatingOmniCursorFAB';

import {
  LayoutDashboard,
  Box,
  Mic,
  ShieldCheck,
  Bot,
  TrendingUp,
  HeartPulse,
  ShoppingBag,
  PiggyBank,
  Users,
  Flame,
  MousePointer2,
  KeyRound,
  HardDrive,
  Globe,
  Cloud,
  Menu,
  X,
  Sparkles,
  Orbit,
  Code2,
  Film,
  FileEdit,
  Phone,
  Music,
  Newspaper,
  Satellite,
  Wallet
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<MainSection | 'dubbing'>('overview');
  const [userRole, setUserRole] = useState<UserRole>('owner');
  const [lang, setLang] = useState<'fa' | 'en' | 'ar'>('fa');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync RTL / LTR dynamically
  useEffect(() => {
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
  }, [lang]);

  const navItems = [
    { id: 'overview', label: 'داشبورد ۸ ویجت زنده', labelEn: '8-Live Widgets HUD', icon: LayoutDashboard },
    { id: 'cosmic-galaxy', label: 'کهکشان ۳D و منظومه شمسی', labelEn: '3D Cosmic Galaxy & Sun', icon: Orbit, badge: 'Live 3D' },
    { id: 'super-app-builder', label: 'سازنده سایت و سوپراپلیکیشن', labelEn: 'SuperApp & FullStack Builder', icon: Code2, badge: 'Unlimited' },
    { id: 'cinematic-studio', label: 'استودیو فیلم‌های سینمایی', labelEn: 'Cinematic & Course Studio', icon: Film, badge: '8K Master' },
    { id: 'enterprise-editor', label: 'ویرایشگر همه‌کاره سازمانی', labelEn: 'Enterprise Visual Editor', icon: FileEdit },
    { id: '3d-studio', label: 'استودیو ۳D و مجسمه‌سازی', labelEn: '3D CAD & Sculpt Studio', icon: Box, badge: 'CAD' },
    { id: 'dubbing', label: 'دوبله و لیپ‌سینک سینمایی', labelEn: 'Neural Lip-Sync Dubbing', icon: Mic, badge: 'Voice' },
    { id: 'truth-gate', label: 'دروازه حقیقت Truth Gate', labelEn: 'Truth Gate Anti-Fake', icon: ShieldCheck, badge: 'Zero-Fake' },
    { id: 'agents', label: '۲۵ ایجنت خودگردان', labelEn: '25 Autonomous Agents', icon: Bot, count: '25' },
    { id: 'crypto-bot', label: 'ربات تریدینگ جفتی', labelEn: 'Crypto Pair Trading Bot', icon: TrendingUp },
    { id: 'psychotherapy', label: 'رواندرمانی دیجیتال CBT', labelEn: 'AI CBT Psychotherapy', icon: HeartPulse },
    { id: 'tasks-gazette', label: 'روزنامه صبحگاهی و تکمیل وظایف مالک', labelEn: 'Executive Daily Gazette & Tasks Hub', icon: Newspaper, badge: 'mehdidlzndh' },
    { id: 'code-studio', label: 'محیط کدنویسی و توسعه لبه (IDE)', labelEn: 'Cloud IDE & Code Studio', icon: Code2, badge: 'V8 Sandbox' },
    { id: 'banking-vault', label: 'بانکداری، والت سرد/گرم و رهگیری ماهواره‌ای', labelEn: 'Fiat/Crypto Banking & Satellite Logistics', icon: Satellite, badge: 'Live LEO' },
    { id: 'smart-shopping', label: 'فروشگاه جهانی و دراپ‌شیپینگ (علی‌بابا/تمو)', labelEn: 'Global Dropshipping & Affiliate (Ali/Temu)', icon: ShoppingBag, badge: 'High Profit' },
    { id: 'telephony', label: 'تلفن ثابت بین‌الملل و شماره مجازی', labelEn: 'Global Virtual Telephony (DID)', icon: Phone, badge: 'Voice/SMS' },
    { id: 'music-podcast', label: 'استودیو موزیک، ترانه و پادکست AI', labelEn: 'AI Music, Tracks & Podcast Factory', icon: Music, badge: 'Monetized' },
    { id: 'finance-fund', label: 'صندوق توسعه ۵٪ و حسابداری', labelEn: '5% Development Fund', icon: PiggyBank },
    { id: 'about-team', label: 'درباره ما و اعضای تیم تخصصی', labelEn: 'About Us & Executive Team', icon: Users, badge: 'Official Bio' },
    { id: 'enterprise', label: 'مدیریت سازمانی و ماهواره', labelEn: 'Enterprise HR & Satellite', icon: Users },
    { id: 'content-factory', label: 'کارخانه محتوا، کانال‌ها و ربات‌ها', labelEn: 'Content Factory & Dedicated Bots', icon: Flame, badge: '8 Networks' },
    { id: 'omnicursor', label: 'موشواره هوشمند اسناد', labelEn: 'OmniCursor Screen AI', icon: MousePointer2 },
    { id: 'api-center', label: 'مرکز امن کلیدهای API', labelEn: 'API Key Center & Vault', icon: KeyRound },
    { id: 'system-guardian', label: 'محافظ سیستم و بهینه‌ساز فضا', labelEn: 'System Guardian & Cleaner', icon: HardDrive },
    { id: 'domainbrain', label: 'دامنه‌ها و گواهی مالکیت', labelEn: 'DomainBrain & Ownership', icon: Globe },
    { id: 'deploy-wizard', label: 'راهنمای استقرار Cloudflare', labelEn: 'Cloudflare Deployment Guide', icon: Cloud, badge: 'Edge R2/D1' },
  ];

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar with role switcher & telemetry */}
      <TopNavbar
        activeSection={activeSection}
        currentRole={userRole}
        onRoleChange={setUserRole}
        lang={lang}
        onLangChange={setLang}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 text-amber-400 flex items-center justify-center shadow-xl cursor-pointer"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static top-[57px] bottom-0 z-30 w-72 bg-[#07090e]/95 lg:bg-[#07090e]/60 border-l border-slate-800/80 backdrop-blur-xl p-4 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-mono font-bold text-amber-400 tracking-wider">
              {lang === 'en' ? 'ENTERPRISE MODULES' : 'ماژول‌های تخصصی سیستم'}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-right flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{lang === 'en' ? item.labelEn : item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.count && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        isActive ? 'bg-slate-950 text-cyan-300' : 'bg-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Founder Attribution Card in Sidebar */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-[10px] text-slate-500 font-mono">OWNER & ARCHITECT</div>
            <div className="text-xs font-black text-amber-300">{INITIAL_USER.name}</div>
            <div className="text-[11px] text-slate-400 leading-tight">
              Aurevia AI Group International
            </div>
            <div className="text-[10px] font-mono text-cyan-400 pt-1">
              aurevia-ai.vercel.app
            </div>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {activeSection === 'overview' && (
            <OverviewDashboard onNavigate={setActiveSection} lang={lang} />
          )}
          {activeSection === 'cosmic-galaxy' && <CosmicGalaxyStudio />}
          {activeSection === 'super-app-builder' && <FullstackSuperAppBuilder />}
          {activeSection === 'cinematic-studio' && <CinematicVideoStudio />}
          {activeSection === 'enterprise-editor' && <AllInOneEnterpriseEditor />}
          {activeSection === '3d-studio' && <ThreeStudio />}
          {activeSection === 'dubbing' && <DubbingStudioModule />}
          {activeSection === 'truth-gate' && <TruthGatePanel />}
          {activeSection === 'agents' && <AgentsOrchestrator />}
          {activeSection === 'crypto-bot' && <CryptoBotModule />}
          {activeSection === 'psychotherapy' && <PsychotherapyModule />}
          {activeSection === 'tasks-gazette' && <DailyGazetteAndTasksModule />}
          {activeSection === 'code-studio' && <CodeStudioModule />}
          {activeSection === 'banking-vault' && <GlobalBankingLogisticsModule />}
          {activeSection === 'smart-shopping' && <SmartShoppingModule />}
          {activeSection === 'telephony' && <VirtualTelephonyModule />}
          {activeSection === 'music-podcast' && <MusicPodcastFactoryModule />}
          {activeSection === 'finance-fund' && <FinanceFundModule />}
          {activeSection === 'about-team' && <AboutUsTeamModule />}
          {activeSection === 'enterprise' && <EnterpriseModule />}
          {activeSection === 'content-factory' && <ContentFactoryModule />}
          {activeSection === 'omnicursor' && <OmniCursorModule />}
          {activeSection === 'api-center' && <ApiKeyCenterModule />}
          {activeSection === 'system-guardian' && <SystemGuardianModule />}
          {activeSection === 'domainbrain' && <DomainBrainModule />}
          {activeSection === 'deploy-wizard' && <DeploymentGuide lang={lang} />}
        </main>
      </div>

      {/* Responsive Multi-Language Floating Action Menu (FAB) */}
      <FloatingOmniCursorFAB
        currentSection={activeSection}
        onNavigate={setActiveSection}
        lang={lang}
        onLangChange={setLang}
      />
    </div>
  );
}
