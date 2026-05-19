// client/src/lib/logger.js
// Purpose: Thin wrapper to post trial events to the Express server.

const SERVER_URL = import.meta.env.DEV ? "http://localhost:3001" : "";

export async function logEvent(pid, ageGroup, event) {
  try {
    await fetch(`${SERVER_URL}/trial/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pid, age_group: ageGroup, ...event }),
    });
  } catch (err) {
    console.error("[logger] Failed to log event:", err);
  }
}
