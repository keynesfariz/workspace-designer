import Link from 'next/link';
import { ReactNode } from 'react';

function StepHeader({
  active,
  border2 = false,
  right,
}: {
  active: 1 | 2 | 3;
  border2?: boolean;
  right?: ReactNode;
}) {
  const steps = [
    { n: 1, label: 'SELECT SIZE', path: '/' },
    { n: 2, label: 'DESIGN', path: '/design' },
    { n: 3, label: 'CHECKOUT', path: '/checkout' },
  ] as const;

  return (
    <header
      className={`flex flex-wrap items-center gap-5 bg-stone-100 px-7 py-3.5 ${border2 ? 'border-b-2 border-stone-900' : 'border-b border-stone-300'}`}>
      <Link
        href="/"
        className="text-sm font-bold tracking-widest text-stone-900">
        WORKSPACE
      </Link>
      <div className="flex flex-wrap items-center gap-1.5">
        {steps.map((s, idx) => (
          <span key={s.n} className="flex items-center gap-1.5">
            {idx > 0 && <span className="text-xs text-stone-400">—</span>}
            {s.n > active ? (
              <span
                className={`font-mono text-xs tracking-widest ${s.n === active ? 'font-bold text-stone-900' : 'text-stone-400'}`}>
                0{s.n} {s.label}
              </span>
            ) : (
              <Link
                href={s.path}
                className={`font-mono text-xs tracking-widest ${s.n === active ? 'font-bold text-stone-900' : 'text-stone-400'}`}>
                0{s.n} {s.label}
              </Link>
            )}
          </span>
        ))}
      </div>
      {right && <div className="ml-auto">{right}</div>}
    </header>
  );
}

export default StepHeader;
