// client/src/pages/QRSync.jsx
// Purpose: Shows QR code for phone sync theatre. Manual Continue button.

import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

// Replace with your actual GitHub Pages URL after deploying the sync page
const SYNC_URL = "https://emonrezabd.github.io/mychart-lite-sync";

function QRSync() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold text-brand-700">Sync Your Phone</h1>
      <p className="mt-2 text-center text-ink-muted">
        Scan this code with your phone camera to link your device.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
        <QRCodeSVG
          value={SYNC_URL}
          size={200}
          level="M"
          bgColor="transparent"
          fgColor="#0f172a"
        />
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        After scanning, place your phone face-down on the table.
      </p>

      <button
        type="button"
        onClick={() => navigate("/synced")}
        className="mt-8 rounded-lg bg-brand-500 px-8 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
      >
        Continue
      </button>
    </div>
  );
}

export default QRSync;
