const STORAGE_KEYS = {
  current: "lifeSimulator.currentLife",
  last: "lifeSimulator.lastLife",
  collection: "lifeSimulator.collection"
};

const ATTRS = [
  ["health", "健康"],
  ["intelligence", "智力"],
  ["charm", "魅力"],
  ["family", "家境"],
  ["luck", "运气"],
  ["mindset", "心态"]
];

const STAGES = [
  { id: "childhood", name: "童年", min: 0, max: 12 },
  { id: "school", name: "求学", min: 13, max: 22 },
  { id: "earlyCareer", name: "初入社会", min: 23, max: 30 },
  { id: "career", name: "职业发展", min: 31, max: 45 },
  { id: "midlife", name: "家庭与中年", min: 46, max: 60 },
  { id: "elder", name: "晚年", min: 61, max: 80 },
  { id: "extra", name: "额外人生", min: 81, max: 120 }
];

const GOALS = [
  { id: "wealth", name: "财富", desc: "希望这辈子能掌握更多资源。" },
  { id: "love", name: "爱情", desc: "希望遇到真诚、稳定的亲密关系。" },
  { id: "family", name: "家庭", desc: "希望和家人彼此支持。" },
  { id: "freedom", name: "自由", desc: "希望人生少一点被安排，多一点选择。" },
  { id: "fame", name: "名望", desc: "希望被更多人看见和记住。" },
  { id: "longevity", name: "长寿", desc: "希望活得久，也活得稳。" }
];

const GOAL_META = {
  wealth: { mark: "富贵", omen: "你选择了富贵。命运会把资源、风险和欲望一起放到你面前。" },
  love: { mark: "真爱", omen: "你选择了真爱。命运会让关系成为奖赏，也成为考题。" },
  family: { mark: "守护", omen: "你选择了家庭。很多选择会变得不够漂亮，但有人会因此少吃苦。" },
  freedom: { mark: "自由", omen: "你选择了自由。岔路会更多，安定会更难。" },
  fame: { mark: "名望", omen: "你选择了名望。世界会看见你，也会审视你。" },
  longevity: { mark: "长寿", omen: "你选择了长寿。活得久不只是时间，更是能否和自己和解。" }
};

const HOUR_BRANCHES = [
  { id: "zi", name: "子时", range: "23:00-00:59", branch: "子", element: "水" },
  { id: "chou", name: "丑时", range: "01:00-02:59", branch: "丑", element: "土" },
  { id: "yin", name: "寅时", range: "03:00-04:59", branch: "寅", element: "木" },
  { id: "mao", name: "卯时", range: "05:00-06:59", branch: "卯", element: "木" },
  { id: "chen", name: "辰时", range: "07:00-08:59", branch: "辰", element: "土" },
  { id: "si", name: "巳时", range: "09:00-10:59", branch: "巳", element: "火" },
  { id: "wu", name: "午时", range: "11:00-12:59", branch: "午", element: "火" },
  { id: "wei", name: "未时", range: "13:00-14:59", branch: "未", element: "土" },
  { id: "shen", name: "申时", range: "15:00-16:59", branch: "申", element: "金" },
  { id: "you", name: "酉时", range: "17:00-18:59", branch: "酉", element: "金" },
  { id: "xu", name: "戌时", range: "19:00-20:59", branch: "戌", element: "土" },
  { id: "hai", name: "亥时", range: "21:00-22:59", branch: "亥", element: "水" }
];

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const STEM_ELEMENTS = { 甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土", 己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水" };
const BRANCH_ELEMENTS = { 子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火", 午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水" };
const ELEMENT_ATTR = { 木: "intelligence", 火: "charm", 土: "family", 金: "luck", 水: "mindset" };

const RARITY = {
  common: { label: "普通", weight: 60, className: "rarity-common" },
  rare: { label: "稀有", weight: 26, className: "rarity-rare" },
  epic: { label: "杰出", weight: 10, className: "rarity-epic" },
  legendary: { label: "传说", weight: 4, className: "rarity-legendary" }
};

const BACKGROUNDS = [
  { id: "ordinary", name: "县城普通家庭", rarity: "common", desc: "独生子女 / 父母务实 / 不富不缺。", effects: {}, tags: [] },
  { id: "tier1", name: "一线城市双职工", rarity: "common", desc: "家教严格 / 教育资源较好 / 期待很高。", effects: { intelligence: 1, family: 1, mindset: -1 }, tags: ["资源较好"] },
  { id: "smallTown", name: "小镇个体户家庭", rarity: "common", desc: "亲戚很多 / 从小会看人脸色。", effects: { charm: 1, family: 1 }, tags: ["人情世故"] },
  { id: "rural", name: "农村大家庭", rarity: "common", desc: "童年热闹 / 早早学会分担家务。", effects: { health: 1, mindset: 1, family: -1 }, tags: ["朴实底色"] },
  { id: "single", name: "单亲家庭", rarity: "common", desc: "母亲坚韧 / 情绪敏感 / 心思早熟。", effects: { mindset: 1, family: -1, charm: 1 }, tags: ["情绪敏感"] },
  { id: "blended", name: "重组家庭", rarity: "common", desc: "关系复杂 / 很会自我保护。", effects: { mindset: 1, charm: 1, family: -1 }, tags: ["自我保护"] },
  { id: "scholar", name: "书香家庭", rarity: "common", desc: "父母都是老师 / 从小被比较。", effects: { intelligence: 2, mindset: -1 }, tags: ["从小被比较"] },
  { id: "worker", name: "普通工薪家庭", rarity: "common", desc: "日子紧巴 / 但饭桌很热闹。", effects: { mindset: 1, family: -1 }, tags: ["工薪日常"] },
  { id: "wealthy", name: "新兴富裕家庭", rarity: "rare", desc: "父母一代抓住了红利。", effects: { family: 3, luck: 1, mindset: -1 }, tags: ["富二代"] },
  { id: "officials", name: "体制内大家族", rarity: "rare", desc: "规矩多 / 但路子也多。", effects: { family: 2, intelligence: 1, charm: 1 }, tags: ["体制内"] },
  { id: "artistic", name: "艺术之家", rarity: "rare", desc: "家里全是书和画。", effects: { charm: 2, intelligence: 1, family: -1 }, tags: ["艺术氛围"] },
  { id: "athletic", name: "体育世家", rarity: "rare", desc: "全家从小练 / 自律是底色。", effects: { health: 3, mindset: 1, intelligence: -1 }, tags: ["体育氛围"] },
  { id: "overseas", name: "海外华人家庭", rarity: "rare", desc: "在两种文化里来回切换。", effects: { intelligence: 1, charm: 1, luck: 1, mindset: -1 }, tags: ["双文化"] },
  { id: "celebrity", name: "公众人物家庭", rarity: "epic", desc: "你从出生就活在聚光灯下。", effects: { charm: 3, luck: 1, mindset: -2, family: 2 }, tags: ["星光之下"] },
  { id: "tycoon", name: "商业世家", rarity: "epic", desc: "从小听大人聊收购、上市、风险。", effects: { family: 4, intelligence: 1, mindset: -1 }, tags: ["商业世家", "继承人"] },
  { id: "mystery", name: "神秘血统家族", rarity: "legendary", desc: "家中长辈讳莫如深，偶尔说几个奇怪故事。", effects: { luck: 3, mindset: 2, charm: 1 }, tags: ["神秘血统", "命格未知"] }
];

const TALENTS = [
  { id: "lateLuck", name: "迟来的好运", rarity: "common", desc: "年轻时普通，60 岁后更容易遇到正向事件。", effects: { luck: 1 }, tags: ["迟来的好运"] },
  { id: "mathMind", name: "数学直觉", rarity: "common", desc: "你对数字和逻辑很敏感。", effects: { intelligence: 2, charm: -1 }, tags: ["理性脑"] },
  { id: "socialFear", name: "社交恐惧", rarity: "common", desc: "人多时容易紧张，但独处时能量恢复很快。", effects: { charm: -1, mindset: -1, intelligence: 1 }, tags: ["内向"] },
  { id: "sunny", name: "天生乐观", rarity: "common", desc: "坏事发生时，你更容易缓过来。", effects: { mindset: 2 }, tags: ["乐观"] },
  { id: "fragile", name: "易碎体质", rarity: "common", desc: "小时候常生病，但更早意识到健康重要。", effects: { health: -2, mindset: 1 }, tags: ["体弱"] },
  { id: "goodVoice", name: "好嗓子", rarity: "common", desc: "你说话和唱歌都很有辨识度。", effects: { charm: 2 }, tags: ["表达力"] },
  { id: "familyHelp", name: "家里托底", rarity: "common", desc: "家人能在关键时刻帮你一把。", effects: { family: 2 }, tags: ["家庭支持"] },
  { id: "rebel", name: "不服管", rarity: "common", desc: "你不太听劝，但敢于走偏门。", effects: { luck: 1, mindset: 1, family: -1 }, tags: ["叛逆"] },
  { id: "bookworm", name: "书堆里长大", rarity: "common", desc: "阅读让你很早拥有自己的世界。", effects: { intelligence: 2, health: -1 }, tags: ["爱读书"] },
  { id: "streetSmart", name: "街头智慧", rarity: "common", desc: "你很会察言观色，也懂得保护自己。", effects: { charm: 1, luck: 1 }, tags: ["会来事"] },
  { id: "stubborn", name: "死磕到底", rarity: "common", desc: "你不容易放弃，也不容易转弯。", effects: { mindset: 2, charm: -1 }, tags: ["死磕"] },
  { id: "pretty", name: "人群焦点", rarity: "common", desc: "你从小就容易被看见。", effects: { charm: 2, luck: 1 }, tags: ["高魅力"] },
  { id: "photoMemory", name: "过目不忘", rarity: "rare", desc: "看过的内容你都能精确回忆。", effects: { intelligence: 3 }, tags: ["过目不忘"] },
  { id: "athleticGenius", name: "运动天赋", rarity: "rare", desc: "你在身体协调性上就是别人的天花板。", effects: { health: 3, charm: 1 }, tags: ["运动健将"] },
  { id: "businessNose", name: "商业嗅觉", rarity: "rare", desc: "你天生能闻到机会和风险的气味。", effects: { intelligence: 1, luck: 2, family: 1 }, tags: ["商业嗅觉"] },
  { id: "artist", name: "艺术天赋", rarity: "rare", desc: "你对色彩、节奏、画面有第六感。", effects: { charm: 2, intelligence: 1, family: -1 }, tags: ["艺术家"] },
  { id: "ironHeart", name: "钢铁心脏", rarity: "rare", desc: "重大打击对你来说像普通新闻。", effects: { mindset: 3, charm: -1 }, tags: ["心理强韧"] },
  { id: "luckyStar", name: "好运体质", rarity: "rare", desc: "在概率事件里，你常常是少数人。", effects: { luck: 3 }, tags: ["天选之人"] },
  { id: "polyglot", name: "语言通", rarity: "epic", desc: "你在语言、表达和逻辑上同时拉满。", effects: { intelligence: 2, charm: 2 }, tags: ["语言通"] },
  { id: "noble", name: "天生贵气", rarity: "epic", desc: "气场和容貌一起为你说话，机会找上门。", effects: { charm: 3, luck: 1, mindset: -1 }, tags: ["贵气"] },
  { id: "oldSoul", name: "灵魂老者", rarity: "epic", desc: "你小时候就懂很多大人也不懂的事。", effects: { mindset: 2, intelligence: 2, health: -1 }, tags: ["少年老成"] },
  { id: "rebornSoul", name: "转生者", rarity: "legendary", desc: "你模糊地记得「上一世」的经验。", effects: { intelligence: 2, mindset: 2, luck: 2 }, tags: ["转生者", "记忆残像"] },
  { id: "destinyChild", name: "命运之子", rarity: "legendary", desc: "命运似乎天然偏向你。", effects: { luck: 4, charm: 1, mindset: 1 }, tags: ["命运之子"] },
  { id: "phoenix", name: "凤凰之命", rarity: "legendary", desc: "每次跌到底，你都会以更强的方式回来。", effects: { mindset: 3, health: -1, luck: 2 }, tags: ["凤凰命"] }
];

const QUIRKS = [
  { id: "nightOwl", name: "夜猫子", desc: "一到夜里就思路清晰，但白天总缺觉。", effects: { intelligence: 1, health: -1 }, tags: ["夜猫子"] },
  { id: "earlyBird", name: "早起党", desc: "天一亮你就清醒了。", effects: { health: 1, mindset: 1 }, tags: ["早起党"] },
  { id: "perfectionist", name: "完美主义", desc: "事情做不到 100% 你就难受。", effects: { intelligence: 1, mindset: -1 }, tags: ["完美主义"] },
  { id: "procrastinator", name: "拖延症", desc: "deadline 是你最好的朋友。", effects: { mindset: -1, luck: 1 }, tags: ["拖延"] },
  { id: "softHearted", name: "心软", desc: "你做不到对人完全冷漠。", effects: { charm: 1, mindset: -1 }, tags: ["心软"] },
  { id: "stoic", name: "情绪稳定", desc: "你看起来永远没事。", effects: { mindset: 2, charm: -1 }, tags: ["情绪稳定"] },
  { id: "spendthrift", name: "月光体质", desc: "钱总是留不住。", effects: { mindset: 1, family: -1 }, tags: ["月光"] },
  { id: "saver", name: "存钱狂魔", desc: "你能在每一笔小钱里抠出未来。", effects: { family: 1, mindset: -1 }, tags: ["存钱狂魔"] },
  { id: "extrovert", name: "社牛", desc: "和陌生人三句话就能熟。", effects: { charm: 2, intelligence: -1 }, tags: ["社牛"] },
  { id: "homebody", name: "家里蹲", desc: "你最舒服的姿势是躺在自己床上。", effects: { health: -1, mindset: 1 }, tags: ["家里蹲"] },
  { id: "curious", name: "好奇宝宝", desc: "什么都想试一下。", effects: { intelligence: 1, luck: 1, mindset: -1 }, tags: ["好奇心"] },
  { id: "nostalgic", name: "念旧", desc: "你舍不得扔过去的东西。", effects: { charm: 1, mindset: -1 }, tags: ["念旧"] },
  { id: "thrillSeeker", name: "刺激上瘾", desc: "平静太久你就坐不住。", effects: { luck: 1, health: -1, mindset: -1 }, tags: ["刺激上瘾"] },
  { id: "peopleReader", name: "读心术", desc: "你看一眼就大概知道对方在想什么。", effects: { charm: 1, intelligence: 1, mindset: -1 }, tags: ["读心术"] }
];

const DESTINIES = [
  { id: "mortal", name: "凡人之命", rarity: "common", desc: "命运没有特别偏向你，一切看选择。", effects: {}, tags: [] },
  { id: "steady", name: "稳的命", rarity: "common", desc: "平安顺遂是底色。", effects: { mindset: 1 }, tags: ["稳"] },
  { id: "wanderer", name: "奔波之命", rarity: "common", desc: "你停不下来。", effects: { health: -1, luck: 1 }, tags: ["奔波"] },
  { id: "fortune", name: "福星照命", rarity: "rare", desc: "关键时刻总有人帮你。", effects: { luck: 2, charm: 1 }, tags: ["福星"] },
  { id: "lonely", name: "孤星入命", rarity: "rare", desc: "亲密关系比常人难。", effects: { intelligence: 2, charm: -2, mindset: 1 }, tags: ["孤星"] },
  { id: "wenqu", name: "文曲入命", rarity: "rare", desc: "笔下生花的命格。", effects: { intelligence: 2, charm: 1 }, tags: ["文曲"] },
  { id: "wuqu", name: "武曲入命", rarity: "rare", desc: "适合实干、行业、财路。", effects: { health: 1, family: 2, luck: 1 }, tags: ["武曲"] },
  { id: "ziwei", name: "紫微帝星", rarity: "legendary", desc: "天生主角光环，但代价不轻。", effects: { charm: 2, luck: 2, family: 2, mindset: -2 }, tags: ["紫微", "主角光环"] },
  { id: "tiansha", name: "天煞之命", rarity: "legendary", desc: "命途多舛，但抗压拉满。", effects: { mindset: 3, health: -2, luck: -1, charm: -1 }, tags: ["天煞", "逆境之子"] }
];

const BASE_EVENTS = [
  e("c001", "childhood", 0, 2, "你出生了。家人围在病房外，对这段新人生充满想象。", [{ attr: "mindset", value: 1 }], ["出生"]),
  e("c002", "childhood", 3, 5, "你第一次在幼儿园表演节目，紧张到忘词，却意外收获了掌声。", [{ attr: "charm", value: 1 }], ["童年记忆"]),
  e("c003", "childhood", 4, 8, "你摔了一跤，膝盖破皮。家人没有责怪你，只是认真教你怎么处理伤口。", [{ attr: "health", value: 1 }, { attr: "mindset", value: 1 }]),
  e("c004", "childhood", 6, 9, "你发现自己很喜欢拆玩具，虽然装不回去，但看懂了不少结构。", [{ attr: "intelligence", value: 1 }], ["好奇心"]),
  e("c005", "childhood", 7, 11, "亲戚聚会时，大人反复比较孩子成绩。你第一次觉得自己像一张成绩单。", [{ attr: "mindset", value: -1 }]),
  e("c006", "childhood", 8, 12, "你交到一个很要好的朋友，你们约定以后一起开一家小店。", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["童年好友"]),
  e("c007", "childhood", 9, 12, "你迷上了图书馆角落里的旧书，周末常常一坐就是半天。", [{ attr: "intelligence", value: 1 }, { attr: "charm", value: -1 }], ["爱读书"]),
  e("c008", "childhood", 10, 12, "家里经济突然紧张，很多想买的东西都要往后排。", [{ attr: "family", value: -1 }, { attr: "mindset", value: -1 }], ["早熟"]),

  e("s001", "school", 13, 15, "你进入初中，第一次感到排名像一张看不见的网。", [{ attr: "intelligence", value: 1 }, { attr: "mindset", value: -1 }]),
  e("s002", "school", 13, 16, "你被选为小组长，发现协调别人比自己做题难多了。", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["组织经验"]),
  e("s003", "school", 14, 17, "你参加一次比赛，结果只拿了安慰奖，但第一次知道自己能站上台。", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }]),
  e("s004", "school", 15, 18, "你熬夜刷题，短期成绩上来了，身体却开始抗议。", [{ attr: "intelligence", value: 1 }, { attr: "health", value: -1 }]),
  choice("s005", "school", 17, 18, "班主任建议你冲一所更好的大学，但家里希望你早点稳定下来。", [
    opt("A", "拼一把备考名校", "智力 +1，心态 -1，获得“名校冲刺”", [{ attr: "intelligence", value: 1 }, { attr: "mindset", value: -1 }], ["名校冲刺"]),
    opt("B", "选择本地学校", "家境 +1，心态 +1，获得“稳妥路线”", [{ attr: "family", value: 1 }, { attr: "mindset", value: 1 }], ["稳妥路线"]),
    opt("C", "先打工一年", "家境 +1，智力 -1，获得“提前入世”", [{ attr: "family", value: 1 }, { attr: "intelligence", value: -1 }], ["提前入世"])
  ]),
  e("s006", "school", 18, 20, "你第一次离开家生活，发现自由和孤独常常一起到来。", [{ attr: "mindset", value: 1 }, { attr: "family", value: -1 }], ["离家"]),
  e("s007", "school", 19, 22, "你在社团里认识了一群奇怪但有趣的人，生活突然有了别的颜色。", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["社团经历"]),
  e("s008", "school", 20, 22, "一次实习让你意识到，学校里的优秀不一定能兑换成工作里的轻松。", [{ attr: "intelligence", value: 1 }, { attr: "mindset", value: -1 }], ["实习"]),
  choice("s009", "school", 21, 22, "毕业前，你面前有三条路：考研、就业，或者去陌生城市闯一闯。", [
    opt("A", "继续深造", "智力 +1，家境 -1，获得“继续深造”", [{ attr: "intelligence", value: 1 }, { attr: "family", value: -1 }], ["继续深造"]),
    opt("B", "先找工作", "家境 +1，心态 +1，获得“打工人”", [{ attr: "family", value: 1 }, { attr: "mindset", value: 1 }], ["打工人"]),
    opt("C", "去陌生城市", "运气 +1，心态 -1，获得“漂泊者”", [{ attr: "luck", value: 1 }, { attr: "mindset", value: -1 }], ["漂泊者"]),
    opt("D", "申请高额奖学金项目", "需要智力 ≥ 7；智力 +1，家境 +1，获得“奖学金路线”", [{ attr: "intelligence", value: 1 }, { attr: "family", value: 1 }], ["奖学金路线"], { require: { intelligence: 7 } })
  ]),

  e("e001", "earlyCareer", 23, 24, "你拿到第一份正式工资，兴奋地请自己吃了一顿贵饭。", [{ attr: "mindset", value: 1 }], ["第一份工资"]),
  e("e002", "earlyCareer", 23, 26, "试用期的你总是最早到、最晚走，领导记住了你，颈椎也记住了你。", [{ attr: "family", value: 1 }, { attr: "health", value: -1 }], ["拼命工作"]),
  e("e003", "earlyCareer", 24, 27, "你第一次独立租房，房子不大，但钥匙握在手里很踏实。", [{ attr: "mindset", value: 1 }, { attr: "family", value: -1 }], ["独立生活"]),
  choice("e004", "earlyCareer", 25, 29, "朋友邀请你一起做副业，项目看起来不稳，但机会难得。", [
    opt("A", "下班后一起试试", "运气 +1，健康 -1，获得“副业尝试”", [{ attr: "luck", value: 1 }, { attr: "health", value: -1 }], ["副业尝试"]),
    opt("B", "拒绝，先把主业做好", "心态 +1，获得“稳定路线”", [{ attr: "mindset", value: 1 }], ["稳定路线"]),
    opt("C", "直接辞职全职做", "高风险选择：会按运气、智力、家境、心态判定不同结果", [{ attr: "luck", value: 1 }, { attr: "health", value: -1 }], ["创业者"], {
      outcomes: [
        { when: life => scorePart(life, "luck") >= 8 && Math.random() < 0.45, text: "项目意外爆火，你第一次体会到风口的速度。", effects: [{ attr: "family", value: 4 }, { attr: "charm", value: 1 }], tags: ["一战成名", "创业者"] },
        { when: life => scorePart(life, "intelligence") >= 8, text: "你没有盲冲，而是把产品、现金流和用户反馈都拆开验证。", effects: [{ attr: "family", value: 2 }, { attr: "mindset", value: 1 }, { attr: "intelligence", value: 1 }], tags: ["稳健创业", "创业者"] },
        { when: life => scorePart(life, "family") >= 8, text: "项目失败了一次，但家里托住了你，你获得了第二次试错机会。", effects: [{ attr: "family", value: -2 }, { attr: "mindset", value: 1 }, { attr: "luck", value: 1 }], tags: ["家族托底", "创业者"] },
        { when: life => scorePart(life, "mindset") <= 3, text: "压力很快压垮了你，项目、睡眠和关系一起失控。", effects: [{ attr: "health", value: -2 }, { attr: "mindset", value: -2 }, { attr: "family", value: -1 }], tags: ["创业崩盘"] }
      ]
    })
  ]),
  e("e005", "earlyCareer", 26, 30, "你遇到一个聊得来的人，第一次觉得成年人的心动像深夜亮起的便利店。", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["心动"]),
  e("e006", "earlyCareer", 27, 30, "你被裁员传闻吓到，开始认真整理简历和存款。", [{ attr: "mindset", value: -1 }, { attr: "intelligence", value: 1 }], ["危机意识"]),
  e("e007", "earlyCareer", 28, 30, "你在一次项目里顶住压力，终于被同事当成可靠的人。", [{ attr: "charm", value: 1 }, { attr: "intelligence", value: 1 }], ["可靠"]),
  e("e008", "earlyCareer", 29, 30, "你开始意识到，周末不休息，工作日也不会更有精神。", [{ attr: "health", value: 1 }, { attr: "mindset", value: 1 }], ["自我照顾"]),

  choice("w001", "career", 31, 35, "你获得一次升职机会，但新岗位意味着长期加班和更高压力。", [
    opt("A", "接受升职", "收益与压力会按心态 / 健康判定", [{ attr: "family", value: 2 }, { attr: "health", value: -1 }, { attr: "mindset", value: -1 }], ["管理者"], {
      outcomes: [
        { when: life => scorePart(life, "mindset") >= 8, text: "你顶住了压力，还建立了一套不让自己被工作吞掉的节奏。", effects: [{ attr: "family", value: 2 }, { attr: "mindset", value: 1 }, { attr: "charm", value: 1 }], tags: ["从容管理者"] },
        { when: life => scorePart(life, "health") <= 3, text: "升职带来的加班很快击穿了你的身体库存。", effects: [{ attr: "family", value: 2 }, { attr: "health", value: -2 }, { attr: "mindset", value: -1 }], tags: ["透支管理"] }
      ]
    }),
    opt("B", "留在原岗位", "健康 +1，心态 +1，获得“边界感”", [{ attr: "health", value: 1 }, { attr: "mindset", value: 1 }], ["边界感"]),
    opt("C", "跳槽换城市", "运气 +1，家境 +1，心态 -1，获得“迁徙”", [{ attr: "luck", value: 1 }, { attr: "family", value: 1 }, { attr: "mindset", value: -1 }], ["迁徙"]),
    opt("D", "谈判出一个弹性岗位", "需要魅力 ≥ 7；家境 +1，健康 +1，获得“谈判高手”", [{ attr: "family", value: 1 }, { attr: "health", value: 1 }, { attr: "charm", value: 1 }], ["谈判高手"], { require: { charm: 7 } })
  ]),
  e("w002", "career", 31, 38, "你的存款终于有了一点规模，但对未来的不确定感并没有因此消失。", [{ attr: "family", value: 1 }, { attr: "mindset", value: -1 }]),
  e("w003", "career", 32, 40, "你学会了在会议上说“不”，虽然声音发抖，但说完很爽。", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["边界感"]),
  e("w004", "career", 33, 42, "你参与的项目突然爆火，连楼下便利店老板都听说了。", [{ attr: "luck", value: 1 }, { attr: "charm", value: 1 }], ["高光项目"]),
  e("w005", "career", 35, 45, "你开始定期体检，报告上几个箭头让你沉默了很久。", [{ attr: "health", value: -1 }, { attr: "mindset", value: 1 }], ["健康警报"]),
  choice("w006", "career", 36, 45, "你和伴侣讨论是否要把生活重心放在家庭上。", [
    opt("A", "更多投入家庭", "心态 +1，魅力 +1，家境 -1，获得“家庭优先”", [{ attr: "mindset", value: 1 }, { attr: "charm", value: 1 }, { attr: "family", value: -1 }], ["家庭优先"]),
    opt("B", "继续拼事业", "家境 +2，心态 -1，获得“事业优先”", [{ attr: "family", value: 2 }, { attr: "mindset", value: -1 }], ["事业优先"]),
    opt("C", "暂时不做决定", "运气 +1，获得“顺其自然”", [{ attr: "luck", value: 1 }], ["顺其自然"])
  ]),
  e("w007", "career", 38, 45, "你遇到一位愿意提携你的前辈，对方只说了一句：别把所有苦都当成应该。", [{ attr: "mindset", value: 2 }], ["贵人"]),
  e("w008", "career", 40, 45, "你发现朋友圈越来越安静，大家都在用自己的方式硬撑。", [{ attr: "mindset", value: -1 }, { attr: "charm", value: 1 }]),

  e("m001", "midlife", 46, 50, "你突然开始怀念小时候那条路，虽然它早就被修成了停车场。", [{ attr: "mindset", value: 1 }], ["怀旧"]),
  choice("m002", "midlife", 46, 55, "父母身体开始需要照顾，而你的工作正处在关键期。", [
    opt("A", "减少工作照顾家人", "心态 +1，魅力 +1，家境 -1，获得“照顾者”", [{ attr: "mindset", value: 1 }, { attr: "charm", value: 1 }, { attr: "family", value: -1 }], ["照顾者"]),
    opt("B", "请人帮忙，继续工作", "家境 -1，健康 +1，获得“现实安排”", [{ attr: "family", value: -1 }, { attr: "health", value: 1 }], ["现实安排"]),
    opt("C", "两边都硬扛", "家境 +1，健康 -2，心态 -1，获得“硬扛”", [{ attr: "family", value: 1 }, { attr: "health", value: -2 }, { attr: "mindset", value: -1 }], ["硬扛"])
  ]),
  e("m003", "midlife", 48, 55, "你的一个旧朋友突然联系你，你们聊到半夜，像把丢掉的自己捡回来一点。", [{ attr: "mindset", value: 1 }, { attr: "charm", value: 1 }], ["旧友"]),
  e("m004", "midlife", 50, 58, "你开始对年轻同事说自己当年也不容易，说完忽然意识到这句话有点危险。", [{ attr: "mindset", value: 1 }, { attr: "charm", value: -1 }]),
  e("m005", "midlife", 52, 60, "你买了人生中第一把真正舒服的椅子，并宣布这是成熟的标志。", [{ attr: "health", value: 1 }, { attr: "mindset", value: 1 }]),
  e("m006", "midlife", 55, 60, "一场小病让你在医院走廊里坐了很久。你决定少熬夜，至少今晚开始。", [{ attr: "health", value: -1 }, { attr: "mindset", value: 1 }], ["健康警报"]),
  e("m007", "midlife", 56, 60, "你把一项经验教给年轻人，对方真诚地说了谢谢。你开心了一整天。", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["传承"]),

  e("l001", "elder", 61, 65, "你退休了。第一天早上，你盯着闹钟看了三分钟，才确认它不用响了。", [{ attr: "mindset", value: 1 }], ["退休"]),
  e("l002", "elder", 62, 70, "你开始在公园散步，逐渐认识了一群固定时间出现的人。", [{ attr: "health", value: 1 }, { attr: "charm", value: 1 }], ["公园社交"]),
  e("l003", "elder", 66, 72, "你学会了用新软件，虽然总点错，但终于能和远方的人视频。", [{ attr: "intelligence", value: 1 }, { attr: "mindset", value: 1 }]),
  choice("l004", "elder", 68, 76, "有人邀请你参与一个社区兴趣小组，你有点犹豫。", [
    opt("A", "去看看", "魅力 +1，心态 +1，获得“社区明星”", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["社区明星"]),
    opt("B", "还是在家清静", "健康 +1，心态 +1，获得“安静晚年”", [{ attr: "health", value: 1 }, { attr: "mindset", value: 1 }], ["安静晚年"])
  ]),
  e("l005", "elder", 70, 80, "你翻出年轻时的照片，发现那时候的自己比记忆里更勇敢。", [{ attr: "mindset", value: 1 }], ["和解"]),
  e("l006", "elder", 72, 80, "你给后辈讲了一个失败故事，他们听得比成功故事还认真。", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["人生导师"]),
  e("l007", "elder", 75, 80, "你开始把常用物品贴上标签，生活变慢了，但也更从容了。", [{ attr: "health", value: -1 }, { attr: "mindset", value: 1 }]),

  e("x001", "extra", 81, 88, "你活过了很多同龄人的预期，亲戚见你都说：精神真好。", [{ attr: "mindset", value: 1 }], ["高寿"]),
  e("x002", "extra", 82, 92, "你偶尔会忘事，但从没忘记自己最爱吃什么。", [{ attr: "health", value: -1 }, { attr: "mindset", value: 1 }]),
  e("x003", "extra", 85, 96, "你在一个晴朗下午睡着，醒来时觉得这一生像一本翻得起皱的书。", [{ attr: "mindset", value: 1 }], ["回望"]),
  e("x004", "extra", 88, 105, "你安静地离开了。有人在整理遗物时，发现你收藏着很多张旧票根。", [], ["自然离世"], true)
];

const EXTRA_CHOICE_EVENTS = [
  choice("c009", "childhood", 10, 12, "你在班里被误会拿了别人的东西，老师让你当众解释。", [
    opt("A", "冷静说明经过", "心态 +1，魅力 +1，获得“会解释自己”", [{ attr: "mindset", value: 1 }, { attr: "charm", value: 1 }], ["会解释自己"]),
    opt("B", "委屈地沉默", "心态 -1，获得“把话憋回去”", [{ attr: "mindset", value: -1 }], ["把话憋回去"]),
    opt("C", "直接顶撞老师", "魅力 +1，家境 -1，获得“早期叛逆”", [{ attr: "charm", value: 1 }, { attr: "family", value: -1 }], ["早期叛逆"])
  ]),
  choice("s010", "school", 16, 19, "你发现自己喜欢一件不太被家长认可的事：写歌、画画、拍视频或者做游戏。", [
    opt("A", "偷偷坚持", "智力 +1，心态 +1，获得“暗线热爱”", [{ attr: "intelligence", value: 1 }, { attr: "mindset", value: 1 }], ["暗线热爱"]),
    opt("B", "公开争取支持", "魅力 +1，家境 -1，获得“为热爱争辩”", [{ attr: "charm", value: 1 }, { attr: "family", value: -1 }], ["为热爱争辩"]),
    opt("C", "先放下，专心考试", "智力 +1，心态 -1，获得“延迟梦想”", [{ attr: "intelligence", value: 1 }, { attr: "mindset", value: -1 }], ["延迟梦想"]),
    opt("D", "把它变成副业尝试", "运气 +1，健康 -1，获得“早期副业”", [{ attr: "luck", value: 1 }, { attr: "health", value: -1 }], ["早期副业"])
  ]),
  choice("e009", "earlyCareer", 24, 30, "你收到一个去外地发展的机会，薪水更高，但要离开熟悉的人。", [
    opt("A", "立刻出发", "运气 +2，心态 -1，获得“远行选择”", [{ attr: "luck", value: 2 }, { attr: "mindset", value: -1 }], ["远行选择"]),
    opt("B", "留下来经营关系", "魅力 +1，心态 +1，获得“关系经营”", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["关系经营"]),
    opt("C", "先谈远程合作", "智力 +1，运气 +1，获得“折中方案”", [{ attr: "intelligence", value: 1 }, { attr: "luck", value: 1 }], ["折中方案"])
  ]),
  choice("e010", "earlyCareer", 27, 32, "你第一次有了一笔可支配存款，朋友推荐你投资一个热门项目。", [
    opt("A", "谨慎买一点", "运气 +1，家境 +1，获得“谨慎投资”", [{ attr: "luck", value: 1 }, { attr: "family", value: 1 }], ["谨慎投资"]),
    opt("B", "重仓冲进去", "高波动选择：运气高可能暴富，运气低会重伤", [{ attr: "luck", value: 1 }, { attr: "mindset", value: -2 }], ["高风险偏好"], {
      outcomes: [
        { when: life => scorePart(life, "luck") >= 8 && Math.random() < 0.4, text: "你刚好踩中了风口，账户数字像开了倍速。", effects: [{ attr: "family", value: 4 }, { attr: "luck", value: 1 }, { attr: "charm", value: 1 }], tags: ["投资暴富"] },
        { when: life => scorePart(life, "luck") <= 3, text: "项目暴雷得很快，你第一次知道热门不等于安全。", effects: [{ attr: "family", value: -3 }, { attr: "mindset", value: -2 }], tags: ["投资翻车"] },
        { when: life => scorePart(life, "mindset") <= 3, text: "行情波动让你连续失眠，最后在最差的位置割肉。", effects: [{ attr: "health", value: -1 }, { attr: "mindset", value: -2 }, { attr: "family", value: -1 }], tags: ["情绪交易"] }
      ]
    }),
    opt("C", "先补健康和学习", "健康 +1，智力 +1，获得“投资自己”", [{ attr: "health", value: 1 }, { attr: "intelligence", value: 1 }], ["投资自己"]),
    opt("D", "查资料后小额参与", "需要智力 ≥ 7；智力 +1，家境 +1，获得“风险意识”", [{ attr: "intelligence", value: 1 }, { attr: "family", value: 1 }], ["风险意识"], { require: { intelligence: 7 } })
  ]),
  choice("w009", "career", 34, 44, "你负责的项目出了事故，团队里有人暗示可以把责任推给新人。", [
    opt("A", "自己承担该承担的部分", "心态 +1，魅力 +1，家境 -1，获得“承担责任”", [{ attr: "mindset", value: 1 }, { attr: "charm", value: 1 }, { attr: "family", value: -1 }], ["承担责任"]),
    opt("B", "顺水推舟保住位置", "家境 +1，心态 -2，获得“职业污点”", [{ attr: "family", value: 1 }, { attr: "mindset", value: -2 }], ["职业污点"]),
    opt("C", "整理证据推动复盘", "智力 +1，魅力 +1，获得“系统复盘”", [{ attr: "intelligence", value: 1 }, { attr: "charm", value: 1 }], ["系统复盘"]),
    opt("D", "把危机变成公开复盘案例", "需要智力 ≥ 7 且魅力 ≥ 6；家境 +1，魅力 +2，获得“危机公关”", [{ attr: "family", value: 1 }, { attr: "charm", value: 2 }], ["危机公关"], { require: { intelligence: 7, charm: 6 } })
  ]),
  choice("w010", "career", 39, 48, "你突然被邀请站到台前：演讲、出镜、带团队或者公开表达观点。", [
    opt("A", "接受曝光", "魅力 +2，心态 -1，获得“被看见”", [{ attr: "charm", value: 2 }, { attr: "mindset", value: -1 }], ["被看见"]),
    opt("B", "退到幕后", "智力 +1，健康 +1，获得“幕后操盘”", [{ attr: "intelligence", value: 1 }, { attr: "health", value: 1 }], ["幕后操盘"]),
    opt("C", "只做一次试试", "运气 +1，魅力 +1，获得“试探性出场”", [{ attr: "luck", value: 1 }, { attr: "charm", value: 1 }], ["试探性出场"])
  ]),
  choice("m008", "midlife", 50, 60, "你发现自己已经很久没有真正开心过，于是想给生活开一个新窗口。", [
    opt("A", "学一门新技能", "智力 +1，心态 +1，获得“中年再学习”", [{ attr: "intelligence", value: 1 }, { attr: "mindset", value: 1 }], ["中年再学习"]),
    opt("B", "重新经营亲密关系", "魅力 +1，心态 +1，获得“关系修复”", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["关系修复"]),
    opt("C", "彻底换一种生活节奏", "健康 +1，家境 -1，获得“生活转向”", [{ attr: "health", value: 1 }, { attr: "family", value: -1 }], ["生活转向"])
  ]),
  choice("l008", "elder", 66, 79, "年轻人请你给他们一点人生建议，你知道自己不能替他们过人生。", [
    opt("A", "讲一次失败经历", "魅力 +1，心态 +1，获得“诚实长辈”", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["诚实长辈"]),
    opt("B", "只给钱不多嘴", "家境 -1，魅力 +1，获得“安静支持”", [{ attr: "family", value: -1 }, { attr: "charm", value: 1 }], ["安静支持"]),
    opt("C", "鼓励他们自己选", "心态 +2，获得“放手”", [{ attr: "mindset", value: 2 }], ["放手"])
  ])
];

const HIDDEN_EVENTS = [
  e("h001", "school", 13, 22, "隐藏事件：你的智力和家境形成了罕见反差，老师悄悄把一个竞赛名额留给了你。", [{ attr: "intelligence", value: 2 }, { attr: "mindset", value: 1 }], ["寒门逆袭"], false, life => scorePart(life, "intelligence") >= 8 && scorePart(life, "family") <= 4),
  e("h002", "earlyCareer", 23, 32, "隐藏事件：你看似走投无路，却在一个小机会里撞上贵人，人生突然拐弯。", [{ attr: "luck", value: 2 }, { attr: "family", value: 2 }], ["绝境翻盘"], false, life => scorePart(life, "luck") >= 8 && scorePart(life, "family") <= 4),
  e("h003", "earlyCareer", 24, 35, "隐藏事件：一次临场表达让你被更多人看见，贵人主动递来合作机会。", [{ attr: "charm", value: 2 }, { attr: "luck", value: 1 }], ["贵人相助"], false, life => scorePart(life, "charm") >= 7 && scorePart(life, "luck") >= 6),
  e("h004", "career", 31, 48, "隐藏事件：你识破了一个包装精美的骗局，没有赚快钱，但也没有掉进坑里。", [{ attr: "intelligence", value: 1 }, { attr: "family", value: 1 }], ["看穿骗局"], false, life => scorePart(life, "intelligence") >= 8),
  e("h005", "career", 35, 55, "隐藏事件：连续的压力没有击垮你，反而把你训练成了能接住坏消息的人。", [{ attr: "mindset", value: 2 }, { attr: "charm", value: 1 }], ["创伤后成长"], false, life => scorePart(life, "mindset") >= 8 && life.history.some(item => item.effects.reduce((sum, effect) => sum + effect.value, 0) < 0)),
  e("h006", "midlife", 45, 58, "隐藏事件：你忽然意识到，人生不是越用力越好，于是主动换了一种活法。", [{ attr: "health", value: 1 }, { attr: "mindset", value: 2 }], ["中年觉醒"], false, life => scorePart(life, "mindset") >= 8),
  e("h007", "midlife", 40, 60, "隐藏事件：身体用一次尖锐的警告阻止你继续透支。你被迫停下来。", [{ attr: "health", value: -1 }, { attr: "mindset", value: 1 }], ["健康警钟"], false, life => scorePart(life, "health") <= 3),
  e("h008", "elder", 61, 80, "隐藏事件：因为年轻时攒下的健康和心态，你在晚年开启了真正的第二人生。", [{ attr: "health", value: 1 }, { attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["第二人生"], false, life => scorePart(life, "health") >= 8 && scorePart(life, "mindset") >= 7)
];

const ALL_EVENTS = [...BASE_EVENTS, ...EXTRA_CHOICE_EVENTS, ...HIDDEN_EVENTS];

const GENERIC_EVENTS = [
  "这一年没有大事发生。你照常吃饭、睡觉、赶路，也照常在某个瞬间怀疑人生。",
  "你遇到一点小麻烦，解决后发现自己比想象中耐烦。",
  "有个普通的下午，你突然觉得日子虽然没那么厉害，但也没有那么糟。",
  "你错过了一班车，却因此在路边吃到一家很好吃的小店。",
  "你收到一条迟来的消息，心情被轻轻拨动了一下。"
];

const ENDINGS = [
  {
    id: "warmOrdinary",
    title: "平凡但没有认输的一生",
    condition: state => scorePart(state, "mindset") >= 6 && relationScore(state) >= 58,
    summary: "你没有成为新闻里的人，也没有把每个愿望都变成现实。但你认真生活，认真告别，也认真爱过一些人。"
  },
  {
    id: "richInsomnia",
    title: "一夜暴富然后失眠的一生",
    condition: state => wealthScore(state) >= 78 && scorePart(state, "health") <= 5,
    summary: "你拥有过不少资源，也为此长期紧绷。很多人羡慕你的成功，却不知道你最想要的是一次不设闹钟的睡眠。"
  },
  {
    id: "scholar",
    title: "学术巨佬但社交归零",
    condition: state => scorePart(state, "intelligence") >= 8 && scorePart(state, "charm") <= 4,
    summary: "你把许多复杂问题想明白了，却一直不太擅长解释自己。少数懂你的人，成了你人生里很亮的灯。"
  },
  {
    id: "wanderer",
    title: "一直在路上的人生",
    condition: state => hasTag(state, "漂泊者") || hasTag(state, "迁徙"),
    summary: "你换过城市、换过住处，也换过很多对未来的说法。你不一定抵达了哪里，但你确实看过很多风景。"
  },
  {
    id: "familyKeeper",
    title: "把家人放在心上的一生",
    condition: state => hasTag(state, "家庭优先") || hasTag(state, "照顾者"),
    summary: "你的人生不总是轻松，很多决定也不够漂亮。但有人因为你而少吃了一些苦，这件事不小。"
  },
  {
    id: "entrepreneur",
    title: "三次折腾两次翻车的一生",
    condition: state => hasTag(state, "创业者") || hasTag(state, "副业尝试"),
    summary: "你不太适合安稳。你尝试、失败、再尝试，偶尔也会赢一次。你的人生像一张被反复修改的商业计划书。"
  },
  {
    id: "quietLongLife",
    title: "安静又很长的一生",
    condition: state => state.age >= 82 && scorePart(state, "health") >= 5,
    summary: "你慢慢老去，也慢慢和很多事和解。到最后，你最珍惜的不是惊天动地，而是每天醒来还能看见熟悉的光。"
  },
  {
    id: "default",
    title: "说不上完美但确实活过的一生",
    condition: () => true,
    summary: "你的人生有过选择，也有过被选择。有些地方走对了，有些地方只能算了。无论如何，这一局已经写完。"
  }
];

let appState = {
  view: "home",
  setup: null,
  life: null,
  collection: loadCollection()
};

function e(id, stage, minAge, maxAge, text, effects = [], tags = [], terminal = false, condition = null) {
  return { id, stage, minAge, maxAge, text, type: "auto", effects, tags, terminal, condition };
}

function choice(id, stage, minAge, maxAge, text, choices) {
  return { id, stage, minAge, maxAge, text, type: "choice", choices };
}

function opt(id, text, hint, effects = [], tags = [], meta = {}) {
  return { id, text, hint, effects, tags, ...meta };
}

function clamp(value, min = 0, max = 10) {
  return Math.max(min, Math.min(max, value));
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function sample(items, count) {
  const copy = [...items];
  const result = [];
  while (copy.length && result.length < count) {
    result.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return result;
}

function weightedRandom(items) {
  const weights = items.map(item => RARITY[item.rarity]?.weight || 1);
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return items[i];
  }
  return items[items.length - 1];
}

function drawTalents(count = 6, luckBonus = 0) {
  const pool = [...TALENTS];
  const result = [];
  while (pool.length && result.length < count) {
    const weights = pool.map(item => {
      const base = RARITY[item.rarity]?.weight || 1;
      // 运气加成对稀有/史诗/传说提供轻微倾斜
      if (item.rarity !== "common") return base + luckBonus * 0.6;
      return base;
    });
    const total = weights.reduce((a, b) => a + b, 0);
    let roll = Math.random() * total;
    let idx = 0;
    for (; idx < pool.length; idx++) {
      roll -= weights[idx];
      if (roll <= 0) break;
    }
    if (idx >= pool.length) idx = pool.length - 1;
    result.push(pool.splice(idx, 1)[0]);
  }
  // 保底：若 6 张全是普通，最后一张提升为稀有
  if (count >= 4 && result.every(item => item.rarity === "common")) {
    const rare = TALENTS.filter(t => t.rarity === "rare" && !result.find(r => r.id === t.id));
    if (rare.length) result[result.length - 1] = randomItem(rare);
  }
  return result;
}

function getStage(age) {
  return STAGES.find(stage => age >= stage.min && age <= stage.max) || STAGES[STAGES.length - 1];
}

function analyzeFortune(nameInput, birthDate, birthHourId) {
  const name = (nameInput || "兰姗").trim() || "兰姗";
  const date = new Date(`${birthDate || "1998-08-08"}T12:00:00`);
  const year = Number.isNaN(date.getFullYear()) ? 1998 : date.getFullYear();
  const month = Number.isNaN(date.getMonth()) ? 8 : date.getMonth() + 1;
  const day = Number.isNaN(date.getDate()) ? 8 : date.getDate();
  const hour = HOUR_BRANCHES.find(item => item.id === birthHourId) || HOUR_BRANCHES[4];

  const yearStem = STEMS[(year - 4) % 10];
  const yearBranch = BRANCHES[(year - 4) % 12];
  const monthStem = STEMS[(year + month) % 10];
  const monthBranch = BRANCHES[(month + 1) % 12];
  const dayStem = STEMS[(year + month + day) % 10];
  const dayBranch = BRANCHES[(year + day) % 12];
  const pillars = [`${yearStem}${yearBranch}`, `${monthStem}${monthBranch}`, `${dayStem}${dayBranch}`, `?${hour.branch}`];

  const elementScores = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  [yearStem, monthStem, dayStem].forEach(stem => elementScores[STEM_ELEMENTS[stem]] += 2);
  [yearBranch, monthBranch, dayBranch, hour.branch].forEach(branch => elementScores[BRANCH_ELEMENTS[branch] || hour.element] += 1);
  elementScores[hour.element] += 1;

  [...name].forEach((char, index) => {
    const element = ["木", "火", "土", "金", "水"][(char.charCodeAt(0) + index) % 5];
    elementScores[element] += 1;
  });

  const sorted = Object.entries(elementScores).sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0][0];
  const weakest = sorted[sorted.length - 1][0];
  const nameScore = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 100;
  const fortuneScore = clamp(Math.round((nameScore + sorted[0][1] * 9 + sorted[1][1] * 5) / 1.8), 40, 96);
  const focusMap = { 木: "学习成长", 火: "人缘表达", 土: "家庭稳定", 金: "机遇财运", 水: "心态流动" };
  const adviceMap = {
    木: "多给自己留出学习和试错空间，越到后面越能靠积累翻盘。",
    火: "适合主动表达和被看见，但要避免一时冲动消耗关系。",
    土: "适合走稳扎稳打路线，家庭和长期承诺会成为重要支点。",
    金: "机会常在规则、资源和关键判断里出现，别只靠运气硬冲。",
    水: "直觉和适应力较强，适合在变化里找到自己的节奏。"
  };
  const balanceText = `五行偏${strongest}，${weakest}气较弱。${adviceMap[strongest]}可刻意补一点${focusMap[weakest]}，人生会更稳。`;
  const effects = [
    { attr: ELEMENT_ATTR[strongest], value: 1 },
    { attr: "luck", value: fortuneScore >= 76 ? 1 : 0 }
  ].filter(effect => effect.value !== 0);

  return {
    name,
    birthDate: birthDate || "1998-08-08",
    birthHour: hour,
    pillars,
    elementScores,
    strongest,
    weakest,
    fortuneScore,
    focus: focusMap[strongest],
    summary: `${name}的名字气质偏柔中带韧，简化八字显示${balanceText}`,
    advice: `本局适合关注「${focusMap[strongest]}」。遇到关键选择时，优先选择能长期积累、少透支心力的路线。`,
    effects,
    tags: [`姓名:${name}`, `${focusMap[strongest]}运势`, `${strongest}旺`]
  };
}

function createSetup() {
  const attrs = randomAttrs();
  return {
    personName: "兰姗",
    birthDate: randomBirthDate(),
    birthHour: randomItem(HOUR_BRANCHES).id,
    background: weightedRandom(BACKGROUNDS),
    destiny: weightedRandom(DESTINIES),
    talentOptions: drawTalents(6, 0),
    selectedTalentIds: [],
    quirks: sample(QUIRKS, 2),
    attrs,
    rerollCount: 2,
    goal: randomItem(GOALS).id,
    setupStep: "birth"
  };
}

function randomBirthDate() {
  const year = 1985 + Math.floor(Math.random() * 25);
  const month = 1 + Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 27);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function randomAttrs() {
  const attrs = { health: 1, intelligence: 1, charm: 1, family: 1, luck: 1, mindset: 1 };
  let rest = 14;
  const keys = Object.keys(attrs);
  while (rest > 0) {
    const key = randomItem(keys);
    if (attrs[key] < 10) {
      attrs[key] += 1;
      rest -= 1;
    }
  }
  return attrs;
}

function startSetup() {
  appState.setup = createSetup();
  appState.view = "setup";
  saveCurrent();
  render();
}

function startLife() {
  const setup = appState.setup;
  const selectedTalents = setup.talentOptions.filter(t => setup.selectedTalentIds.includes(t.id));
  const fortune = analyzeFortune(setup.personName, setup.birthDate, setup.birthHour);
  const attrs = { ...setup.attrs };
  const tags = [...fortune.tags];
  const applyEffects = (effects) => {
    Object.entries(effects || {}).forEach(([key, value]) => {
      if (key in attrs) attrs[key] = clamp(attrs[key] + value);
    });
  };
  // 背景效果
  applyEffects(setup.background?.effects);
  if (setup.background?.tags) tags.push(...setup.background.tags);
  // 命格效果
  applyEffects(setup.destiny?.effects);
  if (setup.destiny?.tags) tags.push(...setup.destiny.tags);
  // 怪癖效果
  (setup.quirks || []).forEach(quirk => {
    applyEffects(quirk.effects);
    tags.push(...(quirk.tags || []));
  });
  // 运势效果
  fortune.effects.forEach(effect => {
    attrs[effect.attr] = clamp(attrs[effect.attr] + effect.value);
  });
  // 天赋效果
  selectedTalents.forEach(talent => {
    Object.entries(talent.effects).forEach(([key, value]) => {
      attrs[key] = clamp(attrs[key] + value);
    });
    tags.push(...(talent.tags || []));
  });
  appState.life = {
    status: "running",
    age: 0,
    stage: getStage(0).id,
    personName: setup.personName?.trim() || "兰姗",
    birthDate: setup.birthDate,
    birthHour: setup.birthHour,
    fortune,
    background: setup.background,
    destiny: setup.destiny,
    quirks: setup.quirks || [],
    goal: setup.goal,
    attributes: attrs,
    selectedTalents,
    tags: unique(tags),
    usedEventIds: [],
    history: [],
    currentEvent: null,
    pendingOutcome: null,
    ending: null
  };
  appState.view = "life";
  nextEvent();
}

function nextEvent() {
  const life = appState.life;
  if (!life) return;
  if (shouldEndNaturally(life)) {
    finishLife();
    return;
  }
  life.stage = getStage(life.age).id;
  life.pendingOutcome = null;
  life.currentEvent = pickEvent(life);
  life.status = life.currentEvent.type === "choice" ? "choice" : "running";
  saveCurrent();
  render();
}

function pickEvent(life) {
  const candidates = ALL_EVENTS.filter(event => {
    if (life.usedEventIds.includes(event.id)) return false;
    if (event.condition && !event.condition(life)) return false;
    return event.stage === life.stage && life.age >= event.minAge && life.age <= event.maxAge;
  });
  if (candidates.length) {
    const tagged = candidates.filter(event => (event.tags || []).some(tag => life.tags.includes(tag)));
    const hidden = candidates.filter(event => event.id.startsWith("h"));
    if (hidden.length && Math.random() < hiddenChance(life)) return randomItem(hidden);
    // 命格/天赋让选择题更频繁出现
    const choiceFirst = (life.attributes.luck || 0) >= 7 || hasTag(life, "命运之子") || hasTag(life, "紫微");
    if (choiceFirst) {
      const choiceCandidates = (tagged.length ? tagged : candidates).filter(e => e.type === "choice");
      if (choiceCandidates.length && Math.random() < 0.55) return randomItem(choiceCandidates);
    }
    return randomItem(tagged.length ? tagged : candidates);
  }
  return {
    id: `g-${life.age}-${life.history.length}`,
    stage: life.stage,
    minAge: life.age,
    maxAge: life.age,
    text: randomItem(GENERIC_EVENTS),
    type: "auto",
    effects: randomSmallEffects(life),
    tags: []
  };
}

function applyAutoEvent() {
  const event = appState.life.currentEvent;
  applyOutcome(event.effects || [], event.tags || []);
  addHistory(event.text, event.effects || [], event.tags || []);
  if (event.terminal) {
    finishLife();
    return;
  }
  advanceAge();
}

function applyChoice(choiceOption) {
  if (!meetsRequirement(appState.life, choiceOption.require)) {
    showToast(`条件不足：${formatRequirement(choiceOption.require)}`);
    return;
  }
  const event = appState.life.currentEvent;
  const result = resolveChoiceOutcome(choiceOption, appState.life);
  applyOutcome(result.effects || [], result.tags || []);
  addHistory(`${event.text} 你选择了：${choiceOption.text}${result.text ? `。${result.text}` : ""}`, result.effects || [], result.tags || []);
  appState.life.pendingOutcome = buildOutcomeReveal(choiceOption, result);
  appState.life.status = "outcome";
  saveCurrent();
  render();
}

function resolveChoiceOutcome(choiceOption, life) {
  const matched = (choiceOption.outcomes || []).find(outcome => {
    try {
      return outcome.when?.(life);
    } catch {
      return false;
    }
  });
  if (!matched) return choiceOption;
  return {
    ...choiceOption,
    text: matched.text,
    effects: matched.effects || choiceOption.effects || [],
    tags: unique([...(choiceOption.tags || []), ...(matched.tags || [])])
  };
}

function buildOutcomeReveal(choiceOption, result) {
  const changedByJudge = Boolean(result.text);
  const tags = result.tags || [];
  return {
    title: changedByJudge ? "命运判定改变了结果" : "选择已结算",
    intro: result.text || `你选择了「${choiceOption.text}」。命运没有立刻给出夸张的回声，但轨迹已经改变。`,
    judge: inferJudgeText(choiceOption, result),
    effects: result.effects || [],
    tags
  };
}

function inferJudgeText(choiceOption, result) {
  if (result.text) {
    if ((result.effects || []).some(effect => effect.value >= 3)) return "强判定成功：属性优势把普通选择推成了高收益事件。";
    if ((result.effects || []).some(effect => effect.value <= -2)) return "判定受挫：当前属性没能接住这次风险。";
    return "属性判定生效：这一局的底色改变了事件走向。";
  }
  if (choiceOption.require) return `门槛判定通过：${formatRequirement(choiceOption.require)}。`;
  return "普通结算：这次选择按基础效果推进。";
}

function buildEventHint(life, event) {
  const unlocks = event.choices.filter(option => option.require && meetsRequirement(life, option.require));
  const locked = event.choices.filter(option => option.require && !meetsRequirement(life, option.require));
  const hints = [];
  if (unlocks.length) hints.push(`你已解锁 ${unlocks.length} 个高阶选项。`);
  if (locked.length) hints.push(`还有 ${locked.length} 个选项被属性挡住。`);
  if (event.choices.some(option => option.outcomes?.length)) hints.push("这个事件存在隐藏判定，同一选择可能因为属性不同走向不同。");
  if (scorePart(life, "luck") >= 8) hints.push("高运气会放大意外收益，也会诱导更高风险。");
  if (scorePart(life, "mindset") <= 3) hints.push("低心态会让高压选择更容易崩盘。");
  return hints.length ? `命运提示：${hints.join(" ")}` : "命运提示：这次选择会留下标签，并影响后续事件池。";
}

function hiddenChance(life) {
  const base = 0.12;
  const luckBonus = (scorePart(life, "luck") || 0) * 0.015;
  const mindsetBonus = (scorePart(life, "mindset") || 0) >= 8 ? 0.08 : 0;
  return clamp(base + luckBonus + mindsetBonus, 0.08, 0.38);
}

function meetsRequirement(life, requirement) {
  if (!requirement) return true;
  return Object.entries(requirement).every(([key, min]) => scorePart(life, key) >= min);
}

function formatRequirement(requirement) {
  if (!requirement) return "";
  return Object.entries(requirement).map(([key, min]) => `${labelAttr(key)} ≥ ${min}`).join("，");
}

function applyOutcome(effects, tags) {
  const life = appState.life;
  effects.forEach(effect => {
    life.attributes[effect.attr] = clamp(life.attributes[effect.attr] + effect.value);
  });
  life.tags = unique([...life.tags, ...tags]);
}

function addHistory(text, effects, tags) {
  const life = appState.life;
  life.usedEventIds.push(life.currentEvent.id);
  life.history.unshift({
    age: life.age,
    stage: life.stage,
    text,
    effects,
    tags,
    attributes: { ...life.attributes }
  });
}

function advanceAge() {
  const life = appState.life;
  if (life.attributes.health <= 0) {
    finishLife("health");
    return;
  }
  life.age += Math.floor(Math.random() * 3) + 1;
  if (life.age > 96) {
    const deathChance = Math.min(0.85, (life.age - 88) * 0.08 + (10 - life.attributes.health) * 0.04);
    if (Math.random() < deathChance) {
      finishLife("natural");
      return;
    }
  }
  nextEvent();
}

function shouldEndNaturally(life) {
  return life.age >= 105 || life.attributes.health <= 0;
}

function finishLife(reason = "normal") {
  const life = appState.life;
  const ending = buildEnding(life, reason);
  life.ending = ending;
  life.status = "ended";
  life.currentEvent = null;
  appState.view = "ending";
  localStorage.setItem(STORAGE_KEYS.last, JSON.stringify(ending));
  saveCurrent();
  render();
}

function buildEnding(life, reason) {
  const matched = reason === "health"
    ? { title: "长期透支后提前谢幕的一生", summary: "你一路硬撑，也一路忽视身体发出的提醒。人生在某个不体面的时刻停下，留给后来者一句话：别总把健康放在最后。", id: "healthEnd" }
    : ENDINGS.find(ending => ending.condition(life));
  const detailScores = {
    happiness: clamp(Math.round(life.attributes.mindset * 8 + life.attributes.charm * 2), 0, 100),
    wealth: wealthScore(life),
    relation: relationScore(life),
    health: clamp(life.attributes.health * 10, 0, 100)
  };
  const goalBoost = goalAdjustment(life.goal, detailScores);
  const total = clamp(Math.round((detailScores.happiness + detailScores.wealth + detailScores.relation + detailScores.health) / 4 + goalBoost), 0, 100);
  const highlight = pickHighlight(life, true);
  const regret = pickHighlight(life, false);
  const archetype = identifyArchetype(life);
  const dynamic = buildDynamicResult(life, detailScores, total, matched);
  const report = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    endingId: matched.id,
    personName: life.personName || "兰姗",
    title: matched.title,
    summary: matched.summary,
    dynamicSummary: dynamic.summary,
    archetype,
    scoreLabel: dynamic.scoreLabel,
    destinyComment: dynamic.destinyComment,
    turningPoints: dynamic.turningPoints,
    futureAdvice: dynamic.futureAdvice,
    scoreInsights: dynamic.scoreInsights,
    age: life.age,
    score: total,
    detailScores,
    tags: life.tags.slice(-8),
    goal: GOALS.find(g => g.id === life.goal)?.name || "自由",
    background: typeof life.background === "string" ? life.background : `${life.background?.name || ""}（${RARITY[life.background?.rarity]?.label || "普通"}）`,
    destinyName: life.destiny ? `${life.destiny.name}（${RARITY[life.destiny.rarity]?.label || "普通"}）` : "凡人之命",
    quirks: (life.quirks || []).map(q => q.name),
    fortune: life.fortune,
    talents: life.selectedTalents.map(t => t.name),
    highlight,
    regret,
    history: life.history.slice(0, 30),
    createdAt: new Date().toLocaleString("zh-CN")
  };
  report.shareText = `${report.personName}在《人生模拟器》里活出了「${report.title}」：${report.score} 分（${report.scoreLabel}），本局流派是「${report.archetype.name}」，结束于 ${report.age} 岁。${report.dynamicSummary} 开局运势：${report.fortune?.focus || "自由生长"}。高光：${report.highlight} 遗憾：${report.regret}`;
  return report;
}

function buildDynamicResult(life, scores, total, matched) {
  const topScore = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const lowScore = Object.entries(scores).sort((a, b) => a[1] - b[1])[0];
  const topLabel = scoreLabelName(topScore[0]);
  const lowLabel = scoreLabelName(lowScore[0]);
  const goalName = GOALS.find(g => g.id === life.goal)?.name || "自由";
  const decisiveTags = life.tags.filter(tag => !tag.startsWith("姓名:")).slice(-5);
  const choiceCount = life.history.filter(item => item.text.includes("你选择了")).length;
  const positiveCount = life.history.filter(item => item.effects.reduce((sum, effect) => sum + effect.value, 0) > 0).length;
  const negativeCount = life.history.filter(item => item.effects.reduce((sum, effect) => sum + effect.value, 0) < 0).length;
  const scoreLabel = total >= 88 ? "很亮眼" : total >= 75 ? "有起伏但值得" : total >= 60 ? "普通但真实" : total >= 45 ? "消耗偏多" : "艰难模式";
  const fortuneLine = life.fortune
    ? `开局的「${life.fortune.focus}」运势给了你一个倾向：${life.fortune.strongest}旺让你更容易在${life.fortune.focus}上打开局面，${life.fortune.weakest}弱则让你在人生后半段需要补课。`
    : "这局没有明显的命理倾向，更多由选择和随机事件塑造。";
  const tagLine = decisiveTags.length
    ? `真正改变走向的标签是：${decisiveTags.join("、")}。`
    : "这局人生没有积累太多鲜明标签，更像是一段缓慢展开的普通生活。";
  const summary = `${life.personName || "兰姗"}这一生最强的是${topLabel}，最薄的是${lowLabel}。目标选择了「${goalName}」，但结果更像是被「${topLabel}」牵着走。${tagLine}`;
  const destinyComment = `${matched.summary} ${fortuneLine} 全局看，你做过 ${choiceCount} 次关键选择，其中 ${positiveCount} 次带来明显增益，${negativeCount} 次留下代价。`;
  const turningPoints = buildTurningPoints(life);
  const futureAdvice = buildFutureAdvice(life, lowScore[0], topScore[0], total);
  const scoreInsights = [
    `最高维度：${topLabel} ${topScore[1]} 分，说明这局人生在这方面留下了最清晰的收益。`,
    `最低维度：${lowLabel} ${lowScore[1]} 分，这是下一次重开最值得主动修正的方向。`,
    `目标匹配：${goalName}目标带来的修正已计入总评，分数不是单纯财富或名望排名。`
  ];
  return { summary, scoreLabel, destinyComment, turningPoints, futureAdvice, scoreInsights };
}

function buildTurningPoints(life) {
  const choices = life.history.filter(item => item.text.includes("你选择了"));
  const ranked = choices
    .map(item => ({
      ...item,
      weight: Math.abs(item.effects.reduce((sum, effect) => sum + effect.value, 0)) + item.tags.length
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4);
  const source = ranked.length ? ranked : life.history.slice(0, 4);
  return source.map(item => ({
    age: item.age,
    title: `${item.age} 岁的转折`,
    text: item.text,
    result: item.effects.length ? item.effects.map(effect => `${labelAttr(effect.attr)}${effect.value > 0 ? "+" : ""}${effect.value}`).join("，") : "没有明显数值变化",
    tags: item.tags || []
  }));
}

function buildFutureAdvice(life, weakKey, strongKey, total) {
  const weak = scoreLabelName(weakKey);
  const strong = scoreLabelName(strongKey);
  const advice = [];
  advice.push(total >= 75 ? `下一局可以尝试反向人生：少依赖${strong}，看看补足${weak}后会不会出现完全不同的结局。` : `下一局建议先保住${weak}，不要太早用健康、关系或心态去换短期收益。`);
  if (hasTag(life, "高风险偏好") || hasTag(life, "创业者")) advice.push("你适合走高波动路线，但要给失败留缓冲，不要把所有筹码一次压完。");
  if (hasTag(life, "家庭优先") || hasTag(life, "照顾者")) advice.push("家庭线能带来稳定感，但别把自己的需求长期静音。");
  if (hasTag(life, "被看见") || hasTag(life, "社区明星")) advice.push("表达和曝光会放大机会，也会放大消耗，下一局可以试着给自己设置边界。");
  if (life.fortune) advice.push(`按本局运势，${life.fortune.focus}仍是优势位；若想改变命运感，可以刻意选择补${life.fortune.weakest}的选项。`);
  return advice.slice(0, 4);
}

function identifyArchetype(life) {
  const attr = life.attributes;
  const tags = life.tags || [];
  const choiceCount = life.history.filter(item => item.text.includes("你选择了")).length;
  const hiddenCount = life.history.filter(item => item.text.includes("隐藏事件")).length;
  const rules = [
    { name: "学霸逆袭流", condition: () => attr.intelligence >= 8 && attr.family <= 5, desc: "靠智力和长期积累翻盘，前期吃苦，后期容易出现隐藏机会。" },
    { name: "富二代探索流", condition: () => attr.family >= 8 && attr.mindset <= 6, desc: "容错率很高，但也更容易陷入资源很好却不够快乐的状态。" },
    { name: "天选投机流", condition: () => attr.luck >= 8 && attr.intelligence <= 6, desc: "机会多、波动大，适合投资、创业、远行，但翻车也会很疼。" },
    { name: "稳健幸福流", condition: () => attr.mindset >= 8 && attr.health >= 7, desc: "不是最刺激的路线，但抗压强、恢复快，结局质量更稳定。" },
    { name: "社交名望流", condition: () => attr.charm >= 8 && attr.luck >= 6, desc: "靠表达、合作和贵人打开局面，适合曝光、团队和公众路线。" },
    { name: "苦难反杀流", condition: () => attr.mindset >= 8 && attr.family <= 5 && attr.health <= 5, desc: "难度高但故事性强，越是逆境越容易触发成长和翻盘。" },
    { name: "专家建设流", condition: () => attr.intelligence >= 8 && tags.includes("系统复盘"), desc: "擅长把混乱变成方法，适合长期主义和系统建设。" },
    { name: "命运支线流", condition: () => hiddenCount >= 2, desc: "隐藏事件触发较多，这局不是简单数值局，而是被命运推着转向。" },
    { name: "选择密集流", condition: () => choiceCount >= 12, desc: "关键选择很多，人生更多由玩家主动塑形，而不是自动事件决定。" }
  ];
  const matched = rules.find(rule => rule.condition());
  return matched ? { name: matched.name, desc: matched.desc } : { name: "普通人生流", desc: "没有走向单一极端，像真实人生一样由很多小选择慢慢拼成。" };
}

function scoreLabelName(key) {
  return {
    happiness: "幸福",
    wealth: "财富",
    relation: "关系",
    health: "健康"
  }[key] || key;
}

function goalAdjustment(goal, scores) {
  const map = {
    wealth: scores.wealth,
    love: scores.relation,
    family: scores.relation,
    freedom: scores.happiness,
    fame: Math.round((scores.wealth + scores.relation) / 2),
    longevity: scores.health
  };
  const target = map[goal] || 50;
  return target >= 75 ? 6 : target >= 60 ? 3 : target < 35 ? -5 : 0;
}

function wealthScore(life) {
  let score = life.attributes.family * 8 + life.attributes.luck * 3 + life.attributes.intelligence * 2;
  if (hasTag(life, "管理者")) score += 10;
  if (hasTag(life, "创业者")) score += life.attributes.luck >= 7 ? 14 : -4;
  if (hasTag(life, "事业优先")) score += 9;
  return clamp(Math.round(score), 0, 100);
}

function relationScore(life) {
  let score = life.attributes.charm * 7 + life.attributes.mindset * 4;
  if (hasTag(life, "家庭优先")) score += 12;
  if (hasTag(life, "照顾者")) score += 12;
  if (hasTag(life, "童年好友")) score += 6;
  if (hasTag(life, "社交恐惧")) score -= 4;
  return clamp(Math.round(score), 0, 100);
}

function scorePart(life, attr) {
  return life.attributes[attr] || 0;
}

function hasTag(life, tag) {
  return life.tags.includes(tag);
}

function pickHighlight(life, positive) {
  const history = life.history;
  const filtered = history.filter(item => {
    const sum = item.effects.reduce((acc, effect) => acc + effect.value, 0);
    return positive ? sum > 0 : sum < 0;
  });
  const item = filtered[0] || history[0];
  if (!item) return positive ? "你认真完成了这一生。" : "有些答案来得太晚。";
  return `${item.age} 岁，${item.text}`;
}

function randomSmallEffects(life) {
  const attr = randomItem(ATTRS)[0];
  const luck = life?.attributes?.luck || 5;
  // luck 高，正向概率高；luck 低，正向概率低
  const positiveChance = clamp(0.4 + luck * 0.04, 0.2, 0.8);
  return [{ attr, value: Math.random() < positiveChance ? 1 : -1 }];
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function render() {
  const root = document.getElementById("app");
  const viewMap = {
    home: renderHome,
    setup: renderSetup,
    life: renderLife,
    ending: renderEnding,
    collection: renderCollection
  };
  root.innerHTML = viewMap[appState.view]();
  bindEvents();
}

function renderHome() {
  const last = readJSON(STORAGE_KEYS.last);
  const collection = appState.collection || [];
  const unlocked = computeUnlocked(collection);
  const todayLegend = 17 + new Date().getDate() + Math.floor(Math.random() * 12);
  return `
    <section class="hero hero-destiny">
      <div class="hero-copy">
        <p class="eyebrow">Life Simulator</p>
        <h1>人生模拟器</h1>
        <p class="subtitle">你无法选择出生，但可以揭开命运发给你的第一张牌。抽背景、命格、天赋和怪癖，再把这一世活到结局。</p>
        <div class="hero-actions">
          <button class="button primary-cta" data-action="start-setup">揭开这一世</button>
          <button class="button secondary" data-action="show-collection">查看前世</button>
          ${appState.life && appState.life.status !== "ended" ? `<button class="button ghost" data-action="continue-life">继续上一世</button>` : ""}
        </div>
        <p class="omen-line">今日已有 ${todayLegend} 人抽到传说命格。下一张牌，也许轮到你。</p>
      </div>
      <div class="destiny-card-stage" aria-hidden="true">
        <div class="side-card side-card-left">生</div>
        <div class="side-card side-card-right">赋</div>
        <div class="destiny-card-back">
          <div class="card-back-mark">命</div>
          <div class="card-back-title">此生命格未揭开</div>
          <div class="card-back-lines">
            <span>甲乙丙丁戊己庚辛壬癸</span>
            <span>子丑寅卯辰巳午未申酉戌亥</span>
          </div>
        </div>
        <div class="orb-caption">抽命 · 改命 · 判命</div>
      </div>
      <div class="unlock-row" aria-label="图鉴解锁">
        <div class="unlock-pill"><strong>${unlocked.lives}</strong><span>累计人生</span></div>
        <div class="unlock-pill"><strong>${unlocked.talents}/${TALENTS.length}</strong><span>解锁天赋</span></div>
        <div class="unlock-pill"><strong>${unlocked.bg}/${BACKGROUNDS.length}</strong><span>解锁背景</span></div>
        <div class="unlock-pill"><strong>${unlocked.destiny}/${DESTINIES.length}</strong><span>解锁命格</span></div>
        <div class="unlock-pill"><strong>${unlocked.legendary}</strong><span>抽到过的传说</span></div>
      </div>
    </section>
    <div class="layout">
      <main class="panel">
        <div class="section-title">
          <div>
            <h2>这一局看什么</h2>
            <p>重点不在填配置，而在揭牌、判定和收藏一次值得截图的人生。</p>
          </div>
        </div>
        <div class="grid cols-3">
          <div class="card"><h3>1. 抽这一世</h3><p class="muted">出生背景、命格、怪癖先翻牌，普通和传说的质感完全不同。</p></div>
          <div class="card"><h3>2. 看属性判定</h3><p class="muted">智力、运气、心态会解锁选项，也会改变同一选择的结果。</p></div>
          <div class="card"><h3>3. 收人生判词</h3><p class="muted">结局生成流派、关键转折和适合分享的人生卡片。</p></div>
        </div>
      </main>
      <aside class="panel">
        <h3>最近一次人生</h3>
        ${last ? `
          <p class="muted">${escapeHTML(last.createdAt)}</p>
          <h3 style="margin-top:10px">${escapeHTML(last.title)}</h3>
          <div class="score" style="font-size:3rem">${last.score}</div>
          <p class="muted">${escapeHTML(last.summary)}</p>
        ` : `<div class="empty">还没有人生报告。先开始一局吧。</div>`}
      </aside>
    </div>
  `;
}

function computeUnlocked(collection) {
  const talentNames = new Set();
  const bgNames = new Set();
  const destinyNames = new Set();
  let legendary = 0;
  collection.forEach(item => {
    (item.talents || []).forEach(name => talentNames.add(name));
    if (item.background) bgNames.add(String(item.background).split("（")[0]);
    if (item.destinyName) destinyNames.add(String(item.destinyName).split("（")[0]);
    (item.tags || []).forEach(tag => {
      if (["命运之子", "凤凰命", "转生者", "紫微", "天煞", "神秘血统"].includes(tag)) legendary++;
    });
  });
  return {
    lives: collection.length,
    talents: talentNames.size,
    bg: bgNames.size,
    destiny: destinyNames.size,
    legendary
  };
}

function renderSetup() {
  const setup = appState.setup;
  const step = setup.setupStep || "birth";
  const steps = [
    ["birth", "出生牌"],
    ["talents", "天赋牌"],
    ["goal", "目标牌"],
    ["confirm", "确认命盘"]
  ];
  return `
    <section class="setup-stage">
      <div class="setup-topbar">
        <div>
          <p class="eyebrow">开局抽牌</p>
          <h1>${steps.find(item => item[0] === step)?.[1] || "出生牌"}</h1>
        </div>
        <div class="setup-steps">
          ${steps.map(([id, label], index) => `<button class="setup-step ${step === id ? "active" : ""}" data-action="setup-step" data-id="${id}"><span>${index + 1}</span>${label}</button>`).join("")}
        </div>
      </div>
      ${step === "birth" ? renderSetupBirth(setup) : ""}
      ${step === "talents" ? renderSetupTalents(setup) : ""}
      ${step === "goal" ? renderSetupGoal(setup) : ""}
      ${step === "confirm" ? renderSetupConfirm(setup) : ""}
    </section>
  `;
}

function renderSetupBirth(setup) {
  const rerollCount = setup.rerollCount ?? 0;
  return `
    <div class="scene-title">
      <h2>命运先发三张牌</h2>
      <p>出生、命格和怪癖决定这一局的底色。先别看属性表，先感受这副牌像不像你想玩的人生。</p>
    </div>
    <div class="fate-card-row">
      ${renderFateCard("出生背景", setup.background.name, setup.background.desc, setup.background.rarity, setup.background.effects, setup.background.tags, "reroll-background", "换背景")}
      ${renderFateCard("命格", setup.destiny.name, setup.destiny.desc, setup.destiny.rarity, setup.destiny.effects, setup.destiny.tags, "reroll-destiny", "重抽命格")}
      ${renderFateCard("怪癖", (setup.quirks || []).map(q => q.name).join(" / "), (setup.quirks || []).map(q => q.desc).join("。"), "rare", mergeEffects(setup.quirks || []), (setup.quirks || []).flatMap(q => q.tags || []), "reroll-quirks", "重抽怪癖")}
    </div>
    <div class="setup-actions">
      <button class="button secondary" data-action="reroll-all" ${rerollCount <= 0 ? "disabled" : ""}>整副牌重抽 (${rerollCount})</button>
      <button class="button ghost" data-action="go-home">返回首页</button>
      <button class="button primary-cta" data-action="setup-step" data-id="talents">接受这副牌</button>
    </div>
  `;
}

function renderSetupTalents(setup) {
  const selected = setup.talentOptions.filter(talent => setup.selectedTalentIds.includes(talent.id));
  return `
    <div class="scene-title">
      <h2>从卡池里带走最多 3 张天赋</h2>
      <p>已选天赋会成为这局的长期倾向。传说卡不只是数值更高，也更容易让人生走出隐藏线。</p>
    </div>
    <div class="selected-shelf">
      ${selected.length ? selected.map(talent => `<span>${escapeHTML(talent.name)}</span>`).join("") : `<em>还没有携带天赋</em>`}
    </div>
    <div class="talent-card-pool">
      ${setup.talentOptions.map(talent => `
        <button class="fate-card talent-pick ${RARITY[talent.rarity]?.className || ""} ${setup.selectedTalentIds.includes(talent.id) ? "selected" : ""}" data-action="toggle-talent" data-id="${talent.id}">
          <div class="rarity-badge">${RARITY[talent.rarity]?.label || ""}</div>
          <span class="card-kind">天赋</span>
          <strong>${escapeHTML(talent.name)}</strong>
          <p>${escapeHTML(talent.desc)}</p>
          <div class="tag-row">${Object.entries(talent.effects).map(([key, value]) => `<span class="tag primary">${labelAttr(key)} ${value > 0 ? "+" : ""}${value}</span>`).join("")}</div>
        </button>
      `).join("")}
    </div>
    <div class="setup-actions">
      <button class="button secondary" data-action="reroll-talents">重抽 6 张</button>
      <button class="button ghost" data-action="setup-step" data-id="birth">上一步</button>
      <button class="button primary-cta" data-action="setup-step" data-id="goal">确定天赋</button>
    </div>
  `;
}

function renderSetupGoal(setup) {
  return `
    <div class="scene-title">
      <h2>给这一世选一个方向</h2>
      <p>目标不会保证结局，但会影响最终判词。你不是选成功路线，而是在选这局最在意什么。</p>
    </div>
    <div class="goal-card-grid goal-card-grid-large">
      ${GOALS.map(goal => `
        <button class="goal-card destiny-goal ${setup.goal === goal.id ? "selected" : ""}" data-action="set-goal" data-id="${goal.id}">
          <span>${escapeHTML(GOAL_META[goal.id]?.mark || goal.name)}</span>
          <strong>${escapeHTML(goal.name)}</strong>
          <em>${escapeHTML(goal.desc)}</em>
        </button>
      `).join("")}
    </div>
    <p class="omen-line compact goal-omen">${escapeHTML(GOAL_META[setup.goal]?.omen || "")}</p>
    <div class="setup-actions">
      <button class="button ghost" data-action="setup-step" data-id="talents">上一步</button>
      <button class="button primary-cta" data-action="setup-step" data-id="confirm">确认方向</button>
    </div>
  `;
}

function renderSetupConfirm(setup) {
  const used = Object.values(setup.attrs).reduce((a, b) => a + b, 0);
  const remaining = 20 - used;
  const setupFortune = analyzeFortune(setup.personName, setup.birthDate, setup.birthHour);
  return `
    <div class="confirm-layout">
      <main class="panel fortune-card">
        <div class="section-title">
          <div>
            <h2>确认命盘</h2>
            <p>名字和八字只作为娱乐向开局倾向；真正改变走向的仍然是属性、事件和选择。</p>
          </div>
          <div class="fortune-score">${setupFortune.fortuneScore}</div>
        </div>
        <div class="form-grid">
          <label><span>名字</span><input id="personNameInput" class="text-input" maxlength="8" value="${escapeHTML(setup.personName || "兰姗")}" placeholder="兰姗"></label>
          <label><span>出生日期</span><input id="birthDateInput" class="text-input" type="date" value="${escapeHTML(setup.birthDate || "1998-08-08")}"></label>
          <label><span>出生时辰</span><select id="birthHourSelect" class="text-input">${HOUR_BRANCHES.map(hour => `<option value="${hour.id}" ${setup.birthHour === hour.id ? "selected" : ""}>${hour.name} · ${hour.range}</option>`).join("")}</select></label>
        </div>
        <div class="tag-row">
          ${setupFortune.pillars.map(item => `<span class="tag primary">${escapeHTML(item)}</span>`).join("")}
          <span class="tag primary">${escapeHTML(setupFortune.focus)}</span>
          <span class="tag">${escapeHTML(setupFortune.strongest)}旺 / ${escapeHTML(setupFortune.weakest)}弱</span>
        </div>
        <p class="muted" style="margin-top:12px">${escapeHTML(setupFortune.summary)}</p>
        <p class="muted" style="margin-top:6px">${escapeHTML(setupFortune.advice)}</p>
      </main>
      <aside class="panel">
        <h3>属性分配</h3>
        <p class="muted">已用 ${used} / 20 点。${remaining === 0 ? "刚好用完。" : remaining > 0 ? `还剩 ${remaining} 点。` : `超出 ${Math.abs(remaining)} 点。`}</p>
        <div class="attribute-list" style="margin-top:14px">
          ${ATTRS.map(([key, label]) => `
            <label class="attribute-row">
              <span>${label}</span>
              <input type="range" min="1" max="10" value="${setup.attrs[key]}" data-action="set-attr" data-attr="${key}">
              <strong>${setup.attrs[key]}</strong>
            </label>
          `).join("")}
        </div>
        <div class="setup-actions vertical">
          <button class="button" style="width:100%" data-action="start-life" ${remaining < 0 ? "disabled" : ""}>开始这一生</button>
          <button class="button secondary" style="width:100%" data-action="random-attrs">随机分配属性</button>
          <button class="button ghost" style="width:100%" data-action="setup-step" data-id="goal">上一步</button>
        </div>
      </aside>
    </div>
  `;
}

function renderFateCard(kind, name, desc, rarity, effects = {}, tags = [], action, actionText) {
  return `
    <article class="fate-card ${RARITY[rarity]?.className || ""}">
      <div class="rarity-badge">${RARITY[rarity]?.label || ""}</div>
      <span class="card-kind">${escapeHTML(kind)}</span>
      <strong>${escapeHTML(name)}</strong>
      <p>${escapeHTML(desc)}</p>
      <div class="tag-row">
        ${Object.entries(effects || {}).slice(0, 4).map(([key, value]) => `<span class="tag primary">${labelAttr(key)} ${value > 0 ? "+" : ""}${value}</span>`).join("")}
        ${(tags || []).slice(0, 3).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}
      </div>
      ${action ? `<button class="button secondary small" data-action="${action}">${actionText}</button>` : ""}
    </article>
  `;
}

function mergeEffects(items) {
  return items.reduce((acc, item) => {
    Object.entries(item.effects || {}).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value;
    });
    return acc;
  }, {});
}

function optionVisualClass(option, locked) {
  const classes = [];
  if (locked) classes.push("locked");
  if (option.require && !locked) classes.push("choice-unlocked");
  if (option.outcomes?.length) classes.push("choice-judged");
  if (/重仓|辞职|冒险|冲|高风险/.test(`${option.text}${option.hint}`)) classes.push("choice-risk");
  return classes.join(" ");
}

function lockLure(requirement) {
  if (!requirement) return "";
  if (requirement.intelligence) return "你隐约觉得哪里不对，但还不知道该怎么查。";
  if (requirement.charm) return "机会就在桌上，但你还缺少说服世界的方式。";
  if (requirement.family) return "这条路需要更厚的安全垫。";
  if (requirement.luck) return "命运还没有站到你这一边。";
  return "这条隐藏路线还没有向你开放。";
}

function renderLife() {
  const life = appState.life;
  const event = life.currentEvent;
  const reveal = life.pendingOutcome;
  return `
    <div class="layout">
      <main class="event-card">
        <div class="event-head">
          <div>
            <div class="age">${life.age} 岁</div>
            <div class="tag primary">${getStage(life.age).name}</div>
          </div>
          <button class="button secondary" data-action="go-home">回首页</button>
        </div>
        <p class="event-text">${escapeHTML(event.text)}</p>
        ${reveal ? `
          <div class="outcome-reveal">
            <p class="eyebrow">命运结算</p>
            <h2>${escapeHTML(reveal.title)}</h2>
            <p>${escapeHTML(reveal.intro)}</p>
            <div class="judge-line">${escapeHTML(reveal.judge)}</div>
            <div class="tag-row">${effectTags(reveal.effects || []).join("")}</div>
            ${(reveal.tags || []).length ? `<div class="tag-row">${reveal.tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>` : ""}
            <div class="actions"><button class="button" data-action="continue-outcome">继续下一年</button></div>
          </div>
        ` : event.type === "choice" ? `
          <div class="fate-hint">${escapeHTML(buildEventHint(life, event))}</div>
          <div class="choice-list">
            ${event.choices.map(option => {
              const locked = !meetsRequirement(life, option.require);
              const visualClass = optionVisualClass(option, locked);
              return `
              <button class="choice ${visualClass}" data-action="choose" data-id="${option.id}" ${locked ? "disabled" : ""}>
                <strong>${escapeHTML(option.text)}</strong>
                <span class="muted">${escapeHTML(option.hint)}</span>
                ${option.require ? `<span class="requirement">${locked ? "未解锁" : "已解锁"} · ${escapeHTML(formatRequirement(option.require))}</span>` : ""}
                ${locked ? `<em class="lock-lure">${escapeHTML(lockLure(option.require))}</em>` : ""}
              </button>
            `}).join("")}
          </div>
        ` : `
          <div class="tag-row">${effectTags(event.effects || []).join("")}</div>
          <div class="actions"><button class="button" data-action="continue-event">继续</button></div>
        `}
      </main>
      <aside class="stack">
        <section class="panel panel-attributes">
          <h3>当前状态</h3>
          <div class="stat-grid" style="margin-top:12px">
            ${ATTRS.map(([key, label]) => statHTML(label, life.attributes[key])).join("")}
          </div>
          <div class="tag-row">${life.tags.slice(-10).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>
        </section>
        <section class="panel panel-history">
          <h3>人生履历</h3>
          <div class="history" style="margin-top:12px">
            ${life.history.length ? life.history.map(item => `
              <div class="history-item">
                <strong>${item.age} 岁</strong>
                <p>${escapeHTML(item.text)}</p>
              </div>
            `).join("") : `<div class="empty">履历还很空，人生刚刚开始。</div>`}
          </div>
        </section>
      </aside>
    </div>
  `;
}

function renderEnding() {
  const report = appState.life?.ending || readJSON(STORAGE_KEYS.last);
  const fortune = report.fortune;
  return `
    <section class="report-card">
      <p class="eyebrow">人生判词</p>
      <h1 class="report-title">${escapeHTML(report.personName || "兰姗")} · ${escapeHTML(report.title)}</h1>
      <p class="subtitle">${escapeHTML(report.dynamicSummary || report.summary)}</p>
      <div class="grid cols-2" style="margin-top:24px">
        <div>
          <div class="score">${report.score}</div>
          <p class="muted">人生总评 · ${escapeHTML(report.scoreLabel || "普通但真实")} · 结束于 ${report.age} 岁 · 目标：${escapeHTML(report.goal)}</p>
          ${report.archetype ? `<div class="verdict-badge">${escapeHTML(report.archetype.name)}</div>` : ""}
          <div class="tag-row">${report.tags.map(tag => `<span class="tag primary">${escapeHTML(tag)}</span>`).join("")}</div>
        </div>
        <div class="stat-grid">
          ${statHTML("幸福", Math.round(report.detailScores.happiness / 10))}
          ${statHTML("财富", Math.round(report.detailScores.wealth / 10))}
          ${statHTML("关系", Math.round(report.detailScores.relation / 10))}
          ${statHTML("健康", Math.round(report.detailScores.health / 10))}
        </div>
      </div>
    </section>
    <section class="share-card">
      <p class="eyebrow">可截图人生卡</p>
      <div class="share-card-head">
        <div>
          <h2>${escapeHTML(report.personName || "兰姗")} · ${escapeHTML(report.archetype?.name || report.title)}</h2>
          <p>${escapeHTML(report.background)} / ${escapeHTML(report.destinyName || "凡人之命")}</p>
        </div>
        <div class="share-score">${report.score}</div>
      </div>
      <blockquote>${escapeHTML(report.dynamicSummary || report.summary)}</blockquote>
      <div class="share-card-grid">
        <span>目标 ${escapeHTML(report.goal)}</span>
        <span>终年 ${report.age} 岁</span>
        <span>${escapeHTML(report.scoreLabel || "普通但真实")}</span>
      </div>
    </section>
    <div class="layout">
      <main class="panel panel-archetype">
        <h2>动态结果</h2>
        ${report.archetype ? `
          <div class="archetype-card">
            <span>本局流派</span>
            <strong>${escapeHTML(report.archetype.name)}</strong>
            <p>${escapeHTML(report.archetype.desc)}</p>
          </div>
        ` : ""}
        <div class="result-narrative">
          <p>${escapeHTML(report.destinyComment || report.summary)}</p>
        </div>
        <div class="grid cols-2" style="margin-top:16px">
          <div class="card"><h3>高光时刻</h3><p>${escapeHTML(report.highlight)}</p></div>
          <div class="card"><h3>遗憾时刻</h3><p>${escapeHTML(report.regret)}</p></div>
        </div>
        ${report.turningPoints?.length ? `
          <h3 style="margin-top:24px">关键转折</h3>
          <div class="turning-list">
            ${report.turningPoints.map(point => `
              <article class="turning-card">
                <strong>${escapeHTML(point.title)}</strong>
                <p>${escapeHTML(point.text)}</p>
                <div class="tag-row">
                  <span class="tag primary">${escapeHTML(point.result)}</span>
                  ${(point.tags || []).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}
                </div>
              </article>
            `).join("")}
          </div>
        ` : ""}
        ${report.scoreInsights?.length ? `
          <h3 style="margin-top:24px">分数解读</h3>
          <div class="grid cols-3" style="margin-top:12px">
            ${report.scoreInsights.map(text => `<div class="card"><p>${escapeHTML(text)}</p></div>`).join("")}
          </div>
        ` : ""}
        ${report.futureAdvice?.length ? `
          <h3 style="margin-top:24px">下一局建议</h3>
          <div class="advice-list">
            ${report.futureAdvice.map(text => `<p>${escapeHTML(text)}</p>`).join("")}
          </div>
        ` : ""}
        ${fortune ? `
          <div class="fortune-card compact">
            <div class="section-title">
              <div>
                <h3>姓名八字运势回看</h3>
                <p>开局判定：${escapeHTML(fortune.focus)} · ${escapeHTML(fortune.strongest)}旺 / ${escapeHTML(fortune.weakest)}弱</p>
              </div>
              <div class="fortune-score">${fortune.fortuneScore}</div>
            </div>
            <div class="tag-row">${fortune.pillars.map(item => `<span class="tag primary">${escapeHTML(item)}</span>`).join("")}</div>
            <p class="muted" style="margin-top:10px">${escapeHTML(fortune.advice)}</p>
          </div>
        ` : ""}
        <h3 style="margin-top:24px">分享文案</h3>
        <textarea class="share-box" readonly>${escapeHTML(report.shareText)}</textarea>
        <div class="actions">
          <button class="button" data-action="copy-share">复制分享文案</button>
          <button class="button secondary" data-action="save-ending">收藏这段人生</button>
          <button class="button secondary" data-action="start-setup">重开一局</button>
        </div>
      </main>
      <aside class="panel">
        <h3>本局开局</h3>
        <p class="muted" style="margin-top:10px">名字：${escapeHTML(report.personName || "兰姗")}</p>
        <p class="muted" style="margin-top:6px">背景：${escapeHTML(report.background)}</p>
        <p class="muted" style="margin-top:6px">命格：${escapeHTML(report.destinyName || "凡人之命")}</p>
        ${report.quirks?.length ? `<p class="muted" style="margin-top:6px">怪癖：${report.quirks.map(q => escapeHTML(q)).join("、")}</p>` : ""}
        <div class="tag-row" style="margin-top:10px">${report.talents.map(talent => `<span class="tag">${escapeHTML(talent)}</span>`).join("")}</div>
        <button class="button secondary" style="margin-top:18px;width:100%" data-action="show-collection">查看收藏</button>
      </aside>
    </div>
  `;
}

function renderCollection() {
  const list = appState.collection;
  return `
    <section class="panel">
      <div class="section-title">
        <div>
          <h2>人生收藏</h2>
          <p>最多保存 20 段人生。收藏只保存在当前浏览器。</p>
        </div>
        <div class="actions" style="margin-top:0">
          <button class="button secondary" data-action="go-home">返回首页</button>
          <button class="button ghost" data-action="clear-collection">清空收藏</button>
        </div>
      </div>
      <div class="collection-list">
        ${list.length ? list.map(item => `
          <article class="card">
            <div class="section-title" style="margin-bottom:8px">
              <div>
                <h3>${escapeHTML(item.title)} · ${item.score} 分</h3>
                <p class="muted">${escapeHTML(item.createdAt)} · ${item.age} 岁 · ${escapeHTML(item.goal)}</p>
              </div>
            </div>
            <p>${escapeHTML(item.summary)}</p>
            <div class="tag-row">${item.tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>
          </article>
        `).join("") : `<div class="empty">还没有收藏。完成一局人生后，可以在结局页收藏。</div>`}
      </div>
    </section>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach(el => {
    el.addEventListener("click", handleAction);
  });
  document.querySelectorAll('input[data-action="set-attr"]').forEach(input => {
    input.addEventListener("input", event => {
      appState.setup.attrs[event.target.dataset.attr] = Number(event.target.value);
      saveCurrent();
      render();
    });
  });
  const personNameInput = document.getElementById("personNameInput");
  if (personNameInput) {
    personNameInput.addEventListener("input", event => {
      appState.setup.personName = event.target.value || "兰姗";
      saveCurrent();
    });
    personNameInput.addEventListener("blur", () => render());
  }
  const birthDateInput = document.getElementById("birthDateInput");
  if (birthDateInput) {
    birthDateInput.addEventListener("change", event => {
      appState.setup.birthDate = event.target.value || "1998-08-08";
      saveCurrent();
      render();
    });
  }
  const birthHourSelect = document.getElementById("birthHourSelect");
  if (birthHourSelect) {
    birthHourSelect.addEventListener("change", event => {
      appState.setup.birthHour = event.target.value || "chen";
      saveCurrent();
      render();
    });
  }
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const id = event.currentTarget.dataset.id;
  if (action === "start-setup") startSetup();
  if (action === "go-home") {
    appState.view = "home";
    saveCurrent();
    render();
  }
  if (action === "show-collection") {
    appState.view = "collection";
    render();
  }
  if (action === "continue-life") {
    appState.view = appState.life.status === "ended" ? "ending" : "life";
    render();
  }
  if (action === "reroll-background") {
    appState.setup.background = weightedRandom(BACKGROUNDS);
    saveCurrent();
    render();
  }
  if (action === "reroll-destiny") {
    appState.setup.destiny = weightedRandom(DESTINIES);
    saveCurrent();
    render();
  }
  if (action === "reroll-quirks") {
    appState.setup.quirks = sample(QUIRKS, 2);
    saveCurrent();
    render();
  }
  if (action === "reroll-talents") {
    appState.setup.talentOptions = drawTalents(6, appState.setup.attrs.luck || 0);
    appState.setup.selectedTalentIds = [];
    saveCurrent();
    render();
  }
  if (action === "reroll-all") {
    if ((appState.setup.rerollCount ?? 0) <= 0) {
      showToast("整局重摇次数已用完");
    } else {
      const remain = (appState.setup.rerollCount ?? 0) - 1;
      const name = appState.setup.personName;
      appState.setup = createSetup();
      appState.setup.personName = name;
      appState.setup.rerollCount = remain;
      showToast(`整局已重摇，还剩 ${remain} 次`);
      saveCurrent();
      render();
    }
  }
  if (action === "set-goal") {
    appState.setup.goal = id;
    saveCurrent();
    render();
  }
  if (action === "setup-step") {
    appState.setup.setupStep = id;
    saveCurrent();
    render();
  }
  if (action === "toggle-talent") toggleTalent(id);
  if (action === "random-attrs") {
    appState.setup.attrs = randomAttrs();
    render();
  }
  if (action === "start-life") {
    if (Object.values(appState.setup.attrs).reduce((a, b) => a + b, 0) < 20 && !confirm("还有属性点没用完，确定开始吗？")) return;
    startLife();
  }
  if (action === "continue-event") applyAutoEvent();
  if (action === "continue-outcome") {
    appState.life.pendingOutcome = null;
    advanceAge();
  }
  if (action === "choose") {
    const choiceOption = appState.life.currentEvent.choices.find(option => option.id === id);
    applyChoice(choiceOption);
  }
  if (action === "copy-share") copyShare();
  if (action === "save-ending") saveEnding();
  if (action === "clear-collection") clearCollection();
}

function toggleTalent(id) {
  const selected = appState.setup.selectedTalentIds;
  if (selected.includes(id)) {
    appState.setup.selectedTalentIds = selected.filter(item => item !== id);
  } else if (selected.length < 3) {
    selected.push(id);
  } else {
    showToast("最多选择 3 个天赋");
  }
  saveCurrent();
  render();
}

function statHTML(label, value) {
  const percent = clamp(value * 10, 0, 100);
  return `<div class="stat"><strong>${value}</strong><span>${label}</span><div class="progress"><span style="width:${percent}%"></span></div></div>`;
}

function effectTags(effects) {
  if (!effects.length) return [`<span class="tag">无明显属性变化</span>`];
  return effects.map(effect => `<span class="tag primary">${labelAttr(effect.attr)} ${effect.value > 0 ? "+" : ""}${effect.value}</span>`);
}

function labelAttr(key) {
  return ATTRS.find(([attr]) => attr === key)?.[1] || key;
}

function copyShare() {
  const report = appState.life?.ending;
  if (!report) return;
  navigator.clipboard?.writeText(report.shareText)
    .then(() => showToast("已复制分享文案"))
    .catch(() => showToast("复制失败，可手动复制文本框内容"));
}

function saveEnding() {
  const report = appState.life?.ending;
  if (!report) return;
  const collection = loadCollection();
  if (collection.some(item => item.id === report.id)) {
    showToast("这段人生已经收藏过了");
    return;
  }
  collection.unshift(report);
  const limited = collection.slice(0, 20);
  localStorage.setItem(STORAGE_KEYS.collection, JSON.stringify(limited));
  appState.collection = limited;
  showToast("已收藏这段人生");
}

function clearCollection() {
  if (!confirm("确定清空所有收藏吗？")) return;
  localStorage.removeItem(STORAGE_KEYS.collection);
  appState.collection = [];
  render();
}

function loadCollection() {
  return readJSON(STORAGE_KEYS.collection) || [];
}

function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveCurrent() {
  localStorage.setItem(STORAGE_KEYS.current, JSON.stringify({
    view: appState.view,
    setup: appState.setup,
    life: appState.life
  }));
}

function restoreCurrent() {
  const saved = readJSON(STORAGE_KEYS.current);
  if (!saved) return;
  appState.view = saved.view || "home";
  appState.setup = saved.setup;
  appState.life = saved.life;
  // 兼容旧存档：背景从字符串升级为对象
  if (appState.setup && typeof appState.setup.background === "string") {
    appState.setup.background = weightedRandom(BACKGROUNDS);
    appState.setup.destiny = weightedRandom(DESTINIES);
    appState.setup.quirks = sample(QUIRKS, 2);
    appState.setup.rerollCount = 2;
    appState.setup.talentOptions = (appState.setup.talentOptions || []).map(t => ({ rarity: "common", ...t }));
  }
  if (appState.setup && !appState.setup.setupStep) appState.setup.setupStep = "birth";
  if (appState.view === "setup" && !appState.setup) appState.view = "home";
  if ((appState.view === "life" || appState.view === "ending") && !appState.life) appState.view = "home";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

restoreCurrent();
render();
