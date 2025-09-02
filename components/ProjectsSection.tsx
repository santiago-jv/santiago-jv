import React from 'react';
import styles from './projects-section.module.css';

const ProjectsSection: React.FC = () => {
    const projects = [
        {
            title: "E-commerce API",
            description: "Scalable REST API with microservices architecture, payment integration, and real-time inventory management",
            tech: ["NestJS", "PostgreSQL", "Redis", "AWS"],
            status: "In Development"
        },
        {
            title: "Monitoring Dashboard",
            description: "Real-time system monitoring and alerting platform with custom metrics and performance analytics",
            tech: ["Spring Boot", "MongoDB", "AWS CloudWatch"],
            status: "Planning"
        },
        {
            title: "Task Management System",
            description: "Backend system for project management with role-based access control and notification services",
            tech: ["NestJS", "TypeScript", "PostgreSQL", "Redis"],
            status: "Coming Soon"
        }
    ];

    return (
        <section id="projects" className={styles.projectsSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>02.</span>
                        Some Things I've Built
                    </h2>
                    <p className={styles.sectionDescription}>
                        <strong>Note:</strong> The projects below are examples to showcase the types of backend systems I work on. 
                        Real projects from my professional experience will be added soon!
                    </p>
                </div>

                <div className={styles.projectsGrid}>
                    {projects.map((project, index) => (
                        <div key={index} className={styles.projectCard}>
                            <div className={styles.projectContent}>
                                <div className={styles.projectHeader}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <span className={styles.projectStatus}>{project.status}</span>
                                </div>
                                <p className={styles.projectDescription}>
                                    {project.description}
                                </p>
                                <div className={styles.projectTech}>
                                    {project.tech.map((tech) => (
                                        <span key={tech} className={styles.techTag}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className={styles.projectIcon}>
                                    <i className="fas fa-code"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.moreProjects}>
                    <p className={styles.moreText}>
                        🚧 <strong>Coming Soon:</strong> Real projects from my professional experience at GoodRec and other exciting work will be featured here!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
