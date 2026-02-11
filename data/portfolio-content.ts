import {
  ContactContent,
  FooterContent,
  HeroContent,
  NavigationLink,
  Project,
  SectionHeadingContent,
} from '@/types/portfolio';

export const SEO = {
  siteUrl: 'https://santiago-jv.vercel.app/',
  title: 'Santiago Olayo - Backend Engineer',
  description:
    'Santiago Olayo - Backend Engineer specializing in scalable APIs, cloud architectures, AI integrations, MCP tooling, and n8n automations.',
  ogImage: '/images/og-image.svg',
};

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'About me', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact me', href: '#contact' },
];

export const HERO_CONTENT: HeroContent = {
  greeting: 'Hi, my name is',
  name: 'Santiago Olayo',
  role: 'Backend Engineer | AI & Automation',
  summary:
    'I build robust backend systems and AI-powered workflows using NestJS, Spring Boot, cloud platforms, MCP-based tool connectivity, and n8n automations.',
  primaryCta: {
    label: 'Check my LinkedIn',
    href: 'https://linkedin.com/in/santiago-jv',
  },
  secondaryCta: {
    label: 'Write me an email',
    href: 'mailto:santiagojv.work@gmail.com',
  },
  socialLinks: [
    {
      platform: 'github',
      label: 'GitHub',
      href: 'https://github.com/santiago-jv/santiago-jv',
      iconClassName: 'fab fa-github',
    },
    {
      platform: 'twitter',
      label: 'Twitter',
      href: 'https://twitter.com/santiago_jv4035',
      iconClassName: 'fab fa-twitter',
    },
    {
      platform: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/santiago_ojv',
      iconClassName: 'fab fa-instagram',
    },
    {
      platform: 'email',
      label: 'Email',
      href: 'mailto:santiagojv.work@gmail.com',
      iconClassName: 'fas fa-envelope',
    },
  ],
};

export const PROJECTS_HEADING: SectionHeadingContent = {
  number: '02.',
  title: "Some Things I've Built",
  description:
    'The projects below are examples that showcase the type of backend systems, AI workflows, and automation platforms I build. Real projects from my professional experience will be added soon.',
};

export const PROJECTS: Project[] = [
  {
    title: 'AI Operations Assistant',
    description:
      'Operational assistant integrating LLM-based flows with MCP tools and n8n orchestrations for incident triage, team notifications, and repetitive task automation.',
    tech: ['TypeScript', 'MCP', 'n8n', 'OpenAI API'],
    status: 'In Development',
  },
  {
    title: 'E-commerce API',
    description:
      'Scalable REST API with microservices architecture, payment integration, and real-time inventory management.',
    tech: ['NestJS', 'PostgreSQL', 'Redis', 'AWS'],
    status: 'In Development',
  },
  {
    title: 'Monitoring Dashboard',
    description:
      'Real-time system monitoring and alerting platform with custom metrics and performance analytics.',
    tech: ['Spring Boot', 'MongoDB', 'AWS CloudWatch'],
    status: 'Planning',
  },
  {
    title: 'Task Management System',
    description:
      'Backend system for project management with role-based access control and notification services.',
    tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis'],
    status: 'Coming Soon',
  },
];

export const CONTACT_CONTENT: ContactContent = {
  heading: {
    number: '03.',
    title: "What's Next?",
    subtitle: 'Get In Touch',
    description:
      "I'm always interested in new opportunities and interesting projects. Whether you have a question or just want to say hi, feel free to reach out!",
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
      href: 'https://linkedin.com/in/santiago-jv',
    },
    {
      iconClassName: 'fab fa-github',
      label: 'GitHub',
      value: '/santiago-jv',
      href: 'https://github.com/santiago-jv/santiago-jv',
    },
    {
      iconClassName: 'fas fa-map-marker-alt',
      label: 'Location',
      value: 'Santa Marta, Colombia',
      href: 'https://maps.google.com/?q=Santa+Marta,+Colombia',
    },
  ],
};

export const FOOTER_CONTENT: FooterContent = {
  brand: {
    name: '<santiago-jv/>',
    description:
      'Backend engineer focused on scalable architectures, practical AI integrations, and business automation systems.',
    availabilityText: 'Available for new opportunities',
  },
  quickLinks: NAVIGATION_LINKS,
  skills: [
    'NestJS',
    'Spring Boot',
    'TypeScript',
    'AWS',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'MCP',
    'n8n',
    'OpenAI API',
  ],
  socialLinks: HERO_CONTENT.socialLinks,
  email: 'santiagojv.work@gmail.com',
  location: 'Santa Marta, Colombia',
  sourceUrl: 'https://github.com/santiago-jv/santiago-jv',
  version: 'v3.0.0',
};
