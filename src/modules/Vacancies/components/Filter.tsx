import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { ActionIcon, MantineSize, Pill, Text, useMatches } from "@mantine/core";
import { FilterStore } from "@src/modules/Vacancies/store";
import { useEffect } from "react";
import { filterVal } from "@src/modules/Vacancies/values";

export default function Filter() {
  const { setFilterDrawer, filter, setFilter, setClearFilter, isFiltered, setIsFiltered } = FilterStore();

  useEffect(() => {
    if (filter === filterVal) {
      setIsFiltered(false)
    }
  }, [filter])


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
    let updatedFilter = { ...filter };
    console.log(updatedFilter)
    const camelCaseLabel = toCamelCase(label);
    
    const filterValue = (updatedFilter as any)[camelCaseLabel];
    
    // If it's an array, filter the item out
    if (Array.isArray(filterValue)) {
      (updatedFilter as any)[camelCaseLabel] = filterValue.filter((i: string) => i !== item);
    }
    // If it's a string, check if the value matches the item and clear it
    else if (typeof filterValue === 'string' && filterValue === item) {
      (updatedFilter as any)[camelCaseLabel] = '';  // Reset the string value
    }
    
    // Log updated filter state for debugging
    console.log('Updated Filter:', updatedFilter);
    
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

      <div className="h-full items-center gap-2 bg-[#D9D9D9] rounded-l-lg flex p-2 justify-center w-52">
        <ListFilter size={ListFilterSize} color="#6d6d6d" />
        <Text fw={600} visibleFrom="md" className="text-xs 2xl:text-[14px] text-[#6D6D6D]">
          FILTERS APPLIED
        </Text>
      </div>

      {isFiltered && (<div className="scrollbar flex flex-wrap h-full w-full overflow-hidden px-4 gap-2 sm:overflow-x-hidden sm:hover:overflow-y-auto p-1">

        {filter.jobTitle && renderSinglePill(
          'Job Title',
          filter.jobTitle
        )}


        {filter.postedDate && renderSinglePill(
          'Posted Date',
          filter.postedDate
        )}

        {filter.department && filter.department.length > 0 && renderPills(
          'Department',
          filter.department
        )}

        {filter.workplaceType && filter.workplaceType.length > 0 && renderPills(
          'Workplace Type',
          filter.workplaceType
        )}

        {filter.employmentType && filter.employmentType.length > 0 && renderPills(
          'Employment Type',
          filter.employmentType
        )}

        {filter.experienceLevel && filter.experienceLevel.length > 0 && renderPills(
          'Experience Level',
          filter.experienceLevel
        )}
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
