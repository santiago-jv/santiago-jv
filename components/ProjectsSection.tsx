import React, { CSSProperties } from 'react';
import SectionHeading from '@/components/SectionHeading';
import PortfolioIcon from '@/components/PortfolioIcon';
import { usePreferences } from '@/context/PreferencesContext';
import styles from './projects-section.module.css';

const BENTO_VARIANT_CLASSES = [
  styles.bentoWidePrimary,
  styles.bentoCompactAccent,
  styles.bentoCompactNeutral,
  styles.bentoWideElevated,
];

const ProjectsSection: React.FC = () => {
  const { content } = usePreferences();

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <SectionHeading content={content.projectsHeading} />

        <ul className={styles.bentoGrid}>
          {content.projects.map((project, index) => {
            const variantClass = BENTO_VARIANT_CLASSES[index % BENTO_VARIANT_CLASSES.length];
            const isAccentTile = index === 1;

            return (
              <li
                key={`${index}-${project.title}`}
                className={`${styles.bentoTile} ${variantClass}`}
                data-apple-reveal
                style={{ '--reveal-delay': `${index * 85}ms` } as CSSProperties}
              >
                <article className={styles.tileContent}>
                  <div className={styles.tileTopRow}>
                    <div
                      className={`${styles.iconSquircle} ${isAccentTile ? styles.iconSquircleAccent : ''}`}
                      aria-hidden="true"
                    >
                      <PortfolioIcon name={project.iconClassName || 'fa-server'} />
                    </div>

                    {project.status && (
                      <span
                        className={`${styles.statusEyebrow} ${isAccentTile ? styles.statusEyebrowAccent : ''}`}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>

                  <div className={styles.tileBody}>
                    <h3 className={styles.tileTitle}>{project.title}</h3>
                    <p className={styles.tileDescription}>{project.description}</p>
                  </div>

                  <ul className={styles.tileTechList}>
                    {project.tech.map((tech) => (
                      <li key={`${project.title}-${tech}`} className={styles.tileTechPill}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ProjectsSection;
