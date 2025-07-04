// import { Stack } from "@mantine/core";
import { ReportStore } from "@src/modules/Reports/store";
// import { ResponsiveContainer, BarChart, YAxis, XAxis, Tooltip, Bar, TooltipProps } from "recharts";

export default function index() {
  //   const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  //     if (active && payload && payload.length) {
  //       return (
  //         <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md text-xs w-[100px]">
  //           <p className="font-bold">{label}</p>
  //           <p className="text-blue-500">Applied: {payload[0].value}</p>
  //           <p className="text-orange-500">Hired: {payload[1].value}</p>
  //         </div>
  //       );
  //     }
  //     return null;
  //   };

  //   const sourceEfficiencyData = [
  //     { month: "Employee Referral", Applied: 75, Hired: 25 },
  //     { month: "Jobstreet", Applied: 89, Hired: 120 },
  //     { month: "Walk-in", Applied: 165, Hired: 135 },
  //     { month: "Word of Mouth", Applied: 80, Hired: 130 },
  //     { month: "Head Hunter", Applied: 120, Hired: 115 },
  //     { month: "Others", Applied: 90, Hired: 110 },
  //   ];

  const SourceEfficiencyReport = ReportStore((state) => state.getForm("sourceEfficiencyReport"));
  return (
    // <div className="flex flex-col gap-4 text-[#6D6D6D]">
    //   <p>Company: ABC Company</p>
    //   <div className="grid grid-cols-2 gap-4 justify-between">
    //     <p>Date Range: January 1, 2024 - January 1, 2025</p>
    //     <p>Source Type: Source Type 1</p>
    //     <p>Department:</p>
    //     <p>Position: Web Developer</p>
    //   </div>

    //   <Stack className="h-48 w-full">
    //     <ResponsiveContainer width="100%" height="100%">
    //       <BarChart data={sourceEfficiencyData} width={730} height={250} layout="vertical">
    //         <YAxis type="category" dataKey="month" width={150} height={50} className="text-[12px] font-semibold" tick={{ textAnchor: "center", dx: -130 }} />
    //         <XAxis type="number" />
    //         <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
    //         <Bar dataKey="Applied" stackId="stack" fill="#559CDA" radius={[10, 0, 0, 10]} className="cursor-pointer" barSize={15} />
    //         <Bar dataKey="Hired" stackId="stack" fill="#ED8028" radius={[0, 10, 10, 0]} className="cursor-pointer" />
    //       </BarChart>
    //     </ResponsiveContainer>
    //   </Stack>
    // </div>
    <iframe
      src={`${import.meta.env.VITE_REPORTS_BASE_URL}/Report/Get/?filter=ReportFilename=HRDotNet_Recruitment_Source_Efficiency_Report_v1@ID_Company=${SourceEfficiencyReport?.companyId}@ID_Department=${SourceEfficiencyReport?.departmentId}@ID_Vacancy=${SourceEfficiencyReport?.vacancyId}@DateFrom=${SourceEfficiencyReport?.dateFrom}@DateTo=${SourceEfficiencyReport?.dateTo}@ID_PrintedBy=${SourceEfficiencyReport?.printedBy}`}
      title="Offer Acceptance Report"
      allowFullScreen
      className="h-[90vh]"></iframe>
  );
}
