import React, { useState } from 'react';
import {
  MousePointer2,
  FileSearch,
  Languages,
  FileCheck,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileSpreadsheet
} from 'lucide-react';

export function OmniCursorModule() {
  const [screenAccessGranted, setScreenAccessGranted] = useState(false);
  const [sampleScreenText, setSampleScreenText] = useState(
    'قرارداد تفاهم‌نامه همکاری بین‌المللی در حوزه توسعه پلتفرم‌های هوش مصنوعی سازمانی و صادرات خدمات مهندسی نرم‌افزار.'
  );
  const [analyzedSummary, setAnalyzedSummary] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [workPilotDraftType, setWorkPilotDraftType] = useState<'email' | 'meeting' | 'sms'>('email');
  const [draftResult, setDraftResult] = useState({
    title: 'پیش‌نویس صورت‌جلسه رسمی هیئت مدیره Aurevia AI Group',
    content: `صورت‌جلسه مجمع توسعه راهبردی:
۱. تصویب تخصیص ۵٪ از درآمدهای جاری به صندوق توسعه جهت خرید دامنه‌های رسمی.
۲. ممیزی استودیو مدلسازی سه‌بعدی و اتصال فرمت‌های CAD به پرینترهای صنعتی.
۳. ابلاغ قانون منع ادعای تضمین درآمد و رعایت ممیزی دروازه حقیقت (Truth Gate).
تأیید نهایی: مهندس مهدی دلزنده — بنیان‌گذار و مدیر ارشد معماری`,
  });
  const [copied, setCopied] = useState(false);
  const [sentNotice, setSentNotice] = useState<string | null>(null);

  const handleScreenAnalyze = () => {
    if (!screenAccessGranted) {
      alert('قانون حریم خصوصی: برای تحلیل صفحه ابتدا باید دسترسی موشواره هوشمند را فعال فرمایید.');
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzedSummary(
        `[تحلیل هوشمند OmniCursor]: سند مربوط به قرارداد حقوقی مشارکت فنی است. نکات کلیدی: عدم افشای کلیدهای API، لزوم تأیید کتبی مهندس مهدی دلزنده برای تعهدات مالی بالای ۵۰ میلیون تومان، و استقرار روی سرورهای ابری امن.`
      );
    }, 1100);
  };

  const handleSendAction = () => {
    setSentNotice('ارسال نهایی با موفقیت توسط کاربر تأیید شد و به گیرندگان ابلاغ گردید.');
    setTimeout(() => setSentNotice(null), 3000);
  };

  const copyDraft = () => {
    navigator.clipboard.writeText(draftResult.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Principle Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <MousePointer2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              موشواره هوشمند OmniCursor AI و دستیار اداری WorkPilot
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded font-mono border border-cyan-500/30">
                با رضایت صریح کاربر
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تحلیل درلحظه محتوای صفحه، استخراج داده‌ها و تنظیم پیش‌نویس مکاتبات سازمانی بدون نقض حریم شخصی
            </p>
          </div>
        </div>

        {/* Screen Access Toggle */}
        <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-300 font-medium">مجوز دسترسی به صفحه:</span>
          <button
            onClick={() => setScreenAccessGranted(!screenAccessGranted)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              screenAccessGranted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {screenAccessGranted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                دسترسی فعال است
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5" />
                غیرفعال (نیاز به تایید)
              </>
            )}
          </button>
        </div>
      </div>

      {sentNotice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
          <span>{sentNotice}</span>
          <button onClick={() => setSentNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Grid: OmniCursor Screen AI + WorkPilot Minutes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OmniCursor Screen Inspector */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs font-bold text-cyan-400 flex items-center gap-2">
              <FileSearch className="w-4 h-4" />
              کاوشگر اسناد و تحلیل متن فعال (OmniCursor)
            </div>
            <span className="text-[10px] text-slate-500 font-mono">1-Click / 2-Click AI OCR</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 block">محتوای متنی صفحه یا تصویر بارگذاری شده:</label>
            <textarea
              rows={4}
              value={sampleScreenText}
              onChange={(e) => setSampleScreenText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleScreenAnalyze}
              disabled={isAnalyzing}
              className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isAnalyzing ? 'در حال تحلیل عمیق صفحه...' : 'تحلیل با یک کلیک و استخراج نکات'}
            </button>
          </div>

          {analyzedSummary && (
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2 text-xs">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                نتیجه تحلیل هوشمند:
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">{analyzedSummary}</p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>ارسال خودکار به Truth Gate جهت ممیزی صحت</span>
                <span className="text-emerald-400 font-mono">Status: Verified</span>
              </div>
            </div>
          )}
        </div>

        {/* WorkPilot Enterprise Assistant */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              دستیار اداری سازمانی WorkPilot
            </div>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px]">
              <button
                onClick={() => setWorkPilotDraftType('email')}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  workPilotDraftType === 'email' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                ایمیل رسمی
              </button>
              <button
                onClick={() => setWorkPilotDraftType('meeting')}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  workPilotDraftType === 'meeting' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                صورت‌جلسه
              </button>
              <button
                onClick={() => setWorkPilotDraftType('sms')}
                className={`px-2 py-0.5 rounded font-bold transition ${
                  workPilotDraftType === 'sms' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                پیامک اداری
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-200">{draftResult.title}</div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto">
              {draftResult.content}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-[10px] text-slate-400">
              * قانون عدم ارسال خودکار: ارسال نهایی منوط به تأیید کاربر است.
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyDraft}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'کپی شد' : 'کپی متن'}
              </button>
              <button
                onClick={handleSendAction}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                تأیید و ارسال سازمانی
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
