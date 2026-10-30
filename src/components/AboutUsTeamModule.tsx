import React, { useState } from 'react';
import royalEmblemImg from '../assets/images/studiodelzendehai_royal_emblem_1793353057057.jpg';
import {
  Users,
  ShieldCheck,
  Mail,
  Lock,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Crown,
  KeyRound,
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  GraduationCap,
  Globe,
  Share2,
  Eye,
  Sliders,
  Plus
} from 'lucide-react';
import { ExecutiveTeamMember } from '../types';

const INITIAL_TEAM: ExecutiveTeamMember[] = [
  {
    id: 'MEM-00',
    name: 'مهندس مهدی دل زنده',
    role: 'موسس، بنیان‌گذار و معمار ارشد کل اکوسیستم',
    roleEn: 'Founder, Chief Architect & 100% Ultimate Beneficiary',
    department: 'شورای عالی ریاست و معماری سیستم‌ها',
    officialEmail: 'mehdi.delzendeh@aionverse.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'معمار کلان پلتفرم‌های ابری هوش مصنوعی AIONVERSE و Aurevia OS، دارنده ۱۰۰٪ مالکیت حقوقی دامنه‌های رسمی، مبدع شبکه ۲۵ ایجنت خودگردان و دروازه حقیقت (Truth Gate).',
    specializations: [
      'معماری کلان ابر و سوپراپلیکیشن‌ها',
      'مدیریت توزیع‌شده لبه Anycast و Cloudflare D1/R2',
      'ارکستراسیون ایجنت‌های خودگردان و الگوریتم‌های تریدینگ',
      'امنیت سایبری Zero-Trust و رمزنگاری کلیدهای اختصاصی'
    ],
    education: 'کارشناسی ارشد مهندسی نرم‌افزار و معماری سیستم‌های توزیع‌شده',
    clearanceLevel: 'Root Owner',
    privateAccessToken: 'root_delzende_0x5239775338_aionverse_master_key',
    tokenExpires: 'نامحدود (اختیار تام موسس)',
    status: 'online',
    tasksHandled: 124
  },
  {
    id: 'MEM-01',
    name: 'خانم فهیمه دل زنده',
    role: 'معاونت ارشد راهبردی و توسعه سرمایه انسانی',
    roleEn: 'Executive VP of Strategy & Human Capital',
    department: 'معاونت راهبردی و مدیریت استعدادها',
    officialEmail: 'fahimeh.delzendeh@aionverse.io',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'بیش از ۱۲ سال سابقه تدوین ساختارهای سازمانی فرامرزی، راهبری استراتژی جذب نخبگان و هماهنگی دفاتر چندزبانه استودیو دلزنده در کشورهای امارات، آلمان و ایران.',
    specializations: [
      'برنامه‌ریزی راهبردی کلان سازمانی',
      'مدیریت و جذب سرمایه انسانی تراز اول بین‌المللی',
      'نظارت بر تطابق ساختارهای سازمانی با استانداردهای جهانی',
      'بهینه‌سازی کارایی فرآیندهای کارشناسی'
    ],
    education: 'کارشناسی ارشد مدیریت راهبردی و توسعه منابع انسانی',
    clearanceLevel: 'Executive VP',
    privateAccessToken: 'sec_token_fahimeh_delzendeh_e89104_bound_user',
    tokenExpires: '۱ سال (تجدید خودکار با امضای مالک)',
    status: 'online',
    tasksHandled: 86
  },
  {
    id: 'MEM-02',
    name: 'خانم مریم دل زنده',
    role: 'مدیر ارشد امور مالی و حسابرسی بین‌المللی',
    roleEn: 'Chief Financial Officer & Escrow Audit',
    department: 'امور مالی، خزانه‌داری و حسابداری رسمی',
    officialEmail: 'maryam.delzendeh@aionverse.io',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'حسابدار رسمی و مدیر مالی ارشد، متخصص استاندارد بین‌المللی IFRS، ناظر بر مسیرهای بانکی شتاب، SEPA اروپا، SWIFT، خزانه‌داری والت‌های سرد و گرم و تخصیص ۵٪ صندوق توسعه.',
    specializations: [
      'حسابرسی رسمی و تطابق استانداردهای مالیاتی بین‌المللی',
      'مدیریت خزانه‌داری چندارزی (ریال، دلار، یورو و رمزارزها)',
      'سیستم‌های تضمین امانی خرید (Escrow)',
      'مدیریت صندوق نوآوری و بودجه‌بندی پروژه‌ها'
    ],
    education: 'کارشناسی ارشد حسابداری مالی و گواهینامه حسابداری رسمی',
    clearanceLevel: 'Chief Officer',
    privateAccessToken: 'sec_token_maryam_delzendeh_f41092_bound_user',
    tokenExpires: '۶ ماه (تایید دوعاملی فعال)',
    status: 'online',
    tasksHandled: 94
  },
  {
    id: 'MEM-03',
    name: 'خانم سکینه خاتون دل زنده',
    role: 'رئیس شورای عالی نظارت، دروازه حقیقت و اخلاق هوش مصنوعی',
    roleEn: 'Head of Governance, Ethics & Truth Gate',
    department: 'شورای نظارت عالیه، انطباق و حقوق بین‌الملل',
    officialEmail: 'sakineh.delzendeh@aionverse.io',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    bio: 'پژوهشگر ارشد اخلاق فناوری و حقوق بین‌الملل، ناظر بر فرآیندهای راستی‌آزمایی دروازه حقیقت (Truth Gate)، تضمین اصالت محتواهای چندرسانه‌ای و رعایت ضوابط کپی‌رایت سازمان جهانی مالکیت معنوی (WIPO).',
    specializations: [
      'نظارت عالیه بر الگوریتم‌های حقیقت و راستی‌آزمایی داده‌ها',
      'حاکمیت اخلاقی هوش مصنوعی و رفع سوگیری‌ها',
      'حقوق فناوری و صیانت از دارایی‌های معنوی سازمان',
      'حسابرسی فرآیندهای انتشار در شبکه‌های اجتماعی'
    ],
    education: 'کارشناسی ارشد حقوق بین‌الملل و مطالعات عالی حاکمیت داده',
    clearanceLevel: 'Chief Officer',
    privateAccessToken: 'sec_token_sakineh_delzendeh_c31908_bound_user',
    tokenExpires: '۱ سال (سند نظارتی دائمی)',
    status: 'online',
    tasksHandled: 112
  },
  {
    id: 'MEM-04',
    name: 'آقای علی اشتری',
    role: 'مدیر ارشد فناوری و معماری زیرساخت ابری لبه',
    roleEn: 'Chief Technology Officer & Edge Infrastructure',
    department: 'فناوری اطلاعات و مهندسی زیرساخت شبکه',
    officialEmail: 'ali.ashtari@aionverse.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'متخصص ارشد شبکه‌های توزیع‌شده لبه (Cloudflare Anycast, D1, R2, V8 Sandbox)، طراح پروتکل WebRTC در زیرساخت تلفن ثابت بین‌الملل (DID) و سیستم‌های امنیتی Zero-Trust پلتفرم.',
    specializations: [
      'معماری پایگاه‌های داده لبه Cloudflare D1 و ذخیره‌ساز R2',
      'پروتکل‌های مخابراتی VoIP و WebRTC کنفرانس تصویری 4K',
      'بهینه‌سازی لود تایم و رندرینگ سه‌بعدی Three.js',
      'تست نفوذپذیری و استحکام‌بخشی کدهای سمت سرور'
    ],
    education: 'کارشناسی ارشد مهندسی شبکه و امنیت اطلاعات',
    clearanceLevel: 'Chief Officer',
    privateAccessToken: 'sec_token_ali_ashtari_b77192_bound_user',
    tokenExpires: '۶ ماه (امضای دیجیتال سرور)',
    status: 'online',
    tasksHandled: 78
  },
  {
    id: 'MEM-05',
    name: 'آقای رضا صبحی',
    role: 'معاونت بازرگانی بین‌الملل، دراپ‌شیپینگ و لجستیک',
    roleEn: 'VP of Global E-Commerce & Logistics',
    department: 'عملیات تجارت الکترونیک و حمل‌ونقل هوایی/دریایی',
    officialEmail: 'reza.sobhi@aionverse.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'متخصص بازرگانی بین‌الملل و زنجیره تامین علی‌بابا و تمو، مدیر سامانه رهگیری ماهواره‌ای کارگوهای پرواز و دریایی، کارشناس ترخیص گمرکی فرودگاهی با نرخ سود ۶۰ تا ۷۳ درصدی.',
    specializations: [
      'آربیتراژ فرامرزی محصولات پرفروش بین تمو، علی‌بابا و آمازون',
      'رهگیری ماهواره‌ای کانتینرها در خلیج فارس و مسیرهای اروپا',
      'قراردادهای حمل سریع و ترخیص گمرکی فرودگاه امام',
      'اتوماسیون خدمات فروش و سیستم مرجوعی امانی'
    ],
    education: 'کارشناسی ارشد بازرگانی بین‌الملل و مدیریت لجستیک',
    clearanceLevel: 'Executive VP',
    privateAccessToken: 'sec_token_reza_sobhi_d29011_bound_user',
    tokenExpires: '۶ ماه (تایید گمرک و بارنامه)',
    status: 'online',
    tasksHandled: 67
  },
  {
    id: 'MEM-06',
    name: 'آقای امیرحسین امیرآبادی زاده',
    role: 'دانشمند ارشد هوش مصنوعی و لید ارکستراسیون ایجنت‌ها',
    roleEn: 'Chief AI Scientist & Autonomous Agents Lead',
    department: 'تحقیق و توسعه هوش مصنوعی و علوم محاسباتی',
    officialEmail: 'amirhossein.amirabadizadeh@aionverse.io',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'پژوهشگر ارشد یادگیری عمیق، طراح پایپ‌لاین موشواره هوشمند OmniCursor با زمان پاسخ کمتر از ۱ ثانیه در درک زنده صفحه، توسعه‌دهنده شبکه عصبی سنتز صوت و موسیقی ۴۳۲Hz و ایجنت‌های کاوشگر.',
    specializations: [
      'مدل‌های ادراک چندوجهی (Multimodal Vision-Language Screen AI)',
      'ارکستراسیون و معماری ۲۵ ایجنت خودگردان صنعتی',
      'سنتز صوتی Web Audio و فرکانس‌های CBT رواندرمانی',
      'کوپایلوت خودکار کدنویسی و تحلیل رقابتی بازار'
    ],
    education: 'کارشناسی ارشد هوش مصنوعی و علوم داده',
    clearanceLevel: 'Chief Officer',
    privateAccessToken: 'sec_token_amirhossein_amirabadizadeh_a19284_bound_user',
    tokenExpires: '۶ ماه (سند فعال کوپایلوت)',
    status: 'online',
    tasksHandled: 105
  }
];

export function AboutUsTeamModule() {
  const [team, setTeam] = useState<ExecutiveTeamMember[]>(INITIAL_TEAM);
  const [selectedMember, setSelectedMember] = useState<ExecutiveTeamMember>(INITIAL_TEAM[0]);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [rotatedSuccess, setRotatedSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profiles' | 'access-links' | 'charter'>('profiles');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken((curr) => (curr === id ? null : curr)), 2500);
  };

  const handleRotateToken = (memberId: string) => {
    const newRandomHash = '0x' + Math.random().toString(16).substring(2, 10) + '5239DelZende' + Date.now().toString(36);
    setTeam((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              privateAccessToken: `sec_token_${m.id.toLowerCase()}_${newRandomHash}_bound`,
              tokenExpires: '۶ ماه دیگر (توکن جدید امن)'
            }
          : m
      )
    );
    setRotatedSuccess(memberId);
    setTimeout(() => setRotatedSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Royal Header with StudioDelzendehAi Insignia */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#1f0814] to-slate-900 border-2 border-amber-500/40 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)] shrink-0 bg-black">
              <img
                src={royalEmblemImg}
                alt="StudioDelzendehAi"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive Leadership & Specialized Organization Team</span>
              </div>

              <h2 className="text-xl md:text-3xl font-black text-slate-100 tracking-tight">
                درباره ما و اعضای تیم تخصصی سازمان استودیو دلزنده
              </h2>

              <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
                معرفی رسمی مدیران ارشد، کارشناسان و هیئت مدیره اکوسیستم <strong className="text-amber-400">AIONVERSE</strong> و <strong className="text-amber-400">StudioDelzendehAi</strong> به همراه ایمیل‌های سازمانی اختصاصی، رزومه‌های کارشناسی و سامانه صدور پیوندهای ورود امن و غیرقابل استفاده دیگران.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('access-links')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-slate-950" />
              <span>مدیریت پیوندهای اختصاصی اعضا</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 text-xs max-w-full overflow-x-auto">
        <button
          onClick={() => setActiveTab('profiles')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'profiles'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>پروفایل و رزومه تخصصی اعضای تیم ({team.length} عضو ارشد)</span>
        </button>

        <button
          onClick={() => setActiveTab('access-links')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'access-links'
              ? 'bg-indigo-500 text-slate-950 shadow-md shadow-indigo-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>سامانه لینک‌های اختصاصی و غیرقابل استفاده دیگران</span>
        </button>

        <button
          onClick={() => setActiveTab('charter')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'charter'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>منشور سازمانی و گواهی احراز هویت</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: رزومه تخصصی و پروفایل اعضای تیم (Team Profiles & Detailed Resume)
         ========================================================================= */}
      {activeTab === 'profiles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Member Selection List on the Left */}
          <div className="lg:col-span-4 rounded-3xl bg-slate-950/80 border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-bold text-slate-300">
              <span>فهرست اعضای تیم تخصصی</span>
              <span className="text-amber-400 font-mono text-[11px]">احراز هویت شده</span>
            </div>

            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {team.map((member) => {
                const isSelected = selectedMember.id === member.id;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`p-3 rounded-2xl border transition cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-100 truncate">{member.name}</span>
                        {member.clearanceLevel === 'Root Owner' && (
                          <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded font-mono">
                            مالک
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-amber-300 truncate mt-0.5">{member.role}</div>
                      <div className="text-[9px] text-slate-500 font-mono truncate">{member.officialEmail}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Biography & Resume Viewport */}
          <div className="lg:col-span-8 rounded-3xl bg-slate-950/90 border border-slate-800 p-6 space-y-6">
            {/* Header of Selected Member */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-800 pb-5">
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0 bg-slate-900">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 text-center sm:text-right flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-lg md:text-xl font-black text-slate-100">{selectedMember.name}</h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {selectedMember.clearanceLevel}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    فعال و آنلاین
                  </span>
                </div>

                <div className="text-xs font-bold text-amber-300">{selectedMember.role}</div>
                <div className="text-[11px] text-slate-400 font-mono">{selectedMember.roleEn}</div>

                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono text-cyan-300">{selectedMember.officialEmail}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                    <Building className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{selectedMember.department}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography & Achievements */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase font-mono flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>شرح رزومه و سوابق اجرایی در سازمان:</span>
              </span>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {selectedMember.bio}
              </p>
            </div>

            {/* Specializations & Skills */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase font-mono flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>حوزه‌های تخصصی و اختیارات کارشناسی:</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedMember.specializations.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-2 text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Credential & Security Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>تحصیلات و مدارک تخصصی:</span>
                </span>
                <div className="font-bold text-slate-200">{selectedMember.education}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>سطح دسترسی و کلید امنیتی:</span>
                </span>
                <div className="font-mono text-amber-400 font-bold">{selectedMember.clearanceLevel} • 2FA Active</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: سامانه لینک‌های اختصاصی و غیرقابل استفاده دیگران (Tokenized Private Access Links)
         ========================================================================= */}
      {activeTab === 'access-links' && (
        <div className="rounded-3xl bg-slate-950/90 border border-slate-800 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-100 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>پیوندهای ورود اختصاصی، مقید به هویت و غیرقابل استفاده توسط دیگران</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                هر پیوند منحصراً با شناسه سخت‌افزاری و امضای دیجیتال عضو جفت شده و با ارسال یا کپی برای شخص دیگر کار نخواهد کرد.
              </p>
            </div>

            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              HMAC-SHA256 Tokenized
            </span>
          </div>

          {/* Members Private Links Table / Cards */}
          <div className="space-y-3">
            {team.map((member) => {
              const fullPrivateUrl = `https://aionverse.com/auth/member?token=${member.privateAccessToken}&mid=${member.id.toLowerCase()}&sig=0x5239DelZende`;
              return (
                <div
                  key={member.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
                          <span>{member.name}</span>
                          <span className="text-[9px] text-amber-300 font-mono bg-amber-500/20 px-2 py-0.2 rounded">
                            {member.role}
                          </span>
                        </div>
                        <div className="text-[10px] text-cyan-400 font-mono">{member.officialEmail}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(fullPrivateUrl, member.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                      >
                        {copiedToken === member.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedToken === member.id ? 'لینک کپی شد!' : 'کپی پیوند اختصاصی'}</span>
                      </button>

                      <button
                        onClick={() => handleRotateToken(member.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-slate-700"
                        title="باطل‌سازی توکن قبلی و تولید پیوند امن جدید"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>تولید مجدد توکن</span>
                      </button>
                    </div>
                  </div>

                  {/* The Non-Transferable Token Display */}
                  <div className="p-2.5 rounded-xl bg-black border border-slate-800/80 font-mono text-[10px] text-emerald-400 overflow-x-auto text-left ltr flex items-center justify-between gap-2">
                    <code className="truncate">{fullPrivateUrl}</code>
                    <span className="text-slate-500 shrink-0 text-[9px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      Single-User Only
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                    <span className="text-slate-500">انقضای توکن: {member.tokenExpires}</span>
                    <span className="text-emerald-400">قفل اثرانگشت دیجیتال: Verified (Non-transferable)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: منشور سازمانی و گواهی احراز هویت (Charter & Verification)
         ========================================================================= */}
      {activeTab === 'charter' && (
        <div className="rounded-3xl bg-slate-950/90 border border-slate-800 p-6 space-y-4 text-xs leading-relaxed">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black text-slate-100">منشور اخلاقی و حاکمیتی سازمان StudioDelzendehAi</h3>
          </div>

          <div className="space-y-3 text-slate-300">
            <p>
              اکوسیستم <strong>AIONVERSE</strong> و استودیوی هوش مصنوعی <strong>StudioDelzendehAi</strong> تحت راهبری و مالکیت ۱۰۰٪ انحصاری <strong className="text-amber-300">مهندس مهدی دل زنده</strong> پایه‌ریزی شده و متشکل از مدیران متخصص، کارشناسان ارشد و اعضای برجسته هیئت نظارت است.
            </p>

            <ul className="space-y-2 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>اصل حقیقت برتر از وایرال (Truth over Virality):</strong> هیچ داده، آمار یا تعهدی بدون تأیید چندمرحله‌ای دروازه حقیقت منتشر نمی‌شود.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>حفاظت از کلیدهای اختصاصی و حریم خصوصی:</strong> کلیه پیوندهای سازمانی رمزنگاری‌شده و مقید به مشخصات بیومتریک هر عضو بوده و امکان واگذاری یا سرقت به شخص ثالث غیرممکن است.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>مسئولیت تام و اختیارات عالیه:</strong> کلیه تصمیمات بنیادین مالی، تغییر رکوردهای DNS دامنه‌ها و تخصیص وجوه صندوق توسعه با امضای دیجیتال مهندس مهدی دل زنده نهایی می‌گردد.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
