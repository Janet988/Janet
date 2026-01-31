import { GoogleGenAI, Type } from "@google/genai";
import { CareerReport, StudentProfile } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateCareerReport(profile: StudentProfile): Promise<CareerReport> {
  const prompt = `
    Role: You are a sharp, pragmatic, and highly experienced Career Mentor in the Chinese Financial Industry (Top Tier VC/PE/IB background).
    
    **Tone & Style Guidelines (CRITICAL):**
    1.  **Speak Human:** Use natural, colloquial professional Chinese (Mainland financial circle style).
    2.  **No Translationese:** Avoid sentence structures that sound like translated English (e.g., avoid "作为一名...", "你的优势在于..."). Instead, be direct: "大一的核心就是刷绩点", "你这个背景去投行很难".
    3.  **Be Direct & Opinionated:** Don't hedge. Give clear, actionable instructions.
    
    **Student Profile:**
    - Name: ${profile.name}
    - School: ${profile.school} (Evaluate tier: 985/211/Overseas/Double Non)
    - Major: ${profile.major}
    - Grade: ${profile.grade}
    - Skills: ${profile.skills.join(", ") || "None"}
    - MBTI: ${profile.mbti}
    - Goal: ${profile.academicGoal} ${profile.targetInstitution ? `(Target: ${profile.targetInstitution})` : ""}
    - Tracks: ${profile.employmentGoals.join(", ")}

    **Certificate Logic (STRICT RULES):**
    1.  **Focus ONLY on:** CFA, FRM, CQF. Stop recommending random low-value certs (like Securities Qualification) unless strictly necessary for a specific immediate internship.
    2.  **CFA Rule:** Level 1 can be taken **23 months before graduation**.
        *   **Action:** Explicitly schedule "CFA Level 1 Prep" in **Sophomore (Year 2) Spring** and "Take Exam" in **Sophomore Summer** or **Junior (Year 3) Fall**.
        *   *Do NOT* tell them to wait until Senior year. That is outdated advice.
    3.  **CQF:** Only for Quant/Math backgrounds.
    4.  **FRM:** Good for Risk/Trading. Can start early.
    5.  **CPA:** Generally DISCOURAGE for undergrads unless aiming for Audit. If mentioned, put in Graduate phase.

    **Roadmap Generation:**
    For each year (Freshman to Graduate), provide specific, distinct content for:
    - **Core Task**: The #1 priority.
    - **Academic Focus**: GPA goals, specific courses (Math, Python, Accounting).
    - **Certificate Milestone**: Specifically which exam to prep/take.
    - **Internship Goal**: What kind of company/role to aim for (e.g., "Big 4 PTA", "Tier 2 Brokerage").

    **Output Format:** JSON only.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          studentName: { type: Type.STRING },
          generatedAt: { type: Type.STRING },
          profileSummary: {
            type: Type.OBJECT,
            properties: {
              school: { type: Type.STRING },
              major: { type: Type.STRING },
              mbti: { type: Type.STRING },
              mbtiDescription: { type: Type.STRING, description: "Short, punchy personality analysis in natural Chinese." },
              mbtiStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              mbtiWeaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["school", "major", "mbti", "mbtiDescription", "mbtiStrengths", "mbtiWeaknesses"]
          },
          competencyRadar: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    subject: { type: Type.STRING },
                    A: { type: Type.NUMBER },
                    fullMark: { type: Type.NUMBER },
                },
                required: ["subject", "A", "fullMark"]
            }
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                roleName: { type: Type.STRING },
                matchScore: { type: Type.NUMBER },
                description: { type: Type.STRING, description: "Why this fits, in natural language." },
                requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
                path: { type: Type.ARRAY, items: { type: Type.STRING } },
                companies: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["roleName", "matchScore", "description", "requirements", "path", "companies"]
            }
          },
          industryAnalysis: { type: Type.STRING, description: "Macro analysis in 'Insider' tone." },
          skillGap: {
            type: Type.OBJECT,
            properties: {
              acquired: { type: Type.ARRAY, items: { type: Type.STRING } },
              missing: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["acquired", "missing"]
          },
          roadmap: {
            type: Type.OBJECT,
            properties: {
              freshman: { 
                type: Type.OBJECT, 
                properties: { 
                  yearLabel: {type: Type.STRING}, theme: {type: Type.STRING}, core_task: {type: Type.STRING}, academic_focus: {type: Type.STRING}, certificate_milestone: {type: Type.STRING}, internship_goal: {type: Type.STRING}
                }, required: ["yearLabel", "theme", "core_task", "academic_focus", "certificate_milestone", "internship_goal"]
              },
              sophomore: { 
                type: Type.OBJECT, 
                properties: { 
                   yearLabel: {type: Type.STRING}, theme: {type: Type.STRING}, core_task: {type: Type.STRING}, academic_focus: {type: Type.STRING}, certificate_milestone: {type: Type.STRING}, internship_goal: {type: Type.STRING}
                }, required: ["yearLabel", "theme", "core_task", "academic_focus", "certificate_milestone", "internship_goal"]
              },
              junior: { 
                type: Type.OBJECT, 
                properties: { 
                   yearLabel: {type: Type.STRING}, theme: {type: Type.STRING}, core_task: {type: Type.STRING}, academic_focus: {type: Type.STRING}, certificate_milestone: {type: Type.STRING}, internship_goal: {type: Type.STRING}
                }, required: ["yearLabel", "theme", "core_task", "academic_focus", "certificate_milestone", "internship_goal"]
              },
              senior: { 
                type: Type.OBJECT, 
                properties: { 
                   yearLabel: {type: Type.STRING}, theme: {type: Type.STRING}, core_task: {type: Type.STRING}, academic_focus: {type: Type.STRING}, certificate_milestone: {type: Type.STRING}, internship_goal: {type: Type.STRING}
                }, required: ["yearLabel", "theme", "core_task", "academic_focus", "certificate_milestone", "internship_goal"]
              },
              graduate: { 
                type: Type.OBJECT, 
                properties: { 
                   yearLabel: {type: Type.STRING}, theme: {type: Type.STRING}, core_task: {type: Type.STRING}, academic_focus: {type: Type.STRING}, certificate_milestone: {type: Type.STRING}, internship_goal: {type: Type.STRING}
                }, required: ["yearLabel", "theme", "core_task", "academic_focus", "certificate_milestone", "internship_goal"]
              },
            },
            required: ["freshman", "sophomore", "junior", "senior", "graduate"]
          },
          insiderAdvice: { type: Type.STRING }
        },
        required: ["studentName", "generatedAt", "profileSummary", "recommendations", "industryAnalysis", "skillGap", "roadmap", "insiderAdvice", "competencyRadar"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as CareerReport;
}