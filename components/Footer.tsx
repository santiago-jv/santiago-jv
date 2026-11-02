import React from 'react';
import { usePreferences } from '@/context/PreferencesContext';
import PortfolioIcon from '@/components/PortfolioIcon';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  const { content } = usePreferences();
  const footer = content.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.directoryGrid}>
          <div className={styles.brandColumn}>
            <p className={styles.wordmark}>Santiago Olayo</p>
            <p className={styles.brandDescription}>{footer.brand.description}</p>
          </div>

          <div className={styles.directoryColumn}>
            <h4 className={styles.columnTitle}>{footer.sectionTitles.navigation}</h4>
            <ul className={styles.linksList}>
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.footerLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.directoryColumn}>
            <h4 className={styles.columnTitle}>{footer.sectionTitles.technologies}</h4>
            <ul className={styles.skillsCloud}>
              {footer.skills.map((skill) => (
                <li key={skill} className={styles.skillItem}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.directoryColumn}>
            <h4 className={styles.columnTitle}>{footer.sectionTitles.connect}</h4>
            <div className={styles.connectMeta}>
              <a href={`mailto:${footer.email}`} className={styles.footerLink}>
                {footer.email}
              </a>
              <p className={styles.locationText}>{footer.location}</p>
            </div>

            <ul className={styles.socialList}>
              {footer.socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : '_self'}
                    rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className={styles.socialButton}
                    aria-label={`${footer.followAriaPrefix} ${social.label}`}
                  >
                    <PortfolioIcon name={social.iconClassName} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.legalBar}>
          <div className={styles.legalLeft}>
            <span>
              Copyright © {currentYear} Santiago Olayo. {footer.rightsReserved}
            </span>
            <span className={styles.legalDivider} aria-hidden="true">
              |
            </span>
            <span>{footer.builtWith}</span>
          </div>

          <div className={styles.legalRight}>
            <span className={styles.versionTag}>{footer.version}</span>
            <a
              href={footer.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.sourceLink}
            >
              <span>{footer.sourceLabel}</span>
              <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
