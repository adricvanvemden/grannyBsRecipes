import { Nutrient } from '@/types';

const Nutrition: React.FC<Nutrient> = ({ fat, protein, carbohydrates, calories }) => (
  <div className="not-prose grid grid-cols-4  text-sm divide-x-2 bg-primary py-2 px-4 rounded mb-4 text-white">
    <span>
      Calories
      <p className="text-white font-semibold text-xs">{calories}</p>
    </span>
    <span className="pl-2">
      FAT
      <p className="text-white font-semibold text-xs">{fat}</p>
    </span>
    <span className="pl-2">
      PROTEIN
      <p className="text-white font-semibold text-xs">{protein}</p>
    </span>
    <span className="pl-2">
      CARBS
      <p className="text-white font-semibold text-xs">{carbohydrates}</p>
    </span>
  </div>
);

export default Nutrition;
