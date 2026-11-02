import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePreferences } from '@/context/PreferencesContext';
import { ARCHITECTURE_STUDIO_CONTENT } from '@/data/architecture-studio';
import styles from './macbook-showcase.module.css';

const CLOSED_ANGLE = -101;
const INITIAL_OPEN_ANGLE = -12;
const SCROLL_OPEN_ANGLE = -2;

const EXTRUSION_LAYERS = [-1.5, -3, -4.5, -6, -7.5, -9, -10.5, -12];
const LID_THICKNESS_LAYERS = [-1.2, -2.4, -3.6];

export const MacBookShowcase: React.FC = () => {
  const { locale } = usePreferences();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(1);
  const [isReplaying, setIsReplaying] = useState(false);

  const studio = ARCHITECTURE_STUDIO_CONTENT[locale];
  const currentTab = studio.tabs[activeTabIndex] || studio.tabs[0];
  const activeNode = currentTab.nodes[selectedNodeIndex] || currentTab.nodes[1];

  const handleSelectTab = (index: number): void => {
    setActiveTabIndex(index);
    setSelectedNodeIndex(1);
  };

  const applyAngleToDom = useCallback((angleDeg: number) => {
    const rig = rigRef.current;
    if (!rig) return;

    const clamped = Math.max(CLOSED_ANGLE, Math.min(0, angleDeg));
    const openRatio = (clamped - CLOSED_ANGLE) / (0 - CLOSED_ANGLE);
    const screenWake = Math.max(0, Math.min(1, (clamped - -89) / 46));

    rig.style.setProperty('--lid-angle', `${clamped.toFixed(2)}deg`);
    rig.style.setProperty('--open-ratio', openRatio.toFixed(4));
    rig.style.setProperty('--screen-wake', screenWake.toFixed(4));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      applyAngleToDom(SCROLL_OPEN_ANGLE);
      return;
    }

    let introProgress = 0;
    let scrollBoost = 0;
    let rafId = 0;
    let introFrameId = 0;
    let startTime = 0;
    const introDuration = 1600;

    applyAngleToDom(CLOSED_ANGLE);

    const easeAppleOut = (t: number): number => 1 - Math.pow(1 - t, 3.5);

    const computeScrollBoost = (): number => {
      const stage = stageRef.current;
      if (!stage) return 0;
      const rect = stage.getBoundingClientRect();
      const viewportH = window.innerHeight || 900;
      const raw = (viewportH * 0.8 - rect.top) / (viewportH * 0.55);
      return Math.max(0, Math.min(1, raw));
    };

    const renderCurrentAngle = (): void => {
      const baseTarget = CLOSED_ANGLE + (INITIAL_OPEN_ANGLE - CLOSED_ANGLE) * introProgress;
      const finalAngle =
        baseTarget + (SCROLL_OPEN_ANGLE - baseTarget) * (scrollBoost * introProgress);
      applyAngleToDom(finalAngle);
    };

    const stepIntro = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const elapsed = Math.max(0, timestamp - startTime - 240);
      const rawT = Math.min(1, elapsed / introDuration);
      introProgress = easeAppleOut(rawT);
      scrollBoost = computeScrollBoost();
      renderCurrentAngle();

      if (rawT < 1) {
        introFrameId = window.requestAnimationFrame(stepIntro);
      }
    };

    introFrameId = window.requestAnimationFrame(stepIntro);

    const onScroll = (): void => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        scrollBoost = computeScrollBoost();
        renderCurrentAngle();
        rafId = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(introFrameId);
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [applyAngleToDom]);

  const handleReplay = (): void => {
    if (isReplaying) return;
    setIsReplaying(true);

    const startClose = performance.now();
    const closeDuration = 560;
    const openDuration = 1420;

    const easeInOut = (t: number): number =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3.5);

    const animateReplay = (now: number): void => {
      const elapsed = now - startClose;

      if (elapsed <= closeDuration) {
        const t = easeInOut(Math.min(1, elapsed / closeDuration));
        const angle = SCROLL_OPEN_ANGLE + (CLOSED_ANGLE - SCROLL_OPEN_ANGLE) * t;
        applyAngleToDom(angle);
        window.requestAnimationFrame(animateReplay);
        return;
      }

      const pauseElapsed = elapsed - closeDuration - 180;
      if (pauseElapsed < 0) {
        applyAngleToDom(CLOSED_ANGLE);
        window.requestAnimationFrame(animateReplay);
        return;
      }

      const openT = Math.min(1, pauseElapsed / openDuration);
      const angle = CLOSED_ANGLE + (SCROLL_OPEN_ANGLE - CLOSED_ANGLE) * easeOut(openT);
      applyAngleToDom(angle);

      if (openT < 1) {
        window.requestAnimationFrame(animateReplay);
      } else {
        setIsReplaying(false);
      }
    };

    window.requestAnimationFrame(animateReplay);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    const rig = rigRef.current;
    if (!rig) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const normX = (event.clientX - rect.left) / rect.width - 0.5;
    const normY = (event.clientY - rect.top) / rect.height - 0.5;
    rig.style.setProperty('--tilt-y', `${(normX * 3.8).toFixed(2)}deg`);
    rig.style.setProperty('--tilt-x', `${(-normY * 2.0).toFixed(2)}deg`);
    rig.style.setProperty('--sheen-x', `${((normX + 0.5) * 100).toFixed(1)}%`);
  };

  const handleMouseLeave = (): void => {
    const rig = rigRef.current;
    if (!rig) return;
    rig.style.setProperty('--tilt-y', '0deg');
    rig.style.setProperty('--tilt-x', '0deg');
    rig.style.setProperty('--sheen-x', '50%');
  };

  const highlightBeam1 = selectedNodeIndex === 0 || selectedNodeIndex === 1;
  const highlightBeam2 = selectedNodeIndex === 1 || selectedNodeIndex === 2;
  const highlightBeam3 = selectedNodeIndex === 1 || selectedNodeIndex === 3;

  const renderInteractiveNode = (nodeIdx: 0 | 1 | 2 | 3, isPrimaryCore = false): JSX.Element => {
    const node = currentTab.nodes[nodeIdx];
    const isSelected = selectedNodeIndex === nodeIdx;

    return (
      <button
        key={node.id}
        type="button"
        onClick={() => setSelectedNodeIndex(nodeIdx)}
        onMouseEnter={() => setSelectedNodeIndex(nodeIdx)}
        className={`${styles.archNode} ${isPrimaryCore ? styles.archNodeCore : ''} ${
          isSelected ? styles.archNodeSelected : ''
        }`}
        aria-pressed={isSelected}
      >
        <div className={styles.nodeHeader}>
          <span
            className={`${styles.nodeDot} ${isSelected ? styles.nodeDotActive : ''}`}
            aria-hidden="true"
          />
          <span className={styles.nodeTitle}>{node.title}</span>
        </div>
        <span className={styles.nodeSub}>{node.subtitle}</span>
      </button>
    );
  };

  return (
    <div
      ref={stageRef}
      className={styles.stageWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={rigRef} className={styles.macbookScene}>
        <div className={styles.macbookRig}>
          {/* =========================================================
              1. UNIBODY DISPLAY LID (Exact same 680x434 footprint as Base)
             ========================================================= */}
          <div className={styles.lidAssembly}>
            {LID_THICKNESS_LAYERS.map((z) => (
              <div
                key={z}
                className={styles.lidAluminumSlice}
                style={{ transform: `translateZ(${z}px)` }}
                aria-hidden="true"
              />
            ))}

            {/* Outer Anodized Space Black Top Shell (Visible when closed) */}
            <div className={styles.lidOuterCover} aria-hidden="true">
              <div className={styles.lidOuterGlint} />
              <div className={styles.lidOuterEmblem}>S</div>
            </div>

            {/* Inner Liquid Retina XDR Display */}
            <div className={styles.lidInnerScreen}>
              <div className={styles.glassReflection} aria-hidden="true" />

              <div className={styles.retinaDisplay}>
                {/* Authentic M4 MacBook Pro Camera Notch */}
                <div className={styles.cameraNotch} aria-hidden="true">
                  <span className={styles.cameraLens} />
                  <span className={styles.cameraSensorDot} />
                </div>

                {/* macOS Top Menu Bar */}
                <div className={styles.macosTopBar}>
                  <div className={styles.topBarLeft}>
                    <span className={styles.appleGlyph}>&#63743;</span>
                    <span className={styles.activeAppName}>{studio.menuApp}</span>
                  </div>

                  <div className={styles.topBarRight}>
                    <span className={styles.liveBadge}>
                      <span className={styles.livePulseDot} />
                      {currentTab.statusBadge}
                    </span>
                    <span className={styles.clockText}>9:41 AM</span>
                  </div>
                </div>

                {/* Main macOS Application Window */}
                <div className={styles.appWindow}>
                  <div className={styles.windowHeader}>
                    <div className={styles.trafficLights} aria-hidden="true">
                      <span className={`${styles.trafficDot} ${styles.dotClose}`} />
                      <span className={`${styles.trafficDot} ${styles.dotMinimize}`} />
                      <span className={`${styles.trafficDot} ${styles.dotZoom}`} />
                    </div>

                    {/* Synchronized In-Screen macOS Window Tabs */}
                    <div className={styles.windowTabs} role="tablist">
                      {studio.tabs.map((tab, idx) => {
                        const isTabActive = idx === activeTabIndex;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={isTabActive}
                            onClick={() => handleSelectTab(idx)}
                            className={`${styles.windowTabBtn} ${
                              isTabActive ? styles.windowTabBtnActive : ''
                            }`}
                          >
                            {tab.shortTabLabel}
                          </button>
                        );
                      })}
                    </div>

                    <span className={styles.windowRegionTag}>{currentTab.windowContext}</span>
                  </div>

                  {/* Interactive Directed Graph Stage */}
                  <div key={currentTab.id} className={styles.graphStage}>
                    <svg
                      viewBox="0 0 600 180"
                      preserveAspectRatio="none"
                      className={styles.conduitSvg}
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="beamWhite" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#d2d2d7" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="centerAura" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </radialGradient>
                      </defs>

                      <circle
                        cx="295"
                        cy="90"
                        r="68"
                        fill="url(#centerAura)"
                        className={styles.ambientCorePulse}
                      />

                      <circle
                        cx="295"
                        cy="90"
                        r="50"
                        fill="none"
                        stroke="rgba(255,255,255,0.14)"
                        strokeWidth="1"
                        strokeDasharray="5 7"
                        className={styles.orbitRing}
                      />

                      {/* Base Conduit Splines (Highlighted along active node path!) */}
                      <g fill="none" strokeLinecap="round">
                        <path
                          d="M 176 90 C 188 90, 192 90, 204 90"
                          stroke={
                            highlightBeam1 ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.13)'
                          }
                          strokeWidth={highlightBeam1 ? '2' : '1.4'}
                        />
                        <path
                          d="M 386 90 C 399 90, 400 64, 413 64"
                          stroke={
                            highlightBeam2 ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.13)'
                          }
                          strokeWidth={highlightBeam2 ? '2' : '1.4'}
                        />
                        <path
                          d="M 386 90 C 399 90, 400 116, 413 116"
                          stroke={
                            highlightBeam3 ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.13)'
                          }
                          strokeWidth={highlightBeam3 ? '2' : '1.4'}
                        />
                      </g>

                      {/* Animated Vector Light Pulses */}
                      <g
                        fill="none"
                        stroke="url(#beamWhite)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <path
                          d="M 176 90 C 188 90, 192 90, 204 90"
                          className={styles.animatedBeam1}
                        />
                        <path
                          d="M 386 90 C 399 90, 400 64, 413 64"
                          className={styles.animatedBeam2}
                        />
                        <path
                          d="M 386 90 C 399 90, 400 116, 413 116"
                          className={styles.animatedBeam3}
                        />
                      </g>
                    </svg>

                    {/* 4 Interactive Clickable / Hoverable Nodes */}
                    <div className={styles.nodesGrid}>
                      <div className={styles.nodeColLeft}>{renderInteractiveNode(0)}</div>

                      <div className={styles.nodeColCenter}>{renderInteractiveNode(1, true)}</div>

                      <div className={styles.nodeColRight}>
                        {renderInteractiveNode(2)}
                        {renderInteractiveNode(3)}
                      </div>
                    </div>
                  </div>

                  {/* Live Technical Node Inspector Dock */}
                  <div className={styles.inspectorDock} aria-live="polite">
                    <div className={styles.inspectorInfo}>
                      <div className={styles.inspectorHeaderRow}>
                        <span className={styles.inspectorTitle}>{activeNode.title}</span>
                        <span className={styles.inspectorRolePill}>{activeNode.roleTag}</span>
                      </div>
                      <p className={styles.inspectorSummary}>{activeNode.summary}</p>
                    </div>

                    <ul className={styles.inspectorChips}>
                      {activeNode.chips.map((chip) => (
                        <li key={chip} className={styles.inspectorChip}>
                          {chip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              2. RECESSED CLAMSHELL HINGE CLUTCH
             ========================================================= */}
          <div className={styles.hingeClutch} aria-hidden="true" />

          {/* =========================================================
              3. SOLID EXTRUDED CNC UNIBODY SPACE BLACK BASE (680x434)
             ========================================================= */}
          <div className={styles.baseAssembly} aria-hidden="true">
            <div className={styles.baseTopDeck}>
              <svg
                viewBox="0 0 680 434"
                className={styles.topCaseSvg}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="deckAluminum"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="434"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#1e1e22" />
                    <stop offset="48%" stopColor="#252529" />
                    <stop offset="100%" stopColor="#2e2e33" />
                  </linearGradient>
                  <pattern id="speakerDots" width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="0.85" fill="#09090b" opacity="0.82" />
                  </pattern>
                </defs>

                <rect
                  x="0.75"
                  y="0.75"
                  width="678.5"
                  height="432.5"
                  rx="22"
                  fill="url(#deckAluminum)"
                  stroke="rgba(255,255,255,0.16)"
                  strokeWidth="1.5"
                />

                <rect x="86" y="4" width="508" height="7" rx="3" fill="#09090b" opacity="0.85" />

                <rect x="20" y="34" width="38" height="214" rx="4" fill="url(#speakerDots)" />
                <rect x="622" y="34" width="38" height="214" rx="4" fill="url(#speakerDots)" />

                <rect
                  x="68"
                  y="28"
                  width="544"
                  height="226"
                  rx="10"
                  fill="#0b0b0d"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />

                {/* Row 1: Esc + Function Keys + Touch ID */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="35" width="46" height="24" rx="4" />
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <rect key={`fn-${idx}`} x={126 + idx * 37} y="35" width="33" height="24" rx="4" />
                  ))}
                  <rect x="570" y="35" width="34" height="24" rx="4" />
                  <circle
                    cx="587"
                    cy="47"
                    r="7.5"
                    fill="#111114"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1"
                  />
                </g>

                {/* Row 2: Number Row */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  {Array.from({ length: 13 }).map((_, idx) => (
                    <rect key={`r2-${idx}`} x={76 + idx * 36.5} y="64" width="32.5" height="33" rx="4.5" />
                  ))}
                  <rect x="550.5" y="64" width="53.5" height="33" rx="4.5" />
                </g>

                {/* Row 3: Tab + QWERTY */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="102" width="52" height="33" rx="4.5" />
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <rect key={`r3-${idx}`} x={132 + idx * 36.3} y="102" width="32.3" height="33" rx="4.5" />
                  ))}
                  <rect x="568" y="102" width="36" height="33" rx="4.5" />
                </g>

                {/* Row 4: Caps + ASDF + Return */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="140" width="62" height="33" rx="4.5" />
                  {Array.from({ length: 11 }).map((_, idx) => (
                    <rect key={`r4-${idx}`} x={142 + idx * 36.3} y="140" width="32.3" height="33" rx="4.5" />
                  ))}
                  <rect x="541.5" y="140" width="62.5" height="33" rx="4.5" />
                </g>

                {/* Row 5: Shift + ZXCV + Shift */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="178" width="80" height="33" rx="4.5" />
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <rect key={`r5-${idx}`} x={160 + idx * 36.3} y="178" width="32.3" height="33" rx="4.5" />
                  ))}
                  <rect x="523" y="178" width="81" height="33" rx="4.5" />
                </g>

                {/* Row 6: Modifiers + Spacebar + Arrows */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="216" width="35" height="31" rx="4.5" />
                  <rect x="115" y="216" width="35" height="31" rx="4.5" />
                  <rect x="154" y="216" width="35" height="31" rx="4.5" />
                  <rect x="193" y="216" width="46" height="31" rx="4.5" />
                  <rect x="243" y="216" width="182" height="31" rx="4.5" />
                  <rect x="429" y="216" width="46" height="31" rx="4.5" />
                  <rect x="479" y="216" width="35" height="31" rx="4.5" />
                  <rect x="518" y="232" width="26" height="15" rx="3" />
                  <rect x="548" y="216" width="26" height="14.5" rx="3" />
                  <rect x="548" y="232.5" width="26" height="14.5" rx="3" />
                  <rect x="578" y="232" width="26" height="15" rx="3" />
                </g>

                {/* Force Touch Trackpad */}
                <rect
                  x="212"
                  y="266"
                  width="256"
                  height="152"
                  rx="11"
                  fill="#202024"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.2"
                />

                {/* CNC Thumb-Scoop Cutout */}
                <path
                  d="M 292 433.5 L 298 426 L 382 426 L 388 433.5 Z"
                  fill="#101013"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {EXTRUSION_LAYERS.map((z, idx) => (
              <div
                key={z}
                className={`${styles.chassisExtrusionSlice} ${
                  idx === EXTRUSION_LAYERS.length - 1 ? styles.chassisBottomBevel : ''
                }`}
                style={{ transform: `translateZ(${z}px)` }}
              >
                {idx < 5 && <span className={styles.frontThumbGroove} />}
              </div>
            ))}

            <div className={styles.rubberFootLeft} />
            <div className={styles.rubberFootRight} />
          </div>

          <div className={styles.contactShadow} aria-hidden="true" />
          <div className={styles.ambientFloorShadow} aria-hidden="true" />
        </div>
      </div>

      {/* =========================================================
          4. APPLE SEGMENTED DOMAIN SWITCHER + REPLAY CONTROL
         ========================================================= */}
      <div className={styles.stageControls}>
        <div className={styles.segmentedRow}>
          <div className={styles.segmentedTrack} role="tablist" aria-label={studio.menuApp}>
            {studio.tabs.map((tab, idx) => {
              const isActive = idx === activeTabIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectTab(idx)}
                  className={`${styles.segmentPill} ${isActive ? styles.segmentPillActive : ''}`}
                >
                  {tab.tabLabel}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleReplay}
            className={styles.replayIconButton}
            disabled={isReplaying}
            aria-label={studio.replayLabel}
            title={studio.replayLabel}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M13.5 8A5.5 5.5 0 1 1 11.9 4.1L13.5 5.7M13.5 2.5V5.7H10.3"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <p className={styles.helperCaption}>{studio.helperHint}</p>
      </div>
    </div>
  );
};

export default MacBookShowcase;
