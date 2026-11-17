import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  ArrowUp, ArrowUpRight, AudioLines,
  Copy, Music, Pause, Play, Sparkles, X,
} from "lucide-react";
import { audioTracks, contactSlideshow, film, portfolioCategories, profile, skills, soundProjects, workCategories } from "./content";
import { Hero } from "./Hero";
import FluxLines from "./FluxLines";
import { SiteHeader } from "./SiteHeader";
import "./portfolio-motion.css";

const skillIcons = { scoring: Music, ai: Sparkles, audio: AudioLines };

function clockTime(seconds) {
  const total = Math.floor(seconds || 0);
  return `${Math.floor(total / 60).toString().padStart(2, "0")}:${(total % 60).toString().padStart(2, "0")}`;
}

function SectionLabel({ english, children }) {
  return <div className="section-label">
    <span className="marker" />
    <span lang="en">{english}</span>
    {children && <><span className="label-slash">/</span>{children}</>}
  </div>;
}


function ProjectCard({ project, onOpen }) {
  return (
    <article className="project" id={`project-${project.id}`}>
      <button className="project-cover" type="button" onClick={(event) => onOpen(project, event.currentTarget)} aria-label={`播放视频：${project.title}`}>
        <img src={project.poster} alt="" loading="lazy" width="1280" height="853" />
        <span className="project-format">{project.id === film.id ? "宣传片样片" : project.category}</span>
        <span className="project-play"><Play size={24} fill="currentColor" /></span>
        <span className="project-runtime">{clockTime(project.duration)}</span>
      </button>
      <div className="project-meta">
        <div><h3>{project.title}</h3><p>{project.credit}</p></div>
        <span className="project-type">{project.category}</span>
      </div>
    </article>
  );
}

const titledCovers = new Set(["lingzhao", "film-score-02", "stage-battle-x01", "stage-battle-x02"]);

function TrackArtwork({ track, thumbnail = false }) {
  const size = thumbnail ? 38 : 640;
  return (
    <span className={thumbnail ? "track-cover" : "track-cover audio-artwork"} data-track={track.id} aria-hidden="true">
      <img src={track.cover} alt="" loading={thumbnail ? "lazy" : undefined} width={size} height={size} />
      {(titledCovers.has(track.id) || track.groups.includes("ai-music")) && <span className="track-cover-title">{track.title}</span>}
    </span>
  );
}

function AudioPlayer({ track, audioRef, playbackRef, isPlaying, setIsPlaying }) {
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(track.duration);
  const [error, setError] = useState(false);
  const progress = duration > 0 ? elapsed / duration : 0;

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, [audioRef]);

  function toggleAudio() {
    const audio = audioRef.current;
    if (audio.paused) audio.play().then(() => setError(false)).catch(() => setError(true));
    else audio.pause();
  }

  useImperativeHandle(playbackRef, () => ({ toggleAudio }));

  return (
    <div className={track.cover ? "audio-player audio-player-with-cover" : "audio-player"}>
      <audio
        ref={audioRef} src={track.src} preload="none"
        onLoadedMetadata={(event) => {
          if (Number.isFinite(event.currentTarget.duration)) setDuration(event.currentTarget.duration);
        }}
        onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setError(true)}
      />
      {track.cover && <TrackArtwork track={track} />}
      <button className="audio-toggle" type="button" onClick={toggleAudio} aria-label={isPlaying ? "暂停音频" : "播放音频"}>
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
      </button>
      <div className="audio-heading">
        <div className="audio-label"><AudioLines size={13} /> {track.category}</div>
        <h3>{track.title}</h3>
      </div>
      <div className="audio-track">
        <div className="waveform" aria-hidden="true">
          {track.waveform.map((height, index) => <i key={index} className={index / track.waveform.length < progress ? "played" : ""} style={{ height: `${height}%` }} />)}
        </div>
        <input
          type="range" min="0" max={duration} step="0.1" value={elapsed} aria-label="音频播放进度"
          aria-valuetext={`${clockTime(elapsed)} / ${clockTime(duration)}`}
          onChange={(event) => {
            const seekTo = Number(event.target.value);
            if (audioRef.current.readyState === 0) return;
            audioRef.current.currentTime = seekTo;
            setElapsed(seekTo);
          }}
        />
      </div>
      <time className="audio-clock">{clockTime(elapsed)} <span>/ {clockTime(duration)}</span></time>
      {error && <p className="media-error" role="status">音频暂时无法播放，请重试。</p>}
    </div>
  );
}

function categoryFromHash() {
  const hash = window.location.hash;
  if (hash === "#work" || hash === "#sound") return workCategories[0];
  if (hash === "#project-suzhou") return workCategories.find(({ id }) => id === "film-scoring");
  return workCategories.find(({ id }) => hash === `#work-${id}`);
}

function updateCategoryGlow(event) {
  const tab = event.currentTarget;
  const { left, top, width, height } = tab.getBoundingClientRect();
  const x = event.clientX - left - width / 2;
  const y = event.clientY - top - height / 2;
  const proximity = Math.max(Math.abs(x) / (width / 2), Math.abs(y) / (height / 2));
  tab.style.setProperty("--tab-glow-angle", `${Math.atan2(y, x) * 180 / Math.PI + 90}deg`);
  tab.style.setProperty("--tab-glow-strength", Math.max(0, Math.min(1, (proximity - .3) / .7)));
}

function Work() {
  const dialogRef = useRef(null);
  const audioRef = useRef(null);
  const activeTrigger = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [category, setCategory] = useState(() => categoryFromHash() ?? workCategories[0]);
  const [trackId, setTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackRef = useRef(null);
  const tracks = audioTracks.filter((track) => track.groups.includes(category.id));
  const activeTrack = tracks.find((track) => track.id === trackId) ?? tracks[0];
  const showFilm = category.id === "film-scoring";

  useEffect(() => {
    function updateCategory() {
      const nextCategory = categoryFromHash();
      if (!nextCategory) return;
      setCategory(nextCategory);
      setTrackId(null);
      setIsPlaying(false);
    }

    window.addEventListener("hashchange", updateCategory);
    if (categoryFromHash()) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
    return () => window.removeEventListener("hashchange", updateCategory);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!activeProject || dialog.open) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [activeProject]);

  function openProject(project, trigger) {
    audioRef.current?.pause();
    activeTrigger.current = trigger;
    setActiveProject(project);
  }

  function handleClose() {
    setActiveProject(null);
    activeTrigger.current?.focus();
  }

  function switchCategory(event, nextCategory) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (nextCategory.id === category.id) return;
    window.history.pushState(null, "", event.currentTarget.hash);
    setCategory(nextCategory);
    setTrackId(null);
    setIsPlaying(false);
  }

  function selectTrack(track) {
    if (activeTrack.id === track.id) return;
    setTrackId(track.id);
    setIsPlaying(false);
  }

  function previewTrack(track) {
    // Mount the selected track before calling play within the user's click.
    if (activeTrack.id !== track.id) flushSync(() => selectTrack(track));
    playbackRef.current?.toggleAudio();
  }

  return (
    <section id="work" className="section work">
      {workCategories.map(({ id }) => <span key={id} id={`work-${id}`} className="work-anchor" aria-hidden="true" />)}
      <span id="sound" className="work-anchor" aria-hidden="true" />
      <div className="shell">
        <SectionLabel english="PORTFOLIO" />
        <div className="section-heading work-heading">
          <h2>作品集</h2>
          <nav className="work-category-nav" aria-label="切换作品分类">
            {portfolioCategories.map((item) => (
              <a key={item.id} className="work-category" href={`#work-${item.id}`}
                onPointerMove={updateCategoryGlow}
                onClick={(event) => switchCategory(event, item)} aria-current={category.id === item.id ? "location" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className={activeTrack ? "work-media work-media-audio" : "work-media"} aria-label={category.label}>
          {showFilm && <ProjectCard project={film} onOpen={openProject} />}
          {category.id === "sound-design" && <div className="sound-project-grid">
            {soundProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={openProject} />)}
          </div>}
          {activeTrack ? <section className="audio-section" aria-labelledby="sound-title">
            <h3 id="sound-title" className="audio-section-title">音频作品</h3>
            <ul className="audio-list" aria-label="选择音频">
              {tracks.map((track) => {
                const previewPlaying = activeTrack.id === track.id && isPlaying;
                const action = previewPlaying ? "暂停" : "试听";
                return <li key={track.id} className="audio-list-row">
                  <button className="audio-list-select" type="button" aria-pressed={activeTrack.id === track.id} onClick={() => selectTrack(track)}>
                    <span className="audio-list-icon">
                      {track.cover
                        ? <TrackArtwork track={track} thumbnail />
                        : <AudioLines size={14} aria-hidden="true" />}
                    </span>
                    <span className="audio-list-title">{track.title}</span>
                    <span className="audio-list-category">{track.category}</span>
                    <span className="audio-list-duration">{clockTime(track.duration)}</span>
                  </button>
                  <button className="audio-list-preview button button-outline" type="button" aria-label={`${action} ${track.title}`} onClick={() => previewTrack(track)}>
                    {action} {previewPlaying ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                  </button>
                </li>;
              })}
            </ul>
            <AudioPlayer key={activeTrack.id} track={activeTrack} audioRef={audioRef} playbackRef={playbackRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          </section> : null}
        </div>
      </div>
      <dialog
        className="project-dialog" ref={dialogRef} aria-labelledby="project-dialog-title"
        onClose={handleClose} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}
      >
        {activeProject && (
          <div className="dialog-inner">
            <div className="dialog-header">
              <div><h2 id="project-dialog-title">{activeProject.title}</h2><p>{activeProject.description}</p></div>
              <button type="button" className="dialog-close" aria-label="关闭视频" onClick={() => dialogRef.current.close()} autoFocus><X size={24} /></button>
            </div>
            <video key={activeProject.id} src={activeProject.video} poster={activeProject.poster} controls autoPlay playsInline />
          </div>
        )}
      </dialog>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="shell">
        <SectionLabel english="CAPABILITIES" />
        <div className="section-heading"><h2>音乐制作能力</h2></div>
        <div className="skill-grid">
          {skills.map((skill) => {
            const Icon = skillIcons[skill.id];
            return <article className="skill-card" key={skill.id}>
              <Icon className="skill-icon" size={34} strokeWidth={1.35} aria-hidden="true" />
              <div><p className="skill-english" lang="en">{skill.english}</p><h3>{skill.title}</h3><p>{skill.description}</p></div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const slideshowRef = useRef(null);
  const slideshowOverride = useRef(null);
  const [slideshowPlaying, setSlideshowPlaying] = useState(false);
  const [slideshowError, setSlideshowError] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const video = slideshowRef.current;
    if (!video) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    function updateSlideshow() {
      const wantsPlayback = slideshowOverride.current ?? !preference.matches;
      if (visible && wantsPlayback) video.play().catch(() => {});
      else video.pause();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateSlideshow();
    });
    observer.observe(video);
    preference.addEventListener("change", updateSlideshow);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updateSlideshow);
    };
  }, [slideshowError]);

  function toggleSlideshow() {
    const video = slideshowRef.current;
    slideshowOverride.current = video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("邮箱已复制");
    } catch {
      setCopyStatus("复制失败，请选择邮箱地址后手动复制。");
    }
  }

  return (
    <footer id="contact" className="contact">
      <div className="contact-art" aria-hidden="true" style={{ backgroundImage: `url(${contactSlideshow.poster})` }}>
        {!slideshowError && <video
          ref={slideshowRef} src={contactSlideshow.video} poster={contactSlideshow.poster}
          muted loop playsInline preload="none"
          onPlay={() => setSlideshowPlaying(true)} onPause={() => setSlideshowPlaying(false)}
          onError={() => { setSlideshowPlaying(false); setSlideshowError(true); }}
        />}
      </div>
      <div className="shell contact-inner">
        <div className="contact-main">
          <SectionLabel english="CONTACT" />
          <h2><span>联系我</span></h2>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={20} /></a>
          <div className="contact-actions">
            <a className="button button-fill" href={profile.resumeUrl} target="_blank" rel="noreferrer">查看飞书简历 <ArrowUpRight size={20} /></a>
            <button className="button button-outline" type="button" onClick={copyEmail}><Copy size={17} /> 复制邮箱</button>
            <span className="copy-status" role="status">{copyStatus}</span>
          </div>
        </div>
        <div className="contact-bottom">
          <span>{profile.name} / PORTFOLIO</span>
          <div className="contact-bottom-links">
            {!slideshowError && <button className="hero-motion" type="button" onClick={toggleSlideshow} aria-label={slideshowPlaying ? "暂停照片幻灯片" : "播放照片幻灯片"}>
              {slideshowPlaying ? <Pause size={14} /> : <Play size={14} />} <span>照片幻灯片</span>
            </button>}
            <a href="#top" className="back-top">返回顶部 <ArrowUp size={17} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  const fluxRegion = useRef(null);
  const [showFlux, setShowFlux] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShowFlux(true);
      observer.disconnect();
    }, { rootMargin: "120px" });
    observer.observe(fluxRegion.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const section = entry.target;
        section.dataset.entered = "";
        section.querySelectorAll(".hero-deck li, .audio-list-row, .sound-project-grid .project, .skill-card").forEach((card, index) => {
          card.style.setProperty("--entrance-delay", `${420 + Math.min(index, 8) * 85}ms`);
          card.classList.add("portfolio-stagger");
        });
        observer.unobserve(section);
      }
    }, { rootMargin: "0px 0px -7% 0px" });

    document.querySelectorAll(".hero-carousel, #work, #skills, #contact").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a href="#work" className="skip-link">跳至作品</a>
      <SiteHeader />
      <main>
        <Hero />
        <div className="post-hero-stage">
          <div className="post-hero-flux" aria-hidden="true" ref={fluxRegion}>
            {showFlux && <FluxLines
              colors={["#e3f3ff", "#7cc4ff", "#bad5f6"]}
              speed={0.28}
              scale={1.85}
              turbulence={0.85}
              fluidity={0.12}
              glow={1.7}
              rimWidth={0.18}
              lineWidth={0.8}
              shimmer={1.15}
              flowDirection="down"
              opacity={0.62}
              mouseInteraction
              clickSwirl
            />}
          </div>
          <div className="post-hero-content">
            <Work />
            <Skills />
          </div>
        </div>
      </main>
      <Contact />
    </>
  );
}
