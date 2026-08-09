# Smart Candidate Screening System

This project automates the placement screening process for coordinators, replacing manual resume reviews with a transparent, rule-based scoring engine.

## Problem Solved
Placement coordinators have to manually sift through hundreds of spreadsheets containing student data. This process is time-consuming, inconsistent, and often subjective. This system loads student data (CSV format), evaluates each candidate automatically based on a point-based scoring engine, and categorizes them into **Strong**, **Average**, or **Needs Improvement**. 

The most important feature is **transparency**: for every student, the dashboard provides a plain-English explanation for why they received their score and category, removing any "black-box" mystery.

## Features
- **Instant Summary**: At-a-glance metrics showing how many students fall into each category.
- **Dynamic Filtering**: Filter candidates instantly by minimum CGPA, specific skills, or category.
- **Detailed View**: A comprehensive breakdown of a student's profile, including their score components and the generated explanation.

## Tech Stack
- **Frontend**: React + Vite + TypeScript (Vanilla CSS with modern glassmorphic aesthetics)
- **Backend**: Express + TypeScript + Node.js (In-memory CSV parsing)

## How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Running the Backend
1. Open a terminal and navigate to the `backend` folder.
2. Install dependencies: `npm install`
3. Start the server: `npm run dev`
   - The backend runs on `http://localhost:3001`

### Running the Frontend
1. Open a new terminal and navigate to the `frontend` folder.
2. Install dependencies: `npm install`
3. Start the Vite dev server: `npm run dev`
   - Open your browser to `http://localhost:5173`

## Future Improvements
- Add persistent database storage (PostgreSQL/MongoDB) when scaling up.
- Add file upload capabilities to the frontend UI so users can upload new CSVs on the fly.
- Implement authentication for placement coordinators.
