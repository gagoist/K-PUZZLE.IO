/**
 * Topic-specific K-pop fan facts only.
 * No generic vocabulary. Every clue must point at that act.
 */
const n = (id, clue, hangul, tier) =>
  tier ? [id, clue, hangul, tier] : [id, clue, hangul];

module.exports = {
  twice: {
    debut: 2015,
    facts: [
      n("nick-dubu", "Dahyun’s famous nickname — Korean for tofu", "두부"),
      n("nick-penguin", "Mina’s famous nickname — the quiet animal fans call her", "펭귄"),
      n("sport-tzuyu", "School sport Tzuyu is known for from her student years in Taiwan", "농구"),
      n("sport-momo", "Team activity Momo competed in as a student in Japan", "치어"),
      n("hobby-chaeyoung", "Chaeyoung’s well-known hobby: she draws her own merch art", "그림"),
      n("hobby-jeongyeon", "Jeongyeon’s well-known talent in the dorm, often shown on variety", "요리"),
      n("hobby-mina", "The art Mina trained in for years before debut", "발레"),
      n("nation-jp", "Home country of TWICE’s Japanese line (Momo, Sana, Mina)", "일본"),
      n("nation-tw", "Tzuyu’s home country / region", "대만"),
      n("real-jihyo", "Jihyo’s real Korean name", "박지효"),
      n("real-nayeon", "Nayeon’s real Korean name", "임나연"),
      n("album-cheer", "2016 mini album whose title track is CHEER UP", "페이지투"),
      n("var-dahyun", "Saturday letter-game show Dahyun is famous for", "놀라운토요일"),
      n("var-nayeon", "JTBC variety where Nayeon became a long-time regular", "아는형님"),
    ],
  },
  bts: {
    debut: 2013,
    facts: [
      n("nick-golden", "Jungkook’s famous nickname: the golden maknae", "황금막내", 2),
      n("nick-worldwide", "Jin’s famous nickname: Worldwide Handsome, in short Hangul fans use", "월드와이드"),
      n("sport-jk", "Combat sport Jungkook is often seen training in on variety", "복싱"),
      n("hobby-jin", "Jin’s well-known hobby: cooking for the members", "요리"),
      n("hobby-v", "V’s well-known hobby: taking photos", "사진"),
      n("hobby-rm", "RM’s well-known hobby: reading and collecting art", "독서"),
      n("real-rm", "RM’s real Korean name", "김남준"),
      n("real-suga", "SUGA’s real Korean name", "민윤기"),
      n("real-jhope", "J-Hope’s real Korean name", "정호석"),
      n("real-v", "V’s real Korean name", "김태형"),
      n("real-jin", "Jin’s real Korean name", "김석진"),
      n("real-jk", "Jungkook’s real Korean name", "전정국"),
      n("album-dope", "2015 album era whose title track is Dope (쩔어)", "화양연화", 2),
      n("album-bst", "2016 album whose title track is Blood Sweat & Tears", "윙스"),
      n("album-persona", "2019 album whose title track is Boy With Luv", "페르소나", 2),
      n("var-suga", "SUGA’s interview show where he talks with guests over drinks", "슈취타"),
      n("var-jin", "Jin’s solo variety series he hosts after service", "오늘의석진", 2),
      n("work-v", "Historical drama V starred in as a Hwarang youth", "화랑"),
      n("stick", "Official BTS light-stick name", "아미밤"),
    ],
  },
  blackpink: {
    debut: 2016,
    facts: [
      n("nation-lisa", "Lisa’s home country", "태국"),
      n("nation-rose", "Country Rosé grew up in (she was born in New Zealand)", "호주"),
      n("real-rose", "Rosé’s Korean name", "박채영"),
      n("real-lisa", "Lisa’s given name, in Hangul", "라리사", 2),
      n("real-jennie", "Jennie’s full Korean name", "김제니"),
      n("real-jisoo", "Jisoo’s full Korean name", "김지수"),
      n("hobby-rose", "Instrument Rosé is famous for playing", "기타"),
      n("hobby-jennie", "Jennie’s well-known off-stage world: fashion and this pet name fans know", "카이"),
      n("album-hyllt", "2020 full album that includes How You Like That", "더앨범"),
      n("album-pv", "2022 album whose title tracks include Pink Venom", "본핑크"),
      n("work-jisoo", "Jisoo’s first lead drama, a 1987 political romance", "설강화"),
      n("work-jennie", "The Black Label hip-hop actress project Jennie led in 2024, in Hangul", "더아이돌"),
    ],
  },
  newjeans: {
    debut: 2022,
    facts: [
      n("nick-bunny", "Animal in the official NewJeans fandom name", "토끼"),
      n("nation-hanni", "Hanni’s home country", "호주"),
      n("nation-danielle", "Danielle’s home country", "호주"),
      n("real-minji", "Minji’s full Korean name", "김민지"),
      n("real-haerin", "Haerin’s full Korean name", "강해린"),
      n("real-hyein", "Hyein’s full Korean name", "이혜인"),
      n("album-getup", "2023 album whose title tracks include Super Shy and ETA", "겟업"),
      n("album-nwjns", "2022 debut EP that includes Attention and Hype Boy", "뉴진스"),
    ],
  },
  "stray-kids": {
    debut: 2018,
    facts: [
      n("nick-skz", "Short nickname fans use for Stray Kids", "스키즈"),
      n("nation-chan", "Bang Chan’s home country", "호주"),
      n("nation-felix", "Felix’s home country", "호주"),
      n("real-leeknow", "Lee Know’s real Korean name", "이민호"),
      n("real-han", "HAN’s real Korean name", "한지성"),
      n("real-in", "I.N’s real Korean name", "양정인"),
      n("hobby-leeknow", "Lee Know’s well-known love: these house animals", "고양이", 2),
      n("hobby-seungmin", "Seungmin’s well-known sport fandom, often mentioned on variety", "야구"),
      n("unit-3r", "In-house producing unit of Bang Chan, Changbin, and HAN", "쓰리라차", 3),
      n("album-godmenu", "2020 album whose title track is God’s Menu (신메뉴)", "고라이브"),
      n("album-maxident", "2022 album whose title track is Case 143", "맥시던트", 2),
    ],
  },
  seventeen: {
    debut: 2015,
    facts: [
      n("nick-horang", "Hoshi’s tiger-love greeting CARATs copy with a hand heart", "호랑해"),
      n("nation-jun", "Jun’s home country", "중국"),
      n("nation-the8", "The8’s home country", "중국"),
      n("nation-joshua", "Joshua’s home country", "미국"),
      n("real-coups", "S.Coups’s real Korean name", "최승철"),
      n("real-hoshi", "Hoshi’s real Korean name", "권순영"),
      n("real-woozi", "Woozi’s real Korean name", "이지훈"),
      n("real-dk", "DK’s real Korean name", "이석민"),
      n("hobby-mingyu", "Mingyu’s well-known dorm talent on variety", "요리"),
      n("hobby-wonwoo", "Wonwoo’s well-known hobby, often teased by members", "게임"),
      n("var-going", "SEVENTEEN’s own long-running variety series", "고잉세븐틴", 2),
      n("var-seungkwan", "JTBC variety where Seungkwan became a regular", "아는형님"),
      n("album-fml", "2023 album whose title tracks include Super and Hot", "에프엠엘"),
      n("unit-bss", "Vocal unit of Seungkwan, DK, and Hoshi", "부석순"),
    ],
  },
  exo: {
    debut: 2012,
    facts: [
      n("nation-lay", "Lay’s home country", "중국"),
      n("real-do", "D.O.’s real Korean name", "도경수"),
      n("real-kai", "Kai’s real Korean name", "김종인"),
      n("real-suho", "Suho’s real Korean name", "김준면"),
      n("real-chen", "Chen’s real Korean name", "김종대"),
      n("real-xiumin", "Xiumin’s real Korean name", "김민석"),
      n("hobby-chanyeol", "Instrument Chanyeol is famous for playing", "기타"),
      n("work-do", "D.O. historical romance: a man who must marry within 100 days", "백일의낭군님", 3),
      n("album-growl", "2013 album era whose Korean title track is Growl (으르렁)", "엑소더스", 3),
      n("album-monster", "2016 album whose title track is Monster", "이그잭트"),
    ],
  },
  aespa: {
    debut: 2020,
    facts: [
      n("nation-giselle", "Giselle’s home country", "일본"),
      n("nation-ning", "Ningning’s home country", "중국"),
      n("real-karina", "Karina’s real Korean name", "유지민"),
      n("real-winter", "Winter’s real Korean name", "김민정"),
      n("hobby-winter", "Winter’s well-known love of these pets", "고양이", 2),
      n("world-kwangya", "The virtual world in aespa’s storyline", "광야"),
      n("album-savage", "2021 mini album whose title track is Savage", "새비지"),
      n("album-armageddon", "2024 album whose title tracks include Supernova and Armageddon", "아마겟돈", 2),
    ],
  },
  ive: {
    debut: 2021,
    facts: [
      n("nation-rei", "Rei’s home country", "일본"),
      n("real-yujin", "An Yujin’s full Korean name", "안유진"),
      n("real-wonyoung", "Jang Wonyoung’s full Korean name", "장원영"),
      n("real-gaeul", "Gaeul’s full Korean name", "김가을"),
      n("album-lovedive", "2022 single album whose title track is LOVE DIVE", "러브다이브"),
      n("show-izone", "The Produce group Yujin and Wonyoung were in before IVE", "아이즈원", 2),
    ],
  },
  "le-sserafim": {
    debut: 2022,
    facts: [
      n("nation-sakura", "Sakura’s home country", "일본"),
      n("nation-kazuha", "Kazuha’s home country", "일본"),
      n("nation-yunjin", "Country Yunjin grew up in", "미국"),
      n("real-chaewon", "Chaewon’s full Korean name", "김채원"),
      n("real-eunchae", "Eunchae’s full Korean name", "홍은채"),
      n("sport-kazuha", "The art Kazuha trained in professionally before debut", "발레"),
      n("show-izone", "The Produce group Sakura and Chaewon were in before LE SSERAFIM", "아이즈원", 2),
      n("album-fearless", "2022 debut album whose title track is FEARLESS", "피어리스"),
    ],
  },
  gidle: {
    debut: 2018,
    facts: [
      n("nation-minnie", "Minnie’s home country", "태국"),
      n("nation-yuqi", "Yuqi’s home country", "중국"),
      n("nation-shuhua", "Shuhua’s home country / region", "대만"),
      n("real-soyeon", "Soyeon’s full Korean name", "전소연"),
      n("real-miyeon", "Miyeon’s full Korean name", "조미연"),
      n("hobby-soyeon", "Soyeon’s famous in-house job besides rap: she writes and produces", "작곡"),
      n("var-yuqi", "Yuqi’s own variety / talk series fans call Yuqi-ne", "우기네"),
      n("album-tomboy", "2022 album whose title track is TOMBOY", "아이러브"),
    ],
  },
  "red-velvet": {
    debut: 2014,
    facts: [
      n("real-irene", "Irene’s real Korean name", "배주현"),
      n("real-seulgi", "Seulgi’s real Korean name", "강슬기"),
      n("real-wendy", "Wendy’s Korean name", "손승완"),
      n("real-joy", "Joy’s real Korean name", "박수영"),
      n("real-yeri", "Yeri’s real Korean name", "김예림"),
      n("nation-wendy", "Country Wendy lived in before joining SM", "캐나다", 2),
      n("work-joy", "Hit historical romance Joy starred in as a Joseon court lady", "옷소매붉은끝동", 3),
      n("hobby-seulgi", "Seulgi’s well-known love of these foods / cooking clips", "요리"),
      n("album-redflavor", "2017 summer album whose title track is Red Flavor", "썸머매직", 2),
    ],
  },
  itzy: {
    debut: 2019,
    facts: [
      n("real-yeji", "Yeji’s full Korean name", "황예지"),
      n("real-ryujin", "Ryujin’s full Korean name", "신류진"),
      n("real-yuna", "Yuna’s full Korean name", "신유나"),
      n("real-chaeryeong", "Chaeryeong’s full Korean name", "이채령"),
      n("hobby-yeji", "Yeji’s well-known pre-debut training focus, her main role", "댄스"),
      n("album-wannabe", "2020 album whose title track is WANNABE", "잇즈미"),
    ],
  },
  txt: {
    debut: 2019,
    facts: [
      n("nation-kai", "Huening Kai’s family home country besides Korea, in Hangul", "미국"),
      n("real-yeonjun", "Yeonjun’s full Korean name", "최연준"),
      n("real-soobin", "Soobin’s full Korean name", "최수빈"),
      n("real-beomgyu", "Beomgyu’s full Korean name", "최범규"),
      n("hobby-beomgyu", "Instrument Beomgyu is often seen playing", "기타"),
      n("hobby-taehyun", "Taehyun’s well-known hobby: working out", "운동"),
      n("album-crown", "2019 debut album whose title track is Crown", "꿈의장"),
    ],
  },
  enhypen: {
    debut: 2020,
    facts: [
      n("nation-jay", "Jay’s home country besides Korea", "미국"),
      n("nation-jake", "Jake’s home country", "호주"),
      n("nation-niki", "Ni-ki’s home country", "일본"),
      n("real-heeseung", "Heeseung’s full Korean name", "이희승"),
      n("real-sunghoon", "Sunghoon’s full Korean name", "박성훈"),
      n("sport-sunghoon", "The ice sport Sunghoon trained in before debut", "피겨"),
      n("show-iland", "Survival show that formed ENHYPEN", "아일랜드", 3),
      n("album-border", "2020 debut album whose title track is Given-Taken", "데이원"),
    ],
  },
  ateez: {
    debut: 2018,
    facts: [
      n("real-hongjoong", "Hongjoong’s full Korean name", "김홍중"),
      n("real-san", "San’s full Korean name", "최산"),
      n("real-jongho", "Jongho’s full Korean name", "최종호"),
      n("hobby-hongjoong", "Hongjoong’s well-known in-house job: he produces", "작곡"),
      n("album-pirate", "Early treasure-era title whose Korean name is Pirate King", "해적왕"),
    ],
  },
  "nct-127": {
    debut: 2016,
    facts: [
      n("nation-yuta", "Yuta’s home country", "일본"),
      n("nation-johnny", "Johnny’s home country", "미국"),
      n("nation-mark", "Mark’s home country", "캐나다", 2),
      n("real-taeyong", "Taeyong’s full Korean name", "이태용"),
      n("real-doyoung", "Doyoung’s full Korean name", "김동영"),
      n("real-jaehyun", "Jaehyun’s full Korean name", "정재현"),
      n("hobby-mark", "Mark’s well-known off-stage habit: he writes raps in this language", "영어"),
      n("album-cherry", "2017 album whose title track is Cherry Bomb", "체리밤"),
    ],
  },
  "nct-dream": {
    debut: 2016,
    facts: [
      n("nation-renjun", "Renjun’s home country", "중국"),
      n("nation-chenle", "Chenle’s home country", "중국"),
      n("nation-mark", "Mark’s home country", "캐나다", 2),
      n("real-jeno", "Jeno’s full Korean name", "이제노"),
      n("real-jaemin", "Jaemin’s full Korean name", "나재민"),
      n("real-jisung", "Jisung’s full Korean name", "박지성"),
      n("album-hotsauce", "2021 album whose Korean title is 맛 (Hot Sauce)", "맛"),
    ],
  },
  iu: {
    debut: 2008,
    facts: [
      n("real-iu", "IU’s real Korean name", "이지은"),
      n("hobby-iu", "IU’s well-known love of writing lyrics in a diary style", "작사"),
      n("work-deluna", "Drama: a hotel that checks in ghosts, run by a Goryeo princess", "호텔델루나", 3),
      n("work-mister", "Drama: a locksmith and an injured woman in a hillside neighborhood", "나의아저씨", 2),
      n("var-palette", "IU’s YouTube talk series where she sings with guests", "팔레트"),
      n("album-lilac", "2021 album whose title track is Lilac", "라일락"),
    ],
  },
  psy: {
    debut: 2001,
    facts: [
      n("real-psy", "PSY’s real Korean name", "박재상"),
      n("dance-horse", "The 2012 dance everyone copied from Gangnam Style", "말춤"),
      n("place-gangnam", "Seoul district named in PSY’s biggest hit", "강남"),
    ],
  },
  snsd: {
    debut: 2007,
    facts: [
      n("real-taeyeon", "Taeyeon’s full Korean name", "김태연"),
      n("real-yoona", "Yoona’s full Korean name", "임윤아"),
      n("real-tiffany", "Tiffany’s Korean name", "황미영"),
      n("nation-tiffany", "Country Tiffany grew up in", "미국"),
      n("nation-sunny", "Country Sunny spent part of her youth in", "미국"),
      n("work-yoona", "Yoona’s famous KBS drama about a princess in modern Seoul", "사랑비"),
      n("album-gee", "2009 album whose title track is Gee", "지"),
    ],
  },
  bigbang: {
    debut: 2006,
    facts: [
      n("real-gd", "G-Dragon’s real Korean name", "권지용"),
      n("real-top", "T.O.P’s real Korean name", "최승현"),
      n("real-taeyang", "Taeyang’s real Korean name", "동영배"),
      n("hobby-gd", "G-Dragon’s well-known off-stage world besides music", "패션"),
      n("album-fantastic", "2012 album whose title track is Fantastic Baby", "살아있다", 2),
    ],
  },
  shinee: {
    debut: 2008,
    facts: [
      n("real-onyx", "Onew’s real Korean name", "이진기"),
      n("real-key", "Key’s real Korean name", "김기범"),
      n("real-minho", "Minho’s real Korean name", "최민호"),
      n("real-taemin", "Taemin’s full Korean name", "이태민"),
      n("sport-minho", "The school sport Minho is known for", "축구"),
      n("album-replay", "2008 debut song’s Korean title", "누난너무예뻐", 3),
    ],
  },
  "super-junior": {
    debut: 2005,
    facts: [
      n("real-leeteuk", "Leeteuk’s real Korean name", "박정수"),
      n("real-heechul", "Heechul’s real Korean name", "김희철"),
      n("real-eunhyuk", "Eunhyuk’s real Korean name", "이혁재"),
      n("var-heechul", "Long-running variety Heechul is famous for hosting / appearing on", "아는형님"),
      n("album-sorry", "2007 hit whose Korean title fans shout", "쏘리쏘리"),
    ],
  },
  "two-ne1": {
    debut: 2009,
    facts: [
      n("real-cl", "CL’s Korean name", "이채린"),
      n("real-bom", "Park Bom’s full Korean name", "박봄"),
      n("real-dara", "Dara’s Korean name", "산다라박", 2),
      n("nation-dara", "Country Dara grew up in besides Korea", "필리핀", 2),
      n("album-fire", "2009 title track Fire’s Korean shout", "파이어"),
    ],
  },
  mamamoo: {
    debut: 2014,
    facts: [
      n("real-solar", "Solar’s real Korean name", "김용선"),
      n("real-moonbyul", "Moonbyul’s real Korean name", "문별이"),
      n("real-wheein", "Wheein’s real Korean name", "정휘인"),
      n("real-hwasa", "Hwasa’s real Korean name", "안혜진"),
      n("var-hwasa", "Hwasa’s own talk / music show", "화사쇼"),
      n("album-umoh", "2015 breakout title Um Oh Ah Yeh, in Hangul", "음오아예"),
    ],
  },
  got7: {
    debut: 2014,
    facts: [
      n("nation-jackson", "Jackson’s home region", "홍콩"),
      n("nation-bambam", "BamBam’s home country", "태국"),
      n("nation-mark", "Mark’s home country", "미국"),
      n("real-jb", "JB’s real Korean name", "임재범"),
      n("real-jinyoung", "Jinyoung’s real Korean name", "박진영"),
      n("work-jinyoung", "Jinyoung’s hit coming-of-age drama about a fencer and a reporter", "스물다섯스물하나", 3),
    ],
  },
  treasure: {
    debut: 2020,
    facts: [
      n("nation-yoshi", "Yoshi’s home country", "일본"),
      n("nation-haruto", "Haruto’s home country", "일본"),
      n("real-hyunsuk", "Choi Hyunsuk’s full Korean name", "최현석"),
      n("real-jaehyuk", "Jaehyuk’s full Korean name", "윤재혁"),
      n("show-ygb", "YG survival show that formed TREASURE", "와이지보물상자", 3),
    ],
  },
  zb1: {
    debut: 2023,
    facts: [
      n("nation-hao", "Zhang Hao’s home country", "중국"),
      n("nation-matthew", "Seok Matthew’s home country", "캐나다", 2),
      n("nation-ricky", "Ricky’s home country", "중국"),
      n("real-hanbin", "Sung Hanbin’s full Korean name", "성한빈"),
      n("show-bpz", "Mnet survival show that formed ZEROBASEONE", "보이즈플래닛", 3),
    ],
  },
  riize: {
    debut: 2023,
    facts: [
      n("nation-shotaro", "Shotaro’s home country", "일본"),
      n("real-wonbin", "Wonbin’s full Korean name", "박원빈"),
      n("real-sohee", "Sohee’s full Korean name", "이소희"),
      n("album-getaguitar", "2023 debut song Get A Guitar, in Hangul", "겟어기타", 2),
    ],
  },
  babymonster: {
    debut: 2023,
    facts: [
      n("nation-ruka", "Ruka’s home country", "일본"),
      n("nation-asa", "Asa’s home country", "일본"),
      n("nation-pharita", "Pharita’s home country", "태국"),
      n("nation-chiquita", "Chiquita’s home country", "태국"),
      n("real-rora", "Rora’s Korean name", "이루아"),
      n("real-ahyeon", "Ahyeon’s full Korean name", "정아현"),
    ],
  },
  illit: {
    debut: 2024,
    facts: [
      n("nation-iroha", "Iroha’s home country", "일본"),
      n("real-yunah", "Yunah’s full Korean name", "노윤아"),
      n("real-minju", "Minju’s full Korean name", "이민주"),
      n("real-wonhee", "Wonhee’s full Korean name", "이원희"),
      n("album-magnetic", "2024 debut title Magnetic, in Hangul", "마그네틱", 2),
    ],
  },
  nmixx: {
    debut: 2022,
    facts: [
      n("nation-lily", "Lily’s home country", "호주"),
      n("real-haewon", "Haewon’s full Korean name", "오해원"),
      n("real-sullyoon", "Sullyoon’s full Korean name", "설윤아"),
      n("album-o-o", "2022 debut title O.O, in Hangul", "오오"),
    ],
  },
  stayc: {
    debut: 2020,
    facts: [
      n("real-seeun", "Seeun’s full Korean name", "윤세은"),
      n("real-sieun", "Sieun’s full Korean name", "배시은"),
      n("real-isa", "Isa’s Korean name", "이채영"),
      n("album-asap", "2021 hit ASAP, in Hangul", "아삽"),
    ],
  },
  "the-boyz": {
    debut: 2017,
    facts: [
      n("nation-jacob", "Jacob’s home country", "캐나다", 2),
      n("nation-kevin", "Kevin’s home country", "캐나다", 2),
      n("real-juyeon", "Juyeon’s full Korean name", "이주연"),
      n("real-younghoon", "Younghoon’s full Korean name", "김영훈"),
      n("real-new", "New’s real Korean name", "최찬희"),
      n("real-q", "Q’s real Korean name", "지창민"),
    ],
  },
  "monsta-x": {
    debut: 2015,
    facts: [
      n("nation-i-m", "I.M’s Korean name is Changkyun; this is his stage line — Hangul for his real given name", "창균"),
      n("real-shownu", "Shownu’s real Korean name", "손현우"),
      n("real-minhyuk", "Minhyuk’s real Korean name", "이민혁"),
      n("real-kihyun", "Kihyun’s real Korean name", "유기현"),
      n("real-hyungwon", "Hyungwon’s real Korean name", "채형원"),
      n("real-jooheon", "Joohoney’s real Korean name", "이주헌"),
    ],
  },
  winner: {
    debut: 2014,
    facts: [
      n("real-jinu", "Jinu’s real Korean name", "김진우"),
      n("real-seunghoon", "Lee Seunghoon’s full Korean name", "이승훈"),
      n("real-minho", "Song Minho’s full Korean name", "송민호"),
      n("hobby-minho", "MINO’s well-known art hobby besides rap", "그림"),
    ],
  },
  ikon: {
    debut: 2015,
    facts: [
      n("real-jay", "Jay’s real Korean name", "김지누"),
      n("real-bobby", "Bobby’s Korean name", "김병재"),
      n("real-dk", "DK’s real Korean name", "김동혁"),
      n("real-ju-ne", "Ju-ne’s real Korean name", "구준회"),
      n("real-chan", "Chan’s real Korean name", "정찬우"),
    ],
  },
  "two-pm": {
    debut: 2008,
    facts: [
      n("real-junho", "Junho’s full Korean name", "이준호"),
      n("real-taecyeon", "Taecyeon’s full Korean name", "옥택연"),
      n("real-wooyoung", "Wooyoung’s full Korean name", "장우영"),
      n("nation-taecyeon", "Country Taecyeon grew up in", "미국"),
      n("work-taecyeon", "Drama where Taecyeon played a chaebol heir opposite Vincenzo’s world — Hangul for Vincenzo’s rival name he played? Skip. Use: sports romance Handsome Guys era — instead: 'The K2' bodyguard drama", "더케이투"),
    ],
  },
  tvxq: {
    debut: 2003,
    facts: [
      n("real-yunho", "Yunho’s full Korean name", "정윤호"),
      n("real-changmin", "Changmin’s full Korean name", "심창민"),
      n("album-mirotic", "2008 title Mirotic’s Korean name", "주문"),
    ],
  },
  boa: {
    debut: 2000,
    facts: [
      n("real-boa", "BoA’s full Korean name", "권보아"),
      n("nation-jp", "Country where BoA became a huge star besides Korea", "일본"),
      n("album-no1", "2002 hit No.1, in Hangul", "넘버원"),
    ],
  },
  taeyeon: {
    debut: 2015,
    facts: [
      n("real-taeyeon", "Taeyeon’s full Korean name", "김태연"),
      n("group-snsd", "The girl group Taeyeon leads", "소녀시대", 2),
      n("album-fine", "2017 ballad Fine, in Hangul", "파인"),
    ],
  },
  "g-dragon": {
    debut: 2009,
    facts: [
      n("real-gd", "G-Dragon’s real Korean name", "권지용"),
      n("group-bb", "The YG group G-Dragon leads", "빅뱅"),
      n("hobby-fashion", "G-Dragon’s well-known field besides music", "패션"),
    ],
  },
  hyuna: {
    debut: 2010,
    facts: [
      n("real-hyuna", "HyunA’s full Korean name", "김현아"),
      n("group-4m", "The girl group HyunA debuted in after Wonder Girls trainee days", "포미닛"),
      n("album-bubble", "2011 hit Bubble Pop, in Hangul", "버블팝"),
    ],
  },
  "oh-my-girl": {
    debut: 2015,
    facts: [
      n("real-hyojung", "Hyojung’s full Korean name", "최효정"),
      n("real-mimi", "Mimi’s full Korean name", "김미현"),
      n("real-yooa", "YooA’s full Korean name", "유시아"),
      n("nation-arin", "Arin’s real Korean name", "최예원"),
    ],
  },
  apink: {
    debut: 2011,
    facts: [
      n("real-chorong", "Chorong’s full Korean name", "박초롱"),
      n("real-bomi", "Bomi’s full Korean name", "윤보미"),
      n("real-eunji", "Eunji’s full Korean name", "정은지"),
      n("real-namjoo", "Namjoo’s full Korean name", "김남주"),
      n("real-hayoung", "Hayoung’s full Korean name", "오하영"),
      n("work-eunji", "Reply 1997 lead that made Eunji a drama star", "응답하라", 2),
    ],
  },
  fx: {
    debut: 2009,
    facts: [
      n("nation-amber", "Amber’s home country / region she grew up in", "미국"),
      n("nation-krystal", "Krystal’s Korean name", "정수정"),
      n("real-victoria", "Victoria’s Korean name", "송치엔"),
      n("real-luna", "Luna’s real Korean name", "박선영"),
    ],
  },
  "wonder-girls": {
    debut: 2007,
    facts: [
      n("real-sunmi", "Sunmi’s full Korean name", "이선미"),
      n("real-yeeun", "Yeeun’s full Korean name", "박예은"),
      n("real-yubin", "Yubin’s full Korean name", "김유빈"),
      n("nation-hyerim", "Hyerim’s years in this country before debut", "중국"),
      n("album-replay", "2008 hit Nobody, in Hangul", "노바디"),
    ],
  },
  "kiss-of-life": {
    debut: 2023,
    facts: [
      n("nation-julie", "Julie’s home country", "미국"),
      n("nation-natty", "Natty’s home country", "태국"),
      n("show-sixteen", "Survival show Natty also appeared on before KISS OF LIFE", "식스틴", 2),
    ],
  },
  boynextdoor: {
    debut: 2023,
    facts: [
      n("real-jaehyun", "Jaehyun’s real Korean name", "명재현"),
      n("real-sungho", "Sungho’s full Korean name", "박성호"),
      n("real-taesan", "Taesan’s full Korean name", "한동민"),
      n("label-koz", "Zico’s label that debuted BOYNEXTDOOR", "코즈"),
    ],
  },
  wayv: {
    debut: 2019,
    facts: [
      n("nation-kun", "Kun’s home country", "중국"),
      n("nation-ten", "Ten’s home country", "태국"),
      n("nation-xiaojun", "Xiaojun’s home country", "중국"),
      n("nation-hendery", "Hendery’s home region", "마카오"),
      n("nation-yangyang", "Yangyang’s home country / region", "대만"),
    ],
  },
  "nct-wish": {
    debut: 2024,
    facts: [
      n("nation-sion", "Sion’s Korean name", "오시온"),
      n("nation-riku", "Riku’s home country", "일본"),
      n("nation-yushi", "Yushi’s home country", "일본"),
    ],
  },
  superm: {
    debut: 2019,
    facts: [
      n("real-taemin", "Taemin’s full Korean name", "이태민"),
      n("real-baekhyun", "Baekhyun’s full Korean name", "변백현"),
      n("real-kai", "Kai’s real Korean name", "김종인"),
      n("real-mark", "Mark’s Korean name", "이민형"),
    ],
  },
  gfriend: {
    debut: 2015,
    facts: [
      n("real-sowon", "Sowon’s real Korean name", "김소정"),
      n("real-yerin", "Yerin’s full Korean name", "정예린"),
      n("real-eunha", "Eunha’s real Korean name", "정은비"),
      n("real-yuju", "Yuju’s real Korean name", "최유나"),
      n("real-sinb", "SinB’s real Korean name", "황은비"),
      n("real-umji", "Umji’s real Korean name", "김예원"),
      n("album-megustas", "2015 hit Me Gustas Tu, Korean title", "오늘부터우리는", 3),
    ],
  },
  izone: {
    debut: 2018,
    facts: [
      n("nation-sakura", "Sakura’s home country", "일본"),
      n("nation-hitomi", "Hitomi’s home country", "일본"),
      n("nation-yena", "Yena’s full Korean name", "최예나"),
      n("real-wonyoung", "Wonyoung’s full Korean name", "장원영"),
      n("real-yujin", "Yujin’s full Korean name", "안유진"),
      n("real-chaewon", "Chaewon’s full Korean name", "김채원"),
      n("show-pd48", "Survival show that formed IZ*ONE", "프로듀스", 2),
    ],
  },
  "wanna-one": {
    debut: 2017,
    facts: [
      n("real-jihoon", "Park Jihoon’s full Korean name", "박지훈"),
      n("real-daniel", "Kang Daniel’s Korean name", "강다니엘", 2),
      n("real-jaehwan", "Kim Jaehwan’s full Korean name", "김재환"),
      n("real-minhyun", "Hwang Minhyun’s full Korean name", "황민현"),
      n("show-pd2", "Survival show that formed Wanna One", "프로듀스", 2),
    ],
  },
  btob: {
    debut: 2012,
    facts: [
      n("real-eunkwang", "Eunkwang’s full Korean name", "서은광"),
      n("real-changsub", "Changsub’s full Korean name", "이창섭"),
      n("real-hyunsik", "Hyunsik’s full Korean name", "임현식"),
      n("real-sungjae", "Sungjae’s full Korean name", "육성재"),
      n("nation-peniel", "Peniel’s home country", "미국"),
      n("work-sungjae", "Shopping-king rom-com Sungjae starred in as a chaebol heir", "쇼핑왕루이", 3),
    ],
  },
  highlight: {
    debut: 2009,
    facts: [
      n("real-doojoon", "Doojoon’s full Korean name", "윤두준"),
      n("real-yoseob", "Yoseob’s full Korean name", "양요섭"),
      n("real-gikwang", "Gikwang’s full Korean name", "이기광"),
      n("real-dongwoon", "Dongwoon’s full Korean name", "손동운"),
      n("old-name", "The group’s original name before Highlight", "비스트"),
    ],
  },
  cnblue: {
    debut: 2009,
    facts: [
      n("real-yonghwa", "Yonghwa’s full Korean name", "정용화"),
      n("real-jonghyun", "Jonghyun’s full Korean name", "이종현"),
      n("real-minhyuk", "Minhyuk’s full Korean name", "강민혁"),
      n("work-yonghwa", "KBS drama where Yonghwa played a pop star opposite a princess", "넌내게반했어", 3),
    ],
  },
  infinite: {
    debut: 2010,
    facts: [
      n("real-sungkyu", "Sungkyu’s full Korean name", "김성규"),
      n("real-dongwoo", "Dongwoo’s full Korean name", "장동우"),
      n("real-woohyun", "Woohyun’s full Korean name", "남우현"),
      n("real-sungyeol", "Sungyeol’s full Korean name", "이성열"),
      n("real-l", "L’s real Korean name", "김명수"),
      n("real-sungjong", "Sungjong’s full Korean name", "이성종"),
    ],
  },
  vixx: {
    debut: 2012,
    facts: [
      n("real-n", "N’s real Korean name", "차학연"),
      n("real-leo", "Leo’s real Korean name", "정택운"),
      n("real-ken", "Ken’s real Korean name", "이재환"),
      n("real-ravi", "Ravi’s real Korean name", "김원식"),
      n("real-hongbin", "Hongbin’s real Korean name", "이홍빈"),
      n("real-hyuk", "Hyuk’s real Korean name", "한상혁"),
    ],
  },
  pentagon: {
    debut: 2016,
    facts: [
      n("real-hui", "Hui’s real Korean name", "이회택"),
      n("real-jinho", "Jinho’s real Korean name", "조진호"),
      n("real-hongseok", "Hongseok’s full Korean name", "양홍석"),
      n("real-yeoone", "Yeoone’s real Korean name", "여원"),
      n("real-kino", "Kino’s real Korean name", "강형구"),
      n("real-wooseok", "Wooseok’s full Korean name", "정우석"),
    ],
  },
  astro: {
    debut: 2016,
    facts: [
      n("real-eunwoo", "Cha Eun-woo’s real Korean name", "이동민"),
      n("real-mj", "MJ’s real Korean name", "김명준"),
      n("real-jinjin", "Jinjin’s real Korean name", "박진우"),
      n("real-moonbin", "Moonbin’s full Korean name", "문빈"),
      n("real-rocky", "Rocky’s real Korean name", "박민혁"),
      n("real-sanha", "Sanha’s full Korean name", "윤산하"),
      n("work-eunwoo", "High-school romance where Cha Eun-woo played a perfect student", "여신강림"),
      n("hobby-eunwoo", "Cha Eun-woo’s well-known pre-debut activity: he was a model", "모델"),
    ],
  },
  sf9: {
    debut: 2016,
    facts: [
      n("real-youngbin", "Youngbin’s full Korean name", "김영빈"),
      n("real-insoeng", "Inseong’s full Korean name", "김인성"),
      n("real-jaeyoon", "Jaeyoon’s full Korean name", "이재윤"),
      n("real-dawon", "Dawon’s full Korean name", "이상혁"),
      n("real-zuho", "Zuho’s real Korean name", "백주호"),
      n("real-rowoon", "Rowoon’s real Korean name", "김석우"),
      n("work-rowoon", "Fantasy romance where Rowoon played a nine-tailed fox", "구미호뎐", 2),
    ],
  },
  cravity: {
    debut: 2020,
    facts: [
      n("real-serim", "Serim’s full Korean name", "박세림"),
      n("real-allen", "Allen’s Korean name", "송앨런"),
      n("nation-allen", "Allen’s home country besides Korea", "미국"),
      n("real-jungmo", "Jungmo’s full Korean name", "가정모"),
    ],
  },
  p1harmony: {
    debut: 2020,
    facts: [
      n("nation-theo", "Keeho’s home country", "캐나다", 2),
      n("nation-intak", "Intak’s full Korean name", "황인탁"),
      n("real-soul", "Soul’s home country", "일본"),
      n("real-jiung", "Jiung’s full Korean name", "최지웅"),
    ],
  },
  tws: {
    debut: 2024,
    facts: [
      n("real-shinyu", "Shinyu’s full Korean name", "신유"),
      n("real-dohoon", "Dohoon’s full Korean name", "김도훈"),
      n("real-youngjae", "Youngjae’s full Korean name", "최영재"),
      n("album-plot", "2024 debut title Plot Twist, in Hangul", "첫만남"),
    ],
  },
  plave: {
    debut: 2023,
    facts: [
      n("real-yejun", "Yejun’s character / Korean name", "예준"),
      n("real-noah", "Noah’s Korean name", "노아"),
      n("real-bamby", "Bamby’s Korean name", "밤비"),
      n("real-eunho", "Eunho’s Korean name", "은호"),
      n("real-hamin", "Hamin’s Korean name", "하민"),
    ],
  },
  "fifty-fifty": {
    debut: 2022,
    facts: [
      n("hit-cupid", "2023 global hit Cupid, in Hangul", "큐피드"),
      n("real-keena", "Keena’s Korean name", "키나"),
    ],
  },
  triples: {
    debut: 2023,
    facts: [
      n("real-nien", "Nien’s home country / region", "대만"),
      n("real-kotone", "Kotone’s home country", "일본"),
      n("unit-aaa", "The first DIMENSION unit that promoted Acid Angel from Asia", "에이스"),
    ],
  },
  kep1er: {
    debut: 2022,
    facts: [
      n("nation-mashiro", "Mashiro’s home country", "일본"),
      n("nation-hikaru", "Hikaru’s home country", "일본"),
      n("nation-xiaoting", "Xiaoting’s home country", "중국"),
      n("show-gp", "Survival show that formed Kep1er", "걸스플래닛", 3),
      n("real-chaehyun", "Chaehyun’s full Korean name", "김채현"),
    ],
  },
  dreamcatcher: {
    debut: 2017,
    facts: [
      n("real-jiu", "JiU’s real Korean name", "김민지"),
      n("real-sua", "SuA’s real Korean name", "김보나"),
      n("real-siyeon", "Siyeon’s real Korean name", "이시연"),
      n("real-handong", "Handong’s home country", "중국"),
      n("real-yoohyeon", "Yoohyeon’s full Korean name", "김유현"),
      n("real-dami", "Dami’s real Korean name", "이다미"),
      n("real-gahyeon", "Gahyeon’s full Korean name", "이가현"),
    ],
  },
  everglow: {
    debut: 2019,
    facts: [
      n("nation-yiren", "Yiren’s home country", "중국"),
      n("real-onda", "Onda’s real Korean name", "조미현"),
      n("real-sia", "Sihyeon’s full Korean name", "김시현"),
      n("real-eu", "E:U’s real Korean name", "박지윤"),
    ],
  },
  "fromis-9": {
    debut: 2018,
    facts: [
      n("real-saerom", "Saerom’s full Korean name", "이새롬"),
      n("real-jisun", "Jisun’s full Korean name", "노지선"),
      n("real-chaeyoung", "Chaeyoung’s full Korean name", "이채영"),
      n("real-nagyung", "Nagyung’s full Korean name", "이나경"),
      n("show-idolk", "Survival show that formed fromis_9", "아이돌학교", 2),
    ],
  },
  wjsn: {
    debut: 2016,
    facts: [
      n("nation-chengxiao", "Cheng Xiao’s home country", "중국"),
      n("nation-bona", "Bona’s full Korean name", "김지연"),
      n("real-exy", "EXY’s real Korean name", "추가경"),
      n("real-seola", "Seola’s real Korean name", "김현정"),
      n("real-luda", "Luda’s real Korean name", "이다빈"),
      n("work-bona", "Historical romance where Bona played a court lady in love", "연모"),
    ],
  },
  loona: {
    debut: 2018,
    facts: [
      n("real-heejin", "Heejin’s full Korean name", "전희진"),
      n("real-hyunjin", "Hyunjin’s full Korean name", "김현진"),
      n("real-haseul", "Haseul’s full Korean name", "조하슬"),
      n("real-yeojin", "Yeojin’s full Korean name", "임여진"),
      n("nation-yves", "Yves’s full Korean name", "하수영"),
      n("nation-chuu", "Chuu’s real Korean name", "김지우"),
    ],
  },
  kara: {
    debut: 2007,
    facts: [
      n("real-gyuri", "Gyuri’s full Korean name", "박규리"),
      n("real-seungyeon", "Seungyeon’s full Korean name", "한승연"),
      n("real-nicole", "Nicole’s Korean name", "니콜"),
      n("nation-nicole", "Country Nicole grew up in besides Korea", "미국"),
      n("album-mister", "2009 hit Mister, in Hangul", "미스터"),
    ],
  },
  sistar: {
    debut: 2010,
    facts: [
      n("real-hyolyn", "Hyolyn’s real Korean name", "김효정"),
      n("real-bora", "Bora’s full Korean name", "윤보라"),
      n("real-soyou", "Soyou’s real Korean name", "강지현"),
      n("real-dasom", "Dasom’s full Korean name", "김다솜"),
      n("album-alone", "2012 summer hit Alone, in Hangul", "나혼자"),
    ],
  },
  "miss-a": {
    debut: 2010,
    facts: [
      n("real-suzy", "Suzy’s full Korean name", "배수지"),
      n("nation-jia", "Jia’s home country", "중국"),
      n("nation-fei", "Fei’s home country", "중국"),
      n("work-suzy", "High-school music drama where Suzy played a transfer student", "드림하이", 2),
      n("work-arch", "Suzy’s famous first-love movie set in an architecture class", "건축학개론", 3),
    ],
  },
  "t-ara": {
    debut: 2009,
    facts: [
      n("real-qri", "Qri’s real Korean name", "이지현"),
      n("real-eunjung", "Eunjung’s full Korean name", "함은정"),
      n("real-hyomin", "Hyomin’s real Korean name", "박선영"),
      n("real-jiyeon", "Jiyeon’s full Korean name", "박지연"),
      n("album-bopeep", "2010 hit Bo Peep Bo Peep, in Hangul", "보핍보핍"),
    ],
  },
  "after-school": {
    debut: 2009,
    facts: [
      n("real-nana", "Nana’s Korean name", "임진아"),
      n("real-raina", "Raina’s real Korean name", "오혜린"),
      n("real-lizzy", "Lizzy’s real Korean name", "박수영"),
      n("album-bang", "2009 hit Bang!, in Hangul", "뱅"),
    ],
  },
  sunmi: {
    debut: 2013,
    facts: [
      n("real-sunmi", "SUNMI’s full Korean name", "이선미"),
      n("group-wg", "The girl group SUNMI debuted in", "원더걸스", 2),
      n("album-gashina", "2017 hit Gashina, in Hangul", "가시나"),
    ],
  },
  chungha: {
    debut: 2017,
    facts: [
      n("real-chungha", "CHUNG HA’s full Korean name", "김청하"),
      n("show-ioi", "The Produce group she debuted in before solo", "아이오아이", 3),
      n("album-gotta", "2018 hit Gotta Go, Korean title", "벌써12시", 2),
    ],
  },
  taemin: {
    debut: 2014,
    facts: [
      n("real-taemin", "TAEMIN’s full Korean name", "이태민"),
      n("group-shinee", "The boy group TAEMIN debuted in", "샤이니"),
      n("album-move", "2017 title that reset boy-solo dance", "무브"),
      n("hobby-dance", "TAEMIN’s famous specialty on stage", "댄스"),
    ],
  },
  jennie: {
    debut: 2018,
    facts: [
      n("real-jennie", "JENNIE’s full Korean name", "김제니"),
      n("group-bp", "The girl group JENNIE debuted in", "블랙핑크"),
      n("nation-nz", "Country she studied in as a teen besides Korea", "뉴질랜드", 2),
      n("album-solo", "2018 debut solo title SOLO, in Hangul", "솔로"),
    ],
  },
  rose: {
    debut: 2021,
    facts: [
      n("real-rose", "ROSÉ’s Korean name", "박채영"),
      n("group-bp", "The girl group ROSÉ debuted in", "블랙핑크"),
      n("nation-au", "Country she grew up in", "호주"),
      n("hobby-guitar", "Instrument she is famous for", "기타"),
      n("album-apt", "2024 hit with Bruno Mars, Korean title", "아파트"),
    ],
  },
  jungkook: {
    debut: 2023,
    facts: [
      n("real-jk", "Jung Kook’s real Korean name", "전정국"),
      n("group-bts", "The boy group he debuted in", "방탄소년단", 2),
      n("sport-box", "Combat sport he is often seen training in", "복싱"),
      n("album-golden", "2023 solo album title, in Hangul", "골든"),
    ],
  },
  jimin: {
    debut: 2023,
    facts: [
      n("real-jimin", "Jimin’s full Korean name", "박지민"),
      n("group-bts", "The boy group he debuted in", "방탄소년단", 2),
      n("hobby-dance", "Jimin’s famous specialty besides vocal", "댄스"),
      n("album-face", "2023 solo album whose title track is Like Crazy", "페이스"),
    ],
  },
  rain: {
    debut: 2002,
    facts: [
      n("real-rain", "Rain’s real Korean name", "정지훈"),
      n("work-full", "Early hit drama where Rain played a singer opposite a TV writer", "풀하우스", 2),
      n("album-how", "2004 hit How to Avoid the Sun, Korean title", "태양을피하는방법", 3),
    ],
  },
  akmu: {
    debut: 2012,
    facts: [
      n("real-chanhyuk", "Chanhyuk’s full Korean name", "이찬혁"),
      n("real-suhyun", "Suhyun’s full Korean name", "이수현"),
      n("show-kpopstar", "Audition show that debuted the sibling duo", "케이팝스타", 3),
      n("album-200", "2014 debut album 200%, title in Hangul", "이백퍼센트", 3),
    ],
  },
  bibi: {
    debut: 2019,
    facts: [
      n("real-bibi", "BIBI’s Korean name", "김형서"),
      n("album-bamyang", "Hit Bam Yang Gang, in Hangul", "밤양갱"),
    ],
  },
  heize: {
    debut: 2014,
    facts: [
      n("real-heize", "HEIZE’s real Korean name", "장다혜"),
      n("album-star", "2016 hit Star, Korean title You, Clouds, Rain era — You, Clouds, Rain", "비도오고그래서", 3),
    ],
  },
  "epik-high": {
    debut: 2003,
    facts: [
      n("real-tablo", "Tablo’s Korean name", "이선웅"),
      n("real-mithra", "Mithra Jin’s Korean name", "최진"),
      n("real-tuba", "DJ Tukutz’s Korean name", "김정식"),
      n("nation-tablo", "Country Tablo spent much of his youth in", "캐나다", 2),
    ],
  },
  "jay-park": {
    debut: 2010,
    facts: [
      n("real-jay", "Jay Park’s Korean name", "박재범"),
      n("nation-us", "Country he grew up in besides Korea", "미국"),
      n("group-2pm", "The JYP boy group he first debuted in", "투피엠"),
    ],
  },
  viviz: {
    debut: 2022,
    facts: [
      n("real-eunha", "Eunha’s real Korean name", "정은비"),
      n("real-sinb", "SinB’s real Korean name", "황은비"),
      n("real-umji", "Umji’s real Korean name", "김예원"),
      n("group-gf", "The girl group the three debuted in first", "여자친구", 2),
    ],
  },
  hearts2hearts: {
    debut: 2025,
    facts: [
      n("agency-sm", "The SM girl group that debuted in 2025", "하츠투하츠", 3),
    ],
  },
  izna: {
    debut: 2024,
    facts: [
      n("show-izna", "Survival show that formed izna", "아이랜드투", 3),
      n("real-mai", "Mai’s home country", "일본"),
    ],
  },
  meovv: {
    debut: 2024,
    facts: [
      n("nation-anna", "Anna’s home country", "일본"),
      n("nation-ella", "Ella’s home country", "미국"),
      n("label-theblack", "The Black Label group that debuted in 2024", "미야오"),
    ],
  },
  billlie: {
    debut: 2021,
    facts: [
      n("real-tsuki", "Tsuki’s home country", "일본"),
      n("real-suhyeon", "Suhyeon’s full Korean name", "문수현"),
      n("real-sheon", "Sheon’s full Korean name", "김시윤"),
    ],
  },
  h1key: {
    debut: 2022,
    facts: [
      n("nation-seoi", "Seoi’s full Korean name", "이서이"),
      n("real-riina", "Riina’s full Korean name", "리이나"),
    ],
  },
};

const MORE_KPOP = {
  "fifty-fifty": [
    n("real-sena", "Sena’s Korean name", "세나"),
    n("hit-twin", "The Twin version of Cupid that went global", "트윈"),
    n("label-attrakt", "The company that debuted FIFTY FIFTY", "어트랙트", 2),
  ],
  sunmi: [
    n("album-siren", "2018 hit Siren, in Hangul", "사이렌"),
    n("album-pporappippam", "2020 hit pporappippam, in Hangul", "보라빛밤"),
    n("hobby-dance", "SUNMI’s famous specialty on stage", "댄스"),
  ],
  chungha: [
    n("album-snapping", "2019 hit Snapping, in Hangul", "스내핑"),
    n("album-bicycle", "2020 title Bicycle, in Hangul", "바이시클"),
    n("hobby-dance", "CHUNG HA’s famous specialty on stage", "댄스"),
  ],
  jennie: [
    n("album-youandme", "2023 solo title You & Me, in Hangul", "유앤미"),
    n("hobby-fashion", "Jennie’s well-known off-stage world", "패션"),
    n("pet-kai", "Jennie’s famous dog’s name, in Hangul", "카이"),
  ],
  rose: [
    n("album-on", "2021 debut solo title On The Ground, in Hangul", "온더그라운드", 3),
    n("album-gone", "2021 B-side Gone, in Hangul", "곤"),
  ],
  jungkook: [
    n("album-seven", "2023 hit Seven, in Hangul", "세븐"),
    n("album-standing", "2023 title Standing Next to You, in Hangul", "스탠딩"),
    n("hobby-photo", "Jung Kook’s well-known hobby besides sports", "사진"),
  ],
  jimin: [
    n("album-who", "2024 title Who, in Hangul", "후"),
    n("album-like", "2023 title Like Crazy, in Hangul", "라이크크레이지", 3),
    n("nick-dwarf", "A cute nickname ARMY uses for Jimin", "쪼꼬미"),
  ],
  rain: [
    n("album-rainism", "2008 hit Rainism, in Hangul", "레이니즘"),
    n("work-ideal", "Variety he long hosted about dating", "이상형"),
    n("hobby-dance", "Rain’s famous specialty on stage", "댄스"),
  ],
  bibi: [
    n("album-kazino", "Early hit KAZINO, in Hangul", "카지노"),
    n("album-animal", "Hit Animal Farm, in Hangul", "동물농장"),
    n("hobby-write", "BIBI’s well-known job besides singing: she writes", "작사"),
  ],
  heize: [
    n("album-happen", "2021 title Happen, in Hangul", "헤픈"),
    n("album-we", "Hit We Don’t Talk Together, in Hangul", "우린"),
    n("hobby-write", "HEIZE’s well-known job besides singing", "작사"),
  ],
  "jay-park": [
    n("label-h1ghr", "A hip-hop label Jay Park founded, in Hangul", "하이어"),
    n("album-allday", "Hit All I Wanna Do, in Hangul", "올아이워나도", 3),
    n("hobby-dance", "Jay Park’s famous specialty besides rap", "댄스"),
  ],
  h1key: [
    n("real-seoi2", "Seoi’s full Korean name", "이서이"),
    n("hit-rose", "Debut-era title Rose Blossom, in Hangul", "건물사이에피어난장미", 3),
    n("real-yel", "Yel’s Korean name", "옐"),
  ],
};

for (const [key, rows] of Object.entries(MORE_KPOP)) {
  if (!module.exports[key]) module.exports[key] = { facts: [] };
  module.exports[key].facts = [...(module.exports[key].facts || []), ...rows];
}

module.exports.FAMOUS_PEERS = [
  { key: "snsd", name: "Girls’ Generation", year: 2007 },
  { key: "bigbang", name: "BIGBANG", year: 2006 },
  { key: "iu", name: "IU", year: 2008 },
  { key: "exo", name: "EXO", year: 2012 },
  { key: "bts", name: "BTS", year: 2013 },
  { key: "twice", name: "TWICE", year: 2015 },
  { key: "seventeen", name: "SEVENTEEN", year: 2015 },
  { key: "blackpink", name: "BLACKPINK", year: 2016 },
  { key: "newjeans", name: "NewJeans", year: 2022 },
  { key: "ive", name: "IVE", year: 2021 },
  { key: "aespa", name: "aespa", year: 2020 },
];
