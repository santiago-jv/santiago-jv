import type { CSSProperties } from 'react';
import styles from './main-content.module.css';
import { usePreferences } from '@/context/PreferencesContext';

const MainContent: React.FC = () => {
  const { content } = usePreferences();
  const hero = content.hero;

  return (
    <main id="about" className={styles['main-content']}>
      <p className={`${styles['greeting-text']} ${styles.introItem} ${styles.delay1}`}>
        {hero.greeting}
      </p>

      <h1 className={`${styles.title} ${styles.introItem} ${styles.delay2}`}>
        {hero.name}
      </h1>

      <h2 className={`${styles.subtitle} ${styles.introItem} ${styles.delay2}`}>
        {hero.role}
      </h2>

      <div className={`${styles.information} ${styles.introItem} ${styles.delay3}`}>
        <p className={styles.description}>{hero.summary}</p>
      </div>

      <ul
        className={`${styles.highlightsRow} ${styles.introItem} ${styles.delay3}`}
        aria-label={hero.coreStackAriaLabel}
      >
        {hero.highlights.map((item) => (
          <li key={item} className={styles.highlightPill}>
            {item}
          </li>
        ))}
      </ul>

      <div className={`${styles.actions} ${styles.introItem} ${styles.delay4}`}>
        <a
          href={hero.primaryCta.href}
          download={hero.primaryCta.download}
          target={hero.primaryCta.href.startsWith('http') ? '_blank' : undefined}
          rel={hero.primaryCta.href.startsWith('http') ? 'noreferrer noopener' : undefined}
          className={styles.button}
          aria-label={hero.primaryCta.label}
        >
          {hero.primaryCta.iconClassName && (
            <i className={`${hero.primaryCta.iconClassName} ${styles.ctaIcon}`} aria-hidden="true"></i>
          )}
          {hero.primaryCta.label}
        </a>

        <a
          href={hero.secondaryCta.href}
          target={hero.secondaryCta.href.startsWith('http') ? '_blank' : undefined}
          rel={hero.secondaryCta.href.startsWith('http') ? 'noreferrer noopener' : undefined}
          className={styles['button-secondary']}
        >
          {hero.secondaryCta.iconClassName && (
            <i className={`${hero.secondaryCta.iconClassName} ${styles.ctaIcon}`} aria-hidden="true"></i>
          )}
          {hero.secondaryCta.label}
        </a>

        {hero.tertiaryCta && (
          <a href={hero.tertiaryCta.href} className={styles['button-secondary']}>
            {hero.tertiaryCta.iconClassName && (
              <i className={`${hero.tertiaryCta.iconClassName} ${styles.ctaIcon}`} aria-hidden="true"></i>
            )}
            {hero.tertiaryCta.label}
          </a>
        )}
      </div>

      <ul className={`${styles['social-list']} ${styles.delay5}`} aria-label={hero.socialLinksAriaLabel}>
        {hero.socialLinks.map((social, index) => (
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
