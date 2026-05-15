// client/src/pages/QRSync.jsx
// Purpose: Displays QR code participant scans with their phone. Manual Continue button.

import { useNavigate } from "react-router-dom";

function QRSync() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold text-brand-700">Scan QR Code</h1>
      <p className="mt-2 text-ink-muted">Placeholder — QR sync screen</p>
      <button
        type="button"
        onClick={() => navigate("/synced")}
        className="mt-8 rounded-lg bg-brand-500 px-6 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
      >
        Continue →
      </button>
    </div>
  );
}

export default QRSync;
