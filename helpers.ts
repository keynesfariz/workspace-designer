import { CATALOG } from './components/assets';
import ObjectDef from './types/ObjectDef';

/** Helper: find catalog entry by id */
export const getDef = (id: string): ObjectDef | undefined =>
  CATALOG.find((d) => d.id === id);

/** Generate short unique id */
export const uid = () => Math.random().toString(36).slice(2, 9);
