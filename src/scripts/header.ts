function initHeader(): void {
  const headerEl = document.querySelector<HTMLElement>('[data-site-header]');
  const navEl = document.querySelector<HTMLElement>('[data-site-nav]');
  const backdropEl = document.querySelector<HTMLElement>('[data-menu-backdrop]');
  const menuToggleBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menuCloseBtns = document.querySelectorAll<HTMLElement>('[data-menu-close]');
  const navButtons = document.querySelectorAll<HTMLButtonElement>('[data-nav-href]');
  const smoothAnchors = document.querySelectorAll<HTMLAnchorElement>('[data-smooth-anchor]');

  if (!headerEl) return;

  const isHomePage = headerEl.dataset.homePage === 'true';
  const homeBase = headerEl.dataset.homeBase || '/';
  let isMenuOpen = false;
  let isScrolled = false;

  const setMenuOpen = (open: boolean): void => {
    isMenuOpen = open;
    const state = open ? 'true' : 'false';
    if (navEl) navEl.dataset.open = state;
    if (backdropEl) backdropEl.dataset.open = state;
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', state);
  };

  const handleScroll = (): void => {
    const nextScrolled = (window.scrollY || window.pageYOffset || 0) > 16;
    if (nextScrolled !== isScrolled) {
      isScrolled = nextScrolled;
      headerEl.dataset.scrolled = nextScrolled ? 'true' : 'false';
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen) {
      setMenuOpen(false);
    }
  });

  menuToggleBtn?.addEventListener('click', () => {
    setMenuOpen(!isMenuOpen);
  });

  menuCloseBtns.forEach((el) => {
    el.addEventListener('click', () => setMenuOpen(false));
  });

  backdropEl?.addEventListener('click', () => setMenuOpen(false));

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const href = btn.dataset.navHref || '';
      setMenuOpen(false);
      if (!href) return;

      if (href.startsWith('/')) {
        window.location.href = href;
        return;
      }

      if (isHomePage && href.startsWith('#')) {
        const section = document.querySelector(href);
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = `${homeBase}${href}`;
      }
    });
  });

  smoothAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href') || '';
      if (isHomePage && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

initHeader();
