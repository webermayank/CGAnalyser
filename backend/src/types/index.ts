export interface RawStudent {
  ID: string;
  Name: string;
  Email: string;
  Phone: string;
  Branch: string;
  CGPA: string;
  Skills: string;
  Projects: string;
  Internships: string;
  Certifications: string;
}

export interface ParsedStudent {
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
}

export type Category = 'Strong' | 'Average' | 'Needs Improvement';

export interface ScoreDetails {
  cgpaScore: number;
  skillsScore: number;
  projectsScore: number;
  internshipsScore: number;
  certificationsScore: number;
  totalScore: number;
}

export interface CategorizedStudent extends ParsedStudent {
  category: Category;
  score: ScoreDetails;
  explanation: string;
}
