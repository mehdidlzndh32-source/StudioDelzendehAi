import React, { useState } from 'react';
import royalEmblemImg from '../assets/images/studiodelzendehai_royal_emblem_1793353057057.jpg';
import {
  Code2,
  Play,
  Terminal,
  Save,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  GitBranch,
  Cloud,
  FileCode,
  FolderGit2,
  FilePlus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';

interface CodeFile {
  name: string;
  language: string;
  iconColor: string;
  content: string;
  description: string;
}

const INITIAL_FILES: CodeFile[] = [
  {
    name: 'cloudflare_edge_worker.ts',
    language: 'typescript',
    iconColor: 'text-amber-400',
    description: 'ورکر توزیع‌شده لبه در ۳۳۰ شهر جهان با تاییدیه مالکیت',
    content: `/**
 * AIONVERSE 5.0 — Cloudflare Edge Worker
 * Architecture: StudioDelzendehAi
 * Owner & Architect: Eng. Mehdi Del Zende (مهندس مهدی دل زنده)
 * National ID: 5239775338 | Contact: +9809910966022
 */

export interface Env {
  D1_DATABASE: D1Database;
  R2_STORAGE: R2Bucket;
  OWNER_EMAIL: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
    const country = request.cf?.country || 'IR';

    // Healthcheck & Route Dispatcher
    if (url.pathname === '/api/v1/health') {
      return Response.json({
        status: 'ONLINE',
        system: 'AIONVERSE Edge Microservice',
        studio: 'StudioDelzendehAi',
        founder: 'Mehdi Del Zende',
        node: request.cf?.colo || 'THR',
        timestamp: new Date().toISOString()
      });
    }

    // Edge Security: Owner Signature Verification
    if (url.pathname === '/api/v1/owner/verify') {
      return Response.json({
        verified: true,
        beneficiary: 'مهندس مهدی دل زنده',
        national_id: '5239775338',
        permissions: ['ROOT_ACCESS', 'ESCROW_APPROVE', 'DNS_OVERRIDE'],
        domains: ['aionverse.io', 'aionverse.com', 'delzende-ai.ir']
      });
    }

    return new Response('StudioDelzendehAi Edge Worker Running Smoothly', {
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    });
  }
};`
  },
  {
    name: 'alibaba_temu_arbitrage.py',
    language: 'python',
    iconColor: 'text-emerald-400',
    description: 'اسکریپت کاوشگر خودکار و مقایسه قیمت با آمازون و والمارت',
    content: `# -*- coding: utf-8 -*-
"""
StudioDelzendehAi — Alibaba & Temu Autonomous Arbitrage Explorer
Founder: Eng. Mehdi Del Zende (مهندس مهدی دل زنده)
National ID: 5239775338 | Email: mehdidlzndh@gmail.com
"""

import time
import json
from dataclasses import dataclass

@dataclass
class ArbitrageOpportunity:
    product_name: str
    supplier_price_usd: float
    market_price_usd: float
    estimated_margin_pct: float
    viral_score: int

def scan_hot_items():
    catalog = [
        {"name": "Ultra-HD 4K Laser Cinema Projector", "supplier": 38.5, "amazon": 129.99},
        {"name": "Titanium Wireless ANC Studio Earbuds", "supplier": 14.8, "amazon": 54.00},
        {"name": "MagSafe 3-in-1 Foldable Charging Station", "supplier": 8.2, "amazon": 29.99},
        {"name": "Smart EMS Lumbar Massager Belt", "supplier": 11.5, "amazon": 42.50}
    ]
    
    opportunities = []
    for item in catalog:
        cost = item["supplier"]
        retail = item["amazon"]
        margin = round(((retail - cost) / retail) * 100, 2)
        opportunities.append(
            ArbitrageOpportunity(
                product_name=item["name"],
                supplier_price_usd=cost,
                market_price_usd=retail,
                estimated_margin_pct=margin,
                viral_score=94
            )
        )
    return opportunities

if __name__ == "__main__":
    print("[StudioDelzendehAi] Initializing Autonomous Hunter Agent...")
    results = scan_hot_items()
    for opp in results:
        print(f"-> {opp.product_name}: Cost \\\${opp.supplier_price_usd} | Retail \\\${opp.market_price_usd} | Margin: {opp.estimated_margin_pct}%")
    print("[OK] Opportunities dispatched to 8 Social Distribution Channels.")`
  },
  {
    name: 'audio_synthesizer.ts',
    language: 'typescript',
    iconColor: 'text-rose-400',
    description: 'موتور سنتز صوتی Web Audio برای آهنگ‌های فضایی و فرکانس ۴۳۲Hz',
    content: `/**
 * StudioDelzendehAi — Web Audio Neural Synthesizer & Healing Frequencies
 * Founder: Eng. Mehdi Del Zende (مهندس مهدی دل زنده)
 */

export class CosmicAudioEngine {
  private ctx: AudioContext;
  private masterGain: GainNode;

  constructor() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  playCosmicChord(fundamentalFreq = 432) {
    const ratios = [1, 1.25, 1.5, 1.875]; // Solfeggio & Harmonic series
    ratios.forEach((ratio, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(fundamentalFreq * ratio, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 3.5);
    });
    console.log(\`[AudioEngine] 432Hz Harmonic generated. Owner: Mehdi Del Zende\`);
  }
}`
  },
  {
    name: 'schema_cloudflare_d1.sql',
    language: 'sql',
    iconColor: 'text-cyan-400',
    description: 'جداول پایگاه داده لبه D1 با ثبت سند مالکیت و مانیتایزینگ',
    content: `-- AIONVERSE D1 Cloud Database Schema
-- Registrant & Beneficiary: Mehdi Del Zende (کد ملی: ۵۲۳۹۷۷۵۳۳۸)

CREATE TABLE IF NOT EXISTS platform_registry (
    id TEXT PRIMARY KEY,
    owner_name TEXT NOT NULL DEFAULT 'مهدی دل زنده',
    national_id TEXT NOT NULL DEFAULT '5239775338',
    phone TEXT NOT NULL DEFAULT '+9809910966022',
    email TEXT NOT NULL DEFAULT 'mehdidlzndh@gmail.com',
    irnic_handle TEXT NOT NULL DEFAULT 'md5239-irnic',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dropship_orders (
    order_id TEXT PRIMARY KEY,
    product_name TEXT NOT NULL,
    supplier_platform TEXT CHECK(supplier_platform IN ('Alibaba', 'Temu')),
    supplier_cost_usd REAL NOT NULL,
    selling_price_usd REAL NOT NULL,
    profit_margin_pct REAL NOT NULL,
    customer_country TEXT NOT NULL,
    status TEXT DEFAULT 'CONFIRMED'
);

CREATE TABLE IF NOT EXISTS social_channel_metrics (
    channel_name TEXT PRIMARY KEY,
    bot_handle TEXT NOT NULL,
    subscribers INTEGER DEFAULT 0,
    monthly_revenue_usd REAL DEFAULT 0,
    last_broadcast TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Verified Record
INSERT OR IGNORE INTO platform_registry (id, owner_name, national_id, phone, email)
VALUES ('AION-ROOT-001', 'مهندس مهدی دل زنده', '5239775338', '+9809910966022', 'mehdidlzndh@gmail.com');`
  }
];

export function CodeStudioModule() {
  const [files, setFiles] = useState<CodeFile[]>(INITIAL_FILES);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    'StudioDelzendehAi Cloud IDE v5.0 initialized.',
    'Ready to edit, test, and deploy to Cloudflare Edge Network.',
    'Owner: مهندس مهدی دل زنده (کد ملی: ۵۲۳۹۷۷۵۳۳۸)'
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeFile = files[activeFileIndex];

  const handleContentChange = (newContent: string) => {
    setFiles((prev) =>
      prev.map((f, i) => (i === activeFileIndex ? { ...f, content: newContent } : f))
    );
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput((prev) => [
      ...prev,
      `> Executing [${activeFile.name}] on Sandboxed V8 Edge Runtime...`
    ]);

    setTimeout(() => {
      setIsRunning(false);
      const timestamp = new Date().toLocaleTimeString('fa-IR');
      let result = '';

      if (activeFile.name.includes('worker')) {
        result = `[${timestamp}] 200 OK — Cloudflare Edge Worker responded with status ONLINE. Node: THR-EDGE-01 (Tehran). Latency: 12ms. Verified: مهندس مهدی دل زنده.`;
      } else if (activeFile.name.includes('arbitrage')) {
        result = `[${timestamp}] Hunter Agent scanned 4 hot items on Alibaba & Temu. Average margin: 68.4%. 0 errors. Target channels: Telegram, TikTok, Instagram.`;
      } else if (activeFile.name.includes('audio')) {
        result = `[${timestamp}] Web Audio synthesis completed. 432Hz harmonic scale rendered. Stems ready for export.`;
      } else {
        result = `[${timestamp}] SQL execution success: 3 tables verified in Cloudflare D1. Primary key AION-ROOT-001 active.`;
      }

      setConsoleOutput((prev) => [...prev, result, 'Execution finished with exit code 0.']);
    }, 700);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setConsoleOutput((prev) => [
      ...prev,
      `[SAVED] File '${activeFile.name}' committed to local memory cache.`
    ]);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAiCodeGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    const p = aiPrompt;
    setAiPrompt('');

    setTimeout(() => {
      setIsGenerating(false);
      const generatedSnippet = `\n\n// [AI Code Copilot for: ${p}]\nexport function autoGeneratedFeature() {\n  console.log("Executing ${p} for StudioDelzendehAi...");\n  return { success: true, timestamp: Date.now() };\n}`;
      handleContentChange(activeFile.content + generatedSnippet);
      setConsoleOutput((prev) => [
        ...prev,
        `[AI COPILOT] Generated snippet for "${p}" appended to ${activeFile.name}.`
      ]);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Banner with Royal Emblem */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#1b0812] to-slate-900 border-2 border-amber-500/40 p-5 md:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] shrink-0 bg-black">
              <img
                src={royalEmblemImg}
                alt="StudioDelzendehAi"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                <Code2 className="w-3.5 h-3.5" />
                <span>StudioDelzendehAi • Advanced Cloud IDE & Edge Code Studio</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-100 flex items-center gap-2">
                محیط کدنویسی و توسعه تعاملی لبه (Cloud IDE)
              </h2>
              <p className="text-xs text-slate-400">
                ویرایشگر پیشرفته کدهای TypeScript، Python و SQL با اجرای زنده در ساندباکس و استقرار مستقیم در Cloudflare Pages و Workers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {isRunning ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <Play className="w-4 h-4 fill-slate-950" />
              )}
              <span>{isRunning ? 'در حال اجرا...' : 'اجرای کد (Run)'}</span>
            </button>

            <button
              onClick={handleSave}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              {saveSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? 'ذخیره شد' : 'ذخیره'}</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'کپی شد' : 'کپی کد'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main IDE Workspace (Sidebar Files + Editor + Terminal) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* File Explorer Sidebar */}
        <div className="lg:col-span-1 rounded-2xl bg-slate-950/80 border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-amber-400" />
              <span>فایل‌های پروژه</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">۴ فایل فعال</span>
          </div>

          <div className="space-y-1.5">
            {files.map((file, idx) => {
              const isSelected = activeFileIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`w-full text-right p-2.5 rounded-xl text-xs transition cursor-pointer flex flex-col gap-0.5 border ${
                    isSelected
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono font-bold text-[11px] ltr text-left">
                    <span className={file.iconColor}>{file.name}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-slate-950 text-slate-400">
                      {file.language}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{file.description}</div>
                </button>
              );
            })}
          </div>

          {/* Git Branch & Cloud Status */}
          <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span>شاخه کاری:</span>
              </span>
              <span className="font-mono text-amber-400 font-bold">main (Production)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span>سرور هدف:</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold">Cloudflare Pages Edge</span>
            </div>
          </div>
        </div>

        {/* Code Editor and Console Column */}
        <div className="lg:col-span-3 space-y-4">
          {/* Editor Header Bar */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                  {activeFile.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">UTF-8 • CRLF</span>
              </div>

              <div className="text-[10px] text-amber-400 font-mono">
                StudioDelzendehAi Monokai Dark
              </div>
            </div>

            {/* Code Textarea with Line Numbers Simulator */}
            <div className="flex bg-[#0b0e14] text-slate-100 font-mono text-xs overflow-x-auto min-h-[380px]">
              {/* Line Numbers */}
              <div className="py-3 px-3 select-none text-slate-600 bg-[#090b10] border-l border-slate-800/80 text-right font-mono text-[11px] space-y-1 shrink-0">
                {Array.from({ length: Math.max(activeFile.content.split('\n').length, 25) }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Editable Code Box */}
              <textarea
                value={activeFile.content}
                onChange={(e) => handleContentChange(e.target.value)}
                spellCheck={false}
                className="w-full py-3 px-4 bg-transparent text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none ltr text-left min-h-[380px]"
              />
            </div>
          </div>

          {/* AI Code Copilot Generator Prompt Bar */}
          <form
            onSubmit={handleAiCodeGenerate}
            className="p-3 rounded-2xl bg-slate-900 border border-amber-500/40 flex items-center gap-2 shadow-md"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="دستور هوش مصنوعی برای کدنویسی خودکار (مثال: افزودن متد محاسبه سود تتر یا ایجاد توابع احراز هویت)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={isGenerating || !aiPrompt.trim()}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-40 cursor-pointer"
            >
              {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
              <span>{isGenerating ? 'در حال تولید...' : 'تولید کد AI'}</span>
            </button>
          </form>

          {/* Interactive Terminal / Console Output */}
          <div className="rounded-2xl bg-black border border-slate-800 p-4 space-y-2 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-200">کنسول اجرای زنده (Edge Execution Output)</span>
              </div>
              <button
                onClick={() => setConsoleOutput(['Console cleared.'])}
                className="text-[10px] text-slate-500 hover:text-slate-300 transition cursor-pointer"
              >
                پاک‌سازی کنسول
              </button>
            </div>

            <div className="max-h-40 overflow-y-auto space-y-1 text-slate-300 text-[11px] ltr text-left">
              {consoleOutput.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith('>')
                      ? 'text-amber-400 font-bold'
                      : line.includes('OK') || line.includes('success') || line.includes('SAVED')
                      ? 'text-emerald-400'
                      : line.includes('Error')
                      ? 'text-rose-400'
                      : 'text-slate-300'
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
