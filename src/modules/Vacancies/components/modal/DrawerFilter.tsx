import { Button, Divider, Drawer, Flex, MultiSelect, Text, useMatches, } from "@mantine/core";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
// import { useMediaQuery } from "@mantine/hooks";
import { FilterStore } from "@modules/Vacancies/store";
import { filterVal } from "@modules/Vacancies/values";
import { useEffect } from "react";
import { DateRange } from "../DateRange";
import { useDateRangeStore } from "@shared/hooks/useDateRange";

export default function DrawerFilter() {
  // const [value, setValue] = useState<Date | null>(null);
  // const { value, setValue } = useDateRangeStore();
  // const isMobile = useMediaQuery("(max-width: 425px)");
  const { filterDrawer, setFilterDrawer, filter, setFilter, clearFilter, setClearFilter, setIsFiltered } = FilterStore();
  const { value, setValue } = useDateRangeStore();
  // useEffect(() => {
  //   // setFilter({ ...filter, dateFrom: (value[0]?.toString() || ''), dateTo: (value[1]?.toString() || '') })
  // }, [value])

  useEffect(() => {
    // setValue([null, null])
  }, [])


  const clear = () => {
    setFilter(filterVal)
    setIsFiltered(false)
    // setValue([null, null])
  }

  useEffect(() => {
    clear()
    return (
      setClearFilter(false)
    )
  }, [clearFilter])

  const drawerFilterSize = useMatches({
    base: "100%",
    xs: "30.8%",
    sm: "22.8%",
    md: "18.8%",
    lg: "18.8%",
    xl: "16.8%",
  });

  const buttonSize = useMatches({
    base: "xs",
    xl: "sm",
  });

  // const gapValue = useMatches({
  //   base: 2,
  //   xl: 4,
  // });

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
      <div className="w-full h-full flex flex-col justify-between text-[#6D6D6D]">
        <div className="flex flex-col gap-2 2xl:gap-4">

          <Flex className="w-full" direction="column" gap={10}>
            <Flex direction="row" justify="space-between">
              <Text fw={600} fz={22} c="#559CDA">
                Filter By
              </Text>
              <IconX
                className="cursor-pointer"
                onClick={() => setFilterDrawer(false)}
                size={25}
                color="gray"
              />
            </Flex>
            <Divider size={2} color="#c9cac9" className="w-full" />
          </Flex>

          <MultiSelect
            value={filter.vacancy}
            size={inputSize}
            label="Vacancy"
            placeholder={filter.vacancy.length > 0 ? '' : "Vacancy"}
            radius={8}
            data={["Web Dev", "DevOps", "Mobile Dev"]}
            rightSection={<IconCaretDownFilled size='18' />}
            className="border-none w-full text-sm"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, vacancy: value })}
          />
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <p>Published Date Range</p>
          <DateRange
            gapValue={12}
            size="md"
            value={value}
            setValue={setValue}
            fLabel="From"
            lLabel="To"
            fPlaceholder="Start Date"
            lPlaceholder="End Date"
            isColumn
          />
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            value={filter.interviewer}
            size={inputSize}
            label="Interviewer"
            placeholder={filter.interviewer.length > 0 ? '' : "Interviewer"}
            radius={8}
            data={["John", "Jane", "Paul"]}
            rightSection={<IconCaretDownFilled size='18' />}
            className="border-none w-full text-sm"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, interviewer: value })}
          />

          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            value={filter.department}
            size={inputSize}
            placeholder={filter.department.length > 0 ? "" : "Department"}
            label="Department"
            radius={8}
            data={["IT", "Accounting"]}
            rightSection={<IconCaretDownFilled size='18' />}
            className="border-none w-full text-sm"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, department: value })}
          />

          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            value={filter.status}
            size={inputSize}
            placeholder={filter.status.length > 0 ? "" : "Select Status"}
            label="Status"
            radius={8}
            data={["Publish", "Close", "Overdue"]}
            rightSection={<IconCaretDownFilled size='18' />}
            className="border-none w-full"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, status: value })}
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
            onClick={() => { setIsFiltered(true); setFilterDrawer(false) }}
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
