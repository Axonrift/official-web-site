import { ProjectCard } from "@/components/home/project-card";
import { projects } from "@/content/home";

export function RecentProjects() {
  return (
    <section className="section wrap" id="work" aria-labelledby="work-title">
      <div className="section-heading" data-reveal>
        <div>
          <h2 id="work-title">
            Recent projects.
            <br />
            <span className="text-muted">A glimpse of what’s possible.</span>
          </h2>
        </div>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
