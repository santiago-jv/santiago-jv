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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=white-bg-black-s" />
        <link rel="shortcut icon" href="/favicon.svg?v=white-bg-black-s" />
        <link rel="apple-touch-icon" href="/favicon.svg?v=white-bg-black-s" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
