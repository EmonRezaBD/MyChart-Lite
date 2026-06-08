// client/src/pages/Practice.jsx
// Purpose: Attention check. Participant must click Deny to pass.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParticipant } from "../context/ParticipantContext";
import { logEvent } from "../lib/logger";
import TrialRunner from "../components/TrialRunner";

// const PRACTICE_TRIAL = {
//   trialNum: 0,
//   task: "practice",
//   frame: "attention_check",
//   text: "To confirm the system is working, please click Deny on this screen.",
// };

// client/src/pages/Practice.jsx — replace PRACTICE_TRIAL with:

const PRACTICE_TRIAL = {
  trialNum: 0,
  task: "practice",
  frame: "attention_check",
  prefix: "To confirm the system is working,",
  keyword: "please click Deny",
  suffix: "on this screen",
  text: "To confirm the system is working, please click Deny on this screen.",
};

function Practice() {
  const navigate = useNavigate();
  const { participant } = useParticipant();
  const [attempt, setAttempt] = useState(1);
  const [showRetry, setShowRetry] = useState(false);

  const handleComplete = (result) => {
    if (!result) return; // ITI finished

    logEvent(participant.pid, participant.ageGroup, {
      trial_num: 0,
      task: "practice",
      frame: "attention_check",
      event_type: "attention_check",
      choice: result.choice,
      rt_ms: result.rt_ms,
    });

    if (result.choice === "deny") {
      // Passed — move to real trials
      navigate("/trial");
    } else if (attempt >= 2) {
      // Failed twice — flag and continue
      logEvent(participant.pid, participant.ageGroup, {
        event_type: "attention_check_failed",
      });
      navigate("/trial");
    } else {
      // Failed once — retry
      setAttempt(2);
      setShowRetry(true);
    }
  };

  if (showRetry) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md text-center">
          <p className="text-lg font-semibold text-ink">
            Oops — please read the instruction carefully.
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            The message asked you to click{" "}
            <span className="font-bold text-red-500">Deny</span>. Let's try once
            more.
          </p>
          <button
            type="button"
            onClick={() => setShowRetry(false)}
            className="mt-6 rounded-lg bg-brand-500 px-6 py-3 text-white font-medium transition hover:bg-brand-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <TrialRunner
      key={attempt}
      trial={PRACTICE_TRIAL}
      onComplete={handleComplete}
    />
  );
}

export default Practice;
