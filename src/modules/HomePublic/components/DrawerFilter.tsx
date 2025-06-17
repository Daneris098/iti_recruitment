import { Button, Divider, Drawer, Flex, MultiSelect, Select, Text, TextInput, useMatches } from "@mantine/core";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
import { FilterStore } from "@modules/HomePublic/store";
import { useEffect } from "react";
import { filterVal } from "@modules/HomePublic/values";
import { useFilterDataResponse } from "../services/data";
import { useForm } from "@mantine/form";

type FilterType = {
  position: string | null;
  datePosted: string | null;
  emp: number[] | null;
  work: number[] | null;
  exp: number[] | null;
  dept: number[] | null;
};

export default function DrawerFilter() {
  const { filterDrawer, setFilterDrawer, filter, setFilter, clearFilter, setClearFilter, setIsFiltered, setSearchParams, storedFilters, setStoredFilters } = FilterStore();
  const drawerFilterSize = useMatches({ base: "100%", xs: "30.8%", sm: "22.8%", md: "18.8%", lg: "18.8%", xl: "16.8%" });
  const buttonSize = useMatches({ base: "xs", xl: "sm" });
  const inputSize = useMatches({ base: "xs", xl: "md" });

  const clear = () => {
    setFilter(filterVal);
    setIsFiltered(false);
    setStoredFilters({});
    setSearchParams("");
  };

  useEffect(() => {
    clear();
    return setClearFilter(false);
  }, [clearFilter]);

  const filterForm = useForm<FilterType>({
    initialValues: { position: null, datePosted: null, emp: [], work: [], exp: [], dept: [] },
  });

  const submitFilter = (value: typeof filterForm.values) => {
    const formattedValues = {
      Position: value.position === null ? null : value.position,
      DatePosted: value.datePosted === null ? null : value.datePosted,
      DepartmentIds: value.dept?.length === 0 ? null : value.dept,
      EmploymentTypeIds: value.emp?.length === 0 ? null : value.emp,
      WorkplaceTypeIds: value.work?.length === 0 ? null : value.work,
      ExperienceLevelIds: value.exp?.length === 0 ? null : value.exp,
    };

    const cleanedValues = Object.fromEntries(Object.entries(formattedValues).filter(([_, value]) => value !== null));

    const filters: Record<string, any> = {};

    if (value.position) filters.Position = value.position;
    if (value.datePosted) filters.DatePosted = value.datePosted;
    if (value.dept && value.dept.length > 0) filters.DepartmentIds = value.dept;
    if (value.emp && value.emp.length > 0) filters.EmploymentTypeIds = value.emp;
    if (value.work && value.work.length > 0) filters.WorkplaceTypeIds = value.work;
    if (value.exp && value.exp.length > 0) filters.ExperienceLevelIds = value.exp;

    setStoredFilters(cleanedValues);

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v.toString()));
      } else if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    setSearchParams(String(params));
  };

  const { departments, employmentType, experienceLevel, workPlaces } = useFilterDataResponse();
  return (
    <Drawer
      opened={filterDrawer}
      onClose={() => setFilterDrawer(false)}
      position="right"
      withCloseButton={false}
      size={drawerFilterSize}
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
      styles={{ body: { height: "100%" } }}>
      <form className="w-full h-full" onSubmit={filterForm.onSubmit(submitFilter)}>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col gap-2 2xl:gap-4">
            <Flex className="w-full" direction="column" gap={10}>
              <Flex direction="row" justify="space-between">
                <Text fw={600} fz={22} c="#559CDA">
                  Filter By
                </Text>
                <IconX className="cursor-pointer" onClick={() => setFilterDrawer(false)} size={30} color="gray" />
              </Flex>
            </Flex>

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <TextInput
              size={inputSize}
              radius={8}
              className="border-none w-full text-sm"
              label="Job Title"
              styles={{ label: { color: "#6d6d6d" } }}
              placeholder="Search Job Title"
              key={filterForm.key("position")}
              {...filterForm.getInputProps("position")}
            />
            <Divider size={0.5} color="#edeeed" className="w-full" />

            <Select
              size={inputSize}
              defaultValue={storedFilters.DatePosted === null ? "" : storedFilters.DatePosted}
              placeholder={filter.postedDate != null ? "" : "Select Date Posted"}
              label={"Date Posted"}
              radius={8}
              data={["Last 24 hours", "Last Week", "Last Month", "Anytime"]}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none w-full text-sm"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value) => {
                filterForm.setFieldValue("datePosted", String(value));
              }}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              size={inputSize}
              label="Department"
              defaultValue={storedFilters.DepartmentIds}
              placeholder={filter.department.length > 0 ? "" : "Department"}
              radius={8}
              data={departments.data?.items.map((division: any) => ({
                value: String(division.id),
                label: division.name,
              }))}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none w-full text-sm"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value: any) => filterForm.setFieldValue("dept", value)}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              size={inputSize}
              label="Employment type"
              radius={8}
              defaultValue={storedFilters.EmploymentTypeIds}
              data={employmentType.data?.items.map((item: any) => ({
                value: String(item.id),
                label: item.name,
              }))}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none w-full text-sm"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value: any) => filterForm.setFieldValue("emp", value)}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              size={inputSize}
              label="Workplace Type"
              radius={8}
              defaultValue={storedFilters.WorkplaceTypeIds}
              data={workPlaces.data?.items.map((item: any) => ({
                value: String(item.id),
                label: item.name,
              }))}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value: any) => filterForm.setFieldValue("work", value)}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              size={inputSize}
              label="Experience Level"
              radius={8}
              defaultValue={storedFilters.ExperienceLevelIds}
              data={experienceLevel.data?.items.map((item: any) => ({
                value: String(item.id),
                label: item.name,
              }))}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value: any) => filterForm.setFieldValue("exp", value)}
            />
          </div>

          <Flex className="w-full " justify="flex-end" gap={10}>
            <Button
              onClick={clear}
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
                setIsFiltered(true);
                setFilterDrawer(false);
              }}
              variant="transparent"
              className="br-gradient border-none"
              size={buttonSize}
              radius={10}
              w={100}
              type="submit"
              children={
                <Text fw={400} className="text-sm" c="white">
                  FILTER
                </Text>
              }
            />
          </Flex>
        </div>
      </form>
    </Drawer>
  );
}
