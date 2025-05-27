/**
 * @author        Hersvin Fred Labastida
 * @date_created  February 20, 2025
 */
import { Button, Divider, Drawer, Flex, MultiSelect, Text, useMatches } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useCalendarStore } from "../store";
import { useEffect, useState } from "react";
import { useQueryClient } from '@tanstack/react-query';
import axiosInstance from "@src/api";

export default function DrawerFilter() {
  const drawerSize = useMatches({ base: "100%", xs: "30.8%", sm: "22.8%", md: "18.8%", lg: "18.8%", xl: "16.8%" });
  const buttonSize = useMatches({ base: "xs", xl: "sm" });
  const styles = { body: { height: "100%" } };
  const props = { backgroundOpacity: 0.2, blur: 0 };
  const { onViewFilter, setOnViewFilter, setFilterDepartmentIds, setFilterCompanyId, setFilterInterviewer, filterInterviewer, filterDepartmentIds, filterCompanyId } = useCalendarStore();
  const queryClient = useQueryClient();

  const [selectedDepartmentObjects, setSelectedDepartmentObjects] = useState<typeof departments>([]);
  const [selectedCompanyObjects, setSelectedCompanyObjects] = useState<typeof companies>([]);
  const [selectedInterviewersObjects, setSelectedInterviewersObjects] = useState<typeof interviewers>([]);
  const [isFilterClicked, setIsFilterClicked] = useState(false)

  const [companies, setCompanies] = useState([
    { id: 1, value: 'Company A', label: 'Company A' },
    { id: 2, value: 'Company B', label: 'Company B' },
    { id: 3, value: 'Company C', label: 'Company C' },
    { id: 4, value: 'Company D', label: 'Company D' },
  ]);

  const [departments, setDepartments] = useState([
    { id: 1, value: 'IT', label: 'IT' },
    { id: 2, value: 'HR', label: 'HR' },
    { id: 3, value: 'Sales', label: 'Sales' },
    { id: 4, value: 'Admin', label: 'Admin' },
  ]);

  const [interviewers, setInterviewers] = useState([
    { id: 1, value: 'John Doe', label: 'John Doe' },
    { id: 2, value: 'Jane Smith', label: 'Jane Smith' },
    { id: 3, value: 'Robert Lee', label: 'Robert Lee' },
    { id: 4, value: 'Maria Garcia', label: 'Maria Garcia' },
  ]);

  const close = () => {
    setOnViewFilter(false);
  };

  useEffect(() => {
    if (isFilterClicked) {
      queryClient.refetchQueries({ queryKey: ["recruitment/calendar"], type: 'active' });
      return setIsFilterClicked(false)
    }
  }, [isFilterClicked])

  useEffect(() => {
    const isInitialState =
      filterInterviewer.length === 0 &&
      filterCompanyId.length === 0 &&
      filterDepartmentIds.length === 0;

    // console.log('DrawerFilter-filterCompanyId: ', filterCompanyId)
    // console.log('DrawerFilter-filterDepartmentIds: ', filterDepartmentIds)
    // console.log('DrawerFilter-filterInterviewer: ', filterInterviewer)
    if (isInitialState) {
      queryClient.refetchQueries({ queryKey: ["recruitment/calendar"], type: 'active' });
    }
  }, [filterInterviewer, filterDepartmentIds, filterCompanyId])

  const clearFilter = () => {
    setFilterDepartmentIds([]);
    setFilterCompanyId([]);
    setFilterInterviewer([]);
    setSelectedDepartmentObjects([])
    setSelectedCompanyObjects([])
    setSelectedInterviewersObjects([])
    setIsFilterClicked(true)
  }

  const fetchLookups = async () => {
    await axiosInstance
      .get("/recruitment/organization/companies")
      .then((response) => {
        const map = response.data.items.map((item: any) => {
          return {
            id: item.id,
            value: item.name,
            label: item.name,
          }
        });
        setCompanies(map)
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;
        console.error(message)
      });


    await axiosInstance
      .get("/recruitment/organization/departments")
      .then((response) => {
        const map = response.data.items.map((item: any) => {
          return {
            id: item.id,
            value: item.name,
            label: item.name,
          }
        });
        setDepartments(map)
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;
        console.error(message)
      });


    await axiosInstance
      .get("/recruitment/hiring/interviewers")
      .then((response) => {
        const map = response.data.items.map((item: any) => {
          return {
            id: item.id,
            value: item.name,
            label: item.name,
          }
        });
        setInterviewers(map)
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;
        console.error(message)
      });
  };

  useEffect(() => {
    fetchLookups()
  }, [])

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

          <MultiSelect label="Company" placeholder="Select a Company" data={companies} value={selectedCompanyObjects.map((obj) => obj.value)}
            onChange={(values: string[]) => {
              const selectedObjects = companies.filter((item) => values.includes(item.value));
              setSelectedCompanyObjects(selectedObjects);
            }} />

          <MultiSelect label="Department" placeholder="Select a Department" data={departments} value={selectedDepartmentObjects.map((obj) => obj.value)}
            onChange={(values: string[]) => {
              const selectedObjects = departments.filter((item) => values.includes(item.value));
              setSelectedDepartmentObjects(selectedObjects);
            }} />

          <MultiSelect label="Interviewer" placeholder="Select a Interviewer" data={interviewers} value={selectedInterviewersObjects.map((obj) => obj.value)}
            onChange={(values: string[]) => {
              const selectedObjects = interviewers.filter((item) => values.includes(item.value));
              setSelectedInterviewersObjects(selectedObjects);
            }} />
          <Flex className="w-full absolute bottom-5 right-5 gap-3 justify-end">
            <Button
              onClick={() => {
                clearFilter()
              }}
              variant="outline"
              size={buttonSize}
              radius={10}
              w={100}
              children={
                <Text fw={500} className="text-sm">
                  CLEAR
                </Text>
              }
            />
            <Button
              onClick={() => {
                setFilterDepartmentIds(selectedDepartmentObjects.map((item) => item.id))
                setFilterCompanyId(selectedCompanyObjects.map((item) => item.id))
                setFilterInterviewer(selectedInterviewersObjects.map((item) => item.id))
                setIsFilterClicked(true)
              }}
              variant="transparent"
              className="br-gradient border-none"
              size={buttonSize}
              radius={10}
              w={100}
              children={
                <Text fw={400} className="text-sm" c="white">
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
