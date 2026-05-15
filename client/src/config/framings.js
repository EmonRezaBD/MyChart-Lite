// client/src/config/framings.js
// Purpose: Source of truth for all stimulus text, Latin-square mappings, and timing.

/**
 * 6 privacy tasks × 3 frames = 18 stimulus strings.
 * Source: Experimental Manipulation (By Claude Opus 4.7), LSU slide.
 * Each sentence kept concise to control reading complexity for eye tracking.
 */
export const TASKS = {
  location: {
    neutral: "Allow location access so the app records your location.",
    gain: "Allow location access to speed help during medical emergencies.",
    loss: "Block location access and delay help during medical emergencies.",
  },
  health_data: {
    neutral: "Allow records access so the app stores your records.",
    gain: "Allow records access to improve treatment accuracy during care.",
    loss: "Block records access and reduce treatment accuracy during care.",
  },
  contacts: {
    neutral: "Allow contacts access so the app reads your contacts.",
    gain: "Allow contacts access to share test results during care.",
    loss: "Block contacts access and withhold test results during care.",
  },
  microphone: {
    neutral: "Allow microphone access so the app records your voice.",
    gain: "Allow microphone access to enable voice help during emergencies.",
    loss: "Block microphone access and disable voice help during emergencies.",
  },
  camera: {
    neutral: "Allow camera access so the app uses your camera.",
    gain: "Allow camera access to enable doctor video visits anytime.",
    loss: "Block camera access and prevent doctor video visits anytime.",
  },
  photos: {
    neutral: "Allow photo access so the app opens your photos.",
    gain: "Allow photo access to show symptoms to your doctor.",
    loss: "Block photo access and hide symptoms from your doctor.",
  },
};

export const TASK_NAMES = Object.keys(TASKS);
export const FRAMES = ["neutral", "gain", "loss"];

/**
 * 6 Latin-square rows.
 * Each row assigns 2 different frames to each task → 12 trials per participant.
 * Across all 6 rows every (task, frame) pair appears exactly twice.
 */
export const LATIN_SQUARE = [
  // Row 0
  {
    location: ["neutral", "gain"],
    health_data: ["gain", "loss"],
    contacts: ["loss", "neutral"],
    microphone: ["neutral", "gain"],
    camera: ["gain", "loss"],
    photos: ["loss", "neutral"],
  },
  // Row 1
  {
    location: ["gain", "loss"],
    health_data: ["loss", "neutral"],
    contacts: ["neutral", "gain"],
    microphone: ["gain", "loss"],
    camera: ["loss", "neutral"],
    photos: ["neutral", "gain"],
  },
  // Row 2
  {
    location: ["loss", "neutral"],
    health_data: ["neutral", "gain"],
    contacts: ["gain", "loss"],
    microphone: ["loss", "neutral"],
    camera: ["neutral", "gain"],
    photos: ["gain", "loss"],
  },
  // Row 3
  {
    location: ["neutral", "loss"],
    health_data: ["gain", "neutral"],
    contacts: ["loss", "gain"],
    microphone: ["neutral", "loss"],
    camera: ["gain", "neutral"],
    photos: ["loss", "gain"],
  },
  // Row 4
  {
    location: ["loss", "gain"],
    health_data: ["neutral", "loss"],
    contacts: ["gain", "neutral"],
    microphone: ["loss", "gain"],
    camera: ["neutral", "loss"],
    photos: ["gain", "neutral"],
  },
  // Row 5
  {
    location: ["gain", "neutral"],
    health_data: ["loss", "gain"],
    contacts: ["neutral", "loss"],
    microphone: ["gain", "neutral"],
    camera: ["loss", "gain"],
    photos: ["neutral", "loss"],
  },
];

/**
 * Trial timing in milliseconds.
 * Edit here to tune the entire experiment from one place.
 */
export const TIMING = {
  fixationMinMs: 1500,
  fixationMaxMs: 2500,
  stimulusMs: 5000,
  promptMs: 500,
  itiMs: 2000,
};
