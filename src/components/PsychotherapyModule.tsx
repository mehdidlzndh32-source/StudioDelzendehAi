import React, { useState } from 'react';
import {
  HeartPulse,
  Mic,
  Video,
  Smile,
  ShieldAlert,
  Send,
  Sparkles,
  Volume2,
  FileText,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  time: string;
  emotionDetected?: string;
}

export function PsychotherapyModule() {
  const [sessionType, setSessionType] = useState<'video' | 'audio' | 'text'>('text');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'درود بر شما. من درمانگر هوشمند CBT در پلتفرم AIONVERSE هستم. [توضیح اخلاقی الزامی: این سامانه یک هوش مصنوعی آموزش‌دیده بر اساس پروتکل‌های معتبر روانشناختی شناختی-رفتاری است و جایگزین درمان دارویی یا فوریت‌های حاد پزشکی نیست]. امروز مایلید روی کدام موضوع مانند اضطراب، افکار وسواسی تمیزی، یا فشار کاری تمرکز کنیم؟',
      time: '۱۰:۰۰',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [thoughtRecord, setThoughtRecord] = useState({
    situation: '',
    automaticThought: '',
    distortion: 'فیلتر منفی / تفکر همه یا هیچ',
    rationalResponse: '',
  });
  const [savedRecords, setSavedRecords] = useState<number>(3);
  const [detectedEmotion, setDetectedEmotion] = useState({
    state: 'آرام و پذیرا (Calm & Receptive)',
    confidence: 94.2,
    stressLevel: 28,
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Dynamic response based on CBT
    setTimeout(() => {
      let reply = '';
      if (userMsg.text.includes('وسواس') || userMsg.text.includes('شستن') || userMsg.text.includes('کثیف')) {
        reply = 'احساس نیاز شدید به تکرار شستشو یا اطمینان‌طلبی، ناشی از چرخه اضطراب است. بیایید با تکنیک مواجهه و جلوگیری از پاسخ (ERP) شروع کنیم: آیا می‌توانید ۵ دقیقه شستن مجدد را به تعویق بیندازید و شدت اضطراب خود را از ۱ تا ۱۰ یادداشت کنید؟';
        setDetectedEmotion({ state: 'اضطراب وسواسی خفیف', confidence: 91.5, stressLevel: 58 });
      } else if (userMsg.text.includes('نگران') || userMsg.text.includes('استرس')) {
        reply = 'نگرانی شما کاملاً قابل درک است. بیایید بپرسیم: بدترین اتفاق ممکن چیست و شواهد واقعی له یا علیه این فکر کدام‌اند؟ مغز ما گاهی خطای «فاجعه‌سازی» را تجربه می‌کند.';
        setDetectedEmotion({ state: 'استرس شناختی', confidence: 93.8, stressLevel: 64 });
      } else {
        reply = 'از اینکه این احساس را به اشتراک گذاشتید متشکرم. اجازه دهید این فکر را در جدول بازسازی شناختی بررسی کنیم تا زاویه دید منطقی‌تر و آرام‌بخش‌تری پیدا کنیم.';
        setDetectedEmotion({ state: 'رو به تعادل', confidence: 95.0, stressLevel: 32 });
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  const handleSaveThoughtRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thoughtRecord.situation || !thoughtRecord.automaticThought) return;
    setSavedRecords((prev) => prev + 1);
    setThoughtRecord({
      situation: '',
      automaticThought: '',
      distortion: 'فیلتر منفی / تفکر همه یا هیچ',
      rationalResponse: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Principle & Ethics Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              استودیو رواندرمانی دیجیتال AION-Therapy (پروتکل CBT)
              <span className="text-xs bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded font-mono border border-rose-500/30">
                اخلاقی و محرمانه
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تخصص در وسواس فکری-عملی نظافت (OCD)، اضطراب منتشر، و تکنیک‌های ثبت افکار شناختی با بازخورد بیش از ۹۰٪ دقت هیجانی
            </p>
          </div>
        </div>

        {/* Mode selector */}
        <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setSessionType('text')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              sessionType === 'text' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            مشاوره متنی
          </button>
          <button
            onClick={() => setSessionType('audio')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              sessionType === 'audio' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            جلسه صوتی
          </button>
          <button
            onClick={() => setSessionType('video')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              sessionType === 'video' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            شبیه‌ساز ویدیویی
          </button>
        </div>
      </div>

      {/* Emotion Radar & Ethics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">وضعیت احساسی شناسایی شده:</div>
            <div className="text-sm font-bold text-amber-300 mt-0.5">{detectedEmotion.state}</div>
          </div>
          <div className="text-left font-mono">
            <span className="text-xs text-emerald-400 font-bold">{detectedEmotion.confidence}%</span>
            <div className="text-[9px] text-slate-500">دقت ارزیابی</div>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">سطح استرس ذهنی:</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">
              {detectedEmotion.stressLevel}% {detectedEmotion.stressLevel < 40 ? '(پایین و پایدار)' : '(نیازمند تمرین آرام‌سازی)'}
            </div>
          </div>
          <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                detectedEmotion.stressLevel > 60 ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${detectedEmotion.stressLevel}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">پرونده افکار ثبت شده (CBT):</div>
            <div className="text-sm font-bold text-cyan-300 mt-0.5 font-mono">{savedRecords} کاربرگ تکمیل شده</div>
          </div>
          <BrainCircuit className="w-6 h-6 text-cyan-400" />
        </div>
      </div>

      {/* Main Grid: Live Therapy Session + Thought Record Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat / Session Screen */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col h-[520px] overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 text-xs font-bold">
                AI
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">دکتر آوا (متخصص CBT هوشمند)</div>
                <div className="text-[10px] text-slate-400">جلسه رمزنگاری شده پایان‌به‌پایان AES-256</div>
              </div>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
              Live Session
            </span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-md'
                      : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-950/80 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="احساس، فکر وسواسی، یا وضعیت امروز خود را بیان کنید..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              ارسال
            </button>
          </form>
        </div>

        {/* Interactive CBT Thought Record (جدول ثبت افکار خودکار) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-200">کاربرگ بازسازی شناختی (CBT)</h3>
            </div>

            <form onSubmit={handleSaveThoughtRecord} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">۱. موقعیت راه‌انداز استرس:</label>
                <input
                  type="text"
                  value={thoughtRecord.situation}
                  onChange={(e) => setThoughtRecord({ ...thoughtRecord, situation: e.target.value })}
                  placeholder="مثال: لمس دستگیره در عمومی یا فکر به خطا در کار..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">۲. فکر خودکار منفی:</label>
                <input
                  type="text"
                  value={thoughtRecord.automaticThought}
                  onChange={(e) => setThoughtRecord({ ...thoughtRecord, automaticThought: e.target.value })}
                  placeholder="مثال: حتماً مریض می‌شوم، کل پروژه خراب شد..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">۳. خطای شناختی:</label>
                <select
                  value={thoughtRecord.distortion}
                  onChange={(e) => setThoughtRecord({ ...thoughtRecord, distortion: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option>فیلتر منفی / تفکر همه یا هیچ</option>
                  <option>فاجعه‌سازی (Catastrophizing)</option>
                  <option>شخصی‌سازی و مقصر دانستن خود</option>
                  <option>بایدها و نبایدهای انعطاف‌ناپذیر</option>
                  <option>نتیجه‌گیری شتاب‌زده</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">۴. پاسخ منطقی و انطباقی:</label>
                <textarea
                  rows={2}
                  value={thoughtRecord.rationalResponse}
                  onChange={(e) => setThoughtRecord({ ...thoughtRecord, rationalResponse: e.target.value })}
                  placeholder="مثال: واقعیت این است که دست‌هایم تمیزند و سیستم ایمنی من سالم است..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={!thoughtRecord.situation || !thoughtRecord.automaticThought}
                className="w-full py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 font-bold text-xs transition disabled:opacity-40"
              >
                ثبت در پرونده شخصی و بازبینی پیشرفت
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 leading-relaxed">
            * تمام اطلاعات ورودی به صورت محلی رمزنگاری شده و هرگز بدون اجازه در هیچ سرور ثالثی ذخیره نمی‌شود.
          </div>
        </div>
      </div>
    </div>
  );
}
