/**
 * Shared styling constants to reduce duplication across components.
 * Organized by component type for easy reuse.
 */

// ─────────────────────────────────────────────────────────────────────────────
// CARD AND CONTAINER STYLES
// ─────────────────────────────────────────────────────────────────────────────

export const CARD_STYLE =
    'border-2 border-stone-900 bg-stone-50 [box-shadow:5px_5px_0_var(--tw-shadow-color)] shadow-stone-900';

export const LARGE_CARD_STYLE =
    'border-2 border-stone-900 bg-stone-50 [box-shadow:6px_6px_0_var(--tw-shadow-color)] shadow-stone-900';

export const CANVAS_STYLE =
    'border-2 border-stone-900 bg-stone-50 [box-shadow:6px_6px_0_var(--tw-shadow-color)] shadow-stone-900 select-none';

// ─────────────────────────────────────────────────────────────────────────────
// BUTTON STYLES
// ─────────────────────────────────────────────────────────────────────────────

export const PRIMARY_BUTTON_STYLE =
    'cursor-pointer border border-stone-900 bg-stone-900 py-3 text-[10px] font-bold tracking-widest text-stone-100 transition-colors hover:bg-stone-700';

export const SECONDARY_BUTTON_STYLE =
    'cursor-pointer border border-stone-900 bg-transparent px-3 py-1.5 text-[10px] font-bold tracking-widest text-stone-900 transition-colors hover:bg-stone-200';

export const ICON_BUTTON_STYLE =
    'flex h-8 w-8 cursor-pointer items-center justify-center border border-stone-900 bg-transparent text-base text-stone-900 transition-colors hover:bg-stone-200 disabled:opacity-30';

export const SMALL_ICON_BUTTON_STYLE =
    'flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-dashed border-stone-400 bg-transparent font-mono text-sm font-light text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-600';

export const ADD_SLOT_BUTTON_STYLE =
    'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-dashed border-stone-400 bg-transparent font-mono text-xl font-light text-stone-400 transition-colors hover:border-stone-600 hover:text-stone-600';

// ─────────────────────────────────────────────────────────────────────────────
// TEXT STYLES
// ─────────────────────────────────────────────────────────────────────────────

export const LABEL_STYLE = 'text-[9px] font-bold tracking-[3px] text-stone-400';

export const SECTION_LABEL_STYLE =
    'text-xs font-bold tracking-widest text-stone-900';

export const HEADER_STYLE = 'font-mono text-xs tracking-widest text-stone-900';

// ─────────────────────────────────────────────────────────────────────────────
// MODAL/OVERLAY STYLES
// ─────────────────────────────────────────────────────────────────────────────

export const MODAL_OVERLAY_STYLE =
    'fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4';

export const MODAL_CONTENT_STYLE =
    'flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden border-2 border-stone-900 bg-stone-50 font-mono [box-shadow:6px_6px_0_var(--tw-shadow-color)] shadow-stone-900';
