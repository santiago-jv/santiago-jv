// Global type definitions for the project

export interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  success: boolean;
}
