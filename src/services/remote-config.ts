export interface RemotePublicSiteConfig {
  version: string;
  updatedAt: string;
  source: 'neon-postgres' | 'default-fallback';
  domains: {
    primaryDomain: string;
    portfolioUrl: string;
    aiConsoleUrl: string;
    apiUrl: string;
    mcpUrl: string;
    mcpDocsUrl: string;
    allowedOrigins: string[];
  };
  social: {
    contactEmail: string;
    xHandle: string;
    xUrl: string;
    linkedinHandle: string;
    linkedinUrl: string;
    githubHandle: string;
    githubUrl: string;
    mediumHandle: string;
    mediumUrl: string;
  };
  career: {
    resumeEnUrl: string;
    resumeEsUrl: string;
    availabilityStatus: string;
    workModalitiesEn: string;
    workModalitiesEs: string;
    locationEn: string;
    locationEs: string;
  };
}

let cachedConfig: RemotePublicSiteConfig | null = null;
let cachedAtMs = 0;
const CACHE_TTL_MS = 60_000;

export async function fetchRemoteSiteConfig(
  endpoint = 'https://api.santiago-jv.tech/v1/config/public'
): Promise<RemotePublicSiteConfig | null> {
  const now = Date.now();
  if (cachedConfig && now - cachedAtMs < CACHE_TTL_MS) {
    return cachedConfig;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1800);

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) return cachedConfig;
    const raw = (await response.json()) as RemotePublicSiteConfig & {
      config?: RemotePublicSiteConfig;
    };
    const data: RemotePublicSiteConfig = raw?.config
      ? {
          ...raw.config,
          version: raw.config.version || '1.0',
          updatedAt: raw.updatedAt || raw.config.updatedAt || new Date().toISOString(),
          source: raw.source || raw.config.source || 'neon-postgres',
        }
      : raw;
    if (data && data.social?.contactEmail && data.domains?.primaryDomain) {
      cachedConfig = data;
      cachedAtMs = now;
      return data;
    }
    return cachedConfig;
  } catch {
    return cachedConfig;
  } finally {
    clearTimeout(timeout);
  }
}
