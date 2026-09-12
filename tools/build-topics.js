const fs = require("fs");
const path = require("path");
const kpopFacts = require("./kpop-facts");
const kdramaFacts = require("./kdrama-facts");
const kpopFan = require("./kpop-fan");
const kdramaFan = require("./kdrama-fan");

function loadLore(name) {
  try {
    return require(`./${name}`);
  } catch {
    return {};
  }
}

const kpopLore = Object.assign({}, loadLore("kpop-lore-a"), loadLore("kpop-lore-b"));
const kdramaLore = Object.assign({}, loadLore("kdrama-lore-a"), loadLore("kdrama-lore-b"));
const { FAMOUS_PEERS } = kpopFan;

const HANGUL = /^[가-힣]+$/;
const DROP_EXTRA = new Set([
  "netflix", "tvn", "kbs", "sbs", "mbc", "jtbc", "ena", "disney", "amazon",
  "ost-love", "ost-stay", "hallyu-start", "romance",
]);

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-|-$/g, "") || "x";
}

function parseNamed(row) {
  const [eng, hangul, a, b] = row;
  let tier = 1;
  let clue = "";
  if (typeof a === "number") {
    tier = a;
    if (typeof b === "string") clue = b;
  } else if (typeof a === "string") {
    clue = a;
  }
  return { eng, hangul, tier, clue };
}

function pushRow(items, row) {
  if (!row || !Array.isArray(row) || row.length < 3) return;
  const [id, clue, hangul] = row;
  if (!id || !clue || !hangul) return;
  if (DROP_EXTRA.has(id)) return;
  items.push(row);
}

function peerQuestions(topic) {
  const fan = kpopFan[topic.key];
  const year = fan?.debut;
  if (!year) return [];
  const others = FAMOUS_PEERS.filter((peer) => peer.key !== topic.key && peer.year !== year);
  const older = others.filter((peer) => peer.year < year).sort((a, b) => b.year - a.year)[0];
  const younger = others.filter((peer) => peer.year > year).sort((a, b) => a.year - b.year)[0];
  const out = [];
  if (older) {
    out.push([
      "vs-junior",
      `${topic.name} debuted in ${year}. Compared with ${older.name} (${older.year}), is ${topic.name} the senior (선배) or the junior (후배)?`,
      "후배",
    ]);
  }
  if (younger) {
    out.push([
      "vs-senior",
      `${topic.name} debuted in ${year}. Compared with ${younger.name} (${younger.year}), is ${topic.name} the senior (선배) or the junior (후배)?`,
      "선배",
    ]);
  }
  return out;
}

function loreKeep(lore, side) {
  const items = [];
  if (side === "drama" && Array.isArray(lore.era) && lore.era.length >= 2) {
    if (HANGUL.test(lore.era[0])) {
      items.push(["era", `Main era / setting of the story: ${lore.era[1]}`, lore.era[0], lore.era[2] ?? 2]);
    } else {
      items.push(lore.era);
    }
  }
  for (const row of lore.programs ?? []) {
    if (Array.isArray(row) && HANGUL.test(row[0]) && typeof row[1] === "string") {
      items.push([`prog-${slug(row[0])}`, `${row[1]} — Hangul title of this show`, row[0], row[2] ?? 2]);
    }
  }
  for (const row of lore.quotes ?? []) {
    if (Array.isArray(row) && HANGUL.test(row[0]) && typeof row[1] === "string") {
      items.push([`line-${slug(row[0])}`, `${row[1]} — write that Hangul word`, row[0], row[2] ?? 2]);
    }
  }
  for (const extra of lore.extras ?? []) {
    if (Array.isArray(extra) && extra[0] && !DROP_EXTRA.has(extra[0])) items.push(extra);
  }
  return items;
}

function expandKpop(topic) {
  const lore = kpopLore[topic.key] || {};
  const fan = kpopFan[topic.key] || {};
  const items = [];

  items.push(["self", `Hangul spelling of the group / artist name ${topic.name}`, topic.hangul, 2]);

  if (topic.fandom) {
    items.push([
      "fandom-name",
      `Official ${topic.name} fan-club / fandom name, in Hangul`,
      topic.fandom[0],
      topic.fandom[2],
    ]);
  }
  if (topic.agency) {
    items.push([
      "agency-name",
      `Hangul name of the agency that manages ${topic.name}`,
      topic.agency[0],
      topic.agency[2],
    ]);
  }
  if (topic.count) {
    items.push([
      "member-count",
      `How many members does ${topic.name} have now? Write the Korean number word, not a digit`,
      topic.count[0],
      topic.count[2],
    ]);
  }

  const nameHint = {
    "bts:V": "V’s Korean given name (Taehyung), in Hangul — not the letter V",
    "bts:Jin": "Jin’s Korean given name (Seokjin), in Hangul",
    "bts:RM": "Hangul spelling of RM",
    "bts:J-Hope": "Hangul spelling of J-Hope",
  };

  for (const row of topic.members ?? []) {
    const member = parseNamed(row);
    items.push([
      `m-${slug(member.eng)}`,
      nameHint[`${topic.key}:${member.eng}`] || `Hangul name of ${topic.name} member ${member.eng}`,
      member.hangul,
      member.tier,
    ]);
  }

  for (const row of topic.songs ?? []) {
    const song = parseNamed(row);
    items.push([
      `s-${slug(song.eng)}`,
      `Hangul title of ${topic.name}’s song “${song.eng}”`,
      song.hangul,
      song.tier || 2,
    ]);
  }

  for (const extra of topic.extra ?? []) pushRow(items, extra);
  for (const extra of fan.facts ?? []) pushRow(items, extra);
  for (const extra of peerQuestions(topic)) pushRow(items, extra);
  for (const extra of loreKeep(lore, "kpop")) pushRow(items, extra);
  return items;
}

function expandDrama(topic) {
  const lore = kdramaLore[topic.key] || {};
  const fan = kdramaFan[topic.key] || {};
  const items = [];

  items.push(["self", `Hangul title of ${topic.name}`, topic.hangul, 2]);

  for (const row of topic.people ?? []) {
    const person = parseNamed(row);
    items.push([
      `c-${slug(person.eng)}`,
      `${person.eng} in ${topic.name} — Hangul name of this character`,
      person.hangul,
      person.tier,
    ]);
  }

  for (const row of topic.actors ?? []) {
    const actor = parseNamed(row);
    items.push([
      `a-${slug(actor.eng)}`,
      `${actor.eng}, who starred in ${topic.name} — Hangul name`,
      actor.hangul,
      actor.tier || 2,
    ]);
  }

  for (const extra of topic.extra ?? []) pushRow(items, extra);
  for (const extra of fan.facts ?? []) pushRow(items, extra);
  for (const extra of loreKeep(lore, "drama")) pushRow(items, extra);
  return items;
}

function addItem(bucket, used, seenId, item) {
  if (!item) return;
  const [id, clue, hangul, tier = 1, clueKo = ""] = item;
  if (!id || !clue || !hangul) return;
  if (seenId.has(id)) return;
  if (!HANGUL.test(hangul)) return;
  const len = [...hangul].length;
  if (len < 2 || len > 8) return;
  if (used.has(hangul)) return;
  seenId.add(id);
  used.add(hangul);
  const row = [id, clue, hangul];
  if (tier !== 1 || clueKo) row.push(tier);
  if (clueKo) row.push(clueKo);
  bucket.push(row);
}

function assemble(topic, uniqueItems) {
  const items = [];
  const used = new Set();
  const seenId = new Set();
  uniqueItems.forEach((item) => addItem(items, used, seenId, item));
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

function buildSide(facts, expand, label) {
  const out = [];
  const problems = [];
  for (const topic of facts) {
    const { items, beginner } = assemble(topic, expand(topic));
    if (items.length < 18) problems.push(`${label}/${topic.key}: ${items.length} items`);
    if (beginner < 6) problems.push(`${label}/${topic.key}: beginner ${beginner}`);
    const keys = new Set(out.map((t) => t.key));
    if (keys.has(topic.key)) problems.push(`${label} duplicate key ${topic.key}`);
    out.push({
      key: topic.key,
      name: topic.name,
      hangul: topic.hangul,
      blurb: topic.blurb,
      items,
    });
  }
  if (facts.length !== 100) problems.push(`${label} topic count ${facts.length} (want 100)`);
  return { out, problems };
}

function main() {
  const kpop = buildSide(kpopFacts, expandKpop, "k-pop");
  const drama = buildSide(kdramaFacts, expandDrama, "k-drama");
  const problems = [...kpop.problems, ...drama.problems];
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exitCode = 1;
  }

  const jsRoot = path.join(__dirname, "..", "js");
  fs.writeFileSync(path.join(jsRoot, "topics-kpop.js"), emit("KPOP_TOPICS", kpop.out), "utf8");
  fs.writeFileSync(path.join(jsRoot, "topics-kdrama.js"), emit("KDRAMA_TOPICS", drama.out), "utf8");
  const kMin = Math.min(...kpop.out.map((t) => t.items.length));
  const dMin = Math.min(...drama.out.map((t) => t.items.length));
  const kAvg = Math.round(kpop.out.reduce((s, t) => s + t.items.length, 0) / kpop.out.length);
  const dAvg = Math.round(drama.out.reduce((s, t) => s + t.items.length, 0) / drama.out.length);
  console.log(`k-pop ${kpop.out.length} topics (min ${kMin}, avg ${kAvg})`);
  console.log(`k-drama ${drama.out.length} topics (min ${dMin}, avg ${dAvg})`);
  console.log(problems.length ? "wrote with errors" : "ok");
}

main();
