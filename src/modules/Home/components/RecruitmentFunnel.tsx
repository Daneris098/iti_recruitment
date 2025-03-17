/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 25, 2025
 */

// import { BarChart } from "@mantine/charts";
import { Button, Container, Flex, Stack, Text } from "@mantine/core";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import RecruitmentFunnelTooltip from "../components/tooltip/CustomTooltip";
import { recruitmentFunnelData1, recruitmentFunnelData2, recruitmentFunnelData3 } from "../assets/sample-data";
import React from "react";
import DemoDataHover from "./tooltip/DemoData";

export const RecruitmentFunnel = () => {
  const yearToday = new Date().getFullYear();

  const fetchData: any = [];
  const [active, setActive] = React.useState("Year");
  const [data, setData] = React.useState(recruitmentFunnelData1);
  const handleFilterChange = (filter: string, data: any) => {
    setActive(filter);
    setData(data);
  };

  return (
    <Stack className="flex flex-col w-full h-[40%] xl:h-[65%] rounded-md border-[1px] px-4 py-2 gap-0 border-[rgba(85,156,218)]">
      {/* Header */}
      <Stack className="w-full h-[20%] flex flex-col md:flex-row justify-start md:justify-between items-center">
        <Flex className="w-full justify-between md:justify-start items-center h-1/2 md:h-9 md:items-center gap-2">
          <Text className="font-semibold text-[#559CDA] h-sm:text-lg text-sm md:text-lg lg:text-1xl xl:text-2xl">Recruitment Funnel</Text>
          <DemoDataHover size="md" fs="14px" />
        </Flex>
        <Container className="w-full sm:w-auto flex flex-row justify-between rounded-md bg-[#ECF4FE] p-0 h-1/2 md:h-9 xl:h-9 opacity-40">
          <Button
            children="Year"
            onClick={() => handleFilterChange("Year", recruitmentFunnelData1)}
            bg={active === "Year" ? "#DFECFE" : "transparent"}
            className="text-[12px] lg:text-sm rounded-l-md bg-transparent hover:bg-[#DFECFE] text-[#559CDA] hover:text-[#5EA1DC] rounded-none"
          />
          <Button
            children="Month"
            onClick={() => handleFilterChange("Month", recruitmentFunnelData2)}
            bg={active === "Month" ? "#DFECFE" : "transparent"}
            className="text-[12px] lg:text-sm bg-transparent text-[#5EA1DC] hover:bg-[#DFECFE] hover:text-[#559CDA] rounded-none"
          />
          <Button
            children="Week"
            onClick={() => handleFilterChange("Week", recruitmentFunnelData3)}
            bg={active === "Week" ? "#DFECFE" : "transparent"}
            className="text-[12px] lg:text-sm rounded-r-md bg-transparent text-[#5EA1DC] hover:bg-[#DFECFE] hover:text-[#559CDA] rounded-none"
          />
        </Container>
      </Stack>
      {/* Filter */}
      <Stack className="relative px-2 w-full h-[15%] flex flex-col md:flex-row justify-start md:justify-between items-center opacity-40">
        {/* Data Indicator Color */}
        <Flex className="w-full grid grid-cols-3 md:grid-cols-3 lg:flex lg:flex-row gap-0 md:gap-3 overflow-hidden">
          <Flex className="justify-center items-center gap-2">
            <div className="w-3.5 h-3.5 bg-[#559CDA] rounded-[3px]" />
            <Text className="font-normal text-xs xl:text-[14px] text-[rgb(85,156,218)]">Applied</Text>
          </Flex>
          <Flex className="justify-center items-center gap-2">
            <div className="w-3.5 h-3.5 bg-[#ED8028] rounded-[3px]" />
            <Text className="font-normal text-xs xl:text-[14px] text-[#ED8028]">For Interview</Text>
          </Flex>
          <Flex className="justify-center items-center gap-2">
            <div className="w-3.5 h-3.5 bg-[#5A9D27] rounded-[3px]" />
            <Text className="font-normal text-xs xl:text-[14px] text-[#5A9D27]">Offered</Text>
          </Flex>
          <Flex className="justify-center items-center gap-2">
            <div className="w-3.5 h-3.5 bg-[#FEC001] rounded-[3px]" />
            <Text className="font-normal text-xs xl:text-[14px] text-[#FEC001]">Hired</Text>
          </Flex>
          <Flex className="justify-center items-center gap-2">
            <div className="w-3.5 h-3.5 bg-[#FF554A] rounded-[3px]" />
            <Text className="font-normal text-xs xl:text-[14px] text-[#FF554A]">Archived</Text>
          </Flex>
        </Flex>
        {/* Select Filter Year */}
        <select name="hello" id="" className="border-[1px] absolute right-0 bottom-0 lg:static md:bottom-1 rounded-md border-[#559CDA] w-[70px] text-[#559CDA] text-xs">
          <option value="2025">{yearToday}</option>
          <option value="2025">2024</option>
          <option value="2025">2023</option>
        </select>
      </Stack>
      {/* Bar Chart */}
      <Stack className="w-full h-[65%] lg:h-full pb-0 lg:pb-14 xl:pb-0 opacity-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} className="-left-5 -bottom-3">
            <CartesianGrid strokeDasharray="0" strokeWidth={0.5} stroke="#6d6d6d" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis id="left" axisLine={false} tickLine={false} orientation="left" />
            {fetchData.length && <Tooltip content={<RecruitmentFunnelTooltip />} />}
            <Bar dataKey="Applied" fill="#559CDA" barSize={10} radius={[10, 10, 0, 0]} />
            <Bar dataKey="For Interview" fill="#ED8028" barSize={10} radius={[10, 10, 0, 0]} />
            <Bar dataKey="Offered" fill="#5A9D27" barSize={10} radius={[10, 10, 0, 0]} />
            <Bar dataKey="Hired" fill="#FEC001" barSize={10} radius={[10, 10, 0, 0]} />
            <Bar dataKey="Archived" fill="#FF554A" barSize={10} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </Stack>
  );
};
