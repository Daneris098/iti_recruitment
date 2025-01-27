import jobsJson from "@src/modules/Home/values/response/jobs.json";
import { JobType } from "@src/modules/Home/types";
import { Pill } from "@mantine/core";
import { HomeStore } from "@src/modules/Home/store";
import { cn } from "@src/lib/utils";

export default function index() {
  const jobs: JobType[] = jobsJson;
  const { setSelectedData, selectedData } = HomeStore();

  return (
    <div className="flex flex-col  ">
      {jobs.map((job: JobType, index: number) => (
        <div
          key={index}
          className={cn(
            "gap-2  p-4 2xl:p-8 shadow-md rounded-xl  flex flex-col 2xl:gap-2 ",
            selectedData.id === job.id && "bg-blue-500"
          )}
          onClick={() => {
            setSelectedData(job);
          }}
        >
          <p
            className={cn(
              "text-blue-500 bold text-sm",
              selectedData.id === job.id && "text-white"
            )}
          >
            {job.position}
          </p>
          <div className="flex gap-2">
            <Pill.Group>
              <Pill className="rounded-md bg-green-500">
                <p className="text-white">{job.workplace}</p>
              </Pill>
              <Pill className="rounded-md bg-orange-400">
                <p className="text-white">{job.employmentType}</p>
              </Pill>
            </Pill.Group>
          </div>
        </div>
      ))}
    </div>
  );
}
