import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import { usePreferences } from '@/context/PreferencesContext';

const Header: React.FC = () => {
  const { content } = usePreferences();
  const headerContent = content.header;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderReady, setIsHeaderReady] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsHeaderReady(true);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNavItemClick = (href: string): void => {
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : ''} ${isHeaderReady ? styles['header--ready'] : ''}`}
      >
        <div className={styles.headerInner}>
          <a href="#about" aria-label={headerContent.brandAriaLabel} className={styles.brandLink}>
            <span className={styles.wordmark}>Santiago Olayo</span>
          </a>

          <nav
            id="site-menu"
            className={`${styles.header__navbar} ${isMenuOpen ? styles['header__navbar--open'] : ''}`}
          >
            <header className={styles.navbar__header}>
              <span className={styles.navbar__title}>{headerContent.drawerTitle}</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className={styles['navbar__close-icon']}
                aria-label={headerContent.closeMenuAriaLabel}
                type="button"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </header>

            <ul className={styles.navbar__items}>
              {headerContent.navLinks.map((item) => (
                <li key={item.href} className={styles.navbar__item}>
                  <button
                    className={styles.navbar__link}
                    type="button"
                    onClick={() => handleNavItemClick(item.href)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className={styles.navbar__ctaItem}>
                <a
                  href={headerContent.resumeHref}
                  download={headerContent.resumeDownloadName}
                  className={styles.resumeButton}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {headerContent.resumeLabel}
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.desktopCtaWrapper}>
            <a
              href={headerContent.resumeHref}
              download={headerContent.resumeDownloadName}
              className={styles.resumeButton}
            >
              {headerContent.resumeLabel}
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen((current) => !current)}
            className={styles['header__menu-button']}
            aria-label={headerContent.openMenuAriaLabel}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            type="button"
          >
            <i className="fa-solid fa-bars" aria-hidden="true"></i>
          </button>
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressBar} />
        </div>
      </header>

      <button
        type="button"
        onClick={() => setIsMenuOpen(false)}
        className={`${styles.background} ${isMenuOpen ? styles['background--show'] : ''}`}
        aria-label={headerContent.closeMenuAriaLabel}
      />
    </>
  );
};

export default Header;
