import React from 'react';
import { CareerReport, RoadmapYear } from '../types';
import { 
  Award, 
  TrendingUp, 
  Brain, 
  Target, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  Printer,
  School,
  User,
  Lightbulb,
  GraduationCap,
  Hexagon,
  BookOpen,
  Briefcase,
  Milestone
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface ReportViewProps {
  report: CareerReport;
}

export const ReportView: React.FC<ReportViewProps> = ({ report }) => {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-white text-slate-900 font-sans print:text-black">
      
      {/* Print Styles Injection */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            overflow: visible !important;
            height: auto !important;
          }
          #root, .print-container {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            box-shadow: none !important;
          }
          .print-break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .print-break-before {
            break-before: page;
            page-break-before: always;
          }
          .no-print {
            display: none !important;
          }
          /* Ensure text is readable */
          p, h1, h2, h3, span, div {
             color: #000 !important;
          }
          /* Keep colored backgrounds for visual cues */
          .bg-blue-600, .bg-slate-900 {
             color: white !important;
          }
          .bg-blue-600 p, .bg-blue-600 h2, .bg-slate-900 h1, .bg-slate-900 div {
             color: white !important;
          }
        }
      `}</style>

      {/* Floating Header (Screen Only) */}
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md no-print max-w-5xl mx-auto rounded-b-xl">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Target className="text-blue-400" />
          规划完成
        </h1>
        <button 
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition shadow-lg"
        >
          <Printer size={18} />
          导出 PDF
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-8 md:p-12 print:p-0 print:max-w-none print-container">
        
        {/* REPORT HEADER */}
        <header className="border-b-4 border-slate-900 pb-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print:flex-row print:items-end">
          <div>
            <div className="text-sm text-slate-500 font-mono tracking-widest mb-1 uppercase">Career Blueprint</div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 print:text-5xl">
              {report.studentName}的<br className="md:hidden" />职业规划书
            </h1>
            <p className="text-slate-500 flex items-center gap-2 font-medium">
               生成时间: {new Date().toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className="flex flex-wrap justify-end gap-2 text-sm">
               <Tag icon={School} text={report.profileSummary.school} />
               <Tag icon={GraduationCap} text={report.profileSummary.major} />
               <Tag icon={User} text={report.profileSummary.mbti} />
            </div>
          </div>
        </header>

        {/* INSIDER ADVICE */}
        <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden mb-12 print-break-inside-avoid print:bg-slate-900 print:text-white">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Lightbulb size={120} />
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-yellow-400">
            <Award size={24} /> 资深导师·内行视角
          </h2>
          <p className="text-slate-200 leading-relaxed text-lg font-medium relative z-10 italic">
            "{report.insiderAdvice}"
          </p>
        </section>

        {/* RADAR CHART */}
        <section className="mb-12 print-break-inside-avoid">
           <SectionTitle icon={Hexagon} title="核心竞争力六维图谱" />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 rounded-xl p-8 border border-slate-100 print:bg-white print:border-slate-300">
              <div className="h-[320px] w-full flex justify-center items-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={report.competencyRadar}>
                      <PolarGrid stroke="#cbd5e1" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 12, fontWeight: 700 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Competency"
                        dataKey="A"
                        stroke="#2563eb"
                        strokeWidth={3}
                        fill="#3b82f6"
                        fillOpacity={0.5}
                      />
                      <Tooltip />
                    </RadarChart>
                 </ResponsiveContainer>
              </div>
              <div className="space-y-6">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">图谱解读</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      基于你的{report.profileSummary.school}背景及{report.profileSummary.major}专业，结合当前就业市场竞争态势生成的实时评估。
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500 font-bold uppercase mb-1">最强优势</div>
                        <div className="text-blue-700 font-bold">
                             {report.competencyRadar.reduce((prev, current) => (prev.A > current.A) ? prev : current).subject}
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-500 font-bold uppercase mb-1">急需补足</div>
                        <div className="text-orange-600 font-bold">
                            {report.competencyRadar.reduce((prev, current) => (prev.A < current.A) ? prev : current).subject}
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 print:block">
          
          {/* LEFT COLUMN: JOBS */}
          <div className="lg:col-span-2 space-y-10 print:mb-8">
            <section>
                <SectionTitle icon={Target} title="核心岗位匹配" />
                <div className="space-y-6">
                {report.recommendations.map((job, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-100 rounded-xl p-6 hover:border-blue-200 transition relative print-break-inside-avoid print:border-slate-300">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-black text-slate-900">{job.roleName}</h3>
                            <div className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold text-sm shadow-sm">
                                匹配度 {job.matchScore}%
                            </div>
                        </div>
                        <p className="text-slate-700 mb-5 text-sm leading-relaxed font-medium">{job.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100 print:bg-white print:border-slate-200">
                            <div>
                                <div className="text-xs font-bold text-slate-400 mb-1 uppercase">硬性要求</div>
                                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                                    {job.requirements.map(r => <li key={r}>{r}</li>)}
                                </ul>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 mb-1 uppercase">目标公司</div>
                                <div className="text-sm text-slate-700 font-medium">{job.companies.join(" / ")}</div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </section>

             <section className="print-break-inside-avoid">
               <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600 print:bg-white print:border-slate-200 print:border-l-4 print:border-l-black">
                 <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                   <TrendingUp size={20} className="text-blue-600 print:text-black"/> 行业宏观解读
                 </h3>
                 <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line font-medium">
                   {report.industryAnalysis}
                 </p>
               </div>
             </section>
          </div>

          {/* RIGHT COLUMN: ANALYSIS */}
          <div className="space-y-8 print:grid print:grid-cols-2 print:gap-8 print:space-y-0 print:mb-8">
            <section className="print-break-inside-avoid">
                <SectionTitle icon={Brain} title={`性格解析 (${report.profileSummary.mbti})`} className="text-lg" />
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm print:shadow-none">
                    <p className="text-sm text-slate-700 mb-4 font-medium leading-relaxed">
                        {report.profileSummary.mbtiDescription}
                    </p>
                    <div className="space-y-4">
                        <div>
                            <div className="text-xs font-bold text-green-700 mb-2 flex items-center gap-1 uppercase">
                                <CheckCircle2 size={14} /> 优势
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {report.profileSummary.mbtiStrengths.map(s => (
                                <span key={s} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-semibold">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-red-700 mb-2 flex items-center gap-1 uppercase">
                                <XCircle size={14} /> 避坑
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {report.profileSummary.mbtiWeaknesses.map(s => (
                                <span key={s} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-semibold">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             <section className="print-break-inside-avoid">
                <SectionTitle icon={Award} title="技能图谱" className="text-lg" />
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm print:shadow-none">
                    <div className="space-y-5">
                        <div>
                        <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">已点亮 ✅</div>
                        <div className="flex flex-wrap gap-2">
                            {report.skillGap.acquired.length > 0 ? report.skillGap.acquired.map(s => (
                            <span key={s} className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200">
                                {s}
                            </span>
                            )) : <span className="text-xs text-slate-400">暂无</span>}
                        </div>
                        </div>
                        <div>
                        <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">待解锁 🚀</div>
                        <div className="flex flex-wrap gap-2">
                            {report.skillGap.missing.map(s => (
                            <span key={s} className="text-xs font-bold bg-white text-orange-600 px-2 py-1 rounded border-2 border-orange-100">
                                {s}
                            </span>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </section>
          </div>
        </div>

        {/* ROADMAP - NEW VISUALIZATION */}
        <section className="mt-16 print-break-before">
          <SectionTitle icon={Calendar} title="金融进阶路线图" />
          
          <div className="space-y-6">
            <YearCard yearKey="freshman" data={report.roadmap.freshman} color="blue" />
            <YearCard yearKey="sophomore" data={report.roadmap.sophomore} color="indigo" />
            <YearCard yearKey="junior" data={report.roadmap.junior} color="purple" />
            <YearCard yearKey="senior" data={report.roadmap.senior} color="slate" />
            {report.roadmap.graduate && (
              <YearCard yearKey="graduate" data={report.roadmap.graduate} color="emerald" />
            )}
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm no-print">
          <p>Made with ❤️ for Future Financiers. 此报告由 AI 职业规划大师生成，仅供参考。</p>
        </footer>
      </div>
    </div>
  );
};

// --- Sub-components ---

const SectionTitle = ({ icon: Icon, title, className = "" }: { icon: any, title: string, className?: string }) => (
    <h2 className={`text-2xl font-black text-slate-900 flex items-center gap-3 mb-6 ${className}`}>
        <div className="bg-blue-600 p-1.5 rounded-lg text-white print:bg-black print:text-white">
            <Icon size={24} />
        </div>
        {title}
    </h2>
);

const Tag = ({ icon: Icon, text }: { icon: any, text: string }) => (
    <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2 font-semibold text-slate-700 shadow-sm print:bg-white print:border-slate-300">
        <Icon size={14} className="text-blue-600 print:text-black"/>
        <span>{text}</span>
    </div>
);

const YearCard = ({ yearKey, data, color }: { yearKey: string, data: RoadmapYear, color: string }) => {
    const colorMap: any = {
        blue: "border-blue-500 bg-blue-50/50",
        indigo: "border-indigo-500 bg-indigo-50/50",
        purple: "border-purple-500 bg-purple-50/50",
        slate: "border-slate-500 bg-slate-50/50",
        emerald: "border-emerald-500 bg-emerald-50/50",
    }
    
    // Map colors to text classes
    const textColors: any = {
        blue: "text-blue-700",
        indigo: "text-indigo-700",
        purple: "text-purple-700",
        slate: "text-slate-700",
        emerald: "text-emerald-700",
    }

    return (
        <div className={`relative border-l-4 ${colorMap[color]} rounded-r-xl p-6 print-break-inside-avoid print:bg-white print:border-l-4 print:border-black print:border-t print:border-r print:border-b print:border-slate-200`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-slate-200 pb-3">
                 <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${textColors[color]} opacity-80`}>{data.yearLabel}</span>
                    <h3 className={`text-xl font-black ${textColors[color]} print:text-black`}>{data.theme}</h3>
                 </div>
                 <div className={`mt-2 md:mt-0 font-bold text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 ${textColors[color]} print:border-slate-300 print:text-black`}>
                    核心: {data.core_task}
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RoadmapItem icon={BookOpen} title="学业重心" content={data.academic_focus} />
                <RoadmapItem icon={Award} title="考证里程碑" content={data.certificate_milestone} highlight={data.certificate_milestone.includes("CFA") || data.certificate_milestone.includes("FRM")} />
                <RoadmapItem icon={Briefcase} title="实习/实践" content={data.internship_goal} />
            </div>
        </div>
    )
}

const RoadmapItem = ({ icon: Icon, title, content, highlight }: { icon: any, title: string, content: string, highlight?: boolean }) => (
    <div>
        <div className="flex items-center gap-2 mb-2 text-slate-500">
            <Icon size={14} />
            <span className="text-xs font-bold uppercase">{title}</span>
        </div>
        <p className={`text-sm font-medium leading-relaxed ${highlight ? 'text-blue-700 font-bold bg-blue-50 p-2 rounded block border border-blue-100' : 'text-slate-800'}`}>
            {content}
        </p>
    </div>
)
