import { Html, Head, Main, NextScript } from 'next/document';

const INITIAL_LOCALE_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    var primaryLang = String(langs[0] || 'en').toLowerCase();
    root.setAttribute('lang', primaryLang.indexOf('es') === 0 ? 'es' : 'en');
  } catch (e) {}
})();
`;

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <script dangerouslySetInnerHTML={{ __html: INITIAL_LOCALE_SCRIPT }} />
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

        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=space-black" />
        <link rel="shortcut icon" href="/favicon.svg?v=space-black" />
        <link rel="apple-touch-icon" href="/favicon.svg?v=space-black" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
