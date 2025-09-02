import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    
    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/santiago-jv/santiago-jv',
            icon: 'fab fa-github'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/santiago-jv',
            icon: 'fab fa-linkedin'
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/santiago_jv4035',
            icon: 'fab fa-twitter'
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/santiago_ojv',
            icon: 'fab fa-instagram'
        },
        {
            name: 'Email',
            url: 'mailto:santiagojv.work@gmail.com',
            icon: 'fas fa-envelope'
        }
    ];

    const quickLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const skills = [
        'NestJS', 'Spring Boot', 'TypeScript', 'React', 'AWS', 'PostgreSQL', 'MongoDB', 'Redis'
    ];

    return (
        <footer className={styles.footer}>
            {/* Main Footer Content */}
            <div className={styles.footerContent}>
                <div className={styles.container}>
                    <div className={styles.footerGrid}>
                        {/* Brand Section */}
                        <div className={styles.brandSection}>
                            <div className={styles.logo}>
                                &lt;santiago-jv/&gt;
                            </div>
                            <p className={styles.brandDescription}>
                                Full-stack developer passionate about creating innovative web solutions 
                                that make a difference. Always learning, always building.
                            </p>
                            <div className={styles.availability}>
                                <div className={styles.statusIndicator}>
                                    <div className={styles.statusDot}></div>
                                    <span className={styles.statusText}>Available for new opportunities</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className={styles.linksSection}>
                            <h4 className={styles.sectionTitle}>Navigation</h4>
                            <ul className={styles.linksList}>
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className={styles.footerLink}>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Skills */}
                        <div className={styles.skillsSection}>
                            <h4 className={styles.sectionTitle}>Technologies</h4>
                            <div className={styles.skillsGrid}>
                                {skills.map((skill) => (
                                    <span key={skill} className={styles.skillTag}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className={styles.contactSection}>
                            <h4 className={styles.sectionTitle}>Let&apos;s Connect</h4>
                            <div className={styles.contactInfo}>
                                <a 
                                    href="mailto:santiagojv.work@gmail.com" 
                                    className={styles.emailLink}
                                >
                                    <i className="fas fa-envelope"></i>
                                    santiagojv.work@gmail.com
                                </a>
                                <p className={styles.locationText}>
                                    <i className="fas fa-map-marker-alt"></i>
                                    Santa Marta, Colombia
                                </p>
                            </div>
                            
                            {/* Social Links */}
                            <div className={styles.socialLinks}>
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className={styles.socialLink}
                                        aria-label={`Follow me on ${social.name}`}
                                    >
                                        <i className={social.icon}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className={styles.footerBottom}>
                <div className={styles.container}>
                    <div className={styles.bottomContent}>
                        <div className={styles.copyright}>
                            <p>
                                © {currentYear} Santiago Olayo. All rights reserved.
                            </p>
                            <p className={styles.builtWith}>
                                Built with <i className="fas fa-heart"></i> using Next.js & TypeScript
                            </p>
                        </div>
                        
                        <div className={styles.footerMeta}>
                            <span className={styles.version}>v2.0.0</span>
                            <a 
                                href="https://github.com/santiago-jv/santiago-jv" 
                                target="_blank"
                                rel="noreferrer noopener"
                                className={styles.sourceLink}
                            >
                                <i className="fas fa-code"></i>
                                View Source
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className={styles.decorativeGrid}></div>
        </footer>
    );
};

export default Footer;
