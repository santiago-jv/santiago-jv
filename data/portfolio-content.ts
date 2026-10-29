import {
  ContactContent,
  ExperienceItem,
  FooterContent,
  HeroContent,
  NavigationLink,
  Project,
  SectionHeadingContent,
} from '@/types/portfolio';

export const SEO = {
  siteUrl: 'https://santiago-jv.tech/',
  title: 'Santiago Olayo | Senior Backend & AI Engineer · Product Owner Engineer',
  description:
    'Software Engineer with 4+ years of experience building and scaling products across backend development (NestJS, Spring Boot, Node.js), cloud infrastructure (AWS), internal MCP & LLM tooling with Cloudflare AI Gateway, Datadog observability, and product analytics.',
  ogImage: '/images/og-image.svg',
};

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Architecture & Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_CONTENT: HeroContent = {
  greeting: 'Hi, my name is',
  name: 'Santiago Olayo',
  role: 'Senior Backend & AI Engineer',
  summary:
    'Software Engineer with 4+ years of experience building and scaling products for startups and international companies. I handle execution end to end—working closely with product, operations, support, and finance across backend architectures (NestJS, Node.js, Spring Boot), cloud infrastructure (AWS, Cloud Functions), internal MCP & LLM tooling governed by Cloudflare AI Gateway, Datadog observability, and product analytics (CleverTap, Metabase).',
  primaryCta: {
    label: 'Download CV (PDF)',
    href: '/Santiago_Olayo_Villamil_CV.pdf',
    download: true,
    iconClassName: 'fas fa-file-download',
  },
  secondaryCta: {
    label: 'Check my LinkedIn',
    href: 'https://www.linkedin.com/in/santiago-jv',
    iconClassName: 'fab fa-linkedin',
  },
  tertiaryCta: {
    label: 'Write me an email',
    href: 'mailto:santiagojv.work@gmail.com',
    iconClassName: 'fas fa-envelope',
  },
  socialLinks: [
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/santiago-jv',
      iconClassName: 'fab fa-linkedin-in',
    },
    {
      platform: 'github',
      label: 'GitHub',
      href: 'https://github.com/santiago-jv',
      iconClassName: 'fab fa-github',
    },
    {
      platform: 'medium',
      label: 'Medium',
      href: 'https://medium.com/@santiago-jv/',
      iconClassName: 'fab fa-medium-m',
    },
    {
      platform: 'email',
      label: 'Email',
      href: 'mailto:santiagojv.work@gmail.com',
      iconClassName: 'fas fa-envelope',
    },
  ],
};

export const EXPERIENCE_HEADING: SectionHeadingContent = {
  number: '02.',
  title: 'Experience & Product Impact',
  description:
    'End-to-end engineering across backend services, cloud infrastructure, internal AI tooling, observability, and product analytics.',
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Product Owner Engineer / Senior Backend Engineer',
    company: 'GoodRec',
    period: 'Jan 2025 – Present',
    location: 'Remote',
    highlights: [
      'Partner closely with product, operations, support, and finance to turn business needs into production-ready features—owning the lifecycle end to end from stakeholder discussions and technical design to database migrations, deployment, and post-release monitoring.',
      'Architect and scale backend services using Node.js, NestJS, and TypeScript under Hexagonal Architecture and Domain-Driven Design (DDD), managing high-concurrency synchronization with atomic Redis locks and serverless cloud deployments (AWS / Cloud Functions).',
      'Optimize internal workflows and reduce manual operations with AI: implement MCP (Model Context Protocol) servers as internal tooling to connect with preferred LLMs, build dedicated plugins and skills tailored to each internal team area, and enforce prompting rules and routing via Cloudflare AI Gateway.',
      'Ensure production reliability using Datadog for service monitoring, proactive alerting, APM, and incident investigation, while driving product decisions through CleverTap event tracking and Metabase analytics.',
    ],
    tech: [
      'NestJS',
      'TypeScript',
      'Hexagonal Architecture & DDD',
      'MCP Tooling',
      'Cloudflare AI Gateway',
      'Redis Locks',
      'AWS',
      'Datadog',
      'CleverTap',
      'Metabase',
    ],
  },
  {
    role: 'Backend Developer',
    company: 'Bolsiyo',
    period: 'Aug 2022 – Jan 2025',
    location: 'Remote (Colombia)',
    highlights: [
      'Developed high-transactional backend microservices using Node.js, TypeScript, and LoopBack 4 for a mobile fintech/retail platform serving independent merchants.',
      'Designed relational and NoSQL database schemas and migrations (PostgreSQL, MongoDB), optimizing critical wallet and payment queries.',
      'Built secure REST APIs, third-party payment gateway integrations, and automated test suites within an agile Scrum environment.',
    ],
    tech: ['Node.js', 'TypeScript', 'LoopBack 4', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Scrum'],
  },
  {
    role: 'Full Stack & Software Developer',
    company: 'Cooltivalo · +COTAS · SLS GROUPS',
    period: 'Jan 2021 – May 2023',
    location: 'Santa Marta / Barranquilla / Remote',
    highlights: [
      'Built end-to-end web platforms and backend APIs using JavaScript, TypeScript, Node.js, GraphQL, MySQL, and MongoDB.',
      'Modeled relational data schemas, integrated responsive front-end interfaces, and managed initial cloud deployments.',
    ],
    tech: ['Node.js', 'TypeScript', 'GraphQL', 'MySQL', 'MongoDB', 'JavaScript'],
  },
];

export const PROJECTS_HEADING: SectionHeadingContent = {
  number: '03.',
  title: "Systems & Architectures I've Built",
  description:
    'Key architectural patterns, AI internal tooling, and production backend systems from my hands-on engineering work.',
};

export const PROJECTS: Project[] = [
  {
    title: 'Internal MCP Tooling & Multi-Team AI Gateway',
    description:
      'Standardized internal AI ecosystem connecting business services with preferred LLMs via custom MCP (Model Context Protocol) servers, modular plugins and skills tailored per internal team area, and centralized prompting rules and observability through Cloudflare AI Gateway.',
    tech: ['TypeScript', 'MCP', 'Cloudflare AI Gateway', 'LLMs', 'Internal Plugins & Skills'],
    status: 'Production',
    iconClassName: 'fas fa-network-wired',
  },
  {
    title: 'High-Concurrency Booking & Transactional Backend',
    description:
      'Distributed backend services built with Hexagonal Architecture and DDD, utilizing atomic Redis distributed locks, idempotent webhooks, and database migrations across PostgreSQL and MongoDB to prevent race conditions under peak load.',
    tech: ['NestJS', 'Node.js', 'Hexagonal & DDD', 'Redis Locks', 'PostgreSQL', 'AWS'],
    status: 'Production',
    iconClassName: 'fas fa-server',
  },
  {
    title: 'Full-Stack Observability & Product Analytics Engine',
    description:
      'End-to-end telemetry and product intelligence setup combining Datadog APM, distributed tracing, and custom alerting for incident triage with CleverTap event pipelines and Metabase executive dashboards.',
    tech: ['Datadog APM', 'CleverTap', 'Metabase', 'Distributed Tracing', 'SQL'],
    status: 'Production',
    iconClassName: 'fas fa-chart-line',
  },
  {
    title: 'Autonomous Job & Document Intelligence Suite',
    description:
      'Multi-agent automation pipeline leveraging browser orchestration, bidirectional Google Sheets synchronization, ATS equivalence matching, and headless PDF/DOCX vector compilation.',
    tech: ['Node.js', 'MCP Agents', 'Chrome DevTools Protocol', 'Google Apps Script'],
    status: 'Active System',
    iconClassName: 'fas fa-robot',
  },
];

export const CONTACT_CONTENT: ContactContent = {
  heading: {
    number: '04.',
    title: "What's Next?",
    subtitle: 'Get In Touch',
    description:
      "I'm open to Senior Backend Engineer, Tech Lead, and Product Owner Engineer opportunities across LatAm and remote teams. Feel free to reach out!",
  },
  introTitle: "Let's Connect",
  formTitle: 'Send a Message',
  quickActionLabel: 'Email Me Directly',
  quickActionHref: 'mailto:santiagojv.work@gmail.com?subject=Hello%20Santiago!',
  infoItems: [
    {
      iconClassName: 'fas fa-envelope',
      label: 'Email',
      value: 'santiagojv.work@gmail.com',
      href: 'mailto:santiagojv.work@gmail.com',
    },
    {
      iconClassName: 'fab fa-linkedin',
      label: 'LinkedIn',
      value: '/in/santiago-jv',
      href: 'https://www.linkedin.com/in/santiago-jv',
    },
    {
      iconClassName: 'fab fa-github',
      label: 'GitHub',
      value: '/santiago-jv',
      href: 'https://github.com/santiago-jv',
    },
    {
      iconClassName: 'fas fa-file-pdf',
      label: 'Resume / CV',
      value: 'Download PDF',
      href: '/Santiago_Olayo_Villamil_CV.pdf',
    },
    {
      iconClassName: 'fas fa-map-marker-alt',
      label: 'Location',
      value: 'Barranquilla / Santa Marta, Colombia (Remote)',
      href: 'https://maps.google.com/?q=Barranquilla,+Colombia',
    },
  ],
};

export const FOOTER_CONTENT: FooterContent = {
  brand: {
    name: '<santiago-jv/>',
    description:
      'Senior Software Engineer focused on backend architecture, MCP & LLM internal tooling, observability, and end-to-end product execution.',
    availabilityText: 'Open to Senior / Tech Lead opportunities',
  },
  quickLinks: NAVIGATION_LINKS,
  skills: [
    'NestJS',
    'Node.js',
    'TypeScript',
    'Spring Boot',
    'Hexagonal & DDD',
    'MCP',
    'Cloudflare AI Gateway',
    'AWS & Cloud Functions',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Datadog',
    'CleverTap',
    'Metabase',
  ],
  socialLinks: HERO_CONTENT.socialLinks,
  email: 'santiagojv.work@gmail.com',
  location: 'Colombia (Remote)',
  sourceUrl: 'https://github.com/santiago-jv/santiago-jv',
  version: 'v4.0.0',
};
