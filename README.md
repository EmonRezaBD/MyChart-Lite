# MyChart-Lite

A simulated healthcare web application built for an eye-tracking experiment studying the cognitive cost of deceptive UI framing in privacy permission requests.

**Study:** Uncovering Hidden Cognitive Costs of Deceptive UI Framing
**Researcher:** Md Rokonuzzaman Reza, Division of CSE, Louisiana State University
**Design:** 1×3 within-subjects (Neutral / Gain / Loss framing) × 2 age groups (younger 18–59, older 60+)

---

## What This App Does

Participants interact with what appears to be a real healthcare patient portal. The app walks them through 12 privacy permission settings (e.g., location access, camera access), each worded in one of three framing conditions: neutral, gain (benefit-focused), or loss (risk-focused). The app logs every interaction — screen transitions, reading windows, button choices, and reaction times — to a timestamped CSV file for later analysis alongside Gazepoint eye-tracking data.

### Participant Flow

1. **Setup** — Experimenter enters participant ID, name, age group, and Latin-square mapping row
2. **Welcome** — Personalized greeting, reinforces the healthcare app cover story
3. **QR Sync** — Participant scans a QR code with their phone (visual theatre to establish data stakeholdership)
4. **Sync Confirmed** — Transitions to privacy settings
5. **Instructions** — Explains the task
6. **Attention Check** — Practice trial; participant must click Deny to proceed
7. **12 Framing Trials** — Each trial: fixation cross (1.5–2.5s) → framing text (5s forced reading) → prompt (0.5s) → Allow/Deny choice (self-paced) → blank interval (2s)
8. **Complete** — Session ends, experimenter takes over for debrief

---

## Tech Stack

| Layer        | Tool                                                    |
| ------------ | ------------------------------------------------------- |
| Frontend     | React + Vite + Tailwind CSS v4                          |
| Routing      | react-router-dom                                        |
| QR Code      | qrcode.react                                            |
| Backend      | Node.js + Express v5                                    |
| Data Storage | Flat CSV files (one per participant)                    |
| Eye Tracker  | Gazepoint GP3 via Gazepoint Analysis (Web Capture mode) |

---

## Prerequisites

- **Node.js** v20 or later — [download here](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/mychart-lite.git
cd mychart-lite
```

### 2. Install dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Build the client for production

```bash
cd ../client
npm run build
```

### 4. Start the server

```bash
cd ../server
node index.js
```

You should see:

```
MyChart-Lite running on http://localhost:3001
Data directory: .../mychart-lite/data
Serving production client build
```

### 5. Open the app

Navigate to `http://localhost:3001` in your browser. Use fullscreen mode (F11) during experiment sessions.

---

## Development Mode

If you need to make changes to the client with hot-reload, run two terminals:

**Terminal 1 — Server:**

```bash
cd server
npm run dev
```

**Terminal 2 — Client:**

```bash
cd client
npm run dev
```

The client dev server runs on `http://localhost:5173` (or next available port) and talks to the Express server on port 3001.

---

## Project Structure

```
mychart-lite/
├── client/                 React frontend (participant-facing UI)
│   ├── src/
│   │   ├── components/     Reusable UI (Logo, TrialRunner)
│   │   ├── config/         Framing text + Latin-square mappings
│   │   ├── context/        React Context for participant state
│   │   ├── lib/            Utilities (logger, trial generator)
│   │   ├── pages/          Route-level screens (7 pages)
│   │   ├── App.jsx         Root component with routing
│   │   ├── index.css       Tailwind config + brand tokens
│   │   └── main.jsx        Entry point
│   └── dist/               Production build (generated)
├── server/
│   └── index.js            Express server (logging + static file serving)
├── data/                   CSV output (one file per participant, gitignored)
├── docs/                   Experiment protocol, run sheet, guides
├── sync-page/              Fake SMS page (deployed separately to GitHub Pages)
├── MyChart-Lite.bat        One-click startup for Windows
└── README.md
```

---

## Data Output

Each session generates `data/{PID}_trials.csv` with these columns:

| Column         | Description                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `timestamp_ms` | Unix timestamp in milliseconds                                                                                    |
| `trial_num`    | Trial number (1–12, or 0 for attention check)                                                                     |
| `task`         | Privacy task (location, health_data, contacts, microphone, camera, photos)                                        |
| `frame`        | Framing condition (neutral, gain, loss)                                                                           |
| `event_type`   | Phase marker (session_start, fixation_onset, stimulus_onset, prompt_onset, response_onset, response, session_end) |
| `choice`       | Participant's decision (allow / deny) — only on response rows                                                     |
| `rt_ms`        | Reaction time in ms from buttons appearing to click — only on response rows                                       |

### Aligning with Eye-Tracking Data

Export gaze data from Gazepoint Analysis as CSV. Both files share system-clock timestamps. Merge in Python:

```python
import pandas as pd

trials = pd.read_csv('data/P001_trials.csv')
gaze = pd.read_csv('P001_gaze.csv')

merged = pd.merge_asof(
    gaze.sort_values('timestamp_ms'),
    trials.sort_values('timestamp_ms'),
    on='timestamp_ms',
    direction='backward'
)
```

---

## Configuration

### Framing Text

Edit `client/src/config/framings.js` to modify stimulus sentences, add tasks, or adjust the Latin-square mappings.

### Timing

All trial timing is defined in `client/src/config/framings.js` under the `TIMING` object:

```js
export const TIMING = {
  fixationMinMs: 1500, // Fixation cross minimum duration
  fixationMaxMs: 2500, // Fixation cross maximum duration (jittered)
  stimulusMs: 5000, // Forced reading window (no buttons visible)
  promptMs: 500, // "You may choose" icon duration
  itiMs: 2000, // Blank inter-trial interval
};
```

Rebuild the client after any config change: `cd client && npm run build`

---

## Troubleshooting

| Problem                | Solution                                                                          |
| ---------------------- | --------------------------------------------------------------------------------- |
| Server won't start     | Check if port 3001 is already in use                                              |
| CSV "EBUSY" error      | Close the CSV file in Excel or VS Code, or use a new participant ID               |
| QR code doesn't scan   | Ensure sync-page is deployed to GitHub Pages and the URL in QRSync.jsx is correct |
| Blank page after build | Run `npm run build` in client/, then restart the server                           |
| Styles missing         | Run `npm install` in client/ to ensure Tailwind is installed                      |
| Express wildcard error | Ensure `server/index.js` uses `/{*splat}` not `*` (Express v5 syntax)             |

---

## License

This software is for academic research use at Louisiana State University. Not licensed for commercial distribution.
