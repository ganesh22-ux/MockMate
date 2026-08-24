# Stage 2: Database Schema, Prisma ORM Layer & Seed Engine

## 🎯 Goal & Objectives
Design and deploy a type-safe relational database layer using Prisma ORM (SQLite / PostgreSQL) to manage candidate profiles, skill graph nodes, resume ATS analytics, interview transcripts, coding assessment results, and company prep packs.

---

## 🗄️ Prisma Data Models (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id               String               @id @default(uuid())
  name             String
  email            String               @unique
  readinessScore   Int                  @default(0)
  streakCount      Int                  @default(0)
  createdAt        DateTime             @default(now())
  skillProgress    UserSkillProgress[]
  resumeAnalyses   ResumeAnalysis[]
  interviewSessions InterviewSession[]
  assessmentResults AssessmentResult[]
}

model SkillNode {
  id            String              @id @default(uuid())
  name          String
  category      String              // CS Core, Language, Framework, Architecture
  difficulty    String              // Beginner, Intermediate, Advanced
  prerequisites String?             // Comma-separated JSON list of prerequisite skill IDs
  userProgress  UserSkillProgress[]
}

model UserSkillProgress {
  id            String    @id @default(uuid())
  userId        String
  skillNodeId   String
  masteryLevel  Int       @default(0) // 0-100
  verifiedBadge Boolean   @default(false)
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  skillNode     SkillNode @relation(fields: [skillNodeId], references: [id], onDelete: Cascade)
}

model ResumeAnalysis {
  id                     String   @id @default(uuid())
  userId                 String
  targetCompany          String
  targetRole             String
  atsScore               Int
  denseScore             Float
  bm25Score              Float
  claimedSkillsJson      String   // JSON string of parsed skills
  dnaVerifiedSkillsJson  String   // JSON string of verified skills
  createdAt              DateTime @default(now())
  user                   User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model InterviewSession {
  id           String   @id @default(uuid())
  userId       String
  company      String
  role         String
  transcript   String   // JSON string of message history with agent personas
  starScore    Int      // 0-100 STAR method rating
  createdAt    DateTime @default(now())
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model AssessmentResult {
  id                   String   @id @default(uuid())
  userId               String
  aptitudeScore        Int
  dsaScore             Int
  codeSubmitted        String
  proctoringViolations Int
  integrityScore       Int
  createdAt            DateTime @default(now())
  user                 User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model CompanyPrepPack {
  id               String @id @default(uuid())
  companyName      String @unique
  logo             String
  rolesJson        String // JSON array of supported roles
  questionBankJson String // JSON dataset of interview questions
}
```

---

## 🛠️ Data Seeding (`prisma/seed.ts`)
- Seed 6 major companies: **Google, Amazon, TCS, Infosys, Deloitte, Microsoft**.
- Seed 20 core skill nodes for the Directed Skill Graph (e.g. *Arrays → Hash Maps → Graphs → Dijkstra's Algorithm*).
- Seed sample user profile with realistic initial scores.

---

## 🧪 Stage 2 Verification Checkpoint
1. Run `npx prisma db push` or `npx prisma migrate dev`.
2. Run `npx prisma db seed` to populate initial test data.
3. Verify Prisma Client query output in the Recruiter Architecture Visualizer Drawer.
