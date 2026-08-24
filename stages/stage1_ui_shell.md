# Stage 1: UI Shell, Tailwind CSS v4 Glassmorphic Design System & Layout

## 🎯 Goal & Objectives
Establish the core frontend workspace, configure Tailwind CSS v4 with custom glassmorphism design tokens, and build the initial dashboard layout shell with interactive feature cards and the recruiter visualizer drawer container.

---

## 🛠️ Components & Architecture

### 1. Project Initialization & Setup
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React (`lucide-react`)
- **Charts**: Recharts (`recharts`)

### 2. Design System Tokens (`src/index.css`)
- **Background Base**: `#0B0F17` (Deep Obsidian Space)
- **Glass Panel Surface**: `rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(16px)` & `border: 1px solid rgba(255, 255, 255, 0.08)`
- **Accent Glows**:
  - Cyan: `#06B6D4` (`shadow-[0_0_20px_rgba(6,182,212,0.3)]`)
  - Violet: `#8B5CF6` (`shadow-[0_0_20px_rgba(139,92,246,0.3)]`)
  - Emerald: `#10B981` (`shadow-[0_0_20px_rgba(16,185,129,0.3)]`)
- **Typography**: `Inter` and `Outfit` fonts

### 3. Key UI Sections
1. **Top Navigation Header**:
   - Platform logo (`MockMate`) with glowing AI badge.
   - Placement Readiness Index Indicator (e.g. `84% - High Offer Trajectory`).
   - Daily Prep Streak counter (`🔥 7 Days`).
   - Live Proctoring Status toggle (`🛡️ Camera Ready`).
   - Button to open **Recruiter Architecture Visualizer Drawer**.

2. **Dashboard Grid**:
   - **Hero Placement Readiness Radar Chart**: Radar visualization across Aptitude, DSA Coding, Resume ATS, Interview STAR, and Verified Resume DNA.
   - **3 Feature Hero Cards**:
     - 🎙️ *AI 1-on-1 Multi-Agent Voice Interview*
     - 📄 *RAG ATS Resume Reviewer & Resume DNA Verifier*
     - 🧩 *Proctored Aptitude & DSA Coding Suite*
   - **Target Company Prep Packs Grid**: Google, Amazon, TCS, Infosys, Deloitte, Microsoft.

3. **Recruiter Architecture Visualizer Drawer (Slide-out Shell)**:
   - Slide-out panel from the right side of the screen.
   - Tabs: `Database (Prisma)`, `RAG Scores`, `Multi-Agent Logs`, `Wasm Benchmarks`, `Proctoring Telemetry`.

---

## 🧪 Stage 1 Verification Checkpoint
1. Run local dev server (`npm run dev`).
2. Verify dark glassmorphism styling, gradients, and custom glows.
3. Check responsive layout (desktop & mobile scaling).
4. Verify slide-out behavior of the Recruiter Architecture Visualizer Drawer.
