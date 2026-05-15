// client/src/components/TrialRunner.jsx
// Purpose: Runs one trial through all phases with precise timing.
// Props: trial {trialNum, task, frame, text}, onComplete(result)

// Add this import at the top of TrialRunner.jsx
import { logEvent } from "../lib/logger";
import { useParticipant } from "../context/ParticipantContext";

import { useEffect, useState, useRef } from "react";
import { TIMING } from "../config/framings";

const PHASES = {
  FIXATION: "fixation",
  STIMULUS: "stimulus",
  PROMPT: "prompt",
  RESPONSE: "response",
  ITI: "iti",
};

// Task display labels shown in the permission dialog header
const TASK_LABELS = {
  location: "Location Access",
  health_data: "Health Records",
  contacts: "Contacts Access",
  microphone: "Microphone Access",
  camera: "Camera Access",
  photos: "Photo Access",
};

// SVG icons per task (simple, inline, no external dependency)
const TASK_ICONS = {
  location: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-10 w-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  ),
  health_data: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-10 w-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h.75"
      />
    </svg>
  ),
  contacts: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-10 w-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  ),
  microphone: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-10 w-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
      />
    </svg>
  ),
  camera: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-10 w-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
      />
    </svg>
  ),
  photos: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-10 w-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  ),
};

function TrialRunner({ trial, onComplete }) {
  const { participant } = useParticipant();
  const [phase, setPhase] = useState(PHASES.FIXATION);
  const responseStartRef = useRef(null);
  const stimulusOnsetRef = useRef(null);

  // Advance through timed phases automatically
  useEffect(() => {
    let timer;

    if (phase === PHASES.FIXATION) {
      logEvent(participant.pid, {
        trial_num: trial.trialNum,
        task: trial.task,
        frame: trial.frame,
        event_type: "fixation_onset",
      });
      const jitter =
        TIMING.fixationMinMs +
        Math.random() * (TIMING.fixationMaxMs - TIMING.fixationMinMs);
      timer = setTimeout(() => {
        stimulusOnsetRef.current = performance.now();
        setPhase(PHASES.STIMULUS);
      }, jitter);
    }

    if (phase === PHASES.STIMULUS) {
      logEvent(participant.pid, {
        trial_num: trial.trialNum,
        task: trial.task,
        frame: trial.frame,
        event_type: "stimulus_onset",
      });
      timer = setTimeout(() => setPhase(PHASES.PROMPT), TIMING.stimulusMs);
    }

    if (phase === PHASES.PROMPT) {
      logEvent(participant.pid, {
        trial_num: trial.trialNum,
        task: trial.task,
        frame: trial.frame,
        event_type: "prompt_onset",
      });
      timer = setTimeout(() => {
        responseStartRef.current = performance.now();
        setPhase(PHASES.RESPONSE);
      }, TIMING.promptMs);
    }

    if (phase === PHASES.RESPONSE) {
      logEvent(participant.pid, {
        trial_num: trial.trialNum,
        task: trial.task,
        frame: trial.frame,
        event_type: "response_onset",
      });
    }

    if (phase === PHASES.ITI) {
      timer = setTimeout(() => onComplete(null), TIMING.itiMs);
    }

    return () => clearTimeout(timer);
  }, [phase, onComplete, participant.pid, trial]);

  // Participant clicks Allow or Deny
  const handleChoice = (choice) => {
    const rt = Math.round(performance.now() - responseStartRef.current);
    logEvent(participant.pid, {
      trial_num: trial.trialNum,
      task: trial.task,
      frame: trial.frame,
      event_type: "response",
      choice,
      rt_ms: rt,
    });
    setPhase(PHASES.ITI);
    onComplete({ choice, rt_ms: rt, stimulusOnset: stimulusOnsetRef.current });
  };

  // ── FIXATION ──────────────────────────────────────────────────────────
  if (phase === PHASES.FIXATION) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <span className="select-none text-6xl font-light text-ink-muted">
          +
        </span>
      </div>
    );
  }

  // ── ITI ───────────────────────────────────────────────────────────────
  if (phase === PHASES.ITI) {
    return <div className="min-h-screen bg-surface" />;
  }

  // ── STIMULUS / PROMPT / RESPONSE ──────────────────────────────────────
  // All three share the same dialog card — only the footer changes.
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      {/* Phone-frame wrapper */}
      <div className="w-full max-w-sm">
        {/* Permission dialog card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* App bar */}
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
              {TASK_ICONS[trial.task]}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                MyChart-Lite
              </p>
              <p className="text-sm font-semibold text-ink">
                {TASK_LABELS[trial.task]}
              </p>
            </div>
          </div>

          {/* Framing text — the experimental stimulus */}
          <div className="px-5 py-6">
            <p className="text-center text-base leading-relaxed text-ink">
              {trial.text}
            </p>
          </div>

          {/* Footer: hidden during stimulus, icon during prompt, buttons during response */}
          <div className="min-h-[72px] border-t border-gray-100">
            {phase === PHASES.STIMULUS && (
              // Invisible placeholder — keeps card height stable
              <div className="h-[72px]" />
            )}

            {phase === PHASES.PROMPT && (
              <div className="flex h-[72px] items-center justify-center">
                <span className="animate-pulse text-2xl">👆</span>
              </div>
            )}

            {phase === PHASES.RESPONSE && (
              <div className="grid grid-cols-2 divide-x divide-gray-100">
                <button
                  type="button"
                  onClick={() => handleChoice("deny")}
                  className="py-4 text-sm font-semibold text-red-500 transition hover:bg-red-50 active:bg-red-100"
                >
                  Deny
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice("allow")}
                  className="py-4 text-sm font-semibold text-brand-500 transition hover:bg-brand-50 active:bg-brand-100"
                >
                  Allow
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trial counter — small, unobtrusive */}
        <p className="mt-4 text-center text-xs text-ink-muted">
          Setting {trial.trialNum} of 12
        </p>
      </div>
    </div>
  );
}

export default TrialRunner;
