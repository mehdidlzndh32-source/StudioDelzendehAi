import React, { useState } from 'react';
import { FinancialEntry } from '../types';
import { INITIAL_FINANCIALS } from '../data/mockData';
import {
  Wallet,
  PiggyBank,
  CheckCircle2,
  XCircle,
  Clock,
  PlusCircle,
  FileSpreadsheet,
  Globe,
  Coins,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export function FinanceFundModule() {
  const [financials, setFinancials] = useState<FinancialEntry[]>(INITIAL_FINANCIALS);
  const [activeRole, setActiveRole] = useState<'owner' | 'accountant'>('owner');
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState<number>(5000000);
  const [newCurrency, setNewCurrency] = useState<'IRR' | 'USD' | 'USDT' | 'EUR'>('IRR');
  const [newCategory, setNewCategory] = useState('سرورها و زیرساخت');
  const [newType, setNewType] = useState<FinancialEntry['type']>('expense');

  // Fund Metrics
  const totalFundIRR = 28450000;
  const totalFundUSDT = 482;

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry: FinancialEntry = {
      id: `FIN-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle,
      type: newType,
      amount: newAmount,
      currency: newCurrency,
      status: activeRole === 'owner' ? 'approved' : 'pending_approval',
      scope: 'organization',
      preparedByRole: activeRole,
      approvedBy: activeRole === 'owner' ? 'مهدی دل زنده (مالک)' : undefined,
      category: newCategory,
      date: new Date().toLocaleDateString('fa-IR'),
    };

    setFinancials([newEntry, ...financials]);
    setShowDraftModal(false);
    setNewTitle('');
  };

  const handleApprove = (id: string) => {
    if (activeRole !== 'owner') {
      alert('خطای دسترسی: تنها مالک سیستم (مهدی دل زنده) مجوز تأیید نهایی مالی را دارد.');
      return;
    }
    setFinancials(financials.map(f => f.id === id ? {
      ...f,
      status: 'approved',
      approvedBy: 'مهدی دل زنده (مالک)'
    } : f));
  };

  const handleReject = (id: string) => {
    if (activeRole !== 'owner') {
      alert('خطای دسترسی: تنها مالک سیستم (مهدی دل زنده) مجوز رد اسناد مالی را دارد.');
      return;
    }
    setFinancials(financials.map(f => f.id === id ? {
      ...f,
      status: 'rejected',
      rejectionReason: 'عدم تطابق با بودجه‌بندی اسپرینت جاری'
    } : f));
  };

  const exportLedgerCSV = () => {
    let csv = 'شناسه,عنوان,نوع,مبلغ,ارز,وضعیت,مسئول ثبت,تأییدکننده,تاریخ\n';
    financials.forEach(f => {
      csv += `${f.id},"${f.title}",${f.type},${f.amount},${f.currency},${f.status},${f.preparedByRole},"${f.approvedBy || '-'}",${f.date}\n`;
    });

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aurevia-Financial-Ledger-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              صندوق توسعه AIONVERSE و دفترکل حسابداری سازمانی
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono border border-amber-500/30">
                قانون ۵٪ و ۳۰٪ توسعه
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              تخصیص اتوماتیک درآمدهای پلتفرم به خرید دامنه‌های رسمی، سرورهای GPU، دستمزد تیم و ثبت حقوقی تحت نظر مستقیم مهدی دل زنده
            </p>
          </div>
        </div>

        {/* Role toggle simulator to demonstrate Accountant vs Owner workflow */}
        <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveRole('owner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeRole === 'owner' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            مشاهده به عنوان: مالک (مهدی دل زنده)
          </button>
          <button
            onClick={() => setActiveRole('accountant')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeRole === 'accountant' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            مشاهده به عنوان: حسابدار رسمی
          </button>
        </div>
      </div>

      {/* Fund Allocation Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-amber-500/40 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-1">
            <span>موجودی صندوق توسعه (IRR):</span>
            <PiggyBank className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-slate-100 font-mono">
            {totalFundIRR.toLocaleString('fa-IR')} <span className="text-xs font-normal">ریال</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">ذخیره ۵٪ از فروش‌های فروشگاه و اشتراک‌ها</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-cyan-400 font-bold mb-1">
            <span>موجودی دلاری/تتر (USDT):</span>
            <Coins className="w-4 h-4" />
          </div>
          <div className="text-xl font-black text-cyan-300 font-mono">
            ${totalFundUSDT.toLocaleString()} <span className="text-xs font-normal">USDT</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">سود حاصل از معاملات ربات تریدینگ</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-1">
            <span>اولویت اول تخصیص صندوق:</span>
            <Globe className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-slate-200 mt-1">
            خرید دامنه‌های aionverse.com و AureviaAI.com
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">آماده واریز با تأیید مالک</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-indigo-400 font-bold mb-1">
            <span>پوشش دستمزد و سرورها:</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-slate-200 mt-1">
            توسعه پایدار و مقیاس‌پذیری
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">پوشش کامل زیرساخت ابری تا ۱۲ ماه</div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          وضعیت دسترسی جاری: <strong className="text-amber-400 font-mono">{activeRole.toUpperCase()}</strong>
          {activeRole === 'accountant' && ' (حق ثبت پیش‌نویس — نیازمند تأیید نهایی مالک)'}
          {activeRole === 'owner' && ' (حق انحصاری تأیید، رد، برداشت و خرید دامنه)'}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportLedgerCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            خروجی اکسل / CSV
          </button>
          <button
            onClick={() => setShowDraftModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            ثبت سند / پیش‌نویس مالی جدید
          </button>
        </div>
      </div>

      {/* Modal for creating financial entry */}
      {showDraftModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-amber-400" />
                ثبت سند مالی جدید در دفترکل دوبل
              </h3>
              <button onClick={() => setShowDraftModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateDraft} className="space-y-3.5">
              <div>
                <label className="text-xs text-slate-400 block mb-1">عنوان تراکنش یا هزینه:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: خرید API و اعتبار کلاستر هوش مصنوعی..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">مبلغ:</label>
                  <input
                    type="number"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">واحد پولی:</label>
                  <select
                    value={newCurrency}
                    onChange={(e) => setNewCurrency(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="IRR">ریال (IRR)</option>
                    <option value="USDT">تتر (USDT)</option>
                    <option value="USD">دلار (USD)</option>
                    <option value="EUR">یورو (EUR)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">نوع عملیات:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="income">درآمد و واریز</option>
                    <option value="expense">هزینه و برداشت</option>
                    <option value="fund_allocation">تخصیص به صندوق توسعه</option>
                    <option value="trading_fee">کارمزد تریدینگ ۱۰٪</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">دسته‌بندی:</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {activeRole === 'accountant'
                    ? 'این سند به عنوان «پیش‌نویس در انتظار تأیید مالک» ثبت خواهد شد.'
                    : 'با ثبت مالک (مهدی دل زنده)، سند مستقیماً در دفترکل تأیید می‌شود.'}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDraftModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  ثبت در سیستم مالی
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Financial Entries Ledger Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-amber-400" />
            دفترکل تراکنش‌ها و جریان مالی پلتفرم (Double-Entry Ledger)
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            قانون حذف ناپذیری اسناد مالی (Audit Preservation)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950/40 text-slate-400 border-b border-slate-800 text-[11px]">
              <tr>
                <th className="p-3.5 font-medium">شناسه سند</th>
                <th className="p-3.5 font-medium">عنوان تراکنش</th>
                <th className="p-3.5 font-medium">نوع</th>
                <th className="p-3.5 font-medium">مبلغ</th>
                <th className="p-3.5 font-medium">ثبت‌کننده</th>
                <th className="p-3.5 font-medium">وضعیت تأیید</th>
                <th className="p-3.5 font-medium">اقدام</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {financials.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-3.5 font-mono text-slate-400">{entry.id}</td>
                  <td className="p-3.5 font-medium">
                    <div>{entry.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{entry.category} • {entry.date}</div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      entry.type === 'income' ? 'bg-emerald-500/20 text-emerald-300' :
                      entry.type === 'expense' ? 'bg-rose-500/20 text-rose-300' :
                      entry.type === 'fund_allocation' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-cyan-500/20 text-cyan-300'
                    }`}>
                      {entry.type === 'income' ? 'درآمد' :
                       entry.type === 'expense' ? 'هزینه' :
                       entry.type === 'fund_allocation' ? 'صندوق ۵٪' : 'کارمزد ۱۰٪'}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold">
                    <span className={entry.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'}>
                      {entry.type === 'expense' ? '-' : '+'}
                      {entry.amount.toLocaleString('fa-IR')} {entry.currency}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 text-[11px]">
                    {entry.preparedByRole === 'accountant' ? 'حسابدار رسمی' : 'مهدی دل زنده (مالک)'}
                  </td>
                  <td className="p-3.5">
                    {entry.status === 'approved' && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-fit font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        تأیید شده
                      </span>
                    )}
                    {entry.status === 'pending_approval' && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 w-fit font-bold">
                        <Clock className="w-3 h-3" />
                        در انتظار مالک
                      </span>
                    )}
                    {entry.status === 'draft' && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 flex items-center gap-1 w-fit">
                        پیش‌نویس
                      </span>
                    )}
                    {entry.status === 'rejected' && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 w-fit font-bold">
                        <XCircle className="w-3 h-3" />
                        رد شده
                      </span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {entry.status === 'pending_approval' && activeRole === 'owner' ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleApprove(entry.id)}
                          className="px-2 py-1 bg-emerald-500 text-slate-950 font-bold rounded text-[10px] hover:bg-emerald-400 transition"
                        >
                          تأیید
                        </button>
                        <button
                          onClick={() => handleReject(entry.id)}
                          className="px-2 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded text-[10px] hover:bg-rose-500/30 transition"
                        >
                          رد
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">
                        {entry.approvedBy ? 'ثبت نهایی' : '—'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
