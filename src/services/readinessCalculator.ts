// Master Placement Readiness Index Unified Formula Calculator

export interface ReadinessBreakdown {
  overallIndex: number;
  atsScore: number;
  starScore: number;
  dsaScore: number;
  aptitudeScore: number;
  resumeDnaScore: number;
  statusLabel: string;
}

export class ReadinessCalculator {
  public static calculateIndex(metrics: {
    atsScore?: number;
    starScore?: number;
    dsaScore?: number;
    aptitudeScore?: number;
    resumeDnaVerified?: boolean;
  }): ReadinessBreakdown {
    const atsScore = metrics.atsScore || 92;
    const starScore = metrics.starScore || 80;
    const dsaScore = metrics.dsaScore || 78;
    const aptitudeScore = metrics.aptitudeScore || 85;
    const resumeDnaScore = metrics.resumeDnaVerified ? 100 : 85;

    // Master Unified Formula:
    // Readiness = 0.25(ATS) + 0.25(STAR) + 0.20(DSA) + 0.15(Aptitude) + 0.15(Resume DNA)
    const overallIndex = Math.round(
      0.25 * atsScore +
      0.25 * starScore +
      0.20 * dsaScore +
      0.15 * aptitudeScore +
      0.15 * resumeDnaScore
    );

    let statusLabel = 'Average Readiness';
    if (overallIndex >= 90) statusLabel = 'Top 5% Candidate Trajectory';
    else if (overallIndex >= 80) statusLabel = 'High Offer Trajectory';
    else if (overallIndex >= 70) statusLabel = 'Good Placement Candidate';

    return {
      overallIndex,
      atsScore,
      starScore,
      dsaScore,
      aptitudeScore,
      resumeDnaScore,
      statusLabel,
    };
  }
}
