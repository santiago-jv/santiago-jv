function prefersReducedMotion(): boolean {
  return Boolean(
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function supportsScrollTimeline(): boolean {
  return Boolean(
    typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline: scroll()') &&
      CSS.supports('animation-range: 0% 100%')
  );
}

function initHeader(): void {
  const headerEl = document.querySelector<HTMLElement>('[data-site-header]');
  const navEl = document.querySelector<HTMLElement>('[data-site-nav]');
  const backdropEl = document.querySelector<HTMLElement>('[data-menu-backdrop]');
  const menuToggleBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menuCloseBtn = navEl?.querySelector<HTMLButtonElement>('[data-menu-close]') || null;
  const menuCloseBtns = document.querySelectorAll<HTMLElement>('[data-menu-close]');
  const navLinks = document.querySelectorAll<HTMLElement>('[data-nav-href]');
  const smoothAnchors = document.querySelectorAll<HTMLAnchorElement>('[data-smooth-anchor]');

  if (!headerEl) return;

  const isHomePage = headerEl.dataset.homePage === 'true';
  const homeBase = headerEl.dataset.homeBase || '/';
  let isMenuOpen = false;
  let isScrolled = false;

  const getBackgroundSiblings = (): HTMLElement[] =>
    Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement &&
        el !== headerEl &&
        el !== backdropEl &&
        el.tagName !== 'SCRIPT'
    );

  const syncDrawerInertState = (): void => {
    const isMobileViewport = window.innerWidth < 860;
    if (navEl) {
      navEl.inert = isMobileViewport && !isMenuOpen;
    }
    const lockBackground = isMobileViewport && isMenuOpen;
    getBackgroundSiblings().forEach((el) => {
      el.inert = lockBackground;
    });
  };

  const setMenuOpen = (open: boolean, options?: { restoreFocus?: boolean }): void => {
    const wasOpen = isMenuOpen;
    isMenuOpen = open;
    const state = open ? 'true' : 'false';
    if (navEl) navEl.dataset.open = state;
    if (backdropEl) backdropEl.dataset.open = state;
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', state);

    syncDrawerInertState();

    if (open && !wasOpen && window.innerWidth < 860) {
      window.requestAnimationFrame(() => {
        menuCloseBtn?.focus();
      });
    } else if (!open && wasOpen && options?.restoreFocus) {
      menuToggleBtn?.focus();
    }
  };

  syncDrawerInertState();
  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth >= 860 && isMenuOpen) {
        setMenuOpen(false);
      } else {
        syncDrawerInertState();
      }
    },
    { passive: true }
  );

  // Progressive fallback: only attach main-thread scroll listener if CSS scroll-driven animations are unsupported
  if (!supportsScrollTimeline()) {
    const handleScroll = (): void => {
      const nextScrolled = (window.scrollY || window.pageYOffset || 0) > 16;
      if (nextScrolled !== isScrolled) {
        isScrolled = nextScrolled;
        headerEl.dataset.scrolled = nextScrolled ? 'true' : 'false';
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen) {
      event.preventDefault();
      setMenuOpen(false, { restoreFocus: true });
    }
  });

  menuToggleBtn?.addEventListener('click', () => {
    setMenuOpen(!isMenuOpen, { restoreFocus: isMenuOpen });
  });

  menuCloseBtns.forEach((el) => {
    el.addEventListener('click', () => {
      const isCloseIcon = el === menuCloseBtn;
      setMenuOpen(false, { restoreFocus: isCloseIcon });
    });
  });

  backdropEl?.addEventListener('click', () => setMenuOpen(false, { restoreFocus: true }));

  const scrollToHash = (href: string, event?: Event): void => {
    if (isHomePage && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        event?.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    }
  };

  navLinks.forEach((el) => {
    el.addEventListener('click', (event) => {
      const href = el.dataset.navHref || '';
      setMenuOpen(false);
      if (!href) return;

      if (href.startsWith('#')) {
        if (isHomePage) {
          scrollToHash(href, event);
        } else if (el.tagName !== 'A') {
          window.location.href = `${homeBase}${href}`;
        }
      } else if (href.startsWith('/') && el.tagName !== 'A') {
        window.location.href = href;
      }
    });
  });

  smoothAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href') || '';
      scrollToHash(href, event);
    });
  });
}

initHeader();
