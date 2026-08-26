// 🤖 Multi-Agent AI Interview Panel Orchestrator & Turn-Taking State Machine

export type AgentPersonaType = 'Senior Tech Lead' | 'HR Manager' | 'System Architect';

export interface AgentPersona {
  type: AgentPersonaType;
  name: string;
  avatarColor: string;
  focusArea: string;
}

export interface InterviewMessage {
  id: string;
  sender: 'candidate' | AgentPersonaType;
  agentName?: string;
  text: string;
  timestamp: string;
  starTag?: 'Situation' | 'Task' | 'Action' | 'Result';
}

export interface StarFeedbackScorecard {
  overallStarScore: number;
  communicationConfidenceScore: number;
  fillerWordCount: number;
  detectedFillerWords: string[];
  situationScore: number;
  taskScore: number;
  actionScore: number;
  resultScore: number;
  keyStrengths: string[];
  improvementAreas: string[];
}

export class MultiAgentOrchestrator {
  public static agentPersonas: Record<AgentPersonaType, AgentPersona> = {
    'Senior Tech Lead': {
      type: 'Senior Tech Lead',
      name: 'Alex Vance (Tech Lead)',
      avatarColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
      focusArea: 'Data Structures, Code Complexity, Edge Cases & Algorithm Design',
    },
    'HR Manager': {
      type: 'HR Manager',
      name: 'Sarah Jenkins (HR Director)',
      avatarColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
      focusArea: 'STAR Behavioral Analysis, Culture Fit, Team Conflict & Career Goals',
    },
    'System Architect': {
      type: 'System Architect',
      name: 'David Chen (Principal Architect)',
      avatarColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      focusArea: 'High-Level System Design, Microservices, Caching & Scalability Trade-offs',
    },
  };

  // 1. Classify candidate response topic to transition active agent
  public static determineNextAgent(candidateText: string, currentAgent: AgentPersonaType): AgentPersonaType {
    const lower = candidateText.toLowerCase();

    if (lower.includes('team') || lower.includes('conflict') || lower.includes('deadline') || lower.includes('disagree') || lower.includes('manager')) {
      return 'HR Manager';
    }
    if (lower.includes('scale') || lower.includes('database') || lower.includes('redis') || lower.includes('microservice') || lower.includes('load balancer') || lower.includes('latency')) {
      return 'System Architect';
    }
    if (lower.includes('code') || lower.includes('algorithm') || lower.includes('array') || lower.includes('time complexity') || lower.includes('hash') || lower.includes('tree')) {
      return 'Senior Tech Lead';
    }

    // Default round-robin handoff if no keyword trigger
    if (currentAgent === 'Senior Tech Lead') return 'HR Manager';
    if (currentAgent === 'HR Manager') return 'System Architect';
    return 'Senior Tech Lead';
  }

  // 2. Generate Next Response from Active Agent Persona
  public static generateAgentResponse(agentType: AgentPersonaType, candidateText: string): string {
    const lower = candidateText.toLowerCase();

    if (agentType === 'Senior Tech Lead') {
      if (lower.includes('array') || lower.includes('hash')) {
        return 'Great point on data structure selection. How would your algorithm handle memory overhead if the dataset grows to 10 million items? What is the worst-case space complexity?';
      }
      return 'Interesting approach. Can you walk me through the edge cases, such as handling null inputs or duplicate keys in your code logic?';
    }

    if (agentType === 'HR Manager') {
      if (lower.includes('team') || lower.includes('conflict')) {
        return 'Thank you for sharing that experience. Following the STAR method, what specific Action did you take to align the team, and what was the quantifiable Result?';
      }
      return 'That gives good context on your background. Tell me about a time when a project requirement changed right before a major deployment deadline. How did you adapt?';
    }

    // System Architect
    if (lower.includes('database') || lower.includes('scale')) {
      return 'Solid architectural choice. If we introduce database read replicas to scale this service, how would you handle eventual consistency and cache invalidation?';
    }
    return 'From a system design perspective, how would you prevent a single point of failure in your API gateway during a 10x traffic spike?';
  }

  // 3. Generate Post-Interview STAR Scorecard & Filler Word Analysis
  public static generateStarScorecard(messages: InterviewMessage[]): StarFeedbackScorecard {
    const candidateMessages = messages.filter((m) => m.sender === 'candidate').map((m) => m.text);
    const combinedText = candidateMessages.join(' ').toLowerCase();

    const fillerWordsList = ['um', 'uh', 'like', 'you know', 'basically', 'actually'];
    const detectedFillers: string[] = [];
    let fillerCount = 0;

    fillerWordsList.forEach((fw) => {
      const matches = (combinedText.match(new RegExp(`\\b${fw}\\b`, 'g')) || []).length;
      if (matches > 0) {
        fillerCount += matches;
        detectedFillers.push(`${fw} (${matches}x)`);
      }
    });

    const confidenceScore = Math.max(70, Math.min(96, 95 - fillerCount * 3));
    const situationScore = combinedText.includes('project') || combinedText.includes('company') ? 88 : 75;
    const taskScore = combinedText.includes('goal') || combinedText.includes('need') ? 85 : 72;
    const actionScore = combinedText.includes('built') || combinedText.includes('implemented') || combinedText.includes('designed') ? 92 : 78;
    const resultScore = combinedText.includes('reduced') || combinedText.includes('improved') || fontMatch(combinedText) ? 90 : 76;

    const overallStarScore = Math.round((situationScore + taskScore + actionScore + resultScore) / 4);

    return {
      overallStarScore,
      communicationConfidenceScore: confidenceScore,
      fillerWordCount: fillerCount,
      detectedFillerWords: detectedFillers.length > 0 ? detectedFillers : ['None detected (Clear Speech)'],
      situationScore,
      taskScore,
      actionScore,
      resultScore,
      keyStrengths: [
        'Strong technical articulation during system architecture questions',
        'Clear demonstration of problem-solving approach under pressure',
        'Effective STAR method structuring in behavioral responses',
      ],
      improvementAreas: [
        'Quantify impact metrics more explicitly when describing project results',
        'Reduce reliance on filler phrases during initial response pauses',
      ],
    };
  }
}

function fontMatch(text: string): boolean {
  return text.includes('%') || text.includes('ms') || text.includes('seconds') || text.includes('users');
}
