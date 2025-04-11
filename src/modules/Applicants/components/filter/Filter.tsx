import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { ActionIcon, MantineSize, Pill, Text, useMatches } from "@mantine/core";
import { useEffect } from "react";
import { FilterStore, useDateUpdatedRangeStore, useApplicationDateStore } from '@modules/Applicants/store';

export default function Filter() {
  const { setFilterDrawer, filter, setFilter, setClearFilter, isFiltered, setIsFiltered } = FilterStore();
  const { dateUpdated: dateUpdatedRange } = useDateUpdatedRangeStore();
  const { applicationDateValue: applicationDateRange } = useApplicationDateStore();

  const { } = useApplicationDateStore();

  useEffect(() => {
    if (filter) {
      setIsFiltered(false)
    }
  }, [filter])

  useEffect(() => {
    const hasActiveFilters = Object.values(filter).some(value => value !== '' && value !== null);
    setIsFiltered(hasActiveFilters);
  }, [filter]);

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

  const toCamelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, '');
  };

  const removeFilter = (label: string, item: any) => {
    const updatedFilter = { ...filter };
    const camelCaseLabel = toCamelCase(label);
    const currentValue = (updatedFilter as any)[camelCaseLabel];

    if (Array.isArray(currentValue)) {
      (updatedFilter as any)[camelCaseLabel] = currentValue.filter((val: any) => val !== item);
    } else if (currentValue === item) {
      (updatedFilter as any)[camelCaseLabel] = '';
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

  const renderDateRangePills = (range: [Date | null, Date | null], label: string) => {
    return range.map((date, index) =>
      date ? renderSinglePill(
        `${label} ${index === 0 ? 'From' : 'To'}`,
        date.toDateString()
      ) : null
    );
  };

  return (
    <div className="w-full rounded-lg flex flex-row justify-between items-center bg-white h-fit border-2 border-black-600">

      <div className="h-full items-center gap-2 bg-[#D9D9D9] rounded-l-lg flex p-2 justify-center w-64 ">
        <ListFilter size={ListFilterSize} color="#6d6d6d" />
        <Text fw={600} visibleFrom="md" className="text-xs 2xl:text-[14px] text-[#6D6D6D]">
          FILTERS APPLIED
        </Text>
      </div>

      {isFiltered && (
        <div className="flex w-full max-h-[39px] overflow-hidden">
          <div className="scrollbar flex flex-wrap gap-2 px-4 py-1 w-full max-h-fit overflow-y-auto">

            {filter.company && filter.company.length > 0 && renderPills('Company', filter.company)}
            {filter.applicantName && renderSinglePill('Applicant Name', filter.applicantName)}

            {renderDateRangePills(applicationDateRange, 'Date')}
            {renderDateRangePills(dateUpdatedRange, 'Updated')}

            {filter.position && filter.position.length > 0 && renderPills('Position', filter.position)}
            {filter.status && filter.status.length > 0 && renderPills('Status', filter.status)}
          </div>
        </div>
      )}

      <div className="flex h-full items-center px-3">
        <ActionIcon
          onClick={() => setFilterDrawer(true)}
          variant="transparent"
          color="gray"
          size={iconSize}
          aria-label="Settings"
        >
          <IconCirclePlus
            style={{ width: "80%", height: "100%" }}
            stroke={1.5}
            color="#6d6d6d"
          />
        </ActionIcon>
        <ActionIcon
          onClick={() => setClearFilter(true)}
          variant="transparent"
          color="gray"
          size={iconSize}
          aria-label="Settings"
        >
          <IconTrash
            style={{ width: "80%", height: "100%" }}
            stroke={1.5}
            color="#6d6d6d"
          />
        </ActionIcon>
      </div>
    </div>
  );
}
