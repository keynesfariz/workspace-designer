import type { CanvasState } from '@/types/CanvasState';

/**
 * Creates a deep copy of canvas state to enable immutable updates.
 * Optimized for efficient state cloning with proper slot and instance handling.
 */
export const cloneCanvasState = (state: CanvasState): CanvasState => ({
    wallSlots: [...state.wallSlots],
    floorSlots: [...state.floorSlots],
    tableTopSlots: Object.fromEntries(
        Object.entries(state.tableTopSlots).map(([k, v]) => [k, [...v]]),
    ),
    tableFloorSlots: Object.fromEntries(
        Object.entries(state.tableFloorSlots).map(([k, v]) => [k, [...v]]),
    ),
    instances: { ...state.instances },
});

/**
 * Initializes an empty canvas state for a given number of space units.
 */
export const initializeCanvasState = (units: number): CanvasState => ({
    wallSlots: Array(units).fill(null),
    floorSlots: Array(units).fill(null),
    tableTopSlots: {},
    tableFloorSlots: {},
    instances: {},
});
