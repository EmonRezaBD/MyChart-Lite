# Technical Development Plan: HealthHub Experimental Web App

**Goal:** build a desktop web app that simulates a healthcare app, presents 12 framing trials per participant, logs all events with millisecond timestamps, and runs entirely on the lab PC (no cloud).

**Stack chosen for minimum pain:**
- **Frontend:** Vite + React + Tailwind CSS
- **Backend:** Node.js + Express (single file, ~60 lines)
- **Storage:** flat CSV files, one per participant
- **Eye tracking integration:** Gazepoint Analysis Web Capture (no LSL)
- **QR codes:** `qrcode.react`
- **Animation/timing:** plain `setTimeout` + `requestAnimationFrame`; no animation library needed

**Total expected effort:** ~20–25 hours of focused work, or 1 week part-time.

---

## Phase 0 — Environment Prep (1 hour)

**Goal:** lab PC has everything installed and can run a basic React app.

1. **Install Node.js LTS** (v20 or later) on the lab PC
   - Download from nodejs.org
   - Verify: `node --version` and `npm --version`

2. **Install a code editor**
   - VS Code recommended (free, good React/Tailwind support)
   - Install extensions: ES7 React snippets, Tailwind CSS IntelliSense, Prettier

3. **Create the project folder structure**
   ```
   healthhub-experiment/
   ├── client/          (Vite + React app — the participant-facing UI)
   ├── server/          (Express server — logging + QR sync endpoint)
   ├── data/            (output CSVs, one per participant)
   └── README.md        (experimenter run instructions)
   ```

4. **Test that you can run a hello-world React app locally** before going further. If `npm run dev` doesn't work on a blank Vite project, fix that before adding any custom code.

---

## Phase 1 — Scaffold the Client (2 hours)

**Goal:** Vite + React + Tailwind project running, with empty placeholder screens.

5. **Create the Vite project**
   ```bash
   cd healthhub-experiment
   npm create vite@latest client -- --template react
   cd client
   npm install
   ```

6. **Install Tailwind CSS**
   - Follow Tailwind's Vite installation guide (current method uses `@tailwindcss/vite` plugin)
   - Add `@import "tailwindcss";` to `src/index.css`
   - Verify with a test `<div className="text-3xl font-bold text-blue-600">` in `App.jsx`

7. **Install additional packages**
   ```bash
   npm install react-router-dom qrcode.react
   ```

8. **Set up routing structure** in `src/App.jsx`
   - `/` → Welcome screen
   - `/qr` → QR sync screen
   - `/synced` → Sync confirmation
   - `/instructions` → Practice instructions
   - `/practice` → Attention check trial
   - `/trial` → Main trial controller (loops 12 times)
   - `/complete` → Completion screen
   - `/sync-mobile` → Pre-built static HTML page (deployed publicly OR encoded directly into the QR as a `data:` URL)

9. **Create empty placeholder components** for each route — just `<h1>` tags with the screen name. Confirm navigation works before adding any logic.

---

## Phase 2 — Framing Config (1 hour)

**Goal:** all 18 frame strings, 6 Latin-square mappings, and timing parameters in one editable file.

10. **Create `src/config/framings.js`**

    ```js
    export const TASKS = {
      location: {
        neutral: "This setting permits the app to track your location.",
        gain:    "Enable location to ensure help arrives quickly in emergencies.",
        loss:    "Disable location and risk delaying help during medical emergencies.",
      },
      health_data: { neutral: "...", gain: "...", loss: "..." },
      contacts:    { neutral: "...", gain: "...", loss: "..." },
      microphone:  { neutral: "...", gain: "...", loss: "..." },
      camera:      { neutral: "...", gain: "...", loss: "..." },
      photos:      { neutral: "...", gain: "...", loss: "..." },
    };

    // 12-trial assignment per participant. Each task appears twice
    // with different frames. Across rows, every (task, frame) pair
    // appears equally often.
    export const MAPPINGS = [
      // Row 0
      [['location','neutral'],['health_data','loss'],['contacts','gain'],
       ['microphone','neutral'],['camera','loss'],['photos','gain'],
       ['location','gain'],['health_data','neutral'],['contacts','loss'],
       ['microphone','gain'],['camera','neutral'],['photos','loss']],
      // ... 5 more rows, rotated
    ];

    export const TIMING = {
      fixationMinMs: 1500,
      fixationMaxMs: 2500,
      stimulusMs: 5000,
      promptMs: 500,
      itiMs: 2000,
    };
    ```

11. **Verify the Latin square is balanced** with a small script: count how many times each (task, frame) pair appears across all 6 mappings. Each should appear exactly twice.

12. **Generate participant trial order**: a utility function `getTrialsForParticipant(pid)` that takes the participant ID, picks the mapping row, then shuffles trial order with a fixed seed (so the order is reproducible per PID).

---

## Phase 3 — Trial Controller Component (4–6 hours)

**Goal:** a single React component that runs one trial reliably with millisecond-accurate timing.

13. **Create `src/components/TrialRunner.jsx`** that takes props:
    - `task` (e.g., "location")
    - `frame` (neutral / gain / loss)
    - `trialNum`
    - `onComplete(choice, rt_ms)` callback

14. **State machine inside the component**, using `useState` for the phase:
    - `'fixation'` → show cross for jittered duration
    - `'stimulus'` → show framing text, no buttons, for 5000ms
    - `'prompt'` → show "you may choose" icon for 500ms
    - `'response'` → show Allow/Deny buttons, wait for click
    - `'iti'` → blank screen for 2000ms, then call `onComplete`

15. **Timing implementation**
    - Use `setTimeout` for fixed phase transitions
    - Use `performance.now()` for all logging timestamps (millisecond precision, monotonic clock)
    - Send a `fetch` POST to the logger at each phase transition

16. **Stimulus screen design**
    - Mimics an iOS/Android permission dialog using Tailwind
    - Card centered on screen, app icon at top, framing sentence in body
    - Buttons hidden during the 5s stimulus window — render `<div>` placeholders so the layout doesn't shift when buttons appear

17. **Critical: prevent layout shift**
    - The framing text region must be in the same screen position across all 12 trials
    - Buttons appearing should not push text up or down
    - Use fixed-height containers or absolute positioning for the buttons

18. **Trial parent component** (`src/pages/MainTrials.jsx`)
    - Loads trial list for the participant
    - Renders `<TrialRunner>` with current trial
    - Advances to next trial on `onComplete`
    - Routes to `/complete` after all 12 done

---

## Phase 4 — Onboarding Screens (3 hours)

**Goal:** welcome, QR, sync confirmation, and practice screens — all the non-trial UI.

19. **Welcome screen** (`src/pages/Welcome.jsx`)
    - Reads participant name from a URL query param or local config
    - "Welcome back, [Name]" + Continue button
    - Healthcare app aesthetic: clean, friendly, lots of white space, blue/green palette

20. **QR sync screen** (`src/pages/QRSync.jsx`)
    - **The QR points to a publicly-hosted static page**, not to the lab PC. The participant's phone uses its own cellular data (or any Wi-Fi) to fetch the page — no LAN, no firewall config, no eduroam dependency.
    - **Deployment of the static page (one-time, ~5 minutes):**
      - Create a tiny HTML file `sync-mobile.html` with inline CSS, styled as a mobile system notification
      - Push to a GitHub repo, enable GitHub Pages
      - Public URL becomes something like `https://yourname.github.io/healthhub-sync`
      - Alternatives: Netlify drop, Cloudflare Pages — all free, all equivalent
    - **In the React component:**
      - Use `qrcode.react` to render a QR encoding the public URL
      - Below the QR, render a "Continue" button
      - The experimenter (or participant) clicks Continue once the phone has visibly displayed the confirmation
      - Optionally also bind spacebar to advance, so the experimenter can advance without leaning over the participant
    - **No polling, no fetch, no server roundtrip from the phone.** The desktop app does not know or care whether the phone successfully loaded the page — but in practice, with cellular data or any Wi-Fi, it will.

21. **Sync confirmation screen** (`src/pages/Synced.jsx`)
    - "Your phone is synced. We'll now configure your privacy settings."
    - Continue button to go to instructions

22. **Practice instructions screen** (`src/pages/Instructions.jsx`)
    - Brief plain-language explanation of the trial structure
    - "Let's try a practice round first"

23. **Attention check** (`src/pages/Practice.jsx`)
    - Reuses `<TrialRunner>` but with hardcoded stimulus text: "To confirm the system is working, please click **Deny** on this screen."
    - On wrong answer: show retry message, allow one more attempt
    - On second fail: log failure flag, continue anyway

24. **Completion screen** (`src/pages/Complete.jsx`)
    - "Setup complete. Thank you."
    - No further interaction needed; experimenter takes over

25. **Fake SMS page** (`sync-mobile.html` — standalone static file, hosted publicly)
    - A single self-contained HTML file with inline CSS and inline SVG. Lives in its own tiny repo, deployed via GitHub Pages.
    - Mobile-styled (max-width 400px, system font stack matching iOS/Android)
    - Looks like an iOS/Android notification:
      ```
      [App icon] HealthHub
      Device synced ✓
      Return to your computer to complete setup.
      ```
    - **No JavaScript needed.** No fetch calls, no interactivity. The desktop app's "Continue" button does the advancement; this page just needs to render convincingly.
    - **One-time deployment:**
      - Create a GitHub repo (e.g., `healthhub-sync`)
      - Push the HTML file as `index.html`
      - In Settings → Pages, enable Pages from the `main` branch
      - Public URL ready in ~1 minute (e.g., `https://yourname.github.io/healthhub-sync/`)
      - Test on your own phone before generating the QR for the React app

---

## Phase 5 — Express Logging Server (2–3 hours)

**Goal:** receive event POSTs from the client, append to per-participant CSV, expose the sync endpoint.

26. **Create `server/index.js`**
    ```js
    import express from 'express';
    import cors from 'cors';
    import fs from 'fs';
    import path from 'path';

    const app = express();
    app.use(cors());
    app.use(express.json());

    const DATA_DIR = './data';
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

    // Trial events — the only thing the server needs to do
    app.post('/trial/log', (req, res) => {
      const { pid, ...event } = req.body;
      const file = path.join(DATA_DIR, `${pid}_trials.csv`);
      const isNew = !fs.existsSync(file);
      const header = 'timestamp_ms,trial_num,task,frame,event_type,choice,rt_ms\n';
      const row = `${event.timestamp_ms},${event.trial_num||''},${event.task||''},${event.frame||''},${event.event_type},${event.choice||''},${event.rt_ms||''}\n`;
      if (isNew) fs.writeFileSync(file, header);
      fs.appendFileSync(file, row);
      res.json({ ok: true });
    });

    app.listen(3001, () => console.log('Logger on :3001'));
    ```

    **Note:** with QR-as-theatre, the server no longer needs sync endpoints, session state, or any externally-reachable routes. It only logs trial events from the React app running on the same machine (`localhost` → `localhost`). This is the simplest possible logging server.

27. **Confirm the server has only one job: logging.** Everything else (QR, sync confirmation) is handled client-side or via the public/data-URL static page. This drastically reduces the surface area for bugs and IRB questions.

28. **Test the logger independently** with `curl` or Postman before wiring it to the client.

---

## Phase 6 — Wire Client to Server (2 hours)

**Goal:** every trial event makes it from the React component to the CSV file.

29. **Create `src/lib/logger.js`** — a thin wrapper around `fetch` that posts to `http://localhost:3001/trial/log`. Include `participant_id` from React context.

30. **Call the logger at every event**
    - `trial_start` when TrialRunner mounts for a trial
    - `fixation_onset` when fixation phase begins
    - `stimulus_onset` when stimulus shows
    - `stimulus_offset` 5000ms later
    - `prompt_onset` when icon appears
    - `response_onset` when buttons appear
    - `response` when participant clicks (with `choice` and `rt_ms`)
    - `iti_start` and `trial_end` for boundaries

31. **Participant context provider** (`src/context/ParticipantContext.jsx`)
    - Stores `participant_id`, `age_group`, `mapping_row` for the session
    - Set at the start of the session via a config screen the experimenter fills out
    - Available to all components via `useContext`

32. **Session start screen** (experimenter-facing, e.g., at `/setup`)
    - Form: PID, name, age group, mapping row
    - Submits → sets context → navigates to `/` (Welcome)

---

## Phase 7 — Pilot Testing (4–6 hours)

**Goal:** find every bug before any real participant sits down.

33. **Self-pilot** (you sit in the chair)
    - Run a full session start to finish on yourself
    - Time it: should be ~30 minutes
    - Look for: layout shifts, timing inconsistencies, server errors, browser console warnings

34. **Lab-mate pilot** (2 people other than you)
    - Different screen brightness conditions
    - Different glasses/no-glasses
    - Check that QR scan works on both Android and iOS phones
    - Confirm the fake SMS page renders correctly on small screens

35. **Data sanity checks**
    - Open the generated CSV in pandas
    - Count events per trial: should match expected event schema
    - Compute stimulus durations from timestamps: should be 5000 ± 20 ms
    - Compute response times: should look human (typically 500–3000 ms)

36. **Eye tracking integration check**
    - Run a session with Gazepoint Analysis recording in Web Capture mode
    - After session: open the recording in Analysis
    - Define AOIs around the framing text region on the stimulus screens
    - Export gaze CSV
    - In pandas: merge the gaze CSV with the trial log using nearest-timestamp matching (`pd.merge_asof`)
    - Confirm you can isolate gaze samples within the 5s stimulus window for any given trial

---

## Phase 8 — Deployment to Lab PC (2 hours)

**Goal:** the app runs reliably from a single command on the lab PC, with no developer present.

37. **Build the production client**
    ```bash
    cd client
    npm run build
    ```
    Output goes to `client/dist/`.

38. **Serve the built client from Express**
    - Add to `server/index.js`:
      ```js
      app.use(express.static('../client/dist'));
      ```
    - Now everything runs from one server on port 3001 (or split the static client on 5173 if preferred)

39. **Create a one-click run script** (`run.bat` on Windows, `run.sh` on Mac/Linux)
    ```bat
    @echo off
    cd server
    start node index.js
    timeout /t 2
    start http://localhost:3001/setup
    ```

40. **Prepare the QR code**
    - Hardcode the public URL (e.g., `https://yourname.github.io/healthhub-sync/`) in the QRSync component
    - The QR is the same for every participant — generated once at component mount, no per-session logic needed
    - **Test the QR on both Android and iOS** before any real session: open the camera, point at the QR on the desktop screen, confirm the phone opens the sync page in its browser

41. **No firewall configuration needed.** The only network traffic on the lab PC is `localhost` → `localhost` (React app → Express logger on the same machine). The phone's traffic goes to the public internet, not the lab PC.

42. **Backup the codebase**
    - Push to a private Git repository (GitHub, GitLab, or LSU-hosted GitLab)
    - Tag the version used for data collection (e.g., `v1.0-data-collection`)
    - Any post-IRB changes get a new tag

---

## Phase 9 — Experimenter Run Sheet (1 hour)

**Goal:** a printable one-page checklist so the experimenter never forgets a step.

43. **Create `README_RUN_SESSION.md`** with:
    - Pre-session checklist (calibration, lighting, project files)
    - The exact commands to run the app
    - The URL to open in the browser
    - What to do if Gazepoint Analysis crashes
    - What to do if the QR code doesn't scan
    - Where the data files are saved
    - The exact debrief script to read

44. **Laminate it.** Lab printers smudge.

---

## Phase 10 — Post-Collection Analysis Pipeline (out of scope for build, but plan now)

**Goal:** you've collected data — what's the path from CSVs to results?

45. **Per-participant pipeline (Python notebook)**
    - Load `Pxxx_trials.csv` and `Pxxx_gaze.csv`
    - `pd.merge_asof` on timestamps
    - For each trial, extract pupil samples in the 5s stimulus window
    - Apply pupil preprocessing: blink interpolation, baseline correction (subtract last 500ms of fixation), filter
    - Compute trial-level summaries: mean pupil, peak pupil, fixation count on AOI, dwell time on keyword AOI

46. **Group-level analysis**
    - 2 (age) × 3 (frame) mixed ANOVA on pupil
    - Logistic regression on choice ~ frame + age + trustworthiness
    - Bayesian alternative if you want stronger inference with small N

47. **Pre-register the analysis plan** on OSF before unblinding the data. This is now expected for CHI submissions.

---

## Summary Time Budget

| Phase | Hours |
|---|---|
| 0. Environment | 1 |
| 1. Scaffold client | 2 |
| 2. Framing config | 1 |
| 3. Trial controller | 5 |
| 4. Onboarding screens | 3 |
| 5. Express server | 2.5 |
| 6. Wire up | 2 |
| 7. Pilot | 5 |
| 8. Deployment | 2 |
| 9. Run sheet | 1 |
| **Total** | **~24.5 hours** |

Realistic timeline:
- Full-time focus: **3–4 days**
- Part-time evenings/weekends: **2 weeks**
- With learning React from scratch: **4–5 weeks**
