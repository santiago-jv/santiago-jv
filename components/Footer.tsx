import React from 'react';
import { FOOTER_CONTENT } from '@/data/portfolio-content';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.brandSection}>
              <div className={styles.logo}>{FOOTER_CONTENT.brand.name}</div>
              <p className={styles.brandDescription}>{FOOTER_CONTENT.brand.description}</p>
              <div className={styles.availability}>
                <div className={styles.statusIndicator}>
                  <div className={styles.statusDot}></div>
                  <span className={styles.statusText}>{FOOTER_CONTENT.brand.availabilityText}</span>
                </div>
              </div>
            </div>

            <div className={styles.linksSection}>
              <h4 className={styles.sectionTitle}>Navigation</h4>
              <ul className={styles.linksList}>
                {FOOTER_CONTENT.quickLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.skillsSection}>
              <h4 className={styles.sectionTitle}>Technologies</h4>
              <ul className={styles.skillsGrid}>
                {FOOTER_CONTENT.skills.map((skill) => (
                  <li key={skill} className={styles.skillTag}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.contactSection}>
              <h4 className={styles.sectionTitle}>Let&apos;s Connect</h4>
              <div className={styles.contactInfo}>
                <a href={`mailto:${FOOTER_CONTENT.email}`} className={styles.emailLink}>
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  {FOOTER_CONTENT.email}
                </a>
                <p className={styles.locationText}>
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  {FOOTER_CONTENT.location}
                </p>
              </div>

              <ul className={styles.socialLinks}>
                {FOOTER_CONTENT.socialLinks.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : '_self'}
                      rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      className={styles.socialLink}
                      aria-label={`Follow me on ${social.label}`}
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
              <p>© {currentYear} Santiago Olayo. All rights reserved.</p>
              <p className={styles.builtWith}>Built with Next.js & TypeScript</p>
            </div>

            <div className={styles.footerMeta}>
              <span className={styles.version}>{FOOTER_CONTENT.version}</span>
              <a
                href={FOOTER_CONTENT.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.sourceLink}
              >
                <i className="fas fa-code" aria-hidden="true"></i>
                View Source
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
