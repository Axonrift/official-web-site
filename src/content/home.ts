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
      "Fast, polished websites and online stores that make it easy for customers to find you, get in touch, and buy.",
    topic: "Website or online store",
    inquiryLabel: "Websites",
    action: "Discuss a website or online store",
    icon: "window",
  },
  {
    id: "mobile",
    title: "Mobile apps",
    description:
      "iOS and Android apps that make it easier for customers to book, shop, or use your service on the go.",
    topic: "Mobile app",
    inquiryLabel: "Mobile apps",
    action: "Discuss a mobile app",
    icon: "mobile",
  },
  {
    id: "custom-saas",
    title: "Custom SaaS",
    description:
      "Subscription software designed around how your customers sign up, use the product, and pay.",
    topic: "Custom SaaS development",
    inquiryLabel: "SaaS platforms",
    action: "Discuss custom SaaS development",
    icon: "layers",
  },
  {
    id: "mvp",
    title: "MVPs",
    description:
      "A working first version you can test with real users, demo to investors, and improve with feedback.",
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
  ...services.map(({ id, topic, inquiryLabel, icon }) => ({ id, topic, label: inquiryLabel, icon })),
  { id: "ai-automation", topic: "AI automation", label: "AI automation", icon: "sparkles" as const },
  { id: "other", topic: "Something else", label: "Something else", icon: "message" as const },
];

export const pointOfView = {
  title: "Good software makes the complex feel simple.",
  description:
    "Not another layer of technology. A better way to work. We bring product thinking and engineering together to build the right thing, then build it right.",
};

export const projects = [
  {
    id: "website-preview",
    title: "A clearer digital presence.",
    category: "Website & commerce",
    description: "A sample website direction, ready for a real project story.",
    visual: "website",
    topic: "website",
    placeholder: true,
  },
  {
    id: "mobile-preview",
    title: "Small screen. Thoughtful details.",
    category: "Mobile experience",
    description: "An illustrative app concept, awaiting a client case study.",
    visual: "mobile",
    topic: "mobile",
    placeholder: true,
  },
  {
    id: "mvp-preview",
    title: "An idea, taking shape.",
    category: "MVP & product design",
    description: "A sample first-release concept, awaiting a real project.",
    visual: "mvp",
    topic: "mvp",
    placeholder: true,
  },
] as const;

export type Project = (typeof projects)[number];

export const testimonials = [
  {
    id: "perspective-01",
    quote: "An approved client quote will live here.",
    name: "Client name",
    role: "Role, company",
    placeholder: true,
  },
  {
    id: "perspective-02",
    quote: "Space for a client’s experience of the build.",
    name: "Client name",
    role: "Role, company",
    placeholder: true,
  },
  {
    id: "perspective-03",
    quote: "The result, in the client’s own words.",
    name: "Client name",
    role: "Role, company",
    placeholder: true,
  },
] as const;

export const faqs = [
  {
    id: "what-we-build",
    question: "What can you help us build?",
    answer:
      "We design and develop websites and online stores, mobile apps, custom SaaS platforms, and MVPs. We start with the problem you want to solve, then work out what makes sense to build.",
  },
  {
    id: "starting-point",
    question: "Do we need a finished brief?",
    answer:
      "A clear brief is welcome, but a problem you’re still figuring out is a good starting point too. Tell us what’s happening today and what you’d like to be able to do.",
  },
  {
    id: "first-version",
    question: "Can we start with a smaller first version?",
    answer:
      "Yes. An MVP gives you a working first version to try with real users, share with investors, and improve with feedback. We agree on what that first release needs to do before building it.",
  },
  {
    id: "working-together",
    question: "How will we stay involved during the build?",
    answer:
      "We share working versions as we go and use your feedback to refine the product. You stay involved as the idea moves from understanding the problem to testing the software.",
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
