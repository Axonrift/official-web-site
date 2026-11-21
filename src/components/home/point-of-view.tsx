import CipherReach from "@/components/originkit/ui/two-reaching-hands-custom-style";
import { pointOfView } from "@/content/home";

export function PointOfView() {
  return (
    <section className="point-of-view" id="about" aria-labelledby="perspective-title">
      <div className="perspective-panel wrap">
        <div className="perspective-copy wrap">
          <h2 id="perspective-title">{pointOfView.title}</h2>
          <p className="perspective-lede">{pointOfView.description}</p>
        </div>
        <div className="hands-art" aria-hidden="true">
          <CipherReach
            background="transparent"
            accent="#28CCEF"
            offsetY={5}
            scale={65}
            mobileScale={95}
            mobileOffsetY={-4}
          />
        </div>
      </div>
    </section>
  );
}
