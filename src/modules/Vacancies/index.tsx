import { Button } from "@mantine/core";
import Filter from "@src/modules/Vacancies/components/Filter";
import DataTable from "@src/modules/Vacancies/components/DataTable";
import { IconUserPlus } from "@tabler/icons-react";
import {  VacancyStore } from '@src/modules/Vacancies/store'
import Modals from '@modules/Vacancies/components/modal/index'

export default function index() {
    const { setAction } = VacancyStore()
    return (
        <div className="rounded-md h-full flex flex-col gap-5 p-6 bg-white relative">
            <Modals />
            
            <div className="flex justify-between w-[99%] mx-auto ">
                <h1 className="text-[#559CDA] text-xl 2xl:text-2xl font-bold">All Vacancies</h1>
                <Button className="rounded-lg" leftSection={<IconUserPlus />} onClick={() => { setAction('New')}}>Add Vacancies</Button>
            </div>

            <div className="h-[6%] text-sm 2xl:text-md ">
                <Filter />
            </div>
            
            <div className=" h-full overflow-hidden">
                <DataTable />
            </div>
        </div>
    );
};

