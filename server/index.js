// server/index.js
// Purpose: Minimal logging server. Receives trial events from the React app
// and appends them to a per-participant CSV file in /data.

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");

// Create /data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const app = express();
app.use(cors());
app.use(express.json());

const CSV_HEADER =
  "timestamp_ms,trial_num,task,frame,event_type,choice,rt_ms\n";

/**
 * POST /trial/log
 * Body: { pid, trial_num, task, frame, event_type, choice?, rt_ms? }
 * Appends one row to /data/{pid}_trials.csv
 */
app.post("/trial/log", (req, res) => {
  const { pid, trial_num, task, frame, event_type, choice, rt_ms } = req.body;

  if (!pid || !event_type) {
    return res.status(400).json({ error: "pid and event_type are required" });
  }

  const file = path.join(DATA_DIR, `${pid}_trials.csv`);

  // Write header only if file is new
  if (!fs.existsSync(file)) fs.writeFileSync(file, CSV_HEADER);

  const row =
    [
      Date.now(),
      trial_num ?? "",
      task ?? "",
      frame ?? "",
      event_type,
      choice ?? "",
      rt_ms ?? "",
    ].join(",") + "\n";

  fs.appendFileSync(file, row);
  res.json({ ok: true });
});

// Health check — useful to confirm server is running
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`MyChart-Lite logger running on http://localhost:${PORT}`);
});
