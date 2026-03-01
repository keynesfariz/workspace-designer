import OfficeSizeOption from '@/types/OfficeSizeOption';

const OFFICE_SIZES: OfficeSizeOption[] = [
  {
    id: 'small',
    label: 'Small',
    spaceUnits: 3,
    baseRentPerDay: 49,
    description: 'A compact private studio — 3 space units',
  },
  {
    id: 'medium',
    label: 'Medium',
    spaceUnits: 5,
    baseRentPerDay: 119,
    description: 'A collaborative room — 5 space units',
  },
  {
    id: 'large',
    label: 'Large',
    spaceUnits: 7,
    baseRentPerDay: 299,
    description: 'An open-plan office — 7 space units',
  },
];

export default OFFICE_SIZES;
