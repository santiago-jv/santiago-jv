import React, { CSSProperties } from 'react';
import SectionHeading from '@/components/SectionHeading';
import IntegrationLogo from '@/components/IntegrationLogo';
import { usePreferences } from '@/context/PreferencesContext';
import { INTEGRATIONS_CONTENT } from '@/data/integrations-content';
import styles from './integrations-section.module.css';

const IntegrationsSection: React.FC = () => {
  const { locale } = usePreferences();
  const copy = INTEGRATIONS_CONTENT[locale];

  return (
    <section id="integrations" className={styles.integrationsSection}>
      <div className={styles.container}>
        <SectionHeading content={copy.heading} />

        <ul className={styles.matrixGrid}>
          {copy.items.map((item, index) => {
            const brandVars = {
              '--reveal-delay': `${index * 45}ms`,
              '--brand-color': item.brandColor,
              '--brand-tint': item.brandTint,
              '--brand-border': item.brandBorder,
              ...(item.brandAccent ? { '--brand-accent': item.brandAccent } : {}),
            } as CSSProperties;

            return (
              <li
                key={item.id}
                className={styles.matrixTile}
                data-apple-reveal
                style={brandVars}
              >
                <div className={styles.logoSquircle} aria-hidden="true">
                  <IntegrationLogo brand={item.id} className={styles.logoGlyph} />
                </div>

                <div className={styles.metaStack}>
                  <h3 className={styles.brandName}>{item.name}</h3>
                  <span className={styles.categoryLabel}>{item.category}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default IntegrationsSection;
