function createPuzzleSession(puzzle) {
  const grid = buildGrid(puzzle);
  const numbers = numberGrid(grid, puzzle);
  const bank = buildLetterBank(grid);

  return {
    puzzle,
    grid,
    numbers,
    bank,
    fills: grid.map((row) => row.map((cell) => (cell ? "" : null))),
    selectedWordId: puzzle.words[0]?.id ?? null,
    selectedIndex: 0,
    direction: puzzle.words[0]?.direction ?? "across",
  };
}

function buildGrid(puzzle) {
  const grid = Array.from({ length: puzzle.rows }, () =>
    Array.from({ length: puzzle.cols }, () => null)
  );

  for (const word of puzzle.words) {
    word.answer.forEach((syllable, i) => {
      const { r, c } = cellAt(word, i);
      if (!grid[r] || c < 0 || c >= puzzle.cols) {
        throw new Error(`Word "${word.id}" sits outside the grid`);
      }
      const existing = grid[r][c];
      if (!existing) {
        grid[r][c] = { solution: syllable, wordIds: [word.id] };
        return;
      }
      if (existing.solution !== syllable) {
        throw new Error(
          `Overlap mismatch at ${r},${c}: "${existing.solution}" vs "${syllable}"`
        );
      }
      if (!existing.wordIds.includes(word.id)) {
        existing.wordIds.push(word.id);
      }
    });
  }

  return grid;
}

function numberGrid(grid, puzzle) {
  const numbers = grid.map((row) => row.map(() => 0));
  let next = 1;

  for (let r = 0; r < puzzle.rows; r += 1) {
    for (let c = 0; c < puzzle.cols; c += 1) {
      if (!grid[r][c]) continue;
      const starts = puzzle.words.some(
        (word) => word.row === r && word.col === c
      );
      if (starts) {
        numbers[r][c] = next;
        next += 1;
      }
    }
  }

  return numbers;
}

function buildLetterBank(grid) {
  const letters = [];
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell) letters.push(cell.solution);
    });
  });
  return shuffle(letters.map((syllable, index) => ({
    id: `tile-${index}-${syllable}`,
    syllable,
    used: false,
  })));
}

function cellAt(word, index) {
  return {
    r: word.direction === "down" ? word.row + index : word.row,
    c: word.direction === "across" ? word.col + index : word.col,
  };
}

function getWordCells(word) {
  return word.answer.map((_, index) => cellAt(word, index));
}

function wordsAtCell(session, r, c) {
  const cell = session.grid[r]?.[c];
  if (!cell) return [];
  return session.puzzle.words.filter((word) => cell.wordIds.includes(word.id));
}

function getSelectedWord(session) {
  return session.puzzle.words.find((word) => word.id === session.selectedWordId) ?? null;
}

function selectCell(session, r, c) {
  const options = wordsAtCell(session, r, c);
  if (!options.length) return session;

  let word = options.find((item) => item.id === session.selectedWordId);
  if (word) {
    const other = options.find((item) => item.id !== word.id);
    if (other && session.fills[r][c]) {
      word = other;
    } else if (other && options.length > 1) {
      const clickedAgain = session.selectedWordId === word.id;
      const sameCell =
        getWordCells(word).findIndex((pos) => pos.r === r && pos.c === c) ===
        session.selectedIndex;
      if (clickedAgain && sameCell) word = other;
    }
  } else {
    word =
      options.find((item) => item.direction === session.direction) ?? options[0];
  }

  const index = getWordCells(word).findIndex((pos) => pos.r === r && pos.c === c);
  return {
    ...session,
    selectedWordId: word.id,
    selectedIndex: index,
    direction: word.direction,
  };
}

function selectWord(session, wordId) {
  const word = session.puzzle.words.find((item) => item.id === wordId);
  if (!word) return session;
  const empty = firstEmptyIndex(session, word);
  return {
    ...session,
    selectedWordId: word.id,
    selectedIndex: empty === -1 ? 0 : empty,
    direction: word.direction,
  };
}

function firstEmptyIndex(session, word) {
  const cells = getWordCells(word);
  return cells.findIndex((pos) => !session.fills[pos.r][pos.c]);
}

function placeTile(session, tileId) {
  const tile = session.bank.find((item) => item.id === tileId && !item.used);
  const word = getSelectedWord(session);
  if (!tile || !word) return session;

  let index = session.selectedIndex;
  let pos = cellAt(word, index);
  if (session.fills[pos.r][pos.c]) {
    const empty = firstEmptyIndex(session, word);
    if (empty === -1) return session;
    index = empty;
    pos = cellAt(word, index);
  }

  const fills = cloneFills(session);
  fills[pos.r][pos.c] = tile.syllable;

  const bank = session.bank.map((item) =>
    item.id === tile.id ? { ...item, used: true } : item
  );

  const nextEmpty = getWordCells(word).findIndex(
    (cell, i) => i > index && !fills[cell.r][cell.c]
  );

  const nextSession = {
    ...session,
    fills,
    bank,
    selectedIndex: nextEmpty === -1 ? index : nextEmpty,
  };

  if (nextEmpty === -1) {
    const upcoming = session.puzzle.words.find(
      (item) => wordStatus(nextSession, item) !== "correct"
    );
    if (upcoming && upcoming.id !== word.id) {
      return selectWord(nextSession, upcoming.id);
    }
  }

  return nextSession;
}

function recallCell(session, r, c) {
  const glyph = session.fills[r]?.[c];
  if (!glyph) return session;

  const fills = cloneFills(session);
  fills[r][c] = "";

  const tile = session.bank.find((item) => item.used && item.syllable === glyph);
  const bank = session.bank.map((item) =>
    item.id === tile?.id ? { ...item, used: false } : item
  );

  const word = getSelectedWord(session);
  const index = word
    ? getWordCells(word).findIndex((pos) => pos.r === r && pos.c === c)
    : session.selectedIndex;

  return {
    ...session,
    fills,
    bank,
    selectedIndex: index === -1 ? session.selectedIndex : index,
  };
}

function shuffleBank(session) {
  const unused = session.bank.filter((item) => !item.used);
  const used = session.bank.filter((item) => item.used);
  return { ...session, bank: [...used, ...shuffle(unused)] };
}

function isComplete(session) {
  return session.grid.every((row, r) =>
    row.every((cell, c) => !cell || session.fills[r][c] === cell.solution)
  );
}

function isFilled(session) {
  return session.grid.every((row, r) =>
    row.every((cell, c) => !cell || session.fills[r][c])
  );
}

function wrongCells(session) {
  const misses = [];
  session.grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const value = session.fills[r][c];
      if (cell && value && value !== cell.solution) {
        misses.push({ r, c });
      }
    });
  });
  return misses;
}

function wordStatus(session, word) {
  const cells = getWordCells(word);
  const filled = cells.every((pos) => session.fills[pos.r][pos.c]);
  const correct = cells.every(
    (pos, i) => session.fills[pos.r][pos.c] === word.answer[i]
  );
  if (correct) return "correct";
  if (filled) return "wrong";
  if (cells.some((pos) => session.fills[pos.r][pos.c])) return "partial";
  return "empty";
}

function cloneFills(session) {
  return session.fills.map((row) => row.slice());
}

function shuffle(list) {
  const next = list.slice();
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}
