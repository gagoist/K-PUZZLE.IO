const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join("D:/JP World/WEB/K-PUZZLE.IO/js");

const context = {
  console,
  shuffle(list) {
    const next = list.slice();
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  },
};

vm.createContext(context);
vm.runInContext(
  fs.readFileSync(path.join(root, "topics-kpop.js"), "utf8") +
    "\n" +
    fs.readFileSync(path.join(root, "topics-kdrama.js"), "utf8") +
    "\n" +
    fs.readFileSync(path.join(root, "data.js"), "utf8") +
    "\n" +
    fs.readFileSync(path.join(root, "engine.js"), "utf8") +
    "\n" +
    fs.readFileSync(path.join(root, "pack.js"), "utf8") +
    "\nthis.THEMES = THEMES; this.LEVELS = LEVELS; this.RANDOM_TOPIC = RANDOM_TOPIC; this.wordsAt = wordsAt; this.puzzlesFor = puzzlesFor; this.createPuzzleSession = createPuzzleSession;",
  context
);

const { THEMES, LEVELS, RANDOM_TOPIC, puzzlesFor, createPuzzleSession } = context;
const rows = [];
for (const theme of THEMES) {
  for (const topic of [...theme.topics, RANDOM_TOPIC]) {
    for (const level of LEVELS) {
      const t0 = Date.now();
      const picked = puzzlesFor(theme, topic.key, level.key);
      const sizes = picked.map((puzzle) => puzzle.words.length);
      let error = "";
      try {
        picked.forEach((puzzle) => createPuzzleSession(puzzle));
      } catch (err) {
        error = String(err.message || err);
      }
      rows.push({
        topic: `${theme.key}/${topic.key}`,
        level: level.key,
        need: level.count,
        packs: picked.length,
        clues: sizes.join(",") || "-",
        ok: picked.length > 0 && sizes.every((n) => n === level.count) && !error,
        ms: Date.now() - t0,
        error,
      });
    }
  }
}
console.table(rows);
const short = rows.filter((r) => !r.ok);
console.log("misses:", short.length ? JSON.stringify(short, null, 2) : "none");
