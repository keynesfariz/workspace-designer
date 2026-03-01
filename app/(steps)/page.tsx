import StepHeader from '@/components/shared/StepHeader';
import OfficeSizeOptions from '@/components/step-1-office-selector/OfficeSizeOptions';

export default function OfficeSizeSelector() {
  return (
    <>
      <StepHeader active={1} />
      <div className="flex flex-col items-center px-6 py-14">
        <div className="text-center">
          <h1 className="text-gray-1 mb-2.5 line-clamp-1 font-bold tracking-tight">
            Choose your space.
          </h1>
          <p className="text-gray-2 m-0 text-xs tracking-tight">
            Each office is measured in <em>space units</em> — the columns of
            your wall elevation.
          </p>
        </div>
        <OfficeSizeOptions />
      </div>
    </>
  );
}
