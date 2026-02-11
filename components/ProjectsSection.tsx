import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import { PROJECTS, PROJECTS_HEADING } from '@/data/portfolio-content';
import styles from './projects-section.module.css';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <SectionHeading content={PROJECTS_HEADING} />

        <ul className={styles.projectsGrid}>
          {PROJECTS.map((project) => (
            <li key={project.title} className={styles.projectCard}>
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
                  <i className="fas fa-code"></i>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className={styles.moreProjects}>
          <p className={styles.moreText}>
            Real projects from my professional experience at GoodRec and other exciting work will be
            featured here soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
