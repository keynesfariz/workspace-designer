/** An instance of an object placed in the canvas */
interface PlacedInstance {
  instanceId: string;
  defId: string;
  /** For floor/wall: starting space unit index (0-based) */
  slotIndex: number;
  /** For table children: index of the slot within the parent table's slot array */
  tableSlotIndex?: number;
  /** For table children: instanceId of the parent table */
  parentTableId?: string;
  /**
   * For table children: which zone of the table this occupies.
   *   "table-top"   → placed on the table surface (no chairs)
   *   "table-floor" → placed in front of the table on the floor (chairs only)
   */
  parentZone?: 'table-top' | 'table-floor';
}

export default PlacedInstance;
