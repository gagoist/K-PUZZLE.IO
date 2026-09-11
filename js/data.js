/**
 * K-PUZZLE.IO content pack
 *
 * Two themes only: K-POP and K-DRAMA & MOVIES.
 * Every topic keeps a 100-question bank. pack.js draws
 * Beginner 5 / Intermediate 10 / Advanced 20 clues from that bank.
 */
function w(id, clue, hangul, tier = 1) {
  return { id, clue, answer: [...hangul], tier };
}

function topicFrom(def) {
  return {
    key: def.key,
    name: def.name,
    hangul: def.hangul,
    blurb: def.blurb,
    words: def.items.map((item) => w(item[0], item[1], item[2], item[3] ?? 1)),
  };
}

const THEMES = [
  {
    key: "k-pop",
    name: "K-POP",
    emoji: "🟣",
    vibe: "Neon charts, fandom lightsticks, midnight comebacks.",
    topics: KPOP_TOPICS.map(topicFrom),
  },
  {
    key: "k-drama",
    name: "K-DRAMA & MOVIES",
    emoji: "🎬",
    vibe: "Cliffhangers, OST earworms, and unforgettable plots.",
    topics: KDRAMA_TOPICS.map(topicFrom),
  },
];
