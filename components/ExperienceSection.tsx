import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import { usePreferences } from '@/context/PreferencesContext';
import styles from './experience-section.module.css';

const ExperienceSection: React.FC = () => {
  const { content } = usePreferences();

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.container}>
        <SectionHeading content={content.experienceHeading} />

        <div className={styles.timeline}>
          {content.experiences.map((item) => (
            <article key={`${item.company}-${item.role}`} className={styles.experienceCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.roleTitle}>{item.role}</h3>
                  <p className={styles.companyName}>{item.company}</p>
                </div>

                <div className={styles.metaBadges}>
                  <span className={styles.periodBadge}>{item.period}</span>
                  <span className={styles.locationBadge}>
                    <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                    {item.location}
                  </span>
                </div>
              </div>

              <ul className={styles.highlightsList}>
                {item.highlights.map((bullet) => (
                  <li key={bullet} className={styles.highlightItem}>
                    {bullet}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
