import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio-content';
import { Locale, PortfolioLocaleContent } from '@/types/portfolio';

interface PreferencesContextValue {
  locale: Locale;
  content: PortfolioLocaleContent;
}

const PreferencesContext = createContext<PreferencesContextValue>({
  locale: 'en',
  content: PORTFOLIO_CONTENT.en,
});

function detectDeviceLocale(): Locale {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'en';
  }

  const candidates =
    Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language || 'en'];

  const primary = String(candidates[0] || 'en').trim().toLowerCase();
  if (primary.startsWith('es')) {
    return 'es';
  }

  if (primary.startsWith('en')) {
    return 'en';
  }

  return 'en';
}

function syncDocumentLocale(locale: Locale): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('lang', locale);
}

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    try {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.style.removeProperty('color-scheme');
      window.sessionStorage.removeItem('portfolio-theme-override');
      window.sessionStorage.removeItem('portfolio-locale-override');
    } catch {
      // Ignore storage access restrictions
    }

    const applyDetectedLocale = (): void => {
      const detected = detectDeviceLocale();
      setLocale(detected);
      syncDocumentLocale(detected);
    };

    applyDetectedLocale();

    window.addEventListener('languagechange', applyDetectedLocale);
    document.addEventListener('visibilitychange', applyDetectedLocale);

    return () => {
      window.removeEventListener('languagechange', applyDetectedLocale);
      document.removeEventListener('visibilitychange', applyDetectedLocale);
    };
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      locale,
      content: PORTFOLIO_CONTENT[locale],
    }),
    [locale]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export function usePreferences(): PreferencesContextValue {
  return useContext(PreferencesContext);
}
