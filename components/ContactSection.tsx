import React, { CSSProperties, useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { usePreferences } from '@/context/PreferencesContext';
import { handleAppleCardSpotlight } from '@/hooks/useAppleMotion';
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

        <div className={styles.contactBentoGrid}>
          <div
            className={styles.channelsCard}
            data-apple-reveal
            style={{ '--reveal-delay': '0ms' } as CSSProperties}
            onMouseMove={handleAppleCardSpotlight}
          >
            <h3 className={styles.cardHeading}>{contactContent.introTitle}</h3>

            <ul className={styles.channelList}>
              {contactContent.infoItems.map((item) => {
                const inner = (
                  <>
                    <div className={styles.channelIcon}>
                      <i className={item.iconClassName} aria-hidden="true" />
                    </div>

                    <div className={styles.channelMeta}>
                      <span className={styles.channelLabel}>{item.label}</span>
                      <span className={styles.channelValue}>{item.value}</span>
                    </div>

                    {item.href && (
                      <span className={styles.rowChevron} aria-hidden="true">
                        ›
                      </span>
                    )}
                  </>
                );

                return (
                  <li key={item.label} className={styles.channelItem}>
                    {item.href ? (
                      <a
                        href={item.href}
                        download={item.download}
                        className={styles.channelRowLink}
                        target={item.href.startsWith('http') ? '_blank' : '_self'}
                        rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={styles.channelRowStatic}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            className={styles.formCard}
            data-apple-reveal
            style={{ '--reveal-delay': '95ms' } as CSSProperties}
            onMouseMove={handleAppleCardSpotlight}
          >
            <h3 className={styles.cardHeading}>{contactContent.formTitle}</h3>

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
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.submitStatus} aria-live="polite">
                {submitStatus === 'success' && (
                  <p className={`${styles.submitMessage} ${styles.submitSuccess}`}>
                    <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    {labels.successMessage}
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className={`${styles.submitMessage} ${styles.submitError}`}>
                    <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
                    {labels.errorMessage}
                  </p>
                )}
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? labels.sending : labels.submit}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className={styles.quickContactBanner}
          data-apple-reveal
          style={{ '--reveal-delay': '170ms' } as CSSProperties}
        >
          <p className={styles.quickContactText}>{labels.directPrompt}</p>
          <a href={contactContent.quickActionHref} className={styles.directEmailLink}>
            <span>{contactContent.quickActionLabel}</span>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
