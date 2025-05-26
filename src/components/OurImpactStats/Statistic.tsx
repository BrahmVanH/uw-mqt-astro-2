import { Card } from "@/components/ui/card";
import AnimatedNumber from "./AnimatedNumber";
import type { StatisticProps } from "./index.astro";

const Statistic: React.FC<StatisticProps> = ({
  value,
  unit,
  text,
  start,
  index,
}) => {
  return (
    <Card
      key={index}
      className="bg-transparent border-none shadow-none mt-2 w-max"
    >
      <div className="flex flex-col items-center justify-between text-center">
        <p
          className="text-lg lg:text-xl font-bold text-tertiary-black-1 font-heading"
          aria-live="polite"
        >
          {value && (
            <AnimatedNumber
              unit={unit}
              value={value}
              start={start}
              aria-label={`${unit}${value} ${text}`}
            />
          )}
        </p>
        <p className="text-md font-semibold text-tertiary-black-2 max-w-[80%] mt-1 leading-relaxed">
          {text}
        </p>
      </div>
    </Card>
  );
};

export default Statistic;
