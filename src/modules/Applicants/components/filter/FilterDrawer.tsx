import { Button, Divider, Drawer, Flex, MultiSelect, Text, TextInput, useMatches } from "@mantine/core";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
import { FilterStore, useDateUpdatedRangeStore, useApplicationDateStore } from '@modules/Applicants/store'
import { useEffect, useState } from "react";
import { filterVal } from "@modules/Applicants/values";
import { DateRange } from "@modules/Applicants/components/filter/DateRangeFilter";
import { useSearchParams } from "react-router-dom";

export default function DrawerFilter() {
  const { filterDrawer, setFilterDrawer,
    // filter,
    setFilter,
    clearFilter, setClearFilter, setIsFiltered
  } = FilterStore();

  const filter = FilterStore((state) => state.filter)

  // const currentDate = new Date();
  // const dateTomorrow = new Date(currentDate);
  // const statusFilterOptions = ["Pending", "Generated", "Accepted", "Archived", "Rejected"];
  const statusFilterOptions = [
    { label: "Applied", value: "1" },
    { label: "For Interview", value: "2" },
    { label: "Offered", value: "3" },
    { label: "Hired", value: "5" },
    // { label: "For Transfer", value: "5" },
    { label: "Archived", value: "6" },
    { label: "Transferred", value: "7" },
  ];


  const positionOptions = ["HR Admin", "Web Developer", "Tech Support", "QA Engineer"];
  // const { dateUpdated, setDateUpdated } = useDateUpdatedRangeStore();
  // const { applicationDateValue, setApplicationDateValue } = useApplicationDateStore();

  const { applicationDateValue, setApplicationDateValue } = useApplicationDateStore();
  const { dateUpdated, setDateUpdated } = useDateUpdatedRangeStore();

  const inputSize = useMatches({
    base: 'xs',
    xl: 'md',
  });

  useEffect(() => {
    if (!filterDrawer) return;
  }, [filterDrawer]);

  const [localApplicantName, setLocalApplicantName] = useState(filter.applicantName);
  const [companyFilter, setCompanyFilter] = useState(filter.company);
  const [statusFilter, setStatusFilter] = useState<string[]>(filter.status);
  const [positionFilter, setPositionFilter] = useState<string[]>(filter.position);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (filterDrawer) {
      const nameFromUrl = searchParams.get("name") || "";
      const companyFromUrl = searchParams.get("company")?.split(",") || [];
      const statusFromUrl = searchParams.get("statusIds")?.split(",") || [];
      const positionFromUrl = searchParams.get("position")?.split(",") || [];

      setLocalApplicantName(nameFromUrl);
      setCompanyFilter(companyFromUrl);
      setStatusFilter(statusFromUrl);
      setPositionFilter(positionFromUrl);
    }
  }, [filterDrawer]);

  const handleApplyFilters = () => {
    setFilter({
      ...filter,
      applicantName: localApplicantName,
      company: companyFilter,
      status: statusFilter,
      position: positionFilter,
    });

    setSearchParams({
      page: "1",
      pageSize: "30",
      name: localApplicantName,
      company: companyFilter.join(","),
      statusIds: statusFilter.join(","),
      position: positionFilter.join(","),
    });

    setFilterDrawer(false);
  };

  const clear = () => {
    setFilter(filterVal)
    setLocalApplicantName("");
    setIsFiltered(false)
  }

  const buttonSize = useMatches({
    base: "xs",
    xl: "sm",
  });

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

  // const [searchParams, setSearchParams] = useSearchParams();

  // setSearchParams({
  //   page: "1",
  //   pageSize: "10",
  //   name: localApplicantName,
  //   status: statusFilter.join(","),
  // })

  // const filters = {
  //   name: searchParams.get("name") || undefined,
  //   status: searchParams.get("statusIds")?.split(",") || [],
  //   company: searchParams.get("company") || undefined,

  // }

  console.log(positionFilter)
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
            <Divider size={2} color="#6d6d6d50" className="w-full" />
            <MultiSelect
              size={inputSize}
              label="Company"
              placeholder={filter.company.length > 0 ? '' : "Company"}
              radius={8}
              data={["Company 1", "Company 2", "Company 3"]}
              rightSection={<IconCaretDownFilled size='18' />}
              className="border-none w-full text-sm"
              styles={{ label: { color: "#6d6d6d" } }}
              onChange={(value) => setCompanyFilter(value)}
            />

            <TextInput
              radius={8}
              size="md"
              className="border-none w-full text-sm"
              label="Applicant Name"
              placeholder="Type Applicant Name"
              styles={{ label: { color: "#6d6d6d" } }}
              value={localApplicantName}
              onChange={(event) => setLocalApplicantName(event.currentTarget.value)}
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <Text fw={500} fz={16} c="#6d6d6d">Application Date Range</Text>

            <DateRange
              gapValue={12}
              size="md"
              value={dateUpdated}
              setValue={setDateUpdated}
              fLabel="From"
              lLabel="To"
              fPlaceholder="Start Date"
              lPlaceholder="End Date"
              isColumn
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <Text fw={500} fz={16} c="#6d6d6d">Date Last Updated Range</Text>

            <DateRange
              gapValue={12}
              size="md"
              value={applicationDateValue}
              setValue={setApplicationDateValue}
              fLabel="From"
              lLabel="To"
              fPlaceholder="Start Date"
              lPlaceholder="End Date"
              isColumn
            />

            <MultiSelect
              radius={8}
              size={inputSize}
              className="border-none w-full text-[16px] poppins"
              label="Position"
              placeholder="Select Position"
              styles={() => ({
                label: { color: "#6d6d6d" },
                input: {
                  display: "flex",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  maxHeight: "40px",
                  scrollbarWidth: "thin",
                },
                values: {
                  display: "flex",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  maxWidth: "100%",
                  gap: "4px",
                  padding: "4px",
                },
              })}

              data={positionOptions}
              // onChange={(values) => setFilter({ ...filter, position: values })}
              onChange={(value) => setPositionFilter(value)}
              value={positionFilter}
              searchable
              clearable
              nothingFoundMessage="No options"
              maxDropdownHeight={90}
              rightSection={
                <span>
                  <IconCaretDownFilled size={18} stroke={2} />
                </span>
              }
            />

            <Divider size={0.5} color="#edeeed" className="w-full" />
            <MultiSelect
              radius={8}
              size={inputSize}
              className="border-none w-full text-[16px] poppins"
              label="Status"
              placeholder="Select Status"
              styles={() => ({
                label: { color: "#6d6d6d" },
                input: {
                  display: "flex",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  maxHeight: "40px",
                  scrollbarWidth: "thin",
                },
                values: {
                  display: "flex",
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  maxWidth: "100%",
                  gap: "4px",
                  padding: "4px",
                },
              })}
              data={statusFilterOptions}
              onChange={(values) => setStatusFilter(values)}
              // onChange={handleStatusChange}
              value={statusFilter}
              searchable
              clearable
              nothingFoundMessage="No options"
              maxDropdownHeight={90}
              rightSection={
                <span>
                  <IconCaretDownFilled size={18} stroke={2} />
                </span>
              }
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
            onClick={handleApplyFilters}
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
