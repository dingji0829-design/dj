import trackWaveforms from "./track-waveforms.json";

const media = (filename) => `${import.meta.env.BASE_URL}media/${filename}`;
const selected = (filename) => media(`selected/${filename}`);
const trackCover = (id) => selected(`covers/${id}.webp`);

export const profile = {
  name: "丁集",
  englishName: "DINGJI",
  roles: ["录音师", "声音设计师"],
  intro: "我毕业于南京艺术学院录音艺术专业，工作涵盖编曲、同期录音、后期混音、影视配乐与游戏配乐、音效设计。在 AI 发展的时代，我也使用 SUNO、ACE Studio 探索 AI 音乐的相关制作。",
  email: "1466385489@QQ.COM",
  resumeUrl: "https://my.feishu.cn/docx/RaPbduOSKoIfYWxkkjycgR1hnig?from=from_copylink",
  portrait: selected("dingji-portrait.jpg"),
  portraitAlt: "丁集在录音室里的个人照片",
};

export const hero = {
  portrait: selected("dingji-hero.jpeg"),
};

export const contactSlideshow = {
  poster: media("contact-slideshow.webp"),
  video: media("contact-slideshow.mp4"),
};

export const film = {
  id: "suzhou",
  title: "苏州相城宣传片",
  category: "城市宣传片配乐",
  credit: "丁集 · 编曲、混音",
  description: "丁集为《苏州相城》宣传片原创编曲并完成混音。视频为提供的样片。",
  poster: selected("suzhou-sunset-wide.webp"),
  thumbnail: selected("suzhou-sunset.webp"),
  video: selected("suzhou-sample.mp4"),
  duration: 371,
};

const tracks = [
  { id: "taotie", title: "饕餮", category: "国风电子配乐", groups: ["arrangement"], cover: trackCover("taotie") },
  { id: "lingzhao", title: "灵沼", category: "原创配乐", groups: ["arrangement"], cover: trackCover("lingzhao-dragon") },
  { id: "lan-cg", title: "澜", category: "王者荣耀 CG · 电子配乐", groups: ["arrangement"], cover: trackCover("lan-cg-titled") },
  { id: "monsters-remix", title: "Katie Sky – Monsters（Digic_丁集 remix）", category: "Remix", groups: ["arrangement"], cover: trackCover("monsters-remix") },
  { id: "film-score-02", title: "Dawn", category: "影视配乐", groups: ["arrangement"], cover: trackCover("dawn") },
  { id: "stage-battle-x01", title: "Attack", category: "战斗型配乐", groups: ["arrangement"], cover: trackCover("stage-battle-x01") },
  { id: "stage-battle-x02", title: "Advance army", category: "战斗型配乐", groups: ["arrangement"], cover: trackCover("stage-battle-x02") },
  { id: "ch-commercial", title: "C.H.", category: "广告配乐", groups: ["arrangement"], cover: trackCover("ch-valley") },
  { id: "jiangnan", title: "江南", category: "古风配乐", groups: ["arrangement"], cover: trackCover("jiangnan") },
  { id: "racing", title: "Racing", category: "AI音乐 · 电子与管弦", groups: ["ai-music"], cover: trackCover("racing") },
  { id: "wind", title: "风不吹云不散", category: "AI音乐 · 华语流行", groups: ["ai-music"], cover: trackCover("wind") },
  { id: "piano", title: "a 小调第八号钢琴奏鸣曲 · 第一乐章", category: "现场录音", groups: ["recording"], cover: trackCover("piano-studio") },
  { id: "guitar-encore", title: "朱莉奥 马克 桑莫", category: "现场录音", groups: ["recording"], cover: trackCover("giulio") },
  { id: "concerto-k364", title: "降E大调中提琴和小提琴二重协奏曲 K.364", category: "现场录音", groups: ["recording"], cover: trackCover("concerto-k364") },
  { id: "mother", title: "母亲 · 埃内斯托·科塔萨尔", category: "现场录音", groups: ["recording"], cover: trackCover("mother") },
  { id: "giulio", title: "古典吉他音乐会", category: "现场录音", groups: ["recording"], cover: trackCover("guitar-encore") },
  { id: "drums", title: "Drum 架子鼓", category: "现场录音", groups: ["recording"], cover: trackCover("drums") },
  { id: "feifei", title: "蜚蜚", category: "歌曲混音", groups: ["mixing"] },
  { id: "reason-to-forget", title: "给我一个理由忘记", category: "歌曲混音", groups: ["mixing"] },
  { id: "after-goodbye", title: "说了再见以后", category: "歌曲混音", groups: ["mixing"] },
  { id: "miss-you-daily", title: "天天想你", category: "歌曲混音", groups: ["mixing"] },
  { id: "hurt", title: "我真的受伤了", category: "歌曲混音", groups: ["mixing"] },
  { id: "forever-young", title: "无问西东", category: "歌曲混音", groups: ["mixing"] },
  { id: "cliff", title: "悬崖", category: "歌曲混音", groups: ["mixing"] },
  { id: "we-could", title: "原来我们可以", category: "歌曲混音", groups: ["mixing"] },
  { id: "moon", title: "Fly Me to the Moon", category: "歌曲混音", groups: ["mixing"] },
  { id: "no-need-for-love", title: "不必说爱", category: "AI音乐 · R&B", groups: ["ai-music"], cover: trackCover("no-need-for-love") },
  { id: "sugar", title: "糖", category: "AI音乐", groups: ["ai-music"], cover: trackCover("sugar") },
  { id: "hi", title: "Cool and cool", category: "AI音乐 · Dark Pop", groups: ["ai-music"], cover: trackCover("hi") },
];

export const audioTracks = tracks.map((track) => ({
  ...track,
  src: selected(`${track.id}.mp3`),
  ...trackWaveforms[track.id],
}));

export const soundProjects = [
  { id: "short-animation", title: "短动画音效设计", duration: 16 },
  { id: "footsteps", title: "脚步跑跳环境音效设计", duration: 81 },
  { id: "sound-design-02", title: "短动画音效设计", duration: 7 },
  { id: "cg-sound-design", title: "CG音效设计", duration: 63 },
].map((project) => ({
  ...project,
  category: "音效设计",
  credit: "丁集 · 音效设计",
  poster: selected(`${project.id}.webp`),
  video: selected(`${project.id}.mp4`),
}));

export const workCategories = [
  { id: "arrangement", label: "编曲", description: "原创配乐与改编", cover: selected("arrangement-cover.webp") },
  { id: "film-scoring", label: "影视配乐", description: "宣传片与影视配乐", cover: film.thumbnail },
  { id: "recording", label: "录音", description: "现场录音", cover: selected("recording-cover.webp") },
  { id: "mixing", label: "混音", description: "歌曲混音与 Remix", cover: selected("mixing-cover.webp") },
  { id: "ai-music", label: "AI音乐", description: "生成式音乐实验", cover: selected("ai-music-cover.webp") },
  { id: "sound-design", label: "声音设计", description: "影视音效与交互音频", cover: selected("sound-design-cover.webp") },
];

export const portfolioCategories = ["arrangement", "ai-music", "mixing", "film-scoring", "recording", "sound-design"]
  .map((id) => workCategories.find((category) => category.id === id));

export const skills = [
  {
    id: "scoring",
    title: "影视与游戏配乐",
    english: "MUSIC SCORING",
    description: "为宣传片、影视与游戏画面编曲，作品涵盖古风、电子与管弦等风格。",
  },
  {
    id: "ai",
    title: "AI音乐",
    english: "AI MUSIC",
    description: "使用 SUNO、ACE Studio 探索不同的音乐风格，积累丰富的提示词经验，并生成与编辑分轨，高效产出符合灵感的音乐 Demo。",
  },
  {
    id: "audio",
    title: "录音与混音",
    english: "RECORDING & MIXING",
    description: "涵盖歌曲混音与乐器现场录音，使用 Pro Tools 完成录音、编辑与混音。",
  },
];
