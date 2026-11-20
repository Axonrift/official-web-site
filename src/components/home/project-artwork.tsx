import Image from "next/image";
import sefiaMockup from "./mockup-sefia.webp";
import ipadMockup from "./mockup-ipad.webp";
import { InteractivePattern } from "@/components/home/interactive-pattern";
import type { Project } from "@/content/home";

export function ProjectArtwork({
  kind,
  image,
}: {
  kind: Project["visual"];
  image?: string;
}) {
  return (
    <div className={`project-artwork artwork-${kind}`} aria-hidden="true">
      {kind === "website" ? (
        <Image
          src={image || sefiaMockup}
          alt="Sefia Books website mockup"
          fill
          sizes="(min-width: 900px) 55vw, 100vw"
          className="project-cover-image"
          priority
        />
      ) : kind === "mobile" ? (
        <Image
          src={image || ipadMockup}
          alt="Hidden Chapter Sefia Books iPad mockup"
          fill
          sizes="(min-width: 900px) 45vw, 100vw"
          className="project-cover-image"
        />
      ) : (
        <InteractivePattern />
      )}
    </div>
  );
}
