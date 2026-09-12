/**
 * Admin question overrides.
 * Drafts live in localStorage so the game and admin.html share edits.
 * Export writes merged topic JS (or a JSON patch) for the repo.
 */
const KPuzzleAdmin = (() => {
  const STORAGE_KEY = "kpuzzle:admin-overrides";
  const HANGUL = /^[가-힣]+$/;

  function emptyStore() {
    return { version: 1, patches: {} };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyStore();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || !parsed.patches) return emptyStore();
      return { version: 1, patches: parsed.patches };
    } catch {
      return emptyStore();
    }
  }

  function save(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function patchKey(themeKey, topicKey, id) {
    return `${themeKey}:${topicKey}:${id}`;
  }

  function normalizeItem(item) {
    const id = item[0];
    const clue = item[1] ?? "";
    const hangul = item[2] ?? "";
    let tier = 1;
    let clueKo = "";
    if (typeof item[3] === "number") {
      tier = item[3];
      clueKo = typeof item[4] === "string" ? item[4] : "";
    } else if (typeof item[3] === "string") {
      clueKo = item[3];
    }
    return { id, clue, hangul, tier, clueKo };
  }

  function toItemArray(question) {
    const id = question.id;
    const clue = question.clue ?? "";
    const hangul = question.hangul ?? "";
    const tier = Number(question.tier) || 1;
    const clueKo = (question.clueKo ?? "").trim();
    const item = [id, clue, hangul];
    if (tier !== 1 || clueKo) item.push(tier);
    if (clueKo) item.push(clueKo);
    return item;
  }

  function getPatch(themeKey, topicKey, id) {
    return load().patches[patchKey(themeKey, topicKey, id)] ?? null;
  }

  function setPatch(themeKey, topicKey, id, fields) {
    const store = load();
    const key = patchKey(themeKey, topicKey, id);
    const prev = store.patches[key] ?? {};
    const next = { ...prev, ...fields };
    if (next.deleted) {
      store.patches[key] = { deleted: true };
    } else {
      store.patches[key] = next;
    }
    save(store);
    return next;
  }

  function clearPatch(themeKey, topicKey, id) {
    const store = load();
    delete store.patches[patchKey(themeKey, topicKey, id)];
    save(store);
  }

  function clearTopic(themeKey, topicKey) {
    const store = load();
    const prefix = `${themeKey}:${topicKey}:`;
    Object.keys(store.patches).forEach((key) => {
      if (key.startsWith(prefix)) delete store.patches[key];
    });
    save(store);
  }

  function clearAll() {
    save(emptyStore());
  }

  function sameQuestion(a, b) {
    return (
      (a.clue ?? "") === (b.clue ?? "") &&
      (a.clueKo ?? "") === (b.clueKo ?? "") &&
      (a.hangul ?? "") === (b.hangul ?? "") &&
      Number(a.tier ?? 1) === Number(b.tier ?? 1)
    );
  }

  function listTopicQuestions(themeKey, topic) {
    const store = load();
    const prefix = `${themeKey}:${topic.key}:`;
    const rows = [];

    for (const raw of topic.items ?? []) {
      const original = normalizeItem(raw);
      const patch = store.patches[patchKey(themeKey, topic.key, original.id)];
      if (patch?.deleted) continue;
      const merged = patch ? { ...original, ...patch, id: original.id } : { ...original };
      rows.push({
        ...merged,
        added: false,
        dirty: Boolean(patch) && !sameQuestion(merged, original),
        original,
      });
    }

    Object.entries(store.patches).forEach(([key, patch]) => {
      if (!key.startsWith(prefix) || !patch?.added || patch.deleted) return;
      const id = key.slice(prefix.length);
      if (rows.some((row) => row.id === id)) return;
      rows.push({
        id,
        clue: patch.clue ?? "",
        clueKo: patch.clueKo ?? "",
        hangul: patch.hangul ?? "",
        tier: patch.tier ?? 1,
        added: true,
        dirty: true,
        original: null,
      });
    });

    return rows;
  }

  function mergeTopicItems(themeKey, topic) {
    return listTopicQuestions(themeKey, topic).map(toItemArray);
  }

  function dirtyCount(themeKey, topicKey) {
    const store = load();
    if (!themeKey) return Object.keys(store.patches).length;
    const prefix = topicKey ? `${themeKey}:${topicKey}:` : `${themeKey}:`;
    return Object.keys(store.patches).filter((key) => key.startsWith(prefix)).length;
  }

  function exportThemeSource(varName, themeKey, topics) {
    const body = topics
      .map((topic) => {
        const items = mergeTopicItems(themeKey, topic);
        const lines = items.map((item) => `      ${JSON.stringify(item)}`).join(",\n");
        return `  {
    key: ${JSON.stringify(topic.key)},
    name: ${JSON.stringify(topic.name)},
    hangul: ${JSON.stringify(topic.hangul)},
    blurb: ${JSON.stringify(topic.blurb)},
    items: [
${lines}
    ],
  }`;
      })
      .join(",\n");
    return `const ${varName} = [\n${body}\n];\n`;
  }

  function exportPatches() {
    return JSON.stringify(load(), null, 2);
  }

  function importPatches(payload) {
    const parsed = typeof payload === "string" ? JSON.parse(payload) : payload;
    if (!parsed || typeof parsed !== "object" || !parsed.patches) {
      throw new Error("Invalid patch file");
    }
    save({ version: 1, patches: parsed.patches });
  }

  function validHangulAnswer(hangul) {
    return typeof hangul === "string" && HANGUL.test(hangul) && [...hangul].length >= 2 && [...hangul].length <= 8;
  }

  return {
    STORAGE_KEY,
    load,
    save,
    patchKey,
    normalizeItem,
    toItemArray,
    getPatch,
    setPatch,
    clearPatch,
    clearTopic,
    clearAll,
    sameQuestion,
    listTopicQuestions,
    mergeTopicItems,
    dirtyCount,
    exportThemeSource,
    exportPatches,
    importPatches,
    validHangulAnswer,
  };
})();
