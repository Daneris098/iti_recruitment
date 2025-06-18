// import { YAxis, XAxis, Tooltip, CartesianGrid, LineChart, Line, ResponsiveContainer } from "recharts";
// import { offerAcceptanceData } from "@modules/Reports/values";
// import { Container, Flex, Stack, Text } from "@mantine/core";

import { ReportStore } from "@src/modules/Reports/store";

export default function index() {
  const OfferAcceptanceReport = ReportStore((state) => state.getForm("offerAcceptanceReport"));
  return (
    // <div className="flex flex-col gap-8 text-[#6D6D6D]">
    //   <div className="grid grid-cols-2 gap-4 justify-between">
    //     <p>Company: ABC Company</p>
    //     <p>Date Range: January 1, 2024 - January 1, 2025</p>
    //     <p>Department:</p>
    //     <p>Position: Web Developer</p>
    //   </div>

    //   <Stack className="h-48 w-full  flex flex-col">
    //     <ResponsiveContainer width="100%" height="100%" className="relative">
    //       <LineChart width={730} height={250} data={offerAcceptanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    //         <CartesianGrid strokeDasharray="3 3" />
    //         <XAxis dataKey="month" />
    //         <YAxis />
    //         <Tooltip />
    //         <Line type="monotone" dataKey="IT" stroke="#559CDA" strokeWidth={1} dot={false} />
    //         <Line type="monotone" dataKey="Accounting" stroke="#ED8028" strokeWidth={2} dot={false} />
    //         <Line type="monotone" dataKey="Sales" stroke="#5A9D27" strokeWidth={2} dot={false} />
    //         <Line type="monotone" dataKey="HR" stroke="#FEC001" strokeWidth={2} dot={false} />
    //         <Line type="monotone" dataKey="Admin" stroke="#FF554A" strokeWidth={2} dot={false} />
    //       </LineChart>
    //     </ResponsiveContainer>
    //     <Container className="w-[10%] p-0 justify-center md:justify-start flex flex-row gap-4">
    //       <Flex className="items-center gap-2">
    //         <div className="w-1.5 h-1.5 bg-[#559CDA] rounded-[3px] hidden lg:block" />
    //         <Text className="font-normal text-md text-[rgb(85,156,218)]">IT</Text>
    //       </Flex>
    //       <Flex className="items-center gap-2">
    //         <div className="w-1.5 h-1.5 bg-[#ED8028] rounded-[3px] hidden lg:block" />
    //         <Text className="font-normal text-md text-[#ED8028]">Accounting </Text>
    //       </Flex>
    //       <Flex className="items-center gap-2">
    //         <div className="w-1.5 h-1.5 bg-[#5A9D27] rounded-[3px] hidden lg:block" />
    //         <Text className="font-normal text-md text-[#5A9D27]">Sales</Text>
    //       </Flex>
    //       <Flex className="items-center gap-2">
    //         <div className="w-1.5 h-1.5 bg-[#FEC001] rounded-[3px] hidden lg:block" />
    //         <Text className="font-normal text-md text-[#FEC001]">HR</Text>
    //       </Flex>
    //       <Flex className="items-center gap-2">
    //         <div className="w-1.5 h-1.5 bg-[#FF554A] rounded-[3px] hidden lg:block" />
    //         <Text className="font-normal text-md text-[#FF554A]">Admin</Text>
    //       </Flex>
    //     </Container>
    //   </Stack>
    // </div>
    <iframe
      src={`${import.meta.env.VITE_REPORTS_BASE_URL}/Report/Get/?filter=ReportFilename=HRDotNet_Recruitment_Offer_Acceptance_Report_v1@ID_Company=${OfferAcceptanceReport?.companyId}@ID_Department=${OfferAcceptanceReport?.departmentId}@ID_Vacancy=${OfferAcceptanceReport?.vacancyId}@DateFrom=${OfferAcceptanceReport?.dateFrom}@DateTo=${OfferAcceptanceReport?.dateTo}@ID_PrintedBy=${OfferAcceptanceReport?.printedBy}`}
      title="Offer Acceptance Report"
      allowFullScreen
      className="h-[90vh]"></iframe>
  );
}
