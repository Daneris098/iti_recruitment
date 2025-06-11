import dayjs from "dayjs";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filterVal } from "@modules/Offers/values";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useStatusFilterStore } from "@modules/Shared/store";
import { useGeneratedOfferStore } from "@shared/hooks/useDateRange";
import { DateRange } from "@modules/Offers/components/filter/DateRange";
import { FilterStore, useJobOfferStore, useDateRangeStore } from '@src/modules/Offers/store'
import { Button, Divider, Drawer, Flex, MultiSelect, Text, TextInput, useMatches } from "@mantine/core";

const STATUS_LABEL_ID_MAP: Record<string, number> = {
  "Applied": 1,
  "For Interview": 2,
  "Pending": 3,
  "Archived": 4,
  "Accepted": 5,
  "Ready for Transfer": 7,
};

export default function DrawerFilter() {

  const commentsMap = new Map<string, Set<string>>();
  const statusMap = new Map<string, Set<string>>();
  const [searchParams, setSearchParams] = useSearchParams();
  const getJobOffersFilter = useJobOfferStore((state) => state.records);

  const {
    dateArchived, setDateArchived,
    dateGenerated, setDateGenerated,
    dateLastUpdated, setDateLastUpdated,
  } = useDateRangeStore();

  const { selectedStatusId, SetSelectedStatusId } = useStatusFilterStore();

  const {
    filter, activeTab,
    setIsFiltered, setFilter,
    clearFilter, setClearFilter,
    filterDrawer, setFilterDrawer,
  } = FilterStore();

  const isDateUpdatedActive = Boolean(dateGenerated[0] || dateGenerated[1]);
  const isJobOfferActive = Boolean(dateLastUpdated[0] || dateLastUpdated[1]);
  const { setGeneratedOfferValue: setFilterValue } = useGeneratedOfferStore();
  const [localStatusFilter, setLocalStatusFilter] = useState<any>(filter.status || []);
  const [localApplicantName, setLocalApplicantName] = useState(filter.applicantName || "");

  getJobOffersFilter.forEach(({ id, status, remarks }) => {
    if (typeof status === 'string' && status.trim()) {
      status.split(",").map((s) => s.trim()).forEach((statusName) => {
        if (!statusMap.has(statusName)) statusMap.set(statusName, new Set());
        statusMap.get(statusName)!.add(String(id));
      });
    }

    if (typeof remarks === 'string' && remarks.trim()) {
      remarks.split(",").map((c) => c.trim()).forEach((comment) => {
        if (!commentsMap.has(comment)) commentsMap.set(comment, new Set());
        commentsMap.get(comment)!.add(String(id));
      });
    }
  });

  const filterStatus = Array.from(statusMap.entries()).map(([label, ids]) => ({
    value: label,
    label,
    ids: Array.from(ids)
  }));


  useEffect(() => {
    if (filterDrawer) {
      const nameFromUrl = searchParams.get("name") || "";
      const dateGeneratedToUrl = searchParams.get("dateGenerateTo");
      const dateArchivedFromUrl = searchParams.get("dateArchived");
      const dateArchivedToUrl = searchParams.get("dateArchivedTo");
      const statusFromUrl = searchParams.get("status")?.split(",") || [];
      const dateGeneratedFromUrl = searchParams.get("dateGeneratedFrom");
      const dateLastUpdatedToUrl = searchParams.get("dateLastUpdatedTo");
      const dateLastUpdateFromUrl = searchParams.get("dateLastUpdatedFrom");

      setLocalApplicantName(nameFromUrl);
      setLocalStatusFilter(statusFromUrl);

      if (dateGeneratedFromUrl || dateGeneratedToUrl) {
        setDateGenerated([
          dateGeneratedFromUrl ? new Date(dateGeneratedFromUrl) : null,
          dateGeneratedToUrl ? new Date(dateGeneratedToUrl) : null
        ])
      }

      if (dateLastUpdateFromUrl || dateLastUpdatedToUrl) {
        setDateLastUpdated([
          dateLastUpdateFromUrl ? new Date(dateLastUpdateFromUrl) : null,
          dateLastUpdatedToUrl ? new Date(dateLastUpdatedToUrl) : null
        ])
      }

      if (dateArchivedFromUrl || dateArchivedToUrl) {
        setDateArchived([
          dateArchivedFromUrl ? new Date(dateArchivedFromUrl) : null,
          dateArchivedToUrl ? new Date(dateArchivedToUrl) : null,
        ])
      }
    }
  }, [filterDrawer]);

  useEffect(() => {
    if (clearFilter) {
      setFilter(filterVal);
      setLocalApplicantName("");
      setLocalStatusFilter([]);
      // setLocalRemarksFilter([]);
      SetSelectedStatusId(0);
      setIsFiltered(false);
      setClearFilter(false);
      setDateGenerated([null, null]);
      setDateLastUpdated([null, null]);
      setDateArchived([null, null]);
    }
  }, [clearFilter])

  const handleApplyFilters = () => {

    let formattedDateGeneratedFrom: string | null = null;
    let formattedDateGeneratedTo: string | null = null;
    let formattedDateLastUpdateFrom: string | null = null;
    let formattedDateLastUpdatedTo: string | null = null;
    let formattedDateArchivedFrom: string | null = null;
    let formattedArchivedTo: string | null = null;

    const statusId = localStatusFilter.find((label: any) => STATUS_LABEL_ID_MAP[label]);

    if (statusId) {
      SetSelectedStatusId(STATUS_LABEL_ID_MAP[statusId]);
    } else {
      SetSelectedStatusId(0);
    }
    if (dateGenerated?.[0]) {
      formattedDateGeneratedFrom = dayjs(dateGenerated[0]).format("YYYYMMDD")
    }

    if (dateGenerated?.[1]) {
      formattedDateGeneratedTo = dayjs(dateGenerated[1]).format("YYYYMMDD")
    }

    if (dateLastUpdated?.[0]) {
      formattedDateLastUpdateFrom = dayjs(dateLastUpdated[0]).format("YYYYMMDD")
    }
    if (dateLastUpdated?.[1]) {
      formattedDateLastUpdatedTo = dayjs(dateLastUpdated[1]).format("YYYYMMDD")
    }

    if (dateArchived?.[0]) {
      formattedDateArchivedFrom = dayjs(dateArchived[0]).format("YYYYMMDD")
    }
    if (dateArchived?.[1]) {
      formattedArchivedTo = dayjs(dateArchived[0]).format("YYYYMMDD")
    }

    setFilter({
      ...filter,
      applicantName: localApplicantName,
      status: localStatusFilter,
      // remarks: localRemarksFilter,
      dateGenerated: [formattedDateGeneratedFrom, formattedDateGeneratedTo],
      dateLastUpdated: [formattedDateLastUpdateFrom, formattedDateLastUpdatedTo],
      dateArchived: [formattedDateArchivedFrom, formattedArchivedTo]
    })

    const params: Record<string, string> = {
      page: "1",
      pageSize: "30",
      Name: localApplicantName || "",
      StatusIds: selectedStatusId === 0 ? "" : selectedStatusId.toString(),
    }

    if (formattedDateGeneratedFrom && formattedDateGeneratedTo) {
      params.DateField = "DateTransaction";
      params.DateFrom = formattedDateGeneratedFrom;
      params.DateTo = formattedDateGeneratedTo;
    }

    if (formattedDateLastUpdateFrom && formattedDateLastUpdatedTo) {
      params.DateField = "DateTransaction";
      params.DateFrom = formattedDateLastUpdateFrom;
      params.DateTo = formattedDateLastUpdatedTo;
    }

    if (formattedDateArchivedFrom && formattedArchivedTo) {
      params.DateField = "DateTransaction";
      params.DateFrom = formattedDateArchivedFrom;
      params.DateTo = formattedArchivedTo;
    }

    setSearchParams(params, { replace: true });
    setIsFiltered(true);
    setFilterDrawer(false);
  }

  const currentDate = new Date();
  const dateTomorrow = new Date(currentDate);
  dateTomorrow.setDate(currentDate.getDate() + 1)

  const isArchived = activeTab === "Archived"
  const isJobOffers = activeTab === "All_offers"
  const isGenerated = activeTab === "Pending"
  const isAccepted = activeTab === "Accepted"

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

  useEffect(() => {
    setFilterValue([null, null]);
  }, [isGenerated, isAccepted, isArchived]);


  const handleStatusChange = (selectedLabels: string[]) => {
    setLocalStatusFilter(selectedLabels);
  };

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
                value={dateArchived}
                setValue={setDateArchived}
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
                label="Status"
                placeholder="Select Status"
                data={filterStatus}
                value={localStatusFilter}
                onChange={handleStatusChange}
                searchable
                clearable
                maxDropdownHeight={90}
                rightSection={<IconCaretDownFilled size={18} stroke={2} />}
                styles={{ label: { color: "#6d6d6d" } }}
              />
            </>
          )}
          {/*End of Archived */}

          {/* All Job Offers */}
          {isJobOffers && (
            <>
              <Divider size={0.5} color="#edeeed" className="w-full" />
              <TextInput
                radius={8}
                size="md"
                label="Applicant Name"
                placeholder="Type Applicant Name"
                styles={{ label: { color: "#6d6d6d" } }}
                value={localApplicantName}
                onChange={(e) => setLocalApplicantName(e.currentTarget.value)}
              />

              <Text fw={500} c="#6d6d6d">Date Generated Range</Text>
              <DateRange
                gapValue={12}
                size="md"
                value={dateGenerated}
                setValue={setDateGenerated}
                fLabel="From"
                lLabel="To"
                fPlaceholder="Start Date"
                lPlaceholder="End Date"
                isColumn
                disabled={isJobOfferActive}
              />

              <Text fw={500} c="#6d6d6d">Date Last Updated Range</Text>

              <DateRange
                gapValue={12}
                size="md"
                value={dateLastUpdated}
                setValue={setDateLastUpdated}
                fLabel="From"
                lLabel="To"
                fPlaceholder="Start Date"
                lPlaceholder="End Date"
                isColumn
                disabled={isDateUpdatedActive}
              />

              <Divider size={0.5} color="#edeeed" className="w-full" />

              {/* Status chips */}
              <MultiSelect
                radius={8}
                size={inputSize}
                label="Status"
                placeholder="Select Status"
                data={filterStatus}
                value={localStatusFilter}
                onChange={handleStatusChange}
                searchable
                clearable
                maxDropdownHeight={90}
                rightSection={<IconCaretDownFilled size={18} stroke={2} />}
                styles={{ label: { color: "#6d6d6d" } }}
              />
            </>
          )}

          {/* Generated */}
          {(isGenerated || isAccepted) && (
            <>
              <Divider size={0.5} color="#edeeed" className="w-full" />

              <TextInput
                radius={8}
                size={inputSize}
                className="border-none w-full text-[16px] poppins"
                label="Applicant Name"
                placeholder="Type Applicant Name"
                styles={{ label: { color: "#6d6d6d" } }}
                value={localApplicantName}
                onChange={(e) => setLocalApplicantName(e.currentTarget.value)}
              />

              <Text fw={500} c="#6d6d6d">Date Generated Range</Text>
              <DateRange
                gapValue={12}
                size="md"
                value={dateGenerated}
                setValue={setDateGenerated}
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
                value={dateLastUpdated}
                setValue={setDateLastUpdated}
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
            onClick={() => {
              setFilter(filterVal)
              setLocalApplicantName("")
              setLocalStatusFilter([]);
              setIsFiltered(false);
              setDateGenerated([null, null]);
              setDateLastUpdated([null, null]);
            }}
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

