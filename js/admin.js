const THEME_PACKS = [
  { key: "k-pop", name: "K-POP", emoji: "🟣", varName: "KPOP_TOPICS", topics: () => KPOP_TOPICS },
  { key: "k-drama", name: "K-DRAMA & MOVIES", emoji: "🎬", varName: "KDRAMA_TOPICS", topics: () => KDRAMA_TOPICS },
];

const els = {
  themeTabs: document.querySelector("#theme-tabs"),
  topicSearch: document.querySelector("#topic-search"),
  topicList: document.querySelector("#topic-list"),
  questionSearch: document.querySelector("#question-search"),
  filterDirty: document.querySelector("#filter-dirty"),
  filterEmptyKo: document.querySelector("#filter-empty-ko"),
  autoTranslate: document.querySelector("#auto-translate"),
  topicTitle: document.querySelector("#topic-title"),
  topicMeta: document.querySelector("#topic-meta"),
  dirtyBadge: document.querySelector("#dirty-badge"),
  questionList: document.querySelector("#question-list"),
  emptyState: document.querySelector("#empty-state"),
  saveState: document.querySelector("#save-state"),
  batchStatus: document.querySelector("#batch-status"),
  addId: document.querySelector("#add-id"),
  addKo: document.querySelector("#add-ko"),
  addEn: document.querySelector("#add-en"),
  addHangul: document.querySelector("#add-hangul"),
  addTier: document.querySelector("#add-tier"),
  addStatus: document.querySelector("#add-status"),
};

const state = {
  themeKey: "k-pop",
  topicKey: "",
  saveTimer: 0,
  translateTimer: 0,
  lastAutoEn: {},
  batching: false,
};

boot();

function boot() {
  renderThemeTabs();
  els.topicSearch.addEventListener("input", renderTopicList);
  els.questionSearch.addEventListener("input", renderQuestions);
  els.filterDirty.addEventListener("change", renderQuestions);
  els.filterEmptyKo.addEventListener("change", renderQuestions);
  document.querySelector("#export-js").addEventListener("click", exportCurrentJs);
  document.querySelector("#export-all-js").addEventListener("click", exportAllJs);
  document.querySelector("#export-json").addEventListener("click", exportJson);
  document.querySelector("#import-json").addEventListener("click", () => document.querySelector("#import-file").click());
  document.querySelector("#import-file").addEventListener("change", onImportFile);
  document.querySelector("#reset-topic").addEventListener("click", resetTopic);
  document.querySelector("#reset-all").addEventListener("click", resetAll);
  document.querySelector("#translate-empty-ko").addEventListener("click", () => batchTranslate("en-ko"));
  document.querySelector("#translate-empty-en").addEventListener("click", () => batchTranslate("ko-en"));
  document.querySelector("#add-question").addEventListener("click", addQuestion);
  document.querySelector("#add-translate-en").addEventListener("click", () => translateAddField("ko-en"));
  document.querySelector("#add-translate-ko").addEventListener("click", () => translateAddField("en-ko"));
  els.addKo.addEventListener("input", () => {
    if (!els.autoTranslate.checked) return;
    schedule(() => translateAddField("ko-en", { onlyIfEmpty: true }), "add");
  });
  const first = currentTopics()[0];
  if (first) selectTopic(first.key);
  else renderTopicList();
}

function currentPack() {
  return THEME_PACKS.find((pack) => pack.key === state.themeKey) ?? THEME_PACKS[0];
}

function currentTopics() {
  return currentPack().topics();
}

function currentTopic() {
  return currentTopics().find((topic) => topic.key === state.topicKey) ?? null;
}

function renderThemeTabs() {
  els.themeTabs.innerHTML = THEME_PACKS.map((pack) => {
    const dirty = KPuzzleAdmin.dirtyCount(pack.key);
    const active = pack.key === state.themeKey ? " active" : "";
    return `
      <button class="theme-tab${active}" type="button" data-theme="${pack.key}">
        <span>${pack.emoji} ${pack.name}</span>
        ${dirty ? `<em>${dirty}</em>` : ""}
      </button>
    `;
  }).join("");
  els.themeTabs.querySelectorAll(".theme-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.themeKey = btn.dataset.theme;
      const query = els.topicSearch.value.trim().toLowerCase();
      const visible = currentTopics().filter((topic) => {
        if (!query) return true;
        return [topic.name, topic.hangul, topic.key, topic.blurb].some((text) =>
          String(text).toLowerCase().includes(query)
        );
      });
      state.topicKey = visible[0]?.key ?? currentTopics()[0]?.key ?? "";
      renderThemeTabs();
      renderTopicList();
      renderQuestions();
    });
  });
}

function renderTopicList() {
  const query = els.topicSearch.value.trim().toLowerCase();
  const topics = currentTopics().filter((topic) => {
    if (!query) return true;
    return [topic.name, topic.hangul, topic.key, topic.blurb].some((text) =>
      String(text).toLowerCase().includes(query)
    );
  });
  els.topicList.innerHTML = topics
    .map((topic) => {
      const dirty = KPuzzleAdmin.dirtyCount(state.themeKey, topic.key);
      const active = topic.key === state.topicKey ? " active" : "";
      return `
        <button class="topic-item${active}" type="button" data-topic="${topic.key}">
          <strong>${escapeHtml(topic.name)}</strong>
          <span>${escapeHtml(topic.hangul)} · ${topic.items.length}</span>
          ${dirty ? `<em>${dirty}</em>` : ""}
        </button>
      `;
    })
    .join("");
  els.topicList.querySelectorAll(".topic-item").forEach((btn) => {
    btn.addEventListener("click", () => selectTopic(btn.dataset.topic));
  });
}

function selectTopic(topicKey) {
  state.topicKey = topicKey;
  renderTopicList();
  renderQuestions();
}

function visibleQuestions(questions) {
  const query = els.questionSearch.value.trim().toLowerCase();
  return questions.filter((row) => {
    if (els.filterDirty.checked && !row.dirty) return false;
    if (els.filterEmptyKo.checked && (row.clueKo || "").trim()) return false;
    if (!query) return true;
    return [row.id, row.clue, row.clueKo, row.hangul].some((text) =>
      String(text).toLowerCase().includes(query)
    );
  });
}

function renderQuestions() {
  const topic = currentTopic();
  const pack = currentPack();
  if (!topic) {
    els.topicTitle.textContent = "주제를 선택하세요";
    els.topicMeta.textContent = "";
    els.questionList.innerHTML = "";
    els.emptyState.hidden = false;
    return;
  }

  const questions = KPuzzleAdmin.listTopicQuestions(state.themeKey, topic);
  const shown = visibleQuestions(questions);
  const dirty = questions.filter((row) => row.dirty).length;
  const missingKo = questions.filter((row) => !(row.clueKo || "").trim()).length;

  els.emptyState.hidden = true;
  els.topicTitle.textContent = `${pack.emoji} ${topic.name}`;
  els.topicMeta.textContent = `${topic.hangul} · ${questions.length}문항 · 한글 미작성 ${missingKo}`;
  els.dirtyBadge.textContent = dirty ? `수정 ${dirty}` : "원본";
  els.dirtyBadge.classList.toggle("is-dirty", dirty > 0);
  document.body.dataset.theme = state.themeKey;

  els.questionList.innerHTML = shown
    .map((row, index) => {
      const warn = KPuzzleAdmin.validHangulAnswer(row.hangul) ? "" : " invalid";
      return `
        <article class="q-card${row.dirty ? " dirty" : ""}${row.added ? " added" : ""}" data-id="${escapeAttr(row.id)}">
          <header class="q-head">
            <b>${index + 1}</b>
            <code>${escapeHtml(row.id)}</code>
            ${row.added ? `<span class="tag">추가</span>` : ""}
            ${row.dirty ? `<span class="tag dirty">수정됨</span>` : ""}
            <label class="tier-field">티어
              <select data-field="tier">
                ${[1, 2, 3].map((tier) => `<option value="${tier}"${Number(row.tier) === tier ? " selected" : ""}>${tier}</option>`).join("")}
              </select>
            </label>
            <button class="ghost restore" type="button" data-action="restore"${row.dirty ? "" : " disabled"}>되돌리기</button>
            <button class="ghost danger" type="button" data-action="delete">삭제</button>
          </header>
          <div class="q-grid">
            <label class="lang ko">
              <span>한글 질문</span>
              <textarea data-field="clueKo" rows="3" placeholder="한글로 질문을 적으면 영어로 번역할 수 있습니다.">${escapeHtml(row.clueKo)}</textarea>
              <button class="translate-btn" type="button" data-action="ko-en">영문으로 번역 →</button>
            </label>
            <label class="lang en">
              <span>English clue</span>
              <textarea data-field="clue" rows="3" placeholder="English clue players will see">${escapeHtml(row.clue)}</textarea>
              <button class="translate-btn" type="button" data-action="en-ko">← 한글로 번역</button>
            </label>
            <label class="answer${warn}">
              <span>정답 (한글 2–8자)</span>
              <input data-field="hangul" type="text" maxlength="8" value="${escapeAttr(row.hangul)}" spellcheck="false">
            </label>
          </div>
        </article>
      `;
    })
    .join("");

  if (!shown.length) {
    els.questionList.innerHTML = `<p class="none">조건에 맞는 질문이 없습니다.</p>`;
  }

  els.questionList.querySelectorAll(".q-card").forEach(bindCard);
  renderThemeTabs();
  flashSaved("브라우저에 자동 저장됨");
}

function bindCard(card) {
  const id = card.dataset.id;
  card.querySelectorAll("[data-field]").forEach((field) => {
    const eventName = field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(eventName, () => {
      persistField(id, field.dataset.field, field.value);
      if (field.dataset.field === "clueKo" && els.autoTranslate.checked) {
        schedule(() => translateRow(id, "ko-en", { onlyIfEmptyOrAuto: true }), id);
      }
      markCardDirty(card, true);
    });
  });
  card.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const action = btn.dataset.action;
      if (action === "restore") restoreQuestion(id);
      if (action === "delete") deleteQuestion(id);
      if (action === "ko-en" || action === "en-ko") {
        btn.disabled = true;
        try {
          await translateRow(id, action);
        } finally {
          btn.disabled = false;
        }
      }
    });
  });
}

function persistField(id, field, value) {
  const topic = currentTopic();
  const row = KPuzzleAdmin.listTopicQuestions(state.themeKey, topic).find((item) => item.id === id);
  if (!row) return;
  const next = {
    clue: row.clue,
    clueKo: row.clueKo,
    hangul: row.hangul,
    tier: row.tier,
    added: row.added || undefined,
    [field]: field === "tier" ? Number(value) || 1 : value,
  };
  if (row.original && KPuzzleAdmin.sameQuestion(next, row.original) && !row.added) {
    KPuzzleAdmin.clearPatch(state.themeKey, topic.key, id);
  } else {
    KPuzzleAdmin.setPatch(state.themeKey, topic.key, id, next);
  }
  updateHeaderCounts();
}

function updateHeaderCounts() {
  const topic = currentTopic();
  if (!topic) return;
  const questions = KPuzzleAdmin.listTopicQuestions(state.themeKey, topic);
  const dirty = questions.filter((row) => row.dirty).length;
  const missingKo = questions.filter((row) => !(row.clueKo || "").trim()).length;
  els.topicMeta.textContent = `${topic.hangul} · ${questions.length}문항 · 한글 미작성 ${missingKo}`;
  els.dirtyBadge.textContent = dirty ? `수정 ${dirty}` : "원본";
  els.dirtyBadge.classList.toggle("is-dirty", dirty > 0);
  renderThemeTabs();
  renderTopicList();
}

function markCardDirty(card, dirty) {
  card.classList.toggle("dirty", dirty);
  const restore = card.querySelector("[data-action='restore']");
  if (restore) restore.disabled = !dirty;
}

function restoreQuestion(id) {
  const topic = currentTopic();
  KPuzzleAdmin.clearPatch(state.themeKey, topic.key, id);
  delete state.lastAutoEn[`${state.themeKey}:${topic.key}:${id}`];
  renderQuestions();
}

function deleteQuestion(id) {
  const topic = currentTopic();
  const row = KPuzzleAdmin.listTopicQuestions(state.themeKey, topic).find((item) => item.id === id);
  if (!row) return;
  if (!confirm(`질문 “${id}”을(를) 삭제할까요?`)) return;
  if (row.added) KPuzzleAdmin.clearPatch(state.themeKey, topic.key, id);
  else KPuzzleAdmin.setPatch(state.themeKey, topic.key, id, { deleted: true });
  renderQuestions();
}

function addQuestion() {
  const topic = currentTopic();
  if (!topic) return;
  const hangul = els.addHangul.value.trim();
  const clueKo = els.addKo.value.trim();
  const clue = els.addEn.value.trim();
  let id = slugId(els.addId.value.trim() || clue || clueKo || hangul);
  const existing = KPuzzleAdmin.listTopicQuestions(state.themeKey, topic);
  if (existing.some((row) => row.id === id)) id = `${id}-${Date.now().toString(36)}`;
  if (existing.some((row) => row.hangul === hangul)) {
    els.addStatus.textContent = "이미 같은 정답이 있습니다.";
    return;
  }
  if (!KPuzzleAdmin.validHangulAnswer(hangul)) {
    els.addStatus.textContent = "정답은 한글 2–8자여야 합니다.";
    return;
  }
  if (!clue && !clueKo) {
    els.addStatus.textContent = "한글 또는 영어 질문을 적어 주세요.";
    return;
  }
  KPuzzleAdmin.setPatch(state.themeKey, topic.key, id, {
    added: true,
    clue,
    clueKo,
    hangul,
    tier: Number(els.addTier.value) || 1,
  });
  els.addId.value = "";
  els.addKo.value = "";
  els.addEn.value = "";
  els.addHangul.value = "";
  els.addStatus.textContent = "질문을 추가했습니다.";
  renderQuestions();
}

async function translateAddField(direction, options = {}) {
  const fromKo = direction === "ko-en";
  const source = (fromKo ? els.addKo.value : els.addEn.value).trim();
  const target = fromKo ? els.addEn : els.addKo;
  if (!source) return;
  if (options.onlyIfEmpty && target.value.trim()) return;
  target.value = await translateText(source, fromKo ? "ko" : "en", fromKo ? "en" : "ko");
}

async function translateRow(id, direction, options = {}) {
  const topic = currentTopic();
  const card = [...els.questionList.querySelectorAll(".q-card")].find((node) => node.dataset.id === id);
  if (!card) return;
  const ko = card.querySelector('[data-field="clueKo"]');
  const en = card.querySelector('[data-field="clue"]');
  const fromKo = direction === "ko-en";
  const source = (fromKo ? ko.value : en.value).trim();
  const target = fromKo ? en : ko;
  if (!source) {
    flashSaved(fromKo ? "한글 질문을 먼저 적어 주세요." : "영어 질문을 먼저 적어 주세요.");
    return;
  }
  const key = `${state.themeKey}:${topic.key}:${id}`;
  if (options.onlyIfEmptyOrAuto) {
    const current = target.value.trim();
    if (current && current !== (state.lastAutoEn[key] ?? "")) return;
  }
  const translated = await translateText(source, fromKo ? "ko" : "en", fromKo ? "en" : "ko");
  if (!translated) {
    flashSaved("번역에 실패했습니다. 다시 시도해 주세요.");
    return;
  }
  target.value = translated;
  if (fromKo) state.lastAutoEn[key] = translated;
  persistField(id, fromKo ? "clue" : "clueKo", translated);
  markCardDirty(card, true);
}

async function batchTranslate(direction) {
  if (state.batching) return;
  const topic = currentTopic();
  if (!topic) return;
  const fromKo = direction === "ko-en";
  const rows = KPuzzleAdmin.listTopicQuestions(state.themeKey, topic).filter((row) => {
    const source = fromKo ? row.clueKo : row.clue;
    const target = fromKo ? row.clue : row.clueKo;
    return source.trim() && !target.trim();
  });
  if (!rows.length) {
    els.batchStatus.textContent = fromKo ? "번역할 한글 빈칸이 없습니다." : "번역할 영어 빈칸이 없습니다.";
    return;
  }
  if (!confirm(`${topic.name}에서 ${rows.length}개 질문을 ${fromKo ? "영문" : "한글"}으로 번역할까요?`)) return;
  state.batching = true;
  let done = 0;
  try {
    for (const row of rows) {
      const source = fromKo ? row.clueKo : row.clue;
      els.batchStatus.textContent = `번역 중 ${done + 1}/${rows.length}…`;
      const translated = await translateText(source, fromKo ? "ko" : "en", fromKo ? "en" : "ko");
      if (translated) {
        KPuzzleAdmin.setPatch(state.themeKey, topic.key, row.id, {
          clue: row.clue,
          clueKo: row.clueKo,
          hangul: row.hangul,
          tier: row.tier,
          added: row.added || undefined,
          [fromKo ? "clue" : "clueKo"]: translated,
        });
      }
      done += 1;
      await wait(160);
    }
    els.batchStatus.textContent = `${done}개 번역을 저장했습니다.`;
    renderQuestions();
  } catch (error) {
    els.batchStatus.textContent = `번역이 중단되었습니다. (${done}개 완료)`;
    renderQuestions();
    console.error(error);
  } finally {
    state.batching = false;
  }
}

async function translateText(text, from, to) {
  const q = String(text ?? "").trim();
  if (!q) return "";
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("gtx");
    const data = await res.json();
    return (data[0] || []).map((part) => part[0]).join("").trim();
  } catch {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${from}|${to}`;
    const res = await fetch(url);
    const data = await res.json();
    const out = data?.responseData?.translatedText || "";
    if (!out) throw new Error("translate failed");
    return String(out).trim();
  }
}

function exportCurrentJs() {
  const pack = currentPack();
  download(`${pack.key === "k-pop" ? "topics-kpop" : "topics-kdrama"}.js`, KPuzzleAdmin.exportThemeSource(pack.varName, pack.key, pack.topics()));
  flashSaved("주제 JS 파일을 내려받았습니다. js/ 폴더에 덮어쓰면 원본에 반영됩니다.");
}

function exportAllJs() {
  THEME_PACKS.forEach((pack) => {
    download(`${pack.key === "k-pop" ? "topics-kpop" : "topics-kdrama"}.js`, KPuzzleAdmin.exportThemeSource(pack.varName, pack.key, pack.topics()));
  });
  flashSaved("K-POP / K-DRAMA JS 파일을 내려받았습니다.");
}

function exportJson() {
  download("k-puzzle-admin-patches.json", KPuzzleAdmin.exportPatches());
  flashSaved("수정 패치 JSON을 내려받았습니다.");
}

function onImportFile(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      KPuzzleAdmin.importPatches(String(reader.result));
      renderThemeTabs();
      renderTopicList();
      renderQuestions();
      flashSaved("패치를 가져왔습니다.");
    } catch (error) {
      flashSaved("가져오기에 실패했습니다. JSON 패치 파일인지 확인해 주세요.");
      console.error(error);
    }
  };
  reader.readAsText(file);
}

function resetTopic() {
  const topic = currentTopic();
  if (!topic) return;
  if (!confirm(`${topic.name} 수정 내용을 모두 되돌릴까요?`)) return;
  KPuzzleAdmin.clearTopic(state.themeKey, topic.key);
  renderQuestions();
}

function resetAll() {
  if (!confirm("모든 주제의 브라우저 수정 내용을 삭제할까요? 내려받지 않은 번역도 사라집니다.")) return;
  KPuzzleAdmin.clearAll();
  state.lastAutoEn = {};
  renderQuestions();
}

function download(name, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function flashSaved(message) {
  els.saveState.textContent = message;
}

function schedule(fn, key) {
  clearTimeout(state.translateTimer);
  state.translateTimer = setTimeout(fn, 700);
  return key;
}

function slugId(text) {
  const ascii = String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
  return ascii || `custom-${Date.now().toString(36)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
