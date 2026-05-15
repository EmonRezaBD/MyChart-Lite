// client/src/App.jsx
// Purpose: Root component. Defines the participant's flow as routes.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import QRSync from "./pages/QRSync";
import Synced from "./pages/Synced";
import Instructions from "./pages/Instructions";
import Practice from "./pages/Practice";
import Trial from "./pages/Trial";
import Complete from "./pages/Complete";

/**
 * Participant flow:
 *   /welcome → /qr → /synced → /instructions → /practice → /trial → /complete
 *
 * Root path "/" redirects to /welcome.
 * Any unknown path also falls back to /welcome (defensive default).
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/qr" element={<QRSync />} />
        <Route path="/synced" element={<Synced />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/trial" element={<Trial />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
