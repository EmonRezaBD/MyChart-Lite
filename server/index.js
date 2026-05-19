// server/index.js
// Purpose: Logs trial events to CSV + serves the production client build.

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const app = express();
app.use(cors());
app.use(express.json());

const CSV_HEADER =
  "timestamp_ms,trial_num,task,frame,event_type,choice,rt_ms\n";

// Trial event logging
app.post("/trial/log", (req, res) => {
  const { pid, trial_num, task, frame, event_type, choice, rt_ms } = req.body;

  if (!pid || !event_type) {
    return res.status(400).json({ error: "pid and event_type are required" });
  }

  // const file = path.join(DATA_DIR, `${pid}_trials.csv`);
  const ageGroup = req.body.age_group || "unknown";
  const file = path.join(DATA_DIR, `${pid}_${ageGroup}_trials.csv`);
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

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Serve production client (only if built)
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  // Send all non-API routes to index.html (React Router handles them)
  app.get("/{*splat}", (_req, res) => {
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`MyChart-Lite running on http://localhost:${PORT}`);
  console.log(`Data directory: ${DATA_DIR}`);
  if (fs.existsSync(CLIENT_DIST)) {
    console.log("Serving production client build");
  } else {
    console.log('No client build found — run "npm run build" in client/ first');
  }
});
