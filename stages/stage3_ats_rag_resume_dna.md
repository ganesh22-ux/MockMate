# Stage 3: ATS Resume Scorer, Hybrid RAG Engine & "Resume DNA" Verification

## 🎯 Goal & Objectives
Build a recruiter-grade ATS Resume Analyzer powered by a **Custom Hybrid RAG Engine** (Sparse BM25 + Dense Vector Similarity) and an interactive 3-minute **"Resume DNA" Proof-of-Skill Micro-Challenge** engine.

---

## ⚙️ Core Modules & Logic

### 1. Resume Parser & Job Description Matcher
- Candidate selects Target Company (e.g. *Amazon SDE*) and pastes or uploads their resume text/file.
- Extracts key bullet points, technologies, framework tools, metrics, and years of experience.

### 2. Custom Hybrid RAG Architecture
- **Sparse Keyword Matcher (BM25 Algorithm)**: Computes Term Frequency-Inverse Document Frequency (TF-IDF) keyword relevance between resume and target company JD requirements.
- **Dense Vector Search (Gemini `text-embedding-004`)**: Generates 768-dimensional embeddings for semantic similarity scoring (e.g. mapping "distributed state store" ↔ "Redis / DynamoDB").
- **Reciprocal Rank Fusion (RRF)**:
  $$\text{RRF Score}(d) = \sum_{m \in M} \frac{1}{k + r_m(d)}$$
  Combines BM25 rank $r_{\text{sparse}}$ and Vector rank $r_{\text{dense}}$ to create an unbiased composite ATS score.
- **Google XYZ Bullet Transformer**: Re-writes weak resume bullet points into Google's quantized format (*"Accomplished [X], measured by [Y], by doing [Z]"*).

### 3. 🧬 "Resume DNA" Proof-of-Skill Verification Engine
- Extracts top 3 technical skill claims from candidate's resume (e.g. *SQL, React, System Design*).
- Immediately launches a **3-Minute Micro-Challenge Modal**:
  - 3 rapid-fire practical code/concept questions tailored to the candidate's resume claims.
  - Interactive timer countdown (180 seconds total).
- Upon scoring $\ge 80\%$, awards the **"Verified Resume DNA Badge"** on candidate's profile, updates DB, and unlocks recruiter-verified score boost.

---

## 🧪 Stage 3 Verification Checkpoint
1. Test resume parsing with sample resumes (good vs weak formatting).
2. Inspect Hybrid RAG breakdown (BM25 score vs Dense Vector score) in the Recruiter Drawer.
3. Complete the 3-minute Resume DNA micro-challenge and verify badge updates on the dashboard.
