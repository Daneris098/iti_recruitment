import { Button, Divider, Drawer, Flex, Group, MultiSelect, Text, } from "@mantine/core";
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

  return (
    <Drawer
      opened={filterDrawer}
      onClose={() => setFilterDrawer(false)}
      position="right"
      withCloseButton={false}
      size={isMobile ? "100%" : "xs"}
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
            <p className="text-[#6d6d6d] text-xs">
              Date Added
            </p>
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
              label="Department"
              placeholder=""
              radius={8}
              data={["Engineering", "Human Resources", "Customer Support"]}
              rightSection={<IconCaretDownFilled size={'xs'} />}
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value) => setFilter({ ...filter, department: value })}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              value={filter.employmentType}
              size="xs"
              label="Employment Type"
              placeholder=""
              radius={8}
              data={["Full-Time", "Part-Time"]}
              rightSection={<IconCaretDownFilled size={'xs'} />}
              className="border-none w-full"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value) => setFilter({ ...filter, employmentType: value })}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              value={filter.workplaceType}
              size="xs"
              label="Workplace Type"
              placeholder=""
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
              placeholder=""
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
              size="xs"
              radius={10}
              w={100}
              children={<Text fw={500}>CLEAR</Text>}
            />
            <Button
              variant="transparent"
              className="br-gradient"
              size="xs"
              radius={10}
              w={100}
              children={
                <Text fw={500} c="white">
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
