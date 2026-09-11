/**
 * Builds shuffled crosswords from a 100-clue topic bank.
 *
 * Each topic keeps a full question pool. A play draws from that pool:
 * Beginner 5 clues, Intermediate 10 clues, Advanced 20 clues.
 */
const LEVELS = [
  {
    key: "beginner",
    name: "Beginner",
    count: 5,
    blurb: "Five clues drawn from the 100-question bank. Short Hangul, gentler clues.",
  },
  {
    key: "intermediate",
    name: "Intermediate",
    count: 10,
    blurb: "Ten clues drawn from the 100-question bank. More overlapping syllables.",
  },
  {
    key: "advanced",
    name: "Advanced",
    count: 20,
    blurb: "Twenty clues drawn from the 100-question bank. Denser grid and longer words.",
  },
];

const RANDOM_TOPIC = {
  key: "random",
  name: "Random Mix",
  hangul: "랜덤",
  blurb: "Every subject in this theme, shuffled onto one crossword. Play again for a new mix.",
  random: true,
};

const LEVEL_SPEC = {
  beginner: { maxLen: 4, maxTier: 2, maxCols: 8, maxRows: 10, variants: 6, attempts: 24, sample: 22 },
  intermediate: { maxLen: 5, maxTier: 3, maxCols: 10, maxRows: 12, variants: 5, attempts: 20, sample: 34 },
  advanced: { maxLen: 8, maxTier: 3, maxCols: 12, maxRows: 15, variants: 4, attempts: 16, sample: 50 },
};

const packCache = new Map();

function topicsWithRandom(theme) {
  return [RANDOM_TOPIC, ...(theme?.topics ?? [])];
}

function topicAt(theme, topicKey) {
  return topicsWithRandom(theme).find((item) => item.key === topicKey) ?? null;
}

function topicWords(topic) {
  return (topic?.words ?? []).filter((word) => word.answer.length >= 2);
}

function wordsAt(theme, topicKey) {
  if (topicKey === RANDOM_TOPIC.key) {
    return (theme?.topics ?? []).flatMap((topic) =>
      topicWords(topic).map((word) => ({
        ...word,
        id: `${topic.key}-${word.id}`,
        sourceTopic: topic.name,
      }))
    );
  }
  return topicWords(topicAt(theme, topicKey));
}

function packedFor(theme, topicKey, levelKey) {
  const cacheKey = `${theme.key}:${topicKey}:${levelKey}`;
  if (packCache.has(cacheKey)) return packCache.get(cacheKey);

  const packs = packAll(wordsAt(theme, topicKey), levelKey).map((puzzle) => ({
    ...puzzle,
    mix: topicKey === RANDOM_TOPIC.key,
  }));
  packCache.set(cacheKey, packs);
  return packs;
}

function refreshPuzzles(theme, topicKey, levelKey) {
  packCache.delete(`${theme.key}:${topicKey}:${levelKey}`);
  return puzzlesFor(theme, topicKey, levelKey);
}

function puzzlesFor(theme, topicKey, levelKey) {
  const level = LEVELS.find((item) => item.key === levelKey);
  if (!theme || !level) return [];
  return shuffle(packedFor(theme, topicKey, levelKey).slice());
}

function packAll(words, levelKey) {
  const spec = LEVEL_SPEC[levelKey] ?? LEVEL_SPEC.beginner;
  const target = LEVELS.find((item) => item.key === levelKey)?.count ?? 5;
  const pool = usablePool(words, spec, target);
  if (pool.length < 2) return [];

  const packs = [];
  const seen = new Set();
  let bestPartial = null;

  for (let i = 0; i < spec.attempts && packs.length < spec.variants; i += 1) {
    const packed = packOne(pool, target, spec);
    if (!packed) continue;
    if (packed.words.length < target) {
      if (!bestPartial || packed.words.length > bestPartial.words.length) {
        bestPartial = packed;
      }
      continue;
    }
    const key = packed.words.map((word) => word.id).sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    packs.push(labelPack(packed, packs.length + 1));
  }

  if (packs.length) return packs;
  return bestPartial ? [labelPack(bestPartial, 1)] : [];
}

function labelPack(packed, id) {
  return { ...packed, id, title: `${packed.words.length} clues` };
}

function usablePool(words, spec, target) {
  const strict = words.filter(
    (word) =>
      word.answer.length >= 2 &&
      word.answer.length <= spec.maxLen &&
      (word.tier ?? 1) <= spec.maxTier
  );
  if (strict.length >= target) return strict;
  return words.filter((word) => word.answer.length >= 2);
}

function packOne(pool, target, spec) {
  const want = Math.min(target, pool.length);
  const sampleN = Math.min(pool.length, spec.sample ?? Math.max(want * 3, 24));
  let best = null;
  const restarts = want >= 16 ? 12 : 10;

  for (let attempt = 0; attempt < restarts; attempt += 1) {
    const packed = growPlace(
      shuffle(pool.slice()).slice(0, sampleN),
      attempt % 3 === 0 ? "across" : "down",
      spec,
      want
    );
    if (!packed) continue;
    if (!best || isBetterPack(packed, best, want)) best = packed;
    if (packed.words.length >= want) return packed;
  }

  return best;
}

function isBetterPack(a, b, want) {
  const aFull = a.words.length >= want;
  const bFull = b.words.length >= want;
  if (aFull !== bFull) return aFull;
  if (a.words.length !== b.words.length) return a.words.length > b.words.length;
  return packShapeScore(a) > packShapeScore(b);
}

function packShapeScore(puzzle) {
  const wide = Math.max(0, puzzle.cols - puzzle.rows);
  const tooTall = Math.max(0, puzzle.rows - puzzle.cols * 1.7);
  return -wide * 80 - tooTall * 18 - puzzle.cols * 10 - puzzle.rows * puzzle.cols * 0.25;
}

function growPlace(order, firstDir, spec, target) {
  const placed = [
    {
      ...order[0],
      direction: firstDir,
      row: 0,
      col: 0,
    },
  ];
  const leftover = order.slice(1);

  while (placed.length < target && leftover.length) {
    const move = pickMove(placed, leftover, spec);
    if (move) {
      placed.push(move.next);
      leftover.splice(move.index, 1);
      continue;
    }

    let planted = null;
    let plantAt = -1;
    for (let i = 0; i < leftover.length; i += 1) {
      planted = plantIsland(placed, leftover[i], spec);
      if (planted) {
        plantAt = i;
        break;
      }
    }
    if (!planted) break;
    placed.push(planted);
    leftover.splice(plantAt, 1);
  }

  if (placed.length < 2) return null;
  return compactPuzzle(normalizePuzzle(placed));
}

function pickMove(placed, leftover, spec) {
  const moves = [];
  leftover.forEach((word, index) => {
    allFits(placed, word, spec).forEach((next) => {
      moves.push({ index, next, score: rateNext(placed, next) });
    });
  });
  if (!moves.length) return null;
  const top = Math.max(...moves.map((move) => move.score));
  const ranked = moves.filter((move) => move.score >= top - 8);
  return ranked[Math.floor(Math.random() * ranked.length)];
}

function allFits(placed, word, spec) {
  const grid = gridFrom(placed);
  const options = [];

  for (const host of placed) {
    word.answer.forEach((syllable, i) => {
      host.answer.forEach((hostSyl, j) => {
        if (syllable !== hostSyl) return;
        for (const nextDir of ["across", "down"]) {
          if (nextDir === host.direction) continue;
          const next = {
            ...word,
            direction: nextDir,
            row: nextDir === "down" ? host.row - i : host.row + j,
            col: nextDir === "across" ? host.col - i : host.col + j,
          };
          if (!fits(grid, placed, next)) continue;
          const box = boundsOf([...placed, next]);
          if (!fitsSpec(box, spec)) continue;
          options.push(next);
        }
      });
    });
  }

  return options;
}

function fitsSpec(box, spec) {
  return box.rows <= spec.maxRows && box.cols <= spec.maxCols;
}

function rateNext(placed, next) {
  const after = fullBounds([...placed, next]);
  const share = sharedCount(placed, next);
  const wide = Math.max(0, after.cols - after.rows);
  const tooTall = Math.max(0, after.rows - after.cols * 1.7);
  const area = after.rows * after.cols;
  const dirBonus = next.direction === "down" ? 3 : 0;
  return share * 1000 + dirBonus - wide * 45 - tooTall * 14 - area * 0.35;
}

function sharedCount(placed, word) {
  const grid = gridFrom(placed);
  return word.answer.reduce((total, _, i) => {
    const { r, c } = cellAt(word, i);
    return total + (grid.has(`${r},${c}`) ? 1 : 0);
  }, 0);
}

function shares(a, b) {
  return a.answer.some((syllable) => b.answer.includes(syllable));
}

function gridFrom(placed) {
  const cells = new Map();
  for (const word of placed) {
    word.answer.forEach((syllable, i) => {
      const { r, c } = cellAt(word, i);
      cells.set(`${r},${c}`, syllable);
    });
  }
  return cells;
}

function plantIsland(placed, word, spec) {
  const grid = gridFrom(placed);
  const box = fullBounds(placed);
  const bands = [
    { r0: box.minR, r1: box.maxR, c0: box.minC, c1: box.maxC },
  ];
  if (box.rows >= box.cols && box.cols + 3 <= spec.maxCols) {
    bands.push({
      r0: box.minR,
      r1: box.maxR,
      c0: box.maxC + 2,
      c1: box.maxC + word.answer.length + 2,
    });
  }
  bands.push(
    { r0: box.maxR + 2, r1: box.maxR + word.answer.length + 2, c0: box.minC, c1: box.maxC },
    { r0: box.maxR + 2, r1: box.maxR + word.answer.length + 2, c0: box.minC - 1, c1: box.maxC + 2 },
    { r0: box.minR, r1: box.maxR + 2, c0: box.minC, c1: box.maxC + 2 }
  );

  for (const band of bands) {
    for (const direction of ["down", "across"]) {
      for (let r = band.r0; r <= band.r1; r += 1) {
        for (let c = band.c0; c <= band.c1; c += 1) {
          const next = { ...word, direction, row: r, col: c };
          const nextBox = boundsOf([...placed, next]);
          if (!fitsSpec(nextBox, spec)) continue;
          if (!islandFits(grid, next)) continue;
          return next;
        }
      }
    }
  }
  return null;
}

function islandFits(grid, word) {
  for (let i = -1; i <= word.answer.length; i += 1) {
    const { r, c } = cellAt(word, i);
    if (grid.has(`${r},${c}`)) return false;
    if (i < 0 || i >= word.answer.length) continue;
    if (
      grid.has(`${r + 1},${c}`) ||
      grid.has(`${r - 1},${c}`) ||
      grid.has(`${r},${c + 1}`) ||
      grid.has(`${r},${c - 1}`)
    ) {
      return false;
    }
  }
  return true;
}

function fullBounds(placed) {
  let minR = Infinity;
  let minC = Infinity;
  let maxR = -Infinity;
  let maxC = -Infinity;
  for (const word of placed) {
    word.answer.forEach((_, i) => {
      const { r, c } = cellAt(word, i);
      minR = Math.min(minR, r);
      minC = Math.min(minC, c);
      maxR = Math.max(maxR, r);
      maxC = Math.max(maxC, c);
    });
  }
  return { minR, minC, maxR, maxC, rows: maxR - minR + 1, cols: maxC - minC + 1 };
}

function boundsOf(placed) {
  const box = fullBounds(placed);
  return { rows: box.rows, cols: box.cols };
}

function fits(grid, placed, word) {
  const positions = word.answer.map((syllable, i) => ({
    ...cellAt(word, i),
    syllable,
  }));

  let shared = 0;
  for (const pos of positions) {
    const existing = grid.get(`${pos.r},${pos.c}`);
    if (existing && existing !== pos.syllable) return false;
    if (existing) shared += 1;
  }
  if (shared < 1) return false;
  if (shared === positions.length) return false;

  const before = cellAt(word, -1);
  const after = cellAt(word, word.answer.length);
  if (grid.has(`${before.r},${before.c}`)) return false;
  if (grid.has(`${after.r},${after.c}`)) return false;

  return !placed.some((item) => item.id === word.id);
}

function normalizePuzzle(placed) {
  let minR = Infinity;
  let minC = Infinity;
  let maxR = -Infinity;
  let maxC = -Infinity;

  for (const word of placed) {
    word.answer.forEach((_, i) => {
      const { r, c } = cellAt(word, i);
      minR = Math.min(minR, r);
      minC = Math.min(minC, c);
      maxR = Math.max(maxR, r);
      maxC = Math.max(maxC, c);
    });
  }

  const words = placed.map((word) => ({
    id: word.id,
    clue: word.clue,
    answer: word.answer.slice(),
    direction: word.direction,
    row: word.row - minR,
    col: word.col - minC,
    sourceTopic: word.sourceTopic,
  }));

  return {
    rows: maxR - minR + 1,
    cols: maxC - minC + 1,
    words,
  };
}

function compactPuzzle(puzzle) {
  const occupiedRows = new Set();
  const occupiedCols = new Set();
  for (const word of puzzle.words) {
    word.answer.forEach((_, i) => {
      const { r, c } = cellAt(word, i);
      occupiedRows.add(r);
      occupiedCols.add(c);
    });
  }

  const rowMap = collapseAxis(puzzle.rows, occupiedRows);
  const colMap = collapseAxis(puzzle.cols, occupiedCols);
  const words = puzzle.words.map((word) => ({
    ...word,
    row: rowMap[word.row],
    col: colMap[word.col],
  }));

  let maxR = 0;
  let maxC = 0;
  words.forEach((word) => {
    word.answer.forEach((_, i) => {
      const { r, c } = cellAt(word, i);
      maxR = Math.max(maxR, r);
      maxC = Math.max(maxC, c);
    });
  });

  return { rows: maxR + 1, cols: maxC + 1, words };
}

function collapseAxis(length, occupied) {
  const map = Array(length).fill(0);
  let dest = 0;
  let pendingGap = false;
  let started = false;
  for (let i = 0; i < length; i += 1) {
    if (occupied.has(i)) {
      if (started && pendingGap) dest += 1;
      pendingGap = false;
      started = true;
      map[i] = dest;
      dest += 1;
    } else if (started) {
      pendingGap = true;
      map[i] = dest;
    }
  }
  return map;
}
