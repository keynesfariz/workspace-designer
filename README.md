# Workspace Designer

An architectural-blueprint-style office workspace configurator built with Next.js and styled using Tailwind CSS. Users pick an office size, furnish it using a slot-based wall-elevation canvas, then check out with a rental summary.

---

## Features

- **3-step wizard** — size selection → canvas design → checkout
- **Slot-based placement** — click `+` to place objects; no free-dragging
- **Wall elevation canvas** — blueprint aesthetic with wall, floor, table-surface, and table-floor zones
- **Two-zone table system** — every table exposes a *surface* row (appliances, electronics, decorations) and a *floor* row (chairs only)
- **19 SVG objects** across 5 categories, all rendered as outline strokes
- **Live cart** — daily rent updates in real time as objects are placed or removed
- **Checkout** — adjustable rental duration with grand total calculation
- **Responsive** — side panel on desktop, bottom drawer on mobile; canvas scales to fit small screens
- **Keyboard shortcuts** — `Delete`/`Backspace` to remove selected object, `Escape` to cancel

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js v16 |
| Styling | Tailwind CSS (default palette — `stone` scale) |
| Language | TypeScript |
| Graphics | Inline SVG (no external icon library) |
| State | `useState` / `useCallback` / `useMemo` / local storage |

---

## Project Structure

The entire application lives in a single file, `WorkspaceDesigner.tsx`, organised into clearly marked sections:

```
WorkspaceDesigner.tsx
│
├── Types                 PlacingPosition, ObjectCategory, ObjectDef,
│                         PlacedInstance, OfficeSizeOption
│
├── Constants             UNIT_WIDTH, WALL_HEIGHT, FLOOR_HEIGHT, slot heights
│
├── SVG Object Library    19 render functions (tables, chairs, decorations,
│                         appliances, electronics)
│
├── Catalog               CATALOG[]  — all object definitions
│
├── useIsMobile()         Responsive breakpoint hook (< 768 px)
│
├── StepHeader            Shared wizard header with step indicator
│
├── OfficeSizeSelector    Step 1 — pick Small / Medium / Large office
│
├── ObjectPicker          Modal — filtered item grid triggered by "+" slots
│
├── CanvasDesigner        Step 2 — wall-elevation canvas + side panel
│   ├── CanvasState       wallSlots, floorSlots, tableTopSlots,
│   │                     tableFloorSlots, instances
│   ├── handlePick()      Validates & commits a placement
│   ├── handleRemove()    Removes instance + cascades to children
│   ├── renderCanvas()    Absolute-positioned slot grid
│   └── renderPanel()     Cart, selection info, legend, actions
│
├── Checkout              Step 3 — order summary, day picker, confirm
│
└── App                   Root — step router
```

---

## Space Unit System

Each office is measured in **space units** — vertical columns in the canvas.

| Size | Space Units | Base rent |
|---|---|---|
| Small | 3 | $49 / day |
| Medium | 5 | $119 / day |
| Large | 7 | $299 / day |

Every space unit column contains two primary slot zones:

```
┌─────────────────────┐  ← WALL slot   (clocks, paintings)
│                     │
├─────────────────────┤  ← floor line
│  ┌───────────────┐  │  ← table SURFACE slots  (appliances, electronics,
│  │  table body   │  │                           small decorations)
│  └───────────────┘  │
│  [ chair slots…  ]  │  ← table FLOOR slots    (chairs only)
│                     │
└─────────────────────┘  ← FLOOR slot  (tables, plants, sculptures)
```

### Placement rules

| Zone | Accepts |
|---|---|
| `wall` | Clocks, paintings |
| `floor` | Tables, large plants, sculptures |
| `table-top` | Appliances, electronics, small decorations — **no chairs** |
| `table-floor` | **Chairs only** |

Multi-unit objects (e.g. Large Table = 3 units) span consecutive slots; the canvas validates that all required slots are free before placing.

---

## Object Catalog

### Tables *(floor placement)*
| Object | Size | Rent |
|---|---|---|
| Small Table | 1 unit | $8/day |
| Medium Table | 2 units | $14/day |
| Large Table | 3 units | $20/day |
| Bedside Table | 1 unit | $6/day |

### Chairs *(table-floor placement)*
| Object | Rent |
|---|---|
| Office Chair | $5/day |
| Bar Stool | $3/day |

### Decorations
| Object | Zone | Rent |
|---|---|---|
| David Sculpture | floor | $12/day |
| Big Potted Plant | floor | $4/day |
| Succulent | table-top | $2/day |
| Cactus | table-top | $2/day |
| Round Clock | wall | $3/day |
| Pendulum Clock | wall | $4/day |
| Landscape Painting | wall | $5/day |
| Portrait Painting | wall | $5/day |

### Appliances *(table-top placement)*
| Object | Rent |
|---|---|
| Toaster | $3/day |
| Coffee Maker | $5/day |
| Tea Kettle | $3/day |

### Electronics *(table-top placement)*
| Object | Rent |
|---|---|
| Monitor | $6/day |
| Printer | $4/day |

---

## Canvas State Shape

```ts
interface CanvasState {
  wallSlots:       (string | null)[];          // one entry per space unit
  floorSlots:      (string | null)[];          // one entry per space unit
  tableTopSlots:   Record<string, (string | null)[]>;  // keyed by table instanceId
  tableFloorSlots: Record<string, (string | null)[]>;  // keyed by table instanceId
  instances:       Record<string, PlacedInstance>;
}
```

Slot arrays hold `instanceId` strings. Multi-unit objects write the same `instanceId` into every slot they span. Removing a table cascades and deletes all child instances from both its `tableTopSlots` and `tableFloorSlots` arrays.

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Delete` / `Backspace` | Remove the selected object |
| `Escape` | Close picker modal / deselect |

---

## Styling Notes

All CSS is expressed through **Tailwind utility classes** using the default `stone` colour palette (`stone-50` → `stone-900`). The only inline `style` props remaining are runtime-computed pixel values for canvas geometry (slot positions, object dimensions, scale transform) that cannot be expressed as static Tailwind classes.

The offset box-shadows (`5px 5px 0`) use `shadow-stone-900 [box-shadow:Npx_Npx_0_var(--tw-shadow-color)]` to stay within Tailwind's colour system. SVG `stroke` and `fill` attributes use `currentColor`, inheriting the Tailwind text colour from their parent element.
