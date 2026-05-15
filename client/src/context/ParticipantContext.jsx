// client/src/context/ParticipantContext.jsx
// Purpose: Global state for the active participant. Set once at session start.

import { createContext, useContext, useState } from "react";

const ParticipantContext = createContext(null);

export function ParticipantProvider({ children }) {
  const [participant, setParticipant] = useState(null);

  return (
    <ParticipantContext.Provider value={{ participant, setParticipant }}>
      {children}
    </ParticipantContext.Provider>
  );
}

export function useParticipant() {
  const ctx = useContext(ParticipantContext);
  if (!ctx)
    throw new Error("useParticipant must be used inside ParticipantProvider");
  return ctx;
}
