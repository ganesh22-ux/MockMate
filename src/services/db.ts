// Client-side Database & Telemetry Service Handler
export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  readinessScore: number;
  streakCount: number;
}

export class MockMateDatabaseService {
  private static telemetryLogBuffer: Array<{ id: string; query: string; durationMs: number; timestamp: string }> = [
    { id: 'q-201', query: 'SELECT * FROM "User" WHERE email = "usrisaiganesh@gmail.com";', durationMs: 1.8, timestamp: new Date().toLocaleTimeString() },
    { id: 'q-202', query: 'SELECT * FROM "CompanyPrepPack" ORDER BY readinessScore DESC;', durationMs: 3.2, timestamp: new Date().toLocaleTimeString() },
    { id: 'q-203', query: 'SELECT * FROM "SkillNode" WHERE category = "CS Core";', durationMs: 2.9, timestamp: new Date().toLocaleTimeString() },
  ];

  public static getCandidateProfile(): CandidateProfile {
    this.recordQueryTrace('SELECT id, name, email, readinessScore, streakCount FROM "User" LIMIT 1;', 2.1);
    return {
      id: 'usr_0192',
      name: 'U Shree Sai Ganesh',
      email: 'usrisaiganesh@gmail.com',
      readinessScore: 89,
      streakCount: 7,
    };
  }

  public static recordQueryTrace(query: string, durationMs: number): void {
    const id = `q-${Math.floor(100 + Math.random() * 900)}`;
    const timestamp = new Date().toLocaleTimeString();
    this.telemetryLogBuffer.unshift({ id, query, durationMs, timestamp });
    if (this.telemetryLogBuffer.length > 10) {
      this.telemetryLogBuffer.pop();
    }
  }

  public static getTelemetryTraces(): Array<{ id: string; query: string; durationMs: number; timestamp: string }> {
    return [...this.telemetryLogBuffer];
  }
}
