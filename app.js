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

const BACKGROUNDS = [
  "县城普通家庭 / 独生子女 / 父母务实",
  "一线城市双职工家庭 / 家教严格 / 资源较好",
  "小镇个体户家庭 / 亲戚很多 / 从小会看人脸色",
  "农村大家庭 / 童年热闹 / 早早学会分担家务",
  "单亲家庭 / 母亲坚韧 / 情绪敏感",
  "重组家庭 / 关系复杂 / 很会自我保护",
  "书香家庭 / 期待很高 / 从小被比较",
  "普通工薪家庭 / 日子紧巴 / 但饭桌很热闹"
];

const TALENTS = [
  { id: "lateLuck", name: "迟来的好运", desc: "年轻时普通，60 岁后更容易遇到正向事件。", effects: { luck: 1 }, tags: ["迟来的好运"] },
  { id: "mathMind", name: "数学直觉", desc: "你对数字和逻辑很敏感。", effects: { intelligence: 2, charm: -1 }, tags: ["理性脑"] },
  { id: "socialFear", name: "社交恐惧", desc: "人多时容易紧张，但独处时能量恢复很快。", effects: { charm: -1, mindset: -1, intelligence: 1 }, tags: ["内向"] },
  { id: "sunny", name: "天生乐观", desc: "坏事发生时，你更容易缓过来。", effects: { mindset: 2 }, tags: ["乐观"] },
  { id: "fragile", name: "易碎体质", desc: "小时候常生病，但更早意识到健康重要。", effects: { health: -2, mindset: 1 }, tags: ["体弱"] },
  { id: "goodVoice", name: "好嗓子", desc: "你说话和唱歌都很有辨识度。", effects: { charm: 2 }, tags: ["表达力"] },
  { id: "familyHelp", name: "家里托底", desc: "家人能在关键时刻帮你一把。", effects: { family: 2 }, tags: ["家庭支持"] },
  { id: "rebel", name: "不服管", desc: "你不太听劝，但敢于走偏门。", effects: { luck: 1, mindset: 1, family: -1 }, tags: ["叛逆"] },
  { id: "bookworm", name: "书堆里长大", desc: "阅读让你很早拥有自己的世界。", effects: { intelligence: 2, health: -1 }, tags: ["爱读书"] },
  { id: "streetSmart", name: "街头智慧", desc: "你很会察言观色，也懂得保护自己。", effects: { charm: 1, luck: 1 }, tags: ["会来事"] },
  { id: "stubborn", name: "死磕到底", desc: "你不容易放弃，也不容易转弯。", effects: { mindset: 2, charm: -1 }, tags: ["死磕"] },
  { id: "pretty", name: "人群焦点", desc: "你从小就容易被看见。", effects: { charm: 2, luck: 1 }, tags: ["高魅力"] }
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
    opt("C", "去陌生城市", "运气 +1，心态 -1，获得“漂泊者”", [{ attr: "luck", value: 1 }, { attr: "mindset", value: -1 }], ["漂泊者"])
  ]),

  e("e001", "earlyCareer", 23, 24, "你拿到第一份正式工资，兴奋地请自己吃了一顿贵饭。", [{ attr: "mindset", value: 1 }], ["第一份工资"]),
  e("e002", "earlyCareer", 23, 26, "试用期的你总是最早到、最晚走，领导记住了你，颈椎也记住了你。", [{ attr: "family", value: 1 }, { attr: "health", value: -1 }], ["拼命工作"]),
  e("e003", "earlyCareer", 24, 27, "你第一次独立租房，房子不大，但钥匙握在手里很踏实。", [{ attr: "mindset", value: 1 }, { attr: "family", value: -1 }], ["独立生活"]),
  choice("e004", "earlyCareer", 25, 29, "朋友邀请你一起做副业，项目看起来不稳，但机会难得。", [
    opt("A", "下班后一起试试", "运气 +1，健康 -1，获得“副业尝试”", [{ attr: "luck", value: 1 }, { attr: "health", value: -1 }], ["副业尝试"]),
    opt("B", "拒绝，先把主业做好", "心态 +1，获得“稳定路线”", [{ attr: "mindset", value: 1 }], ["稳定路线"]),
    opt("C", "直接辞职全职做", "运气 +2，家境 -2，获得“创业者”", [{ attr: "luck", value: 2 }, { attr: "family", value: -2 }], ["创业者"])
  ]),
  e("e005", "earlyCareer", 26, 30, "你遇到一个聊得来的人，第一次觉得成年人的心动像深夜亮起的便利店。", [{ attr: "charm", value: 1 }, { attr: "mindset", value: 1 }], ["心动"]),
  e("e006", "earlyCareer", 27, 30, "你被裁员传闻吓到，开始认真整理简历和存款。", [{ attr: "mindset", value: -1 }, { attr: "intelligence", value: 1 }], ["危机意识"]),
  e("e007", "earlyCareer", 28, 30, "你在一次项目里顶住压力，终于被同事当成可靠的人。", [{ attr: "charm", value: 1 }, { attr: "intelligence", value: 1 }], ["可靠"]),
  e("e008", "earlyCareer", 29, 30, "你开始意识到，周末不休息，工作日也不会更有精神。", [{ attr: "health", value: 1 }, { attr: "mindset", value: 1 }], ["自我照顾"]),

  choice("w001", "career", 31, 35, "你获得一次升职机会，但新岗位意味着长期加班和更高压力。", [
    opt("A", "接受升职", "家境 +2，健康 -1，心态 -1，获得“管理者”", [{ attr: "family", value: 2 }, { attr: "health", value: -1 }, { attr: "mindset", value: -1 }], ["管理者"]),
    opt("B", "留在原岗位", "健康 +1，心态 +1，获得“边界感”", [{ attr: "health", value: 1 }, { attr: "mindset", value: 1 }], ["边界感"]),
    opt("C", "跳槽换城市", "运气 +1，家境 +1，心态 -1，获得“迁徙”", [{ attr: "luck", value: 1 }, { attr: "family", value: 1 }, { attr: "mindset", value: -1 }], ["迁徙"])
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
    opt("B", "重仓冲进去", "运气 +2，心态 -2，获得“高风险偏好”", [{ attr: "luck", value: 2 }, { attr: "mindset", value: -2 }], ["高风险偏好"]),
    opt("C", "先补健康和学习", "健康 +1，智力 +1，获得“投资自己”", [{ attr: "health", value: 1 }, { attr: "intelligence", value: 1 }], ["投资自己"])
  ]),
  choice("w009", "career", 34, 44, "你负责的项目出了事故，团队里有人暗示可以把责任推给新人。", [
    opt("A", "自己承担该承担的部分", "心态 +1，魅力 +1，家境 -1，获得“承担责任”", [{ attr: "mindset", value: 1 }, { attr: "charm", value: 1 }, { attr: "family", value: -1 }], ["承担责任"]),
    opt("B", "顺水推舟保住位置", "家境 +1，心态 -2，获得“职业污点”", [{ attr: "family", value: 1 }, { attr: "mindset", value: -2 }], ["职业污点"]),
    opt("C", "整理证据推动复盘", "智力 +1，魅力 +1，获得“系统复盘”", [{ attr: "intelligence", value: 1 }, { attr: "charm", value: 1 }], ["系统复盘"])
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

const ALL_EVENTS = [...BASE_EVENTS, ...EXTRA_CHOICE_EVENTS];

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

function e(id, stage, minAge, maxAge, text, effects = [], tags = [], terminal = false) {
  return { id, stage, minAge, maxAge, text, type: "auto", effects, tags, terminal };
}

function choice(id, stage, minAge, maxAge, text, choices) {
  return { id, stage, minAge, maxAge, text, type: "choice", choices };
}

function opt(id, text, hint, effects = [], tags = []) {
  return { id, text, hint, effects, tags };
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
  const attrs = { health: 3, intelligence: 3, charm: 3, family: 3, luck: 3, mindset: 3 };
  return {
    personName: "兰姗",
    birthDate: "1998-08-08",
    birthHour: "chen",
    background: randomItem(BACKGROUNDS),
    talentOptions: sample(TALENTS, 6),
    selectedTalentIds: [],
    attrs,
    goal: "freedom"
  };
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
  fortune.effects.forEach(effect => {
    attrs[effect.attr] = clamp(attrs[effect.attr] + effect.value);
  });
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
    goal: setup.goal,
    attributes: attrs,
    selectedTalents,
    tags: unique(tags),
    usedEventIds: [],
    history: [],
    currentEvent: null,
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
  life.currentEvent = pickEvent(life);
  life.status = life.currentEvent.type === "choice" ? "choice" : "running";
  saveCurrent();
  render();
}

function pickEvent(life) {
  const candidates = ALL_EVENTS.filter(event => {
    if (life.usedEventIds.includes(event.id)) return false;
    return event.stage === life.stage && life.age >= event.minAge && life.age <= event.maxAge;
  });
  if (candidates.length) {
    const tagged = candidates.filter(event => (event.tags || []).some(tag => life.tags.includes(tag)));
    return randomItem(tagged.length ? tagged : candidates);
  }
  return {
    id: `g-${life.age}-${life.history.length}`,
    stage: life.stage,
    minAge: life.age,
    maxAge: life.age,
    text: randomItem(GENERIC_EVENTS),
    type: "auto",
    effects: randomSmallEffects(),
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
  const event = appState.life.currentEvent;
  applyOutcome(choiceOption.effects || [], choiceOption.tags || []);
  addHistory(`${event.text} 你选择了：${choiceOption.text}`, choiceOption.effects || [], choiceOption.tags || []);
  advanceAge();
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
  const dynamic = buildDynamicResult(life, detailScores, total, matched);
  const report = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    endingId: matched.id,
    personName: life.personName || "兰姗",
    title: matched.title,
    summary: matched.summary,
    dynamicSummary: dynamic.summary,
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
    background: life.background,
    fortune: life.fortune,
    talents: life.selectedTalents.map(t => t.name),
    highlight,
    regret,
    history: life.history.slice(0, 30),
    createdAt: new Date().toLocaleString("zh-CN")
  };
  report.shareText = `${report.personName}在《重活一遍》里活出了「${report.title}」：${report.score} 分（${report.scoreLabel}），结束于 ${report.age} 岁。${report.dynamicSummary} 开局运势：${report.fortune?.focus || "自由生长"}。高光：${report.highlight} 遗憾：${report.regret}`;
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

function randomSmallEffects() {
  const attr = randomItem(ATTRS)[0];
  return [{ attr, value: Math.random() > 0.5 ? 1 : -1 }];
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
  return `
    <section class="hero">
      <p class="eyebrow">LIFE SIMULATOR MVP</p>
      <h1>重活一遍</h1>
      <p class="subtitle">抽几张天赋，分配一点属性，做几个选择，然后看看这一生会变成什么样。每一局都可以重开，但每一次选择都不会回退。</p>
      <div class="hero-actions">
        <button class="button" data-action="start-setup">开始新人生</button>
        <button class="button secondary" data-action="show-collection">查看人生收藏</button>
        ${appState.life && appState.life.status !== "ended" ? `<button class="button ghost" data-action="continue-life">继续上一局</button>` : ""}
      </div>
      <div class="hero-showcase" aria-label="玩法亮点">
        <div class="life-token"><strong>抽天赋</strong><span>迟来的好运、数学直觉、社交恐惧，每次开局都不一样。</span></div>
        <div class="life-token"><strong>做选择</strong><span>名校、创业、家庭、远方，每个决定都有代价。</span></div>
        <div class="life-token"><strong>看命运</strong><span>事件会按年龄推进，普通日子也可能突然转弯。</span></div>
        <div class="life-token"><strong>晒结局</strong><span>生成一句能发给朋友的人生判词。</span></div>
      </div>
    </section>
    <div class="layout">
      <main class="panel">
        <div class="section-title">
          <div>
            <h2>怎么玩</h2>
            <p>首版是单人本地版，适合快速体验和继续扩展事件池。</p>
          </div>
        </div>
        <div class="grid cols-3">
          <div class="card"><h3>1. 抽天赋</h3><p class="muted">系统随机给出 6 张天赋，你最多选择 3 张。</p></div>
          <div class="card"><h3>2. 过人生</h3><p class="muted">人生按年龄推进，普通事件自动结算，关键事件由你选择。</p></div>
          <div class="card"><h3>3. 看结局</h3><p class="muted">系统生成总评、高光、遗憾、标签和分享文案。</p></div>
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

function renderSetup() {
  const setup = appState.setup;
  const used = Object.values(setup.attrs).reduce((a, b) => a + b, 0);
  const remaining = 20 - used;
  const setupFortune = analyzeFortune(setup.personName, setup.birthDate, setup.birthHour);
  return `
    <section class="panel">
      <div class="section-title">
        <div>
          <h2>开局配置</h2>
          <p>背景、天赋和属性会影响后续事件。你可以不追求完美，人生本来就不是满点开局。</p>
        </div>
        <button class="button secondary" data-action="go-home">返回首页</button>
      </div>
      <div class="grid cols-2">
        <div class="card">
          <h3>出生背景</h3>
          <p>${escapeHTML(setup.background)}</p>
          <button class="button secondary" style="margin-top:12px" data-action="reroll-background">换一个背景</button>
        </div>
        <div class="card">
          <h3>人生目标</h3>
          <select id="goalSelect" class="choice" style="margin-top:10px">
            ${GOALS.map(goal => `<option value="${goal.id}" ${setup.goal === goal.id ? "selected" : ""}>${goal.name} · ${goal.desc}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="fortune-card">
        <div class="section-title">
          <div>
            <h3>姓名与八字运势</h3>
            <p>娱乐向判断：用于生成开局标签和轻微属性加成，不代表真实命理结论。</p>
          </div>
          <div class="fortune-score">${setupFortune.fortuneScore}</div>
        </div>
        <div class="form-grid">
          <label>
            <span>名字</span>
            <input id="personNameInput" class="text-input" maxlength="8" value="${escapeHTML(setup.personName || "兰姗")}" placeholder="兰姗">
          </label>
          <label>
            <span>出生日期</span>
            <input id="birthDateInput" class="text-input" type="date" value="${escapeHTML(setup.birthDate || "1998-08-08")}">
          </label>
          <label>
            <span>出生时辰</span>
            <select id="birthHourSelect" class="text-input">
              ${HOUR_BRANCHES.map(hour => `<option value="${hour.id}" ${setup.birthHour === hour.id ? "selected" : ""}>${hour.name} · ${hour.range}</option>`).join("")}
            </select>
          </label>
        </div>
        <div class="tag-row">
          ${setupFortune.pillars.map(item => `<span class="tag primary">${escapeHTML(item)}</span>`).join("")}
          <span class="tag primary">${escapeHTML(setupFortune.focus)}</span>
          <span class="tag">${escapeHTML(setupFortune.strongest)}旺 / ${escapeHTML(setupFortune.weakest)}弱</span>
        </div>
        <p class="muted" style="margin-top:12px">${escapeHTML(setupFortune.summary)}</p>
        <p class="muted" style="margin-top:6px">${escapeHTML(setupFortune.advice)}</p>
      </div>
    </section>
    <div class="layout">
      <main class="panel">
        <h2>选择天赋 <span class="muted">(${setup.selectedTalentIds.length}/3)</span></h2>
        <div class="grid cols-3" style="margin-top:16px">
          ${setup.talentOptions.map(talent => `
            <button class="card selectable ${setup.selectedTalentIds.includes(talent.id) ? "selected" : ""}" data-action="toggle-talent" data-id="${talent.id}">
              <h3>${escapeHTML(talent.name)}</h3>
              <p class="muted">${escapeHTML(talent.desc)}</p>
              <div class="tag-row">${Object.entries(talent.effects).map(([key, value]) => `<span class="tag primary">${labelAttr(key)} ${value > 0 ? "+" : ""}${value}</span>`).join("")}</div>
            </button>
          `).join("")}
        </div>
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
        <button class="button" style="margin-top:18px;width:100%" data-action="start-life" ${remaining < 0 ? "disabled" : ""}>开始这一生</button>
        <button class="button secondary" style="margin-top:10px;width:100%" data-action="random-attrs">随机分配属性</button>
      </aside>
    </div>
  `;
}

function renderLife() {
  const life = appState.life;
  const event = life.currentEvent;
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
        ${event.type === "choice" ? `
          <div class="choice-list">
            ${event.choices.map(option => `
              <button class="choice" data-action="choose" data-id="${option.id}">
                <strong>${escapeHTML(option.text)}</strong>
                <span class="muted">${escapeHTML(option.hint)}</span>
              </button>
            `).join("")}
          </div>
        ` : `
          <div class="tag-row">${effectTags(event.effects || []).join("")}</div>
          <div class="actions"><button class="button" data-action="continue-event">继续</button></div>
        `}
      </main>
      <aside class="stack">
        <section class="panel">
          <h3>当前状态</h3>
          <div class="stat-grid" style="margin-top:12px">
            ${ATTRS.map(([key, label]) => statHTML(label, life.attributes[key])).join("")}
          </div>
          <div class="tag-row">${life.tags.slice(-10).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>
        </section>
        <section class="panel">
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
      <p class="eyebrow">ENDING REPORT</p>
      <h1 class="report-title">${escapeHTML(report.personName || "兰姗")} · ${escapeHTML(report.title)}</h1>
      <p class="subtitle">${escapeHTML(report.dynamicSummary || report.summary)}</p>
      <div class="grid cols-2" style="margin-top:24px">
        <div>
          <div class="score">${report.score}</div>
          <p class="muted">人生总评 · ${escapeHTML(report.scoreLabel || "普通但真实")} · 结束于 ${report.age} 岁 · 目标：${escapeHTML(report.goal)}</p>
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
    <div class="layout">
      <main class="panel">
        <h2>动态结果</h2>
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
        <p class="muted" style="margin-top:10px">${escapeHTML(report.background)}</p>
        <div class="tag-row">${report.talents.map(talent => `<span class="tag">${escapeHTML(talent)}</span>`).join("")}</div>
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
  const goalSelect = document.getElementById("goalSelect");
  if (goalSelect) {
    goalSelect.addEventListener("change", event => {
      appState.setup.goal = event.target.value;
      saveCurrent();
    });
  }
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
    appState.setup.background = randomItem(BACKGROUNDS);
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
