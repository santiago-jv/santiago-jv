type IdleCallbackHandle = number;

function scheduleWhenIdle(callback: () => void): void {
  const win = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => IdleCallbackHandle;
  };

  if (typeof win.requestIdleCallback === 'function') {
    win.requestIdleCallback(callback, { timeout: 300 });
    return;
  }

  window.setTimeout(callback, 16);
}

function initPageMotion(): void {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  if (
    !window.location.hash ||
    window.location.hash === '#contact' ||
    window.location.hash === '#about'
  ) {
    window.scrollTo(0, 0);
    if (window.location.hash === '#contact') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }

  scheduleWhenIdle(() => {
    const prefersReducedMotion = Boolean(
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-apple-reveal]'));

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.setAttribute('data-apple-reveal', 'visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.setAttribute('data-apple-reveal', 'visible');
              observer.unobserve(target);

              window.setTimeout(() => {
                target.style.removeProperty('--reveal-delay');
              }, 950);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -36px 0px',
        }
      );

      elements.forEach((el) => {
        if (el.getAttribute('data-apple-reveal') !== 'visible') {
          observer.observe(el);
        }
      });
    }

    const progressBarEl = document.querySelector<HTMLElement>('[data-scroll-progress-bar]');
    if (!progressBarEl) return;

    let rafId = 0;
    let cachedScrollableHeight = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );

    const updateScrollMetrics = (): void => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const pageProgress = Math.min(1, Math.max(0, scrollY / cachedScrollableHeight));
      progressBarEl.style.transform = `scale3d(${pageProgress.toFixed(4)}, 1, 1)`;
      rafId = 0;
    };

    const onScroll = (): void => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScrollMetrics);
      }
    };

    const onResize = (): void => {
      cachedScrollableHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    updateScrollMetrics();
  });
}

initPageMotion();
