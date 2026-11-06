import React from 'react';
import styles from './macbook-showcase.module.css';

interface KeySpec {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
  centerLabel?: string;
  topSymbol?: string;
  bottomSymbol?: string;
  cornerLabel?: string;
  cornerAlign?: 'left' | 'right';
  modGlyph?: string;
  modGlyphAlign?: 'left' | 'right';
  modBottom?: string;
  homingBar?: boolean;
  isCaps?: boolean;
  isFnGlobe?: boolean;
  isTouchId?: boolean;
  arrowDir?: 'left' | 'right' | 'up' | 'down';
}

const FUNCTION_KEYS: KeySpec[] = [
  { id: 'esc', x: 76, y: 35, w: 46, h: 24, rx: 4, cornerLabel: 'esc', cornerAlign: 'left' },
  ...Array.from({ length: 12 }).map((_, idx): KeySpec => ({
    id: `f${idx + 1}`,
    x: 126 + idx * 37,
    y: 35,
    w: 33,
    h: 24,
    rx: 4,
    centerLabel: `F${idx + 1}`,
  })),
  { id: 'touch-id', x: 570, y: 35, w: 34, h: 24, rx: 4, isTouchId: true },
];

const NUMBER_PAIRS: Array<[string, string]> = [
  ['~', '`'],
  ['!', '1'],
  ['@', '2'],
  ['#', '3'],
  ['$', '4'],
  ['%', '5'],
  ['^', '6'],
  ['&', '7'],
  ['*', '8'],
  ['(', '9'],
  [')', '0'],
  ['_', '-'],
  ['+', '='],
];

const ROW_2_KEYS: KeySpec[] = [
  ...NUMBER_PAIRS.map(([topSymbol, bottomSymbol], idx): KeySpec => ({
    id: `num-${idx}`,
    x: 76 + idx * 36.5,
    y: 64,
    w: 32.5,
    h: 33,
    topSymbol,
    bottomSymbol,
  })),
  { id: 'delete', x: 550.5, y: 64, w: 53.5, h: 33, cornerLabel: 'delete', cornerAlign: 'right' },
];

const QWERTY_LETTERS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];

const ROW_3_KEYS: KeySpec[] = [
  { id: 'tab', x: 76, y: 102, w: 52, h: 33, cornerLabel: 'tab', cornerAlign: 'left' },
  ...QWERTY_LETTERS.map((letter, idx): KeySpec => ({
    id: `q-${letter}`,
    x: 132 + idx * 36.3,
    y: 102,
    w: 32.3,
    h: 33,
    centerLabel: letter,
  })),
  { id: 'lbracket', x: 132 + 10 * 36.3, y: 102, w: 32.3, h: 33, topSymbol: '{', bottomSymbol: '[' },
  { id: 'rbracket', x: 132 + 11 * 36.3, y: 102, w: 32.3, h: 33, topSymbol: '}', bottomSymbol: ']' },
  { id: 'backslash', x: 568, y: 102, w: 36, h: 33, topSymbol: '|', bottomSymbol: '\\' },
];

const ASDF_LETTERS = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];

const ROW_4_KEYS: KeySpec[] = [
  {
    id: 'caps',
    x: 76,
    y: 140,
    w: 62,
    h: 33,
    cornerLabel: 'caps lock',
    cornerAlign: 'left',
    isCaps: true,
  },
  ...ASDF_LETTERS.map((letter, idx): KeySpec => ({
    id: `a-${letter}`,
    x: 142 + idx * 36.3,
    y: 140,
    w: 32.3,
    h: 33,
    centerLabel: letter,
    homingBar: letter === 'F' || letter === 'J',
  })),
  { id: 'semicolon', x: 142 + 9 * 36.3, y: 140, w: 32.3, h: 33, topSymbol: ':', bottomSymbol: ';' },
  { id: 'quote', x: 142 + 10 * 36.3, y: 140, w: 32.3, h: 33, topSymbol: '"', bottomSymbol: "'" },
  { id: 'return', x: 541.5, y: 140, w: 62.5, h: 33, cornerLabel: 'return', cornerAlign: 'right' },
];

const ZXCV_LETTERS = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const ROW_5_KEYS: KeySpec[] = [
  { id: 'lshift', x: 76, y: 178, w: 80, h: 33, cornerLabel: 'shift', cornerAlign: 'left' },
  ...ZXCV_LETTERS.map((letter, idx): KeySpec => ({
    id: `z-${letter}`,
    x: 160 + idx * 36.3,
    y: 178,
    w: 32.3,
    h: 33,
    centerLabel: letter,
  })),
  { id: 'comma', x: 160 + 7 * 36.3, y: 178, w: 32.3, h: 33, topSymbol: '<', bottomSymbol: ',' },
  { id: 'period', x: 160 + 8 * 36.3, y: 178, w: 32.3, h: 33, topSymbol: '>', bottomSymbol: '.' },
  { id: 'slash', x: 160 + 9 * 36.3, y: 178, w: 32.3, h: 33, topSymbol: '?', bottomSymbol: '/' },
  { id: 'rshift', x: 523, y: 178, w: 81, h: 33, cornerLabel: 'shift', cornerAlign: 'right' },
];

const ROW_6_KEYS: KeySpec[] = [
  { id: 'fn', x: 76, y: 216, w: 35, h: 31, isFnGlobe: true },
  {
    id: 'lctrl',
    x: 115,
    y: 216,
    w: 35,
    h: 31,
    modGlyph: '⌃',
    modGlyphAlign: 'right',
    modBottom: 'control',
  },
  {
    id: 'lopt',
    x: 154,
    y: 216,
    w: 35,
    h: 31,
    modGlyph: '⌥',
    modGlyphAlign: 'right',
    modBottom: 'option',
  },
  {
    id: 'lcmd',
    x: 193,
    y: 216,
    w: 46,
    h: 31,
    modGlyph: '⌘',
    modGlyphAlign: 'right',
    modBottom: 'command',
  },
  { id: 'space', x: 243, y: 216, w: 182, h: 31 },
  {
    id: 'rcmd',
    x: 429,
    y: 216,
    w: 46,
    h: 31,
    modGlyph: '⌘',
    modGlyphAlign: 'left',
    modBottom: 'command',
  },
  {
    id: 'ropt',
    x: 479,
    y: 216,
    w: 35,
    h: 31,
    modGlyph: '⌥',
    modGlyphAlign: 'left',
    modBottom: 'option',
  },
  { id: 'arrow-left', x: 518, y: 232, w: 26, h: 15, rx: 3, arrowDir: 'left' },
  { id: 'arrow-up', x: 548, y: 216, w: 26, h: 14.5, rx: 3, arrowDir: 'up' },
  { id: 'arrow-down', x: 548, y: 232.5, w: 26, h: 14.5, rx: 3, arrowDir: 'down' },
  { id: 'arrow-right', x: 578, y: 232, w: 26, h: 15, rx: 3, arrowDir: 'right' },
];

const ALL_KEYS: KeySpec[] = [
  ...FUNCTION_KEYS,
  ...ROW_2_KEYS,
  ...ROW_3_KEYS,
  ...ROW_4_KEYS,
  ...ROW_5_KEYS,
  ...ROW_6_KEYS,
];

const renderArrowPolygon = (key: KeySpec): JSX.Element | null => {
  const cx = key.x + key.w / 2;
  const cy = key.y + key.h / 2;

  if (key.arrowDir === 'up') {
    return <polygon points={`${cx},${cy - 2.6} ${cx - 3.3},${cy + 2.4} ${cx + 3.3},${cy + 2.4}`} />;
  }
  if (key.arrowDir === 'down') {
    return <polygon points={`${cx},${cy + 2.6} ${cx - 3.3},${cy - 2.4} ${cx + 3.3},${cy - 2.4}`} />;
  }
  if (key.arrowDir === 'left') {
    return <polygon points={`${cx - 2.8},${cy} ${cx + 2.4},${cy - 3} ${cx + 2.4},${cy + 3}`} />;
  }
  if (key.arrowDir === 'right') {
    return <polygon points={`${cx + 2.8},${cy} ${cx - 2.4},${cy - 3} ${cx - 2.4},${cy + 3}`} />;
  }
  return null;
};

export const MacBookKeyboardSvg: React.FC = React.memo(function MacBookKeyboardSvg() {
  return (
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

        <radialGradient id="kbBacklightBed" cx="50%" cy="52%" r="58%">
          <stop offset="0%" stopColor="#dceaff" stopOpacity="0.24" />
          <stop offset="68%" stopColor="#c8dcff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#a8c5ff" stopOpacity="0.05" />
        </radialGradient>

        <linearGradient id="keycapSurface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18181d" />
          <stop offset="100%" stopColor="#111115" />
        </linearGradient>

        <pattern id="speakerDots" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.85" fill="#09090b" opacity="0.82" />
        </pattern>
      </defs>

      {/* Solid Unibody Anodized Space Black Top Case (Squared M4 rear hinge edge, 22px front palm-rest corners) */}
      <path
        d="M 2.25 0.75 H 677.75 A 1.5 1.5 0 0 1 679.25 2.25 V 411.25 A 22 22 0 0 1 657.25 433.25 H 22.75 A 22 22 0 0 1 0.75 411.25 V 2.25 A 1.5 1.5 0 0 1 2.25 0.75 Z"
        fill="url(#deckAluminum)"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1.5"
      />

      {/* Full-Width Rear Hinge Shadow Seam + Exhaust Recess */}
      <rect x="2" y="1" width="676" height="8" rx="1" fill="#0b0b0e" opacity="0.95" />
      <rect x="86" y="3.5" width="508" height="6.5" rx="3" fill="#050507" />

      <g>
        {/* Left & Right 6-Speaker Micro-Perforated Grilles */}
        <rect x="20" y="34" width="38" height="214" rx="4" fill="url(#speakerDots)" />
        <rect x="622" y="34" width="38" height="214" rx="4" fill="url(#speakerDots)" />

      {/* Recessed Matte Black Keyboard Well */}
      <rect
        x="68"
        y="28"
        width="544"
        height="226"
        rx="10"
        fill="#08080b"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1"
      />

      {/* =========================================================
          LAYER 1: WHITE LED BACKLIGHT UNDER-KEY GLOW
         ========================================================= */}
      <g>
        <rect x="73" y="32" width="534" height="218" rx="8" fill="url(#kbBacklightBed)" />

        {/* Soft ambient halo around every key cutout */}
        <g fill="none" stroke="rgba(198, 224, 255, 0.2)" strokeWidth="2.6">
          {ALL_KEYS.map((key) => (
            <rect
              key={`halo-${key.id}`}
              x={key.x}
              y={key.y + 0.4}
              width={key.w}
              height={key.h}
              rx={key.rx ?? 4.5}
            />
          ))}
        </g>

        {/* Crisp bright white LED rim bleeding around each keycap perimeter */}
        <g fill="none" stroke="rgba(238, 246, 255, 0.56)" strokeWidth="1.05">
          {ALL_KEYS.map((key) => (
            <rect
              key={`rim-${key.id}`}
              x={key.x}
              y={key.y + 0.55}
              width={key.w}
              height={key.h}
              rx={key.rx ?? 4.5}
            />
          ))}
        </g>
      </g>

      {/* =========================================================
          LAYER 2: MATTE SPACE BLACK SCISSOR-SWITCH KEYCAPS
         ========================================================= */}
      <g fill="url(#keycapSurface)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.6">
        {ALL_KEYS.map((key) => (
          <rect
            key={`cap-${key.id}`}
            x={key.x}
            y={key.y}
            width={key.w}
            height={key.h}
            rx={key.rx ?? 4.5}
          />
        ))}
      </g>

      {/* Touch ID Biometric Ring (Unlit matte sapphire sensor, authentic Apple detail) */}
      <circle
        cx="587"
        cy="47"
        r="7.6"
        fill="#0e0e12"
        stroke="rgba(255, 255, 255, 0.26)"
        strokeWidth="1.05"
      />

      {/* =========================================================
          LAYER 3: LASER-ETCHED BACKLIT US-ANSI KEY LEGENDS
         ========================================================= */}
      <g
        fill="#f5f9ff"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif"
      >
        {ALL_KEYS.map((key) => {
          if (key.isTouchId) return null;

          const cx = key.x + key.w / 2;
          const cy = key.y + key.h / 2;

          if (key.arrowDir) {
            return <g key={`leg-${key.id}`}>{renderArrowPolygon(key)}</g>;
          }

          if (key.isFnGlobe) {
            return (
              <g key={`leg-${key.id}`}>
                <text
                  x={key.x + key.w - 5.5}
                  y={key.y + 10.5}
                  textAnchor="end"
                  fontSize="7.4"
                  fontWeight="500"
                >
                  fn
                </text>
                <g
                  fill="none"
                  stroke="#f5f9ff"
                  strokeWidth="0.85"
                  transform={`translate(${key.x + 8.5}, ${key.y + 22.5})`}
                >
                  <circle cx="0" cy="0" r="3.7" />
                  <ellipse cx="0" cy="0" rx="1.7" ry="3.7" />
                  <line x1="-3.7" y1="0" x2="3.7" y2="0" />
                </g>
              </g>
            );
          }

          if (key.modBottom && key.modGlyph) {
            const glyphX =
              key.modGlyphAlign === 'right' ? key.x + key.w - 5.5 : key.x + 5.5;
            const glyphAnchor = key.modGlyphAlign === 'right' ? 'end' : 'start';
            return (
              <g key={`leg-${key.id}`}>
                <text
                  x={glyphX}
                  y={key.y + 11}
                  textAnchor={glyphAnchor}
                  fontSize="8.2"
                  fontWeight="600"
                >
                  {key.modGlyph}
                </text>
                <text
                  x={cx}
                  y={key.y + key.h - 5.2}
                  textAnchor="middle"
                  fontSize="6.6"
                  fontWeight="500"
                  letterSpacing="-0.01em"
                >
                  {key.modBottom}
                </text>
              </g>
            );
          }

          if (key.cornerLabel) {
            const isLeft = key.cornerAlign === 'left';
            return (
              <g key={`leg-${key.id}`}>
                {key.isCaps && (
                  <circle
                    cx={key.x + 7.5}
                    cy={key.y + 7.2}
                    r="1.35"
                    fill="rgba(255, 255, 255, 0.35)"
                  />
                )}
                <text
                  x={isLeft ? key.x + 6.5 : key.x + key.w - 6.5}
                  y={key.y + key.h - 6.2}
                  textAnchor={isLeft ? 'start' : 'end'}
                  fontSize={key.h < 28 ? '8.2' : '8.4'}
                  fontWeight="500"
                  letterSpacing="-0.01em"
                >
                  {key.cornerLabel}
                </text>
              </g>
            );
          }

          if (key.topSymbol && key.bottomSymbol) {
            return (
              <g key={`leg-${key.id}`}>
                <text
                  x={cx}
                  y={key.y + 12.2}
                  textAnchor="middle"
                  fontSize="8.6"
                  fontWeight="500"
                  opacity="0.9"
                >
                  {key.topSymbol}
                </text>
                <text
                  x={cx}
                  y={key.y + 25.6}
                  textAnchor="middle"
                  fontSize="10.2"
                  fontWeight="600"
                >
                  {key.bottomSymbol}
                </text>
              </g>
            );
          }

          if (key.centerLabel) {
            const isFnRow = key.h < 28;
            return (
              <g key={`leg-${key.id}`}>
                <text
                  x={cx}
                  y={isFnRow ? cy + 3.4 : cy + 4.4}
                  textAnchor="middle"
                  fontSize={isFnRow ? '7.8' : '12.2'}
                  fontWeight="600"
                >
                  {key.centerLabel}
                </text>
                {key.homingBar && (
                  <line
                    x1={cx - 4}
                    y1={key.y + key.h - 4.2}
                    x2={cx + 4}
                    y2={key.y + key.h - 4.2}
                    stroke="#f5f9ff"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                )}
              </g>
            );
          }

          return null;
        })}
      </g>

      {/* Force Touch Glass Trackpad */}
      <rect
        x="212"
        y="264"
        width="256"
        height="146"
        rx="11"
        fill="#202024"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.2"
      />
      </g>

      {/* CNC Thumb-Scoop Cutout */}
      <path
        d="M 292 433.5 L 298 426 L 382 426 L 388 433.5 Z"
        fill="#101013"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />
    </svg>
  );
});

export default MacBookKeyboardSvg;
