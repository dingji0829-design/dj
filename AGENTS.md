# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

Use 丁集 and DINGJI in the hero. Present recording engineer and sound designer as the professional roles. Show 编曲、影视配乐、录音、混音、AI音乐、声音设计 in a scrollable arc of near-square cards with translucent captions. Align their bottom edges, keep the center card facing forward, and turn the side cards slightly into perspective. Apply a brief blur to the cover images during scrolling and show frosted edges where cards are clipped. Use the same categories in the portfolio.
Use the original hero title’s light blue as the site-wide accent. Filled and outlined buttons exchange their foreground and background colors on hover.
Fix the navigation to the top with a frosted background when scrolling into the second screen. On desktop, put the audio work list to the left of the selected track player.
When a track has cover art, show it at 1:1 above the playback controls and waveform progress bar. Use the same artwork for the list thumbnail.
Use interactive light-blue FluxLines beneath the hero across About, Portfolio, and Capabilities. The contact section uses its own slideshow.
Order the portfolio tabs 编曲、AI音乐、混音、影视配乐、录音、声音设计. Order the arrangement tracks 饕餮、灵沼、澜、Katie Sky – Monsters、Dawn、Attack、Advance army、C.H.、江南.
Use Dingji’s turntable portrait in a cool blue split hero, with large DINGJI type, vertical 丁集 and the works link on the right. Place the category carousel below the portrait screen.
Show the hero portrait in its original colors, with a deep-blue transition toward the text.
Integrate the About biography, résumé and contact links, and portfolio statistics into the hero. The About navigation targets the hero profile.
Match the Capabilities background to the hero navy and use a lighter blue surface for the capability cards and audio player.
Use a pointer-responsive light-blue border glow on all portfolio category tabs.
Use prominent portfolio tabs with a 54px desktop height and a three-column layout on mobile.
Use slow, mask-led hero and first-scroll entrances with staggered cards, smooth easing, and reduced-motion support.
