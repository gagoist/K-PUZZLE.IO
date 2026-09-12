const screens = {
  lobby: document.querySelector("#lobby"),
  topics: document.querySelector("#topics"),
  levels: document.querySelector("#levels"),
  game: document.querySelector("#game"),
};

const els = {
  themeGrid: document.querySelector("#theme-grid"),
  topicGrid: document.querySelector("#topic-grid"),
  topicSearch: document.querySelector("#topic-search"),
  topicCount: document.querySelector("#topic-count"),
  topicsBack: document.querySelector("#topics-back"),
  topicsTitle: document.querySelector("#topics-title"),
  topicsVibe: document.querySelector("#topics-vibe"),
  levelsBack: document.querySelector("#levels-back"),
  levelsTitle: document.querySelector("#levels-title"),
  levelsHangul: document.querySelector("#levels-hangul"),
  levelsVibe: document.querySelector("#levels-vibe"),
  levelGrid: document.querySelector("#level-grid"),
  backBtn: document.querySelector("#back-btn"),
  topicTitle: document.querySelector("#topic-title"),
  topicHangul: document.querySelector("#topic-hangul"),
  topicVibe: document.querySelector("#topic-vibe"),
  progress: document.querySelector("#progress"),
  timer: document.querySelector("#game-timer"),
  hudShuffle: document.querySelector("#hud-shuffle"),
  boardTopic: document.querySelector("#board-topic"),
  board: document.querySelector("#board"),
  activeClue: document.querySelector("#active-clue"),
  cluesToggle: document.querySelector("#clues-toggle"),
  cluesClose: document.querySelector("#clues-close"),
  sideCard: document.querySelector("#side-card"),
  clues: document.querySelector("#clues"),
  bank: document.querySelector("#bank"),
  shuffle: document.querySelector("#shuffle-btn"),
  status: document.querySelector("#status"),
  win: document.querySelector("#win"),
  winTitle: document.querySelector("#win-title"),
  winCopy: document.querySelector("#win-copy"),
  winTime: document.querySelector("#win-time"),
  winRank: document.querySelector("#win-rank"),
  retryBtn: document.querySelector("#retry-btn"),
  shareBtn: document.querySelector("#share-btn"),
  shareMenu: document.querySelector("#share-menu"),
  winToast: document.querySelector("#win-toast"),
  fireworks: document.querySelector("#fireworks"),
};

const TIMES_KEY = "kpuzzle:clears";
const MEDIAN_SECONDS = { beginner: 75, intermediate: 160, advanced: 340 };
const MOBILE_MQ = window.matchMedia("(max-width: 768px)");
let playTimerId = 0;
let resizeTimerId = 0;
const THEME_ART = {
  "k-pop": ["img/themes/kpop-1.png", "img/themes/kpop-2.png", "img/themes/kpop-3.png"],
  "k-drama": ["img/themes/kdrama-1.png", "img/themes/kdrama-2.png", "img/themes/kdrama-3.png"],
};

function topicArtMarkup(topicKey, themeKey) {
  const file = topicKey === "random" ? `random-${themeKey}` : topicKey;
  return `<img src="img/topics/${file}.png" alt="" onerror="this.remove()">`;
}

const state = {
  theme: null,
  topic: null,
  level: null,
  queue: [],
  stageIndex: 0,
  session: null,
  startedAt: 0,
  elapsedMs: 0,
  won: false,
};

const fireworks = {
  running: false,
  raf: 0,
  rockets: [],
  sparks: [],
  lastBurst: 0,
};

try {
  boot();
} catch (error) {
  console.error(error);
}

function boot() {
  renderLobby();
  els.topicsBack.addEventListener("click", showLobby);
  els.levelsBack.addEventListener("click", showTopics);
  els.backBtn.addEventListener("click", showLevels);
  els.topicSearch.addEventListener("input", () => {
    if (state.theme) renderTopics();
  });
  els.shuffle.addEventListener("click", shuffleLetters);
  els.hudShuffle.addEventListener("click", shuffleLetters);
  els.cluesToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleCluesPanel();
  });
  els.cluesClose.addEventListener("click", closeCluesPanel);
  els.sideCard.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", (event) => {
    if (!els.sideCard.classList.contains("is-open")) return;
    if (els.sideCard.contains(event.target) || els.cluesToggle.contains(event.target)) return;
    closeCluesPanel();
  });
  els.retryBtn.addEventListener("click", retryPuzzle);
  els.shareBtn.addEventListener("click", toggleShareMenu);
  els.shareMenu.addEventListener("click", onSharePick);
  MOBILE_MQ.addEventListener("change", onViewportChange);
  window.visualViewport?.addEventListener("resize", onPlayResize);
}

function hideAllScreens() {
  Object.values(screens).forEach((screen) => {
    screen.hidden = true;
    screen.classList.add("hidden");
  });
  stopPlayTimer();
  closeCluesPanel();
  hideWin();
}

function showScreen(name) {
  hideAllScreens();
  screens[name].hidden = false;
  screens[name].classList.remove("hidden");
}

function currentPuzzles() {
  return state.queue;
}

function renderLobby() {
  document.body.dataset.theme = "";
  state.theme = null;
  state.topic = null;
  state.level = null;
  state.queue = [];
  state.session = null;
  showScreen("lobby");
  els.themeGrid.innerHTML = THEMES.map((theme) => `
    <button class="theme-card" data-key="${theme.key}" type="button">
      <span class="theme-mosaic" aria-hidden="true">
        ${(THEME_ART[theme.key] ?? []).map((src) => `<img src="${src}" alt="">`).join("")}
      </span>
      <div class="theme-card-copy">
        <div>
          <div class="emoji">${theme.emoji}</div>
          <h2>${theme.name}</h2>
          <p>${theme.vibe}</p>
        </div>
        <span>${theme.topics.length} topics →</span>
      </div>
    </button>
  `).join("");

  els.themeGrid.querySelectorAll(".theme-card").forEach((card) => {
    card.addEventListener("click", () => openTheme(card.dataset.key));
  });
}

function openTheme(key) {
  const theme = THEMES.find((item) => item.key === key);
  if (!theme) return;
  state.theme = theme;
  document.body.dataset.theme = theme.key;
  els.topicSearch.value = "";
  renderTopics();
}

function renderTopics() {
  const theme = state.theme;
  const query = (els.topicSearch.value ?? "").trim().toLowerCase();
  showScreen("topics");
  els.topicsTitle.textContent = `${theme.emoji} ${theme.name}`;
  els.topicsVibe.textContent = `${theme.topics.length} topics of fan questions — or Random Mix to shuffle the whole theme.`;
  const topics = topicsWithRandom(theme).filter((topic) => {
    if (!query || topic.random) return true;
    return [topic.name, topic.hangul, topic.blurb].some((text) =>
      String(text).toLowerCase().includes(query)
    );
  });
  const visible = topics.filter((topic) => !topic.random).length;
  els.topicCount.textContent = query
    ? `${visible} of ${theme.topics.length} topics`
    : `${theme.topics.length} topics`;
  els.topicGrid.innerHTML = topics.map((topic) => {
    const random = topic.random;
    return `
      <button class="topic-card${random ? " random" : ""}" data-topic="${topic.key}" type="button">
        <span class="topic-art" aria-hidden="true">${topicArtMarkup(topic.key, theme.key)}</span>
        <div class="topic-card-copy">
          <h2>${topic.name}</h2>
          <p class="hangul">${topic.hangul}</p>
          <p>${topic.blurb}</p>
        </div>
        <span class="topic-card-meta">${random ? "Shuffled mix →" : `${topic.words?.length ?? ""} questions · 5 / 10 / 20 →`}</span>
      </button>
    `;
  }).join("");

  els.topicGrid.querySelectorAll(".topic-card").forEach((card) => {
    card.addEventListener("click", () => openTopic(card.dataset.topic));
  });
}

function openTopic(topicKey) {
  const topic = topicAt(state.theme, topicKey);
  if (!topic) return;
  state.topic = topic;
  state.level = null;
  state.queue = [];
  state.session = null;
  renderLevels();
}

function renderLevels() {
  const { theme, topic } = state;
  showScreen("levels");
  els.levelsTitle.textContent = topic.name;
  els.levelsHangul.textContent = topic.hangul;
  els.levelsVibe.textContent = topic.random
    ? `A shuffled mix from every ${theme.name} topic, packed onto one crossword. Play again for a new mix.`
    : `A fan-question bank about ${topic.name}. Beginner, Intermediate, and Advanced draw 5, 10, or 20 clues onto one crossword.`;
  els.levelGrid.innerHTML = LEVELS.map((level) => `
    <button class="topic-card" data-level="${level.key}" type="button">
      <div>
        <h2>${level.name}</h2>
        <p class="hangul">${level.count} clues</p>
        <p>${level.blurb}</p>
      </div>
      <span>Play shuffled →</span>
    </button>
  `).join("");

  els.levelGrid.querySelectorAll(".topic-card").forEach((card) => {
    card.addEventListener("click", () => startLevel(card.dataset.level));
  });
}

function showTopics() {
  state.topic = null;
  state.level = null;
  state.queue = [];
  state.session = null;
  if (!state.theme) {
    renderLobby();
    return;
  }
  renderTopics();
}

function showLevels() {
  state.session = null;
  state.queue = [];
  if (!state.theme) {
    renderLobby();
    return;
  }
  if (!state.topic) {
    renderTopics();
    return;
  }
  renderLevels();
}

function showLobby() {
  renderLobby();
}

function startLevel(levelKey, stageIndex = 0) {
  const level = LEVELS.find((item) => item.key === levelKey);
  const topic = state.topic;
  if (!level || !topic) return;
  const queue = stageIndex === 0
    ? puzzlesFor(state.theme, topic.key, level.key)
    : state.queue;
  if (!queue.length) return;
  state.level = level;
  state.queue = queue;
  state.stageIndex = stageIndex;
  state.session = createPuzzleSession(queue[stageIndex]);
  state.startedAt = Date.now();
  state.elapsedMs = 0;
  state.won = false;
  document.body.dataset.theme = state.theme.key;
  showScreen("game");
  startPlayTimer();
  closeCluesPanel();
  renderGame();
}

function isMobilePlay() {
  return MOBILE_MQ.matches;
}

function cellSizeFor(levelKey, cols, rows = 8) {
  if (isMobilePlay()) {
    const gap = 2;
    const card = els.board?.closest(".board-card");
    const clue = document.querySelector(".play-clue");
    const viewportH = window.visualViewport?.height ?? window.innerHeight;
    const viewportW = window.visualViewport?.width ?? window.innerWidth;
    const cardW = card?.clientWidth || viewportW - 32;
    const cardH = card?.clientHeight || viewportH - 260;
    const clueH = clue?.offsetHeight || 52;
    const availW = Math.max(160, cardW - 4);
    const availH = Math.max(160, cardH - clueH - 10);
    const byW = Math.floor((availW - (cols - 1) * gap) / Math.max(1, cols));
    const byH = Math.floor((availH - (rows - 1) * gap) / Math.max(1, rows));
    return Math.max(16, Math.min(44, byW, byH));
  }
  const prefer = { beginner: 56, intermediate: 46, advanced: 38 }[levelKey] ?? 46;
  const max = { beginner: 64, intermediate: 52, advanced: 42 }[levelKey] ?? 52;
  const gap = levelKey === "beginner" ? 4 : 3;
  const fitted = Math.floor((380 - (cols - 1) * gap) / Math.max(1, cols));
  return Math.max(prefer, Math.min(max, fitted));
}

function renderGame() {
  const { theme, topic, level, session } = state;
  const puzzle = session.puzzle;
  const solved = puzzle.words.filter((word) => wordStatus(session, word) === "correct").length;
  els.topicTitle.textContent = topic.name;
  els.topicHangul.textContent = topic.hangul;
  els.topicVibe.textContent = `${theme.name} · ${level.name} · ${puzzle.words.length} clues on one page`;
  els.progress.textContent = `${level.name} · ${solved} / ${puzzle.words.length} clues`;
  els.boardTopic.textContent = topic.name;
  els.backBtn.textContent = isMobilePlay() ? "←" : "← Levels";

  const cell = cellSizeFor(level.key, puzzle.cols, puzzle.rows);
  els.board.style.setProperty("--cell", `${cell}px`);
  els.board.style.setProperty("--cols", String(puzzle.cols));
  els.board.dataset.level = level.key;
  els.board.classList.toggle("dense", level.key !== "beginner");
  els.board.innerHTML = "";
  const selected = getSelectedWord(session);
  const selectedCells = selected ? getWordCells(selected) : [];
  const misses = wrongCells(session);

  for (let r = 0; r < puzzle.rows; r += 1) {
    for (let c = 0; c < puzzle.cols; c += 1) {
      const cell = session.grid[r][c];
      if (!cell) {
        const hole = document.createElement("div");
        hole.className = "cell block";
        hole.setAttribute("aria-hidden", "true");
        els.board.append(hole);
        continue;
      }
      const btn = document.createElement("button");
      btn.className = "cell";
      btn.type = "button";
      const inWord = selectedCells.some((pos) => pos.r === r && pos.c === c);
      const current = selectedCells[session.selectedIndex];
      if (inWord) btn.classList.add("in-word");
      if (current && current.r === r && current.c === c) btn.classList.add("selected");
      if (misses.some((pos) => pos.r === r && pos.c === c)) btn.classList.add("wrong");
      if (session.fills[r][c] && session.fills[r][c] === cell.solution) {
        btn.classList.add("correct");
      }
      if (session.numbers[r][c]) {
        const num = document.createElement("span");
        num.className = "num";
        num.textContent = session.numbers[r][c];
        btn.append(num);
      }
      const glyph = document.createElement("span");
      glyph.textContent = session.fills[r][c] || "";
      btn.append(glyph);
      btn.setAttribute(
        "aria-label",
        `Row ${r + 1}, column ${c + 1}${session.fills[r][c] ? `, ${session.fills[r][c]}` : ", empty"}`
      );
      btn.addEventListener("click", () => onCellClick(r, c));
      els.board.append(btn);
    }
  }

  renderClues();
  renderBank();
  renderActiveClue();

  if (isMobilePlay()) {
    requestAnimationFrame(() => fitMobileBoard(level.key, puzzle.cols, puzzle.rows));
  }

  if (isComplete(session)) {
    els.status.textContent = "Every syllable is in the right place.";
    showWin();
  } else if (isFilled(session)) {
    els.status.textContent = "All tiles are placed, but a few cells are still wrong. Tap a cell to take a letter back.";
  } else {
    const clue = selected?.clue ?? "Choose a clue, then tap Hangul tiles.";
    els.status.textContent = clue;
  }
}

function fitMobileBoard(levelKey, cols, rows) {
  if (!isMobilePlay() || !state.session || screens.game.hidden) return;
  const next = cellSizeFor(levelKey, cols, rows);
  const current = Number.parseFloat(getComputedStyle(els.board).getPropertyValue("--cell"));
  if (Number.isFinite(next) && Math.abs(next - current) >= 1) {
    els.board.style.setProperty("--cell", `${next}px`);
  }
}

function renderActiveClue() {
  const { session } = state;
  const selected = getSelectedWord(session);
  const card = els.activeClue;
  card.classList.remove("correct", "prompt", "message");

  if (!session) {
    card.replaceChildren();
    return;
  }

  if (isComplete(session)) {
    card.classList.add("message", "correct");
    card.innerHTML = `<span class="active-clue-text">Every syllable is in the right place.</span>`;
    return;
  }

  if (isFilled(session)) {
    card.classList.add("message");
    card.innerHTML = `<span class="active-clue-text">A few cells are still wrong. Tap a cell to take a letter back.</span>`;
    return;
  }

  if (!selected) {
    card.classList.add("prompt");
    card.innerHTML = `<span class="active-clue-text">Tap a cell to see its clue, then tap Hangul tiles.</span>`;
    return;
  }

  const number = session.numbers[selected.row][selected.col];
  const dir = selected.direction === "down" ? "Down" : "Across";
  const status = wordStatus(session, selected);
  if (status === "correct") card.classList.add("correct");
  const topic = selected.sourceTopic
    ? `<span class="topic-tag">${selected.sourceTopic}</span>`
    : "";
  card.innerHTML = `
    <span class="active-clue-meta"><b>${number}</b> ${dir}</span>
    ${topic}
    <span class="active-clue-text">${selected.clue}</span>
  `;
}

function renderClues() {
  const { session } = state;
  const items = session.puzzle.words
    .map((word) => ({
      word,
      number: session.numbers[word.row][word.col],
    }))
    .sort((a, b) => a.number - b.number || a.word.direction.localeCompare(b.word.direction));

  els.clues.style.setProperty("--clue-rows", String(Math.ceil(items.length / 2)));
  els.clues.classList.toggle("split", items.length >= 10);
  els.clues.innerHTML = items
    .map(({ word, number }) => {
      const active = word.id === session.selectedWordId ? " active" : "";
      const status = wordStatus(session, word);
      const dir = word.direction === "down" ? "Down" : "Across";
      return `
        <button class="clue${active} ${status}" data-id="${word.id}" type="button">
          <b>${number}</b>
          <em>${dir}</em>
          ${word.sourceTopic ? `<span class="topic-tag">${word.sourceTopic}</span>` : ""}
          ${word.clue}
        </button>
      `;
    })
    .join("");

  els.clues.querySelectorAll(".clue").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.won) return;
      state.session = selectWord(state.session, btn.dataset.id);
      closeCluesPanel();
      renderGame();
    });
  });
}

function shuffleLetters() {
  if (state.won || !state.session) return;
  state.session = shuffleBank(state.session);
  renderGame();
}

function toggleCluesPanel() {
  const open = !els.sideCard.classList.contains("is-open");
  els.sideCard.classList.toggle("is-open", open);
  els.cluesToggle.setAttribute("aria-expanded", String(open));
}

function closeCluesPanel() {
  els.sideCard.classList.remove("is-open");
  els.cluesToggle.setAttribute("aria-expanded", "false");
}

function startPlayTimer() {
  stopPlayTimer();
  tickPlayTimer();
  playTimerId = window.setInterval(tickPlayTimer, 250);
}

function stopPlayTimer() {
  window.clearInterval(playTimerId);
  playTimerId = 0;
}

function tickPlayTimer() {
  if (!els.timer) return;
  if (state.won) {
    els.timer.textContent = formatTime(state.elapsedMs);
    return;
  }
  if (!state.startedAt || screens.game.hidden) {
    els.timer.textContent = "0:00";
    return;
  }
  els.timer.textContent = formatTime(Date.now() - state.startedAt);
}

function onViewportChange() {
  closeCluesPanel();
  if (!screens.game.hidden && state.session) renderGame();
}

function onPlayResize() {
  if (fireworks.running) sizeFireworks();
  window.clearTimeout(resizeTimerId);
  resizeTimerId = window.setTimeout(() => {
    if (!screens.game.hidden && state.session && isMobilePlay()) {
      fitMobileBoard(state.level.key, state.session.puzzle.cols, state.session.puzzle.rows);
    }
  }, 120);
}

function renderBank() {
  els.bank.innerHTML = "";
  state.session.bank
    .filter((tile) => !tile.used)
    .forEach((tile) => {
      const btn = document.createElement("button");
      btn.className = "tile";
      btn.type = "button";
      btn.textContent = tile.syllable;
      btn.addEventListener("click", () => {
        if (state.won) return;
        state.session = placeTile(state.session, tile.id);
        renderGame();
      });
      els.bank.append(btn);
    });
}

function onCellClick(r, c) {
  if (state.won) return;
  closeCluesPanel();
  if (state.session.fills[r][c]) {
    state.session = recallCell(state.session, r, c);
  }
  state.session = selectCell(state.session, r, c);
  renderGame();
}

function showWin() {
  if (state.won) {
    els.win.hidden = false;
    els.win.classList.remove("hidden");
    return;
  }
  const topic = state.topic;
  const level = state.level;
  const clues = state.session.puzzle.words.length;
  state.elapsedMs = Math.max(1, Date.now() - state.startedAt);
  state.won = true;
  recordClear(level.key, state.elapsedMs);
  const rank = topPercent(level.key, state.elapsedMs);
  els.winTitle.textContent = "Congratulations";
  els.winCopy.textContent = `${topic.name} · ${level.name} · ${clues} clues cleared.`;
  els.winTime.textContent = formatTime(state.elapsedMs);
  els.winRank.textContent = `Top ${rank}%`;
  closeShareMenu();
  hideToast();
  els.win.hidden = false;
  els.win.classList.remove("hidden");
  startFireworks();
}

function hideWin() {
  els.win.hidden = true;
  els.win.classList.add("hidden");
  closeShareMenu();
  hideToast();
  stopFireworks();
}

function retryPuzzle() {
  const puzzles = currentPuzzles();
  if (state.stageIndex < puzzles.length - 1) {
    startLevel(state.level.key, state.stageIndex + 1);
    return;
  }
  refreshPuzzles(state.theme, state.topic.key, state.level.key);
  startLevel(state.level.key, 0);
}

function formatTime(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  if (hours) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function loadClears() {
  try {
    return JSON.parse(localStorage.getItem(TIMES_KEY) || "{}");
  } catch {
    return {};
  }
}

function recordClear(levelKey, ms) {
  try {
    const all = loadClears();
    const bucket = Array.isArray(all[levelKey]) ? all[levelKey] : [];
    bucket.push(ms);
    all[levelKey] = bucket.slice(-240);
    localStorage.setItem(TIMES_KEY, JSON.stringify(all));
  } catch {
    /* private mode / blocked storage */
  }
}

function topPercent(levelKey, ms) {
  const seconds = Math.max(1, ms / 1000);
  const median = MEDIAN_SECONDS[levelKey] ?? MEDIAN_SECONDS.intermediate;
  const modeled = clamp(normalCdf(Math.log(seconds / median) / 0.48) * 100, 1, 99);
  const samples = loadClears()[levelKey] ?? [];
  if (samples.length < 6) return Math.round(modeled);
  const faster = samples.filter((time) => time < ms).length;
  const empirical = (faster / samples.length) * 100;
  const mix = Math.min(1, (samples.length - 6) / 36);
  return Math.round(clamp(empirical * mix + modeled * (1 - mix), 1, 99));
}

function normalCdf(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function sharePayload() {
  const topic = state.topic?.name ?? "K-PUZZLE";
  const level = state.level?.name ?? "Puzzle";
  const time = formatTime(state.elapsedMs);
  const rank = els.winRank.textContent;
  const url = location.href.split("#")[0];
  const text = `I cleared ${topic} · ${level} on K-PUZZLE.COM in ${time} — ${rank}! Can you beat my Hangul crossword?`;
  return { text, url, full: `${text} ${url}` };
}

function toggleShareMenu() {
  const open = els.shareMenu.hidden;
  els.shareMenu.hidden = !open;
  els.shareMenu.classList.toggle("hidden", !open);
  els.shareBtn.setAttribute("aria-expanded", String(open));
}

function closeShareMenu() {
  els.shareMenu.hidden = true;
  els.shareMenu.classList.add("hidden");
  els.shareBtn.setAttribute("aria-expanded", "false");
}

function onSharePick(event) {
  const button = event.target.closest("[data-share]");
  if (!button) return;
  const network = button.dataset.share;
  const payload = sharePayload();
  if (network === "x") {
    openShareWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(payload.text)}&url=${encodeURIComponent(payload.url)}`);
    return;
  }
  if (network === "facebook") {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(payload.url)}&quote=${encodeURIComponent(payload.text)}`);
    return;
  }
  if (network === "instagram") {
    shareInstagram(payload);
  }
}

function openShareWindow(url) {
  const width = 600;
  const height = 520;
  const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
  const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
  window.open(url, "k-puzzle-share", `popup,width=${width},height=${height},left=${left},top=${top}`);
}

async function shareInstagram(payload) {
  if (navigator.share) {
    try {
      await navigator.share({ title: "K-PUZZLE.COM", text: payload.text, url: payload.url });
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }
  const copied = await copyText(payload.full);
  showToast(copied ? "Caption copied. Paste it in Instagram." : "Open Instagram and paste your result.");
  window.open("https://www.instagram.com/", "_blank", "noopener");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.append(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

function showToast(message) {
  els.winToast.textContent = message;
  els.winToast.hidden = false;
  els.winToast.classList.remove("hidden");
}

function hideToast() {
  els.winToast.textContent = "";
  els.winToast.hidden = true;
  els.winToast.classList.add("hidden");
}

function startFireworks() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = els.fireworks;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  stopFireworks();
  fireworks.running = true;
  fireworks.rockets = [];
  fireworks.sparks = [];
  fireworks.lastBurst = 0;
  sizeFireworks();
  launchRocket(window.innerWidth, window.innerHeight);
  launchRocket(window.innerWidth, window.innerHeight);
  launchRocket(window.innerWidth, window.innerHeight);
  const loop = (stamp) => {
    if (!fireworks.running) return;
    drawFireworks(ctx, stamp);
    fireworks.raf = requestAnimationFrame(loop);
  };
  fireworks.raf = requestAnimationFrame(loop);
}

function stopFireworks() {
  fireworks.running = false;
  cancelAnimationFrame(fireworks.raf);
  fireworks.raf = 0;
  fireworks.rockets = [];
  fireworks.sparks = [];
  const ctx = els.fireworks?.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, els.fireworks.width, els.fireworks.height);
}

function sizeFireworks() {
  const canvas = els.fireworks;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawFireworks(ctx, stamp) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(5, 4, 10, 0.18)";
  ctx.fillRect(0, 0, width, height);
  if (stamp - fireworks.lastBurst > 420 + Math.random() * 280) {
    fireworks.lastBurst = stamp;
    launchRocket(width, height);
    if (Math.random() > 0.45) launchRocket(width, height);
  }
  fireworks.rockets = fireworks.rockets.filter((rocket) => {
    rocket.x += rocket.vx;
    rocket.y += rocket.vy;
    rocket.vy += 0.04;
    ctx.fillStyle = rocket.color;
    ctx.beginPath();
    ctx.arc(rocket.x, rocket.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
    if (rocket.y <= rocket.peak || rocket.vy >= 0) {
      burst(rocket.x, rocket.y, rocket.color);
      return false;
    }
    return rocket.y > -20;
  });
  fireworks.sparks = fireworks.sparks.filter((spark) => {
    spark.x += spark.vx;
    spark.y += spark.vy;
    spark.vy += 0.055;
    spark.vx *= 0.985;
    spark.life -= spark.decay;
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = spark.color;
    ctx.globalAlpha = Math.max(0, spark.life);
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    return spark.life > 0;
  });
}

function launchRocket(width, height) {
  const colors = ["#ffd76a", "#fb7185", "#c084fc", "#67e8f9", "#4ade80", "#f472b6", "#facc15"];
  fireworks.rockets.push({
    x: width * (0.12 + Math.random() * 0.76),
    y: height * 1.02,
    vx: (Math.random() - 0.5) * 1.6,
    vy: -(6.8 + Math.random() * 3.4),
    peak: height * (0.18 + Math.random() * 0.38),
    color: colors[Math.floor(Math.random() * colors.length)],
  });
}

function burst(x, y, color) {
  const count = 42 + Math.floor(Math.random() * 18);
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.25;
    const speed = 1.4 + Math.random() * 4.8;
    fireworks.sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.012 + Math.random() * 0.018,
      size: 1.4 + Math.random() * 2.2,
      color,
    });
  }
}

window.addEventListener("resize", onPlayResize);
