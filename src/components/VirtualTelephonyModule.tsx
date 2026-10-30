import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageSquare,
  Globe,
  ShieldCheck,
  Award,
  CheckCircle2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  Server,
  Layers,
  Key,
  Users,
  Clock,
  Send,
  Download,
  Share2,
  Settings,
  HelpCircle,
  Radio
} from 'lucide-react';

interface VirtualNumber {
  id: string;
  country: string;
  countryFa: string;
  flag: string;
  city: string;
  cityFa: string;
  number: string;
  type: 'fixed' | 'toll-free' | 'mobile';
  typeFa: string;
  monthlyFeeUsd: number;
  status: 'active' | 'provisioned';
  features: {
    voice: boolean;
    video: boolean;
    sms: boolean;
    fax: boolean;
    ivr: boolean;
  };
  sipServer: string;
  allocatedTo: string;
  ownerNationalId: string;
}

export function VirtualTelephonyModule() {
  const [activeTab, setActiveTab] = useState<'numbers' | 'voice-dialer' | 'video-room' | 'sms-hub' | 'ivr-flow'>('numbers');
  const [selectedNumberId, setSelectedNumberId] = useState<string>('num-usa-ny');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Voice dialer state
  const [dialInput, setDialInput] = useState<string>('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHeld, setIsHeld] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [liveTranscription, setLiveTranscription] = useState<string[]>([]);

  // Video call state
  const [isVideoConnected, setIsVideoConnected] = useState<boolean>(false);
  const [videoCameraEnabled, setVideoCameraEnabled] = useState<boolean>(true);
  const [videoMicEnabled, setVideoMicEnabled] = useState<boolean>(true);
  const [videoScreenSharing, setVideoScreenSharing] = useState<boolean>(false);
  const [videoRoomId, setVideoRoomId] = useState<string>('aion-room-delzende-5239');

  // SMS hub state
  const [smsRecipient, setSmsRecipient] = useState<string>('+1 212 555 0199');
  const [smsText, setSmsText] = useState<string>('');
  const [smsThreads, setSmsThreads] = useState<Array<{ id: string; from: string; to: string; text: string; time: string; direction: 'in' | 'out' }>>([
    {
      id: 'sms-1',
      from: '+1 415 889 4200 (سانفرانسیسکو مالک)',
      to: '+1 212 555 0199',
      text: 'سلام، قرارداد سرویس هوش مصنوعی AIONVERSE توسط مهندس مهدی دل زنده تأیید شد.',
      time: '۱۰:۲۴ ق.ظ',
      direction: 'out'
    },
    {
      id: 'sms-2',
      from: '+1 212 555 0199 (نیویورک پارتنر)',
      to: '+1 415 889 4200',
      text: 'دریافت شد. شماره ثابت سانفرانسیسکو شما در سیستم شرکت‌های سیلیکون ولی ثبت رسمی گردید.',
      time: '۱۰:۲۶ ق.ظ',
      direction: 'in'
    }
  ]);

  const virtualNumbers: VirtualNumber[] = [
    {
      id: 'num-usa-ny',
      country: 'United States',
      countryFa: 'ایالات متحده آمریکا',
      flag: '🇺🇸',
      city: 'New York (Manhattan)',
      cityFa: 'نیویورک (منهتن)',
      number: '+1 212 947-8100',
      type: 'fixed',
      typeFa: 'خط ثابت تجاری منهتن',
      monthlyFeeUsd: 12,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: true, ivr: true },
      sipServer: 'sip.us-east.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳۸'
    },
    {
      id: 'num-usa-sf',
      country: 'United States',
      countryFa: 'ایالات متحده آمریکا',
      flag: '🇺🇸',
      city: 'San Francisco (Silicon Valley)',
      cityFa: 'سانفرانسیسکو (سیلیکون ولی)',
      number: '+1 415 889-4200',
      type: 'fixed',
      typeFa: 'خط ثابت هوش مصنوعی و فناوری',
      monthlyFeeUsd: 14,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: false, ivr: true },
      sipServer: 'sip.us-west.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳۸'
    },
    {
      id: 'num-uk-london',
      country: 'United Kingdom',
      countryFa: 'انگلستان',
      flag: '🇬🇧',
      city: 'London (Financial District)',
      cityFa: 'لندن (منطقه مالی سیتی)',
      number: '+44 20 7946 0912',
      type: 'fixed',
      typeFa: 'خط ثابت بین‌المللی لندن',
      monthlyFeeUsd: 11,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: true, ivr: true },
      sipServer: 'sip.eu-west.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳۸'
    },
    {
      id: 'num-germany-fra',
      country: 'Germany',
      countryFa: 'آلمان',
      flag: '🇩🇪',
      city: 'Frankfurt (Main)',
      cityFa: 'فرانکفورت (مرکز داده اروپا)',
      number: '+49 69 9000 8123',
      type: 'fixed',
      typeFa: 'خط ثابت رسمی اتحادیه اروپا',
      monthlyFeeUsd: 13,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: true, ivr: true },
      sipServer: 'sip.eu-central.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳۸'
    },
    {
      id: 'num-uae-dubai',
      country: 'United Arab Emirates',
      countryFa: 'امارات متحده عربی',
      flag: '🇦🇪',
      city: 'Dubai (DIFC Financial Centre)',
      cityFa: 'دبی (منطقه آزاد مالی DIFC)',
      number: '+971 4 398 5544',
      type: 'fixed',
      typeFa: 'خط ثابت خاورمیانه و تجارت آزاد',
      monthlyFeeUsd: 22,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: false, ivr: true },
      sipServer: 'sip.me-south.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳۸'
    },
    {
      id: 'num-japan-tokyo',
      country: 'Japan',
      countryFa: 'ژاپن',
      flag: '🇯🇵',
      city: 'Tokyo (Chiyoda)',
      cityFa: 'توکیو (منطقه فناوری چیویدا)',
      number: '+81 3 5555 7890',
      type: 'fixed',
      typeFa: 'خط ثابت آسیا-اقیانوسیه',
      monthlyFeeUsd: 18,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: true, ivr: true },
      sipServer: 'sip.ap-northeast.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳۸'
    },
    {
      id: 'num-canada-toronto',
      country: 'Canada',
      countryFa: 'کانادا',
      flag: '🇨🇦',
      city: 'Toronto (Bay Street)',
      cityFa: 'تورنتو (منطقه اقتصادی بی استریت)',
      number: '+1 416 901-3322',
      type: 'fixed',
      typeFa: 'خط ثابت آمریکای شمالی',
      monthlyFeeUsd: 10,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: false, ivr: true },
      sipServer: 'sip.ca-central.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳۸'
    },
    {
      id: 'num-france-paris',
      country: 'France',
      countryFa: 'فرانسه',
      flag: '🇫🇷',
      city: 'Paris (La Défense)',
      cityFa: 'پاریس (مرکز تجاری لادفانس)',
      number: '+33 1 42 68 55 00',
      type: 'fixed',
      typeFa: 'خط ثابت تجاری فرانسه',
      monthlyFeeUsd: 12,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: true, ivr: true },
      sipServer: 'sip.eu-west.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳۸'
    },
    {
      id: 'num-turkey-ist',
      country: 'Turkey',
      countryFa: 'ترکیه',
      flag: '🇹🇷',
      city: 'Istanbul (Levent)',
      cityFa: 'استانبول (منطقه مالی لِوِنت)',
      number: '+90 212 334 8877',
      type: 'fixed',
      typeFa: 'خط ثابت تجاری منطقه اوراسیا',
      monthlyFeeUsd: 9,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: false, ivr: true },
      sipServer: 'sip.tr-central.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳8'
    },
    {
      id: 'num-australia-syd',
      country: 'Australia',
      countryFa: 'استرالیا',
      flag: '🇦🇺',
      city: 'Sydney (CBD)',
      cityFa: 'سیدنی (مرکز تجاری)',
      number: '+61 2 9112 4433',
      type: 'fixed',
      typeFa: 'خط ثابت اقیانوسیه',
      monthlyFeeUsd: 15,
      status: 'active',
      features: { voice: true, video: true, sms: true, fax: false, ivr: true },
      sipServer: 'sip.au-east.aionverse.io:5061 (TLS)',
      allocatedTo: 'مهندس مهدی دل زنده (مهدی دل زنده)',
      ownerNationalId: '۵۲۳۹۷۷۵۳۳۸'
    }
  ];

  const currentSelectedNumber = virtualNumbers.find((n) => n.id === selectedNumberId) || virtualNumbers[0];

  // Call timer simulation
  useEffect(() => {
    let interval: any;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleStartCall = () => {
    if (!dialInput.trim()) return;
    setCallStatus('calling');
    setLiveTranscription([`[۰.۰۰] تماس در حال برقراری با ${dialInput} از طریق خط ${currentSelectedNumber.number}...`]);
    setTimeout(() => {
      setCallStatus('connected');
      setLiveTranscription((prev) => [
        ...prev,
        `[۰.۰۴] تماس با موفقیت برقرار شد. کیفیت صدا: HD Voice (Opus Codec / 48kHz).`,
        `[۰.۰۸] هوش مصنوعی رونوشت‌بردار فعال است: در حال تبدیل صدای طرفین به متن...`
      ]);
    }, 2000);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setLiveTranscription((prev) => [...prev, `[پایان] مکالمه پایان یافت. مدت زمان: ${formatDuration(callDuration)}. لاگ در R2 ذخیره شد.`]);
    setTimeout(() => {
      setCallStatus('idle');
    }, 1500);
  };

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsText.trim()) return;
    const newMsg = {
      id: `sms-${Date.now()}`,
      from: `${currentSelectedNumber.number} (${currentSelectedNumber.cityFa})`,
      to: smsRecipient,
      text: smsText,
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      direction: 'out' as const
    };
    setSmsThreads([...smsThreads, newMsg]);
    setSmsText('');

    // Simulate auto-reply after 2.5s
    setTimeout(() => {
      const autoReply = {
        id: `sms-reply-${Date.now()}`,
        from: smsRecipient,
        to: currentSelectedNumber.number,
        text: `دریافت شد. پاسخ خودکار تاییدیه از درگاه بین‌المللی مخابراتی برای مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸).`,
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        direction: 'in' as const
      };
      setSmsThreads((prev) => [...prev, autoReply]);
    }, 2500);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-slate-900 to-amber-500/10 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Globe className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2 flex-wrap">
              <span>سامانه تلفن مجازی بین‌المللی ثابت (VoIP / WebRTC Enterprise)</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-mono border border-amber-500/30">
                صاحب امتیاز: مهندس مهدی دل زنده
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>کد ملی: ۵۲۳۹۷۷۵۳۳۸</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-cyan-300">
                <span>تلفن رسمی: ۰۹۹۱۰۹۶۶۰۲۲</span>
              </span>
              <span>•</span>
              <span className="text-amber-300 font-mono">
                ۱۰ خط ثابت بین‌المللی در ۸ کشور اقتصادی بزرگ جهان
              </span>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-bold flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('numbers')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'numbers' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>شماره‌های فعال ({virtualNumbers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('voice-dialer')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'voice-dialer' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>شماره‌گیر صوتی HD</span>
          </button>
          <button
            onClick={() => setActiveTab('video-room')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'video-room' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>اتاق تماس تصویری</span>
          </button>
          <button
            onClick={() => setActiveTab('sms-hub')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sms-hub' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>پیامک و چت بین‌الملل</span>
          </button>
          <button
            onClick={() => setActiveTab('ivr-flow')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ivr-flow' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>تلفن گویای هوشمند (IVR)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Virtual Numbers Portfolio */}
      {activeTab === 'numbers' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-200">
                  تأییدیه مالکیت انحصاری خطوط ثابت بین‌المللی سازمانی
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  کلیه خطوط تلفن ثابت نیویورک، لندن، فرانکفورت، دبی، توکیو، پاریس، تورنتو و استانبول با پروتکل SIP TLS 1.3 و رمزنگاری SRTP بنام <strong className="text-amber-300">مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸)</strong> فعال و آماده برقراری تماس صوتی، تصویری و پیامک است.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                10 Dedicated DIDs Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {virtualNumbers.map((num) => (
              <div
                key={num.id}
                className={`bg-slate-900/70 border rounded-2xl p-5 space-y-4 transition flex flex-col justify-between ${
                  selectedNumberId === num.id
                    ? 'border-amber-500 shadow-lg shadow-amber-500/10 bg-slate-900'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{num.flag}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{num.countryFa}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{num.city}</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold border border-emerald-500/30">
                      فعال و آنلاین
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400">شماره خط ثابت اختصاصی:</div>
                      <div className="text-base font-black font-mono text-amber-300 dir-ltr">{num.number}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(num.number, `num-${num.id}`)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                      title="کپی شماره"
                    >
                      {copiedKey === `num-${num.id}` ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>نوع سرویس:</span>
                      <span className="text-slate-200 font-medium">{num.typeFa}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>مالک ثبتی:</span>
                      <span className="text-amber-300 font-bold">{num.allocatedTo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>کد ملی احراز هویت:</span>
                      <span className="text-emerald-400 font-mono font-bold">{num.ownerNationalId}</span>
                    </div>
                  </div>

                  {/* Feature Badges */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 flex-wrap">
                    {num.features.voice && (
                      <span className="text-[9px] bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
                        تماس صوتی
                      </span>
                    )}
                    {num.features.video && (
                      <span className="text-[9px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded font-mono">
                        تماس تصویری
                      </span>
                    )}
                    {num.features.sms && (
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                        پیامک بین‌الملل
                      </span>
                    )}
                    {num.features.ivr && (
                      <span className="text-[9px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                        تلفن گویا IVR
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedNumberId(num.id);
                      setDialInput('');
                      setActiveTab('voice-dialer');
                    }}
                    className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Phone className="w-3 h-3" />
                    <span>برقراری تماس</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNumberId(num.id);
                      setActiveTab('sms-hub');
                    }}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 transition cursor-pointer"
                    title="ارسال پیامک با این خط"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedNumberId(num.id);
                      setActiveTab('video-room');
                    }}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 transition cursor-pointer"
                    title="شروع کنفرانس تصویری"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: HD Voice Calling Dialer */}
      {activeTab === 'voice-dialer' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Keypad */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-xs text-slate-400 flex items-center justify-between">
                <span>خط مبدأ خروجی تماس:</span>
                <span className="text-amber-300 font-mono font-bold">{currentSelectedNumber.number}</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={dialInput}
                  onChange={(e) => setDialInput(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-lg font-mono font-bold text-center text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
                  dir="ltr"
                />
                {dialInput && (
                  <button
                    onClick={() => setDialInput('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Dialpad buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { digit: '1', sub: '' },
                { digit: '2', sub: 'ABC' },
                { digit: '3', sub: 'DEF' },
                { digit: '4', sub: 'GHI' },
                { digit: '5', sub: 'JKL' },
                { digit: '6', sub: 'MNO' },
                { digit: '7', sub: 'PQRS' },
                { digit: '8', sub: 'TUV' },
                { digit: '9', sub: 'WXYZ' },
                { digit: '*', sub: '' },
                { digit: '0', sub: '+' },
                { digit: '#', sub: '' }
              ].map((btn) => (
                <button
                  key={btn.digit}
                  onClick={() => setDialInput((prev) => prev + btn.digit)}
                  className="p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-center transition cursor-pointer active:scale-95 flex flex-col items-center justify-center"
                >
                  <span className="text-lg font-bold font-mono text-slate-100">{btn.digit}</span>
                  {btn.sub && <span className="text-[9px] text-slate-500 font-mono">{btn.sub}</span>}
                </button>
              ))}
            </div>

            {/* Call Action Button */}
            <div className="pt-2">
              {callStatus === 'idle' || callStatus === 'ended' ? (
                <button
                  onClick={handleStartCall}
                  disabled={!dialInput.trim()}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition disabled:opacity-40 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>برقراری تماس بین‌المللی با کیفیت HD</span>
                </button>
              ) : (
                <button
                  onClick={handleEndCall}
                  className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-rose-600/30"
                >
                  <PhoneOff className="w-5 h-5" />
                  <span>قطع تماس ({formatDuration(callDuration)})</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Call HUD & AI Real-Time Transcription */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      callStatus === 'connected'
                        ? 'bg-emerald-500/20 text-emerald-400 animate-pulse'
                        : callStatus === 'calling'
                        ? 'bg-amber-500/20 text-amber-400 animate-bounce'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">
                      وضعیت مکالمه: {callStatus === 'idle' && 'آماده شماره‌گیری'}
                      {callStatus === 'calling' && 'در حال اتصال به شبکه بین‌الملل...'}
                      {callStatus === 'connected' && `مکالمه فعال (${formatDuration(callDuration)})`}
                      {callStatus === 'ended' && 'تماس قطع شد'}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-mono">
                      کدک: Opus HD Voice • لتنسی: ۱۸ میلی‌ثانیه • رمزنگاری: SRTP AES-256
                    </div>
                  </div>
                </div>

                {callStatus === 'connected' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        isMuted ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        isRecording ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                      title="ضبط و ذخیره ابری مکالمه در R2"
                    >
                      <Square className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Live Transcription Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>رونوشت بلادرنگ هوش مصنوعی (Live AI Speech-to-Text):</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Auto-Language Translation</span>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 min-h-56 max-h-72 overflow-y-auto space-y-2 font-mono text-xs text-slate-300">
                  {liveTranscription.length === 0 ? (
                    <div className="text-slate-600 text-center py-12 font-sans">
                      شماره مورد نظر را شماره‌گیری نمایید تا همزمان متن مکالمه و ترجمه زنده روی صفحه نمایش داده شود.
                    </div>
                  ) : (
                    liveTranscription.map((line, i) => (
                      <div key={i} className="leading-relaxed border-r-2 border-amber-500/40 pr-2">
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
              <div>مالک حساب مخابراتی: <strong className="text-slate-200">مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸)</strong></div>
              <div className="text-cyan-300 font-mono">SIP Gateway: sip.us-east.aionverse.io</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: HD Video Calling & Conference Room */}
      {activeTab === 'video-room' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>اتاق ویدیوکنفرانس امن با کیفیت 4K WebRTC</span>
                <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  E2E Encrypted Room
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                اتصال مستقیم به خطوط ثابت بین‌المللی با قابلیت دعوت از شرکت‌های خارجی از طریق لینک یا تماس مستقیم
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsVideoConnected(!isVideoConnected)}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer ${
                  isVideoConnected ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>{isVideoConnected ? 'خروج از جلسه تصویری' : 'ورود به جلسه تصویری'}</span>
              </button>
            </div>
          </div>

          {/* Video Preview Canvas */}
          <div className="relative aspect-video max-h-[460px] w-full bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {isVideoConnected ? (
              <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center">
                {/* Simulated Participant Feed */}
                <div className="text-center space-y-3">
                  <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center text-3xl font-bold font-mono">
                    MD
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">مهندس مهدی دل زنده (میزبان رسمی)</h4>
                    <div className="text-xs text-emerald-400 font-mono mt-0.5">WebRTC Ultra-HD 60FPS • متصل به خط نیویورک</div>
                  </div>
                </div>

                {/* Picture in Picture */}
                <div className="absolute bottom-4 right-4 w-40 h-28 bg-slate-900/90 border border-slate-700 rounded-2xl overflow-hidden p-2 flex flex-col justify-between">
                  <div className="text-[10px] text-slate-400 font-mono">AI Partner (London)</div>
                  <div className="text-center text-xs text-slate-300 font-bold">+44 20 7946 0912</div>
                  <div className="text-[9px] text-emerald-400">صدا و تصویر فعال</div>
                </div>

                {/* Floating HUD controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-700 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-3">
                  <button
                    onClick={() => setVideoMicEnabled(!videoMicEnabled)}
                    className={`p-2.5 rounded-xl transition cursor-pointer ${
                      videoMicEnabled ? 'bg-slate-800 text-slate-200' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {videoMicEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setVideoCameraEnabled(!videoCameraEnabled)}
                    className={`p-2.5 rounded-xl transition cursor-pointer ${
                      videoCameraEnabled ? 'bg-slate-800 text-slate-200' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {videoCameraEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setVideoScreenSharing(!videoScreenSharing)}
                    className={`p-2.5 rounded-xl transition cursor-pointer ${
                      videoScreenSharing ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-200'
                    }`}
                    title="اشتراک صفحه نمایش"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 p-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
                  <VideoOff className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-slate-300">دوربین و جلسه تصویری در حالت آماده‌باش</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  روی دکمه «ورود به جلسه تصویری» کلیک کنید تا ارتباط تصویری همتا‌به‌همتا (P2P) با طرف مقابل برقرار شود.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: International SMS & Messaging Hub */}
      {activeTab === 'sms-hub' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Threads list */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="text-xs font-bold text-slate-200 flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>گفتگوهای فعال پیامکی</span>
              </span>
              <span className="text-[10px] text-amber-300 font-mono">SMS Global Hub</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-1 cursor-pointer">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">+1 212 555 0199</span>
                  <span className="text-[10px] text-slate-500">۱۰:۲۶</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  دریافت شد. شماره ثابت سانفرانسیسکو شما در سیستم شرکت‌های سیلیکون ولی...
                </div>
              </div>
            </div>
          </div>

          {/* Chat thread & Send box */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span>ارسال پیامک با خط:</span>
                    <span className="text-amber-300 font-mono font-black">{currentSelectedNumber.number}</span>
                  </h4>
                  <div className="text-[10px] text-slate-400">
                    مسیریابی از طریق دروازه مخابراتی مستقیم (Tier 1 Direct Route) با تحویل آنی
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  Global DLR Active
                </div>
              </div>

              {/* Message bubbles */}
              <div className="space-y-3 min-h-64 max-h-80 overflow-y-auto p-3 bg-slate-950 rounded-2xl border border-slate-800/80">
                {smsThreads.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.direction === 'out' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.direction === 'out'
                          ? 'bg-amber-500 text-slate-950 font-medium rounded-bl-none'
                          : 'bg-slate-800 text-slate-200 rounded-br-none border border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] opacity-75 mb-1 font-mono">{msg.from}</div>
                      <div>{msg.text}</div>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Input box */}
            <form onSubmit={handleSendSms} className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={smsRecipient}
                  onChange={(e) => setSmsRecipient(e.target.value)}
                  placeholder="شماره گیرنده به همراه کد کشور (+1 ...)"
                  className="w-1/2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
                  dir="ltr"
                />
                <span className="text-[11px] text-slate-400">تعداد کاراکتر: {smsText.length}/160</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={smsText}
                  onChange={(e) => setSmsText(e.target.value)}
                  placeholder="متن پیامک رسمی را وارد کنید..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={!smsText.trim()}
                  className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition disabled:opacity-40 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>ارسال</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 5: IVR & Auto-Attendant Flow */}
      {activeTab === 'ivr-flow' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                درخت تلفن گویای هوشمند چندزبانه (Interactive Voice Response - IVR)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                پاسخگویی خودکار با صدای عصبی باکیفیت به تماس‌گیرندگان بین‌المللی خطوط مهندس مهدی دل زنده
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                  کلید ۱
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">اتصال به ایجنت‌ها</span>
              </div>
              <h4 className="text-xs font-bold text-slate-200">هوش مصنوعی و پشتیبانی فنی ۲۴/۷</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                تماس‌گیرنده بلافاصله با ایجنت صوتی بلادرنگ (Realtime Neural Voice) متصل شده و به سوالات به ۵۰ زبان زنده پاسخ داده می‌شود.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                  کلید ۲
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">دفتر اختصاصی مالک</span>
              </div>
              <h4 className="text-xs font-bold text-slate-200">دفتر مهندس مهدی دل زنده (مالک سازمان)</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                دایورت فوری به خط مستقیم ۰۹۹۱۰۹۶۶۰۲۲ با ارسال نوتیفیکیشن همزمان روی گوشی همراه مالک و ضبط پیش‌پیام مخاطب.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                  کلید ۳
                </span>
                <span className="text-[10px] text-amber-400 font-mono">صندوق توسعه ۵٪</span>
              </div>
              <h4 className="text-xs font-bold text-slate-200">امور مالی، قراردادها و فروشگاه جهانی</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                استعلام خودکار فاکتورها، وضعیت تسویه‌حساب فروشگاه علی‌بابا و تمو، و ارسال لینک رهگیری از طریق پیامک به مشتری.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
