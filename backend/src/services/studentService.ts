import path from 'path';
import { categorizeStudent } from '../engine/categorizer';
import { parseCSV } from '../parsers/csvParser';
import { CategorizedStudent } from '../types';

let cachedStudents: CategorizedStudent[] = [];

export const loadStudents = async (filePath?: string): Promise<void> => {
  const fileToLoad = filePath || path.join(__dirname, '../../data/students.csv');
  const parsed = await parseCSV(fileToLoad);
  cachedStudents = parsed.map(categorizeStudent);
};

export const getStudents = (): CategorizedStudent[] => {
  return cachedStudents;
};

export const getStudentById = (id: number): CategorizedStudent | undefined => {
  return cachedStudents.find(s => s.id === id);
};

export const getDashboardStats = () => {
  const total = cachedStudents.length;
  const strong = cachedStudents.filter(s => s.category === 'Strong').length;
  const average = cachedStudents.filter(s => s.category === 'Average').length;
  const needsImprovement = cachedStudents.filter(s => s.category === 'Needs Improvement').length;

  return { total, strong, average, needsImprovement };
};
