# Stage 4: Real-Time Audio Streaming & Multi-Agent AI Interview Panel

## 🎯 Goal & Objectives
Construct an interactive 1-on-1 voice mock interview room featuring bi-directional audio handling, real-time audio waveform visualizers, and a **3-Member AI Interview Panel** with dynamic turn-taking state machines.

---

## 🎙️ Core Technical Modules

### 1. Real-Time Audio Streaming & Waveform Visualizer
- Uses Web Speech API & Web Audio API for browser microphone input and voice synthesis.
- Audio Buffer Management: Real-time PCM/WAV audio spectrum analysis.
- Live Canvas Audio Visualizer: Animated HTML5 canvas displaying frequency visual waves matching candidate & AI voice output.

### 2. 🤖 Multi-Agent AI Interview Panel Orchestration
- **Agent Personas**:
  1. **Senior Tech Lead**: Deep technical questions, edge case challenges in code & algorithm design.
  2. **HR Manager**: STAR behavioral questions, culture fit, communication style, and confidence evaluation.
  3. **System Architect**: Scalability, high-level design, database trade-offs, and system architecture.
- **Turn-Taking State Machine**:
  - Monitors conversation state and dynamically switches the active interjection persona based on candidate response topics (e.g. candidate talks about conflict ➔ HR Agent responds; candidate mentions caching ➔ Tech Lead Agent responds).

### 3. Post-Interview Detailed Feedback Scorecard
- **STAR Method Analysis**: Evaluates Situation, Task, Action, Result compliance.
- **Speech Metrics**: Tracks filler words (*"um", "like"*, pace, tone confidence).
- **Interactive Transcript**: Line-by-line breakdown with "Better Ways to Answer" recommendations.

---

## 🧪 Stage 4 Verification Checkpoint
1. Launch 1-on-1 Voice Interview modal and test microphone permissions.
2. Observe live Canvas Waveform Visualizer frequency response.
3. Test persona turn-taking state switches between Tech Lead, HR Manager, and System Architect.
4. Verify generation of post-interview STAR scorecard.
