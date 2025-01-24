import { HomeStore } from "@src/modules/Home/store";
import { useEffect } from "react";
import { Button, MantineSize, Pill } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useMatches } from '@mantine/core';

export default function () {
  const { selectedData } = HomeStore();
  const pillSize: MantineSize = useMatches({
    base: "xs",
    lg: "xs",
    xl: "lg"
  });

  useEffect(() => {
    console.log("desirable", selectedData.desirable);
  }, [selectedData]);

  return (
    <div className="h-full w-full flex flex-col gap-4 2xl:gap-6 ">
      <div className="">
        <p className="text-xl text-gray-500 font-semibold">{selectedData.position}</p>
        <div className="w-full flex justify-between">
          <Pill.Group>
            <Pill className="rounded-md bg-green-500" size={pillSize}>
              <p className="text-white ">{selectedData.workplace}</p>
            </Pill>
            <Pill className="rounded-md bg-orange-400" size={pillSize}>
              <p className="text-white">{selectedData.employmentType}</p>
            </Pill>
          </Pill.Group>
          <Button className="rounded-md " size="xs">
            Apply Now <IconArrowRight />{""}
          </Button>
        </div>
      </div>
      <div className=" flex flex-col gap-4 2xl:gap-6  hover:overflow-y-auto">

        <p className="text-gray-500 text-sm font-semibold">Job Description</p>
        <p className="text-gray-500 text-xs">{selectedData.jobDescription}</p>
        <p className="text-gray-500 text-sm font-semibold">Qualification</p>
        {selectedData.requirements.map((requirement: string) => {
          return <p className="text-gray-500 text-xs">• {requirement}</p>;
        })}
        <p className="text-gray-500 text-sm font-semibold">Skills</p>
        <Pill.Group className="mb-10">
          {selectedData.skills.map((skill: string) => {
            return <Pill className="text-gray-600 text-xs"><p >{skill}</p></Pill>;
          })}
        </Pill.Group>
        {/* <p className="text-gray-500 text-xl">Benefits</p>
      {selectedData.benefits.map((benefits: string) => {
        return <p className="text-gray-500 2xl:text-xl">• {benefits}</p>;
      })} */}
      </div>
    </div>

  );
}
