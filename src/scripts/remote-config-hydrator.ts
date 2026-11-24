import type { RemotePublicSiteConfig } from '@/services/remote-config';

const STORAGE_KEY = 'sjv_remote_cfg_v1';
const CACHE_MAX_AGE_MS = 120_000;
const CONFIG_ENDPOINT = 'https://api.santiago-jv.tech/v1/config/public';

interface CachedPayload {
  ts: number;
  cfg: RemotePublicSiteConfig;
}

function applyRemoteConfigToDom(cfg: RemotePublicSiteConfig): void {
  if (!cfg || !cfg.social || !cfg.domains || !cfg.career) return;

  const { social, domains, career } = cfg;

  const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href]');
  anchors.forEach((a) => {
    const rawHref = a.getAttribute('href') || '';

    if (rawHref.startsWith('mailto:')) {
      a.setAttribute('href', `mailto:${social.contactEmail}`);
      if (a.textContent && a.textContent.includes('@')) {
        a.textContent = a.textContent.replace(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
          social.contactEmail
        );
      }
      return;
    }

    if (rawHref.includes('x.com/') || rawHref.includes('twitter.com/')) {
      a.setAttribute('href', social.xUrl);
      if (a.textContent && a.textContent.includes('@')) {
        a.textContent = a.textContent.replace(/@[a-zA-Z0-9_]+/g, social.xHandle);
      }
      return;
    }

    if (rawHref.includes('linkedin.com/in/')) {
      a.setAttribute('href', social.linkedinUrl);
      return;
    }

    if (rawHref.includes('github.com/santiago-jv') && !rawHref.includes('github.com/santiago-jv/')) {
      a.setAttribute('href', social.githubUrl);
      return;
    }

    if (rawHref.includes('medium.com/@')) {
      a.setAttribute('href', social.mediumUrl);
      return;
    }

    if (rawHref.includes('Santiago_Olayo_Villamil_CV_EN.pdf')) {
      a.setAttribute('href', career.resumeEnUrl);
      return;
    }

    if (rawHref.includes('Santiago_Olayo_Villamil_CV_ES.pdf')) {
      a.setAttribute('href', career.resumeEsUrl);
      return;
    }

    if (rawHref.includes('ai.santiago-jv.')) {
      try {
        const currentUrl = new URL(rawHref);
        const targetBase = new URL(domains.aiConsoleUrl);
        currentUrl.protocol = targetBase.protocol;
        currentUrl.host = targetBase.host;
        a.setAttribute('href', currentUrl.toString());
      } catch {
        a.setAttribute('href', domains.aiConsoleUrl);
      }
      return;
    }

    if (rawHref.includes('mcp.santiago-jv.')) {
      if (rawHref.includes('/docs')) {
        a.setAttribute('href', domains.mcpDocsUrl);
      } else {
        a.setAttribute('href', domains.mcpUrl);
      }
    }
  });
}

async function hydrateRemoteConfig(): Promise<void> {
  if (typeof window === 'undefined' || navigator.webdriver) return;

  try {
    const rawCached = window.sessionStorage.getItem(STORAGE_KEY);
    if (rawCached) {
      const parsed = JSON.parse(rawCached) as CachedPayload;
      if (parsed?.cfg && Date.now() - parsed.ts < CACHE_MAX_AGE_MS) {
        applyRemoteConfigToDom(parsed.cfg);
        return;
      }
    }
  } catch {
    // ignore storage errors
  }

  try {
    const res = await fetch(CONFIG_ENDPOINT, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return;
    const raw = (await res.json()) as RemotePublicSiteConfig & {
      config?: RemotePublicSiteConfig;
    };
    const cfg = raw?.config ?? raw;
    if (cfg?.social?.contactEmail) {
      applyRemoteConfigToDom(cfg);
      try {
        window.sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ts: Date.now(), cfg } satisfies CachedPayload)
        );
      } catch {
        // ignore quota errors
      }
    }
  } catch {
    // graceful static fallback
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      void hydrateRemoteConfig();
    });
  } else {
    void hydrateRemoteConfig();
  }
}
