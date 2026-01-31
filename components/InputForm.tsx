import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { ArrowRight, Sparkles, GraduationCap, Briefcase, Phone } from 'lucide-react';

interface InputFormProps {
  onSubmit: (profile: StudentProfile) => void;
  isLoading: boolean;
}

const MBTI_TYPES = [
  'ESTJ', 'ISTJ', 'ESFJ', 'ISFJ', 
  'ESTP', 'ISTP', 'ESFP', 'ISFP',
  'ENTJ', 'INTJ', 'ENTP', 'INTP',
  'ENFJ', 'INFJ', 'ENFP', 'INFP'
];

const GRADES = ['大一', '大二', '大三', '大四', '研一', '研二'];

const PARENT_JOBS = [
  '财经相关-政府/公共事业',
  '财经相关-高校财经教育',
  '财经相关-企业职员',
  '财经相关-企业管理者',
  '财经相关-个人投资者',
  '非财经相关-企业职员',
  '非财经相关-企业管理者',
  '非财经相关-政府/公共事业',
  '非财经相关-个体经营者',
  '非财经相关-自由职业者',
  '其他'
];

const ACADEMIC_GOALS = ['保研', '考研', '留学', '直接就业', '暂时没想好'];

const EMPLOYMENT_TRACKS = [
  '券商 (投行/行研)', 
  '量化私募', 
  '公募基金', 
  '商业银行', 
  '互联网/FinTech', 
  '国央企 (非金融)', 
  'PE/VC', 
  '咨询 (MBB/四大)',
  '资产管理',
  '信托/保险',
  '暂时没想好'
];

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<StudentProfile>({
    name: '',
    phone: '',
    school: '',
    major: '',
    grade: '大一',
    skills: [],
    mbti: 'ISTJ',
    parentOccupation: PARENT_JOBS[5],
    expectedCity: '',
    academicGoal: '直接就业',
    targetInstitution: '',
    employmentGoals: []
  });

  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const toggleEmploymentGoal = (goal: string) => {
    if (goal === '暂时没想好') {
      setFormData(prev => ({
        ...prev,
        employmentGoals: ['暂时没想好']
      }));
      return;
    }

    setFormData(prev => {
      // Remove 'Undecided' if another option is selected
      let currentGoals = prev.employmentGoals.filter(g => g !== '暂时没想好');
      const exists = currentGoals.includes(goal);
      
      return {
        ...prev,
        employmentGoals: exists 
          ? currentGoals.filter(g => g !== goal)
          : [...currentGoals, goal]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Sparkles className="text-yellow-400" />
          职业规划大师
        </h2>
        <p className="mt-2 text-slate-300">
          基于大数据与资深行业经验，为你定制专属金融职业发展路径。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Section 1: Basic Info */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">基础信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">姓名</label>
              <input
                required
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="请输入你的姓名"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">手机号</label>
              <input
                required
                type="tel"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="用于接收报告信息"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">学校</label>
              <input
                required
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="例如：天津大学"
                value={formData.school}
                onChange={e => setFormData({...formData, school: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">专业</label>
              <input
                required
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="例如：金融学"
                value={formData.major}
                onChange={e => setFormData({...formData, major: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">年级</label>
              <select
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                value={formData.grade}
                onChange={e => setFormData({...formData, grade: e.target.value})}
              >
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Persona & Background */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">背景画像</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">MBTI 人格</label>
              <select
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                value={formData.mbti}
                onChange={e => setFormData({...formData, mbti: e.target.value})}
              >
                {MBTI_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">父母职业背景</label>
              <select
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white text-sm"
                value={formData.parentOccupation}
                onChange={e => setFormData({...formData, parentOccupation: e.target.value})}
              >
                {PARENT_JOBS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">期望发展城市</label>
              <input
                required
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="例如：上海、北京、深圳"
                value={formData.expectedCity}
                onChange={e => setFormData({...formData, expectedCity: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Detailed Intentions */}
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <GraduationCap size={20} />
            发展意向 (核心)
          </h3>
          
          <div className="space-y-6">
            {/* Academic Goal */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">升学/就业目标</label>
              <div className="flex flex-wrap gap-2">
                {ACADEMIC_GOALS.map(goal => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setFormData({...formData, academicGoal: goal})}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                      formData.academicGoal === goal
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Institution (Conditional) */}
            {formData.academicGoal !== '直接就业' && formData.academicGoal !== '暂时没想好' && (
              <div className="fade-in">
                <label className="block text-sm font-bold text-slate-700 mb-2">目标院校</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder={
                    formData.academicGoal === '留学' ? "例如：哥伦比亚大学、LSE" : 
                    formData.academicGoal === '保研' ? "例如：北大光华、清华经管" : 
                    "请输入你的目标院校"
                  }
                  value={formData.targetInstitution}
                  onChange={e => setFormData({...formData, targetInstitution: e.target.value})}
                />
              </div>
            )}

            {/* Employment Goals */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">意向就业赛道 (可多选)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {EMPLOYMENT_TRACKS.map(track => {
                  const isSelected = formData.employmentGoals.includes(track);
                  return (
                    <button
                      key={track}
                      type="button"
                      onClick={() => toggleEmploymentGoal(track)}
                      className={`px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition border text-left flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-200'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      {track}
                      {isSelected && <Briefcase size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Skills */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">技能与证书</h3>
          <div className="flex gap-2 mb-3">
             <input
                type="text"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="输入技能后回车或点击添加 (如: CFA, Python)"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <button 
                type="button"
                onClick={handleAddSkill}
                className="px-6 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
              >
                添加
              </button>
          </div>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {formData.skills.map(skill => (
              <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100">
                {skill}
                <button 
                  type="button" 
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-blue-900 ml-1 font-bold"
                >
                  &times;
                </button>
              </span>
            ))}
            {formData.skills.length === 0 && (
              <span className="text-slate-400 text-sm italic py-1">暂无添加技能</span>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                AI 正在规划中...
              </>
            ) : (
              <>
                生成职业规划报告 <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};