// client/src/App.jsx
// Purpose: Root component. Routes + guards.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useParticipant } from "./context/ParticipantContext";

import Setup from "./pages/Setup";
import Welcome from "./pages/Welcome";
import QRSync from "./pages/QRSync";
import Synced from "./pages/Synced";
import Instructions from "./pages/Instructions";
import Practice from "./pages/Practice";
import Trial from "./pages/Trial";
import Complete from "./pages/Complete";

/**
 * Guard: routes other than /setup require a participant in context.
 * If no participant is set, redirect to /setup.
 */
function RequireParticipant({ children }) {
  const { participant } = useParticipant();
  if (!participant) return <Navigate to="/setup" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/setup" replace />} />
        <Route path="/setup" element={<Setup />} />
        <Route
          path="/welcome"
          element={
            <RequireParticipant>
              <Welcome />
            </RequireParticipant>
          }
        />
        <Route
          path="/qr"
          element={
            <RequireParticipant>
              <QRSync />
            </RequireParticipant>
          }
        />
        <Route
          path="/synced"
          element={
            <RequireParticipant>
              <Synced />
            </RequireParticipant>
          }
        />
        <Route
          path="/instructions"
          element={
            <RequireParticipant>
              <Instructions />
            </RequireParticipant>
          }
        />
        <Route
          path="/practice"
          element={
            <RequireParticipant>
              <Practice />
            </RequireParticipant>
          }
        />
        <Route
          path="/trial"
          element={
            <RequireParticipant>
              <Trial />
            </RequireParticipant>
          }
        />
        <Route
          path="/complete"
          element={
            <RequireParticipant>
              <Complete />
            </RequireParticipant>
          }
        />
        <Route path="*" element={<Navigate to="/setup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
