import Logo from "./components/Logo";

/**
 * Root component for MyChart-Lite.
 * Currently displays a brand-test screen to verify Tailwind + theming.
 * Will be replaced by routing in a later step.
 */
function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6">
      <Logo size={64} />
      <h1 className="mt-6 text-4xl font-bold text-brand-700">MyChart-Lite</h1>
      <p className="mt-2 text-lg text-ink-muted">
        Your personal healthcare companion
      </p>
      <button
        type="button"
        className="mt-10 rounded-lg bg-brand-500 px-6 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600 active:bg-brand-700"
      >
        Get Started
      </button>
    </div>
  );
}

export default App;
