import React, { useState } from 'react';
import royalEmblemImg from '../assets/images/studiodelzendehai_royal_emblem_1793353057057.jpg';
import {
  Newspaper,
  CheckCircle2,
  Clock,
  Send,
  Mail,
  Copy,
  Check,
  Sparkles,
  Bot,
  User,
  Building2,
  Plus,
  RefreshCw,
  Volume2,
  VolumeX,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  FileText,
  Calendar,
  Zap,
  Filter
} from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  category: 'personal' | 'enterprise';
  priority: 'high' | 'medium' | 'low';
  assigneeAgent: string;
  deadline: string;
  completed: boolean;
  completedAt?: string;
  summary: string;
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'TASK-01',
    title: 'تأیید نهایی برداشت سود ارزی ۴,۰۴۸ دلاری از استودیو موزیک و اسپاتیفای',
    category: 'personal',
    priority: 'high',
    assigneeAgent: 'ایجنت خزانه‌دار و مالی (Treasury Agent)',
    deadline: 'امروز - ساعت ۱۸:۰۰',
    completed: true,
    completedAt: '۱۰ دقیقه پیش با امضای مهندس مهدی دل زنده',
    summary: 'مبلغ به کیف‌پول امن منتقل گردید و ۵٪ به صندوق توسعه واریز شد.'
  },
  {
    id: 'TASK-02',
    title: 'بررسی پیامک‌های دریافتی روی خطوط ثابت نیویورک (+1 212) و فرانکفورت (+49 69)',
    category: 'personal',
    priority: 'medium',
    assigneeAgent: 'ایجنت مخابرات و ارتباطات (Telephony Bot)',
    deadline: 'امروز - ساعت ۲۰:۰۰',
    completed: false,
    summary: '۳ پیامک تجاری از شرکای تجاری اروپا و آمریکا در انتظار مطالعه است.'
  },
  {
    id: 'TASK-03',
    title: 'تمدید دوره‌ای رکورد اعتبارسنجی مالکیت TXT دامنه‌های IRNIC و ICANN',
    category: 'personal',
    priority: 'high',
    assigneeAgent: 'ایجنت DomainBrain',
    deadline: 'فردا صبح',
    completed: true,
    completedAt: 'تایید خودکار در DNSSEC',
    summary: 'دامنه‌های aionverse.io و aionverse.com با موفقیت همگام‌سازی شدند.'
  },
  {
    id: 'TASK-04',
    title: 'اجرای کمپین فروش خودکار کالاهای پرسود ۶۰-۷۳٪ تمو و علی‌بابا در ۸ شبکه اجتماعی',
    category: 'enterprise',
    priority: 'high',
    assigneeAgent: 'ایجنت آربیتراژ و تبلیغات (Hunter & Ad Crafter)',
    deadline: 'امروز - ساعت ۱۶:۰۰',
    completed: false,
    summary: 'سناریوهای ویدیویی تیزر و لانچ برای تیک‌تاک و ریلز اینستاگرام آماده ارسال است.'
  },
  {
    id: 'TASK-05',
    title: 'انتشار قطعه موسیقی فضایی و اپیزود جدید پادکست در یوتیوب و اسپاتیفای',
    category: 'enterprise',
    priority: 'medium',
    assigneeAgent: 'ایجنت کارخانه محتوا (Content Factory Agent)',
    deadline: 'امشب',
    completed: false,
    summary: 'استم‌های صوتی فرکانس ۴۳۲Hz و کاور آلبوم رندر گردیدند.'
  },
  {
    id: 'TASK-06',
    title: 'ممیزی ضد جعل اخبار و محتواهای ارسالی در دروازه حقیقت (Truth Gate)',
    category: 'enterprise',
    priority: 'high',
    assigneeAgent: 'ایجنت حقیقت و انطباق (Truth Gate Inspector)',
    deadline: 'در لحظه (پیوسته)',
    completed: true,
    completedAt: 'اسکن لحظه‌ای فعال است',
    summary: 'ضریب صحت ۹۹.۲٪ و بدون هیچ‌گونه ادعای بدون منبع ثبت شد.'
  }
];

export function DailyGazetteAndTasksModule() {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [filterCategory, setFilterCategory] = useState<'all' | 'personal' | 'enterprise'>('all');
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [copiedGazette, setCopiedGazette] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'personal' | 'enterprise'>('personal');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // Auto-complete a task via Agent
  const handleAutoCompleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            completed: true,
            completedAt: 'اکنون با تایید خودکار ایجنت و امضای مهندس مهدی دل زنده',
            summary: 'وظیفه با موفقیت توسط ایجنت هوشمند بدون نقص اجرا گردید.'
          };
        }
        return t;
      })
    );
  };

  // Auto-complete all pending enterprise tasks
  const handleCompleteAllEnterprise = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.category === 'enterprise'
          ? {
              ...t,
              completed: true,
              completedAt: 'هم‌اکنون توسط ارکستراتور ۲۵ ایجنت',
              summary: 'کلیه گام‌های سازمانی در شبکه‌ها و فروشگاه‌ها مستقر شدند.'
            }
          : t
      )
    );
  };

  const handleSendGazetteToEmail = () => {
    setEmailSending(true);
    setTimeout(() => {
      setEmailSending(false);
      setEmailSentSuccess(true);
      setTimeout(() => setEmailSentSuccess(false), 4000);
    }, 1200);
  };

  const gazetteContentText = `روزنامه صبحگاهی AIONVERSE & StudioDelzendehAi
شماره رسمی: ۵۰ | تاریخ: ${new Date().toLocaleDateString('fa-IR')}
صاحب امتیاز و مدیرمسئول: مهندس مهدی دل زنده (کد ملی: ۵۲۳۹۷۷۵۳۳۸)
ایمیل تحویل: mehdidlzndh@gmail.com | تلفن همراه: ۰۹۹۱۰۹۶۶۰۲۲

۱. تیتر یک: تثبیت کامل ۱۰ خط شهری بین‌المللی و جهش مانیتایزینگ ۴,۰۴۸ دلاری
۲. دراپ‌شیپینگ تمو و علی‌بابا: حاشیه سود ۶۸.۴٪ برای گجت‌های هوشمند و فعال‌سازی ایجنت‌های کاوشگر
۳. عملکرد ۲۵ ایجنت: ۳۴ عملیات موفق با نرخ خطای صفر و تطابق ۱۰۰٪ با گیت حقیقت
۴. کهکشان ۳D و منظومه شمسی: ادغام بافت‌های فوق‌کیفیتی تلسکوپ جیمز وب و رصدخانه SDO ناسا
۵. وضعیت دامنه‌ها: aionverse.io و aionverse.com و delzende-ai.ir در وضعیت فعال و سبز`;

  const handleCopyGazette = () => {
    navigator.clipboard.writeText(gazetteContentText);
    setCopiedGazette(true);
    setTimeout(() => setCopiedGazette(false), 2000);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: TaskItem = {
      id: `TASK-0${tasks.length + 1}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: 'high',
      assigneeAgent: newTaskCategory === 'personal' ? 'دستیار ویژه مالک (Executive Butler)' : 'ایجنت خودگردان پروژه',
      deadline: 'امروز',
      completed: false,
      summary: 'وظیفه در صف اقدام هوشمند ایجنت‌ها قرار گرفت.'
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterCategory === 'all') return true;
    return t.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Royal Emblem */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#1e0713] to-slate-900 border-2 border-amber-500/40 p-5 md:p-6 shadow-2xl relative overflow-hidden">
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
                <Newspaper className="w-3.5 h-3.5" />
                <span>Executive Daily Gazette & Task Completion Engine</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-100 flex items-center gap-2">
                روزنامه اختصاصی روزانه و مرکز تکمیل وظایف شخصی و سازمانی
              </h2>
              <p className="text-xs text-slate-400">
                ارسال خودکار گزارش روزنامه به ایمیل مالک (<span className="text-amber-300 font-mono">mehdidlzndh@gmail.com</span>) و موتور خودکار تکمیل وظایف با ۲۵ ایجنت هوشمند
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendGazetteToEmail}
              disabled={emailSending}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {emailSending ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              ) : emailSentSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
              ) : (
                <Mail className="w-4 h-4 text-slate-950" />
              )}
              <span>
                {emailSending
                  ? 'در حال ارسال ایمیل...'
                  : emailSentSuccess
                  ? 'روزنامه به ایمیل ارسال شد!'
                  : 'ارسال فوری روزنامه به ایمیل مالک'}
              </span>
            </button>

            <button
              onClick={handleCopyGazette}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedGazette ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedGazette ? 'کپی شد' : 'کپی متن'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Live Newspaper View on the Left, Tasks Hub on the Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* =========================================================================
            ستون ۱: روزنامه زنده و صفحه اختصاصی خبرنامه صبحگاهی (Daily Gazette)
           ========================================================================= */}
        <div className="lg:col-span-5 rounded-3xl bg-[#090b10] border-2 border-amber-500/30 p-5 md:p-6 space-y-4 shadow-xl relative overflow-hidden">
          {/* Newspaper Masthead */}
          <div className="text-center border-b-2 border-amber-500/40 pb-4 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-b border-slate-800 pb-1">
              <span>VOL. 50 • NO. 2026</span>
              <span className="text-amber-400 font-bold">AIONVERSE EXECUTIVE DAILY</span>
              <span>{new Date().toLocaleDateString('fa-IR')}</span>
            </div>

            <h1 className="text-2xl font-black text-amber-300 tracking-wider font-serif">
              روزنامه رسمی آورِویا و استودیو دلزنده
            </h1>

            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2">
              <span>مدیرمسئول و صاحب‌امتیاز:</span>
              <strong className="text-slate-200">مهندس مهدی دل زنده</strong>
              <span className="text-emerald-400 font-mono">(کد ملی: ۵۲۳۹۷۷۵۳۳۸)</span>
            </div>
          </div>

          {/* Newspaper Lead Headline */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/30 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                تیتر اول روزنامه
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">وضعیت: فوق‌العاده</span>
            </div>
            <h3 className="text-base font-black text-slate-100 leading-snug">
              تثبیت ۱۰ خط ثابت شهری در کشورهای بزرگ و درآمد ۴,۰۴۸ دلاری استودیو موزیک
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              با ابلاغیه مهندس مهدی دل زنده، سامانه‌های تلفنی در نیویورک، لندن، فرانکفورت، دبی و توکیو با پایداری ۱۰۰٪ فعال شدند. درآمد ارزی حاصل از یوتیوب، اسپاتیفای و تلگرام به بالاترین رکورد خود رسید.
            </p>
          </div>

          {/* Sub-articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-cyan-400 font-bold block">دراپ‌شیپینگ تمو و علی‌بابا</span>
              <div className="font-bold text-slate-200">حاشیه سود ۶۸.۴٪ برای گجت‌ها</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                ایجنت آربیتراژ ۴ قلم کالای پرتقاضا را جهت فروش در امارات و اروپا انتخاب کرد.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-rose-400 font-bold block">استودیو کهکشان ۳D</span>
              <div className="font-bold text-slate-200">بافت‌های جیمز وب و SDO ناسا</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                شبیه‌سازی پلاسمای خورشید و هسته کهکشان با رندرینگ زنده ۶۰fps بدون افت فریم.
              </p>
            </div>
          </div>

          {/* Email Delivery Audit Box */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>گیرنده رسمی روزنامه:</span>
              </span>
              <span className="font-mono text-amber-300 font-bold">mehdidlzndh@gmail.com</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>پروتکل: TLS 1.3 / SMTP Dedicated</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                تحویل تضمین‌شده
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ستون ۲: مرکز تکمیل وظایف شخصی و سازمانی (Task Hub & Auto-Completion)
           ========================================================================= */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-950/80 border border-slate-800 p-5 md:p-6 space-y-5 shadow-xl">
          {/* Header of Task Hub */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <span>تکمیل وظایف شخصی و سازمانی مالک</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                  {tasks.filter((t) => t.completed).length}/{tasks.length} تکمیل‌شده
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                تفکیک اختیارات شخصی و شرکتی با قابلیت اجرای اتوماتیک هر تسک توسط ۲۵ ایجنت هوشمند
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCompleteAllEnterprise}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                title="تکمیل تمام وظایف سازمانی توسط ارکستراتور ایجنت‌ها"
              >
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>تکمیل خودکار سازمانی</span>
              </button>

              <button
                onClick={() => setShowAddTaskModal(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>افزودن وظیفه</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              فیلتر:
            </span>
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer font-bold ${
                filterCategory === 'all'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              همه ({tasks.length})
            </button>
            <button
              onClick={() => setFilterCategory('personal')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer font-bold flex items-center gap-1.5 ${
                filterCategory === 'personal'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>شخصی مالک ({tasks.filter((t) => t.category === 'personal').length})</span>
            </button>
            <button
              onClick={() => setFilterCategory('enterprise')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer font-bold flex items-center gap-1.5 ${
                filterCategory === 'enterprise'
                  ? 'bg-indigo-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>سازمانی ({tasks.filter((t) => t.category === 'enterprise').length})</span>
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-2xl border transition space-y-2.5 ${
                  t.completed
                    ? 'bg-slate-950/60 border-slate-800 opacity-90'
                    : 'bg-slate-900/90 border-amber-500/40 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <button
                      onClick={() => handleAutoCompleteTask(t.id)}
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition cursor-pointer ${
                        t.completed
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'border-slate-600 hover:border-amber-400'
                      }`}
                      title={t.completed ? 'تکمیل‌شده' : 'کلیک برای تکمیل وظیفه'}
                    >
                      {t.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-bold ${
                            t.completed ? 'text-slate-400 line-through' : 'text-slate-100'
                          }`}
                        >
                          {t.title}
                        </span>

                        <span
                          className={`text-[9px] px-2 py-0.2 rounded-full font-bold font-mono ${
                            t.category === 'personal'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {t.category === 'personal' ? 'شخصی مالک' : 'سازمانی'}
                        </span>

                        {t.priority === 'high' && (
                          <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded font-mono">
                            فوری
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 mt-1">{t.summary}</div>
                    </div>
                  </div>

                  {!t.completed && (
                    <button
                      onClick={() => handleAutoCompleteTask(t.id)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 shadow-md shadow-amber-500/20"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>تکمیل خودکار توسط ایجنت</span>
                    </button>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <Bot className="w-3 h-3 text-cyan-400" />
                    <span>مسئول: {t.assigneeAgent}</span>
                  </div>

                  <div>
                    {t.completed ? (
                      <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {t.completedAt}
                      </span>
                    ) : (
                      <span className="text-amber-400 font-mono">مهلت: {t.deadline}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <h3 className="text-base font-black text-slate-100 flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>افزودن وظیفه جدید برای مالک یا سازمان</span>
            </h3>

            <form onSubmit={handleAddNewTask} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1.5 font-bold">عنوان وظیفه:</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="مثال: بررسی سود ناخالص فروشگاه تمو در ماه نوامبر..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1.5 font-bold">نوع دسته‌بندی:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setNewTaskCategory('personal')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${
                      newTaskCategory === 'personal'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    وظیفه شخصی مالک
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewTaskCategory('enterprise')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition cursor-pointer ${
                      newTaskCategory === 'enterprise'
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    وظیفه سازمانی
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={!newTaskTitle.trim()}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer disabled:opacity-40"
                >
                  افزودن و ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
