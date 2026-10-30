import React, { useState } from 'react';
import royalEmblemImg from '../assets/images/studiodelzendehai_royal_emblem_1793353057057.jpg';
import {
  Wallet,
  Building,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Lock,
  Globe,
  Radio,
  Plane,
  Truck,
  Ship,
  CheckCircle2,
  Clock,
  Sparkles,
  CreditCard,
  QrCode,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Satellite,
  Layers,
  MapPin,
  Flame,
  Search,
  Zap,
  ShoppingBag,
  Coins
} from 'lucide-react';

interface CargoTrackingItem {
  id: string;
  trackingNumber: string;
  itemTitle: string;
  origin: string;
  destination: string;
  currentLocation: string;
  lat: number;
  lng: number;
  carrierType: 'air' | 'sea' | 'land';
  carrierName: string;
  status: 'departed' | 'in_flight' | 'customs_clearing' | 'delivered';
  platform: 'Temu' | 'Alibaba' | 'Digikala' | 'Enterprise';
  eta: string;
  satelliteTelemetry: {
    satelliteName: string;
    altitudeKm: number;
    signalDbm: number;
    lastPing: string;
    containerTemp: string;
  };
}

const INITIAL_CARGOS: CargoTrackingItem[] = [
  {
    id: 'CARGO-01',
    trackingNumber: 'AION-SAT-88219-IR',
    itemTitle: 'محموله ۲۰۰ عددی مینی‌پروژکتورهای هوشمند 4K لیزری (Temu Dropship)',
    origin: 'شنژن، چین (Shenzhen Warehouse)',
    destination: 'تهران، ایران (انبار لجستیک مرکزی)',
    currentLocation: 'بر فراز خلیج فارس (مسیر هوایی دبی به تهران)',
    lat: 27.18,
    lng: 56.24,
    carrierType: 'air',
    carrierName: 'پرواز کارگو بوئینگ ۷۷۷ باربری فیدکس / ماهان',
    status: 'in_flight',
    platform: 'Temu',
    eta: '۳ ساعت و ۱۵ دقیقه دیگر',
    satelliteTelemetry: {
      satelliteName: 'Sentinel-2A & Starlink Telemetry',
      altitudeKm: 550,
      signalDbm: -68,
      lastPing: 'همین الان (زنده)',
      containerTemp: '۲۰.۴° سانتی‌گراد (بهینه)'
    }
  },
  {
    id: 'CARGO-02',
    trackingNumber: 'AION-SAT-44102-EU',
    itemTitle: 'ماژول‌های سرور سخت‌افزاری و کارت‌های مخابراتی DID (فرانکفورت)',
    origin: 'فرانکفورت، آلمان',
    destination: 'دفتر مرکزی تهران / دبی',
    currentLocation: 'گمرک فرودگاه بین‌المللی امام خمینی',
    lat: 35.41,
    lng: 51.15,
    carrierType: 'air',
    carrierName: 'لوفت‌هانزا کارگو لیمیتد',
    status: 'customs_clearing',
    platform: 'Enterprise',
    eta: 'امروز عصر (تأیید ترخیص سبز)',
    satelliteTelemetry: {
      satelliteName: 'Landsat-9 Earth Observer',
      altitudeKm: 705,
      signalDbm: -72,
      lastPing: '۲ دقیقه پیش',
      containerTemp: '۲۱.۱° سانتی‌گراد'
    }
  },
  {
    id: 'CARGO-03',
    trackingNumber: 'AION-SAT-33918-IR',
    itemTitle: 'تجهیزات ورک‌استیشن و مانیتورهای صنعتی 8K استودیو ۳D (دیجی‌کالا/اسنپ)',
    origin: 'تهران - شهرک صنعتی شمس‌آباد',
    destination: 'مرکز توسعه فناوری استودیو دلزنده',
    currentLocation: 'بزرگراه خلیج فارس تهران - خودروی حمل مجهز به GPS',
    lat: 35.68,
    lng: 51.38,
    carrierType: 'land',
    carrierName: 'ناوگان اکسپرس لجستیک اختصاصی',
    status: 'departed',
    platform: 'Digikala',
    eta: '۴۵ دقیقه دیگر',
    satelliteTelemetry: {
      satelliteName: 'NavIC & Beidou Regional High-Precision',
      altitudeKm: 420,
      signalDbm: -55,
      lastPing: 'زنده',
      containerTemp: '۲۲.۰° سانتی‌گراد'
    }
  }
];

export function GlobalBankingLogisticsModule() {
  const [activeTab, setActiveTab] = useState<'wallets' | 'fiat-rails' | 'satellite-map' | 'escrow'>('satellite-map');
  const [cargos, setCargos] = useState<CargoTrackingItem[]>(INITIAL_CARGOS);
  const [selectedCargo, setSelectedCargo] = useState<CargoTrackingItem>(INITIAL_CARGOS[0]);
  const [cryptoWithdrawModal, setCryptoWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('500');
  const [withdrawAddress, setWithdrawAddress] = useState('TRX...71Ae5239DelZende');
  const [withdrawCurrency, setWithdrawCurrency] = useState<'USDT-TRC20' | 'ETH' | 'BTC' | 'TON'>('USDT-TRC20');
  const [isProcessingTx, setIsProcessingTx] = useState(false);
  const [txSuccessMessage, setTxSuccessMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((curr) => (curr === key ? null : curr)), 2000);
  };

  const handleExecuteWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingTx(true);
    setTimeout(() => {
      setIsProcessingTx(false);
      setTxSuccessMessage(
        `تراکنش برداشت ${withdrawAmount} ${withdrawCurrency} با امضای خصوصی مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸) در بلاکچین ثبت شد. هش تراکنش: 0x9f8c...5239`
      );
      setTimeout(() => {
        setTxSuccessMessage(null);
        setCryptoWithdrawModal(false);
      }, 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Royal Insignia */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#1d0714] to-slate-900 border-2 border-amber-500/40 p-5 md:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] shrink-0 bg-black">
              <img
                src={royalEmblemImg}
                alt="StudioDelzendehAi"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                <Satellite className="w-3.5 h-3.5" />
                <span>Global Fiat/Crypto Banking, Cold/Hot Vaults & Live Satellite Logistics</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-100 flex items-center gap-2">
                درگاه‌های واریز بانکی، والت سرد و گرم، و رهگیری زنده ماهواره‌ای مرسوله‌ها
              </h2>
              <p className="text-xs text-slate-400">
                تسویه حساب بانکی شتاب و بین‌المللی، ذخیره‌سازی ایزوله در کیف‌پول سرد/گرم، و رصد ماهواره‌ای LEO خریدهای علی‌بابا، تمو و دیجی‌کالا
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCryptoWithdrawModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <ArrowUpRight className="w-4 h-4 text-slate-950" />
              <span>برداشت امن رمزارزی (Crypto Out)</span>
            </button>

            <button
              onClick={() => setActiveTab('satellite-map')}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Satellite className="w-4 h-4 text-cyan-400" />
              <span>نقشه ماهواره‌ای زنده</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 max-w-full overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('satellite-map')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'satellite-map'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Satellite className="w-4 h-4" />
          <span>رهگیری زنده نقشه ماهواره‌ای جهانی ({cargos.length} مرسوله فعال)</span>
        </button>

        <button
          onClick={() => setActiveTab('wallets')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'wallets'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>کیف‌پول داخلی رمزارزی (سرد و گرم)</span>
        </button>

        <button
          onClick={() => setActiveTab('fiat-rails')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'fiat-rails'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>مسیرهای واریز بانکی ریالی و ارزی (شتاب، SEPA، SWIFT)</span>
        </button>

        <button
          onClick={() => setActiveTab('escrow')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'escrow'
              ? 'bg-indigo-500 text-slate-950 shadow-md shadow-indigo-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>قراردادهای امانی ضامن خرید (Escrow Smart Contract)</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: نقشه ماهواره‌ای زنده جهانی و رهگیری لحظه‌ای مرسوله‌ها (Satellite Map)
         ========================================================================= */}
      {activeTab === 'satellite-map' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Satellite Live Radar Viewport */}
            <div className="lg:col-span-8 rounded-3xl bg-[#03060c] border-2 border-cyan-500/40 p-4 md:p-6 space-y-4 shadow-2xl relative overflow-hidden">
              {/* Radar Grid Graphic Simulation */}
              <div className="relative w-full h-[400px] md:h-[460px] rounded-2xl bg-gradient-to-b from-[#040814] via-[#070f20] to-[#02050b] border border-cyan-500/30 overflow-hidden flex items-center justify-center">
                {/* World Map Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(56,189,248,0.15) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* Rotating Satellite Radar Sweep */}
                <div className="absolute w-[600px] h-[600px] rounded-full border border-cyan-500/20 pointer-events-none animate-spin duration-[15s]">
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-tl-full" />
                </div>

                {/* Satellite Orbital Rings */}
                <div className="absolute w-80 h-80 rounded-full border border-cyan-500/20 pointer-events-none" />
                <div className="absolute w-[480px] h-[480px] rounded-full border border-cyan-500/10 pointer-events-none" />

                {/* Live Cargo Route Line Simulation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Route 1: Shenzhen to Dubai to Tehran */}
                  <path
                    d="M 680,240 Q 520,180 390,140"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="6,4"
                    className="animate-pulse"
                  />
                  {/* Route 2: Frankfurt to Tehran */}
                  <path
                    d="M 220,110 Q 300,120 390,140"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                </svg>

                {/* Shenzhen Origin Pin */}
                <div className="absolute top-[52%] right-[12%] flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-[9px] font-mono font-bold text-amber-300 mt-1 bg-black/80 px-1 rounded">
                    شنژن (تأمین‌کننده)
                  </span>
                </div>

                {/* Dubai Mid-Hub Pin */}
                <div className="absolute top-[40%] right-[38%] flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                  <span className="text-[9px] font-mono font-bold text-cyan-300 mt-1 bg-black/80 px-1 rounded">
                    دبی ترانزیت
                  </span>
                </div>

                {/* Tehran Central Hub Pin */}
                <div className="absolute top-[30%] right-[48%] flex flex-col items-center">
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-amber-500 shadow-[0_0_20px_#f59e0b] flex items-center justify-center text-slate-950 font-black text-[9px]">
                      A
                    </div>
                    <div className="absolute -inset-1.5 rounded-full border border-amber-400 animate-ping" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-amber-300 mt-1.5 bg-black/90 border border-amber-500/50 px-2 py-0.5 rounded-full">
                    مرکز تهران (مهندس مهدی دل زنده)
                  </span>
                </div>

                {/* Active Selected Cargo Tracker Floating Marker */}
                <div className="absolute top-[43%] right-[42%] flex flex-col items-center animate-bounce duration-1000">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-xl flex items-center gap-1.5 font-bold text-[10px]">
                    <Plane className="w-3.5 h-3.5" />
                    <span>بوئینگ ۷۷۷ کارگو (در ارتفاع ۳۱,۰۰۰ پا)</span>
                  </div>
                  <div className="w-2 h-2 bg-cyan-400 rotate-45 -mt-1" />
                </div>

                {/* Satellite Telemetry HUD overlay in corners */}
                <div className="absolute top-3 right-3 bg-slate-950/90 border border-cyan-500/40 rounded-xl p-2.5 text-[10px] font-mono space-y-1 text-slate-300">
                  <div className="text-cyan-400 font-bold flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
                    <span>Sentinel-2A LEO Satellite Active</span>
                  </div>
                  <div>Orbital Alt: 550.2 km | Speed: 7.6 km/s</div>
                  <div>Coverage: Global Anycast Multi-Carrier</div>
                </div>

                <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 text-[10px] font-mono text-slate-400 space-y-0.5">
                  <div>GPS Lock: <span className="text-emerald-400 font-bold">18 Satellites (Fixed)</span></div>
                  <div>Cargo Integrity: <span className="text-emerald-400 font-bold">100% Sealed</span></div>
                </div>
              </div>
            </div>

            {/* Cargo Manifest List & Telemetry Detail */}
            <div className="lg:col-span-4 rounded-3xl bg-slate-950/90 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-black text-slate-100">رهگیری مرسوله‌های زنده</h3>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Live Sync
                </span>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {cargos.map((cargo) => {
                  const isSelected = selectedCargo.id === cargo.id;
                  return (
                    <div
                      key={cargo.id}
                      onClick={() => setSelectedCargo(cargo)}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer space-y-2 ${
                        isSelected
                          ? 'bg-cyan-950/30 border-cyan-400 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {cargo.trackingNumber}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400">{cargo.platform}</span>
                      </div>

                      <div className="text-xs font-bold text-slate-200 leading-snug">
                        {cargo.itemTitle}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
                        <div>
                          <span className="text-slate-500 block">موقعیت فعلی:</span>
                          <span className="text-amber-300 font-bold truncate block">{cargo.currentLocation}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">زمان تخمینی (ETA):</span>
                          <span className="text-emerald-400 font-mono font-bold block">{cargo.eta}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>ناوگان: {cargo.carrierName.split(' ')[0]}</span>
                        <span className="text-cyan-400 font-bold">{cargo.satelliteTelemetry.containerTemp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Cargo Live Telemetry Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/20 border border-cyan-500/30 space-y-2 text-xs">
                <div className="text-[10px] text-cyan-400 font-bold font-mono">سنسورهای رله ماهواره‌ای LEO:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div>ماهواره ناظر: <strong className="text-slate-100">{selectedCargo.satelliteTelemetry.satelliteName.split(' ')[0]}</strong></div>
                  <div>سیگنال ماهواره: <strong className="text-emerald-400 font-mono">{selectedCargo.satelliteTelemetry.signalDbm} dBm</strong></div>
                  <div>دمای محفظه: <strong className="text-amber-300 font-mono">{selectedCargo.satelliteTelemetry.containerTemp}</strong></div>
                  <div>استعلام وضعیت: <strong className="text-emerald-400">{selectedCargo.satelliteTelemetry.lastPing}</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: کیف‌پول داخلی رمزارزی (کیف‌پول سرد و گرم)
         ========================================================================= */}
      {activeTab === 'wallets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hot Wallet Card */}
          <div className="rounded-3xl bg-slate-950/90 border-2 border-amber-500/40 p-6 space-y-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-100">کیف‌پول گرم در گردش (Hot Wallet)</h3>
                  <div className="text-[11px] text-slate-400">تراکنش‌های روزانه، تسویه تمو و شارژ سرویس‌ها</div>
                </div>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full font-mono font-bold">
                Online Hot
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono">موجودی در دسترس والت گرم:</span>
              <div className="text-2xl md:text-3xl font-black text-amber-400 font-mono">$24,580.00 USDT</div>
              <div className="text-xs text-slate-400">معادل تقریبی: ۲,۲۱۲,۰۰۰,۰۰۰ تومان</div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-slate-400 font-bold block">دارایی‌های تفکیکی در کیف‌پول گرم:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">تتر TRC20:</span>
                  <span className="font-mono text-emerald-400 font-bold">14,200.00 USDT</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">اتریوم (ETH):</span>
                  <span className="font-mono text-cyan-400 font-bold">2.45 ETH ($6,860)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">بیت‌کوین (BTC):</span>
                  <span className="font-mono text-amber-400 font-bold">0.035 BTC ($2,450)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">تون‌کوین (TON):</span>
                  <span className="font-mono text-indigo-400 font-bold">200 TON ($1,070)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => setCryptoWithdrawModal(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>برداشت سریع از والت گرم</span>
              </button>

              <button
                onClick={() => copyToClipboard('TYG84mDelZende5239HotWalletTRC20', 'hot-addr')}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'hot-addr' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'hot-addr' ? 'کپی شد' : 'آدرس واریز'}</span>
              </button>
            </div>
          </div>

          {/* Cold Wallet (Air-Gapped Vault) */}
          <div className="rounded-3xl bg-slate-950/90 border-2 border-indigo-500/40 p-6 space-y-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-100">کیف‌پول سرد ایزوله (Air-Gapped Cold Vault)</h3>
                  <div className="text-[11px] text-slate-400">ذخیره امن سرمایه بلندمدت و صندوق توسعه ۵٪</div>
                </div>
              </div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full font-mono font-bold">
                Hardware Multisig
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono">کل موجودی قفل‌شده در والت سرد:</span>
              <div className="text-2xl md:text-3xl font-black text-indigo-300 font-mono">$185,400.00 USD</div>
              <div className="text-xs text-slate-400">کلیدهای خصوصی در سخت‌افزار آفلاین بدون اتصال به اینترنت</div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-slate-400 font-bold block">پروتکل‌های حفاظتی والت سرد:</span>
              <ul className="space-y-2 text-[11px] text-slate-300">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>امضای چندگانه (۳ از ۴):</strong> نیازمند تایید فیزیکی لجر و کلید سخت‌افزاری</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>شناسه مالک رسمی:</strong> صدور مجوز خروج منحصراً با کد ملی ۵۲۳۹۷۷۵۳۳۸</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>قفل زمانی (Timelock):</strong> تاخیر ۲۴ ساعته برای تراکنش‌های کلان به همراه SMS فوری</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">Vault ID: AION-COLD-5239-OFFLINE</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                100% Unhackable
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: مسیرهای واریز بانکی ریالی و ارزی (شتاب، SEPA، SWIFT)
         ========================================================================= */}
      {activeTab === 'fiat-rails' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Iranian Shetab & Shaparak Rail */}
          <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                IR
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">واریز بانکی شتاب و شاپرک</h4>
                <div className="text-[10px] text-slate-400">ریال ایران (پایا / ساتنا / شبا)</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500">شماره شبای اختصاصی مالک:</span>
                <div className="font-mono text-emerald-400 font-bold text-[11px] ltr text-left">
                  IR42 0170 0000 0010 9910 9660 22
                </div>
                <div className="text-[10px] text-slate-300">بانک ملی ایران — بنام مهدی دل زنده</div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                واریز آنی از کلیه کارت‌های عضو شتاب با سقف مجاز روزانه ۲۰۰ میلیون تومان و تسویه خودکار ۲ ساعته.
              </div>
            </div>

            <button
              onClick={() => copyToClipboard('IR420170000000109910966022', 'shaba')}
              className="w-full py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'shaba' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'shaba' ? 'شماره شبا کپی شد' : 'کپی شماره شبا'}</span>
            </button>
          </div>

          {/* European SEPA Rail (EUR) */}
          <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
                EU
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">مسیر بانکی اروپایی SEPA</h4>
                <div className="text-[10px] text-slate-400">یورو (EUR Direct IBAN)</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500">شماره حساب IBAN فرانکفورت:</span>
                <div className="font-mono text-indigo-300 font-bold text-[11px] ltr text-left">
                  DE89 5001 0517 5239 7753 38
                </div>
                <div className="text-[10px] text-slate-300">BIC: DEUTDEDBFXX • Beneficiary: Mehdi Del Zende</div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                انتقال مستقیم یورو از تمام ۲۷ کشور حوزه یورو با کارمزد صفر درصد و تسویه همان‌روز.
              </div>
            </div>

            <button
              onClick={() => copyToClipboard('DE89500105175239775338', 'sepa')}
              className="w-full py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'sepa' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'sepa' ? 'IBAN کپی شد' : 'کپی IBAN اروپا'}</span>
            </button>
          </div>

          {/* International SWIFT & USD Escrow Rail */}
          <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                US
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">حواله ارزی SWIFT و درگاه جهانی</h4>
                <div className="text-[10px] text-slate-400">دلار آمریکا (USD Wire & Stripe)</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500">Routing / Swift Code:</span>
                <div className="font-mono text-amber-300 font-bold text-[11px] ltr text-left">
                  CHASUS33 • Chase Manhattan NY
                </div>
                <div className="text-[10px] text-slate-300">Account: 8841-5239775338 • StudioDelzendehAi</div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed">
                دریافت خودکار عواید فروشگاه‌های تمو و علی‌بابا با تضمین صرافی‌های قانونی امارات.
              </div>
            </div>

            <button
              onClick={() => copyToClipboard('CHASUS33-88415239775338', 'swift')}
              className="w-full py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'swift' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'swift' ? 'مشخصات SWIFT کپی شد' : 'کپی مشخصات SWIFT'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: قراردادهای امانی ضامن خرید (Escrow Smart Contract)
         ========================================================================= */}
      {activeTab === 'escrow' && (
        <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-100">سیستم قرارداد هوشمند امانی (Escrow Protection)</h3>
              <div className="text-xs text-slate-400">تضمین عدم اتلاف سرمایه در خریدهای بین‌المللی و داخلی</div>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-mono font-bold">
              100% Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-amber-400">مرحله ۱: قفل وجه در قرارداد هوشمند</span>
              <p className="text-slate-300 leading-relaxed">
                هنگام ثبت سفارش در علی‌بابا یا تمو، هزینه در قرارداد هوشمند بلاکچین امانت می‌ماند و به حساب تامین‌کننده منتقل نمی‌شود.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-cyan-400">مرحله ۲: اسکن ماهواره‌ای تایید بارگیری</span>
              <p className="text-slate-300 leading-relaxed">
                ماهواره‌های LEO بارنامه بارگیری کشتی یا هواپیما را استعلام نموده و سلامت کانتینر را ثبت می‌کنند.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400">مرحله ۳: آزادسازی با تحویل قطعی</span>
              <p className="text-slate-300 leading-relaxed">
                با تحویل به انبار مقصد و اسکن بارکد توسط انباردار یا مشتری، تسویه حساب نهایی تامین‌کننده صادر می‌شود.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Crypto Withdrawal Modal */}
      {cryptoWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-black text-slate-100">برداشت امن رمزارزی (Crypto Withdrawal)</h3>
              </div>
              <button
                onClick={() => setCryptoWithdrawModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteWithdrawal} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-bold">انتخاب ارز و شبکه:</label>
                <select
                  value={withdrawCurrency}
                  onChange={(e) => setWithdrawCurrency(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-amber-400"
                >
                  <option value="USDT-TRC20">USDT (Tether - Tron TRC20)</option>
                  <option value="ETH">ETH (Ethereum Mainnet)</option>
                  <option value="BTC">BTC (Bitcoin Native SegWit)</option>
                  <option value="TON">TON (The Open Network)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">مقدار برداشت:</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">آدرس کیف‌پول مقصد:</label>
                <input
                  type="text"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-amber-400 text-left ltr"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center justify-between">
                  <span>کارمزد شبکه (Gas Fee):</span>
                  <span className="font-mono text-emerald-400 font-bold">1.2 USDT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>امضای تاییدیه:</span>
                  <span className="text-amber-300 font-bold">مهندس مهدی دل زنده (۵۲۳۹۷۷۵۳۳۸)</span>
                </div>
              </div>

              {txSuccessMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs">
                  {txSuccessMessage}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCryptoWithdrawModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isProcessingTx}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer disabled:opacity-50"
                >
                  {isProcessingTx ? 'در حال ثبت در بلاکچین...' : 'تایید نهایی و ارسال'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
