import { BarChartSeries } from "@mantine/charts";
import { Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart } from "recharts";

interface BarChartProps {
  data: Record<string, any>[];
  orientation?: "horizontal" | "vertical";
  radius?: number | [number, number, number, number];
  series: BarChartSeries[];
}

export default function CustomBarChart({ data, orientation, radius, series }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout={orientation}>
        <YAxis type="category" dataKey="month" width={150} className="text-xs font-bold" />
        <XAxis type="number" />
        <Tooltip content={<div></div>} cursor={{ fill: "rgb(0,0,0,0.5)" }} />
        {series.map((bar, index) => {
          return <Bar key={index} dataKey={bar.name} stackId={bar.stackId} fill={bar.color} radius={radius} className="cursor-pointer" />;
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}
