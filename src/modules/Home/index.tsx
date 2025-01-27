import Filter from "@src/modules/Home/components/Filter";
import List from "@src/modules/Home/components/list";
import Details from "@src/modules/Home/components/details";
import DrawerFilter from "@src/modules/Home/components/DrawerFilter";
import { HomeStore } from "@src/modules/Home/store";
import { selectedDataVal } from "./values";
import jobsJson from "@src/modules/Home/values/response/jobs.json";
import { JobType } from "@src/modules/Home/types";
import { ListFilter } from "lucide-react";
import { ActionIcon } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";

export default function Home() {
  const { selectedData, setFilterDrawer } = HomeStore();
  const jobs: JobType[] = jobsJson;
  return (
    <div className=" h-full overflow-hidden">
      <DrawerFilter />
      <div className="bg-[url('bg2.png')] bg-cover bg-center h-[19%] 2xl:p-4 ">
        <div className="h-full w-[89%] 2xl:w-[92%] m-auto flex flex-col justify-center">
          <div className="p-1 2xl:p-2 text-white text-sm 2xl:text-xl flex gap-4 items-center">
            <ActionIcon variant="filled" color="gray" size="lg" aria-label="Settings" className="sm:hidden" onClick={() => setFilterDrawer(true)}>
              <IconFilter/>
            </ActionIcon>
            <p>Search for vacancies or fill out the <span className=" underline cursor-pointer">APPLICATION FORM.</span></p>
          </div>
          <div>
          </div>
          <div className="h-[35%] 2xl:h-[45%] hidden lg:block text-sm 2xl:text-md">
            <Filter />
          </div>
        </div>
      </div>

      <div className="h-[79%] flex w-[92%] m-auto">

        {jobs.length > 0 ? (
          <>
            <div className="h-auto w-full lg:w-[28%] sm:overflow-y-hidden overflow-y-auto sm:hover:overflow-y-auto ease-in-out p-5">
              <p className="text-sm 2xl:text-2xl text-gray-500 pl-3 2xl:pl-0 2xl:font-semibold">RELEVANT RESULTS: </p>
              <List />
            </div>

            <div className="hidden sm:block h-auto lg:w-[72%] sm:overflow-y-hidden  ease-in-out p-4">

              {selectedData != selectedDataVal ? (
                <Details />
              ) : (
                <div className=" w-full h-full flex flex-col items-center justify-center ">
                  <img src="selectJob.png " className="w-[30%] h-auto p-8" alt="bg" />
                  <p className="text-[#4F4F4F] text-md font-semibold">Select job from the list.</p>
                  <p className="text-[#4F4F4F] text-xs">Job details will show here.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className=" w-full h-full flex flex-col items-center justify-center">
              <img src="no_vacancy.png " className="sm:w-[50%]  h-auto p-8" alt="bg" />
            </div>
          </>
        )}

      </div>
    </div>
  );
}
