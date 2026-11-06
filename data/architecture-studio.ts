import { Locale } from '@/types/portfolio';

export interface StudioNode {
  id: string;
  title: string;
  subtitle: string;
  roleTag: string;
  summary: string;
  chips: string[];
  streamLabel?: string;
}

export interface StudioDomainTab {
  id: 'cloud' | 'cicd' | 'observability' | 'ai';
  topology: 'pipeline-split' | 'telemetry-bus';
  tabLabel: string;
  shortTabLabel: string;
  windowContext: string;
  statusBadge: string;
  /**
   * 4 interactive nodes:
   * - 'pipeline-split': [0]=Left Ingress, [1]=Center Core, [2]=Top-Right, [3]=Bottom-Right
   * - 'telemetry-bus':  [0]=Left Source Stack, [1]=Top Sink, [2]=Middle Sink, [3]=Bottom Sink
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
        topology: 'pipeline-split',
        tabLabel: 'Cloud, ECS & Async',
        shortTabLabel: 'Cloud & ECS',
        windowContext: 'aws · us-east-1 · ecs-cluster',
        statusBadge: 'ECS + SQS · Active',
        nodes: [
          {
            id: 'api-gw',
            title: 'AWS API Gateway',
            subtitle: 'Cloudflare · DNS · REST',
            roleTag: 'DNS & Ingress',
            summary:
              'Cloudflare DNS management and perimeter protection paired with AWS API Gateway routing, auth, and traffic control.',
            chips: ['Cloudflare & DNS', 'AWS API Gateway', 'WAF / SSL', 'REST APIs'],
          },
          {
            id: 'ecs-core',
            title: 'ECS Microservices',
            subtitle: 'NestJS · Spring Boot · DDD',
            roleTag: 'Core Compute',
            summary:
              'Containerized services on AWS ECS and Cloud Functions structured with Hexagonal Architecture & DDD.',
            chips: ['AWS ECS', 'NestJS', 'Spring Boot', 'Hexagonal / DDD'],
          },
          {
            id: 'async-queues',
            title: 'Queues & Event Bus',
            subtitle: 'SQS · EventBridge · BullMQ',
            roleTag: 'Async & Event-Driven',
            summary:
              'Asynchronous decoupling, background workers, DLQ retry policies, and idempotent event consumers.',
            chips: ['AWS SQS / SNS', 'EventBridge', 'BullMQ', 'RabbitMQ'],
          },
          {
            id: 'data-locks',
            title: 'Data & Redis Locks',
            subtitle: 'PostgreSQL · MongoDB · Redis',
            roleTag: 'State & Concurrency',
            summary:
              'Race-condition prevention via atomic Redis distributed locks and tuned SQL/NoSQL queries.',
            chips: ['Redis Locks', 'PostgreSQL', 'MongoDB'],
          },
        ],
      },
      {
        id: 'cicd',
        topology: 'pipeline-split',
        tabLabel: 'CI/CD & GitHub Actions',
        shortTabLabel: 'CI/CD',
        windowContext: 'github-actions · main -> prod',
        statusBadge: 'Pipeline · Passing',
        nodes: [
          {
            id: 'pr-checks',
            title: 'PR & Quality Gates',
            subtitle: 'Tests · Types · Reviews',
            roleTag: 'Verification',
            summary:
              'Strict TypeScript checks, automated test suites, and peer code reviews before every merge.',
            chips: ['Automated Tests', 'TypeScript', 'Code Review'],
          },
          {
            id: 'gh-actions',
            title: 'GitHub Actions CI/CD',
            subtitle: 'Workflows · Docker · ECR',
            roleTag: 'Build & Orchestration',
            summary:
              'Automated CI/CD workflows building multi-stage Docker images and publishing artifacts to AWS.',
            chips: ['GitHub Actions', 'Docker', 'AWS ECR', 'CI/CD'],
          },
          {
            id: 'db-migrations',
            title: 'Safe DB Migrations',
            subtitle: 'Zero-Downtime · Schemas',
            roleTag: 'Data Evolution',
            summary:
              'Backward-compatible schema migrations in PostgreSQL and MongoDB without interrupting live traffic.',
            chips: ['Schema Migrations', 'PostgreSQL', 'MongoDB'],
          },
          {
            id: 'ecs-deploy',
            title: 'ECS & Cloud Deploy',
            subtitle: 'Rolling · Healthchecks',
            roleTag: 'Production Rollout',
            summary:
              'Progressive rollouts across AWS ECS tasks and Cloud Functions with automated healthchecks.',
            chips: ['AWS ECS', 'Cloud Functions', 'Zero Downtime'],
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
        topology: 'pipeline-split',
        tabLabel: 'AI, MCP & Workers',
        shortTabLabel: 'AI & MCP',
        windowContext: 'cloudflare-workers · mcp',
        statusBadge: 'MCP Agents · Live',
        nodes: [
          {
            id: 'llm-clients-skills',
            title: 'LLMs & Area Skills',
            subtitle: 'Claude · Codex · Plugins',
            roleTag: 'AI Clients & Skills',
            summary:
              'Connecting preferred LLMs with focused plugins, prompting rules, and skills tailored to each internal team area.',
            chips: ['Custom Skills', 'Team Plugins', 'Prompt Rules'],
          },
          {
            id: 'cf-workers',
            title: 'MCP & Edge Workers',
            subtitle: 'Cloudflare Workers · HTTP',
            roleTag: 'Protocol & Edge Runtime',
            summary:
              'Stateless MCP servers on Cloudflare Workers and internal runtimes handling Streamable HTTP, Zod schema validation, and rate limits.',
            chips: ['Cloudflare Workers', 'MCP', 'Streamable HTTP'],
          },
          {
            id: 'internal-apis-flows',
            title: 'Internal APIs & Flows',
            subtitle: 'Ops · Support · Automation',
            roleTag: 'Workflow Execution',
            summary:
              'Replacing repetitive manual tasks across Operations, Support, and Product with safe, tool-driven backend actions.',
            chips: ['Workflow Automation', 'Internal Tools', 'Ops & Support'],
          },
          {
            id: 'domain-context',
            title: 'Context & Data Tools',
            subtitle: 'Docs · SQL · Evaluators',
            roleTag: 'Structured Context',
            summary:
              'Exposing read-safe resources, domain documentation, and deterministic evaluators to ground AI responses in real data.',
            chips: ['MCP Resources', 'Zod Schemas', 'Guardrails'],
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
        topology: 'pipeline-split',
        tabLabel: 'Cloud, ECS & Colas',
        shortTabLabel: 'Cloud & ECS',
        windowContext: 'aws · us-east-1 · ecs-cluster',
        statusBadge: 'ECS + SQS · Activo',
        nodes: [
          {
            id: 'api-gw',
            title: 'AWS API Gateway',
            subtitle: 'Cloudflare · DNS · REST',
            roleTag: 'DNS y Entrada',
            summary:
              'Gestión de DNS y seguridad perimetral en Cloudflare junto con enrutamiento, auth y control de tráfico en AWS API Gateway.',
            chips: ['Cloudflare & DNS', 'AWS API Gateway', 'WAF / SSL', 'REST APIs'],
          },
          {
            id: 'ecs-core',
            title: 'Microservicios ECS',
            subtitle: 'NestJS · Spring Boot · DDD',
            roleTag: 'Cómputo Principal',
            summary:
              'Microservicios contenerizados en AWS ECS y Cloud Functions bajo Arquitectura Hexagonal y DDD.',
            chips: ['AWS ECS', 'NestJS', 'Spring Boot', 'Hexagonal / DDD'],
          },
          {
            id: 'async-queues',
            title: 'Colas y Eventos Async',
            subtitle: 'SQS · EventBridge · BullMQ',
            roleTag: 'Event-Driven',
            summary:
              'Desacoplamiento asíncrono, workers en segundo plano, políticas DLQ e idempotencia.',
            chips: ['AWS SQS / SNS', 'EventBridge', 'BullMQ', 'RabbitMQ'],
          },
          {
            id: 'data-locks',
            title: 'Datos y Locks Redis',
            subtitle: 'PostgreSQL · MongoDB · Redis',
            roleTag: 'Estado y Concurrencia',
            summary:
              'Prevención de race conditions con locks atómicos en Redis y optimización de consultas SQL/NoSQL.',
            chips: ['Redis Locks', 'PostgreSQL', 'MongoDB'],
          },
        ],
      },
      {
        id: 'cicd',
        topology: 'pipeline-split',
        tabLabel: 'CI/CD & GitHub Actions',
        shortTabLabel: 'CI/CD',
        windowContext: 'github-actions · main -> prod',
        statusBadge: 'Pipeline · OK',
        nodes: [
          {
            id: 'pr-checks',
            title: 'PR & Quality Gates',
            subtitle: 'Tests · Tipado · Reviews',
            roleTag: 'Calidad de Código',
            summary:
              'Validación estricta de TypeScript, pruebas automatizadas y code reviews antes de cada merge.',
            chips: ['Automated Tests', 'TypeScript', 'Code Review'],
          },
          {
            id: 'gh-actions',
            title: 'GitHub Actions CI/CD',
            subtitle: 'Workflows · Docker · ECR',
            roleTag: 'Build y Orquestación',
            summary:
              'Workflows automatizados que construyen imágenes Docker y publican artefactos hacia AWS.',
            chips: ['GitHub Actions', 'Docker', 'AWS ECR', 'CI/CD'],
          },
          {
            id: 'db-migrations',
            title: 'Migraciones Seguras',
            subtitle: 'Zero-Downtime · Esquemas',
            roleTag: 'Evolución de Datos',
            summary:
              'Migraciones compatibles de esquemas en PostgreSQL y MongoDB sin afectar el tráfico en vivo.',
            chips: ['Migraciones SQL/NoSQL', 'PostgreSQL', 'MongoDB'],
          },
          {
            id: 'ecs-deploy',
            title: 'Despliegue ECS & Cloud',
            subtitle: 'Rolling · Healthchecks',
            roleTag: 'Paso a Producción',
            summary:
              'Rollouts progresivos en tareas de AWS ECS y Cloud Functions con healthchecks automáticos.',
            chips: ['AWS ECS', 'Cloud Functions', 'Zero Downtime'],
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
        topology: 'pipeline-split',
        tabLabel: 'IA, MCP & Workers',
        shortTabLabel: 'IA & MCP',
        windowContext: 'cloudflare-workers · mcp',
        statusBadge: 'MCP · En Vivo',
        nodes: [
          {
            id: 'llm-clients-skills',
            title: 'LLMs y Skills por Área',
            subtitle: 'Claude · Codex · Plugins',
            roleTag: 'Clientes IA y Skills',
            summary:
              'Conexión de nuestros LLMs de preferencia con plugins enfocados, reglas de prompting y skills especializados para cada área del equipo.',
            chips: ['Custom Skills', 'Team Plugins', 'Prompt Rules'],
          },
          {
            id: 'cf-workers',
            title: 'MCP & Edge Workers',
            subtitle: 'Cloudflare Workers · HTTP',
            roleTag: 'Protocolo y Runtime Edge',
            summary:
              'Servidores MCP sin estado en Cloudflare Workers y tooling interno gestionando Streamable HTTP, esquemas Zod y guardrails por IP.',
            chips: ['Cloudflare Workers', 'MCP', 'Streamable HTTP'],
          },
          {
            id: 'internal-apis-flows',
            title: 'APIs y Flujos Internos',
            subtitle: 'Ops · Soporte · Automatización',
            roleTag: 'Ejecución Operativa',
            summary:
              'Migración de tareas manuales repetitivas en Operaciones, Soporte y Producto hacia acciones asistidas y seguras sobre el backend.',
            chips: ['Automatización', 'Internal Tools', 'Ops & Soporte'],
          },
          {
            id: 'domain-context',
            title: 'Contexto y Datos MCP',
            subtitle: 'Docs · SQL · Evaluadores',
            roleTag: 'Contexto Estructurado',
            summary:
              'Exposición controlada de recursos, documentación técnica y evaluadores determinísticos para respaldar respuestas de IA con datos reales.',
            chips: ['MCP Resources', 'Esquemas Zod', 'Guardrails'],
          },
        ],
      },
    ],
  },
};
