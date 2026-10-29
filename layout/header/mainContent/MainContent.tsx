import type { CSSProperties } from 'react';
import styles from './main-content.module.css';
import { HERO_CONTENT } from '@/data/portfolio-content';

const MainContent: React.FC = () => {
  return (
    <main id="about" className={styles['main-content']}>
      <div className={`${styles.statusPill} ${styles.introItem} ${styles.delay1}`}>
        <span className={styles.statusDot} aria-hidden="true"></span>
        <span>{HERO_CONTENT.badgeText}</span>
      </div>

      <p className={`${styles['greeting-text']} ${styles.introItem} ${styles.delay1}`}>
        {HERO_CONTENT.greeting}
      </p>

      <h1 className={`${styles.title} ${styles.introItem} ${styles.delay2}`}>
        {HERO_CONTENT.name}
      </h1>

      <h2 className={`${styles.subtitle} ${styles.introItem} ${styles.delay2}`}>
        {HERO_CONTENT.role}
      </h2>

      <div className={`${styles.information} ${styles.introItem} ${styles.delay3}`}>
        <p className={styles.description}>{HERO_CONTENT.summary}</p>
      </div>

      <ul className={`${styles.highlightsRow} ${styles.introItem} ${styles.delay3}`} aria-label="Core stack">
        {HERO_CONTENT.highlights.map((item) => (
          <li key={item} className={styles.highlightPill}>
            {item}
          </li>
        ))}
      </ul>

      <div className={`${styles.actions} ${styles.introItem} ${styles.delay4}`}>
        <a
          href={HERO_CONTENT.primaryCta.href}
          download={HERO_CONTENT.primaryCta.download}
          target={HERO_CONTENT.primaryCta.href.startsWith('http') ? '_blank' : undefined}
          rel={HERO_CONTENT.primaryCta.href.startsWith('http') ? 'noreferrer noopener' : undefined}
          className={styles.button}
          aria-label={HERO_CONTENT.primaryCta.label}
        >
          {HERO_CONTENT.primaryCta.iconClassName && (
            <i className={`${HERO_CONTENT.primaryCta.iconClassName} ${styles.ctaIcon}`} aria-hidden="true"></i>
          )}
          {HERO_CONTENT.primaryCta.label}
        </a>

        <a
          href={HERO_CONTENT.secondaryCta.href}
          target={HERO_CONTENT.secondaryCta.href.startsWith('http') ? '_blank' : undefined}
          rel={HERO_CONTENT.secondaryCta.href.startsWith('http') ? 'noreferrer noopener' : undefined}
          className={styles['button-secondary']}
        >
          {HERO_CONTENT.secondaryCta.iconClassName && (
            <i className={`${HERO_CONTENT.secondaryCta.iconClassName} ${styles.ctaIcon}`} aria-hidden="true"></i>
          )}
          {HERO_CONTENT.secondaryCta.label}
        </a>

        {HERO_CONTENT.tertiaryCta && (
          <a href={HERO_CONTENT.tertiaryCta.href} className={styles['button-secondary']}>
            {HERO_CONTENT.tertiaryCta.iconClassName && (
              <i className={`${HERO_CONTENT.tertiaryCta.iconClassName} ${styles.ctaIcon}`} aria-hidden="true"></i>
            )}
            {HERO_CONTENT.tertiaryCta.label}
          </a>
        )}
      </div>

      <ul className={`${styles['social-list']} ${styles.delay5}`} aria-label="Social links">
        {HERO_CONTENT.socialLinks.map((social, index) => (
          <li
            key={social.platform}
            className={styles['social-item']}
            style={{ '--social-index': index } as CSSProperties}
          >
            <a
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : '_self'}
              rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
              className={styles['social-link']}
              aria-label={social.label}
              title={social.label}
            >
              <i className={social.iconClassName} aria-hidden="true"></i>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MainContent;
