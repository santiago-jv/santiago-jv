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
  download?: boolean;
  iconClassName?: string;
}

export interface HeroContent {
  greeting: string;
  name: string;
  role: string;
  summary: string;
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
  iconClassName: string;
}

export interface ContactContent {
  heading: SectionHeadingContent;
  introTitle: string;
  formTitle: string;
  quickActionLabel: string;
  quickActionHref: string;
  infoItems: ContactInfoItem[];
}

export interface FooterContent {
  brand: {
    name: string;
    description: string;
  };
  quickLinks: NavigationLink[];
  skills: string[];
  socialLinks: SocialLink[];
  email: string;
  location: string;
  sourceUrl: string;
  version: string;
}
