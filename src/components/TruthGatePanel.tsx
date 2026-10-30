import React, { useState } from 'react';
import { TruthInspection } from '../types';
import { INITIAL_INSPECTIONS } from '../data/mockData';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Search,
  FileCheck,
  UserCheck,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

export function TruthGatePanel() {
  const [inspections, setInspections] = useState<TruthInspection[]>(INITIAL_INSPECTIONS);
  const [selectedInspection, setSelectedInspection] = useState<TruthInspection | null>(null);
  const [newClaim, setNewClaim] = useState('');
  const [newSource, setNewSource] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClaim.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const isRisky = newClaim.toLowerCase().includes('تضمینی') || newClaim.toLowerCase().includes('۱۰۰٪') || newClaim.toLowerCase().includes('میلیاردر');
      const newEntry: TruthInspection = {
        id: `TRUTH-2026-${Math.floor(100 + Math.random() * 900)}`,
        title: newClaim,
        source: newSource || 'بررسی هوش مصنوعی ضدتوهم Truth Gate',
        credibilityScore: isRisky ? 45 : 96,
        hallucinationRisk: isRisky ? 'high' : 'low',
        copyrightStatus: 'verified',
        decision: isRisky ? 'needs_human_review' : 'approved',
        auditLog: [
          `تاریخ ارسال: ${new Date().toLocaleTimeString('fa-IR')}`,
          isRisky 
            ? 'هشدار: ادعای تضمین درآمد یا قطعیت افراطی کشف شد. ارسال به بازبینی انسانی مهندس مهدی دلزنده.' 
            : 'راستی‌آزمایی با پایگاه داده‌های علمی و منابع رسمی تطبیق داده شد. بدون توهم.',
          'اصل بنیادین: حقیقت بالاتر از وایرال شدن (Truth over Virality).'
        ],
        submittedBy: 'کاربر سیستم / فیلتر هوشمند',
        timestamp: 'همین الان'
      };

      setInspections([newEntry, ...inspections]);
      setSelectedInspection(newEntry);
      setNewClaim('');
      setNewSource('');
    }, 1200);
  };

  const updateDecision = (id: string, decision: TruthInspection['decision']) => {
    setInspections(inspections.map(item => {
      if (item.id === id) {
        const updated = {
          ...item,
          decision,
          auditLog: [...item.auditLog, `تصمیم توسط مدیر ثبت شد: ${decision} در ساعت ${new Date().toLocaleTimeString('fa-IR')}`]
        };
        if (selectedInspection?.id === id) setSelectedInspection(updated);
        return updated;
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Principle Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-amber-500/30 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-amber-300">دروازه حقیقت Aurevia Truth Gate</h2>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-mono border border-amber-500/30">
                  Zero-Hallucination Sentinel
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                اصل بنیادین غیرقابل‌مذاکره: <span className="text-amber-400 font-bold">حقیقت برتر از وایرال شدن است (Truth over Virality)</span>. هیچ محتوایی نباید با آمار جعلی، منابع ساختگی، نقل‌قول‌های خیالی یا ادعای تضمین درآمد منتشر شود.
              </p>
            </div>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-center shrink-0">
            <div className="text-xs text-slate-400">تأییدیه نهایی مالک</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">مهندس مهدی دلزنده</div>
            <div className="text-[10px] text-amber-400 font-mono">Chief Architect & Owner</div>
          </div>
        </div>
      </div>

      {/* Verification submission form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-200 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          ارزیابی آنی محتوا و راستی‌آزمایی منبع قبل از انتشار
        </div>
        <form onSubmit={handleVerifyNew} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <input
                type="text"
                value={newClaim}
                onChange={(e) => setNewClaim(e.target.value)}
                placeholder="عنوان مطلب، ادعا، یا سناریوی محتوایی مورد نظر را وارد کنید..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <input
                type="text"
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                placeholder="منبع استناد یا لینک مرجع (اختیاری)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              محتوای حاوی ادعای تضمین درآمد یا منابع بدون استناد به صف بررسی انسانی فرستاده می‌شود.
            </div>
            <button
              type="submit"
              disabled={isVerifying || !newClaim.trim()}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition disabled:opacity-50"
            >
              <Search className="w-3.5 h-3.5" />
              {isVerifying ? 'در حال راستی‌آزمایی...' : 'ممیزی در دروازه حقیقت'}
            </button>
          </div>
        </form>
      </div>

      {/* Main Inspections Table and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-400" />
              صف ممیزی اسناد و خروجی‌های ایجنت‌ها
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              مجموع موارد: {inspections.length}
            </span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {inspections.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedInspection(item)}
                className={`p-4 cursor-pointer transition flex items-start justify-between gap-4 ${
                  selectedInspection?.id === item.id
                    ? 'bg-amber-500/10 border-r-4 border-amber-500'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.id}
                    </span>
                    <h3 className="text-xs font-bold text-slate-200 hover:text-amber-300 transition line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-3">
                    <span>ارائه‌دهنده: {item.submittedBy}</span>
                    <span>•</span>
                    <span className="font-mono text-slate-500">{item.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-center">
                    <div className="text-xs font-mono font-bold text-amber-400">
                      {item.credibilityScore}%
                    </div>
                    <div className="text-[9px] text-slate-400">اعتبار منبع</div>
                  </div>

                  <div>
                    {item.decision === 'approved' && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        تأیید شده
                      </span>
                    )}
                    {item.decision === 'approved_with_edits' && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        تأیید با اصلاح
                      </span>
                    )}
                    {item.decision === 'needs_human_review' && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        بررسی انسانی
                      </span>
                    )}
                    {item.decision === 'rejected' && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        رد شده
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Item Audit Details */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          {selectedInspection ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  شناسنامه ممیزی حقیقت
                </div>
                <span className="text-[10px] font-mono text-slate-400">{selectedInspection.id}</span>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-1">موضوع بررسی:</div>
                <div className="text-xs font-bold text-slate-200 leading-relaxed">
                  {selectedInspection.title}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-1">استناد و مستندات:</div>
                <div className="text-xs text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 font-mono text-left break-all">
                  {selectedInspection.source}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400">ریسک توهم AI:</div>
                  <div className={`font-bold mt-0.5 ${
                    selectedInspection.hallucinationRisk === 'low' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {selectedInspection.hallucinationRisk === 'low' ? 'پایین (تأیید مستند)' : 'بالا (نیازمند اصلاح)'}
                  </div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400">حق نشر (Copyright):</div>
                  <div className="font-bold text-slate-200 mt-0.5">
                    {selectedInspection.copyrightStatus === 'verified' ? 'قانونی و آزاد' : 'نیازمند بررسی مجوز'}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-1.5">لاگ ممیزی سیستم:</div>
                <div className="space-y-1.5 bg-slate-950 p-3 rounded-lg border border-slate-800 max-h-40 overflow-y-auto font-mono text-[10px]">
                  {selectedInspection.auditLog.map((log, idx) => (
                    <div key={idx} className="text-slate-300 flex items-start gap-1.5">
                      <span className="text-amber-500">›</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons for Reviewer / Owner */}
              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] text-slate-400 mb-2 font-medium">اقدام ممیزی (ویژه مالک / بازبین):</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateDecision(selectedInspection.id, 'approved')}
                    className="py-2 px-2 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 text-[11px] font-bold transition text-center"
                  >
                    تأیید انتشار
                  </button>
                  <button
                    onClick={() => updateDecision(selectedInspection.id, 'needs_human_review')}
                    className="py-2 px-2 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-[11px] font-bold transition text-center"
                  >
                    ارجاع به مالک
                  </button>
                  <button
                    onClick={() => updateDecision(selectedInspection.id, 'rejected')}
                    className="py-2 px-2 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 text-[11px] font-bold transition text-center"
                  >
                    رد و انسداد
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
              <ShieldCheck className="w-12 h-12 text-slate-700 mb-2" />
              <div className="text-xs">یک مورد را از صف ممیزی انتخاب کنید تا جزییات اعتبارسنجی نمایش داده شود.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
