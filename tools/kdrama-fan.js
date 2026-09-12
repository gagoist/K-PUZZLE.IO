/**
 * Topic-specific K-drama / movie fan facts only.
 */
const n = (id, clue, hangul, tier) =>
  tier ? [id, clue, hangul, tier] : [id, clue, hangul];

module.exports = {
  "squid-game": {
    facts: [
      n("set-island", "Main hidden setting: the island where the games are held", "무인도"),
      n("food-dalgona", "Honeycomb candy players must carve without breaking", "달고나"),
      n("line-kkam", "Word Il-nam and Gi-hun use for marble partners", "깐부"),
      n("line-peek", "Young-hee’s peekaboo word while players must freeze", "까꿍"),
      n("scene-umb", "The hardest dalgona shape everyone dreaded", "우산"),
      n("scene-doll", "The giant doll of Red Light, Green Light", "영희"),
      n("ost-pink", "The chilling march theme fans call Pink Soldiers", "핑크솔저"),
    ],
  },
  "winter-sonata": {
    facts: [
      n("set-chuncheon", "Gangwon city tied to the main setting", "춘천"),
      n("set-nami", "Island of the famous winter shooting scenes", "남이섬"),
      n("food-none", "Famous winter prop Jun-sang and Yu-jin build in the snow", "눈사람"),
      n("line-yonsama", "Japan’s nickname for Bae Yong-joon", "욘사마"),
      n("ost-fromstart", "Famous piano-led theme fans remember from the first snow", "처음부터"),
    ],
  },
  parasite: {
    facts: [
      n("set-banji", "The Kims’ semi-underground home", "반지하"),
      n("food-jjapa", "The mixed noodle dish the Parks ask for in a rush", "짜파구리", 2),
      n("scene-stair", "The long stairs that show the class gap", "계단"),
      n("scene-peach", "Fruit used to trigger an allergy", "복숭아"),
      n("scene-rock", "The scholar’s rock gifted to Ki-woo", "수석"),
    ],
  },
  cloy: {
    facts: [
      n("set-north", "Country where Se-ri crash-lands", "북한"),
      n("set-village", "The North Korean village that hides her", "마을"),
      n("ost-heart", "Famous OST: “Give You My Heart,” in Hangul", "마음을드려요", 3),
      n("line-seri", "What villagers and Jeong-hyeok often call Yoon Se-ri", "세리"),
      n("scene-para", "How Se-ri crosses the border by accident", "패러글라이딩", 3),
    ],
  },
  goblin: {
    facts: [
      n("set-house", "The shared house of the goblin and the grim reaper", "공유주택", 3),
      n("food-chicken", "The fried-chicken shop Sunny runs", "치킨"),
      n("ost-stay", "Hit OST “Stay With Me,” in Hangul", "스테이윗미", 2),
      n("line-goblin", "What Eun-tak calls Kim Shin", "도깨비"),
      n("scene-sword", "The blade stuck in the goblin’s chest", "칼날"),
    ],
  },
  dots: {
    facts: [
      n("set-uruk", "The fictional country they serve in", "우륵"),
      n("ost-everytime", "Hit OST “You Are My Everything,” in Hangul", "유어마이"),
      n("line-songsong", "Fan name for the Song Joong-ki / Song Hye-kyo couple", "송송커플", 2),
      n("scene-rank", "Yoo Shi-jin’s army rank", "대위"),
    ],
  },
  "itaewon-class": {
    facts: [
      n("set-itaewon", "Seoul neighborhood of the pub", "이태원"),
      n("food-soju", "Drink poured all night at Danbam", "소주"),
      n("line-danbam", "The pub Sae-ro-yi builds", "단밤"),
      n("ost-start", "Rock OST that plays over the revenge climb", "시작"),
    ],
  },
  vincenzo: {
    facts: [
      n("set-plaza", "The building Vincenzo protects", "금가플라자", 3),
      n("food-none", "What is hidden inside the plaza", "금괴"),
      n("line-theme", "Cha-young’s messy shout fans still quote — her office type", "법률사무소", 3),
      n("ost-adagio", "Italian-mood title OST fans remember, in Hangul", "아다지오", 2),
    ],
  },
  "cha-cha-cha": {
    facts: [
      n("set-gongjin", "The seaside village of the story", "공진"),
      n("set-sea", "What surrounds the village", "바다"),
      n("line-chief", "Du-sik’s unofficial village title", "이장"),
      n("ost-one", "Warm coastal OST fans hum after the ending", "갯마을"),
    ],
  },
  "attorney-woo": {
    facts: [
      n("set-court", "Where Young-woo argues her cases", "법정"),
      n("food-gimbap", "Lunch she is often seen with", "김밥"),
      n("line-whale", "The animal Young-woo loves", "고래"),
      n("ost-whale", "Gentle title OST tied to her whale drawings", "고래의꿈"),
    ],
  },
  "business-proposal": {
    facts: [
      n("set-office", "The company where the fake date starts", "회사"),
      n("line-contract", "The relationship they sign first", "계약연애", 2),
      n("ost-love", "Sweet title OST of the office romance", "사내맞선"),
    ],
  },
  "secretary-kim": {
    facts: [
      n("set-office", "The company Young-joon runs", "회사"),
      n("line-vice", "Young-joon’s rank", "부회장"),
      n("food-coffee", "What Mi-so is always pouring", "커피"),
      n("ost-love", "Bright rom-com OST from the secretary era", "김비서"),
    ],
  },
  "sky-castle": {
    facts: [
      n("set-gangnam", "Wealthy hillside neighborhood of the families", "스카이캐슬", 3),
      n("set-exam", "The war these families fight", "입시"),
      n("food-none", "The coordinator who promises SKY schools", "코디"),
      n("ost-castle", "Cold opening theme fans remember", "스카이"),
    ],
  },
  "reply-1988": {
    facts: [
      n("set-ssang", "The Seoul alley neighborhood of the five families", "쌍문동"),
      n("food-tteok", "Street snack the kids share on the brick steps", "떡볶이"),
      n("line-bong", "Choi Taek’s famous nickname from the neighborhood", "택이"),
      n("ost-youth", "Nostalgic word the title and OST keep returning to", "청춘"),
    ],
  },
  "hospital-playlist": {
    facts: [
      n("set-hospital", "The hospital where the five work", "율제"),
      n("food-chicken", "Ik-jun’s favorite late-night order", "치킨"),
      n("line-99", "The year they entered school together", "구구년"),
      n("ost-intro", "The friends’ band song that opens many episodes", "밤편지"),
    ],
  },
  kingdom: {
    facts: [
      n("set-joseon", "The dynasty in which the plague unfolds", "조선"),
      n("line-zombie", "The undead threat spreading from the palace", "좀비"),
      n("scene-palace", "Where the first cover-up begins", "왕궁"),
    ],
  },
  "the-glory": {
    facts: [
      n("set-school", "The school years that start Moon Dong-eun’s plan", "학교"),
      n("food-none", "The curling iron used in the famous bullying scene", "고데기"),
      n("ost-glory", "Dark revenge theme fans remember", "더글로리"),
    ],
  },
  "my-love-star": {
    facts: [
      n("set-seoul", "Modern city where the alien lives next door", "서울"),
      n("line-alien", "What Do Min-joon really is", "외계인"),
      n("ost-every", "Hit OST “My Destiny” / every moment — Korean title fans sing", "너의모든순간", 3),
      n("food-chicken", "Late-night food Cheon Song-yi is often eating", "치킨"),
    ],
  },
  "boys-over-flowers": {
    facts: [
      n("set-school", "The elite high school of the F4", "신화고"),
      n("line-f4", "The four rich boys’ club name", "에프포"),
      n("ost-sorry", "Hit OST “Because I’m Stupid,” in Hangul", "내가바보라서", 3),
    ],
  },
  signal: {
    facts: [
      n("set-radio", "The device that talks across years", "무전기"),
      n("line-past", "Where Jae-han still lives", "과거"),
      n("ost-signal", "Haunting title OST, in Hangul", "시그널"),
    ],
  },
  "its-okay": {
    facts: [
      n("set-house", "The hillside house-turned-care home", "우리집"),
      n("line-ok", "The title’s message, in two Hangul words fans quote", "괜찮아"),
      n("food-book", "Ko Moon-young’s famous job", "동화작가", 2),
    ],
  },
  "twenty-five": {
    facts: [
      n("set-fence", "Hee-do’s sport", "펜싱"),
      n("set-imf", "The crisis years of the story", "아이엠에프", 3),
      n("ost-youth", "Coming-of-age word the title holds", "청춘"),
    ],
  },
  "hotel-del-luna": {
    facts: [
      n("set-hotel", "The hotel that checks in ghosts", "호텔"),
      n("line-manwol", "IU’s character, the hotel’s owner", "장만월"),
      n("ost-hello", "Hit OST “Can You See My Heart” era — IU’s “Hello,” in Hangul", "안녕"),
    ],
  },
  alchemy: {
    facts: [
      n("set-dalian", "The fantasy land of the story", "나라"),
      n("line-mage", "Jang Uk’s forbidden power path", "술사"),
      n("ost-soul", "Fantasy title OST, in Hangul", "환혼"),
    ],
  },
  "queen-of-tears": {
    facts: [
      n("set-chaebol", "The Queens department-store family world", "퀸즈"),
      n("ost-tears", "Hit OST of the rainy-chaebol romance", "눈물의여왕", 2),
      n("food-german", "Country of a famous honeymoon / family trip", "독일"),
    ],
  },
  "lovely-runner": {
    facts: [
      n("set-time", "How Sol goes back to save Sun-jae", "타임슬립", 3),
      n("line-sunjae", "The idol Sol will not let die", "선재"),
      n("ost-sudden", "Hit OST “Sudden Shower,” in Hangul", "소나기"),
    ],
  },
  "dae-jang-geum": {
    facts: [
      n("set-joseon", "The dynasty of the palace kitchens", "조선"),
      n("food-court", "The palace kitchen Jang-geum masters", "수라간"),
      n("line-jang", "The heroine’s name, in Hangul", "장금"),
    ],
  },
  "mr-sunshine": {
    facts: [
      n("set-empire", "The dying years of Joseon / the Korean Empire", "대한제국", 2),
      n("set-ilje", "The foreign occupation closing in", "일제"),
      n("line-sun", "The English name the city gives Eugene, in Hangul", "션샤인"),
    ],
  },
  moving: {
    facts: [
      n("set-school", "Where the kids try to look normal", "학교"),
      n("scene-roof", "Famous fight above the gym", "옥상"),
      n("line-power", "What the parents secretly have", "능력"),
    ],
  },
  "all-of-us": {
    facts: [
      n("set-school", "The high school under siege", "학교"),
      n("line-zombie", "The outbreak inside the building", "좀비"),
      n("scene-alarm", "The morning broadcast that starts the panic", "방송"),
    ],
  },
  "weak-hero": {
    facts: [
      n("set-school", "The school of the fight-for-peace story", "학교"),
      n("line-sihwan", "The quiet transfer student’s name fans shout", "시은"),
    ],
  },
  "train-to-busan": {
    facts: [
      n("set-train", "Where most of the night takes place", "기차"),
      n("set-busan", "The city they are trying to reach", "부산"),
      n("line-zombie", "What fills the cars behind them", "좀비"),
    ],
  },
  oldboy: {
    facts: [
      n("set-room", "The private room of fifteen years", "감금"),
      n("food-octopus", "Famous live-octopus restaurant scene", "산낙지"),
      n("scene-hammer", "Dae-su’s hallway weapon", "해머"),
    ],
  },
  handmaiden: {
    facts: [
      n("set-mansion", "The Japanese-occupied mansion of the plot", "저택"),
      n("set-ilje", "The occupation era of the story", "일제"),
    ],
  },
  "memories-murder": {
    facts: [
      n("set-hwaseong", "The real city behind the case", "화성"),
      n("scene-rain", "Weather tied to the murders", "비오는날"),
      n("line-unsolved", "How the case felt for years", "미제"),
    ],
  },
  "the-host": {
    facts: [
      n("set-han", "The river the creature comes from", "한강"),
      n("line-monster", "What rises from the water", "괴물"),
    ],
  },
  "along-gods": {
    facts: [
      n("set-after", "The afterlife courtroom world", "저승"),
      n("line-seven", "The seven trials after death", "일곱"),
    ],
  },
  "miracle-cell": {
    facts: [
      n("set-cell", "The prison room of the title", "칠번방"),
      n("line-dad", "What Ye-sung’s father will do anything for", "딸아이"),
    ],
  },
  "my-sassy-girl": {
    facts: [
      n("set-seoul", "City of the campus romance", "서울"),
      n("line-odd", "The Korean title’s “bizarre girl”", "엽기"),
      n("scene-train", "Where they first collide", "지하철"),
    ],
  },
  "decision-leave": {
    facts: [
      n("set-mountain", "The foggy seaside town of the case", "이포"),
      n("line-widow", "Seo-rae’s role in the detective’s life", "미망인"),
    ],
  },
  "man-from-nowhere": {
    facts: [
      n("set-shop", "The pawnshop Cha Tae-sik runs", "전당포"),
      n("scene-chop", "The infamous hallway revenge weapon", "식칼"),
    ],
  },
  veteran: {
    facts: [
      n("set-seoul", "City of the detective vs chaebol chase", "서울"),
      n("line-seo", "The detective’s family name fans shout", "서도철"),
    ],
  },
  "extreme-job": {
    facts: [
      n("set-chicken", "The cover restaurant the cops open", "치킨집"),
      n("food-chicken", "The food that accidentally becomes a hit", "치킨"),
    ],
  },
  jsa: {
    facts: [
      n("set-panmun", "The border village of the shooting", "판문점"),
      n("line-north", "One side of the bridge", "북한"),
    ],
  },
  silenced: {
    facts: [
      n("set-school", "The school at the center of the case", "학교"),
      n("line-truth", "What the teachers try to tell", "진실"),
    ],
  },
  burning: {
    facts: [
      n("set-paju", "The outskirts town of the greenhouse mystery", "파주"),
      n("scene-well", "The unused well that haunts Jong-su", "우물"),
    ],
  },
  "ode-father": {
    facts: [
      n("set-busan", "The city the family flees to", "부산"),
      n("line-dad", "What the title celebrates", "아버지"),
    ],
  },
  "200-pounds": {
    facts: [
      n("set-shop", "The cake shop Hanna works in", "케이크집"),
      n("food-cake", "The sweets at the center of her new life", "케이크"),
    ],
  },
  peninsula: {
    facts: [
      n("set-incheon", "The ruined peninsula they return to", "인천"),
      n("line-zombie", "What still fills the streets", "좀비"),
    ],
  },
  "new-world": {
    facts: [
      n("set-gang", "The crime organization of the story", "조직"),
      n("line-brother", "The bond Ja-sung is ordered to break", "형제"),
    ],
  },
  "our-beloved-summer": {
    facts: [
      n("set-school", "Where Ung and Yeon-sook first filmed each other", "학교"),
      n("ost-summer", "Hit OST of the documentary-romance", "그해우리는", 2),
    ],
  },
  "true-beauty": {
    facts: [
      n("set-school", "The high school of the makeup secret", "학교"),
      n("line-makeup", "What Ju-gyeong hides behind", "화장"),
      n("ost-beauty", "Webtoon-drama title OST word", "여신강림"),
    ],
  },
  "start-up": {
    facts: [
      n("set-sandbox", "The startup campus in the story", "샌드박스", 2),
      n("ost-start", "Hit OST “Start Over,” in Hangul", "시작"),
    ],
  },
  penthouse: {
    facts: [
      n("set-tower", "The luxury tower of the title", "펜트하우스", 3),
      n("set-school", "The arts high school the children fight over", "청아예술", 2),
    ],
  },
  "my-name": {
    facts: [
      n("set-gang", "The crime family she infiltrates the police for", "동천파"),
      n("line-name", "What she hides to get revenge", "이름"),
    ],
  },
  stranger: {
    facts: [
      n("set-court", "The prosecutor’s world of the story", "검찰"),
      n("line-blink", "How Si-mok often answers", "침묵"),
    ],
  },
  "my-mister": {
    facts: [
      n("set-hill", "The hillside neighborhood of Dong-hoon’s family", "서울"),
      n("line-ajusshi", "What Ji-an calls Dong-hoon", "아저씨"),
    ],
  },
  "mr-queen": {
    facts: [
      n("set-joseon", "The dynasty the chef wakes up in", "조선"),
      n("line-chef", "The modern job that falls into a king’s body", "셰프"),
    ],
  },
  "flower-of-evil": {
    facts: [
      n("set-home", "The family house of the perfect husband", "우리집"),
      n("line-fake", "What Baek Hee-sung’s life is built on", "가짜"),
    ],
  },
  "beyond-evil": {
    facts: [
      n("set-manyang", "The lakeside town of the case", "만양"),
      n("line-lee", "The two detectives who share a family name", "이동"),
    ],
  },
  hellbound: {
    facts: [
      n("set-seoul", "City where the decrees appear", "서울"),
      n("line-angel", "The creatures that carry out the sentences", "천사"),
    ],
  },
  "sweet-home": {
    facts: [
      n("set-apt", "The apartment building under siege", "아파트"),
      n("line-monster", "What the residents begin to turn into", "괴물"),
    ],
  },
  "uncanny-counter": {
    facts: [
      n("set-noodle", "The noodle shop that hides the counters", "국수집"),
      n("line-demon", "What they hunt at night", "악귀"),
    ],
  },
  happiness: {
    facts: [
      n("set-apt", "The new apartment sealed in quarantine", "아파트"),
      n("line-virus", "What spreads through the building", "바이러스", 2),
    ],
  },
  "my-demon": {
    facts: [
      n("set-chaebol", "The company Jeong Gu-won is contracted into", "재벌"),
      n("line-demon", "What Gu-won really is", "악마"),
    ],
  },
  "tale-nine-tailed": {
    facts: [
      n("set-seoul", "Modern city the gumiho walks", "서울"),
      n("line-fox", "Lee Yeon’s true form", "구미호"),
    ],
  },
  healer: {
    facts: [
      n("set-night", "When the night courier works", "심야"),
      n("line-healer", "Seo Jung-hoo’s underground job name", "힐러"),
    ],
  },
  "coffee-prince": {
    facts: [
      n("set-cafe", "The cafe of the title", "커피프린스", 3),
      n("food-coffee", "What they serve all day", "커피"),
    ],
  },
  "secret-garden": {
    facts: [
      n("set-stunt", "Gil-ra’s job in the entertainment world", "스턴트", 2),
      n("line-switch", "The magic that swaps their bodies", "영혼교환", 2),
    ],
  },
  "the-heirs": {
    facts: [
      n("set-school", "The elite high school of the heirs", "제국제고", 2),
      n("ost-heirs", "Hit OST of the chaebol-teen romance", "상속자들", 2),
    ],
  },
  "dream-high": {
    facts: [
      n("set-school", "The performing-arts high school", "기린예고"),
      n("line-dream", "What every student is chasing", "가수꿈"),
    ],
  },
  "reply-1994": {
    facts: [
      n("set-sinsa", "The Seoul boarding house of the 1994 friends", "신촌"),
      n("food-rice", "The 1994 Seoul boarding house of the friends", "하숙집"),
    ],
  },
  "camellia-blooms": {
    facts: [
      n("set-ongsan", "The small town of the single mother", "옹산"),
      n("line-dongbaek", "The heroine’s name, also a flower", "동백"),
    ],
  },
  "world-of-married": {
    facts: [
      n("set-home", "The family house that falls apart", "우리집"),
      n("line-lie", "What the marriage is built on", "거짓말"),
    ],
  },
  "liberation-notes": {
    facts: [
      n("set-sanpo", "The hometown the siblings return to", "산포"),
      n("line-free", "The title’s wish", "자유"),
    ],
  },
  "twinkling-watermelon": {
    facts: [
      n("set-time", "How Eun-gyeol meets his young parents", "타임슬립", 3),
      n("food-melon", "The fruit in the title", "수박"),
      n("line-band", "The family band at the heart of the story", "밴드"),
    ],
  },
  tangerines: {
    facts: [
      n("set-jeju", "The island of Ae-sun and Gwan-sik’s life", "제주"),
      n("food-tangerine", "The fruit in the English title", "감귤"),
    ],
  },
  "when-phone-rings": {
    facts: [
      n("set-home", "The politician’s house of the threatening calls", "우리집"),
      n("line-call", "What keeps ringing at the worst time", "전화"),
    ],
  },
  "love-next-door": {
    facts: [
      n("set-home", "The neighborhood the childhood friends return to", "고향"),
      n("line-next", "Who lives next door", "이웃"),
    ],
  },
  hierarchy: {
    facts: [
      n("set-school", "The elite high school of the ranking war", "학교"),
      n("line-rank", "What every student is fighting over", "서열"),
    ],
  },
  "mask-girl": {
    facts: [
      n("set-office", "Kim Mo-mi’s daytime job world", "회사"),
      n("line-mask", "What she wears when she sings online", "가면"),
    ],
  },
  "reborn-rich": {
    facts: [
      n("set-chaebol", "The family he is reborn into", "재벌"),
      n("line-reborn", "What happens after his death in the first life", "환생"),
    ],
  },
  "little-women": {
    facts: [
      n("set-sisters", "The three sisters at the center", "자매"),
      n("line-money", "What pulls them into a rich family’s secret", "재산"),
    ],
  },
  "our-blues": {
    facts: [
      n("set-jeju", "The island of the linked stories", "제주"),
      n("line-blue", "The feeling in the title", "블루스"),
    ],
  },
  "doom-service": {
    facts: [
      n("set-life", "What Myul-mang collects for a living", "목숨"),
      n("line-doom", "The cafe of endings", "멸망카페"),
    ],
  },
  "romance-bonus": {
    facts: [
      n("set-pub", "The publishing house of the story", "출판사"),
      n("line-book", "What Kang Dan-i edits", "소설"),
    ],
  },
  "something-rain": {
    facts: [
      n("set-office", "The company where Jun-hee and Jin-ah meet again", "회사"),
      n("line-rain", "The weather tied to their second start", "장마"),
    ],
  },
  snowdrop: {
    facts: [
      n("set-1987", "The year of the campus hostage story", "팔칠년"),
      n("set-school", "The women’s dorm at the center", "기숙사"),
    ],
  },
  "judge-from-hell": {
    facts: [
      n("set-court", "Where the judge from hell works by day", "법정"),
      n("line-hell", "Where she also belongs", "지옥"),
    ],
  },
  "the-wailing": {
    facts: [
      n("set-gokseong", "The mountain town of the curse", "곡성"),
      n("line-shaman", "The ritual that may be a trap", "굿판"),
    ],
  },
  "taxi-driver": {
    facts: [
      n("set-gwangju", "The city the taxi drives into in 1980", "광주"),
      n("line-taxi", "Man-seob’s job", "택시"),
    ],
  },
  "roaring-currents": {
    facts: [
      n("set-myeong", "The strait of the famous battle", "명량"),
      n("line-yi", "The admiral’s family name", "이순신"),
    ],
  },
  snowpiercer: {
    facts: [
      n("set-train", "The train that never stops", "기차"),
      n("line-tail", "The poorest cars at the back", "꼬리칸"),
    ],
  },
  okja: {
    facts: [
      n("set-farm", "The mountain farm where Mija raises Okja", "산속농장"),
      n("line-pig", "What Okja is", "슈퍼돼지"),
    ],
  },
  "i-saw-the-devil": {
    facts: [
      n("set-road", "The long revenge road of the agent", "추격"),
      n("line-devil", "What he says he saw", "악마"),
    ],
  },
  "lady-vengeance": {
    facts: [
      n("set-bakery", "The cake shop Geum-ja runs", "케이크집"),
      n("food-cake", "What she bakes between plans", "케이크"),
    ],
  },
  "the-chaser": {
    facts: [
      n("set-seoul", "City of the night chase", "서울"),
      n("line-girl", "Who the ex-detective is trying to find", "여인"),
    ],
  },
  exhuma: {
    facts: [
      n("set-grave", "What the shamans and geomancer open", "무덤"),
      n("line-cut", "The ritual of digging", "파묘"),
    ],
  },
  "the-roundup": {
    facts: [
      n("set-seoul", "City of Ma Seok-do’s busts", "서울"),
      n("line-ma", "The detective’s name fans shout", "마석도"),
    ],
  },
  "space-sweepers": {
    facts: [
      n("set-space", "Where the junk ship Victory works", "우주"),
      n("line-ship", "The crew’s ship", "승리호"),
    ],
  },
};

const MORE = {
  "our-beloved-summer": [
    n("char-ung", "Choi Woong’s Hangul given name", "웅"),
    n("actor-kim", "Kim Da-mi, who played Yeon-sook — Hangul name", "김다미"),
    n("scene-docu", "The student documentary that brings them back together", "다큐"),
    n("line-first", "What they were to each other in high school", "첫사랑"),
    n("set-sea", "The seaside town they film again as adults", "바다"),
  ],
  "true-beauty": [
    n("char-jugyeong", "The heroine who hides behind makeup", "주경"),
    n("actor-moon", "Moon Ga-young, who played Ju-gyeong — Hangul name", "문가영"),
    n("line-webtoon", "The comic the series adapts", "웹툰"),
    n("char-suhosu", "The male lead’s Hangul name", "수호"),
  ],
  "start-up": [
    n("char-dalmi", "The heroine who builds a startup", "달미"),
    n("actor-suzy", "Bae Suzy, who played Dal-mi — Hangul name", "배수지"),
    n("line-sandbox", "The startup campus nickname", "샌드박스", 2),
    n("char-dosan", "Nam Do-san’s Hangul given name", "도산"),
    n("line-app", "The kind of company they try to build", "스타트업", 2),
  ],
  penthouse: [
    n("char-cheon", "Cheon Seo-jin’s Hangul family+given name", "천서진"),
    n("actor-kimso", "Kim So-yeon, who played Seo-jin — Hangul name", "김소연"),
    n("line-voice", "The arts-school skill the children fight over", "성악"),
    n("scene-fall", "The rooftop that keeps returning in the plot", "옥상"),
  ],
  "my-name": [
    n("char-momi", "The heroine’s Hangul name", "모미"),
    n("actor-han", "Han So-hee, who played Yoon Ji-woo — Hangul name", "한소희"),
    n("line-cop", "The job she takes to infiltrate", "경찰"),
    n("scene-train", "Where she trains to become someone else", "체육관"),
  ],
  stranger: [
    n("char-simok", "The prosecutor who answers with a blink", "시목"),
    n("actor-cho", "Cho Seung-woo, who played Si-mok — Hangul name", "조승우"),
    n("line-case", "The first case that starts the season", "사건"),
    n("set-office", "The prosecutors’ office", "검찰청"),
    n("line-truth", "What Si-mok keeps chasing", "진실"),
  ],
  "my-mister": [
    n("char-donghoon", "Park Dong-hoon’s Hangul name", "동훈"),
    n("char-jian", "Lee Ji-an’s Hangul name", "지안"),
    n("actor-iu", "IU, who played Ji-an — Hangul name", "아이유"),
    n("actor-lee", "Lee Sun-kyun, who played Dong-hoon — Hangul name", "이선균"),
    n("line-wound", "The shared feeling between the two leads", "상처"),
    n("set-house", "The hillside house of Dong-hoon’s family", "언덕집"),
    n("scene-roof", "The rooftop where Dong-hoon and Ji-an sit without much talk", "옥상"),
    n("drink-mix", "The cheap instant drink they share on late nights", "믹스커피"),
  ],
  "mr-queen": [
    n("char-chef", "The modern chef who wakes in a king’s body", "장봉환"),
    n("actor-shin", "Shin Hye-sun, who played the queen — Hangul name", "신혜선"),
    n("food-cook", "What the chef keeps doing in the palace", "요리"),
    n("line-king", "The body she wakes up in", "왕"),
    n("scene-court", "The palace hall of the farce", "대궐"),
  ],
  "flower-of-evil": [
    n("char-heesung", "The husband hiding a past", "희성"),
    n("actor-lee", "Lee Joon-gi, who played Hee-sung — Hangul name", "이준기"),
    n("line-cop", "His wife’s job", "형사"),
    n("scene-garden", "The greenhouse of childhood memories", "온실"),
  ],
  "beyond-evil": [
    n("char-dongsik", "Lee Dong-sik’s Hangul name", "동식"),
    n("actor-shin", "Shin Ha-kyun, who played Dong-sik — Hangul name", "신하균"),
    n("line-lake", "The water beside Manyang", "호수"),
    n("line-sister", "The missing person at the start of the case", "누나"),
  ],
  hellbound: [
    n("char-angel", "The beings that appear before a death", "천사"),
    n("line-newtruth", "The cult that uses the decrees", "새진리회"),
    n("actor-yoo", "Yoo Ah-in, who played Jung Jin-soo — Hangul name", "유아인"),
    n("scene-street", "Where the first decree is carried out", "거리"),
  ],
  "sweet-home": [
    n("char-hyunsu", "The boy who moves into the doomed building", "현수"),
    n("actor-song", "Song Kang, who played Hyun-su — Hangul name", "송강"),
    n("line-webtoon", "The comic the series adapts", "웹툰"),
    n("scene-stair", "The stairwell everyone tries to hold", "계단"),
  ],
  "uncanny-counter": [
    n("char-soohyeok", "The high-school boy who joins the counters", "수혁"),
    n("actor-jo", "Jo Byung-gyu, who played Soo-hyeok — Hangul name", "조병규"),
    n("line-count", "The team’s job name", "카운터"),
    n("food-noodle", "What they serve in the shop by day", "국수"),
    n("scene-night", "When they hunt", "심야"),
  ],
  happiness: [
    n("char-saebom", "The officer locked inside the building", "새봄"),
    n("actor-han", "Han Hyo-joo, who played Sae-bom — Hangul name", "한효주"),
    n("line-lock", "What the city does to the building", "봉쇄"),
    n("scene-roof", "Where survivors try to signal out", "옥상"),
  ],
  "my-demon": [
    n("char-dohee", "The contract-marriage heroine", "도희"),
    n("actor-kim", "Kim Yoo-jung, who played Do-hee — Hangul name", "김유정"),
    n("line-deal", "The deal that keeps Gu-won on earth", "계약"),
    n("scene-crash", "How they first meet on the road", "사고"),
  ],
  "tale-nine-tailed": [
    n("char-yeon", "The gumiho’s Hangul name", "이연"),
    n("actor-lee", "Lee Dong-wook, who played Lee Yeon — Hangul name", "이동욱"),
    n("line-tv", "Ah-eum’s job", "피디"),
    n("scene-mountain", "Where the fox clan once lived", "백두산"),
  ],
  healer: [
    n("char-junghoo", "The night courier’s real Hangul name", "정후"),
    n("actor-ji", "Ji Chang-wook, who played Healer — Hangul name", "지창욱"),
    n("line-news", "Young-shin’s job", "기자"),
    n("scene-bike", "How he moves across the city at night", "오토바이"),
  ],
  "coffee-prince": [
    n("char-euny", "The woman who dresses as a man to work", "은찬"),
    n("actor-gong", "Gong Yoo, who played Han-gyul — Hangul name", "공유"),
    n("line-boss", "Han-gyul’s role in the cafe", "사장"),
    n("scene-apron", "What the staff wear behind the counter", "앞치마"),
  ],
  "secret-garden": {
    facts: [
      n("char-gilra", "The stuntwoman’s Hangul name", "길라"),
      n("actor-ha", "Ha Ji-won, who played Gil-ra — Hangul name", "하지원"),
      n("line-ceo", "Kim Joo-won’s job", "사장"),
    ],
  },
};

// secret-garden was wrongly nested - fix below
delete MORE["secret-garden"];
MORE["secret-garden"] = [
  n("char-gilra", "The stuntwoman’s Hangul name", "길라"),
  n("actor-ha", "Ha Ji-won, who played Gil-ra — Hangul name", "하지원"),
  n("line-ceo", "Kim Joo-won’s job", "사장"),
  n("ost-secret", "Hit OST of the body-switch romance", "시크릿가든", 3),
];
MORE["the-heirs"] = [
  n("char-kimtan", "The heir’s Hangul name", "김탄"),
  n("actor-lee", "Lee Min-ho, who played Kim Tan — Hangul name", "이민호"),
  n("line-poor", "Cha Eun-sang’s family situation", "가난"),
  n("set-home", "The mansion of the heir", "저택"),
];
MORE["dream-high"] = [
  n("char-humi", "Suzy’s character Hangul name", "훈이"),
  n("actor-suzy", "Suzy, who played a transfer student — Hangul name", "수지"),
  n("line-idol", "What the school trains students to become", "아이돌"),
];
MORE["reply-1994"] = [
  n("char-najung", "The heroine whose first love is a mystery", "나정"),
  n("actor-go", "Go Ara, who played Na-jung — Hangul name", "고아라"),
  n("line-trash", "The trash-like housemate who was the answer", "쓰레기"),
  n("set-busan", "Na-jung’s hometown", "부산"),
];
MORE["camellia-blooms"] = [
  n("char-dongbaek", "The single mother’s Hangul name", "동백"),
  n("actor-gong", "Gong Hyo-jin, who played Dong-baek — Hangul name", "공효진"),
  n("line-cop", "Yong-sik’s job", "경찰"),
  n("food-store", "The village shop Dong-baek keeps", "가게"),
];
MORE["world-of-married"] = [
  n("char-jihyo", "The wife’s Hangul name", "지효"),
  n("actor-kim", "Kim Hee-ae, who played Ji-sun — Hangul name", "김희애"),
  n("line-affair", "The secret that breaks the house", "외도"),
];
MORE["liberation-notes"] = [
  n("char-yeom", "The family name of the three siblings", "염"),
  n("actor-kim", "Kim Ji-won, who played Yeom Mi-jeong — Hangul name", "김지원"),
  n("line-job", "Mi-jeong’s tired office life", "회사"),
  n("scene-bus", "The bus home to Sanpo", "버스"),
];
MORE["twinkling-watermelon"] = [
  n("char-eungyeol", "The boy who time-slips into 1995", "은결"),
  n("actor-ryu", "Ryeoun, who played Eun-gyeol — Hangul name", "려운"),
  n("line-deaf", "What his father cannot do", "청각"),
  n("hobby-guitar", "The instrument that ties the family", "기타"),
];
MORE.tangerines = [
  n("char-aesun", "The heroine’s Hangul name", "애순"),
  n("actor-iu", "IU, who played Ae-sun — Hangul name", "아이유"),
  n("line-boat", "Gwan-sik’s work on the water", "배"),
  n("scene-field", "The island fields of their youth", "감귤밭"),
];
MORE["when-phone-rings"] = [
  n("char-heejoo", "The heroine who cannot hear", "희주"),
  n("actor-yoo", "Yoo Yeon-seok, who played the politician — Hangul name", "유연석"),
  n("line-sign", "How they often talk", "수어"),
];
MORE["love-next-door"] = [
  n("char-seokryu", "The heroine who comes home", "석류"),
  n("actor-jung", "Jung Hae-in, who played the neighbor — Hangul name", "정해인"),
  n("food-house", "The family house next door", "옆집"),
];
MORE.hierarchy = [
  n("char-kangin", "The transfer student shaking the ranking", "강인"),
  n("actor-roh", "Roh Jeong-eui, who played Jae-i — Hangul name", "노정의"),
  n("line-rich", "What the school worships", "재력"),
];
MORE["mask-girl"] = [
  n("char-momi", "The office worker who sings in a mask", "모미"),
  n("actor-go", "Go Hyun-jung, who played the older Mo-mi — Hangul name", "고현정"),
  n("line-live", "The online stage she hides on", "라이브"),
];
MORE["reborn-rich"] = [
  n("char-dowon", "The man reborn as the chaebol’s youngest", "도원"),
  n("actor-song", "Song Joong-ki, who played Do-won — Hangul name", "송중기"),
  n("line-stock", "How he uses future knowledge", "주식"),
];
MORE["little-women"] = [
  n("char-inju", "The eldest sister’s Hangul name", "인주"),
  n("actor-kim", "Kim Go-eun, who played In-ju — Hangul name", "김고은"),
  n("line-rich", "The family whose money they touch", "재벌"),
];
MORE["our-blues"] = [
  n("char-eunhui", "One of the island women at the center", "은희"),
  n("actor-kim", "Kim Woo-bin, who played a diving instructor — Hangul name", "김우빈"),
  n("food-sea", "What haenyeo pull from the water", "해녀"),
];
MORE["doom-service"] = [
  n("char-myul", "The collector of lives", "멸망"),
  n("actor-seo", "Seo In-guk, who played Myul-mang — Hangul name", "서인국"),
  n("line-life", "What he takes at the appointed time", "목숨"),
];
MORE["romance-bonus"] = [
  n("char-dani", "The editor who returns to publishing", "단이"),
  n("actor-lee", "Lee Jong-suk, who played the novelist — Hangul name", "이종석"),
  n("line-book", "What Cha Eun-ho writes", "소설"),
];
MORE["something-rain"] = [
  n("char-jinah", "The older woman at the office", "진아"),
  n("actor-son", "Son Ye-jin, who played Jin-ah — Hangul name", "손예진"),
  n("line-younger", "Jun-hee’s age gap word fans used", "연하"),
];
MORE.snowdrop = [
  n("char-yeongro", "The student in the 1987 dorm", "영로"),
  n("actor-jisoo", "Jisoo, who played Yeong-ro — Hangul name", "지수"),
  n("set-year", "The year of the campus hostage story", "팔칠년"),
  n("line-agent", "What the wounded man in the dorm really is", "요원"),
  n("line-hostage", "What the locked dorm becomes after he is found", "인질극"),
  n("set-uni", "The women’s university campus of the 1987 story", "여대"),
];
MORE["judge-from-hell"] = [
  n("char-bitna", "The judge from hell’s Hangul name", "빛나"),
  n("actor-park", "Park Shin-hye, who played Bit-na — Hangul name", "박신혜"),
  n("line-demon", "What she is after dark", "악마"),
];
MORE["the-wailing"] = [
  n("char-jonggoo", "The policeman in Gokseong", "종구"),
  n("actor-kwak", "Kwak Do-won, who played Jong-goo — Hangul name", "곽도원"),
  n("line-stranger", "The Japanese stranger in the woods", "이방인"),
];
MORE["taxi-driver"] = [
  n("char-manseob", "The taxi driver’s Hangul name", "만섭"),
  n("actor-song", "Song Kang-ho, who played Man-seob — Hangul name", "송강호"),
  n("line-german", "The nationality of the reporter in the back seat", "독일"),
];
MORE["roaring-currents"] = [
  n("char-sunsin", "The admiral’s Hangul name", "이순신"),
  n("actor-choi", "Choi Min-sik, who played Yi Sun-sin — Hangul name", "최민식"),
  n("line-ship", "The turtle ships of the battle", "거북선"),
];
MORE.snowpiercer = [
  n("char-namgoong", "Song Kang-ho’s security-man character", "남궁민수"),
  n("actor-song", "Song Kang-ho in the tail-section fight — Hangul name", "송강호"),
  n("line-front", "The rich cars they try to reach", "앞칸"),
];
MORE.okja = [
  n("char-mija", "The girl who raised Okja", "미자"),
  n("actor-ahn", "Ahn Seo-hyun, who played Mija — Hangul name", "안서현"),
  n("line-corp", "The company that wants Okja", "기업"),
];
MORE["i-saw-the-devil"] = [
  n("char-soo", "The agent on the revenge road", "수현"),
  n("actor-lee", "Lee Byung-hun, who played the agent — Hangul name", "이병헌"),
  n("line-killer", "The man he hunts", "살인마"),
];
MORE["lady-vengeance"] = [
  n("char-geumja", "The woman who leaves prison with a plan", "금자"),
  n("actor-lee", "Lee Young-ae, who played Geum-ja — Hangul name", "이영애"),
  n("line-kind", "The Korean title’s first word", "친절한"),
];
MORE["the-chaser"] = [
  n("char-eungil", "The ex-detective’s Hangul name", "응길"),
  n("actor-kim", "Kim Yoon-seok, who played Eung-il — Hangul name", "김윤석"),
  n("line-night", "When the chase happens", "심야"),
];
MORE.exhuma = [
  n("char-hwa", "The geomancer’s Hangul name", "화림"),
  n("actor-choi", "Choi Min-sik, who played the geomancer — Hangul name", "최민식"),
  n("line-shaman", "The ritual pair who open the grave", "무당"),
];
MORE["the-roundup"] = [
  n("char-ma", "The detective’s Hangul name", "마석도"),
  n("actor-ma", "Ma Dong-seok, who played Ma Seok-do — Hangul name", "마동석"),
  n("line-fist", "How he usually finishes a bust", "주먹"),
];
MORE["space-sweepers"] = [
  n("char-taeho", "The captain of Victory", "태호"),
  n("actor-song", "Song Joong-ki, who played Tae-ho — Hangul name", "송중기"),
  n("line-kid", "The child they find in the junk", "아이"),
];

for (const [key, rows] of Object.entries(MORE)) {
  if (!module.exports[key]) module.exports[key] = { facts: [] };
  module.exports[key].facts = [...(module.exports[key].facts || []), ...rows];
}
