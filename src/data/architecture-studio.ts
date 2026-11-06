import type { Locale } from '@/types/portfolio';

export interface StudioNode {
  id: string;
  title: string;
  subtitle: string;
  roleTag: string;
  summary: string;
  chips: string[];
  streamLabel?: string;
  stepNumber?: string;
}

export type StudioTopology =
  | 'cloud-mesh'
  | 'release-pipeline'
  | 'telemetry-bus'
  | 'mcp-hub';

export interface StudioDomainTab {
  id: 'cloud' | 'cicd' | 'observability' | 'ai';
  topology: StudioTopology;
  tabLabel: string;
  shortTabLabel: string;
  windowContext: string;
  statusBadge: string;
  /**
   * 4 interactive nodes tailored to each domain's real topology:
   * - 'cloud-mesh':       [0]=Edge/API GW, [1]=ECS Core, [2]=Async Workers, [3]=Redis Locks & DBs (with Worker->DB link)
   * - 'release-pipeline': [0]=01 Quality Gates -> [1]=02 Build & ECR -> [2]=03 Safe DB Migrations -> [3]=04 ECS Deploy
   * - 'telemetry-bus':    [0]=Live App & DBs -> 3 parallel streams ([1]=Datadog, [2]=CleverTap, [3]=Metabase)
   * - 'mcp-hub':          [0]=AI Hosts & Skills <-> [1]=MCP Server Runtime -> ([2]=Workflow Tools, [3]=Context & Rules)
   */
  nodes: [StudioNode, StudioNode, StudioNode, StudioNode];
}

export interface ArchitectureStudioCopy {
  menuApp: string;
  helperHint: string;
  replayLabel: string;
  tabs: StudioDomainTab[];
}

export const ARCHITECTURE_STUDIO_CONTENT: Record<Locale, ArchitectureStudioCopy> = {
  en: {
    menuApp: 'Architecture Studio',
    helperHint: 'Switch domains below or click any node on screen to inspect.',
    replayLabel: 'Replay lid',
    tabs: [
      {
        id: 'cloud',
        topology: 'cloud-mesh',
        tabLabel: 'Cloud, ECS & Async',
        shortTabLabel: 'Cloud & ECS',
        windowContext: 'aws · us-east-1 · ecs-cluster',
        statusBadge: 'ECS + SQS · Active',
        nodes: [
          {
            id: 'api-gw',
            title: 'Edge & API Gateway',
            subtitle: 'Cloudflare WAF · AWS API GW',
            roleTag: 'Perimeter & Ingress',
            summary:
              'Cloudflare DNS and WAF perimeter protection in front of AWS API Gateway for authentication, rate control, and REST routing.',
            chips: ['Cloudflare WAF', 'AWS API Gateway', 'JWT / Auth', 'REST APIs'],
          },
          {
            id: 'ecs-core',
            title: 'ECS Microservices',
            subtitle: 'NestJS · Spring Boot · DDD',
            roleTag: 'Core Domain Compute',
            summary:
              'Containerized backend services on AWS ECS and Cloud Functions structured with Hexagonal Architecture (Ports & Adapters) and DDD.',
            chips: ['AWS ECS', 'NestJS', 'Spring Boot', 'Hexagonal / DDD'],
          },
          {
            id: 'async-queues',
            title: 'Queues & Async Workers',
            subtitle: 'SQS · EventBridge · BullMQ',
            roleTag: 'Async Processing',
            summary:
              'Decoupled background workers handling webhooks, notifications, and heavy jobs with DLQ retry policies and idempotent consumers.',
            chips: ['AWS SQS / SNS', 'EventBridge', 'BullMQ', 'Idempotency'],
          },
          {
            id: 'data-locks',
            title: 'Redis Locks & Databases',
            subtitle: 'Redis · PostgreSQL · MongoDB',
            roleTag: 'Concurrency & Persistence',
            summary:
              'Shared persistence for APIs and async workers, using atomic Redis distributed locks to prevent race conditions alongside tuned SQL/NoSQL stores.',
            chips: ['Redis Locks', 'PostgreSQL', 'MongoDB'],
          },
        ],
      },
      {
        id: 'cicd',
        topology: 'release-pipeline',
        tabLabel: 'CI/CD & GitHub Actions',
        shortTabLabel: 'CI/CD',
        windowContext: 'github-actions · sequential rollout',
        statusBadge: '4 Stages · Passing',
        nodes: [
          {
            id: 'pr-checks',
            stepNumber: '01',
            title: 'PR & Quality Gates',
            subtitle: 'Types · Tests · Code Review',
            roleTag: 'Stage 01 · Verify',
            summary:
              'Every pull request runs strict TypeScript typechecking, automated unit/integration tests, and peer review before merging to main.',
            chips: ['TypeScript', 'Automated Tests', 'Code Review'],
          },
          {
            id: 'gh-actions',
            stepNumber: '02',
            title: 'Docker Build & ECR',
            subtitle: 'GitHub Actions · Immutable Tag',
            roleTag: 'Stage 02 · Package',
            summary:
              'GitHub Actions builds multi-stage Docker images tagged by commit SHA and pushes immutable container artifacts to AWS ECR.',
            chips: ['GitHub Actions', 'Docker', 'AWS ECR'],
          },
          {
            id: 'db-migrations',
            stepNumber: '03',
            title: 'Safe DB Migrations',
            subtitle: 'Expand Schema · Zero-Downtime',
            roleTag: 'Stage 03 · Migrate First',
            summary:
              'Backward-compatible PostgreSQL and MongoDB schema migrations run before new containers receive traffic so live requests never break.',
            chips: ['Expand / Contract', 'PostgreSQL', 'MongoDB'],
          },
          {
            id: 'ecs-deploy',
            stepNumber: '04',
            title: 'ECS Rolling Deploy',
            subtitle: 'Healthchecks · Auto-Rollback',
            roleTag: 'Stage 04 · Release',
            summary:
              'Progressive task replacement across AWS ECS and Cloud Functions gated by live healthchecks and Datadog monitors.',
            chips: ['AWS ECS', 'Healthchecks', 'Zero Downtime'],
          },
        ],
      },
      {
        id: 'observability',
        topology: 'telemetry-bus',
        tabLabel: 'Datadog & Product Data',
        shortTabLabel: 'Datadog & Data',
        windowContext: 'telemetry · events · sql-bi',
        statusBadge: '3 Streams · Live',
        nodes: [
          {
            id: 'prod-stack-source',
            title: 'Backend, App & DBs',
            subtitle: 'NestJS · Mobile · PostgreSQL',
            roleTag: 'Signal & Data Origin',
            summary:
              'Production services, mobile apps, and relational databases emitting independent streams for SRE observability, product events, and SQL BI.',
            chips: ['NestJS APIs', 'Mobile SDKs', 'PostgreSQL'],
          },
          {
            id: 'datadog-apm',
            title: 'Datadog Observability',
            subtitle: 'APM · Logs · SLA Alerts',
            streamLabel: 'APM · Logs',
            roleTag: 'Engineering Reliability',
            summary:
              'Ingests distributed APM traces, structured logs, and service metrics directly from backend and queue workers for alerting and incident debugging.',
            chips: ['Datadog APM', 'Alerts & Monitors', 'Incident Debug'],
          },
          {
            id: 'clevertap',
            title: 'CleverTap Analytics',
            subtitle: 'Events · Funnels · Retention',
            streamLabel: 'Domain Events',
            roleTag: 'Product Behavior',
            summary:
              'Receives user actions and domain events directly from mobile and backend flows to track conversion funnels, cohorts, and retention.',
            chips: ['CleverTap', 'Event Funnels', 'Retention'],
          },
          {
            id: 'metabase',
            title: 'Metabase & SQL BI',
            subtitle: 'SQL · Product · Ops · Finance',
            streamLabel: 'SQL Replicas',
            roleTag: 'Business Intelligence',
            summary:
              'Queries PostgreSQL read replicas and analytical SQL models so Product, Operations, and Finance make decisions backed by real data.',
            chips: ['Metabase', 'SQL Read Models', 'KPIs'],
          },
        ],
      },
      {
        id: 'ai',
        topology: 'mcp-hub',
        tabLabel: 'AI, MCP & Workers',
        shortTabLabel: 'AI & MCP',
        windowContext: 'json-rpc · cloudflare-workers · mcp',
        statusBadge: 'Streamable HTTP · Live',
        nodes: [
          {
            id: 'llm-clients-skills',
            title: 'AI Hosts & Area Skills',
            subtitle: 'Claude · Codex · Team Skills',
            roleTag: 'LLM Clients & Skills',
            summary:
              'Connecting Claude, Codex, Antigravity, and Cursor with focused plugins, prompting rules, and domain skills per internal team area.',
            chips: ['Claude & Codex', 'Custom Skills', 'Prompt Rules'],
          },
          {
            id: 'cf-workers',
            title: 'MCP Server Runtime',
            subtitle: 'Cloudflare Workers · TS SDK',
            roleTag: 'Bidirectional JSON-RPC',
            summary:
              'Stateless MCP servers on Cloudflare Workers and internal Node runtimes handling Streamable HTTP, Zod schema validation, and rate limits.',
            chips: ['Cloudflare Workers', 'MCP Protocol', 'Zod Guardrails'],
          },
          {
            id: 'internal-apis-flows',
            title: 'Workflow & Ops Tools',
            subtitle: 'APIs · Retool · Slack Bots',
            roleTag: 'Action Execution',
            summary:
              'Typed MCP tools replacing repetitive manual tasks across Operations, Support, and Product with safe, audited backend actions.',
            chips: ['Workflow Automation', 'Internal APIs', 'Ops & Support'],
          },
          {
            id: 'domain-context',
            title: 'Resources & Evaluators',
            subtitle: 'Docs · SQL · Vacancy Fit',
            roleTag: 'Read-Safe Context',
            summary:
              'Exposing structured MCP resources, runbooks, and deterministic edge evaluators so AI responses stay grounded in real system data.',
            chips: ['MCP Resources', 'Deterministic Fit', 'Read-Only SQL'],
          },
        ],
      },
    ],
  },
  es: {
    menuApp: 'Architecture Studio',
    helperHint: 'Cambia de dominio abajo o haz clic en cualquier nodo en pantalla para ver el detalle.',
    replayLabel: 'Repetir apertura',
    tabs: [
      {
        id: 'cloud',
        topology: 'cloud-mesh',
        tabLabel: 'Cloud, ECS & Colas',
        shortTabLabel: 'Cloud & ECS',
        windowContext: 'aws · us-east-1 · ecs-cluster',
        statusBadge: 'ECS + SQS · Activo',
        nodes: [
          {
            id: 'api-gw',
            title: 'Edge & API Gateway',
            subtitle: 'Cloudflare WAF · AWS API GW',
            roleTag: 'Perímetro y Entrada',
            summary:
              'Protección perimetral y DNS en Cloudflare delante de AWS API Gateway para autenticación, control de tráfico y enrutamiento REST.',
            chips: ['Cloudflare WAF', 'AWS API Gateway', 'JWT / Auth', 'REST APIs'],
          },
          {
            id: 'ecs-core',
            title: 'Microservicios ECS',
            subtitle: 'NestJS · Spring Boot · DDD',
            roleTag: 'Cómputo de Dominio',
            summary:
              'Microservicios contenerizados en AWS ECS y Cloud Functions estructurados bajo Arquitectura Hexagonal (Puertos y Adaptadores) y DDD.',
            chips: ['AWS ECS', 'NestJS', 'Spring Boot', 'Hexagonal / DDD'],
          },
          {
            id: 'async-queues',
            title: 'Colas y Workers Async',
            subtitle: 'SQS · EventBridge · BullMQ',
            roleTag: 'Procesamiento Async',
            summary:
              'Workers desacoplados en segundo plano para webhooks, notificaciones y tareas pesadas con políticas DLQ y consumidores idempotentes.',
            chips: ['AWS SQS / SNS', 'EventBridge', 'BullMQ', 'Idempotencia'],
          },
          {
            id: 'data-locks',
            title: 'Locks Redis y Bases',
            subtitle: 'Redis · PostgreSQL · MongoDB',
            roleTag: 'Concurrencia y Estado',
            summary:
              'Capa de persistencia compartida por APIs y workers async, usando locks atómicos en Redis contra race conditions junto a SQL/NoSQL.',
            chips: ['Redis Locks', 'PostgreSQL', 'MongoDB'],
          },
        ],
      },
      {
        id: 'cicd',
        topology: 'release-pipeline',
        tabLabel: 'CI/CD & GitHub Actions',
        shortTabLabel: 'CI/CD',
        windowContext: 'github-actions · despliegue secuencial',
        statusBadge: '4 Etapas · OK',
        nodes: [
          {
            id: 'pr-checks',
            stepNumber: '01',
            title: 'PR & Quality Gates',
            subtitle: 'Tipado · Tests · Code Review',
            roleTag: 'Etapa 01 · Verificación',
            summary:
              'Cada pull request ejecuta chequeo estricto de TypeScript, pruebas automatizadas y revisión de código antes de integrarse a main.',
            chips: ['TypeScript', 'Automated Tests', 'Code Review'],
          },
          {
            id: 'gh-actions',
            stepNumber: '02',
            title: 'Build Docker & ECR',
            subtitle: 'GitHub Actions · SHA Tag',
            roleTag: 'Etapa 02 · Empaquetado',
            summary:
              'GitHub Actions construye imágenes Docker multi-etapa versionadas por commit y publica el artefacto inmutable en AWS ECR.',
            chips: ['GitHub Actions', 'Docker', 'AWS ECR'],
          },
          {
            id: 'db-migrations',
            stepNumber: '03',
            title: 'Migraciones Seguras',
            subtitle: 'Expand Schema · Zero-Downtime',
            roleTag: 'Etapa 03 · Migrar Primero',
            summary:
              'Las migraciones retrocompatibles en PostgreSQL y MongoDB corren antes de rotar contenedores para nunca romper el tráfico activo.',
            chips: ['Expand / Contract', 'PostgreSQL', 'MongoDB'],
          },
          {
            id: 'ecs-deploy',
            stepNumber: '04',
            title: 'Rolling Deploy en ECS',
            subtitle: 'Healthchecks · Auto-Rollback',
            roleTag: 'Etapa 04 · Lanzamiento',
            summary:
              'Reemplazo progresivo de tareas en AWS ECS y Cloud Functions validado por healthchecks en vivo y monitores de Datadog.',
            chips: ['AWS ECS', 'Healthchecks', 'Zero Downtime'],
          },
        ],
      },
      {
        id: 'observability',
        topology: 'telemetry-bus',
        tabLabel: 'Datadog & Analítica',
        shortTabLabel: 'Datadog & Data',
        windowContext: 'telemetry · events · sql-bi',
        statusBadge: '3 Flujos · Activos',
        nodes: [
          {
            id: 'prod-stack-source',
            title: 'Backend, App y BDs',
            subtitle: 'NestJS · Móvil · PostgreSQL',
            roleTag: 'Origen de Señales y Datos',
            summary:
              'Servicios en producción, apps móviles y bases relacionales emitiendo flujos independientes hacia observabilidad SRE, eventos de producto y BI.',
            chips: ['NestJS APIs', 'SDKs Móviles', 'PostgreSQL'],
          },
          {
            id: 'datadog-apm',
            title: 'Datadog Observability',
            subtitle: 'APM · Logs · Alertas SLA',
            streamLabel: 'APM · Logs',
            roleTag: 'Fiabilidad de Ingeniería',
            summary:
              'Recibe trazas distribuidas APM, logs estructurados y métricas directo desde el backend y workers para alertas e investigación de incidentes.',
            chips: ['Datadog APM', 'Alertas y Monitores', 'Incident Debug'],
          },
          {
            id: 'clevertap',
            title: 'CleverTap Analytics',
            subtitle: 'Eventos · Embudos · Retención',
            streamLabel: 'Eventos SDK',
            roleTag: 'Comportamiento de Producto',
            summary:
              'Recibe acciones de usuario y eventos de dominio desde la app y el backend para medir embudos de conversión, cohortes y retención.',
            chips: ['CleverTap', 'Funnels', 'Retención'],
          },
          {
            id: 'metabase',
            title: 'Metabase & SQL BI',
            subtitle: 'SQL · Producto · Ops · Finanzas',
            streamLabel: 'Consultas SQL',
            roleTag: 'Inteligencia de Negocio',
            summary:
              'Consulta réplicas de lectura en PostgreSQL y modelos SQL directamente para que Producto, Operaciones y Finanzas decidan con datos reales.',
            chips: ['Metabase', 'SQL Analytics', 'KPIs'],
          },
        ],
      },
      {
        id: 'ai',
        topology: 'mcp-hub',
        tabLabel: 'IA, MCP & Workers',
        shortTabLabel: 'IA & MCP',
        windowContext: 'json-rpc · cloudflare-workers · mcp',
        statusBadge: 'Streamable HTTP · Vivo',
        nodes: [
          {
            id: 'llm-clients-skills',
            title: 'Hosts IA y Skills',
            subtitle: 'Claude · Codex · Skills Área',
            roleTag: 'Clientes LLM y Skills',
            summary:
              'Conexión de Claude, Codex, Antigravity y Cursor con plugins enfocados, reglas de prompting y skills diseñados para cada área del equipo.',
            chips: ['Claude & Codex', 'Custom Skills', 'Prompt Rules'],
          },
          {
            id: 'cf-workers',
            title: 'Runtime Servidor MCP',
            subtitle: 'Cloudflare Workers · TS SDK',
            roleTag: 'JSON-RPC Bidireccional',
            summary:
              'Servidores MCP sin estado en Cloudflare Workers y Node gestionando Streamable HTTP, validación Zod y guardrails por IP.',
            chips: ['Cloudflare Workers', 'Protocolo MCP', 'Zod Guardrails'],
          },
          {
            id: 'internal-apis-flows',
            title: 'Tools de Flujos y Ops',
            subtitle: 'APIs · Retool · Bots Slack',
            roleTag: 'Ejecución de Acciones',
            summary:
              'Tools MCP tipadas que reemplazan tareas manuales repetitivas en Operaciones, Soporte y Producto por acciones seguras en el backend.',
            chips: ['Automatización', 'Internal APIs', 'Ops & Soporte'],
          },
          {
            id: 'domain-context',
            title: 'Recursos y Evaluadores',
            subtitle: 'Docs · SQL · Match Vacantes',
            roleTag: 'Contexto de Solo Lectura',
            summary:
              'Exposición controlada de recursos MCP, documentación técnica y evaluadores determinísticos para anclar las respuestas de IA en datos reales.',
            chips: ['MCP Resources', 'Scoring Determinístico', 'SQL Lectura'],
          },
        ],
      },
    ],
  },
};
