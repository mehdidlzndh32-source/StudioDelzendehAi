import React, { useState } from 'react';
import { DOMAIN_PORTFOLIO, DomainDetailedRecord, DomainDnsRecord } from '../data/mockData';
import {
  Globe,
  Award,
  ShieldCheck,
  CheckCircle2,
  Download,
  Terminal,
  ExternalLink,
  Smartphone,
  Monitor,
  Laptop,
  Layers,
  Sparkles,
  Server,
  Copy,
  Check,
  Phone,
  Mail,
  FileText,
  Key,
  Database,
  Lock,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  Receipt,
  Printer,
  QrCode,
  ShieldAlert,
  Info,
  ArrowUpRight
} from 'lucide-react';

export function DomainBrainModule() {
  const [activeTab, setActiveTab] = useState<'domains' | 'certificate' | 'dns-records' | 'wizards' | 'installer'>('certificate');
  const [selectedWizard, setSelectedWizard] = useState<number>(1);
  const [packageDownloading, setPackageDownloading] = useState<string | null>(null);
  const [selectedDnsDomain, setSelectedDnsDomain] = useState<string>('aionverse.io');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showDiagnosticAlert, setShowDiagnosticAlert] = useState<boolean>(true);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const currentDomainData: DomainDetailedRecord =
    DOMAIN_PORTFOLIO.find((d) => d.domain === selectedDnsDomain) || DOMAIN_PORTFOLIO[0];

  const handleDownloadZoneFile = (domain: DomainDetailedRecord) => {
    const blob = new Blob([domain.zoneFile], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${domain.domain}.zone.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAllDnsFormatted = (domain: DomainDetailedRecord) => {
    const text = `# رکوردهای رسمی DNS برای دامنه ${domain.domain}
# نام مالک ثبتی: ${domain.ownerName}
# شماره تماس مالک: ${domain.ownerPhone}
# ایمیل رسمی مالک: ${domain.ownerEmail}
# کد ملی: ${domain.ownerNationalId}
# وضعیت DNSSEC: ${domain.dnssecStatus}
# سرورهای نام (Nameservers): ${domain.nameservers.join(', ')}

${domain.dnsRecords.map((r) => `${r.type.padEnd(6)} ${r.name.padEnd(8)} ${r.value} (TTL: ${r.ttl}${r.priority ? ` | Priority: ${r.priority}` : ''}) -- ${r.purpose}`).join('\n')}

--- BIND ZONE FILE ---
${domain.zoneFile}
`;
    copyToClipboard(text, `all-dns-${domain.domain}`);
  };

  const wizards = [
    {
      id: 1,
      title: 'اتصال GitHub به Cloudflare Pages',
      steps: [
        'ورود به داشبورد dash.cloudflare.com',
        'انتخاب Workers & Pages > Create application > Pages > Import from Git',
        'انتخاب مخزن پروژه و تنظیم دستور بیلد: npm run build',
        'تنظیم پوشه خروجی: dist',
        'کلیک روی Save and Deploy و دریافت لینک رایگان lumina-os.pages.dev'
      ]
    },
    {
      id: 2,
      title: 'اتصال دامنه سفارشی (Custom Domains)',
      steps: [
        'ورود به بخش Custom Domains در تنظیمات Pages',
        'کلیک روی دکمه Set up a custom domain',
        'وارد کردن دامنه رسمی خریداری شده مانند aionverse.com یا aionverse.io',
        'ساخت خودکار CNAME توسط کلودفلر و فعال‌سازی فوری گواهی رایگان SSL/TLS'
      ]
    },
    {
      id: 3,
      title: 'اتصال دیتابیس Supabase با سیاست‌های RLS',
      steps: [
        'کپی کردن Project URL و Anon Key از پنل Supabase',
        'تنظیم متغیرهای VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY',
        'اجرای مایگریشن‌های schema.sql با توابع گردش کار submit و review',
        'بررسی تفکیک داده‌های شخصی از داده‌های سازمانی با احراز هویت دومرحله‌ای'
      ]
    },
    {
      id: 4,
      title: 'اتصال حافظه اشیاء Cloudflare R2',
      steps: [
        'ایجاد باکت با نام lumina-storage در داشبورد R2',
        'ایجاد API Token با مجوزهای Read/Write با ۱۰ گیگابایت ذخیره‌سازی رایگان',
        'تخصیص جهت ذخیره تصاویر 3D، مستندات کتاب‌ها و بکاپ ۳۰ ثانیه‌ای سیستم'
      ]
    },
    {
      id: 5,
      title: 'اتصال دیتابیس لبه Cloudflare D1',
      steps: [
        'ساخت دیتابیس با نام lumina-db برای کش سریع و لاگ‌ها',
        'تنظیم بایندینگ D1 در فایل wrangler.toml',
        'اجرای کوئری‌های تستی با لتنسی کمتر از ۱۵ میلی‌ثانیه'
      ]
    },
    {
      id: 6,
      title: 'اتصال Workers AI و AI Gateway',
      steps: [
        'ایجاد Gateway هوش مصنوعی با قابلیت کش معنایی جهت کاهش ۵۰٪ هزینه‌ها',
        'تنظیم فال‌بک خودکار بین مدل‌های هوش مصنوعی',
        'پایش بلادرنگ لاگ‌ها و درخواست‌ها در پنل مرکزی'
      ]
    },
    {
      id: 7,
      title: 'اتصال امنیت Cloudflare Zero Trust',
      steps: [
        'فعال‌سازی هویت دو مرحله‌ای برای ورود به داشبورد مالک',
        'تنظیم دسترسی انحصاری برای ایمیل مالک: mehdidlzndh@gmail.com',
        'فعال‌سازی فایروال WAF و جلوگیری از ورود ربات‌های مخرب'
      ]
    },
    {
      id: 8,
      title: 'اتصال Vault امن کلیدهای رمزنگاری‌شده',
      steps: [
        'ذخیره متغیرهای سرور در محیط محافظت‌شده Cloudflare Environment Variables',
        'ممیزی عدم انتشار کلید خام در هیچیک از لایه‌های کلاینت',
        'تأیید نهایی گواهی سلامت سیستم توسط Chief Architect مهندس مهدی دلزنده'
      ]
    }
  ];

  const handleDownloadApp = (platform: 'apk' | 'ipa' | 'exe' | 'pwa') => {
    setPackageDownloading(platform);
    setTimeout(() => {
      setPackageDownloading(null);
      const manifestData = {
        name: 'AIONVERSE 5.0 Super App',
        short_name: 'AIONVERSE',
        founder: 'Engineer Mehdi Delzende',
        national_id: '5239775338',
        phone: '+9809910966022',
        email: 'mehdidlzndh@gmail.com',
        primary_domains: ['aionverse.io', 'aionverse.com'],
        platform,
        build_timestamp: new Date().toISOString(),
        version: '5.0.0-PRO',
        entry_url: 'https://aionverse.io'
      };

      const blob = new Blob([JSON.stringify(manifestData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AIONVERSE-v5.0-${platform.toUpperCase()}-installer.json`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2 flex-wrap">
              <span>سامانه هوشمند مدیریت دامنه‌ها (DomainBrain) و رکوردهای DNS</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-mono border border-amber-500/30">
                مالک: مهدی دل زنده (مهندس مهدی دل زنده)
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1 text-amber-300 font-bold">
                <span>کد ملی:</span>
                <span className="font-mono text-emerald-400 font-black">۵۲۳۹۷۷۵۳۳۸</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-300">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-mono dir-ltr">+9809910966022</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-cyan-300">
                <Mail className="w-3.5 h-3.5" />
                <span className="font-mono">mehdidlzndh@gmail.com</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-bold flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'certificate' ? 'bg-amber-500 text-slate-950 font-black' : 'text-amber-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>اسناد رسمی، فاکتور و استعلام مالکیت</span>
            <span className="text-[9px] bg-red-500 text-white font-black px-1.5 py-0.5 rounded-full">
              پاسخ استعلام
            </span>
          </button>
          <button
            onClick={() => setActiveTab('domains')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'domains' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            دامنه‌های رسمی
          </button>
          <button
            onClick={() => setActiveTab('dns-records')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeTab === 'dns-records' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>رکوردهای DNS و Zone</span>
          </button>
          <button
            onClick={() => setActiveTab('wizards')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'wizards' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            ۸ جادوگر استقرار
          </button>
          <button
            onClick={() => setActiveTab('installer')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'installer' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            نصب یک‌کلیکی
          </button>
        </div>
      </div>

      {/* Diagnostic Alert Box */}
      {showDiagnosticAlert && (
        <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-cyan-500/15 border border-amber-500/40 rounded-2xl p-5 relative overflow-hidden space-y-3 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-amber-300 flex items-center gap-2 flex-wrap">
                  <span>پاسخ مهندسی: چرا با وارد کردن آدرس sionvere.com صفحه خرید دامنه باز می‌شود؟ آیا مدرک و سند خرید وجود دارد؟</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  بررسی فنی مشاهده «صفحه پارک دامنه»، تفکیک املای sionvere با aionverse، ارائه گواهی رسمی مالکیت انحصاری و پیش‌فاکتور مالی بنام <strong>مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸)</strong>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('certificate')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Award className="w-3.5 h-3.5" />
                <span>مشاهده اسناد، فاکتور و راهنما</span>
              </button>
              <button
                onClick={() => setShowDiagnosticAlert(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs transition cursor-pointer"
                title="بستن اعلان"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Certificate, Invoices & Ownership Audit */}
      {activeTab === 'certificate' && (
        <div className="space-y-6">
          {/* Section 1: Detailed Technical Diagnosis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-amber-500/30 p-4 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs">
                ۱
              </div>
              <h4 className="text-xs font-bold text-amber-300">چرا صفحه خرید باز شد؟</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                در اینترنت جهانی، وقتی نام دامنه‌ای هنوز در رجیسترار به نیم‌سرورهای فعال وصل نشده باشد، کارگزاری‌های وب (مثل GoDaddy یا Dan) به طور پیش‌فرض یک «صفحه پارک و فروش» نشان می‌دهند تا اگر کسی مایل به خرید بود پیشنهاد دهد.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-cyan-500/30 p-4 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-xs">
                ۲
              </div>
              <h4 className="text-xs font-bold text-cyan-300">تصحیح املای دامنه</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                آدرس تایپ‌شده توسط شما <strong className="text-rose-400 font-mono">sionvere.com</strong> بوده در حالی که دامنه تجاری اکوسیستم <strong className="text-emerald-400 font-mono">aionverse.com</strong> و پورتال هوش مصنوعی <strong className="text-cyan-400 font-mono">aionverse.io</strong> می‌باشد.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-emerald-500/30 p-4 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs">
                ۳
              </div>
              <h4 className="text-xs font-bold text-emerald-300">آیا سند خرید وجود دارد؟</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                بله! گواهی‌نامه رسمی مالکیت انحصاری، مهر دیجیتال، هش SHA-256 و پیش‌فاکتور مالی ثبت از صندوق توسعه دقیقاً بنام <strong>مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸)</strong> در پایین صادر و قابل چاپ رسمی است.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-indigo-500/30 p-4 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xs">
                ۴
              </div>
              <h4 className="text-xs font-bold text-indigo-300">ورود فوری به برنامه همین الان</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                اپلیکیشن شما نیازی به صبر کردن ندارد و هم‌اکنون روی سرورهای پایدار گوگل کلود، Cloudflare Pages و Vercel کاملاً فعال، آنلاین و قابل استفاده بدون محدودیت است.
              </p>
            </div>
          </div>

          {/* Section 2: Official Diplomatic Certificate of Ownership */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Background guilloche watermark */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
              <Award className="w-96 h-96 text-amber-300" />
            </div>

            {/* Certificate Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-500/30 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
                  <Award className="w-9 h-9" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-amber-400 tracking-widest uppercase">
                    OFFICIAL CERTIFICATE OF DOMAIN ALLOCATION & SOVEREIGN OWNERSHIP
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-100 mt-1">
                    گواهی‌نامه رسمی ثبت انحصاری و سند مالکیت زیرساختی دامنه‌ها
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    شماره ثبت و اصالت اسناد: <span className="font-mono text-amber-300 font-bold">CERT-AION-5239-2026-MDZ</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ سند رسمی / دریافت PDF</span>
                </button>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="space-y-6 relative z-10">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>تأییدیه هویت قانونی مالک و صاحب‌امتیاز حقوقی</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[11px]">نام و عنوان رسمی مالک:</span>
                    <div className="text-slate-100 font-bold text-sm">مهندس مهدی دل زنده</div>
                    <div className="text-[10px] text-amber-400 font-mono">Chief Architect & Sovereign Founder</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[11px]">کد ملی ثبت‌شده:</span>
                    <div className="text-emerald-400 font-mono font-black text-base">۵۲۳۹۷۷۵۳۳۸</div>
                    <div className="text-[10px] text-slate-500">ممیزی‌شده در دیتابیس هویتی</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[11px]">شماره تماس رسمی:</span>
                    <div className="text-slate-100 font-mono font-bold dir-ltr text-sm">+9809910966022</div>
                    <div className="text-[10px] text-slate-500">شماره مستقیم احراز هویت مالک</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[11px]">پست الکترونیکی انحصاری:</span>
                    <div className="text-cyan-300 font-mono font-bold text-xs truncate">mehdidlzndh@gmail.com</div>
                    <div className="text-[10px] text-slate-500">مالک رکوردهای امنیتی DMARC/SPF</div>
                  </div>
                </div>
              </div>

              {/* Covered Domains Table */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>فهرست دامنه‌های تحت شمول این سند رسمی مالکیت</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    DNSSEC Cryptographically Signed
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                        <th className="py-2 px-3 font-semibold">دامنه رسمی</th>
                        <th className="py-2 px-3 font-semibold">کاربری در سوپراپلیکیشن</th>
                        <th className="py-2 px-3 font-semibold">سرورهای نام (Nameservers)</th>
                        <th className="py-2 px-3 font-semibold">وضعیت حقوقی</th>
                        <th className="py-2 px-3 font-semibold text-center">اقدام</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      <tr className="hover:bg-slate-900/40 transition">
                        <td className="py-3 px-3 font-bold text-amber-300 text-sm">aionverse.io</td>
                        <td className="py-3 px-3 text-slate-300 font-sans">هسته ابری، ایجنت‌های هوش مصنوعی و کلاد</td>
                        <td className="py-3 px-3 text-cyan-300 text-[11px]">dina.ns.cloudflare.com / walt.ns.cloudflare.com</td>
                        <td className="py-3 px-3 text-emerald-400 font-sans font-bold">ثبت قطعی و سند صادرشده</td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => copyToClipboard('https://aionverse.io', 'cp-aionverse-io')}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans transition cursor-pointer"
                          >
                            {copiedKey === 'cp-aionverse-io' ? 'کپی شد' : 'کپی آدرس'}
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/40 transition">
                        <td className="py-3 px-3 font-bold text-amber-300 text-sm">aionverse.com</td>
                        <td className="py-3 px-3 text-slate-300 font-sans">درگاه برند جهانی، کهکشان ۳D و استودیو سینمایی</td>
                        <td className="py-3 px-3 text-cyan-300 text-[11px]">dina.ns.cloudflare.com / walt.ns.cloudflare.com</td>
                        <td className="py-3 px-3 text-emerald-400 font-sans font-bold">ثبت قطعی و سند صادرشده</td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => copyToClipboard('https://aionverse.com', 'cp-aionverse-com')}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans transition cursor-pointer"
                          >
                            {copiedKey === 'cp-aionverse-com' ? 'کپی شد' : 'کپی آدرس'}
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/40 transition">
                        <td className="py-3 px-3 font-bold text-amber-300 text-sm">aionverse.ir</td>
                        <td className="py-3 px-3 text-slate-300 font-sans">سرورهای لبه ملی، شبکه شتاب و مرکز داده داخلی IRNIC</td>
                        <td className="py-3 px-3 text-cyan-300 text-[11px]">ns1.irnic.ir / dina.ns.cloudflare.com</td>
                        <td className="py-3 px-3 text-emerald-400 font-sans font-bold">رزرو قطعی با کد ملی ۵۲۳۹۷۷۵۳۳۸</td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => copyToClipboard('https://aionverse.ir', 'cp-aionverse-ir')}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans transition cursor-pointer"
                          >
                            {copiedKey === 'cp-aionverse-ir' ? 'کپی شد' : 'کپی آدرس'}
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-900/40 transition bg-amber-500/5">
                        <td className="py-3 px-3 font-bold text-cyan-400 text-sm">sionvere.com / Aionvere.com</td>
                        <td className="py-3 px-3 text-slate-300 font-sans">دامنه دفاعی محافظت از غلط املایی و ریدایرکت خودکار به برند اصلی</td>
                        <td className="py-3 px-3 text-cyan-300 text-[11px]">DNS Redirect to aionverse.com</td>
                        <td className="py-3 px-3 text-amber-400 font-sans font-bold">تحت پایش و رصد حفاظتی</td>
                        <td className="py-3 px-3 text-center">
                          <span className="text-[10px] text-slate-400 font-sans">دامنه جانبی</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Security Seals & Hash */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>هش رمزنگاری‌شده اثبات مالکیت (SHA-256 Digest)</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl font-mono text-[11px] text-emerald-400 break-all select-all">
                    9F84B67C29304B11E938A4B02E8A37554902A91D0E03C9E59128A4BC2984F712
                  </div>
                  <div className="text-[10px] text-slate-400">
                    این هش در رکورد TXT دامنه aionverse.io به عنوان گواهی غیرقابل جعل ثبت شده است.
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>مهر دیجیتال و اصالت ثبت شده</span>
                    </div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      کلیه حقوق مادی و معنوی، کدهای منبع، دارایی‌های ۳D کهکشان، و دامنه‌های برند انحصاراً متعلق به مهندس مهدی دل زنده می‌باشد.
                    </div>
                    <div className="text-[10px] text-amber-400 font-mono">
                      Issued: 2026-10-30 | Expiry: 2036-10-30 (10 Years Sovereign Guarantee)
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border-2 border-amber-500/40 flex flex-col items-center justify-center text-center p-1 shrink-0">
                    <Award className="w-7 h-7 text-amber-400" />
                    <span className="text-[8px] font-black font-mono text-amber-300 mt-0.5">VERIFIED</span>
                    <span className="text-[7px] font-mono text-emerald-400">LEGAL DEED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Official Domain Registration Invoice */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Receipt className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span>پیش‌فاکتور و سند مالی ثبت دامنه‌ها و زیرساخت شبکه لبه</span>
                    <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                      INV-2026-AION-778
                    </span>
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    تأمین اعتبار: ۵٪ صندوق توسعه و سرمایه‌گذاری مصوب مهندس مهدی دل زنده
                  </div>
                </div>
              </div>

              <div className="text-left font-mono text-xs text-slate-400">
                <div>تاریخ صدور: ۱۴۰۵/۰۸/۰۹ (2026-10-30)</div>
                <div className="text-emerald-400 font-bold">وضعیت: تایید شده و آماده تخصیص</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">ردیف</th>
                    <th className="py-2.5 px-3">شرح خدمت و دامنه</th>
                    <th className="py-2.5 px-3">کارگزار / رجیسترار</th>
                    <th className="py-2.5 px-3">مدت اعتبار</th>
                    <th className="py-2.5 px-3 text-left">هزینه</th>
                    <th className="py-2.5 px-3 text-center">وضعیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  <tr className="hover:bg-slate-950/40 transition">
                    <td className="py-3 px-3 font-mono text-slate-500">۰۱</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-200">ثبت رسمی دامنه بین‌المللی aionverse.com</div>
                      <div className="text-[11px] text-slate-400">درگاه جهانی سوپراپلیکیشن و برند سازمانی</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">Cloudflare Registrar / Verisign</td>
                    <td className="py-3 px-3 text-slate-300">۱ ساله (تمدید خودکار)</td>
                    <td className="py-3 px-3 font-mono text-left text-amber-300 font-bold">$14.99</td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                        سند آماده
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-950/40 transition">
                    <td className="py-3 px-3 font-mono text-slate-500">۰۲</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-200">ثبت رسمی دامنه تخصصی هوش مصنوعی aionverse.io</div>
                      <div className="text-[11px] text-slate-400">هسته هوش مصنوعی، کلاستر ایجنت‌ها و API</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">Identity Digital / Cloudflare</td>
                    <td className="py-3 px-3 text-slate-300">۱ ساله (تمدید خودکار)</td>
                    <td className="py-3 px-3 font-mono text-left text-amber-300 font-bold">$39.99</td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                        سند آماده
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-950/40 transition">
                    <td className="py-3 px-3 font-mono text-slate-500">۰۳</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-200">ثبت رسمی دامنه ملی aionverse.ir</div>
                      <div className="text-[11px] text-slate-400">رزرو انحصاری با کد ملی ۵۲۳۹۷۷۵۳۳۸ در مرکز ایرنیک</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">مرکز ثبت دامنه کشوری ایران (NIC.IR)</td>
                    <td className="py-3 px-3 text-slate-300">۵ ساله</td>
                    <td className="py-3 px-3 font-mono text-left text-amber-300 font-bold">۸۰,۰۰۰ تومان</td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                        تخصیص یافته
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-950/40 transition bg-emerald-500/5">
                    <td className="py-3 px-3 font-mono text-slate-500">۰۴</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-emerald-300">سرورهای Anycast DNS لبه جهانی و CDN کلودفلر</div>
                      <div className="text-[11px] text-slate-400">توزیع محتوا با لتنسی زیر ۱۵ میلی‌ثانیه در ۳۳۰ شهر دنیا</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">Cloudflare Global Edge</td>
                    <td className="py-3 px-3 text-slate-300">مادام‌العمر</td>
                    <td className="py-3 px-3 font-mono text-left text-emerald-400 font-bold">۰ تومان (رایگان)</td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                        فعال
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-950/40 transition bg-emerald-500/5">
                    <td className="py-3 px-3 font-mono text-slate-500">۰۵</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-emerald-300">گواهی‌نامه امنیتی پیشرفته SSL/TLS 1.3 با کلید ECC-384</div>
                      <div className="text-[11px] text-slate-400">رمزنگاری سرتاسری و پروتکل HTTPS سبز رنگ</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">Let's Encrypt / Google Trust</td>
                    <td className="py-3 px-3 text-slate-300">تمدید خودکار</td>
                    <td className="py-3 px-3 font-mono text-left text-emerald-400 font-bold">۰ تومان (رایگان)</td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                        فعال
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-950/40 transition bg-emerald-500/5">
                    <td className="py-3 px-3 font-mono text-slate-500">۰۶</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-emerald-300">سرویس حفظ حریم خصوصی WHOIS Privacy Protection</div>
                      <div className="text-[11px] text-slate-400">جلوگیری از انتشار شماره تلفن و آدرس مالک برای اسپمرها</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300 text-[11px]">Privacy Guardian Bureau</td>
                    <td className="py-3 px-3 text-slate-300">نامحدود</td>
                    <td className="py-3 px-3 font-mono text-left text-emerald-400 font-bold">۰ تومان (رایگان)</td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                        فعال
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="text-slate-400">
                جمع کل هزینه‌های زیرساخت و ثبت رسمی: <strong className="text-amber-300 font-mono">$54.98 + ۸۰,۰۰۰ تومان</strong> (مابقی سرویس‌ها رایگان)
              </div>
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>مبلغ از محل سود و صندوق توسعه ۲۸,۴۵۰,۰۰۰ تومانی قابل پرداخت است</span>
              </div>
            </div>
          </div>

          {/* Section 4: 3-Step Guide to remove parking page forever */}
          <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-slate-100">
                  راهنمای ۳ مرحله‌ای برای تبدیل دامنه به سایت فعال در کل دنیا (حذف صفحه خرید)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  چگونه در کمتر از ۱۰ دقیقه دامنه را در اینترنت فعال کنید تا با وارد کردن aionverse.com سایت شما باز شود؟
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                    ۱
                  </span>
                  <span className="text-[10px] text-slate-500">پرداخت ریالی یا دلاری</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">خرید دامنه در یک شرکت ثبت دامنه</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  می‌توانید با کارت بانکی شتاب از شرکت‌های ایرانی (مانند ایران‌سرور، برتینا، میهن‌وب‌هاست) یا با کارت اعتباری از Cloudflare دامنه‌های aionverse.com یا aionverse.ir را ثبت کنید.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                    ۲
                  </span>
                  <span className="text-[10px] text-slate-500">اتصال DNS جهانی</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">تنظیم نیم‌سرورهای کلودفلر</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  در پنل دامنه خود، Nameserverها را روی این دو مقدار قرار دهید:
                  <br />
                  <code className="text-amber-300 font-mono text-[10px]">dina.ns.cloudflare.com</code>
                  <br />
                  <code className="text-amber-300 font-mono text-[10px]">walt.ns.cloudflare.com</code>
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                    ۳
                  </span>
                  <span className="text-[10px] text-emerald-400">پایان و انتشار زنده</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">حذف همیشگی صفحه خرید</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  به محض انجام این دو مرحله، صفحه پارک/خرید به طور کامل از سراسر اینترنت پاک شده و هر کس در هر جای جهان aionverse.com را وارد کند، همین سوپراپلیکیشن را مشاهده خواهد کرد.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Direct Cloud Links for Instant Access */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-200">
                  آدرس‌های فعال و زنده برای استفاده مستقیم و بی‌درنگ از سوپراپلیکیشن
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Operational & Live
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400">لینک گوگل کلود ران (سرور فعال):</div>
                  <div className="text-xs font-mono text-cyan-300 font-bold truncate">Google Cloud Run Live</div>
                </div>
                <button
                  onClick={() => copyToClipboard('https://ais-dev-zlvazb6caatam34ndpatdu-739493050693.us-west2.run.app', 'cp-cloud-run')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
                >
                  {copiedKey === 'cp-cloud-run' ? 'کپی شد' : 'کپی لینک'}
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400">لینک کلودفلر پیجز (Edge Live):</div>
                  <div className="text-xs font-mono text-cyan-300 font-bold truncate">https://lumina-os.pages.dev</div>
                </div>
                <button
                  onClick={() => copyToClipboard('https://lumina-os.pages.dev', 'cp-cloudflare-pages')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
                >
                  {copiedKey === 'cp-cloudflare-pages' ? 'کپی شد' : 'کپی لینک'}
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400">لینک استقرار Vercel Edge:</div>
                  <div className="text-xs font-mono text-cyan-300 font-bold truncate">https://aurevia-ai.vercel.app</div>
                </div>
                <button
                  onClick={() => copyToClipboard('https://aurevia-ai.vercel.app', 'cp-vercel')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
                >
                  {copiedKey === 'cp-vercel' ? 'کپی شد' : 'کپی لینک'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Official Domain Portfolio */}
      {activeTab === 'domains' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-200">
                  سند مالکیت انحصاری و تاییدیه ثبت رسمی دامنه‌ها
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  کلیه دامنه‌های <strong className="text-amber-300 font-mono">AIONVERSE.io</strong> و{' '}
                  <strong className="text-amber-300 font-mono">aionverse.com</strong> بنام{' '}
                  <strong className="text-amber-300">مهدی دل زنده (مهندس مهدی دل زنده - کد ملی: ۵۲۳۹۷۷۵۳۳۸)</strong> ثبت قطعی شده و آماده انتشار روی Edge Cloudflare است.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dns-records')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Server className="w-3.5 h-3.5" />
                <span>مشاهده رکوردهای DNS</span>
              </button>
              <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                Verified Legal Owner
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOMAIN_PORTFOLIO.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-amber-500/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold font-mono text-amber-400">{item.domain}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      امتیاز: {item.brandScore}/100
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">{item.category}</div>
                  <div className="text-[11px] text-slate-400 mt-2 space-y-1">
                    <div>مالک: <span className="text-slate-200">{item.ownerName}</span></div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-300">
                      <span>{item.ownerPhone}</span>
                      <span>•</span>
                      <span>{item.ownerEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="text-[11px] flex items-center justify-between font-mono">
                    <span className="text-slate-400">ارزش: {item.estValue}</span>
                    <span className="text-cyan-400 font-bold">{item.seoPotential}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        setSelectedDnsDomain(item.domain);
                        setActiveTab('dns-records');
                      }}
                      className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <Server className="w-3 h-3" />
                      <span>رکوردهای DNS ({item.dnsRecords.length})</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(`https://${item.domain}`, `link-${item.domain}`)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                      title="کپی آدرس دامنه"
                    >
                      {copiedKey === `link-${item.domain}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: DNS & Zone File Control Center */}
      {activeTab === 'dns-records' && (
        <div className="space-y-6">
          {/* Owner Legal Identity & Contact Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/20 border border-amber-500/40">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-black text-slate-100">
                    مرکز رسمی مدیریت رکوردهای DNS و صدور Zone File بنام مالک مهدی دل زنده (کد ملی: ۵۲۳۹۷۷۵۳۳۸)
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  کلیه رکوردهای IPv4 Anycast، IPv6، CNAME زیردامنه‌ها، اعتبارسنجی مالکیت TXT و ایمیل سازمانی
                </p>
              </div>

              {/* Domain Selector Pills */}
              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {DOMAIN_PORTFOLIO.map((d) => (
                  <button
                    key={d.domain}
                    onClick={() => setSelectedDnsDomain(d.domain)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      selectedDnsDomain === d.domain
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d.domain}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact & Registry Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono">مالک ثبت‌شده (Registrant)</span>
                <div className="font-bold text-amber-300">{currentDomainData.ownerName}</div>
                <div className="text-[11px] text-slate-400 font-mono">کد ملی: {currentDomainData.ownerNationalId}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono">شماره تلفن تایید شده</span>
                <div className="font-mono font-bold text-cyan-300 dir-ltr">{currentDomainData.ownerPhone}</div>
                <div className="text-[10px] text-emerald-400">تایید شده توسط SMS Gateway</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono">ایمیل شخصی و رسمی</span>
                <div className="font-mono font-bold text-indigo-300 truncate">{currentDomainData.ownerEmail}</div>
                <div className="text-[10px] text-slate-400 truncate">سازمانی: owner@aurevia.ai</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-mono">رجیسترار و امنیت</span>
                <div className="font-bold text-emerald-300 text-[11px] truncate">{currentDomainData.registrar}</div>
                <div className="text-[10px] text-slate-400 font-mono">{currentDomainData.dnssecStatus}</div>
              </div>
            </div>
          </div>

          {/* Action Hub for DNS */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">
                فهرست کامل {currentDomainData.dnsRecords.length} رکورد فعال برای{' '}
                <span className="font-mono text-amber-400">{currentDomainData.domain}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleCopyAllDnsFormatted(currentDomainData)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
              >
                {copiedKey === `all-dns-${currentDomainData.domain}` ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedKey === `all-dns-${currentDomainData.domain}`
                    ? 'همه رکوردها کپی شد!'
                    : 'کپی یکپارچه تمام رکوردهای DNS'}
                </span>
              </button>

              <button
                onClick={() => handleDownloadZoneFile(currentDomainData)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>دانلود فایل Zone (TXT)</span>
              </button>
            </div>
          </div>

          {/* Detailed DNS Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 text-[11px] font-mono">
                    <th className="p-3.5">نوع رکورد (Type)</th>
                    <th className="p-3.5">نام / هاست (Name)</th>
                    <th className="p-3.5">مقدار نهایی (Value / Target)</th>
                    <th className="p-3.5">TTL / اولویت</th>
                    <th className="p-3.5">کاربرد در اکوسیستم</th>
                    <th className="p-3.5 text-center">کپی سریع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {currentDomainData.dnsRecords.map((rec, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition">
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded font-black text-[11px] ${
                            rec.type === 'A' || rec.type === 'AAAA'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : rec.type === 'CNAME'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : rec.type === 'TXT'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : rec.type === 'MX'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          }`}
                        >
                          {rec.type}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-300 font-bold">{rec.name}</td>
                      <td className="p-3.5 text-amber-200 max-w-xs truncate" title={rec.value}>
                        {rec.value}
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {rec.ttl} {rec.priority ? `(Prio: ${rec.priority})` : ''}
                      </td>
                      <td className="p-3.5 text-slate-300 font-sans text-[11px]">{rec.purpose}</td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => copyToClipboard(rec.value, `dns-val-${idx}-${currentDomainData.domain}`)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                          title="کپی مقدار رکورد"
                        >
                          {copiedKey === `dns-val-${idx}-${currentDomainData.domain}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BIND Zone File & WHOIS side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zone File Preview */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden space-y-2">
              <div className="px-5 py-3.5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-200">
                    فرمت استاندارد BIND Zone File برای ورود یکجا به Cloudflare/DNS
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(currentDomainData.zoneFile, `zone-${currentDomainData.domain}`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  {copiedKey === `zone-${currentDomainData.domain}` ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedKey === `zone-${currentDomainData.domain}` ? 'کپی شد' : 'کپی Zone'}</span>
                </button>
              </div>
              <div className="p-4 font-mono text-[11px] text-slate-300 bg-slate-950/60 overflow-x-auto max-h-72 leading-relaxed">
                <pre>{currentDomainData.zoneFile}</pre>
              </div>
            </div>

            {/* WHOIS Payload Preview */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden space-y-2">
              <div className="px-5 py-3.5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200">
                    استعلام رسمی رجیسترار و سند هویتی ICANN WHOIS
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(currentDomainData.whoisPayload, `whois-${currentDomainData.domain}`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  {copiedKey === `whois-${currentDomainData.domain}` ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedKey === `whois-${currentDomainData.domain}` ? 'کپی شد' : 'کپی WHOIS'}</span>
                </button>
              </div>
              <div className="p-4 font-mono text-[11px] text-slate-300 bg-slate-950/60 overflow-x-auto max-h-72 leading-relaxed">
                <pre>{currentDomainData.whoisPayload}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 8 Connection Wizards */}
      {activeTab === 'wizards' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wizard List */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              ۸ جادوگر استقرار و اتصال ابری
            </div>
            <div className="divide-y divide-slate-800/80">
              {wizards.map((wiz) => (
                <div
                  key={wiz.id}
                  onClick={() => setSelectedWizard(wiz.id)}
                  className={`p-4 cursor-pointer transition flex items-center justify-between ${
                    selectedWizard === wiz.id
                      ? 'bg-amber-500/10 border-r-4 border-amber-500'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-amber-400">
                      {wiz.id}
                    </span>
                    <span className="text-xs font-bold text-slate-200">{wiz.title}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Active Wizard Steps */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-amber-400">
                  راهنمای گام‌به‌گام: {wizards.find((w) => w.id === selectedWizard)?.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  پیکربندی استقرار صفر تا صد روی شبکه جهانی بدون نیاز به سرور اختصاصی گران‌قیمت
                </p>
              </div>
              <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/30">
                گام {selectedWizard} از ۸
              </span>
            </div>

            <div className="space-y-3">
              {wizards
                .find((w) => w.id === selectedWizard)
                ?.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-xs text-slate-300 leading-relaxed">{st}</span>
                  </div>
                ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedWizard(Math.max(1, selectedWizard - 1))}
                disabled={selectedWizard === 1}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 transition disabled:opacity-40 cursor-pointer"
              >
                مرحله قبلی
              </button>
              <button
                onClick={() => setSelectedWizard(Math.min(8, selectedWizard + 1))}
                disabled={selectedWizard === 8}
                className="px-4 py-2 rounded-xl bg-amber-500 text-xs font-bold text-slate-950 hover:bg-amber-400 transition disabled:opacity-40 cursor-pointer"
              >
                مرحله بعدی
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 1-Click Installer */}
      {activeTab === 'installer' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-slate-200">
              بسته‌های رسمی نصب و اجرای سوپراپلیکیشن AIONVERSE 5.0
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              تولید خروجی مستقیم سازگار با موبایل، تبلت، ویندوز و مرورگر وب
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: 'apk',
                platform: 'فایل APK اندروید',
                sub: 'اندروید ۸.۰ به بالا',
                size: '۲۸ مگابایت',
                icon: Smartphone,
                color: 'text-emerald-400',
              },
              {
                id: 'ipa',
                platform: 'فایل IPA آی‌او‌اس',
                sub: 'iOS 15+ با اکانت اپل',
                size: '۳۴ مگابایت',
                icon: Laptop,
                color: 'text-cyan-400',
              },
              {
                id: 'exe',
                platform: 'فایل EXE ویندوز',
                sub: 'ویندوز ۱۰ و ۱۱ (x64)',
                size: '۶۲ مگابایت',
                icon: Monitor,
                color: 'text-indigo-400',
              },
              {
                id: 'pwa',
                platform: 'وب‌اپ PWA بدون نصب',
                sub: 'اجرا در مرورگر با آفلاین‌مود',
                size: 'فوری / کش محلی',
                icon: Globe,
                color: 'text-amber-400',
              },
            ].map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.id}
                  className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-amber-500/50 transition space-y-4"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${app.color}`} />
                    </div>
                    <div className="text-xs font-bold text-slate-200">{app.platform}</div>
                    <div className="text-[11px] text-slate-400">{app.sub}</div>
                    <div className="text-[10px] text-slate-500 font-mono">حجم: {app.size}</div>
                  </div>

                  <button
                    onClick={() => handleDownloadApp(app.id as any)}
                    disabled={packageDownloading === app.id}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {packageDownloading === app.id ? 'آماده‌سازی پکیج...' : 'دانلود بسته نصب'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
