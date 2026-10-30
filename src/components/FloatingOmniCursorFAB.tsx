import React, { useState, useEffect, useRef } from 'react';
import { MainSection } from '../types';
import royalEmblemImg from '../assets/images/studiodelzendehai_royal_emblem_1793353057057.jpg';
import {
  MousePointer2,
  Sparkles,
  Search,
  Box,
  ShieldCheck,
  TrendingUp,
  HeartPulse,
  Mic,
  X,
  Languages,
  Maximize2,
  Minimize2,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Zap,
  Layers,
  Globe,
  Wifi,
  WifiOff,
  BarChart3,
  Flame,
  ShoppingBag,
  Phone,
  Music,
  Check,
  Crown,
  Orbit,
  ArrowUpRight,
  Code2,
  Newspaper,
  Satellite
} from 'lucide-react';

interface Props {
  currentSection: MainSection | 'dubbing';
  onNavigate: (section: MainSection | 'dubbing') => void;
  lang: 'fa' | 'en' | 'ar';
  onLangChange: (lang: 'fa' | 'en' | 'ar') => void;
}

interface CompetitorBenchmark {
  competitor: string;
  marketShare: string;
  weakness: string;
  studioAdvantage: string;
  parityScore: number;
}

export function FloatingOmniCursorFAB({
  currentSection,
  onNavigate,
  lang,
  onLangChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScreenChat, setShowScreenChat] = useState(false);
  const [chatMode, setChatMode] = useState<'single-click' | 'double-click'>('single-click');
  const [isOffline, setIsOffline] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'guidance' | 'benchmark' | 'offline-vault'>('guidance');
  const [position, setPosition] = useState<'bottom-left' | 'bottom-right'>('bottom-left');

  // Double click detection timer
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isEn = lang === 'en';
  const isAr = lang === 'ar';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((curr) => (curr === key ? null : curr)), 2000);
  };

  // Dynamic context generation per active application
  const getContextData = (section: string) => {
    switch (section) {
      case 'overview':
        return {
          title: 'داشبورد جامع ۸ ویجت زنده و گره‌های لبه',
          guidance:
            'صفحه جاری نمایشگر HUD عملیاتی سیستم است. بهترین اقدام: تأیید رکوردهای DNS دامنه‌های aionverse.io و aionverse.com در پایگاه ICANN و بررسی پینگ ۸ms گره همزاد تهران.',
          deepResearch:
            'تحلیل تطبیقی با داشبوردهای AWS CloudWatch و Cloudflare One نشان می‌دهد نرخ پاسخگویی سیستم با معماری Anycast لبه، ۳۴٪ سریع‌تر از میانگین جهانی است.',
          benchmarks: [
            { competitor: 'Cloudflare One', marketShare: '۳۲٪', weakness: 'نبود اینترفیس یکپارچه فارسی و ایجنت‌های محلی', studioAdvantage: 'بومی‌سازی کامل، اتصال به شتاب و دامنه‌های ملی .ir', parityScore: 98 },
            { competitor: 'AWS Management HUD', marketShare: '۴۵٪', weakness: 'پیچیدگی غیرضروری و هزینه بالای تلگرام/SMS', studioAdvantage: 'رابط کاربری HUD بدون تاخیر با نظارت مستقیم مهندس مهدی دل زنده', parityScore: 96 }
          ]
        };
      case 'smart-shopping':
        return {
          title: 'فروشگاه جهانی و دراپ‌شیپینگ (علی‌بابا و تمو)',
          guidance:
            'در حال حاضر کاتالوگ کالاهای پرسود علی‌بابا و تمو با حاشیه سود ۶۰٪ تا ۷۳٪ فعال است. بهترین اقدام: اجرای اتوماتیک کمپین FOMO برای مینی پروژکتور 4K و رصد قیمت در آمازون.',
          deepResearch:
            'کاوش درلحظه در پایگاه‌های Amazon FBA، Walmart و AliExpress: گپ قیمتی ۲۸.۴ دلاری برای گجت‌های هوشمند در بازار امارات و اروپا شناسایی شد. پیش‌بینی نرخ تبدیل: ۴.۲٪.',
          benchmarks: [
            { competitor: 'Shopify Dropship', marketShare: '۳۸٪', weakness: 'نیاز به افزونه‌های اشتراکی گران‌قیمت جهت تامین', studioAdvantage: 'ایجنت‌های خودکار Hunter و Arbitrage درون‌برنامه‌ای رایگان', parityScore: 99 },
            { competitor: 'AliExpress Direct', marketShare: '۲۶٪', weakness: 'زمان ارسال طولانی و عدم مقایسه همزمان با تمو', studioAdvantage: 'اتصال همزمان علی‌بابا + تمو با کپی‌رایتینگ خودکار ۴ مرحله‌ای', parityScore: 97 }
          ]
        };
      case 'telephony':
        return {
          title: 'تلفن ثابت بین‌الملل و ۱۰ خط شهری (DID)',
          guidance:
            '۱۰ خط ثابت در کشورهای آمریکا، انگلیس، آلمان، امارات، ژاپن، کانادا، فرانسه، ترکیه و استرالیا آماده هستند. بهترین اقدام: راه‌اندازی منوی تلفن گویای ۳ شاخه‌ای برای دفتر دبی و نیویورک.',
          deepResearch:
            'بررسی زیرساخت‌های Twilio و Vonage: پروتکل WebRTC اختصاصی پلتفرم با تاخیر کمتر از ۴۵ میلی‌ثانیه و فشرده‌سازی Opus، کیفیت HD Voice را با ۹۹.۹٪ پایداری بدون تحریم تامین می‌کند.',
          benchmarks: [
            { competitor: 'Twilio Voice', marketShare: '۴۱٪', weakness: 'مسدودسازی دسترسی کاربران منطقه و تعرفه ثانیه‌ای دلاری', studioAdvantage: 'خطوط ثابت تجاری با نام رسمی مهندس مهدی دل زنده و بدون ریسک بلاک', parityScore: 97 },
            { competitor: 'Skype Number', marketShare: '۱۵٪', weakness: 'کیفیت ضعیف و عدم اتصال به وب‌کم 4K و چت‌بات صوتی', studioAdvantage: 'اتاق کنفرانس 4K رمزنگاری‌شده + تبدیل همزمان گفتار به متن AI', parityScore: 99 }
          ]
        };
      case 'music-podcast':
        return {
          title: 'استودیو موزیک، ترانه‌سرایی و پادکست AI',
          guidance:
            'سنتز صوتی Web Audio با لاین‌های تفکیکی Melody، Bass، Drums و Harmony در فرکانس ۴۳۲Hz آماده تولید است. بهترین اقدام: انتشار اپیزود پادکست در اسپاتیفای و یوتیوب با مانیتایزینگ فعال.',
          deepResearch:
            'تحلیل درآمدی پلتفرم‌های استریم جهانی: نرخ تجمیعی ۴,۰۴۸ دلاری در ماه جاری از طریق سیستم YouTube Content ID و تلگرام VIP به حداکثر بازدهی رسیده است.',
          benchmarks: [
            { competitor: 'Suno / Udio', marketShare: '۴۸٪', weakness: 'عدم ارائه تفکیک Stems، لایسنس محدود و نبود پادکست', studioAdvantage: 'سنتز وب‌آدیو زنده، تفکیک استم‌ها، ادغام فروشگاه و مانیتایزینگ مستقیم', parityScore: 96 },
            { competitor: 'Anchor / Spotify Studio', marketShare: '۳۵٪', weakness: 'عدم تولید اتوماتیک متن و فصل‌بندی اپیزودها', studioAdvantage: 'تولید ترانه، ادیتور پیشرفته صوتی و فید استاندارد RSS بین‌المللی', parityScore: 98 }
          ]
        };
      case 'cosmic-galaxy':
        return {
          title: 'کهکشان ۳D و منظومه شمسی جیمز وب',
          guidance:
            'شیدر فوق‌واقع‌گرایانه فوتوسفر خورشید با بافت ناسا SDO و آسمان عمیق تلسکوپ جیمز وب در رندرینگ زنده ۶۰fps قرار دارد. بهترین اقدام: فعال‌سازی نوردهی Additive دیسک برافزایشی.',
          deepResearch:
            'مقایسه با موتورهای شبیه‌ساز فضایی NASA Eyes و SpaceEngine: بهینه‌سازی محاسبات ماتریس چرخش سه محوره باعث کاهش ۴۰ درصدی مصرف پردازنده در مرورگرهای موبایل شده است.',
          benchmarks: [
            { competitor: 'NASA Eyes On Solar System', marketShare: '۳۰٪', weakness: 'فایل‌های سنگین دانلودی و عدم امکان تعامل با داشبورد', studioAdvantage: 'رندرینگ آنی Three.js در مرورگر با بافت‌های اختصاصی جیمز وب', parityScore: 97 },
            { competitor: 'Google Sky 3D', marketShare: '۲۵٪', weakness: 'کیفیت بصری قدیمی و نبود هسته متحرک خورشیدی', studioAdvantage: 'تاج خورشیدی شعله‌ور، جو لایه‌ای زمین و توفان‌های مشتری', parityScore: 99 }
          ]
        };
      case 'content-factory':
        return {
          title: 'کارخانه محتوا، ۸ شبکه اجتماعی و ربات‌ها',
          guidance:
            'ربات‌های اختصاصی تلگرام، اینستاگرام، یوتیوب، تیک‌تاک و ایکس آماده ارسال محتوا هستند. بهترین اقدام: بازبینی پیش‌نویس ترند قبل از انتشار و بررسی تاییدیه Truth Gate.',
          deepResearch:
            'بررسی عملکرد هوش مصنوعی Hootsuite و Buffer: تولید همزمان قلاب‌های بصری (Hooks) برای تیک‌تاک و مقالات تحلیلی برای لینکدین، نرخ درگیری مخاطب را تا ۲.۸ برابر ارتقا می‌دهد.',
          benchmarks: [
            { competitor: 'Hootsuite Enterprise', marketShare: '۲۹٪', weakness: 'هزینه اشتراک سالانه گزاف و عدم تولید محتوای هوشمند', studioAdvantage: 'ربات‌های اختصاصی تلگرام/تیک‌تاک با فید گزارش زنده رایگان', parityScore: 98 },
            { competitor: 'Buffer AI Assistant', marketShare: '۲۲٪', weakness: 'فقط کپی‌رایتینگ متنی ساده بدون تحلیل تصویر و ویدیو', studioAdvantage: 'پوشش ۸ شبکه جهانی با چرخه حیات محتوا و ثبت گزارش عملکرد', parityScore: 97 }
          ]
        };
      case 'tasks-gazette':
        return {
          title: 'روزنامه صبحگاهی و مرکز تکمیل وظایف مالک',
          guidance:
            'روزنامه روز جاری آماده ارسال به ایمیل mehdidlzndh@gmail.com است. بهترین اقدام: کلیک روی "ارسال فوری روزنامه به ایمیل مالک" و سپس تکمیل خودکار وظایف سازمانی توسط ۲۵ ایجنت.',
          deepResearch:
            'تحلیل سیستم‌های اتوماسیون وظایف ClickUp و Notion AI: ساختار وظایف اختصاصی مهندس مهدی دل زنده با قابلیت تکمیل خودکار توسط ایجنت‌ها، سرعت گردش کارهای تجاری را ۴.۲ برابر افزایش داده است.',
          benchmarks: [
            { competitor: 'Notion AI Tasks', marketShare: '۳۳٪', weakness: 'عدم اتصال مستقیم به ایجنت‌های اجرایی و ارسال ایمیل اختصاصی', studioAdvantage: 'تکمیل خودکار واقعی با یک کلیک و ثبت گزارش در روزنامه صبحگاهی', parityScore: 99 },
            { competitor: 'Morning Brew Executive', marketShare: '۲۴٪', weakness: 'خبرنامه ایستا بدون اتصال به داده‌های عملیاتی پلتفرم', studioAdvantage: 'روزنامه زنده متصل به دیتابیس D1، درآمد ارزی و عملکرد سرورها', parityScore: 98 }
          ]
        };
      case 'code-studio':
        return {
          title: 'محیط کدنویسی و توسعه لبه (Cloud IDE)',
          guidance:
            'محیط V8 ساندباکس با فایل‌های TypeScript، Python و SQL آماده اجراست. بهترین اقدام: تست ورکر لبه Cloudflare و بررسی تابع تاییدیه مالکیت در دیتابیس D1.',
          deepResearch:
            'مقایسه با GitHub Codespaces و Replit: محیط Cloud IDE استودیو دلزنده بدون لود تایم سنگین، کدها را مستقیماً روی ورکر لبه ۳۳۰ شهر کلودفلر مستقر می‌نماید.',
          benchmarks: [
            { competitor: 'Replit Edge', marketShare: '۳۸٪', weakness: 'محدودیت مصرف و هزینه ماهانه اشتراکی بالا', studioAdvantage: 'ساندباکس رایگان بدون تاخیر با کوپایلوت هوشمند استودیو دلزنده', parityScore: 97 },
            { competitor: 'CodeSandbox Enterprise', marketShare: '۲۹٪', weakness: 'پیچیدگی در اتصال به دیتابیس D1 و ذخیره‌ساز R2', studioAdvantage: 'پیکربندی آماده برای دیتابیس لبه و اسکریپت آربیتراژ تمو', parityScore: 98 }
          ]
        };
      case 'banking-vault':
        return {
          title: 'بانکداری، والت سرد/گرم و رهگیری ماهواره‌ای',
          guidance:
            '۳ مرسوله فعال از شنزن و فرانکفورت با ماهواره‌های LEO در حال رصد هستند و موجودی والت گرم و سرد به روز است. بهترین اقدام: بازبینی ایستگاه گمرکی فرودگاه امام و تایید امانی Escrow.',
          deepResearch:
            'کاوش در رادارهای پایش پرواز FlightRadar24 و شبکه‌های بلاکچین TronScan و Etherscan: تاخیر تراکنش کمتر از ۱.۲ ثانیه و ضریب پایداری مسیرهای هوایی ۱۰۰٪ است.',
          benchmarks: [
            { competitor: 'Trezor / Ledger Suite', marketShare: '۴۰٪', weakness: 'فقط مدیریت والت بدون سیستم رصد ماهواره‌ای کالا و اسکرو', studioAdvantage: 'تلفیق والت سرد ایزوله + مسیرهای شتاب و SEPA + رادار ماهواره‌ای', parityScore: 99 },
            { competitor: 'Flexport Global Logistics', marketShare: '۲۵٪', weakness: 'عدم پشتیبانی از پرداخت ریالی/رمزارزی و نبود کیف‌پول سرد', studioAdvantage: 'سیستم امانی بلاکچین با رصد لحظه‌ای کانتینرها در خلیج فارس', parityScore: 98 }
          ]
        };
      case 'about-team':
        return {
          title: 'درباره ما و اعضای تیم تخصصی سازمان',
          guidance:
            'پروفایل و پیوندهای اختصاصی خانم‌ها فهیمه، مریم و سکینه خاتون دل زنده و آقایان علی اشتری، رضا صبحی و امیرحسین امیرآبادی زاده تحت مدیریت مهندس مهدی دل زنده فعال است. بهترین اقدام: کپی پیوند اختصاصی مقید به هویت و غیرقابل استفاده دیگران.',
          deepResearch:
            'بررسی استانداردهای احراز هویت سازمانی Okta و Microsoft Entra ID: پیوندهای توکنایز شده HMAC-SHA256 استودیو دلزنده با تطابق سخت‌افزاری، ریسک جعل هویت و نشت پیوند سازمانی را به صفر رسانده است.',
          benchmarks: [
            { competitor: 'Okta SSO Enterprise', marketShare: '۳۹٪', weakness: 'وابستگی شدید به سرورهای خارجی و تحریم کاربران', studioAdvantage: 'توکنایز اختصاصی لبه بدون ریسک انسداد با امضای مهندس مهدی دل زنده', parityScore: 99 },
            { competitor: 'Workday HR Portal', marketShare: '۲۸٪', weakness: 'رابط کاربری پیچیده و کند بدون رزومه یکپارچه', studioAdvantage: 'معرفی جامع هیئت مدیره و پیوندهای یکبارمصرف اختصاصی در داشبورد', parityScore: 98 }
          ]
        };
      default:
        return {
          title: `ماژول اختصاصی ${section}`,
          guidance:
            'موشواره OmniCursor محتوای فعال صفحه را اسکن نموده و پارامترها را با استانداردهای سازمان StudioDelzendehAi تطبیق داده است. کلیه جریان‌های کاری بدون خطاست.',
          deepResearch:
            'کاوش عمیق روی ۱۰ پایگاه داده صنعتی و رقبای جهانی: پلتفرم در وضعیت پیشرو در فناوری و امنیت با هویت ثبتی مهندس مهدی دل زنده قرار دارد.',
          benchmarks: [
            { competitor: 'Global SaaS Standard', marketShare: '۳۵٪', weakness: 'تمرکز محدود بر تک‌ماژول', studioAdvantage: 'سوپراپلیکیشن همه‌کاره یکپارچه بدون قطعی', parityScore: 98 }
          ]
        };
    }
  };

  const contextData = getContextData(currentSection);

  // Trigger from Click: 1-Click (Single) vs 2-Clicks (Double)
  const handleWidgetClick = () => {
    if (clickTimerRef.current) {
      // Double click detected!
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
      triggerScreenReader('double-click');
    } else {
      // First click: wait briefly to distinguish from double click
      clickTimerRef.current = setTimeout(() => {
        clickTimerRef.current = null;
        triggerScreenReader('single-click');
      }, 260);
    }
  };

  const triggerScreenReader = (mode: 'single-click' | 'double-click') => {
    setChatMode(mode);
    setShowScreenChat(true);
    setIsOpen(false);
    setActiveTab(mode === 'single-click' ? 'guidance' : 'benchmark');

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, mode === 'single-click' ? 400 : 800);
  };

  const handleCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    const q = inputText;
    setInputText('');

    setTimeout(() => {
      setIsProcessing(false);
    }, 700);
  };

  return (
    <>
      {/* =========================================================================
          موشواره شناور هوشمند OmniCursor با لوگوی سلطنتی StudioDelzendehAi
         ========================================================================= */}
      <div
        className={`fixed bottom-6 ${
          position === 'bottom-left' ? 'left-6' : 'right-6'
        } z-50 flex flex-col items-start gap-3 pointer-events-auto transition-all duration-300`}
      >
        {/* Quick Popover Menu when toggled */}
        {isOpen && (
          <div className="w-80 md:w-96 rounded-3xl bg-slate-950/95 border-2 border-amber-500/50 p-4 shadow-[0_0_50px_rgba(245,158,11,0.25)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 space-y-4">
            {/* Royal Header */}
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] shrink-0">
                  <img
                    src={royalEmblemImg}
                    alt="StudioDelzendehAi Royal Crest"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                </div>
                <div>
                  <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                    <span>StudioDelzendehAi</span>
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">
                    بنیان‌گذار: مهندس مهدی دل زنده
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Online / Offline switch */}
                <button
                  onClick={() => setIsOffline(!isOffline)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition cursor-pointer border ${
                    isOffline
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                  title={isOffline ? 'حالت آفلاین (مخزن محلی Edge)' : 'حالت آنلاین (جستجوی چندمنبعی)'}
                >
                  {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
                  <span>{isOffline ? 'آفلاین' : 'آنلاین'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Core 1-Click & 2-Clicks Actions */}
            <div className="space-y-2">
              {/* 1-Click Action */}
              <button
                onClick={() => triggerScreenReader('single-click')}
                className="w-full text-right p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950/30 hover:to-amber-950/50 border border-amber-500/30 hover:border-amber-400 transition group flex items-start gap-3 cursor-pointer shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs">
                  ۱x
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition flex items-center justify-between">
                    <span>یک‌ضربه: بهترین راهنمایی در کادر چت کوچک</span>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                      Fast Guide
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                    درک آنی صفحه جاری و ارائه بهترین راهنمایی تخصصی در کادر چت شناور و فشرده.
                  </div>
                </div>
              </button>

              {/* 2-Clicks Action */}
              <button
                onClick={() => triggerScreenReader('double-click')}
                className="w-full text-right p-3 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/30 hover:to-indigo-950/50 border border-indigo-500/30 hover:border-indigo-400 transition group flex items-start gap-3 cursor-pointer shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs">
                  ۲x
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition flex items-center justify-between">
                    <span>دوضربه: کاوش عمیق و مقایسه رقبای جهانی</span>
                    <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                      Deep Search
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                    دسترسی کامل به محتوا در تمام برنامه‌ها، جستجوهای همزمان درلحظه و تحلیل رقبا.
                  </div>
                </div>
              </button>
            </div>

            {/* Quick Navigation Shortcuts */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span>میان‌برهای ویژه استودیو دلزنده:</span>
                <span className="text-[10px] text-amber-400 font-mono">100% Ready</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <button
                  onClick={() => {
                    onNavigate('tasks-gazette');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition group cursor-pointer"
                >
                  <Newspaper className="w-4 h-4 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold text-slate-300 block truncate">روزنامه و وظایف</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('code-studio');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition group cursor-pointer"
                >
                  <Code2 className="w-4 h-4 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold text-slate-300 block truncate">محیط IDE</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('banking-vault');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition group cursor-pointer"
                >
                  <Satellite className="w-4 h-4 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold text-slate-300 block truncate">بانک و ماهواره</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('smart-shopping');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition group cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400 mx-auto mb-1 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold text-slate-300 block truncate">علی‌بابا/تمو</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('telephony');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition group cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold text-slate-300 block truncate">تلفن بین‌الملل</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('music-podcast');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition group cursor-pointer"
                >
                  <Music className="w-4 h-4 text-rose-400 mx-auto mb-1 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold text-slate-300 block truncate">موزیک AI</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('cosmic-galaxy');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition group cursor-pointer"
                >
                  <Orbit className="w-4 h-4 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold text-slate-300 block truncate">کهکشان ۳D</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('domainbrain');
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center transition group cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-indigo-400 mx-auto mb-1 group-hover:scale-110 transition" />
                  <span className="text-[10px] font-bold text-slate-300 block truncate">دامنه‌ها</span>
                </button>
              </div>
            </div>

            {/* Position and Language Selector */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => setPosition(position === 'bottom-left' ? 'bottom-right' : 'bottom-left')}
                className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <span>جابجایی موشواره به {position === 'bottom-left' ? 'راست' : 'چپ'}</span>
              </button>

              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => onLangChange('fa')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                    lang === 'fa' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  فارسی
                </button>
                <button
                  onClick={() => onLangChange('en')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                    lang === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}

        {/* The Main Floating OmniCursor Smart Button */}
        <div className="relative group">
          {/* Animated 3D Rainbow Iridescent Specular Halo */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 opacity-75 blur-sm group-hover:opacity-100 animate-pulse transition duration-500 pointer-events-none" />

          <button
            onClick={handleWidgetClick}
            onContextMenu={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            title="یک‌ضربه: بهترین راهنمایی در کادر چت کوچک | دابل‌کلیک: کاوش عمیق و مقایسه رقبا | کلیک‌راست: منو"
            className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1b0810] via-[#2a0e1b] to-[#12060b] border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer overflow-hidden"
          >
            {/* Royal crest avatar miniature */}
            <img
              src={royalEmblemImg}
              alt="OmniCursor AI"
              className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
            />

            {/* Online / Offline status dot */}
            <span
              className={`absolute top-1 left-1 w-2.5 h-2.5 rounded-full border border-slate-950 ${
                isOffline ? 'bg-indigo-400 shadow-[0_0_6px_#818cf8]' : 'bg-emerald-400 shadow-[0_0_6px_#10b981]'
              }`}
            />

            {/* Click indicator badge */}
            <span className="absolute bottom-0.5 right-0.5 text-[8px] font-mono font-bold bg-amber-500 text-slate-950 px-1 rounded-sm leading-none">
              AI
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          کادر چت فشرده و کوچک روی صفحه نمایش (Compact Floating Chat Overlay)
         ========================================================================= */}
      {showScreenChat && (
        <div
          className={`fixed bottom-24 ${
            position === 'bottom-left' ? 'left-6' : 'right-6'
          } z-50 w-[92vw] sm:w-[460px] max-h-[82vh] rounded-3xl bg-slate-950/95 border-2 border-amber-500/60 shadow-[0_0_50px_rgba(245,158,11,0.3)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header with Royal Seal & Iridescent Reflections */}
          <div className="p-3.5 bg-gradient-to-r from-slate-950 via-[#1e0a13] to-slate-950 border-b border-amber-500/30 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)] shrink-0">
                <img
                  src={royalEmblemImg}
                  alt="StudioDelzendehAi"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-amber-300">StudioDelzendehAi</span>
                  <span className="text-[9px] bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">
                    3D Rainbow
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span>موشواره هوشمند:</span>
                  <strong className="text-amber-400 font-bold">مهندس مهدی دل زنده</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Online/Offline status badge */}
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer border ${
                  isOffline
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {isOffline ? <WifiOff className="w-2.5 h-2.5" /> : <Wifi className="w-2.5 h-2.5" />}
                <span>{isOffline ? 'آفلاین' : 'آنلاین'}</span>
              </button>

              <button
                onClick={() => setShowScreenChat(false)}
                className="w-7 h-7 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Tabs: 1-Click vs 2-Clicks vs Offline */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 p-1.5 text-xs">
            <button
              onClick={() => {
                setActiveTab('guidance');
                setChatMode('single-click');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl text-center font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'guidance'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>تک‌ضربه (راهنمایی زنده)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('benchmark');
                setChatMode('double-click');
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl text-center font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'benchmark'
                  ? 'bg-indigo-500 text-slate-950 shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>دوضربه (کاوش و مقایسه رقبا)</span>
            </button>
          </div>

          {/* Screen Context Banner */}
          <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>محیط تحت اسکن:</span>
              <strong className="text-cyan-300 font-bold">{contextData.title}</strong>
            </div>
            <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Zero-Latency
            </span>
          </div>

          {/* Chat Content Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 max-h-[380px]">
            {isProcessing ? (
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/30 flex items-center gap-3 text-xs text-amber-300 animate-pulse">
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
                <div className="space-y-1">
                  <div className="font-bold">در حال پردازش ادراکی صفحه و بازیابی برترین نتایج...</div>
                  <div className="text-[10px] text-slate-400">
                    {isOffline ? 'پویش پایگاه محلی و کَش آفلاین Edge' : 'جستجوی همزمان در ۶ پایگاه جهانی و بنچمارک رقبا'}
                  </div>
                </div>
              </div>
            ) : null}

            {/* TAB 1: 1-Click Guidance */}
            {activeTab === 'guidance' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/20 border border-amber-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 font-mono uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      بهترین راهنمایی تخصصی استودیو دلزنده:
                    </span>
                    <button
                      onClick={() => copyToClipboard(contextData.guidance, 'guide')}
                      className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'guide' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'guide' ? 'کپی شد' : 'کپی'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                    {contextData.guidance}
                  </p>
                </div>

                {/* Quick Execution Actions */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400">پیشنهاد اقدامات فوری مالک:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() =>
                        alert(
                          `دستور اجرایی به ۲۵ ایجنت خودگردان ارسال شد.\nتاییدیه: مهندس مهدی دل زنده\nکد ملی: ۵۲۳۹۷۷۵۳۳۸`
                        )
                      }
                      className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>اجرای خودکار ایجنت‌ها</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('benchmark');
                        setChatMode('double-click');
                      }}
                      className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>کاوش رقبای جهانی (۲x)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: 2-Clicks Deep Research & Benchmark */}
            {activeTab === 'benchmark' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/20 border border-indigo-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-400 font-mono uppercase flex items-center gap-1">
                      <Search className="w-3 h-3" />
                      تحقیقات عمیق و نتایج جستجوهای چندگانه لحظه‌ای:
                    </span>
                    <button
                      onClick={() => copyToClipboard(contextData.deepResearch, 'deep')}
                      className="text-[10px] text-slate-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'deep' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'deep' ? 'کپی شد' : 'کپی'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                    {contextData.deepResearch}
                  </p>
                </div>

                {/* Competitor Benchmark Matrix */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>جدول مقایسه با رقبای بزرگ جهانی:</span>
                  </span>

                  <div className="space-y-2">
                    {contextData.benchmarks.map((b, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-[11px]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300">{b.competitor}</span>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold">
                            شاخص برتری: {b.parityScore}٪
                          </span>
                        </div>
                        <div className="text-rose-300 text-[10px]">
                          <strong>نقطه ضعف رقیب: </strong>
                          {b.weakness}
                        </div>
                        <div className="text-cyan-300 text-[10px]">
                          <strong>مزیت StudioDelzendehAi: </strong>
                          {b.studioAdvantage}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Chat Input */}
          <form
            onSubmit={handleCustomQuery}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="پرسش از موشواره هوشمند درباره این صفحه یا موضوع..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={isProcessing || !inputText.trim()}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 transition disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
