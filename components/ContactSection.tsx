import React, { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { usePreferences } from '@/context/PreferencesContext';
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
  const { content } = usePreferences();
  const contactContent = content.contact;
  const labels = contactContent.formLabels;

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
      const mailtoSubject = encodeURIComponent(`${labels.mailtoPrefix} ${formData.subject}`);
      const mailtoBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.location.href = `mailto:contact@santiago-jv.tech?subject=${mailtoSubject}&body=${mailtoBody}`;
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
        <SectionHeading content={contactContent.heading} />

        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h4 className={styles.infoTitle}>{contactContent.introTitle}</h4>
            <ul className={styles.contactGrid}>
              {contactContent.infoItems.map((item) => (
                <li key={item.label} className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <i className={item.iconClassName} aria-hidden="true"></i>
                  </div>

                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        download={item.download}
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
            <h4 className={styles.formTitle}>{contactContent.formTitle}</h4>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    {labels.name}
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
                    {labels.email}
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
                  {labels.subject}
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
                  {labels.message}
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
                    {labels.successMessage}
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className={`${styles.submitMessage} ${styles.submitError}`}>
                    <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                    {labels.errorMessage}
                  </p>
                )}
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    {labels.sending}
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" aria-hidden="true"></i>
                    {labels.submit}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.quickContact}>
          <p className={styles.quickContactText}>{labels.directPrompt}</p>
          <a href={contactContent.quickActionHref} className={styles.emailButton}>
            <i className="fas fa-envelope" aria-hidden="true"></i>
            {contactContent.quickActionLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
