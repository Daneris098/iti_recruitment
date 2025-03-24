import { Stack } from "@mantine/core";
import { ResponsiveContainer, BarChart, YAxis, XAxis, Tooltip, Bar, TooltipProps, CartesianGrid } from "recharts";

export default function Index() {

    const feedbacks = [
        { data: "Feedback 1", Applied: 28 },
        { data: "Feedback 2", Applied: 11 },
        { data: "Feedback 3", Applied: 6 },
        { data: "Feedback 4", Applied: 2 },
    ];

    // Calculate the total of all "Applied" values
    const totalApplied = feedbacks.reduce((sum, item) => sum + item.Applied, 0);

    // Add a "percentage" field to each feedback data item
    const feedbacksWithPercentage = feedbacks.map(feedback => ({
        ...feedback,
        percentage: ((feedback.Applied / totalApplied) * 100).toFixed(2) // Calculating percentage
    }));

    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const { percentage } = payload[0].payload; // Get the percentage from the payload
            return (
                <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md text-xs w-[100px]">
                    <p className="font-bold">{label}</p>
                    <p className="text-blue-500">Feedback: {percentage}%</p>
                </div>
            );
        }
        return null;
    };

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
                    <BarChart data={feedbacksWithPercentage} width={730} height={250} layout="vertical" className="absolute left-[-6%]" >
                        <YAxis type="category" axisLine={false} dataKey="data" width={150} height={50} className="text-[12px] font-semibold" />
                        <XAxis tickFormatter={(value) => (`${value}%`)} type="number" axisLine={false} />

                        <CartesianGrid stroke="#6d6d6d" horizontal={false} strokeDasharray="4" />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
                        <Bar dataKey="percentage" stackId="stack" fill="#559CDA" radius={[10, 10, 10, 10]} className="cursor-pointer" barSize={15} />
                    </BarChart>
                </ResponsiveContainer>
            </Stack>
        </div>
    );
}
