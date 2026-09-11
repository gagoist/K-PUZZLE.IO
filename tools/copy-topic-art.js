const fs = require("fs");
const path = require("path");

const srcDir = "C:/Users/JP/.cursor/projects/d-JP-World-WEB-K-PUZZLE-IO/assets";
const dstDir = path.join(__dirname, "..", "img", "topics");

const kpop = [
  "twice","bts","blackpink","newjeans","stray-kids","seventeen","exo","aespa",
  "ive","le-sserafim","gidle","red-velvet","itzy","txt","enhypen","ateez",
  "nct-127","nct-dream","iu","psy","snsd","bigbang","shinee","super-junior",
  "two-ne1","mamamoo","got7","treasure","zb1","riize","babymonster","illit",
  "nmixx","stayc","the-boyz","monsta-x","winner","ikon","two-pm","tvxq",
  "boa","taeyeon","g-dragon","hyuna","oh-my-girl","apink","fx","wonder-girls",
  "kiss-of-life","boynextdoor","random-k-pop",
];
const kdrama = [
  "squid-game","winter-sonata","parasite","cloy","goblin","dots","itaewon-class",
  "vincenzo","cha-cha-cha","attorney-woo","business-proposal","secretary-kim",
  "sky-castle","reply-1988","hospital-playlist","kingdom","the-glory","my-love-star",
  "boys-over-flowers","signal","its-okay","twenty-five","hotel-del-luna","alchemy",
  "queen-of-tears","lovely-runner","dae-jang-geum","mr-sunshine","moving","all-of-us",
  "weak-hero","train-to-busan","oldboy","handmaiden","memories-murder","the-host",
  "along-gods","miracle-cell","my-sassy-girl","decision-leave","man-from-nowhere",
  "veteran","extreme-job","jsa","silenced","burning","ode-father","200-pounds",
  "peninsula","new-world","random-k-drama",
];

fs.mkdirSync(dstDir, { recursive: true });

const wanted = [...kpop, ...kdrama];
const missing = [];
const copied = [];

for (const key of wanted) {
  const from = path.join(srcDir, `topic-${key}.png`);
  const to = path.join(dstDir, `${key}.png`);
  if (!fs.existsSync(from)) {
    missing.push(key);
    continue;
  }
  fs.copyFileSync(from, to);
  copied.push(key);
}

console.log(`copied ${copied.length}/${wanted.length}`);
if (missing.length) console.log("missing:", missing.join(", "));
