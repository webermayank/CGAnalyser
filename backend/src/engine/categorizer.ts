import type { ParsedStudent, CategorizedStudent, ScoreDetails } from '../types';
import { calculateScores } from './scorer';
import { THRESHOLDS } from '../constants/scoring';

const generateExplanation = (student: ParsedStudent, score: ScoreDetails, category: string): string => {
  const reasons: string[] = [];
  
  if (score.cgpaScore >= 28) reasons.push(`excellent academic record (${student.cgpa} CGPA)`);
  else if (score.cgpaScore >= 20) reasons.push(`good academic record (${student.cgpa} CGPA)`);
  else reasons.push(`lower academic record (${student.cgpa} CGPA)`);

  if (student.skills.length >= 3) reasons.push(`strong technical skills (${student.skills.length} listed)`);
  else reasons.push(`limited technical skills (${student.skills.length} listed)`);

  if (student.projects.length > 0) reasons.push(`practical experience with ${student.projects.length} project(s)`);
  
  if (student.internships.length > 0) reasons.push(`industry exposure via internship`);
  
  const explanationList = reasons.join(', ');
  
  return `Categorized as ${category} (Score: ${score.totalScore}/100) due to ${explanationList}.`;
};

export const categorizeStudent = (student: ParsedStudent): CategorizedStudent => {
  const score = calculateScores(student);
  
  let category: CategorizedStudent['category'];
  if (score.totalScore >= THRESHOLDS.STRONG_MIN) {
    category = 'Strong';
  } else if (score.totalScore >= THRESHOLDS.AVERAGE_MIN) {
    category = 'Average';
  } else {
    category = 'Needs Improvement';
  }

  return {
    ...student,
    category,
    score,
    explanation: generateExplanation(student, score, category)
  };
};
