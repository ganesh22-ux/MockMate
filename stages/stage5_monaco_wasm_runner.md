# Stage 5: Monaco Code Editor & Sandboxed Wasm/Web Worker DSA Runner

## 🎯 Goal & Objectives
Integrate a VS-Code level Monaco Editor with a sandboxed Web Worker / WebAssembly execution engine for safe, timed DSA coding challenges and aptitude assessments.

---

## ⚙️ Core Technical Modules

### 1. Monaco Code Editor Suite
- Embedded Monaco Editor with dark VS-Code theme.
- Multi-language syntax highlighting & code execution support: **JavaScript, Python, C++, Java**.
- Autocomplete, line numbers, error markers, and code formatting.

### 2. Sandboxed Code Runner Engine (Web Worker / Wasm)
- Runs user-submitted code in an isolated **Web Worker sandbox**.
- Strict Safety Limits:
  - Execution Timeout Guard: 2000ms max runtime limit (catches infinite loops like `while(true)` without freezing the UI thread).
  - Memory Allocation Limit: Traps heap overflows.
- Test Suite Runner: Asserts candidate code output against hidden/visible test cases and reports runtime ($ms$) & memory ($MB$).

### 3. Timed Assessment Suite
- **30-Minute Timer**: Synchronized countdown timer header.
- **Problem Set**:
  - 2 DSA Coding Challenges (e.g. *Two Sum / LRU Cache* with test cases).
  - 30 Categorized Aptitude Questions (Quantitative, Verbal, Logical Reasoning).
- Step-by-step hint system and detailed solution breakdowns.

---

## 🧪 Stage 5 Verification Checkpoint
1. Open Timed Assessment Suite modal and verify 30-minute timer start.
2. Write and execute valid code solution in Monaco Editor; verify test cases pass.
3. Submit infinite loop code `while(true){}` and verify sandbox catches execution timeout in 2000ms.
