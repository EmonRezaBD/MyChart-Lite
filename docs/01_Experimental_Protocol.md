# Experimental Protocol: Step-by-Step Phases

**Study:** Uncovering Hidden Cognitive Costs of Deceptive UI Framing
**PI / Student:** Md Rokonuzzaman Reza, LSU
**Design:** 1×3 within-subjects (Neutral / Gain / Loss), 2 age groups (older ≥60, younger 18–60)
**Per-participant trials:** 12 (4 per frame condition)
**Apparatus:** Gazepoint GP3 eye tracker + Gazepoint Analysis (Web Capture mode), lab PC, simulated "HealthHub" web app

---

## Phase 0 — Pre-Session Setup (before participant arrives)

**Goal:** ensure the lab is calibrated and the participant's session record is pre-built so they never enter PII into the app.

1. **Lab environment**
   - Close blinds; remove or cover reflective surfaces in the eye tracker's field of view
   - Set lab lighting to a fixed, consistent level (pupil diameter is sensitive to ambient lux — never change lighting mid-session or between participants)
   - Adjust participant chair to a comfortable height for the desk-mounted GP3 tracker

2. **Software warm-up**
   - Start Gazepoint Control; confirm camera is at 60 Hz or 150 Hz and IPD reading is stable
   - Start the HealthHub web app on the lab PC at `localhost:5173`
   - Start the companion Express logging server at `localhost:3001`
   - Open Gazepoint Analysis; create a new **Web Capture** project pointed at `http://localhost:5173`

3. **Participant record creation**
   - Pre-assign a Participant ID (e.g., `P007`)
   - Assign age group (`older` / `younger`)
   - Assign Latin-square mapping row (cycles through 6 rows: P1 → row 1, P2 → row 2, … P7 → row 1)
   - Enter participant's first name into the app config so the welcome screen reads naturally ("Welcome, Mary")

4. **Materials ready**
   - Paper consent form
   - Paper demographic intake form (name, age, gender, education, vision correction, prior healthcare-app experience)
   - Paper post-questionnaire (perceived realism, suspicion check, debrief acknowledgment)
   - Participant compensation receipt

---

## Phase 1 — Participant Arrival & Consent (~10 minutes)

**Goal:** informed consent, demographic intake on paper (not in app), and seating.

5. **Greeting and consent**
   - Brief verbal introduction: "You'll be using a new healthcare app prototype while we record where you look on the screen."
   - Hand over the consent form, give time to read, answer questions, obtain signature
   - **Important:** the consent form should mention there will be a debriefing at the end — this is standard for studies with mild deception about the true purpose

6. **Paper demographic intake**
   - Participant completes the demographic form on paper
   - Experimenter retains form, links to Participant ID

7. **Seating and posture check**
   - Seat participant at the eye-tracking station
   - Adjust chair height so eyes are centered in the Gazepoint Control face image with depth indicator in the green zone
   - Confirm participant can read text comfortably without leaning forward

---

## Phase 2 — Eye Tracker Calibration (~3 minutes)

**Goal:** valid 5-point calibration on the desktop monitor that will display the HealthHub app.

8. **Run calibration**
   - In Gazepoint Control, click Calibrate (5-point)
   - Watch tracking quality during calibration; if any point fails or drifts, repeat
   - Verify by asking participant to look at corners of the screen — gaze cursor should land within ~1° of where they're looking

9. **Drift check**
   - Quick post-calibration check: instruct participant to look at a specific UI element on screen, confirm gaze marker lands on it
   - If drift > 1°, recalibrate before proceeding

10. **Start recording**
    - Begin recording in Gazepoint Analysis (Web Capture mode)
    - The recording runs continuously through all phases that follow — phase markers come from the app's trial log, not from start/stop in Analysis

---

## Phase 3 — Onboarding Theatre (~2 minutes)

**Goal:** establish the cover story that this is a real healthcare app, and create a sense of personal data stakeholdership without collecting actual PII.

11. **Welcome screen** (app screen 1)
    - Pre-populated greeting: "Welcome back, Mary. Let's finish setting up your HealthHub account."
    - "Continue" button
    - **Pupil baseline window starts here** — participant is reading neutral, non-experimental text, allowing 30+ seconds of pupil acclimation to screen brightness before any framing appears

12. **QR sync screen** (app screen 2)
    - "To keep your devices in sync, please scan this code with your phone."
    - QR code displayed on screen, pointing to a publicly-hosted static page: `https://yourname.github.io/healthhub-sync` (deployed once to GitHub Pages, Netlify, or Cloudflare Pages — free, ~5 minutes setup)
    - Participant scans with their own phone camera using whatever connection they have (cellular data or any Wi-Fi). No need to connect to lab Wi-Fi, eduroam, or any specific network.
    - Phone browser opens the static page, which displays a mobile-styled notification that looks like an SMS:
      > **HealthHub**
      > Device synced ✓
      > Return to your computer to complete setup.
    - **The phone is pure theatre.** Once the scan is done, instruct the participant: "Great, please place your phone face-down off to the side — you won't need it again."
    - **Advancement is manual.** The desktop app shows a "Continue" button below the QR. The experimenter (watching the participant) clicks it once they've seen the phone display the confirmation. This avoids any dependency on phone-to-server networking.

13. **Sync confirmation screen** (app screen 3)
    - "Your phone is synced. We'll now walk you through the privacy settings for your health data."
    - This screen establishes the framing for what follows: the upcoming screens are *privacy settings for the participant's own health data*, not abstract decisions about an imaginary user
    - "Begin Setup" button

---

## Phase 4 — Practice Trial & Attention Check (~1 minute)

**Goal:** validate that the participant understands the trial structure and is engaged.

14. **Practice trial instructions** (app screen 4)
    - "We'll show you 12 privacy settings. For each one, take a moment to read it, then choose Allow or Deny based on what you'd actually prefer."
    - "Let's try one practice round first."

15. **Attention check trial**
    - Same trial structure as real trials (fixation → stim → prompt → response → ITI)
    - The stimulus text is a clear instruction overriding the framing: "To confirm the system is working, please click **Deny** on this screen, regardless of your preference."
    - Allow/Deny buttons appear after the stimulus
    - **Pass:** participant clicks Deny → proceed to main trials
    - **Fail:** soft on-screen reminder, one more attempt
    - **Second fail:** flag in data, proceed anyway (participant excluded in analysis if they fail twice)

---

## Phase 5 — Main Experimental Trials (~4 minutes for 12 trials)

**Goal:** collect 12 trials of pupil, fixation, dwell-time, and choice data per participant.

16. **Trial sequence (each trial ~11.5 seconds)**

    For each of the 12 trials, in randomized order within the participant's assigned Latin-square mapping:

    | Phase | Duration | What participant sees | What is recorded |
    |---|---|---|---|
    | Fixation cross | 1.5–2.5s (jittered) | "+" centered on screen | Pupil baseline for trial |
    | Text stimulus | 5.0s (fixed) | Framing sentence, **no buttons visible** — forced reading window | **Primary pupil window**, fixation count, dwell on keyword AOI |
    | Action prompt | 0.5s | Small icon appears: "You may now choose" | Marks transition from reading to deciding |
    | Decision window | self-paced (typically 1–3s) | Allow / Deny buttons appear | Response time (ms), choice |
    | Inter-trial interval | 2.0s | Blank gray screen | Pupil return-to-baseline |

17. **Trial content**
    - 6 privacy tasks (Location, Health Data, Contacts, Microphone, Camera, Photos)
    - Each task appears twice, each time with a different frame
    - Across 12 trials per participant: 4 Neutral + 4 Gain + 4 Loss
    - Same task never appears with same frame; repetitions of the same task spaced ≥4 trials apart

18. **Event logging**
    - Every event timestamped server-side in milliseconds (system clock)
    - CSV columns: `participant_id, trial_num, task, frame, event_type, timestamp_ms, choice, rt_ms`

19. **Brief mid-session break (optional)**
    - After trial 6, an optional "rest for a moment if you'd like, then click Continue" screen
    - Pupil fatigue accumulates over the session; a 10–20s break reduces fatigue confounds

---

## Phase 6 — Completion & Debrief (~10 minutes)

**Goal:** post-questionnaire data, suspicion check, and full ethical disclosure of the study's real purpose.

20. **Completion screen** (app screen 5)
    - "Setup complete. Thank you for your responses."
    - Experimenter stops the Gazepoint Analysis recording

21. **Paper post-questionnaire**
    - **Realism check:** "On a scale of 1–7, how realistic did the app feel?"
    - **Suspicion funnel** (open-ended, in this order):
      - "What did you think this study was about?"
      - "Did anything about the screens feel unusual to you?"
      - "Did you notice anything about the wording of the privacy settings?"
    - **Self-reported strategy:** "How did you decide whether to allow or deny each setting?"
    - Standard subjective load measure (e.g., NASA-TLX, optional)

22. **Full debrief**
    - Reveal: the app was a research prototype, not a real healthcare service
    - Explain: the privacy settings were worded three different ways across participants to study how wording affects decision-making
    - Confirm: no actual personal data was collected by the app, no SMS was actually sent
    - Confirm: the participant's data will be stored under their Participant ID, with no PII linked
    - Answer any questions

23. **Compensation**
    - Pay participant per IRB-approved compensation structure
    - Sign receipt

---

## Phase 7 — Post-Session Data Handling

**Goal:** organize and back up data immediately so nothing is lost.

24. **Files generated per participant**
    - `P007_trials.csv` — app trial log (events + choices + RTs)
    - `P007_gaze.csv` — Gazepoint Analysis export (60/150 Hz gaze samples)
    - `P007_aoi.csv` — AOI statistics export from Analysis (time to first fixation, dwell, revisits per AOI)
    - Paper demographic form (scanned to `P007_demo.pdf`)
    - Paper post-questionnaire (scanned to `P007_post.pdf`)

25. **Data integrity check**
    - Confirm trial CSV has 12 trials + 1 attention check + expected event counts
    - Confirm gaze CSV duration matches recording duration in Analysis
    - Spot-check pupil data isn't flatlined (indicates tracking failure)

26. **Backup**
    - Copy all files to lab network drive
    - Copy to encrypted external backup
    - Update master participant log spreadsheet (PID, age group, mapping row, date, completion status, exclusion flag)

27. **Reset for next participant**
    - Restart Gazepoint Analysis with a fresh project file
    - Restart the HealthHub app (fresh session state)
    - Wipe any browser cache that might interfere

---

## Exclusion Criteria (defined in advance)

A participant is excluded from analysis if any of the following occur:
- Failed attention check twice
- Eye tracker lost calibration mid-session (>2 trials with >50% gaze sample loss)
- Self-reported in post-questionnaire that they recognized the study was about framing wording (suspicion)
- Vision uncorrected and unable to read stimuli comfortably
- Technical failure (app crash, recording interruption)

Target: 30 analyzable participants (15 per age group). Plan to recruit ~36 to allow for exclusions.

---

## Timing Summary (per participant)

| Phase | Duration |
|---|---|
| Arrival, consent, demographics | 10 min |
| Calibration | 3 min |
| Onboarding theatre | 2 min |
| Practice + attention check | 1 min |
| Main trials (12) | 4 min |
| Post-questionnaire + debrief | 10 min |
| **Total** | **~30 minutes** |
