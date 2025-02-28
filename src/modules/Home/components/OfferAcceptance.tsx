/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 25, 2025
 */

//--- React Modules
import React from "react";
//--- Mantine Modules
// import { LineChart } from "@mantine/charts";
import { Container, Flex, Stack, Text } from "@mantine/core";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//--- Assets
import { OfferAcceptanceProps } from "../assets/Types";
import OfferAcceptanceTooltip from "../components/tooltip/CustomTooltip";
import { monthData } from "../assets/sample-data";

export const OfferAcceptance: React.FC<OfferAcceptanceProps> = ({ data }) => {
  return (
    <Stack className="flex flex-col w-full h-[50%] xl:h-[100%]  border-[1px] border-[rgba(85,156,218)] rounded-md p-2">
      <Flex className="w-full h-full flex flex-col-reverse md:flex-row justify-between items-center">
        <Container className="w-full md:w-[85%] h-[85%] md:h-full flex flex-col items-center">
          <Text className="font-semibold text-[#559CDA] w-full h-[10%]">Offer Acceptance Rate</Text>
          <Container className="w-full h-[90%]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} className="-left-10 -bottom-3">
                <XAxis dataKey="month" className="text-[12px]" />
                <YAxis tickFormatter={(value) => `${value}%`} className="text-[12px]" />
                <Tooltip content={<OfferAcceptanceTooltip />} />
                <CartesianGrid strokeDasharray="4" vertical={false} />
                <Line type="monotone" dataKey="IT" stroke="#559CDA" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="Accounting" stroke="#ED8028" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Sales" stroke="#5A9D27" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="HR" stroke="#FEC001" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Admin" stroke="#FF554A" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Container>
        </Container>
        <Container className="w-full md:w-[15%] h-[15%] md:h-full flex flex-col justify-between md:justify-start p-0 pt-0 pb-0 md:pb-2 md:pt-2 gap-2">
          <Container className="w-full p-0 justify-center md:justify-start flex flex-row md:flex-col gap-2">
            <select name="hello" id="" className="border-[1px] rounded-lg border-[#559CDA] w-[70px] text-[#559CDA] text-xs">
              {monthData.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.title}
                </option>
              ))}
            </select>
            <select name="hello" id="" className="border-[1px] rounded-lg border-[#559CDA] w-[70px] text-[#559CDA] text-xs">
              <option value="2025">2025</option>
              <option value="2025">2024</option>
              <option value="2025">2023</option>
            </select>
          </Container>
          <Container className="w-full p-0 justify-center md:justify-start flex flex-row md:flex-col gap-2 md:gap-0">
            <Flex className="items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#559CDA] rounded-[3px] hidden lg:block" />
              <Text className="font-normal text-[9px] xl:text-[12px] text-[rgb(85,156,218)]">IT</Text>
            </Flex>
            <Flex className="items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#ED8028] rounded-[3px] hidden lg:block" />
              <Text className="font-normal text-[9px] xl:text-[12px] text-[#ED8028]">Accounting </Text>
            </Flex>
            <Flex className="items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#5A9D27] rounded-[3px] hidden lg:block" />
              <Text className="font-normal text-[9px] xl:text-[12px] text-[#5A9D27]">Sales</Text>
            </Flex>
            <Flex className="items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#FEC001] rounded-[3px] hidden lg:block" />
              <Text className="font-normal text-[9px] xl:text-[12px] text-[#FEC001]">HR</Text>
            </Flex>
            <Flex className="items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#FF554A] rounded-[3px] hidden lg:block" />
              <Text className="font-normal text-[9px] xl:text-[12px] text-[#FF554A]">Admin</Text>
            </Flex>
          </Container>
        </Container>
      </Flex>
    </Stack>
  );
};
