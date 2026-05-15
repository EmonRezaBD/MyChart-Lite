// client/src/pages/Complete.jsx
// Purpose: End of session. Signals experimenter to take over.

import Logo from "../components/Logo";
import { useParticipant } from "../context/ParticipantContext";

function Complete() {
  const { participant } = useParticipant();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <Logo size={48} />
      <h1 className="mt-6 text-2xl font-bold text-brand-700">Setup Complete</h1>
      <p className="mt-2 text-center text-ink-muted max-w-sm">
        Thank you, {participant.name}. Your MyChart-Lite privacy settings have
        been saved.
      </p>
      <p className="mt-8 text-xs text-ink-muted italic">
        Session {participant.pid} ended at {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}

export default Complete;
