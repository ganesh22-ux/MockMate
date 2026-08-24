// 🧬 "Resume DNA" Proof-of-Skill Verification Engine

export interface MicroChallengeQuestion {
  id: number;
  skill: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface DnaVerificationResult {
  passed: boolean;
  scorePercentage: number;
  verifiedSkills: string[];
  badgeAwarded: boolean;
}

export class ResumeDnaEngine {
  private static questionBank: Record<string, MicroChallengeQuestion[]> = {
    'React.js': [
      {
        id: 1,
        skill: 'React.js',
        question: 'What is the primary advantage of React’s Virtual DOM reconciliation?',
        options: [
          'Directly manipulates the browser DOM tree on every state change',
          'Computes minimal DOM diffs in memory before batching actual DOM updates',
          'Disables JavaScript garbage collection for faster rendering',
          'Recompiles JSX into WebAssembly binaries at runtime',
        ],
        correctOptionIndex: 1,
        explanation: 'React compares the old and new Virtual DOM trees (reconciliation) and updates only changed nodes in the real DOM.',
      },
    ],
    'SQL': [
      {
        id: 2,
        skill: 'SQL',
        question: 'Which index type is best suited for equality and range queries on B-Tree relational databases?',
        options: [
          'Hash Index',
          'B-Tree Index',
          'Full-Text Index',
          'Spatial R-Tree Index',
        ],
        correctOptionIndex: 1,
        explanation: 'B-Tree indexes maintain sorted order, making them ideal for both equality (=) and range queries (<, >, BETWEEN).',
      },
    ],
    'System Design': [
      {
        id: 3,
        skill: 'System Design',
        question: 'According to the CAP Theorem, what two properties does a partitioned (P) distributed system prioritize under network failure?',
        options: [
          'Consistency (C) or Availability (A)',
          'Speed or Storage',
          'Latency or Throughput',
          'Security or Encryption',
        ],
        correctOptionIndex: 0,
        explanation: 'Under network partition (P), a distributed system must choose between returning consistent data (C) or remaining available (A).',
      },
    ],
  };

  public static generate3MinMicroChallenge(claimedSkills: string[]): MicroChallengeQuestion[] {
    const questions: MicroChallengeQuestion[] = [];
    
    // Pick questions for claimed skills or fall back to core competencies
    const fallbackSkills = ['React.js', 'SQL', 'System Design'];
    const skillsToTest = claimedSkills.length > 0 ? claimedSkills : fallbackSkills;

    let idCounter = 1;
    skillsToTest.forEach((skill) => {
      const bank = this.questionBank[skill] || this.questionBank['React.js'];
      bank.forEach((q) => {
        questions.push({ ...q, id: idCounter++ });
      });
    });

    return questions.slice(0, 3); // 3 rapid-fire questions
  }

  public static evaluateMicroChallenge(
    userAnswers: Record<number, number>,
    questions: MicroChallengeQuestion[]
  ): DnaVerificationResult {
    let correctCount = 0;
    const verifiedSkills: string[] = [];

    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
        if (!verifiedSkills.includes(q.skill)) {
          verifiedSkills.push(q.skill);
        }
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);
    const passed = scorePercentage >= 66; // 2 out of 3 correct passes

    return {
      passed,
      scorePercentage,
      verifiedSkills: passed ? verifiedSkills : [],
      badgeAwarded: passed,
    };
  }
}
