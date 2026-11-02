import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import PortfolioIcon from '@/components/PortfolioIcon';
import { usePreferences } from '@/context/PreferencesContext';
import { handleAppleCardSpotlight } from '@/hooks/useAppleMotion';
import styles from './contact-section.module.css';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type SubmitFeedback = 'idle' | 'success' | 'dev-preview' | 'rate-limit' | 'validation' | 'error';

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

const ContactSection: React.FC = () => {
  const { content } = usePreferences();
  const contactContent = content.contact;
  const labels = contactContent.formLabels;

  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitFeedback>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const startedAtRef = useRef<number>(Date.now());
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyValue = async (textToCopy: string): Promise<void> => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const temp = document.createElement('textarea');
        temp.value = textToCopy;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }

      setCopiedEmail(true);
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedEmail(false);
      }, 2200);
    } catch {
      // Ignore clipboard permission restrictions gracefully
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          website: formData.website,
          startedAt: startedAtRef.current,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        setFormData(INITIAL_FORM_DATA);
        startedAtRef.current = Date.now();
        setSubmitStatus(data.mode === 'dev-preview' ? 'dev-preview' : 'success');
        return;
      }

      if (response.status === 429 || data?.code === 'RATE_LIMITED') {
        setSubmitStatus('rate-limit');
        return;
      }

      if (response.status === 400 || data?.code === 'VALIDATION_ERROR') {
        setSubmitStatus('validation');
        return;
      }

      setSubmitStatus('error');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFeedbackCopy = (): { text: string; isPositive: boolean } | null => {
    switch (submitStatus) {
      case 'success':
        return { text: labels.successMessage, isPositive: true };
      case 'dev-preview':
        return { text: labels.devPreviewMessage, isPositive: true };
      case 'rate-limit':
        return { text: labels.rateLimitMessage, isPositive: false };
      case 'validation':
        return { text: labels.validationMessage, isPositive: false };
      case 'error':
        return { text: labels.errorMessage, isPositive: false };
      default:
        return null;
    }
  };

  const feedback = getFeedbackCopy();

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
                if (item.copyValue) {
                  return (
                    <li key={item.label} className={styles.channelItem}>
                      <button
                        type="button"
                        onClick={() => handleCopyValue(item.copyValue!)}
                        className={styles.channelRowButton}
                      >
                        <div className={styles.channelIcon}>
                          <PortfolioIcon name={item.iconClassName} />
                        </div>

                        <div className={styles.channelMeta}>
                          <span className={styles.channelLabel}>{item.label}</span>
                          <span className={styles.channelValue}>{item.value}</span>
                        </div>

                        <span
                          className={`${styles.copyPill} ${
                            copiedEmail ? styles.copyPillSuccess : ''
                          }`}
                        >
                          {copiedEmail ? `✓ ${labels.copiedLabel}` : labels.copyActionLabel}
                        </span>
                      </button>
                    </li>
                  );
                }

                const inner = (
                  <>
                    <div className={styles.channelIcon}>
                      <PortfolioIcon name={item.iconClassName} />
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
              {/* Invisible anti-bot honeypot field */}
              <div className={styles.honeypotField} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

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
                    minLength={2}
                    maxLength={80}
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
                    maxLength={120}
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
                  minLength={2}
                  maxLength={140}
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
                  minLength={10}
                  maxLength={3000}
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.submitStatus} aria-live="polite">
                {feedback && (
                  <p
                    className={`${styles.submitMessage} ${
                      feedback.isPositive ? styles.submitSuccess : styles.submitError
                    }`}
                  >
                    <span>{feedback.text}</span>
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
      </div>
    </section>
  );
};

export default ContactSection;
