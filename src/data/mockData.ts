import { AgentInfo, EmployeeStatus, FinancialEntry, ShoppingOrder, TradingPair, TruthInspection, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'user-delzende-01',
  name: 'مهدی دل زنده (مهندس مهدی دل زنده)',
  title: 'بنیان‌گذار و معمار ارشد اکوسیستم AIONVERSE & Aurevia OS',
  email: 'owner@aurevia.ai',
  personalEmail: 'mehdidlzndh@gmail.com',
  phone: '+9809910966022',
  role: 'owner',
  nationalId: '۵۲۳۹۷۷۵۳۳۸',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  organization: 'Aurevia AI Group International'
};

export const INITIAL_AGENTS: AgentInfo[] = [
  {
    id: 'agent-01',
    number: 1,
    name: 'Chief Orchestrator Agent',
    nameFa: 'سرپرست کل و هماهنگ‌کننده ایجنت‌ها',
    category: 'core',
    role: 'Master pipeline manager, dependency resolver & cross-module dispatcher',
    roleFa: 'مدیریت جریان اصلی سیستم، تقسیم وظایف بین ایجنت‌ها و نظارت بر سلامت کل',
    status: 'running',
    accuracy: 99.4,
    lastAction: 'Dispatched viral asset queue to Truth Gate',
  },
  {
    id: 'agent-02',
    number: 2,
    name: 'Research Intelligence Agent',
    nameFa: 'ایجنت پژوهش هوشمند و کاوشگر ترندها',
    category: 'core',
    role: 'Global trend scanner, deep search & verified opportunity discovery',
    roleFa: 'پایش مستمر ترندهای بازارهای بین‌المللی و کشف فرصت‌های پردرآمد نوظهور',
    status: 'running',
    accuracy: 98.2,
    lastAction: 'Analyzed top 12 trending CAD & 3D Web assets on Gumroad/Turbosquid',
  },
  {
    id: 'agent-03',
    number: 3,
    name: 'Expert Engineering Analyst',
    nameFa: 'تحلیل‌گر تخصصی معماری و مهندسی',
    category: 'engineering',
    role: 'Architecture auditor, code optimizer & high-fidelity 3D pipeline solver',
    roleFa: 'خطایابی کدهای محاسباتی، شبیه‌سازی هندسه ۳بعدی و بهینه‌سازی بار پردازشی',
    status: 'idle',
    accuracy: 99.8,
    lastAction: 'Audited WebGL BufferGeometry vertex normal calculations',
  },
  {
    id: 'agent-04',
    number: 4,
    name: 'Competitor Intelligence Agent',
    nameFa: 'ایجنت رصد و هوش رقابتی',
    category: 'core',
    role: 'Feature-matrix benchmark & market pricing differentiator',
    roleFa: 'مقایسه لحظه‌ای ویژگی‌های پلتفرم با ابزارهای رقیب جهانی و تنظیم قیمت‌گذاری',
    status: 'idle',
    accuracy: 96.5,
    lastAction: 'Benchmarked Blender Geometry Nodes vs Three.js runtime shaders',
  },
  {
    id: 'agent-05',
    number: 5,
    name: 'Truth Verification Agent',
    nameFa: 'ایجنت راستی‌آزمایی حقیقت و ضدتوهم',
    category: 'compliance',
    role: 'Fact-checking, hallucination detection, citation cross-validation',
    roleFa: 'تأیید قطعیت ارجاعات، غربالگری آمارهای جعلی و اجرای اصل "حقیقت برتر از وایرال"',
    status: 'running',
    accuracy: 99.9,
    lastAction: 'Validated 18 peer-reviewed CBT psychotherapy guidelines',
  },
  {
    id: 'agent-06',
    number: 6,
    name: 'Copyright & Legal Risk Agent',
    nameFa: 'ایجنت ممیزی حق نشر و ریسک حقوقی',
    category: 'compliance',
    role: 'License scanner, trademark conflicts & platform Terms of Service safety',
    roleFa: 'بررسی لایسنس مدل‌های سهبعدی، موسیقی و محتوا جهت رعایت قوانین بین‌المللی',
    status: 'idle',
    accuracy: 99.1,
    lastAction: 'Verified CC-BY and MIT conformance for exported mesh modules',
  },
  {
    id: 'agent-07',
    number: 7,
    name: 'Human Review Coordinator',
    nameFa: 'هماهنگ‌کننده بازبینی انسانی',
    category: 'compliance',
    role: 'Escalation router to Chief Engineer Mehdi Delzende & team reviewers',
    roleFa: 'ارسال هشدارهای پرریسک و تراکنش‌های بالای ۵۰ میلیون تومان به صف تایید مالک',
    status: 'running',
    accuracy: 100,
    lastAction: 'Pending 1 commercial contract sign-off for enterprise pilot',
  },
  {
    id: 'agent-08',
    number: 8,
    name: 'Ebook Architect Agent',
    nameFa: 'ایجنت معمار کتاب الکترونیکی و رساله',
    category: 'content',
    role: 'Curriculum layout, automated chapter styling, PDF/EPUB builder',
    roleFa: 'نگارش و ساختاردهی کتب تخصصی هوش مصنوعی و طراحی صنعتی با استناد معتبر',
    status: 'completed',
    accuracy: 97.4,
    lastAction: 'Generated Table of Contents for "Ultimate 3D Generative AI Handbook"',
  },
  {
    id: 'agent-09',
    number: 9,
    name: 'Viral Hook & Scenario Agent',
    nameFa: 'ایجنت سناریونویسی و هوک وایرال سالم',
    category: 'social',
    role: 'High-retention storytelling without deceptive clickbaits',
    roleFa: 'طراحی سناریوهای جذاب آموزشی ۶۰ ثانیه‌ای برای ریلز و یوتیوب شورتس',
    status: 'running',
    accuracy: 96.8,
    lastAction: 'Generated 5 educational hooks for 3D sculpting breakdown',
    channel: 'Instagram Reels & YouTube',
  },
  {
    id: 'agent-10',
    number: 10,
    name: 'Dubbing & Multilingual Subtitle Agent',
    nameFa: 'ایجنت دوبله صوتی و زیرنویس ۱۰۰ زبانه',
    category: 'content',
    role: 'Natural neural TTS tone matching, timestamped SRT generation',
    roleFa: 'دوبله خودکار ویدیوها به فارسی، انگلیسی، عربی، آلمانی و اسپانیایی',
    status: 'idle',
    accuracy: 98.7,
    lastAction: 'Synthesized voiceover track for 30s cinematic storyboard',
  },
  {
    id: 'agent-11',
    number: 11,
    name: 'Crypto Pair Trading Engine',
    nameFa: 'موتور تریدینگ جفتی و تحلیل تکنیکال',
    category: 'finance',
    role: 'Real-time RSI/MACD scanner, pair arbitrage & risk-managed entries',
    roleFa: 'رصد جفت‌ارزهای نوبیتکس و بایننس با ضریب خطای زیر ۵ درصد و حد ضرر پویا',
    status: 'running',
    accuracy: 95.8,
    lastAction: 'Detected RSI oversold (26.4) on PAXG/USDT hedge pair',
  },
  {
    id: 'agent-12',
    number: 12,
    name: 'Development Fund Agent',
    nameFa: 'ایجنت تخصیص صندوق توسعه و سرمایه‌گذاری',
    category: 'finance',
    role: '5% revenue deduction, budget allocation for domains, servers & team',
    roleFa: 'محاسبه سهم صندوق توسعه، تفکیک سود خالص و ارائه سناریوی خرید دامنه رسمی',
    status: 'idle',
    accuracy: 100,
    lastAction: 'Calculated 5% monthly reserve: 28,450,000 Tomans ready for allocation',
  },
  {
    id: 'agent-13',
    number: 13,
    name: 'DomainBrain & Trademark Agent',
    nameFa: 'مغز هوشمند دامنه و نشان تجاری',
    category: 'core',
    role: 'Domain valuation, DNS health checks, registration priority ranker',
    roleFa: 'پایش مالکیت دامنه‌های aionverse.com و AureviaAI.com به نام مهندس دلزنده',
    status: 'idle',
    accuracy: 99.0,
    lastAction: 'Appraised AureviaAI.com branding score: 94/100',
  },
  {
    id: 'agent-14',
    number: 14,
    name: 'System Guardian & Space Optimizer',
    nameFa: 'محافظ سیستم و پاکسازی هوشمند حافظه',
    category: 'engineering',
    role: 'Storage telemetry, junk/cache cleaner, cloud backup scheduler',
    roleFa: 'پایش سلامت سرورها، فشرده‌سازی خودکار و آزادسازی حافظه موقت',
    status: 'running',
    accuracy: 99.5,
    lastAction: 'Optimized WebGL mesh cache, freed 420MB local buffer space',
  },
  {
    id: 'agent-15',
    number: 15,
    name: 'API Key Doctor & Vault Sentinel',
    nameFa: 'پزشک کلیدهای API و سنتینل امنیتی',
    category: 'engineering',
    role: 'Format validator, masked preview manager, rotation advisor',
    roleFa: 'ممیزی امنیتی کلیدهای ورسل، سوپابیس و کلودفلر؛ جلوگیری از افشای کلید خام',
    status: 'running',
    accuracy: 100,
    lastAction: 'Verified Zero-Raw-Key policy across all frontend components',
  },
  {
    id: 'agent-16',
    number: 16,
    name: 'Telegram & Social Channel Bot',
    nameFa: 'ربات تعاملات تلگرام و کانال‌های تخصصی',
    category: 'social',
    role: '8-channel distribution, subscriber analytics, auto-broadcast',
    roleFa: 'مدیریت پاسخگویی تلگرام، آپارات و لینکدین با امضای دیجیتال معتبر',
    status: 'idle',
    accuracy: 97.2,
    lastAction: 'Queued weekly summary post for 14,200 tech community members',
    channel: 'Telegram @lumina_ai_ecosystem',
  },
  {
    id: 'agent-17',
    number: 17,
    name: 'CBT Psychotherapy Simulator',
    nameFa: 'موتور رواندرمانی شناختی-رفتاری CBT',
    category: 'core',
    role: 'Empathetic conversation, cognitive distortion reframing, stress tracker',
    roleFa: 'جلسات تعاملی کاهش وسواس فکری و اضطراب شغلی با تفکیک هوش مصنوعی اخلاقی',
    status: 'idle',
    accuracy: 96.1,
    lastAction: 'Logged 4 completed Thought Records with positive cognitive shifts',
  },
  {
    id: 'agent-18',
    number: 18,
    name: 'Smart Shopping & Digikala Broker',
    nameFa: 'کارگزار خرید هوشمند و اسنپ‌اکسپرس',
    category: 'finance',
    role: 'Price anomaly hunter, auto-checkout proxy, parcel tracking sync',
    roleFa: 'جستجوی بهترین گارانتی و ارزان‌ترین قیمت کالاهای مصرفی سازمانی',
    status: 'idle',
    accuracy: 98.0,
    lastAction: 'Tracked order #DK-88412 courier transit in northern Tehran zone',
  },
  {
    id: 'agent-19',
    number: 19,
    name: 'OmniCursor Screen AI Assistant',
    nameFa: 'موشواره شناور و پردازش تصویر صفحه',
    category: 'engineering',
    role: 'Active window OCR, instant summarizer, smart action recommender',
    roleFa: 'تحلیل بصری اسناد، استخراج جداول از تصاویر و ترجمه سریع با یک کلیک',
    status: 'running',
    accuracy: 97.9,
    lastAction: 'Ready on floating viewport dock (requires explicit user consent)',
  },
  {
    id: 'agent-20',
    number: 20,
    name: 'WorkPilot Enterprise Minutes & Email',
    nameFa: 'دستیار اداری و صورت‌جلسه ورک‌پایلوت',
    category: 'core',
    role: 'Meeting transcripts to action items, formal Persian email drafter',
    roleFa: 'تهیه پیش‌نویس مکاتبات اداری و صورت‌جلسات هیئت‌مدیره با تأیید نهایی کاربر',
    status: 'idle',
    accuracy: 98.4,
    lastAction: 'Drafted bilingual MOU agreement for regional AI cloud partnership',
  },
  {
    id: 'agent-21',
    number: 21,
    name: 'Autonomous Bug Repair & Self-Heal',
    nameFa: 'تعمیرگر خودکار باگ و پایداری لبه',
    category: 'engineering',
    role: 'Crash log diagnostics, automated fallback invocation, memory leak guard',
    roleFa: 'شناسایی خطاهای زمان اجرا در کلاینت و بازیابی خودکار وضعیت سالم',
    status: 'running',
    accuracy: 99.2,
    lastAction: 'Resolved potential WebGL context loss recovery loop',
  },
  {
    id: 'agent-22',
    number: 22,
    name: 'Image & BrandKit Generator',
    nameFa: 'سازنده برندکیت، لوگو و متریال بصری',
    category: 'content',
    role: 'Vector emblem generator, dark gold/indigo color harmonic paletter',
    roleFa: 'طراحی لوگوهای هندسی مدرن با نماد حلقه‌های نورانی و کره سه‌بعدی',
    status: 'idle',
    accuracy: 95.0,
    lastAction: 'Generated 3 luxury branding concepts for Aurevia Monetization OS',
  },
  {
    id: 'agent-23',
    number: 23,
    name: 'Enterprise HR & Face Attendance',
    nameFa: 'مدیریت حضور و غیاب چهره و ماهواره',
    category: 'core',
    role: 'Biometric verification, GPS radius validation, shift planner',
    roleFa: 'ثبت تردد دقیق پرسنل با هوش مصنوعی و نمایش زنده بر نقشه با حفظ حریم خصوصی',
    status: 'running',
    accuracy: 99.6,
    lastAction: 'Verified morning check-ins for 18 engineers across 4 timezones',
  },
  {
    id: 'agent-24',
    number: 24,
    name: 'Double-Entry Accounting Auditor',
    nameFa: 'حسابرس رسمی دفترکل دوبل و تراکنش‌ها',
    category: 'finance',
    role: 'Debit/credit balance check, draft submission to Owner workflow',
    roleFa: 'تطبیق تراز مالی، پیش‌نویس سند توسط نقش حسابدار و دریافت تاییدیه مالک',
    status: 'idle',
    accuracy: 100,
    lastAction: 'Validated fiscal ledger: Debits and Credits balanced at 184,200,000 IRR',
  },
  {
    id: 'agent-25',
    number: 25,
    name: 'Cloudflare & Vercel Edge Deployer',
    nameFa: 'استقرارگر ابری لبه روی کلودفلر و ورسل',
    category: 'engineering',
    role: '8-step connection wizard, Zero Trust policy inspector, build packager',
    roleFa: 'آماده‌سازی پکیج‌های APK/PWA، تنظیمات Pages و متغیرهای D1/R2 بدون خطا',
    status: 'completed',
    accuracy: 99.7,
    lastAction: 'Build verification ready for aurevia-ai.vercel.app & Pages preview',
  }
];

export const INITIAL_INSPECTIONS: TruthInspection[] = [
  {
    id: 'TRUTH-2026-089',
    title: 'تحلیل مقایسه‌ای الگوریتم‌های رندرینگ ۳D در وب با Three.js r160',
    source: 'Three.js Official Documentation & IEEE Computer Graphics Proceedings 2025',
    credibilityScore: 98,
    hallucinationRisk: 'low',
    copyrightStatus: 'verified',
    decision: 'approved',
    auditLog: [
      'Source URL verified: Official Three.js repo release tags',
      'Fact check passed: All cited shader benchmarks match reproducible WebGL metrics',
      'No fictitious quotes or fake statistical claims detected',
      'Truth Gate status: APPROVED FOR PUBLICATION'
    ],
    submittedBy: 'Technical Article Agent (#7)',
    timestamp: '۱۴:۳۲ — امروز'
  },
  {
    id: 'TRUTH-2026-090',
    title: 'پکیج آموزشی استراتژی درآمدزایی از ساخت مدل‌های سه بعدی در بلندر',
    source: 'Internal Aurevia Content Factory Data & Gumroad Creator Analytics 2026',
    credibilityScore: 92,
    hallucinationRisk: 'low',
    copyrightStatus: 'verified',
    decision: 'approved_with_edits',
    auditLog: [
      'Audited claim of "$10,000 guaranteed revenue": FLAGGED as exaggerated.',
      'Auto-rectified by Truth Verification Agent to: "Historical average top 10% creator earnings range $1,200-$3,500/mo".',
      'Truth Gate Rule: Never produce guaranteed revenue claims. Rectification saved.'
    ],
    submittedBy: 'Viral Hook Agent (#9)',
    timestamp: '۱۲:۱۵ — امروز'
  },
  {
    id: 'TRUTH-2026-091',
    title: 'راهنمای بالینی پروتکل CBT برای درمان وسواس شستشو و تمیزی',
    source: 'American Psychological Association (APA) & Oxford CBT Guidelines',
    credibilityScore: 99,
    hallucinationRisk: 'low',
    copyrightStatus: 'verified',
    decision: 'approved',
    auditLog: [
      'Clinical validation: Matches ERP (Exposure and Response Prevention) protocol standard',
      'Mandatory ethical disclaimer verified: System explicitly states it is an AI therapist, not a human MD',
      'Truth Gate status: APPROVED WITH HUMAN OVERSIGHT'
    ],
    submittedBy: 'CBT Psychotherapy Simulator (#17)',
    timestamp: '۰۹:۴۰ — امروز'
  },
  {
    id: 'TRUTH-2026-092',
    title: 'سیگنال تریدینگ اهرمی ۱۰۰x بر روی میم‌کوین ناشناخته',
    source: 'Anonymous Telegram Channel claim',
    credibilityScore: 18,
    hallucinationRisk: 'high',
    copyrightStatus: 'flagged',
    decision: 'rejected',
    auditLog: [
      'REJECTED AUTOMATICALLY BY TRUTH GATE',
      'Reason: High financial risk, unverified liquidity, potential pump-and-dump scheme.',
      'Rule: Truth over virality. Prohibited speculative crypto claims without human audit.'
    ],
    submittedBy: 'External Social Webhook',
    timestamp: '۰۸:۰۵ — امروز'
  }
];

export const INITIAL_FINANCIALS: FinancialEntry[] = [
  {
    id: 'FIN-1001',
    title: 'فروش بسته Aurevia Content Starter Kit (نسخه بین‌المللی)',
    type: 'income',
    amount: 14500000,
    currency: 'IRR',
    status: 'approved',
    scope: 'organization',
    preparedByRole: 'accountant',
    approvedBy: 'مهندس مهدی دلزنده (مالک)',
    category: 'محصولات دیجیتال',
    date: '۱۴۰۵/۰۸/۰۸'
  },
  {
    id: 'FIN-1002',
    title: 'تخصیص ۵٪ به صندوق توسعه (Development Fund) جهت ثبت دامنه‌های رسمی',
    type: 'fund_allocation',
    amount: 28450000,
    currency: 'IRR',
    status: 'approved',
    scope: 'organization',
    preparedByRole: 'accountant',
    approvedBy: 'مهندس مهدی دلزنده (مالک)',
    category: 'صندوق توسعه',
    date: '۱۴۰۵/۰۸/۰۷'
  },
  {
    id: 'FIN-1003',
    title: 'کارمزد سود ۱۰٪ معاملات بات تریدینگ جفتی نوبیتکس',
    type: 'trading_fee',
    amount: 420,
    currency: 'USDT',
    status: 'approved',
    scope: 'organization',
    preparedByRole: 'accountant',
    approvedBy: 'مهندس مهدی دلزنده (مالک)',
    category: 'درآمد رمزارزی',
    date: '۱۴۰۵/۰۸/۰۶'
  },
  {
    id: 'FIN-1004',
    title: 'تمدید سرورهای کلاستر هوش مصنوعی و GPU کلودفلر ورکرز',
    type: 'expense',
    amount: 8500000,
    currency: 'IRR',
    status: 'pending_approval',
    scope: 'organization',
    preparedByRole: 'accountant',
    category: 'زیرساخت ابری',
    date: '۱۴۰۵/۰۸/۰۸'
  },
  {
    id: 'FIN-1005',
    title: 'پیش‌نویس فاکتور خدمات طراحی ۳D و مجسمه‌سازی دیجیتال برای مشتری خارجی',
    type: 'income',
    amount: 1200,
    currency: 'USD',
    status: 'draft',
    scope: 'organization',
    preparedByRole: 'accountant',
    category: 'صادرات خدمات مهندسی',
    date: '۱۴۰۵/۰۸/۰۸'
  }
];

export const INITIAL_TRADING_PAIRS: TradingPair[] = [
  {
    symbol: 'BTC/USDT',
    exchange: 'Nobitex',
    price: 94820.50,
    change24h: 3.42,
    rsi: 54.2,
    macd: 'bullish',
    signal: 'BUY',
    winRate: 88.4
  },
  {
    symbol: 'ETH/USDT',
    exchange: 'Binance',
    price: 3410.80,
    change24h: 1.85,
    rsi: 48.6,
    macd: 'neutral',
    signal: 'HOLD',
    winRate: 84.1
  },
  {
    symbol: 'PAXG/USDT (طلای دیجیتال)',
    exchange: 'Wallex',
    price: 2740.15,
    change24h: 0.65,
    rsi: 42.1,
    macd: 'bullish',
    signal: 'STRONG_BUY',
    winRate: 91.2
  },
  {
    symbol: 'TON/USDT',
    exchange: 'Nobitex',
    price: 6.84,
    change24h: -1.20,
    rsi: 38.4,
    macd: 'bearish',
    signal: 'HOLD',
    winRate: 81.5
  }
];

export const INITIAL_EMPLOYEES: EmployeeStatus[] = [
  {
    id: 'EMP-01',
    name: 'مهندس مهدی دلزنده',
    role: 'بنیان‌گذار و معمار ارشد سیستم',
    status: 'online',
    lat: 35.7219,
    lng: 51.3347,
    locationName: 'دفتر مرکزی تهران / ماهواره‌ای لایو',
    faceVerified: true,
    tasksCompleted: 48,
    totalTasks: 50
  },
  {
    id: 'EMP-02',
    name: 'سارا رضایی',
    role: 'حسابدار رسمی و مدیر مالی',
    status: 'on_site',
    lat: 35.7320,
    lng: 51.3450,
    locationName: 'بخش امور مالی و خزانه‌داری',
    faceVerified: true,
    tasksCompleted: 19,
    totalTasks: 22
  },
  {
    id: 'EMP-03',
    name: 'مهندس آرش کریمی',
    role: 'متخصص پایپ‌لاین ۳D و وب‌جی‌ال',
    status: 'online',
    lat: 35.7001,
    lng: 51.4110,
    locationName: 'استودیو گرافیک رایانه‌ای',
    faceVerified: true,
    tasksCompleted: 31,
    totalTasks: 34
  },
  {
    id: 'EMP-04',
    name: 'دکتر نرگس مرادی',
    role: 'ناظر بالینی هوش مصنوعی رواندرمانی',
    status: 'remote',
    lat: 32.6546,
    lng: 51.6680,
    locationName: 'دفتر اصفهان / نظارت بر پروتکل‌های CBT',
    faceVerified: true,
    tasksCompleted: 14,
    totalTasks: 15
  }
];

export const INITIAL_ORDERS: ShoppingOrder[] = [
  {
    id: 'DK-994102',
    itemTitle: 'کارت گرافیک RTX 4090 24GB ویژه رندرینگ و آموزش مدل‌های هوش مصنوعی',
    platform: 'Digikala',
    priceToman: 184000000,
    priceCrypto: '2,920 USDT',
    status: 'in_transit',
    currentCheckpoint: 'انبار مرکزی غرب تهران — در مسیر تحویل با پیک اکسپرس',
    blockchainHash: '0x8f2a...c89e4 (ثبت در لجر سازمانی)',
    trackingCode: '24910482019482'
  },
  {
    id: 'SN-402819',
    itemTitle: 'تجهیزات ارگونومیک و مانیتور اولتراواید ۴۹ اینچ دفتر مرکزی',
    platform: 'SnappExpress',
    priceToman: 65000000,
    priceCrypto: '1,030 USDT',
    status: 'delivered',
    currentCheckpoint: 'تحویل داده شده به مدیریت پشتیبانی با امضای دیجیتال',
    blockchainHash: '0x3e1b...990d1 (فاکتور رسمی و گارانتی معتبر)',
    trackingCode: '992019481249'
  }
];

export interface DomainDnsRecord {
  type: 'A' | 'AAAA' | 'CNAME' | 'TXT' | 'MX' | 'CAA' | 'DS';
  name: string;
  value: string;
  ttl: string;
  priority?: number;
  purpose: string;
}

export interface DomainDetailedRecord {
  domain: string;
  aliases?: string[];
  status: string;
  estValue: string;
  brandScore: number;
  ownerRegistered: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerNationalId: string;
  registrar: string;
  registryDate: string;
  sslExpiry: string;
  dnssecStatus: string;
  nameservers: string[];
  category: string;
  seoPotential: string;
  dnsRecords: DomainDnsRecord[];
  zoneFile: string;
  whoisPayload: string;
}

export const DOMAIN_PORTFOLIO: DomainDetailedRecord[] = [
  {
    domain: 'aionverse.io',
    aliases: ['AIONVERSE.io', 'api.aionverse.io'],
    status: 'priority_1',
    estValue: '$18,500',
    brandScore: 99,
    ownerRegistered: 'مهدی دل زنده (مهندس مهدی دل زنده) | کد ملی: ۵۲۳۹۷۷۵۳۳۸ | تلفن: ۰۹۹۱۰۹۶۶۰۲۲ | ایمیل: mehdidlzndh@gmail.com',
    ownerName: 'مهدی دل زنده (مهندس مهدی دل زنده - Engineer Mehdi Del Zende)',
    ownerPhone: '+9809910966022',
    ownerEmail: 'mehdidlzndh@gmail.com',
    ownerNationalId: '۵۲۳۹۷۷۵۳۳۸',
    registrar: 'Cloudflare Registrar / Identity Bureau Verified',
    registryDate: '2026-10-20',
    sslExpiry: '2027-10-20 (Auto-Renew TLS 1.3 / ECC-384)',
    dnssecStatus: 'Active & Signed (Algorithm 13 ECDSAP256SHA256)',
    nameservers: ['dina.ns.cloudflare.com', 'walt.ns.cloudflare.com'],
    category: 'هسته فناوری، ایجنت‌های ابری و سوپراپلیکیشن بین‌المللی',
    seoPotential: 'بسیار بالا (A+ Elite)',
    dnsRecords: [
      { type: 'A', name: '@', value: '104.21.78.142', ttl: 'Auto (Cloudflare Edge)', purpose: 'Anycast IPv4 Primary Apex' },
      { type: 'A', name: '@', value: '172.67.194.88', ttl: 'Auto (Cloudflare Edge)', purpose: 'Anycast IPv4 Secondary Redundant' },
      { type: 'AAAA', name: '@', value: '2606:4700:3033::6815:4e8e', ttl: 'Auto', purpose: 'Anycast IPv6 Global Edge' },
      { type: 'CNAME', name: 'www', value: 'aionverse.io', ttl: 'Auto', purpose: 'Web Canonical Alias' },
      { type: 'CNAME', name: 'app', value: 'aionverse.io', ttl: 'Auto', purpose: 'Web PWA Application Portal' },
      { type: 'CNAME', name: 'api', value: 'aionverse.io', ttl: 'Auto', purpose: 'Cloud API & Microservices Gate' },
      { type: 'CNAME', name: 'agent', value: 'aionverse.io', ttl: 'Auto', purpose: 'AI Orchestrator & Multi-Agent Cluster' },
      { type: 'TXT', name: '@', value: 'aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com', ttl: '3600', purpose: 'سند اثبات مالکیت قطعی بنام مهدی دل زنده (کد ملی: ۵۲۳۹۷۷۵۳۳۸)' },
      { type: 'TXT', name: '@', value: 'v=spf1 include:_spf.google.com include:mailgun.org ~all', ttl: '3600', purpose: 'امنیت ایمیل و تایید اعتبار فرستنده SPF' },
      { type: 'TXT', name: '_dmarc', value: 'v=DMARC1; p=reject; rua=mailto:mehdidlzndh@gmail.com; pct=100', ttl: '3600', purpose: 'سیاست ضدجعل DMARC با گزارش به ایمیل مالک' },
      { type: 'MX', name: '@', value: 'aspmx.l.google.com', ttl: '3600', priority: 1, purpose: 'Google Workspace Primary Mail' },
      { type: 'MX', name: '@', value: 'alt1.aspmx.l.google.com', ttl: '3600', priority: 5, purpose: 'Google Workspace Backup Mail' },
      { type: 'CAA', name: '@', value: '0 issue "letsencrypt.org"', ttl: '3600', purpose: 'گواهی امنیتی صدور Let\'s Encrypt' },
      { type: 'CAA', name: '@', value: '0 issue "pki.goog"', ttl: '3600', purpose: 'گواهی امنیتی صدور Google Trust Services' },
      { type: 'DS', name: '@', value: '2371 13 2 9F84B67C29304B11E938A4B02E8A37554902A91D0E03C9E59128A4BC2984F712', ttl: '3600', purpose: 'DNSSEC Key Signing DS Record' }
    ],
    zoneFile: `; BIND Zone File for AIONVERSE.io
; Owner: Engineer Mehdi Del Zende (کد ملی: 5239775338 - مهدی دل زنده)
; Contact Phone: +9809910966022 | Email: mehdidlzndh@gmail.com
$TTL 3600
@       IN      SOA     dina.ns.cloudflare.com. hostmaster.aionverse.io. (
                        2026102901 ; Serial
                        7200       ; Refresh
                        3600       ; Retry
                        1209600    ; Expire
                        3600 )     ; Minimum

; Nameservers
@       IN      NS      dina.ns.cloudflare.com.
@       IN      NS      walt.ns.cloudflare.com.

; IPv4 and IPv6 Edge
@       IN      A       104.21.78.142
@       IN      A       172.67.194.88
@       IN      AAAA    2606:4700:3033::6815:4e8e

; Canonical Aliases
www     IN      CNAME   aionverse.io.
app     IN      CNAME   aionverse.io.
api     IN      CNAME   aionverse.io.
agent   IN      CNAME   aionverse.io.

; Ownership Cryptographic Verification & Security
@       IN      TXT     "aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com"
@       IN      TXT     "v=spf1 include:_spf.google.com include:mailgun.org ~all"
_dmarc  IN      TXT     "v=DMARC1; p=reject; rua=mailto:mehdidlzndh@gmail.com; pct=100"

; Mail Exchangers
@       IN      MX      1 aspmx.l.google.com.
@       IN      MX      5 alt1.aspmx.l.google.com.

; Certificate Authority Authorization
@       IN      CAA     0 issue "letsencrypt.org"
@       IN      CAA     0 issue "pki.goog"
`,
    whoisPayload: `Domain Name: AIONVERSE.IO
Registry Domain ID: DOM-IO-2026-AION-5239
Registrar WHOIS Server: whois.cloudflare.com
Registrar URL: http://www.cloudflare.com
Updated Date: 2026-10-29T18:00:00Z
Creation Date: 2026-10-20T10:00:00Z
Registry Expiry Date: 2030-10-20T10:00:00Z
Registrar: Cloudflare, Inc.
Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
Registry Registrant ID: REG-MD-5239-DELZENDE
Registrant Name: Mehdi Del Zende (مهدی دل زنده)
Registrant Organization: Aurevia AI & AIONVERSE Ecosystem
Registrant National ID: 5239775338 (کد ملی: ۵۲۳۹۷۷۵۳۳۸)
Registrant Street: Valiasr Blvd, Central AI Campus
Registrant City: Tehran
Registrant State/Province: Tehran
Registrant Postal Code: 1985711200
Registrant Country: IR
Registrant Phone: +98.09910966022
Registrant Email: mehdidlzndh@gmail.com
Admin Name: Engineer Mehdi Del Zende (مهندس مهدی دل زنده)
Admin Phone: +98.09910966022
Admin Email: mehdidlzndh@gmail.com
Tech Name: Infrastructure Guardian Team (Aurevia OS)
Tech Phone: +98.09910966022
Tech Email: owner@aurevia.ai
Name Server: DINA.NS.CLOUDFLARE.COM
Name Server: WALT.NS.CLOUDFLARE.COM
DNSSEC: signedDelegation
`
  },
  {
    domain: 'aionverse.com',
    aliases: ['Aionvere.com', 'sionvere.com', 'www.aionverse.com'],
    status: 'priority_1',
    estValue: '$24,000',
    brandScore: 99,
    ownerRegistered: 'مهدی دل زنده (مهندس مهدی دل زنده) | کد ملی: ۵۲۳۹۷۷۵۳۳۸ | تلفن: ۰۹۹۱۰۹۶۶۰۲۲ | ایمیل: mehdidlzndh@gmail.com',
    ownerName: 'مهدی دل زنده (مهندس مهدی دل زنده - Engineer Mehdi Del Zende)',
    ownerPhone: '+9809910966022',
    ownerEmail: 'mehdidlzndh@gmail.com',
    ownerNationalId: '۵۲۳۹۷۷۵۳۳۸',
    registrar: 'Cloudflare Registrar / Verisign COM Registry',
    registryDate: '2026-10-18',
    sslExpiry: '2027-10-18 (Auto-Renew TLS 1.3 / ECC-384)',
    dnssecStatus: 'Active & Signed (Algorithm 13 ECDSAP256SHA256)',
    nameservers: ['dina.ns.cloudflare.com', 'walt.ns.cloudflare.com'],
    category: 'دامنه برند جهانی سوپراپلیکیشن و اکوسیستم ۳D',
    seoPotential: 'بسیار بالا (A+ Ultra)',
    dnsRecords: [
      { type: 'A', name: '@', value: '104.21.84.190', ttl: 'Auto (Cloudflare Edge)', purpose: 'Anycast IPv4 Primary Apex' },
      { type: 'A', name: '@', value: '172.67.201.115', ttl: 'Auto (Cloudflare Edge)', purpose: 'Anycast IPv4 Secondary Redundant' },
      { type: 'AAAA', name: '@', value: '2606:4700:3037::6815:54be', ttl: 'Auto', purpose: 'Anycast IPv6 Global Edge' },
      { type: 'CNAME', name: 'www', value: 'aionverse.com', ttl: 'Auto', purpose: 'Web Primary Alias' },
      { type: 'CNAME', name: 'galaxy', value: 'aionverse.com', ttl: 'Auto', purpose: '3D Cosmic Studio Direct Hub' },
      { type: 'CNAME', name: 'wallet', value: 'aionverse.com', ttl: 'Auto', purpose: 'Secure Treasury Vault & Fund' },
      { type: 'TXT', name: '@', value: 'aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com', ttl: '3600', purpose: 'سند اثبات مالکیت قطعی بنام مهدی دل زنده (کد ملی: ۵۲۳۹۷۷۵۳۳۸)' },
      { type: 'TXT', name: '@', value: 'google-site-verification=AIONVERSE_DELZENDE_CONFIRMED_2026_PRO', ttl: '3600', purpose: 'گوگل سرچ کنسول و تایید مالکیت سئو جهانی' },
      { type: 'TXT', name: '@', value: 'v=spf1 include:_spf.google.com ~all', ttl: '3600', purpose: 'امنیت ایمیل SPF' },
      { type: 'TXT', name: '_dmarc', value: 'v=DMARC1; p=reject; rua=mailto:mehdidlzndh@gmail.com', ttl: '3600', purpose: 'سیاست DMARC ضد جعل' },
      { type: 'MX', name: '@', value: 'aspmx.l.google.com', ttl: '3600', priority: 1, purpose: 'ایمیل تجاری گوگل' },
      { type: 'CAA', name: '@', value: '0 issue "letsencrypt.org"', ttl: '3600', purpose: 'مجوز صدور SSL Let\'s Encrypt' },
      { type: 'CAA', name: '@', value: '0 issue "pki.goog"', ttl: '3600', purpose: 'مجوز صدور SSL گوگل' }
    ],
    zoneFile: `; BIND Zone File for aionverse.com (and Aionvere.com redirect alias)
; Owner: Engineer Mehdi Del Zende (کد ملی: 5239775338 - مهدی دل زنده)
; Contact: Phone +9809910966022 | Email mehdidlzndh@gmail.com
$TTL 3600
@       IN      SOA     dina.ns.cloudflare.com. hostmaster.aionverse.com. (
                        2026102901 ; Serial
                        7200       ; Refresh
                        3600       ; Retry
                        1209600    ; Expire
                        3600 )     ; Minimum

; Nameservers
@       IN      NS      dina.ns.cloudflare.com.
@       IN      NS      walt.ns.cloudflare.com.

; Anycast Edge IP
@       IN      A       104.21.84.190
@       IN      A       172.67.201.115
@       IN      AAAA    2606:4700:3037::6815:54be

; Subdomains
www     IN      CNAME   aionverse.com.
galaxy  IN      CNAME   aionverse.com.
wallet  IN      CNAME   aionverse.com.

; Verification
@       IN      TXT     "aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com"
@       IN      TXT     "google-site-verification=AIONVERSE_DELZENDE_CONFIRMED_2026_PRO"
@       IN      TXT     "v=spf1 include:_spf.google.com ~all"
_dmarc  IN      TXT     "v=DMARC1; p=reject; rua=mailto:mehdidlzndh@gmail.com"

; Mail
@       IN      MX      1 aspmx.l.google.com.
`,
    whoisPayload: `Domain Name: AIONVERSE.COM (also mapped: AIONVERE.COM)
Registry Domain ID: 298410294_DOMAIN_COM-VRSN
Registrar WHOIS Server: whois.cloudflare.com
Updated Date: 2026-10-29T18:00:00Z
Creation Date: 2026-10-18T12:00:00Z
Registry Expiry Date: 2030-10-18T12:00:00Z
Registrar: Cloudflare, Inc.
Registry Registrant ID: REG-MD-5239-DELZENDE
Registrant Name: Mehdi Del Zende (مهدی دل زنده)
Registrant Organization: Aurevia AI & AIONVERSE Ecosystem
Registrant National ID: 5239775338 (کد ملی: ۵۲۳۹۷۷۵۳۳۸)
Registrant Phone: +98.09910966022
Registrant Email: mehdidlzndh@gmail.com
Admin Name: Engineer Mehdi Del Zende (مهندس مهدی دل زنده)
Admin Phone: +98.09910966022
Admin Email: mehdidlzndh@gmail.com
Tech Email: owner@aurevia.ai
Name Server: DINA.NS.CLOUDFLARE.COM
Name Server: WALT.NS.CLOUDFLARE.COM
DNSSEC: signedDelegation
`
  },
  {
    domain: 'AureviaAI.com',
    aliases: ['www.AureviaAI.com'],
    status: 'active_target',
    estValue: '$3,400',
    brandScore: 96,
    ownerRegistered: 'مهدی دل زنده (مهندس مهدی دل زنده) | کد ملی: ۵۲۳۹۷۷۵۳۳۸',
    ownerName: 'مهدی دل زنده (مهندس مهدی دل زنده)',
    ownerPhone: '+9809910966022',
    ownerEmail: 'mehdidlzndh@gmail.com',
    ownerNationalId: '۵۲۳۹۷۷۵۳۳۸',
    registrar: 'Cloudflare Registrar',
    registryDate: '2026-10-15',
    sslExpiry: '2027-10-15',
    dnssecStatus: 'Active',
    nameservers: ['dina.ns.cloudflare.com', 'walt.ns.cloudflare.com'],
    category: 'هسته اکوسیستم مانیتایزینگ و ایجنت‌های سازمانی',
    seoPotential: 'عالی',
    dnsRecords: [
      { type: 'A', name: '@', value: '104.21.78.142', ttl: 'Auto', purpose: 'Edge Anycast' },
      { type: 'CNAME', name: 'www', value: 'AureviaAI.com', ttl: 'Auto', purpose: 'Web Alias' },
      { type: 'TXT', name: '@', value: 'aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com', ttl: '3600', purpose: 'سند اثبات مالکیت قطعی بنام مهدی دل زنده (کد ملی: ۵۲۳۹۷۷۵۳۳۸)' }
    ],
    zoneFile: `; BIND Zone File for AureviaAI.com\n; Owner: Mehdi Del Zende (کد ملی: 5239775338)\n@ IN A 104.21.78.142\nwww IN CNAME AureviaAI.com.\n@ IN TXT "aurevia-owner-verification=Mehdi-Del-Zende-5239775338-09910966022-mehdidlzndh@gmail.com"`,
    whoisPayload: `Domain Name: AUREVIAAI.COM\nRegistrant: Mehdi Del Zende (مهدی دل زنده)\nNational ID: 5239775338 (کد ملی: ۵۲۳۹۷۷۵۳۳۸)\nPhone: +98.09910966022\nEmail: mehdidlzndh@gmail.com`
  },
  {
    domain: 'aurevia-ai.vercel.app',
    aliases: [],
    status: 'live_free',
    estValue: 'Free Tier',
    brandScore: 90,
    ownerRegistered: 'مهدی دل زنده (مهندس مهدی دل زنده) | کد ملی: ۵۲۳۹۷۷۵۳۳۸',
    ownerName: 'مهدی دل زنده (مهندس مهدی دل زنده)',
    ownerPhone: '+9809910966022',
    ownerEmail: 'mehdidlzndh@gmail.com',
    ownerNationalId: '۵۲۳۹۷۷۵۳۳۸',
    registrar: 'Vercel Edge Global Network',
    registryDate: '2026-10-01',
    sslExpiry: 'Managed TLS',
    dnssecStatus: 'Active',
    nameservers: ['ns1.vercel-dns.com', 'ns2.vercel-dns.com'],
    category: 'هاست لایو اولیه و رایگان برای شروع بدون هزینه',
    seoPotential: 'فعال',
    dnsRecords: [
      { type: 'CNAME', name: '@', value: 'cname.vercel-dns.com', ttl: 'Auto', purpose: 'Vercel Anycast Network' }
    ],
    zoneFile: `; Vercel Managed Edge Record\n; Owner: Mehdi Del Zende (کد ملی: 5239775338)\n@ IN CNAME cname.vercel-dns.com.`,
    whoisPayload: `Managed by Vercel for Mehdi Del Zende (کد ملی: ۵۲۳۹۷۷۵۳۳۸)`
  },
  {
    domain: 'lumina-os.pages.dev',
    aliases: [],
    status: 'live_free',
    estValue: 'Free Tier',
    brandScore: 89,
    ownerRegistered: 'مهدی دل زنده (مهندس مهدی دل زنده) | کد ملی: ۵۲۳۹۷۷۵۳۳۸',
    ownerName: 'مهدی دل زنده (مهندس مهدی دل زنده)',
    ownerPhone: '+9809910966022',
    ownerEmail: 'mehdidlzndh@gmail.com',
    ownerNationalId: '۵۲۳۹۷۷۵۳۳۸',
    registrar: 'Cloudflare Pages Edge',
    registryDate: '2026-10-01',
    sslExpiry: 'Managed TLS 1.3',
    dnssecStatus: 'Active',
    nameservers: ['dina.ns.cloudflare.com', 'walt.ns.cloudflare.com'],
    category: 'بکاپ توزیع‌شده CDN جهانی Cloudflare',
    seoPotential: 'فعال',
    dnsRecords: [
      { type: 'CNAME', name: '@', value: 'pages.cloudflare.com', ttl: 'Auto', purpose: 'Cloudflare Pages Gateway' }
    ],
    zoneFile: `; Cloudflare Pages Managed Zone\n; Owner: Mehdi Del Zende (کد ملی: 5239775338)\n@ IN CNAME pages.cloudflare.com.`,
    whoisPayload: `Managed by Cloudflare Pages for Mehdi Del Zende (کد ملی: ۵۲۳۹۷۷۵۳۳۸)`
  }
];
