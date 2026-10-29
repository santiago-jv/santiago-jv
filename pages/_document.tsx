import { Html, Head, Main, NextScript } from 'next/document';

const INITIAL_PREFERENCES_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;
    var savedTheme = sessionStorage.getItem('portfolio-theme-override');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolvedTheme = (savedTheme === 'dark' || savedTheme === 'light')
      ? savedTheme
      : (prefersDark ? 'dark' : 'light');
    root.setAttribute('data-theme', resolvedTheme);
    root.style.colorScheme = resolvedTheme;

    var metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', resolvedTheme === 'dark' ? '#07090e' : '#f8fafc');
    }

    var savedLocale = sessionStorage.getItem('portfolio-locale-override');
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    var primaryLang = String(langs[0] || 'en').toLowerCase();
    var resolvedLocale = (savedLocale === 'en' || savedLocale === 'es')
      ? savedLocale
      : (primaryLang.indexOf('es') === 0 ? 'es' : 'en');
    root.setAttribute('lang', resolvedLocale);
  } catch (e) {}
})();
`;

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#07090e" />
        <script dangerouslySetInnerHTML={{ __html: INITIAL_PREFERENCES_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          referrerPolicy="no-referrer"
        />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
