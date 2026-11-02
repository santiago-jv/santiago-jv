import React, { useEffect } from 'react';

export function useApplePageMotion(dependencyKey?: string): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
    const updateScrollMetrics = (): void => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const heroProgress = Math.min(1, Math.max(0, scrollY / 560));
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pageProgress = Math.min(1, Math.max(0, scrollY / docHeight));

      document.documentElement.style.setProperty('--hero-progress', heroProgress.toFixed(4));
      document.documentElement.style.setProperty('--page-progress', pageProgress.toFixed(4));
      rafId = 0;
    };

    const onScroll = (): void => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScrollMetrics);
      }
    };

    updateScrollMetrics();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      clearTimers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
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
