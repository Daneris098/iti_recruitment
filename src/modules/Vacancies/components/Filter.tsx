import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { ActionIcon, MantineSize, Pill, Text, useMatches } from "@mantine/core";
import { FilterStore } from "@src/modules/Vacancies/store";
import { useEffect } from "react";
import { filterVal } from "@src/modules/Vacancies/values";
import dayjs from 'dayjs';
// import { queryClient } from "@src/client/queryClient";

export default function Filter() {
  const { setFilterDrawer, filter, setFilter, setClearFilter, isFiltered, setIsFiltered } = FilterStore();

  useEffect(() => {
    if (filter === filterVal) {
      setIsFiltered(false)
    }
    // queryClient.refetchQueries({ queryKey: ["recruitment/vacancies"], type: 'active' }); 
  }, [filter])

  const formatDate = (dateString: string) => {
    const date = dayjs(dateString, "MMDDYYYY");
    const formattedDate = date.format("MMMM D, YYYY");
    return formattedDate;
  }

  const renderPills = (label: any, items: any) => {
    return (
      <div className="flex flex-row items-center  gap-2" >
        <Text className="text-xs 2xl:text-[1rem]">{label}:</Text>
        <div className="flex  h-full items-center gap-2">
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

  const renderDateRange = (label: any, item: string, label2: any, item2: string) => {
    return (
      <div className="flex flex-row items-center  gap-2 ">
        <Text className="text-xs 2xl:text-[1rem]">Date: </Text>
        <div className="flex h-full items-center">
          <div className="flex gap-1">
            <Pill
              withRemoveButton
              onRemove={() => removeFilter(label, item)}
              className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold"
            >
              {formatDate(item)}
            </Pill>
            -
            <Pill
              withRemoveButton
              onRemove={() => removeFilter(label2, item2)}
              className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold"
            >
              {formatDate(item2)}
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

    setFilter(updatedFilter);
    // setIsFiltered(false)
    // setIsFiltered(true)
    // console.log('tangalll')
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

        {filter.company && filter.company.length > 0 && renderPills(
          'Company',
          filter.company
        )}

        {filter.dateFrom && !filter.dateTo && renderSinglePill(
          'DateFrom',
          filter.dateFrom
        )}

        {filter.dateTo && !filter.dateFrom && renderSinglePill(
          'DateTo',
          filter.dateTo
        )}

        {filter.dateTo && filter.dateFrom && renderDateRange(
          'dateFrom',
          filter.dateFrom,
          'dateTo',
          filter.dateTo
        )}

        {filter.vacancy && filter.vacancy.length > 0 && renderPills(
          'Vacancy',
          filter.vacancy
        )}

        {filter.interviewer && filter.interviewer.length > 0 && renderPills(
          'Interviewer',
          filter.interviewer
        )}

        {filter.department && filter.department.length > 0 && renderPills(
          'Department',
          filter.department
        )}

        {filter.status && filter.status.length > 0 && renderPills(
          'Status',
          filter.status
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
