import { Stack } from "@mantine/core";
import { ResponsiveContainer, BarChart, YAxis, XAxis, Tooltip, Bar, TooltipProps, CartesianGrid } from "recharts"

export default function index() {

    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md text-xs w-[100px]">
                    <p className="font-bold">{label}</p>
                    <p className="text-blue-500">Location: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    const location = [
        { data: "Location 1", Applied: 40 },
        { data: "Location 2", Applied: 21 },
        { data: "Location 3", Applied: 16 },
        { data: "Location 4", Applied: 2 },
    ];

    return (
        <div className="flex flex-col gap-8 text-[#6D6D6D]">

            <div className="flex justify-between">
                <p>Company: ABC Company</p>
                <p>Date Range: January 1, 2024 - January 1, 2025</p>
            </div>

            <div className="flex justify-between">
                <p>Department:</p>
                <p>Position: Web Developer</p>
            </div>


            <Stack className="h-48 w-full ">
                <ResponsiveContainer width="100%" height="100%" className="relative">
                    <BarChart data={location} width={730} height={250} layout="vertical" className="absolute left-[-6%]" >
                        <YAxis type="category" axisLine={false} dataKey="data" width={150} height={50} className="text-[12px] font-semibold" />
                        <XAxis type="number" axisLine={false} />
                        <CartesianGrid stroke="#6d6d6d" horizontal={false} strokeDasharray="4"/>
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
                        <Bar dataKey="Applied" stackId="stack" fill="#559CDA" radius={[10, 0, 0, 10]} className="cursor-pointer" barSize={15} />
                        <Bar dataKey="Hired" stackId="stack" fill="#ED8028" radius={[0, 10, 10, 0]} className="cursor-pointer" />
                    </BarChart>
                </ResponsiveContainer>
            </Stack>
        </div>
    )
}