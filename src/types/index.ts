export interface PlacementMetric {
  subject: string;
  score: number;
  fullMark: number;
}

export interface FeatureHeroCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  gradient: string;
  metrics: { label: string; value: string }[];
  accentColor: 'cyan' | 'violet' | 'emerald';
}

export interface CompanyPrepPack {
  id: string;
  companyName: string;
  logoColor: string;
  tagline: string;
  roles: string[];
  questionCount: number;
  readinessScore: number;
  difficulty: 'High' | 'Medium' | 'Extreme';
}

export interface RecruiterTelemetry {
  prismaLogs: Array<{ id: string; query: string; durationMs: number; timestamp: string }>;
  ragScores: {
    denseVectorSimilarity: number;
    bm25SparseScore: number;
    rrfFusionScore: number;
    matchedKeywords: string[];
  };
  multiAgentLogs: Array<{ time: string; agent: string; action: string; status: string }>;
  wasmBenchmark: {
    memoryAllocatedMB: number;
    executionTimeMs: number;
    timeoutLimitMs: number;
    status: string;
  };
  proctoringTelemetry: {
    fps: number;
    gazeDeviations: number;
    tabSwitches: number;
    facesDetected: number;
    integrityScore: number;
  };
  verifiedDnaBadges: Array<{ skill: string; verifiedAt: string; score: number }>;
}
