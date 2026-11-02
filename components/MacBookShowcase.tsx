import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePreferences } from '@/context/PreferencesContext';
import styles from './macbook-showcase.module.css';

/*
 * Exact 3D clamshell geometry:
 * Base plane is rotated +76deg around X from the shared rear hinge (50% 0%).
 * Lid plane has the exact same 680x434 dimensions and hinges from 50% 100%.
 * At -(180 - 76) = -104deg, the lid lies 100% flush and parallel on top of the base!
 */
const CLOSED_ANGLE = -101;
const INITIAL_OPEN_ANGLE = -12;
const SCROLL_OPEN_ANGLE = -2;

const EXTRUSION_LAYERS = [-1.5, -3, -4.5, -6, -7.5, -9, -10.5, -12];
const LID_THICKNESS_LAYERS = [-1.2, -2.4, -3.6];

export const MacBookShowcase: React.FC = () => {
  const { locale } = usePreferences();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);
  const [isReplaying, setIsReplaying] = useState(false);

  const isEs = locale === 'es';

  const copy = {
    caption: isEs
      ? 'Arquitectura en producción · Backend, IA & Observabilidad'
      : 'Production Architecture · Backend, AI & Observability',
    replayLabel: isEs ? 'Repetir apertura' : 'Replay lid motion',
    menuApp: 'Architecture Studio',
    menuLive: 'MCP Gateway · Live',
    nodeIngressTitle: 'Edge & API',
    nodeIngressSub: 'Cloudflare · REST / GQL',
    nodeCoreTitle: 'Core Services',
    nodeCoreSub: 'NestJS · Spring Boot · DDD',
    nodeDataTitle: 'Data & Locks',
    nodeDataSub: 'PostgreSQL · Redis',
    nodeAiTitle: 'AI & Telemetry',
    nodeAiSub: 'MCP · Datadog · CleverTap',
    metric1Label: isEs ? 'Disponibilidad' : 'Service Health',
    metric1Value: '99.98% SLA',
    metric2Label: isEs ? 'Concurrencia' : 'Concurrency',
    metric2Value: 'Redis Locks',
    metric3Label: isEs ? 'Flujos con IA' : 'AI Workflows',
    metric3Value: 'MCP + AI Gateway',
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
    rig.style.setProperty('--tilt-y', `${(normX * 4.5).toFixed(2)}deg`);
    rig.style.setProperty('--tilt-x', `${(-normY * 2.4).toFixed(2)}deg`);
    rig.style.setProperty('--sheen-x', `${((normX + 0.5) * 100).toFixed(1)}%`);
  };

  const handleMouseLeave = (): void => {
    const rig = rigRef.current;
    if (!rig) return;
    rig.style.setProperty('--tilt-y', '0deg');
    rig.style.setProperty('--tilt-x', '0deg');
    rig.style.setProperty('--sheen-x', '50%');
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
            {/* Extruded CNC Aluminum Lid Rim Slices */}
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

                {/* macOS Sequoia Dark Wallpaper + Top Menu Bar */}
                <div className={styles.macosTopBar}>
                  <div className={styles.topBarLeft}>
                    <span className={styles.appleGlyph}>&#63743;</span>
                    <span className={styles.activeAppName}>{copy.menuApp}</span>
                    <span className={styles.menuItemMuted}>View</span>
                    <span className={styles.menuItemMuted}>Nodes</span>
                    <span className={styles.menuItemMuted}>Traces</span>
                  </div>

                  <div className={styles.topBarRight}>
                    <span className={styles.liveBadge}>
                      <span className={styles.livePulseDot} />
                      {copy.menuLive}
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
                    <span className={styles.windowTitle}>santiago-jv — production-cluster</span>
                    <span className={styles.windowRegionTag}>us-east-1</span>
                  </div>

                  {/* Hybrid Architecture Graph: Crisp HTML Nodes + Animated SVG Light Beams */}
                  <div className={styles.graphStage}>
                    <svg
                      viewBox="0 0 600 190"
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
                        cx="296"
                        cy="95"
                        r="72"
                        fill="url(#centerAura)"
                        className={styles.ambientCorePulse}
                      />

                      <circle
                        cx="296"
                        cy="95"
                        r="54"
                        fill="none"
                        stroke="rgba(255,255,255,0.14)"
                        strokeWidth="1"
                        strokeDasharray="5 7"
                        className={styles.orbitRing}
                      />

                      {/* Base Splines */}
                      <g fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5">
                        <path d="M 156 95 C 185 95, 195 95, 222 95" />
                        <path d="M 372 95 C 402 95, 408 46, 438 46" />
                        <path d="M 372 95 C 402 95, 408 144, 438 144" />
                      </g>

                      {/* Animated Pulses */}
                      <g
                        fill="none"
                        stroke="url(#beamWhite)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <path
                          d="M 156 95 C 185 95, 195 95, 222 95"
                          className={styles.animatedBeam1}
                        />
                        <path
                          d="M 372 95 C 402 95, 408 46, 438 46"
                          className={styles.animatedBeam2}
                        />
                        <path
                          d="M 372 95 C 402 95, 408 144, 438 144"
                          className={styles.animatedBeam3}
                        />
                      </g>
                    </svg>

                    {/* HTML Glass Nodes — Never Clips Text */}
                    <div className={styles.nodesGrid}>
                      <div className={styles.nodeColLeft}>
                        <div className={styles.archNode}>
                          <div className={styles.nodeHeader}>
                            <span className={styles.nodeDot} />
                            <span className={styles.nodeTitle}>{copy.nodeIngressTitle}</span>
                          </div>
                          <span className={styles.nodeSub}>{copy.nodeIngressSub}</span>
                        </div>
                      </div>

                      <div className={styles.nodeColCenter}>
                        <div className={`${styles.archNode} ${styles.archNodePrimary}`}>
                          <div className={styles.nodeHeader}>
                            <span className={`${styles.nodeDot} ${styles.nodeDotPulse}`} />
                            <span className={styles.nodeTitle}>{copy.nodeCoreTitle}</span>
                          </div>
                          <span className={styles.nodeSub}>{copy.nodeCoreSub}</span>
                        </div>
                      </div>

                      <div className={styles.nodeColRight}>
                        <div className={styles.archNode}>
                          <div className={styles.nodeHeader}>
                            <span className={styles.nodeDot} />
                            <span className={styles.nodeTitle}>{copy.nodeDataTitle}</span>
                          </div>
                          <span className={styles.nodeSub}>{copy.nodeDataSub}</span>
                        </div>

                        <div className={styles.archNode}>
                          <div className={styles.nodeHeader}>
                            <span className={styles.nodeDot} />
                            <span className={styles.nodeTitle}>{copy.nodeAiTitle}</span>
                          </div>
                          <span className={styles.nodeSub}>{copy.nodeAiSub}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Telemetry Strip */}
                  <div className={styles.telemetryStrip}>
                    <div className={styles.telemetryCard}>
                      <span className={styles.telemetryLabel}>{copy.metric1Label}</span>
                      <span className={styles.telemetryValue}>{copy.metric1Value}</span>
                    </div>
                    <div className={styles.telemetryCard}>
                      <span className={styles.telemetryLabel}>{copy.metric2Label}</span>
                      <span className={styles.telemetryValue}>{copy.metric2Value}</span>
                    </div>
                    <div className={styles.telemetryCard}>
                      <span className={styles.telemetryLabel}>{copy.metric3Label}</span>
                      <span className={styles.telemetryValue}>{copy.metric3Value}</span>
                    </div>
                  </div>
                </div>

                {/* Miniature macOS Floating Dock */}
                <div className={styles.macosDockBar} aria-hidden="true">
                  <span className={styles.miniDockIcon} />
                  <span className={styles.miniDockIcon} />
                  <span className={`${styles.miniDockIcon} ${styles.miniDockActive}`} />
                  <span className={styles.miniDockIcon} />
                  <span className={styles.miniDockIcon} />
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
            {/* Top Anodized Aluminum Deck with Realistic SVG Magic Keyboard, Touch ID, Speakers & Trackpad */}
            <div className={styles.baseTopDeck}>
              <svg
                viewBox="0 0 680 434"
                className={styles.topCaseSvg}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="deckAluminum" x1="0" y1="0" x2="0" y2="434" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1e1e22" />
                    <stop offset="48%" stopColor="#252529" />
                    <stop offset="100%" stopColor="#2e2e33" />
                  </linearGradient>
                  <pattern id="speakerDots" width="4" height="4" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="0.85" fill="#09090b" opacity="0.82" />
                  </pattern>
                </defs>

                {/* Unibody Top Deck Plate */}
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

                {/* Hinge Exhaust Vent Recess */}
                <rect x="86" y="4" width="508" height="7" rx="3" fill="#09090b" opacity="0.85" />

                {/* Left & Right 6-Speaker Micro-Perforated Grilles */}
                <rect x="20" y="34" width="38" height="214" rx="4" fill="url(#speakerDots)" />
                <rect x="622" y="34" width="38" height="214" rx="4" fill="url(#speakerDots)" />

                {/* Recessed Matte-Black Anodized Keyboard Well */}
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

                {/* Row 1: Esc + Function Keys F1-F12 + Touch ID Ring */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="35" width="46" height="24" rx="4" />
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <rect key={`fn-${idx}`} x={126 + idx * 37} y="35" width="33" height="24" rx="4" />
                  ))}
                  {/* Touch ID Key with Metallic Sensor Ring */}
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

                {/* Row 2: Number Row (13 standard keys + wider Delete) */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  {Array.from({ length: 13 }).map((_, idx) => (
                    <rect key={`r2-${idx}`} x={76 + idx * 36.5} y="64" width="32.5" height="33" rx="4.5" />
                  ))}
                  <rect x="550.5" y="64" width="53.5" height="33" rx="4.5" />
                </g>

                {/* Row 3: Tab + QWERTY Row */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="102" width="52" height="33" rx="4.5" />
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <rect key={`r3-${idx}`} x={132 + idx * 36.3} y="102" width="32.3" height="33" rx="4.5" />
                  ))}
                  <rect x="568" y="102" width="36" height="33" rx="4.5" />
                </g>

                {/* Row 4: Caps Lock + ASDF Row + Return */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="140" width="62" height="33" rx="4.5" />
                  {Array.from({ length: 11 }).map((_, idx) => (
                    <rect key={`r4-${idx}`} x={142 + idx * 36.3} y="140" width="32.3" height="33" rx="4.5" />
                  ))}
                  <rect x="541.5" y="140" width="62.5" height="33" rx="4.5" />
                </g>

                {/* Row 5: Left Shift + ZXCV Row + Right Shift */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="178" width="80" height="33" rx="4.5" />
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <rect key={`r5-${idx}`} x={160 + idx * 36.3} y="178" width="32.3" height="33" rx="4.5" />
                  ))}
                  <rect x="523" y="178" width="81" height="33" rx="4.5" />
                </g>

                {/* Row 6: Modifiers + Wide Spacebar + Inverted-T Arrow Cluster */}
                <g fill="#17171b" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75">
                  <rect x="76" y="216" width="35" height="31" rx="4.5" />
                  <rect x="115" y="216" width="35" height="31" rx="4.5" />
                  <rect x="154" y="216" width="35" height="31" rx="4.5" />
                  <rect x="193" y="216" width="46" height="31" rx="4.5" />
                  {/* Spacebar */}
                  <rect x="243" y="216" width="182" height="31" rx="4.5" />
                  <rect x="429" y="216" width="46" height="31" rx="4.5" />
                  <rect x="479" y="216" width="35" height="31" rx="4.5" />
                  {/* Arrow Cluster */}
                  <rect x="518" y="232" width="26" height="15" rx="3" />
                  <rect x="548" y="216" width="26" height="14.5" rx="3" />
                  <rect x="548" y="232.5" width="26" height="14.5" rx="3" />
                  <rect x="578" y="232" width="26" height="15" rx="3" />
                </g>

                {/* Giant Force Touch Glass Trackpad */}
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

                {/* Front CNC Thumb-Scoop Lip Cutout */}
                <path
                  d="M 292 433.5 L 298 426 L 382 426 L 388 433.5 Z"
                  fill="#101013"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Solid CNC Extruded Unibody Chassis Thickness Layers (Zero Corner Gaps!) */}
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

            {/* Left & Right Rubber Machined Feet Pads Under Base */}
            <div className={styles.rubberFootLeft} />
            <div className={styles.rubberFootRight} />
          </div>

          {/* Multi-Layer Studio Contact + Ambient Floor Shadow */}
          <div className={styles.contactShadow} aria-hidden="true" />
          <div className={styles.ambientFloorShadow} aria-hidden="true" />
        </div>
      </div>

      {/* Subtle Hardware Caption + Replay Control */}
      <div className={styles.stageFooter}>
        <span className={styles.stageCaption}>{copy.caption}</span>
        <button
          type="button"
          onClick={handleReplay}
          className={styles.replayButton}
          disabled={isReplaying}
        >
          <i className="fa-solid fa-rotate-right" aria-hidden="true" />
          <span>{copy.replayLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default MacBookShowcase;
