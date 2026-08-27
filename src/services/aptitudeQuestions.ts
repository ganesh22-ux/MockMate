import type { DsaProblem } from './wasmCodeRunner';

export interface AptitudeQuestion {
  id: number;
  category: 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability';
  question: string;
  options: string[];
  correctOptionIndex: number;
  hint: string;
  solution: string;
}

export const sampleDsaProblems: DsaProblem[] = [
  {
    id: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hash Maps',
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    starterCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            if (mp.count(target - nums[i])) return {mp[target - nums[i]], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
    },
    testCases: [
      { id: 1, input: '[2, 7, 11, 15], 9', expectedOutput: '[0,1]' },
      { id: 2, input: '[3, 2, 4], 6', expectedOutput: '[1,2]' },
      { id: 3, input: '[3, 3], 6', expectedOutput: '[0,1]' },
    ],
  },
  {
    id: 'valid-parentheses',
    title: '2. Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stacks & Queues',
    description:
      'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and in the correct order.',
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (!map[char]) {
      stack.push(char);
    } else if (stack.pop() !== map[char]) {
      return false;
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack`,
    },
    testCases: [
      { id: 1, input: '"()[]({})"', expectedOutput: 'true' },
      { id: 2, input: '"(]"', expectedOutput: 'false' },
    ],
  },
];

export const sampleAptitudeQuestions: AptitudeQuestion[] = [
  {
    id: 1,
    category: 'Quantitative',
    question: 'A train 150 meters long passes a telegraph post in 12 seconds. What is the speed of the train in km/hr?',
    options: ['45 km/hr', '54 km/hr', '36 km/hr', '60 km/hr'],
    correctOptionIndex: 1,
    hint: 'Speed = Distance / Time. Multiply by 18/5 to convert m/s to km/hr.',
    solution: 'Speed in m/s = 150 / 12 = 12.5 m/s. Speed in km/hr = 12.5 * (18 / 5) = 45 * 1.2 = 45... wait, 12.5 * 3.6 = 45 km/hr.',
  },
  {
    id: 2,
    category: 'Logical Reasoning',
    question: 'If CAT is coded as 3120 and DOG as 4157, what is the code for PIG?',
    options: ['1697', '1691', '16197', '1597'],
    correctOptionIndex: 0,
    hint: 'Replace each letter with its position in the alphabet: P=16, I=9, G=7.',
    solution: 'P = 16th letter, I = 9th letter, G = 7th letter. Combining gives 1697.',
  },
  {
    id: 3,
    category: 'Verbal Ability',
    question: 'Choose the antonym for "METICULOUS":',
    options: ['Careless', 'Thorough', 'Precise', 'Painstaking'],
    correctOptionIndex: 0,
    hint: 'Meticulous means showing great attention to detail and precision.',
    solution: 'The opposite of meticulous (careful/thorough) is careless.',
  },
  {
    id: 4,
    category: 'Quantitative',
    question: 'A and B together can complete a work in 12 days, while B alone can do it in 30 days. In how many days can A alone complete the work?',
    options: ['15 days', '20 days', '25 days', '18 days'],
    correctOptionIndex: 1,
    hint: 'Work done by A per day = (1/12) - (1/30).',
    solution: '1/A = 1/12 - 1/30 = (5 - 2)/60 = 3/60 = 1/20. So A alone takes 20 days.',
  },
  {
    id: 5,
    category: 'Logical Reasoning',
    question: 'Look at the series: 2, 6, 12, 20, 30, ... What number should come next?',
    options: ['40', '42', '44', '48'],
    correctOptionIndex: 1,
    hint: 'Notice the differences between consecutive terms: +4, +6, +8, +10...',
    solution: 'Differences are +4, +6, +8, +10. Next difference is +12. 30 + 12 = 42.',
  },
];
