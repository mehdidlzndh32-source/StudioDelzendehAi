import React, { useState } from 'react';
import {
  Film,
  Clapperboard,
  Video,
  Sparkles,
  Download,
  Play,
  Layers,
  Camera,
  Music,
  Sliders,
  Copy,
  Check,
  PlusCircle,
  Clock
} from 'lucide-react';

interface CinematicScene {
  id: string;
  shotNumber: number;
  timeRange: string;
  sceneTitle: string;
  cameraMovement: string;
  lightingAtmosphere: string;
  promptAI: string;
  dialogueVoiceover: string;
  soundFx: string;
}

export function CinematicVideoStudio() {
  const [projectTitle, setProjectTitle] = useState('حماسه پیدایش اکوسیستم هوش مصنوعی AIONVERSE');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '2.39:1'>('16:9');
  const [resolution, setResolution] = useState<'4K' | '8K Ultra' | '1080p'>('4K');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [scenes, setScenes] = useState<CinematicScene[]>([
    {
      id: 'sc-1',
      shotNumber: 1,
      timeRange: '۰۰:۰۰ - ۰۰:۱۰',
      sceneTitle: 'نمای معرف کهکشانی و تولد هسته خورشیدی',
      cameraMovement: 'حرکت دالی بسیار آهسته به سوی سیاه‌چاله نورانی (Slow Dolly-In)',
      lightingAtmosphere: 'کنتراست شدید سینمایی، بازتاب طلایی روی ذرات غبار کیهانی، هاله نیلی',
      promptAI: 'Ultra cinematic IMAX 8K, deep space Milky Way, radiant solar core with floating gold dust particles, ACES filmic grading, Christopher Nolan style, anamorphic lens flare',
      dialogueVoiceover: '«در ژرفای تاریکی کهکشان، هر تحولی نه‌تنها پایان نیست، بلکه سرآغاز شکوهی ماندگار است...»',
      soundFx: 'فرکانس بم ساب‌بیس کیهانی ۴۰ هرتز به همراه طنین شیشه‌ای نرم'
    },
    {
      id: 'sc-2',
      shotNumber: 2,
      timeRange: '۰۰:۱۰ - ۰۰:۲۵',
      sceneTitle: 'چرخش مداری سیارات و تمرکز بر زمین و ماه',
      cameraMovement: 'حرکت قوسی ۳۶۰ درجه پیرامون اتمسفر آبی زمین (Orbital Arc Pan)',
      lightingAtmosphere: 'نور لبه‌ای طلایی خورشید بر انحنای زمین، درخشش سیان شبکه‌های شهری',
      promptAI: 'Photorealistic orbital shot of Earth and glowing moon, cybernetic data streams pulsing across continents, pristine PBR atmospheric scattering, Unreal Engine 5 render',
      dialogueVoiceover: '«هماهنگی ۲۵ ایجنت خودگردان در خدمت پیشرفت تمدن انسانی؛ از طراحی سه بعدی تا حقیقت پایدار.»',
      soundFx: 'پالس‌های الکترونیکی داده‌ها و ملودی زهی حماسی'
    },
    {
      id: 'sc-3',
      shotNumber: 3,
      timeRange: '۰۰:۲۵ - ۰۰:۴۰',
      sceneTitle: 'استودیو مدلسازی سه‌بعدی و مجسمه‌سازی نانوکربن',
      cameraMovement: 'زوایای کلوزآپ ماکرو از تراش ذرات طلا بر روی کره هندسی',
      lightingAtmosphere: 'نورپردازی استودیویی Softbox با بازتاب متالیک روی شیدرهای PBR',
      promptAI: 'Macro cinematic shot of golden geometric parametric sculpture assembling in zero gravity, holographic CAD blueprints floating in air, studio lighting, hyper-detailed',
      dialogueVoiceover: '«ابزارهای تخصصی CAD، مجسمه‌سازی دیجیتال و صادرات بدون محدودیت به تمام فرمت‌های صنعتی.»',
      soundFx: 'صدای مکانیکی کریستالی و شکل‌گیری اتصالات مولکولی'
    },
    {
      id: 'sc-4',
      shotNumber: 4,
      timeRange: '۰۰:۴۰ - ۰۰:۶۰',
      sceneTitle: 'نمای پایانی، ثبت مالکیت و فراخوان جهانی',
      cameraMovement: 'حرکت آرام به عقب و طلوع نشان تجاری طلایی AIONVERSE',
      lightingAtmosphere: 'اشعه‌های شکوهمند نورانی با ذرات معلق در هوا',
      promptAI: 'Aurevia AI Group golden emblem rising above cyber horizon, majestic golden rim light, epic movie ending shot',
      dialogueVoiceover: '«تأسیس و معماری شده توسط مهندس مهدی دلزنده. مسیر طلایی از هوش مصنوعی تا افتخار جهانی.»',
      soundFx: 'اوج‌گیری ارکستر سمفونیک و کرال ملایم'
    }
  ]);

  const copyScenePrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportDirectorScript = () => {
    let script = `================================================================================
🎬 فیلم‌نامه و دستورالعمل کارگردانی سینمایی AIONVERSE
پروژه: ${projectTitle}
معمار و مؤلف: مهندس مهدی دلزنده
کیفیت رندر: ${resolution} | نسبت تصویر: ${aspectRatio}
================================================================================\n\n`;

    scenes.forEach((s) => {
      script += `[صحنه ${s.shotNumber} | تایم‌کد: ${s.timeRange}]\n`;
      script += `عنوان: ${s.sceneTitle}\n`;
      script += `حرکت دوربین: ${s.cameraMovement}\n`;
      script += `نور و فضا: ${s.lightingAtmosphere}\n`;
      script += `پرامپت AI برای Runway/Sora: ${s.promptAI}\n`;
      script += `صدا و روایت: ${s.dialogueVoiceover}\n`;
      script += `افکت‌های صوتی: ${s.soundFx}\n`;
      script += `--------------------------------------------------------------------------------\n\n`;
    });

    const blob = new Blob([script], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aurevia-Cinematic-Script-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Clapperboard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              استودیو تولید فیلم‌های سینمایی و آموزشی بزرگ (Master Cinematic Studio)
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-mono border border-amber-500/30">
                بدون محدودیت کیفیت
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              طراحی نمابه‌نما، زوایای دوربین، نورپردازی هاله طلایی، پرامپت‌های تفکیک‌شده هوش مصنوعی و هماهنگ‌سازی دوبله
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportDirectorScript}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            دانلود دکوپاژ و فیلم‌نامه رسمی
          </button>
        </div>
      </div>

      {/* Project Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl space-y-1.5">
          <label className="text-xs font-bold text-slate-300 block">عنوان پروژه سینمایی:</label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl space-y-1.5">
          <label className="text-xs font-bold text-slate-300 block">نسبت تصویر (Aspect Ratio):</label>
          <div className="flex gap-2">
            {(['16:9', '9:16', '2.39:1'] as const).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  aspectRatio === ratio
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl space-y-1.5">
          <label className="text-xs font-bold text-slate-300 block">کیفیت رندر نهایی:</label>
          <div className="flex gap-2">
            {(['1080p', '4K', '8K Ultra'] as const).map((res) => (
              <button
                key={res}
                onClick={() => setResolution(res)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  resolution === res
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scenes Timeline Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-bold flex items-center gap-1.5">
            <Film className="w-4 h-4 text-amber-400" />
            جدول دکوپاژ صحنه‌ها و پرامپت‌های تولید ویدیو:
          </span>
          <span className="font-mono text-slate-500">{scenes.length} صحنه برنامه‌ریزی‌شده</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                    {scene.shotNumber}
                  </span>
                  <div className="text-xs font-bold text-slate-200">{scene.sceneTitle}</div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{scene.timeRange}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono block">حرکت دوربین:</span>
                  <p className="text-slate-300">{scene.cameraMovement}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono block">نورپردازی و اتمسفر:</span>
                  <p className="text-slate-300">{scene.lightingAtmosphere}</p>
                </div>
              </div>

              {/* AI Video Prompt */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-mono">پرامپت مدیا برای Runway Gen-3 / Sora / Midjourney:</span>
                  <button
                    onClick={() => copyScenePrompt(scene.promptAI, scene.id)}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 flex items-center gap-1 transition cursor-pointer"
                  >
                    {copiedId === scene.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                    {copiedId === scene.id ? 'کپی شد' : 'کپی پرامپت'}
                  </button>
                </div>
                <div className="text-[11px] font-mono text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  {scene.promptAI}
                </div>
              </div>

              {/* Dialogue & Sound */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-amber-400 font-mono block">دیالوگ و روایت صوتی:</span>
                  <p className="text-slate-200 font-serif italic">{scene.dialogueVoiceover}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono block">طراحی صدا و افکت:</span>
                  <p className="text-slate-400">{scene.soundFx}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
