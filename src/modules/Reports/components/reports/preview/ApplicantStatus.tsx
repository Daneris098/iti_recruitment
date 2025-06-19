// import { Stack } from "@mantine/core";
import { ReportStore } from "@src/modules/Reports/store";
// import { ResponsiveContainer, BarChart, YAxis, XAxis, Tooltip, Bar, TooltipProps, CartesianGrid } from "recharts";

export default function index() {
  //   const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  //     if (active && payload && payload.length) {
  //       return (
  //         <div className="bg-white p-2 border border-gray-300 rounded-md shadow-md text-xs w-[100px]">
  //           <p className="font-bold">{label}</p>
  //           <p className="text-blue-500">Location: {payload[0].value}</p>
  //         </div>
  //       );
  //     }
  //     return null;
  //   };

  //   const location = [
  //     { data: "Applied", value: 40 },
  //     { data: "Archived", value: 21 },
  //     { data: "Offered", value: 16 },
  //     { data: "For Interview", value: 2 },
  //   ];

  const ApplicantStatusReport = ReportStore((state) => state.getForm("applicantStatusReport"));
  return (
    <iframe
      src={`${import.meta.env.VITE_REPORTS_BASE_URL}/Report/Get/?filter=ReportFilename=HRDotNet_Recruitment_Applicant_Status_Report_v1@ID_Company=${ApplicantStatusReport?.companyId}@ID_Department=${ApplicantStatusReport?.departmentId}@ID_Vacancy=${ApplicantStatusReport?.vacancyId}@DateFrom=${ApplicantStatusReport?.dateFrom}@DateTo=${ApplicantStatusReport?.dateTo}@ID_PrintedBy=${ApplicantStatusReport?.printedBy}`}
      title="Applicant Status Report"
      allowFullScreen
      className="h-[90vh]"></iframe>
    // <div className="flex flex-col gap-8 text-[#6D6D6D]">
    //     <div className="grid grid-cols-2 ">
    //         <p>Company: ABC Company</p>
    //         <p>Date Range: January 1, 2024 - January 1, 2025</p>
    //         <p>Department:</p>
    //         <p>Position: Web Developer</p>
    //     </div>
    //     <Stack className="h-48 w-full ">
    //         <ResponsiveContainer width="100%" height="100%" className="relative">
    //             <BarChart data={location} width={730} height={250} layout="vertical" className="absolute left-[-6%]" >
    //                 <YAxis type="category" axisLine={false} dataKey="data" width={150} height={50} className="text-[12px] font-semibold" />
    //                 <XAxis type="number" axisLine={false} />
    //                 <CartesianGrid stroke="#6d6d6d" horizontal={false} strokeDasharray="4" />
    //                 <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
    //                 <Bar dataKey="value" stackId="stack" fill="#559CDA" radius={[10, 10, 10, 10]} className="cursor-pointer" barSize={15} />
    //             </BarChart>
    //         </ResponsiveContainer>
    //     </Stack>
    // </div>
  );
}
