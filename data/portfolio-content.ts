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
  title: 'Santiago Olayo | Software Engineer',
  description:
    'Software Engineer with 4+ years of experience building and improving products across backend development, cloud infrastructure, product analytics, and internal tools.',
  ogImage: '/images/og-image.svg',
};

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_CONTENT: HeroContent = {
  greeting: 'Hi, my name is',
  name: 'Santiago Olayo',
  role: 'Software Engineer',
  summary:
    'I have 4+ years of experience building and improving products for startups and international companies. I work across backend development, cloud infrastructure, product analytics, and internal tools, with a focus on solving real business problems and making systems and processes work better.',
  highlights: [
    'Node.js & NestJS',
    'Spring Boot & Java',
    'AWS & Cloud Functions',
    'PostgreSQL · MongoDB · Redis',
    'MCP & Cloudflare AI Gateway',
    'Datadog · CleverTap · Metabase',
  ],
  primaryCta: {
    label: 'Download CV',
    href: '/Santiago_Olayo_Villamil_CV.pdf',
    download: true,
    iconClassName: 'fa-solid fa-arrow-down-to-bracket',
  },
  secondaryCta: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/santiago-jv',
    iconClassName: 'fa-brands fa-linkedin-in',
  },
  tertiaryCta: {
    label: 'Get in touch',
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
  title: 'Experience',
  subtitle: "Where I've Worked",
  description:
    'I work closely with product, operations, support, and finance to understand their needs and take features from idea to production.',
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Product Owner Engineer / Backend Engineer',
    company: 'GoodRec',
    period: 'Jan 2025 – Present',
    location: 'Remote',
    highlights: [
      'Handle feature development end to end, from discussions with stakeholders and technical design to implementation, deployment, and post-release monitoring.',
      'Build and maintain backend services (Node.js, NestJS, TypeScript) using Hexagonal Architecture and DDD, along with mobile features, internal tools, database migrations, and Redis locks.',
      'Contributed to moving manual workflows toward AI-assisted processes and improving internal team tools, including MCP tooling to connect with our preferred LLMs, focused plugins and skills for each team area, and prompting rules with Cloudflare AI Gateway.',
      'Use Datadog to monitor services, configure alerts, and investigate production issues, CleverTap to track product events and business metrics, and Metabase to analyze data and support product decisions.',
    ],
    tech: [
      'NestJS',
      'Node.js',
      'TypeScript',
      'Hexagonal / DDD',
      'AWS',
      'Redis',
      'MCP',
      'Cloudflare AI Gateway',
      'Datadog',
      'CleverTap',
      'Metabase',
    ],
  },
  {
    role: 'Backend Developer',
    company: 'Bolsiyo',
    period: 'Aug 2022 – Jan 2025',
    location: 'Remote',
    highlights: [
      'Built and maintained backend services with Node.js, TypeScript, and LoopBack 4 for a mobile app used by independent merchants.',
      'Designed schemas and ran migrations in PostgreSQL and MongoDB, optimizing wallet and payment queries.',
      'Developed REST APIs, payment gateway integrations, and automated tests within a Scrum team.',
    ],
    tech: ['Node.js', 'TypeScript', 'LoopBack 4', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Cooltivalo · +COTAS · SLS GROUPS',
    period: 'Jan 2021 – May 2023',
    location: 'Colombia',
    highlights: [
      'Developed web applications and backend APIs using JavaScript, TypeScript, Node.js, GraphQL, MySQL, and MongoDB.',
      'Handled relational data modeling, front-end integrations, and cloud deployments.',
    ],
    tech: ['Node.js', 'TypeScript', 'GraphQL', 'MySQL', 'MongoDB', 'JavaScript'],
  },
];

export const PROJECTS_HEADING: SectionHeadingContent = {
  number: '02.',
  title: 'What I Work On',
  subtitle: 'Systems & Day-to-Day Engineering',
  description:
    'A closer look at the backend systems, internal tooling, and product infrastructure I build and maintain.',
};

export const PROJECTS: Project[] = [
  {
    title: 'Backend Services & Database Migrations',
    description:
      'Designing and scaling backend APIs with NestJS, Node.js, and Spring Boot. Handling high-concurrency flows with Redis locks and running safe schema migrations in PostgreSQL and MongoDB.',
    tech: ['NestJS', 'Node.js', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis'],
    status: 'Core Focus',
    iconClassName: 'fa-solid fa-server',
  },
  {
    title: 'Internal AI Tooling & Workflow Optimization',
    description:
      'Helping the team replace manual tasks with AI-assisted workflows. Improving internal MCP tooling to connect with our preferred LLMs, building team-focused plugins and skills, and managing prompting rules through Cloudflare AI Gateway.',
    tech: ['TypeScript', 'MCP', 'Cloudflare AI Gateway', 'LLMs', 'Internal Tooling'],
    status: 'Internal Tools',
    iconClassName: 'fa-solid fa-diagram-project',
  },
  {
    title: 'Production Monitoring & Product Analytics',
    description:
      'Keeping services healthy in production with Datadog alerts, logs, and tracing. Tracking product events in CleverTap and building queries in Metabase so product, ops, and finance can make decisions with real data.',
    tech: ['Datadog', 'CleverTap', 'Metabase', 'AWS', 'SQL'],
    status: 'Observability & Data',
    iconClassName: 'fa-solid fa-chart-line',
  },
  {
    title: 'End-to-End Product Delivery',
    description:
      'Working directly with product, operations, support, and finance to scope problems, design practical technical solutions, ship across backend and mobile, and iterate after release.',
    tech: ['Product Ownership', 'Technical Design', 'Hexagonal / DDD', 'CI/CD'],
    status: 'Execution',
    iconClassName: 'fa-solid fa-layer-group',
  },
];

export const CONTACT_CONTENT: ContactContent = {
  heading: {
    number: '03.',
    title: 'Contact',
    subtitle: 'Get In Touch',
    description:
      'If you want to chat about backend engineering, internal tools, or a project, feel free to send me a message.',
  },
  introTitle: 'Links & Contact',
  formTitle: 'Send a Message',
  quickActionLabel: 'Send me an email',
  quickActionHref: 'mailto:santiagojv.work@gmail.com?subject=Hey%20Santiago!',
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
      label: 'X',
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
      label: 'CV',
      value: 'Download PDF',
      href: '/Santiago_Olayo_Villamil_CV.pdf',
    },
  ],
};

export const FOOTER_CONTENT: FooterContent = {
  brand: {
    name: '<santiago-jv/>',
    description:
      'Software Engineer working across backend development, cloud infrastructure, product analytics, and internal tools.',
  },
  quickLinks: NAVIGATION_LINKS,
  skills: [
    'NestJS',
    'Node.js',
    'TypeScript',
    'Spring Boot',
    'AWS',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'MCP',
    'Cloudflare AI Gateway',
    'Datadog',
    'CleverTap',
    'Metabase',
  ],
  socialLinks: HERO_CONTENT.socialLinks,
  email: 'santiagojv.work@gmail.com',
  location: 'Colombia',
  sourceUrl: 'https://github.com/santiago-jv/santiago-jv',
  version: 'v4.2.0',
};
