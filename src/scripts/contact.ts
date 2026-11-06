async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    return true;
  } catch {
    return false;
  }
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

  // 2. Contact Form Submission
  const form = section.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;

  const feedbackEl = form.querySelector<HTMLElement>('[data-contact-feedback]');
  const feedbackTextEl = feedbackEl?.querySelector<HTMLElement>('span');
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-contact-submit]');
  const fields = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
  );

  let startedAt = Date.now();
  let isSubmitting = false;

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
    field.addEventListener('input', () => {
      if (feedbackEl && !feedbackEl.hidden) {
        hideFeedback();
      }
    });
  });

  const setSubmittingState = (submitting: boolean): void => {
    isSubmitting = submitting;
    fields.forEach((field) => {
      if (field.name !== 'website') {
        field.disabled = submitting;
      }
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
