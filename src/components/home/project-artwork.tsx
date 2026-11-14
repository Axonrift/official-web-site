import { BrandWordmark } from "@/components/brand-wordmark";
import { Icon } from "@/components/icon";
import type { Project } from "@/content/home";

export function ProjectArtwork({ kind }: { kind: Project["visual"] }) {
  return (
    <div className={`project-artwork artwork-${kind}`} aria-hidden="true">
      {kind === "website" ? (
        <div className="mock-browser">
          <div className="mock-browser-bar"><span /><span /><span /><i>website / concept</i></div>
          <div className="mock-web-page">
            <div className="mock-web-nav"><BrandWordmark tone="dark" /><span>About&nbsp;&nbsp; Work&nbsp;&nbsp; Contact</span><i>Let’s talk ↗</i></div>
            <p className="mock-kicker">A little clarity goes a long way.</p>
            <p className="mock-web-title">Big ideas.<br />Clear direction.</p>
            <div className="mock-web-bottom"><span className="mock-web-button">Explore the idea ↗</span><span>Good things<br />start here.</span></div>
            <div className="mock-sculpture"><i /><i /><i /><i /></div>
            <div className="mock-web-strip"><span>STRATEGY</span><span>DESIGN</span><span>DEVELOPMENT</span><span>↗</span></div>
          </div>
        </div>
      ) : kind === "mobile" ? (
        <>
          <div className="mock-mobile-orbit" />
          <div className="mock-phone mock-phone-back"><div className="phone-notch" /><div className="phone-tile"><Icon name="layers" /></div><span>A little more<br />in your day.</span></div>
          <div className="mock-phone mock-phone-front">
            <div className="phone-notch" /><div className="phone-header"><span>9:41</span><span>● ▰</span></div>
            <p>Your day,<br /><strong>a little simpler.</strong></p>
            <div className="phone-feature"><span>Today’s focus</span><i /><strong>Make room<br />for good work.</strong><b>↗</b></div>
            <div className="phone-list"><i /><span>One thing at a time.</span><b>✓</b></div>
            <div className="phone-bottom"><i /><i /><i /></div>
          </div>
        </>
      ) : (
        <div className="mock-product-window">
          <div className="mock-product-top"><span className="mock-app-icon"><Icon name="box" /></span><span>First release</span><i>Concept preview</i></div>
          <div className="mock-product-body">
            <div><p className="mock-kicker">FROM THE FIRST STEP</p><p className="mock-product-title">A little progress.<br />Every day.</p></div>
            <div className="mock-board">{["The idea", "Taking shape", "Ready to try"].map((label, index) => (
              <div className="mock-board-column" key={label}><span><i />{label}</span><div><i /><i /><b>{index === 0 ? "A useful starting point" : index === 1 ? "Make it work" : "Learn. Then improve."}</b><em /></div>{index !== 2 && <div className="mock-board-short"><i /><i /></div>}</div>
            ))}</div>
          </div>
        </div>
      )}
    </div>
  );
}
