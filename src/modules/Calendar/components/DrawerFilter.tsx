/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */
import { Button, Divider, Drawer, Flex, MultiSelect, Select, Text, useMatches } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useCalendarStore } from "../store";
import { useState } from "react";

export default function DrawerFilter() {
  const drawerSize = useMatches({ base: "100%", xs: "30.8%", sm: "22.8%", md: "18.8%", lg: "18.8%", xl: "16.8%" });
  const buttonSize = useMatches({ base: "xs", xl: "sm" });
  const styles = { body: { height: "100%" } };
  const props = { backgroundOpacity: 0.2, blur: 0 };
  const { onViewFilter, setOnViewFilter, setFilterDepartmentIds, setFilterCompanyId, setFilterInterviewer } = useCalendarStore();

  const [selectedDepartmentObjects, setSelectedDepartmentObjects] = useState<typeof departments>([]);
  const [selectedCompany, setselectedCompany] = useState('');
  const [selectedInterviewersObjects, setSelectedInterviewersObjects] = useState<typeof interviewers>([]);

  const [departments] = useState([
    { id: 1, value: 'IT', label: 'IT' },
    { id: 2, value: 'HR', label: 'HR' },
    { id: 3, value: 'Sales', label: 'Sales' },
    { id: 4, value: 'Admin', label: 'Admin' },
  ]);

  const [companies] = useState([
    { id: 1, value: 'Company A', label: 'Company A' },
    { id: 2, value: 'Company B', label: 'Company B' },
    { id: 3, value: 'Company C', label: 'Company C' },
    { id: 4, value: 'Company D', label: 'Company D' },
  ]);

  const [interviewers] = useState([
    { id: 1, value: 'John Doe', label: 'John Doe' },
    { id: 2, value: 'Jane Smith', label: 'Jane Smith' },
    { id: 3, value: 'Robert Lee', label: 'Robert Lee' },
    { id: 4, value: 'Maria Garcia', label: 'Maria Garcia' },
  ]);

  const close = () => {
    setOnViewFilter(false);
  };

  return (
    <Drawer opened={onViewFilter} onClose={close} position="right" withCloseButton={false} size={drawerSize} overlayProps={props} styles={styles} pos="relative">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex flex-col gap-2 2xl:gap-4">
          <Flex className="w-full" direction="column" gap={10}>
            <Flex direction="row" justify="space-between">
              <Text fw={600} fz={22} c="#559CDA" children="Filter By" />
              <IconX className="cursor-pointer" onClick={close} size={30} color="gray" />
            </Flex>
          </Flex>
          <Divider size={0.5} color="#edeeed" className="w-full" />

          <MultiSelect label="Department" placeholder="Select a Department" data={departments} value={selectedDepartmentObjects.map((obj) => obj.value)}
            onChange={(values: string[]) => {
              const selectedObjects = departments.filter((item) => values.includes(item.value));
              setSelectedDepartmentObjects(selectedObjects);
            }} />

          <Select label="Company" placeholder="Select a Company" data={companies} key={selectedCompany} value={selectedCompany}
            onChange={(value) => {
              console.log('value: ', value)
              setselectedCompany(value ?? '')
            }} />

          <MultiSelect label="Interviewer" placeholder="Select a Interviewer" data={interviewers} value={selectedInterviewersObjects.map((obj) => obj.value)}
            onChange={(values: string[]) => {
              const selectedObjects = interviewers.filter((item) => values.includes(item.value));
              setSelectedInterviewersObjects(selectedObjects);
            }} />
          <Flex className="w-full absolute bottom-5 right-5 gap-3 justify-end">
            <Button
              onClick={() => { }}
              variant="outline"
              size={buttonSize}
              radius={10}
              w={100}
              children={
                <Text fw={500} className="text-sm" onClick={() => {
                  setSelectedDepartmentObjects([])
                  setselectedCompany('')
                  setSelectedInterviewersObjects([])
                }}>
                  CLEAR
                </Text>
              }
            />
            <Button
              onClick={() => { }}
              variant="transparent"
              className="br-gradient border-none"
              size={buttonSize}
              radius={10}
              w={100}
              children={
                <Text fw={400} className="text-sm" c="white" onClick={() => {
                  setFilterDepartmentIds(selectedDepartmentObjects.map((item) => item.id))
                  const company = companies.find(item => item.id === 2);
                  setFilterCompanyId(company?.id ?? 0);
                  setFilterInterviewer(selectedInterviewersObjects.map((item) => item.id))
                }}>
                  FILTER
                </Text>
              }
            />
          </Flex>
        </div>
      </div>
    </Drawer>
  );
}
