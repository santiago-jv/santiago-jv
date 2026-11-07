import type { Locale } from '@/types/portfolio';

export const MCP_ENDPOINT_URL = 'https://mcp.santiago-jv.tech/mcp';
export const MCP_DOCS_URL = 'https://mcp.santiago-jv.tech/docs';
export const MCP_GATEWAY_URL = 'https://mcp.santiago-jv.tech';
export const AI_CHAT_URL = 'https://ai.santiago-jv.tech';

export interface McpShowcaseTabPreview {
  command: string;
  scoreBadge: string;
  verdict: string;
  summary: string;
  matchedPills: string[];
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
    launchAiChatCta: string;
    primaryCta: string;
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
      eyebrow: 'Personal MCP Server',
      subtitle: 'Connect Your AI to My Work',
      description:
        'Connect Claude, Codex, Antigravity, or Cursor to my live Cloudflare Edge MCP server, or chat directly in your browser.',
      liveStatusLabel: 'Live · Streamable HTTP',
      endpointLabel: 'Public MCP Endpoint',
      copyUrlLabel: 'Copy URL',
      copiedLabel: 'Copied',
      tabs: {
        recruiter: 'Vacancy Match',
        engineering: 'Stack Audit',
      },
      recruiterPreview: {
        command:
          '"Evaluate how well Santiago fits our Senior Backend Engineer role (NestJS, AWS, Redis, AI)."',
        scoreBadge: '95 / 100 · STRONG FIT',
        verdict: 'Recommended to Interview',
        summary:
          '4.5+ years shipping backend systems (NestJS, Node.js, TypeScript, Spring Boot), Redis locks, Datadog, and MCP workflows.',
        matchedPills: [
          'TypeScript · 4.5y',
          'NestJS · Hexagonal',
          'AWS & Redis',
          'MCP & Workers',
        ],
      },
      engineeringPreview: {
        command:
          '"Walk me through Santiago\'s backend architecture, concurrency patterns, and MCP workflows."',
        scoreBadge: '6 Tools · 4 Resources',
        verdict: 'Stateless Cloudflare Edge',
        summary:
          'Ports & Adapters, zero-downtime PostgreSQL/MongoDB migrations, Stripe/Nequi payments, CleverTap, and Datadog APM.',
        matchedPills: [
          'Streamable HTTP',
          'Cloudflare Workers',
          'Zod Schemas',
          'Rate Limited',
        ],
      },
      launchAiChatCta: 'Open Live AI Chat',
      primaryCta: 'MCP Docs & Setup',
      valueCards: [
        {
          icon: 'fa-sparkles',
          eyebrow: 'Zero Setup Option',
          title: 'Live Web AI Chat',
          description:
            'Open ai.santiago-jv.tech to ask about my work or paste a job description directly in your browser.',
        },
        {
          icon: 'fa-terminal',
          eyebrow: 'Model Context Protocol',
          title: 'Connect in 10 Seconds',
          description:
            'Add mcp.santiago-jv.tech/mcp to Claude, Cursor, Codex, or Antigravity with zero API keys required.',
        },
        {
          icon: 'fa-shield',
          eyebrow: 'Edge Guardrails',
          title: 'Public & Rate-Limited',
          description:
            'Stateless Streamable HTTP on Cloudflare Workers with per-IP rate limiting and strict payload caps.',
        },
      ],
    },
  },
  es: {
    showcase: {
      eyebrow: 'Servidor MCP Personal',
      subtitle: 'Conecta tu IA a mi Trabajo',
      description:
        'Conecta Claude, Codex, Antigravity o Cursor a mi servidor MCP en Cloudflare Edge, o chatea directo en el navegador.',
      liveStatusLabel: 'En Vivo · Streamable HTTP',
      endpointLabel: 'Endpoint MCP Público',
      copyUrlLabel: 'Copiar URL',
      copiedLabel: 'Copiado',
      tabs: {
        recruiter: 'Match de Vacante',
        engineering: 'Auditoría Técnica',
      },
      recruiterPreview: {
        command:
          '"Evalúa qué tanto encaja Santiago con nuestra vacante Senior Backend Engineer (NestJS, AWS, Redis, IA)."',
        scoreBadge: '95 / 100 · ALTO MATCH',
        verdict: 'Recomendado para Entrevista',
        summary:
          '4.5+ años construyendo sistemas backend (NestJS, Node.js, TypeScript, Spring Boot), locks en Redis, Datadog y MCP.',
        matchedPills: [
          'TypeScript · 4.5a',
          'NestJS · Hexagonal',
          'AWS & Redis',
          'MCP & Workers',
        ],
      },
      engineeringPreview: {
        command:
          '"Explícame la arquitectura backend en producción de Santiago, concurrencia y servidores MCP."',
        scoreBadge: '6 Tools · 4 Resources',
        verdict: 'Cloudflare Edge Stateless',
        summary:
          'Puertos y Adaptadores, migraciones en PostgreSQL/MongoDB, pagos con Stripe/Nequi, CleverTap y Datadog APM.',
        matchedPills: [
          'Streamable HTTP',
          'Cloudflare Workers',
          'Esquemas Zod',
          'Rate Limit',
        ],
      },
      launchAiChatCta: 'Abrir Chat IA',
      primaryCta: 'Docs y Guía MCP',
      valueCards: [
        {
          icon: 'fa-sparkles',
          eyebrow: 'Sin Configuración',
          title: 'Chat IA en el Navegador',
          description:
            'Entra a ai.santiago-jv.tech para preguntar sobre mi experiencia o pegar una vacante al instante.',
        },
        {
          icon: 'fa-terminal',
          eyebrow: 'Model Context Protocol',
          title: 'Conéctalo en 10 Segundos',
          description:
            'Agrega mcp.santiago-jv.tech/mcp en Claude, Cursor, Codex o Antigravity sin pedir API keys.',
        },
        {
          icon: 'fa-shield',
          eyebrow: 'Seguridad en el Edge',
          title: 'Público y Protegido',
          description:
            'Streamable HTTP sin estado en Cloudflare Workers con rate-limiting por IP y validación estricta.',
        },
      ],
    },
  },
};
