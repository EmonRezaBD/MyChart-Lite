# Gazepoint GP3 HD 150Hz UX Bundle — Complete Operational Guide

**For:** Cognitive Costs of Deceptive UI Framing study (older adults, n=15, within-subjects, 18 trials × 3 framings)
**Hardware:** Gazepoint GP3 HD (150 Hz binocular, 0.5–1° accuracy, 35×22 cm head box)
**Software:** Gazepoint Control + Gazepoint Analysis UX Edition
**Author of guide:** prepared for Md Rokonuzzaman Reza, LSU CSE

---

## 1. What this device gives you (and what it does NOT)

The GP3 HD outputs three families of signals that map directly onto your construct of "cognitive cost of framing":

| Construct in your study | GP3 HD signal | API field(s) |
|---|---|---|
| Cognitive load (effort) | **Pupil diameter (PD)** | `LPD`, `RPD` (pixels), `LPUPILD`, `RPUPILD` (meters) |
| Visual attention allocation | **Fixations** (filtered POG) | `FPOGX`, `FPOGY`, `FPOGS` (start), `FPOGD` (duration), `FPOGID`, `FPOGV` |
| Reading / scanning effort | **Saccades** (derived from raw POG between fixations) | `BPOGX`, `BPOGY` (best POG, raw) |
| Sample timing | High-precision time | `TIME` (seconds), `TIME_TICK` (CPU ticks), `CNT` (sample counter) |
| Trial markers | User-defined sync labels | `USER` field (set via `<SET ID="USER_DATA" VALUE="..."/>`) |

**Important honesty about the GP3 HD's limits before you commit to it for CHI 2027:**
- 150 Hz is fine for fixations and pupil size, but it is on the **low end** for fine-grained saccade kinematics (peak velocity, main-sequence). The PyGaze developer (Edwin Dalmaijer, an established eye-tracking methodologist) explicitly notes that the GP3/GP3 HD temporal resolution is "too low for measuring the properties of saccades, for example. On the other hand, fixation analyses … and measuring pupil size should be possible at sampling rates of 60 or 150 Hz."
- The official accuracy spec is 0.5°–1°. For an iPhone-sized stimulus at 65 cm, 1° ≈ 1.13 cm on screen. That is borderline for AOI work on small mobile mock-ups. Plan AOIs that are at least 2°×2° (≈2.3 cm × 2.3 cm at 65 cm) or larger.
- The GP3 HD is screen-based. Your protocol shows phone-style mock-ups; you will display these as **images on a desktop monitor**, not on a real phone. The bundle does not track real handheld devices unless you buy the separate GP3-Mobile.

If saccade kinematics are central to a future RQ, document this limit in your method section and consider a higher-frequency tracker (Tobii Pro Spectrum at 600 Hz, EyeLink 1000+ at 1000 Hz) for a follow-up. For pupil + fixation + dwell-time analyses, the GP3 HD is sufficient and is the lowest-cost research-grade option.

---

## 2. Pre-study checklist (one-time setup)

### 2.1 PC requirements
- Intel Core i7 or faster, 8 GB RAM (16 GB strongly recommended for UX Edition with webcam + voice).
- **Windows 10 or 11** (Mac/Linux not supported).
- A **USB 3.0 port directly on the motherboard** for the data cable. Do not use a USB 3.0 hub for data unless that hub is itself plugged into a USB 3.0 motherboard port. The 150 Hz mode silently degrades to 60 Hz on USB 2.0.
- Verify USB 3.0 detection in Gazepoint Control's bottom-right status bar after launch — it explicitly displays "USB2" or "USB3."

### 2.2 Physical environment
- **Lighting:** halogen or fluorescent, kept constant across all participants and across all 18 trials. **No sunlight, no incandescent bulbs.** Sunlight contains heavy infrared that washes out the GP3's IR illuminators.
- **Critical for pupillometry:** screen brightness, ambient light, and stimulus luminance must be **identical for Neutral, Gain, and Loss frames**. Pupil dilation is dominated by luminance. If your Loss frame uses red text on white and your Gain frame uses green text on white, any "cognitive" PD difference is contaminated by color/luminance. Match foreground/background luminance using a luminance meter or, at minimum, equalize via design (same background, same font color, same text length — your nine-word balancing is good and you should additionally verify isoluminance).
- Single monitor positioned directly in front of the participant. Screen at 65 cm from eyes.
- Quiet room. No conversation during trials.

### 2.3 Software install order (do this once on the lab PC)
1. Download Gazepoint Control + Analysis UX from `gazept.com/downloads/` (password emailed at purchase).
2. Install **before** plugging in the eye tracker — this installs the camera driver. If you reverse the order, Windows will label the camera "Unknown Device" and you must point Device Manager at `C:\Program Files (x86)\Gazepoint\Gazepoint\driver64\Win8` to fix it.
3. After install, plug in **both** USB cables (data → USB 3.0; power → any powered USB).
4. Verify dim red glow visible behind the front black plastic — that's the IR illuminator. No glow = no power on the second cable.
5. Launch Gazepoint Control. Confirm: 150 Hz frame rate in bottom status bar, USB3 connectivity indicator, eye tracker serial number visible.
6. Register Gazepoint Analysis UX with the hardware key (Register button → copy Hardware ID → online form → Gazepoint emails Software Key → Validate).

### 2.4 Mounting
You have three options shipped with the bundle. For older-adult comfort and consistency, **use the VESA monitor mount** rather than the tripod:
- VESA mount keeps the tracker in a fixed, repeatable position relative to the screen across all 15 participants — this is essential for pupil-size comparability.
- Tripod is portable but drifts; tiny shifts change the camera's view of the eyes and bias pupil-pixel measurements between participants.

VESA assembly (per the official starter guide):
1. Each VESA arm is stamped "Top-Left 100mm" and "Top-Right 100mm." Orient them so the stamps face up correctly.
2. Attach the eye tracker to the two short arms with 2 thumbscrews.
3. Attach the long VESA rods to the arms with 4 of the supplied 6-32 screws.
4. Hold the tracker against the bottom edge of the monitor and screw the rods into the monitor's VESA holes with 4 thumbscrews.
5. Aim: tracker should sit **~30–40 cm below eye level**, **~65 cm from the participant's eyes**, and angled **upward** toward the face.

---

## 3. Per-participant session protocol

Plan **45–60 minutes per participant** (older adults need extra breaks). The actual recording is only ~3.5 minutes for 18 trials, but consent, calibration, instructions, NASA-TLX prompts, and debriefing dominate the session.

### 3.1 Pre-arrival
- Confirm IRB consent forms ready.
- Have the deception-debrief script ready (you stated participants will *believe* they are using a real healthcare app — the debrief is critical and required by IRB).
- Confirm no eye drops, no glitter makeup, no heavy mascara — these scatter IR. Reading glasses are fine; bifocals/progressives are problematic and should be flagged in screening.
- Pre-load all 18 stimulus images into the Analysis project (see §4).

### 3.2 Seating (3–5 min)
1. Seat participant in a fixed-height chair (not wheels, not adjustable mid-trial — they may shift mid-session and recalibrate involuntarily).
2. Adjust chair so eyes are at the recommended 65 cm distance and ~30–40 cm above the tracker.
3. Open Gazepoint Control. The face-image window shows a **Close↔Far indicator bar**. The participant's head should sit in the middle of that bar. Green boxes should appear around both eyes.
4. If only one eye locks, ask the participant to adjust posture. Glasses-wearers: tilt the tracker slightly steeper to push IR reflections off the lens surface and below the pupils.

### 3.3 Calibration (2–3 min, possibly repeat)
1. In Gazepoint Control click **Calibrate**. Default 5-point calibration is faster and adequate for AOI work; press `9` instead for 9-point if you want slightly better corner accuracy on a large monitor.
2. Instruct: *"Please look directly at each dot as it appears. Don't anticipate where it will move next. Don't talk during calibration."* (Anticipation is the #1 calibration failure cause per the official troubleshooting guide.)
3. After calibration, the post-calibration screen shows a **green dot wherever the participant looks**. Ask them to look at the four corners and the center of the screen. The green dot should land within ~1° (≈1 cm at 65 cm) of where they're looking. If error is visibly larger, press `C` and recalibrate.
4. Older-adult specific: if the system fails to lock pupils, open **Settings → Enable Auto Gain**. The gain sweep cycles through camera sensitivities to handle dim pupil responses common in older eyes (the manual explicitly flags this as the elderly-subject fix).

### 3.4 IPD calibration (optional but recommended for your study)
This step is what converts pupil size from arbitrary "pixels" into **millimeters** — essential for comparing across participants and reporting publishable PD values.
1. Print the 11 mm × 11 mm IPD marker from the manual. **Measure the printed marker with calipers** — printers rarely print to exact size.
2. Tape the marker to the participant's forehead, centered between the eyebrows.
3. Run calibration; during calibration press `m` to confirm the marker is detected (it will outline in red on the camera image).
4. Complete calibration. The IPD value displayed in Control's bottom status bar is now anchored to a real-world 11 mm reference, and `LPUPILD`/`RPUPILD` (in meters) become metric-calibrated rather than estimated.
5. Remove marker.

If you skip IPD calibration, you can still analyze pupil **changes** within-subject (which is what your within-subjects design needs) using `LPD`/`RPD` in pixels with `LPS`/`RPS` scale-factor correction. But for cross-participant absolute-mm reporting, IPD calibration is worth the 60 seconds.

### 3.5 Recording the 18 trials
The cleanest workflow is to drive trial timing from a **separate stimulus-presentation script** (Python with PsychoPy, or PsychoPy directly), and use the Gazepoint API's `USER_DATA` field to write trial markers into the data stream.

**Why not just use Gazepoint Analysis to display the images?**
- Analysis can play images sequentially at fixed durations (`Add → Image → Set duration`), which is fine for simple viewing studies.
- But your protocol has a fixation cross, 5 s forced-read window, action prompt, self-paced decision, mini NASA-TLX, ITI — Analysis cannot do that branching/conditional logic.
- The right architecture for a CHI-quality study is: **PsychoPy presents stimuli + sends triggers to Gazepoint via TCP/IP `USER_DATA`** so every sample in the CSV has a label like `T03_GAIN_FIXATION`, `T03_GAIN_READ`, `T03_GAIN_PROMPT`, `T03_GAIN_DECIDE`.

A minimal trigger-sending Python snippet (the API uses raw TCP/IP on port 4242, no DLLs needed):

```python
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("127.0.0.1", 4242))

def trigger(label):
    msg = f'<SET ID="USER_DATA" VALUE="{label}" />\r\n'
    s.send(msg.encode())

# Example use during your trial:
trigger("P05_T03_GAIN_FIX_ONSET")     # at fixation cross onset
trigger("P05_T03_GAIN_READ_ONSET")    # at stimulus text onset (start your 5 s window)
trigger("P05_T03_GAIN_PROMPT_ONSET")  # at action-icon onset
trigger("P05_T03_GAIN_DECISION")      # at button click
trigger("P05_T03_GAIN_ITI")           # at ITI start
```

Every sample (every 6.67 ms at 150 Hz) will carry the most recent `USER` value, so you can later slice the CSV by trigger label without doing any timing reconstruction.

**Recording controls (Analysis UX side):**
- In Gazepoint Analysis UX: New Project → choose a *unique* folder per participant (e.g. `P05_Reza_2026-05-12`).
- Media type: **Screen Capture** (lets PsychoPy own the display; Analysis just records gaze + screen video on top).
- Press **Ctrl + Alt + R** to begin recording, **Ctrl + Alt + S** to stop. Bind these to your PsychoPy script's start/end if possible.

### 3.6 NASA-TLX after each prompt
Mini NASA-TLX (1 question on Mental Demand, 1 on Frustration, 0–20 scale) takes 10–15 s and goes between the decision and the ITI. Do NOT show the TLX scale on the same screen Gazepoint is recording from — pause recording, show the TLX, resume — because TLX reading itself produces pupil dilation that would contaminate the next trial's baseline.

### 3.7 End of session
1. Stop recording. Save project.
2. Run debrief script. Record any participant comments verbatim.
3. **Export data immediately** before closing the project (Analysis → Analyze Data → Export icon). This produces:
   - `XXXX-user.csv` — every raw sample (~31,000 rows for a 3.5 min recording at 150 Hz)
   - `XXXX-user-fix.csv` — only the fixation-filtered rows
   - `CurrentAOIStatisticsX.csv` — AOI summary statistics if you've defined AOIs
   - `CurrentVideoX.avi` — replay video with gaze overlay
4. Back up the entire participant folder (`*.prj`, `\user\`, `\src\`, `\result\`) to two locations (lab server + encrypted external drive) before clearing for the next participant.

---

## 4. Stimulus design choices that will make or break your analysis

These decisions go beyond the manual but they are what separate a publishable CHI paper from a rejected one.

### 4.1 Match luminance across framings
Your three framings (Neutral / Gain / Loss) must be **photometrically equivalent**. If they differ in:
- average screen luminance
- text color
- background contrast
- icon presence/absence
- total visible pixel count

…then any PD difference you measure is the **pupillary light response**, not cognitive load. The light response is ~10× stronger than the cognitive response. To control:
- Same gray background (e.g., RGB 230,230,230) for all 54 stimuli.
- Same font, same font size, same text color (black) for all 54 stimuli.
- Same nine-word length (you're already doing this — good).
- Same screen position for the text block.
- Same icon (or no icon) at the same location.

### 4.2 Pre-stimulus baseline
For every trial, capture a **200 ms pre-stimulus pupil baseline** during the fixation cross. Subtract this baseline from the during-stimulus PD trace (subtractive baseline correction, per Mathôt et al. 2018, which is the field standard). This factors out spontaneous pupil drift and individual baseline differences.

Subtractive (recommended) vs. divisive baseline correction:
- Subtractive: `PD_corrected(t) = PD(t) − mean(PD during baseline window)`
- Divisive: `PD_corrected(t) = PD(t) / mean(PD during baseline window)` — distorted heavily by tiny baselines from blinks. **Avoid.**

Mathôt et al.'s five evidence-based recommendations for pupil preprocessing, which you should follow:
1. Mark missing/invalid samples first; assume some distortion will remain.
2. Use **subtractive** correction.
3. Visually compare corrected vs. uncorrected traces to spot artifacts.
4. Be skeptical of effects emerging faster than ~220 ms — pupil response latency is physiologically bounded.
5. Drop trials where baseline pupil size is implausibly small (a blink corrupted the baseline window).

### 4.3 Decision window vs. read window
Your slide 16 timeline correctly separates the **forced 5.0 s read window** (no buttons visible) from the **self-paced decision window**. **Do your primary cognitive-load analysis on the 5.0 s read window only**, because:
- The read window is identical-duration across all 54 conditions, so PD comparisons are not confounded by trial-length differences.
- The decision window varies in length per participant per trial, which contaminates any time-locked analysis.
- Motor planning (reaching for "Allow"/"Deny") produces its own pupil dilation unrelated to framing comprehension.

Report decision-window PD as a secondary/exploratory analysis only.

---

## 5. Defining Areas of Interest (AOIs) and which metrics to compute

### 5.1 AOI strategy for your stimuli
Each of your 54 mock-up screens has a similar layout. Define **three AOIs per stimulus**, drawn once and reused via Analysis UX's dynamic AOI tool:

| AOI | What it captures | Why it matters for your RQ |
|---|---|---|
| **Text body** (the framed sentence) | Reading effort, comprehension | Direct test of how framing modulates cognitive load |
| **Action area** (Allow/Deny buttons) | Attention shift to decision | When buttons appear, do Loss-frame readers fixate them faster? |
| **Whole screen minus text/buttons** | Off-task gaze | Disengagement / banner-blindness proxy |

### 5.2 Metrics the field expects (and how the GP3 HD gives them to you)

| Metric | Definition | Computed from | Reported in |
|---|---|---|---|
| **Time to First Fixation (TTFF)** | Latency from stimulus onset to first fixation inside AOI | Compare `FPOGS` of first fixation within AOI to your trigger timestamp | seconds (ms) |
| **Average Fixation Duration (AFD)** | Mean of `FPOGD` for all fixations inside AOI | `FPOGD` filtered by `FPOGV=1` and POG inside AOI rectangle | seconds (ms) |
| **Fixation Count** | Number of distinct `FPOGID` values inside AOI | Unique-count of `FPOGID` | integer |
| **Total Dwell Time** | Sum of `FPOGD` for all fixations inside AOI | Sum of `FPOGD` | seconds |
| **Revisits** | Number of separate AOI entries (after at least one fixation outside) | Run-length encoding of inside/outside AOI states | integer |
| **Mean Pupil Diameter (in window)** | Average `LPD`+`RPD` (or 3D `LPUPILD`+`RPUPILD`) during the 5 s read window | Average of `(LPD+RPD)/2` where `LPV=1` and `RPV=1`, after blink removal | pixels (or mm) |
| **Peak Pupil Dilation** | Max `(LPD+RPD)/2 − baseline` during read window | Max of baseline-corrected trace | pixels (or mm) |
| **Pupil Dilation Latency** | Time from stimulus onset to peak dilation | Time index of max | seconds |

Analysis UX computes TTFF, AFD, dwell, revisits as a built-in AOI report (`CurrentAOIStatisticsX.csv`). Pupil metrics you compute yourself in Python/R from `XXXX-user.csv`.

### 5.3 Suggested primary outcome variables (DVs) for RQ1.1

Map directly onto your slide 9 RQ:

| Construct | Primary DV | Where it comes from |
|---|---|---|
| Cognitive load (overall) | Mean baseline-corrected PD over the 5 s read window | API `LPD`/`RPD` |
| Sustained effort | Area under the baseline-corrected PD curve (AUC) | Computed in post-processing |
| Visual attention to framing text | Total dwell time on Text AOI | Analysis UX AOI report |
| Re-reading / re-checking | Revisit count on Text AOI | Analysis UX AOI report |
| Comprehension speed | Time to first exit of Text AOI | Computed from raw POG |

You can replace the EEG-derived "cognitive load" measures from your slides (Frontal Theta, Alpha, LPP) one-for-one with **PD-derived cognitive load**, which is well-validated for your construct. Pupil dilation has been shown to track inhibitory/cognitive effort in older adults specifically — older participants do dilate, just less than younger adults, so within-subject framing comparisons remain valid.

---

## 6. Pupil data preprocessing pipeline (Python)

A skeleton you can adapt. Run this on each participant's `XXXX-user.csv` after every session.

```python
import pandas as pd
import numpy as np
from scipy.signal import savgol_filter
from scipy.interpolate import interp1d

# 1. Load
df = pd.read_csv("P05-1-user.csv")

# 2. Combine eyes; mark invalid samples
df["pupil_px"] = np.where(
    (df["LPV"] == 1) & (df["RPV"] == 1),
    (df["LPD"] + df["RPD"]) / 2,
    np.where(df["LPV"] == 1, df["LPD"],
    np.where(df["RPV"] == 1, df["RPD"], np.nan))
)

# 3. Identify blinks: stretches where pupil is NaN, plus 100 ms padding on each side
#    (the actual blink corrupts ~100 ms before/after the missing-data span)
PAD_MS = 100
SAMPLE_RATE = 150
PAD_SAMPLES = int(PAD_MS / 1000 * SAMPLE_RATE)
mask = df["pupil_px"].isna()
mask = mask.rolling(window=2*PAD_SAMPLES+1, center=True, min_periods=1).max().astype(bool)
df.loc[mask, "pupil_px"] = np.nan

# 4. Linear interpolation across short gaps; drop trials with gaps > 1 s
MAX_GAP_MS = 1000
gap_samples = int(MAX_GAP_MS / 1000 * SAMPLE_RATE)
# (mark trials with any continuous NaN run > gap_samples for exclusion)

df["pupil_px"] = df["pupil_px"].interpolate(method="linear", limit=gap_samples)

# 5. Smooth with Savitzky-Golay (window 50 ms, polynomial order 3)
window = int(0.05 * SAMPLE_RATE)
if window % 2 == 0: window += 1
df["pupil_smooth"] = savgol_filter(df["pupil_px"].fillna(method="ffill"), window, 3)

# 6. Slice by trigger labels, baseline-correct each trial
trials = []
for trial_id, sub in df.groupby("USER"):
    if "FIX_ONSET" in trial_id:  # this is a baseline window
        baseline = sub["pupil_smooth"].mean()
    if "READ_ONSET" in trial_id:
        sub["pupil_bc"] = sub["pupil_smooth"] - baseline  # subtractive correction
        sub["trial_id"] = trial_id
        trials.append(sub)
trials_df = pd.concat(trials)

# 7. Per-trial summary
summary = trials_df.groupby("trial_id").agg(
    mean_pd=("pupil_bc", "mean"),
    peak_pd=("pupil_bc", "max"),
    auc_pd=("pupil_bc", lambda x: np.trapz(x, dx=1/SAMPLE_RATE))
)
```

This is a starting template. Two sanity checks at the end:
- **Histogram of baseline pupil sizes** — clusters of unrealistically small values → blinks corrupted that trial's baseline → drop those trials (Mathôt's recommendation #5).
- **Spaghetti plot of all trials' PD traces** — downward spikes that survived interpolation indicate failed blink reconstruction; tune `PAD_MS` and `MAX_GAP_MS` until <5% of trials show such spikes.

---

## 7. Statistical model for RQ1.1

Your design is 1×3 within-subjects (Neutral / Gain / Loss) × 18 stimulus topics × 15 participants. The right model is a **linear mixed-effects model (LMM)**:

```r
# In R, using lme4:
library(lme4)
library(lmerTest)

m <- lmer(mean_pd_bc ~ framing + (1 + framing | participant) + (1 | stimulus_topic),
          data = trials)
summary(m)
emmeans::emmeans(m, pairwise ~ framing, adjust = "tukey")
```

Three things to report regardless of significance:
- The omnibus framing effect (F-test or χ² from `anova(m)`).
- All three pairwise contrasts (Neutral vs Gain, Neutral vs Loss, Gain vs Loss) with Tukey-adjusted p-values.
- Effect sizes (Cohen's d for each pairwise contrast, or partial η² for the omnibus).

For the per-stimulus AOI metrics (TTFF, dwell, revisits), the same LMM structure applies, swapping the DV.

---

## 8. Troubleshooting reference

Cross-referenced from the official manual + field experience with older-adult populations.

| Symptom | Likely cause | Fix |
|---|---|---|
| GP3 HD running at 60 Hz instead of 150 Hz | USB 2.0 connection | Move data cable to a true USB 3.0 port on motherboard; verify "USB3" in Control's bottom-right indicator |
| Camera shows split image on first launch | Known Firefly camera bug | Restart Gazepoint Control |
| No dim red glow on tracker front | Power cable not delivering power | Check second USB cable; try a different powered USB port; confirm Control is running |
| Camera labelled "Unknown Device" | Eye tracker plugged in before software install | Device Manager → right-click camera → Update driver → point to `C:\Program Files (x86)\Gazepoint\Gazepoint\driver64\Win8` |
| Camera shows eyes but tracker doesn't lock pupils | Sunlight, dirty/scratched glasses, hard contact lenses, glitter makeup | Move to fluorescent-lit room, clean glasses, exclude participants in hard contacts during screening |
| Calibration fails for older participant | Senile miosis (smaller, dimmer pupils); slower saccades; anticipating dot movement | Settings → Enable Auto Gain; increase calibration delay (`+` key in Control); coach: "look at the dot, don't try to predict where it goes next, don't talk" |
| Glasses reflections obscure pupils | IR bouncing back off lens surface | Tilt tracker to steeper upward angle; participant moves head higher and closer to monitor |
| Dropped samples / frame rate < 150 Hz | CPU bottleneck | Close all other applications; ensure no antivirus scan running; check Task Manager for CPU saturation |
| Calibration green dot drifts during session | Participant's head shifted significantly | Recalibrate between trial blocks (e.g., after every 6 trials); use a chinrest if drift persists |
| Pupil data looks noisy / spiky | Inadequate blink interpolation | Increase `PAD_MS` to 150 ms in preprocessing; check participant wasn't squinting (dim lighting too low) |
| One eye consistently fails to track | Strong asymmetry, or one eye occluded by glasses frame | Settings → Monocular Tracking → assign visible eye |

---

## 9. Older-adult specific procedural recommendations

Beyond the standard manual, three things matter for your population:

**(a) Senile miosis affects baseline pupil size, not within-subject changes.** Older adults have smaller pupils overall (~0.4–0.5 mm decrease per decade after youth), and the reactive range of dilation is compressed. This is a **known threat to between-subject comparisons** but a **non-issue for within-subject framing comparisons**, which is exactly your design. Report mean baseline PD per participant in your demographic table to make the reduced reactive range visible to reviewers.

**(b) Plan more breaks than you think.** Older adults fatigue faster on screen-based tasks. Build in a **mandatory 60 s break every 6 trials**, with a recalibration check at each break. Total session length: aim for ≤45 min recording-active time.

**(c) Vision screening at recruitment.** Exclude or flag:
- Diagnosed cataracts (clouded lens scatters IR; pupil tracking fails).
- Recent eye surgery (<3 months).
- Macular degeneration affecting central vision (their fixation will be eccentric, breaking AOI assumptions).
- Bifocal/progressive lenses (the participant will tilt their head to read each screen, moving outside the head box).

A single-page Snellen card at recruitment plus three screening questions ("Do you wear bifocals? Have you had cataract surgery? Any recent eye surgery?") catches >90% of these.

---

## 10. Quick-reference card (print and keep in the lab)

**Daily startup (5 min):**
1. Power on PC → launch Gazepoint Control → confirm 150 Hz + USB3 + serial number.
2. Verify red IR glow on tracker.
3. Quick self-calibration to confirm system is working.

**Per participant (45–60 min):**
1. Consent + screening (10 min).
2. Seat, adjust chair, head in middle of Close↔Far bar (3 min).
3. Calibrate (5-point); verify green dot accuracy (3 min).
4. IPD calibration if needed (1 min).
5. Practice trial (1 min).
6. 18 trials × ~12 s + breaks every 6 trials = ~12 min.
7. NASA-TLX integrated between trials.
8. Debrief + payment (10 min).
9. Export data, back up folder, before next participant (5 min).

**Files exported per participant:**
- `XXXX-user.csv` (raw samples — your primary file)
- `XXXX-user-fix.csv` (fixations only — convenience file)
- `CurrentAOIStatisticsX.csv` (AOI report — convenience file)
- `CurrentVideoX.avi` (replay — for spot-checking, optional retention)

---

## 11. Sources

The technical specifications, commands, and procedures in this guide are drawn from:
- **Gazepoint Control User Manual**, rev. August 2021 (definitive hardware setup, calibration, and troubleshooting reference).
- **Gazepoint Analysis User Manual**, rev. February 2014 (project workflow, AOI tools, export formats).
- **Open Gaze API v2.0 specification**, November 2013 (every data field, every command, XML format).
- **Gazepoint VESA/tripod mounting starter guide** (BTH SERLab GitHub).
- Mathôt, S., Fabius, J., Van Heusden, E., & Van der Stigchel, S. (2018). *Safe and sensible preprocessing and baseline correction of pupil-size data.* Behavior Research Methods.
- Mathôt et al. (2023). *Methods in cognitive pupillometry: Design, preprocessing, and statistical analysis.* Behavior Research Methods.
- Lenzoni et al. (2023). *The Pupil Knows: Pupil Dilation Indexes and Their Inhibitory Ability in Normal Aging.* Journal of Clinical Medicine — for the older-adult-specific PD considerations.
- Geller, J. et al. (2020). *GazeR: A Package for Processing Gaze Position and Pupil Size Data.* Behavior Research Methods (R-based pipeline equivalent to the Python skeleton above).
