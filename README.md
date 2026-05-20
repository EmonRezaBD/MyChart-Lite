# MyChart-Lite

A simulated healthcare web application built for an eye-tracking experiment studying the cognitive cost of deceptive UI framing in privacy permission requests.

**Study:** Uncovering Hidden Cognitive Costs of Deceptive UI Framing
**Researcher:** Md Rokonuzzaman Reza, Division of CSE, Louisiana State University
**Design:** 1×3 within-subjects (Neutral / Gain / Loss framing) × 2 age groups (Younger Adults 18–59, Older Adults 60+). Aphasia Patients supported as an optional third group for future work.

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
- **Microsoft Edge** or **Google Chrome** (for kiosk mode during sessions)
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

### 4. Run the experiment

Double-click `MyChart-Lite.bat` from the project root. This will:

- Start the Express server on port 3001
- Launch Microsoft Edge (or Chrome as fallback) in **kiosk mode** at `http://localhost:3001`

Kiosk mode hides the URL bar, tabs, and bookmarks so participants cannot see that the app is running on `localhost`. This preserves the cover story of a real healthcare app.

**To exit kiosk mode at the end of a session, press `Alt + F4`.**

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
│   │   ├── pages/          Route-level screens (Setup, Welcome, QR, etc.)
│   │   ├── App.jsx         Root component with routing
│   │   ├── index.css       Tailwind config + brand tokens
│   │   └── main.jsx        Entry point
│   └── dist/               Production build (generated)
├── server/
│   └── index.js            Express server (logging + static file serving)
├── data/                   CSV output (one file per participant, gitignored)
├── docs/                   Experiment protocol, run sheet, guides
├── sync-page/              Fake SMS page (deployed separately to GitHub Pages)
├── MyChart-Lite.bat        One-click startup for Windows (launches in kiosk mode)
└── README.md
```

---

## Experimenter Guide: Selecting Participant Group

The Setup screen requires the experimenter to assign each participant a **Participant ID** with a 2-letter prefix that identifies their group. The app automatically selects the matching Age Group when you type the prefix, but you can manually override it if needed.

| Prefix | Group            | Example IDs           | Age Range                |
| ------ | ---------------- | --------------------- | ------------------------ |
| `OA`   | Older Adults     | OA01, OA02, ..., OA20 | 60 years and above       |
| `YA`   | Younger Adults   | YA01, YA02, ..., YA20 | 18 to 59 years           |
| `AP`   | Aphasia Patients | AP01, AP02, ...       | Reserved for future work |

### Assignment Rules

1. **Sequential numbering within each group.** The first older adult is `OA01`, the second is `OA02`, etc. Likewise `YA01`, `YA02` for younger adults. Don't skip numbers.

2. **Latin-Square Mapping Row** cycles 0 → 5 → 0 → 5 within each group. For example:
   - OA01 → Row 0, OA02 → Row 1, ..., OA06 → Row 5, OA07 → Row 0 (cycle repeats)
   - YA01 → Row 0, YA02 → Row 1, ..., YA06 → Row 5, YA07 → Row 0 (cycle repeats)
   - Each group cycles independently — this ensures both age groups get balanced exposure to all 6 Latin-square mappings.

3. **Validation.** The app rejects any PID that doesn't match the format. Valid IDs must:
   - Start with `OA`, `YA`, or `AP`
   - Be followed by 2–4 digits
   - Examples that work: `OA01`, `YA15`, `AP07`, `OA200`
   - Examples that are rejected: `P001`, `Mary01`, `OA1`, `XX99`

### Master Tracking Sheet (recommended)

Keep a separate spreadsheet (NOT inside this repo) linking real names to PIDs for consent-form record-keeping:

| PID  | Real Name  | Date       | Mapping Row | Notes                  |
| ---- | ---------- | ---------- | ----------- | ---------------------- |
| OA01 | Jane Smith | 2026-05-21 | 0           | Completed              |
| YA01 | John Doe   | 2026-05-21 | 0           | Failed attention check |
| OA02 | Mary Jones | 2026-05-22 | 1           | Completed              |

This sheet lives outside the data files so participant data stays de-identified.

---

## Data Output

Each session generates a CSV file named `data/{PID}_{group}_trials.csv` (e.g., `OA01_older_trials.csv`, `YA01_younger_trials.csv`).

### Columns

| Column         | Description                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `timestamp_ms` | Unix timestamp in milliseconds                                                                                    |
| `trial_num`    | Trial number (1–12, or 0 for attention check)                                                                     |
| `task`         | Privacy task (location, health_data, contacts, microphone, camera, photos)                                        |
| `frame`        | Framing condition (neutral, gain, loss)                                                                           |
| `event_type`   | Phase marker (session_start, fixation_onset, stimulus_onset, prompt_onset, response_onset, response, session_end) |
| `choice`       | Participant's decision (allow / deny) — only on response rows                                                     |
| `rt_ms`        | Reaction time in ms from buttons appearing to click — only on response rows                                       |

**Note:** Data is written incrementally as each event happens. If a participant quits mid-session, all events up to that point are preserved. Sessions that completed normally will have a `session_end` row at the bottom.

### Aligning with Eye-Tracking Data

Export gaze data from Gazepoint Analysis as CSV. Both files share system-clock timestamps. Merge in Python:

```python
import pandas as pd

trials = pd.read_csv('data/OA01_older_trials.csv')
gaze = pd.read_csv('OA01_gaze.csv')

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

Edit `client/src/config/framings.js` to modify stimulus sentences, add tasks, or adjust the Latin-square mappings. All three frames within a task are matched on word count to control reading time.

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

| Problem                     | Solution                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------ |
| Server won't start          | Check if port 3001 is already in use                                                 |
| CSV "EBUSY" error           | Close the CSV file in Excel or VS Code, or use a new participant ID                  |
| Edge not found / wrong path | Update the `EDGE_PATH` variable in `MyChart-Lite.bat` to match your install location |
| QR code doesn't scan        | Ensure sync-page is deployed to GitHub Pages and the URL in `QRSync.jsx` is correct  |
| Blank page after build      | Run `npm run build` in `client/`, then restart the server                            |
| Styles missing              | Run `npm install` in `client/` to ensure Tailwind is installed                       |
| Express wildcard error      | Ensure `server/index.js` uses `/{*splat}` not `*` (Express v5 syntax)                |
| Can't exit kiosk mode       | Press `Alt + F4` to close the browser                                                |
| PID input rejects valid IDs | Make sure the prefix is uppercase (`OA`, `YA`, `AP`) and 2–4 digits follow           |

---

## License

This software is for academic research use at Louisiana State University. Not licensed for commercial distribution.
