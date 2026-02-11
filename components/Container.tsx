import Head from 'next/head';
import { SEO } from '@/data/portfolio-content';
import { ContainerProps } from '@/types/global';

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={SEO.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO.siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:image" content={SEO.ogImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={SEO.siteUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={SEO.description} />
        <meta property="twitter:image" content={SEO.ogImage} />

        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};

export default Container;
