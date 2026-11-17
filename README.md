# 丁集个人作品集

使用 React 和 Vite 搭建的桌面优先单页作品集，最大版心宽度 1700px。首屏展示丁集、DINGJI 和六个可横向滑动的分类入口。作品集右上角可切换同一组分类。

## 本地运行

使用 Node.js 20.19+ 或 22.12+。

```sh
npm ci
npm run dev
```

运行 `npm run build` 生成生产版本，运行 `npm run preview` 查看构建结果。静态文件位于 `dist/client/`。

## 更新内容

- `src/content.js` 管理简介、联系方式、作品与能力文案。`src/Hero.jsx` 和 `src/hero.css` 管理首屏。
- `public/media/selected/` 包含《苏州相城》样片及 13 首完整音频。`public/media/selected/covers/monsters-remix.webp` 来自用户上传的原封面，相关曲目可从编曲和混音分类访问。
- `public/media/blue-hour.webp` 为内置 ImageGen 生成的云景。提示词以深蓝夜幕、下方云层和中央留白为主，`blue-hour.mp4` 由同一张图制作成轻微运镜循环。
- 个人介绍参照用户提供的简历。联系区显示邮箱、飞书简历入口和由用户九张照片制成的循环视频 `public/media/contact-slideshow.mp4`。

<details>
<summary>本轮封面素材与 ImageGen 提示词</summary>

七张曲目封面用内置 ImageGen 生成。每次生成使用下列通用提示词，再接该曲目的主题提示词。

> Create one square instrumental track cover for a sound designer's dark navy portfolio. Sophisticated editorial album art, deliberate visual hierarchy, cinematic light, tactile surface detail, clearly recognizable at small thumbnail size, strong single central subject, flush edges, no frame. No words, no letters, no title typography, no logos, no signature or watermark.

- `public/media/selected/covers/jiangnan.webp` · Subject: Jiangnan canal town at blue hour, pale traditional Jiangnan houses and an old arched stone bridge over tranquil blue-green water, one small wooden boat, muted celadon and warm window reflections. Painterly realism inspired by ink wash and quiet film photography, atmospheric fog.
- `public/media/selected/covers/lan-cg.webp` · Subject: a sweeping crescent of deep-water energy cutting through a nearly black ocean at night, cold cobalt and electric teal luminance with shards of spray, dynamic close framing, sculptural motion and a cinematic electronic game score atmosphere. No identifiable game character.
- `public/media/selected/covers/ch-commercial.webp` · Subject: a single ivory light ribbon wrapped around an abstract sculptural frosted glass block, dramatic studio product lighting, clean and minimal, dark slate, pale silver and subtle amber only, high-end commercial soundtrack cover.
- `public/media/selected/covers/film-score-02.webp` · Subject: a narrow path and a lone warm illumination emerging from dark rocky forms in blue-gray mist, broad cinematic contrast, subtly grainy poetic independent film score artwork, atmospheric and quiet, no people.
- `public/media/selected/covers/lingzhao.webp` · Subject: ancient flooded stones in a still night marsh, dark forest silhouettes reflected in luminous violet-and-teal water. An uncanny soft luminous ripple is the focal point. Dreamlike photographic realism, muted jade and blue-violet, minimal, mysterious instrumental soundtrack.
- `public/media/selected/covers/stage-battle-x01.webp` · Subject: the first movement of a theatrical battle score. Angular metallic stage scenery lit by a single crimson and warm copper spotlight, suggest fencing blades through clean intersecting forms, sparse dark stage haze, theatrical energy, no figures or blood.
- `public/media/selected/covers/stage-battle-x02.webp` · Subject: the second movement of a theatrical battle score. Stark abstract stage architecture, two cold blades of cobalt-blue stage light crossing through a smoky set, polished silver edge accents on black fabric and metal. Companion visual language for an energetic theatrical battle score, no figures.

AI 音乐封面 `public/media/selected/ai-music-cover.webp` 由内置 ImageGen 根据两张原海报编辑。

> Precise object removal and composition edit. Input 1 is the ACE Studio poster, input 2 is the Suno poster. Use both as EDIT TARGETS. Make a clean square left-right diptych with poster 1 in the left half and poster 2 in the right half. Entirely remove all visible human skin, hands, fingers, and all blue clothing from both, including lower corners. Reconstruct solid charcoal on the left and warm coral orange on the right underneath removed parts, repairing any occluded segment of each thin white circle smoothly. Preserve and accurately reproduce the source white Ace Studio symbol inside its thin circle and white SUNO lettering inside its thin circle. Refit into the halves so each whole circle and title is visible and aligned on the same baseline. White upper captions exactly 'Ace Studio AI' and 'Suno AI'. No other text, no arms, no people, no blue decoration, no new symbols. Use square format, perfect straight seam down the center and subject logos positioned around 43% image height, leaving convenient room near the bottom for a website UI overlay.

</details>
