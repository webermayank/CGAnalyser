import { Request, Response } from 'express';
import { getStudents, getStudentById, getDashboardStats, loadStudents } from '../services/studentService';

export const getStudentsHandler = (req: Request, res: Response) => {
  let students = getStudents();

  // Basic filtering
  const minCgpa = req.query.minCgpa ? parseFloat(req.query.minCgpa as string) : undefined;
  const skill = req.query.skill ? (req.query.skill as string).toLowerCase() : undefined;
  const category = req.query.category as string;

  if (minCgpa !== undefined && !isNaN(minCgpa)) {
    students = students.filter(s => s.cgpa >= minCgpa);
  }
  if (skill) {
    students = students.filter(s => s.skills.map(sk => sk.toLowerCase()).includes(skill));
  }
  if (category) {
    students = students.filter(s => s.category === category);
  }

  res.json(students);
};

export const getStudentByIdHandler = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const student = getStudentById(id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
};

export const getDashboardHandler = (req: Request, res: Response) => {
  res.json(getDashboardStats());
};

export const getFiltersMetaHandler = (req: Request, res: Response) => {
  const students = getStudents();
  const branches = Array.from(new Set(students.map(s => s.branch))).filter(Boolean);
  const skillsSet = new Set<string>();
  students.forEach(s => s.skills.forEach(skill => skillsSet.add(skill)));
  const skills = Array.from(skillsSet);

  res.json({ branches, skills });
};

export const uploadCSVHandler = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    await loadStudents(req.file.path);
    res.json({ message: 'File processed successfully', stats: getDashboardStats() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process CSV' });
  }
};
