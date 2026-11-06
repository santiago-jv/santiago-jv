async function copyText(text: string): Promise<boolean> {
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

function initMcpConsole(): void {
  const consoleRoot = document.querySelector<HTMLElement>('[data-mcp-console]');
  if (!consoleRoot) return;

  const tabBtns = Array.from(consoleRoot.querySelectorAll<HTMLButtonElement>('[data-mcp-tab]'));
  const panels = Array.from(consoleRoot.querySelectorAll<HTMLElement>('[data-mcp-panel]'));
  const endpointBtn = consoleRoot.querySelector<HTMLButtonElement>('[data-mcp-copy-endpoint]');
  const promptBtn = consoleRoot.querySelector<HTMLButtonElement>('[data-mcp-copy-prompt]');

  let activeTab: 'recruiter' | 'engineering' = 'recruiter';
  let endpointTimer = 0;
  let promptTimer = 0;

  const setButtonIconState = (btn: HTMLElement, copied: boolean): void => {
    const copyIcon = btn.querySelector<HTMLElement>('[data-copy-icon]');
    const checkIcon = btn.querySelector<HTMLElement>('[data-check-icon]');
    if (copyIcon) copyIcon.hidden = copied;
    if (checkIcon) checkIcon.hidden = !copied;
  };

  const syncPromptLabel = (copied: boolean): void => {
    if (!promptBtn) return;
    const labelEl = promptBtn.querySelector<HTMLElement>('[data-copy-label]');
    setButtonIconState(promptBtn, copied);
    if (!labelEl) return;
    if (copied) {
      labelEl.textContent = promptBtn.dataset.copiedCta || '';
    } else {
      labelEl.textContent =
        activeTab === 'recruiter'
          ? promptBtn.dataset.recruiterCta || ''
          : promptBtn.dataset.engineeringCta || '';
    }
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.mcpTab === 'engineering' ? 'engineering' : 'recruiter';
      activeTab = next;

      tabBtns.forEach((b) => {
        b.setAttribute('aria-selected', b.dataset.mcpTab === activeTab ? 'true' : 'false');
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.mcpPanel !== activeTab;
      });

      if (promptTimer) {
        window.clearTimeout(promptTimer);
        promptTimer = 0;
      }
      syncPromptLabel(false);
    });
  });

  endpointBtn?.addEventListener('click', async () => {
    const url = endpointBtn.dataset.endpointUrl || '';
    if (!url) return;
    const ok = await copyText(url);
    if (!ok) return;

    const labelEl = endpointBtn.querySelector<HTMLElement>('[data-copy-label]');
    setButtonIconState(endpointBtn, true);
    if (labelEl) labelEl.textContent = endpointBtn.dataset.copiedLabel || '';

    if (endpointTimer) window.clearTimeout(endpointTimer);
    endpointTimer = window.setTimeout(() => {
      setButtonIconState(endpointBtn, false);
      if (labelEl) labelEl.textContent = endpointBtn.dataset.defaultLabel || '';
      endpointTimer = 0;
    }, 1800);
  });

  promptBtn?.addEventListener('click', async () => {
    const promptText =
      activeTab === 'recruiter'
        ? promptBtn.dataset.recruiterPrompt || ''
        : promptBtn.dataset.engineeringPrompt || '';
    if (!promptText) return;

    const ok = await copyText(promptText);
    if (!ok) return;

    syncPromptLabel(true);
    if (promptTimer) window.clearTimeout(promptTimer);
    promptTimer = window.setTimeout(() => {
      syncPromptLabel(false);
      promptTimer = 0;
    }, 2000);
  });
}

initMcpConsole();
