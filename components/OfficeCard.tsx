'use client';

import OfficeSizeOption from '@/types/OfficeSizeOption';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'react-use';

interface OfficeCardProps {
  officeSize: OfficeSizeOption;
}

const OfficeCard = ({ officeSize: sz }: OfficeCardProps) => {
  const router = useRouter();
  const [_, setOfficeSize] = useLocalStorage<OfficeSizeOption>('office-size');

  return (
    <button
      className="flex w-56 cursor-pointer flex-col gap-1.5 border-2 border-stone-900 bg-stone-50 p-6 text-left font-mono text-stone-900 [box-shadow:3px_3px_0_var(--tw-shadow-color)] shadow-stone-900"
      onClick={() => {
        setOfficeSize(sz);
        router.push('/design');
      }}>
      <svg
        width="100%"
        viewBox={`0 0 ${sz.spaceUnits * 48 + 16} 72`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="mb-3 block text-stone-900">
        <line x1="8" y1="48" x2={sz.spaceUnits * 48 + 8} y2="48" />
        <line x1="8" y1="8" x2={sz.spaceUnits * 48 + 8} y2="8" />
        <line x1="8" y1="8" x2="8" y2="64" />
        <line
          x1={sz.spaceUnits * 48 + 8}
          y1="8"
          x2={sz.spaceUnits * 48 + 8}
          y2="64"
        />
        {Array.from({ length: sz.spaceUnits - 1 }).map((_, i) => (
          <line
            key={i}
            x1={(i + 1) * 48 + 8}
            y1="8"
            x2={(i + 1) * 48 + 8}
            y2="64"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: sz.spaceUnits }).map((_, i) => (
          <text
            key={i}
            x={i * 48 + 32}
            y="34"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="currentColor">
            {i + 1}
          </text>
        ))}
      </svg>

      <div className="text-lg font-bold tracking-wide">{sz.label}</div>
      <div className="text-xs tracking-widest text-stone-400">
        {sz.spaceUnits} space units
      </div>
      <div className="text-xs leading-relaxed text-stone-500">
        {sz.description}
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold">${sz.baseRentPerDay}</span>
        <span className="text-xs text-stone-400"> base/day</span>
      </div>
    </button>
  );
};

export default OfficeCard;
