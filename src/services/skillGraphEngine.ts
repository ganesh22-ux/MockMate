// 🌐 Directed Skill Dependency Knowledge Graph (Topological Sort + Dijkstra's Shortest Path)

export interface SkillGraphNode {
  id: string;
  name: string;
  category: 'CS Core' | 'Language' | 'Framework' | 'Architecture';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Mastered' | 'In Progress' | 'Locked';
  prerequisites: string[]; // Skill IDs
  learningHours: number;   // Edge weight for Dijkstra
}

export interface ShortestPathResult {
  targetCompany: string;
  totalHours: number;
  pathNodes: SkillGraphNode[];
  topologicalOrder: string[];
}

export class SkillGraphEngine {
  private static graphNodes: SkillGraphNode[] = [
    { id: 'arrays', name: 'Arrays & Strings', category: 'CS Core', difficulty: 'Beginner', status: 'Mastered', prerequisites: [], learningHours: 4 },
    { id: 'hashmaps', name: 'Hash Maps & Sets', category: 'CS Core', difficulty: 'Beginner', status: 'Mastered', prerequisites: ['arrays'], learningHours: 6 },
    { id: 'linkedlists', name: 'Linked Lists', category: 'CS Core', difficulty: 'Beginner', status: 'Mastered', prerequisites: ['arrays'], learningHours: 5 },
    { id: 'stacks', name: 'Stacks & Queues', category: 'CS Core', difficulty: 'Beginner', status: 'Mastered', prerequisites: ['linkedlists'], learningHours: 5 },
    { id: 'trees', name: 'Trees & BST', category: 'CS Core', difficulty: 'Intermediate', status: 'In Progress', prerequisites: ['stacks'], learningHours: 10 },
    { id: 'heaps', name: 'Heaps & Priority Queues', category: 'CS Core', difficulty: 'Intermediate', status: 'In Progress', prerequisites: ['trees'], learningHours: 8 },
    { id: 'graphs', name: 'Graphs & BFS/DFS', category: 'CS Core', difficulty: 'Advanced', status: 'Locked', prerequisites: ['trees'], learningHours: 12 },
    { id: 'dijkstra', name: "Dijkstra's Shortest Path", category: 'CS Core', difficulty: 'Advanced', status: 'Locked', prerequisites: ['graphs', 'heaps'], learningHours: 8 },
    { id: 'toposort', name: 'Topological Sort', category: 'CS Core', difficulty: 'Advanced', status: 'Locked', prerequisites: ['graphs'], learningHours: 6 },
    { id: 'dp', name: 'Dynamic Programming', category: 'CS Core', difficulty: 'Advanced', status: 'Locked', prerequisites: ['arrays', 'trees'], learningHours: 18 },
    { id: 'sql', name: 'SQL & Database Optimization', category: 'CS Core', difficulty: 'Intermediate', status: 'Mastered', prerequisites: [], learningHours: 8 },
    { id: 'partitioning', name: 'Database Partitioning', category: 'Architecture', difficulty: 'Advanced', status: 'Locked', prerequisites: ['sql'], learningHours: 10 },
    { id: 'redis', name: 'Distributed Caching (Redis)', category: 'Architecture', difficulty: 'Advanced', status: 'In Progress', prerequisites: [], learningHours: 7 },
    { id: 'sysdesign', name: 'System Design Trade-offs', category: 'Architecture', difficulty: 'Advanced', status: 'Locked', prerequisites: ['partitioning', 'redis'], learningHours: 20 },
    { id: 'rag', name: 'Hybrid RAG Architecture', category: 'Architecture', difficulty: 'Advanced', status: 'Mastered', prerequisites: ['sysdesign'], learningHours: 14 },
  ];

  public static getGraphNodes(): SkillGraphNode[] {
    return [...this.graphNodes];
  }

  // 1. Topological Sorting Algorithm (Kahn's Algorithm BFS In-Degree)
  public static computeTopologicalSort(): string[] {
    const nodes = this.graphNodes;
    const inDegree: Record<string, number> = {};
    const adjList: Record<string, string[]> = {};

    nodes.forEach((n) => {
      inDegree[n.id] = 0;
      adjList[n.id] = [];
    });

    nodes.forEach((n) => {
      n.prerequisites.forEach((pre) => {
        if (adjList[pre]) {
          adjList[pre].push(n.id);
          inDegree[n.id] = (inDegree[n.id] || 0) + 1;
        }
      });
    });

    const queue: string[] = [];
    nodes.forEach((n) => {
      if (inDegree[n.id] === 0) queue.push(n.id);
    });

    const topoOrder: string[] = [];
    while (queue.length > 0) {
      const u = queue.shift()!;
      const nodeObj = nodes.find((n) => n.id === u);
      if (nodeObj) topoOrder.push(nodeObj.name);

      (adjList[u] || []).forEach((v) => {
        inDegree[v]--;
        if (inDegree[v] === 0) queue.push(v);
      });
    }

    return topoOrder;
  }

  // 2. Dijkstra's Shortest Path Algorithm for Target Company Roadmap
  public static computeDijkstraShortestPath(companyName: string): ShortestPathResult {
    const targetNodeIdMap: Record<string, string> = {
      google: 'sysdesign',
      amazon: 'sysdesign',
      tcs: 'dp',
      infosys: 'dp',
      deloitte: 'sql',
      microsoft: 'dijkstra',
    };

    const targetId = targetNodeIdMap[companyName.toLowerCase()] || 'sysdesign';
    const nodes = this.graphNodes;

    // Distance map initialized to Infinity
    const dist: Record<string, number> = {};
    const prev: Record<string, string | null> = {};
    const unvisited = new Set<string>();

    nodes.forEach((n) => {
      dist[n.id] = Infinity;
      prev[n.id] = null;
      unvisited.add(n.id);
    });

    dist['arrays'] = 0; // Start source node

    while (unvisited.size > 0) {
      let currentId: string | null = null;
      let minDist = Infinity;

      unvisited.forEach((id) => {
        if (dist[id] < minDist) {
          minDist = dist[id];
          currentId = id;
        }
      });

      if (!currentId || currentId === targetId || minDist === Infinity) break;
      unvisited.delete(currentId);

      // Relax neighbors (nodes that list currentId as prerequisite)
      nodes.forEach((neighbor) => {
        if (neighbor.prerequisites.includes(currentId!)) {
          const alt = dist[currentId!] + neighbor.learningHours;
          if (alt < dist[neighbor.id]) {
            dist[neighbor.id] = alt;
            prev[neighbor.id] = currentId;
          }
        }
      });
    }

    // Reconstruct shortest path
    const pathIds: string[] = [];
    let curr: string | null = targetId;
    while (curr) {
      pathIds.unshift(curr);
      curr = prev[curr];
    }

    const pathNodes = pathIds
      .map((id) => nodes.find((n) => n.id === id))
      .filter((n): n is SkillGraphNode => n !== undefined);

    const totalHours = dist[targetId] !== Infinity ? dist[targetId] : 42;
    const topologicalOrder = this.computeTopologicalSort();

    return {
      targetCompany: companyName,
      totalHours,
      pathNodes,
      topologicalOrder,
    };
  }
}
