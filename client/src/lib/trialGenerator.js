// client/src/lib/trialGenerator.js
// Purpose: Build the ordered trial list for a participant.
// Takes participant ID + mapping row, returns 12 shuffled trials.

import { TASKS, TASK_NAMES, LATIN_SQUARE } from "../config/framings";

/**
 * Seeded pseudo-random shuffle.
 * Same seed → same order, so a session is reproducible if re-run.
 * Uses a simple linear-congruential generator (LCG); fine for shuffling.
 */
function seededShuffle(array, seed) {
  const a = [...array];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Convert a string PID into a numeric seed.
 * "P001" → 80 + 48 + 48 + 49 = 225, etc. Deterministic.
 */
function pidToSeed(pid) {
  return [...pid].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

/**
 * Generate the 12-trial list for a participant.
 *
 * @param {string} pid - Participant ID (e.g., "P001")
 * @param {number} mappingRow - Index into LATIN_SQUARE (0–5)
 * @returns {Array<{trialNum, task, frame, text}>}
 */
export function generateTrials(pid, mappingRow) {
  const mapping = LATIN_SQUARE[mappingRow];
  if (!mapping) throw new Error(`Invalid mapping row: ${mappingRow}`);

  // Build the 12 (task, frame) pairs from the mapping row
  const trials = [];
  for (const task of TASK_NAMES) {
    for (const frame of mapping[task]) {
      trials.push({
        task,
        frame,
        text: TASKS[task][frame],
      });
    }
  }

  // Shuffle deterministically, then number them
  const shuffled = seededShuffle(trials, pidToSeed(pid));
  return shuffled.map((t, i) => ({ trialNum: i + 1, ...t }));
}
