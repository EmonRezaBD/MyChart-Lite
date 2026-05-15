# MyChart-Lite — Implementation Details

A living document tracking the build of the MyChart experimental web app.

---

## Project Identity

- **App name:** MyChart-Lite
- **Root folder:** `D:\FramingApp\MyChart-Lite\`
- **GitHub repo:** _(to be added when pushed)_
- **Developer:** Md Rokonuzzaman Reza, Division of CSE, Louisiana State University

## What We're Building

A desktop web app simulating a patient-portal healthcare experience to study how loss/gain/neutral framing in privacy permission requests affects cognitive load in older vs. younger adults. Runs locally on the lab PC, displays 12 framing trials per participant, logs every event with millisecond timestamps, integrates with Gazepoint GP3 eye tracker via Gazepoint Analysis (Web Capture mode).

## Tech Stack

| Layer       | Choice                                  |
| ----------- | --------------------------------------- |
| Frontend    | Vite v8 + React + Tailwind CSS v4       |
| Routing     | react-router-dom                        |
| QR codes    | qrcode.react                            |
| Backend     | Node.js + Express v5                    |
| Storage     | Flat CSV files per participant          |
| Eye tracker | Gazepoint Analysis Web Capture (no LSL) |

## Environment

- **OS:** Windows 11
- **Editor:** VS Code (Prettier, Tailwind IntelliSense, ES7 snippets, Auto Rename Tag)
- **Node.js:** v20.19.5 | **npm:** 10.8.2
- **Code style:** Prettier format-on-save, 2-space indent, LF line endings

---

## Build Progress

### ✅ Step 1 — Node.js install + project folder

- Verified Node v20.19.5 and npm 10.8.2
- Created project folder at `D:\FramingApp\MyChart-Lite\`
- Initialized Git

### ✅ Step 2 — Vite + React client scaffold

- `npm create vite@latest client -- --template react`
- Dev server confirmed at `http://localhost:5174`
- VS Code extensions installed, Prettier configured
- First commit: `chore: scaffold Vite + React client`

### ✅ Step 3 — Tailwind CSS + brand foundation

- Tailwind v4 installed with `@tailwindcss/vite` plugin
- Brand tokens defined in `index.css` via `@theme` block: brand blues, accent green, neutral grays, system font stack
- `Logo.jsx` — inline SVG medical cross, scales to any size
- Deleted Vite demo styles (`App.css`), replaced `App.jsx` with brand-test screen
- Commit: `feat: integrate Tailwind CSS and brand foundation`

### ✅ Step 4 — React Router with 7 placeholder routes

- Installed `react-router-dom`
- Created `pages/` folder with 7 screen components: Welcome, QRSync, Synced, Instructions, Practice, Trial, Complete
- Wired routes in `App.jsx` with `BrowserRouter` + `Routes`
- Root `/` redirects to `/welcome`, unknown paths catch-all to `/welcome`
- Full click-through flow verified: welcome → qr → synced → instructions → practice → trial → complete
- Commit: `feat: add react-router with 7 placeholder routes`

### ✅ Step 5 — Participant context + session setup

- `ParticipantContext.jsx` — React Context stores pid, name, ageGroup, mappingRow
- `ParticipantProvider` wraps app in `main.jsx`
- `Setup.jsx` — experimenter-facing form (PID, name, age group, Latin-square row)
- `RequireParticipant` guard — redirects to `/setup` if no session active
- Root `/` now redirects to `/setup` instead of `/welcome`
- Commit: `feat: add participant context and session setup screen`

### ✅ Step 6 — Framing config + Latin-square trial generator

- `config/framings.js` — 18 stimulus strings (6 tasks × 3 frames) from experimental manipulation slide
- 6 Latin-square mapping rows: each row assigns 2 different frames per task → 12 trials
- Across all 6 rows every (task, frame) pair appears exactly twice
- `TIMING` object: fixation 1.5–2.5s, stimulus 5.0s, prompt 0.5s, ITI 2.0s
- `lib/trialGenerator.js` — seeded pseudo-random shuffle (LCG), deterministic per PID
- Debug view on Trial page verified: 12 trials, 4N + 4G + 4L balance
- Commit: `feat: add framing config and Latin-square trial generator`

### ✅ Step 7 — Trial Runner component

- `TrialRunner.jsx` — state machine cycling: fixation → stimulus → prompt → response → ITI
- Permission dialog card with task-specific SVG icons and framing text
- Buttons hidden during 5s stimulus (forced reading); fixed-height placeholder prevents layout shift
- `key={currentIndex}` on TrialRunner forces clean remount per trial
- Trial page (`Trial.jsx`) manages the 12-trial loop, advances index on completion
- Commit: `feat: build TrialRunner component with full phase state machine`

### ✅ Step 8 — Express logging server + client wiring

- `server/index.js` — Express v5 on port 3001, `POST /trial/log` endpoint, `GET /health` check
- Appends events to `data/{pid}_trials.csv`, one row per phase transition
- `client/src/lib/logger.js` — thin fetch wrapper, fails silently to avoid disrupting trials
- TrialRunner logs 5 events per trial: fixation_onset, stimulus_onset, prompt_onset, response_onset, response
- Two terminals needed: one for server (`npm run dev` in server/), one for client (`npm run dev` in client/)
- CSV verified with P001 test run: 12 trials × 5 events = 60 rows, correct frame balance, stimulus durations ~5000ms

**CSV columns:** `timestamp_ms, trial_num, task, frame, event_type, choice, rt_ms`
**Key analysis window:** gaze samples between `stimulus_onset` and `prompt_onset` rows for each trial

### ✅ Step 9 — Real onboarding screens

- `Welcome.jsx` — greets participant by name from context, MyChart-Lite logo, "Continue"
- `QRSync.jsx` — renders QR code via `qrcode.react` pointing to public GitHub Pages URL, manual Continue
- `Synced.jsx` — green checkmark, "Phone Synced Successfully", transitions to instructions
- `Instructions.jsx` — explains 12 settings, reading period, Allow/Deny choice
- `Practice.jsx` — attention check using TrialRunner; must click Deny to pass; retry on first fail; flags exclusion on second fail
- `Complete.jsx` — "Setup Complete", shows participant name + session end time
- Commit: `feat: build all onboarding screens with attention check`

### ⏭️ Step 10 — _(next)_

---

## Key Design Decisions

- **No LSL.** Gazepoint Analysis Web Capture handles gaze; trial events logged to CSV. Aligned in pandas via `pd.merge_asof`.
- **QR is pure theatre.** Points to a public static page (GitHub Pages). No LAN dependency.
- **No PII in the app.** Demographics collected on paper. App only sees pre-assigned Participant ID.
- **12 trials per participant** for stable pupillometry in within-subjects design.
- **Latin-square frame-to-task mapping** rotated across 6 rows to remove task-frame confounding.
- **Attention check** before main trials; second failure flags exclusion.

## CSV Interpretation Guide

Each trial produces 5 rows. Example (Trial 1):

```
fixation_onset   @ t=0        → "+" cross appears
stimulus_onset   @ t+~2000ms  → framing text shown (fixation lasted ~2s)
prompt_onset     @ t+~7000ms  → 5s reading window ends, icon appears
response_onset   @ t+~7500ms  → Allow/Deny buttons appear
response         @ t+varies   → participant clicked, choice + rt_ms recorded
```

**For analysis:** filter gaze data between `stimulus_onset` and `prompt_onset` timestamps per trial to get the 5-second pupil measurement window.
