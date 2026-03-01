import OFFICE_SIZES from '@/constants/office-sizes';
import OfficeCard from '../OfficeCard';

const OfficeSizeOptions = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {OFFICE_SIZES.map((sz) => (
        <OfficeCard key={sz.id} officeSize={sz} />
      ))}
    </div>
  );
};
export default OfficeSizeOptions;
