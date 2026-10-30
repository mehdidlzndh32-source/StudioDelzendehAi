import React, { useState } from 'react';
import {
  FileEdit,
  Sparkles,
  Download,
  Share2,
  FileSpreadsheet,
  FileText,
  Code,
  CheckCircle2,
  Send,
  Play,
  RotateCw,
  Copy,
  Check,
  ShieldCheck,
  Bot
} from 'lucide-react';

export function AllInOneEnterpriseEditor() {
  const [editorMode, setEditorMode] = useState<'contract' | 'financial' | 'code' | 'sync-actions'>('contract');
  const [documentTitle, setDocumentTitle] = useState('قرارداد رسمی تفاهم‌نامه همکاری توسعه اکوسیستم هوش مصنوعی');
  const [content, setContent] = useState(`ماده ۱ — طرفین تفاهم‌نامه:
این سند راهبردی فی‌مابین اکوسیستم جهانی AIONVERSE به نمایندگی مهدی دل زنده (مهندس مهدی دل زنده - کد ملی: ۵۲۳۹۷۷۵۳۳۸) و مجموعه طرف دوم منعقد می‌گردد.

ماده ۲ — موضوع قرارداد:
صادرات خدمات فنی مهندسی، مدلسازی سه‌بعدی صنعتی CAD، اتصال به درگاه‌های پرداخت بین‌المللی و تخصیص ۵٪ از درآمدهای ناخالص به صندوق توسعه رسمی پلتفرم.

ماده ۳ — اصل بنیادین حقیقت (Truth Gate):
طرفین متعهد می‌شوند هرگونه محتوا یا خروجی رسانه‌ای پیش از انتشار به تصویب ممیزی دروازه حقیقت (Truth over Virality) برسد و از انتشار آمار جعلی و ادعای تضمین درآمد اکیداً خودداری نمایند.`);

  const [copied, setCopied] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleSynchronizeActions = () => {
    setSyncStatus('در حال ارسال دستور هماهنگ‌سازی به ناوگان ۲۵ ایجنت و دروازه حقیقت...');
    setTimeout(() => {
      setSyncStatus('همگام‌سازی اقدامات سازمانی با موفقیت انجام شد: قرارداد در دفترکل ثبت و به صف بررسی مالک ارجاع یافت.');
    }, 1500);
  };

  const handleDownloadDoc = (format: 'txt' | 'csv' | 'json') => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aurevia-Document-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <FileEdit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              ویرایشگر همه‌کاره سازمانی و همگام‌ساز اقدامات (Enterprise Master Editor)
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded font-mono border border-amber-500/30">
                Action Synchronizer
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تنظیم اسناد رسمی، فاکتورها، جداول مالی، سورس‌کد و ارسال خودکار فرآیندها به ایجنت‌های تخصصی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSynchronizeActions}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
            همگام‌سازی اقدامات با ایجنت‌ها
          </button>
        </div>
      </div>

      {syncStatus && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-2xl text-xs text-emerald-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {syncStatus}
          </span>
          <button onClick={() => setSyncStatus(null)} className="text-slate-400 hover:text-white font-mono">✕</button>
        </div>
      )}

      {/* Mode Selector */}
      <div className="flex flex-wrap items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl text-xs gap-1">
        {[
          { id: 'contract', label: 'اسناد و قراردادهای رسمی', icon: FileText },
          { id: 'financial', label: 'ترازنامه و فاکتور سازمانی', icon: FileSpreadsheet },
          { id: 'code', label: 'ویرایشگر کدهای سیستمی', icon: Code },
          { id: 'sync-actions', label: 'پایپ‌لاین همگام‌سازی اقدامات', icon: Bot },
        ].map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setEditorMode(mode.id as any)}
              className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 cursor-pointer ${
                editorMode === mode.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {mode.label}
            </button>
          );
        })}
      </div>

      {/* Editor Main Canvas */}
      {editorMode !== 'sync-actions' ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3 p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="flex-1 bg-transparent text-sm font-bold text-slate-100 focus:outline-none focus:border-b focus:border-amber-500 pb-1"
            />

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownloadDoc('txt')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium flex items-center gap-1 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                دانلود سند (Word/PDF)
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(content);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium flex items-center gap-1 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'کپی شد' : 'کپی متن'}
              </button>
            </div>
          </div>

          <textarea
            rows={14}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-amber-500 selection:bg-amber-500/30 selection:text-amber-200"
          />

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              امضای دیجیتال و هش معتبر لجر سازمانی فعال است
            </span>
            <span>تعداد کاراکتر: {content.length.toLocaleString('fa-IR')}</span>
          </div>
        </div>
      ) : (
        /* Action Synchronizer Pipeline Map */
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bot className="w-4 h-4 text-amber-400" />
            نقشه پایپ‌لاین و همگام‌سازی زنجیره‌ای اقدامات هوشمند:
          </div>

          <div className="space-y-3">
            {[
              { step: 1, agent: 'Chief Orchestrator Agent (#1)', action: 'تحلیل سند و تفکیک تسک‌های حقوقی و فنی', status: 'آماده اجرا' },
              { step: 2, agent: 'Truth Verification Agent (#5)', action: 'ممیزی ضدتوهم، بررسی استنادات و عدم ادعای غیرواقعی', status: 'تأییدیه سبز' },
              { step: 3, agent: 'Copyright & Legal Risk (#6)', action: 'احراز انطباق با قوانین بین‌المللی و لایسنس‌های باز', status: 'بررسی شد' },
              { step: 4, agent: 'Development Fund Agent (#12)', action: 'محاسبه سهم ۵٪ صندوق توسعه و تخصیص به دامنه‌ها', status: 'در صف واریز' },
              { step: 5, agent: 'Human Review Coordinator (#7)', action: 'ارجاع سند نهایی جهت امضا به مهندس مهدی دلزنده', status: 'انتظار تایید نهایی' },
            ].map((st) => (
              <div key={st.step} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                    {st.step}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{st.agent}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{st.action}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  {st.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
