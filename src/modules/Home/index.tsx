import Filter from "@src/modules/Home/components/Filter";
import List from "@src/modules/Home/components/List";
import Details from "@src/modules/Home/components/Details";
import DrawerFilter from "@src/modules/Home/components/DrawerFilter";

export default function Home() {
  return (
    <div className=" h-full overflow-hidden">
      <DrawerFilter />
      <div className="bg-[url('bg2.png')] bg-cover bg-center h-[21%] p-4 2xl:p-4">
        <div className="h-full w-[90%] m-auto ">
          <div className="p-1 2xl:p-2 text-white text-sm 2xl:text-md">
            Search for vacancies or fill out the <span className=" underline cursor-pointer">APPLICATION FORM.</span>
          </div>
          <div className="h-[45%] hidden lg:block text-sm 2xl:text-md">
            <Filter />
          </div>
        </div>
      </div>

      <div className="h-[85%] flex w-[92%] m-auto">
        <div className="h-auto w-full lg:w-[28%] sm:overflow-y-hidden hover:overflow-y-auto ease-in-out p-5">
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
