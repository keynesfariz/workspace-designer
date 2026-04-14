import { getDef } from '@/helpers';
import type ObjectDef from '@/types/ObjectDef';
import type PlacedInstance from '@/types/PlacedInstance';
import { useMemo } from 'react';

export interface CartLineItem {
    def: ObjectDef;
    qty: number;
}

/**
 * Calculates line items from placed instances.
 * Counts quantities of each unique defId and returns with their definitions.
 */
export const useLineItems = (instances: PlacedInstance[]): CartLineItem[] => {
    return useMemo(() => {
        const counts: Record<string, number> = {};
        instances.forEach((inst) => {
            counts[inst.defId] = (counts[inst.defId] ?? 0) + 1;
        });
        return Object.entries(counts)
            .map(([defId, qty]) => ({ def: getDef(defId)!, qty }))
            .filter((x) => x.def);
    }, [instances]);
};
