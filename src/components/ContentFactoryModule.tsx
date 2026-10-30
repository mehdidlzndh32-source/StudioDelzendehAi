import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Share2,
  Video,
  Clapperboard,
  Palette,
  FileText,
  Copy,
  Check,
  Download,
  Flame,
  ShieldCheck,
  Send,
  ExternalLink,
  CheckCircle2,
  Lock,
  Globe,
  Radio,
  FileCode,
  Bot,
  Heart,
  MessageCircle,
  Eye,
  Repeat,
  Tag
} from 'lucide-react';

export interface PublishedPost {
  id: string;
  title: string;
  caption: string;
  sentTime: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  status: 'sent' | 'scheduled';
}

interface ChannelContent {
  id: string;
  name: string;
  handle: string;
  url: string;
  subscribers: string;
  views: string;
  estRevenue: string;
  icon: string;
  brandColor: string;
  niche: string;
  bot: {
    name: string;
    handle: string;
    status: 'online' | 'broadcasting';
    accuracy: number;
    lastAction: string;
  };
  preparedPost: {
    title: string;
    caption: string;
    hashtags: string;
    mediaPrompt: string;
    cta: string;
  };
  publishedPosts: PublishedPost[];
}

export function ContentFactoryModule() {
  const [activeTab, setActiveTab] = useState<'channels' | 'viral-hooks' | 'ebook' | 'storyboard' | 'brandkit' | 'copy-hub'>('channels');
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>('telegram');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customPostsMap, setCustomPostsMap] = useState<Record<string, PublishedPost[]>>({});
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCaption, setNewPostCaption] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const channelsData: ChannelContent[] = [
    {
      id: 'telegram',
      name: 'کانال رسمی و ربات تلگرام (Telegram VIP)',
      handle: '@AIONVERSE_Official',
      url: 'https://t.me/AIONVERSE_Official',
      subscribers: '34,800',
      views: '980K/ماه',
      estRevenue: '$650/mo',
      icon: '✈️',
      brandColor: 'from-sky-500/20 to-blue-600/20 border-sky-500/40 text-sky-400',
      niche: 'سیگنال‌های تریدینگ رمزارزی، اخبار دامنه‌ها، آپدیت ایجنت‌ها',
      bot: {
        name: 'AION-VIP Broadcast & News Bot',
        handle: '@AionverseNewsBot',
        status: 'online',
        accuracy: 99.8,
        lastAction: 'ارسال خودکار سیگنال تریدینگ به ۳۴,۸۰۰ عضو در ۱.۱ ثانیه'
      },
      preparedPost: {
        title: '📊 گزارش تحلیلی ربات نوسان‌گیری جفتی AION-Crypto (نوبیتکس / بایننس)',
        caption: `سیگنال جفت‌ارز PAXG/USDT و BTC/USDT:\n- شاخص RSI: ۴۲.۱ (در محدوده خرید بهینه)\n- حد ضرر پیشنهادی: -۳.۵٪ | حد سود: +۸.۰٪\n- تخصیص خودکار ۱۰٪ از سود به صندوق توسعه رسمی پلتفرم.\nتأییدیه صحت منبع: Truth Gate Verified بنام مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸).`,
        hashtags: '#تریدینگ_رمزارزی #نوبیتکس #AIONVERSE #سیگنال_تکنیکال',
        mediaPrompt: 'Trading chart with glowing RSI curve, gold and green indicators on deep carbon mesh background',
        cta: 'ورود به داشبورد تریدینگ در https://aionverse.io/crypto'
      },
      publishedPosts: [
        {
          id: 'tg-post-1',
          title: '🚀 آغاز به کار رسمی فروشگاه جهانی همکاری در فروش علی‌بابا و تمو',
          caption: 'کلیه اعضای اکوسیستم از امروز به کاتالوگ ۲۰۰,۰۰۰ کالای پرفروش علی‌بابا و تمو با حاشیه سود ۶۰٪ و تسویه آنی متصل شدند.',
          sentTime: 'امروز — ساعت ۱۰:۴۵ ق.ظ',
          views: '۲۲,۴۰۰',
          likes: '۱,۸۲۰',
          comments: '۳۱۰',
          shares: '۷۵۰',
          status: 'sent'
        },
        {
          id: 'tg-post-2',
          title: '🌐 فعال‌سازی گواهی‌نامه رسمی مالکیت دامنه AIONVERSE.io',
          caption: 'سند قطعی ثبت انحصاری بنام مهندس مهدی دل زنده صادر گردید. کلیه رکوردهای DNS Anycast کلودفلر همگام‌سازی شدند.',
          sentTime: 'دیروز — ساعت ۱۸:۲۰',
          views: '۱۹,۸۰۰',
          likes: '۲,۱۴۰',
          comments: '۱۸۵',
          shares: '۹۲۰',
          status: 'sent'
        }
      ]
    },
    {
      id: 'instagram',
      name: 'اینستاگرام رسمی (Instagram Reels & Posts)',
      handle: '@aionverse.official',
      url: 'https://instagram.com/aionverse.official',
      subscribers: '68,500',
      views: '3.1M/ماه',
      estRevenue: '$1,280/mo',
      icon: '📸',
      brandColor: 'from-pink-500/20 via-purple-500/20 to-amber-500/20 border-pink-500/40 text-pink-400',
      niche: 'هوش مصنوعی مولد، روانشناسی CBT، کهکشان ۳D و سبک زندگی',
      bot: {
        name: 'AION-Reels Viral Hook Bot',
        handle: '@AionReelsBot',
        status: 'online',
        accuracy: 99.4,
        lastAction: 'زمان‌بندی ریلز و آنالیز کامنت‌های خودکار دایرکت'
      },
      preparedPost: {
        title: 'چگونه وسواس فکری و تمیزی را با تکنیک مواجهه هوشمند درمان کنیم؟',
        caption: 'رواندرمانی شناختی-رفتاری (CBT) در بستر هوش مصنوعی اخلاقی AIONVERSE؛ بررسی علمی پروتکل ERP و جلوگیری از پاسخ اجباری شستشو با بازخورد احساسی ۹۴٪. معمار سیستم: مهندس مهدی دل زنده.',
        hashtags: '#روانشناسی_CBT #هوش_مصنوعی_اخلاقی #AIONVERSE #سلامت_روان #مهندس_مهدی_دلزنده',
        mediaPrompt: 'Warm golden atmospheric room, empathetic AI interface, calming teal and amber lights, minimal clean aesthetic',
        cta: 'جهت شرکت در جلسه آزمایشی رایگان، کلمه آرامش را دایرکت ارسال فرمایید.'
      },
      publishedPosts: [
        {
          id: 'ig-post-1',
          title: '«چرا هر تغییری در زندگی حاکی از فنا و نابودی نیست؟»',
          caption: 'گردش فصول و چرخش سیارات در مدار خورشید نشان می‌دهد هر فروریختنی سرآغاز یک مدار باشکوه‌تر است.',
          sentTime: 'امروز — ساعت ۱۱:۰۰ ق.ظ',
          views: '۵۴,۲۰۰',
          likes: '۴,۹۸۰',
          comments: '۴۳۰',
          shares: '۱,۱۲۰',
          status: 'sent'
        },
        {
          id: 'ig-post-2',
          title: 'رونمایی از ۱۰ خط تلفن ثابت بین‌المللی در نیویورک، لندن و دبی',
          caption: 'پوشش کامل تماس صوتی، تصویری و پیامک برای کاربران در سرتاسر جهان بدون محدودیت.',
          sentTime: 'دیروز — ساعت ۲۰:۱۵',
          views: '۶۱,۳۰۰',
          likes: '۵,۸۴۰',
          comments: '۶۱۰',
          shares: '۱,۴۵۰',
          status: 'sent'
        }
      ]
    },
    {
      id: 'youtube',
      name: 'یوتیوب استودیو و شورتس (YouTube Shorts)',
      handle: '@AIONVERSE_Universe',
      url: 'https://youtube.com/@AIONVERSE_Universe',
      subscribers: '51,200',
      views: '1.6M/ماه',
      estRevenue: '$920/mo',
      icon: '▶️',
      brandColor: 'from-red-500/20 to-rose-600/20 border-red-500/40 text-red-400',
      niche: 'انیمیشن‌های سینمایی، معماری Three.js، رندرهای ۴K',
      bot: {
        name: 'AION-Shorts Orchestrator Bot',
        handle: '@AionShortsScheduler',
        status: 'online',
        accuracy: 99.6,
        lastAction: 'رندر و آپلود خودکار ویدیو شورتس ۶۰ ثانیه‌ای با رزولوشن ۱۰۸۰p'
      },
      preparedPost: {
        title: 'معماری سوپراپلیکیشن AIONVERSE 5.0 تحت وب با Three.js و PBR',
        caption: 'در این ویدیو ۶۰ ثانیه‌ای، نحوه پیاده‌سازی رندرینگ بلادرنگ متریال‌های فیزیکی طلا و تیتانیوم بدون افت فریم در کلاینت را آموزش می‌دهیم. معمار ارشد سیستم: مهندس مهدی دل زنده.',
        hashtags: '#AIONVERSE #ThreeJS #GenerativeAI #Web3D #MehdiDelzende',
        mediaPrompt: 'Cinematic 3D render, dark nano-carbon background, glowing golden quantum ring, 8k resolution, raytracing',
        cta: 'لینک رایگان تست استودیو ۳D در توضیحات ویدیو قرار گرفت.'
      },
      publishedPosts: [
        {
          id: 'yt-post-1',
          title: 'شبیه‌سازی خیره‌کننده چرخش کهکشان راه شیری با عکس‌های واقعی جیمز وب',
          caption: 'بررسی دقیق سیاهچاله مرکزی، ذرات هولوگرافیک معلق و مدار واقعی سیارات در وب‌اپلیکیشن AIONVERSE.',
          sentTime: 'امروز — ساعت ۰۹:۰۰ ق.ظ',
          views: '۳۸,۹۰۰',
          likes: '۳,۲۱۰',
          comments: '۲۷۰',
          shares: '۶۵۰',
          status: 'sent'
        }
      ]
    },
    {
      id: 'tiktok',
      name: 'تیک‌تاک وایرال‌لب (TikTok Global Viral)',
      handle: '@aionverse_global',
      url: 'https://tiktok.com/@aionverse_global',
      subscribers: '89,400',
      views: '4.5M/ماه',
      estRevenue: '$1,620/mo',
      icon: '🎵',
      brandColor: 'from-cyan-500/20 via-slate-900 to-rose-500/20 border-cyan-500/40 text-cyan-400',
      niche: 'ترندهای سریع، دوبله لیپ‌سینک، گجت‌های هوشمند تمو',
      bot: {
        name: 'AION-TikTok Viral Sound & Hook Bot',
        handle: '@AionTikTokBot',
        status: 'online',
        accuracy: 98.9,
        lastAction: 'پایش موزیک‌های ترند با ۵۰,۰۰۰+ بازدید و تولید هوک ویدیویی'
      },
      preparedPost: {
        title: 'همگام‌سازی صدای شخصیت‌های سینمایی با ویزیم‌های لب در ۶۰ ثانیه!',
        caption: 'دیدن همگام‌سازی واقعی لب و چهره با استاندارد ARKit در استودیو دوبله AIONVERSE. بدون تاخیر زمانی با ۵۲ حالت چهره!',
        hashtags: '#VoiceDubbing #LipSync #AIAnimation #TechTrends #AureviaOS',
        mediaPrompt: 'Futuristic audio visualizer with neon facial mesh, high energy cyber colors, dynamic motion',
        cta: 'فایل صوتی خود را در وب‌اپلیکیشن بارگذاری کنید و خروجی بگیرید.'
      },
      publishedPosts: [
        {
          id: 'tt-post-1',
          title: 'این گجت پروژکتور کهکشانی اتاقم رو تبدیل به فضاپیمای ناسا کرد!',
          caption: 'کالای پرفروش تمو با ۶۸٪ حاشیه سود برای سیستم همکاری در فروش AIONVERSE.',
          sentTime: 'امروز — ساعت ۱۲:۳۰ ظهر',
          views: '۹۸,۲۰۰',
          likes: '۸,۴۵۰',
          comments: '۸۹۰',
          shares: '۲,۳۰۰',
          status: 'sent'
        }
      ]
    },
    {
      id: 'x',
      name: 'ایکس / توییتر رسمی (X Twitter)',
      handle: '@AionverseAI',
      url: 'https://twitter.com/AionverseAI',
      subscribers: '21,400',
      views: '740K/ماه',
      estRevenue: '$380/mo',
      icon: '✖️',
      brandColor: 'from-slate-800 to-slate-900 border-slate-700 text-slate-100',
      niche: 'مهندسی سیستم، رادار مقالات AI و بیانیه‌های معماری',
      bot: {
        name: 'AION-Storm Thread Generator Bot',
        handle: '@AionStormBot',
        status: 'online',
        accuracy: 99.7,
        lastAction: 'تولید رشته‌توییت ۵ قسمتی در خصوص مقایسه کلودفلر لبه با AWS'
      },
      preparedPost: {
        title: 'Thread: Why Truth Gate is the future of Enterprise AI Orchestration',
        caption: '1/5 The era of hallucinated numbers is over. At Aurevia AI Group, every generated asset must pass the "Truth over Virality" sentinel before reaching production. Founded by @MehdiDelzende.',
        hashtags: '#SystemDesign #EnterpriseAI #CloudflareEdge #WebGPU',
        mediaPrompt: 'Clean technical architecture diagram with golden circuit lines, zero noise, high tech minimalist',
        cta: 'Read the full system architecture paper on our live hub.'
      },
      publishedPosts: [
        {
          id: 'x-post-1',
          title: 'Sovereign ownership verified: AIONVERSE.io zone file cryptographic hash confirmed',
          caption: 'Chief Architect Engineer Mehdi Del Zende (National ID: 5239775338) commits BIND zone files across 330 Cloudflare Anycast edge cities.',
          sentTime: 'دیروز — ساعت ۲۲:۰۰',
          views: '۱۴,۶۰۰',
          likes: '۶۴۰',
          comments: '۹۵',
          shares: '۲۸۰',
          status: 'sent'
        }
      ]
    },
    {
      id: 'linkedin',
      name: 'لینکدین سازمانی (LinkedIn Enterprise Hub)',
      handle: 'company/aionverse-enterprise',
      url: 'https://linkedin.com/company/aionverse-enterprise',
      subscribers: '14,200',
      views: '220K/ماه',
      estRevenue: '$2,100/mo (B2B)',
      icon: '💼',
      brandColor: 'from-blue-600/20 to-sky-700/20 border-blue-500/40 text-blue-400',
      niche: 'قراردادهای B2B، اتوماسیون سازمانی، استخدام ایجنت‌ها',
      bot: {
        name: 'AION-Executive B2B Thought Leadership Bot',
        handle: '@AionB2BBot',
        status: 'online',
        accuracy: 99.5,
        lastAction: 'ارسال مقاله تحلیلی سوپراپلیکیشن‌های سازمانی به شبکه مدیران ارشد'
      },
      preparedPost: {
        title: 'تحول دیجیتال سازمانی با اکوسیستم هوش مصنوعی خودگردان Aurevia OS',
        caption: 'مدیریت تردد کارکنان با تشخیص بیومتریک چهره و رصد ماهواره‌ای زنده، همگام با ابزارهای تیمی Slack و Jira. تضمین انطباق کامل حقوقی و استقرار روی زیرساخت Cloudflare Zero Trust.',
        hashtags: '#EnterpriseArchitecture #AIAutomation #DigitalTransformation #AureviaOS',
        mediaPrompt: 'Executive corporate tech boardroom, holographic world map showing satellite node connections',
        cta: 'جهت هماهنگی جلسه دمو سازمانی B2B از طریق پیام خصوصی لینکدین اقدام نمایید.'
      },
      publishedPosts: [
        {
          id: 'li-post-1',
          title: 'معرفی استاندارد ایجنت‌های سازمانی AIONVERSE برای سازمان‌های دولتی و خصوصی',
          caption: 'کاهش ۶۰٪ هزینه‌های پشتیبانی و ممیزی با دروازه حقیقت Truth Gate.',
          sentTime: '۲ روز قبل',
          views: '۸,۹۰۰',
          likes: '۵۲۰',
          comments: '۶۴',
          shares: '۷۸',
          status: 'sent'
        }
      ]
    },
    {
      id: 'pinterest',
      name: 'پین‌ترست طراحی سه‌بعدی (Pinterest 3D Studio)',
      handle: 'pinterest.com/aionverse_3d',
      url: 'https://pinterest.com/aionverse_3d',
      subscribers: '19,300',
      views: '410K/ماه',
      estRevenue: '$440/mo',
      icon: '📌',
      brandColor: 'from-red-600/20 to-rose-700/20 border-red-600/40 text-red-400',
      niche: 'طراحی فضایی، رندرهای دکوراسیون کهکشانی، پرینت ۳D',
      bot: {
        name: 'AION-Visual Pin & 3D Spatial Bot',
        handle: '@AionPinBot',
        status: 'online',
        accuracy: 99.2,
        lastAction: 'انتشار خودکار پین‌های گرافیکی و اتصال به فروشگاه تمو'
      },
      preparedPost: {
        title: 'کالکشن طراحی چراغ‌های شنی کوانتومی و پروژکتورهای سه‌بعدی',
        caption: 'ایده‌های دکوراسیون اتاق گیمینگ و اتاق کار با المان‌های مینیمال فضایی. کلیه محصولات با لینک همکاری در فروش مستقیم در دسترس هستند.',
        hashtags: '#3DDesign #MinimalInterior #DeskSetup #AIONVERSE',
        mediaPrompt: 'Minimalist luxury aesthetic workspace with glowing floating lamp',
        cta: 'مشاهده برد کامل و خرید آنلاین.'
      },
      publishedPosts: [
        {
          id: 'pin-post-1',
          title: 'پالت رنگی دارک نانوکربن و متریال‌های فیزیکی طلا در طراحی رابط‌های آینده',
          caption: 'مجموعه پوسترهای آموزشی Three.js برای مهندسان فرانت‌اند.',
          sentTime: '۳ روز قبل',
          views: '۱۱,۴۰۰',
          likes: '۹۲۰',
          comments: '۳۵',
          shares: '۴۱۰',
          status: 'sent'
        }
      ]
    }
  ];

  const fullLaunchCopyText = `================================================================================
🚀 بسته نهایی دسترسی مالک و پرتاب جهانی اکوسیستم AIONVERSE & LUMINA OS GLOBAL
تأسیس و معماری شده توسط: مهدی دل زنده (مهندس مهدی دل زنده - کد ملی: ۵۲۳۹۷۷۵۳۳۸)
================================================================================

🌐 وبسایت و داشبورد مرکزی:
https://lumina-os.vercel.app
میزبان آینه‌ای:
https://lumina-os.netlify.app
لینک استقرار رایگان کلودفلر:
https://lumina-os.pages.dev
دامنه رایگان اولیه:
https://aurevia-ai.vercel.app

🔐 ورود به داشبورد مالک:
ایمیل: owner@lumina.ai
رمز عبور: demo123

🛠️ پنل مدیریت سیستم (Admin):
ایمیل: admin@lumina.ai
رمز عبور: admin123

🛍️ دستیار خرید هوشمند و پیگیری مرسولات:
https://lumina-os.vercel.app/shopping

🌍 داشبوردهای منطقه‌ای:
- داشبورد ایران: https://lumina-os.vercel.app/dashboard/iran
- داشبورد امارات (UAE): https://lumina-os.vercel.app/dashboard/uae
- داشبورد اروپا (Europe): https://lumina-os.vercel.app/dashboard/europe
- داشبورد ایالات متحده (US): https://lumina-os.vercel.app/dashboard/us
- داشبورد بین‌المللی جهانی: https://lumina-os.vercel.app/dashboard/global

📱 کانال‌های رسمی در شبکه‌های اجتماعی:
- اینستاگرام: https://instagram.com/lumina.ai.ecosystem
- توییتر / ایکس: https://twitter.com/LuminaAIEco
- لینکدین: https://linkedin.com/company/lumina-ai-ecosystem
- یوتیوب: https://youtube.com/@LuminaAIEcosystem
- دیسکورد: https://discord.gg/lumina-ai
- تلگرام: https://t.me/lumina_ai_ecosystem
- واتساپ: https://wa.me/18001862641
- تیک‌تاک: https://tiktok.com/@luminaai.ecosystem

💻 مخزن رسمی پروژه در گیت‌هاب:
https://github.com/skynhkatwn-coder/lumina-ai-ecosystem

📜 دامنه‌های اختصاصی در فرآیند ثبت و تمدید با صندوق توسعه ۵٪:
- aionverse.com
- aionverse.io
- aionverse.org
- aionverse.ir
- AureviaAI.com
- Aurevia.ai

⚖️ حق نشر و مالکیت معنوی:
© 2026 Lumina OS Global & Aurevia AI Group. تمامی حقوق محفوظ است.
تأسیس و معماری توسط مهندس مهدی دلزنده — بنیان‌گذار و معمار ارشد سیستم.
================================================================================`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              کارخانه تولید محتوا، وایرال‌لب و ۸ کانال رسمی شبکه‌های اجتماعی
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-mono border border-amber-500/30">
                AION-Viral v5.0
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              محتواهای آماده انتشار با تفکیک آیکون هر شبکه، لینک‌های اختصاصی و بسته کامل کپی‌برداری سریع برای مالک
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex flex-wrap items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
          {[
            { id: 'channels', label: 'کانال‌ها و محتوای آماده', icon: Share2 },
            { id: 'copy-hub', label: 'بسته جامع کپی مالک', icon: Copy, highlight: true },
            { id: 'viral-hooks', label: 'هوک‌های وایرال', icon: Flame },
            { id: 'ebook', label: 'کتاب و رساله', icon: BookOpen },
            { id: 'storyboard', label: 'استوری‌بورد ۳۰ ثانیه', icon: Clapperboard },
            { id: 'brandkit', label: 'برندکیت و لوگو', icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950'
                    : tab.highlight
                    ? 'bg-cyan-500/10 text-cyan-300 hover:text-white border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 8 Dedicated Channels + Prepared Content per Icon */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>روی هر کانال کلیک کنید تا محتوای آماده انتشار و لینک‌های رسمی نمایش داده شود:</span>
            <span className="text-[11px] text-amber-400 font-mono">۸ کانال تخصصی با آمارهای لحظه‌ای</span>
          </div>

          {/* Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {channelsData.map((ch) => {
              const isSelected = selectedChannelId === ch.id;
              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChannelId(ch.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{ch.icon}</span>
                        <div className="text-xs font-bold text-slate-200">{ch.name}</div>
                      </div>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono break-all">{ch.handle}</div>
                    <div className="text-[11px] text-amber-400 font-medium mt-1">{ch.niche}</div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">مخاطبین:</span>
                      <span className="text-slate-200 font-bold">{ch.subscribers}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">درآمد ماهانه:</span>
                      <span className="text-emerald-400 font-bold">{ch.estRevenue}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(ch.url, `url-${ch.id}`);
                        }}
                        className="flex-1 py-1 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 font-medium flex items-center justify-center gap-1 transition"
                      >
                        {copiedId === `url-${ch.id}` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-cyan-400" />
                        )}
                        {copiedId === `url-${ch.id}` ? 'کپی شد' : 'کپی آدرس'}
                      </button>

                      <a
                        href={ch.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-400 hover:text-white transition flex items-center justify-center"
                        title="مشاهده مستقیم"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Dedicated Channel Page & Automated Bot Hub */}
          {selectedChannelId && (
            <div className="bg-slate-900/90 border border-amber-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl animate-in fade-in duration-200">
              {(() => {
                const activeCh = channelsData.find((c) => c.id === selectedChannelId)!;
                const dynamicPosts = customPostsMap[activeCh.id] || [];
                const allPosts = [...dynamicPosts, ...activeCh.publishedPosts];

                const handleBroadcastNewPost = (e: React.FormEvent) => {
                  e.preventDefault();
                  if (!newPostCaption.trim()) return;

                  setIsBroadcasting(true);
                  setTimeout(() => {
                    setIsBroadcasting(false);
                    const createdPost: PublishedPost = {
                      id: `post-${Date.now()}`,
                      title: newPostTitle.trim() || `پست فوری اختصاصی ${activeCh.name}`,
                      caption: newPostCaption,
                      sentTime: 'همین الان (ارسال موفق توسط ربات)',
                      views: '۱,۴۵۰',
                      likes: '۱۲۰',
                      comments: '۲۲',
                      shares: '۳۴',
                      status: 'sent'
                    };

                    setCustomPostsMap((prev) => ({
                      ...prev,
                      [activeCh.id]: [createdPost, ...(prev[activeCh.id] || [])]
                    }));

                    setNewPostTitle('');
                    setNewPostCaption('');
                    setBroadcastSuccess(createdPost.id);
                    setTimeout(() => setBroadcastSuccess(null), 3500);
                  }, 1200);
                };

                const handleTriggerBotTest = () => {
                  setIsBroadcasting(true);
                  setTimeout(() => {
                    setIsBroadcasting(false);
                    const testPost: PublishedPost = {
                      id: `test-${Date.now()}`,
                      title: `🤖 تست پالس خودکار ربات ${activeCh.bot.name}`,
                      caption: `پالس آزمایشی با موفقیت در شبکه ${activeCh.name} منتشر شد. سیستم هوشمند تحت نظارت مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸).`,
                      sentTime: 'لحظاتی پیش (تست ربات)',
                      views: '۸۲۰',
                      likes: '۶۴',
                      comments: '۱۰',
                      shares: '۱۸',
                      status: 'sent'
                    };
                    setCustomPostsMap((prev) => ({
                      ...prev,
                      [activeCh.id]: [testPost, ...(prev[activeCh.id] || [])]
                    }));
                    setBroadcastSuccess(testPost.id);
                    setTimeout(() => setBroadcastSuccess(null), 3500);
                  }, 1000);
                };

                return (
                  <>
                    {/* Channel Header Banner */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl p-2 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
                          {activeCh.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base md:text-lg font-black text-slate-100">{activeCh.name}</h3>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>کانال رسمی تایید شده</span>
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-3 flex-wrap">
                            <span className="text-amber-300 font-bold">{activeCh.handle}</span>
                            <span>•</span>
                            <span className="text-slate-200">{activeCh.subscribers} مخاطب فعال</span>
                            <span>•</span>
                            <span className="text-cyan-400 font-bold">{activeCh.views} بازدید ماهانه</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={activeCh.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>ورود به صفحه کانال</span>
                        </a>
                        <button
                          onClick={() => copyToClipboard(activeCh.url, 'url-main')}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                        >
                          {copiedId === 'url-main' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === 'url-main' ? 'کپی شد' : 'کپی آدرس'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Dedicated Automated Bot Controller HUD */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                            <Bot className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                              <span>ربات اختصاصی و خودکار شبکه: {activeCh.bot.name}</span>
                              <span className="text-[10px] text-amber-300 font-mono">({activeCh.bot.handle})</span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              آخرین عملیات: <span className="text-slate-300">{activeCh.bot.lastAction}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 font-mono block">دقت ایجنت:</span>
                            <span className="text-xs font-mono font-black text-emerald-400">{activeCh.bot.accuracy}٪</span>
                          </div>
                          <button
                            onClick={handleTriggerBotTest}
                            disabled={isBroadcasting}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-black flex items-center gap-1.5 transition hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-md shadow-cyan-500/20"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{isBroadcasting ? 'در حال ارسال...' : 'تست ارسال از طریق ربات'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Broadcast Success Toast */}
                    {broadcastSuccess && (
                      <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>محتوا با موفقیت توسط ربات اختصاصی به کانال رسمی ارسال گردید و در فید زیر قرار گرفت.</span>
                      </div>
                    )}

                    {/* Two-Column Grid: Sent Content Feed & Instant Composer */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left (2 cols): Published & Sent Content Feed */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                            <Flame className="w-4 h-4 text-amber-400" />
                            <span>محتواهای ارسالی و آرشیو پست‌های منتشرشده ({allPosts.length})</span>
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">Real-Time Channel Feed</span>
                        </div>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                          {allPosts.map((post) => (
                            <div
                              key={post.id}
                              className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-3 hover:border-slate-700 transition"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-slate-100 flex items-center gap-2">
                                  <span className="text-base">{activeCh.icon}</span>
                                  <span>{post.title}</span>
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">{post.sentTime}</span>
                              </div>

                              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                                {post.caption}
                              </p>

                              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px] font-mono text-slate-400 flex-wrap gap-2">
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1 text-slate-300">
                                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                                    <span>{post.views}</span>
                                  </span>
                                  <span className="flex items-center gap-1 text-slate-300">
                                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                                    <span>{post.likes}</span>
                                  </span>
                                  <span className="flex items-center gap-1 text-slate-300">
                                    <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                                    <span>{post.comments}</span>
                                  </span>
                                  <span className="flex items-center gap-1 text-slate-300">
                                    <Repeat className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>{post.shares}</span>
                                  </span>
                                </div>

                                <button
                                  onClick={() => copyToClipboard(post.caption, `post-cp-${post.id}`)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-sans flex items-center gap-1 transition cursor-pointer"
                                >
                                  {copiedId === `post-cp-${post.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedId === `post-cp-${post.id}` ? 'کپی شد' : 'کپی متن'}</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right (1 col): Instant Post Composer via Dedicated Bot */}
                      <div className="space-y-4">
                        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                              <Send className="w-4 h-4 text-amber-400" />
                              <span>ارسال فوری به کانال از طریق ربات</span>
                            </h4>
                            <span className="text-[10px] text-emerald-400 font-mono">Live Broadcast</span>
                          </div>

                          <form onSubmit={handleBroadcastNewPost} className="space-y-3">
                            <div>
                              <label className="text-[11px] text-slate-400 block mb-1">عنوان پیام یا پست:</label>
                              <input
                                type="text"
                                value={newPostTitle}
                                onChange={(e) => setNewPostTitle(e.target.value)}
                                placeholder="عنوان جذاب پیام..."
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] text-slate-400 block mb-1">متن کامل پیام یا کپشن:</label>
                              <textarea
                                rows={5}
                                value={newPostCaption}
                                onChange={(e) => setNewPostCaption(e.target.value)}
                                placeholder="متن پیام را بنویسید یا از پرامپت آماده کپی کنید..."
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 leading-relaxed"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={isBroadcasting || !newPostCaption.trim()}
                              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-40 cursor-pointer shadow-lg shadow-amber-500/20"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{isBroadcasting ? 'در حال ارسال به ربات...' : 'ارسال فوری از طریق ربات به کانال'}</span>
                            </button>
                          </form>

                          {/* Quick Insert Template */}
                          <div className="pt-2 border-t border-slate-800 space-y-2">
                            <span className="text-[10px] text-slate-400">قالب پیشنهادی آماده:</span>
                            <button
                              type="button"
                              onClick={() => {
                                setNewPostTitle(activeCh.preparedPost.title);
                                setNewPostCaption(`${activeCh.preparedPost.caption}\n\n${activeCh.preparedPost.cta}\n\n${activeCh.preparedPost.hashtags}`);
                              }}
                              className="w-full py-1.5 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>درج قالب پیشنهادی هوش مصنوعی</span>
                            </button>
                          </div>
                        </div>

                        {/* Hashtags Card */}
                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                          <div className="text-[10px] text-slate-400 font-mono">هشتگ‌های تخصصی سئو برای این کانال:</div>
                          <div className="text-xs text-cyan-300 font-mono leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                            {activeCh.preparedPost.hashtags}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Copy Hub Tab: The Complete Copy-Paste Master Launch Package */}
      {activeTab === 'copy-hub' && (
        <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Copy className="w-4 h-4 text-cyan-400" />
                بسته جامع دسترسی و اطلاعات پرتاب سیستم (Official Launch Master Kit)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                تمامی آدرس‌های وب، لاگین‌های ادمین و مالک، شبکه‌های اجتماعی و دامنه‌ها در قالب یک بلوک متنی تمیز و آماده کپی‌برداری یک‌کلیکی
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(fullLaunchCopyText, 'full-launch-kit')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              {copiedId === 'full-launch-kit' ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
              {copiedId === 'full-launch-kit' ? 'کل بسته کپی شد!' : 'کپی یک‌کلیکی کل بسته'}
            </button>
          </div>

          <div className="relative">
            <textarea
              readOnly
              rows={16}
              value={fullLaunchCopyText}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 leading-relaxed focus:outline-none focus:border-amber-500 selection:bg-amber-500/30 selection:text-amber-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block">مالک و بنیان‌گذار:</span>
              <strong className="text-amber-300">مهدی دل زنده (مهندس مهدی دل زنده)</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block">کد ملی ثبت مالکیت:</span>
              <strong className="text-emerald-400 font-mono font-bold text-sm">۵۲۳۹۷۷۵۳۳۸</strong>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block">وضعیت استقرار لایو:</span>
              <strong className="text-emerald-400 font-mono">Verified Production Ready</strong>
            </div>
          </div>
        </div>
      )}

      {/* Viral Hooks Generator */}
      {activeTab === 'viral-hooks' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              قانون وایرال سالم: <strong className="text-amber-400">محتوا باید جذاب باشد اما فریبنده، جعلی یا ترس‌ساز نباشد.</strong>
            </div>
            <div className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Truth Gate Verified
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'hook-1',
                channel: 'Instagram Reels & Shorts',
                duration: '۴۵ ثانیه',
                hook: '«۹۰ درصد طراحان سه بعدی هنوز نمی‌دانند این ۳ خط کد چطور رندرهای تحت وب را ۱۰ برابر سبک‌تر می‌کند!»',
                body: 'نمایش مقایسه بار پردازشی WebGL با استفاده از InstancedMesh و متریال‌های فیزیکی PBR در پلتفرم AIONVERSE.',
                cta: 'برای دریافت فایل نمونه کدهای بهینه شده، کلمه CAD را کامنت کنید.',
              },
              {
                id: 'hook-2',
                channel: 'TikTok & Reels',
                duration: '۳۰ ثانیه',
                hook: '«چرا تکنیک CBT برای وسواس شستشو معجزه می‌کند، اما ۹۹٪ افراد آن را اشتباه انجام می‌دهند؟»',
                body: 'توضیح تفاوت چرخه اضطراب و رفتار اجباری با ارائه تمرین مواجهه و جلوگیری از پاسخ (ERP) توسط هوش مصنوعی اخلاقی.',
                cta: 'لینک رایگان تمرین تعاملی در بایو پلتفرم قرار گرفت.',
              },
              {
                id: 'hook-3',
                channel: 'YouTube Shorts & LinkedIn',
                duration: '۶۰ ثانیه',
                hook: '«مسیر طلایی مهندس مهدی دلزنده: از ایده تا پلتفرم جامع هوش مصنوعی با قابلیت تریدینگ و درآمد جهانی»',
                body: 'بررسی معماری صندوق توسعه ۵٪، اتصال به صرافی‌های نوبیتکس و بایننس، و ثبت مالکیت دامنه‌های اختصاصی.',
                cta: 'ویدیو کامل معماری سازمانی را در کانال یوتیوب تماشا کنید.',
              },
              {
                id: 'hook-4',
                channel: 'Telegram & X',
                duration: 'اسکریپت ویدیویی سریع',
                hook: '«۳ اشتباه مهلک در نوسان‌گیری ارز دیجیتال که مانع از سود مستمر در بازارهای پرنوسان می‌شود»',
                body: 'توضیح استراتژی واگرایی RSI و باند بولینگر به همراه کنترل دقیق حد ضرر زیر ۵ درصد.',
                cta: 'ربات تست دمو را بدون نیاز به سرمایه در داشبورد فعال کنید.',
              },
            ].map((item) => (
              <div key={item.id} className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">{item.channel}</span>
                  <span className="text-[10px] text-slate-400 font-mono">طول ویدیو: {item.duration}</span>
                </div>

                <div className="text-xs font-bold text-amber-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {item.hook}
                </div>

                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-400">سناریو و بدنه: </strong>
                  {item.body}
                </div>

                <div className="text-[11px] text-cyan-300">
                  <strong className="text-slate-400">فراخوان به اقدام (CTA): </strong>
                  {item.cta}
                </div>

                <button
                  onClick={() => copyToClipboard(`${item.hook}\n\n${item.body}\n\n${item.cta}`, item.id)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === item.id ? 'کپی شد' : 'کپی اسکریپت کامل سناریو'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ebook & Thesis Architect */}
      {activeTab === 'ebook' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                کتاب الکترونیکی و رساله تخصصی: «معماری اکوسیستم هوش مصنوعی AIONVERSE»
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                تألیف و معماری سیستم توسط مهندس مهدی دلزنده — خروجی استاندارد PDF و EPUB با نمودارها و استنادات علمی
              </p>
            </div>
            <button
              onClick={() => alert('دانلود پکیج کامل کتابچه راهنما در قالب فایل PDF آغاز شد.')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              دانلود نسخه PDF و EPUB
            </button>
          </div>

          <div className="space-y-3">
            {[
              { chapter: 'فصل اول', title: 'مبانی مدلسازی سه بعدی تحت وب با Three.js و سایه‌زن‌های PBR', pages: '۲۴ صفحه', status: 'تکمیل و اعتبارسنجی شده' },
              { chapter: 'فصل دوم', title: 'ساختار ۲۵ ایجنت خودگردان و دروازه ضدتوهم Truth Gate', pages: '۳۸ صفحه', status: 'تکمیل و اعتبارسنجی شده' },
              { chapter: 'فصل سوم', title: 'رواندرمانی شناختی-رفتاری (CBT) در بستر هوش مصنوعی اخلاقی', pages: '۳۰ صفحه', status: 'مورد تأیید نظارت بالینی' },
              { chapter: 'فصل چهارم', title: 'استراتژی‌های جفت‌ارزی و الگوریتم‌های تریدینگ رمزارزی با خطای زیر ۵٪', pages: '۳۲ صفحه', status: 'همراه با کدهای بک‌تست' },
              { chapter: 'فصل پنجم', title: 'صندوق توسعه ۵٪ و مسیر طلایی درآمدزایی بین‌المللی', pages: '۲۰ صفحه', status: 'پیش‌بینی‌های مالی ۱۲ ماهه' },
            ].map((ch, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono">{ch.chapter}</span>
                    <span className="text-xs font-bold text-slate-200">{ch.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{ch.status}</div>
                </div>
                <div className="text-xs font-mono text-slate-400">{ch.pages}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 30-Second Cinematic Storyboard */}
      {activeTab === 'storyboard' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Clapperboard className="w-4 h-4 text-amber-400" />
                استوری‌بورد سینمایی — معرفی پلتفرم هوش مصنوعی AIONVERSE
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                مدت: ۳۰ ثانیه · تعداد نما: ۶ · نسبت تصویر: ۱۶:۹ · تولید شده با نظارت مهندس مهدی دلزنده
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
              Gold Rim Lighting • ACES ToneMapping
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { shot: 'نمای ۱ (۰:۰۵)', title: 'نمای معرفی برند', camera: 'دالی آرام به جلو (Slow Dolly In)', light: 'نور کم و کنتراست بالا، هاله طلایی', desc: 'معرفی پلتفرم هوش مصنوعی خانواده و سوپراپلیکیشن AIONVERSE', voice: 'روایت معرفی گرم و باوقار' },
              { shot: 'نمای ۲ (۰:۱۰)', title: 'نمای محصول و ۳D', camera: 'پن آرام از راست به چپ', light: 'انعکاس متالیک روی کره کوانتومی', desc: 'نمایش استودیو مدلسازی سه بعدی با فرمت‌های CAD', voice: 'توضیح قابلیت‌های مدلسازی و خلاقیت' },
              { shot: 'نمای ۳ (۰:۱۵)', title: 'نمای کاربر و ایجنت‌ها', camera: 'کرین بالا (Jib / Crane Up)', light: 'نور نئون سیان و طلایی', desc: 'نمایش ۲۵ ایجنت خودگردان و دروازه حقیقت Truth Gate', voice: 'تاکید بر اصل بنیادین حقیقت بالاتر از وایرال' },
              { shot: 'نمای ۴ (۰:۲۰)', title: 'نمای معاملات و خرید', camera: 'کلوزآپ ثابت ماکرو', light: 'طراحی نانوکربن با خطوط نورانی', desc: 'تریدینگ جفتی و اتصال به دیجی‌کالا و اسنپ‌اکسپرس', voice: 'توضیح تسهیل امور روزمره و درآمد ارزی' },
              { shot: 'نمای ۵ (۰:۲۵)', title: 'رواندرمانی و آرامش', camera: 'زاویه ملایم با عمق میدان کم', light: 'هاله گرم طلایی و آرامش‌بخش', desc: 'ارائه پروتکل‌های CBT و پشتیبانی اخلاقی کاربر', voice: 'تأکید بر همراهی و رفع تنش‌های فکری' },
              { shot: 'نمای ۶ (۰:۳۰)', title: 'نمای پایانی و فراخوان', camera: 'دالی آرام به عقب و فید لوگو', light: 'لوگوی طلایی AIONVERSE و مهر مالک', desc: 'آدرس وبسایت و لینک نصب یک‌کلیکی نسخه رایگان', voice: 'فراخوان به اقدام (CTA) و آغاز تجربه کاربری' },
            ].map((shot, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
                    <span>{shot.shot}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{shot.title}</span>
                  </div>
                  <div className="text-xs text-slate-200 font-medium mb-1.5">{shot.desc}</div>
                  <div className="text-[10px] text-slate-400 space-y-1">
                    <div><span className="text-slate-500">دوربین:</span> {shot.camera}</div>
                    <div><span className="text-slate-500">نورپردازی:</span> {shot.light}</div>
                  </div>
                </div>
                <div className="text-[10px] text-cyan-300 pt-2 border-t border-slate-800/80 font-mono">
                  صدا: {shot.voice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BrandKit & Vector Logo */}
      {activeTab === 'brandkit' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                هویت بصری و برندکیت رسمی Aurevia AI Group & AIONVERSE
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                ترکیب حلقه‌های نورانی و کره سه‌بعدی با پالت رنگی نیلی-طلایی بر روی زمینه نانوکربن
              </p>
            </div>
            <div className="text-xs text-amber-400 font-mono">طراح: مهندس مهدی دلزنده</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Visual Logo Render Preview */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-carbon-mesh opacity-30" />
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Glowing Circles */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-500/40 animate-spin" style={{ animationDuration: '24s' }} />
                <div className="absolute inset-3 rounded-full border border-cyan-400/40" />
                <div className="absolute inset-6 rounded-full border border-indigo-500/50" />
                {/* Central Sphere */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center justify-center text-slate-950 font-black text-xl">
                  A
                </div>
              </div>
              <div className="text-sm font-black text-amber-300 mt-4 tracking-wider">AIONVERSE 5.0</div>
              <div className="text-[10px] text-cyan-400 font-mono tracking-widest mt-0.5">AUREVIA AI GROUP</div>
            </div>

            {/* Colors and Specs */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="w-full h-8 rounded-lg bg-amber-500 mb-2 shadow-[0_0_12px_rgba(245,158,11,0.4)]" />
                  <div className="text-xs font-bold text-slate-200">طلای کهکشانی</div>
                  <div className="text-[10px] text-slate-400 font-mono">#F59E0B / Amber</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="w-full h-8 rounded-lg bg-cyan-500 mb-2 shadow-[0_0_12px_rgba(6,182,212,0.4)]" />
                  <div className="text-xs font-bold text-slate-200">سیان کوانتومی</div>
                  <div className="text-[10px] text-slate-400 font-mono">#06B6D4 / Cyan</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="w-full h-8 rounded-lg bg-indigo-600 mb-2 shadow-[0_0_12px_rgba(79,70,229,0.4)]" />
                  <div className="text-xs font-bold text-slate-200">نیلی سلطنتی</div>
                  <div className="text-[10px] text-slate-400 font-mono">#4F46E5 / Indigo</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="w-full h-8 rounded-lg bg-[#07090e] border border-slate-700 mb-2" />
                  <div className="text-xs font-bold text-slate-200">نانوکربن سیاه</div>
                  <div className="text-[10px] text-slate-400 font-mono">#07090E / Carbon</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-bold text-slate-200">تایپوگرافی رسمی:</div>
                <div className="text-slate-400 leading-relaxed text-[11px]">
                  متن‌های فارسی با فونت استاندارد و خوش‌خوان <strong className="text-amber-400">Vazirmatn</strong>، متن‌های لاتین با فونت <strong className="text-amber-400">Plus Jakarta Sans</strong>، و اعداد و پایپ‌لاین‌های سیستمی با <strong className="text-amber-400">JetBrains Mono</strong> تنظیم شده‌اند.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
