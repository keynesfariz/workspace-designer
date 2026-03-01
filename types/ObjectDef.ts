import { ReactNode } from 'react';
import ObjectCategory from './ObjectCategory';
import PlacingPosition from './PlacingPosition';

interface ObjectDef {
  id: string;
  name: string;
  category: ObjectCategory;
  placingPosition: PlacingPosition;
  /** Number of space units this object occupies in its slot row */
  size: number;
  rentPerDay: number;
  /**
   * For tables only: how many table-TOP slots appear on the table surface.
   * Equals the table's size property.
   */
  tableTopSlots?: number;
  /**
   * For tables only: how many table-FLOOR slots appear in front of the table.
   * Equals the table's size property. Chairs only go here.
   */
  tableFloorSlots?: number;
  /** Render the object as an outline SVG; receives pixel width & height */
  render: (w: number, h: number) => ReactNode;
}

export default ObjectDef;
