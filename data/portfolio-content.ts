import {
  Locale,
  PortfolioLocaleContent,
  SocialLink,
} from '@/types/portfolio';

export const SHARED_SOCIAL_LINKS: SocialLink[] = [
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
    platform: 'email',
    label: 'Email (contact@santiago-jv.tech)',
    href: 'mailto:contact@santiago-jv.tech',
    iconClassName: 'fa-regular fa-envelope',
  },
];

const FOOTER_SKILLS = [
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
];

export const PORTFOLIO_CONTENT: Record<Locale, PortfolioLocaleContent> = {
  en: {
    seo: {
      siteUrl: 'https://www.santiago-jv.tech/',
      title: 'Santiago Olayo | Software Engineer',
      description:
        'Software Engineer with 4+ years of experience building and improving products across backend development, cloud infrastructure, product analytics, and internal tools.',
      ogImage: '/images/og-image.svg',
      ogLocale: 'en_US',
    },
    header: {
      brandAriaLabel: 'Go to About section',
      drawerTitle: 'Navigation',
      openMenuAriaLabel: 'Open navigation menu',
      closeMenuAriaLabel: 'Close navigation menu',
      navLinks: [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Work', href: '#projects' },
        { label: 'Contact', href: '#contact' },
      ],
      resumeLabel: 'Resume',
      resumeHref: '/Santiago_Olayo_Villamil_CV_EN.pdf',
      resumeDownloadName: 'Santiago_Olayo_Villamil_CV_EN.pdf',
    },
    hero: {
      greeting: 'Hi, my name is',
      name: 'Santiago Olayo',
      role: 'Software Engineer',
      summary:
        'Backend systems, cloud infrastructure, and AI workflows. 4+ years shipping products for global teams.',
      coreStackAriaLabel: 'Core focus areas',
      socialLinksAriaLabel: 'Social links',
      highlights: [
        'Applied AI & MCP',
        'Business Impact',
        'Product Metrics',
        'Observability',
        'Workflow Automation',
        'Cloud & Security',
      ],
      primaryCta: {
        label: 'Download CV',
        href: '/Santiago_Olayo_Villamil_CV_EN.pdf',
        download: 'Santiago_Olayo_Villamil_CV_EN.pdf',
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
      socialLinks: SHARED_SOCIAL_LINKS,
    },
    experienceHeading: {
      number: '01.',
      title: 'Experience',
      subtitle: "Where I've Worked",
      description:
        'Partnering with product, ops, and finance to take features from idea to production.',
    },
    experiences: [
      {
        role: 'Backend Engineer',
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
    ],
    projectsHeading: {
      number: '02.',
      title: 'What I Work On',
      subtitle: 'Systems & Day-to-Day Engineering',
      description:
        'Backend architecture, internal AI tooling, and observability I build day to day.',
    },
    projects: [
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
        tech: ['Feature Ownership', 'Technical Design', 'Hexagonal / DDD', 'CI/CD'],
        status: 'Execution',
        iconClassName: 'fa-solid fa-layer-group',
      },
    ],
    contact: {
      heading: {
        number: '03.',
        title: 'Contact',
        subtitle: 'Get In Touch',
        description:
          'Want to chat about backend engineering, internal tools, or a project? Send me a note.',
      },
      introTitle: 'Links & Contact',
      formTitle: 'Send a Message',
      infoItems: [
        {
          iconClassName: 'fa-regular fa-envelope',
          label: 'Email',
          value: 'contact@santiago-jv.tech',
          copyValue: 'contact@santiago-jv.tech',
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
          value: 'Download PDF (EN)',
          href: '/Santiago_Olayo_Villamil_CV_EN.pdf',
          download: 'Santiago_Olayo_Villamil_CV_EN.pdf',
        },
      ],
      formLabels: {
        name: 'Name *',
        email: 'Email *',
        subject: 'Subject *',
        message: 'Message *',
        sending: 'Sending...',
        submit: 'Send Message',
        successMessage: "Message sent! I'll get back to you soon.",
        devPreviewMessage:
          'Validated locally (dev preview). Add RESEND_API_KEY in .env.local to send live emails.',
        rateLimitMessage: 'Too many messages sent recently. Please try again in a few minutes.',
        validationMessage: 'Please enter a valid email and at least 10 characters in your message.',
        errorMessage: 'Could not send your message right now. Copy my email on the left to reach me.',
        copyActionLabel: 'Copy',
        copiedLabel: 'Copied',
      },
    },
    footer: {
      brand: {
        name: '<santiago-jv/>',
        description:
          'Software Engineer working across backend development, cloud infrastructure, product analytics, and internal tools.',
      },
      sectionTitles: {
        navigation: 'Navigation',
        technologies: 'Technologies',
        connect: "Let's Connect",
      },
      quickLinks: [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Work', href: '#projects' },
        { label: 'Contact', href: '#contact' },
      ],
      skills: FOOTER_SKILLS,
      socialLinks: SHARED_SOCIAL_LINKS,
      email: 'contact@santiago-jv.tech',
      location: 'Colombia',
      sourceUrl: 'https://github.com/santiago-jv/santiago-jv',
      sourceLabel: 'View Source',
      rightsReserved: 'All rights reserved.',
      builtWith: 'Built with Next.js & TypeScript',
      followAriaPrefix: 'Follow me on',
      version: 'v4.3.0',
    },
  },
  es: {
    seo: {
      siteUrl: 'https://www.santiago-jv.tech/',
      title: 'Santiago Olayo | Ingeniero de Software',
      description:
        'Ingeniero de Software con más de 4 años de experiencia construyendo y mejorando productos en desarrollo backend, infraestructura cloud, analítica de producto y herramientas internas.',
      ogImage: '/images/og-image.svg',
      ogLocale: 'es_CO',
    },
    header: {
      brandAriaLabel: 'Ir a la sección Sobre mí',
      drawerTitle: 'Navegación',
      openMenuAriaLabel: 'Abrir menú de navegación',
      closeMenuAriaLabel: 'Cerrar menú de navegación',
      navLinks: [
        { label: 'Sobre mí', href: '#about' },
        { label: 'Experiencia', href: '#experience' },
        { label: 'Trabajo', href: '#projects' },
        { label: 'Contacto', href: '#contact' },
      ],
      resumeLabel: 'Hoja de Vida',
      resumeHref: '/Santiago_Olayo_Villamil_CV_ES.pdf',
      resumeDownloadName: 'Santiago_Olayo_Villamil_CV_ES.pdf',
    },
    hero: {
      greeting: 'Hola, mi nombre es',
      name: 'Santiago Olayo',
      role: 'Ingeniero de Software',
      summary:
        'Sistemas backend, infraestructura cloud y flujos con IA. 4+ años escalando productos en equipos globales.',
      coreStackAriaLabel: 'Áreas clave de enfoque',
      socialLinksAriaLabel: 'Enlaces sociales',
      highlights: [
        'IA Aplicada & MCP',
        'Impacto en Negocio',
        'Métricas de Producto',
        'Observabilidad',
        'Automatización',
        'Seguridad & Cloud',
      ],
      primaryCta: {
        label: 'Descargar CV',
        href: '/Santiago_Olayo_Villamil_CV_ES.pdf',
        download: 'Santiago_Olayo_Villamil_CV_ES.pdf',
        iconClassName: 'fa-solid fa-arrow-down-to-bracket',
      },
      secondaryCta: {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/santiago-jv',
        iconClassName: 'fa-brands fa-linkedin-in',
      },
      tertiaryCta: {
        label: 'Contacto',
        href: '#contact',
        iconClassName: 'fa-regular fa-paper-plane',
      },
      socialLinks: SHARED_SOCIAL_LINKS,
    },
    experienceHeading: {
      number: '01.',
      title: 'Experiencia',
      subtitle: 'Dónde he trabajado',
      description:
        'De la idea a producción junto a producto, operaciones y finanzas.',
    },
    experiences: [
      {
        role: 'Backend Engineer',
        company: 'GoodRec',
        period: 'Ene 2025 – Actualidad',
        location: 'Remoto',
        highlights: [
          'Manejo el desarrollo de funcionalidades de punta a punta: desde conversaciones con stakeholders y diseño técnico hasta implementación, despliegue y monitoreo post-lanzamiento.',
          'Construyo y mantengo servicios backend (Node.js, NestJS, TypeScript) bajo Arquitectura Hexagonal y DDD, junto con funcionalidades móviles, herramientas internas, migraciones de bases de datos y locks en Redis.',
          'Aporté en la migración de procesos manuales hacia flujos asistidos por IA y en la mejora continua de las herramientas internas del equipo, incluyendo tooling con MCP para conectar con nuestros LLMs de preferencia, plugins y skills enfocados por área de equipo, y reglas de prompting con Cloudflare AI Gateway.',
          'Uso Datadog para monitorear servicios, configurar alertas e investigar incidentes en producción, CleverTap para medir eventos de producto y métricas de negocio, y Metabase para analizar datos y respaldar decisiones de producto.',
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
        period: 'Ago 2022 – Ene 2025',
        location: 'Remoto',
        highlights: [
          'Desarrollé y mantuve servicios backend con Node.js, TypeScript y LoopBack 4 para una aplicación móvil utilizada por comercios independientes.',
          'Diseñé esquemas y ejecuté migraciones en PostgreSQL y MongoDB, optimizando consultas críticas de billetera y pagos.',
          'Construí APIs REST, integraciones con pasarelas de pago y pruebas automatizadas trabajando bajo metodología Scrum.',
        ],
        tech: ['Node.js', 'TypeScript', 'LoopBack 4', 'PostgreSQL', 'MongoDB', 'REST APIs'],
      },
      {
        role: 'Full Stack Developer',
        company: 'Cooltivalo · +COTAS · SLS GROUPS',
        period: 'Ene 2021 – May 2023',
        location: 'Colombia',
        highlights: [
          'Desarrollé aplicaciones web y APIs backend utilizando JavaScript, TypeScript, Node.js, GraphQL, MySQL y MongoDB.',
          'Realicé modelado de datos relacionales, integraciones frontend y despliegues en la nube.',
        ],
        tech: ['Node.js', 'TypeScript', 'GraphQL', 'MySQL', 'MongoDB', 'JavaScript'],
      },
    ],
    projectsHeading: {
      number: '02.',
      title: 'En qué trabajo',
      subtitle: 'Sistemas e ingeniería del día a día',
      description:
        'Arquitectura backend, tooling con IA y observabilidad que construyo día a día.',
    },
    projects: [
      {
        title: 'Servicios Backend y Migraciones de Bases de Datos',
        description:
          'Diseño y escalamiento de APIs backend con NestJS, Node.js y Spring Boot. Manejo de flujos de alta concurrencia con locks en Redis y ejecución segura de migraciones de esquemas en PostgreSQL y MongoDB.',
        tech: ['NestJS', 'Node.js', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'Redis'],
        status: 'Foco Principal',
        iconClassName: 'fa-solid fa-server',
      },
      {
        title: 'Tooling Interno con IA y Optimización de Flujos',
        description:
          'Apoyo al equipo reemplazando tareas manuales por flujos asistidos con IA. Mejora continua del tooling interno con MCP para conectar con nuestros LLMs de preferencia, plugins y skills por área, y gestión de prompting rules con Cloudflare AI Gateway.',
        tech: ['TypeScript', 'MCP', 'Cloudflare AI Gateway', 'LLMs', 'Internal Tooling'],
        status: 'Herramientas Internas',
        iconClassName: 'fa-solid fa-diagram-project',
      },
      {
        title: 'Monitoreo en Producción y Analítica de Producto',
        description:
          'Salud operativa en producción mediante alertas, logs y trazas en Datadog. Seguimiento de eventos en CleverTap y consultas en Metabase para que producto, operaciones y finanzas tomen decisiones con datos reales.',
        tech: ['Datadog', 'CleverTap', 'Metabase', 'AWS', 'SQL'],
        status: 'Observabilidad y Datos',
        iconClassName: 'fa-solid fa-chart-line',
      },
      {
        title: 'Entrega de Producto de Punta a Punta',
        description:
          'Trabajo directo con producto, operaciones, soporte y finanzas para aterrizar problemas, diseñar soluciones técnicas prácticas, desplegar en backend y móvil, e iterar después del lanzamiento.',
        tech: ['Feature Ownership', 'Diseño Técnico', 'Hexagonal / DDD', 'CI/CD'],
        status: 'Ejecución',
        iconClassName: 'fa-solid fa-layer-group',
      },
    ],
    contact: {
      heading: {
        number: '03.',
        title: 'Contacto',
        subtitle: 'Hablemos',
        description:
          '¿Quieres conversar sobre ingeniería backend, IA o algún proyecto? Escríbeme.',
      },
      introTitle: 'Enlaces y Contacto',
      formTitle: 'Envía un mensaje',
      infoItems: [
        {
          iconClassName: 'fa-regular fa-envelope',
          label: 'Correo',
          value: 'contact@santiago-jv.tech',
          copyValue: 'contact@santiago-jv.tech',
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
          label: 'Hoja de Vida',
          value: 'Descargar PDF (ES)',
          href: '/Santiago_Olayo_Villamil_CV_ES.pdf',
          download: 'Santiago_Olayo_Villamil_CV_ES.pdf',
        },
      ],
      formLabels: {
        name: 'Nombre *',
        email: 'Correo *',
        subject: 'Asunto *',
        message: 'Mensaje *',
        sending: 'Enviando...',
        submit: 'Enviar mensaje',
        successMessage: '¡Mensaje enviado! Te responderé pronto.',
        devPreviewMessage:
          'Validado en local (modo preview). Agrega RESEND_API_KEY en .env.local para envío real.',
        rateLimitMessage: 'Demasiados intentos recientes. Intenta nuevamente en unos minutos.',
        validationMessage: 'Ingresa un correo válido y un mensaje de al menos 10 caracteres.',
        errorMessage: 'No se pudo enviar en este momento. Puedes copiar mi correo a la izquierda.',
        copyActionLabel: 'Copiar',
        copiedLabel: 'Copiado',
      },
    },
    footer: {
      brand: {
        name: '<santiago-jv/>',
        description:
          'Ingeniero de Software trabajando en desarrollo backend, infraestructura cloud, analítica de producto y herramientas internas.',
      },
      sectionTitles: {
        navigation: 'Navegación',
        technologies: 'Tecnologías',
        connect: 'Conectemos',
      },
      quickLinks: [
        { label: 'Sobre mí', href: '#about' },
        { label: 'Experiencia', href: '#experience' },
        { label: 'Trabajo', href: '#projects' },
        { label: 'Contacto', href: '#contact' },
      ],
      skills: FOOTER_SKILLS,
      socialLinks: SHARED_SOCIAL_LINKS,
      email: 'contact@santiago-jv.tech',
      location: 'Colombia',
      sourceUrl: 'https://github.com/santiago-jv/santiago-jv',
      sourceLabel: 'Ver código',
      rightsReserved: 'Todos los derechos reservados.',
      builtWith: 'Construido con Next.js y TypeScript',
      followAriaPrefix: 'Sígueme en',
      version: 'v4.3.0',
    },
  },
};

export const SEO = PORTFOLIO_CONTENT.en.seo;
export const NAVIGATION_LINKS = PORTFOLIO_CONTENT.en.header.navLinks;
export const HERO_CONTENT = PORTFOLIO_CONTENT.en.hero;
export const EXPERIENCE_HEADING = PORTFOLIO_CONTENT.en.experienceHeading;
export const EXPERIENCES = PORTFOLIO_CONTENT.en.experiences;
export const PROJECTS_HEADING = PORTFOLIO_CONTENT.en.projectsHeading;
export const PROJECTS = PORTFOLIO_CONTENT.en.projects;
export const CONTACT_CONTENT = PORTFOLIO_CONTENT.en.contact;
export const FOOTER_CONTENT = PORTFOLIO_CONTENT.en.footer;
