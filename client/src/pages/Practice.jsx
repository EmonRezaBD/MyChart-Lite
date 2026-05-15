// client/src/pages/Practice.jsx
// Purpose: Attention check trial. Validates participant is engaged before main trials.

import { useNavigate } from "react-router-dom";

function Practice() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold text-brand-700">
        Practice / Attention Check
      </h1>
      <p className="mt-2 text-ink-muted">Placeholder — Practice trial</p>
      <button
        type="button"
        onClick={() => navigate("/trial")}
        className="mt-8 rounded-lg bg-brand-500 px-6 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
      >
        Continue →
      </button>
    </div>
  );
}

export default Practice;
