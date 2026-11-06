import type { StudioTopology } from '@/data/architecture-studio';

interface StudioNodeMeta {
  title: string;
  roleTag: string;
  summary: string;
  chips: string[];
}

interface StudioTabMeta {
  id: string;
  topology: StudioTopology;
  statusBadge: string;
  windowContext: string;
  defaultNodeIdx: number;
  nodes: StudioNodeMeta[];
}

const CLOSED_ANGLE = -101;
const INITIAL_OPEN_ANGLE = -12;
const SCROLL_OPEN_ANGLE = -2;

const easeMacBookOpen = (t: number): number => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const p = Math.pow(t, 2.05);
  const q = Math.pow(1 - t, 2.45);
  return p / (p + q);
};

const easeMacBookClose = (t: number): number => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const formatVisitorLocalTime = (): { full: string; short: string } => {
  try {
    const now = new Date();
    const weekday = new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(now);
    const day = now.getDate();
    const month = new Intl.DateTimeFormat(undefined, { month: 'short' }).format(now);
    const time = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(now);
    return {
      full: `${weekday} ${day} ${month}  ${time}`,
      short: time,
    };
  } catch {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const timeStr = `${hour12}:${minutes} ${suffix}`;
    return {
      full: timeStr,
      short: timeStr,
    };
  }
};

function initMacBookStudio(): void {
  const stageEl = document.querySelector<HTMLElement>('[data-macbook-studio]');
  if (!stageEl) return;

  let tabs: StudioTabMeta[] = [];
  try {
    tabs = JSON.parse(stageEl.dataset.studioPayload || '[]');
  } catch {
    return;
  }
  if (!tabs.length) return;

  const sceneEl = stageEl.querySelector<HTMLElement>('[data-studio-scene]');
  const tiltStageEl = stageEl.querySelector<HTMLElement>('[data-studio-tilt]');
  const rigEl = stageEl.querySelector<HTMLElement>('[data-studio-rig]');
  const lidEl = stageEl.querySelector<HTMLElement>('[data-studio-lid]');
  const glintEl = stageEl.querySelector<HTMLElement>('[data-studio-glint]');
  const reflectionEl = stageEl.querySelector<HTMLElement>('[data-studio-reflection]');
  const screenVeilEl = stageEl.querySelector<HTMLElement>('[data-studio-screen-veil]');
  const deckVeilEl = stageEl.querySelector<HTMLElement>('[data-studio-deck-veil]');
  const contactShadowEl = stageEl.querySelector<HTMLElement>('[data-studio-contact-shadow]');
  const ambientShadowEl = stageEl.querySelector<HTMLElement>('[data-studio-ambient-shadow]');

  const clockFullEl = stageEl.querySelector<HTMLElement>('[data-clock-full]');
  const clockShortEl = stageEl.querySelector<HTMLElement>('[data-clock-short]');
  const liveBadgeTextEl = stageEl.querySelector<HTMLElement>('[data-live-badge-text]');
  const windowRegionEl = stageEl.querySelector<HTMLElement>('[data-window-region]');
  const inspectorTitleEl = stageEl.querySelector<HTMLElement>('[data-inspector-title]');
  const inspectorRoleEl = stageEl.querySelector<HTMLElement>('[data-inspector-role]');
  const inspectorSummaryEl = stageEl.querySelector<HTMLElement>('[data-inspector-summary]');
  const inspectorChipsEl = stageEl.querySelector<HTMLElement>('[data-inspector-chips]');
  const replayBtn = stageEl.querySelector<HTMLButtonElement>('[data-studio-replay]');

  const tabButtons = Array.from(stageEl.querySelectorAll<HTMLButtonElement>('[data-studio-tab]'));
  const panels = Array.from(stageEl.querySelectorAll<HTMLElement>('[data-studio-panel]'));
  const chipClass = inspectorChipsEl?.dataset.chipClass || '';

  // 1. Live Visitor Menu Bar Clock
  const tickClock = (): void => {
    const { full, short } = formatVisitorLocalTime();
    if (clockFullEl) clockFullEl.textContent = full;
    if (clockShortEl) clockShortEl.textContent = short;
    const msUntilNextMinute = 60000 - (Date.now() % 60000) + 60;
    window.setTimeout(tickClock, msUntilNextMinute);
  };
  tickClock();

  // 2. Interactive Domain Tabs, Nodes, SVG Beams & Inspector Dock
  let activeTabIndex = 0;
  let selectedNodeIndex = tabs[0].defaultNodeIdx;

  const updateBeamAttributes = (
    panel: HTMLElement,
    topology: StudioTopology,
    sel: number
  ): void => {
    const b1 = sel === 0 || sel === 1;
    const b2 = topology === 'telemetry-bus' ? sel === 0 || sel === 2 : sel === 1 || sel === 2;
    const b3 =
      topology === 'telemetry-bus'
        ? sel === 0 || sel === 3
        : topology === 'release-pipeline'
          ? sel === 2 || sel === 3
          : sel === 1 || sel === 3;
    const workerDb = topology === 'cloud-mesh' && (sel === 2 || sel === 3);

    panel.querySelectorAll<SVGPathElement>('path[data-beam]').forEach((path) => {
      const kind = path.dataset.beam;
      const isHighlighted =
        kind === '1' || kind === '1-rev'
          ? b1
          : kind === '2'
            ? b2
            : kind === '3'
              ? b3
              : kind === 'worker-db'
                ? workerDb
                : false;

      const stroke = isHighlighted ? path.dataset.strokeOn : path.dataset.strokeOff;
      const width = isHighlighted ? path.dataset.widthOn : path.dataset.widthOff;
      if (stroke) path.setAttribute('stroke', stroke);
      if (width) path.setAttribute('stroke-width', width);
    });
  };

  const renderInspector = (node: StudioNodeMeta): void => {
    if (inspectorTitleEl) inspectorTitleEl.textContent = node.title;
    if (inspectorRoleEl) inspectorRoleEl.textContent = node.roleTag;
    if (inspectorSummaryEl) inspectorSummaryEl.textContent = node.summary;
    if (inspectorChipsEl) {
      inspectorChipsEl.replaceChildren(
        ...node.chips.map((chip) => {
          const li = document.createElement('li');
          if (chipClass) li.className = chipClass;
          li.textContent = chip;
          return li;
        })
      );
    }
  };

  const syncPanelSelection = (): void => {
    const tab = tabs[activeTabIndex];
    if (!tab) return;

    const panel = panels[activeTabIndex];
    if (panel) {
      panel.querySelectorAll<HTMLButtonElement>('button[data-node-idx]').forEach((btn) => {
        const idx = Number(btn.dataset.nodeIdx);
        btn.setAttribute('aria-pressed', idx === selectedNodeIndex ? 'true' : 'false');
      });

      panel.querySelectorAll<HTMLElement>('[data-signal-sink]').forEach((pill) => {
        const sinkIdx = Number(pill.dataset.signalSink);
        pill.dataset.active =
          selectedNodeIndex === 0 || selectedNodeIndex === sinkIdx ? 'true' : 'false';
      });

      updateBeamAttributes(panel, tab.topology, selectedNodeIndex);
    }

    const activeNode = tab.nodes[selectedNodeIndex] || tab.nodes[0];
    if (activeNode) renderInspector(activeNode);
  };

  const selectNode = (nodeIdx: number): void => {
    if (selectedNodeIndex === nodeIdx) return;
    selectedNodeIndex = nodeIdx;
    syncPanelSelection();
  };

  const selectTab = (nextIndex: number): void => {
    if (nextIndex < 0 || nextIndex >= tabs.length) return;
    activeTabIndex = nextIndex;
    const tab = tabs[activeTabIndex];
    selectedNodeIndex = tab.defaultNodeIdx;

    if (liveBadgeTextEl) liveBadgeTextEl.textContent = tab.statusBadge;
    if (windowRegionEl) windowRegionEl.textContent = tab.windowContext;

    tabButtons.forEach((btn) => {
      const idx = Number(btn.dataset.studioTab);
      btn.setAttribute('aria-selected', idx === activeTabIndex ? 'true' : 'false');
    });

    panels.forEach((panel, idx) => {
      panel.hidden = idx !== activeTabIndex;
    });

    syncPanelSelection();
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectTab(Number(btn.dataset.studioTab));
    });
  });

  const isCoarsePointer = Boolean(
    window.matchMedia && window.matchMedia('(pointer: coarse)').matches
  );

  panels.forEach((panel) => {
    panel.querySelectorAll<HTMLButtonElement>('button[data-node-idx]').forEach((btn) => {
      const idx = Number(btn.dataset.nodeIdx);
      btn.addEventListener('click', () => selectNode(idx));
      if (!isCoarsePointer) {
        btn.addEventListener('mouseenter', () => selectNode(idx));
      }
    });

    panel.querySelectorAll<HTMLButtonElement>('button[data-signal-sink]').forEach((pill) => {
      const sinkIdx = Number(pill.dataset.signalSink);
      pill.addEventListener('click', () => selectNode(sinkIdx));
      if (!isCoarsePointer) {
        pill.addEventListener('mouseenter', () => selectNode(sinkIdx));
      }
    });
  });

  // 3. 120fps Mobile-Safe 3D Unibody Lid Physics (Zero Layout Thrashing, Direct Leaf Transforms)
  let isCompact = window.innerWidth <= 760;
  let lastAppliedAngle = Number.NaN;
  let isReplaying = false;

  const applyAngleToDom = (angleDeg: number, force = false): void => {
    const clamped = Math.max(CLOSED_ANGLE, Math.min(0, angleDeg));
    if (!force && Math.abs(clamped - lastAppliedAngle) < 0.004) {
      return;
    }
    lastAppliedAngle = clamped;

    const openRatio = (clamped - CLOSED_ANGLE) / (0 - CLOSED_ANGLE);
    const invRatio = 1 - openRatio;
    const screenWake = Math.max(0, Math.min(1, (clamped - -86) / 44));
    const deckWake = Math.max(0, Math.min(1, (clamped - -92) / 26));

    if (rigEl) {
      rigEl.style.transform = `translate3d(0, ${(invRatio * -26).toFixed(2)}px, 0) rotateX(${(
        invRatio * -15
      ).toFixed(2)}deg) scale(${(0.95 + openRatio * 0.05).toFixed(4)})`;
    }

    if (lidEl) {
      lidEl.style.transform = `translate3d(0, -4px, 1.5px) rotateX(${clamped.toFixed(2)}deg)`;
    }

    if (clamped < -80 && glintEl) {
      glintEl.style.transform = `translate3d(${((openRatio - 0.32) * 96).toFixed(1)}%, 0, 0)`;
    }

    if (screenVeilEl) {
      const veilAlpha = 1 - screenWake;
      if (veilAlpha <= 0.002) {
        if (screenVeilEl.style.visibility !== 'hidden') {
          screenVeilEl.style.opacity = '0';
          screenVeilEl.style.visibility = 'hidden';
        }
      } else {
        if (screenVeilEl.style.visibility === 'hidden') {
          screenVeilEl.style.visibility = 'visible';
        }
        screenVeilEl.style.opacity = veilAlpha.toFixed(3);
      }
    }

    if (deckVeilEl) {
      const deckAlpha = 1 - deckWake;
      if (deckAlpha <= 0.002) {
        if (deckVeilEl.style.visibility !== 'hidden') {
          deckVeilEl.style.opacity = '0';
          deckVeilEl.style.visibility = 'hidden';
        }
      } else {
        if (deckVeilEl.style.visibility === 'hidden') {
          deckVeilEl.style.visibility = 'visible';
        }
        deckVeilEl.style.opacity = deckAlpha.toFixed(3);
      }
    }

    if (contactShadowEl) {
      const travelPx = isCompact ? 42 : 64;
      contactShadowEl.style.transform = `translate3d(0, ${(invRatio * travelPx).toFixed(1)}px, 0)`;
    }

    if (ambientShadowEl) {
      ambientShadowEl.style.transform = `scale3d(${(0.92 + openRatio * 0.08).toFixed(3)}, 1, 1)`;
    }
  };

  const prefersReducedMotion = Boolean(
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  if (prefersReducedMotion) {
    if (sceneEl) sceneEl.dataset.lidMoving = 'false';
    applyAngleToDom(SCROLL_OPEN_ANGLE, true);
  } else {
    let introProgress = 0;
    let scrollBoost = 0;
    let scrollRafId = 0;
    let startTime = 0;
    let stageDocTop = 0;
    let viewportH = window.innerHeight || 900;
    const initialHoldMs = 360;
    const introDuration = 2400;

    const measureStageGeometry = (): void => {
      isCompact = window.innerWidth <= 760;
      viewportH = window.innerHeight || 900;
      const rect = stageEl.getBoundingClientRect();
      stageDocTop = rect.top + (window.scrollY || window.pageYOffset || 0);
    };

    const computeScrollBoostFromScrollY = (): number => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const rectTop = stageDocTop - scrollY;
      const raw = (viewportH * 0.8 - rectTop) / (viewportH * 0.55);
      return Math.max(0, Math.min(1, raw));
    };

    const renderCurrentAngle = (force = false): void => {
      if (isReplaying) return;
      const baseTarget = CLOSED_ANGLE + (INITIAL_OPEN_ANGLE - CLOSED_ANGLE) * introProgress;
      const finalAngle =
        baseTarget + (SCROLL_OPEN_ANGLE - baseTarget) * (scrollBoost * introProgress);
      applyAngleToDom(finalAngle, force);
    };

    if (sceneEl) sceneEl.dataset.lidMoving = 'true';
    measureStageGeometry();
    scrollBoost = computeScrollBoostFromScrollY();
    applyAngleToDom(CLOSED_ANGLE, true);

    const stepIntro = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const elapsed = Math.max(0, timestamp - startTime - initialHoldMs);
      const rawT = Math.min(1, elapsed / introDuration);
      introProgress = easeMacBookOpen(rawT);
      renderCurrentAngle();

      if (rawT < 1) {
        window.requestAnimationFrame(stepIntro);
      } else if (sceneEl && !isReplaying) {
        sceneEl.dataset.lidMoving = 'false';
      }
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        measureStageGeometry();
        scrollBoost = computeScrollBoostFromScrollY();
        window.requestAnimationFrame(stepIntro);
      });
    });

    window.addEventListener(
      'scroll',
      () => {
        if (scrollRafId || isReplaying) return;
        scrollRafId = window.requestAnimationFrame(() => {
          scrollBoost = computeScrollBoostFromScrollY();
          renderCurrentAngle();
          scrollRafId = 0;
        });
      },
      { passive: true }
    );

    window.addEventListener(
      'resize',
      () => {
        if (scrollRafId) return;
        scrollRafId = window.requestAnimationFrame(() => {
          measureStageGeometry();
          scrollBoost = computeScrollBoostFromScrollY();
          renderCurrentAngle(true);
          scrollRafId = 0;
        });
      },
      { passive: true }
    );
  }

  // 4. Replay Button
  replayBtn?.addEventListener('click', () => {
    if (isReplaying) return;
    isReplaying = true;
    replayBtn.disabled = true;
    if (sceneEl) sceneEl.dataset.lidMoving = 'true';

    const startClose = performance.now();
    const closeDuration = 920;
    const closedHoldDuration = 480;
    const openDuration = 2400;

    const animateReplay = (now: number): void => {
      const elapsed = now - startClose;

      if (elapsed <= closeDuration) {
        const t = easeMacBookClose(Math.min(1, elapsed / closeDuration));
        const angle = SCROLL_OPEN_ANGLE + (CLOSED_ANGLE - SCROLL_OPEN_ANGLE) * t;
        applyAngleToDom(angle);
        window.requestAnimationFrame(animateReplay);
        return;
      }

      const pauseElapsed = elapsed - closeDuration - closedHoldDuration;
      if (pauseElapsed < 0) {
        applyAngleToDom(CLOSED_ANGLE);
        window.requestAnimationFrame(animateReplay);
        return;
      }

      const openT = Math.min(1, pauseElapsed / openDuration);
      const angle = CLOSED_ANGLE + (SCROLL_OPEN_ANGLE - CLOSED_ANGLE) * easeMacBookOpen(openT);
      applyAngleToDom(angle);

      if (openT < 1) {
        window.requestAnimationFrame(animateReplay);
      } else {
        if (sceneEl) sceneEl.dataset.lidMoving = 'false';
        isReplaying = false;
        replayBtn.disabled = false;
      }
    };

    window.requestAnimationFrame(animateReplay);
  });

  // 5. Desktop Pointer 3D Tilt & Glass Specular Sheen (Skipped on Coarse Touch Devices)
  if (!isCoarsePointer && tiltStageEl) {
    stageEl.addEventListener('mousemove', (event: MouseEvent) => {
      const rect = stageEl.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const normX = (event.clientX - rect.left) / rect.width - 0.5;
      const normY = (event.clientY - rect.top) / rect.height - 0.5;
      tiltStageEl.style.transform = `rotateX(${(-normY * 2.0).toFixed(2)}deg) rotateY(${(
        normX * 3.8
      ).toFixed(2)}deg)`;

      if (reflectionEl) {
        const sheenX = ((normX + 0.5) * 100).toFixed(1);
        reflectionEl.style.background = `linear-gradient(118deg, transparent 18%, rgba(255, 255, 255, 0.04) ${sheenX}%, rgba(255, 255, 255, 0.012) ${(
          Number(sheenX) + 14
        ).toFixed(1)}%, transparent 78%)`;
      }
    });

    stageEl.addEventListener('mouseleave', () => {
      tiltStageEl.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }
}

initMacBookStudio();
