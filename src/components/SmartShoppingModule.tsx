import React, { useState } from 'react';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Search,
  ExternalLink,
  DollarSign,
  Download,
  MapPin,
  Sparkles,
  TrendingUp,
  Percent,
  Copy,
  Check,
  ArrowRight,
  Flame,
  Bot,
  Globe,
  Share2,
  Clock,
  Layers,
  Award,
  BarChart3,
  RefreshCw,
  Send,
  Zap,
  Tag
} from 'lucide-react';

interface DropshipProduct {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  sourcePlatform: 'Alibaba' | 'Temu' | 'AliExpress';
  supplierName: string;
  supplierRating: number;
  wholesaleCostUsd: number;
  suggestedRetailUsd: number;
  profitMarginPercent: number;
  netProfitPerUnitUsd: number;
  monthlySalesVolume: number;
  trendingScore: number;
  imageUrl: string;
  competitors: {
    amazonPriceUsd: number;
    walmartPriceUsd: number;
    ebayPriceUsd: number;
  };
  adLifecycle: {
    hook: string;
    body: string;
    cta: string;
    recommendedChannels: string[];
    bestPostTime: string;
  };
  importedToStore: boolean;
  affiliateUrl: string;
}

export function SmartShoppingModule() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'agentic-team' | 'lifecycle-ads' | 'orders' | 'escrow'>('catalog');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'Alibaba' | 'Temu' | 'AliExpress'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<DropshipProduct | null>(null);
  const [publishedAd, setPublishedAd] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const [products, setProducts] = useState<DropshipProduct[]>([
    {
      id: 'PROD-TEMU-8821',
      title: 'پروژکتور کهکشانی هولوگرافیک سه‌بعدی با صدای امبینت نوری',
      titleEn: '3D Hologram Galaxy Nebula Smart Projector with Ambient Audio',
      category: 'لوازم دیجیتال و دکوراسیون هوشمند',
      sourcePlatform: 'Temu',
      supplierName: 'Shenzhen Quantum Light Co.',
      supplierRating: 4.9,
      wholesaleCostUsd: 7.40,
      suggestedRetailUsd: 29.99,
      profitMarginPercent: 68,
      netProfitPerUnitUsd: 22.59,
      monthlySalesVolume: 14200,
      trendingScore: 99,
      imageUrl: '🌌',
      competitors: {
        amazonPriceUsd: 34.50,
        walmartPriceUsd: 32.00,
        ebayPriceUsd: 31.90
      },
      adLifecycle: {
        hook: '«اتاق خوابت رو با یک کلیک به کهکشان راه شیری تبدیل کن!»',
        body: 'پروژکتور هولوگرافیک هوشمند AIONVERSE با چرخش ۱۶ میلیون رنگ و قابلیت کنترل با موبایل؛ تماشای ستاره‌ها در شب آرامش فوق‌العاده‌ای به خواب و تمرکز شما می‌دهد.',
        cta: '۵۰٪ تخفیف انحصاری مهندس مهدی دل زنده فقط برای ۵۰ سفارش اول!',
        recommendedChannels: ['Instagram Reels', 'TikTok', 'YouTube Shorts', 'Telegram'],
        bestPostTime: 'ساعت ۲۰:۳۰ شب (اوج بازدید)'
      },
      importedToStore: true,
      affiliateUrl: 'https://aionverse.io/shop/galaxy-projector?aff=MEHDI_DELZENDE_5239'
    },
    {
      id: 'PROD-ALI-9014',
      title: 'هدفون هوشمند ترجمه بلادرنگ ۵۰ زبان با هوش مصنوعی',
      titleEn: 'Real-Time 50-Language Neural AI Translation Smart Earbuds',
      category: 'هوش مصنوعی و تجهیزات سفر',
      sourcePlatform: 'Alibaba',
      supplierName: 'Guangzhou Neural Acoustics Ltd.',
      supplierRating: 4.8,
      wholesaleCostUsd: 12.80,
      suggestedRetailUsd: 49.90,
      profitMarginPercent: 71,
      netProfitPerUnitUsd: 37.10,
      monthlySalesVolume: 8900,
      trendingScore: 97,
      imageUrl: '🎧',
      competitors: {
        amazonPriceUsd: 59.99,
        walmartPriceUsd: 54.00,
        ebayPriceUsd: 52.50
      },
      adLifecycle: {
        hook: '«دیگه برای سفر به هیچ کشوری به مترجم نیاز نداری!»',
        body: 'این هدفون هوشمند همزمان با صحبت کردن طرف مقابل، صدای او را به فارسی یا هر زبانی در گوش شما زمزمه می‌کند. بدون تاخیر با لتنسی زیر ۳۰ میلی‌ثانیه.',
        cta: 'لینک خرید مستقیم با ارسال رایگان در بایو قرار گرفت.',
        recommendedChannels: ['TikTok', 'Instagram Reels', 'LinkedIn B2B', 'X Twitter'],
        bestPostTime: 'ساعت ۱۲:۱۵ ظهر و ۱۹:۰۰ عصر'
      },
      importedToStore: true,
      affiliateUrl: 'https://aionverse.io/shop/ai-translator-buds?aff=MEHDI_DELZENDE_5239'
    },
    {
      id: 'PROD-TEMU-5542',
      title: 'چراغ خواب شنی پویا با جریان متحرک ذرات کوانتومی (Kinetic Sand Lamp)',
      titleEn: 'Dynamic Kinetic Sand Art LED Atmosphere Bedside Lamp',
      category: 'دکوراسیون ریلکسیشن و تمرکز',
      sourcePlatform: 'Temu',
      supplierName: 'Yiwu Aesthetic Crafts Group',
      supplierRating: 4.9,
      wholesaleCostUsd: 5.20,
      suggestedRetailUsd: 23.50,
      profitMarginPercent: 65,
      netProfitPerUnitUsd: 18.30,
      monthlySalesVolume: 22400,
      trendingScore: 98,
      imageUrl: '⏳',
      competitors: {
        amazonPriceUsd: 28.99,
        walmartPriceUsd: 26.50,
        ebayPriceUsd: 24.80
      },
      adLifecycle: {
        hook: '«تماشای این چراغ شنی در ۵ دقیقه استرس تمام روز رو محو می‌کنه...»',
        body: 'هر بار چرخاندن این اثر هنری، منظره‌ای کاملاً منحصربه‌فرد از کوه‌ها و کهکشان‌های شنی خلق می‌کند. هدیه‌ای فوق‌العاده شیک با بسته بندی هاردباکس لوکس.',
        cta: 'خرید مستقیم با ضمانت اصالت فیزیکی و بازگشت وجه.',
        recommendedChannels: ['Instagram Reels', 'Pinterest Pins', 'TikTok Viral'],
        bestPostTime: 'ساعت ۲۱:۰۰ شب'
      },
      importedToStore: false,
      affiliateUrl: 'https://aionverse.io/shop/kinetic-sand-lamp?aff=MEHDI_DELZENDE_5239'
    },
    {
      id: 'PROD-ALI-3389',
      title: 'چاپگر حرارتی جیبی بدون نیاز به جوهر مخصوص گوشی هوشمند',
      titleEn: 'Zero-Ink Bluetooth Pocket Thermal Printer for Photos & Notes',
      category: 'لوازم التحریر و تکنولوژی مطالعه',
      sourcePlatform: 'Alibaba',
      supplierName: 'Dongguan Meow Print Tech',
      supplierRating: 4.7,
      wholesaleCostUsd: 6.50,
      suggestedRetailUsd: 26.90,
      profitMarginPercent: 64,
      netProfitPerUnitUsd: 20.40,
      monthlySalesVolume: 16800,
      trendingScore: 96,
      imageUrl: '🖨️',
      competitors: {
        amazonPriceUsd: 31.99,
        walmartPriceUsd: 29.00,
        ebayPriceUsd: 27.50
      },
      adLifecycle: {
        hook: '«چاپ عکس، استیکر و یادداشت‌های درسی در ۳ ثانیه بدون جوهر!»',
        body: 'دستگاه چاپگر مینیاتوری بلوتوثی که با حرارت کار می‌کند و هرگز نیازی به خرید جوهر و کارتریج ندارد. سازگار با اندروید و آیفون.',
        cta: 'برای ثبت سفارش فوری کلمه پرینتر را کامنت کنید.',
        recommendedChannels: ['Instagram Reels', 'YouTube Shorts', 'Telegram'],
        bestPostTime: 'ساعت ۱۷:۳۰ عصر'
      },
      importedToStore: true,
      affiliateUrl: 'https://aionverse.io/shop/pocket-printer?aff=MEHDI_DELZENDE_5239'
    },
    {
      id: 'PROD-ALI-7721',
      title: 'شارژر مگنتی ۳ کاره تاشو فست‌شارژر مگ‌سیف آلومینیومی',
      titleEn: '3-in-1 Foldable Aluminum Magnetic Wireless Fast Charger Stand',
      category: 'لوازم جانبی آیفون و اپل‌واچ',
      sourcePlatform: 'Alibaba',
      supplierName: 'Shenzhen PowerCore Electronics',
      supplierRating: 4.9,
      wholesaleCostUsd: 8.90,
      suggestedRetailUsd: 34.00,
      profitMarginPercent: 62,
      netProfitPerUnitUsd: 25.10,
      monthlySalesVolume: 11500,
      trendingScore: 95,
      imageUrl: '⚡',
      competitors: {
        amazonPriceUsd: 39.99,
        walmartPriceUsd: 36.50,
        ebayPriceUsd: 35.00
      },
      adLifecycle: {
        hook: '«میز کار شلوغ و پر از سیم رو یک‌بار برای همیشه جمع کن!»',
        body: 'شارژ همزمان آیفون، ایرپاد و اپل‌واچ روی یک پایه شیک آلومینیومی تاشو که در جیب جا می‌شود. استاندارد تایید شده Qi2 و فست شارژ ۱۵ وات.',
        cta: 'کد تخفیف AION-POWER برای ۲۴ ساعت فعال است.',
        recommendedChannels: ['LinkedIn B2B', 'Instagram Reels', 'X Twitter'],
        bestPostTime: 'ساعت ۱۳:۰۰ ظهر'
      },
      importedToStore: false,
      affiliateUrl: 'https://aionverse.io/shop/foldable-magsafe?aff=MEHDI_DELZENDE_5239'
    }
  ]);

  const filteredProducts = products.filter((p) => {
    const matchesPlatform = selectedPlatform === 'all' || p.sourcePlatform === selectedPlatform;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const handleToggleImport = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, importedToStore: !p.importedToStore } : p))
    );
  };

  const handleSimulateAutonomousScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const newScan: DropshipProduct = {
        id: `PROD-SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
        title: 'اسپیکر مغناطیسی شناور با نورپردازی داینامیک کوانتومی',
        titleEn: 'Levitating Magnetic UFO Wireless Speaker with Quantum LED',
        category: 'صدا و گجت‌های لوکس آینده',
        sourcePlatform: 'Alibaba',
        supplierName: 'Zhejiang Acoustic Levitation Tech',
        supplierRating: 4.95,
        wholesaleCostUsd: 18.50,
        suggestedRetailUsd: 69.00,
        profitMarginPercent: 73,
        netProfitPerUnitUsd: 50.50,
        monthlySalesVolume: 6700,
        trendingScore: 100,
        imageUrl: '🛸',
        competitors: {
          amazonPriceUsd: 79.99,
          walmartPriceUsd: 74.50,
          ebayPriceUsd: 72.00
        },
        adLifecycle: {
          hook: '«اسپیکری که روی هوا معلق می‌ماند و آهنگ پخش می‌کند!»',
          body: 'تکنولوژی تعلیق مغناطیسی پایدار با بیس عمیق ۳۶۰ درجه و نورپردازی ستاره‌ای؛ شاهکار مهندسی اکوسیستم هوش مصنوعی AIONVERSE.',
          cta: 'تعداد محدود در انبار بین‌المللی — تحویل ۷ روزه.',
          recommendedChannels: ['Instagram Reels', 'TikTok', 'YouTube Shorts'],
          bestPostTime: 'ساعت ۲۱:۳۰ شب'
        },
        importedToStore: true,
        affiliateUrl: 'https://aionverse.io/shop/levitating-speaker?aff=MEHDI_DELZENDE_5239'
      };
      setProducts([newScan, ...products]);
      setSelectedProduct(newScan);
    }, 1500);
  };

  const handlePublishAd = (prod: DropshipProduct) => {
    setPublishedAd(prod.id);
    setTimeout(() => {
      setPublishedAd(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-emerald-500/15 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2 flex-wrap">
              <span>فروشگاه تخصصی همکاری در فروش جهانی (Alibaba & Temu Dropshipping)</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded font-mono border border-emerald-500/30">
                اتصال مستقیم به تامین‌کنندگان
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="text-amber-300 font-bold">صاحب امتیاز: مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸)</span>
              <span>•</span>
              <span className="text-cyan-300 font-mono">شناسه افیلیت: MEHDI_DELZENDE_5239</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">میانگین حاشیه سود ناخالص: ۶۰ الی ۷۳ درصد</span>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-bold flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'catalog' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>کالاهای پرفروش ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('agentic-team')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'agentic-team' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>تیم ایجنت‌های کاوشگر</span>
          </button>
          <button
            onClick={() => setActiveTab('lifecycle-ads')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'lifecycle-ads' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>کمپین شبکه‌های اجتماعی</span>
          </button>
          <button
            onClick={() => setActiveTab('escrow')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'escrow' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>تخصیص سود به صندوق ۵٪</span>
          </button>
        </div>
      </div>

      {/* Tab 1: High-Margin Curated Dropship Catalog */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Controls & Filter Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <span className="text-xs text-slate-400">تامین‌کننده:</span>
              {(['all', 'Alibaba', 'Temu', 'AliExpress'] as const).map((plat) => (
                <button
                  key={plat}
                  onClick={() => setSelectedPlatform(plat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedPlatform === plat
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {plat === 'all' ? 'همه پلتفرم‌ها' : plat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی کالا یا دسته‌بندی..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                onClick={handleSimulateAutonomousScan}
                disabled={isScanning}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1.5 transition hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'کاوش زنده هوش مصنوعی...' : 'کاوش ترندهای جدید علی‌بابا/تمو'}</span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4 hover:border-amber-500/40 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{prod.imageUrl}</span>
                      <div>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            prod.sourcePlatform === 'Alibaba'
                              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                              : prod.sourcePlatform === 'Temu'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          تامین‌کننده: {prod.sourcePlatform}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{prod.supplierName} ({prod.supplierRating}★)</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        سود: {prod.profitMarginPercent}٪
                      </span>
                      <div className="text-[9px] text-slate-500 font-mono mt-0.5">امتیاز ترند: {prod.trendingScore}/100</div>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-100 leading-snug">{prod.title}</h3>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{prod.titleEn}</div>
                  </div>

                  {/* Price breakdown pill */}
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-slate-400 text-[11px]">قیمت عمده خرید:</span>
                      <span className="text-amber-300 font-bold">${prod.wholesaleCostUsd.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-slate-400 text-[11px]">قیمت فروش پیشنهادی:</span>
                      <span className="text-slate-100 font-bold">${prod.suggestedRetailUsd.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between font-mono pt-1.5 border-t border-slate-800">
                      <span className="text-emerald-400 text-[11px] font-bold">سود خالص در هر فروش:</span>
                      <span className="text-emerald-400 font-black text-sm">+${prod.netProfitPerUnitUsd.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Competitor Price Comparison */}
                  <div className="space-y-1 text-[11px]">
                    <div className="text-slate-500 text-[10px] font-bold flex items-center justify-between">
                      <span>قیمت در غول‌های رقیب:</span>
                      <span className="text-cyan-400 font-mono">قیمت شما مناسب‌تر است</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
                      <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-slate-500">Amazon: </span>
                        <span className="text-slate-300 font-bold">${prod.competitors.amazonPriceUsd}</span>
                      </div>
                      <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-slate-500">Walmart: </span>
                        <span className="text-slate-300 font-bold">${prod.competitors.walmartPriceUsd}</span>
                      </div>
                      <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-slate-500">eBay: </span>
                        <span className="text-slate-300 font-bold">${prod.competitors.ebayPriceUsd}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleImport(prod.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        prod.importedToStore
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{prod.importedToStore ? 'در فروشگاه شما فعال است' : 'افزودن به فروشگاه من'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProduct(prod);
                        setActiveTab('lifecycle-ads');
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 transition cursor-pointer"
                      title="مشاهده کمپین تبلیغاتی شبکه‌های اجتماعی"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>فروش ماهانه تخمینی: {prod.monthlySalesVolume.toLocaleString('fa-IR')} عدد</span>
                    <button
                      onClick={() => copyToClipboard(prod.affiliateUrl, `aff-${prod.id}`)}
                      className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === `aff-${prod.id}` ? 'لینک کپی شد' : 'کپی لینک افیلیت'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Autonomous Multi-Agent Sourcing & Arbiter Team */}
      {activeTab === 'agentic-team' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  تیم ایجنت‌های ۴ گانه خودگردان کاوشگر و آربیتراژ محصولات پرسود
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  پایش ۲۴ ساعته بازار علی‌بابا، تمو و آمازون بدون نیاز به دخالت انسانی و آماده‌سازی کمپین‌های فروش
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">ایجنت ۱: TrendFinder AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  کاوش مداوم ویدیوهای وایرال تیک‌تاک و محصولات تخفیف خورده تمو و استخراج کالاهای با رشد تقاضای بالای ۳۰۰٪.
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">وضعیت: پایش بلادرنگ ۵ پلتفرم</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300">ایجنت ۲: Price Arbitrage Spy</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  محاسبه اختلاف قیمت کارخانه در علی‌بابا با خرده‌فروشی آمازون و وال‌مارت و حذف کالاهای با سود زیر ۵۰٪.
                </div>
                <div className="text-[10px] text-cyan-400 font-mono">دقت تخمین سود: ۹۹.۲٪</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300">ایجنت ۳: Ad Hook Generator</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  تولید سناریوهای ۱۰ الی ۳۰ ثانیه‌ای، قلاب‌های وایرال روانشناختی، و متون تبلیغاتی متناسب با فرهنگ ایرانی و جهانی.
                </div>
                <div className="text-[10px] text-indigo-400 font-mono">فرمت‌ها: Reels, TikTok, Shorts</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300">ایجنت ۴: Lifecycle Scheduler</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  انتشار خودکار تبلیغات در ۸ کانال اجتماعی در ساعات اوج ترافیک و هدایت مستقیم مشتری به درگاه پرداخت.
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">تسویه: آنی به صندوق توسعه ۵٪</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Lifecycle Social Ads & Video Hooks */}
      {activeTab === 'lifecycle-ads' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-400" />
                <span>ژنراتور تبلیغات اختصاصی و چرخه حیات در شبکه‌های اجتماعی</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                تولید محتوای تبلیغاتی حرفه‌ای با سناریو، هوک وایرال، و هشتگ‌های پربازدید متصل به شناسه فروشگاهی مهندس مهدی دل زنده
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                Instagram / TikTok / YouTube / Telegram
              </span>
            </div>
          </div>

          {/* Active Product Ad Lifecycle */}
          {selectedProduct ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">قلاب ویدیویی جلب توجه (Viral Hook):</span>
                    <span className="text-[10px] text-slate-500">۳ ثانیه اول ویدیو</span>
                  </div>
                  <div className="text-sm font-black text-slate-100 bg-slate-900 p-3 rounded-xl border border-slate-800/80">
                    {selectedProduct.adLifecycle.hook}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400">بدنه سناریو و حل مشکل (Body Content):</span>
                    <span className="text-[10px] text-slate-500">مدت: ۲۰ ثانیه</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800/80">
                    {selectedProduct.adLifecycle.body}
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">دعوت به اقدام و فروش قطعی (Call To Action):</span>
                    <span className="text-[10px] text-slate-500">۳ الی ۵ ثانیه پایانی</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-300 bg-slate-900 p-3 rounded-xl border border-slate-800/80">
                    {selectedProduct.adLifecycle.cta}
                  </div>
                </div>
              </div>

              {/* Publisher Action Sidebar */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-200">کانال‌های هدف انتشار خودکار:</div>
                  <div className="space-y-1.5">
                    {selectedProduct.adLifecycle.recommendedChannels.map((ch, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    زمان پیشنهادی انتشار: <strong className="text-amber-300">{selectedProduct.adLifecycle.bestPostTime}</strong>
                  </div>
                </div>

                <div className="space-y-2 pt-3">
                  <button
                    onClick={() => handlePublishAd(selectedProduct)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>{publishedAd === selectedProduct.id ? 'در حال ارسال به ربات‌های کانال...' : 'انتشار خودکار در کانال‌های شبکه اجتماعی'}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(`${selectedProduct.adLifecycle.hook}\n\n${selectedProduct.adLifecycle.body}\n\n${selectedProduct.adLifecycle.cta}\n\nلینک سفارش: ${selectedProduct.affiliateUrl}`, 'copy-ad')}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedKey === 'copy-ad' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'copy-ad' ? 'کپی شد' : 'کپی متن تبلیغاتی'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              یکی از کالاهای جدول بالا را انتخاب کنید یا روی آیکون اشتراک کلیک فرمایید تا کمپین تبلیغاتی آن نمایش داده شود.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Escrow & Treasury Allocation */}
      {activeTab === 'escrow' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                تسویه حساب و تخصیص درآمدهای همکاری در فروش به صندوق توسعه ۵٪
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                توزیع خودکار سود حاصل از فروشگاه جهانی علی‌بابا و تمو به حساب توسعه زیرساخت‌ها، خرید دامنه‌ها و ولت مالک
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-400 text-xs">مجموع سود ناخالص فروشگاه:</span>
              <div className="text-2xl font-black font-mono text-emerald-400">$3,420.50</div>
              <div className="text-[10px] text-slate-500">تسویه شده در ۳۰ روز اخیر</div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-400 text-xs">تخصیص ۵٪ به صندوق توسعه:</span>
              <div className="text-2xl font-black font-mono text-amber-300">$171.02</div>
              <div className="text-[10px] text-amber-400">جهت تمدید سرورها و دامنه‌های AIONVERSE</div>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-slate-400 text-xs">سود خالص واریز به ولت مالک:</span>
              <div className="text-2xl font-black font-mono text-cyan-300">$3,249.48</div>
              <div className="text-[10px] text-cyan-400">مالک: مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
