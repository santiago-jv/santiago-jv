import React, { useState } from 'react';
import styles from './contact-section.module.css';

const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        try {
            // Here you would typically send to an API endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: 'fas fa-envelope',
            label: 'Email',
            value: 'santiagojv.work@gmail.com',
            href: 'mailto:santiagojv.work@gmail.com'
        },
        {
            icon: 'fab fa-linkedin',
            label: 'LinkedIn',
            value: '/in/santiago-jv',
            href: 'https://linkedin.com/in/santiago-jv'
        },
        {
            icon: 'fab fa-github',
            label: 'GitHub',
            value: '/santiago-jv',
            href: 'https://github.com/santiago-jv/santiago-jv'
        },
        {
            icon: 'fas fa-map-marker-alt',
            label: 'Location',
            value: 'Santa Marta, Colombia',
            href: 'https://maps.google.com/?q=Santa+Marta,+Colombia'
        }
    ];

    return (
        <section id="contact" className={styles.contactSection}>
            <div className={styles.container}>
                {/* Section Header */}
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>03.</span>
                        What&apos;s Next?
                    </h2>
                    <h3 className={styles.sectionSubtitle}>Get In Touch</h3>
                    <p className={styles.sectionDescription}>
                        I&apos;m always interested in new opportunities and interesting projects. 
                        Whether you have a question or just want to say hi, feel free to reach out!
                    </p>
                </div>

                <div className={styles.contactContent}>
                    {/* Contact Information */}
                    <div className={styles.contactInfo}>
                        <h4 className={styles.infoTitle}>Let&apos;s Connect</h4>
                        <div className={styles.contactGrid}>
                            {contactInfo.map((item, index) => (
                                <div key={index} className={styles.contactItem}>
                                    <div className={styles.contactIcon}>
                                        <i className={item.icon}></i>
                                    </div>
                                    <div className={styles.contactDetails}>
                                        <span className={styles.contactLabel}>{item.label}</span>
                                        {item.href ? (
                                            <a 
                                                href={item.href} 
                                                className={styles.contactValue}
                                                target={item.href.startsWith('http') ? '_blank' : '_self'}
                                                rel={item.href.startsWith('http') ? 'noreferrer noopener' : ''}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className={styles.contactValue}>{item.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.contactForm}>
                        <h4 className={styles.formTitle}>Send a Message</h4>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.formLabel}>
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={styles.formInput}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.formLabel}>
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={styles.formInput}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="subject" className={styles.formLabel}>
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={styles.formInput}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.formLabel}>
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`${styles.formInput} ${styles.formTextarea}`}
                                    rows={6}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Submit Status */}
                            {submitStatus === 'success' && (
                                <div className={`${styles.submitMessage} ${styles.submitSuccess}`}>
                                    <i className="fas fa-check-circle"></i>
                                    Message sent successfully! I&apos;ll get back to you soon.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className={`${styles.submitMessage} ${styles.submitError}`}>
                                    <i className="fas fa-exclamation-circle"></i>
                                    Something went wrong. Please try again or email me directly.
                                </div>
                            )}

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane"></i>
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Quick Contact CTA */}
                <div className={styles.quickContact}>
                    <p className={styles.quickContactText}>
                        Prefer a direct approach?
                    </p>
                    <a 
                        href="mailto:santiagojv.work@gmail.com?subject=Hello Santiago!"
                        className={styles.emailButton}
                    >
                        <i className="fas fa-envelope"></i>
                        Email Me Directly
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
