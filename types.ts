export interface StudentProfile {
  name: string;
  phone?: string;
  school: string;
  major: string;
  grade: string;
  skills: string[];
  mbti: string;
  parentOccupation: string;
  expectedCity: string;
  academicGoal: string;
  targetInstitution?: string;
  employmentGoals: string[];
}

export interface JobRecommendation {
  roleName: string;
  matchScore: number;
  description: string;
  requirements: string[];
  path: string[];
  companies: string[];
}

export interface RadarData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface RoadmapYear {
  yearLabel: string; // e.g. "大一 (Freshman)"
  theme: string;     // e.g. "探索与基石"
  core_task: string;
  academic_focus: string;
  certificate_milestone: string;
  internship_goal: string;
}

export interface CareerReport {
  studentName: string;
  generatedAt: string;
  profileSummary: {
    school: string;
    major: string;
    mbti: string;
    mbtiDescription: string;
    mbtiStrengths: string[];
    mbtiWeaknesses: string[];
  };
  competencyRadar: RadarData[];
  recommendations: JobRecommendation[];
  industryAnalysis: string;
  skillGap: {
    acquired: string[];
    missing: string[];
  };
  roadmap: {
    freshman: RoadmapYear;
    sophomore: RoadmapYear;
    junior: RoadmapYear;
    senior: RoadmapYear;
    graduate: RoadmapYear;
  };
  insiderAdvice: string; 
}