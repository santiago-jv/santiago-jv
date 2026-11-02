import '@/styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { PreferencesProvider } from '@/context/PreferencesContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-jakarta',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  variable: '--font-jetbrains',
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (!window.location.hash || window.location.hash === '#contact' || window.location.hash === '#about') {
        window.scrollTo(0, 0);
        if (window.location.hash === '#contact') {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    }
  }, []);

  return (
    <PreferencesProvider>
      <div
        data-font-scope=""
        className={`${plusJakartaSans.variable} ${jetBrainsMono.variable}`}
      >
        <Component {...pageProps} />
      </div>
    </PreferencesProvider>
  );
}
