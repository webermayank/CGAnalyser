# Smart Candidate Screening System

**Live Deployed Application:** [https://your-frontend-link.onrender.com]([https://your-frontend-link.onrender.com](https://cg-analyser-chi.vercel.app/))   
**GitHub Repository:** [https://github.com/webermayank/CGAnalyser](https://github.com/webermayank/CGAnalyser)  

---

## 1. The Problem: Why Does This System Exist?

Every year, college placement cells and HR recruiters receive hundreds, sometimes thousands, of student profiles. Placement coordinators must sit down and manually read through every single student's CGPA, technical skills, projects, and internships to decide if they are a strong candidate to recommend to top companies. 

This manual process is highly flawed because it is:
*   **Slow:** Reviewing hundreds of resumes takes days.
*   **Inconsistent:** Two different coordinators might rate the same student differently.
*   **Subjective:** Human fatigue often leads to mistakes or bias.

**My Understanding & Solution:** 
The goal of this system is to automate the first round of resume screening. By uploading a standard spreadsheet of student data, this software instantly evaluates every student using a fair, transparent, and rule-based system. It automatically groups students into categories, allowing a placement coordinator to log in and immediately see exactly who is ready for interviews, and exactly *why* they were selected, saving days of manual work.

---

## 2. How We Grade Candidates (Categorization Logic)

We wanted a system that a non-technical placement officer could completely trust. There is no confusing "Artificial Intelligence" black box here. Instead, every student is graded on a simple **100-point scale**, mirroring how a real recruiter evaluates a candidate. 

Here is exactly how the 100 points are awarded:

*   **Academics (Up to 35 Points):** CGPA is heavily weighted. A perfect 10.0 CGPA earns maximum points, while lower scores earn proportionally less. Students with a CGPA below 5.0 receive 0 points in this category.
*   **Technical Skills (Up to 25 Points):** Every relevant technical skill a student lists (e.g., Python, React, Java) is worth 5 points.
*   **Projects (Up to 20 Points):** Practical experience matters. Every project a student has completed adds 10 points to their score.
*   **Internships (Up to 15 Points):** Real-world industry exposure is highly valued. A single internship grants the full 15 points.
*   **Certifications (Up to 5 Points):** Having any industry certification adds a bonus 5 points.

Once a student's points are added up, they are placed into one of three categories:
*   🟢 **Strong (75 to 100 points):** These are top-tier students. They have great academics combined with strong practical skills and projects. They are ready to be recommended to any company immediately.
*   🟡 **Average (50 to 74 points):** These students are decent but missing a piece of the puzzle. They might have a great CGPA but no projects, or lots of skills but a low CGPA.
*   🔴 **Needs Improvement (Under 50 points):** These students lack the necessary skills, projects, or grades for immediate placement and require further training and counseling.

For full transparency, the dashboard generates a plain-English explanation for every single student, explicitly telling the coordinator exactly which factors contributed to their final score.

---

## 3. Application Screenshots

*(Note: Replace the placeholder bracket links below with actual images of your application by dragging and dropping your screenshots into this document in GitHub or VS Code).*

### The Dashboard & Student List View
This is the main screen the placement coordinator sees. It provides a clean, enterprise-grade data table showing all candidates, alongside quick summary metrics at the top.
<img width="1320" height="572" alt="image" src="https://github.com/user-attachments/assets/4ad6e2fe-bc2a-454f-95b8-94ba87558811" />


### Filtering in Action
Coordinators can easily filter candidates by minimum CGPA, specific required technical skills, or category. The list updates instantly.
![Filtering Interface - Shows dropdowns and filtered table]<img width="1109" height="586" alt="image" src="https://github.com/user-attachments/assets/53ddd3f4-8488-4631-9401-2166b7f1034d" />


### Individual Student Detail View
Clicking on any student opens a detailed panel explaining exactly *why* they received their specific grade, breaking down their projects, internships, and skill points.
![Student Detail Panel - Shows rationale and full profile]<img width="389" height="592" alt="image" src="https://github.com/user-attachments/assets/91e57b31-2bae-4d7c-9bb4-52d8cbd99475" />



---

## 4. Future Improvements (Next Steps)

While this product solves the immediate pain point of manual screening, I am treating this as a real, evolving software product. If I had more time, here is how I would improve it next:

1.  **Customizable Scoring Weights:** Different companies look for different things. I would add a settings page allowing the placement coordinator to adjust the scoring rules. For example, if a company doesn't care about CGPA but heavily values internships, the coordinator could adjust the sliders, and the entire student list would instantly re-score and re-categorize itself based on that specific company's needs.
2.  **Direct CSV Export:** After filtering down to a list of "Strong" candidates with "React" skills, coordinators need to send this list to a hiring manager. I would add a one-click "Export to Excel/CSV" button.
3.  **Authentication & Security:** Add a secure login system so only authorized college staff can upload data and view student information, ensuring data privacy compliance.
4.  **Database Integration:** Currently, data is processed in-memory from a CSV. Moving this to a persistent database (like PostgreSQL) would allow historical tracking of placement statistics year over year.
