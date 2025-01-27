import { Button, Divider, Drawer, Flex, Group, MultiSelect, Text, useMatches, } from "@mantine/core";
import { DateRange } from "@shared/template";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
import { useDateRangeStore } from "@shared/hooks/useDateRange";
import { useMediaQuery } from "@mantine/hooks";
import { HomeStore } from "../store";
import { useEffect } from "react";
import { filterVal } from "../values";

export default function DrawerFilter() {
  const { value, setValue } = useDateRangeStore();
  const isMobile = useMediaQuery("(max-width: 425px)");
  const { filterDrawer, setFilterDrawer, filter, setFilter, clearFilter } = HomeStore();

  useEffect(() => {
    setFilter({ ...filter, dateFrom: (value[0]?.toString() || ''), dateTo: (value[1]?.toString() || '') })
  }, [value])

  useEffect(() => {
    setValue([null, null])
  }, [])


  const clear = () => {
    setFilter(filterVal)
    setValue([null, null])
  }

  useEffect(() => {
    return (
      clear()
    )
  }, [clearFilter])

  const drawerFilterSize = useMatches({
    base: "100%",
    xs: "30.8%",
    sm: "22.8%",
    md: "20.8%",
    lg: "18.8%",
    xl: "16.8%",
  });

  const buttonSize = useMatches({
    base: "xs",
    xl: "sm",
  });

  const gapValue = useMatches({
    base: 2,
    xl: 4,
  });

  const inputSize = useMatches({
    base: 'xs',
    xl: 'md',
  });

  return (
    <Drawer
      opened={filterDrawer}
      onClose={() => setFilterDrawer(false)}
      position="right"
      withCloseButton={false}
      size={drawerFilterSize}
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
      styles={{ body: { height: '100%' } }}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex flex-col gap-2 2xl:gap-4">

          <Flex className="w-full" direction="column" gap={10}>
            <Flex direction="row" justify="space-between">
              <Text fw={600} fz={22} c="#559CDA">
                Filter By
              </Text>
              <IconX
                className="cursor-pointer"
                onClick={() => setFilterDrawer(false)}
                size={30}
                color="gray"
              />
            </Flex>
            {/* <Divider size={2} color="#c9cac9" className="w-full" /> */}
          </Flex>

          <Divider size={0.5} color="#edeeed" className="w-full" />
          <DateRange
            size={inputSize}
            gapValue={gapValue}
            isColumn
            value={value}
            setValue={setValue}
            fLabel="From"
            lLabel="To"
            fPlaceholder="Start Date"
            lPlaceholder="End Date"
          />
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            value={filter.department}
            size={inputSize}
            label="Select Department"
            placeholder={filter.department.length > 0 ? '' : "Department"}
            radius={8}
            data={["Engineering", "Human Resources", "Customer Support"]}
            rightSection={<IconCaretDownFilled size='20' />}
            className="border-none w-full text-sm"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, department: value })}
          />

          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            value={filter.employmentType}
            size={inputSize}
            placeholder={filter.employmentType.length > 0 ? "" : "Employment Type"}
            label="Select Employment type"
            radius={8}
            data={["Full-Time", "Part-Time"]}
            rightSection={<IconCaretDownFilled size='20' />}
            className="border-none w-full text-sm"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, employmentType: value })}
          />

          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            value={filter.workplaceType}
            size={inputSize}
            placeholder="Workplace Type"
            label={filter.workplaceType.length > 0 ? "" : "Select Workplace Type"}
            radius={8}
            data={["On-site", "Remote"]}
            rightSection={<IconCaretDownFilled size='20' />}
            className="border-none w-full"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, workplaceType: value })}
          />

          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            value={filter.experienceLevel}
            size={inputSize}
            label="Select Experience Level"
            placeholder={filter.experienceLevel.length > 0 ? "" : "Select Experience Level"}
            radius={8}
            data={["Entry-level", "Senior"]}
            rightSection={<IconCaretDownFilled size='20' />}
            className="border-none w-full"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, experienceLevel: value })}
          />
        </div>


        <Flex className="w-full " justify="flex-end" gap={10} >
          <Button
            onClick={clear}
            variant="outline"
            size={buttonSize}
            radius={10}
            w={100}
            children={<Text fw={500} className="text-sm">CLEAR</Text>}
          />
          <Button
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
    </Drawer>
  );
}
