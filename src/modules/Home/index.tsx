/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 2025
 */

//--- Mantine Modules
import { Flex, Stack } from "@mantine/core";

import "./assets/index.css";

import { sourceEfficiencyData, applicantsData, offerAcceptanceData, recruitmentFunnelData } from "./assets/sample-data";

//--- Home Dashboard Components
import { ApplicantSummaryCard } from "./components/ApplicantSummaryCard";
import { RecruitmentFunnel } from "./components/RecruitmentFunnel";
import { ApplicationSource } from "./components/ApplicationSource";
import { OfferAcceptance } from "./components/OfferAcceptance";

export default function index() {
  return (
    <Stack className="w-full h-[1200px] sm:h-[1000px] xl:h-full">
      <title>Dashboard</title>
      {/* Applicants Specification Counts */}
      <ApplicantSummaryCard data={applicantsData} />

      {/* Chart Container */}
      <Flex className="bg-white mb-10 lg:mb-0 p-4 rounded-md w-full h-full xl:h-[85%] gap-4 flex flex-col shadow-md shadow-[#559CDA]">
        {/* Vertical Bar Chart Recruitment Funnel */}
        <RecruitmentFunnel data={recruitmentFunnelData} />

        {/* Another Chart Vertical */}
        <Flex className="w-full h-[60%] xl:h-[35%] flex flex-col xl:flex-row gap-4">
          {/* Source Efficiency Rate Horizontal Bar Chart */}
          <ApplicationSource data={sourceEfficiencyData} />

          {/* Offer Acceptance Rate Line Chart */}
          <OfferAcceptance data={offerAcceptanceData} />
        </Flex>
      </Flex>
    </Stack>
  );
}
