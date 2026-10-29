import React from 'react';
import { usePreferences } from '@/context/PreferencesContext';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  const { content } = usePreferences();
  const footer = content.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.brandSection}>
              <div className={styles.logo}>{footer.brand.name}</div>
              <p className={styles.brandDescription}>{footer.brand.description}</p>
            </div>

            <div className={styles.linksSection}>
              <h4 className={styles.sectionTitle}>{footer.sectionTitles.navigation}</h4>
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

            <div className={styles.skillsSection}>
              <h4 className={styles.sectionTitle}>{footer.sectionTitles.technologies}</h4>
              <ul className={styles.skillsGrid}>
                {footer.skills.map((skill) => (
                  <li key={skill} className={styles.skillTag}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.contactSection}>
              <h4 className={styles.sectionTitle}>{footer.sectionTitles.connect}</h4>
              <div className={styles.contactInfo}>
                <a href={`mailto:${footer.email}`} className={styles.emailLink}>
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  {footer.email}
                </a>
                <p className={styles.locationText}>
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  {footer.location}
                </p>
              </div>

              <ul className={styles.socialLinks}>
                {footer.socialLinks.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : '_self'}
                      rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className={styles.socialLink}
                      aria-label={`${footer.followAriaPrefix} ${social.label}`}
                    >
                      <i className={social.iconClassName} aria-hidden="true"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <p>
                © {currentYear} Santiago Olayo. {footer.rightsReserved}
              </p>
              <p className={styles.builtWith}>{footer.builtWith}</p>
            </div>

            <div className={styles.footerMeta}>
              <span className={styles.version}>{footer.version}</span>
              <a
                href={footer.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.sourceLink}
              >
                <i className="fas fa-code" aria-hidden="true"></i>
                {footer.sourceLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.decorativeGrid}></div>
    </footer>
  );
};

export default Footer;
