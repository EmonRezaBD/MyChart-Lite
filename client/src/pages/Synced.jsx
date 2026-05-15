// client/src/pages/Synced.jsx
// Purpose: Confirms sync, transitions participant mindset toward privacy settings.

import { useNavigate } from "react-router-dom";

function Synced() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>

      <h1 className="mt-6 text-2xl font-bold text-brand-700">
        Phone Synced Successfully
      </h1>
      <p className="mt-2 text-center text-ink-muted max-w-sm">
        Your device is now linked to MyChart-Lite. Next, we'll configure your
        privacy settings for your health data.
      </p>

      <button
        type="button"
        onClick={() => navigate("/instructions")}
        className="mt-10 rounded-lg bg-brand-500 px-8 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
      >
        Begin Setup
      </button>
    </div>
  );
}

export default Synced;
