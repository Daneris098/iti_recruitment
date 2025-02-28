import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { ActionIcon, MantineSize, Pill, Text, useMatches } from "@mantine/core";
import { useEffect } from "react";
import { FilterStore } from '@modules/Offers/components/store'

export default function Filter() {
  const { setFilterDrawer, filter, setFilter, setClearFilter, isFiltered, setIsFiltered } = FilterStore();

  useEffect(() => {
    const hasActiveFilters = Object.values(filter).some(value => value !== '' && value !== null);
    setIsFiltered(hasActiveFilters);
  }, [filter]);
  

  const renderPills = (label: any, items: any) => {
    return (
      <div className="flex flex-row items-center  gap-2" >
        <Text className="text-xs 2xl:text-[1rem]">{label}:</Text>
        <div className="flex  h-full items-center">
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

  const removeFilter = (label: string, item: any) => {
    const updatedFilter = { ...filter };
    const camelCaseLabel = toCamelCase(label);
    
    if ((updatedFilter as any)[camelCaseLabel] === item) {
      (updatedFilter as any)[camelCaseLabel] = ''; // Reset field
    }
  
    setFilter({ ...updatedFilter }); // Ensure state triggers a re-render
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
    <div className="w-full rounded-lg flex flex-row justify-between items-center bg-gray-100 h-fit">
        
      <div className="h-full items-center gap-2 bg-[#D9D9D9] rounded-l-lg flex p-2 justify-center w-52 ">
        <ListFilter size={ListFilterSize} color="#6d6d6d" />
        <Text fw={600} visibleFrom="md" className="text-xs 2xl:text-[14px] text-[#6D6D6D]">
          FILTERS APPLIED
        </Text>
      </div>

      {isFiltered && (
        <div className="scrollbar flex flex-wrap text-[14px] h-full w-full overflow-hidden px-4 gap-2 sm:overflow-x-hidden sm:hover:overflow-y-auto p-1">

          {filter.applicantName && renderSinglePill('Applicant Name', filter.applicantName)}
          {filter.dateFrom && renderSinglePill('Date From', filter.dateFrom)}
          {filter.dateTo && renderSinglePill ('Date To', filter.dateTo)}
          {filter.dateLastUpdatedFrom && renderSinglePill ('Date Last Updated From', filter.dateLastUpdatedFrom)}
          {filter.dateLastUpdatedTo && renderSinglePill ('Date Last Updated To', filter.dateLastUpdatedTo)}
          {filter.id && renderSinglePill('id', filter.id)}
          {filter.remarks && renderSinglePill ('Remarks', filter.remarks)}
          {filter.status && renderSinglePill ('Status', filter.status)}
          {filter.department && renderSinglePill ('Department', filter.department)}
          {filter.interviewer && renderSinglePill ('Interviewer', filter.interviewer)}

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
