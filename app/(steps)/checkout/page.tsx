'use client';

import StepHeader from '@/components/shared/StepHeader';
import { getDef } from '@/helpers';
import OfficeSizeOption from '@/types/OfficeSizeOption';
import PlacedInstance from '@/types/PlacedInstance';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function Checkout() {
  const router = useRouter();
  const [officeSize] = useLocalStorage<OfficeSizeOption>('office-size');
  const [instances] = useLocalStorage<PlacedInstance[]>('final-design', []);

  if (!officeSize || !instances) {
    router.push('/');
  }

  const [days, setDays] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const lineItems = useMemo(() => {
    const counts: Record<string, number> = {};
    instances!.forEach((inst) => {
      counts[inst.defId] = (counts[inst.defId] ?? 0) + 1;
    });
    return Object.entries(counts)
      .map(([id, qty]) => ({ def: getDef(id)!, qty }))
      .filter((x) => x.def);
  }, [instances]);

  const dailyRate = useMemo(
    () =>
      officeSize?.baseRentPerDay ??
      0 + lineItems.reduce((s, { def, qty }) => s + def.rentPerDay * qty, 0),
    [officeSize, lineItems],
  );
  const grand = dailyRate * Math.max(1, days);

  if (confirmed)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-100 font-mono">
        <div className="mx-4 flex w-full max-w-sm flex-col items-center gap-3 border-2 border-stone-900 bg-stone-50 p-12 text-center [box-shadow:5px_5px_0_var(--tw-shadow-color)] shadow-stone-900">
          <div className="text-5xl">✓</div>
          <h2 className="text-xl font-bold tracking-widest text-stone-900">
            BOOKING CONFIRMED
          </h2>
          <p className="text-sm leading-relaxed text-stone-500">
            {officeSize!.label} office · {days} day{days > 1 ? 's' : ''}
            <br />
            Total:{' '}
            <strong className="text-stone-900">${grand.toFixed(2)}</strong>
          </p>
          <button
            className="mt-2 w-full cursor-pointer border border-stone-900 bg-stone-900 py-2.5 text-[10px] font-bold tracking-widest text-stone-100 transition-colors hover:bg-stone-700"
            onClick={() => window.location.reload()}>
            NEW BOOKING
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col bg-stone-100 font-mono">
      <StepHeader active={3} />

      <div className="flex justify-center px-4 py-10">
        <div className="flex w-full max-w-lg flex-col gap-5 border-2 border-stone-900 bg-stone-50 p-7 [box-shadow:5px_5px_0_var(--tw-shadow-color)] shadow-stone-900">
          <Link
            href={`/design?size=${officeSize!.id}`}
            className="cursor-pointer self-start border border-stone-900 bg-transparent px-3 py-1.5 text-[10px] font-bold tracking-widest text-stone-900 transition-colors hover:bg-stone-200">
            ← Back to Design
          </Link>
          <h2 className="text-lg font-bold tracking-widest text-stone-900">
            ORDER SUMMARY
          </h2>

          {/* Office space */}
          <div className="flex flex-col gap-2 border-b border-stone-200 pb-3.5">
            <div className="text-[9px] font-bold tracking-[3px] text-stone-400">
              OFFICE SPACE
            </div>
            <div className="flex justify-between text-xs text-stone-700">
              <span>
                {officeSize!.label} Office ({officeSize!.spaceUnits} units)
              </span>
              <span>${officeSize!.baseRentPerDay}/day</span>
            </div>
          </div>

          {/* Objects */}
          {lineItems.length > 0 && (
            <div className="flex flex-col gap-2 border-b border-stone-200 pb-3.5">
              <div className="text-[9px] font-bold tracking-[3px] text-stone-400">
                OBJECTS & FURNITURE
              </div>
              {lineItems.map(({ def, qty }) => (
                <div
                  key={def.id}
                  className="flex items-center justify-between gap-3 text-xs text-stone-700">
                  <span className="flex items-center gap-2">
                    <span className="h-7 w-7 shrink-0 text-stone-800">
                      {def.render(28, 28)}
                    </span>
                    {def.name} ×{qty}
                  </span>
                  <span>${def.rentPerDay * qty}/day</span>
                </div>
              ))}
            </div>
          )}

          {/* Duration */}
          <div className="flex flex-col gap-2 border-b border-stone-200 pb-3.5">
            <div className="text-[9px] font-bold tracking-[3px] text-stone-400">
              RENTAL DURATION
            </div>
            <div className="mt-1 flex items-center gap-2.5">
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center border border-stone-900 bg-transparent text-base text-stone-900 transition-colors hover:bg-stone-200 disabled:opacity-30"
                onClick={() => setDays(Math.max(1, days - 1))}
                disabled={days <= 1}>
                −
              </button>
              <input
                type="number"
                min={1}
                max={365}
                value={days}
                onChange={(e) =>
                  setDays(
                    Math.max(1, Math.min(365, parseInt(e.target.value) || 1)),
                  )
                }
                className="w-14 border border-stone-900 bg-stone-50 py-1 text-center text-sm font-bold text-stone-900"
                aria-label="Number of rental days"
              />
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center border border-stone-900 bg-transparent text-base text-stone-900 transition-colors hover:bg-stone-200 disabled:opacity-30"
                onClick={() => setDays(Math.min(365, days + 1))}
                disabled={days >= 365}>
                +
              </button>
              <span className="text-xs tracking-widest text-stone-500">
                DAY{days > 1 ? 'S' : ''}
              </span>
            </div>
          </div>

          {/* Totals */}
          <div className="flex flex-col gap-1.5 border-t border-stone-200 pt-3.5">
            <div className="flex justify-between text-sm text-stone-700">
              <span>Daily rate</span>
              <span>${dailyRate}/day</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-stone-900">
              <span>
                × {days} day{days > 1 ? 's' : ''}
              </span>
              <strong>${grand.toFixed(2)}</strong>
            </div>
          </div>

          <button
            className="w-full cursor-pointer border border-stone-900 bg-stone-900 py-3 text-[10px] font-bold tracking-widest text-stone-100 transition-colors hover:bg-stone-700"
            onClick={() => setConfirmed(true)}>
            CONFIRM & PAY ${grand.toFixed(2)}
          </button>

          <p className="text-[10px] leading-relaxed tracking-wide text-stone-400">
            Free cancellation up to 24 hours before your booking starts. By
            confirming you agree to our terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}
