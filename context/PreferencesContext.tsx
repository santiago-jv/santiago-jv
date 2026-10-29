import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PORTFOLIO_CONTENT } from '@/data/portfolio-content';
import { Locale, PortfolioLocaleContent, ThemeMode } from '@/types/portfolio';

const LOCALE_SESSION_KEY = 'portfolio-locale-override';
const THEME_SESSION_KEY = 'portfolio-theme-override';

interface PreferencesContextValue {
  locale: Locale;
  theme: ThemeMode;
  content: PortfolioLocaleContent;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  setTheme: (next: ThemeMode) => void;
  toggleTheme: () => void;
}

const PreferencesContext = createContext<PreferencesContextValue>({
  locale: 'en',
  theme: 'dark',
  content: PORTFOLIO_CONTENT.en,
  setLocale: () => undefined,
  toggleLocale: () => undefined,
  setTheme: () => undefined,
  toggleTheme: () => undefined,
});

function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'en';
  }

  const candidates =
    Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language || 'en'];

  const primary = (candidates[0] || 'en').toLowerCase();
  if (primary.startsWith('es')) {
    return 'es';
  }

  return 'en';
}

function detectSystemTheme(): ThemeMode {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function syncDocumentTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#07090e' : '#f8fafc');
  }
}

function syncDocumentLocale(locale: Locale): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('lang', locale);
}

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    let initialLocale: Locale = detectBrowserLocale();
    try {
      const savedLocale = window.sessionStorage.getItem(LOCALE_SESSION_KEY);
      if (savedLocale === 'en' || savedLocale === 'es') {
        initialLocale = savedLocale;
      }
    } catch {
      // Ignore storage access restrictions
    }
    setLocaleState(initialLocale);
    syncDocumentLocale(initialLocale);

    let initialTheme: ThemeMode = detectSystemTheme();
    try {
      const savedTheme = window.sessionStorage.getItem(THEME_SESSION_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        initialTheme = savedTheme;
      }
    } catch {
      // Ignore storage access restrictions
    }
    setThemeState(initialTheme);
    syncDocumentTheme(initialTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event: MediaQueryListEvent): void => {
      const nextSystemTheme: ThemeMode = event.matches ? 'dark' : 'light';
      try {
        window.sessionStorage.removeItem(THEME_SESSION_KEY);
      } catch {
        // Ignore storage access restrictions
      }
      setThemeState(nextSystemTheme);
      syncDocumentTheme(nextSystemTheme);
    };

    const handleBrowserLanguageChange = (): void => {
      const nextLocale = detectBrowserLocale();
      try {
        window.sessionStorage.removeItem(LOCALE_SESSION_KEY);
      } catch {
        // Ignore storage access restrictions
      }
      setLocaleState(nextLocale);
      syncDocumentLocale(nextLocale);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    window.addEventListener('languagechange', handleBrowserLanguageChange);

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else if (typeof mediaQuery.removeListener === 'function') {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
      window.removeEventListener('languagechange', handleBrowserLanguageChange);
    };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    syncDocumentLocale(next);
    try {
      window.sessionStorage.setItem(LOCALE_SESSION_KEY, next);
    } catch {
      // Ignore storage access restrictions
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === 'en' ? 'es' : 'en';
      syncDocumentLocale(next);
      try {
        window.sessionStorage.setItem(LOCALE_SESSION_KEY, next);
      } catch {
        // Ignore storage access restrictions
      }
      return next;
    });
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    syncDocumentTheme(next);
    try {
      window.sessionStorage.setItem(THEME_SESSION_KEY, next);
    } catch {
      // Ignore storage access restrictions
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      syncDocumentTheme(next);
      try {
        window.sessionStorage.setItem(THEME_SESSION_KEY, next);
      } catch {
        // Ignore storage access restrictions
      }
      return next;
    });
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      locale,
      theme,
      content: PORTFOLIO_CONTENT[locale],
      setLocale,
      toggleLocale,
      setTheme,
      toggleTheme,
    }),
    [locale, theme, setLocale, toggleLocale, setTheme, toggleTheme]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export function usePreferences(): PreferencesContextValue {
  return useContext(PreferencesContext);
}
