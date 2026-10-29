import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import { usePreferences } from '@/context/PreferencesContext';
import styles from './projects-section.module.css';

const ProjectsSection: React.FC = () => {
  const { content } = usePreferences();

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <SectionHeading content={content.projectsHeading} />

        <ul className={styles.projectsGrid}>
          {content.projects.map((project, index) => (
            <li key={`${index}-${project.title}`} className={styles.projectCard}>
              <article className={styles.projectContent}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.projectStatus}>{project.status}</span>
                </div>

                <p className={styles.projectDescription}>{project.description}</p>

                <ul className={styles.projectTech}>
                  {project.tech.map((tech) => (
                    <li key={`${project.title}-${tech}`} className={styles.techTag}>
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className={styles.projectIcon} aria-hidden="true">
                  <i className={project.iconClassName || 'fas fa-code'}></i>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectsSection;
