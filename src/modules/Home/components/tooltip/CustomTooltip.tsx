import { TooltipProps } from "recharts";

export default function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md text-xs w-auto">
        <p className="font-bold">{label}</p>
        {payload.map((data, index) => {
          const color = data.stroke ? data.stroke : data.color;
          return (
            <p key={index} className={`text-[${color}]`}>
              {data.name}: {data.value}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
}
