import Head from 'next/head';
import { usePreferences } from '@/context/PreferencesContext';
import { ContainerProps } from '@/types/global';

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  const { content } = usePreferences();
  const seo = content.seo;
  const resolvedTitle = title || seo.title;
  const ogImageUrl = `${seo.siteUrl.replace(/\/$/, '')}${seo.ogImage}`;

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateModified: '2026-10-29',
    mainEntity: {
      '@type': 'Person',
      name: 'Santiago Olayo Villamil',
      alternateName: ['Santiago Olayo', 'santiago-jv', 'santiagojv_tech'],
      jobTitle: 'Senior Software Engineer & Product Owner Engineer',
      description: seo.description,
      url: seo.siteUrl,
      email: 'mailto:contact@santiago-jv.tech',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Barranquilla',
        addressRegion: 'Atlántico',
        addressCountry: 'CO',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'GoodRec',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Universidad del Magdalena',
      },
      knowsAbout: [
        'Backend Engineering',
        'Node.js',
        'NestJS',
        'TypeScript',
        'Java',
        'Spring Boot',
        'Hexagonal Architecture',
        'Domain-Driven Design (DDD)',
        'Model Context Protocol (MCP)',
        'Cloudflare AI Gateway',
        'Large Language Models (LLMs)',
        'AWS',
        'Google Cloud Functions',
        'PostgreSQL',
        'MongoDB',
        'Redis Distributed Locks',
        'Datadog',
        'CleverTap',
        'Metabase',
        'Product Ownership',
      ],
      sameAs: [
        'https://www.linkedin.com/in/santiago-jv',
        'https://github.com/santiago-jv',
        'https://x.com/santiagojv_tech',
        'https://medium.com/@santiago-jv/',
      ],
    },
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={seo.description} />
        <meta name="author" content="Santiago Olayo Villamil (santiago-jv)" />
        <meta
          name="keywords"
          content="Santiago Olayo, Santiago Olayo Villamil, santiago-jv, Senior Backend Engineer, Senior Full Stack Engineer, Product Owner Engineer, AI Engineer, NestJS, Node.js, TypeScript, Spring Boot, Java, Hexagonal Architecture, DDD, MCP, Model Context Protocol, Cloudflare AI Gateway, Datadog, CleverTap, Metabase, AWS, Colombia"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <link rel="canonical" href={seo.siteUrl} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context Summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Context" />

        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Santiago Olayo — Portfolio" />
        <meta property="og:locale" content={seo.ogLocale} />
        <meta property="og:locale:alternate" content={seo.ogLocale === 'en_US' ? 'es_CO' : 'en_US'} />
        <meta property="og:url" content={seo.siteUrl} />
        <meta property="og:title" content={resolvedTitle} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={ogImageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@santiagojv_tech" />
        <meta name="twitter:creator" content="@santiagojv_tech" />
        <meta name="twitter:url" content={seo.siteUrl} />
        <meta name="twitter:title" content={resolvedTitle} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={ogImageUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />

        <title>{resolvedTitle}</title>
      </Head>
      {children}
    </>
  );
};

export default Container;
