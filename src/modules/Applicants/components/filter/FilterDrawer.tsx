import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filterVal } from "@modules/Applicants/values";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
import { FilterStore, useDateUpdatedRangeStore } from '@modules/Applicants/store';
import { DateRange } from "@modules/Applicants/components/filter/DateRangeFilter";
import { Button, Divider, Drawer, Flex, MultiSelect, Text, TextInput, useMatches } from "@mantine/core";
import { useApplicantStore } from "@modules/Applicants/store";
import { usePositionFilterStore, useStatusFilterStore } from "@modules/Shared/store";

const STATUS_LABEL_ID_MAP: Record<string, number> = {
  "Applied": 1,
  "For Interview": 2,
  "Offered": 3,
  "Archived": 4,
  "Hired": 5,
  "Ready for Transfer": 7,
};

export default function DrawerFilter() {

  const getApplicantFilter = useApplicantStore((s) => s.records);
  const { selectedStatusId, SetSelectedStatusId } = useStatusFilterStore();
  const { selectedPositionId, setSelectedPositionId } = usePositionFilterStore();

  const {
    setFilter, clearFilter,
    filterDrawer, setFilterDrawer,
    setClearFilter, setIsFiltered
  } = FilterStore();
  const filter = FilterStore((state) => state.filter);
  const { dateUpdated, setDateUpdated } = useDateUpdatedRangeStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const [localApplicantName, setLocalApplicantName] = useState(filter.applicantName || "");
  const [localPositionFilter, setLocalPositionFilter] = useState<any>(filter.position || []);

  const [statusFilter, setStatusFilter] = useState<any>(filter.status || []);

  const inputSize = useMatches({ base: 'xs', xl: 'md' });
  const buttonSize = useMatches({ base: "xs", xl: "sm" });
  const drawerFilterSize = useMatches({
    base: "100%",
    xs: "30.8%",
    sm: "22.8%",
    md: "18.8%",
    lg: "18.8%",
    xl: "16.8%",
  });

  const statusMap = new Map<string, Set<string>>();
  const positionMap = new Map<string, Set<string>>();

  getApplicantFilter.forEach(({ id, status, position,
  }) => {
    if (status) {
      status.split(",").map((s) => s.trim()).forEach((statusName) => {
        if (!statusMap.has(statusName)) statusMap.set(statusName, new Set());
        statusMap.get(statusName)!.add(String(id));
      });
    }

    if (position) {
      position.split(",").map((p) => p.trim()).forEach((positionName) => {
        if (!positionMap.has(positionName)) positionMap.set(positionName, new Set());
        positionMap.get(positionName)!.add(String(id));
      });
    }

  });

  const filterStatus = Array.from(statusMap.entries()).map(([label, ids]) => ({
    value: label,
    label,
    ids: Array.from(ids),
  }));

  const filterPositions = Array.from(positionMap.entries()).map(([label, ids]) => ({
    value: label,
    label,
    ids: Array.from(ids),
  }));

  useEffect(() => {
    if (filterDrawer) {
      const dateUpdatedFrom = searchParams.get("dateUpdatedFrom");
      const dateUpdatedTo = searchParams.get("dateUpdatedTo");
      const nameFromUrl = searchParams.get("name") || "";
      const positionFromUrl = searchParams.get("position")?.split(",") || [];
      const statusFromUrl = searchParams.get("status")?.split(",") || [];

      setLocalApplicantName(nameFromUrl);
      setLocalPositionFilter(positionFromUrl);
      setStatusFilter(statusFromUrl);

      if (dateUpdatedFrom || dateUpdatedTo) {
        setDateUpdated([
          dateUpdatedFrom ? new Date(dateUpdatedFrom) : null,
          dateUpdatedTo ? new Date(dateUpdatedTo) : null,
        ]);
      }
    }
  }, [filterDrawer]);

  useEffect(() => {
    if (clearFilter) {
      setFilter(filterVal);
      setLocalApplicantName("");
      setLocalPositionFilter([]);
      setStatusFilter([]);
      setIsFiltered(false);
      setClearFilter(false);
      SetSelectedStatusId(0);
      setDateUpdated([null, null])
    }
  }, [clearFilter]);

  const handleApplyFilters = () => {
    let formattedFrom: string | null = null;
    let formattedTo: string | null = null;

    if (dateUpdated?.[0]) {
      formattedFrom = dayjs(dateUpdated[0]).format("YYYYMMDD");
    }

    if (dateUpdated?.[1]) {
      formattedTo = dayjs(dateUpdated[1]).format("YYYYMMDD");
    }

    setFilter({
      ...filter,
      applicantName: localApplicantName,
      position: localPositionFilter,
      status: statusFilter,
      dateUpdated: [formattedFrom, formattedTo],
    });

    const params: Record<string, string> = {
      page: "1",
      pageSize: "30",
      Name: localApplicantName || "",
      PositionIds: selectedPositionId === 0 ? "" : selectedPositionId.toString(),
      StatusIds: selectedStatusId === 0 ? "" : selectedStatusId.toString(),
    };

    if (formattedFrom && formattedTo) {
      params.DateField = "DateTransaction";
      params.DateFrom = formattedFrom;
      params.DateTo = formattedTo;
    }

    setSearchParams(params, { replace: true });
    setIsFiltered(true);
    setFilterDrawer(false);
  };

  const handleStatusChange = (selectedLabels: string[]) => {
    setStatusFilter(selectedLabels);

    const matchingIds = filterStatus
      .filter((item) => selectedLabels.includes(item.label))
      .flatMap((item) => item.ids);

    const statusId = selectedLabels.find((label) => STATUS_LABEL_ID_MAP[label]);
    if (statusId) {
      SetSelectedStatusId(STATUS_LABEL_ID_MAP[statusId]);
    } else if (matchingIds.length > 0) {

      SetSelectedStatusId(Number(matchingIds[0]));
    } else {
      setStatusFilter([]);
    }
  };

  const handlePositionChange = (selectedLabels: string[]) => {
    setLocalPositionFilter(selectedLabels);

    const matchingIds = filterPositions
      .filter((item) => selectedLabels.includes(item.label))
      .flatMap((item) => item.ids);
    if (matchingIds.length > 0) {
      setSelectedPositionId(Number(matchingIds[0]));
    } else {
      setSelectedPositionId(0)
    }
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
          <Flex direction="column" gap={10}>
            <Flex justify="space-between">
              <Text fw={600} fz={22} c="#559CDA">Filter By</Text>
              <IconX onClick={() => setFilterDrawer(false)} className="cursor-pointer" size={30} color="gray" />
            </Flex>
          </Flex>

          <Divider size={2} color="#6d6d6d50" className="w-full" />

          <TextInput
            radius={8}
            size="md"
            label="Applicant Name"
            placeholder="Type Applicant Name"
            styles={{ label: { color: "#6d6d6d" } }}
            value={localApplicantName}
            onChange={(e) => setLocalApplicantName(e.currentTarget.value)}
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
            label="Position"
            placeholder="Select Position"
            data={filterPositions}
            value={localPositionFilter}
            onChange={handlePositionChange}
            searchable
            clearable
            maxDropdownHeight={90}
            rightSection={<IconCaretDownFilled size={18} stroke={2} />}
            styles={{ label: { color: "#6d6d6d" } }}
          />

          <Divider size={0.5} color="#edeeed" className="w-full" />

          <MultiSelect
            radius={8}
            size={inputSize}
            label="Status"
            placeholder="Select Status"
            data={filterStatus}
            value={statusFilter}
            onChange={handleStatusChange}
            searchable
            clearable
            maxDropdownHeight={90}
            rightSection={<IconCaretDownFilled size={18} stroke={2} />}
            styles={{ label: { color: "#6d6d6d" } }}
          />
        </div>

        <Flex className="w-full py-3" justify="flex-end" gap={10}>
          <Button
            onClick={() => {
              setFilter(filterVal);
              setLocalApplicantName("");
              setLocalPositionFilter([]);
              setStatusFilter([]);
              setIsFiltered(false);
            }}
            variant="outline"
            size={buttonSize}
            radius={10}
            w={100}
          >
            <Text fw={500} className="text-sm">CLEAR</Text>
          </Button>
          <Button
            onClick={handleApplyFilters}
            variant="transparent"
            className="br-gradient border-none"
            size={buttonSize}
            radius={10}
            w={100}
          >
            <Text fw={400} className="text-sm" c="white">FILTER</Text>
          </Button>
        </Flex>
      </div>
    </Drawer>
  );
}
