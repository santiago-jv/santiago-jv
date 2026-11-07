import { copyToClipboard } from '@/utils/clipboard';

function initMcpConsole(): void {
  const consoleRoot = document.querySelector<HTMLElement>('[data-mcp-console]');
  if (!consoleRoot) return;

  const tabBtns = Array.from(consoleRoot.querySelectorAll<HTMLButtonElement>('[data-mcp-tab]'));
  const panels = Array.from(consoleRoot.querySelectorAll<HTMLElement>('[data-mcp-panel]'));
  const endpointBtn = consoleRoot.querySelector<HTMLButtonElement>('[data-mcp-copy-endpoint]');

  let activeTab: 'recruiter' | 'engineering' = 'recruiter';
  let endpointTimer = 0;

  const setButtonIconState = (btn: HTMLElement, copied: boolean): void => {
    const copyIcon = btn.querySelector<HTMLElement>('[data-copy-icon]');
    const checkIcon = btn.querySelector<HTMLElement>('[data-check-icon]');
    if (copyIcon) copyIcon.hidden = copied;
    if (checkIcon) checkIcon.hidden = !copied;
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
    });
  });

  endpointBtn?.addEventListener('click', async () => {
    const url = endpointBtn.dataset.endpointUrl || '';
    if (!url) return;
    const ok = await copyToClipboard(url);
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
}

initMcpConsole();
