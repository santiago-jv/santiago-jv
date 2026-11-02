import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePreferences } from '@/context/PreferencesContext';
import styles from './macbook-showcase.module.css';

const CLOSED_ANGLE = -101;
const INITIAL_OPEN_ANGLE = -18;
const SCROLL_OPEN_ANGLE = -2;

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
    menuStatus: 'MCP Gateway · Live',
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
    const screenWake = Math.max(0, Math.min(1, (clamped - -88) / 48));

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
    const introDuration = 1550;

    applyAngleToDom(CLOSED_ANGLE);

    const easeAppleOut = (t: number): number => 1 - Math.pow(1 - t, 3.6);

    const computeScrollBoost = (): number => {
      const stage = stageRef.current;
      if (!stage) return 0;
      const rect = stage.getBoundingClientRect();
      const viewportH = window.innerHeight || 900;
      const raw = (viewportH * 0.78 - rect.top) / (viewportH * 0.55);
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
      const elapsed = Math.max(0, timestamp - startTime - 260);
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
    const closeDuration = 520;
    const openDuration = 1350;

    const easeInOut = (t: number): number =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3.6);

    const animateReplay = (now: number): void => {
      const elapsed = now - startClose;

      if (elapsed <= closeDuration) {
        const t = easeInOut(Math.min(1, elapsed / closeDuration));
        const angle = SCROLL_OPEN_ANGLE + (CLOSED_ANGLE - SCROLL_OPEN_ANGLE) * t;
        applyAngleToDom(angle);
        window.requestAnimationFrame(animateReplay);
        return;
      }

      const pauseElapsed = elapsed - closeDuration - 160;
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
    rig.style.setProperty('--tilt-y', `${(normX * 5.5).toFixed(2)}deg`);
    rig.style.setProperty('--tilt-x', `${(-normY * 3.2).toFixed(2)}deg`);
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
          {/* 3D Display Lid Assembly */}
          <div className={styles.lidAssembly}>
            {/* Outer Anodized Space Black Top Cover (visible when closed) */}
            <div className={styles.lidOuterCover} aria-hidden="true">
              <div className={styles.lidOuterGlint} />
              <div className={styles.lidOuterMonogram}>S</div>
            </div>

            {/* Inner Liquid Retina XDR Display */}
            <div className={styles.lidInnerScreen}>
              <div className={styles.bezelSheen} aria-hidden="true" />
              <div className={styles.cameraNotch} aria-hidden="true">
                <span className={styles.cameraLens} />
              </div>

              <div className={styles.retinaViewport}>
                {/* macOS Menu Bar */}
                <div className={styles.macosMenuBar}>
                  <div className={styles.menuLeft}>
                    <span className={styles.trafficDot} />
                    <span className={styles.trafficDot} />
                    <span className={styles.trafficDot} />
                    <span className={styles.menuTitle}>{copy.menuApp}</span>
                  </div>
                  <div className={styles.menuRight}>
                    <span className={styles.livePulseDot} />
                    <span className={styles.menuStatusText}>{copy.menuStatus}</span>
                  </div>
                </div>

                {/* Live Vector Motion Canvas (Lottie-grade SVG Architecture Flow) */}
                <div className={styles.vectorCanvas}>
                  <svg
                    viewBox="0 0 760 270"
                    className={styles.flowSvg}
                    role="img"
                    aria-label={copy.caption}
                  >
                    <defs>
                      <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#d2d2d7" stopOpacity="0" />
                      </linearGradient>
                      <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Subtle Precision Grid */}
                    <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
                      <line x1="0" y1="68" x2="760" y2="68" />
                      <line x1="0" y1="135" x2="760" y2="135" />
                      <line x1="0" y1="202" x2="760" y2="202" />
                      <line x1="190" y1="0" x2="190" y2="270" />
                      <line x1="380" y1="0" x2="380" y2="270" />
                      <line x1="570" y1="0" x2="570" y2="270" />
                    </g>

                    {/* Ambient Halo Behind Central Core */}
                    <circle cx="372" cy="135" r="84" fill="url(#coreGlow)" className={styles.ambientCorePulse} />

                    {/* Base Conduit Splines */}
                    <g fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.6">
                      <path d="M 184 135 C 228 135, 244 135, 280 135" />
                      <path d="M 464 135 C 508 135, 518 74, 562 74" />
                      <path d="M 464 135 C 508 135, 518 196, 562 196" />
                    </g>

                    {/* Animated Vector Data Pulses */}
                    <g
                      fill="none"
                      stroke="url(#pulseGrad)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    >
                      <path
                        d="M 184 135 C 228 135, 244 135, 280 135"
                        className={styles.animatedBeam1}
                      />
                      <path
                        d="M 464 135 C 508 135, 518 74, 562 74"
                        className={styles.animatedBeam2}
                      />
                      <path
                        d="M 464 135 C 508 135, 518 196, 562 196"
                        className={styles.animatedBeam3}
                      />
                    </g>

                    {/* Orbiting Kinetic Ring Around Core Engine */}
                    <circle
                      cx="372"
                      cy="135"
                      r="62"
                      fill="none"
                      stroke="rgba(255,255,255,0.16)"
                      strokeWidth="1"
                      strokeDasharray="6 8"
                      className={styles.orbitRing}
                    />

                    {/* Left Node: Edge & API */}
                    <g transform="translate(32, 101)">
                      <rect
                        width="152"
                        height="68"
                        rx="14"
                        fill="#161618"
                        stroke="rgba(255,255,255,0.14)"
                        strokeWidth="1"
                      />
                      <circle cx="18" cy="24" r="4" fill="#f5f5f7" />
                      <text x="30" y="28" fill="#f5f5f7" fontSize="12" fontWeight="600">
                        {copy.nodeIngressTitle}
                      </text>
                      <text x="18" y="48" fill="#86868b" fontSize="10" fontFamily="SF Mono, Menlo, monospace">
                        {copy.nodeIngressSub}
                      </text>
                    </g>

                    {/* Center Node: Core Backend Engine */}
                    <g transform="translate(280, 95)">
                      <rect
                        width="184"
                        height="80"
                        rx="18"
                        fill="#1d1d20"
                        stroke="rgba(255,255,255,0.28)"
                        strokeWidth="1.2"
                      />
                      <circle cx="20" cy="28" r="4.5" fill="#ffffff" className={styles.nodePulseDot} />
                      <text x="32" y="32" fill="#ffffff" fontSize="13" fontWeight="700">
                        {copy.nodeCoreTitle}
                      </text>
                      <text x="20" y="54" fill="#a1a1a6" fontSize="10" fontFamily="SF Mono, Menlo, monospace">
                        {copy.nodeCoreSub}
                      </text>
                    </g>

                    {/* Top-Right Node: Data & Locks */}
                    <g transform="translate(562, 40)">
                      <rect
                        width="166"
                        height="68"
                        rx="14"
                        fill="#161618"
                        stroke="rgba(255,255,255,0.14)"
                        strokeWidth="1"
                      />
                      <circle cx="18" cy="24" r="4" fill="#d2d2d7" />
                      <text x="30" y="28" fill="#f5f5f7" fontSize="12" fontWeight="600">
                        {copy.nodeDataTitle}
                      </text>
                      <text x="18" y="48" fill="#86868b" fontSize="10" fontFamily="SF Mono, Menlo, monospace">
                        {copy.nodeDataSub}
                      </text>
                    </g>

                    {/* Bottom-Right Node: AI, MCP & Telemetry */}
                    <g transform="translate(562, 162)">
                      <rect
                        width="166"
                        height="68"
                        rx="14"
                        fill="#161618"
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth="1"
                      />
                      <circle cx="18" cy="24" r="4" fill="#ffffff" />
                      <text x="30" y="28" fill="#f5f5f7" fontSize="12" fontWeight="600">
                        {copy.nodeAiTitle}
                      </text>
                      <text x="18" y="48" fill="#86868b" fontSize="10" fontFamily="SF Mono, Menlo, monospace">
                        {copy.nodeAiSub}
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Bottom Kinetic Telemetry Strip */}
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

              <div className={styles.chinWordmark} aria-hidden="true">
                MacBook Pro
              </div>
            </div>
          </div>

          {/* Cylindrical Anodized Hinge */}
          <div className={styles.hingeBarrel} aria-hidden="true" />

          {/* 3D Anodized Space Black Keyboard Deck & Front Chassis Lip */}
          <div className={styles.baseAssembly} aria-hidden="true">
            <div className={styles.baseDeckSurface}>
              <div className={styles.speakerGrille} />
              <div className={styles.keyboardWell}>
                <span className={styles.keyRow} />
                <span className={styles.keyRow} />
                <span className={styles.keyRow} />
                <span className={styles.keyRow} />
              </div>
              <div className={styles.speakerGrille} />
              <div className={styles.trackpadWell} />
            </div>

            <div className={styles.baseFrontEdge}>
              <div className={styles.thumbScoopNotch} />
            </div>
          </div>

          {/* Dynamic Studio Floor Shadow */}
          <div className={styles.studioFloorShadow} aria-hidden="true" />
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
