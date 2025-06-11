import React from "react";
import Modals from "@modules/Reports/components/modal/index";
import { reports } from "@modules/Reports/values";
import { ReportStore } from "@modules/Reports/store";
import "@modules/Reports/styles/index.css";
import { LoadingOverlay, Text } from "@mantine/core";

export const Reports = () => {
  const { setSelectedReport } = ReportStore();
  return (
    <div className="bg-white rounded-md grid grid-cols-1 md:grid-cols-2 gap-12 p-12 relative">
      <Modals />
      {reports.map((report) => (
        <div
          className={`shadow-sm shadow-[#559CDA] relative  rounded-md  h-[10rem] flex flex-col items-center text-center justify-center gap-2  p-4 cursor-pointer ${report.comingSoon ? "opacity-50" : ""}`}
          onClick={() => setSelectedReport(report)}>
          {" "}
          <LoadingOverlay
            visible={report.comingSoon}
            loaderProps={{
              children: (
                <Text className="poppins" fz={20} fw={500}>
                  Coming Soon....
                </Text>
              ),
            }}
          />
          {React.cloneElement(report.icon, { size: 48, color: "#559CDA" })}
          <p className="font-semibold text-[#559CDA] text-xl">{report.name}</p>
          <p className="text-[#6D6D6D] text-md">{report.description}</p>
        </div>
      ))}
    </div>
  );
};
export default Reports;
