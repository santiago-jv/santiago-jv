export type Locale = 'en' | 'es';
export type ThemeMode = 'dark' | 'light';
export type SocialPlatform = 'github' | 'x' | 'linkedin' | 'medium' | 'email';

export interface NavigationLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  iconClassName: string;
}

export interface HeroCta {
  label: string;
  href: string;
  download?: string | boolean;
  iconClassName?: string;
}

export interface HeroContent {
  greeting: string;
  name: string;
  role: string;
  summary: string;
  coreStackAriaLabel: string;
  socialLinksAriaLabel: string;
  highlights: string[];
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  tertiaryCta?: HeroCta;
  socialLinks: SocialLink[];
}

export interface SectionHeadingContent {
  number: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  status: string;
  iconClassName?: string;
}

export interface ContactInfoItem {
  label: string;
  value: string;
  href?: string;
  download?: string | boolean;
  iconClassName: string;
}

export interface ContactFormLabels {
  name: string;
  email: string;
  subject: string;
  message: string;
  sending: string;
  submit: string;
  successMessage: string;
  errorMessage: string;
  directPrompt: string;
  mailtoPrefix: string;
}

export interface ContactContent {
  heading: SectionHeadingContent;
  introTitle: string;
  formTitle: string;
  quickActionLabel: string;
  quickActionHref: string;
  infoItems: ContactInfoItem[];
  formLabels: ContactFormLabels;
}

export interface HeaderLocaleContent {
  brandAriaLabel: string;
  drawerTitle: string;
  openMenuAriaLabel: string;
  closeMenuAriaLabel: string;
  navLinks: NavigationLink[];
  resumeLabel: string;
  resumeHref: string;
  resumeDownloadName: string;
}

export interface FooterContent {
  brand: {
    name: string;
    description: string;
  };
  sectionTitles: {
    navigation: string;
    technologies: string;
    connect: string;
  };
  quickLinks: NavigationLink[];
  skills: string[];
  socialLinks: SocialLink[];
  email: string;
  location: string;
  sourceUrl: string;
  sourceLabel: string;
  rightsReserved: string;
  builtWith: string;
  followAriaPrefix: string;
  version: string;
}

export interface SeoContent {
  siteUrl: string;
  title: string;
  description: string;
  ogImage: string;
  ogLocale: string;
}

export interface PortfolioLocaleContent {
  seo: SeoContent;
  header: HeaderLocaleContent;
  hero: HeroContent;
  experienceHeading: SectionHeadingContent;
  experiences: ExperienceItem[];
  projectsHeading: SectionHeadingContent;
  projects: Project[];
  contact: ContactContent;
  footer: FooterContent;
}
