// client/src/pages/Setup.jsx
// Purpose: Experimenter enters participant ID, name, age group, mapping row
// before handing the screen to the participant. Not seen by participants.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParticipant } from "../context/ParticipantContext";

function Setup() {
  const navigate = useNavigate();
  const { setParticipant } = useParticipant();

  const [pid, setPid] = useState("");
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState("younger");
  const [mappingRow, setMappingRow] = useState(0);

  const handleStart = (e) => {
    e.preventDefault();
    if (!pid.trim() || !name.trim()) return;
    setParticipant({
      pid: pid.trim(),
      name: name.trim(),
      ageGroup,
      mappingRow: Number(mappingRow),
      startedAt: Date.now(),
    });
    navigate("/welcome");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleStart}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-md"
      >
        <h1 className="text-2xl font-bold text-brand-700">Session Setup</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Experimenter use only. Hand off to participant after starting.
        </p>

        <label className="mt-6 block">
          <span className="text-sm font-medium">Participant ID</span>
          <input
            type="text"
            value={pid}
            onChange={(e) => setPid(e.target.value)}
            placeholder="P001"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
            required
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium">First Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Mary"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
            required
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium">Age Group</span>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          >
            <option value="younger">Younger (18–59)</option>
            <option value="older">Older (60+)</option>
          </select>
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium">Latin-Square Mapping Row</span>
          <select
            value={mappingRow}
            onChange={(e) => setMappingRow(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-brand-500 focus:outline-none"
          >
            {[0, 1, 2, 3, 4, 5].map((row) => (
              <option key={row} value={row}>
                Row {row}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="mt-8 w-full rounded-lg bg-brand-500 px-6 py-3 text-white font-medium shadow-sm transition hover:bg-brand-600"
        >
          Start Session
        </button>
      </form>
    </div>
  );
}

export default Setup;
