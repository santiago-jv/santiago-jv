import Head from 'next/head';
import { ContainerProps } from '@/types/global';

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        {/* Essential Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Santiago Olayo - Semi Senior Backend Engineer specializing in NestJS, Spring Boot, AWS and database technologies. Building robust and scalable backend systems." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://santiago-jv.vercel.app/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Semi Senior Backend Engineer specializing in NestJS, Spring Boot, AWS and database technologies." />
        <meta property="og:image" content="/images/og-image.svg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://santiago-jv.vercel.app/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content="Semi Senior Backend Engineer specializing in NestJS, Spring Boot, AWS and database technologies." />
        <meta property="twitter:image" content="/images/og-image.svg" />

        {/* Fonts now loaded globally via _document.js for better performance */}
        
        <title>{title}</title>
      </Head>
      <>{children}</>
    </>
  );
};

export default Container;
