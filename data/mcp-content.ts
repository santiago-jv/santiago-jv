import { Locale } from '@/types/portfolio';

export const MCP_ENDPOINT_URL = 'https://mcp.santiago-jv.tech/mcp';
export const MCP_DOCS_URL = 'https://mcp.santiago-jv.tech/docs';
export const MCP_GATEWAY_URL = 'https://mcp.santiago-jv.tech';

export interface McpShowcaseTabPreview {
  command: string;
  copyCtaLabel: string;
  copyPrompt: string;
  scoreBadge: string;
  verdict: string;
  summary: string;
  matchedPills: string[];
  footnote: string;
}

export interface McpLocaleCopy {
  showcase: {
    eyebrow: string;
    subtitle: string;
    description: string;
    liveStatusLabel: string;
    endpointLabel: string;
    copyUrlLabel: string;
    copiedLabel: string;
    tabs: {
      recruiter: string;
      engineering: string;
    };
    recruiterPreview: McpShowcaseTabPreview;
    engineeringPreview: McpShowcaseTabPreview;
    primaryCta: string;
    secondaryCopiedLabel: string;
    valueCards: Array<{
      icon: string;
      eyebrow: string;
      title: string;
      description: string;
    }>;
  };
}

export const MCP_CONTENT: Record<Locale, McpLocaleCopy> = {
  en: {
    showcase: {
      eyebrow: '03. Personal MCP Server',
      subtitle: "Don't just read my CV. Connect your AI to it",
      description:
        'I built and deployed a live Model Context Protocol server on Cloudflare Edge. Connect Claude, Codex, Antigravity, or Cursor in seconds and ask in plain language—your AI automatically discovers the right tools to audit my stack or evaluate your open role.',
      liveStatusLabel: 'Live · Streamable HTTP · No Auth Required',
      endpointLabel: 'Public MCP Endpoint',
      copyUrlLabel: 'Copy URL',
      copiedLabel: 'Copied',
      tabs: {
        recruiter: 'Recruiter Vacancy Match',
        engineering: 'Architecture & Stack Audit',
      },
      recruiterPreview: {
        command:
          '"Evaluate how well Santiago fits our Senior Backend Engineer role (TypeScript, NestJS, AWS, Redis, AI Tooling) and flag any honest gaps."',
        copyCtaLabel: 'Copy Recruiter Prompt',
        copyPrompt: `Evaluate how well Santiago Olayo fits our open role below.

Give me a concise hiring brief covering:
1. Overall fit score and clear recommendation (Should we interview him, and why?).
2. Top matching backend, cloud, product, or AI strengths backed by his real production work.
3. Any honest stack or work-modality gaps we should validate in a screening call.
4. His direct email, LinkedIn, and downloadable PDF resume link.

Open Role / Job Description:
[PASTE YOUR JOB DESCRIPTION HERE]`,
        scoreBadge: '95 / 100 · STRONG FIT',
        verdict: 'Recommended to Interview · High Production Overlap',
        summary:
          '4.5+ years shipping high-concurrency backend systems (NestJS, Node.js, TypeScript, Spring Boot), atomic Redis locks, Datadog observability, and production MCP + Cloudflare AI Gateway workflows.',
        matchedPills: [
          'TypeScript · 4.5y',
          'NestJS · Hexagonal/DDD',
          'AWS ECS & Serverless',
          'Redis Locks',
          'MCP & AI Gateway',
          'Datadog + Metabase',
        ],
        footnote: 'Auto-routed MCP tools · Deterministic edge scoring (<5ms) · Honest gap reporting',
      },
      engineeringPreview: {
        command:
          '"Walk me through Santiago\'s production backend architecture, concurrency patterns, and how he ships MCP + Cloudflare AI Gateway workflows."',
        copyCtaLabel: 'Copy Technical Prompt',
        copyPrompt: `Give me a concrete technical deep dive into Santiago Olayo's production engineering background.

Cover:
1. How he structures backend services (Hexagonal Architecture, DDD, TypeScript/NestJS, Java/Spring Boot).
2. How he handles high concurrency, distributed Redis locks, async queues, and zero-downtime migrations.
3. How he uses Datadog, CleverTap, Metabase, MCP servers, and Cloudflare AI Gateway in production.`,
        scoreBadge: '6 Tools · 4 Resources · 3 Prompts',
        verdict: 'Stateless Cloudflare Worker · Streamable HTTP',
        summary:
          'Inspect real architectural patterns from GoodRec and Bolsiyo: Ports & Adapters, zero-downtime PostgreSQL/MongoDB migrations, SQS/BullMQ async workers, CleverTap funnels, and CI/CD via GitHub Actions.',
        matchedPills: [
          'Streamable HTTP',
          'Cloudflare Workers',
          'Zod Schemas',
          'Edge Rate Limiting',
          'GitHub Actions CI/CD',
        ],
        footnote: 'Works natively with Claude, Codex, Antigravity, Cursor, ChatGPT, and VS Code',
      },
      primaryCta: 'Explore MCP Docs & Setup',
      secondaryCopiedLabel: 'Prompt Copied',
      valueCards: [
        {
          icon: 'fa-sparkles',
          eyebrow: 'For Recruiters & Hiring Managers',
          title: 'Paste Your Vacancy. Get an Honest Fit Brief.',
          description:
            'Connect your preferred AI, drop your job description in natural language, and get a transparent breakdown of matched skills, production evidence, and any stack gaps in seconds.',
        },
        {
          icon: 'fa-terminal',
          eyebrow: 'Proof Over Buzzwords',
          title: 'Applied AI Tooling in Production.',
          description:
            'Anyone can write "MCP" on a PDF resume. Shipping a public, edge-hardened MCP server on mcp.santiago-jv.tech with semantic tool discovery and CI/CD shows how I actually build.',
        },
        {
          icon: 'fa-shield',
          eyebrow: 'Public by Design, Hardened at the Edge',
          title: 'Zero Login Friction. Strict Guardrails.',
          description:
            'No API keys or Zero Trust walls slowing down recruiters—protected by per-IP rate limiting, strict 32 KB payload ceilings, and stateless Web Standard Streamable HTTP.',
        },
      ],
    },
  },
  es: {
    showcase: {
      eyebrow: '03. Servidor MCP Personal',
      subtitle: 'No solo leas mi CV. Conecta tu IA a él',
      description:
        'Construí y desplegué un servidor público de Model Context Protocol en Cloudflare Edge. Conecta Claude, Codex, Antigravity o Cursor en segundos y pregunta en lenguaje natural: tu IA detecta sola qué herramienta usar para auditar mi stack o evaluar tu vacante.',
      liveStatusLabel: 'En Vivo · Streamable HTTP · Sin Login',
      endpointLabel: 'Endpoint MCP Público',
      copyUrlLabel: 'Copiar URL',
      copiedLabel: 'Copiado',
      tabs: {
        recruiter: 'Evaluador de Vacantes (Reclutadores)',
        engineering: 'Auditoría de Stack y Arquitectura',
      },
      recruiterPreview: {
        command:
          '"Evalúa qué tanto encaja Santiago con nuestra vacante Senior Backend Engineer (TypeScript, NestJS, AWS, Redis, IA) y dime cualquier brecha honesta."',
        copyCtaLabel: 'Copiar Prompt Reclutador',
        copyPrompt: `Evalúa qué tanto encaja Santiago Olayo con nuestra vacante de abajo.

Dame un resumen ejecutivo de selección con:
1. Puntaje general de compatibilidad y recomendación clara (¿Deberíamos entrevistarlo y por qué?).
2. Principales fortalezas en backend, cloud, producto o IA respaldadas por su experiencia real en producción.
3. Cualquier brecha honesta de stack o modalidad que convenga validar en una primera llamada.
4. Su correo directo, LinkedIn y enlace para descargar su CV en PDF.

Descripción de la vacante:
[PEGA AQUÍ TU VACANTE]`,
        scoreBadge: '95 / 100 · ALTO MATCH',
        verdict: 'Recomendado para Entrevista · Alta Coincidencia en Producción',
        summary:
          '4.5+ años construyendo sistemas backend de alta concurrencia (NestJS, Node.js, TypeScript, Spring Boot), locks atómicos en Redis, observabilidad en Datadog y flujos productivos con MCP + Cloudflare AI Gateway.',
        matchedPills: [
          'TypeScript · 4.5a',
          'NestJS · Hexagonal/DDD',
          'AWS ECS & Serverless',
          'Redis Locks',
          'MCP & AI Gateway',
          'Datadog + Metabase',
        ],
        footnote: 'Descubrimiento automático de tools · Scoring determinístico (<5ms) · Brechas honestas',
      },
      engineeringPreview: {
        command:
          '"Explícame la arquitectura backend en producción de Santiago, cómo maneja concurrencia y cómo construye flujos con MCP y Cloudflare AI Gateway."',
        copyCtaLabel: 'Copiar Prompt Técnico',
        copyPrompt: `Dame un análisis técnico concreto de la experiencia en ingeniería de producción de Santiago Olayo.

Incluye:
1. Cómo estructura servicios backend (Arquitectura Hexagonal, DDD, TypeScript/NestJS, Java/Spring Boot).
2. Cómo resuelve alta concurrencia, locks distribuidos en Redis, colas asíncronas y migraciones sin caída.
3. Cómo aplica Datadog, CleverTap, Metabase, servidores MCP y Cloudflare AI Gateway en producción.`,
        scoreBadge: '6 Tools · 4 Resources · 3 Prompts',
        verdict: 'Cloudflare Worker Stateless · Streamable HTTP',
        summary:
          'Explora decisiones reales de ingeniería en GoodRec y Bolsiyo: Puertos y Adaptadores, migraciones zero-downtime en PostgreSQL/MongoDB, colas SQS/BullMQ, embudos en CleverTap y CI/CD con GitHub Actions.',
        matchedPills: [
          'Streamable HTTP',
          'Cloudflare Workers',
          'Esquemas Zod',
          'Rate Limit por IP',
          'GitHub Actions CI/CD',
        ],
        footnote: 'Compatible con Claude, Codex, Antigravity, Cursor, ChatGPT y VS Code',
      },
      primaryCta: 'Ver Documentación y Guía MCP',
      secondaryCopiedLabel: 'Prompt Copiado',
      valueCards: [
        {
          icon: 'fa-sparkles',
          eyebrow: 'Para Reclutadores y Líderes de Selección',
          title: 'Monta tu Vacante y Evalúa nuestro Match.',
          description:
            'Conecta tu IA favorita, pega la descripción de tu vacante en lenguaje natural y obtén en segundos un resumen claro y honesto de si mi experiencia, stack y seniority encajan con lo que buscas.',
        },
        {
          icon: 'fa-terminal',
          eyebrow: 'Demostración Real, No Solo Palabras',
          title: 'Ingeniería de IA Aplicada en Vivo.',
          description:
            'Cualquiera puede escribir "MCP" en un PDF. Desplegar un servidor MCP propio en mcp.santiago-jv.tech con autodescubrimiento semántico y CI/CD demuestra cómo construyo herramientas reales.',
        },
        {
          icon: 'fa-shield',
          eyebrow: 'Público por Diseño, Protegido en el Edge',
          title: 'Cero Fricción de Acceso. Guardrails Estrictos.',
          description:
            'Sin pedir tokens ni muros de Zero Trust que frenen a quien evalúa mi perfil; protegido con rate-limiting por IP, límite de payload de 32 KB y Streamable HTTP sin estado.',
        },
      ],
    },
  },
};
