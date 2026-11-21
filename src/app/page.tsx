import type { Metadata } from "next";
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
import { contactEmail } from "@/content/home";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

const organizationId = `${site.url}#organization`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      url: site.url,
      logo: new URL(site.logo, site.url).href,
      email: contactEmail,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}#website`,
      name: site.name,
      url: site.url,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
  ],
};

export default function HomePage() {
  return (
    <PageMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip" href="#main">
        Skip to content
      </a>
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
