// Global type definitions for the project

export interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
  platform: 'github' | 'twitter' | 'instagram' | 'linkedin' | 'email';
}

export interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

// CSS Module types
export interface StylesModule {
  [className: string]: string;
}

// Animation types for animate.css
export type AnimateCSS = 
  | 'animate__animated'
  | 'animate__fadeInDown'
  | 'animate__fadeInLeft' 
  | 'animate__fadeInUp'
  | 'animate__delay-1s'
  | 'animate__delay-2s'
  | 'animate__delay-3s'
  | 'animate__delay-4s';

// Color theme types
export type ThemeColors = {
  darkBlue: string;
  red: string;
  softRed: string;
  gray: string;
  darkGray: string;
}

// API Response types (for future use)
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  success: boolean;
}
