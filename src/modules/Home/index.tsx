import Filter from "@src/modules/Home/components/Filter";
import List from "@src/modules/Home/components/list";
import Details from "@src/modules/Home/components/details";
import Modals from "@src/modules/Home/components/modal";
import jobsJson from "@src/modules/Home/values/response/jobs.json";
import { HomeStore } from "@src/modules/Home/store";
import { GlobalStore } from "@src/utils/GlobalStore";
import { selectedDataVal } from "./values";
import { VacancyType } from "@src/modules/Home/types";
import { ActionIcon } from "@mantine/core";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import bg2 from '@assets/bg2.png';
import Alert from "@src/modules/Home/components/modal/Alert";

export default function Home() {
  const { selectedData, setFilterDrawer, setApplicationFormModal, filter, isFiltered } = HomeStore();
  const { isMobile } = GlobalStore();
  const jobs: VacancyType[] = jobsJson;

  const getActiveFilterCount = (): number => {
    return Object.values(filter).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + (value.length > 0 ? 1 : 0);
      }
      return count + (value && value !== '' ? 1 : 0);
    }, 0);
  };

  return (
    <div className=" h-full overflow-hidden">
      <Modals />
      <Alert/>
      <div style={{ backgroundImage: `url(${bg2})` }} className=" bg-cover bg-center h-[19%] 2xl:p-4 ">
        <div className="h-full w-[89%] 2xl:w-[92%] m-auto flex flex-col justify-center">
          <div className="p-1 2xl:p-2 text-white text-sm 2xl:text-xl flex gap-4 items-center ">


            <ActionIcon variant="filled" color="white" size="lg" aria-label="Settings" className="sm:hidden" onClick={() => setFilterDrawer(true)}>
              <IconAdjustmentsHorizontal className="text-[#559CDA]" />
            </ActionIcon>

            {isFiltered && getActiveFilterCount() > 0 && isMobile && (<p className="bg-orange-400 rounded-full absolute mt-7 ml-6 text-[0.6rem] w-4 h-4 flex items-center justify-center text-white">
              {getActiveFilterCount()}
            </p>)}


            <p>Search for vacancies or fill out the <span className=" underline cursor-pointer" onClick={() => { setApplicationFormModal(true) }}>APPLICATION FORM.</span></p>
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
              <p className="text-sm 2xl:text-2xl text-gray-500 pl-3 2xl:pl-0 font-semibold">RELEVANT RESULTS: </p>
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
