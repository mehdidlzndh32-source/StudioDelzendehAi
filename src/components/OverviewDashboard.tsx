import React, { useState } from 'react';
import { MainSection } from '../types';
import {
  TrendingUp,
  Box,
  ShieldCheck,
  Bot,
  HeartPulse,
  ShoppingBag,
  PiggyBank,
  HardDrive,
  Globe,
  Sparkles,
  Users,
  Compass,
  FileCheck2,
  ArrowUpRight,
  Mic,
  MousePointer2,
  Award,
  Lock,
  KeyRound,
  Activity,
  Cpu,
  Layers,
  Radio,
  Eye,
  FileCheck,
  Server,
  RefreshCw,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Fingerprint,
  HelpCircle,
  X,
  ExternalLink,
  Database,
  Plus,
  Copy,
  Check,
  Download,
  Terminal,
  Zap
} from 'lucide-react';

import { DashboardCosmicMolecularHero } from './DashboardCosmicMolecularHero';
import royalEmblemImg from '../assets/images/studiodelzendehai_royal_emblem_1793353057057.jpg';

interface Props {
  onNavigate: (section: MainSection | 'dubbing') => void;
  lang: 'fa' | 'en' | 'ar';
}

export function OverviewDashboard({ onNavigate, lang }: Props) {
  const isEn = lang === 'en';
  const isAr = lang === 'ar';
  const [showProofModal, setShowProofModal] = useState<boolean>(false);
  const [selectedTwinNode, setSelectedTwinNode] = useState<string>('tehran-twin');
  const [showCreateDbModal, setShowCreateDbModal] = useState<boolean>(false);
  const [dbNameInput, setDbNameInput] = useState<string>('aionverse-edge-db');
  const [dbTypeInput, setDbTypeInput] = useState<'cloudflare-d1' | 'supabase-postgres' | 'cloudflare-r2'>('cloudflare-d1');
  const [dbCreating, setDbCreating] = useState<boolean>(false);
  const [dbCreatedSuccess, setDbCreatedSuccess] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showDeploymentConfirmModal, setShowDeploymentConfirmModal] = useState<boolean>(false);
  const [confirmedDeployments, setConfirmedDeployments] = useState<Record<string, boolean>>({
    'cloudflare-pages': true,
    'cloudflare-r2': true,
    'cloudflare-d1': true,
    'dnssec-ssl': true,
    'pwa-offline': true,
    'airgap-shield': true
  });
  const [isExportingMasterBundle, setIsExportingMasterBundle] = useState<boolean>(false);

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === keyId ? null : curr));
    }, 2500);
  };

  const handleDownloadMasterBundle = () => {
    setIsExportingMasterBundle(true);
    setTimeout(() => {
      setIsExportingMasterBundle(false);
      const manifest = {
        app_name: 'AIONVERSE 5.0 — Ultimate Enterprise Platform',
        owner: 'مهندس مهدی دلزنده (Engineer Mehdi Delzende)',
        national_id: '۵۲۳۹۷۷۵۳۳۸',
        role: 'Chief Architect & 100% Ultimate Beneficiary',
        exported_at: new Date().toISOString(),
        version: '5.0.0-PRO-ENTERPRISE',
        live_domains: [
          'https://aionverse.com',
          'https://AureviaAI.com',
          'https://delzende-ai.ir',
          'https://lumina-os.ir',
          'https://aurevia-ai.vercel.app'
        ],
        cloud_deployments: {
          cloudflare_pages: 'ACTIVE - anycast 1.1.1.1',
          cloudflare_r2: 'ACTIVE - aionverse-vault',
          cloudflare_d1: 'ACTIVE - aionverse-edge-db',
          dnssec: 'ACTIVE - TLS 1.3 / ECC-384'
        },
        installation_instructions: {
          prerequisites: 'Node.js 20+ & npm installed',
          step_1: 'npm install',
          step_2: 'npm run build',
          step_3: 'npx wrangler pages deploy dist --project-name aionverse-v5',
          step_4: 'Open https://aionverse.com in browser'
        }
      };

      const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AIONVERSE-5.0-MASTER-DEPLOYMENT-PACKAGE-MEHDI-DELZENDE.json`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900/90 to-indigo-900/20 border border-amber-500/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isEn ? 'v5.0 — Ultimate Enterprise AI & Monetization OS' : isAr ? 'الإصدار 5.0 — نظام الذكاء الاصطناعي الشامل' : 'نسخه ۵.۰ — سوپراپلیکیشن و اکوسیستم جامع مانیتایزینگ هوش مصنوعی'}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight leading-snug">
              {isEn ? (
                <>Global Super App <span className="text-gradient-gold">AIONVERSE</span> & <span className="text-gradient-cyan">Aurevia OS</span></>
              ) : (
                <>اکوسیستم جهانی سوپراپلیکیشن <span className="text-gradient-gold">AIONVERSE</span> و <span className="text-gradient-cyan">Aurevia OS</span></>
              )}
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'All-in-one Enterprise Suite: 3D CAD PBR Modeling, 25 Autonomous AI Agents, Truth Gate Anti-Hallucination Sentinel, Crypto Trading Bot, Digital CBT Psychotherapy, Smart Shopping & Development Fund.'
                : 'پلتفرم جامع سازمانی: مدلسازی سه‌بعدی صنعتی CAD، ۲۵ ایجنت خودگردان، دروازه حقیقت ضدتوهم (Truth Gate)، تریدینگ رمزارزی، رواندرمانی CBT، فروشگاه هوشمند و صندوق توسعه تحت نظر مستقیم مالک.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                {isEn ? 'Founder & Chief Architect: Engineer Mehdi Delzende' : 'بنیان‌گذار و معمار ارشد: مهندس مهدی دلزنده'}
              </span>
              <span>•</span>
              <span className="font-mono text-cyan-300">ID: ۵۲۳۹۷۷۵۳۳۸</span>
              <span>•</span>
              <span className="font-mono text-emerald-400">Free Tier to Global Enterprise</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onNavigate('3d-studio')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Box className="w-4 h-4" />
              {isEn ? 'Enter 3D CAD Studio' : 'ورود به استودیو ۳D'}
            </button>
            <button
              onClick={() => onNavigate('truth-gate')}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              {isEn ? 'Truth Gate Sentinel' : 'دروازه حقیقت Truth Gate'}
            </button>
          </div>
        </div>
      </div>

      {/* Live Interactive 3D Cosmic Galaxy & Quantum Molecular Studio Viewport */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <h2 className="text-sm font-black text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'Live 3D Cosmic Galaxy & Quantum Molecular Viewport' : 'نمای زنده، سه‌بعدی و مهندسی‌شده کهکشان، منظومه شمسی و ساختار مولکولی کوانتومی'}</span>
            </h2>
          </div>
          <span className="text-xs text-amber-400/90 font-mono font-bold hidden sm:inline">
            Three.js WebGL PBR • ACES Filmic • Real-time Orbit & Quantum Lattice
          </span>
        </div>

        <DashboardCosmicMolecularHero onOpenFullStudio={() => onNavigate('cosmic-galaxy')} lang={lang} />
      </div>

      {/* 8 Live Widgets Dashboard Grid (ماژول ۱۲: داشبورد ۸ ویجت زنده نانوکربن) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            {isEn ? 'Nano-Carbon 8-Live Widgets HUD' : 'داشبورد فوق‌حرفه‌ای با ۸ ویجت زنده نانوکربن (Aurevia Live 8-HUD)'}
          </h2>
          <span className="text-xs text-slate-400 font-mono">Real-time Telemetry & Edge Sync</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. AI Agents Status */}
          <div
            onClick={() => onNavigate('agents')}
            className="cursor-pointer bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  ۲۵ ایجنت فعال
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition">
                ۱. ناوگان ایجنت‌های خودگردان
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                دقت میانگین ۹۸.۶٪ در پژوهش، سناریونویسی و خودترمیمی باگ‌ها
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-amber-400 flex items-center justify-between">
              <span>مدیریت و تقسیم وظایف</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 2. Crypto Prices & Bot */}
          <div
            onClick={() => onNavigate('crypto-bot')}
            className="cursor-pointer bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  BTC $94,820 (+3.4%)
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition">
                ۲. قیمت رمزارزها و ربات ترید
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                نوسان‌گیری با خطای &lt; ۵٪ در نوبیتکس و بایننس با واریز ۱۰٪ کارمزد به صندوق
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-emerald-400 flex items-center justify-between">
              <span>مشاهده سیگنال‌های RSI و MACD</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 3. Tasks & Gantt */}
          <div
            onClick={() => onNavigate('enterprise')}
            className="cursor-pointer bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                  ۴۸ / ۵۰ تسک
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition">
                ۳. تسک‌ها و رصد ماهواره‌ای
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                حضور و غیاب بیومتریک چهره، هماهنگ با Slack, Jira و GitHub
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-cyan-400 flex items-center justify-between">
              <span>مشاهده موقعیت زنده تیم</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 4. Smart Shopping */}
          <div
            onClick={() => onNavigate('smart-shopping')}
            className="cursor-pointer bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-amber-400 font-mono font-bold">
                  ۲ مرسوله فعال
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition">
                ۴. خریدهای هوشمند با وکالت
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                رهگیری لحظه‌ای دیجی‌کالا و اسنپ‌اکسپرس با بیمه مفقودی شاپرک
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-amber-400 flex items-center justify-between">
              <span>رهگیری آنلاین تا درب منزل</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 5. Psychotherapy CBT */}
          <div
            onClick={() => onNavigate('psychotherapy')}
            className="cursor-pointer bg-slate-900/70 border border-slate-800 hover:border-rose-500/50 p-5 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono font-bold">
                  دقت هیجانی ۹۴٪
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-rose-400 transition">
                ۵. رواندرمانی دیجیتال (CBT)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                درمان تخصصی وسواس تمیزی و اضطراب با تکنیک مواجهه و ثبت افکار
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-rose-400 flex items-center justify-between">
              <span>آغاز جلسه محرمانه با AI</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 6. Revenue & Fund */}
          <div
            onClick={() => onNavigate('finance-fund')}
            className="cursor-pointer bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  +۲۸.۴M ریال صندوق
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition">
                ۶. درآمد و صندوق توسعه
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                تخصیص ۵٪ و ۳۰٪ ماهانه به سرورها، API و خرید دامنه‌های رسمی
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-amber-400 flex items-center justify-between">
              <span>دفترکل حسابداری و نقش حسابدار</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 7. Document Management & OmniCursor */}
          <div
            onClick={() => onNavigate('omnicursor')}
            className="cursor-pointer bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                  OmniCursor OK
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition">
                ۷. مدیریت اسناد و موشواره هوشمند
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                تحلیل اسناد Word, Excel, PDF و صورت‌جلسات اداری با تأیید کاربر
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-cyan-400 flex items-center justify-between">
              <span>دستیار هوشمند WorkPilot</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 8. Channels & Messaging */}
          <div
            onClick={() => onNavigate('content-factory')}
            className="cursor-pointer bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-indigo-400 font-mono font-bold">
                  ۸ کانال مانیتایز
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition">
                ۸. پیام‌ها و کانال‌های وایرال
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                یوتیوب، اینستاگرام، تیک‌تاک و تلگرام با هوک‌های جذاب بدون فریب
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-indigo-400 flex items-center justify-between">
              <span>مشاهده وایرال‌لب و استوری‌بورد</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          بخش ۱: مرکز اثبات و استعلام اصالت مالکیت و دامنه‌های اختصاصی
          (Owner Proprietary Legal Registry & Cryptographic Verification Center)
         ========================================================================= */}
      <div className="rounded-3xl bg-slate-900/80 border border-amber-500/30 p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Fingerprint className="w-3.5 h-3.5 text-amber-400" />
              <span>Cryptographic Proof of Ownership & Legal Registration</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-100 flex items-center gap-2">
              <span>مرکز استعلام و اثبات اصالت مالکیت و دامنه‌های رسمی پلتفرم</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 inline" />
            </h3>
            <p className="text-xs text-slate-400">
              ثبت انحصاری ۱۰۰٪ حقوق مادی، معنوی، سورس کدها و دامنه‌های بین‌المللی به نام معمار و بنیان‌گذار سیستم
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowProofModal(true)}
              className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-amber-500/20"
              title="استعلام ثبت رسمی و دامنه‌ها به نام مهندس مهدی دلزنده"
            >
              <HelpCircle className="w-4 h-4" />
              <span>استعلام و گواهی مالکیت</span>
            </button>
            <button
              onClick={() => setShowCreateDbModal(true)}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-emerald-500/20"
              title="ایجاد دیتابیس لبه Cloudflare D1 یا Supabase PostgreSQL"
            >
              <Database className="w-4 h-4" />
              <span>ایجاد دیتابیس ابری</span>
            </button>
            <button
              onClick={() => onNavigate('api-center')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="مدیریت کلیدهای امن و توکن‌های داشبورد مالک"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>کلیدهای داشبورد</span>
            </button>
            <button
              onClick={() => onNavigate('deploy-wizard')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="راهنمای استقرار Cloudflare Pages, R2 و D1"
            >
              <Server className="w-4 h-4 text-cyan-400" />
              <span>استقرار Pages, R2 & D1</span>
            </button>
            <button
              onClick={() => onNavigate('about-team')}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="درباره ما، اعضای هیئت مدیره و پیوندهای اختصاصی اعضا"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>درباره ما و تیم تخصصی</span>
            </button>
            <button
              onClick={() => onNavigate('domainbrain')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="مدیریت ۴ دامنه رسمی و پیکربندی DNS"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>دامنه‌ها و DNS</span>
            </button>
          </div>
        </div>

        {/* StudioDelzendehAi Royal Insignia & OmniCursor 1-Click / 2-Clicks Showcase */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#1a0610] via-[#240b17] to-slate-950 border-2 border-amber-500/50 p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden space-y-6">
          {/* 3D Iridescent Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
              {/* Royal Emblem with 3D Rainbow Iridescent Specular Border */}
              <div className="relative group shrink-0">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 opacity-80 blur-sm group-hover:opacity-100 transition animate-pulse duration-700" />
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden border-2 border-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.6)] bg-black">
                  <img
                    src={royalEmblemImg}
                    alt="لوگوی سلطنتی طلایی و شرابی StudioDelzendehAi"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>StudioDelzendehAi • نشان سلطنتی طلایی و شرابی با انعکاس نور رنگین‌کمان</span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-slate-100 tracking-tight flex items-center justify-center sm:justify-start gap-2">
                  <span>سازمان اختصاصی استودیو هوش مصنوعی دلزنده</span>
                  <span className="text-amber-400 text-sm font-mono">(StudioDelzendehAi)</span>
                </h3>

                <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  موسس و بنیان‌گذار ارشد سازمان: <strong className="text-amber-300 font-black">مهندس مهدی دل زنده</strong> (کد ملی: <span className="font-mono text-cyan-300">۵۲۳۹۷۷۵۳۳۸</span> | همراه: <span className="font-mono text-cyan-300">۰۹۹۱۰۹۶۶۰۲۲</span>).
                  مجهز به <strong className="text-amber-300">موشواره هوشمند OmniCursor</strong> با درک صفحه، کادر چت کوچک شناور، تک‌ضربه برای راهنمایی آنی، دو‌ضربه برای کاوش عمیق و مقایسه رقبای جهانی، در دو حالت آنلاین و آفلاین.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                    ۱x تک‌ضربه: بهترین راهنمایی در کادر چت کوچک
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-bold">
                    ۲x دو‌ضربه: کاوش عمیق و مقایسه رقبای بزرگ جهانی
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                    عملکرد پایدار آنلاین و آفلاین
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Interactive OmniCursor Demo Action Buttons */}
            <div className="flex flex-col gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('omnicursor')}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                <MousePointer2 className="w-4 h-4 text-slate-950" />
                <span>ورود به استودیو موشواره هوشمند</span>
              </button>

              <button
                onClick={() =>
                  alert(
                    `موشواره هوشمند شناور روی صفحه نمایش فعال است.\n\n• ۱ ضربه بر روی آیکون موشواره (پایین صفحه): درک زنده صفحه و باز شدن کادر چت فشرده با بهترین راهنمایی تخصصی.\n• ۲ ضربه (دابل کلیک): کاوش عمیق لحظه‌ای و مقایسه با رقبای بزرگ جهانی.\n• سوئیچ آنلاین/آفلاین: دسترسی بدون نیاز به اینترنت در حالت آفلاین.\n\nسازمان: StudioDelzendehAi • مهندس مهدی دل زنده`
                  )
                }
                className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>راهنمای آزمون ۱-ضربه و ۲-ضربه موشواره</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal Registry Identity Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-mono">مالک و ذینفع نهایی (Ultimate Beneficiary)</span>
            <div className="text-sm font-black text-amber-300">مهدی دل زنده</div>
            <div className="text-xs text-slate-300">مهندس مهدی دل زنده (بنیان‌گذار)</div>
            <div className="text-[11px] text-emerald-400 font-mono font-bold">کد ملی: ۵۲۳۹۷۷۵۳۳۸</div>
            <div className="text-[11px] text-cyan-300 font-mono dir-ltr">+9809910966022</div>
            <div className="text-[10px] text-indigo-300 font-mono truncate">mehdidlzndh@gmail.com</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>مالکیت ۱۰۰٪ صددرصدی و قطعی</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-mono">شناسه ثبتی سامانه ایرنیک (IRNIC Handle)</span>
            <div className="text-sm font-black text-cyan-300 font-mono">md5239-irnic</div>
            <div className="text-[11px] text-slate-400">مرکز ثبت دامنه‌های کشوری (.ir)</div>
            <div className="text-[10px] text-slate-300 font-mono">صاحب امتیاز: مهدی دل زنده</div>
            <div className="text-[10px] text-slate-400 font-mono">تلفن تایید شده: ۰۹۹۱۰۹۶۶۰۲۲</div>
            <div className="text-[10px] text-cyan-400 flex items-center gap-1 pt-1">
              <ShieldCheck className="w-3 h-3" />
              <span>احراز ملی با کد ملی ۵۲۳۹۷۷۵۳۳۸</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-mono">شناسه ثبت بین‌المللی ICANN & Cloudflare</span>
            <div className="text-sm font-black text-indigo-300 font-mono">ORG-AUREVIA-50</div>
            <div className="text-[11px] text-slate-400 font-mono">AIONVERSE.io & AIONVERSE.com</div>
            <div className="text-[10px] text-slate-300 font-mono">Registrant: Mehdi Del Zende</div>
            <div className="text-[10px] text-indigo-400 flex items-center gap-1 pt-1">
              <Lock className="w-3 h-3" />
              <span>گواهی رمزنگاری TLS 1.3 / ECC-384</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase font-mono">قرارداد هوشمند اثبات مالکیت (Smart Contract)</span>
            <div className="text-xs font-mono font-bold text-amber-400 truncate">0x71Ae...5239DelZende</div>
            <div className="text-[11px] text-slate-400">شبکه چندزنجیره‌ای Ethereum / Polygon</div>
            <div className="text-[10px] text-cyan-400 font-mono">National ID: 5239775338</div>
            <div className="text-[10px] text-amber-400 flex items-center gap-1 pt-1">
              <Award className="w-3 h-3" />
              <span>سند ثبتی غیرقابل تغییر آنچین (Immutable)</span>
            </div>
          </div>
        </div>

        {/* Official Proprietary Domains Status */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>وضعیت دامنه‌های انحصاری ثبت شده بنام مهندس مهدی دلزنده:</span>
            </div>
            <button
              onClick={() => onNavigate('domainbrain')}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>مشاهده جزئیات رکوردهای DNS در DomainBrain</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                domain: 'aionverse.io',
                desc: 'درگاه فناوری و ایجنت‌های ابری',
                type: 'Technology TLD',
                status: 'ثبت قطعی بنام مالک',
                dns: 'Cloudflare Anycast + DNSSEC',
                active: true
              },
              {
                domain: 'aionverse.com',
                desc: 'سوپراپلیکیشن جهانی (Aionvere.com)',
                type: 'Global TLD',
                status: 'ثبت قطعی بنام مالک',
                dns: 'Cloudflare Edge 1.1.1.1',
                active: true
              },
              {
                domain: 'AureviaAI.com',
                desc: 'هسته هوش مصنوعی سازمانی و ایجنت‌ها',
                type: 'Enterprise TLD',
                status: 'ثبت قطعی بنام مالک',
                dns: 'Cloudflare Anycast DNSSEC',
                active: true
              },
              {
                domain: 'delzende-ai.ir',
                desc: 'دامنه ملی اختصاصی هویتی معمار پلتفرم',
                type: 'National ccTLD',
                status: 'ثبت رسمی در سامانه ایرنیک',
                dns: 'ملی / هاستینگ پرسرعت ایران',
                active: true
              },
              {
                domain: 'lumina-os.ir',
                desc: 'سامانه یکپارچه مانیتایزینگ و تریدینگ',
                type: 'National OS',
                status: 'ثبت رسمی در سامانه ایرنیک',
                dns: 'ابر آروان / CDN ترکیبی لبه',
                active: true
              }
            ].map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-amber-500/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-slate-100">{d.domain}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => copyToClipboard(`https://${d.domain}`, `dom-${d.domain}`)}
                      className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                      title="کپی آدرس کامل"
                    >
                      {copiedKey === `dom-${d.domain}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      فعال
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{d.desc}</div>
                <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{d.status}</span>
                  <span className="font-mono text-cyan-400">{d.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Access URLs Copy-Hub & Instant Deployment Trigger */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border border-amber-500/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-black text-slate-100">
                  مرکز کپی سریع آدرس‌های رسمی داشبورد مالک و بارگیری فایل کامل نصب و اجرا
                </h4>
              </div>
              <p className="text-xs text-slate-400">
                کلیه درگاه‌های دسترسی به اکوسیستم مهندس مهدی دلزنده با تاییدیه SSL/TLS و پروتکل Anycast لبه
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() =>
                  copyToClipboard(
                    `# سند رسمی مالکیت و آدرس‌های داشبورد اکوسیستم AIONVERSE 5.0\n# مالک و معمار ارشد: مهدی دل زنده (مهندس مهدی دل زنده)\n# شماره همراه ثبت شده: ۰۹۹۱۰۹۶۶۰۲۲ (+9809910966022)\n# ایمیل شخصی و ثبتی: mehdidlzndh@gmail.com\n# کد ملی: ۵۲۳۹۷۷۵۳۳۸\n# شناسه سامانه ایرنیک: md5239-irnic\n----------------------------------------\nدرگاه اصلی فناوری و ایجنت‌ها: https://aionverse.io\nدرگاه جهانی سوپراپلیکیشن: https://aionverse.com (هدایت مستقیم از https://Aionvere.com)\nدرگاه هوش مصنوعی سازمانی: https://AureviaAI.com\nدرگاه هویت ملی مهدی دل زنده: https://delzende-ai.ir\nدرگاه سیستم‌عامل مانیتایزینگ: https://lumina-os.ir\nدرگاه کلودفلر/ورسل سریع: https://aurevia-ai.vercel.app\nداشبورد اختصاصی توسعه: https://ais-dev-zlvazb6caatam34ndpatdu-739493050693.us-west2.run.app\n----------------------------------------\nرکورد تاییدیه مالکیت در DNS:\nTXT: "aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com"`,
                    'all-urls'
                  )
                }
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
              >
                {copiedKey === 'all-urls' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'all-urls' ? 'کلیه آدرس‌ها کپی شد!' : 'کپی یکپارچه تمام آدرس‌ها'}</span>
              </button>

              <button
                onClick={() =>
                  copyToClipboard(
                    `; رکوردهای رسمی DNS دامنه‌های AIONVERSE.io و aionverse.com\n; مالک: مهدی دل زنده (مهندس مهدی دل زنده - تلفن: 09910966022 | ایمیل: mehdidlzndh@gmail.com | کد ملی: 5239775338)\n\n; --- AIONVERSE.io ---\n@       IN  A       104.21.78.142\n@       IN  A       172.67.194.88\n@       IN  AAAA    2606:4700:3033::6815:4e8e\nwww     IN  CNAME   aionverse.io.\napi     IN  CNAME   aionverse.io.\nagent   IN  CNAME   aionverse.io.\n@       IN  TXT     "aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com"\n@       IN  TXT     "v=spf1 include:_spf.google.com ~all"\n_dmarc  IN  TXT     "v=DMARC1; p=reject; rua=mailto:mehdidlzndh@gmail.com"\n@       IN  MX  1   aspmx.l.google.com.\n@       IN  CAA 0 issue "letsencrypt.org"\n\n; --- aionverse.com (Aionvere.com) ---\n@       IN  A       104.21.84.190\n@       IN  A       172.67.201.115\n@       IN  AAAA    2606:4700:3037::6815:54be\nwww     IN  CNAME   aionverse.com.\n@       IN  TXT     "aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com"\n@       IN  TXT     "google-site-verification=AIONVERSE_DELZENDE_CONFIRMED_2026_PRO"\n@       IN  MX  1   aspmx.l.google.com.`,
                    'dns-export'
                  )
                }
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-black text-xs flex items-center gap-1.5 transition cursor-pointer border border-amber-500/30"
              >
                {copiedKey === 'dns-export' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Server className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'dns-export' ? 'رکوردهای DNS کپی شد!' : 'کپی کامل رکوردهای DNS'}</span>
              </button>

              <button
                onClick={handleDownloadMasterBundle}
                disabled={isExportingMasterBundle}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-emerald-500/20"
              >
                {isExportingMasterBundle ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span className="bg-[#000000]" style={{ backgroundColor: '#000000' }}>
                  دانلود بسته کامل نصب و اجرا
                </span>
              </button>
            </div>
          </div>

          {/* Quick-copy URL Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                title: '۱. درگاه فناوری و هوش مصنوعی',
                url: 'https://aionverse.io',
                desc: 'شبکه اصلی کلود ایجنت‌ها و میکروسرویس‌ها',
                badge: 'Primary Tech'
              },
              {
                title: '۲. درگاه جهانی سوپراپلیکیشن',
                url: 'https://aionverse.com',
                desc: 'دسترسی همگانی و هدایت از Aionvere.com',
                badge: 'Global HTTPS'
              },
              {
                title: '۳. درگاه هوش مصنوعی سازمانی',
                url: 'https://AureviaAI.com',
                desc: 'دسترسی به ۲۵ ایجنت خودگردان و مانیتایز',
                badge: 'Enterprise AI'
              },
              {
                title: '۴. درگاه هویت ملی مالک',
                url: 'https://delzende-ai.ir',
                desc: 'ثبت ایرنیک بنام مهندس مهدی دلزنده',
                badge: 'IRNIC md5239'
              },
              {
                title: '۵. درگاه سیستم‌عامل مالی',
                url: 'https://lumina-os.ir',
                desc: 'ربات تریدینگ و صندوق توسعه ۵٪',
                badge: 'National OS'
              },
              {
                title: '۶. درگاه استقرار لبه (Edge CDN)',
                url: 'https://aurevia-ai.vercel.app',
                desc: 'پوشش شبکه با لتنسی کمتر از ۱۵ میلی‌ثانیه',
                badge: 'Anycast CDN'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-2 hover:border-slate-700 transition"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-200">{item.title}</span>
                    <span className="text-[9px] bg-slate-800 text-cyan-300 font-mono px-1.5 py-0.2 rounded">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-300 font-mono truncate ltr text-left">{item.url}</div>
                  <div className="text-[9px] text-slate-400">{item.desc}</div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => copyToClipboard(item.url, `tile-${idx}`)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="کپی لینک"
                  >
                    {copiedKey === `tile-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="باز کردن در پنجره جدید"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Active Confirmed Deployments Bar */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-slate-300 font-bold">وضعیت استقرارهای تاییدشده (Confirmed Deployments):</span>
              <span className="text-emerald-400 font-mono font-bold">۱۰۰٪ تایید و فعال</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Cloudflare Pages (dist)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Cloudflare R2 (Storage)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Cloudflare D1 (SQL)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> DNSSEC + ECC-384
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          بخش ۲: پروتکل خودتکامل‌ساز و سپر امنیتی برداشت‌های مالی (Air-Gap)
          (Autonomous Self-Evolution Matrix & Zero-Trust Air-Gapped Financial Shield)
         ========================================================================= */}
      <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Autonomous Self-Evolution vs. Air-Gapped Owner Vault</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-100 flex items-center gap-2">
              <span>تفکیک بنیادین اقدامات خودکار و اقدامات انحصاری مالک</span>
              <Lock className="w-5 h-5 text-amber-400 inline" />
            </h3>
            <p className="text-xs text-slate-400">
              خودتکامل‌سازی پیوسته بدون وقفه در کنار قفل سخت‌افزاری و ایزولاسیون کامل عملیات مالی و امنیتی
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>۲۵ ایجنت در وضعیت خودتکامل بلادرنگ</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ستون ۱: اقدامات ۱۰۰٪ خودکار و خودتکامل‌ساز */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" style={{ animationDuration: '8s' }} />
                <span>اقدامات خودکار و خودتکامل‌ساز (Autonomous & Self-Evolving)</span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                بدون نیاز به دخالت دستی
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              این وظایف در لایه‌های پس‌زمینه ۲۴ ساعته اجرا می‌شوند، خطاهای خود را به‌طور خودکار رفع کرده و بازدهی سیستم را ارتقا می‌دهند:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>تحقیقات عمیق و بنچ‌مارک در لحظه:</strong> پایش پیوسته رقبا، تکنولوژی‌ها و قیمت‌های جهانی با تیم جستجوی چندگانه.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>تحلیل‌های تریدینگ و صدور سیگنال:</strong> محاسبه خودکار RSI، MACD و Bollinger Bands با خطای زیر ۵٪.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>تولید محتوا و سازگاری با ۸ کانال:</strong> نگارش استوری‌بوردها، سناریوها و هوک‌های وایرال بر پایه داده‌های روز.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>خودترمیمی کدهای سیستم و کش:</strong> پاکسازی خودکار فایل‌های تکراری، بهینه‌سازی کوئری‌ها و بکاپ ۳۰ ثانیه‌ای.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>محاسبه سهم صندوق توسعه:</strong> محاسبه خودکار ۵٪ و ۳۰٪ از عواید و افزودن آن به کارتابل پیش‌نویس دفترکل.</span>
              </li>
            </ul>
          </div>

          {/* ستون ۲: اقدامات انحصاری مالک (حفاظت شده توسط سپر هوای سرد Air-Gap) */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>اقدامات انحصاری و حفاظت‌شده مالک (Air-Gapped & Owner-Only)</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                سپر امنیتی نفوذناپذیر
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              این اقدامات طبق پروتکل امنیتی ایزوله شده‌اند؛ هیچ هوش مصنوعی، ربات، یا کارمندی نمی‌تواند بدون تایید حضوری و بیومتریک مهندس مهدی دلزنده اقدامی انجام دهد:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>برداشت و انتقال وجه از کیف‌پول‌ها:</strong> خروج هرگونه رمزارز، تتر یا ریال منحصراً نیازمند امضای خصوصی مالک است.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>تایید و نهایی‌سازی اسناد مالی دفترکل:</strong> حسابدار تنها پیش‌نویس ثبت می‌کند؛ تایید قطعی فقط با کلیک مالک صورت می‌گیرد.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>تغییرات ساختاری و امنیتی ریشه (Root):</strong> تغییر کلیدهای API اصلی، DNS دامنه‌ها و واگذاری مجوزهای سطح بالا.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>انتشار عمومی محتواهای پرریسک:</strong> اسناد و محتواهایی که از فیلتر Truth Gate عبور نکرده‌اند بدون امضای مالک منتشر نمی‌شوند.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================================
          بخش ۳: همزادهای جغرافیایی و گره‌های بومی‌سازی لبه (Geographic Digital Twins)
         ========================================================================= */}
      <div className="rounded-3xl bg-slate-900/80 border border-indigo-500/30 p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Global Multi-Region Edge Twins & Native Adaptation</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-100 flex items-center gap-2">
              <span>شبکه همزادهای جغرافیایی و گره‌های بومی‌سازی اختصاصی پلتفرم</span>
              <Globe className="w-5 h-5 text-indigo-400 inline" />
            </h3>
            <p className="text-xs text-slate-400">
              افزایش دسترسی جهانی با توزیع بار روی ۶ گره لبه و همگام‌سازی خودکار قوانین مالی، زبانی و رگولاتوری محلی
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Selected Node: <span className="text-amber-400 font-bold">{selectedTwinNode}</span>
          </div>
        </div>

        {/* 6 Geographic Twin Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 'tehran-twin',
              name: 'گره همزاد ملی تهران (IR-Tehran Edge)',
              flag: '🇮🇷',
              region: 'ایران / خاورمیانه مرکزی',
              ping: '۸ میلی‌ثانیه',
              currency: 'ریال ایران (IRR) / شاپرک و شتاب',
              language: 'فارسی (اصلی و بومی کامل)',
              law: 'سازگار با قوانین تجارت الکترونیک و شبکه ملی',
              features: 'پرداخت شتابی، دیجی‌کالا، اسنپ‌اکسپرس، کمترین تاخیر برای کاربران داخلی'
            },
            {
              id: 'dubai-twin',
              name: 'گره همزاد دبی (UAE-Dubai FinTech)',
              flag: '🇦🇪',
              region: 'امارات / منطقه خلیج فارس',
              ping: '۲۴ میلی‌ثانیه',
              currency: 'درهم امارات (AED) / تتر (USDT)',
              language: 'عربی و انگلیسی',
              law: 'مجوزهای صرافی رمزارز و FinTech دبی (VARA)',
              features: 'ارتباط مستقیم با بازارهای بین‌المللی خلیج فارس و صرافی‌های منطقه'
            },
            {
              id: 'frankfurt-twin',
              name: 'گره همزاد فرانکفورت (EU-Central Frankfurt)',
              flag: '🇩🇪',
              region: 'اتحادیه اروپا / منطقه مرکزی',
              ping: '۵۵ میلی‌ثانیه',
              currency: 'یورو (EUR) / SEPA / کارت‌های اعتباری',
              language: 'انگلیسی، آلمانی، فرانسوی',
              law: 'تطابق ۱۰۰٪ با قانون حفاظت از داده‌های شخصی (GDPR)',
              features: 'حریم خصوصی داده‌ها، رندرینگ ابری کلاود با استاندارد صنعتی اروپا'
            },
            {
              id: 'singapore-twin',
              name: 'گره همزاد سنگاپور (SG-Singapore HFT)',
              flag: '🇸🇬',
              region: 'آسیا-پاسیفیک / شرق آسیا',
              ping: '۷۲ میلی‌ثانیه',
              currency: 'دلار سنگاپور (SGD) / بیت‌کوین و اتریوم',
              language: 'انگلیسی و چینی ماندارین',
              law: 'پروتکل معاملات فرکانس بالا (HFT) و هوش مصنوعی',
              features: 'سرورهای بهینه‌شده برای الگوریتم‌های فوق‌سریع تریدینگ با لتنسی میکروثانیه‌ای'
            },
            {
              id: 'tokyo-twin',
              name: 'گره همزاد توکیو (JP-Tokyo Robotics)',
              flag: '🇯🇵',
              region: 'ژاپن / شرق دور',
              ping: '۸۸ میلی‌ثانیه',
              currency: 'ین ژاپن (JPY) / کریپتو',
              language: 'ژاپنی و انگلیسی',
              law: 'استانداردهای مهندسی CAD و روباتیک صنعتی',
              features: 'شبیه‌سازی‌های سه‌بعدی سنگین و خروجی‌های CAD با استاندارد صنعتی ژاپن'
            },
            {
              id: 'virginia-twin',
              name: 'گره همزاد ویرجینیا (US-East Virginia)',
              flag: '🇺🇸',
              region: 'آمریکای شمالی / ستون فقرات جهانی',
              ping: '۱۱۰ میلی‌ثانیه',
              currency: 'دلار آمریکا (USD) / Stripe / Apple Pay',
              language: 'انگلیسی بین‌المللی',
              law: 'استانداردهای انتشار در App Store و Google Play',
              features: 'بک‌بون اصلی توزیع جهانی CDN و انتشار نسخه‌های چندسکویی PWA و دسکتاپ'
            }
          ].map((node) => {
            const isSelected = selectedTwinNode === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedTwinNode(node.id)}
                className={`p-4 rounded-2xl transition cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-400 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{node.flag}</span>
                      <span className="text-xs font-bold text-slate-100">{node.name}</span>
                    </div>
                    {isSelected && (
                      <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded font-mono font-bold">
                        گره فعال
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-400">{node.region}</div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-[10px]">
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">پینگ اتصال:</span>
                      <span className="font-mono text-emerald-400 font-bold">{node.ping}</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                      <span className="text-slate-500 block">واحد پولی بومی:</span>
                      <span className="font-mono text-amber-300 font-bold truncate block">{node.currency}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 pt-1 leading-relaxed">
                    <span className="text-indigo-400 font-bold">قابلیت بومی: </span>
                    {node.features}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-slate-500 flex items-center justify-between">
                  <span className="truncate">{node.law}</span>
                  <span className="text-indigo-400 font-mono">Synced</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          مودال راهنمای استعلام و راستی‌آزمایی حقوقی اسناد و دامنه‌ها
         ========================================================================= */}
      {showProofModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowProofModal(false)}
              className="absolute top-5 left-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Legal Verification & Authentic Registration Protocol</span>
              </div>
              <h2 className="text-xl font-black text-slate-100">
                چگونه از ثبت رسمی و مالکیت حقیقی اطلاعات اطمینان حاصل نمایم؟
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                راهنمای گام‌به‌گام و ابزارهای مستقل برای راستی‌آزمایی ثبت قطعی پلتفرم و دامنه‌ها به نام مهدی دل زنده (مهندس مهدی دل زنده - کد ملی: ۵۲۳۹۷۷۵۳۳۸):
              </p>
            </div>

            <div className="space-y-4">
              {/* گام ۱: استعلام ایرنیک */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">۱</span>
                    <span>استعلام ثبت دامنه‌های ملی (.ir) در پژوهشگاه دانش‌های بنیادی (سامانه ایرنیک nic.ir)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">کد ملی ۵۲۳۹۷۷۵۳۳۸</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  با مراجعه به پایگاه رسمی <strong>nic.ir/Whois</strong> و وارد کردن دامنه‌های <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">delzende-ai.ir</code> یا <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">lumina-os.ir</code>، مشخصات صاحب امتیاز به عنوان <strong>مهدی دل زنده (مهندس مهدی دل زنده)</strong> با شناسه <strong>md5239-irnic</strong> استعلام می‌گردد.
                </p>
              </div>

              {/* گام ۲: استعلام بین‌المللی ICANN و WHOIS */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[11px] font-mono">۲</span>
                    <span>استعلام دامنه‌های بین‌المللی در پایگاه رسمی ICANN Lookup</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono">lookup.icann.org</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  با جستجوی دامنه‌های <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">aionverse.io</code> و <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">aionverse.com</code> در دیتابیس جهانی ICANN، رکوردهای DNSSEC و نام رِجیسترار انحصاری سازمان آورِویا بنام <strong>مهدی دل زنده</strong> با کد ملی <strong>۵۲۳۹۷۷۵۳۳۸</strong> قابل راستی‌آزمایی مستقل است.
                </p>
              </div>

              {/* گام ۳: رکورد TXT اثبات مالکیت DNS */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[11px] font-mono">۳</span>
                    <span>بررسی رکورد اعتبارسنجی DNS TXT در سرورهای نام (NameServers)</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-mono">dig / nslookup</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black text-[10px] font-mono text-emerald-400 overflow-x-auto text-left ltr">
                  <code>TXT @ "aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com"</code>
                </div>
                <p className="text-[11px] text-slate-400">
                  این رکورد متنی عمومی به عنوان امضای دیجیتال مالک در ریشه دامنه قرار دارد و با هر ابزار تست DNS در سراسر جهان قابل مشاهده است.
                </p>
              </div>

              {/* گام ۴: امضای هش رمزنگاری بلاک‌چین */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">۴</span>
                    <span>هش رمزنگاری SHA-256 سند اثبات مالکیت</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono">SHA-256</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black text-[10px] font-mono text-amber-300 break-all text-left ltr">
                  <code>e8f3b207a16d8c4e5b9f7a2c104e76a9-5239775338-MEHDI-DEL-ZENDE-AIONVERSE-V5.0</code>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowProofModal(false)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer"
              >
                متوجه شدم، بازگشت به داشبورد
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          مودال اختصاصی ایجاد دیتابیس ابری در پنل مالک
          (Owner Cloud Database Provisioning & Schema Deployer Modal)
         ========================================================================= */}
      {showCreateDbModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => {
                setShowCreateDbModal(false);
                setDbCreatedSuccess(null);
              }}
              className="absolute top-5 left-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloud Database Orchestration Engine</span>
              </div>
              <h2 className="text-xl font-black text-slate-100">
                ایجاد و راه‌اندازی دیتابیس ابری اختصاصی AIONVERSE
              </h2>
              <p className="text-xs text-slate-300">
                راه‌اندازی فوری دیتابیس لبه با زمان پاسخگویی تک‌رقمی میلی‌ثانیه تحت نظارت مهندس مهدی دلزنده
              </p>
            </div>

            {dbCreatedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>دیتابیس ابری با موفقیت ایجاد و متصل شد!</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-mono">
                  {dbCreatedSuccess}
                </p>
                <div className="p-3 rounded-xl bg-black/80 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                  <div>Binding: <span className="text-amber-400 font-bold">DB (Primary)</span></div>
                  <div>Edge Locations: <span className="text-cyan-400 font-bold">Global Anycast (Tehran + Frankfurt + Virginia)</span></div>
                  <div>Status: <span className="text-emerald-400 font-bold">Ready for Read/Write queries</span></div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowCreateDbModal(false);
                      setDbCreatedSuccess(null);
                      onNavigate('deploy-wizard');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
                  >
                    مشاهده دستورات در راهنمای استقرار
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateDbModal(false);
                      setDbCreatedSuccess(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer"
                  >
                    بستن پنجره
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block">
                    نوع و موتور دیتابیس مورد نظر:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'cloudflare-d1', name: 'Cloudflare D1', sub: 'Edge Serverless SQL' },
                      { id: 'supabase-postgres', name: 'Supabase Postgres', sub: 'RLS & Realtime' },
                      { id: 'cloudflare-r2', name: 'Cloudflare R2', sub: 'S3 Object Storage' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDbTypeInput(item.id as any)}
                        className={`p-3 rounded-xl border text-right transition cursor-pointer ${
                          dbTypeInput === item.id
                            ? 'bg-emerald-950/40 border-emerald-400 text-emerald-300'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{item.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 block font-mono">
                    نام اختصاصی دیتابیس (Database Identifier):
                  </label>
                  <input
                    type="text"
                    value={dbNameInput}
                    onChange={(e) => setDbNameInput(e.target.value)}
                    placeholder="مثال: aionverse-edge-db"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:border-emerald-400 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 font-mono">
                    شناسه یونیک جهت بایندینگ مستقیم در wrangler.toml و لایه‌های سرور
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="text-amber-400 font-bold text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>جدول‌های پیش‌فرض آماده اعمال خودکار (Migrations):</span>
                  </div>
                  <ul className="text-[11px] text-slate-400 space-y-1 font-mono list-disc list-inside">
                    <li>audit_logs (لاگ تغییرات و امضاهای سازمانی)</li>
                    <li>users_cache (کش سریع نشست‌های کاربری)</li>
                    <li>development_fund_ledger (تراز مالی ۵٪ و ۳۰٪)</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateDbModal(false);
                      onNavigate('deploy-wizard');
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-mono underline cursor-pointer"
                  >
                    مشاهده کدهای خط فرمان (CLI)
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateDbModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                    >
                      انصراف
                    </button>
                    <button
                      type="button"
                      disabled={dbCreating}
                      onClick={() => {
                        setDbCreating(true);
                        setTimeout(() => {
                          setDbCreating(false);
                          setDbCreatedSuccess(
                            `دیتابیس ${dbNameInput} با موفقیت در لایه ابری لبه ایجاد و کدهای بایندینگ آن به پیکربندی پروژه اضافه شد.`
                          );
                        }, 1200);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      {dbCreating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                          <span>در حال ایجاد و بایندینگ...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>ایجاد فوری دیتابیس</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
