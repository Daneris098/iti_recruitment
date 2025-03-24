import { Button, Divider, Drawer, Flex, Text, TextInput, useMatches } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { FilterStore } from '@modules/Applicants/store'
import { useEffect } from "react";
import { filterVal } from "@modules/Applicants/values";
import DateRangeFilter from "@modules/Applicants/components/filter/DateRangeFilter";

export default function DrawerFilter() {
  const { filterDrawer, setFilterDrawer, filter, setFilter, clearFilter, setClearFilter, setIsFiltered } = FilterStore();
  const currentDate = new Date();
  const dateTomorrow = new Date(currentDate);
  dateTomorrow.setDate(currentDate.getDate() + 1)

  // date formatting
  // const formatDate = (date: string | Date) => {
  //   if (!date) return ''; // Handle cases where date is undefined or empty
  //   return new Date(date).toLocaleDateString('en-US', { 
  //     year: 'numeric', 
  //     month: 'long', 
  //     day: 'numeric' 
  //   });
  // };
  
  const clear = () => {
    setFilter(filterVal)
    setIsFiltered(false)
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
          </Flex>
          <>
            <Divider size={2} color="#6d6d6d" className="w-full" />
            <TextInput
              radius={8}
              size={inputSize}
              className="border-none w-full text-sm"
              label="Applicant Name"
              styles={{ label: { color: "#6d6d6d" } }}
              value={filter.applicantName}
              onChange={(event) => { setFilter({ ...filter, applicantName: `${event.currentTarget.value}` }) }}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <Text fw={500} fz={12} c="#6d6d6d">Application Date Range</Text>

            <DateRangeFilter
              label="From"
              value={filter.applicationDateFrom}
              onChange={(date) => setFilter({ ...filter, applicationDateFrom: date })}
              placeholder={currentDate.toDateString()}
            />

            <DateRangeFilter
              label="To"
              value={filter.applicationDateTo}
              onChange={(date) => setFilter({ ...filter, applicationDateTo: date })}
              placeholder={currentDate.toDateString()}
            />


            <Divider size={0.5} color="#edeeed" className="w-full" />
            <Text fw={500} fz={12} c="#6d6d6d">Date Last Updated Range</Text>

            <DateRangeFilter
              label="From"
              value={filter.dateLastUpdatedFrom}
              onChange={(date) => setFilter({ ...filter, dateLastUpdatedFrom: date })}
              placeholder={currentDate.toDateString()}
            />

            <DateRangeFilter
              label="To"
              value={filter.dateLastUpdatedTo}
              onChange={(date) => setFilter({ ...filter, dateLastUpdatedTo: date })}
              placeholder={currentDate.toDateString()}
            />

            <TextInput
              radius={8}
              size={inputSize}
              className="border-none w-full text-sm"
              label="Position"
              styles={{ label: { color: "#6d6d6d" } }}
              value={filter.position}
              onChange={(event) => { setFilter({ ...filter, position: `${event.currentTarget.value}` }) }}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />

            <TextInput
              radius={8}
              size={inputSize}
              className="border-none w-full text-sm"
              label="Status"
              styles={{ label: { color: "#6d6d6d" } }}
              value={filter.status}
              onChange={(event) => { setFilter({ ...filter, status: `${event.currentTarget.value}` }) }}
            />

          </>

        </div>

        <Flex className="w-full py-3" justify="flex-end" gap={10} >
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

