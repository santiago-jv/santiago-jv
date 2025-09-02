import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        {/* Optimized font loading for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Inter:wght@400;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* FontAwesome with optimized loading */}
        <link 
          rel="stylesheet" 
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" 
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" 
          crossOrigin="anonymous"
        />
        
        {/* Favicon and PWA icons */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A192F" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
