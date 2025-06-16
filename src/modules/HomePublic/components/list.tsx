// import jobsJson from "@src/modules/HomePublic/values/response/jobs.json";
import { VacancyType } from "@src/modules/HomePublic/types";
import { MantineSize, Pill, useMatches } from "@mantine/core";
import { HomeStore } from "@src/modules/HomePublic/store";
import { cn } from "@src/lib/utils";
import { useVacancies } from "@modules/HomePublic/hooks/useVacancies";

export default function index() {
  const { data } = useVacancies();
  // const jobs: VacancyType[] = jobsJson;
  const { setSelectedData, selectedData, setApplicationFormModal, setIsFromPortal } = HomeStore();
  const pillSize: MantineSize = useMatches({
    base: "xs",
    lg: "xs",
    xl: "lg",
  });

  return (
    <div className="flex flex-col  gap-7 2xl:gap-4">
      {data?.map((job: VacancyType, index: number) => (
        <div
          key={index}
          className={cn("gap-2 p-4 2xl:p-6 shadow-md rounded-xl flex flex-col 2xl:gap-2 ", selectedData.id === job.id && "shadow-blue-500  shadow-md")}
          onClick={() => {
            setSelectedData(job);
            setApplicationFormModal(true);
            setIsFromPortal(true);
          }}>
          <p className={cn("text-blue-500 font-[500] text-sm 2xl:text-2xl ", selectedData.id === job.id && "")}>{job.position}</p>
          <div className="flex gap-2">
            <Pill.Group>
              <Pill className="rounded-md bg-[#7BADFF]" size={pillSize}>
                <p className="text-white 2xl:text-lg">{job.workplace}</p>
              </Pill>
              <Pill className="rounded-md bg-[#FFB703]" size={pillSize}>
                <p className="text-white  2xl:text-lg">{job.employmentType}</p>
              </Pill>
            </Pill.Group>
          </div>
        </div>
      ))}
    </div>
  );
}
