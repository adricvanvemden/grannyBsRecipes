interface TimeAndServingProps {
  preparationTime: number;
  cookingTime: number;
  portions: number;
}

const TimeAndServing: React.FC<TimeAndServingProps> = ({ preparationTime, cookingTime, portions }) => (
  <div className="not-prose flex gap-2 text-sm divide-x-2 my-4">
    <span>
      PREP TIME
      <p className="text-black font-semibold text-xs">{preparationTime} MIN</p>
    </span>
    <span className="pl-2">
      COOKING TIME
      <p className="text-black font-semibold text-xs">{cookingTime} MIN</p>
    </span>
    <span className="pl-2">
      SERVING
      <p className="text-black font-semibold text-xs">{portions} MIN</p>
    </span>
  </div>
);

export default TimeAndServing;
