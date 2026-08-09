import React, { useState, useEffect } from 'react';
import type { Student, DashboardStats } from '../types';
import { fetchStudents, fetchDashboardStats, fetchFiltersMeta } from '../services/api';

export const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  
  // Filters
  const [minCgpa, setMinCgpa] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [minCgpa, skillFilter, categoryFilter]);

  const loadData = async () => {
    try {
      const filters: Record<string, string> = {};
      if (minCgpa) filters.minCgpa = minCgpa;
      if (skillFilter) filters.skill = skillFilter;
      if (categoryFilter) filters.category = categoryFilter;

      const [studentsData, statsData, metaData] = await Promise.all([
        fetchStudents(filters),
        fetchDashboardStats(),
        fetchFiltersMeta()
      ]);
      
      setStudents(studentsData);
      setStats(statsData);
      setSkills(metaData.skills);
    } catch (error) {
      console.error('Error loading dashboard data', error);
    }
  };

  const clearFilters = () => {
    setMinCgpa('');
    setSkillFilter('');
    setCategoryFilter('');
    setSelectedStudent(null);
  };

  const getStatusClass = (category: string) => {
    if (category === 'Strong') return 'status-strong';
    if (category === 'Average') return 'status-average';
    return 'status-needs';
  };

  return (
    <div className="layout-wrapper">
      <header className="page-header">
        <h1 className="page-title">Placement Candidate Screening</h1>
      </header>

      {/* Stats Summary */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-title">Total Candidates</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Strong Candidates</span>
            <span className="stat-value" style={{ color: 'var(--status-strong-text)' }}>{stats.strong}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Average Candidates</span>
            <span className="stat-value" style={{ color: 'var(--status-average-text)' }}>{stats.average}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">Needs Improvement</span>
            <span className="stat-value" style={{ color: 'var(--status-needs-text)' }}>{stats.needsImprovement}</span>
          </div>
        </div>
      )}

      {/* Filters Toolbar */}
      <div className="toolbar">
        <div className="form-group">
          <label className="form-label">Min CGPA</label>
          <input 
            type="number" 
            className="form-control" 
            placeholder="0.0" 
            value={minCgpa} 
            onChange={e => setMinCgpa(e.target.value)} 
            step="0.1" 
            min="0" 
            max="10"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Required Skill</label>
          <select 
            className="form-control" 
            value={skillFilter} 
            onChange={e => setSkillFilter(e.target.value)}
          >
            <option value="">All Skills</option>
            {skills.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            className="form-control" 
            value={categoryFilter} 
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Strong">Strong</option>
            <option value="Average">Average</option>
            <option value="Needs Improvement">Needs Improvement</option>
          </select>
        </div>
        
        <div className="form-group">
          <button className="btn btn-secondary" style={{ height: '38px' }} onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Main Grid: Table & Details */}
      <div className={selectedStudent ? 'main-grid' : ''}>
        {/* Table Panel */}
        <div className="panel">
          <div className="panel-header">
            Candidates List ({students.length})
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>CGPA</th>
                  <th>Skills</th>
                  <th>Projects</th>
                  <th>Category</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map(student => (
                    <tr 
                      key={student.id} 
                      className={selectedStudent?.id === student.id ? 'selected' : ''}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <td style={{ fontWeight: 500 }}>{student.name}</td>
                      <td>{student.branch}</td>
                      <td>{student.cgpa}</td>
                      <td>{student.skills.length}</td>
                      <td>{student.projects.length}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(student.category)}`}>
                          {student.category}
                        </span>
                      </td>
                      <td>{student.score.totalScore}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No candidates match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedStudent && (
          <div className="panel" style={{ position: 'sticky', top: '2rem' }}>
            <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Candidate Details</span>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '0.25rem 0.5rem', fontSize: '1rem', border: 'none' }} 
                onClick={() => setSelectedStudent(null)}
              >
                ✕
              </button>
            </div>
            <div className="panel-body">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{selectedStudent.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{selectedStudent.email} • {selectedStudent.phone}</p>
              
              <div className="explanation-box">
                <strong style={{ color: 'var(--text-primary)' }}>Decision Rationale:</strong><br />
                {selectedStudent.explanation}
              </div>

              <div className="detail-row">
                <span className="detail-label">Branch</span>
                <span className="detail-value">{selectedStudent.branch}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">CGPA</span>
                <span className="detail-value">{selectedStudent.cgpa} ({selectedStudent.score.cgpaScore} pts)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Skills</span>
                <span className="detail-value">
                  {selectedStudent.skills.length > 0 ? (
                    selectedStudent.skills.map(s => <span key={s} className="skill-tag">{s}</span>)
                  ) : 'None'}
                </span>
              </div>
              <div className="detail-row" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span className="detail-label">Projects ({selectedStudent.score.projectsScore} pts)</span>
                <ul className="list-unformatted detail-value" style={{ textAlign: 'left', maxWidth: '100%' }}>
                  {selectedStudent.projects.length > 0 ? (
                    selectedStudent.projects.map(p => <li key={p}>• {p}</li>)
                  ) : <li style={{ color: 'var(--text-muted)' }}>No projects listed</li>}
                </ul>
              </div>
              <div className="detail-row" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span className="detail-label">Internships ({selectedStudent.score.internshipsScore} pts)</span>
                <ul className="list-unformatted detail-value" style={{ textAlign: 'left', maxWidth: '100%' }}>
                  {selectedStudent.internships.length > 0 ? (
                    selectedStudent.internships.map(i => <li key={i}>• {i}</li>)
                  ) : <li style={{ color: 'var(--text-muted)' }}>None</li>}
                </ul>
              </div>
              <div className="detail-row" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span className="detail-label">Certifications ({selectedStudent.score.certificationsScore} pts)</span>
                <ul className="list-unformatted detail-value" style={{ textAlign: 'left', maxWidth: '100%' }}>
                  {selectedStudent.certifications.length > 0 ? (
                    selectedStudent.certifications.map(c => <li key={c}>• {c}</li>)
                  ) : <li style={{ color: 'var(--text-muted)' }}>None</li>}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
