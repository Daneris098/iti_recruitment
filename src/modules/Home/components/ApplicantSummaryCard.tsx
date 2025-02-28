/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 25, 2025
 */

//--- Mantine Modules
import { Container, Flex, Text } from "@mantine/core";
import * as MantineHooks from "@mantine/hooks";

//--- Home Assets
import { Applicant, IconColors, iconMap } from "../assets/sample-data";

export const ApplicantSummaryCard = ({ data }: { data: Applicant[] }) => {
  // Mobile View Sizing
  const isMedium = MantineHooks.useMediaQuery("(min-width: 768px)");
  // Icon Style Props
  const iconProps = { size: isMedium ? 50 : 25, stroke: 1 };

  return (
    <Flex className="bg-white rounded-md  grid grid-cols-2 md:grid-cols-4 w-full h-[280px] md:h-[15%] gap-2 lg:gap-5 p-2 shadow-md shadow-[#559CDA]">
      {data.map((app, index) => {
        // Icons Mapping
        const Icon = iconMap[app.icon];
        // Colors Mapping based on Icon
        const color = IconColors[app.icon];

        return (
          <Container key={index} className={`w-full h-full content-center md:content-between px-1`}>
            <div className="flex flex-row md:flex-col xl:flex-row justify-stretch items-center md:justify-between xl:justify-center gap-2 xl:gap-10 w-full h-full">
              <div className="bg-[#DFECFE] rounded-full w-auto p-3">
                <Icon color={color} {...iconProps} />
              </div>
              <div className="flex flex-col text-center lg:text-start">
                <Text className="text-xs md:text-xs lg:text-md xl:text-md text-[#6D6D6D]">{app.title}</Text>
                <Text className="text-md md:text-1xl lg:text-3xl xl:text-4xl font-bold text-[#6D6D6D]">{app.value}</Text>
              </div>
            </div>
          </Container>
        );
      })}
    </Flex>
  );
};
