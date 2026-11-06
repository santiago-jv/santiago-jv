import { Locale, SectionHeadingContent } from '@/types/portfolio';

export type IntegrationBrandId =
  | 'stripe'
  | 'refacil'
  | 'tusdatos'
  | 'datadog'
  | 'clevertap'
  | 'appsflyer'
  | 'retool'
  | 'slack'
  | 'intercom'
  | 'twilio'
  | 'sendgrid'
  | 'firebase';

export interface IntegrationItem {
  id: IntegrationBrandId;
  name: string;
  category: string;
  brandColor: string;
  brandTint: string;
  brandBorder: string;
  brandAccent?: string;
}

export interface IntegrationsLocaleContent {
  heading: SectionHeadingContent;
  items: IntegrationItem[];
}

export const INTEGRATIONS_CONTENT: Record<Locale, IntegrationsLocaleContent> = {
  en: {
    heading: {
      number: '03.',
      title: 'Third-Party Ecosystem',
      subtitle: 'Production Integrations',
      description:
        'Payment gateways, KYC compliance, observability, internal ops, team bots, and messaging platforms integrated in production.',
    },
    items: [
      {
        id: 'stripe',
        name: 'Stripe',
        category: 'Payments & Billing',
        brandColor: '#635BFF',
        brandTint: 'rgba(99, 91, 255, 0.085)',
        brandBorder: 'rgba(99, 91, 255, 0.24)',
      },
      {
        id: 'refacil',
        name: 'Refácil',
        category: 'Payments & Cash-In',
        brandColor: '#0B192C',
        brandTint: 'rgba(0, 184, 241, 0.09)',
        brandBorder: 'rgba(0, 184, 241, 0.28)',
        brandAccent: '#00B8F1',
      },
      {
        id: 'tusdatos',
        name: 'Tusdatos.co',
        category: 'KYC & Compliance',
        brandColor: '#00A4C2',
        brandTint: 'rgba(0, 164, 194, 0.09)',
        brandBorder: 'rgba(0, 164, 194, 0.25)',
      },
      {
        id: 'datadog',
        name: 'Datadog',
        category: 'APM & Observability',
        brandColor: '#632CA6',
        brandTint: 'rgba(99, 44, 166, 0.085)',
        brandBorder: 'rgba(99, 44, 166, 0.24)',
      },
      {
        id: 'clevertap',
        name: 'CleverTap',
        category: 'Product Events & Retention',
        brandColor: '#EF3B39',
        brandTint: 'rgba(239, 59, 57, 0.085)',
        brandBorder: 'rgba(239, 59, 57, 0.24)',
      },
      {
        id: 'appsflyer',
        name: 'AppsFlyer',
        category: 'Mobile Attribution',
        brandColor: '#0099E5',
        brandTint: 'rgba(0, 153, 229, 0.09)',
        brandBorder: 'rgba(0, 153, 229, 0.25)',
      },
      {
        id: 'retool',
        name: 'Retool',
        category: 'Internal Tools & Ops',
        brandColor: '#3C6BF2',
        brandTint: 'rgba(60, 107, 242, 0.085)',
        brandBorder: 'rgba(60, 107, 242, 0.24)',
      },
      {
        id: 'slack',
        name: 'Slack',
        category: 'Alerts & Internal Bots',
        brandColor: '#4A154B',
        brandTint: 'rgba(74, 21, 75, 0.075)',
        brandBorder: 'rgba(224, 30, 90, 0.22)',
      },
      {
        id: 'intercom',
        name: 'Intercom',
        category: 'Customer Messaging',
        brandColor: '#0057FF',
        brandTint: 'rgba(0, 87, 255, 0.08)',
        brandBorder: 'rgba(0, 87, 255, 0.22)',
      },
      {
        id: 'twilio',
        name: 'Twilio',
        category: 'SMS, WhatsApp & Voice',
        brandColor: '#F22F46',
        brandTint: 'rgba(242, 47, 70, 0.085)',
        brandBorder: 'rgba(242, 47, 70, 0.24)',
      },
      {
        id: 'sendgrid',
        name: 'SendGrid',
        category: 'Transactional Email',
        brandColor: '#1A82E2',
        brandTint: 'rgba(26, 130, 226, 0.085)',
        brandBorder: 'rgba(26, 130, 226, 0.24)',
      },
      {
        id: 'firebase',
        name: 'Firebase FCM',
        category: 'Mobile Push Notifications',
        brandColor: '#DD2C00',
        brandTint: 'rgba(255, 145, 0, 0.095)',
        brandBorder: 'rgba(221, 44, 0, 0.24)',
      },
    ],
  },
  es: {
    heading: {
      number: '03.',
      title: 'Ecosistema de Terceros',
      subtitle: 'Integraciones en producción',
      description:
        'Pasarelas de pago, validación KYC, observabilidad, herramientas internas, bots de alertas y mensajería integradas en producción.',
    },
    items: [
      {
        id: 'stripe',
        name: 'Stripe',
        category: 'Pagos y Suscripciones',
        brandColor: '#635BFF',
        brandTint: 'rgba(99, 91, 255, 0.085)',
        brandBorder: 'rgba(99, 91, 255, 0.24)',
      },
      {
        id: 'refacil',
        name: 'Refácil',
        category: 'Pasarela y Recaudos',
        brandColor: '#0B192C',
        brandTint: 'rgba(0, 184, 241, 0.09)',
        brandBorder: 'rgba(0, 184, 241, 0.28)',
        brandAccent: '#00B8F1',
      },
      {
        id: 'tusdatos',
        name: 'Tusdatos.co',
        category: 'Validación KYC y Listas',
        brandColor: '#00A4C2',
        brandTint: 'rgba(0, 164, 194, 0.09)',
        brandBorder: 'rgba(0, 164, 194, 0.25)',
      },
      {
        id: 'datadog',
        name: 'Datadog',
        category: 'Observabilidad y APM',
        brandColor: '#632CA6',
        brandTint: 'rgba(99, 44, 166, 0.085)',
        brandBorder: 'rgba(99, 44, 166, 0.24)',
      },
      {
        id: 'clevertap',
        name: 'CleverTap',
        category: 'Eventos y Retención',
        brandColor: '#EF3B39',
        brandTint: 'rgba(239, 59, 57, 0.085)',
        brandBorder: 'rgba(239, 59, 57, 0.24)',
      },
      {
        id: 'appsflyer',
        name: 'AppsFlyer',
        category: 'Atribución Móvil',
        brandColor: '#0099E5',
        brandTint: 'rgba(0, 153, 229, 0.09)',
        brandBorder: 'rgba(0, 153, 229, 0.25)',
      },
      {
        id: 'retool',
        name: 'Retool',
        category: 'Herramientas Internas y Ops',
        brandColor: '#3C6BF2',
        brandTint: 'rgba(60, 107, 242, 0.085)',
        brandBorder: 'rgba(60, 107, 242, 0.24)',
      },
      {
        id: 'slack',
        name: 'Slack',
        category: 'Alertas y Bots Internos',
        brandColor: '#4A154B',
        brandTint: 'rgba(74, 21, 75, 0.075)',
        brandBorder: 'rgba(224, 30, 90, 0.22)',
      },
      {
        id: 'intercom',
        name: 'Intercom',
        category: 'Mensajería y Soporte',
        brandColor: '#0057FF',
        brandTint: 'rgba(0, 87, 255, 0.08)',
        brandBorder: 'rgba(0, 87, 255, 0.22)',
      },
      {
        id: 'twilio',
        name: 'Twilio',
        category: 'SMS, WhatsApp y Voz',
        brandColor: '#F22F46',
        brandTint: 'rgba(242, 47, 70, 0.085)',
        brandBorder: 'rgba(242, 47, 70, 0.24)',
      },
      {
        id: 'sendgrid',
        name: 'SendGrid',
        category: 'Correos Transaccionales',
        brandColor: '#1A82E2',
        brandTint: 'rgba(26, 130, 226, 0.085)',
        brandBorder: 'rgba(26, 130, 226, 0.24)',
      },
      {
        id: 'firebase',
        name: 'Firebase FCM',
        category: 'Notificaciones Push (FCM)',
        brandColor: '#DD2C00',
        brandTint: 'rgba(255, 145, 0, 0.095)',
        brandBorder: 'rgba(221, 44, 0, 0.24)',
      },
    ],
  },
};
