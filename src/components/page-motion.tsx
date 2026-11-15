"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial anchor scrolling must finish after font layout and ScrollTrigger's
    // first measurements; a refresh can interrupt the browser's smooth scroll.
    const initialHash = window.location.hash;
    if (!initialHash) return;
    let cancelled = false;
    let frame = 0;
    let loaded: (() => void) | undefined;
    const onLoad = () => loaded?.();
    const whenLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else {
        loaded = resolve;
        window.addEventListener("load", onLoad, { once: true });
      }
    });
    const cancel = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
    const inputs = ["pointerdown", "touchstart", "wheel", "keydown"] as const;
    inputs.forEach((event) =>
      window.addEventListener(event, cancel, { passive: true, once: true }),
    );
    void Promise.all([document.fonts.ready, whenLoaded]).then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (cancelled || window.location.hash !== initialHash) return;
          let id = initialHash.slice(1);
          try {
            id = decodeURIComponent(id);
          } catch {
            /* Use the literal fragment. */
          }
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "instant", block: "start" });
        });
      });
    });
    return () => {
      cancel();
      window.removeEventListener("load", onLoad);
      inputs.forEach((event) => window.removeEventListener(event, cancel));
    };
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 941px)",
          wide: "(min-width: 721px)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { reduce, wide } = context.conditions ?? {};
          const container = root.current;
          if (reduce || !container) return;

          const hero = container.querySelector<HTMLElement>(".hero");
          if (
            hero &&
            hero.getBoundingClientRect().bottom > 0 &&
            (!window.location.hash ||
              ["#top", "#main"].includes(window.location.hash))
          ) {
            gsap
              .timeline({ defaults: { ease: "power3.out" } })
              .from("[data-hero-eyebrow]", {
                opacity: 0,
                y: 12,
                duration: 0.6,
                clearProps: "transform,opacity",
              })
              .from(
                "[data-hero-line]",
                {
                  opacity: 0,
                  y: 32,
                  duration: 0.9,
                  stagger: 0.08,
                  clearProps: "transform,opacity",
                },
                0.08,
              )
              .from(
                "[data-hero-detail]",
                {
                  opacity: 0,
                  y: 16,
                  duration: 0.7,
                  stagger: 0.08,
                  clearProps: "transform,opacity",
                },
                0.28,
              )
              .from(
                "[data-hero-art]",
                {
                  opacity: 0,
                  scale: 0.92,
                  rotation: -4,
                  duration: 1.1,
                  clearProps: "transform,opacity",
                },
                0.08,
              );
          }

          const reveals = new Map<HTMLElement, gsap.core.Tween>();
          container
            .querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach((element) => {
              // Deep links and content already in view never wait for an entrance.
              if (
                element.getBoundingClientRect().top <
                window.innerHeight * 0.85
              )
                return;
              reveals.set(
                element,
                gsap.from(element, {
                  opacity: 0,
                  y: 20,
                  duration: 0.65,
                  ease: "power3.out",
                  clearProps: "transform,opacity",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 88%",
                    once: true,
                  },
                }),
              );
            });

          function finishReveal(element: HTMLElement, tween: gsap.core.Tween) {
            tween.progress(1);
            tween.scrollTrigger?.kill();
            reveals.delete(element);
          }

          function revealFocusedContent(event: FocusEvent) {
            if (!(event.target instanceof Element)) return;
            const element = event.target.closest<HTMLElement>("[data-reveal]");
            if (!element) return;
            const tween = reveals.get(element);
            if (tween) finishReveal(element, tween);
          }

          function revealHashTarget() {
            let id = window.location.hash.slice(1);
            try {
              id = decodeURIComponent(id);
            } catch {
              /* Keep a literal malformed hash. */
            }
            const target = document.getElementById(id);
            if (!target) return;
            reveals.forEach((tween, element) => {
              if (target.contains(element) || element.contains(target))
                finishReveal(element, tween);
            });
          }

          if (wide) {
            gsap.fromTo(
              "[data-process-progress]",
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: "#process",
                  start: "top 80%",
                  end: "bottom 60%",
                  scrub: 0.8,
                },
              },
            );
          }

          container.addEventListener("focusin", revealFocusedContent);
          window.addEventListener("hashchange", revealHashTarget);
          revealHashTarget();

          let active = true;
          void document.fonts.ready.then(() => {
            if (active) ScrollTrigger.refresh();
          });

          return () => {
            active = false;
            container.removeEventListener("focusin", revealFocusedContent);
            window.removeEventListener("hashchange", revealHashTarget);
          };
        },
        root,
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="site-shell">
      {children}
    </div>
  );
}
