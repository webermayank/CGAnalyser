import type { Student, DashboardStats, FilterMeta } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const fetchStudents = async (params: { minCgpa?: string; skill?: string; category?: string } = {}): Promise<Student[]> => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${API_BASE}/students${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
};

export const fetchStudentById = async (id: number): Promise<Student> => {
  const res = await fetch(`${API_BASE}/students/${id}`);
  if (!res.ok) throw new Error('Failed to fetch student');
  return res.json();
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await fetch(`${API_BASE}/dashboard`);
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
};

export const fetchFiltersMeta = async (): Promise<FilterMeta> => {
  const res = await fetch(`${API_BASE}/filters/meta`);
  if (!res.ok) throw new Error('Failed to fetch filter meta');
  return res.json();
};
