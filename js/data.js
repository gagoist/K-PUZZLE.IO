/**
 * K-PUZZLE.COM content pack
 *
 * Two themes only: K-POP and K-DRAMA & MOVIES.
 * Every topic keeps a fan-question bank. pack.js draws
 * Beginner 5 / Intermediate 10 / Advanced 20 clues from that bank.
 */
function w(id, clue, hangul, tier = 1, clueKo = "") {
  return { id, clue, clueKo, answer: [...hangul], hangul, tier };
}

function topicItems(themeKey, def) {
  if (typeof KPuzzleAdmin !== "undefined" && KPuzzleAdmin.mergeTopicItems) {
    return KPuzzleAdmin.mergeTopicItems(themeKey, def);
  }
  return def.items;
}

function topicFrom(def, themeKey) {
  return {
    key: def.key,
    name: def.name,
    hangul: def.hangul,
    blurb: def.blurb,
    words: topicItems(themeKey, def).map((item) => {
      const parsed =
        typeof KPuzzleAdmin !== "undefined" && KPuzzleAdmin.normalizeItem
          ? KPuzzleAdmin.normalizeItem(item)
          : {
              id: item[0],
              clue: item[1],
              hangul: item[2],
              tier: typeof item[3] === "number" ? item[3] : 1,
              clueKo: typeof item[3] === "string" ? item[3] : item[4] ?? "",
            };
      return w(parsed.id, parsed.clue, parsed.hangul, parsed.tier, parsed.clueKo);
    }),
  };
}

const THEMES = [
  {
    key: "k-pop",
    name: "K-POP",
    emoji: "🟣",
    vibe: "Neon charts, fandom lightsticks, midnight comebacks.",
    topics: KPOP_TOPICS.map((def) => topicFrom(def, "k-pop")),
  },
  {
    key: "k-drama",
    name: "K-DRAMA & MOVIES",
    emoji: "🎬",
    vibe: "Cliffhangers, OST earworms, and unforgettable plots.",
    topics: KDRAMA_TOPICS.map((def) => topicFrom(def, "k-drama")),
  },
];
