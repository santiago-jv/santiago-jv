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
  siteUrl: 'https://www.santiago-jv.tech/',
  title: 'Santiago Olayo | Senior Backend & AI Engineer · Product Owner Engineer',
  description:
    'Software Engineer with 4+ years of experience building and scaling products across backend development (NestJS, Spring Boot, Node.js), cloud infrastructure (AWS), internal MCP & LLM tooling with Cloudflare AI Gateway, Datadog observability, and product analytics.',
  ogImage: '/images/og-image.svg',
};

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Architecture', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_CONTENT: HeroContent = {
  greeting: 'Hi, my name is',
  name: 'Santiago Olayo',
  role: 'Senior Backend & AI Engineer',
  summary:
    'Software Engineer with 4+ years of experience building and scaling products for startups and international companies. I handle execution end to end—partnering with product, operations, support, and finance across distributed backend systems, cloud infrastructure, observability (Datadog), product analytics (CleverTap, Metabase), and contributing to the migration from manual processes to AI-assisted internal tooling (MCP, team plugins/skills, and Cloudflare AI Gateway).',
  highlights: [
    'NestJS · Node.js · Spring Boot',
    'Hexagonal Architecture & DDD',
    'MCP Tooling & Cloudflare AI Gateway',
    'AWS · Redis Locks · PostgreSQL',
    'Datadog · CleverTap · Metabase',
  ],
  primaryCta: {
    label: 'Download CV',
    href: '/Santiago_Olayo_Villamil_CV.pdf',
    download: true,
    iconClassName: 'fa-solid fa-arrow-down-to-bracket',
  },
  secondaryCta: {
    label: 'LinkedIn Profile',
    href: 'https://www.linkedin.com/in/santiago-jv',
    iconClassName: 'fa-brands fa-linkedin-in',
  },
  tertiaryCta: {
    label: 'Contact Me',
    href: '#contact',
    iconClassName: 'fa-regular fa-paper-plane',
  },
  socialLinks: [
    {
      platform: 'linkedin',
      label: 'LinkedIn (@santiago-jv)',
      href: 'https://www.linkedin.com/in/santiago-jv',
      iconClassName: 'fa-brands fa-linkedin-in',
    },
    {
      platform: 'github',
      label: 'GitHub (@santiago-jv)',
      href: 'https://github.com/santiago-jv',
      iconClassName: 'fa-brands fa-github',
    },
    {
      platform: 'x',
      label: 'X (@santiagojv_tech)',
      href: 'https://x.com/santiagojv_tech',
      iconClassName: 'fa-brands fa-x-twitter',
    },
    {
      platform: 'medium',
      label: 'Medium (@santiago-jv)',
      href: 'https://medium.com/@santiago-jv/',
      iconClassName: 'fa-brands fa-medium',
    },
    {
      platform: 'email',
      label: 'Email',
      href: 'mailto:santiagojv.work@gmail.com',
      iconClassName: 'fa-regular fa-envelope',
    },
  ],
};

export const EXPERIENCE_HEADING: SectionHeadingContent = {
  number: '01.',
  title: 'Experience & Product Impact',
  subtitle: 'Where I Have Built & Scaled Systems',
  description:
    'End-to-end ownership across backend architectures, cloud infrastructure, internal AI tooling, production observability, and product analytics.',
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
      'Contributed to migrating manual workflows toward AI-assisted processes—improving and maintaining the team’s internal tools, including MCP (Model Context Protocol) tooling to connect with preferred LLMs, focused plugins and skills for internal team areas, and prompting rules with Cloudflare AI Gateway.',
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
  number: '02.',
  title: 'Architecture & Systems',
  subtitle: 'Core Engineering Areas',
  description:
    'Production backend systems, observability pipelines, and internal AI tooling I have contributed to, improved, and maintained.',
};

export const PROJECTS: Project[] = [
  {
    title: 'Internal MCP Tooling & AI Workflow Migration',
    description:
      'Contributed to migrating manual team operations to AI-assisted workflows—maintaining and improving internal MCP (Model Context Protocol) tooling connected to preferred LLMs, team-focused plugins and skills, and prompting rules via Cloudflare AI Gateway.',
    tech: ['TypeScript', 'MCP', 'Cloudflare AI Gateway', 'LLMs', 'Internal Plugins & Skills'],
    status: 'Production',
    iconClassName: 'fa-solid fa-diagram-project',
  },
  {
    title: 'High-Concurrency Booking & Transactional Backend',
    description:
      'Distributed backend services built with Hexagonal Architecture and DDD, utilizing atomic Redis distributed locks, idempotent webhooks, and database migrations across PostgreSQL and MongoDB to prevent race conditions under peak load.',
    tech: ['NestJS', 'Node.js', 'Hexagonal & DDD', 'Redis Locks', 'PostgreSQL', 'AWS'],
    status: 'Production',
    iconClassName: 'fa-solid fa-server',
  },
  {
    title: 'Full-Stack Observability & Product Analytics Engine',
    description:
      'End-to-end telemetry and product intelligence setup combining Datadog APM, distributed tracing, and custom alerting for incident triage with CleverTap event pipelines and Metabase executive dashboards.',
    tech: ['Datadog APM', 'CleverTap', 'Metabase', 'Distributed Tracing', 'SQL'],
    status: 'Production',
    iconClassName: 'fa-solid fa-chart-line',
  },
  {
    title: 'Autonomous Job & Document Intelligence Suite',
    description:
      'Multi-agent automation pipeline leveraging browser orchestration, bidirectional Google Sheets synchronization, ATS equivalence matching, and headless PDF/DOCX vector compilation.',
    tech: ['Node.js', 'MCP Agents', 'Chrome DevTools Protocol', 'Google Apps Script'],
    status: 'Active System',
    iconClassName: 'fa-solid fa-microchip',
  },
];

export const CONTACT_CONTENT: ContactContent = {
  heading: {
    number: '03.',
    title: 'Contact',
    subtitle: "Let's Build Something Solid",
    description:
      'Whether you want to discuss backend architecture, internal AI workflows, or engineering collaborations, feel free to reach out directly.',
  },
  introTitle: 'Direct Channels',
  formTitle: 'Send a Message',
  quickActionLabel: 'Email Me Directly',
  quickActionHref: 'mailto:santiagojv.work@gmail.com?subject=Hello%20Santiago!',
  infoItems: [
    {
      iconClassName: 'fa-regular fa-envelope',
      label: 'Email',
      value: 'santiagojv.work@gmail.com',
      href: 'mailto:santiagojv.work@gmail.com',
    },
    {
      iconClassName: 'fa-brands fa-linkedin-in',
      label: 'LinkedIn',
      value: '/in/santiago-jv',
      href: 'https://www.linkedin.com/in/santiago-jv',
    },
    {
      iconClassName: 'fa-brands fa-x-twitter',
      label: 'X (Twitter)',
      value: '@santiagojv_tech',
      href: 'https://x.com/santiagojv_tech',
    },
    {
      iconClassName: 'fa-brands fa-github',
      label: 'GitHub',
      value: '/santiago-jv',
      href: 'https://github.com/santiago-jv',
    },
    {
      iconClassName: 'fa-regular fa-file-pdf',
      label: 'Resume / CV',
      value: 'Download Master CV (PDF)',
      href: '/Santiago_Olayo_Villamil_CV.pdf',
    },
  ],
};

export const FOOTER_CONTENT: FooterContent = {
  brand: {
    name: '<santiago-jv/>',
    description:
      'Senior Software Engineer focused on backend architecture, MCP & LLM internal tooling, observability, and end-to-end product execution.',
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
  location: 'Barranquilla / Santa Marta, Colombia (Remote)',
  sourceUrl: 'https://github.com/santiago-jv/santiago-jv',
  version: 'v4.1.0',
};
