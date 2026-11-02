import { Locale } from '@/types/portfolio';

export interface StudioNode {
  id: string;
  title: string;
  subtitle: string;
  roleTag: string;
  summary: string;
  chips: string[];
}

export interface StudioDomainTab {
  id: 'cloud' | 'cicd' | 'observability' | 'ai';
  tabLabel: string;
  shortTabLabel: string;
  windowContext: string;
  statusBadge: string;
  /** Always 4 nodes: [0]=Left Ingress, [1]=Center Core, [2]=Top-Right, [3]=Bottom-Right */
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
        tabLabel: 'Datadog & Product Data',
        shortTabLabel: 'Datadog & Data',
        windowContext: 'datadog-apm · 99.98% sla',
        statusBadge: 'Monitors · Healthy',
        nodes: [
          {
            id: 'telemetry-ingest',
            title: 'Service Telemetry',
            subtitle: 'Logs · Spans · Events',
            roleTag: 'Instrumentation',
            summary:
              'Correlated structured logs, trace IDs, and domain events emitted across backend and queues.',
            chips: ['Structured Logs', 'Trace Context', 'Metrics'],
          },
          {
            id: 'datadog-apm',
            title: 'Datadog Observability',
            subtitle: 'APM · Tracing · Alerting',
            roleTag: 'Production Reliability',
            summary:
              'Distributed tracing across microservices, proactive SLA alerting, and live incident investigation.',
            chips: ['Datadog APM', 'Alerts & Monitors', 'Incident Debug'],
          },
          {
            id: 'clevertap',
            title: 'CleverTap Analytics',
            subtitle: 'Funnels · Events · Retention',
            roleTag: 'Product Behavior',
            summary:
              'Tracking real-time user journeys, conversion funnels, and feature adoption metrics.',
            chips: ['CleverTap', 'Event Funnels', 'Retention'],
          },
          {
            id: 'metabase',
            title: 'Metabase & BI',
            subtitle: 'SQL · Product · Ops · Finance',
            roleTag: 'Business Impact',
            summary:
              'SQL models and dashboards giving Product, Ops, and Finance real data to guide the roadmap.',
            chips: ['Metabase', 'SQL Analytics', 'KPIs'],
          },
        ],
      },
      {
        id: 'ai',
        tabLabel: 'AI, MCP & Gateway',
        shortTabLabel: 'AI & MCP',
        windowContext: 'cloudflare-ai-gateway · mcp',
        statusBadge: 'MCP Agents · Live',
        nodes: [
          {
            id: 'team-workflows',
            title: 'Internal Team Flows',
            subtitle: 'Ops · Support · Product',
            roleTag: 'Operational Need',
            summary:
              'Transforming repetitive manual processes into reliable AI-assisted internal workflows.',
            chips: ['Process Automation', 'Internal Tools', 'Ops & Support'],
          },
          {
            id: 'ai-gateway',
            title: 'Cloudflare AI Gateway',
            subtitle: 'Prompts · Routing · Logs',
            roleTag: 'AI Governance',
            summary:
              'Centralized prompting rules, multi-provider LLM routing, rate control, and request auditing.',
            chips: ['Cloudflare AI Gateway', 'Prompt Rules', 'LLM Routing'],
          },
          {
            id: 'mcp-servers',
            title: 'MCP Internal Tooling',
            subtitle: 'Model Context Protocol',
            roleTag: 'Context & Tools',
            summary:
              'Custom MCP tooling connecting preferred LLMs safely with internal APIs, docs, and databases.',
            chips: ['MCP', 'TypeScript', 'Tool Calling'],
          },
          {
            id: 'team-skills',
            title: 'Area Plugins & Skills',
            subtitle: 'Focused Domain Capabilities',
            roleTag: 'Team Acceleration',
            summary:
              'Specialized plugins and skills tailored for each internal team area to ship and operate faster.',
            chips: ['Custom Skills', 'Team Plugins', 'LLMs'],
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
        tabLabel: 'Datadog & Analítica',
        shortTabLabel: 'Datadog & Data',
        windowContext: 'datadog-apm · 99.98% sla',
        statusBadge: 'Monitores · Sanos',
        nodes: [
          {
            id: 'telemetry-ingest',
            title: 'Telemetría y Eventos',
            subtitle: 'Logs · Spans · Eventos',
            roleTag: 'Instrumentación',
            summary:
              'Logs estructurados con trace IDs y emisión de eventos desde microservicios y colas.',
            chips: ['Structured Logs', 'Trace IDs', 'Métricas'],
          },
          {
            id: 'datadog-apm',
            title: 'Datadog Observability',
            subtitle: 'APM · Tracing · Alertas',
            roleTag: 'Fiabilidad en Prod',
            summary:
              'Trazabilidad distribuida entre servicios, alertas proactivas e investigación de incidentes.',
            chips: ['Datadog APM', 'Alertas y Monitores', 'Incident Debug'],
          },
          {
            id: 'clevertap',
            title: 'Eventos en CleverTap',
            subtitle: 'Embudos · Uso · Retención',
            roleTag: 'Analítica de Producto',
            summary:
              'Medición de eventos de producto, embudos de conversión y adopción de nuevas funcionalidades.',
            chips: ['CleverTap', 'Funnels', 'Retención'],
          },
          {
            id: 'metabase',
            title: 'Decisiones en Metabase',
            subtitle: 'SQL · Producto · Ops · BI',
            roleTag: 'Impacto de Negocio',
            summary:
              'Consultas SQL y tableros para respaldar decisiones junto a Producto, Operaciones y Finanzas.',
            chips: ['Metabase', 'SQL Analytics', 'KPIs'],
          },
        ],
      },
      {
        id: 'ai',
        tabLabel: 'IA, MCP & Gateway',
        shortTabLabel: 'IA & MCP',
        windowContext: 'cloudflare-ai-gateway · mcp',
        statusBadge: 'MCP · En Vivo',
        nodes: [
          {
            id: 'team-workflows',
            title: 'Flujos de Equipos',
            subtitle: 'Ops · Soporte · Producto',
            roleTag: 'Problema Real',
            summary:
              'Migración de procesos manuales repetitivos hacia flujos internos asistidos por IA.',
            chips: ['Automatización', 'Internal Tools', 'Ops & Soporte'],
          },
          {
            id: 'ai-gateway',
            title: 'Cloudflare AI Gateway',
            subtitle: 'Prompts · Routing · Logs',
            roleTag: 'Gobernanza de IA',
            summary:
              'Gestión centralizada de prompting rules, enrutamiento hacia LLMs y trazabilidad de uso.',
            chips: ['Cloudflare AI Gateway', 'Prompting Rules', 'LLM Routing'],
          },
          {
            id: 'mcp-servers',
            title: 'Tooling con MCP',
            subtitle: 'Model Context Protocol',
            roleTag: 'Conectividad LLM',
            summary:
              'Herramientas internas con MCP para conectar nuestros LLMs de preferencia con servicios y datos.',
            chips: ['MCP', 'TypeScript', 'Tool Calling'],
          },
          {
            id: 'team-skills',
            title: 'Plugins y Skills por Área',
            subtitle: 'Capacidades por Equipo',
            roleTag: 'Productividad',
            summary:
              'Plugins y skills enfocados en cada área interna del equipo para operar y entregar más rápido.',
            chips: ['Custom Skills', 'Team Plugins', 'LLMs'],
          },
        ],
      },
    ],
  },
};
