"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const objects = [
  { shape: "mark", x: 28, y: 17, size: 112, rotation: -8, tone: "cyan" },
  { shape: "ring", x: 65, y: 14, size: 116, rotation: 12, tone: "slate", mobile: "ring" },
  { shape: "angle", x: 96, y: 31, size: 86, rotation: 18, tone: "cyan-dark", mobile: "angle" },
  { shape: "ring", x: 8, y: 43, size: 82, rotation: -12, tone: "paper" },
  { shape: "mark", x: 48, y: 45, size: 166, rotation: 8, tone: "cyan", mobile: "mark" },
  { shape: "angle", x: 85, y: 57, size: 126, rotation: -16, tone: "slate" },
  { shape: "angle", x: 20, y: 72, size: 142, rotation: -8, tone: "cyan-dark" },
  { shape: "ring", x: 59, y: 79, size: 102, rotation: 16, tone: "cyan" },
  { shape: "mark", x: 94, y: 88, size: 68, rotation: 12, tone: "paper" },
  { shape: "tile", x: 43, y: 98, size: 76, rotation: -14, tone: "slate", mobile: "tile" },
  { shape: "tile", x: 91, y: 7, size: 42, rotation: 18, tone: "paper" },
  { shape: "mark", x: 4, y: 13, size: 35, rotation: -12, tone: "cyan-dark" },
] as const;

export function HeroField() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      pointer: "(hover: hover) and (pointer: fine)",
      mobile: "(max-width: 720px)",
    }, ({ conditions }, contextSafe) => {
      const { motion, pointer, mobile } = conditions ?? {};
      const field = root.current;
      if (!motion || !field || !contextSafe) return;

      const nodes = Array.from(field.querySelectorAll<HTMLElement>(mobile ? "[data-mobile-shape]" : "[data-object]"));
      const drifts = nodes.map((node, index) => {
        const direction = index % 2 ? -1 : 1;
        return gsap.to(node.querySelector(".object-drift"), {
          ...(mobile && { x: direction * 2, rotation: direction * 2 }),
          y: direction * (mobile ? 4 : 5),
          duration: mobile ? 4.8 + index * 0.45 : 4 + index * 0.27,
          repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
        });
      });

      let visible = false;
      const updatePlayback = () => drifts.forEach((tween) => {
        if (visible && !document.hidden) tween.play(); else tween.pause();
      });
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updatePlayback(); });
      observer.observe(field);
      document.addEventListener("visibilitychange", updatePlayback);
      const stopPlayback = () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", updatePlayback);
      };

      if (mobile) return stopPlayback;

      const positions = pointer ? nodes.map((node) => ({
        node,
        xTo: gsap.quickTo(node, "x", { duration: 0.55, ease: "power3.out" }),
        yTo: gsap.quickTo(node, "y", { duration: 0.55, ease: "power3.out" }),
      })) : [];

      const move = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const rect = field.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        positions.forEach(({ node, xTo, yTo }) => {
          const dx = x - node.offsetLeft;
          const dy = y - node.offsetTop;
          const distance = Math.hypot(dx, dy);
          const strength = Math.max(0, 1 - distance / 210);
          xTo(-dx / (distance || 1) * strength * 20);
          yTo(-dy / (distance || 1) * strength * 20);
        });
      };
      const safely = (handler: (event: PointerEvent) => void) =>
        contextSafe(handler) as (event: PointerEvent) => void;
      const rotate = safely((event) => {
        if (!(event.target instanceof Element) || event.pointerType === "touch") return;
        const node = event.target.closest<HTMLElement>("[data-object]");
        if (!node) return;
        gsap.to(node.querySelector(".object-shape"), { rotation: Number(node.dataset.rotation) + 90, duration: 0.7, ease: "power3.out", overwrite: true });
      });
      const restore = safely((event) => {
        if (!(event.target instanceof Element)) return;
        const node = event.target.closest<HTMLElement>("[data-object]");
        if (!node || (event.relatedTarget instanceof Node && node.contains(event.relatedTarget))) return;
        gsap.to(node.querySelector(".object-shape"), { rotation: Number(node.dataset.rotation), duration: 0.85, ease: "power3.out", overwrite: true });
      });
      const reset = () => positions.forEach(({ xTo, yTo }) => { xTo(0); yTo(0); });
      const tap = safely((event) => {
        if (event.pointerType !== "touch" || !(event.target instanceof Element)) return;
        const node = event.target.closest<HTMLElement>("[data-object]");
        if (!node) return;
        gsap.timeline({ defaults: { overwrite: "auto" } })
          .to(node.querySelector(".object-shape"), { rotation: Number(node.dataset.rotation) + 90, duration: 0.45, ease: "power3.out" })
          .to(node.querySelector(".object-shape"), { rotation: Number(node.dataset.rotation), duration: 0.75, ease: "power3.out" });
      });

      if (pointer) {
        field.addEventListener("pointermove", move);
        field.addEventListener("pointerover", rotate);
        field.addEventListener("pointerout", restore);
        field.addEventListener("pointerleave", reset);
      }
      field.addEventListener("pointerdown", tap);
      return () => {
        stopPlayback();
        field.removeEventListener("pointermove", move);
        field.removeEventListener("pointerover", rotate);
        field.removeEventListener("pointerout", restore);
        field.removeEventListener("pointerleave", reset);
        field.removeEventListener("pointerdown", tap);
        nodes.forEach((node) => {
          gsap.set(node.querySelector(".object-shape"), { clearProps: "transform" });
        });
      };
    }, root);
    return () => media.revert();
  }, { scope: root });

  return (
    <div className="geometric-field" ref={root} aria-hidden="true">
      <div className="field-grid" />
      {objects.map((object, index) => (
        <div className={`field-object object-${object.tone}`} data-object data-rotation={object.rotation} key={index}
          data-mobile-shape={"mobile" in object ? object.mobile : undefined}
          style={{ "--x": object.x, "--y": object.y, "--size": `${object.size}px`, "--rotation": `${object.rotation}deg` } as CSSProperties}>
          <div className="object-drift">
            <svg className="object-shape" viewBox="0 0 100 100">
              {object.shape === "mark" ? <image href="/brand/axonrift-mark.png" width="100" height="100" preserveAspectRatio="xMidYMid meet" />
                : object.shape === "ring" ? <><circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="25" /><path className="object-facet" d="M50 3a47 47 0 0 1 47 47H72A22 22 0 0 0 50 28Z" /></>
                  : object.shape === "angle" ? <><path d="M3 3h94v94H66V34H3Z" /><path className="object-facet" d="M66 34h31v63H66Z" /></>
                    : <><rect x="3" y="3" width="94" height="94" rx="20" /><path className="object-facet" d="M3 65 65 3h12a20 20 0 0 1 20 20v12L35 97H23A20 20 0 0 1 3 77Z" /></>}
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
