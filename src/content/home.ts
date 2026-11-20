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
    description: "Fast, polished websites and online stores that make it easy for customers to find you, get in touch, and buy.",
    topic: "Website or online store",
    action: "Discuss a website or online store",
    icon: "window",
  },
  {
    id: "mobile",
    title: "Mobile apps",
    description: "iOS and Android apps that make it easier for customers to book, shop, or use your service on the go.",
    topic: "Mobile app",
    action: "Discuss a mobile app",
    icon: "mobile",
  },
  {
    id: "custom-saas",
    title: "Custom SaaS",
    description: "Subscription software designed around how your customers sign up, use the product, and pay.",
    topic: "Custom SaaS development",
    action: "Discuss custom SaaS development",
    icon: "layers",
  },
  {
    id: "mvp",
    title: "MVPs",
    description: "A working first version you can test with real users, demo to investors, and improve with feedback.",
    topic: "MVP",
    action: "Discuss an MVP",
    icon: "box",
  },
] as const;

export const product = {
  id: "axonrift-saas",
  title: "Built by Axonrift.",
  description: "Alongside client projects, we build and run our own SaaS product.",
  topic: "Axonrift’s SaaS product",
};

export const inquiryTopics = [
  ...services,
  { id: "other", topic: "Something else" },
];

export const pointOfView = {
  title: "Good software makes the complex feel simple.",
  description: "Not another layer of technology. A better way to work. We bring product thinking and engineering together to build the right thing, then build it right.",
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
    answer: "We design and develop websites and online stores, mobile apps, custom SaaS platforms, and MVPs. We start with the problem you want to solve, then work out what makes sense to build.",
  },
  {
    id: "starting-point",
    question: "Do we need a finished brief?",
    answer: "A clear brief is welcome, but a problem you’re still figuring out is a good starting point too. Tell us what’s happening today and what you’d like to be able to do.",
  },
  {
    id: "first-version",
    question: "Can we start with a smaller first version?",
    answer: "Yes. An MVP gives you a working first version to try with real users, share with investors, and improve with feedback. We agree on what that first release needs to do before building it.",
  },
  {
    id: "working-together",
    question: "How will we stay involved during the build?",
    answer: "We share working versions as we go and use your feedback to refine the product. You stay involved as the idea moves from understanding the problem to testing the software.",
  },
] as const;

export const processSteps = [
  {
    title: "Understand the problem",
    description: "We learn what’s getting in the way, who’s affected, and what would make their day easier.",
  },
  {
    title: "Agree on what to build",
    description: "We decide what the first release should do and how we’ll know it’s solving the problem.",
  },
  {
    title: "Build and test",
    description: "We share working versions as we go and use feedback to refine the product before launch.",
  },
];
