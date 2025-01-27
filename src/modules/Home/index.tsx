import Filter from "@src/modules/Home/components/Filter";
import List from "@src/modules/Home/components/list";
import Details from "@src/modules/Home/components/details";
import DrawerFilter from "@src/modules/Home/components/DrawerFilter";

export default function Home() {
  return (
    <div className=" h-full overflow-hidden">
      <DrawerFilter />
      <div className="bg-[url('bg2.png')] bg-cover bg-center h-[19%] 2xl:p-4 ">
        <div className="h-full w-[90%] m-auto  flex flex-col justify-center">
          <div className="p-1 2xl:p-2 text-white text-sm 2xl:text-md">
            Search for vacancies or fill out the <span className=" underline cursor-pointer">APPLICATION FORM.</span>
          </div>
          <div className="h-[35%] 2xl:h-[45%] hidden lg:block text-sm 2xl:text-md">
            <Filter />
          </div>
        </div>
      </div>

      <div className="h-[79%] flex w-[92%] m-auto">
        <div className="h-auto w-full lg:w-[28%] sm:overflow-y-hidden overflow-y-auto sm:hover:overflow-y-auto ease-in-out p-5">
          <p className="text-sm 2xl:text-md text-gray-500 pl-3 ">RELEVANT RESULTS: </p>
          <List />
        </div>

        <div className="hidden sm:block h-auto lg:w-[72%] sm:overflow-y-hidden  ease-in-out p-4">
          <Details />
        </div>
      </div>
    </div>
  );
}
