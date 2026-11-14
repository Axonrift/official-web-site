"use client";

import { useEffect, useRef, useState } from "react";
import { BrandWordmark } from "@/components/brand-wordmark";
import { Icon } from "@/components/icon";
import { navigation } from "@/content/home";

export function SiteHeader() {
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const [compact, setCompact] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const expanded = !compact || hovered || keyboardFocus;

  useEffect(() => {
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCompact(window.scrollY > 120));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, []);

  function closeMenu() {
    if (mobileMenu.current) mobileMenu.current.open = false;
  }

  return (
    <header className="site-header" data-compact={compact} data-expanded={expanded}>
      <div className="header-bar wrap"
        onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={(event) => { if (event.target.matches(":focus-visible")) setKeyboardFocus(true); }}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false); }}>
        <a className="brand" href="#top" aria-label="Axonrift home"><BrandWordmark /></a>
        <nav className="desktop-nav" aria-label="Main" inert={!expanded} aria-hidden={!expanded}>
          {navigation.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="button header-cta" href="#contact">Start a project <Icon name="up-right" /></a>
        <details className="mobile-menu" ref={mobileMenu}
          onKeyDown={(event) => {
            if (event.key === "Escape" && event.currentTarget.open) {
              closeMenu();
              event.currentTarget.querySelector("summary")?.focus();
            }
          }}>
          <summary>Menu <span className="menu-symbol" aria-hidden="true"><i /><i /></span></summary>
          <nav aria-label="Mobile">
            {navigation.map(({ href, label }) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
            <a href="#faq" onClick={closeMenu}>Questions, answered</a>
            <a href="#contact" onClick={closeMenu}>Start a project</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
