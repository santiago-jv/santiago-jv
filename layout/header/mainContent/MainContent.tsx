import type { CSSProperties } from 'react';
import styles from './main-content.module.css';
import { HERO_CONTENT } from '@/data/portfolio-content';

const MainContent: React.FC = () => {
  return (
    <main id="about" className={styles['main-content']}>
      <h1 className={`${styles['greeting-text']} ${styles['red-text']} ${styles.introItem} ${styles.delay1}`}>
        {HERO_CONTENT.greeting}
      </h1>

      <h2 className={`${styles.title} ${styles.introItem} ${styles.delay2}`}>
        {HERO_CONTENT.name}
      </h2>

      <h2 className={`${styles.subtitle} ${styles.introItem} ${styles.delay2}`}>
        {HERO_CONTENT.role}
      </h2>

      <div className={`${styles.information} ${styles.introItem} ${styles.delay3}`}>
        <p className={styles.description}>{HERO_CONTENT.summary}</p>
      </div>

      <div className={`${styles.actions} ${styles.introItem} ${styles.delay4}`}>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={HERO_CONTENT.primaryCta.href}
          className={styles.button}
          aria-label={HERO_CONTENT.primaryCta.label}
        >
          {HERO_CONTENT.primaryCta.label}
        </a>

        <a href={HERO_CONTENT.secondaryCta.href} className={styles['button-secondary']}>
          {HERO_CONTENT.secondaryCta.label}
        </a>
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
