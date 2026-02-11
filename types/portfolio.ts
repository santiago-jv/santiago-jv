export type SocialPlatform = 'github' | 'twitter' | 'instagram' | 'linkedin' | 'email';

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

export interface HeroContent {
  greeting: string;
  name: string;
  role: string;
  summary: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  socialLinks: SocialLink[];
}

export interface SectionHeadingContent {
  number: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  status: string;
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
    availabilityText: string;
  };
  quickLinks: NavigationLink[];
  skills: string[];
  socialLinks: SocialLink[];
  email: string;
  location: string;
  sourceUrl: string;
  version: string;
}
