// client/src/pages/Instructions.jsx
// Purpose: Explains the trial structure. Leads into attention check.

import { useNavigate } from "react-router-dom";

function Instructions() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-brand-700">How This Works</h1>

        <div className="mt-6 space-y-4 text-ink">
          <p>
            You'll see{" "}
            <span className="font-semibold">12 privacy settings</span> for your
            MyChart-Lite account, one at a time.
          </p>
          <p>
            For each setting, take a moment to{" "}
            <span className="font-semibold">
              read the description carefully
            </span>
            , then choose <span className="font-semibold">Allow</span> or{" "}
            <span className="font-semibold">Deny</span> based on what you'd
            actually prefer.
          </p>
          {/* <p className="text-ink-muted text-sm"> */}
          <p className="text-ink-muted text-base">
            A small "+" will appear before each setting to help you focus.
            Buttons will appear after a short reading period.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/practice")}
          className="mt-10 w-full rounded-lg bg-brand-500 px-8 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
        >
          Try a Practice Round
        </button>
      </div>
    </div>
  );
}

export default Instructions;
