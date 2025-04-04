import { Button, Flex, Tabs } from "@mantine/core";
import { OrganizationSettingsStore } from "@modules/OrganizationSettings/store"
import { AlertType } from "./types";
import Modals from "@src/modules/OrganizationSettings/components/modal"
import DataTableComp from "@modules/OrganizationSettings/components/DataTable";
import { panel } from "@modules/OrganizationSettings/types/index"
import bg2 from '@assets/bg2.png';
import { useEffect, useRef } from "react";
import { IconExclamationMark } from "@tabler/icons-react";

export const OrganizationSettings = () => {
    const { setAlert, setActivePanel, activePanel, reroute, setReroute } = OrganizationSettingsStore()
    const dataTableRef = useRef<{
        saveAll: () => void,
        cancelAll: () => void,
        getData: () => void,
    } | null>(null);

    useEffect(() => {
        if (reroute) {
            setActivePanel(panel.companyList)
        }
        if (reroute == false) {
            setReroute(true)
        }
    }, [])

    return (
        <div className="bg-white h-full">
            <Modals dataTableRef={dataTableRef} />
            <div style={{ backgroundImage: `url(${bg2})` }} className="bg-cover bg-center h-[15%]  rounded-t-md flex flex-col items-center">
                <div className=" flex items-center justify-between w-[90%] m-auto">
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-3xl text-white font-bold">Organization Settings</p>
                        <p className="text-xs sm:text-xl text-white ">Customize Organization Settings</p>
                    </div>
                    <div className="flex gap-3 sm:w-[15%]">
                        <Button className="rounded-md w-[52%]" onClick={() => { setAlert(AlertType.cancel) }} color="white" variant="outline">Cancel</Button>
                        <Button className="rounded-md w-[48%]" onClick={() => { dataTableRef.current?.saveAll(); setAlert(AlertType.saved); }}>Save</Button>
                    </div>
                </div>
            </div>
            <Tabs key={activePanel} defaultValue={activePanel} variant="default" className="h-[85%]  p-2" onChange={(val) => { setActivePanel(`${val}`); dataTableRef.current?.cancelAll(); }}>
                <Tabs.List className="px-4 h-[15%] sm:h-auto  overflow-auto">
                    <Tabs.Tab value={panel.companyList}
                        className={` ${activePanel === panel.companyList ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        Company List
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.branch}
                        className={` ${activePanel === panel.branch ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        Branch
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.section}
                        className={` ${activePanel === panel.section ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        <Flex className="items-center">Section <IconExclamationMark color="red" /></Flex>
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.division}
                        className={` ${activePanel === panel.division ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        Division
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.positionLevel}
                        className={` ${activePanel === panel.positionLevel ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        Position Level
                    </Tabs.Tab>
                    <Tabs.Tab value={panel.departments}
                        className={` ${activePanel === panel.departments ? 'text-[#559CDA]' : 'text-gray-500'}`}
                    >
                        <Flex className="items-center">Departments<IconExclamationMark color="red" /></Flex>
                    </Tabs.Tab>
                </Tabs.List>

                <div className="border-[2px] border-blue-300  rounded-md  px-4 sm:m-4 h-[85%] sm:h-[90%] p-4 sm:p-8 ">
                    <DataTableComp ref={dataTableRef} />
                </div>
            </Tabs>
        </div>
    );
};

export default OrganizationSettings;
