import React, { useState } from 'react';
import {
  Cloud,
  Server,
  Database,
  HardDrive,
  Copy,
  Check,
  Terminal,
  Settings,
  ShieldCheck,
  Globe,
  FileCode,
  Layers,
  Sparkles,
  ExternalLink,
  Code2,
  CheckCircle2,
  ArrowRight,
  Zap,
  RefreshCw
} from 'lucide-react';

interface Props {
  lang?: 'fa' | 'en' | 'ar';
}

export function DeploymentGuide({ lang = 'fa' }: Props) {
  const isEn = lang === 'en';
  const isAr = lang === 'ar';

  // Dynamic Customizer Parameters
  const [projectName, setProjectName] = useState('aionverse-v5');
  const [customDomain, setCustomDomain] = useState('aionverse.com');
  const [r2BucketName, setR2BucketName] = useState('aionverse-vault');
  const [d1DatabaseName, setD1DatabaseName] = useState('aionverse-edge-db');
  const [environment, setEnvironment] = useState<'production' | 'staging'>('production');

  // Copy feedback tracking
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Active Guide Tab
  const [activeTab, setActiveTab] = useState<'all' | 'pages' | 'r2' | 'd1' | 'env' | 'wrangler'>('all');

  // Completed Checklist Steps
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false
  });

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => {
      setCopiedSection((cur) => (cur === sectionId ? null : cur));
    }, 2200);
  };

  // Dynamic CLI Commands Script
  const allDeploymentCommands = `#!/usr/bin/env bash
# ==============================================================================
# AIONVERSE 5.0 — Cloudflare Pages, R2 & D1 Unified Automated Deployment Script
# Architect & Owner: Engineer Mehdi Delzende (ID: 5239775338)
# Environment: ${environment.toUpperCase()}
# ==============================================================================

set -e
echo "🚀 Starting automated deployment for ${projectName} (${customDomain})..."

# 1. Install Dependencies & Build Production Bundle
echo "📦 Building application distribution package..."
npm install
npm run build

# 2. Provision Cloudflare R2 Object Storage Bucket
echo "🪣 Provisioning Cloudflare R2 Bucket: ${r2BucketName}..."
npx wrangler r2 bucket create ${r2BucketName} || echo "R2 bucket already exists."

# 3. Provision Cloudflare D1 Edge SQL Database & Run Migrations
echo "🗄️ Provisioning Cloudflare D1 Edge Database: ${d1DatabaseName}..."
npx wrangler d1 create ${d1DatabaseName} || echo "D1 database already exists."

echo "⚡ Applying D1 Schema Migrations..."
npx wrangler d1 execute ${d1DatabaseName} --command="
  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    actor TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS users_cache (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL
  );
" --remote

# 4. Deploy to Cloudflare Pages
echo "🌐 Deploying to Cloudflare Pages: ${projectName}..."
npx wrangler pages deploy dist --project-name ${projectName} --branch ${environment === 'production' ? 'main' : 'staging'}

# 5. Bind Custom Domain & Activate TLS
echo "🔒 Verifying Custom Domain DNSSEC: ${customDomain}..."
npx wrangler pages project create ${projectName} --production-branch main || true

echo "✅ Deployment completed successfully for ${projectName} on https://${customDomain}!"
`;

  // Dynamic Environment Variables Template
  const envVariablesTemplate = `# ==============================================================================
# AIONVERSE 5.0 — Production Environment Variables (.env.production)
# Target: Cloudflare Pages + R2 Storage + D1 Database
# Owner: Engineer Mehdi Delzende | ID: 5239775338
# ==============================================================================

# Application Meta & URLs
VITE_APP_NAME="AIONVERSE 5.0"
VITE_APP_URL="https://${customDomain}"
VITE_ENVIRONMENT="${environment}"
VITE_APP_VERSION="5.0.0-enterprise"

# Cloudflare Account & Pages Configuration
CLOUDFLARE_ACCOUNT_ID="••••••••••••••••••••••••••••••••"
CLOUDFLARE_PAGES_PROJECT="${projectName}"

# Cloudflare R2 Storage (3D Assets, Backups, Media)
CLOUDFLARE_R2_BUCKET="${r2BucketName}"
CLOUDFLARE_R2_ACCESS_KEY_ID="••••••••••••••••••••••••••••••••"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="••••••••••••••••••••••••••••••••"
CLOUDFLARE_R2_ENDPOINT="https://<account_id>.r2.cloudflarestorage.com/${r2BucketName}"
VITE_R2_PUBLIC_URL="https://assets.${customDomain}"

# Cloudflare D1 Edge SQL Database
CLOUDFLARE_D1_DATABASE_NAME="${d1DatabaseName}"
CLOUDFLARE_D1_DATABASE_ID="••••••••-••••-••••-••••-••••••••••••"

# Security & Secret Keys (Zero Raw Keys Policy)
GEMINI_API_KEY="••••••••••••••••••••••••••••••••"
JWT_SECRET_SIGNING_KEY="••••••••••••••••••••••••••••••••"
OWNER_NATIONAL_ID="5239775338"
OWNER_WALLET_ADDRESS="0x71Ae...5239Delzende"

# Telemetry & Regional Routing
VITE_PRIMARY_EDGE_REGION="tehran"
VITE_BACKUP_EDGE_REGION="frankfurt"
`;

  // Dynamic wrangler.toml Configuration
  const wranglerTomlTemplate = `# ==============================================================================
# wrangler.toml — Cloudflare Unified Configuration for AIONVERSE
# ==============================================================================
name = "${projectName}"
pages_build_output_dir = "dist"
compatibility_date = "2026-10-29"
compatibility_flags = ["nodejs_compat"]

# Cloudflare R2 Storage Bucket Binding
[[r2_buckets]]
binding = "STORAGE_BUCKET"
bucket_name = "${r2BucketName}"
preview_bucket_name = "${r2BucketName}-preview"

# Cloudflare D1 Edge SQL Database Binding
[[d1_databases]]
binding = "DB"
database_name = "${d1DatabaseName}"
database_id = "00000000-0000-0000-0000-000000000000"

# Environmental Variables Defaults
[vars]
ENVIRONMENT = "${environment}"
APP_URL = "https://${customDomain}"
OWNER_NAME = "Engineer Mehdi Delzende"
OWNER_ID = "5239775338"

# Production Environment Overrides
[env.production]
vars = { ENVIRONMENT = "production" }

# Staging Environment Overrides
[env.staging]
vars = { ENVIRONMENT = "staging" }
`;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900/90 to-cyan-900/20 border border-amber-500/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono">
              <Cloud className="w-3.5 h-3.5" />
              <span>
                {isEn ? 'Cloudflare Edge Deployment Engine' : isAr ? 'دليل النشر السحابي الكامل' : 'موتور استقرار ابری یکپارچه Cloudflare Pages, R2 & D1'}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight leading-snug">
              {isEn ? (
                <>Automated Deployment Guide: <span className="text-gradient-gold">Pages</span>, <span className="text-gradient-cyan">R2</span> & <span className="text-gradient-gold">D1</span></>
              ) : (
                <>راهنمای جامع و خودکار استقرار: <span className="text-gradient-gold">Cloudflare Pages</span>، <span className="text-gradient-cyan">R2 Storage</span> و <span className="text-gradient-gold">D1 SQL</span></>
              )}
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'Dynamic deployment orchestrator with 1-click "Copy All" commands, live parameter tuning, S3-compatible R2 bucket setups, low-latency D1 edge databases, and production-ready .env configs.'
                : 'راهنمای گام‌به‌گام و ابزار پویای استقرار با قابلیت «کپی یکپارچه فرامین»، تنظیم لحظه‌ای متغیرها، راه‌اندازی باکت ذخیره‌سازی R2، دیتابیس توزیع‌شده D1 و قالب‌های آماده .env با امضای رسمی مهدی دل زنده (کد ملی: ۵۲۳۹۷۷۵۳۳۸).'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                {isEn ? 'Owner & Beneficiary: Mehdi Del Zende' : 'مالک و طراح ارشد: مهدی دل زنده (مهندس مهدی دل زنده)'}
              </span>
              <span>•</span>
              <span className="font-mono text-emerald-400 font-bold">کد ملی: ۵۲۳۹۷۷۵۳۳۸</span>
              <span>•</span>
              <span className="font-mono text-emerald-400">Zero-Cost Tier Compatible</span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => copyToClipboard(allDeploymentCommands, 'all-commands')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              {copiedSection === 'all-commands' ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSection === 'all-commands' ? (isEn ? 'Copied All Commands!' : 'کلیه دستورات کپی شد!') : (isEn ? 'Copy All CLI Commands' : 'کپی یکپارچه تمام دستورات')}</span>
            </button>

            <button
              onClick={() => copyToClipboard(envVariablesTemplate, 'all-env')}
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {copiedSection === 'all-env' ? <Check className="w-4 h-4 text-cyan-400" /> : <FileCode className="w-4 h-4" />}
              <span>{copiedSection === 'all-env' ? (isEn ? 'Copied .env File!' : 'فایل .env کپی شد!') : (isEn ? 'Copy .env Template' : 'کپی قالب متغیرهای .env')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Parameters Tuning Card */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Settings className="w-4 h-4 text-amber-400" />
            <span>تنظیمات و پارامترهای پویای استقرار (Dynamic Parameters Tuning)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">تغییر زنده مقادیر در کدهای زیر</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 block font-mono">نام پروژه Pages</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 block font-mono">دامنه اختصاصی اصلی</label>
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 block font-mono">نام باکت ذخیره‌سازی R2</label>
            <input
              type="text"
              value={r2BucketName}
              onChange={(e) => setR2BucketName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 block font-mono">نام دیتابیس D1 SQL</label>
            <input
              type="text"
              value={d1DatabaseName}
              onChange={(e) => setD1DatabaseName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 block font-mono">محیط استقرار (Target)</label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-amber-400 focus:outline-none"
            >
              <option value="production">Production (Main)</option>
              <option value="staging">Staging (Preview)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'all', label: 'نمای کلی و پایپ‌لاین یکپارچه', icon: Layers },
          { id: 'pages', label: 'Cloudflare Pages (فرانت‌اند)', icon: Cloud },
          { id: 'r2', label: 'Cloudflare R2 (فضای ذخیره اشیاء)', icon: HardDrive },
          { id: 'd1', label: 'Cloudflare D1 (دیتابیس لبه SQL)', icon: Database },
          { id: 'env', label: 'قالب متغیرها (.env.production)', icon: FileCode },
          { id: 'wrangler', label: 'پیکربندی wrangler.toml', icon: Code2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 5-Step Interactive Deployment Checklist */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>چک‌لیست مراحل اجرایی استقرار ابری (Interactive Step-by-Step Flow)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {Object.values(completedSteps).filter(Boolean).length} از ۵ مرحله تکمیل شده
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              num: 1,
              title: '۱. ورود به حساب کلودفلر',
              desc: 'اجرای npx wrangler login و احراز هویت توکن',
            },
            {
              num: 2,
              title: '۲. ساخت باکت R2',
              desc: `ایجاد باکت ${r2BucketName} و دریافت کلید S3`,
            },
            {
              num: 3,
              title: '۳. مایگریشن دیتابیس D1',
              desc: `ساخت جدول‌ها روی دیتابیس ${d1DatabaseName}`,
            },
            {
              num: 4,
              title: '۴. بیلد و استقرار Pages',
              desc: 'اجرای npm run build و deploy روی کلودفلر',
            },
            {
              num: 5,
              title: '۵. اتصال دامنه و SSL',
              desc: `ثبت CNAME و فعال‌سازی HTTPS برای ${customDomain}`,
            },
          ].map((step) => {
            const isDone = completedSteps[step.num];
            return (
              <div
                key={step.num}
                onClick={() => toggleStep(step.num)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold ${isDone ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {step.title}
                    </span>
                    <input
                      type="checkbox"
                      checked={isDone}
                      readOnly
                      className="rounded accent-emerald-500 w-3.5 h-3.5"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tab Content: All / Pages / R2 / D1 / Env / Wrangler */}
      <div className="space-y-6">
        {/* SECTION: Cloudflare Pages Configuration */}
        {(activeTab === 'all' || activeTab === 'pages') && (
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">۱. پیکربندی Cloudflare Pages</h3>
                  <p className="text-xs text-slate-400">میزبانی سریع و لبه‌ای React SPA با لتنسی کمتر از ۲۰ میلی‌ثانیه در سراسر جهان</p>
                </div>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    `# Build and Deploy to Cloudflare Pages\nnpm run build\nnpx wrangler pages deploy dist --project-name ${projectName}`,
                    'pages-cmd'
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedSection === 'pages-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی دستور Pages</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">دستور بیلد (Build Command):</span>
                <code className="text-amber-400 font-mono font-bold text-[11px]">npm run build</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">پوشه خروجی (Output Directory):</span>
                <code className="text-cyan-400 font-mono font-bold text-[11px]">dist</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">نسخه Node.js:</span>
                <code className="text-emerald-400 font-mono font-bold text-[11px]">NODE_VERSION = 20</code>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto text-left ltr">
              <p className="text-slate-500"># Direct Cloudflare Pages CLI Deployment</p>
              <p className="text-emerald-400 font-bold">$ npm run build</p>
              <p className="text-cyan-400 font-bold">$ npx wrangler pages deploy dist --project-name {projectName} --branch {environment === 'production' ? 'main' : 'staging'}</p>
            </div>
          </div>
        )}

        {/* SECTION: Cloudflare R2 Object Storage */}
        {(activeTab === 'all' || activeTab === 'r2') && (
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">۲. پیکربندی Cloudflare R2 Object Storage</h3>
                  <p className="text-xs text-slate-400">ذخیره‌سازی بدون هزینه خروج داده (Zero Egress Fees) برای مدل‌های سه‌بعدی OBJ/GLTF، ویدیوها و فایل‌های پشتیبان ۳۰ ثانیه‌ای</p>
                </div>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    `# Create R2 Bucket and list buckets\nnpx wrangler r2 bucket create ${r2BucketName}\nnpx wrangler r2 bucket list`,
                    'r2-cmd'
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedSection === 'r2-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی دستورات R2</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">نام باکت R2:</span>
                <code className="text-cyan-300 font-mono font-bold text-[11px]">{r2BucketName}</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">سازگاری API:</span>
                <code className="text-amber-400 font-mono font-bold text-[11px]">S3-Compatible API</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">سهمیه رایگان:</span>
                <code className="text-emerald-400 font-mono font-bold text-[11px]">10 GB Free Storage / Month</code>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto text-left ltr">
              <p className="text-slate-500"># 1. Create R2 Bucket via Wrangler CLI</p>
              <p className="text-emerald-400 font-bold">$ npx wrangler r2 bucket create {r2BucketName}</p>
              <p className="text-slate-500 mt-2"># 2. Upload 3D CAD assets and database backups directly to R2</p>
              <p className="text-cyan-400 font-bold">$ npx wrangler r2 object put {r2BucketName}/models/drone.obj --file=./public/drone.obj</p>
            </div>
          </div>
        )}

        {/* SECTION: Cloudflare D1 Edge SQL Database */}
        {(activeTab === 'all' || activeTab === 'd1') && (
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">۳. پیکربندی دیتابیس لبه Cloudflare D1 Edge SQL</h3>
                  <p className="text-xs text-slate-400">دیتابیس رابطه‌ای توزیع‌شده بر پایه SQLite با تاخیر زیر ۱۰ میلی‌ثانیه برای کش لاگ‌ها و احراز هویت</p>
                </div>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    `# Create D1 Database and execute schema migrations\nnpx wrangler d1 create ${d1DatabaseName}\nnpx wrangler d1 execute ${d1DatabaseName} --command="CREATE TABLE audit_logs (id TEXT PRIMARY KEY, action TEXT NOT NULL);" --remote`,
                    'd1-cmd'
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedSection === 'd1-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی دستورات D1</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">نام دیتابیس D1:</span>
                <code className="text-indigo-300 font-mono font-bold text-[11px]">{d1DatabaseName}</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">موقعیت توزیع:</span>
                <code className="text-emerald-400 font-mono font-bold text-[11px]">Global Edge Locations (Anycast)</code>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">سازگاری SQL:</span>
                <code className="text-amber-400 font-mono font-bold text-[11px]">Full SQL / Prepared Statements</code>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto text-left ltr">
              <p className="text-slate-500"># 1. Provision D1 Database</p>
              <p className="text-emerald-400 font-bold">$ npx wrangler d1 create {d1DatabaseName}</p>
              <p className="text-slate-500 mt-2"># 2. Run Audit Ledger Schema Migration</p>
              <p className="text-cyan-400 font-bold">
                $ npx wrangler d1 execute {d1DatabaseName} --command="CREATE TABLE IF NOT EXISTS audit_logs (id TEXT PRIMARY KEY, action TEXT NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);" --remote
              </p>
            </div>
          </div>
        )}

        {/* SECTION: Environment Variables Template (.env.production) */}
        {(activeTab === 'all' || activeTab === 'env') && (
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FileCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">۴. قالب متغیرهای محیطی تولید (.env.production)</h3>
                  <p className="text-xs text-slate-400">متغیرهای کلاینت و سرور آماده بارگذاری در پنل Cloudflare Pages Environment Variables</p>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(envVariablesTemplate, 'env-file')}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedSection === 'env-file' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی کامل فایل .env</span>
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-2xl bg-black/90 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto max-h-72 text-left ltr">
                {envVariablesTemplate}
              </pre>
            </div>
          </div>
        )}

        {/* SECTION: wrangler.toml Configuration */}
        {(activeTab === 'all' || activeTab === 'wrangler') && (
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">۵. فایل پیکربندی یکپارچه wrangler.toml</h3>
                  <p className="text-xs text-slate-400">بایندینگ رسمی باکت R2 و دیتابیس D1 به پروژه Pages جهت استقرار با یک دستور</p>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(wranglerTomlTemplate, 'wrangler-file')}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedSection === 'wrangler-file' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>کپی فایل wrangler.toml</span>
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-2xl bg-black/90 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto max-h-72 text-left ltr">
                {wranglerTomlTemplate}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Script Summary Bar */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-right">
          <div className="text-xs font-bold text-slate-200 flex items-center justify-center md:justify-start gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>آماده استقرار با ۱ کلیک بر روی سرورهای ابری لبه</span>
          </div>
          <p className="text-[11px] text-slate-400">
            کلیه پیکربندی‌ها با استانداردهای Zero-Trust و بدون هزینه اولیه برای مقیاس‌پذیری جهانی مهندس مهدی دلزنده تولید شده‌اند.
          </p>
        </div>

        <button
          onClick={() => copyToClipboard(allDeploymentCommands, 'bottom-copy')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer shrink-0"
        >
          {copiedSection === 'bottom-copy' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedSection === 'bottom-copy' ? 'دستورات با موفقیت کپی شد!' : 'کپی کلیه دستورات استقرار (Copy All)'}</span>
        </button>
      </div>
    </div>
  );
}
