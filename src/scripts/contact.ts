import { copyToClipboard } from '@/utils/clipboard';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isFieldValid(field: HTMLInputElement | HTMLTextAreaElement): boolean {
  const val = field.value.trim();
  if (field.required && val.length === 0) return false;
  if (field.minLength > 0 && val.length < field.minLength) return false;
  if (field.maxLength > 0 && val.length > field.maxLength) return false;
  if (field.type === 'email' && !EMAIL_PATTERN.test(val)) return false;
  return true;
}

function initContactSection(): void {
  const section = document.querySelector<HTMLElement>('[data-contact-section]');
  if (!section) return;

  // 1. Copy Email Channel Action
  const copyButtons = section.querySelectorAll<HTMLButtonElement>('[data-contact-copy]');
  copyButtons.forEach((btn) => {
    let copyTimer = 0;
    btn.addEventListener('click', async () => {
      const value = btn.dataset.contactCopy || '';
      if (!value) return;
      const ok = await copyToClipboard(value);
      if (!ok) return;

      const pill = btn.querySelector<HTMLElement>('[data-copy-pill]');
      if (pill) {
        pill.dataset.copied = 'true';
        pill.textContent = btn.dataset.copiedLabel || '';
      }

      if (copyTimer) window.clearTimeout(copyTimer);
      copyTimer = window.setTimeout(() => {
        if (pill) {
          pill.dataset.copied = 'false';
          pill.textContent = btn.dataset.copyLabel || '';
        }
        copyTimer = 0;
      }, 2200);
    });
  });

  // 2. Contact Form Submission & Modern Web Guidance Blur/Input Validation
  const form = section.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;

  // Progressive enhancement: replace native browser submit popups with accessible inline blur validation
  form.noValidate = true;

  const feedbackEl = form.querySelector<HTMLElement>('[data-contact-feedback]');
  const feedbackTextEl = feedbackEl?.querySelector<HTMLElement>('span');
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-contact-submit]');
  const fields = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
  ).filter((field) => field.name !== 'website');

  let startedAt = Date.now();
  let isSubmitting = false;

  const setFieldErrorState = (
    field: HTMLInputElement | HTMLTextAreaElement,
    showError: boolean
  ): void => {
    const errId = field.getAttribute('aria-describedby');
    const errEl = errId ? document.getElementById(errId) : null;
    if (showError) {
      field.setAttribute('aria-invalid', 'true');
      if (errEl) {
        errEl.textContent = field.dataset.errorMsg || '';
        errEl.hidden = false;
      }
    } else {
      field.removeAttribute('aria-invalid');
      if (errEl) {
        errEl.textContent = '';
        errEl.hidden = true;
      }
    }
  };

  const hideFeedback = (): void => {
    if (!feedbackEl) return;
    feedbackEl.hidden = true;
    feedbackEl.removeAttribute('data-variant');
    if (feedbackTextEl) feedbackTextEl.textContent = '';
  };

  const showFeedback = (text: string, variant: 'success' | 'error'): void => {
    if (!feedbackEl) return;
    if (feedbackTextEl) feedbackTextEl.textContent = text;
    feedbackEl.dataset.variant = variant;
    feedbackEl.hidden = false;
  };

  fields.forEach((field) => {
    // Suppress validation errors immediately during active typing
    field.addEventListener('input', () => {
      setFieldErrorState(field, false);
      if (feedbackEl && !feedbackEl.hidden) {
        hideFeedback();
      }
    });

    // Display validation error on field blur if touched with invalid content
    field.addEventListener('blur', () => {
      if (field.value.length > 0 && !isFieldValid(field)) {
        setFieldErrorState(field, true);
      }
    });
  });

  const setSubmittingState = (submitting: boolean): void => {
    isSubmitting = submitting;
    fields.forEach((field) => {
      field.disabled = submitting;
    });
    if (submitBtn) {
      submitBtn.disabled = submitting;
      submitBtn.textContent = submitting
        ? form.dataset.labelSending || ''
        : form.dataset.labelSubmit || '';
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    let firstInvalidField: HTMLInputElement | HTMLTextAreaElement | null = null;
    fields.forEach((field) => {
      const valid = isFieldValid(field);
      setFieldErrorState(field, !valid);
      if (!valid && !firstInvalidField) {
        firstInvalidField = field;
      }
    });

    if (firstInvalidField) {
      (firstInvalidField as HTMLElement).focus();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || ''),
      website: String(formData.get('website') || ''),
      startedAt,
    };

    hideFeedback();
    setSubmittingState(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        form.reset();
        fields.forEach((f) => setFieldErrorState(f, false));
        startedAt = Date.now();
        const msg =
          data.mode === 'dev-preview'
            ? form.dataset.msgDevPreview || ''
            : form.dataset.msgSuccess || '';
        showFeedback(msg, 'success');
        return;
      }

      if (response.status === 429 || data?.code === 'RATE_LIMITED') {
        showFeedback(form.dataset.msgRateLimit || '', 'error');
        return;
      }

      if (response.status === 400 || data?.code === 'VALIDATION_ERROR') {
        showFeedback(form.dataset.msgValidation || '', 'error');
        return;
      }

      showFeedback(form.dataset.msgError || '', 'error');
    } catch {
      showFeedback(form.dataset.msgError || '', 'error');
    } finally {
      setSubmittingState(false);
    }
  });
}

initContactSection();
