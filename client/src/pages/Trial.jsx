// client/src/pages/Trial.jsx
// Purpose: Manages the 12-trial loop. Passes one trial at a time to TrialRunner.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParticipant } from "../context/ParticipantContext";
import { generateTrials } from "../lib/trialGenerator";
import TrialRunner from "../components/TrialRunner";

function Trial() {
  const navigate = useNavigate();
  const { participant } = useParticipant();

  const [trials] = useState(() =>
    generateTrials(participant.pid, participant.mappingRow),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);

  const handleTrialComplete = (result) => {
    // result is null after the ITI blank — means move on
    if (result) {
      setResults((prev) => [
        ...prev,
        {
          trialNum: trials[currentIndex].trialNum,
          task: trials[currentIndex].task,
          frame: trials[currentIndex].frame,
          choice: result.choice,
          rt_ms: result.rt_ms,
          timestamp: Date.now(),
        },
      ]);
    } else {
      // ITI finished — advance to next trial or complete
      const next = currentIndex + 1;
      if (next >= trials.length) {
        navigate("/complete", { state: { results } });
      } else {
        setCurrentIndex(next);
      }
    }
  };

  return (
    <TrialRunner
      key={currentIndex} // forces full remount on each new trial
      trial={trials[currentIndex]}
      onComplete={handleTrialComplete}
    />
  );
}

export default Trial;
