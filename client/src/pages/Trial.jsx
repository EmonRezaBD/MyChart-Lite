// client/src/pages/Trial.jsx
// Purpose: Main experimental trial loop. Runs 12 trials per participant.

import { useNavigate } from "react-router-dom";

function Trial() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold text-brand-700">Trial</h1>
      <p className="mt-2 text-ink-muted">Placeholder — Main trial loop</p>
      <button
        type="button"
        onClick={() => navigate("/complete")}
        className="mt-8 rounded-lg bg-brand-500 px-6 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
      >
        Continue →
      </button>
    </div>
  );
}

export default Trial;
