import React, { useState } from 'react';
import { TradingPair } from '../types';
import { INITIAL_TRADING_PAIRS } from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  ShieldAlert,
  ArrowUpRight,
  Layers,
  Percent,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export function CryptoBotModule() {
  const [pairs, setPairs] = useState<TradingPair[]>(INITIAL_TRADING_PAIRS);
  const [selectedPair, setSelectedPair] = useState<TradingPair>(INITIAL_TRADING_PAIRS[0]);
  const [isBotRunning, setIsBotRunning] = useState<boolean>(true);
  const [stopLoss, setStopLoss] = useState<number>(3.5);
  const [takeProfit, setTakeProfit] = useState<number>(8.0);
  const [simulatedTradesCount, setSimulatedTradesCount] = useState<number>(142);
  const [totalNetProfitUSDT, setTotalNetProfitUSDT] = useState<number>(4820);
  const [fundShareUSDT, setFundShareUSDT] = useState<number>(482); // 10%

  const handleSimulateSignal = () => {
    const updated = pairs.map((pair) => {
      const delta = (Math.random() - 0.48) * 2;
      const newPrice = +(pair.price * (1 + delta / 100)).toFixed(2);
      const newRsi = Math.min(85, Math.max(15, +(pair.rsi + (Math.random() - 0.5) * 4).toFixed(1)));
      let newSignal: TradingPair['signal'] = 'HOLD';
      if (newRsi < 32) newSignal = 'STRONG_BUY';
      else if (newRsi < 45) newSignal = 'BUY';
      else if (newRsi > 70) newSignal = 'SELL';

      return {
        ...pair,
        price: newPrice,
        change24h: +(pair.change24h + delta * 0.1).toFixed(2),
        rsi: newRsi,
        signal: newSignal,
      };
    });

    setPairs(updated);
    const active = updated.find((p) => p.symbol === selectedPair.symbol) || updated[0];
    setSelectedPair(active);

    setSimulatedTradesCount((prev) => prev + 1);
    const addedProfit = Math.floor(Math.random() * 45) + 10;
    setTotalNetProfitUSDT((prev) => prev + addedProfit);
    setFundShareUSDT((prev) => +(prev + addedProfit * 0.1).toFixed(1));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              ربات تریدینگ هوشمند رمزارزی AION-Crypto
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded font-mono border border-emerald-500/30">
                ضریب خطا &lt; ۵٪
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              معاملات جفتی (Pair Trading)، استراتژی‌های RSI / MACD / باندهای بولینگر با تخصیص خودکار ۱۰٪ کارمزد به صندوق توسعه
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-left">
            <div className="text-[10px] text-slate-400">۱۰٪ واریز به صندوق توسعه:</div>
            <div className="text-sm font-bold text-amber-400 font-mono">
              +${fundShareUSDT.toLocaleString()} USDT
            </div>
          </div>
          <button
            onClick={() => setIsBotRunning(!isBotRunning)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              isBotRunning
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            {isBotRunning ? 'ربات فعال و متصل' : 'ربات متوقف'}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="text-[11px] text-slate-400">سود خالص کل (USDT):</div>
          <div className="text-lg font-black text-emerald-400 font-mono mt-1">
            +${totalNetProfitUSDT.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">تعداد معاملات: {simulatedTradesCount}</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="text-[11px] text-slate-400">میانگین وین‌ریت بات:</div>
          <div className="text-lg font-black text-cyan-400 font-mono mt-1">
            ۸۶.۵٪
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">بر پایه بکتست ۲ ساله</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="text-[11px] text-slate-400">اتصال به صرافی‌ها:</div>
          <div className="text-sm font-bold text-slate-200 mt-1">نوبیتکس / والکس / بایننس</div>
          <div className="text-[10px] text-emerald-400 font-mono mt-0.5">CCXT Bridge OK</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="text-[11px] text-slate-400">مدیریت ریسک هوشمند:</div>
          <div className="text-sm font-bold text-amber-400 mt-1 font-mono">
            SL: -{stopLoss}% | TP: +{takeProfit}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">حد ضرر پویا (Trailing)</div>
        </div>
      </div>

      {/* Main Grid: Pair List + Technical Analysis Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pair List */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              جفت‌ارزهای تحت نظر ربات
            </div>
            <button
              onClick={handleSimulateSignal}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition"
            >
              <RotateCcw className="w-3 h-3" />
              به‌روزرسانی قیمت‌ها
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {pairs.map((pair) => (
              <div
                key={pair.symbol}
                onClick={() => setSelectedPair(pair)}
                className={`p-4 cursor-pointer transition flex items-center justify-between ${
                  selectedPair.symbol === pair.symbol
                    ? 'bg-amber-500/10 border-r-4 border-amber-500'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200 font-mono">{pair.symbol}</span>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                      {pair.exchange}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    ${pair.price.toLocaleString()}
                  </div>
                </div>

                <div className="text-left font-mono">
                  <div
                    className={`text-xs font-bold flex items-center gap-1 justify-end ${
                      pair.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {pair.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {pair.change24h > 0 ? `+${pair.change24h}%` : `${pair.change24h}%`}
                  </div>
                  <div className="mt-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        pair.signal === 'STRONG_BUY'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : pair.signal === 'BUY'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : pair.signal === 'SELL'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {pair.signal}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Pair Technical Screen */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100 font-mono">{selectedPair.symbol}</h3>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                  صرافی: {selectedPair.exchange}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">سیگنال الگوریتمی ربات تریدینگ Aurevia</div>
            </div>

            <div className="text-left font-mono">
              <div className="text-lg font-black text-slate-100">${selectedPair.price.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400">آخرین انطباق اوردر بوک</div>
            </div>
          </div>

          {/* Candle/Indicator Chart Visualization */}
          <div className="h-44 w-full bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-carbon-mesh opacity-20 pointer-events-none" />

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono relative z-10">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Activity className="w-3.5 h-3.5" />
                شاخص قدرت نسبی RSI (14): <strong className="text-white">{selectedPair.rsi}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                سیگنال MACD: <strong className={selectedPair.macd === 'bullish' ? 'text-emerald-400' : 'text-slate-300'}>{selectedPair.macd.toUpperCase()}</strong>
              </span>
            </div>

            {/* Visual Simulated Wave Chart */}
            <div className="relative h-24 flex items-end justify-between gap-1 z-10">
              {[42, 45, 52, 49, 58, 62, 59, 64, 71, 68, 75, 82, 79, 86, selectedPair.rsi].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      val > 70 ? 'bg-rose-500/70' : val < 30 ? 'bg-emerald-500/70' : 'bg-cyan-500/50'
                    }`}
                    style={{ height: `${(val / 100) * 100}%` }}
                  />
                  <span className="text-[8px] font-mono text-slate-500">{idx + 1}m</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono border-t border-slate-800/80 pt-1 z-10">
              <span>حد اشباع فروش (Oversold &lt; 30): خرید قوی</span>
              <span>محدوده نرمال (30-70)</span>
              <span>حد اشباع خرید (Overbought &gt; 70): شناسایی سود</span>
            </div>
          </div>

          {/* Controls: Stop-Loss, Take-Profit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">تنظیم حد ضرر (Stop-Loss):</span>
                <span className="font-mono text-rose-400 font-bold">-{stopLoss}%</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.5"
                value={stopLoss}
                onChange={(e) => setStopLoss(parseFloat(e.target.value))}
                className="w-full accent-rose-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">
                خروج اضطراری خودکار در صورت نوسان نامساعد بازار
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">تنظیم حد سود (Take-Profit):</span>
                <span className="font-mono text-emerald-400 font-bold">+{takeProfit}%</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="25.0"
                step="0.5"
                value={takeProfit}
                onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="text-[10px] text-slate-500">
                ۱۰٪ از سود ثبت شده به صورت آنی به صندوق توسعه واریز خواهد شد.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
