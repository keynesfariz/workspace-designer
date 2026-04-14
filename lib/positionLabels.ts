import type PlacingPosition from '@/types/PlacingPosition';

/** Position labels for UI display */
export const POSITION_LABELS: Record<PlacingPosition, string> = {
    wall: 'WALL',
    floor: 'FLOOR',
    'table-top': 'TABLE SURFACE',
    'table-floor': 'TABLE FLOOR (chairs only)',
};

/**
 * Get a user-friendly label for a placing position.
 */
export const getPositionLabel = (position: PlacingPosition): string => {
    return POSITION_LABELS[position];
};
