import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Volume2,
  Play,
  Pause,
  Download,
  Languages,
  Sparkles,
  Sliders,
  UserCheck,
  Video,
  Smile,
  CheckCircle2,
  Layers
} from 'lucide-react';

export function DubbingStudioModule() {
  const [inputText, setInputText] = useState('به دنیای هوش مصنوعی AIONVERSE خوش آمدید؛ جایی که خلاقیت بی‌پایان به واقعیت تبدیل می‌شود.');
  const [selectedVoice, setSelectedVoice] = useState('cinema-narrator');
  const [targetLang, setTargetLang] = useState('fa');
  const [pitch, setPitch] = useState(1.0);
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [lipSyncState, setLipSyncState] = useState<'rest' | 'open' | 'wide' | 'round'>('rest');
  const [downloadReady, setDownloadReady] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const characterVoices = [
    { id: 'cinema-narrator', name: 'راوی حماسی سینمایی (Epic Cinema)', tone: 'عمیق، طنین‌انداز و باصلابت', lang: 'فارسی / انگلیسی' },
    { id: 'master-scientist', name: 'دانشمند و فیلسوف هوش مصنوعی', tone: 'آرام، مستدل، پر از دانش', lang: 'چندزبانه' },
    { id: 'calm-therapist', name: 'دکتر آوا (صدای آرامش‌بخش CBT)', tone: 'مهربان، همدلانه و تسکین‌دهنده', lang: 'فارسی' },
    { id: 'cyber-hero', name: 'قهرمان سایبرپانک و بازی‌های ۳D', tone: 'انرژیک، مدرن، جوان', lang: 'انگلیسی / ژاپنی' },
    { id: 'royal-historic', name: 'صدای کلاسیک مستندهای تاریخی', tone: 'فصیح، ادبی و ماندگار', lang: 'عربی / فارسی' },
  ];

  // Simulated Lip-Sync wave during playback
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      const states: ('open' | 'wide' | 'round' | 'rest')[] = ['open', 'wide', 'round', 'open', 'rest'];
      let idx = 0;
      timer = setInterval(() => {
        setLipSyncState(states[idx % states.length]);
        idx++;
      }, 150);
    } else {
      setLipSyncState('rest');
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSynthesizeAndPlay = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setIsPlaying(true);
      setDownloadReady(true);

      // Web Audio sound generator
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(220 * pitch, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(330 * pitch, ctx.currentTime + 1.2);

          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 2.5);

          setTimeout(() => {
            setIsPlaying(false);
          }, 3000);
        }
      } catch (e) {
        setTimeout(() => setIsPlaying(false), 3000);
      }
    }, 1000);
  };

  const handleDownloadSubtitle = () => {
    const srt = `1\n00:00:00,000 --> 00:00:03,500\n${inputText}\n\n[Synchronized Neural Voiceover — AIONVERSE Dubbing Studio by Engineer Mehdi Delzende]`;
    const blob = new Blob([srt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aurevia-Dubbing-${Date.now()}.srt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Principle Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              استودیو دوبله اختصاصی و همگام‌سازی حرکات لب و صورت (Lip-Sync Neural Studio)
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-mono border border-amber-500/30">
                بلادرنگ و سینمایی
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              صداپیشگی هوشمند با صدای شخصیت‌های برجسته، همگام‌سازی فونم‌های دهان و بدن، و خروجی چندزبانه برای فیلم‌ها و دوره‌های آموزشی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            100+ Neural Languages
          </span>
        </div>
      </div>

      {/* Main Grid: Input & Character Voice Selection + Lip Sync Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Text and Controls */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">
              متن فیلم، سناریوی ویدیویی، یا کتاب جهت تبدیل به گفتار دوبله:
            </label>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="متن خود را برای دوبله وارد کنید..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
            />
          </div>

          {/* Voice Personas */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">انتخاب شخصیت سینمایی و لحن گفتار:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {characterVoices.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoice(v.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    selectedVoice === v.id
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                      <span>{v.name}</span>
                      {selectedVoice === v.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{v.tone}</div>
                  </div>
                  <div className="mt-2 text-[10px] text-cyan-400 font-mono">{v.lang}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sliders: Pitch & Speed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">گام صدا (Pitch):</span>
                <span className="font-mono text-amber-400 font-bold">{pitch.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">سرعت ادای کلمات (Speed):</span>
                <span className="font-mono text-cyan-400 font-bold">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.6"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Play & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={handleSynthesizeAndPlay}
              disabled={isSynthesizing || !inputText.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isSynthesizing ? 'در حال سنتز عصبی صوت...' : isPlaying ? 'در حال پخش دوبله...' : 'تولید و پخش دوبله زنده'}
            </button>

            {downloadReady && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadSubtitle}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  دانلود زیرنویس SRT هماهنگ
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Real-time Lip Sync & Facial Tracking Simulation */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
              <Smile className="w-4 h-4" />
              موتور همگام‌سازی لب و صورت (Lip-Sync Engine)
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              {isPlaying ? 'Syncing...' : 'Ready'}
            </span>
          </div>

          {/* Animated Avatar Face Preview */}
          <div className="relative w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-carbon-mesh opacity-20 pointer-events-none" />

            {/* Stylized Avatar Head */}
            <div className="relative z-10 w-28 h-36 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-full border-2 border-amber-500/40 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.2)]">
              {/* Eyes */}
              <div className="flex items-center justify-between w-14 mb-4">
                <div className={`w-3 h-3 rounded-full bg-cyan-300 transition-all ${isPlaying ? 'scale-y-75' : ''}`} />
                <div className={`w-3 h-3 rounded-full bg-cyan-300 transition-all ${isPlaying ? 'scale-y-75' : ''}`} />
              </div>

              {/* Dynamic Mouth (Phoneme Shape) */}
              <div
                className={`bg-rose-500/90 rounded-full border border-amber-300 transition-all duration-150 ${
                  lipSyncState === 'open'
                    ? 'w-6 h-6'
                    : lipSyncState === 'wide'
                    ? 'w-8 h-3.5'
                    : lipSyncState === 'round'
                    ? 'w-4 h-5'
                    : 'w-6 h-1.5'
                }`}
              />

              {/* Facial wireframe grid lines */}
              <div className="absolute bottom-2 text-[9px] text-amber-400/60 font-mono">
                Viseme: {lipSyncState.toUpperCase()}
              </div>
            </div>

            <div className="absolute bottom-2 left-3 text-[10px] text-slate-500 font-mono">
              FPS: 60 • BlendShapes: 52
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-400">
              <span>انطباق فرم لب با هجاها:</span>
              <span className="text-emerald-400 font-bold">۹۹.۲٪ دقت زمانی</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>انعطاف ماهیچه‌های صورت:</span>
              <span className="text-slate-200">ARKit Facial Standards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
