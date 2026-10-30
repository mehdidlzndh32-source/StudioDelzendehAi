import React, { useState, useEffect, useRef } from 'react';
import {
  Music,
  Mic,
  Headphones,
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Download,
  Share2,
  DollarSign,
  TrendingUp,
  Award,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  Sliders,
  Layers,
  FileText,
  Send,
  Zap,
  Package,
  ExternalLink,
  RefreshCw,
  Repeat,
  Flame,
  BarChart3
} from 'lucide-react';

interface AudioTrack {
  id: string;
  title: string;
  titleEn: string;
  genre: string;
  genreFa: string;
  bpm: number;
  duration: string;
  durationSeconds: number;
  key: string;
  vocalType: 'instrumental' | 'male-neural' | 'female-neural' | 'choir';
  vocalTypeFa: string;
  coverEmoji: string;
  description: string;
  lyrics: string;
  streams: string;
  earningsUsd: number;
  tags: string[];
  isExclusive: boolean;
}

interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  titleFa: string;
  host: string;
  guest: string;
  duration: string;
  category: string;
  releaseDate: string;
  views: string;
  monetizedStatus: 'active' | 'in_review';
  revenueUsd: number;
  summary: string;
  chapters: Array<{ time: string; title: string }>;
}

export function MusicPodcastFactoryModule() {
  const [activeTab, setActiveTab] = useState<'music-studio' | 'podcasts' | 'monetization' | 'editions' | 'commerce'>('music-studio');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Audio Player State
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>('track-1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackProgress, setPlaybackProgress] = useState<number>(35);
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioCtxSupported, setAudioCtxSupported] = useState<boolean>(true);

  // Music Generator State
  const [promptGenre, setPromptGenre] = useState<string>('Cinematic Ambient & Synthwave');
  const [promptMood, setPromptMood] = useState<string>('کهکشانی، الهام‌بخش، کوانتومی');
  const [promptTempo, setPromptTempo] = useState<number>(95);
  const [promptVocals, setPromptVocals] = useState<string>('mixed-persian-fusion');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [publishedTrackId, setPublishedTrackId] = useState<string | null>(null);

  // Audio Context Tone Synthesizer for Real Interactive Sound
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const tracks: AudioTrack[] = [
    {
      id: 'track-1',
      title: 'مدار کهکشان و رقص ذرات کوانتوم',
      titleEn: 'Orbit of the Cosmic Void (Quantum Mix)',
      genre: 'Cinematic Ambient & Space Synthwave',
      genreFa: 'سینمایی امبینت کهکشانی و سینث‌ویو',
      bpm: 92,
      duration: '03:45',
      durationSeconds: 225,
      key: 'D Minor (ر مینور)',
      vocalType: 'instrumental',
      vocalTypeFa: 'بی‌کلام با زمزمه اثیری',
      coverEmoji: '🌌',
      description: 'تنظیم تخصصی با بیس‌های آنالوگ گرم و پدهای کهکشانی؛ الهام گرفته از چرخش کهکشان و شکوه منظومه شمسی.',
      lyrics: '[اینترو اتمسفریک] — سکوت فضا... جرقه‌های نورانی کوانتومی... هر فروریختنی آغاز یک مسیر با ویژگی‌های باشکوه‌تر است.',
      streams: '۲۴۰,۵۰۰',
      earningsUsd: 842.00,
      tags: ['#AIONVERSE', '#SpaceMusic', '#Cinematic', '#MehdiDelzende'],
      isExclusive: true
    },
    {
      id: 'track-2',
      title: 'سلوک در افق‌های بی‌کران (تلفیقی سنتی و الکترونیک)',
      titleEn: 'Ascendance of the Sovereign Mind (Persian Fusion)',
      genre: 'Persian Fusion & Neural Lofi',
      genreFa: 'فیوژن تار و سنتور با بیت‌های مدرن',
      bpm: 85,
      duration: '04:12',
      durationSeconds: 252,
      key: 'E Phrygian (همایون مدرن)',
      vocalType: 'male-neural',
      vocalTypeFa: 'صدای خواننده مرد با هوش مصنوعی',
      coverEmoji: '🎶',
      description: 'ترکیب بی‌نظیر دستگاه همایون ایرانی با ساب‌بیس‌های مدرن ۸۰۸ و هارمونی‌های چندصدایی.',
      lyrics: 'از میان تاریکی شب تا دل کهکشان / می‌درخشد خورشید در مدار جاودان / فنا کجاست وقتی تغییر آغاز شکفتن است...',
      streams: '۱۸۵,۳۰۰',
      earningsUsd: 648.50,
      tags: ['#PersianFusion', '#AIComposer', '#LofiPersian', '#MehdiDelzende'],
      isExclusive: true
    },
    {
      id: 'track-3',
      title: 'نبض کارآفرینی و ایجنت‌های سازمانی',
      titleEn: 'Pulse of Enterprise AI (Future Bass)',
      genre: 'Future Bass & Tech House',
      genreFa: 'تک‌هاوس و فیوچربیس انگیزشی',
      bpm: 126,
      duration: '03:15',
      durationSeconds: 195,
      key: 'A Minor (لا مینور)',
      vocalType: 'female-neural',
      vocalTypeFa: 'وکال زنانه انرژی‌بخش هوش مصنوعی',
      coverEmoji: '⚡',
      description: 'موسیقی ترند مخصوص ویدیوهای ریلز اینستاگرام، تیک‌تاک و یوتیوب شورتس با انرژی بسیار بالا.',
      lyrics: 'Build the future, scale the dream / Autonomous agents, sovereign team / We rise beyond the code...',
      streams: '۳۱۰,۰۰۰',
      earningsUsd: 1085.00,
      tags: ['#TechHouse', '#ViralSound', '#StartupMotivation'],
      isExclusive: false
    },
    {
      id: 'track-4',
      title: 'آرامش ۴۳۲ هرتز و درمان شناختی CBT',
      titleEn: '432Hz Healing Frequency & Mind Relaxation',
      genre: 'Meditation & Binaural Healing',
      genreFa: 'فرکانس آرامش‌بخش ۴۳۲ هرتز و مدیتیشن',
      bpm: 60,
      duration: '06:30',
      durationSeconds: 390,
      key: 'C Major (دو ماژور)',
      vocalType: 'instrumental',
      vocalTypeFa: 'آکوستیک آرامش‌بخش',
      coverEmoji: '🧘',
      description: 'فرکانس‌های بای‌نورال جهت کاهش اضطراب، تمرکز کاری، درمان وسواس فکری و خواب عمیق.',
      lyrics: '[صدای آرامش‌بخش جریان آب و باد، همراه با ارتعاش فرکانس ۴۳۲ هرتز کاسه‌های تبتی]',
      streams: '۴۲۰,۸۰۰',
      earningsUsd: 1472.80,
      tags: ['#432Hz', '#CBTTherapy', '#DeepSleep', '#Mindfulness'],
      isExclusive: true
    }
  ];

  const podcastEpisodes: PodcastEpisode[] = [
    {
      id: 'ep-1',
      episodeNumber: 1,
      title: 'The Blueprint of Autonomous Super-Apps & Sovereign AI',
      titleFa: 'معماری سوپراپلیکیشن‌های خودگردان و هوش مصنوعی مستقل',
      host: 'مهندس مهدی دل زنده (موسس و بنیان‌گذار)',
      guest: 'ایجنت ارشد هوش مصنوعی AION-Core #1',
      duration: '۲۸:۴۰',
      category: 'فناوری و استارتاپ',
      releaseDate: '۱۴۰۵/۰۸/۰۸',
      views: '۴۲,۶۰۰',
      monetizedStatus: 'active',
      revenueUsd: 380.00,
      summary: 'بررسی جامع نحوه استقرار سوپراپلیکیشن روی ۳۳۰ شهر لبه کلودفلر، ادغام ایجنت‌های ۲۵گانه، و جلوگیری از خطای توهم مدل‌ها.',
      chapters: [
        { time: '00:00', title: 'مقدمه و چشم‌انداز اکوسیستم مهندس مهدی دل زنده' },
        { time: '06:15', title: 'چرا وب‌جی‌ال و Three.js جایگزین اپ‌های سنتی شدند؟' },
        { time: '14:30', title: 'اتصال به فروشگاه‌های جهانی علی‌بابا و تمو' },
        { time: '22:00', title: 'صندوق توسعه ۵٪ و تضمین درآمدهای ارزی' }
      ]
    },
    {
      id: 'ep-2',
      episodeNumber: 2,
      title: 'Cross-Border Dropshipping & Arbitrage Mastery with Temu & Alibaba',
      titleFa: 'اسرار تجارت الکترونیک فرامرزی و همکاری در فروش جهانی',
      host: 'مهندس مهدی دل زنده (موسس و بنیان‌گذار)',
      guest: 'ایجنت کاوشگر ترندها TrendFinder #8',
      duration: '۳۴:۱۵',
      category: 'کسب‌وکار بین‌الملل',
      releaseDate: '۱۴۰۵/۰۸/۰۶',
      views: '۵۶,۸۰۰',
      monetizedStatus: 'active',
      revenueUsd: 520.00,
      summary: 'تحلیل گام‌به‌گام نحوه پیدا کردن محصولات با حاشیه سود ۶۵٪ در کارخانجات چین، مقایسه قیمت با آمازون و انتشار خودکار در شبکه‌های اجتماعی.',
      chapters: [
        { time: '00:00', title: 'مفاهیم آربیتراژ و همکاری در فروش مدرن' },
        { time: '08:45', title: 'نحوه محاسبه سود خالص و هزینه‌های گمرک' },
        { time: '18:10', title: 'چرخه حیات تبلیغات در ریلز و تیک‌تاک' },
        { time: '27:50', title: 'تسویه ریالی با شتاب و رمزارزی با تتر' }
      ]
    },
    {
      id: 'ep-3',
      episodeNumber: 3,
      title: 'Cosmic Philosophy: Why Change is Not Destruction but a Higher Orbit',
      titleFa: 'فلسفه کهکشان: چرا تغییر نشان فنا نیست، بلکه مداری برتر است؟',
      host: 'مهندس مهدی دل زنده (موسس و بنیان‌گذار)',
      guest: 'دکترای روانشناسی شناختی و فلسفه علم',
      duration: '۳۱:۲۰',
      category: 'روانشناسی و بینش',
      releaseDate: '۱۴۰۵/۰۸/۰۴',
      views: '۶۸,۱۰۰',
      monetizedStatus: 'active',
      revenueUsd: 610.00,
      summary: 'گفتگویی الهام‌بخش بر پایه فیزیک سیارات و روانشناسی CBT؛ بررسی این اصل که هر رخدادی در زندگی فرصتی برای پالایش و جهش کوانتومی است.',
      chapters: [
        { time: '00:00', title: 'راز گردش زمین، خورشید و سیاهچاله‌ها' },
        { time: '10:20', title: 'رواندرمانی شناختی وسواس و رهایی از ترس آینده' },
        { time: '20:40', title: 'ساخت آهنگ‌های الهام‌بخش با فرکانس ۴۳۲ هرتز' }
      ]
    }
  ];

  const currentTrack = tracks.find((t) => t.id === currentPlayingId) || tracks[0];

  // Playback sound simulation using Web Audio API
  const handleTogglePlay = (trackId?: string) => {
    const targetId = trackId || currentPlayingId || tracks[0].id;

    if (isPlaying && currentPlayingId === targetId) {
      // Pause
      setIsPlaying(false);
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch (e) {}
        oscRef.current = null;
      }
    } else {
      // Play
      setCurrentPlayingId(targetId);
      setIsPlaying(true);

      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            audioCtxRef.current = new AudioContextClass();
          }
        }

        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        if (audioCtxRef.current) {
          if (oscRef.current) {
            try {
              oscRef.current.stop();
              oscRef.current.disconnect();
            } catch (e) {}
          }

          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();

          osc.type = targetId === 'track-4' ? 'sine' : targetId === 'track-1' ? 'triangle' : 'sawtooth';
          osc.frequency.setValueAtTime(targetId === 'track-4' ? 432 : 220, audioCtxRef.current.currentTime);

          gain.gain.setValueAtTime((volume / 100) * 0.15, audioCtxRef.current.currentTime);
          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);

          osc.start();
          oscRef.current = osc;
          gainRef.current = gain;
        }
      } catch (err) {
        console.warn('Web Audio synthesis initial note played');
      }
    }
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleGenerateNewAiTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newTrack: AudioTrack = {
        id: `track-${Date.now()}`,
        title: `آهنگ جدید هوش مصنوعی: افق کوانتومی ${promptTempo} BPM`,
        titleEn: `Quantum Horizon ${promptTempo} BPM (AI Synthesized Master)`,
        genre: promptGenre,
        genreFa: 'موسیقی مولد استودیو هوش مصنوعی',
        bpm: promptTempo,
        duration: '03:30',
        durationSeconds: 210,
        key: 'F# Minor',
        vocalType: promptVocals as any,
        vocalTypeFa: 'ترکیب وکال چندزبانه',
        coverEmoji: '✨',
        description: `آهنگ تولید شده بر پایه پرامپت: ${promptMood} با نظارت عالی مهندس مهدی دل زنده.`,
        lyrics: '[کلام آغازین] — در مدارهای زرین نور، اندیشه متولد می‌شود... خلق ترانه‌ای نو در پهنه گیتی.',
        streams: '۱۰,۲۰۰',
        earningsUsd: 35.80,
        tags: ['#NewRelease', '#AIMusic', '#MehdiDelzende'],
        isExclusive: true
      };
      tracks.unshift(newTrack);
      setCurrentPlayingId(newTrack.id);
      setIsPlaying(false);
      setPublishedTrackId(newTrack.id);
      setTimeout(() => setPublishedTrackId(null), 3500);
    }, 1800);
  };

  const handleDownloadStems = (track: AudioTrack) => {
    const manifest = {
      title: track.title,
      founder: 'مهندس مهدی دل زنده (موسس و بنیان‌گذار)',
      national_id: '5239775338',
      license: 'Royalty-Free Commercial License (AIONVERSE Pro)',
      bpm: track.bpm,
      key: track.key,
      stems: [
        `${track.titleEn}-Vocals.wav`,
        `${track.titleEn}-Synth-Melody.wav`,
        `${track.titleEn}-SubBass-808.wav`,
        `${track.titleEn}-DrumKit-Kicks-Snares.wav`
      ],
      monetization_approved: true,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Stems-${track.titleEn}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-500/15 via-slate-900 to-amber-500/15 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-inner">
            <Music className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2 flex-wrap">
              <span>کارخانه آهنگ‌های هوش مصنوعی، پادکست‌های تخصصی و مانیتایز فرامرزی</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-mono border border-amber-500/30">
                موسس و بنیان‌گذار: مهندس مهدی دل زنده
              </span>
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>کد ملی ثبت‌شده: ۵۲۳۹۷۷۵۳۳۸</span>
              </span>
              <span>•</span>
              <span className="text-cyan-300 font-mono">شناسه آرتیست جهانی: MEHDI_DELZENDE_MUSIC</span>
              <span>•</span>
              <span className="text-amber-300 font-bold">مانیتایز ۴ کانال فعال بین‌المللی: ۴,۰۴۸ دلار/ماه</span>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-bold flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('music-studio')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'music-studio' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>استودیو آهنگ و ترانه ({tracks.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('podcasts')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'podcasts' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>پادکست‌های تخصصی ({podcastEpisodes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('monetization')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'monetization' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>پیگیری مانیتایز و درآمد</span>
          </button>
          <button
            onClick={() => setActiveTab('editions')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'editions' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>چرخه حیات نسخه‌ها</span>
          </button>
          <button
            onClick={() => setActiveTab('commerce')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'commerce' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>تجارت فرامرزی</span>
          </button>
        </div>
      </div>

      {/* Tab 1: AI Music Studio & Track Player */}
      {activeTab === 'music-studio' && (
        <div className="space-y-6">
          {/* Top Interactive Audio Player HUD */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40 border-2 border-purple-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-amber-500/30 border border-purple-500/50 flex items-center justify-center text-3xl shadow-inner">
                  {currentTrack.coverEmoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-100">{currentTrack.title}</h3>
                    {currentTrack.isExclusive && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-500/30">
                        لایسنس تجاری مالک
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-3 flex-wrap">
                    <span className="text-purple-300 font-bold">{currentTrack.genreFa}</span>
                    <span>•</span>
                    <span className="text-cyan-300 font-bold">{currentTrack.bpm} BPM</span>
                    <span>•</span>
                    <span className="text-amber-300">{currentTrack.key}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{currentTrack.vocalTypeFa}</span>
                  </div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTogglePlay(currentTrack.id)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition cursor-pointer shadow-lg active:scale-95 ${
                    isPlaying
                      ? 'bg-amber-500 text-slate-950 shadow-amber-500/30'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-500/30 hover:opacity-90'
                  }`}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current mr-0.5" />}
                </button>

                <button
                  onClick={() => handleDownloadStems(currentTrack)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
                  title="دانلود فایل لایسنس و ترک‌های مجزا"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>دانلود Stems و لایسنس</span>
                </button>
              </div>
            </div>

            {/* Waveform & Scrubber */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>01:18</span>
                <span className="text-purple-300 font-bold">هوش مصنوعی صوتی فعال • تولید مستقیم با فرکانس ۴۸ کیلوهرتز</span>
                <span>{currentTrack.duration}</span>
              </div>

              <div className="relative w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-500 transition-all duration-300"
                  style={{ width: `${playbackProgress}%` }}
                />
              </div>

              {/* Visualizer wave bars simulation */}
              <div className="flex items-center justify-between gap-1 h-8 pt-1">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-200 ${
                      isPlaying
                        ? i % 3 === 0
                          ? 'bg-purple-400'
                          : i % 2 === 0
                          ? 'bg-amber-400'
                          : 'bg-cyan-400'
                        : 'bg-slate-800'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(15, Math.sin(i * 0.5 + playbackProgress * 0.2) * 100)}%` : '20%'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Lyrics preview */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              <span className="text-[10px] text-amber-400 font-mono block mb-0.5">ترانه و متن شعر تولید شده:</span>
              <p className="italic text-slate-200">{currentTrack.lyrics}</p>
            </div>
          </div>

          {/* AI Track Synthesizer Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  موتور هوش مصنوعی تولید ترک‌های صوتی، ترانه‌های میکس‌شده و میکس فرامرزی
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  تولید خودکار ملودی، بیس‌لاین، آکورد و ترانه‌های اختصاصی با نظارت عالی مهندس مهدی دل زنده
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerateNewAiTrack} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">سبک و ژنراسیون موسیقی:</label>
                <select
                  value={promptGenre}
                  onChange={(e) => setPromptGenre(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Cinematic Ambient & Space Synthwave">سینمایی کهکشانی و امبینت فضا</option>
                  <option value="Persian Fusion & Neural Lofi">فیوژن سنتی ایرانی و چیل‌لوفای</option>
                  <option value="Future Bass & Tech House">تک‌هاوس و فیوچربیس پرانرژی</option>
                  <option value="Meditation 432Hz Healing">فرکانس آرامش‌بخش ۴۳۲ هرتز CBT</option>
                  <option value="Cyberpunk Hardstyle 150BPM">سایبرپانک و هاردبیس سریع</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">تمپو و ضرب‌آهنگ (BPM: {promptTempo}):</label>
                <input
                  type="range"
                  min="60"
                  max="160"
                  value={promptTempo}
                  onChange={(e) => setPromptTempo(Number(e.target.value))}
                  className="w-full accent-amber-500 mt-2 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">نوع وکال و صدای هوش مصنوعی:</label>
                <select
                  value={promptVocals}
                  onChange={(e) => setPromptVocals(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="instrumental">بی‌کلام آکوستیک و الکترونیک</option>
                  <option value="male-neural">وکال مردانه حماسی و گرم</option>
                  <option value="female-neural">وکال زنانه شفاف و رویایی</option>
                  <option value="choir">گروه کر چندصدایی کهکشانی</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-lg shadow-purple-500/20"
                >
                  <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'در حال تولید صوت و ترانه...' : 'تولید آهنگ جدید با هوش مصنوعی'}</span>
                </button>
              </div>
            </form>

            {publishedTrackId && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ترک جدید با کیفیت Studio Master سنتز شد و در صدر فهرست قطعات قرار گرفت!</span>
              </div>
            )}
          </div>

          {/* Tracks Catalog Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Music className="w-4 h-4 text-purple-400" />
                <span>فهرست قطعات موسیقی آماده انتشار و مانیتایز شده</span>
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                100% Royalty-Free Commercial
              </span>
            </div>

            <div className="divide-y divide-slate-800/80">
              {tracks.map((t) => (
                <div
                  key={t.id}
                  className={`p-4 rounded-2xl transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    currentPlayingId === t.id ? 'bg-purple-500/10 border border-purple-500/30' : 'hover:bg-slate-950/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleTogglePlay(t.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition cursor-pointer shrink-0 ${
                        currentPlayingId === t.id && isPlaying
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {currentPlayingId === t.id && isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current mr-0.5" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-100">{t.title}</span>
                        <span className="text-[9px] text-slate-500 font-mono">({t.bpm} BPM • {t.duration})</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{t.genreFa} • {t.vocalTypeFa}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">استریم جهانی:</span>
                      <span className="text-slate-200 font-bold">{t.streams}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">درآمد استریم:</span>
                      <span className="text-emerald-400 font-bold font-mono">${t.earningsUsd.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => handleDownloadStems(t)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 transition cursor-pointer"
                      title="دانلود بسته‌بندی فایل و وکال مجزا"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Professional Podcasts Studio */}
      {activeTab === 'podcasts' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    پادکست‌های تخصصی و حرفه‌ای سازمان (Official AION-Cast Network)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    تولید و انتشار خودکار اپیزودها با صدای کاریزماتیک مهندس مهدی دل زنده و ایجنت‌های تخصصی
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  Spotify / Apple Podcasts / Castbox
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {podcastEpisodes.map((ep) => (
                <div
                  key={ep.id}
                  className="bg-slate-950 p-6 rounded-3xl border border-slate-800/80 space-y-4 flex flex-col justify-between hover:border-cyan-500/40 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                        اپیزود #{ep.episodeNumber}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{ep.duration}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 leading-snug">{ep.titleFa}</h4>
                    <div className="text-[10px] text-slate-400 font-mono">{ep.title}</div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-2xl border border-slate-800/60">
                      {ep.summary}
                    </p>

                    <div className="space-y-1.5 text-[11px]">
                      <div className="text-slate-400">سرفصل‌های اپیزود (Chapter Markers):</div>
                      <div className="space-y-1">
                        {ep.chapters.map((ch, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px] text-slate-300">
                            <span className="font-mono text-amber-400">{ch.time}</span>
                            <span className="truncate">{ch.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">شنوندگان: <strong className="text-slate-200">{ep.views}</strong></span>
                      <span className="text-emerald-400 font-bold">+${ep.revenueUsd.toFixed(2)} مانیتایز</span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(`https://aionverse.io/podcasts/ep-${ep.episodeNumber}`, `pod-${ep.id}`)}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer border border-slate-800"
                    >
                      {copiedKey === `pod-${ep.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === `pod-${ep.id}` ? 'لینک کپی شد' : 'کپی لینک RSS پادکست'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Monetization Tracker & Ad Revenue Dashboard */}
      {activeTab === 'monetization' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    داشبورد مانیتایز شبکه‌های اجتماعی و درآمدهای ارزی موسیقی و پادکست
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    واریز شفاف و مستقیم به حساب ارزی و ۵٪ صندوق توسعه مهندس مهدی دل زنده (کد ملی ۵۲۳۹۷۷۵۳۳۸)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-mono block">مجموع درآمد ماه جاری:</span>
                <span className="text-xl font-black font-mono text-emerald-400">$4,048.30 USD</span>
              </div>
            </div>

            {/* Platform breakdown grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400">YouTube Partner (YPP)</span>
                  <span className="text-[10px] text-emerald-400 font-mono">تایید شده</span>
                </div>
                <div className="text-2xl font-black font-mono text-slate-100">$1,385.00</div>
                <div className="text-[11px] text-slate-400">ساعات تماشا: ۴,۸۵۰ ساعت (۱۰۰٪ مانیتایز)</div>
              </div>

              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Spotify Artist Royalties</span>
                  <span className="text-[10px] text-emerald-400 font-mono">فعال</span>
                </div>
                <div className="text-2xl font-black font-mono text-slate-100">$940.50</div>
                <div className="text-[11px] text-slate-400">نرخ استریم: ۰.۰۰۴$ به ازای هر شنونده</div>
              </div>

              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">TikTok Creator Rewards</span>
                  <span className="text-[10px] text-emerald-400 font-mono">فعال</span>
                </div>
                <div className="text-2xl font-black font-mono text-slate-100">$682.80</div>
                <div className="text-[11px] text-slate-400">استفاده در ۱۲,۴۰۰ ویدیوی وایرال کاربران</div>
              </div>

              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400">Telegram VIP Audio Channel</span>
                  <span className="text-[10px] text-emerald-400 font-mono">فعال</span>
                </div>
                <div className="text-2xl font-black font-mono text-slate-100">$1,040.00</div>
                <div className="text-[11px] text-slate-400">اشتراک پادکست‌های تخصصی و فایل‌های خام</div>
              </div>
            </div>

            {/* 5% Fund Allocation Card */}
            <div className="bg-slate-950 p-5 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-200">
                    تخصیص ۵٪ درآمدهای مانیتایز صوتی به صندوق توسعه پلتفرم
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    مبلغ <strong className="text-amber-300 font-mono">$202.41</strong> جهت تمدید دامنه‌ها، سرورهای GPU هوش مصنوعی و زیرساخت اختصاص یافت. مابقی مبلغ به ولت تتر مهندس مهدی دل زنده منتقل گردید.
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 shrink-0">
                Auto-Settled via Escrow
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Tiered Lifecycle Editions (Free vs Pro vs Enterprise) */}
      {activeTab === 'editions' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-base md:text-lg font-black text-slate-100">
              چرخه حیات نسخه‌ها: رایگان عمومی، حرفه‌ای و سازمانی فرامرزی
            </h3>
            <p className="text-xs text-slate-400">
              مدل کسب‌وکار طبقه‌بندی‌شده جهت جذب صدها هزار مخاطب ارگانیک و تبدیل آنها به خریداران پکیج‌های تجاری
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-mono">
                  سطح ۱: رایگان با چرخه حیات (Freemium)
                </span>
                <h4 className="text-base font-bold text-slate-100">نسخه عمومی رایگان</h4>
                <div className="text-2xl font-black font-mono text-slate-200">$0 <span className="text-xs text-slate-500 font-sans">/ رایگان</span></div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  گوش دادن به استریم کامل قطعات در اسپاتیفای و تلگرام، دانلود با کیفیت معمولی ۱۲۸kbps برای کاربرد غیرتجاری.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>دسترسی به تمامی پادکست‌های هفتگی</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>امکان استفاده از موزیک‌ها در ریلز اینستاگرام</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>✕ فاقد ترک‌های تفکیک‌شده (Stems)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setActiveTab('music-studio')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
                >
                  استفاده رایگان
                </button>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="bg-gradient-to-b from-purple-500/15 to-slate-900/90 border-2 border-purple-500/50 rounded-3xl p-6 space-y-4 flex flex-col justify-between shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full shadow">
                پرفروش‌ترین نسخه تجاری
              </div>
              <div className="space-y-3">
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg font-mono">
                  سطح ۲: حرفه‌ای تولیدکنندگان محتوا (Pro Creator)
                </span>
                <h4 className="text-base font-bold text-slate-100">نسخه تجاری و تولید محتوا</h4>
                <div className="text-2xl font-black font-mono text-amber-300">$29 <span className="text-xs text-slate-400 font-sans">/ ماهانه</span></div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  دانلود کیفیت استودیو بدون افت کیفیت (WAV 24-bit)، لایسنس تجاری تضمینی بدون کپی‌رایت استرایک، و فایل‌های تفکیک‌شده سازها.
                </p>
                <div className="space-y-2 pt-2 border-t border-purple-500/30 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>دانلود نامحدود فایل‌های تفکیکی (Stems)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>لایسنس رسمی مانیتایز کامل یوتیوب و تیک‌تاک</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ساخت ترانه اختصاصی با هوش مصنوعی در ۱۰ ثانیه</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => copyToClipboard('https://aionverse.io/checkout?tier=pro', 'pro-tier')}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {copiedKey === 'pro-tier' ? 'لینک پرداخت کپی شد' : 'خرید اشتراک حرفه‌ای (کارت شتاب / تتر)'}
                </button>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-lg font-mono">
                  سطح ۳: سازمانی و فرامرزی (Enterprise & Sync)
                </span>
                <h4 className="text-base font-bold text-slate-100">نسخه سازمانی و سینمایی</h4>
                <div className="text-2xl font-black font-mono text-cyan-300">$199 <span className="text-xs text-slate-500 font-sans">/ سالانه</span></div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  حق مالکیت انحصاری (Exclusive Buyout)، مجوز استفاده در فیلم‌های سینمایی، تیزرهای تلویزیونی، بازی‌های ویدیویی و رویدادهای بین‌المللی.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>قرارداد رسمی بین‌المللی با امضای مهندس مهدی دل زنده</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>صدور گواهی بلاکچینی اثبات مالکیت اثر</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>دسترسی به API اختصاصی تولید انبوه آهنگ</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => copyToClipboard('https://aionverse.io/checkout?tier=enterprise', 'ent-tier')}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition cursor-pointer"
                >
                  {copiedKey === 'ent-tier' ? 'لینک قرارداد کپی شد' : 'درخواست لایسنس سازمانی'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Cross-Border E-Commerce & International Marketplace */}
      {activeTab === 'commerce' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  تجارت الکترونیکی فرامرزی و انتشار پکیج‌های آلبوم و گجت در فروشگاه‌های بین‌المللی
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  عرضه باندل‌های موسیقی، دوره‌های آموزشی و گجت‌های هوشمند تامین‌شده از علی‌بابا و تمو در سراسر جهان
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">📦</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">باندل پرفروش</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100">باندل پروژکتور کهکشانی + آلبوم کامل موسیقی فضایی</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ترکیب گجت فیزیکی پروژکتور تمو با فلش مموری اختصاصی ۱۲ آهنگ سینمایی مهندس مهدی دل زنده.
                </p>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-800">
                  <span className="text-slate-400">قیمت فروش:</span>
                  <span className="text-emerald-400 font-black text-sm">$44.90 USD</span>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🎧</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">باندل هوش مصنوعی</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100">هدفون مترجم ۵۰ زبانه + لایسنس پادکست‌های تجاری</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  تجهیزات سفر هوشمند علی‌بابا همراه با کتاب الکترونیکی رساله زبان و پادکست‌های صوتی.
                </p>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-800">
                  <span className="text-slate-400">قیمت فروش:</span>
                  <span className="text-emerald-400 font-black text-sm">$69.00 USD</span>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">⏳</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono font-bold">باندل ریلکسیشن</span>
                </div>
                <h4 className="text-xs font-bold text-slate-100">چراغ شنی متحرک کوانتومی + آرشیو فرکانس‌های ۴۳۲Hz</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  دکوراسیون ریلکسیشن همراه با قطعات صوتی ضدوسواس و استرس با پروتکل‌های روانشناسی CBT.
                </p>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-800">
                  <span className="text-slate-400">قیمت فروش:</span>
                  <span className="text-emerald-400 font-black text-sm">$38.50 USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
