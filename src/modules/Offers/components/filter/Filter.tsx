import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { ActionIcon, MantineSize, Pill, Text, useMatches } from "@mantine/core";
import { useEffect } from "react";
import { FilterStore } from '@src/modules/Offers/store'
import { useDateRangeStore, useJobOfferDateRangeStore, useGeneratedOfferStore, useArchivedStore } from "@shared/hooks/useDateRange";

export default function Filter() {
  const { setFilterDrawer, filter, setFilter, setClearFilter, isFiltered, setIsFiltered } = FilterStore();
  const { value: dateRangeValue } = useDateRangeStore();
  const { value: jobOfferDateValue } = useJobOfferDateRangeStore();
  const { value: generatedOfferValue } = useGeneratedOfferStore();
  const { value: archiveValue } = useArchivedStore();
  useEffect(() => {
    const hasActiveFilters = Object.values(filter).some(value => value !== '' && value !== null);
    setIsFiltered(hasActiveFilters);
  }, [filter]);


  const renderPills = (label: any, items: any) => {
    return (
      <div className="flex flex-row items-center  gap-2" >
        <Text className="text-xs 2xl:text-[1rem]">{label}:</Text>
        <div className="flex  h-full items-center space-x-1">
          {items.map((item: string, index: number) => (
            <div className="">
              <Pill key={index} withRemoveButton onRemove={() => removeFilter(label, item)} className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold" >{item}</Pill>
            </div>
          ))}
        </div>
        <Text size="xl" c="#eeeeee">|</Text>
      </div>
    );
  };

  const renderSinglePill = (label: any, item: string) => {
    return (
      <div className="flex flex-row items-center  gap-2 ">
        <Text className="text-xs 2xl:text-[1rem]">{label}:</Text>
        <div className="flex h-full items-center">
          <div className="">
            <Pill
              withRemoveButton
              onRemove={() => removeFilter(label, item)}
              className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold"
            >
              {item}
            </Pill>
          </div>
        </div>
        <Text size="xl" c="#eeeeee">
          |
        </Text>
      </div>
    );
  };


  const toCamelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, '');
  };

  const removeFilter = (label: string, item: any, index?: number) => {
    const updatedFilter = { ...filter };
    const camelCaseLabel = toCamelCase(label);

    if (label === 'ID') {
      updatedFilter.id = '';
    }
    else if (dateRangeValue) {
      updatedFilter.dateRange = [...(updatedFilter.dateRange || [null, null])];
      updatedFilter.dateRange[index!] = null;
    }
    // Handle single-value filters
    else if (typeof (updatedFilter as any)[camelCaseLabel] === 'string') {
      (updatedFilter as any)[camelCaseLabel] = '';
    }
    // Handle array-based filters (like status, remarks)
    else if (Array.isArray((updatedFilter as any)[camelCaseLabel])) {
      (updatedFilter as any)[camelCaseLabel] = (updatedFilter as any)[camelCaseLabel].filter((val: any) => val !== item);
    }

    setFilter(updatedFilter);
  };

  const iconSize: MantineSize = useMatches({
    base: "md",
    xl: "xl"
  });

  const ListFilterSize = useMatches({
    base: "20",
    xl: "25"
  });

  return (
    <div className="w-full rounded-lg  flex flex-row justify-between items-center bg-white h-full border-2 border-black-600">
      {/* Fixed Left Section */}
      <div className="h-full flex items-center gap-2 bg-[#D9D9D9] rounded-l-lg p-2 justify-center w-52">
        <ListFilter size={ListFilterSize} color="#6d6d6d" />
        <Text fw={600} visibleFrom="md" className="text-xs 2xl:text-[14px] text-[#6D6D6D]">
          FILTERS APPLIED
        </Text>
      </div>

      {/* Applied Filters List */}
      {isFiltered && (
        <div className="flex w-full max-h-[39px] overflow-hidden">
          <div className="scrollbar flex flex-wrap gap-2 px-4 py-1 w-full max-h-fit overflow-y-auto">
            {filter.id && renderSinglePill('ID', filter.id)}
            {filter.applicantName && renderSinglePill('Applicant Name', filter.applicantName)}
            {filter.status && filter.status.length > 0 && renderPills('Status', filter.status)}
            {filter.department && renderSinglePill('Department', filter.department)}
            {filter.interviewer && renderSinglePill('Interviewer', filter.interviewer)}

            {/* Date Range Pills */}
            {[dateRangeValue, jobOfferDateValue, generatedOfferValue, archiveValue].map((range, i) =>
              range.map((date, index) =>
                date
                  ? renderSinglePill(
                    ['Date', 'Job Offer Date', 'Generated Offer Date', 'Archived Date'][i] +
                    (index === 0 ? ' From' : ' To'),
                    date.toDateString()
                  )
                  : null
              )
            )}
            {filter.company.length > 0 && renderSinglePill('Interviewer', filter.company.join(' , '))}
          </div>
        </div>
      )}

      {/* Actions: Open Filter Drawer / Clear Filters */}
      <div className="flex h-full items-center px-3 ml-auto">
        <ActionIcon onClick={() => setFilterDrawer(true)} variant="transparent" color="gray" size={iconSize}>
          <IconCirclePlus style={{ width: "80%", height: "100%" }} stroke={1.5} color="#6d6d6d" />
        </ActionIcon>
        <ActionIcon onClick={() => setClearFilter(true)} variant="transparent" color="gray" size={iconSize}>
          <IconTrash style={{ width: "80%", height: "100%" }} stroke={1.5} color="#6d6d6d" />
        </ActionIcon>
      </div>
    </div>


  );
}
