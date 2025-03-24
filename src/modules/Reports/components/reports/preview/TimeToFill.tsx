import { Stack } from "@mantine/core";
import { ResponsiveContainer, BarChart, YAxis, XAxis, Tooltip, Bar, TooltipProps, CartesianGrid } from "recharts"

export default function index() {

    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md text-xs w-[100px]">
                    <p className="font-bold">{label}</p>
                    <p className="text-blue-500">Days: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    const positions = [
        { days: "Position 1", Applied: 18 },
        { days: "Position 2", Applied: 11 },
        { days: "Position 3", Applied: 6 },
        { days: "Position 4", Applied: 2 },
    ];

    return (
        <div className="flex flex-col gap-8 text-[#6D6D6D]">

            <div className="grid grid-cols-2 gap-4 justify-between">
                <p>Company: ABC Company</p>
                <p>Date Range: January 1, 2024 - January 1, 2025</p>
                <p>Department:</p>
                <p>Position: Web Developer</p>
            </div>


            <Stack className="h-48 w-full ">
                <ResponsiveContainer width="100%" height="100%" className="relative">
                    <BarChart data={positions} width={730} height={250} layout="vertical" className="absolute left-[-6%]" >
                        <YAxis type="category" axisLine={false} dataKey="days" width={150} height={50} className="text-[12px] font-semibold" />
                        <XAxis type="number" axisLine={false} tickFormatter={(value) => (`${value > 1 && value != 0 ? value + ' Days' : value > 0 ? value + 'Day' : ''}`)} />
                        <CartesianGrid stroke="#6d6d6d" horizontal={false} strokeDasharray="4" />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
                        <Bar dataKey="Applied" stackId="stack" fill="#559CDA" radius={[10, 10, 10, 10]} className="cursor-pointer" barSize={15} />
                    </BarChart>
                </ResponsiveContainer>
            </Stack>
        </div>
    )
}