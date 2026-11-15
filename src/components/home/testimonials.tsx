import { testimonials } from "@/content/home";

export function Testimonials() {
  return (
    <section
      className="section wrap"
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">
            <span className="section-number">04 /</span>Client perspectives
          </p>
          <h2 id="testimonials-title">
            Good work starts with
            <br />a good conversation.
          </h2>
        </div>
        <p>
          This space is reserved for approved client feedback. The cards below
          are placeholders.
        </p>
      </div>
      <div className="testimonial-grid">
        {testimonials.map(({ id, quote, name, role, placeholder }) => (
          <figure className="testimonial" key={id} data-reveal>
            <div className="quote-top">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              {placeholder && (
                <span className="sample-badge">Sample testimonial</span>
              )}
            </div>
            <blockquote>
              <p>{quote}</p>
            </blockquote>
            <figcaption>
              <span className="quote-avatar" aria-hidden="true">
                ↗
              </span>
              <div>
                <strong>{name}</strong>
                <span>{role}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
