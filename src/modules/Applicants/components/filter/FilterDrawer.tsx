import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filterVal } from "@modules/Applicants/values";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
import { FilterStore, useDateUpdatedRangeStore } from '@modules/Applicants/store';
import { DateRange } from "@modules/Applicants/components/filter/DateRangeFilter";
import { Button, Divider, Drawer, Flex, MultiSelect, Text, TextInput, useMatches } from "@mantine/core";
import { useApplicantStore } from "@modules/Applicants/store";
import { usePositionFilterStore } from "@modules/Shared/store";

export default function DrawerFilter() {
  const getApplicantFilter = useApplicantStore((s) => s.records);

  const { selectedPositionIds, setSelectedPositionIds } = usePositionFilterStore();
  const positionMap = new Map<string, Set<string>>();

  getApplicantFilter.forEach(({ id, position }) => {
    if (!position) return;
    if (!positionMap.has(position)) {
      positionMap.set(position, new Set());
    }
    positionMap.get(position)!.add(String(id));
  });

  const filterPositions = Array.from(positionMap.entries()).map(
    ([position, ids]) => ({
      value: position,
      label: position,
      ids: Array.from(ids),
    })
  );


  const filterStatus = Array.from(new Set(getApplicantFilter.map((s) => s.status)));

  const { filterDrawer, setFilterDrawer,
    setFilter,
    clearFilter, setClearFilter, setIsFiltered
  } = FilterStore();

  const filter = FilterStore((state) => state.filter);
  const { dateUpdated, setDateUpdated } = useDateUpdatedRangeStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const inputSize = useMatches({ base: 'xs', xl: 'md' });

  // Local controlled states
  const [localApplicantName, setLocalApplicantName] = useState(filter.applicantName || "");
  const [localPositionFilter, setLocalPositionFilter] = useState<string[]>(filter.position || []);
  const [statusFilter, setStatusFilter] = useState<string[]>(filter.status || []);

  // When drawer opens, initialize local state from URL params
  useEffect(() => {
    if (filterDrawer) {
      const dateUpdatedFrom = searchParams.get("dateUpdatedFrom");
      const dateUpdatedTo = searchParams.get("dateUpdatedTo");
      const nameFromUrl = searchParams.get("name") || "";
      const statusFromUrl = searchParams.get("statusIds")?.split(",") || [];
      const positionFromUrl = searchParams.get("position")?.split(",") || [];

      setLocalApplicantName(nameFromUrl);
      setStatusFilter(statusFromUrl);
      setLocalPositionFilter(positionFromUrl);

      if (dateUpdatedFrom || dateUpdatedTo) {
        const from = dateUpdatedFrom ? new Date(dateUpdatedFrom) : null;
        const to = dateUpdatedTo ? new Date(dateUpdatedTo) : null;
        setDateUpdated([from, to]);
      }
    }
  }, [filterDrawer]);

  const handleApplyFilters = () => {
    let dateUpdatedFormatted: [string | null, string | null] = [null, null];
    let formattedFrom = '';
    let formattedTo = '';

    if (dateUpdated && dateUpdated[0] && dateUpdated[1]) {
      const from = dayjs(dateUpdated[0]).format("YYYY-MM-DD");
      const to = dayjs(dateUpdated[1]).format("YYYY-MM-DD");

      dateUpdatedFormatted = [
        DateTimeUtils.dateDefaultToHalfMonthWord(from),
        DateTimeUtils.dateDefaultToHalfMonthWord(to),
      ];

      formattedFrom = dateUpdatedFormatted[0] ?? '';
      formattedTo = dateUpdatedFormatted[1] ?? '';
    }

    setFilter({
      ...filter,
      applicantName: localApplicantName,
      position: localPositionFilter,
      status: statusFilter,
      dateUpdated: dateUpdatedFormatted,
    });

    setSearchParams({
      page: "1",
      pageSize: "30",
      Name: localApplicantName,
      PositionIds: selectedPositionIds.join(","),
      statusIds: statusFilter.join(","),
      dateUpdatedFrom: formattedFrom,
      dateUpdatedTo: formattedTo,
    });

    setIsFiltered(true);
    setFilterDrawer(false);
  };

  const clear = () => {
    setFilter(filterVal);
    setLocalApplicantName("");
    setLocalPositionFilter([]);
    setStatusFilter([]);
    setIsFiltered(false);
  };

  const buttonSize = useMatches({
    base: "xs",
    xl: "sm",
  });

  useEffect(() => {
    if (clearFilter) {
      clear();
      setClearFilter(false);
    }
  }, [clearFilter]);

  const drawerFilterSize = useMatches({
    base: "100%",
    xs: "30.8%",
    sm: "22.8%",
    md: "18.8%",
    lg: "18.8%",
    xl: "16.8%",
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
            <Divider size={2} color="#6d6d6d50" className="w-full" />

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
            <Text fw={500} fz={16} c="#6d6d6d">Date Applied</Text>

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
              data={filterPositions}
              value={localPositionFilter}
              onChange={(selectedLabels) => {
                setLocalPositionFilter(selectedLabels); // for display
                const matchingIds = filterPositions
                  .filter((item) => selectedLabels.includes(item.label))
                  .flatMap((item) => item.ids);
                setSelectedPositionIds(matchingIds);
              }}

              searchable
              clearable
              nothingFoundMessage="No options"
              maxDropdownHeight={90}
              rightSection={<IconCaretDownFilled size={18} stroke={2} />}
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
              data={filterStatus}
              value={statusFilter}
              onChange={setStatusFilter}
              searchable
              clearable
              nothingFoundMessage="No options"
              maxDropdownHeight={90}
              rightSection={<IconCaretDownFilled size={18} stroke={2} />}
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
