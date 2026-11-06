import { Locale } from '@/types/portfolio';

export const MCP_ENDPOINT_URL = 'https://mcp.santiago-jv.tech/mcp';
export const MCP_HEALTH_URL = 'https://mcp.santiago-jv.tech/health';

export interface McpClientSetupTab {
  id: 'claude' | 'cursor' | 'chatgpt' | 'vscode' | 'curl';
  label: string;
  badge: string;
  filename: string;
  steps: string[];
  snippet: string;
}

export interface McpToolDocItem {
  name: string;
  badge: string;
  summary: string;
  params: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

export interface McpResourceDocItem {
  uri: string;
  mimeType: string;
  description: string;
}

export interface McpPromptDocItem {
  name: string;
  args: string;
  description: string;
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
    recruiterPreview: {
      command: string;
      scoreBadge: string;
      verdict: string;
      summary: string;
      matchedPills: string[];
      footnote: string;
    };
    engineeringPreview: {
      command: string;
      scoreBadge: string;
      verdict: string;
      summary: string;
      matchedPills: string[];
      footnote: string;
    };
    primaryCta: string;
    secondaryCta: string;
    secondaryCopiedLabel: string;
    valueCards: Array<{
      icon: string;
      eyebrow: string;
      title: string;
      description: string;
    }>;
  };
  docs: {
    seoTitle: string;
    seoDescription: string;
    backToPortfolio: string;
    statusOperational: string;
    statusChecking: string;
    heroTitle: string;
    heroSubtitle: string;
    endpointCaption: string;
    copyEndpoint: string;
    copied: string;
    specBadges: string[];
    recruiterSection: {
      eyebrow: string;
      headline: string;
      description: string;
      steps: Array<{
        step: string;
        title: string;
        detail: string;
      }>;
      promptCardTitle: string;
      promptCardSubtitle: string;
      copyPromptBtn: string;
      promptTemplate: string;
      simulator: {
        title: string;
        subtitle: string;
        presetsLabel: string;
        presets: Array<{
          label: string;
          role: string;
          jd: string;
        }>;
        rolePlaceholder: string;
        jdPlaceholder: string;
        evaluateBtn: string;
        scoreLabel: string;
        matchedLabel: string;
        gapsLabel: string;
        noGapsText: string;
      };
    };
    setupSection: {
      eyebrow: string;
      headline: string;
      description: string;
      copySnippet: string;
      clients: McpClientSetupTab[];
    };
    referenceSection: {
      eyebrow: string;
      headline: string;
      description: string;
      toolsTitle: string;
      promptsTitle: string;
      resourcesTitle: string;
      requiredBadge: string;
      optionalBadge: string;
      tools: McpToolDocItem[];
      prompts: McpPromptDocItem[];
      resources: McpResourceDocItem[];
    };
    architectureSection: {
      eyebrow: string;
      headline: string;
      description: string;
      cards: Array<{
        tag: string;
        title: string;
        body: string;
      }>;
    };
  };
}

export const MCP_CONTENT: Record<Locale, McpLocaleCopy> = {
  en: {
    showcase: {
      eyebrow: '03. Personal MCP Server',
      subtitle: "Don't just read my CV. Connect your AI to it",
      description:
        'I built and deployed a live Model Context Protocol server on Cloudflare Edge. Connect Claude, Cursor, or ChatGPT in seconds to explore my production engineering work—or paste your open vacancy to evaluate our match.',
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
          'evaluate_vacancy_match({ role_title: "Senior Backend Engineer", required_skills: ["TypeScript", "NestJS", "AWS", "Redis", "AI Tooling"] })',
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
        footnote: 'Deterministic edge scoring (<5ms) · Honest gap reporting · $0 LLM key exposure',
      },
      engineeringPreview: {
        command: 'get_tech_stack_and_architecture({ domain: "all" })',
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
        footnote: 'Connect from Claude Desktop, Cursor, ChatGPT, VS Code, or MCP Inspector',
      },
      primaryCta: 'Explore MCP Docs & Setup',
      secondaryCta: 'Copy Recruiter Prompt',
      secondaryCopiedLabel: 'Prompt Copied',
      valueCards: [
        {
          icon: 'fa-sparkles',
          eyebrow: 'For Recruiters & Hiring Managers',
          title: 'Paste Your Vacancy. Get an Honest Fit Brief.',
          description:
            'Connect your preferred AI, drop your job description, and get a transparent breakdown of matched skills, real production evidence, and any stack gaps in 15 seconds.',
        },
        {
          icon: 'fa-terminal',
          eyebrow: 'Proof Over Buzzwords',
          title: 'Applied AI Tooling in Production.',
          description:
            'Anyone can write "MCP" on a PDF resume. Shipping a public, edge-hardened MCP server on mcp.santiago-jv.tech with automated CI/CD demonstrates how I actually build.',
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
    docs: {
      seoTitle: 'Santiago Olayo MCP Server | Documentation & Recruiter Match',
      seoDescription:
        'Official documentation for mcp.santiago-jv.tech — Connect Claude, Cursor, or ChatGPT to explore Santiago Olayo’s engineering career or evaluate job vacancy fit.',
      backToPortfolio: 'Back to santiago-jv.tech',
      statusOperational: 'Operational on Cloudflare Edge',
      statusChecking: 'Stateless Streamable HTTP · v1.0.0',
      heroTitle: 'Santiago Olayo MCP.',
      heroSubtitle:
        'A public Model Context Protocol server exposing my career history, backend architecture blueprints, and an automated vacancy-fit engine for recruiters and engineering leaders.',
      endpointCaption: 'Streamable HTTP Endpoint · Public Read-Only · Zero Auth Required',
      copyEndpoint: 'Copy Endpoint',
      copied: 'Copied',
      specBadges: [
        'Protocol: MCP 2025-03-26',
        'Transport: Streamable HTTP',
        'Runtime: Cloudflare Workers',
        'Auth: Public + Edge Rate Limit',
        'CI/CD: GitHub Actions',
      ],
      recruiterSection: {
        eyebrow: 'For Recruiters & Hiring Teams',
        headline: 'Evaluate Your Open Role in Seconds',
        description:
          'Wondering if my background fits your team? Connect my MCP server to your AI assistant—or test a job description right below—to get a transparent, evidence-backed compatibility report.',
        steps: [
          {
            step: '01',
            title: 'Connect mcp.santiago-jv.tech/mcp',
            detail:
              'Add the public URL to Claude, Cursor, ChatGPT, or VS Code. No API tokens, accounts, or approvals required.',
          },
          {
            step: '02',
            title: 'Paste Your Job Description',
            detail:
              'Ask your AI to run evaluate_vacancy_match with your open role requirements, tech stack, and work modality.',
          },
          {
            step: '03',
            title: 'Get an Honest Executive Summary',
            detail:
              'Receive a 0–100 score, production evidence from GoodRec & Bolsiyo, transparent stack gaps, and direct outreach links.',
          },
        ],
        promptCardTitle: 'Ready-to-Use Recruiter Prompt',
        promptCardSubtitle:
          'Once connected to mcp.santiago-jv.tech/mcp, paste this prompt into Claude, ChatGPT, or Cursor along with your job description:',
        copyPromptBtn: 'Copy Prompt',
        promptTemplate: `Using the santiago-jv-mcp server, call \`evaluate_vacancy_match\` (and \`get_work_experience\` if needed) to evaluate how well Santiago Olayo fits our open role below.

Give me a concise executive summary covering:
1. Overall match score and clear recommendation (Should we interview him? Why?).
2. Top matched backend, cloud, product, or AI skills backed by his real work at GoodRec and Bolsiyo.
3. Any honest stack or modality gaps we should validate in a screening call.
4. His direct email, LinkedIn, and PDF resume link.

Open Role / Job Description:
[PASTE YOUR JOB DESCRIPTION HERE]`,
        simulator: {
          title: 'Instant Browser Preview · evaluate_vacancy_match',
          subtitle:
            'No MCP client open right now? Test the exact matching engine live in your browser with a preset or paste your own vacancy:',
          presetsLabel: 'Load sample role:',
          presets: [
            {
              label: 'Senior Backend (NestJS / AWS)',
              role: 'Senior Backend Engineer',
              jd: 'Looking for a Senior Backend Engineer with 4+ years of experience in TypeScript, Node.js, and NestJS. Must understand Hexagonal Architecture, DDD, PostgreSQL, MongoDB, Redis concurrency locks, AWS ECS, CI/CD with GitHub Actions, and Datadog observability. Remote LatAm/US.',
            },
            {
              label: 'AI & Internal Tools Engineer',
              role: 'Applied AI & Platform Engineer',
              jd: 'Seeking a Fullstack / Backend Software Engineer to build internal AI workflows, custom Model Context Protocol (MCP) servers, LLM routing via Cloudflare AI Gateway, and product analytics dashboards in Metabase & CleverTap. 4+ years experience, Remote.',
            },
            {
              label: 'Different Stack (Rust / K8s SRE)',
              role: 'Staff Rust & Kubernetes SRE',
              jd: 'We need 8+ years of experience writing low-level Rust systems and administering bare-metal Kubernetes + Istio clusters on-site in Berlin.',
            },
          ],
          rolePlaceholder: 'Role title (e.g., Senior Backend Engineer)',
          jdPlaceholder: 'Paste your job description, required tech stack, seniority, and modality...',
          evaluateBtn: 'Run Match Evaluation',
          scoreLabel: 'Compatibility Score',
          matchedLabel: 'Matched Production Skills',
          gapsLabel: 'Transparent Screening Notes',
          noGapsText: 'No critical stack or modality gaps detected against primary profile.',
        },
      },
      setupSection: {
        eyebrow: 'Quick Start',
        headline: 'Connect in 10 Seconds',
        description:
          'Choose your AI client below and copy the configuration snippet. Supports Web Standard Streamable HTTP out of the box.',
        copySnippet: 'Copy Snippet',
        clients: [
          {
            id: 'cursor',
            label: 'Cursor',
            badge: 'Recommended for Engineers',
            filename: '~/.cursor/mcp.json',
            steps: [
              'Open Cursor Settings → Tools & MCP → Add New MCP Server (or edit ~/.cursor/mcp.json).',
              'Paste the Streamable HTTP configuration below and save.',
              'Ask Cursor in Agent chat: "Use santiago-jv-mcp to summarize Santiago’s backend architecture experience."',
            ],
            snippet: `{
  "mcpServers": {
    "santiago-jv": {
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
          },
          {
            id: 'claude',
            label: 'Claude',
            badge: 'Claude.ai & Desktop',
            filename: 'Claude Connectors / claude_desktop_config.json',
            steps: [
              'In Claude.ai Web/Desktop (Settings → Integrations / Connectors → Add Custom Connector), paste https://mcp.santiago-jv.tech/mcp directly.',
              'Or in claude_desktop_config.json via mcp-remote:',
            ],
            snippet: `{
  "mcpServers": {
    "santiago-jv": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.santiago-jv.tech/mcp"
      ]
    }
  }
}`,
          },
          {
            id: 'chatgpt',
            label: 'ChatGPT / OpenAI',
            badge: 'Responses API & Connectors',
            filename: 'OpenAI MCP Tool Config',
            steps: [
              'In ChatGPT Connectors / Developer Mode or OpenAI Responses API, register the remote Streamable HTTP MCP URL.',
              'No authentication header is required.',
            ],
            snippet: `{
  "type": "mcp",
  "server_label": "santiago_jv",
  "server_url": "https://mcp.santiago-jv.tech/mcp",
  "require_approval": "never"
}`,
          },
          {
            id: 'vscode',
            label: 'VS Code / Windsurf',
            badge: 'Copilot Agent Mode',
            filename: '.vscode/mcp.json',
            steps: [
              'Create .vscode/mcp.json in your workspace (or user settings) with type "http".',
              'Switch GitHub Copilot Chat to Agent mode and invoke any santiago-jv tool.',
            ],
            snippet: `{
  "servers": {
    "santiago-jv": {
      "type": "http",
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
          },
          {
            id: 'curl',
            label: 'cURL / Inspector',
            badge: 'Raw JSON-RPC',
            filename: 'Terminal',
            steps: [
              'Verify the stateless Streamable HTTP endpoint directly from your terminal or launch the official MCP Inspector.',
            ],
            snippet: `curl -X POST https://mcp.santiago-jv.tech/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'`,
          },
        ],
      },
      referenceSection: {
        eyebrow: 'API Reference',
        headline: 'Tools, Prompts & Resources',
        description:
          'Every capability exposed by mcp.santiago-jv.tech is strictly typed with Zod schemas and read-only annotations.',
        toolsTitle: 'Tools (6)',
        promptsTitle: 'Prompts (3)',
        resourcesTitle: 'Resources (4)',
        requiredBadge: 'required',
        optionalBadge: 'optional',
        tools: [
          {
            name: 'evaluate_vacancy_match',
            badge: 'Recruiter Flagship',
            summary:
              'Scores a job description (0–100) against Santiago’s stack, seniority, architecture depth, and modality—returning matched production evidence and transparent stack gaps.',
            params: [
              {
                name: 'job_description',
                type: 'string',
                required: true,
                description: 'Full job description text or role requirements (up to 10,000 chars).',
              },
              {
                name: 'role_title',
                type: 'string',
                required: false,
                description: 'Title of the open position (e.g. "Senior Backend Engineer").',
              },
              {
                name: 'required_skills',
                type: 'string[]',
                required: false,
                description: 'Explicit list of must-have skills to verify strictly.',
              },
              {
                name: 'modality',
                type: '"remote" | "hybrid" | "onsite"',
                required: false,
                description: 'Work modality to validate location compatibility.',
              },
              {
                name: 'language',
                type: '"en" | "es"',
                required: false,
                description: 'Report language (auto-detected from vacancy text if omitted).',
              },
            ],
          },
          {
            name: 'get_profile_overview',
            badge: 'Identity & Bio',
            summary:
              'Returns executive summary, headline, 4+ years experience overview, location/timezone (UTC-5), spoken languages, education, and resume PDF URLs.',
            params: [
              {
                name: 'language',
                type: '"en" | "es"',
                required: false,
                description: 'Response language ("en" default or "es").',
              },
            ],
          },
          {
            name: 'get_work_experience',
            badge: 'Career History',
            summary:
              'Detailed career timeline across GoodRec, Bolsiyo, and Cooltivalo · +COTAS · SLS GROUPS with filterable engineering domains.',
            params: [
              {
                name: 'company',
                type: 'string',
                required: false,
                description: 'Filter by company name (e.g. "GoodRec", "Bolsiyo").',
              },
              {
                name: 'focus',
                type: '"all" | "backend" | "ai-mcp" | "observability" | "product"',
                required: false,
                description: 'Filter roles by engineering focus.',
              },
              {
                name: 'language',
                type: '"en" | "es"',
                required: false,
                description: 'Response language ("en" or "es").',
              },
            ],
          },
          {
            name: 'get_tech_stack_and_architecture',
            badge: 'Stack & Blueprint',
            summary:
              'Categorized skill matrix with years of production experience, concrete evidence, and system architecture principles (Hexagonal, DDD, Redis Locks, Datadog, MCP).',
            params: [
              {
                name: 'domain',
                type: '"all" | "backend" | "architecture" | "ai" | "cloud-observability" | "databases" | "product-analytics"',
                required: false,
                description: 'Technical category filter.',
              },
              {
                name: 'language',
                type: '"en" | "es"',
                required: false,
                description: 'Response language ("en" or "es").',
              },
            ],
          },
          {
            name: 'get_social_and_contact_links',
            badge: 'Verified Channels',
            summary:
              'Returns email (contact@santiago-jv.tech), LinkedIn, GitHub, X, Medium, portfolio URL, and downloadable EN/ES PDF resumes.',
            params: [
              {
                name: 'include_resume_urls',
                type: 'boolean',
                required: false,
                description: 'Include direct PDF download links (default: true).',
              },
            ],
          },
          {
            name: 'prepare_outreach_context',
            badge: 'ATS & Outreach',
            summary:
              'Generates a structured ATS candidate note and a personalized interview invitation email draft for recruiters.',
            params: [
              {
                name: 'company_name',
                type: 'string',
                required: true,
                description: 'Hiring company name.',
              },
              {
                name: 'role_title',
                type: 'string',
                required: true,
                description: 'Title of the open role.',
              },
              {
                name: 'recruiter_name',
                type: 'string',
                required: false,
                description: 'Recruiter or hiring manager name.',
              },
            ],
          },
        ],
        prompts: [
          {
            name: 'evaluate_candidate_fit',
            args: 'job_description, language?',
            description:
              'Instructs the connected LLM to run a structured Staff Technical Recruiter evaluation of Santiago against your pasted job description.',
          },
          {
            name: 'technical_deep_dive',
            args: 'topic?',
            description:
              'Guides CTOs and Tech Leads through Santiago’s architecture decisions in backend concurrency, observability, or MCP internal tooling.',
          },
          {
            name: 'quick_intro',
            args: 'language?',
            description:
              'Generates a 30-second executive summary with verified contact links.',
          },
        ],
        resources: [
          {
            uri: 'santiago://profile/resume-en',
            mimeType: 'text/markdown',
            description: 'Complete structured English CV in Markdown.',
          },
          {
            uri: 'santiago://profile/resume-es',
            mimeType: 'text/markdown',
            description: 'Complete structured Spanish CV in Markdown.',
          },
          {
            uri: 'santiago://profile/architecture-blueprint',
            mimeType: 'application/json',
            description: 'Production architecture pillars across Cloud, Data, Observability, and AI/MCP.',
          },
          {
            uri: 'santiago://profile/contact-card',
            mimeType: 'application/json',
            description: 'Canonical JSON contact card, social links, and PDF URLs.',
          },
        ],
      },
      architectureSection: {
        eyebrow: 'Under the Hood',
        headline: 'Engineered for the Public Edge',
        description:
          'How mcp.santiago-jv.tech stays fast, free to operate, abuse-resistant, and zero-friction.',
        cards: [
          {
            tag: 'Access Model',
            title: 'Why Public Read-Only Instead of Zero Trust Login?',
            body: 'Gating public career data behind Cloudflare Access or API tokens adds friction that stops recruiters from testing. Instead, only curated public professional data is exposed, with zero write operations.',
          },
          {
            tag: 'Transport',
            title: 'Stateless Streamable HTTP on Cloudflare Workers',
            body: 'Uses WebStandardStreamableHTTPServerTransport in stateless JSON mode—avoiding brittle long-lived SSE connections, proxy timeouts, and idle compute charges.',
          },
          {
            tag: 'Cost & Abuse Safety',
            title: '$0 LLM Token Exposure + Edge Rate Limiting',
            body: 'evaluate_vacancy_match runs a deterministic TypeScript scoring engine at the edge (<5ms) while your own connected AI synthesizes the narrative—combined with 45 req/min IP rate limits and 32 KB body caps.',
          },
          {
            tag: 'Delivery',
            title: 'Automated GitHub Actions CI/CD',
            body: 'Every push to main runs strict TypeScript typechecking, protocol integration tests, and automated Wrangler deployment to mcp.santiago-jv.tech.',
          },
        ],
      },
    },
  },
  es: {
    showcase: {
      eyebrow: '03. Servidor MCP Personal',
      subtitle: 'No solo leas mi CV. Conecta tu IA a él',
      description:
        'Construí y desplegué un servidor público de Model Context Protocol en Cloudflare Edge. Conecta Claude, Cursor o ChatGPT en segundos para auditar mi arquitectura o pega tu vacante para evaluar qué tanto match hacemos.',
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
          'evaluate_vacancy_match({ role_title: "Senior Backend Engineer", required_skills: ["TypeScript", "NestJS", "AWS", "Redis", "IA / MCP"] })',
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
        footnote: 'Scoring determinístico en el edge (<5ms) · Reporte honesto de brechas · $0 riesgo de tokens LLM',
      },
      engineeringPreview: {
        command: 'get_tech_stack_and_architecture({ domain: "all", language: "es" })',
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
        footnote: 'Compatible con Claude Desktop, Cursor, ChatGPT, VS Code y MCP Inspector',
      },
      primaryCta: 'Ver Documentación y Guía MCP',
      secondaryCta: 'Copiar Prompt para Reclutador',
      secondaryCopiedLabel: 'Prompt Copiado',
      valueCards: [
        {
          icon: 'fa-sparkles',
          eyebrow: 'Para Reclutadores y Líderes de Selección',
          title: 'Monta tu Vacante y Evalúa nuestro Match.',
          description:
            'Conecta tu IA favorita, pega la descripción de tu vacante y obtén en segundos un resumen claro y honesto de si mi experiencia, stack y seniority encajan con lo que buscas.',
        },
        {
          icon: 'fa-terminal',
          eyebrow: 'Demostración Real, No Solo Palabras',
          title: 'Ingeniería de IA Aplicada en Vivo.',
          description:
            'Cualquiera puede escribir "MCP" en un PDF. Desplegar un servidor MCP propio en mcp.santiago-jv.tech con Cloudflare Workers y CI/CD demuestra cómo construyo herramientas reales.',
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
    docs: {
      seoTitle: 'Servidor MCP de Santiago Olayo | Documentación y Match de Vacantes',
      seoDescription:
        'Documentación oficial de mcp.santiago-jv.tech — Conecta Claude, Cursor o ChatGPT para explorar la experiencia de Santiago Olayo o evaluar compatibilidad con tu vacante.',
      backToPortfolio: 'Volver a santiago-jv.tech',
      statusOperational: 'Operativo en Cloudflare Edge',
      statusChecking: 'Streamable HTTP Stateless · v1.0.0',
      heroTitle: 'Santiago Olayo MCP.',
      heroSubtitle:
        'Un servidor público de Model Context Protocol que expone mi trayectoria, arquitectura backend y una herramienta para que reclutadores y líderes técnicos evalúen qué tanto match hago con su vacante.',
      endpointCaption: 'Endpoint Streamable HTTP · Público de Solo Lectura · Sin Autenticación',
      copyEndpoint: 'Copiar Endpoint',
      copied: 'Copiado',
      specBadges: [
        'Protocolo: MCP 2025-03-26',
        'Transporte: Streamable HTTP',
        'Runtime: Cloudflare Workers',
        'Auth: Público + Rate Limit Edge',
        'CI/CD: GitHub Actions',
      ],
      recruiterSection: {
        eyebrow: 'Para Reclutadores y Equipos de Talento',
        headline: 'Evalúa tu Vacante en Segundos',
        description:
          '¿Quieres saber rápido si les sirvo para el rol que buscan? Conecta mi MCP a tu modelo de IA —o prueba tu vacante directamente aquí abajo— para recibir un diagnóstico transparente basado en experiencia real.',
        steps: [
          {
            step: '01',
            title: 'Conecta mcp.santiago-jv.tech/mcp',
            detail:
              'Agrega la URL pública en Claude, Cursor, ChatGPT o VS Code. No requiere API keys, cuentas ni permisos previos.',
          },
          {
            step: '02',
            title: 'Pega la Descripción de tu Vacante',
            detail:
              'Pídele a tu IA que ejecute evaluate_vacancy_match pasando los requisitos, tecnologías, años y modalidad del puesto.',
          },
          {
            step: '03',
            title: 'Recibe un Resumen Ejecutivo Honesto',
            detail:
              'Obtén un puntaje de 0 a 100, evidencia concreta en GoodRec y Bolsiyo, posibles brechas de stack y mis enlaces de contacto directo.',
          },
        ],
        promptCardTitle: 'Prompt Listo para Reclutadores',
        promptCardSubtitle:
          'Una vez conectado mcp.santiago-jv.tech/mcp en tu IA (Claude, ChatGPT o Cursor), copia este prompt y pega tu vacante al final:',
        copyPromptBtn: 'Copiar Prompt',
        promptTemplate: `Usando el servidor santiago-jv-mcp, ejecuta la herramienta \`evaluate_vacancy_match\` (y \`get_work_experience\` si necesitas profundizar) para evaluar qué tanto match hace Santiago Olayo con nuestra vacante.

Dame un resumen ejecutivo claro con:
1. Puntaje de compatibilidad y veredicto directo (¿Nos sirve entrevistarlo para este rol? ¿Por qué?).
2. Principales habilidades de backend, cloud, producto o IA que coinciden, respaldadas por su trabajo real en GoodRec y Bolsiyo.
3. Cualquier brecha honesta de stack o modalidad que debamos validar en entrevista.
4. Su correo directo, LinkedIn y enlace para descargar su CV en PDF.

Descripción de la vacante:
[PEGA AQUÍ TU VACANTE]`,
        simulator: {
          title: 'Simulador Interactivo en Vivo · evaluate_vacancy_match',
          subtitle:
            '¿No tienes un cliente MCP abierto en este momento? Prueba el motor de evaluación directamente aquí con un ejemplo o pegando tu vacante:',
          presetsLabel: 'Cargar ejemplo:',
          presets: [
            {
              label: 'Senior Backend (NestJS / AWS)',
              role: 'Senior Backend Engineer',
              jd: 'Buscamos Senior Backend Engineer con 4+ años de experiencia en TypeScript, Node.js y NestJS. Dominio de Arquitectura Hexagonal, DDD, PostgreSQL, MongoDB, locks en Redis, AWS ECS, CI/CD con GitHub Actions y monitoreo en Datadog. Modalidad 100% Remoto.',
            },
            {
              label: 'Ingeniero IA & Internal Tools',
              role: 'Product Owner / AI Tooling Engineer',
              jd: 'Buscamos Ingeniero de Software Fullstack/Backend para liderar automatización de procesos internos con IA, servidores Model Context Protocol (MCP), reglas en Cloudflare AI Gateway y analítica de producto con CleverTap y Metabase. 4+ años, Remoto.',
            },
            {
              label: 'Otro Stack (Rust / K8s Presencial)',
              role: 'SRE Rust & Kubernetes',
              jd: 'Requerimos 8 años de experiencia programando en Rust y administrando clústeres Kubernetes e Istio de forma presencial en Madrid.',
            },
          ],
          rolePlaceholder: 'Título del cargo (ej. Senior Backend Engineer)',
          jdPlaceholder: 'Pega aquí los requisitos de la vacante, tecnologías, años de experiencia y modalidad...',
          evaluateBtn: 'Evaluar Compatibilidad',
          scoreLabel: 'Nivel de Match',
          matchedLabel: 'Habilidades Coincidentes en Producción',
          gapsLabel: 'Notas de Transparencia / Brechas',
          noGapsText: 'Sin brechas críticas de stack o modalidad frente a su perfil principal.',
        },
      },
      setupSection: {
        eyebrow: 'Conexión Rápida',
        headline: 'Conéctalo en 10 Segundos',
        description:
          'Selecciona tu herramienta de IA y copia el bloque de configuración. Funciona sobre Streamable HTTP estándar.',
        copySnippet: 'Copiar Configuración',
        clients: [
          {
            id: 'cursor',
            label: 'Cursor',
            badge: 'Recomendado para Devs',
            filename: '~/.cursor/mcp.json',
            steps: [
              'Abre Cursor Settings → Tools & MCP → Add New MCP Server (o edita ~/.cursor/mcp.json).',
              'Pega la configuración de abajo y guarda.',
              'Escribe en el chat de Cursor: "Usa santiago-jv-mcp para evaluar si Santiago encaja con esta vacante..."',
            ],
            snippet: `{
  "mcpServers": {
    "santiago-jv": {
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
          },
          {
            id: 'claude',
            label: 'Claude',
            badge: 'Claude.ai y Desktop',
            filename: 'Conectores Claude / claude_desktop_config.json',
            steps: [
              'En Claude.ai Web o Desktop (Configuración → Conectores / Integraciones → Agregar conector personalizado), pega directamente https://mcp.santiago-jv.tech/mcp.',
              'O en claude_desktop_config.json mediante mcp-remote:',
            ],
            snippet: `{
  "mcpServers": {
    "santiago-jv": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.santiago-jv.tech/mcp"
      ]
    }
  }
}`,
          },
          {
            id: 'chatgpt',
            label: 'ChatGPT / OpenAI',
            badge: 'Responses API y Conectores',
            filename: 'OpenAI MCP Tool Config',
            steps: [
              'En Conectores MCP de ChatGPT o en la Responses API de OpenAI, registra el endpoint remoto Streamable HTTP.',
              'No requiere encabezados de autenticación.',
            ],
            snippet: `{
  "type": "mcp",
  "server_label": "santiago_jv",
  "server_url": "https://mcp.santiago-jv.tech/mcp",
  "require_approval": "never"
}`,
          },
          {
            id: 'vscode',
            label: 'VS Code / Windsurf',
            badge: 'Copilot Agent Mode',
            filename: '.vscode/mcp.json',
            steps: [
              'Crea .vscode/mcp.json en tu proyecto con tipo "http".',
              'Usa GitHub Copilot Chat en modo Agente para consultar cualquiera de las herramientas.',
            ],
            snippet: `{
  "servers": {
    "santiago-jv": {
      "type": "http",
      "url": "https://mcp.santiago-jv.tech/mcp"
    }
  }
}`,
          },
          {
            id: 'curl',
            label: 'cURL / Inspector',
            badge: 'JSON-RPC Directo',
            filename: 'Terminal',
            steps: [
              'Verifica el servidor directamente desde tu terminal con cURL o con el MCP Inspector oficial.',
            ],
            snippet: `curl -X POST https://mcp.santiago-jv.tech/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'`,
          },
        ],
      },
      referenceSection: {
        eyebrow: 'Referencia Técnica',
        headline: 'Tools, Prompts y Resources',
        description:
          'Todas las capacidades expuestas en mcp.santiago-jv.tech cuentan con validación estricta en Zod y anotaciones de solo lectura.',
        toolsTitle: 'Herramientas / Tools (6)',
        promptsTitle: 'Prompts Predefinidos (3)',
        resourcesTitle: 'Recursos / Resources (4)',
        requiredBadge: 'requerido',
        optionalBadge: 'opcional',
        tools: [
          {
            name: 'evaluate_vacancy_match',
            badge: 'Estrella para Reclutadores',
            summary:
              'Evalúa una vacante (0–100) contra la experiencia real, stack técnico, seniority y modalidad de Santiago, entregando fortalezas probadas y brechas honestas.',
            params: [
              {
                name: 'job_description',
                type: 'string',
                required: true,
                description: 'Texto completo de la vacante o requisitos del rol (máx. 10,000 caracteres).',
              },
              {
                name: 'role_title',
                type: 'string',
                required: false,
                description: 'Nombre de la vacante (ej. "Senior Backend Engineer").',
              },
              {
                name: 'required_skills',
                type: 'string[]',
                required: false,
                description: 'Lista opcional de habilidades obligatorias a verificar.',
              },
              {
                name: 'modality',
                type: '"remote" | "hybrid" | "onsite"',
                required: false,
                description: 'Modalidad de trabajo de la vacante.',
              },
              {
                name: 'language',
                type: '"en" | "es"',
                required: false,
                description: 'Idioma del reporte (autodetectado si se omite).',
              },
            ],
          },
          {
            name: 'get_profile_overview',
            badge: 'Perfil y Resumen',
            summary:
              'Devuelve resumen profesional, titular, 4+ años de experiencia, ubicación/zona horaria (UTC-5), idiomas, educación y enlaces al CV en PDF.',
            params: [
              {
                name: 'language',
                type: '"en" | "es"',
                required: false,
                description: 'Idioma de respuesta ("en" o "es").',
              },
            ],
          },
          {
            name: 'get_work_experience',
            badge: 'Trayectoria Laboral',
            summary:
              'Historial detallado en GoodRec, Bolsiyo y Cooltivalo · +COTAS · SLS GROUPS con filtro opcional por empresa o dominio.',
            params: [
              {
                name: 'company',
                type: 'string',
                required: false,
                description: 'Filtro por empresa (ej. "GoodRec", "Bolsiyo").',
              },
              {
                name: 'focus',
                type: '"all" | "backend" | "ai-mcp" | "observability" | "product"',
                required: false,
                description: 'Filtro por área de ingeniería.',
              },
              {
                name: 'language',
                type: '"en" | "es"',
                required: false,
                description: 'Idioma ("en" o "es").',
              },
            ],
          },
          {
            name: 'get_tech_stack_and_architecture',
            badge: 'Stack y Arquitectura',
            summary:
              'Matriz de habilidades con años de uso en producción, evidencia concreta y principios de arquitectura (Hexagonal, DDD, Redis Locks, Datadog, MCP).',
            params: [
              {
                name: 'domain',
                type: '"all" | "backend" | "architecture" | "ai" | "cloud-observability" | "databases" | "product-analytics"',
                required: false,
                description: 'Categoría técnica a consultar.',
              },
              {
                name: 'language',
                type: '"en" | "es"',
                required: false,
                description: 'Idioma ("en" o "es").',
              },
            ],
          },
          {
            name: 'get_social_and_contact_links',
            badge: 'Redes y Contacto',
            summary:
              'Entrega correo oficial (contact@santiago-jv.tech), LinkedIn, GitHub, X, Medium, portafolio y CVs descargables en PDF (ES/EN).',
            params: [
              {
                name: 'include_resume_urls',
                type: 'boolean',
                required: false,
                description: 'Incluir enlaces directos a los PDF de Hoja de Vida.',
              },
            ],
          },
          {
            name: 'prepare_outreach_context',
            badge: 'Ficha ATS y Contacto',
            summary:
              'Genera una ficha resumen lista para ATS y un borrador de mensaje para invitar a Santiago a un proceso de selección.',
            params: [
              {
                name: 'company_name',
                type: 'string',
                required: true,
                description: 'Nombre de la empresa.',
              },
              {
                name: 'role_title',
                type: 'string',
                required: true,
                description: 'Título de la vacante.',
              },
              {
                name: 'recruiter_name',
                type: 'string',
                required: false,
                description: 'Nombre del reclutador o líder.',
              },
            ],
          },
        ],
        prompts: [
          {
            name: 'evaluate_candidate_fit',
            args: 'job_description, language?',
            description:
              'Guía al LLM del reclutador para ejecutar un dictamen ejecutivo completo sobre la vacante pegada.',
          },
          {
            name: 'technical_deep_dive',
            args: 'topic?',
            description:
              'Permite a CTOs y Tech Leads profundizar en arquitectura backend, concurrencia, observabilidad o MCP.',
          },
          {
            name: 'quick_intro',
            args: 'language?',
            description:
              'Resumen ejecutivo de 30 segundos con canales verificados de contacto.',
          },
        ],
        resources: [
          {
            uri: 'santiago://profile/resume-en',
            mimeType: 'text/markdown',
            description: 'Hoja de Vida completa en inglés en formato Markdown.',
          },
          {
            uri: 'santiago://profile/resume-es',
            mimeType: 'text/markdown',
            description: 'Hoja de Vida completa en español en formato Markdown.',
          },
          {
            uri: 'santiago://profile/architecture-blueprint',
            mimeType: 'application/json',
            description: 'Blueprint de arquitectura productiva en Cloud, Datos, Observabilidad e IA/MCP.',
          },
          {
            uri: 'santiago://profile/contact-card',
            mimeType: 'application/json',
            description: 'Tarjeta JSON verificada de contacto, redes y enlaces PDF.',
          },
        ],
      },
      architectureSection: {
        eyebrow: 'Arquitectura del Servidor',
        headline: 'Diseñado para el Edge Público',
        description:
          'Decisiones técnicas detrás de mcp.santiago-jv.tech para mantenerlo rápido, seguro, sin costos variables y sin fricción.',
        cards: [
          {
            tag: 'Modelo de Acceso',
            title: '¿Por qué Público de Solo Lectura y no Zero Trust?',
            body: 'Exigir login o tokens para consultar información profesional pública frena al 99% de los reclutadores. En su lugar, solo se exponen datos públicos curados de CV sin operaciones de escritura.',
          },
          {
            tag: 'Transporte',
            title: 'Streamable HTTP Stateless en Cloudflare Workers',
            body: 'Implementa WebStandardStreamableHTTPServerTransport sin sesiones colgadas, evitando caídas de SSE en firewalls corporativos y manteniendo latencias de milisegundos.',
          },
          {
            tag: 'Seguridad y Costo $0',
            title: 'Cero Exposición de Llaves LLM + Rate Limit por IP',
            body: 'evaluate_vacancy_match ejecuta un motor determinístico en el edge (<5ms) mientras el LLM propio del reclutador redacta el análisis, protegido con límite de 45 req/min por IP y tope de 32 KB.',
          },
          {
            tag: 'Despliegue Continuo',
            title: 'CI/CD Automatizado con GitHub Actions',
            body: 'Cada push a main ejecuta validación estricta de TypeScript, pruebas de protocolo MCP y despliegue automático con Wrangler hacia mcp.santiago-jv.tech.',
          },
        ],
      },
    },
  },
};

export interface BrowserMatchPreview {
  score: number;
  verdict: string;
  summary: string;
  matchedSkills: string[];
  gaps: string[];
}

const PREVIEW_SKILLS: Array<{ label: string; aliases: string[] }> = [
  { label: 'TypeScript (4.5y)', aliases: ['typescript', 'ts'] },
  { label: 'Node.js (4.5y)', aliases: ['node.js', 'nodejs', 'node'] },
  { label: 'NestJS (3y)', aliases: ['nestjs', 'nest.js'] },
  { label: 'Java & Spring Boot', aliases: ['java', 'spring boot', 'springboot'] },
  { label: 'Hexagonal Architecture & DDD', aliases: ['hexagonal', 'ddd', 'domain-driven', 'clean architecture', 'arquitectura hexagonal'] },
  { label: 'PostgreSQL & SQL', aliases: ['postgresql', 'postgres', 'sql', 'mysql'] },
  { label: 'MongoDB', aliases: ['mongodb', 'mongo', 'nosql'] },
  { label: 'Redis Distributed Locks', aliases: ['redis', 'locks', 'concurrency', 'concurrencia'] },
  { label: 'AWS & Serverless', aliases: ['aws', 'ecs', 'lambda', 's3', 'sqs', 'cloud functions', 'serverless'] },
  { label: 'Model Context Protocol (MCP)', aliases: ['mcp', 'model context protocol', 'ai tooling', 'llm', 'llms'] },
  { label: 'Cloudflare AI Gateway & Workers', aliases: ['cloudflare', 'ai gateway'] },
  { label: 'Datadog Observability', aliases: ['datadog', 'apm', 'observability', 'observabilidad', 'monitoreo'] },
  { label: 'CleverTap & Metabase Analytics', aliases: ['clevertap', 'metabase', 'analytics', 'analítica', 'kpis'] },
  { label: 'Docker & GitHub Actions CI/CD', aliases: ['docker', 'github actions', 'ci/cd', 'cicd'] },
  { label: 'End-to-End Product Ownership', aliases: ['product owner', 'stakeholders', 'scrum', 'agile', 'tech lead'] },
];

const PREVIEW_GAPS: Array<{ patterns: string[]; en: string; es: string }> = [
  {
    patterns: ['rust', 'golang'],
    en: 'Go / Rust: Core production depth is in TypeScript/Node.js/NestJS & Java/Spring Boot (language ramp-up needed).',
    es: 'Go / Rust: La experiencia principal en producción es en TypeScript/Node.js/NestJS y Java/Spring Boot.',
  },
  {
    patterns: ['kubernetes', 'k8s', 'istio'],
    en: 'Kubernetes SRE: Experienced with AWS ECS, Docker & Serverless rather than bare-metal K8s cluster administration.',
    es: 'Kubernetes SRE: Experiencia fuerte en AWS ECS, Docker y Serverless más que administración dedicada de clústeres K8s.',
  },
  {
    patterns: ['django', 'fastapi', 'pytorch'],
    en: 'Python / ML Training: Specializes in applied LLM/MCP integration & TypeScript/Java backends rather than Python frameworks.',
    es: 'Python / ML: Especializado en integración aplicada de LLMs/MCP y backends TypeScript/Java más que frameworks Python.',
  },
  {
    patterns: ['c#', '.net', 'dotnet'],
    en: '.NET / C#: Enterprise DDD experience is in NestJS and Spring Boot rather than .NET.',
    es: '.NET / C#: La experiencia empresarial con DDD está en NestJS y Spring Boot, no en .NET.',
  },
];

function escapeRx(v: string): string {
  return v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasWord(corpus: string, raw: string): boolean {
  if (raw === 'c#') return /(?:^|[\s,;/()])c#(?=$|[\s,;/().])/i.test(corpus);
  if (raw === '.net') return /(?:^|[\s,;/()])\.net(?=$|[\s,;/().])/i.test(corpus);
  return new RegExp(`(?:^|[^a-z0-9+#])${escapeRx(raw)}(?:$|[^a-z0-9+#])`, 'i').test(corpus);
}

export function runBrowserVacancyPreview(
  role: string,
  jd: string,
  locale: Locale
): BrowserMatchPreview {
  const corpus = `${role} \n ${jd}`.toLowerCase();
  const matchedSkills = PREVIEW_SKILLS.filter((item) =>
    item.aliases.some((a) => hasWord(corpus, a))
  ).map((item) => item.label);

  const gaps = PREVIEW_GAPS.filter((g) => g.patterns.some((p) => hasWord(corpus, p))).map((g) =>
    locale === 'es' ? g.es : g.en
  );

  const yearsMatch = corpus.match(/(\d{1,2})\s*\+?\s*(?:years?|yrs?|años?)/i);
  if (yearsMatch && Number.parseInt(yearsMatch[1], 10) >= 7) {
    gaps.push(
      locale === 'es'
        ? `La vacante menciona ${yearsMatch[1]}+ años; Santiago cuenta con 4.5+ años en producción con alcance Senior / Product Owner Engineer.`
        : `Role mentions ${yearsMatch[1]}+ years; Santiago brings 4.5+ years of high-ownership Senior / Product Owner Engineer production experience.`
    );
  }

  const isOnsiteElsewhere =
    (hasWord(corpus, 'on-site') || hasWord(corpus, 'onsite') || hasWord(corpus, 'presencial')) &&
    !hasWord(corpus, 'remote') &&
    !hasWord(corpus, 'remoto') &&
    !hasWord(corpus, 'barranquilla') &&
    !hasWord(corpus, 'santa marta');

  if (isOnsiteElsewhere) {
    gaps.push(
      locale === 'es'
        ? 'Modalidad presencial fuera de Barranquilla/Santa Marta: Santiago prioriza roles Remotos o en la Región Caribe.'
        : 'On-site location outside Barranquilla/Santa Marta: Santiago prioritizes Remote roles or Caribbean Colombia.'
    );
  }

  let base = 66;
  if (matchedSkills.length >= 6) base = 95;
  else if (matchedSkills.length >= 4) base = 89;
  else if (matchedSkills.length >= 2) base = 80;
  else if (matchedSkills.length === 1) base = 70;
  else base = 52;

  const score = Math.max(22, Math.min(98, base - gaps.length * 14));

  const verdict =
    locale === 'es'
      ? score >= 85
        ? 'Alto Match · Muy Recomendado para Entrevista'
        : score >= 70
          ? 'Buen Match · Sólida Base Compatible'
          : 'Match Parcial · Revisar Brechas de Stack o Modalidad'
      : score >= 85
        ? 'Strong Fit · Highly Recommended to Interview'
        : score >= 70
          ? 'Good Fit · Solid Core Alignment'
          : 'Partial Fit · Review Stack or Modality Differences';

  const summary =
    locale === 'es'
      ? score >= 70
        ? `Compatibilidad estimada del ${score}% para ${role || 'esta vacante'}. Coincidencia directa en ${matchedSkills.length} áreas clave de producción (GoodRec / Bolsiyo), sumando diferenciadores en MCP, Cloudflare AI Gateway, Datadog y ownership de producto.`
        : `Compatibilidad estimada del ${score}% para ${role || 'esta vacante'}. Cuenta con bases sólidas de ingeniería backend y cloud, pero existen requisitos específicos fuera de su stack o modalidad principal.`
      : score >= 70
        ? `Estimated ${score}% match for ${role || 'this role'}. Direct overlap across ${matchedSkills.length} production areas (GoodRec / Bolsiyo), amplified by hands-on MCP tooling, Cloudflare AI Gateway, Datadog APM, and end-to-end ownership.`
        : `Estimated ${score}% match for ${role || 'this role'}. Brings strong backend & cloud engineering fundamentals, though key primary requirements differ from his core stack or modality.`;

  return {
    score,
    verdict,
    summary,
    matchedSkills,
    gaps,
  };
}
