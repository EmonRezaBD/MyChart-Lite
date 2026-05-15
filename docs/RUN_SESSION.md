# MyChart-Lite — Session Run Sheet

Print this page and keep it at the experiment station.

---

## Before Participant Arrives

- [ ] Close window blinds, remove reflective surfaces
- [ ] Set lab lighting to standard level (same every session)
- [ ] Turn on lab PC, open Gazepoint Control, verify camera feed
- [ ] Double-click `MyChart-Lite.bat` — confirm "Serving production client build"
- [ ] Open `http://localhost:3001` in Chrome (fullscreen: F11)
- [ ] Prepare paper forms: consent, demographics, post-questionnaire

## When Participant Arrives

- [ ] Greet, explain study briefly, obtain signed consent
- [ ] Collect demographics on paper form
- [ ] Seat participant, adjust chair height
- [ ] Run 5-point calibration in Gazepoint Control
- [ ] Verify calibration: ask participant to look at screen corners

## Start Session

- [ ] On the `/setup` screen, enter:
  - PID: **\_\_** (e.g., P001)
  - Name: **\_\_** (participant's first name)
  - Age Group: younger / older
  - Mapping Row: **\_\_** (cycle 0-5, see assignment sheet)
- [ ] Click "Start Session"
- [ ] Start recording in Gazepoint Analysis (Web Capture mode)
- [ ] Hand control to participant: "Follow the on-screen instructions"

## During Session (~10 minutes)

- [ ] Participant sees Welcome screen
- [ ] QR scan: watch them scan, click Continue once phone shows confirmation
- [ ] Remind: "Place your phone face-down, you won't need it again"
- [ ] Participant reads instructions, does attention check
- [ ] 12 trials run automatically — do not interrupt
- [ ] Session ends at "Setup Complete" screen

## After Session

- [ ] Stop Gazepoint Analysis recording
- [ ] Administer paper post-questionnaire
- [ ] Conduct debrief (read from debrief script)
- [ ] Pay participant, collect receipt
- [ ] Verify data: check `data/P___trials.csv` exists and has ~65 rows
- [ ] Close browser, restart for next participant

## If Something Goes Wrong

| Problem                                 | Fix                                                      |
| --------------------------------------- | -------------------------------------------------------- |
| Server won't start                      | Check if port 3001 is busy: close other terminals        |
| CSV locked error                        | Close any program that has the CSV open                  |
| Calibration fails                       | Adjust chair, check glasses glare, recalibrate           |
| QR won't scan                           | Manually type the URL on participant's phone             |
| App freezes mid-trial                   | Refresh browser, re-enter setup, note which trial failed |
| Participant fails attention check twice | Continue anyway — flagged in data for exclusion          |

## Latin-Square Assignment Sheet

| PID  | Mapping Row     |
| ---- | --------------- |
| P001 | 0               |
| P002 | 1               |
| P003 | 2               |
| P004 | 3               |
| P005 | 4               |
| P006 | 5               |
| P007 | 0               |
| P008 | 1               |
| ...  | (cycle repeats) |
