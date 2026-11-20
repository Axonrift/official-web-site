import { BrandWordmark } from "@/components/brand-wordmark";
import { Icon } from "@/components/icon";
import { navigation, services } from "@/content/home";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-invitation" data-reveal>
            <p className="eyebrow"><span className="dot" />One good conversation can change things.</p>
            <h2>Let's build<br /><span className="text-accent">what's next.</span></h2>
            <a className="button button-arrow" href="#contact">Start a project <span><Icon name="arrow" /></span></a>
          </div>
          <div className="footer-links" data-reveal>
            <nav aria-label="Footer explore">
              <p className="micro-label">Explore</p>
              {navigation.map(({ href, label }) => <a href={href} key={href}>{label}</a>)}
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </nav>
            <nav aria-label="Footer services">
              <p className="micro-label">What we build</p>
              {services.map(({ id, title }) => <a href="#contact" data-inquiry-topic={id} key={id}>{title}</a>)}
            </nav>
          </div>
        </div>
        <a className="footer-wordmark" href="#top" aria-label="Axonrift home"><BrandWordmark /></a>
        <div className="footer-bottom"><p>© Axonrift</p><span>Software, with a different perspective.</span><a className="quiet-link" href="#top">Back to top <Icon name="up-right" /></a></div>
      </div>
    </footer>
  );
}
