"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HandPoint = [number, number, number, number, number];
type HandData = { width: number; height: number; points: HandPoint[] };

export function ParticleHands() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = root.current;
    const surface = canvas.current;
    const section = container?.closest("section");
    const ctx = surface?.getContext("2d");
    if (!container || !surface || !section || !ctx) return;

    const abort = new AbortController();
    const media = gsap.matchMedia();
    let alive = true;

    void fetch("/graphics/reaching-hands.json", { signal: abort.signal })
      .then((response) => { if (!response.ok) throw new Error("Hand artwork unavailable"); return response.json() as Promise<HandData>; })
      .then((data) => {
        if (!alive) return;
        media.add({ reduce: "(prefers-reduced-motion: reduce)", motion: "(prefers-reduced-motion: no-preference)", small: "(max-width: 720px)" }, (context) => {
          const reduced = Boolean(context.conditions?.reduce);
          const limit = context.conditions?.small ? 1400 : 3200;
          const stride = Math.max(1, data.points.length / limit);
          const points = data.points.filter((_, index) => Math.floor(index / stride) !== Math.floor((index - 1) / stride));
          const state = { formation: reduced || section.getBoundingClientRect().top < innerHeight * 0.82 ? 1 : 0, reach: reduced ? 1 : 0 };
          const pointer = { x: -1000, y: -1000 };
          let width = 0;
          let height = 0;
          let scale = 1;
          let offsetX = 0;
          let offsetY = 0;
          let visible = false;
          let ticking = false;

          // Cache the tiny glyphs once; each frame only draws atlas tiles.
          const atlas = document.createElement("canvas");
          atlas.width = 8 * 16;
          atlas.height = 3 * 16;
          const ink = atlas.getContext("2d")!;
          const glyphs = ["", "", "+", "×", "·", "0", "1", ":"];
          ["#31d7ff", "#e6eff3", "#94a8b2"].forEach((color, row) => {
            ink.fillStyle = color;
            ink.font = "11px monospace";
            ink.textBaseline = "top";
            glyphs.forEach((glyph, column) => {
              if (column < 2) ink.fillRect(column * 16 + 4, row * 16 + 4, column ? 6 : 8, column ? 6 : 8);
              else ink.fillText(glyph, column * 16 + 3, row * 16 + 2);
            });
          });

          function draw(time = 0) {
            ctx!.clearRect(0, 0, width, height);
            points.forEach(([x, y, tone, glyph, alpha], index) => {
              const seed = Math.sin(index * 91.7 + 12.3);
              const loose = 1 - state.formation;
              const inward = x < data.width / 2 ? 12 : -12;
              let px = (x + seed * 74 * loose + inward * state.reach) * scale + offsetX;
              let py = (y + Math.cos(index * 32.1) * 48 * loose) * scale + offsetY;
              const dx = px - pointer.x;
              const dy = py - pointer.y;
              const distance = Math.hypot(dx, dy);
              if (!reduced && distance < 90) {
                const force = (1 - distance / 90) * 14;
                px += dx / (distance || 1) * force;
                py += dy / (distance || 1) * force;
              }
              ctx!.globalAlpha = alpha * (0.3 + state.formation * 0.7) * (reduced ? 1 : 0.92 + 0.08 * Math.sin(time * 1.2 + index * 0.71));
              const size = Math.max(3, 7.5 * scale);
              ctx!.drawImage(atlas, glyph * 16, tone * 16, 16, 16, px - size / 2, py - size / 2, size, size);
            });
            ctx!.globalAlpha = 1;
          }

          function resize() {
            const rect = container!.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            const dpr = Math.min(devicePixelRatio || 1, 2);
            surface!.width = Math.round(width * dpr);
            surface!.height = Math.round(height * dpr);
            ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
            scale = Math.max(width / data.width, height / data.height);
            offsetX = (width - data.width * scale) / 2;
            offsetY = (height - data.height * scale) / 2;
            draw();
          }
          function updatePlayback() {
            const shouldTick = visible && !document.hidden && !reduced;
            if (shouldTick && !ticking) { gsap.ticker.add(draw); ticking = true; }
            if (!shouldTick && ticking) { gsap.ticker.remove(draw); ticking = false; }
            container!.dataset.active = String(shouldTick);
          }
          function move(event: PointerEvent) {
            if (event.pointerType === "touch" || reduced) return;
            const rect = container!.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
          }
          function leave() { pointer.x = -1000; pointer.y = -1000; }

          resize();
          container.dataset.ready = "true";
          container.dataset.mode = reduced ? "static" : "animated";
          if (!reduced) {
            gsap.to(state, { formation: 1, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
            gsap.to(state, { reach: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 85%", end: "bottom 45%", scrub: 0.8 } });
          }
          const sizeObserver = new ResizeObserver(resize);
          const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updatePlayback(); });
          sizeObserver.observe(container);
          visibilityObserver.observe(container);
          section.addEventListener("pointermove", move);
          section.addEventListener("pointerleave", leave);
          document.addEventListener("visibilitychange", updatePlayback);

          return () => {
            gsap.ticker.remove(draw);
            sizeObserver.disconnect();
            visibilityObserver.disconnect();
            section.removeEventListener("pointermove", move);
            section.removeEventListener("pointerleave", leave);
            document.removeEventListener("visibilitychange", updatePlayback);
            delete container.dataset.ready;
            delete container.dataset.mode;
            delete container.dataset.active;
          };
        });
      }).catch(() => { /* The server-rendered SVG remains visible if loading fails. */ });

    return () => { alive = false; abort.abort(); media.revert(); };
  }, []);

  return (
    <div className="hands-art" ref={root} aria-hidden="true">
      {/* A native image is the static fallback for JavaScript or Canvas failure. */}
      <img className="hands-fallback" src="/graphics/reaching-hands.svg" width={1440} height={420} alt="" loading="lazy" />
      <canvas ref={canvas} />
    </div>
  );
}
