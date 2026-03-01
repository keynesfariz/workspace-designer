'use client';

// ─────────────────────────────────────────────────────────────────────────────
// OBJECT PICKER MODAL
// ─────────────────────────────────────────────────────────────────────────────

import ObjectCategory from '@/types/ObjectCategory';
import PlacingPosition from '@/types/PlacingPosition';
import { useMemo, useState } from 'react';
import { CATALOG } from '../assets';

/**
 * Modal shown when the user clicks a "+" slot.
 *
 * Filtering rules by position:
 *  "wall"        → items with placingPosition === "wall"
 *  "floor"       → items with placingPosition === "floor"
 *  "table-top"   → items with placingPosition === "table-top" (all categories EXCEPT chairs)
 *  "table-floor" → items with placingPosition === "table-floor" (chairs ONLY)
 */
function ObjectPicker({
  position,
  onPick,
  onClose,
}: {
  position: PlacingPosition;
  onPick: (defId: string) => void;
  onClose: () => void;
}) {
  const [cat, setCat] = useState<ObjectCategory | 'all'>('all');

  const baseItems = useMemo(
    () => CATALOG.filter((d) => d.placingPosition === position),
    [position],
  );

  const availableCats = useMemo(() => {
    const cats = new Set<ObjectCategory>();
    baseItems.forEach((d) => cats.add(d.category));
    return ['all' as const, ...Array.from(cats)];
  }, [baseItems]);

  const items = useMemo(
    () => baseItems.filter((d) => cat === 'all' || d.category === cat),
    [baseItems, cat],
  );

  const positionLabel =
    position === 'table-top'
      ? 'TABLE SURFACE'
      : position === 'table-floor'
        ? 'TABLE FLOOR (chairs only)'
        : position.toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4"
      onClick={onClose}>
      <div
        className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden border-2 border-stone-900 bg-stone-50 font-mono [box-shadow:6px_6px_0_var(--tw-shadow-color)] shadow-stone-900"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-900 px-5 py-3">
          <div className="text-xs font-bold tracking-widest text-stone-900">
            ADD TO <strong>{positionLabel}</strong>
          </div>
          <button
            className="cursor-pointer border-none bg-transparent px-1.5 py-0.5 text-base text-stone-900 hover:bg-stone-200"
            onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Category tabs */}
        {availableCats.length > 2 && (
          <div className="flex overflow-x-auto border-b border-stone-900">
            {availableCats.map((c) => (
              <button
                key={c}
                className={`cursor-pointer border-r border-stone-300 px-3.5 py-2 text-[10px] font-bold tracking-widest whitespace-nowrap transition-colors ${cat === c ? 'bg-stone-900 text-stone-100' : 'bg-transparent text-stone-400 hover:bg-stone-100'}`}
                onClick={() => setCat(c)}>
                {c === 'all' ? 'ALL' : c.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Item grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(108px,1fr))] overflow-y-auto p-2.5">
          {items.length === 0 && (
            <div className="col-span-full py-6 text-center text-xs tracking-widest text-stone-400">
              NO ITEMS AVAILABLE
            </div>
          )}
          {items.map((def) => (
            <button
              key={def.id}
              className="m-0.5 flex cursor-pointer flex-col items-center gap-1 border border-stone-200 bg-transparent p-3 font-mono text-stone-900 transition-colors hover:bg-stone-100"
              onClick={() => onPick(def.id)}
              title={`${def.name} — $${def.rentPerDay}/day — ${def.size} unit(s)`}>
              <div className="flex h-[72px] w-[72px] items-center justify-center">
                {def.render(72, 72)}
              </div>
              <div className="text-center text-[9px] font-bold tracking-wide text-stone-900">
                {def.name}
              </div>
              <div className="text-[9px] text-stone-400">
                {def.size}u · ${def.rentPerDay}/day
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ObjectPicker;
