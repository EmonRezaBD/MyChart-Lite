// client/src/pages/Welcome.jsx
// Purpose: First screen participant sees. Logs session_start.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParticipant } from "../context/ParticipantContext";
import { logEvent } from "../lib/logger";
import Logo from "../components/Logo";

function Welcome() {
  const navigate = useNavigate();
  const { participant } = useParticipant();

  useEffect(() => {
    logEvent(participant.pid, participant.ageGroup, {
      event_type: "session_start",
    });
  }, [participant.pid, participant.ageGroup]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <Logo size={64} />
      <h1 className="mt-6 text-3xl font-bold text-brand-700">
        Welcome back, {participant.name}
      </h1>
      <p className="mt-2 text-center text-lg text-ink-muted">
        Let's finish setting up your MyChart-Lite account.
      </p>
      <button
        type="button"
        onClick={() => navigate("/qr")}
        className="mt-10 rounded-lg bg-brand-500 px-8 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
      >
        Continue
      </button>
    </div>
  );
}

export default Welcome;
