import type ObjectDef from '@/types/ObjectDef';

// ─────────────────────────────────────────────────────────────────────────────
// SVG OBJECT LIBRARY  (all outline strokes, black on transparent)
// Each render fn receives (width, height) and returns an SVG element.
// Stroke color is always "currentColor" so we can tint selection states.
// ─────────────────────────────────────────────────────────────────────────────

import { ReactNode } from 'react';

/** Shared SVG wrapper */
const SV = (w: number, h: number, children: ReactNode, vb?: string) => (
  <svg
    width={w}
    height={h}
    viewBox={vb ?? `0 0 ${w} ${h}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

/* ── TABLES ── */

// Small table (1 unit)
const renderSmallTable = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect
        x={w * 0.08}
        y={h * 0.28}
        width={w * 0.84}
        height={h * 0.14}
        rx="3"
      />
      <line x1={w * 0.18} y1={h * 0.42} x2={w * 0.18} y2={h * 0.92} />
      <line x1={w * 0.82} y1={h * 0.42} x2={w * 0.82} y2={h * 0.92} />
      <line x1={w * 0.18} y1={h * 0.72} x2={w * 0.82} y2={h * 0.72} />
    </>,
  );

// Medium table (2 units)
const renderMediumTable = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect
        x={w * 0.04}
        y={h * 0.28}
        width={w * 0.92}
        height={h * 0.13}
        rx="3"
      />
      <line x1={w * 0.12} y1={h * 0.41} x2={w * 0.12} y2={h * 0.92} />
      <line x1={w * 0.88} y1={h * 0.41} x2={w * 0.88} y2={h * 0.92} />
      <line x1={w * 0.12} y1={h * 0.7} x2={w * 0.88} y2={h * 0.7} />
      <rect x={w * 0.35} y={h * 0.42} width={w * 0.3} height={h * 0.1} rx="2" />
      <circle cx={w * 0.5} cy={h * 0.47} r={w * 0.03} />
    </>,
  );

// Large table (3 units)
const renderLargeTable = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect
        x={w * 0.03}
        y={h * 0.26}
        width={w * 0.94}
        height={h * 0.12}
        rx="4"
      />
      <line x1={w * 0.09} y1={h * 0.38} x2={w * 0.09} y2={h * 0.92} />
      <line x1={w * 0.91} y1={h * 0.38} x2={w * 0.91} y2={h * 0.92} />
      <line x1={w * 0.09} y1={h * 0.68} x2={w * 0.91} y2={h * 0.68} />
      <rect x={w * 0.18} y={h * 0.4} width={w * 0.19} height={h * 0.1} rx="2" />
      <rect x={w * 0.41} y={h * 0.4} width={w * 0.18} height={h * 0.1} rx="2" />
      <rect x={w * 0.63} y={h * 0.4} width={w * 0.19} height={h * 0.1} rx="2" />
    </>,
  );

// Bedside table (1 unit)
const renderBesideTable = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect x={w * 0.1} y={h * 0.22} width={w * 0.8} height={h * 0.11} rx="3" />
      <rect
        x={w * 0.14}
        y={h * 0.33}
        width={w * 0.72}
        height={h * 0.52}
        rx="3"
      />
      <line x1={w * 0.14} y1={h * 0.58} x2={w * 0.86} y2={h * 0.58} />
      <circle cx={w * 0.5} cy={h * 0.46} r={w * 0.05} />
      <circle cx={w * 0.5} cy={h * 0.73} r={w * 0.05} />
      <line x1={w * 0.22} y1={h * 0.85} x2={w * 0.22} y2={h * 0.95} />
      <line x1={w * 0.78} y1={h * 0.85} x2={w * 0.78} y2={h * 0.95} />
    </>,
  );

/* ── CHAIRS ── */

// Office chair (table slot)
const renderOfficeChair = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect x={w * 0.2} y={h * 0.05} width={w * 0.6} height={h * 0.35} rx="5" />
      <rect
        x={w * 0.15}
        y={h * 0.42}
        width={w * 0.7}
        height={h * 0.22}
        rx="4"
      />
      <line x1={w * 0.5} y1={h * 0.64} x2={w * 0.5} y2={h * 0.8} />
      <line x1={w * 0.3} y1={h * 0.88} x2={w * 0.7} y2={h * 0.88} />
      <line x1={w * 0.5} y1={h * 0.8} x2={w * 0.5} y2={h * 0.96} />
      <line x1={w * 0.15} y1={h * 0.42} x2={w * 0.15} y2={h * 0.6} />
      <line x1={w * 0.85} y1={h * 0.42} x2={w * 0.85} y2={h * 0.6} />
    </>,
  );

// Stool (table slot)
const renderStool = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <ellipse cx={w * 0.5} cy={h * 0.3} rx={w * 0.38} ry={h * 0.15} />
      <line x1={w * 0.28} y1={h * 0.42} x2={w * 0.22} y2={h * 0.92} />
      <line x1={w * 0.72} y1={h * 0.42} x2={w * 0.78} y2={h * 0.92} />
      <line x1={w * 0.24} y1={h * 0.66} x2={w * 0.76} y2={h * 0.66} />
    </>,
  );

/* ── DECORATIONS ── */

// Sculpture of David (floor, 1 unit)
const renderDavid = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <circle cx={w * 0.5} cy={h * 0.14} r={w * 0.13} />
      <line x1={w * 0.44} y1={h * 0.26} x2={w * 0.44} y2={h * 0.32} />
      <line x1={w * 0.56} y1={h * 0.26} x2={w * 0.56} y2={h * 0.32} />
      <path
        d={`M ${w * 0.32} ${h * 0.32} Q ${w * 0.5} ${h * 0.3} ${w * 0.68} ${h * 0.32} L ${w * 0.65} ${h * 0.62} Q ${w * 0.5} ${h * 0.65} ${w * 0.35} ${h * 0.62} Z`}
      />
      <path
        d={`M ${w * 0.32} ${h * 0.36} Q ${w * 0.14} ${h * 0.42} ${w * 0.18} ${h * 0.58}`}
      />
      <path
        d={`M ${w * 0.68} ${h * 0.36} Q ${w * 0.78} ${h * 0.48} ${w * 0.74} ${h * 0.62}`}
      />
      <line x1={w * 0.42} y1={h * 0.62} x2={w * 0.4} y2={h * 0.9} />
      <line x1={w * 0.58} y1={h * 0.62} x2={w * 0.62} y2={h * 0.9} />
      <rect
        x={w * 0.28}
        y={h * 0.9}
        width={w * 0.44}
        height={h * 0.06}
        rx="1"
      />
    </>,
  );

// Big plant in pot (floor, 1 unit)
const renderBigPlant = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <path
        d={`M ${w * 0.26} ${h * 0.7} L ${w * 0.22} ${h * 0.94} L ${w * 0.78} ${h * 0.94} L ${w * 0.74} ${h * 0.7} Z`}
      />
      <ellipse cx={w * 0.5} cy={h * 0.7} rx={w * 0.26} ry={h * 0.05} />
      <line x1={w * 0.5} y1={h * 0.7} x2={w * 0.5} y2={h * 0.3} />
      <path
        d={`M ${w * 0.5} ${h * 0.5} Q ${w * 0.2} ${h * 0.38} ${w * 0.22} ${h * 0.22}`}
      />
      <path
        d={`M ${w * 0.5} ${h * 0.44} Q ${w * 0.8} ${h * 0.32} ${w * 0.78} ${h * 0.16}`}
      />
      <path
        d={`M ${w * 0.5} ${h * 0.36} Q ${w * 0.34} ${h * 0.12} ${w * 0.44} ${h * 0.05}`}
      />
      <path
        d={`M ${w * 0.5} ${h * 0.3} Q ${w * 0.66} ${h * 0.08} ${w * 0.56} ${h * 0.02}`}
      />
    </>,
  );

// Small plant A — succulent (table slot)
const renderSmallPlantA = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <path
        d={`M ${w * 0.3} ${h * 0.65} L ${w * 0.26} ${h * 0.94} L ${w * 0.74} ${h * 0.94} L ${w * 0.7} ${h * 0.65} Z`}
      />
      <ellipse cx={w * 0.5} cy={h * 0.65} rx={w * 0.22} ry={h * 0.05} />
      <ellipse cx={w * 0.5} cy={h * 0.45} rx={w * 0.22} ry={h * 0.18} />
      <ellipse cx={w * 0.3} cy={h * 0.52} rx={w * 0.16} ry={h * 0.12} />
      <ellipse cx={w * 0.7} cy={h * 0.52} rx={w * 0.16} ry={h * 0.12} />
      <ellipse cx={w * 0.5} cy={h * 0.28} rx={w * 0.12} ry={h * 0.16} />
    </>,
  );

// Small plant B — cactus (table slot)
const renderSmallPlantB = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <path
        d={`M ${w * 0.3} ${h * 0.68} L ${w * 0.26} ${h * 0.94} L ${w * 0.74} ${h * 0.94} L ${w * 0.7} ${h * 0.68} Z`}
      />
      <ellipse cx={w * 0.5} cy={h * 0.68} rx={w * 0.22} ry={h * 0.05} />
      <rect
        x={w * 0.38}
        y={h * 0.2}
        width={w * 0.24}
        height={h * 0.49}
        rx="8"
      />
      <path
        d={`M ${w * 0.38} ${h * 0.36} Q ${w * 0.18} ${h * 0.34} ${w * 0.18} ${h * 0.52}`}
      />
      <path
        d={`M ${w * 0.62} ${h * 0.42} Q ${w * 0.82} ${h * 0.4} ${w * 0.82} ${h * 0.56}`}
      />
      <line x1={w * 0.5} y1={h * 0.2} x2={w * 0.5} y2={h * 0.12} />
      <line x1={w * 0.42} y1={h * 0.28} x2={w * 0.34} y2={h * 0.24} />
      <line x1={w * 0.58} y1={h * 0.28} x2={w * 0.66} y2={h * 0.24} />
    </>,
  );

// Wall clock A — round (wall slot)
const renderWallClockA = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <circle cx={w * 0.5} cy={h * 0.5} r={Math.min(w, h) * 0.4} />
      <circle cx={w * 0.5} cy={h * 0.5} r={Math.min(w, h) * 0.04} />
      <line
        x1={w * 0.5}
        y1={h * 0.5}
        x2={w * 0.5}
        y2={h * 0.22}
        strokeWidth="2.5"
      />
      <line
        x1={w * 0.5}
        y1={h * 0.5}
        x2={w * 0.72}
        y2={h * 0.5}
        strokeWidth="2"
      />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const r1 = Math.min(w, h) * 0.34;
        const r2 = Math.min(w, h) * 0.4;
        const a = ((deg - 90) * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={w * 0.5 + r1 * Math.cos(a)}
            y1={h * 0.5 + r1 * Math.sin(a)}
            x2={w * 0.5 + r2 * Math.cos(a)}
            y2={h * 0.5 + r2 * Math.sin(a)}
            strokeWidth={deg % 90 === 0 ? '2.5' : '1.2'}
          />
        );
      })}
    </>,
  );

// Wall clock B — rectangular pendulum (wall slot)
const renderWallClockB = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect
        x={w * 0.18}
        y={h * 0.08}
        width={w * 0.64}
        height={h * 0.56}
        rx="6"
      />
      <circle cx={w * 0.5} cy={h * 0.33} r={w * 0.22} />
      <circle cx={w * 0.5} cy={h * 0.33} r={w * 0.03} />
      <line
        x1={w * 0.5}
        y1={h * 0.33}
        x2={w * 0.5}
        y2={h * 0.17}
        strokeWidth="2"
      />
      <line
        x1={w * 0.5}
        y1={h * 0.33}
        x2={w * 0.64}
        y2={h * 0.33}
        strokeWidth="1.8"
      />
      <line x1={w * 0.5} y1={h * 0.64} x2={w * 0.5} y2={h * 0.86} />
      <ellipse cx={w * 0.5} cy={h * 0.9} rx={w * 0.14} ry={h * 0.06} />
    </>,
  );

// Wall painting A — landscape (wall slot)
const renderPaintingA = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect x={w * 0.1} y={h * 0.1} width={w * 0.8} height={h * 0.8} rx="3" />
      <rect
        x={w * 0.16}
        y={h * 0.16}
        width={w * 0.68}
        height={h * 0.68}
        rx="2"
      />
      <line x1={w * 0.2} y1={h * 0.62} x2={w * 0.8} y2={h * 0.62} />
      <path
        d={`M ${w * 0.24} ${h * 0.62} L ${w * 0.44} ${h * 0.28} L ${w * 0.64} ${h * 0.62}`}
      />
      <circle cx={w * 0.72} cy={h * 0.3} r={w * 0.07} />
    </>,
  );

// Wall painting B — portrait (wall slot)
const renderPaintingB = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect
        x={w * 0.12}
        y={h * 0.06}
        width={w * 0.76}
        height={h * 0.88}
        rx="3"
      />
      <rect
        x={w * 0.18}
        y={h * 0.12}
        width={w * 0.64}
        height={h * 0.76}
        rx="2"
      />
      <ellipse cx={w * 0.5} cy={h * 0.36} rx={w * 0.2} ry={h * 0.18} />
      <path
        d={`M ${w * 0.26} ${h * 0.78} Q ${w * 0.5} ${h * 0.6} ${w * 0.74} ${h * 0.78}`}
      />
      <circle cx={w * 0.43} cy={h * 0.34} r={w * 0.03} />
      <circle cx={w * 0.57} cy={h * 0.34} r={w * 0.03} />
      <path
        d={`M ${w * 0.43} ${h * 0.42} Q ${w * 0.5} ${h * 0.46} ${w * 0.57} ${h * 0.42}`}
      />
    </>,
  );

/* ── APPLIANCES ── */

// Toaster (table slot)
const renderToaster = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect
        x={w * 0.12}
        y={h * 0.36}
        width={w * 0.76}
        height={h * 0.46}
        rx="5"
      />
      <rect
        x={w * 0.22}
        y={h * 0.4}
        width={w * 0.22}
        height={h * 0.24}
        rx="3"
      />
      <rect
        x={w * 0.56}
        y={h * 0.4}
        width={w * 0.22}
        height={h * 0.24}
        rx="3"
      />
      <rect
        x={w * 0.24}
        y={h * 0.18}
        width={w * 0.18}
        height={h * 0.24}
        rx="2"
      />
      <rect
        x={w * 0.58}
        y={h * 0.14}
        width={w * 0.18}
        height={h * 0.28}
        rx="2"
      />
      <rect
        x={w * 0.8}
        y={h * 0.52}
        width={w * 0.08}
        height={h * 0.18}
        rx="2"
      />
      <line x1={w * 0.22} y1={h * 0.82} x2={w * 0.22} y2={h * 0.92} />
      <line x1={w * 0.78} y1={h * 0.82} x2={w * 0.78} y2={h * 0.92} />
    </>,
  );

// Coffee maker (table slot)
const renderCoffeeMaker = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect
        x={w * 0.16}
        y={h * 0.18}
        width={w * 0.68}
        height={h * 0.68}
        rx="6"
      />
      <rect x={w * 0.22} y={h * 0.5} width={w * 0.4} height={h * 0.28} rx="3" />
      <rect
        x={w * 0.28}
        y={h * 0.26}
        width={w * 0.28}
        height={h * 0.18}
        rx="3"
      />
      <circle cx={w * 0.72} cy={h * 0.72} r={w * 0.07} />
      <path
        d={`M ${w * 0.38} ${h * 0.12} Q ${w * 0.42} ${h * 0.06} ${w * 0.38} ${h * 0.01}`}
      />
      <path
        d={`M ${w * 0.5} ${h * 0.1} Q ${w * 0.54} ${h * 0.04} ${w * 0.5} ${h * -0.01}`}
      />
      <rect x={w * 0.1} y={h * 0.86} width={w * 0.8} height={h * 0.08} rx="3" />
    </>,
  );

// Tea kettle (table slot)
const renderTeaKettle = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <ellipse cx={w * 0.48} cy={h * 0.58} rx={w * 0.32} ry={h * 0.3} />
      <path
        d={`M ${w * 0.78} ${h * 0.52} Q ${w * 0.96} ${h * 0.44} ${w * 0.92} ${h * 0.6}`}
      />
      <path
        d={`M ${w * 0.18} ${h * 0.44} Q ${w * 0.02} ${h * 0.5} ${w * 0.02} ${h * 0.64} Q ${w * 0.02} ${h * 0.76} ${w * 0.18} ${h * 0.72}`}
      />
      <ellipse cx={w * 0.48} cy={h * 0.28} rx={w * 0.2} ry={h * 0.06} />
      <rect
        x={w * 0.42}
        y={h * 0.16}
        width={w * 0.12}
        height={h * 0.12}
        rx="3"
      />
      <path
        d={`M ${w * 0.38} ${h * 0.12} Q ${w * 0.42} ${h * 0.06} ${w * 0.38} ${h * 0.01}`}
      />
      <path
        d={`M ${w * 0.54} ${h * 0.1} Q ${w * 0.58} ${h * 0.04} ${w * 0.54} ${h * -0.01}`}
      />
      <ellipse cx={w * 0.48} cy={h * 0.88} rx={w * 0.3} ry={h * 0.06} />
    </>,
  );

/* ── ELECTRONICS ── */

// Monitor (table slot)
const renderMonitor = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect
        x={w * 0.08}
        y={h * 0.08}
        width={w * 0.84}
        height={h * 0.58}
        rx="5"
      />
      <rect
        x={w * 0.14}
        y={h * 0.14}
        width={w * 0.72}
        height={h * 0.46}
        rx="3"
      />
      <rect
        x={w * 0.42}
        y={h * 0.66}
        width={w * 0.16}
        height={h * 0.14}
        rx="2"
      />
      <rect x={w * 0.26} y={h * 0.8} width={w * 0.48} height={h * 0.1} rx="4" />
      <line
        x1={w * 0.2}
        y1={h * 0.2}
        x2={w * 0.28}
        y2={h * 0.36}
        strokeWidth="1"
      />
    </>,
  );

// Printer (table slot)
const renderPrinter = (w: number, h: number) =>
  SV(
    w,
    h,
    <>
      <rect x={w * 0.1} y={h * 0.28} width={w * 0.8} height={h * 0.44} rx="5" />
      <rect
        x={w * 0.24}
        y={h * 0.18}
        width={w * 0.52}
        height={h * 0.12}
        rx="2"
      />
      <rect x={w * 0.24} y={h * 0.7} width={w * 0.52} height={h * 0.1} rx="2" />
      <rect
        x={w * 0.32}
        y={h * 0.06}
        width={w * 0.36}
        height={h * 0.14}
        rx="1"
      />
      <circle cx={w * 0.72} cy={h * 0.5} r={w * 0.06} />
      <rect x={w * 0.2} y={h * 0.44} width={w * 0.3} height={h * 0.08} rx="2" />
      <rect
        x={w * 0.32}
        y={h * 0.78}
        width={w * 0.36}
        height={h * 0.14}
        rx="1"
      />
    </>,
  );

// ─────────────────────────────────────────────────────────────────────────────
// OBJECT CATALOG
// ─────────────────────────────────────────────────────────────────────────────

export const CATALOG: ObjectDef[] = [
  // ── Tables (floor placement) ──
  // tableTopSlots   = slots on the table surface (no chairs allowed)
  // tableFloorSlots = slots in front of the table on the floor (chairs only)
  // Both counts equal the table's size so each space unit gets one of each.
  {
    id: 'table-small',
    name: 'Small Table',
    category: 'table',
    placingPosition: 'floor',
    size: 1,
    rentPerDay: 8,
    tableTopSlots: 1,
    tableFloorSlots: 1,
    render: renderSmallTable,
  },
  {
    id: 'table-medium',
    name: 'Medium Table',
    category: 'table',
    placingPosition: 'floor',
    size: 2,
    rentPerDay: 14,
    tableTopSlots: 2,
    tableFloorSlots: 2,
    render: renderMediumTable,
  },
  {
    id: 'table-large',
    name: 'Large Table',
    category: 'table',
    placingPosition: 'floor',
    size: 3,
    rentPerDay: 20,
    tableTopSlots: 3,
    tableFloorSlots: 3,
    render: renderLargeTable,
  },
  {
    id: 'table-beside',
    name: 'Bedside Table',
    category: 'table',
    placingPosition: 'floor',
    size: 1,
    rentPerDay: 6,
    tableTopSlots: 1,
    tableFloorSlots: 1,
    render: renderBesideTable,
  },

  // ── Chairs (table-floor placement — sit in front of the table) ──
  {
    id: 'chair-office',
    name: 'Office Chair',
    category: 'chair',
    placingPosition: 'table-floor',
    size: 1,
    rentPerDay: 5,
    render: renderOfficeChair,
  },
  {
    id: 'chair-stool',
    name: 'Bar Stool',
    category: 'chair',
    placingPosition: 'table-floor',
    size: 1,
    rentPerDay: 3,
    render: renderStool,
  },

  // ── Decorations (various placements) ──
  // floor items stay on the floor; table-top items sit on the table surface
  {
    id: 'deco-david',
    name: 'David Sculpture',
    category: 'decoration',
    placingPosition: 'floor',
    size: 1,
    rentPerDay: 12,
    render: renderDavid,
  },
  {
    id: 'deco-bigplant',
    name: 'Big Potted Plant',
    category: 'decoration',
    placingPosition: 'floor',
    size: 1,
    rentPerDay: 4,
    render: renderBigPlant,
  },
  {
    id: 'deco-plant-a',
    name: 'Succulent',
    category: 'decoration',
    placingPosition: 'table-top',
    size: 1,
    rentPerDay: 2,
    render: renderSmallPlantA,
  },
  {
    id: 'deco-plant-b',
    name: 'Cactus',
    category: 'decoration',
    placingPosition: 'table-top',
    size: 1,
    rentPerDay: 2,
    render: renderSmallPlantB,
  },
  {
    id: 'deco-clock-a',
    name: 'Round Clock',
    category: 'decoration',
    placingPosition: 'wall',
    size: 1,
    rentPerDay: 3,
    render: renderWallClockA,
  },
  {
    id: 'deco-clock-b',
    name: 'Pendulum Clock',
    category: 'decoration',
    placingPosition: 'wall',
    size: 1,
    rentPerDay: 4,
    render: renderWallClockB,
  },
  {
    id: 'deco-painting-a',
    name: 'Landscape Painting',
    category: 'decoration',
    placingPosition: 'wall',
    size: 1,
    rentPerDay: 5,
    render: renderPaintingA,
  },
  {
    id: 'deco-painting-b',
    name: 'Portrait Painting',
    category: 'decoration',
    placingPosition: 'wall',
    size: 1,
    rentPerDay: 5,
    render: renderPaintingB,
  },

  // ── Appliances (table-top placement — sit on the table surface) ──
  {
    id: 'appl-toaster',
    name: 'Toaster',
    category: 'appliance',
    placingPosition: 'table-top',
    size: 1,
    rentPerDay: 3,
    render: renderToaster,
  },
  {
    id: 'appl-coffee',
    name: 'Coffee Maker',
    category: 'appliance',
    placingPosition: 'table-top',
    size: 1,
    rentPerDay: 5,
    render: renderCoffeeMaker,
  },
  {
    id: 'appl-kettle',
    name: 'Tea Kettle',
    category: 'appliance',
    placingPosition: 'table-top',
    size: 1,
    rentPerDay: 3,
    render: renderTeaKettle,
  },

  // ── Electronics (table-top placement — sit on the table surface) ──
  {
    id: 'elec-monitor',
    name: 'Monitor',
    category: 'electronic',
    placingPosition: 'table-top',
    size: 1,
    rentPerDay: 6,
    render: renderMonitor,
  },
  {
    id: 'elec-printer',
    name: 'Printer',
    category: 'electronic',
    placingPosition: 'table-top',
    size: 1,
    rentPerDay: 4,
    render: renderPrinter,
  },
];
