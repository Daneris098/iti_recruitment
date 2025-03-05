/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 25, 2025
 */

//--- React Modules
import React from "react";
//--- Mantine Modules
// import { LineChart } from "@mantine/charts";
import { Container, Flex, Pill, Stack, Text } from "@mantine/core";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//--- Assets
import { OfferAcceptanceProps } from "../assets/Types";
import OfferAcceptanceTooltip from "../components/tooltip/CustomTooltip";
import { monthData } from "../assets/sample-data";

export const OfferAcceptance: React.FC<OfferAcceptanceProps> = ({ data }) => {
  const fetchData: any = [];
  return (
    <Stack className={`flex flex-col w-full h-[50%] xl:h-[100%]  border-[1px] border-[rgba(85,156,218)] rounded-md py-2 pr-2`}>
      <Flex className="w-full h-full flex flex-col justify-between">
        <Container className="w-full flex flex-row justify-between h-[10%]">
          <Text className="font-semibold text-[#559CDA] w-full">
            Offer Acceptance Rate <Pill children="Demo Data" c="#ED8028" bg="#ffd4b1" />
          </Text>
          <Flex className="w-full flex flex-row justify-end gap-2 opacity-40">
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
          </Flex>
        </Container>
        <Container className="w-full h-[90%] opacity-40" p={0}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `${value}%`} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              {fetchData.length && <Tooltip content={<OfferAcceptanceTooltip />} />}
              <CartesianGrid strokeDasharray="4" vertical={false} />
              <Line type="monotone" dataKey="IT" stroke="#559CDA" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="Accounting" stroke="#ED8028" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="Sales" stroke="#5A9D27" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="HR" stroke="#FEC001" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="Admin" stroke="#FF554A" strokeWidth={1} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Container>
      </Flex>
    </Stack>
  );
};
