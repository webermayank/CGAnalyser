import { ParsedStudent, ScoreDetails } from '../types';

export const scoreCGPA = (cgpa: number): number => {
  if (cgpa >= 9.0) return 35;
  if (cgpa >= 8.0) return 28;
  if (cgpa >= 7.0) return 20;
  if (cgpa >= 6.0) return 12;
  if (cgpa > 0) return 5;
  return 0;
};

export const scoreSkills = (skills: string[]): number => {
  const count = skills.length;
  if (count >= 5) return 25;
  if (count === 4) return 20;
  if (count === 3) return 15;
  if (count === 2) return 8;
  if (count === 1) return 4;
  return 0;
};

export const scoreProjects = (projects: string[]): number => {
  const count = projects.length;
  if (count >= 4) return 20;
  if (count === 3) return 15;
  if (count === 2) return 10;
  if (count === 1) return 5;
  return 0;
};

export const scoreInternships = (internships: string[]): number => {
  const count = internships.length;
  if (count >= 2) return 15;
  if (count === 1) return 10;
  return 0;
};

export const scoreCertifications = (certifications: string[]): number => {
  const count = certifications.length;
  if (count >= 2) return 5;
  if (count === 1) return 3;
  return 0;
};

export const calculateScores = (student: ParsedStudent): ScoreDetails => {
  const cgpaScore = scoreCGPA(student.cgpa);
  const skillsScore = scoreSkills(student.skills);
  const projectsScore = scoreProjects(student.projects);
  const internshipsScore = scoreInternships(student.internships);
  const certificationsScore = scoreCertifications(student.certifications);
  
  const totalScore = cgpaScore + skillsScore + projectsScore + internshipsScore + certificationsScore;

  return {
    cgpaScore,
    skillsScore,
    projectsScore,
    internshipsScore,
    certificationsScore,
    totalScore
  };
};
