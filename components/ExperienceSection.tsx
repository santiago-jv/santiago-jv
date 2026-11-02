import React, { CSSProperties } from 'react';
import SectionHeading from '@/components/SectionHeading';
import PortfolioIcon from '@/components/PortfolioIcon';
import { usePreferences } from '@/context/PreferencesContext';
import { handleAppleCardSpotlight } from '@/hooks/useAppleMotion';
import styles from './experience-section.module.css';

const ExperienceSection: React.FC = () => {
  const { content } = usePreferences();

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.container}>
        <SectionHeading content={content.experienceHeading} />

        <div className={styles.cardsStack}>
          {content.experiences.map((item, index) => {
            const isCurrent = index === 0;

            return (
              <article
                key={`${item.company}-${item.role}`}
                className={styles.experienceCard}
                data-apple-reveal
                style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
                onMouseMove={handleAppleCardSpotlight}
              >
                <div className={styles.metaColumn}>
                  <div className={styles.periodPill}>
                    {isCurrent && <span className={styles.liveDot} aria-hidden="true" />}
                    <span>{item.period}</span>
                  </div>

                  <h3 className={styles.companyName}>{item.company}</h3>
                  <p className={styles.roleTitle}>{item.role}</p>

                  <span className={styles.locationMeta}>
                    <PortfolioIcon name="fa-location-dot" />
                    {item.location}
                  </span>
                </div>

                <div className={styles.detailsColumn}>
                  <ul className={styles.highlightsList}>
                    {item.highlights.map((bullet) => (
                      <li key={bullet} className={styles.highlightItem}>
                        <span className={styles.bulletMarker} aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className={styles.techList} aria-label={`${item.company} technologies`}>
                    {item.tech.map((tech) => (
                      <li key={`${item.company}-${tech}`} className={styles.techBadge}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
