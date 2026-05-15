// client/src/pages/Instructions.jsx
// Purpose: Explains the trial structure before the attention check.

import { useNavigate } from "react-router-dom";

function Instructions() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold text-brand-700">Instructions</h1>
      <p className="mt-2 text-ink-muted">Placeholder — Instructions screen</p>
      <button
        type="button"
        onClick={() => navigate("/practice")}
        className="mt-8 rounded-lg bg-brand-500 px-6 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
      >
        Continue →
      </button>
    </div>
  );
}

export default Instructions;
