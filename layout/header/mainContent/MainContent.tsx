import type { CSSProperties } from 'react';
import styles from './main-content.module.css';
import { usePreferences } from '@/context/PreferencesContext';

function splitLeadSentence(text: string): { lead: string; rest: string } {
  const dotIdx = text.indexOf('. ');
  if (dotIdx === -1) {
    return { lead: text, rest: '' };
  }
  return {
    lead: text.slice(0, dotIdx + 1),
    rest: text.slice(dotIdx + 1),
  };
}

const MainContent: React.FC = () => {
  const { locale, content } = usePreferences();
  const hero = content.hero;
  const { lead, rest } = splitLeadSentence(hero.summary);

  const eyebrowLabel =
    locale === 'es'
      ? 'Ingeniero de Software · Backend, Cloud e IA'
      : 'Software Engineer · Backend, Cloud & AI Tooling';

  return (
    <main id="about" className={styles.heroSection}>
      <div className={styles.heroAmbient} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={`${styles.eyebrowPill} ${styles.heroStagger1}`}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          <span>{eyebrowLabel}</span>
        </div>

        <h1 className={`${styles.displayTitle} ${styles.heroStagger2}`}>
          {hero.name}
        </h1>

        <p className={`${styles.editorialLead} ${styles.heroStagger3}`}>
          <strong className={styles.leadPrimary}>{lead}</strong>{' '}
          {rest && <span className={styles.leadSecondary}>{rest}</span>}
        </p>

        <ul
          className={`${styles.specPills} ${styles.heroStagger4}`}
          aria-label={hero.coreStackAriaLabel}
        >
          {hero.highlights.map((item) => (
            <li key={item} className={styles.specPill}>
              {item}
            </li>
          ))}
        </ul>

        <div className={`${styles.ctaGroup} ${styles.heroStagger5}`}>
          <a
            href={hero.primaryCta.href}
            download={hero.primaryCta.download}
            className={styles.primaryPillButton}
            aria-label={hero.primaryCta.label}
          >
            {hero.primaryCta.label}
          </a>

          <a
            href={hero.secondaryCta.href}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.secondaryPillButton}
          >
            <i className={hero.secondaryCta.iconClassName} aria-hidden="true" />
            {hero.secondaryCta.label}
          </a>

          {hero.tertiaryCta && (
            <a href={hero.tertiaryCta.href} className={styles.appleChevronLink}>
              <span>{hero.tertiaryCta.label}</span>
              <span className={styles.chevron} aria-hidden="true">
                ›
              </span>
            </a>
          )}
        </div>

        <ul
          className={`${styles.dockList} ${styles.heroStagger6}`}
          aria-label={hero.socialLinksAriaLabel}
        >
          {hero.socialLinks.map((social, index) => (
            <li
              key={social.platform}
              style={{ '--dock-idx': index } as CSSProperties}
            >
              <a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                className={styles.dockItem}
                aria-label={social.label}
                title={social.label}
              >
                <i className={social.iconClassName} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default MainContent;
