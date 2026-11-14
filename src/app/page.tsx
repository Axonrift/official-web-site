import { Contact } from "@/components/home/contact";
import { Hero } from "@/components/home/hero";
import { Faq } from "@/components/home/faq";
import { PointOfView } from "@/components/home/point-of-view";
import { Process } from "@/components/home/process";
import { RecentProjects } from "@/components/home/recent-projects";
import { Testimonials } from "@/components/home/testimonials";
import { Services } from "@/components/home/services";
import { PageMotion } from "@/components/page-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <PageMotion>
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <PointOfView />
        <RecentProjects />
        <Services />
        <Testimonials />
        <Process />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </PageMotion>
  );
}
