import { Button, Divider, Drawer, Flex, MultiSelect, Text, TextInput, useMatches } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { FilterStore } from '@src/modules/Offers/store'
import { useJobOfferDateRangeStore, useGeneratedOfferStore, useArchivedStore, useDateUpdatedStore } from "@shared/hooks/useDateRange";
import { useEffect } from "react";
import { filterVal } from "@modules/Offers/values";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { DateRange } from "@modules/Offers/components/filter/DateRange";


export default function DrawerFilter() {
  const { filterDrawer, setFilterDrawer, filter, activeTab, setFilter, clearFilter, setClearFilter, setIsFiltered } = FilterStore();
  const { dateUpdatedValue, setDateUpdatedValue } = useDateUpdatedStore();
  const { Offervalue: jobOfferValue, setOfferValue: setJobOfferValue } = useJobOfferDateRangeStore();
  const { generatedOfferValue: filterValue, setGeneratedOfferValue: setFilterValue } = useGeneratedOfferStore();
  const { archivedValue: archiveValue, setArchivedValue: setArchiveValue } = useArchivedStore();

  const currentDate = new Date();
  const dateTomorrow = new Date(currentDate);
  dateTomorrow.setDate(currentDate.getDate() + 1)

  const clear = () => {
    setFilter(filterVal)
    setIsFiltered(false)
  }

  const isArchived = activeTab === "Archived"
  const isJobOffers = activeTab === "All_offers"
  const isGenerated = activeTab === "Pending"
  const isAccepted = activeTab === "Accepted"

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

  const statusFilterOptions = ["Pending", "Generated", "Accepted", "Archived", "Rejected"];
  const remarksFilterOptions = ["No remarks", "Remarks"];


  useEffect(() => {
    setFilterValue([null, null]);
  }, [isGenerated, isAccepted, isArchived]);

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

          <Divider size={2} color="#6d6d6d50" className="w-full" />

          <MultiSelect
            value={filter.company}
            size={inputSize}
            label="Company"
            placeholder={filter.company.length > 0 ? '' : "Company"}
            radius={8}
            data={["Company 1", "Company 2", "Company 3"]}
            rightSection={<IconCaretDownFilled size='18' />}
            className="border-none w-full text-sm"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, company: value })}
          />

          {isArchived && (
            <>
              {/* Archived */}
              <TextInput
                radius={8}
                size={inputSize}
                className="border-none w-full text-sm"
                label="Vacancy"
                styles={{ label: { color: "#6d6d6d" } }}
                value={filter.vacancy}
                onChange={(event) => { setFilter({ ...filter, vacancy: `${event.currentTarget.value}` }) }}
              />

              <Divider size={0.5} color="#edeeed" className="w-full" />

              <Text fw={500} c="#6d6d6d">Published Date Range</Text>

              <DateRange
                gapValue={12}
                size="md"
                value={archiveValue}
                setValue={setArchiveValue}
                fLabel="From"
                lLabel="To"
                fPlaceholder="Start Date"
                lPlaceholder="End Date"
                isColumn
              />

              <Divider size={0.5} color="#edeeed" className="w-full" />

              <TextInput
                radius={8}
                size={inputSize}
                className="border-none w-full text-sm"
                label="Interviewer"
                styles={{ label: { color: "#6d6d6d" } }}
                value={filter.interviewer}
                onChange={(event) => { setFilter({ ...filter, interviewer: `${event.currentTarget.value}` }) }}
              />

              <TextInput
                radius={8}
                size={inputSize}
                className="border-none w-full text-sm"
                label="Department"
                styles={{ label: { color: "#6d6d6d" } }}
                value={filter.department}
                onChange={(event) => { setFilter({ ...filter, department: `${event.currentTarget.value}` }) }}
              />
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
                onChange={(values) => setFilter({ ...filter, status: values })}
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
          )}
          {/*End of Archived */}


          {/* All Job Offers */}

          {isJobOffers && (
            <>
              <TextInput
                radius={8}
                size={inputSize}
                className="border-none w-full text-sm"
                label="ID"
                placeholder="Type ID"
                styles={{ label: { color: "#6d6d6d" } }}
                value={filter.filterId}
                onChange={(event) => { setFilter({ ...filter, filterId: `${event.currentTarget.value}` }) }}
              />

              <Divider size={0.5} color="#edeeed" className="w-full" />

              <TextInput
                radius={8}
                size={inputSize}
                className="border-none w-full text-[16px] poppins"
                label="Applicant Name"
                placeholder="Type Applicant Name"
                styles={{ label: { color: "#6d6d6d", fontSize: "16px" } }}
                value={filter.applicantName}
                onChange={(event) => { setFilter({ ...filter, applicantName: `${event.currentTarget.value}` }) }}
              />

              <Text fw={500} c="#6d6d6d">Date Generated Range</Text>

              <DateRange
                gapValue={12}
                size="md"
                value={dateUpdatedValue}
                setValue={setDateUpdatedValue}
                fLabel="From"
                lLabel="To"
                fPlaceholder="Start Date"
                lPlaceholder="End Date"
                isColumn
              />
              <Text fw={500} c="#6d6d6d">Date Last Updated Range</Text>

              <DateRange
                gapValue={12}
                size="md"
                value={jobOfferValue}
                setValue={setJobOfferValue}
                fLabel="From"
                lLabel="To"
                fPlaceholder="Start Date"
                lPlaceholder="End Date"
                isColumn
              />

              <Divider size={0.5} color="#edeeed" className="w-full" />

              {/* Remarks chips */}
              <MultiSelect
                radius={8}
                size={inputSize}
                className="border-none w-full text-[16px] poppins"
                label="Remarks"
                placeholder="Select Remarks"
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
                data={remarksFilterOptions}
                onChange={(values) => setFilter({ ...filter, remarks: values })}
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

              {/* Status chips */}
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
                onChange={(values) => setFilter({ ...filter, status: values })}
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
          )}

          {/* Generated */}
          {(isGenerated || isAccepted) && (
            <>
              <TextInput
                radius={8}
                size={inputSize}
                className="border-none w-full text-sm"
                label="ID"
                placeholder="Type ID"
                styles={{ label: { color: "#6d6d6d" } }}
                value={filter.filterId}
                onChange={(event) => { setFilter({ ...filter, filterId: `${event.currentTarget.value}` }) }}
              />

              <Divider size={0.5} color="#edeeed" className="w-full" />

              <TextInput
                radius={8}
                size={inputSize}
                className="border-none w-full text-[16px] poppins"
                label="Applicant Name"
                placeholder="Type Applicant Name"
                styles={{ label: { color: "#6d6d6d" } }}
                value={filter.applicantName}
                onChange={(event) => { setFilter({ ...filter, applicantName: `${event.currentTarget.value}` }) }}
              />

              <Text fw={500} c="#6d6d6d">Date Generated Range</Text>


              <DateRange
                gapValue={12}
                size="md"
                value={filterValue}
                setValue={setFilterValue}
                fLabel="From"
                lLabel="To"
                fPlaceholder="Start Date"
                lPlaceholder="End Date"
                isColumn
              />

              <Text fw={500} c="#6d6d6d">Date Last Updated Range</Text>

              <DateRange
                gapValue={12}
                size="md"
                value={archiveValue}
                setValue={setArchiveValue}
                fLabel="From"
                lLabel="To"
                fPlaceholder="Start Date"
                lPlaceholder="End Date"
                isColumn
              />
            </>
          )}
          {/* End of generated */}
          <>
          </>
        </div>

        <Flex className="w-full py-5" justify="flex-end" gap={10} >
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

