"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Icon } from "@/components/icon";
import { ProjectArtwork } from "@/components/home/project-artwork";
import type { Project } from "@/content/home";

gsap.registerPlugin(useGSAP);

export function ProjectCard({ project }: { project: Project }) {
  const link = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const element = link.current;
      if (!element) return;
      const xTo = gsap.quickTo(element, "--pointer-x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(element, "--pointer-y", { duration: 0.35, ease: "power3.out" });
      function move(event: PointerEvent) {
        const rect = element!.getBoundingClientRect();
        xTo((event.clientX - rect.left) / rect.width * 100);
        yTo((event.clientY - rect.top) / rect.height * 100);
      }
      element.addEventListener("pointermove", move);
      return () => element.removeEventListener("pointermove", move);
    });
    return () => media.revert();
  }, { scope: link });

  return (
    <article className={`project-card project-${project.visual}`} data-reveal>
      <a className="project-link" ref={link} href="#contact" data-inquiry-topic={project.topic} aria-label={`Discuss a similar ${project.category.toLowerCase()} project`}>
        <div className="project-media">
          <ProjectArtwork kind={project.visual} />
          <span className="project-dither" aria-hidden="true" />
          <span className="project-category">{project.category}</span>
          {project.placeholder && <span className="sample-badge">Placeholder project</span>}
          <span className="project-arrow"><Icon name="up-right" /></span>
        </div>
        <div className="project-caption"><h3>{project.title}</h3><p>{project.description}</p></div>
      </a>
    </article>
  );
}
