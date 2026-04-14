import type PlacedInstance from './PlacedInstance';

/** Canvas state containing all placed objects and their slots */
export interface CanvasState {
    wallSlots: (string | null)[];
    floorSlots: (string | null)[];
    tableTopSlots: Record<string, (string | null)[]>;
    tableFloorSlots: Record<string, (string | null)[]>;
    instances: Record<string, PlacedInstance>;
}
