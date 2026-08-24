import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting MockMate Prisma Database Seeding...');

  // 1. Seed Default Candidate User
  const user = await prisma.user.upsert({
    where: { email: 'usrisaiganesh@gmail.com' },
    update: {
      readinessScore: 89,
      streakCount: 7,
    },
    create: {
      name: 'U Shree Sai Ganesh',
      email: 'usrisaiganesh@gmail.com',
      readinessScore: 89,
      streakCount: 7,
    },
  });

  console.log(`✅ Seeded User: ${user.name} (${user.email})`);

  // 2. Seed 20 Core Skill Graph Nodes
  const skillsData = [
    { name: 'Arrays & Strings', category: 'CS Core', difficulty: 'Beginner', prerequisites: JSON.stringify([]) },
    { name: 'Hash Maps & Sets', category: 'CS Core', difficulty: 'Beginner', prerequisites: JSON.stringify(['Arrays & Strings']) },
    { name: 'Linked Lists', category: 'CS Core', difficulty: 'Beginner', prerequisites: JSON.stringify(['Arrays & Strings']) },
    { name: 'Stacks & Queues', category: 'CS Core', difficulty: 'Beginner', prerequisites: JSON.stringify(['Linked Lists']) },
    { name: 'Binary Search', category: 'CS Core', difficulty: 'Intermediate', prerequisites: JSON.stringify(['Arrays & Strings']) },
    { name: 'Trees & BST', category: 'CS Core', difficulty: 'Intermediate', prerequisites: JSON.stringify(['Stacks & Queues']) },
    { name: 'Heaps & Priority Queues', category: 'CS Core', difficulty: 'Intermediate', prerequisites: JSON.stringify(['Trees & BST']) },
    { name: 'Graphs & BFS/DFS', category: 'CS Core', difficulty: 'Advanced', prerequisites: JSON.stringify(['Trees & BST']) },
    { name: "Dijkstra's & Shortest Path", category: 'CS Core', difficulty: 'Advanced', prerequisites: JSON.stringify(['Graphs & BFS/DFS', 'Heaps & Priority Queues']) },
    { name: 'Topological Sort', category: 'CS Core', difficulty: 'Advanced', prerequisites: JSON.stringify(['Graphs & BFS/DFS']) },
    { name: 'Dynamic Programming', category: 'CS Core', difficulty: 'Advanced', prerequisites: JSON.stringify(['Arrays & Strings', 'Trees & BST']) },
    { name: 'JavaScript & TypeScript', category: 'Language', difficulty: 'Beginner', prerequisites: JSON.stringify([]) },
    { name: 'React & Frontend Arch', category: 'Framework', difficulty: 'Intermediate', prerequisites: JSON.stringify(['JavaScript & TypeScript']) },
    { name: 'Node.js & Async I/O', category: 'Framework', difficulty: 'Intermediate', prerequisites: JSON.stringify(['JavaScript & TypeScript']) },
    { name: 'SQL & Query Tuning', category: 'CS Core', difficulty: 'Intermediate', prerequisites: JSON.stringify([]) },
    { name: 'Database Partitioning', category: 'Architecture', difficulty: 'Advanced', prerequisites: JSON.stringify(['SQL & Query Tuning']) },
    { name: 'Distributed Caching (Redis)', category: 'Architecture', difficulty: 'Advanced', prerequisites: JSON.stringify(['Node.js & Async I/O']) },
    { name: 'System Design & Trade-offs', category: 'Architecture', difficulty: 'Advanced', prerequisites: JSON.stringify(['Database Partitioning', 'Distributed Caching (Redis)']) },
    { name: 'WebAssembly (Wasm)', category: 'Language', difficulty: 'Advanced', prerequisites: JSON.stringify(['JavaScript & TypeScript']) },
    { name: 'Hybrid RAG Architecture', category: 'Architecture', difficulty: 'Advanced', prerequisites: JSON.stringify(['System Design & Trade-offs']) },
  ];

  for (const s of skillsData) {
    const node = await prisma.skillNode.upsert({
      where: { name: s.name },
      update: s,
      create: s,
    });

    // Seed progress for default user
    await prisma.userSkillProgress.upsert({
      where: {
        userId_skillNodeId: {
          userId: user.id,
          skillNodeId: node.id,
        },
      },
      update: {
        masteryLevel: Math.floor(Math.random() * 30) + 70, // 70-100%
        verifiedBadge: true,
      },
      create: {
        userId: user.id,
        skillNodeId: node.id,
        masteryLevel: 85,
        verifiedBadge: true,
      },
    });
  }

  console.log(`✅ Seeded 20 Skill Nodes and User Skill Progress records.`);

  // 3. Seed 6 Target Company Prep Packs
  const companyPacks = [
    {
      companyName: 'Google',
      logoColor: 'from-red-500 to-yellow-500',
      tagline: 'System Design, Graph DSA, and Go/C++ Scalability',
      rolesJson: JSON.stringify(['SDE-1', 'L4 Systems Engineer']),
      questionCount: 142,
      readinessScore: 84,
      difficulty: 'Extreme',
      questionBankJson: JSON.stringify([
        { id: 'g-1', question: 'Implement LRU Cache with O(1) Operations', topic: 'DSA - Hash & Linked List' },
        { id: 'g-2', question: 'Design a Distributed Log Aggregator', topic: 'System Design' },
      ]),
    },
    {
      companyName: 'Amazon',
      logoColor: 'from-amber-500 to-orange-500',
      tagline: '16 Leadership Principles & Low-Level Architecture',
      rolesJson: JSON.stringify(['SDE-1', 'Frontend SDE']),
      questionCount: 198,
      readinessScore: 89,
      difficulty: 'High',
      questionBankJson: JSON.stringify([
        { id: 'a-1', question: 'Describe a situation where you had to compromise speed for quality.', topic: 'STAR Behavioral' },
        { id: 'a-2', question: 'Serialize and Deserialize a Binary Tree', topic: 'DSA - Trees' },
      ]),
    },
    {
      companyName: 'TCS Digital',
      logoColor: 'from-blue-600 to-indigo-600',
      tagline: 'NQT Aptitude, Advanced Coding & Core CS Concepts',
      rolesJson: JSON.stringify(['Digital SDE', 'Innovator']),
      questionCount: 210,
      readinessScore: 94,
      difficulty: 'Medium',
      questionBankJson: JSON.stringify([
        { id: 't-1', question: 'Find candidate numbers forming target sum in array', topic: 'Aptitude & Coding' },
      ]),
    },
    {
      companyName: 'Infosys Power Programmer',
      logoColor: 'from-sky-500 to-blue-700',
      tagline: 'Competitive Programming, HackWithInfy & DBMS',
      rolesJson: JSON.stringify(['Power Programmer', 'Specialist Programmer']),
      questionCount: 175,
      readinessScore: 91,
      difficulty: 'High',
      questionBankJson: JSON.stringify([
        { id: 'i-1', question: 'Find maximum path sum in grid using Dynamic Programming', topic: 'DSA - DP' },
      ]),
    },
    {
      companyName: 'Deloitte USI',
      logoColor: 'from-green-500 to-emerald-700',
      tagline: 'Consulting Aptitude, SQL Analytics & Behavioral',
      rolesJson: JSON.stringify(['Consultant SDE', 'Data Engineer']),
      questionCount: 120,
      readinessScore: 96,
      difficulty: 'Medium',
      questionBankJson: JSON.stringify([
        { id: 'd-1', question: 'Write SQL Query to find second highest salary with ties', topic: 'Database Analytics' },
      ]),
    },
    {
      companyName: 'Microsoft',
      logoColor: 'from-cyan-500 to-blue-500',
      tagline: 'Trees, Dynamic Programming & Azure Cloud System Design',
      rolesJson: JSON.stringify(['SDE-1', 'Cloud Software Eng']),
      questionCount: 164,
      readinessScore: 82,
      difficulty: 'Extreme',
      questionBankJson: JSON.stringify([
        { id: 'm-1', question: 'Find lowest common ancestor in Binary Search Tree', topic: 'DSA - Trees' },
      ]),
    },
  ];

  for (const pack of companyPacks) {
    await prisma.companyPrepPack.upsert({
      where: { companyName: pack.companyName },
      update: pack,
      create: pack,
    });
  }

  console.log(`✅ Seeded 6 Target Company Prep Packs.`);
  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
