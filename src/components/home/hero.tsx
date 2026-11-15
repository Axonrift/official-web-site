import { HeroField } from "@/components/home/hero-field";
import { Icon } from "@/components/icon";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        {/* <p className="eyebrow" data-hero-eyebrow>
          <span className="dot" />
          {hero.eyebrow}
        </p> */}
        <h1 id="hero-title">
          {hero.title.map((line, index) => (
            <span
              className={
                index === hero.title.length - 1 ? "text-accent" : undefined
              }
              data-hero-line
              key={line}
            >
              {line}
              {index < hero.title.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p className="hero-lede" data-hero-detail>
          {hero.description}
        </p>
        <div className="hero-actions" data-hero-detail>
          <a className="button button-arrow" href="#contact">
            Tell us your problem{" "}
            <span>
              <Icon name="arrow" />
            </span>
          </a>
          <a className="quiet-link" href="#work">
            Explore our work <Icon name="up-right" />
          </a>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true" data-hero-art>
        <HeroField />
      </div>
      <div className="hero-bottom" data-hero-detail>
        <p className="micro-label">Ideas into working software</p>
        <ul className="hero-capabilities" aria-label="Our capabilities">
          <li>Web</li>
          <li>Mobile</li>
          <li>Custom SaaS</li>
          <li>MVPs</li>
        </ul>
        <a className="hero-scroll" href="#about">
          A different perspective <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
