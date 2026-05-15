// client/src/main.jsx
// Purpose: App entry point. Wraps everything in the participant context provider.

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ParticipantProvider } from "./context/ParticipantContext";

createRoot(document.getElementById("root")).render(
  <ParticipantProvider>
    <App />
  </ParticipantProvider>,
);
