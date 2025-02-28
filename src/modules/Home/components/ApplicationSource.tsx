/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 25, 2025
 */

// import { BarChart } from "@mantine/charts";
import { Container, Flex, Stack, Text } from "@mantine/core";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//--- Assets
import { ApplicationSourceProps } from "../assets/Types";

import ApplicationSourceTooltip from "../components/tooltip/CustomTooltip";
import { monthData } from "../assets/Array";

export const ApplicationSource: React.FC<ApplicationSourceProps> = ({ data }) => {
  return (
    <Stack className="flex flex-col w-full h-[50%] xl:h-[100%] p-2 border-[1px] border-[rgba(85,156,218)] rounded-md">
      <Container className="flex flex-row w-full justify-between items-center h-[20%] gap-5">
        <Text className="font-semibold text-[#559CDA] text-sm w-[20%] lg:w-full">Source Efficiency</Text>
        <Flex className="w-full flex flex-col md:flex-row gap-2">
          <Container className="flex flex-row w-full justify-end gap-5">
            <Flex className="justify-center items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#559CDA] rounded-full" />
              <Text className="font-normal text-xs xl:text-[14px] text-[#559cda]">Applied</Text>
            </Flex>
            <Flex className="justify-center items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#ED8028] rounded-full" />
              <Text className="font-normal text-xs xl:text-[14px] text-[#ED8028]">Hired</Text>
            </Flex>
          </Container>
          <Container className="flex flex-row w-full justify-end gap-5">
            <select name="hello" id="" className="border-[1px] rounded-lg border-[#559CDA] w-[55px] text-[#559CDA] text-xs">
              {monthData.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.title}
                </option>
              ))}
            </select>
            <select name="hello" id="" className="border-[1px] rounded-lg border-[#559CDA] w-[55px] text-[#559CDA] text-xs">
              <option value="2025">2025</option>
              <option value="2025">2024</option>
              <option value="2025">2023</option>
            </select>
          </Container>
        </Flex>
      </Container>

      {/* Application Source Efficiency Bar Chart Container  */}
      <Stack className="w-full h-[80%]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" className="absolute -left-10 -bottom-2">
            <YAxis type="category" dataKey="month" tick={{ textAnchor: "start", dx: -90 }} width={150} axisLine={false} className="text-[10px] font-bold" />
            <XAxis type="number" className="text-[12px] " />
            <Tooltip content={<ApplicationSourceTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
            <Bar dataKey="Applied" stackId="stack" fill="#559CDA" radius={[10, 0, 0, 10]} barSize={15} className="cursor-pointer" />
            <Bar dataKey="Hired" stackId="stack" fill="#ED8028" radius={[0, 10, 10, 0]} barSize={15} className="cursor-pointer" />
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </Stack>
  );
};
