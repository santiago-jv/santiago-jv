import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import { NAVIGATION_LINKS } from '@/data/portfolio-content';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isHeaderReady, setIsHeaderReady] = useState(false);

  useEffect(() => {
    const SCROLL_DELTA = 8;
    const MIN_HIDE_OFFSET = 80;
    let lastScroll = window.pageYOffset;

    const handleScroll = (): void => {
      const currentScroll = window.pageYOffset;

      if (isMenuOpen || currentScroll <= MIN_HIDE_OFFSET) {
        setIsHeaderHidden(false);
        lastScroll = currentScroll;
        return;
      }

      if (Math.abs(currentScroll - lastScroll) < SCROLL_DELTA) {
        return;
      }

      setIsHeaderHidden(currentScroll > lastScroll);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

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
        className={`${styles.header} ${isHeaderHidden ? styles['header--hidden'] : ''} ${isHeaderReady ? styles['header--ready'] : ''}`}
      >
        <a href="#about" aria-label="Go to About section">
          <span className={styles.logo} aria-label="santiago-jv logo">
            <span className={styles.logoAccent}>&lt;</span>
            <span className={styles.logoText}>santiago-jv</span>
            <span className={styles.logoAccent}>/&gt;</span>
          </span>
        </a>

        <nav
          id="site-menu"
          className={`${styles.header__navbar} ${isMenuOpen ? styles['header__navbar--open'] : ''}`}
        >
          <header className={styles.navbar__header}>
            <h1 className={styles.navbar__title}>Menu</h1>
            <button
              onClick={() => setIsMenuOpen(false)}
              className={styles['navbar__close-icon']}
              aria-label="Close navigation menu"
              type="button"
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </header>

          <ul className={styles.navbar__items}>
            {NAVIGATION_LINKS.map((item) => (
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
          </ul>
        </nav>

        <button
          onClick={() => setIsMenuOpen((current) => !current)}
          className={styles['header__menu-button']}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          type="button"
        >
          <i className="fas fa-bars" aria-hidden="true"></i>
        </button>
      </header>

      <button
        type="button"
        onClick={() => setIsMenuOpen(false)}
        className={`${styles.background} ${isMenuOpen ? styles['background--show'] : ''}`}
        aria-label="Close navigation menu"
      />
    </>
  );
};

export default Header;
