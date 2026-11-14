import { ParticleHands } from "@/components/home/particle-hands";
import { pointOfView } from "@/content/home";

export function PointOfView() {
  return (
    <section className="point-of-view" id="about" aria-labelledby="perspective-title">
      <div className="perspective-copy wrap" data-reveal>
        <p className="eyebrow"><span className="section-number">01 /</span>Our point of view</p>
        <h2 id="perspective-title">{pointOfView.title}</h2>
        <p className="perspective-lede">{pointOfView.description}</p>
      </div>
      <ParticleHands />
    </section>
  );
}
