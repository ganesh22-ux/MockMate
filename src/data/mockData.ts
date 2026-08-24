import type { PlacementMetric, FeatureHeroCard, CompanyPrepPack, RecruiterTelemetry } from '../types';

export const mockPlacementMetrics: PlacementMetric[] = [
  { subject: 'Aptitude & Logic', score: 85, fullMark: 100 },
  { subject: 'DSA & Coding', score: 78, fullMark: 100 },
  { subject: 'Resume ATS Match', score: 92, fullMark: 100 },
  { subject: 'STAR Interview', score: 80, fullMark: 100 },
  { subject: 'Verified Resume DNA', score: 90, fullMark: 100 },
];

export const mockFeatureHeroCards: FeatureHeroCard[] = [
  {
    id: 'voice-interview',
    title: '1-on-1 Multi-Agent AI Interview',
    subtitle: 'Simulate high-stakes technical & HR rounds with live WebSocket audio & 3 agent personas.',
    badge: 'SYSTEM 2 & 4',
    icon: 'Mic',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentColor: 'cyan',
    metrics: [
      { label: 'Turn Handoff', value: 'Auto-Switch' },
      { label: 'Audio Latency', value: '< 180ms' },
      { label: 'STAR Analysis', value: 'Real-Time' },
    ],
  },
  {
    id: 'ats-resume-dna',
    title: 'RAG ATS Reviewer & Resume DNA',
    subtitle: 'Dense vector search + BM25 keyword matching with a 3-min proof-of-skill verification quiz.',
    badge: 'SYSTEM 1 & 3',
    icon: 'FileCode',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    accentColor: 'violet',
    metrics: [
      { label: 'RRF RAG Fusion', value: '0.94 Match' },
      { label: 'Google XYZ Bullet', value: '1-Click Auto' },
      { label: 'Proof-of-Skill', value: 'Verified Badge' },
    ],
  },
  {
    id: 'wasm-dsa-proctor',
    title: 'Proctored Aptitude & DSA Suite',
    subtitle: 'Monaco editor with WebAssembly sandboxed runner & MediaPipe computer vision gaze proctoring.',
    badge: 'SYSTEM 5 & 6',
    icon: 'ShieldCheck',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentColor: 'emerald',
    metrics: [
      { label: 'Wasm Sandbox', value: '2000ms Timeout' },
      { label: 'CV Face Mesh', value: '468 Points' },
      { label: 'Questions', value: '2 DSA + 30 Apt' },
    ],
  },
];

export const mockCompanyPacks: CompanyPrepPack[] = [
  {
    id: 'google',
    companyName: 'Google',
    logoColor: 'from-red-500 to-yellow-500',
    tagline: 'System Design, Graph DSA, and Go/C++ Scalability',
    roles: ['SDE-1', 'L4 Systems Engineer'],
    questionCount: 142,
    readinessScore: 84,
    difficulty: 'Extreme',
  },
  {
    id: 'amazon',
    companyName: 'Amazon',
    logoColor: 'from-amber-500 to-orange-500',
    tagline: '16 Leadership Principles & Low-Level Architecture',
    roles: ['SDE-1', 'Frontend SDE'],
    questionCount: 198,
    readinessScore: 89,
    difficulty: 'High',
  },
  {
    id: 'tcs',
    companyName: 'TCS Digital',
    logoColor: 'from-blue-600 to-indigo-600',
    tagline: 'NQT Aptitude, Advanced Coding & Core CS Concepts',
    roles: ['Digital SDE', 'Innovator'],
    questionCount: 210,
    readinessScore: 94,
    difficulty: 'Medium',
  },
  {
    id: 'infosys',
    companyName: 'Infosys Power Programmer',
    logoColor: 'from-sky-500 to-blue-700',
    tagline: 'Competitive Programming, HackWithInfy & DBMS',
    roles: ['Power Programmer', 'Specialist Programmer'],
    questionCount: 175,
    readinessScore: 91,
    difficulty: 'High',
  },
  {
    id: 'deloitte',
    companyName: 'Deloitte USI',
    logoColor: 'from-green-500 to-emerald-700',
    tagline: 'Consulting Aptitude, SQL Analytics & Behavioral',
    roles: ['Consultant SDE', 'Data Engineer'],
    questionCount: 120,
    readinessScore: 96,
    difficulty: 'Medium',
  },
  {
    id: 'microsoft',
    companyName: 'Microsoft',
    logoColor: 'from-cyan-500 to-blue-500',
    tagline: 'Trees, Dynamic Programming & Azure Cloud System Design',
    roles: ['SDE-1', 'Cloud Software Eng'],
    questionCount: 164,
    readinessScore: 82,
    difficulty: 'Extreme',
  },
];

export const mockRecruiterTelemetry: RecruiterTelemetry = {
  prismaLogs: [
    { id: 'q-101', query: 'SELECT * FROM "User" WHERE id = "usr_0192" LIMIT 1;', durationMs: 2.4, timestamp: '21:55:01' },
    { id: 'q-102', query: 'UPDATE "UserSkillProgress" SET masteryLevel = 92 WHERE userId = "usr_0192";', durationMs: 4.1, timestamp: '21:55:03' },
    { id: 'q-103', query: 'INSERT INTO "ResumeAnalysis" (atsScore, denseScore, bm25Score) VALUES (92, 0.88, 0.96);', durationMs: 5.8, timestamp: '21:55:08' },
  ],
  ragScores: {
    denseVectorSimilarity: 0.884,
    bm25SparseScore: 0.952,
    rrfFusionScore: 0.918,
    matchedKeywords: ['React.js', 'System Design', 'TypeScript', 'WebAssembly', 'Prisma ORM', 'SQL'],
  },
  multiAgentLogs: [
    { time: '21:54:10', agent: 'Senior Tech Lead', action: 'Initiated edge-case algorithm challenge on LRU Cache', status: 'ACTIVE' },
    { time: '21:54:35', agent: 'HR Manager', action: 'Evaluated STAR response on cross-functional conflict', status: 'COMPLETED' },
    { time: '21:54:52', agent: 'System Architect', action: 'Triggered database partitioning trade-off question', status: 'QUEUED' },
  ],
  wasmBenchmark: {
    memoryAllocatedMB: 14.2,
    executionTimeMs: 142,
    timeoutLimitMs: 2000,
    status: 'PASS - 0 Timeout Violations',
  },
  proctoringTelemetry: {
    fps: 60,
    gazeDeviations: 0,
    tabSwitches: 0,
    facesDetected: 1,
    integrityScore: 100,
  },
  verifiedDnaBadges: [
    { skill: 'React & Frontend Architecture', verifiedAt: '2026-08-12', score: 95 },
    { skill: 'SQL & Database Optimization', verifiedAt: '2026-08-12', score: 92 },
    { skill: 'Data Structures & Algorithms', verifiedAt: '2026-08-12', score: 88 },
  ],
};
