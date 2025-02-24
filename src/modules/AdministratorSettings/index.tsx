import { Button, Tabs } from "@mantine/core";
import { AdministratorSettingsStore } from "@modules/AdministratorSettings/store"
import { AlertType } from "./types";
import Modals from "@src/modules/AdministratorSettings/components/modal"
import DataTableComp from "@modules/AdministratorSettings/components/DataTable";
import { panel } from "@modules/AdministratorSettings/types/index"
import bg2 from '@assets/bg2.png';
import { useEffect } from "react";

export default function index() {
    const { setAlert, setActivePanel, activePanel } = AdministratorSettingsStore()

    useEffect(() => {
        setActivePanel(panel.userAccounts)
    }, [])

    return (
        <div className="bg-white h-full">
            <Modals />
            <div style={{ backgroundImage: `url(${bg2})` }} className="bg-cover bg-center h-[15%]  rounded-t-md flex flex-col items-center">
                <div className=" flex items-center justify-between w-[90%] m-auto">
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-3xl text-white font-bold">Users</p>
                        <p className="text-xs sm:text-xl text-white ">User Information</p>
                    </div>
                    <div className="flex gap-3 sm:w-[15%]">
                        <Button className="rounded-md w-[52%]" onClick={() => { setAlert(AlertType.cancel) }} color="white" variant="outline">Cancel</Button>
                        <Button className="rounded-md w-[48%]" onClick={() => { setAlert(AlertType.saved) }}>Save</Button>
                    </div>
                </div>
            </div>
            <Tabs defaultValue={panel.userAccounts} variant="default" className="h-[85%]  p-2" onChange={(val) => { setActivePanel(`${val}`) }}>
                <Tabs.List className="px-4 h-[15%] sm:h-auto  overflow-auto">
                    <Tabs.Tab value={panel.userAccounts}
                        className={` ${activePanel === panel.userAccounts ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        User Accounts
                    </Tabs.Tab>
                </Tabs.List>

                <div className="border-[2px] border-blue-300  rounded-md  px-4 sm:m-4 h-[85%] sm:h-[90%] p-4 sm:p-8">
                    <DataTableComp />
                </div>
            </Tabs>
        </div>
    );
};
