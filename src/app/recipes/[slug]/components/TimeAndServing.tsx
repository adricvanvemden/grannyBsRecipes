interface TimeAndServingProps {
  preparationTime: string | undefined; // Represented as HH:MM:SS
  cookingTime: string | undefined;
  portions: number | undefined;
}

const TimeAndServing: React.FC<TimeAndServingProps> = ({ preparationTime, cookingTime, portions }) => (
  <div className="not-prose flex gap-2 text-sm divide-x-2 bg-primary py-2 px-4 rounded mb-4 text-white">
    <span>
      PREP TIME
      <p className="text-white font-semibold text-xs">{preparationTime} MIN</p>
    </span>
    <span className="pl-2">
      COOKING TIME
      <p className="text-white font-semibold text-xs">{cookingTime} MIN</p>
    </span>
    <span className="pl-2">
      SERVING
      <p className="text-white font-semibold text-xs">{portions}</p>
    </span>
  </div>
);

export default TimeAndServing;
