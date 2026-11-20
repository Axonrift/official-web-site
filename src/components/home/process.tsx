import { processSteps } from "@/content/home";

export function Process() {
  return (
    <section className="section wrap" id="process" aria-labelledby="process-title">
      <div className="section-heading" data-reveal>
        <div>
          <h2 id="process-title">From problem to working software.</h2>
        </div>
      </div>
      <div className="process-grid">
        <div className="process-track" aria-hidden="true"><span data-process-progress /></div>
        {processSteps.map(({ title, description }, index) => (
          <article key={title} data-reveal>
            <span className="process-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3><p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
