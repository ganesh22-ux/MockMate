# Stage 6: MediaPipe AI Proctoring Engine & Skill Knowledge Graph

## 🎯 Goal & Objectives
Deploy real-time MediaPipe computer vision face-mesh proctoring telemetry alongside a graph-algorithm-powered **Skill Dependency Knowledge Graph** for candidate learning path optimization.

---

## ⚙️ Core Technical Modules

### 1. 👁️ MediaPipe AI Computer Vision Proctoring Engine
- **MediaPipe 468-point Face Mesh Pipeline**: Client-side video stream processing via HTML5 Canvas.
- **Telemetry Tracking**:
  - Gaze Angle Tracking: Detects when candidate looks away from the screen for > 3 seconds.
  - Head Pose Estimation: Detects head tilt / rotation off-center.
  - Multi-Person Detection: Flags secondary faces detected in camera view.
  - Tab Switch & Window Focus Telemetry: Logs tab switching events during timed assessments.
- Real-time Integrity Score (0-100%) display with active violation warnings.

### 2. 🌐 Skill Dependency Knowledge Graph (Graph Algorithms)
- **Directed Graph Representation**:
  - Nodes = Skill Competencies (e.g. *Binary Trees, Dynamic Programming, System Design*).
  - Edges = Directed Prerequisite Dependencies ($u \to v$).
- **Graph Algorithms**:
  - **Topological Sorting**: Determines exact order candidate must study missing skills.
  - **Dijkstra's Shortest Path Algorithm**: Computes shortest learning roadmap to reach readiness for target company (e.g. *Amazon SDE readiness path*).
- **Interactive Canvas Visualizer**: Node-link graph layout with color-coded nodes (🟢 Mastered, 🟡 In-Progress, 🔴 Locked).

---

## 🧪 Stage 6 Verification Checkpoint
1. Turn on proctoring camera feed and verify Face Mesh landmark overlay.
2. Look away from camera / switch browser tabs to verify violation telemetry counter.
3. Test Skill Graph Canvas and verify Dijkstra shortest path roadmap calculation.
