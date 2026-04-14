'use client';

import StepHeader from '@/components/shared/StepHeader';
import ObjectPicker from '@/components/step-2-canvas-designer/ObjectPicker';
import {
  CANVAS_HEIGHT,
  FLOOR_HEIGHT,
  TABLE_FLOOR_H,
  TABLE_FLOOR_SLOT_H,
  TABLE_TOP_H,
  TABLE_TOP_SLOT_H,
  UNIT_WIDTH,
  WALL_HEIGHT,
} from '@/constants/calculations';
import { getDef, uid } from '@/helpers';
import useIsMobile from '@/hooks/useIsMobile';
import { cloneCanvasState, initializeCanvasState } from '@/lib/stateHelpers';
import type { CanvasState } from '@/types/CanvasState';
import OfficeSizeOption from '@/types/OfficeSizeOption';
import PlacedInstance from '@/types/PlacedInstance';
import PlacingPosition from '@/types/PlacingPosition';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function CanvasDesigner() {
  const router = useRouter();
  const [officeSize, setOfficeSize] =
    useLocalStorage<OfficeSizeOption>('office-size');

  if (!officeSize) {
    return;
  }

  const isMobile = useIsMobile();
  const units = officeSize.spaceUnits;

  const [state, setState] = useState<CanvasState>(() =>
    initializeCanvasState(units),
  );

  const [_, setPlacedInstances] =
    useLocalStorage<PlacedInstance[]>('final-design');

  /**
   * Active picker: which slot was clicked.
   *  kind       — one of "wall" | "floor" | "table-top" | "table-floor"
   *  index      — slot index within that zone's array
   *  tableId    — instanceId of the parent table (only for table-top / table-floor)
   */
  const [picker, setPicker] = useState<{
    kind: PlacingPosition;
    index: number;
    tableId?: string;
  } | null>(null);

  /** Currently selected instance id (for removal) */
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ── Derived: daily total rent ──
  const totalPerDay = useMemo(() => {
    const itemsCost = Object.values(state.instances).reduce(
      (s, inst) => s + (getDef(inst.defId)?.rentPerDay ?? 0),
      0,
    );
    return officeSize.baseRentPerDay + itemsCost;
  }, [state.instances, officeSize]);

  // ── Derived: cart line items ──
  const cartItems = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(state.instances).forEach((inst) => {
      counts[inst.defId] = (counts[inst.defId] ?? 0) + 1;
    });
    return Object.entries(counts)
      .map(([defId, qty]) => ({ def: getDef(defId)!, qty }))
      .filter((x) => x.def);
  }, [state.instances]);

  // ── Place an object chosen from the picker ──
  const handlePick = useCallback(
    (defId: string) => {
      if (!picker) return;
      const def = getDef(defId);
      if (!def) return;
      const { kind, index, tableId } = picker;
      setPicker(null);

      setState((prev) => {
        const next = cloneCanvasState(prev);

        const instanceId = uid();
        const instance: PlacedInstance = {
          instanceId,
          defId,
          slotIndex: index,
        };

        if (kind === 'wall') {
          // Validate N consecutive wall slots are empty
          for (let i = 0; i < def.size; i++) {
            if (index + i >= units || next.wallSlots[index + i] !== null)
              return prev;
          }
          for (let i = 0; i < def.size; i++)
            next.wallSlots[index + i] = instanceId;
          next.instances[instanceId] = instance;
        } else if (kind === 'floor') {
          // Validate N consecutive floor slots are empty
          for (let i = 0; i < def.size; i++) {
            if (index + i >= units || next.floorSlots[index + i] !== null)
              return prev;
          }
          for (let i = 0; i < def.size; i++)
            next.floorSlots[index + i] = instanceId;
          next.instances[instanceId] = instance;
          // Tables get BOTH a table-top and a table-floor slot array
          if (def.category === 'table') {
            if (def.tableTopSlots)
              next.tableTopSlots[instanceId] = Array(def.tableTopSlots).fill(
                null,
              );
            if (def.tableFloorSlots)
              next.tableFloorSlots[instanceId] = Array(
                def.tableFloorSlots,
              ).fill(null);
          }
        } else if (kind === 'table-top' && tableId) {
          // Place on the table surface — no chairs allowed (enforced by catalog filter)
          const slots = next.tableTopSlots[tableId];
          if (!slots) return prev;
          for (let i = 0; i < def.size; i++) {
            if (index + i >= slots.length || slots[index + i] !== null)
              return prev;
          }
          for (let i = 0; i < def.size; i++) slots[index + i] = instanceId;
          instance.tableSlotIndex = index;
          instance.parentTableId = tableId;
          instance.parentZone = 'table-top';
          next.instances[instanceId] = instance;
        } else if (kind === 'table-floor' && tableId) {
          // Place in front of the table — chairs only (enforced by catalog filter)
          const slots = next.tableFloorSlots[tableId];
          if (!slots) return prev;
          for (let i = 0; i < def.size; i++) {
            if (index + i >= slots.length || slots[index + i] !== null)
              return prev;
          }
          for (let i = 0; i < def.size; i++) slots[index + i] = instanceId;
          instance.tableSlotIndex = index;
          instance.parentTableId = tableId;
          instance.parentZone = 'table-floor';
          next.instances[instanceId] = instance;
        }

        return next;
      });
    },
    [picker, units],
  );

  // ── Remove the selected instance (and its children if it's a table) ──
  const handleRemove = useCallback(() => {
    if (!selectedId) return;
    setState((prev) => {
      const next = cloneCanvasState(prev);

      const inst = next.instances[selectedId];
      if (!inst) return prev;
      const def = getDef(inst.defId);
      if (!def) return prev;

      if (inst.parentTableId !== undefined && inst.parentZone !== undefined) {
        // Remove a child item from a table slot
        const slotArr =
          inst.parentZone === 'table-top'
            ? next.tableTopSlots[inst.parentTableId]
            : next.tableFloorSlots[inst.parentTableId];
        if (slotArr && inst.tableSlotIndex !== undefined) {
          for (let i = 0; i < def.size; i++) {
            if (slotArr[inst.tableSlotIndex + i] === selectedId)
              slotArr[inst.tableSlotIndex + i] = null;
          }
        }
      } else if (def.placingPosition === 'wall') {
        for (let i = 0; i < def.size; i++) {
          if (next.wallSlots[inst.slotIndex + i] === selectedId)
            next.wallSlots[inst.slotIndex + i] = null;
        }
      } else if (def.placingPosition === 'floor') {
        for (let i = 0; i < def.size; i++) {
          if (next.floorSlots[inst.slotIndex + i] === selectedId)
            next.floorSlots[inst.slotIndex + i] = null;
        }
        // If it's a table, remove all children from BOTH slot zones
        if (def.category === 'table') {
          const topSlots = next.tableTopSlots[selectedId] ?? [];
          const floorSlots = next.tableFloorSlots[selectedId] ?? [];
          [...topSlots, ...floorSlots].forEach((childId) => {
            if (childId) delete next.instances[childId];
          });
          delete next.tableTopSlots[selectedId];
          delete next.tableFloorSlots[selectedId];
        }
      }

      delete next.instances[selectedId];
      return next;
    });
    setSelectedId(null);
  }, [selectedId]);

  // Keyboard shortcuts: Delete removes selected; Escape cancels picker/selection
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPicker(null);
        setSelectedId(null);
      }
      if (
        (e.key === 'Delete' || e.key === 'Backspace') &&
        selectedId &&
        !picker
      ) {
        handleRemove();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedId, picker, handleRemove]);

  const onCheckout = (data: PlacedInstance[]) => {
    setOfficeSize(officeSize);
    setPlacedInstances(data);

    router.push('/checkout');
  };

  // ── Helpers to find the "anchor" instance at a slot ──
  // Multi-unit objects fill N slots, but we only render at the anchor (slotIndex === i)
  const getFloorAnchor = (i: number): string | null => {
    const id = state.floorSlots[i];
    if (!id) return null;
    return state.instances[id]?.slotIndex === i ? id : null;
  };
  const getWallAnchor = (i: number): string | null => {
    const id = state.wallSlots[i];
    if (!id) return null;
    return state.instances[id]?.slotIndex === i ? id : null;
  };

  // Canvas pixel width
  const totalW = units * UNIT_WIDTH;
  // Scale down on mobile so it fits the screen
  const canvasScale = isMobile
    ? Math.min(1, (window.innerWidth - 32) / totalW)
    : 1;

  // ─────────────────────────────────────────────────────────────────
  // WALL ELEVATION CANVAS
  // ─────────────────────────────────────────────────────────────────
  const renderCanvas = () => (
    <div
      style={{
        position: 'relative',
        width: totalW,
        height: CANVAS_HEIGHT,
        flexShrink: 0,
        transform: `scale(${canvasScale})`,
        transformOrigin: 'top left',
      }}
      className="mx-auto overflow-visible border-2 border-stone-900 bg-stone-50 [box-shadow:6px_6px_0_var(--tw-shadow-color)] shadow-stone-900 select-none"
      onClick={() => setSelectedId(null)}>
      {/* Column dividers */}
      {Array.from({ length: units - 1 }).map((_, i) => (
        <div
          key={`cdiv-${i}`}
          style={{
            position: 'absolute',
            left: (i + 1) * UNIT_WIDTH,
            top: 0,
            width: 1,
            height: CANVAS_HEIGHT,
          }}
          className="pointer-events-none border-l border-dashed border-stone-300"
        />
      ))}

      {/* Floor line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: WALL_HEIGHT,
          width: '100%',
          height: 2,
        }}
        className="pointer-events-none bg-stone-900"
      />

      {/* Baseboard */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: WALL_HEIGHT,
          width: '100%',
          height: 6,
        }}
        className="pointer-events-none border-b border-stone-900 bg-stone-200"
      />

      {/* Zone labels */}
      <div
        style={{ position: 'absolute', right: 8, top: 6 }}
        className="pointer-events-none font-mono text-[9px] tracking-widest text-stone-400">
        WALL
      </div>
      <div
        style={{ position: 'absolute', right: 8, top: WALL_HEIGHT + 8 }}
        className="pointer-events-none font-mono text-[9px] tracking-widest text-stone-400">
        FLOOR
      </div>

      {/* Unit labels */}
      {Array.from({ length: units }).map((_, i) => (
        <div
          key={`ulabel-${i}`}
          style={{
            position: 'absolute',
            left: i * UNIT_WIDTH,
            bottom: 6,
            width: UNIT_WIDTH,
          }}
          className="pointer-events-none text-center font-mono text-[9px] tracking-widest text-stone-300">
          UNIT {i + 1}
        </div>
      ))}

      {/* WALL SLOTS */}
      {Array.from({ length: units }).map((_, i) => {
        const occupied = state.wallSlots[i];
        const anchor = getWallAnchor(i);
        if (occupied && !anchor) return null;

        if (anchor) {
          const inst = state.instances[anchor];
          const def = getDef(inst.defId)!;
          const objW = def.size * UNIT_WIDTH - 12;
          const objH = WALL_HEIGHT - 20;
          const isSel = selectedId === anchor;
          return (
            <div
              key={`wobj-${i}`}
              style={{
                position: 'absolute',
                left: i * UNIT_WIDTH + 6,
                top: 6,
                width: objW,
                height: objH,
              }}
              className={`cursor-pointer transition-[outline] duration-100 ${isSel ? 'text-stone-900 outline outline-2 outline-stone-900' : 'text-stone-800 outline outline-2 outline-transparent'}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(anchor);
              }}
              title={`${def.name} — click to select`}>
              {def.render(objW, objH)}
              <div
                style={{
                  position: 'absolute',
                  bottom: -14,
                  left: 0,
                  width: '100%',
                }}
                className="pointer-events-none text-center font-mono text-[8px] tracking-wide text-stone-400">
                {def.name.toUpperCase()}
              </div>
            </div>
          );
        }

        return (
          <div
            key={`wslot-${i}`}
            style={{
              position: 'absolute',
              left: i * UNIT_WIDTH,
              top: 0,
              width: UNIT_WIDTH,
              height: WALL_HEIGHT - 2,
            }}
            className="flex items-center justify-center">
            <button
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-dashed border-stone-400 bg-transparent font-mono text-xl font-light text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-600"
              onClick={(e) => {
                e.stopPropagation();
                setPicker({ kind: 'wall', index: i });
              }}
              title="Add wall object">
              +
            </button>
          </div>
        );
      })}

      {/* FLOOR SLOTS */}
      {Array.from({ length: units }).map((_, i) => {
        const occupied = state.floorSlots[i];
        const anchor = getFloorAnchor(i);
        if (occupied && !anchor) return null;

        if (anchor) {
          const inst = state.instances[anchor];
          const def = getDef(inst.defId)!;
          const objW = def.size * UNIT_WIDTH - 8;
          const isTable = def.category === 'table';
          const objH = isTable
            ? FLOOR_HEIGHT - TABLE_TOP_H - TABLE_FLOOR_H - 24
            : FLOOR_HEIGHT - 24;
          const isSel = selectedId === anchor;
          const topSlots = state.tableTopSlots[anchor] ?? [];
          const floorSlots = state.tableFloorSlots[anchor] ?? [];
          const topSlotW =
            topSlots.length > 0 ? Math.floor((objW - 6) / topSlots.length) : 0;
          const floorSlotW =
            floorSlots.length > 0
              ? Math.floor((objW - 6) / floorSlots.length)
              : 0;

          const renderSubSlot = (
            slotArr: (string | null)[],
            j: number,
            zone: 'table-top' | 'table-floor',
            slotW: number,
            slotH: number,
          ) => {
            const occupantId = slotArr[j];
            const childInst = occupantId ? state.instances[occupantId] : null;
            const childDef = childInst ? getDef(childInst.defId) : null;
            const isChildSel = occupantId && selectedId === occupantId;

            if (occupantId && childInst?.tableSlotIndex !== j) return null;

            if (childDef && childInst) {
              return (
                <div
                  key={`${zone}-item-${j}`}
                  style={{
                    width: childDef.size * slotW,
                    height: slotH,
                    flexShrink: 0,
                  }}
                  className={`cursor-pointer rounded-sm bg-white transition-[outline] ${isChildSel ? 'text-stone-900 outline outline-2 outline-stone-900' : 'text-stone-700 outline outline-stone-300'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(occupantId);
                  }}
                  title={childDef.name}>
                  {childDef.render(childDef.size * slotW, slotH)}
                </div>
              );
            }

            return (
              <div
                key={`${zone}-empty-${j}`}
                style={{ width: slotW, height: slotH, flexShrink: 0 }}
                className="flex items-center justify-center rounded-sm border border-dashed border-stone-300">
                <button
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-dashed border-stone-400 bg-transparent font-mono text-sm font-light text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPicker({ kind: zone, index: j, tableId: anchor });
                  }}
                  title={
                    zone === 'table-top'
                      ? 'Add to table surface'
                      : 'Add chair in front of table'
                  }>
                  +
                </button>
              </div>
            );
          };

          return (
            <div
              key={`fobj-${i}`}
              style={{
                position: 'absolute',
                left: i * UNIT_WIDTH + 4,
                top: WALL_HEIGHT + 6,
                width: objW,
                zIndex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(anchor);
              }}>
              {/* Table-top row */}
              {isTable && topSlots.length > 0 && (
                <div
                  style={{
                    width: '100%',
                    height: TABLE_TOP_H,
                    gap: 2,
                    padding: '2px 3px',
                    position: 'relative',
                    zIndex: 3,
                  }}
                  className="flex flex-row rounded-t-sm border border-b-0 border-dashed border-stone-400 bg-stone-50/90"
                  onClick={(e) => e.stopPropagation()}
                  title="Table surface — no chairs">
                  <div
                    style={{ position: 'absolute', top: 2, right: 4 }}
                    className="pointer-events-none font-mono text-[7px] tracking-widest text-stone-400">
                    SURFACE
                  </div>
                  {topSlots.map((_, j) =>
                    renderSubSlot(
                      topSlots,
                      j,
                      'table-top',
                      topSlotW,
                      TABLE_TOP_SLOT_H,
                    ),
                  )}
                </div>
              )}

              {/* Object SVG */}
              <div
                style={{ height: objH }}
                className={`cursor-pointer transition-[outline] duration-100 ${isSel ? 'text-stone-900 outline outline-2 outline-stone-900' : 'text-stone-800 outline outline-2 outline-transparent'}`}
                title={`${def.name} — click to select`}>
                {def.render(objW, objH)}
              </div>

              {/* Name label */}
              <div className="my-1 text-center font-mono text-[8px] tracking-wide text-stone-400">
                {def.name.toUpperCase()}
              </div>

              {/* Table-floor row */}
              {isTable && floorSlots.length > 0 && (
                <div
                  style={{
                    width: '100%',
                    height: TABLE_FLOOR_H,
                    gap: 2,
                    padding: '2px 3px',
                    position: 'relative',
                    zIndex: 3,
                  }}
                  className="flex flex-row rounded-b-sm border border-t-0 border-dashed border-stone-300 bg-stone-100/75"
                  onClick={(e) => e.stopPropagation()}
                  title="Table floor — chairs only">
                  <div
                    style={{ position: 'absolute', bottom: 2, right: 4 }}
                    className="pointer-events-none font-mono text-[7px] tracking-widest text-stone-400">
                    CHAIRS
                  </div>
                  {floorSlots.map((_, j) =>
                    renderSubSlot(
                      floorSlots,
                      j,
                      'table-floor',
                      floorSlotW,
                      TABLE_FLOOR_SLOT_H,
                    ),
                  )}
                </div>
              )}
            </div>
          );
        }

        return (
          <div
            key={`fslot-${i}`}
            style={{
              position: 'absolute',
              left: i * UNIT_WIDTH,
              top: WALL_HEIGHT + 6,
              width: UNIT_WIDTH,
              height: FLOOR_HEIGHT - 24,
            }}
            className="flex items-center justify-center">
            <button
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-dashed border-stone-400 bg-transparent font-mono text-xl font-light text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-600"
              onClick={(e) => {
                e.stopPropagation();
                setPicker({ kind: 'floor', index: i });
              }}
              title="Add floor object">
              +
            </button>
          </div>
        );
      })}
    </div>
  );

  // ─────────────────────────────────────────────────────────────────
  // SIDE / BOTTOM PANEL
  // ─────────────────────────────────────────────────────────────────
  const renderPanel = () => (
    <div
      className={
        isMobile
          ? 'flex max-h-[45vh] flex-col gap-3.5 overflow-y-auto border-t-2 border-stone-900 bg-stone-50 p-4 font-mono'
          : 'sticky top-0 flex min-h-[calc(100vh-3.375rem)] max-w-96 flex-col gap-4 overflow-y-auto border-l-2 border-stone-900 bg-stone-50 p-5 font-mono'
      }>
      {/* Office info */}
      <div className="flex flex-col gap-1 border-b border-stone-200 pb-3.5">
        <div className="mb-1 text-[9px] font-bold tracking-[3px] text-stone-400">
          OFFICE
        </div>
        <div className="text-xs font-bold tracking-wide text-stone-900">
          {officeSize.label} · {officeSize.spaceUnits} space units
        </div>
      </div>

      {/* Cart */}
      <div className="flex flex-col gap-1 border-b border-stone-200 pb-3.5">
        <div className="mb-1 text-[9px] font-bold tracking-[3px] text-stone-400">
          🛒 CART
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-stone-500">
            <span>{officeSize.label} Office</span>
            <span>${officeSize.baseRentPerDay}/day</span>
          </div>
          {cartItems.map(({ def, qty }) => (
            <div
              key={def.id}
              className="flex justify-between text-xs text-stone-500">
              <span>
                {def.name} ×{qty}
              </span>
              <span>${def.rentPerDay * qty}/day</span>
            </div>
          ))}
          <div className="mt-1 flex justify-between border-t border-stone-300 pt-1.5 text-xs font-bold tracking-wide text-stone-900">
            <span>TOTAL</span>
            <span className="text-sm">${totalPerDay}/day</span>
          </div>
        </div>
      </div>

      {/* Selected */}
      {selectedId &&
        (() => {
          const inst = state.instances[selectedId];
          const def = inst ? getDef(inst.defId) : null;
          return def ? (
            <div className="flex flex-col gap-1 border-b border-stone-200 pb-3.5">
              <div className="mb-1 text-[9px] font-bold tracking-[3px] text-stone-400">
                SELECTED
              </div>
              <div className="h-10 w-10 text-stone-900">
                {def.render(40, 40)}
              </div>
              <div className="text-xs font-bold tracking-wide text-stone-900">
                {def.name}
              </div>
              <div className="mb-1 text-[10px] tracking-wide text-stone-400">
                {def.category.toUpperCase()} · ${def.rentPerDay}/day
              </div>
              <button
                className="cursor-pointer self-start border border-stone-900 bg-transparent px-3 py-1 text-[10px] font-bold tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-stone-100"
                onClick={handleRemove}>
                ✕ REMOVE
              </button>
            </div>
          ) : null;
        })()}

      {/* Legend */}
      <div className="flex flex-col gap-1 border-b border-stone-200 pb-3.5">
        <div className="mb-1 text-[9px] font-bold tracking-[3px] text-stone-400">
          HOW TO USE
        </div>
        <div className="text-[10px] leading-7 tracking-wide text-stone-400">
          <div>
            <strong className="text-stone-700">+</strong> Wall slot — clocks,
            paintings
          </div>
          <div>
            <strong className="text-stone-700">+</strong> Floor slot — tables,
            plants, sculptures
          </div>
          <div>
            <strong className="text-stone-700">+</strong> Table SURFACE —
            appliances, electronics, decor
          </div>
          <div>
            <strong className="text-stone-700">+</strong> Table FLOOR — chairs
            only
          </div>
          <div>
            <strong className="text-stone-700">⌫</strong> Del key or Remove to
            delete
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2">
        <Link
          href={'/'}
          className="flex-1 cursor-pointer border border-stone-900 bg-transparent py-2.5 text-center text-[10px] font-bold tracking-widest text-stone-900 transition-colors hover:bg-stone-200">
          ← Back
        </Link>
        <button
          className="flex-2 cursor-pointer border border-stone-900 bg-stone-900 py-2.5 text-[10px] font-bold tracking-widest text-stone-100 transition-colors hover:bg-stone-700"
          onClick={() => onCheckout(Object.values(state.instances))}>
          Checkout →
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-stone-100">
      <StepHeader
        active={2}
        border2
        right={
          !isMobile ? (
            <span className="font-mono text-sm font-bold tracking-wide text-stone-900">
              ${totalPerDay}/day
            </span>
          ) : undefined
        }
      />

      <div
        className={
          isMobile ? 'flex flex-1 flex-col' : 'flex flex-1 items-start'
        }>
        {/* Canvas scroll area */}
        <div
          className={`flex-1 overflow-x-auto overflow-y-auto ${isMobile ? 'p-5' : 'p-9'}`}>
          {renderCanvas()}
          <div
            style={{
              height: canvasScale < 1 ? CANVAS_HEIGHT * (1 - canvasScale) : 0,
            }}
          />
        </div>
        {renderPanel()}
      </div>

      {picker && (
        <ObjectPicker
          position={picker.kind}
          onPick={handlePick}
          onClose={() => setPicker(null)}
        />
      )}
    </div>
  );
}
