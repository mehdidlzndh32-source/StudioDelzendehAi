import React from 'react';
import { MainSection, UserRole } from '../types';
import {
  Globe,
  User,
  ShieldCheck,
  PiggyBank,
  Sparkles,
  Bot,
  Lock,
  ChevronDown
} from 'lucide-react';

import royalEmblemImg from '../assets/images/studiodelzendehai_royal_emblem_1793353057057.jpg';

interface Props {
  activeSection: MainSection | 'dubbing';
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  lang: 'fa' | 'en' | 'ar';
  onLangChange: (lang: 'fa' | 'en' | 'ar') => void;
}

export function TopNavbar({
  activeSection,
  currentRole,
  onRoleChange,
  lang,
  onLangChange,
}: Props) {
  const isEn = lang === 'en';
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#07090e]/90 backdrop-blur-xl px-4 lg:px-8 py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & StudioDelzendehAi Royal Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 opacity-75 blur-xs group-hover:opacity-100 transition animate-pulse pointer-events-none" />
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1f0913] to-[#0d0408] border-2 border-amber-400 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center overflow-hidden">
              <img
                src={royalEmblemImg}
                alt="StudioDelzendehAi"
                className="w-full h-full object-cover"
              />
              <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#07090e]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-slate-100">
                AIONVERSE <span className="text-amber-400 text-xs font-mono">5.0</span>
              </span>
              <span className="text-[10px] bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-indigo-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                <span>StudioDelzendehAi</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>{isEn ? 'Founder & Architect:' : 'موسس و بنیان‌گذار سازمان:'}</span>
              <strong className="text-amber-400 font-bold">مهندس مهدی دل زنده</strong>
              <span className="text-[9px] text-slate-500 font-mono">(۵۲۳۹۷۷۵۳۳۸)</span>
            </div>
          </div>
        </div>

        {/* Live System Telemetry Badges */}
        <div className="hidden lg:flex items-center gap-3 font-mono text-[11px]">
          <div className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-slate-300">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
            <span>۲۵ ایجنت خودگردان</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Truth Gate فعال</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-cyan-300">
            <PiggyBank className="w-3.5 h-3.5 text-cyan-400" />
            <span>صندوق: ۲۸.۴M ریال</span>
          </div>
        </div>

        {/* Controls: Role Selector & Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role selector dropdown to test Accountant vs Owner workflows */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <span className="text-slate-400 text-[10px] px-2 hidden md:inline">نقش:</span>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="owner" className="bg-slate-900 text-slate-200">مالک (مهدی دل زنده)</option>
              <option value="accountant" className="bg-slate-900 text-slate-200">حسابدار رسمی</option>
              <option value="admin" className="bg-slate-900 text-slate-200">مدیر سیستم</option>
              <option value="reviewer" className="bg-slate-900 text-slate-200">بازبین Truth Gate</option>
            </select>
          </div>

          {/* Language Switch */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-bold font-mono">
            <button
              onClick={() => onLangChange('fa')}
              className={`px-2.5 py-1 rounded-lg transition ${
                lang === 'fa' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              فارسی
            </button>
            <button
              onClick={() => onLangChange('en')}
              className={`px-2.5 py-1 rounded-lg transition ${
                lang === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLangChange('ar')}
              className={`px-2.5 py-1 rounded-lg transition ${
                lang === 'ar' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              عربي
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
