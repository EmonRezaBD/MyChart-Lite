// client/src/lib/logger.js
// Purpose: Thin wrapper around fetch to post trial events to the Express server.
// All components call this instead of fetch directly.

const SERVER_URL = "http://localhost:3001";

/**
 * Log a trial event to the server.
 * Fails silently in the UI — logs error to console only.
 *
 * @param {string} pid - Participant ID
 * @param {object} event - Event data
 */
export async function logEvent(pid, event) {
  try {
    await fetch(`${SERVER_URL}/trial/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pid, ...event }),
    });
  } catch (err) {
    console.error("[logger] Failed to log event:", err);
  }
}
