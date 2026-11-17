import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Headphones } from "lucide-react";
import { profile } from "./content";

const navItems = [
  { id: "about", label: "关于我" },
  { id: "work", label: "作品集" },
  { id: "skills", label: "音乐制作能力" },
];

export function SiteHeader() {
  const headerRef = useRef(null);
  const [floating, setFloating] = useState(false);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const hero = document.getElementById("about");
    let frame = 0;

    function updatePosition() {
      // Match the document's anchor offset so section links also reveal the fixed header.
      setFloating(hero.getBoundingClientRect().bottom <= header.offsetHeight + 9);
    }

    function scheduleUpdate() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updatePosition();
      });
    }

    const observer = new ResizeObserver(updatePosition);
    observer.observe(hero);
    observer.observe(header);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    updatePosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef} data-floating={floating}>
      <div className="shell header-inner">
        <a className="wordmark" href="#top" aria-label={`${profile.name} · 作品集首页`}>
          <Headphones size={28} strokeWidth={1.45} aria-hidden="true" />
          <span><strong>{profile.name}</strong><small lang="en">PORTFOLIO</small></span>
        </a>
        <nav className="header-nav" aria-label="主导航">
          {navItems.map(({ id, label }) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>
        <a className="button button-outline header-contact" href="#contact">联系我 <ArrowUpRight size={15} /></a>
      </div>
    </header>
  );
}
