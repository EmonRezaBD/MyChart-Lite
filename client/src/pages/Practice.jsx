// client/src/pages/Trial.jsx
// Purpose: Main experimental trial loop. Currently shows debug list of trials.

import { useNavigate } from "react-router-dom";
import { useParticipant } from "../context/ParticipantContext";
import { generateTrials } from "../lib/trialGenerator";

function Trial() {
  const navigate = useNavigate();
  const { participant } = useParticipant();
  const trials = generateTrials(participant.pid, participant.mappingRow);

  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-10">
      <h1 className="text-2xl font-bold text-brand-700">
        Trial list for {participant.pid} (row {participant.mappingRow})
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Debug view — real trial runner comes in next step.
      </p>

      <ol className="mt-6 w-full max-w-2xl space-y-2">
        {trials.map((t) => (
          <li
            key={t.trialNum}
            className="rounded-md border border-gray-200 bg-white p-3 text-sm"
          >
            <span className="font-mono text-ink-muted">#{t.trialNum}</span>{" "}
            <span className="font-medium text-brand-700">{t.task}</span>{" "}
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
              {t.frame}
            </span>
            <div className="mt-1 text-ink">{t.text}</div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        // onClick={() => navigate("/complete")}
        onClick={() => navigate("/trial")}
        className="mt-8 rounded-lg bg-brand-500 px-6 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
      >
        Skip to Complete →
      </button>
    </div>
  );
}

export default Trial;
