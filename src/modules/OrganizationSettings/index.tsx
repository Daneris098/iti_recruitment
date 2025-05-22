import { Button, Flex, Tabs } from "@mantine/core";
import { OrganizationSettingsStore } from "@modules/OrganizationSettings/store";
import Modals from "@src/modules/OrganizationSettings/components/modal";
import OrganizationDataTable from "@modules/OrganizationSettings/components/";
import { Panel, AlertType } from "./assets/Enum";
import bg2 from "@assets/bg2.png";
import { useEffect, useRef } from "react";
import { IconExclamationMark } from "@tabler/icons-react";
import { useFetchOrganizationSettings } from "./services/data";

export const OrganizationSettings = () => {
  const { branches, departments, companies, divisions, positions, sections } = useFetchOrganizationSettings();
  const { setAlert, setActivePanel, activePanel, reroute, setReroute, setSortBy } = OrganizationSettingsStore();

  const dataTableRef = useRef<{
    saveAll: () => void;
    cancelAll: () => void;
    getData: () => void;
  } | null>(null);

  useEffect(() => {
    if (reroute) {
      setActivePanel(Panel.companyList);
    }
    if (reroute == false) {
      setReroute(true);
    }
  }, []);

  return (
    <div className="bg-white h-full">
      <title>Organization</title>
      <Modals dataTableRef={dataTableRef} />
      <div style={{ backgroundImage: `url(${bg2})` }} className="bg-cover bg-center h-[15%]  rounded-t-md flex flex-col items-center">
        <div className=" flex items-center justify-between w-[90%] m-auto">
          <div className="flex flex-col">
            <p className="text-xs sm:text-3xl text-white font-bold">Organization Settings</p>
            <p className="text-xs sm:text-xl text-white ">Customize Organization Settings</p>
          </div>
          <div className="flex gap-3 sm:w-[15%]">
            <Button
              className="rounded-md w-[52%]"
              onClick={() => {
                setAlert(AlertType.Cancel);
              }}
              color="white"
              variant="outline">
              Cancel
            </Button>
            <Button
              className="rounded-md w-[48%]"
              onClick={() => {
                dataTableRef.current?.saveAll();
              }}>
              Save
            </Button>
          </div>
        </div>
      </div>
      <Tabs
        key={activePanel}
        defaultValue={activePanel}
        variant="default"
        className="h-[85%]  p-2"
        onChange={(val) => {
          setActivePanel(`${val}`);
          dataTableRef.current?.cancelAll();
        }}>
        <Tabs.List className="px-4 h-[15%] sm:h-auto  overflow-auto">
          <Tabs.Tab value={Panel.companyList} className={` ${activePanel === Panel.companyList ? "text-[#559CDA]" : "text-gray-500"}`}>
            <Flex className="items-center">Company List {companies.data?.total === 0 && <IconExclamationMark color="red" />}</Flex>
          </Tabs.Tab>
          <Tabs.Tab value={Panel.branch} className={` ${activePanel === Panel.branch ? "text-[#559CDA]" : "text-gray-500"}`}>
            <Flex className="items-center"> Branch {branches.data?.total === 0 && <IconExclamationMark color="red" />}</Flex>
          </Tabs.Tab>
          <Tabs.Tab value={Panel.section} className={` ${activePanel === Panel.section ? "text-[#559CDA]" : "text-gray-500"}`}>
            <Flex className="items-center">Section {sections.data?.total === 0 && <IconExclamationMark color="red" />}</Flex>
          </Tabs.Tab>
          <Tabs.Tab value={Panel.division} className={` ${activePanel === Panel.division ? "text-[#559CDA]" : "text-gray-500"}`}>
            <Flex className="items-center">Division{divisions.data?.total === 0 && <IconExclamationMark color="red" />}</Flex>
          </Tabs.Tab>
          <Tabs.Tab value={Panel.positionLevel} className={` ${activePanel === Panel.positionLevel ? "text-[#559CDA]" : "text-gray-500"}`}>
            <Flex className="items-center"> Position Level{positions.data?.total === 0 && <IconExclamationMark color="red" />}</Flex>
          </Tabs.Tab>
          <Tabs.Tab value={Panel.departments} className={` ${activePanel === Panel.departments ? "text-[#559CDA]" : "text-gray-500"}`}>
            <Flex className="items-center">
              Departments
              {departments.data?.total === 0 && <IconExclamationMark color="red" />}
            </Flex>
          </Tabs.Tab>
        </Tabs.List>

        <div className="border-[2px] border-blue-300  rounded-md  px-4 sm:m-4 h-[85%] sm:h-[90%] p-4 sm:p-8  overflow-y-hidden">
          <OrganizationDataTable ref={dataTableRef} />
        </div>
      </Tabs>
    </div>
  );
};

export default OrganizationSettings;
