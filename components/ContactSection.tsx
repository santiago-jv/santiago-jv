import React, { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { CONTACT_CONTENT } from '@/data/portfolio-content';
import styles from './contact-section.module.css';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData(INITIAL_FORM_DATA);
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <SectionHeading content={CONTACT_CONTENT.heading} />

        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h4 className={styles.infoTitle}>{CONTACT_CONTENT.introTitle}</h4>
            <ul className={styles.contactGrid}>
              {CONTACT_CONTENT.infoItems.map((item) => (
                <li key={item.label} className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <i className={item.iconClassName} aria-hidden="true"></i>
                  </div>

                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={styles.contactValue}
                        target={item.href.startsWith('http') ? '_blank' : '_self'}
                        rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.contactValue}>{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contactForm}>
            <h4 className={styles.formTitle}>{CONTACT_CONTENT.formTitle}</h4>
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
                    autoComplete="name"
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
                    autoComplete="email"
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

              <div className={styles.submitStatus} aria-live="polite">
                {submitStatus === 'success' && (
                  <p className={`${styles.submitMessage} ${styles.submitSuccess}`}>
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className={`${styles.submitMessage} ${styles.submitError}`}>
                    <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" aria-hidden="true"></i>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.quickContact}>
          <p className={styles.quickContactText}>Prefer a direct approach?</p>
          <a href={CONTACT_CONTENT.quickActionHref} className={styles.emailButton}>
            <i className="fas fa-envelope" aria-hidden="true"></i>
            {CONTACT_CONTENT.quickActionLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
