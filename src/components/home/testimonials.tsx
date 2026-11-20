import Image from "next/image";
import { singleTestimonial } from "@/content/home";
import { Icon } from "@/components/icon";

export function Testimonials() {
  const { name, role, company, avatar, leadQuote, bodyQuote, projectTitle, projectHref, metrics } = singleTestimonial;

  return (
    <section
      className="section wrap"
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="section-heading" data-reveal>
        <div>
          <h2 id="testimonials-title">
            Client perspective.<br />
            <span className="text-muted">Real results in their own words.</span>
          </h2>
        </div>
      </div>

      <div className="testimonial-stage" data-reveal>
        <div className="testimonial-content">
          <blockquote className="testimonial-quote">
            <p className="testimonial-lead">“{leadQuote}”</p>
            <p className="testimonial-body">{bodyQuote}</p>
          </blockquote>
        </div>

        <aside className="testimonial-author-card">
          <div className="author-photo-wrapper">
            <Image
              src={avatar}
              alt={name}
              width={200}
              height={200}
              className="author-photo"
            />
          </div>
          <div className="author-info">
            <strong className="author-name">{name}</strong>
            <span className="author-role">{role}, {company}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
