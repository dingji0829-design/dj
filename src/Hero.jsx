import { useLayoutEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, AudioLines, ChevronLeft, ChevronRight } from "lucide-react";
import { audioTracks, hero, profile, soundProjects, workCategories } from "./content";
import "./hero.css";

export function Hero() {
  const deckRef = useRef(null);
  const scrollTimer = useRef(null);
  const scrollFrame = useRef(0);
  const [deckEdges, setDeckEdges] = useState({
    canScrollLeft: true,
    canScrollRight: true,
    clipsLeft: false,
    clipsRight: false,
  });

  useLayoutEffect(() => {
    const deck = deckRef.current;
    const middle = deck.children[Math.floor((deck.children.length - 1) / 2)];
    deck.scrollLeft = middle.offsetLeft + (middle.offsetWidth - deck.clientWidth) / 2;
    updateDeck(deck);
    const observer = new ResizeObserver(() => updateDeck(deck));
    observer.observe(deck);
    return () => {
      observer.disconnect();
      clearTimeout(scrollTimer.current);
      cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  function handleDeckScroll(event) {
    const deck = event.currentTarget;
    if (!scrollFrame.current) {
      scrollFrame.current = requestAnimationFrame(() => {
        scrollFrame.current = 0;
        updateDeck(deck);
      });
    }
    deck.dataset.sliding = "";
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => { delete deck.dataset.sliding; }, 110);
  }

  function updateDeck(deck) {
    const cards = Array.from(deck.children);
    const center = deck.scrollLeft + deck.clientWidth / 2;
    const step = cards[1].offsetLeft - cards[0].offsetLeft || cards[0].offsetWidth || 1;
    const offsets = cards.map((card) => (card.offsetLeft + card.offsetWidth / 2 - center) / step);

    cards.forEach((card, index) => {
      const offset = offsets[index];
      const distance = Math.min(Math.abs(offset), 2.5);
      const side = Math.sign(offset);
      card.style.setProperty("--card-x", `${-side * distance ** 2 * step * 0.023}px`);
      card.style.setProperty("--card-z", `${-distance * 16}px`);
      card.style.setProperty("--card-yaw", `${side * distance * 12.5}deg`);
      card.style.setProperty("--cover-blur", `${Math.min(distance * 0.9, 2)}px`);
      card.style.zIndex = Math.round(10 - distance * 2);
    });

    const viewport = deck.getBoundingClientRect();
    const next = {
      canScrollLeft: deck.scrollLeft > 1,
      canScrollRight: deck.scrollWidth - deck.clientWidth - deck.scrollLeft > 1,
      clipsLeft: cards[0].firstElementChild.getBoundingClientRect().left < viewport.left - 1,
      clipsRight: cards.at(-1).firstElementChild.getBoundingClientRect().right > viewport.right + 1,
    };
    setDeckEdges((current) => (
      current.canScrollLeft === next.canScrollLeft &&
      current.canScrollRight === next.canScrollRight &&
      current.clipsLeft === next.clipsLeft &&
      current.clipsRight === next.clipsRight ? current : next
    ));
  }

  function scrollDeck(direction) {
    const deck = deckRef.current;
    const cardStep = deck.children[1].offsetLeft - deck.children[0].offsetLeft;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    deck.scrollBy({ left: direction * cardStep, behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-profile" id="about">
          <div className="hero-scene">
            <img src={hero.portrait} alt="丁集在黑胶唱机前" width="1049" height="1280" fetchPriority="high" />
          </div>
          <div className="shell hero-profile-inner">
            <div className="hero-copy">
              <p className="hero-roles">{profile.roles.map((role) => <span key={role}>{role}</span>)}</p>
              <h1 id="hero-title"><span className="hero-name-en" lang="en">{profile.englishName}</span><span className="hero-name-cn">{profile.name}</span></h1>
              <div className="hero-intro">
                <p lang="en">Recording Engineer / Sound Designer</p>
                <p>{profile.intro}</p>
                <div className="hero-profile-links">
                  <a className="text-link" href={profile.resumeUrl} target="_blank" rel="noreferrer">查看飞书简历 <ArrowUpRight size={15} /></a>
                  <a className="text-link" href="#contact">联系方式 <ArrowUpRight size={15} /></a>
                </div>
              </div>
              <dl className="stats hero-stats" aria-label="本站作品统计">
                <div><dt>视频作品</dt><dd>{String(1 + soundProjects.length).padStart(2, "0")}</dd></div>
                <div><dt>精选音频</dt><dd>{audioTracks.length}</dd></div>
                <div><dt>作品分类</dt><dd>{String(workCategories.length).padStart(2, "0")}</dd></div>
              </dl>
              <div className="hero-actions">
                <a className="hero-works-link" href="#work"><span><span lang="en">SELECTED WORKS</span>探索作品</span><ArrowDownRight size={34} /></a>
                <a className="button button-outline hero-secondary" href="#work-recording"><AudioLines size={17} /> 收听作品</a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-carousel">
          <div className="hero-deck-controls">
            <button type="button" className="hero-deck-control" aria-label="向左浏览作品分类" aria-controls="hero-deck" disabled={!deckEdges.canScrollLeft} onClick={() => scrollDeck(-1)}><ChevronLeft size={18} /></button>
            <button type="button" className="hero-deck-control" aria-label="向右浏览作品分类" aria-controls="hero-deck" disabled={!deckEdges.canScrollRight} onClick={() => scrollDeck(1)}><ChevronRight size={18} /></button>
          </div>
          <div className="hero-deck-viewport">
            <ul id="hero-deck" className="hero-deck" ref={deckRef} aria-label="作品分类入口" onScroll={handleDeckScroll}>
              {workCategories.map(({ id, label, description, cover }) => (
                <li key={id}>
                  <a className="hero-card" href={`#work-${id}`}>
                    <img src={cover} alt="" loading="lazy" decoding="async" />
                    <span className="hero-card-icon"><ArrowUpRight size={16} aria-hidden="true" /></span>
                    <span className="hero-card-info"><strong>{label}</strong><small>{description}</small></span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="hero-deck-glass hero-deck-glass-left" data-visible={deckEdges.clipsLeft} aria-hidden="true" />
            <div className="hero-deck-glass hero-deck-glass-right" data-visible={deckEdges.clipsRight} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
