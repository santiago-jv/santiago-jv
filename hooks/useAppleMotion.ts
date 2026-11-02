import React, { useEffect } from 'react';

type IdleCallbackHandle = number;

function scheduleWhenIdle(callback: () => void): () => void {
  const win = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => IdleCallbackHandle;
    cancelIdleCallback?: (id: IdleCallbackHandle) => void;
  };

  if (typeof win.requestIdleCallback === 'function') {
    const id = win.requestIdleCallback(callback, { timeout: 300 });
    return () => win.cancelIdleCallback?.(id);
  }

  const timer = window.setTimeout(callback, 16);
  return () => window.clearTimeout(timer);
}

export function useApplePageMotion(dependencyKey?: string): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cleanupInner: (() => void) | undefined;

    const cancelIdle = scheduleWhenIdle(() => {
      const prefersReducedMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-apple-reveal]'));

      if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
        elements.forEach((el) => el.setAttribute('data-apple-reveal', 'visible'));
        return;
      }

      const clearTimers: number[] = [];

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.setAttribute('data-apple-reveal', 'visible');
              observer.unobserve(target);

              const timerId = window.setTimeout(() => {
                target.style.removeProperty('--reveal-delay');
              }, 950);
              clearTimers.push(timerId);
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

      let rafId = 0;
      let cachedScrollableHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );

      const updateScrollMetrics = (): void => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const heroProgress = Math.min(1, Math.max(0, scrollY / 560));
        const pageProgress = Math.min(1, Math.max(0, scrollY / cachedScrollableHeight));

        document.documentElement.style.setProperty('--hero-progress', heroProgress.toFixed(4));
        document.documentElement.style.setProperty('--page-progress', pageProgress.toFixed(4));
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

      cleanupInner = () => {
        observer.disconnect();
        clearTimers.forEach((id) => window.clearTimeout(id));
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
      };
    });

    return () => {
      cancelIdle();
      cleanupInner?.();
    };
  }, [dependencyKey]);
}

export function handleAppleCardSpotlight(event: React.MouseEvent<HTMLElement>): void {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  target.style.setProperty('--spot-x', `${x}px`);
  target.style.setProperty('--spot-y', `${y}px`);
}
