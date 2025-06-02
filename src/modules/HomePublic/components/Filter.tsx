import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { ActionIcon, MantineSize, Pill, Text, useMatches } from "@mantine/core";
import { FilterStore } from "@src/modules/HomePublic/store";
import { useFilterDataResponse } from "../services/data";

type RenderFilterProps = {
  label: string;
  storedIds: number[];
  items: any[];
  keyName?: string;
  storedFiltersName?: string;
  onRemove?: (id: number) => void;
};
export default function Filter() {
  const { setFilterDrawer, filter, setFilter, setClearFilter, isFiltered, storedFilters, setStoredFilters, setSearchParams } = FilterStore();

  const renderFilters = ({ label, storedIds = [], items = [], keyName = "id", storedFiltersName = "name", onRemove }: RenderFilterProps) => {
    const filteredItems = items.filter((item) => storedIds.includes(item[keyName]));
    if (!storedIds || storedIds.length === 0 || filteredItems.length === 0) return null;
    return (
      <div className="flex flex-row items-center gap-2">
        <Text className="text-xs 2xl:text-[1rem]">{label}:</Text>
        <div className="flex h-full items-center">
          {filteredItems.map((item, index) => {
            const value = item[storedFiltersName];

            return (
              <div key={index}>
                <Pill onRemove={() => onRemove?.(item[keyName])} className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold">
                  {typeof value === "string" ? value : String(value ?? "")}
                </Pill>
              </div>
            );
          })}
        </div>
        <Text size="xl" c="#eeeeee">
          |
        </Text>
      </div>
    );
  };

  const renderSinglePill = (label: any, item: string) => {
    return (
      <div className="flex flex-row items-center  gap-2 ">
        <Text className="text-xs 2xl:text-[1rem]">{label}:</Text>
        <div className="flex h-full items-center">
          <div className="">
            <Pill onRemove={() => removeFilter(label, item)} className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold">
              {typeof item === "string" ? item.trim() : item}
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
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => (index === 0 ? match.toLowerCase() : match.toUpperCase())).replace(/\s+/g, "");
  };

  const removeFilter = (label: string, item: any) => {
    let updatedFilter = { ...filter };
    const camelCaseLabel = toCamelCase(label);

    const filterValue = (updatedFilter as any)[camelCaseLabel];

    // If it's an array, filter the item out
    if (Array.isArray(filterValue)) {
      (updatedFilter as any)[camelCaseLabel] = filterValue.filter((i: string) => i !== item);
    }
    // If it's a string, check if the storedFilters matches the item and clear it
    else if (typeof filterValue === "string" && filterValue === item) {
      (updatedFilter as any)[camelCaseLabel] = ""; // Reset the string storedFilters
    }

    setFilter(updatedFilter);
  };

  const departmentIds = storedFilters.DepartmentIds?.map((id: any) => Number(id)) || [];
  const employement = storedFilters.EmploymentTypeIds?.map((id: any) => Number(id)) || [];
  const workPlace = storedFilters.WorkplaceTypeIds?.map((id: any) => Number(id)) || [];
  const experience = storedFilters.ExperienceLevelIds?.map((id: any) => Number(id)) || [];

  const removeFilterData = (label: string, idToRemove: number) => {
    const updatedDepartmentIds = departmentIds.filter((id: number) => id !== idToRemove);
    if (label === "Department") {
      setStoredFilters({
        ...storedFilters,
        DepartmentIds: updatedDepartmentIds,
      });
    }
  };

  const iconSize: MantineSize = useMatches({
    base: "md",
    xl: "xl",
  });

  const ListFilterSize = useMatches({
    base: "20",
    xl: "25",
  });
  const clear = () => {
    setStoredFilters({});
    setSearchParams("");
    setClearFilter(true);
  };

  const { departments, employmentType, experienceLevel, workPlaces } = useFilterDataResponse();
  return (
    <div className="w-full rounded-lg  flex flex-row justify-between items-center bg-white h-full">
      <div className="h-full items-center gap-2 bg-[#D9D9D9] rounded-l-lg flex p-2 justify-center w-52">
        <IconAdjustmentsHorizontal size={ListFilterSize} color="#6d6d6d" />
        <Text fw={600} visibleFrom="md" className="text-xs 2xl:text-[14px] text-[#6D6D6D]">
          FILTERS APPLIED
        </Text>
      </div>

      {isFiltered && (
        <div className="scrollbar flex flex-wrap h-full w-full overflow-hidden px-4  sm:overflow-x-hidden sm:hover:overflow-y-auto p-1">
          {filter.jobTitle && renderSinglePill("Job Title", filter.jobTitle)}

          {storedFilters.Position && renderSinglePill("Job Title", storedFilters.Position)}

          {storedFilters.DatePosted && renderSinglePill("Posted Date", storedFilters.DatePosted)}

          {renderFilters({
            label: "Departments",
            storedIds: departmentIds,
            items: departments.data?.items || [],
            onRemove: (id) => removeFilterData("Department", id),
          })}

          {storedFilters.EmploymentTypeIds && (
            <div className="flex flex-row items-center  gap-2">
              <Text className="text-xs 2xl:text-[1rem]">Employment Type:</Text>
              <div className="flex  h-full items-center">
                {employmentType.data?.items
                  .filter((item: any) => employement.includes(item.id))
                  .map((item: any, index: number) => (
                    <div key={index}>
                      <Pill onRemove={() => removeFilter("Department", item.id)} className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold">
                        {item.name}
                      </Pill>
                    </div>
                  ))}
              </div>
              <Text size="xl" c="#eeeeee">
                |
              </Text>
            </div>
          )}

          {storedFilters.WorkplaceTypeIds && (
            <div className="flex flex-row items-center  gap-2">
              <Text className="text-xs 2xl:text-[1rem]">Work Place Type:</Text>
              <div className="flex  h-full items-center">
                {workPlaces.data?.items
                  .filter((item: any) => workPlace.includes(item.id))
                  .map((item: any, index: number) => (
                    <div key={index}>
                      <Pill className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold">{item.name}</Pill>
                    </div>
                  ))}
              </div>
              <Text size="xl" c="#eeeeee">
                |
              </Text>
            </div>
          )}

          {storedFilters.ExperienceLevelIds && (
            <div className="flex flex-row items-center  gap-2">
              <Text className="text-xs 2xl:text-[1rem]">Experience Level:</Text>
              <div className="flex  h-full items-center">
                {experienceLevel.data?.items
                  .filter((item: any) => experience.includes(item.id))
                  .map((item: any, index: number) => (
                    <div key={index}>
                      <Pill onRemove={() => removeFilter("Department", item.id)} className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold">
                        {item.name}
                      </Pill>
                    </div>
                  ))}
              </div>
              <Text size="xl" c="#eeeeee">
                |
              </Text>
            </div>
          )}
        </div>
      )}

      <div className="flex h-full items-center px-3">
        <ActionIcon onClick={() => setFilterDrawer(true)} variant="transparent" color="gray" size={iconSize} aria-label="Settings">
          <IconCirclePlus style={{ width: "80%", height: "100%" }} stroke={1.5} color="#6d6d6d" />
        </ActionIcon>
        <ActionIcon onClick={clear} variant="transparent" color="gray" size={iconSize} aria-label="Settings">
          <IconTrash style={{ width: "80%", height: "100%" }} stroke={1.5} color="#6d6d6d" />
        </ActionIcon>
      </div>
    </div>
  );
}
