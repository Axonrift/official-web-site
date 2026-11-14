import { Icon } from "@/components/icon";
import { services } from "@/content/home";

export function Services() {
  return (
    <section className="section wrap" id="services" aria-labelledby="services-title">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow"><span className="section-number">03 /</span>What we do</p>
          <h2 id="services-title">What we can build for you.</h2>
        </div>
        <p>Bring us a clear brief or a problem you’re still figuring out. We’ll help you decide what makes sense to build.</p>
      </div>
      <div className="service-list">
        {services.map(({ id, title, description, action, icon }, index) => (
          <article className="service" key={id} data-reveal>
            <span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className="service-name">
              <span className="service-icon"><Icon name={icon} /></span>
              <h3>{title}</h3>
            </div>
            <p>{description}</p>
            <a href="#contact" data-inquiry-topic={id} className="service-link" aria-label={action}>
              <Icon name="up-right" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
