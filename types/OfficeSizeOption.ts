/** Office size option */
interface OfficeSizeOption {
  id: 'small' | 'medium' | 'large';
  label: string;
  spaceUnits: number;
  baseRentPerDay: number;
  description: string;
}

export default OfficeSizeOption;
