const fs = require("fs");
const path = require("path");
const { kpopShared, dramaShared } = require("./lexicon");
const kpopFacts = require("./kpop-facts");
const kdramaFacts = require("./kdrama-facts");

const HANGUL = /^[가-힣]+$/;

function kindItem(topic) {
  const map = {
    "girl-group": ["girl-group", `${topic.name} is this kind of act`, "걸그룹", 2],
    "boy-group": ["boy-group", `${topic.name} is this kind of act`, "보이그룹", 2],
    solo: ["solo-act", `${topic.name} is this kind of act`, "솔로가수", 2],
    drama: ["kind-drama", `${topic.name} is a Korean series`, "드라마", 2],
    movie: ["kind-movie", `${topic.name} is a Korean film`, "영화"],
  };
  return map[topic.kind] ?? null;
}

function expandKpop(topic) {
  const items = [];
  items.push(["self", `The act known as ${topic.name}`, topic.hangul, 2]);
  if (topic.fandom) items.push(["fandom-name", topic.fandom[1], topic.fandom[0], topic.fandom[2]]);
  if (topic.agency) items.push(["agency-name", topic.agency[1], topic.agency[0], topic.agency[2]]);
  if (topic.count) items.push(["member-count", topic.count[1], topic.count[0], topic.count[2]]);
  const kind = kindItem(topic);
  if (kind) items.push(kind);
  for (const [eng, hangul, tier] of topic.members ?? []) {
    items.push([
      `m-${eng.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      `${topic.name} member ${eng}, in Hangul`,
      hangul,
      tier,
    ]);
  }
  for (const [eng, hangul, tier] of topic.songs ?? []) {
    items.push([
      `s-${eng.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      `${topic.name} title: “${eng}”`,
      hangul,
      tier ?? 2,
    ]);
  }
  for (const extra of topic.extra ?? []) items.push(extra);
  return items;
}

function expandDrama(topic) {
  const items = [];
  items.push(["self", `The title ${topic.name}, in Hangul`, topic.hangul, 2]);
  const kind = kindItem(topic);
  if (kind) items.push(kind);
  for (const [eng, hangul, tier] of topic.people ?? []) {
    items.push([
      `c-${eng.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      `${topic.name} character ${eng}`,
      hangul,
      tier,
    ]);
  }
  for (const [eng, hangul, tier] of topic.actors ?? []) {
    items.push([
      `a-${eng.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      `Star of ${topic.name}: ${eng}`,
      hangul,
      tier ?? 2,
    ]);
  }
  for (const extra of topic.extra ?? []) items.push(extra);
  return items;
}

function addItem(bucket, used, seenId, item) {
  if (!item) return;
  const [id, clue, hangul, tier = 1] = item;
  if (!id || !clue || !hangul) return;
  if (seenId.has(id)) return;
  if (!HANGUL.test(hangul)) return;
  const len = [...hangul].length;
  if (len < 2 || len > 8) return;
  if (used.has(hangul)) return;
  seenId.add(id);
  used.add(hangul);
  bucket.push(tier === 1 ? [id, clue, hangul] : [id, clue, hangul, tier]);
}

function assemble(topic, uniqueItems, shared) {
  const items = [];
  const used = new Set();
  const seenId = new Set();
  uniqueItems.forEach((item) => addItem(items, used, seenId, item));
  shared.forEach((row) => {
    const [id, clue, hangul, tier] = row;
    addItem(items, used, seenId, [id, clue.replaceAll("{name}", topic.name), hangul, tier]);
  });
  const beginner = items.filter((item) => [...item[2]].length <= 4 && (item[3] ?? 1) <= 2).length;
  return { items, beginner };
}

function emit(varName, topics) {
  const body = topics
    .map((topic) => {
      const lines = topic.items.map((item) => `      ${JSON.stringify(item)}`).join(",\n");
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

function buildSide(facts, expand, shared, label) {
  const out = [];
  const problems = [];
  for (const topic of facts) {
    const { items, beginner } = assemble(topic, expand(topic), shared);
    if (items.length < 100) problems.push(`${label}/${topic.key}: ${items.length} items`);
    if (beginner < 20) problems.push(`${label}/${topic.key}: beginner ${beginner}`);
    const keys = new Set(out.map((t) => t.key));
    if (keys.has(topic.key)) problems.push(`${label} duplicate key ${topic.key}`);
    out.push({
      key: topic.key,
      name: topic.name,
      hangul: topic.hangul,
      blurb: topic.blurb,
      items: items.slice(0, 100),
    });
  }
  if (facts.length !== 50) problems.push(`${label} topic count ${facts.length} (want 50)`);
  return { out, problems };
}

function main() {
  const kpop = buildSide(kpopFacts, expandKpop, kpopShared(), "k-pop");
  const drama = buildSide(kdramaFacts, expandDrama, dramaShared(), "k-drama");
  const problems = [...kpop.problems, ...drama.problems];
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exitCode = 1;
  }

  const jsRoot = path.join(__dirname, "..", "js");
  fs.writeFileSync(path.join(jsRoot, "topics-kpop.js"), emit("KPOP_TOPICS", kpop.out), "utf8");
  fs.writeFileSync(path.join(jsRoot, "topics-kdrama.js"), emit("KDRAMA_TOPICS", drama.out), "utf8");
  console.log(`k-pop ${kpop.out.length} topics, k-drama ${drama.out.length} topics`);
  console.log(problems.length ? "wrote with errors" : "ok");
}

main();
