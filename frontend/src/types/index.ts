export interface ScoreDetails {
  cgpaScore: number;
  skillsScore: number;
  projectsScore: number;
  internshipsScore: number;
  certificationsScore: number;
  totalScore: number;
}

export type Category = 'Strong' | 'Average' | 'Needs Improvement';

export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  branch: string;
  cgpa: number;
  skills: string[];
  projects: string[];
  internships: string[];
  certifications: string[];
  category: Category;
  score: ScoreDetails;
  explanation: string;
}

export interface DashboardStats {
  total: number;
  strong: number;
  average: number;
  needsImprovement: number;
}

export interface FilterMeta {
  branches: string[];
  skills: string[];
}
