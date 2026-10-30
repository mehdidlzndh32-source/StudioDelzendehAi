import React, { useState } from 'react';
import { EmployeeStatus } from '../types';
import { INITIAL_EMPLOYEES } from '../data/mockData';
import {
  Users,
  MapPin,
  Camera,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Building,
  GitBranch,
  Shield,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export function EnterpriseModule() {
  const [employees, setEmployees] = useState<EmployeeStatus[]>(INITIAL_EMPLOYEES);
  const [selectedEmp, setSelectedEmp] = useState<EmployeeStatus | null>(INITIAL_EMPLOYEES[0]);
  const [simulatingFaceScan, setSimulatingFaceScan] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const triggerFaceCheck = (id: string) => {
    setSimulatingFaceScan(true);
    setActionNotice(null);
    setTimeout(() => {
      setSimulatingFaceScan(false);
      setEmployees(employees.map(e => e.id === id ? { ...e, faceVerified: true, status: 'online' } : e));
      setActionNotice('احراز هویت بیومتریک و تطبیق چهره با دقت ۹۹.۶٪ تأیید شد.');
    }, 1400);
  };

  const triggerDirectCall = (emp: EmployeeStatus) => {
    setActionNotice(`درخواست برقراری تماس امن با ${emp.name} ثبت شد (ارسال سیگنال VoIP).`);
  };

  const triggerDirectSMS = (emp: EmployeeStatus) => {
    setActionNotice(`ارسال پیامک سازمانی به ${emp.name} برای به‌روزرسانی گزارش کار.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              سیستم مدیریت سازمانی و منابع انسانی AIONVERSE
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">Enterprise v5.0</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              حضور و غیاب هوشمند با تشخیص چهره، موقعیت‌یابی ماهواره‌ای لایو و یکپارچه‌سازی ابزارهای Slack, Jira, GitHub
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg font-mono">
            مالک سیستم: مهندس مهدی دلزنده
          </span>
        </div>
      </div>

      {actionNotice && (
        <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-300 flex items-center justify-between">
          <span>{actionNotice}</span>
          <button onClick={() => setActionNotice(null)} className="text-slate-400 hover:text-white font-mono">✕</button>
        </div>
      )}

      {/* Main Grid: Staff Table + Radar / Live Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff Table */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              فهرست کارکنان و وضعیت لحظه‌ای شیفت کاری
            </div>
            <button
              onClick={() => triggerFaceCheck(selectedEmp?.id || 'EMP-01')}
              disabled={simulatingFaceScan}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              {simulatingFaceScan ? 'اسکن بیومتریک چهره...' : 'ثبت چهره هوشمند'}
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {employees.map((emp) => (
              <div
                key={emp.id}
                onClick={() => setSelectedEmp(emp)}
                className={`p-4 cursor-pointer transition flex items-center justify-between gap-4 ${
                  selectedEmp?.id === emp.id
                    ? 'bg-cyan-500/10 border-r-4 border-cyan-500'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
                      {emp.name.charAt(0)}
                    </div>
                    {emp.status === 'online' && (
                      <span className="absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">{emp.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({emp.id})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{emp.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left font-mono">
                    <div className="text-xs text-slate-300">
                      {emp.tasksCompleted} / {emp.totalTasks} تسک
                    </div>
                    <div className="w-24 bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: `${(emp.tasksCompleted / emp.totalTasks) * 100}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      emp.status === 'online'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : emp.status === 'on_site'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {emp.status === 'online' ? 'آنلاین' : emp.status === 'on_site' ? 'در محل' : 'دورکار'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Satellite Position Radar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          {selectedEmp && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  رصد ماهواره‌ای زنده (Live GPS)
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  ماهواره رله AION-7
                </span>
              </div>

              {/* Radar Graphic Simulation */}
              <div className="relative w-full h-48 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
                {/* Rings */}
                <div className="absolute w-40 h-40 rounded-full border border-cyan-500/20" />
                <div className="absolute w-24 h-24 rounded-full border border-cyan-500/30" />
                <div className="absolute w-12 h-12 rounded-full border border-cyan-500/40" />
                <div className="absolute w-full h-[1px] bg-cyan-500/10" />
                <div className="absolute h-full w-[1px] bg-cyan-500/10" />

                {/* Blip */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/30 border-2 border-cyan-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
                  </div>
                  <span className="text-[10px] text-cyan-300 font-bold mt-1 bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/40">
                    {selectedEmp.name}
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-500">
                  LAT: {selectedEmp.lat.toFixed(4)} | LNG: {selectedEmp.lng.toFixed(4)}
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>موقعیت تأیید شده:</span>
                  <span className="text-slate-200 font-medium">{selectedEmp.locationName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>احراز بیومتریک چهره:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    تأیید سیستم
                  </span>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => triggerDirectCall(selectedEmp)}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  تماس خودکار
                </button>
                <button
                  onClick={() => triggerDirectSMS(selectedEmp)}
                  className="py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  ارسال پیامک
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Integration Pipelines */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <div className="text-xs font-bold text-slate-200 mb-4 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-amber-400" />
          وضعیت همگام‌سازی ابزارهای تیمی سازمانی (DevOps & Management Pipelines)
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { name: 'Slack Workplace', status: 'متصل — کانال #aionverse-core', icon: '💬', ping: '18ms' },
            { name: 'Jira Enterprise', status: 'متصل — اسپرینت ۲۴ فعال', icon: '📋', ping: '32ms' },
            { name: 'GitHub Ecosystem', status: 'مخزن skynhkatwn-coder فعال', icon: '🐙', ping: '24ms' },
            { name: 'GitLab CI/CD', status: 'پایپ‌لاین بیلد خودکار سبز', icon: '🦊', ping: '19ms' },
            { name: 'Trello Boards', status: 'تسک‌های هفتگی همگام', icon: '📊', ping: '41ms' },
          ].map((tool, idx) => (
            <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-lg">{tool.icon}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {tool.ping}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200">{tool.name}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{tool.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
