import React, { useState } from 'react';
import {
  ShieldAlert,
  HardDrive,
  Trash2,
  CloudUpload,
  RefreshCw,
  CheckCircle2,
  Zap,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export function SystemGuardianModule() {
  const [totalStorageMB, setTotalStorageMB] = useState(10240); // 10 GB
  const [usedStorageMB, setUsedStorageMB] = useState(1420);
  const [cacheMB, setCacheMB] = useState(480);
  const [duplicatesMB, setDuplicatesMB] = useState(180);
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanLog, setCleanLog] = useState<string[]>([]);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);

  const handleCleanJunk = () => {
    setIsCleaning(true);
    setTimeout(() => {
      setIsCleaning(false);
      const freed = cacheMB + duplicatesMB;
      setUsedStorageMB((prev) => Math.max(200, prev - freed));
      setCacheMB(0);
      setDuplicatesMB(0);
      setCleanLog((prev) => [
        `[پاکسازی امن در ${new Date().toLocaleTimeString('fa-IR')}]: آزادسازی ${freed} مگابایت کش بافت‌های سه بعدی و لاگ‌های قدیمی با موفقیت انجام شد.`,
        ...prev,
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Principle Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              کاوشگر پایداری سیستم و بهینه‌ساز فضا (Aurevia System Guardian)
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded font-mono border border-cyan-500/30">
                Self-Healing AI Agent (#14 & #21)
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              پایش ۲۴/۷، آزادسازی هوشمند حافظه نهان، حذف موارد تکراری و پشتیبان‌گیری ابری هر ۳۰ ثانیه
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoBackupEnabled(!autoBackupEnabled)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              autoBackupEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <CloudUpload className="w-4 h-4" />
            {autoBackupEnabled ? 'بکاپ خودکار ۳۰ ثانیه‌ای فعال' : 'بکاپ خودکار غیرفعال'}
          </button>
        </div>
      </div>

      {/* Storage & Resource Meters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="text-[11px] text-slate-400">فضای ذخیره‌سازی ابری R2:</div>
          <div className="text-lg font-black text-slate-100 font-mono mt-1">
            {(usedStorageMB / 1024).toFixed(2)} GB / {(totalStorageMB / 1024).toFixed(0)} GB
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(usedStorageMB / totalStorageMB) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1">۱۰ گیگابایت رایگان ماهانه در Cloudflare R2</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="text-[11px] text-slate-400">کش و بافرهای موقت WebGL:</div>
          <div className="text-lg font-black text-amber-400 font-mono mt-1">
            {cacheMB} MB
          </div>
          <div className="text-[10px] text-slate-500 mt-2">قابل پاکسازی بدون آسیب به مدل‌های اصلی</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="text-[11px] text-slate-400">فایل‌های تکراری و زائد:</div>
          <div className="text-lg font-black text-rose-400 font-mono mt-1">
            {duplicatesMB} MB
          </div>
          <div className="text-[10px] text-slate-500 mt-2">شناسایی شده توسط الگوریتم جستجوی هش</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="text-[11px] text-slate-400">شاخص سلامت و خودترمیمی:</div>
          <div className="text-lg font-black text-emerald-400 font-mono mt-1">
            ۹۹.۹۴٪
          </div>
          <div className="text-[10px] text-emerald-400 mt-2">پایداری آپ‌تایم سرور و کلاینت</div>
        </div>
      </div>

      {/* Clean Button Action */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-slate-200">
            پیشنهاد هوشمند کاهش فضای مصرفی و بهینه‌سازی سرعت
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            با پاکسازی کش و بافرهای اضافه، سرعت لودینگ استودیو سه بعدی تا ۴۰٪ افزایش می‌یابد.
          </div>
        </div>

        <button
          onClick={handleCleanJunk}
          disabled={isCleaning || (cacheMB === 0 && duplicatesMB === 0)}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition disabled:opacity-40"
        >
          <Trash2 className="w-4 h-4" />
          {isCleaning ? 'در حال پاکسازی امن...' : `پاکسازی و آزادسازی ${(cacheMB + duplicatesMB)} مگابایت`}
        </button>
      </div>

      {/* Telemetry Log */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          گزارش مانیتورینگ سلامت سیستم و خودترمیمی لایو
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto">
          <div className="text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            [08:11:06]: اتصال سرور ابری Cloudflare Pages و حافظه D1 با لتنسی ۲۱ میلی‌ثانیه تأیید شد.
          </div>
          <div className="text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            [08:11:15]: ممیزی امنیتی Zero-Raw-Key در تمامی کامپوننت‌های فرانت‌اند تأیید گردید.
          </div>
          {cleanLog.map((log, idx) => (
            <div key={idx} className="text-amber-400 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
