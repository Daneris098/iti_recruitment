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
    xs: "xs",
    sm: "xs",
    md: "xs",
    lg: "xs",
    xl: "sm",
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
        <div>
          <Group className="w-full">
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
              <Divider size={2} color="#c9cac9" className="w-full" />
            </Flex>
          </Group>

          <Group style={{ flex: 1 }}>
            <Divider size={0.5} color="#edeeed" className="w-full" />

            <DateRange
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
              size="xs"
              label="Select Department"
              placeholder="Department"
              radius={8}
              data={["Engineering", "Human Resources", "Customer Support"]}
              rightSection={<IconCaretDownFilled size={'xs'} />}
              className="border-none w-full text-sm"

              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value) => setFilter({ ...filter, department: value })}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              value={filter.employmentType}
              size="xs"
              label="Employment Type"
              placeholder="Select Employment type"
              radius={8}
              data={["Full-Time", "Part-Time"]}
              rightSection={<IconCaretDownFilled size={'xs'} />}
              className="border-none w-full text-sm"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value) => setFilter({ ...filter, employmentType: value })}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              value={filter.workplaceType}
              size="xs"
              label="Workplace Type"
              placeholder="Select Workplace Type"
              radius={8}
              data={["On-site", "Remote"]}
              rightSection={<IconCaretDownFilled size={'xs'} />}
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value) => setFilter({ ...filter, workplaceType: value })}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              value={filter.experienceLevel}
              size="xs"
              label="Experience Level"
              placeholder="Select Experience Level"
              radius={8}
              data={["Entry-level", "Senior"]}
              rightSection={<IconCaretDownFilled size={'xs'} />}
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value) => setFilter({ ...filter, experienceLevel: value })}
            />
          </Group>
        </div>


        <Group className="w-full">
          <Flex className="w-full" justify="flex-end" gap={10}>
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
              className="br-gradient"
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
        </Group>
      </div>
    </Drawer>
  );
}
