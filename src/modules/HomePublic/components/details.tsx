import { HomeStore } from "@src/modules/HomePublic/store";
import { Button, MantineSize, Pill } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useMatches } from "@mantine/core";

export default function Details() {
  const { selectedData, setApplicationFormModal } = HomeStore();
  const pillSize: MantineSize = useMatches({ base: "xs", lg: "xs", xl: "lg" });
  const iconSize: MantineSize = useMatches({ base: "xs", lg: "xs", xl: "md" });

  return (
    <div className="h-full w-full flex flex-col gap-4 2xl:gap-6 ">
      <div className="">
        <p className="text-xl text-gray-500 font-semibold 2xl:text-3xl">{selectedData.position}</p>
        <div className="w-full flex justify-between">
          <Pill.Group>
            <Pill className="rounded-md bg-green-500" size={pillSize}>
              <p className="text-white ">{selectedData.workplace}</p>
            </Pill>
            <Pill className="rounded-md bg-orange-400" size={pillSize}>
              <p className="text-white">{selectedData.employmentType}</p>
            </Pill>
          </Pill.Group>
          <Button
            className="rounded-md "
            size={iconSize}
            onClick={() => {
              setApplicationFormModal(true);
            }}>
            Apply Now <IconArrowRight />
            {""}
          </Button>
        </div>
      </div>
      <div className="rte flex flex-col gap-4 2xl:gap-6  hover:overflow-y-auto">
        <p className="text-gray-500 text-sm font-semibold 2xl:text-2xl">Job Description</p>
        <div dangerouslySetInnerHTML={{ __html: selectedData.jobDescription }} />
        <p className="text-gray-500 text-sm font-semibold 2xl:text-2xl">Qualification</p>
        {(selectedData as any).qualifications.map((requirement: string) => {
          return (
            <>
              <div dangerouslySetInnerHTML={{ __html: (requirement as any).keyword }} />
            </>
          );
        })}
        <p className="text-gray-500 text-sm font-semibold 2xl:text-xl">Skills</p>
        <Pill.Group>
          {selectedData.skills.map((skill: any) => {
            return (
              <Pill className="text-gray-600 text-xs 2xl:text-lg" size={pillSize}>
                <p>{skill.keyword}</p>
              </Pill>
            );
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
