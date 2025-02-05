import { Button } from "@mantine/core";
import Filter from "@src/modules/Vacancies/components/Filter";

export default function index() {

    return (
        <div className="bg-white h-full p-6 flex flex-col gap-2">
            <div className="flex justify-between">
                <h1 className="text-[#559CDA] text-2xl">All Vacancies</h1>
                <Button className="rounded-md">Add Vacancies</Button>
            </div>
            <div>
                <Filter />
            </div>
        </div>
    );
};

