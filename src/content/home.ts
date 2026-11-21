export const navigation = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#process", label: "How we work" },
] as const;

export const hero = {
  eyebrow: "A software studio. A different perspective.",
  title: ["The right software", "starts with", "your problem."] as const,
  description:
    "Tell us what’s slowing you down or what you want to launch. We’ll help you figure out what to build, then design and develop it with you.",
};

export const services = [
  {
    id: "website",
    title: "Websites & stores",
    description:
      "Website design and ecommerce development that help customers find you, get in touch, and buy online.",
    topic: "Website or online store",
    inquiryLabel: "Websites",
    action: "Discuss a website or online store",
    icon: "window",
  },
  {
    id: "mobile",
    title: "Mobile apps",
    description:
      "Custom iOS and Android apps that let customers book appointments, shop, or use your service on the go.",
    topic: "Mobile app",
    inquiryLabel: "Mobile apps",
    action: "Discuss a mobile app",
    icon: "mobile",
  },
  {
    id: "custom-saas",
    title: "Custom SaaS",
    description:
      "Custom SaaS development for customer sign-up, product workflows, and billing.",
    topic: "Custom SaaS development",
    inquiryLabel: "SaaS platforms",
    action: "Discuss custom SaaS development",
    icon: "layers",
  },
  {
    id: "mvp",
    title: "MVPs",
    description:
      "MVP development for startups to test ideas with users and demo to investors.",
    topic: "MVP",
    inquiryLabel: "MVPs",
    action: "Discuss an MVP",
    icon: "box",
  },
] as const;

export const product = {
  id: "axonrift-saas",
  title: "Built by Axonrift.",
  description:
    "Alongside client projects, we build and run our own SaaS product.",
  topic: "Axonrift’s SaaS product",
};

export const contactEmail = "contact@axonrift.com";

export const inquiryTopics = [
  ...services.map(({ id, topic, inquiryLabel, icon }) => ({
    id,
    topic,
    label: inquiryLabel,
    icon,
  })),
  // { id: "ai-automation", topic: "AI automation", label: "AI automation", icon: "sparkles" as const },
  {
    id: "other",
    topic: "Something else",
    label: "Something else",
    icon: "message" as const,
  },
];

export const pointOfView = {
  title: "Good software makes the complex feel simple.",
  description:
    "Not another layer of technology. A better way to work. We bring product thinking and engineering together to build the right thing, then build it right.",
};

export type ProjectVisual = "website" | "mobile" | "mvp";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  visual: ProjectVisual;
  topic: string;
  image?: string;
  href?: string;
  placeholder?: boolean;
}

export const projects: readonly Project[] = [
  {
    id: "website-preview",
    title: "A clearer digital presence.",
    category: "Sefia Books",
    description: "A sample website direction, ready for a real project story.",
    visual: "website",
    topic: "website",
    image: "/images/mockup-sefia.webp",
    href: "https://sefiabooks.lk/",
    placeholder: false,
  },
  {
    id: "mobile-preview",
    title: "Small screen. Thoughtful details.",
    category: "Hidden Chapter Sefia Books",
    description: "An illustrative app concept, awaiting a client case study.",
    visual: "mobile",
    topic: "mobile",
    image: "/images/mockup-ipad.webp",
    href: "https://hiddensecrets.sefiabooks.lk/",
    placeholder: false,
  },
  {
    id: "mvp-preview",
    title: "An idea, taking shape.",
    category: "MVP & product design",
    description: "A sample first-release concept, awaiting a real project.",
    visual: "mvp",
    topic: "mvp",
    href: "",
    placeholder: true,
  },
] as const;

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  leadQuote: string;
  bodyQuote: string;
  projectTitle: string;
  projectHref: string;
  metrics: readonly string[];
}

export const singleTestimonial: TestimonialItem = {
  id: "nadiv-dulnith-sefia",
  name: "Nadiv Dulnith",
  role: "Author and Owner",
  company: "Sefia Books",
  avatar: "/images/nadiv-dulnith.webp",
  leadQuote:
    "Working with Axonrift has been a wonderful experience. From the beginning, the team was attentive to my ideas, communicated clearly, and provided excellent service throughout the development of my website.",
  bodyQuote:
    "I’m 100% satisfied with the experience and truly appreciate their commitment and support. I would happily recommend them to anyone looking for a dependable and skilled web partner.",
  projectTitle: "sefiabooks.lk",
  projectHref: "https://sefiabooks.lk/",
  metrics: ["100% Satisfaction", "Web Design & Development", "Sefia Books"],
};

export const testimonials = [
  {
    id: singleTestimonial.id,
    quote: `${singleTestimonial.leadQuote} ${singleTestimonial.bodyQuote}`,
    name: singleTestimonial.name,
    role: `${singleTestimonial.role}, ${singleTestimonial.company}`,
    placeholder: false,
  },
] as const;

export const faqs = [
  {
    id: "what-we-build",
    question: "What can you help us build?",
    answer:
      "We design and develop websites and online stores, iOS and Android apps, custom SaaS platforms, and MVPs. Our website work includes Sefia Books.",
  },
  {
    id: "starting-point",
    question: "Do we need a finished brief?",
    answer:
      "You can start with a problem or a rough idea. Tell us what’s getting in the way and what you’d like to do, and we’ll work with you to define what to build.",
  },
  {
    id: "first-version",
    question: "Can we start with a smaller first version?",
    answer:
      "Yes. A minimum viable product (MVP) is a working first release for testing an idea with real users. We agree on the core features first so you can learn what to improve before expanding.",
  },
  {
    id: "working-together",
    question: "How will we stay involved during the build?",
    answer:
      "We share working versions you can review from wherever you’re based. Your feedback guides what we refine as we move from agreeing on the scope to testing the software.",
  },
] as const;

export const processSteps = [
  {
    title: "Understand the problem",
    description:
      "We learn what’s getting in the way, who’s affected, and what would make their day easier.",
  },
  {
    title: "Agree on what to build",
    description:
      "We decide what the first release should do and how we’ll know it’s solving the problem.",
  },
  {
    title: "Build and test",
    description:
      "We share working versions as we go and use feedback to refine the product before launch.",
  },
];
