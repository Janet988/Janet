import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ReportView } from './components/ReportView';
import { generateCareerReport } from './geminiService';
import { StudentProfile, CareerReport } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [report, setReport] = useState<CareerReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: StudentProfile) => {
    setIsLoading(true);
    setError(null);
    setProfile(data);
    
    try {
      const generatedReport = await generateCareerReport(data);
      setReport(generatedReport);
    } catch (err) {
      console.error(err);
      setError("AI生成报告失败，请检查API Key或稍后重试。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setProfile(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-20">
      
      {/* Navigation / Header */}
      {!report && (
        <nav className="bg-white border-b border-slate-200 py-4 px-6 mb-8">
           <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="font-bold text-xl tracking-tight text-slate-900">
                Finance <span className="text-blue-600">CareerPath</span> AI
              </div>
           </div>
        </nav>
      )}

      {error && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-2">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}

      <main className="container mx-auto px-4">
        {!report ? (
          <div className="fade-in">
             <div className="max-w-2xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
                  你的金融职业未来，<br />
                  <span className="text-blue-600">从这里开始清晰。</span>
                </h1>
                <p className="text-lg text-slate-600">
                  专业算法结合资深行业经验，为你生成最具实操性的职业规划报告。
                </p>
             </div>
             <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
             
             {/* Features Grid */}
             <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                  <h3 className="font-bold mb-2">精准画像</h3>
                  <p className="text-sm text-slate-500">结合学校、MBTI与家庭背景，多维度分析竞争力。</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                  <h3 className="font-bold mb-2">内行建议</h3>
                  <p className="text-sm text-slate-500">不仅有路径，更有行业黑话与潜规则的深度解读。</p>
                </div>
                <div className="p-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                  <h3 className="font-bold mb-2">证书规划</h3>
                  <p className="text-sm text-slate-500">CFA/FRM/CQF 什么时候考？根据年级给出最优解。</p>
                </div>
             </div>
          </div>
        ) : (
          <div className="fade-in pb-10">
             <button 
               onClick={handleReset}
               className="mb-6 text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2 print:hidden"
             >
               &larr; 返回重新规划
             </button>
             <ReportView report={report} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
