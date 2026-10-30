import React, { useState } from 'react';
import { AgentInfo } from '../types';
import { INITIAL_AGENTS } from '../data/mockData';
import {
  Bot,
  Play,
  RotateCw,
  Search,
  CheckCircle,
  Clock,
  Sparkles,
  Cpu,
  Layers,
  ArrowUpRight,
  Shield,
  DollarSign,
  Share2
} from 'lucide-react';

export function AgentsOrchestrator() {
  const [agents, setAgents] = useState<AgentInfo[]>(INITIAL_AGENTS);
  const [filter, setFilter] = useState<'all' | 'core' | 'engineering' | 'content' | 'compliance' | 'finance' | 'social'>('all');
  const [search, setSearch] = useState('');
  const [runningAgentId, setRunningAgentId] = useState<string | null>(null);

  const filteredAgents = agents.filter(agent => {
    const matchesFilter = filter === 'all' || agent.category === filter;
    const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase()) ||
                          agent.nameFa.includes(search) ||
                          agent.roleFa.includes(search);
    return matchesFilter && matchesSearch;
  });

  const handleRunAgent = (id: string) => {
    setRunningAgentId(id);
    setAgents(agents.map(a => a.id === id ? { ...a, status: 'running' } : a));

    setTimeout(() => {
      setRunningAgentId(null);
      setAgents(agents.map(a => {
        if (a.id === id) {
          return {
            ...a,
            status: 'completed',
            lastAction: `عملیات خودکار در ساعت ${new Date().toLocaleTimeString('fa-IR')} با موفقیت اجرا شد.`
          };
        }
        return a;
      }));
    }, 1500);
  };

  const runAllAgents = () => {
    setAgents(agents.map(a => ({ ...a, status: 'running' })));
    setTimeout(() => {
      setAgents(agents.map(a => ({
        ...a,
        status: 'completed',
        lastAction: 'هماهنگ‌سازی دسته‌جمعی ایجنت‌ها با سرپرست ارشد با موفقیت پایان یافت.'
      })));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-amber-300 font-mono">۲۵ ایجنت</div>
            <div className="text-xs text-slate-400">ناوگان ایجنت‌های خودگردان</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-cyan-300 font-mono">۹۸.۶٪</div>
            <div className="text-xs text-slate-400">میانگین دقت استنادی</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-emerald-300 font-mono">۸ کانال تخصصی</div>
            <div className="text-xs text-slate-400">اتصال رسمی به شبکه‌ها</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-indigo-300 font-mono">خودترمیم فعال</div>
            <div className="text-xs text-slate-400">پایداری ۲۴/۷ لبه</div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در بین ۲۵ ایجنت تخصصی..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'همه (۲۵)', icon: Bot },
            { id: 'core', label: 'هسته سیستم', icon: Cpu },
            { id: 'engineering', label: 'فنی و ۳D', icon: Layers },
            { id: 'compliance', label: 'حقیقت و قانون', icon: Shield },
            { id: 'finance', label: 'مالی و تریدینگ', icon: DollarSign },
            { id: 'social', label: 'کانال‌ها و شبکه‌ها', icon: Share2 },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  filter === cat.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Run All Dispatcher */}
        <button
          onClick={runAllAgents}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/10 transition"
        >
          <RotateCw className="w-3.5 h-3.5" />
          هماهنگ‌سازی کل ناوگان
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
                    #{agent.number}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition">
                      {agent.nameFa}
                    </h3>
                    <div className="text-[10px] text-slate-400 font-mono">{agent.name}</div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium ${
                    agent.status === 'running'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : agent.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {agent.status === 'running' ? 'در حال اجرا' : agent.status === 'completed' ? 'آماده' : 'انتظار'}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {agent.roleFa}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
              <div className="text-[10px] text-slate-500 font-mono truncate">
                <span className="text-amber-500 font-bold">اقدام اخیر: </span>
                {agent.lastAction}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>شاخص دقت:</span>
                  <span className="font-mono font-bold text-amber-400">{agent.accuracy}%</span>
                </div>

                <button
                  onClick={() => handleRunAgent(agent.id)}
                  disabled={runningAgentId === agent.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  <Play className="w-3 h-3" />
                  {runningAgentId === agent.id ? 'در حال اجرا...' : 'اجرای وظیفه'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
