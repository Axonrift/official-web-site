"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqs } from "@/content/home";
import { Icon } from "@/components/icon";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Faq() {
  const root = useRef<HTMLElement>(null);

  useGSAP((_, contextSafe) => {
    if (!contextSafe) return;
    const items = Array.from(root.current?.querySelectorAll<HTMLDetailsElement>("details") ?? []);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    function setExpanded(item: HTMLDetailsElement, expanded: boolean) {
      const summary = item.querySelector("summary")!;
      const answer = item.querySelector<HTMLElement>(".faq-answer")!;
      const start = item.getBoundingClientRect().height;
      gsap.killTweensOf(item);
      item.dataset.expanded = String(expanded);
      if (reduced.matches) { item.open = expanded; item.style.removeProperty("height"); ScrollTrigger.refresh(); return; }
      if (expanded) item.open = true;
      const end = summary.getBoundingClientRect().height + (expanded ? answer.scrollHeight : 0) + 1;
      gsap.fromTo(item, { height: start }, {
        height: end, duration: 0.35, ease: "power3.out", overwrite: true,
        onComplete: () => { item.open = expanded; item.style.removeProperty("height"); ScrollTrigger.refresh(); },
      });
    }

    const handlers = items.map((item) => {
      const summary = item.querySelector("summary")!;
      const toggle = contextSafe((event: Event) => {
        event.preventDefault();
        const expanded = item.dataset.expanded === "true" || (item.open && item.dataset.expanded !== "false");
        if (!expanded) items.forEach((other) => { if (other !== item && other.open) setExpanded(other, false); });
        setExpanded(item, !expanded);
      });
      summary.addEventListener("click", toggle);
      return () => summary.removeEventListener("click", toggle);
    });
    function settle() {
      items.forEach((item) => {
        gsap.killTweensOf(item);
        item.open = item.dataset.expanded === "true";
        item.style.removeProperty("height");
      });
    }
    reduced.addEventListener("change", settle);
    return () => { reduced.removeEventListener("change", settle); handlers.forEach((remove) => remove()); };
  }, { scope: root });

  return (
    <section className="section wrap faq-section" id="faq" aria-labelledby="faq-title" ref={root}>
      <div className="faq-copy" data-reveal>
        <h2 id="faq-title">Questions,<br /><span className="text-muted">answered.</span></h2>
        <p>Something else on your mind?<br />Let's work through it together.</p>
        <a className="quiet-link" href="#contact">Start a conversation <Icon name="up-right" /></a>
      </div>
      <div className="faq-list" data-reveal>
        {faqs.map(({ id, question, answer }, index) => (
          <details className="faq-item" key={id}>
            <summary><span className="faq-number" aria-hidden="true">0{index + 1}</span><h3>{question}</h3><span className="faq-plus" aria-hidden="true" /></summary>
            <div className="faq-answer"><p>{answer}</p></div>
          </details>
        ))}
      </div>
    </section>
  );
}
