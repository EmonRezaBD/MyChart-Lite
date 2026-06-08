// // client/src/config/framings.js
// // Purpose: Source of truth for stimulus text, Latin-square mappings, and timing.

// /**
//  * 6 privacy tasks × 3 frames = 18 stimulus strings.
//  * All three frames within a task are matched on word count to control
//  * reading time. Word counts may vary across tasks (this is fine —
//  * comparisons happen within-task, not between tasks).
//  */
// export const TASKS = {
//   location: {
//     // 10 words each
//     neutral: "Allow location access so the app records your current location.",
//     gain: "Allow location access to speed up help during medical emergencies.",
//     loss: "Allow location access to avoid delays during medical emergencies today.",
//   },
//   health_data: {
//     // 9 words each
//     neutral: "Allow records access so the app stores your records.",
//     gain: "Allow records access to improve treatment accuracy during care.",
//     loss: "Allow records access to avoid treatment errors during care.",
//   },
//   contacts: {
//     // 9 words each
//     neutral: "Allow contacts access so the app reads your contacts.",
//     gain: "Allow contacts access to share test results with doctors.",
//     loss: "Allow contacts access to avoid missing results during care.",
//   },
//   microphone: {
//     // 9 words each
//     neutral: "Allow microphone access so the app records your voice.",
//     gain: "Allow microphone access to enable voice help during emergencies.",
//     loss: "Allow microphone access to avoid voice failures during emergencies.",
//   },
//   camera: {
//     // 9 words each
//     neutral: "Allow camera access so the app uses your camera.",
//     gain: "Allow camera access to enable doctor video visits anytime.",
//     loss: "Allow camera access to avoid missed doctor video visits.",
//   },
//   photos: {
//     // 10 words each
//     neutral: "Allow photo access so the app opens your saved photos.",
//     gain: "Allow photo access to share symptoms with your medical team.",
//     loss: "Allow photo access to avoid hiding symptoms from your doctor.",
//   },
// };

// export const TASK_NAMES = Object.keys(TASKS);
// export const FRAMES = ["neutral", "gain", "loss"];

// /**
//  * 6 Latin-square rows.
//  * Each row assigns 2 different frames to each task → 12 trials per participant.
//  * Across all 6 rows every (task, frame) pair appears exactly twice.
//  */
// export const LATIN_SQUARE = [
//   // Row 0
//   {
//     location: ["neutral", "gain"],
//     health_data: ["gain", "loss"],
//     contacts: ["loss", "neutral"],
//     microphone: ["neutral", "gain"],
//     camera: ["gain", "loss"],
//     photos: ["loss", "neutral"],
//   },
//   // Row 1
//   {
//     location: ["gain", "loss"],
//     health_data: ["loss", "neutral"],
//     contacts: ["neutral", "gain"],
//     microphone: ["gain", "loss"],
//     camera: ["loss", "neutral"],
//     photos: ["neutral", "gain"],
//   },
//   // Row 2
//   {
//     location: ["loss", "neutral"],
//     health_data: ["neutral", "gain"],
//     contacts: ["gain", "loss"],
//     microphone: ["loss", "neutral"],
//     camera: ["neutral", "gain"],
//     photos: ["gain", "loss"],
//   },
//   // Row 3
//   {
//     location: ["neutral", "loss"],
//     health_data: ["gain", "neutral"],
//     contacts: ["loss", "gain"],
//     microphone: ["neutral", "loss"],
//     camera: ["gain", "neutral"],
//     photos: ["loss", "gain"],
//   },
//   // Row 4
//   {
//     location: ["loss", "gain"],
//     health_data: ["neutral", "loss"],
//     contacts: ["gain", "neutral"],
//     microphone: ["loss", "gain"],
//     camera: ["neutral", "loss"],
//     photos: ["gain", "neutral"],
//   },
//   // Row 5
//   {
//     location: ["gain", "neutral"],
//     health_data: ["loss", "gain"],
//     contacts: ["neutral", "loss"],
//     microphone: ["gain", "neutral"],
//     camera: ["loss", "gain"],
//     photos: ["neutral", "loss"],
//   },
// ];

// /**
//  * Trial timing in milliseconds.
//  * Edit here to tune the entire experiment from one place.
//  */
// export const TIMING = {
//   fixationMinMs: 1500,
//   fixationMaxMs: 2500,
//   stimulusMs: 5000,
//   promptMs: 500,
//   itiMs: 2000,
// };

// client/src/config/framings.js
// Purpose: Source of truth for stimulus text, Latin-square mappings, and timing.
// Each frame is split into prefix/keyword/suffix so the keyword renders
// at a fixed screen position for clean AOI analysis.

export const TASKS = {
  location: {
    neutral: {
      prefix: "Allow location access so the app records",
      keyword: "your current location",
      suffix: "",
    },
    gain: {
      prefix: "Allow location access to",
      keyword: "speed up help",
      suffix: "during medical emergencies",
    },
    loss: {
      prefix: "Allow location access to",
      keyword: "avoid delays",
      suffix: "during medical emergencies today",
    },
  },
  health_data: {
    neutral: {
      prefix: "Allow records access so the app",
      keyword: "stores your medical records",
      suffix: "",
    },
    gain: {
      prefix: "Allow records access to",
      keyword: "improve treatment accuracy",
      suffix: "during care",
    },
    loss: {
      prefix: "Allow records access to",
      keyword: "avoid treatment errors",
      suffix: "during care",
    },
  },
  contacts: {
    neutral: {
      prefix: "Allow contacts access so the app",
      keyword: "reads your contacts",
      suffix: "",
    },
    gain: {
      prefix: "Allow contacts access to",
      keyword: "share test results",
      suffix: "with doctors",
    },
    loss: {
      prefix: "Allow contacts access to",
      keyword: "avoid missing results",
      suffix: "during care",
    },
  },
  microphone: {
    neutral: {
      prefix: "Allow microphone access so the app",
      keyword: "records your voice",
      suffix: "",
    },
    gain: {
      prefix: "Allow microphone access to",
      keyword: "enable voice help",
      suffix: "during emergencies",
    },
    loss: {
      prefix: "Allow microphone access to",
      keyword: "avoid voice failures",
      suffix: "during emergencies",
    },
  },
  camera: {
    neutral: {
      prefix: "Allow camera access so the app",
      keyword: "uses your camera",
      suffix: "",
    },
    gain: {
      prefix: "Allow camera access to",
      keyword: "enable video visits",
      suffix: "anytime",
    },
    loss: {
      prefix: "Allow camera access to",
      keyword: "avoid missed visits",
      suffix: "",
    },
  },
  photos: {
    neutral: {
      prefix: "Allow photo access so the app",
      keyword: "opens your saved photos",
      suffix: "",
    },
    gain: {
      prefix: "Allow photo access to",
      keyword: "share symptoms",
      suffix: "with your medical team",
    },
    loss: {
      prefix: "Allow photo access to",
      keyword: "avoid hiding symptoms",
      suffix: "from your doctor",
    },
  },
};

export const TASK_NAMES = Object.keys(TASKS);
export const FRAMES = ["neutral", "gain", "loss"];

// (keep LATIN_SQUARE and TIMING exactly as they are)

export const LATIN_SQUARE = [
  { location: ['neutral', 'gain'],  health_data: ['gain', 'loss'],    contacts: ['loss', 'neutral'],
    microphone: ['neutral', 'gain'], camera: ['gain', 'loss'],         photos: ['loss', 'neutral'] },
  { location: ['gain', 'loss'],     health_data: ['loss', 'neutral'],  contacts: ['neutral', 'gain'],
    microphone: ['gain', 'loss'],    camera: ['loss', 'neutral'],       photos: ['neutral', 'gain'] },
  { location: ['loss', 'neutral'],  health_data: ['neutral', 'gain'],  contacts: ['gain', 'loss'],
    microphone: ['loss', 'neutral'], camera: ['neutral', 'gain'],       photos: ['gain', 'loss'] },
  { location: ['neutral', 'loss'],  health_data: ['gain', 'neutral'],  contacts: ['loss', 'gain'],
    microphone: ['neutral', 'loss'], camera: ['gain', 'neutral'],       photos: ['loss', 'gain'] },
  { location: ['loss', 'gain'],     health_data: ['neutral', 'loss'],  contacts: ['gain', 'neutral'],
    microphone: ['loss', 'gain'],    camera: ['neutral', 'loss'],       photos: ['gain', 'neutral'] },
  { location: ['gain', 'neutral'],  health_data: ['loss', 'gain'],     contacts: ['neutral', 'loss'],
    microphone: ['gain', 'neutral'], camera: ['loss', 'gain'],          photos: ['neutral', 'loss'] },
];

export const TIMING = {
  fixationMinMs: 1500,
  fixationMaxMs: 2500,
  stimulusMs:    5000,
  promptMs:       500,
  itiMs:         2000,
};