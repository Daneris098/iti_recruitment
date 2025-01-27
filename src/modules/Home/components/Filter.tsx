import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { ActionIcon, MantineSize, Pill, Text, useMatches } from "@mantine/core";
import { HomeStore } from "@src/modules/Home/store";

export default function Filter() {
  const { setFilterDrawer, filter, setFilter, setClearFilter } = HomeStore();
  const renderPills = (label: any, items: any) => {
    return (
      <div className="flex flex-row items-center gap-7 mx-1 visibleFrom:md" >
        <Text className="2xl:text-xl text-[#6D6D6D]">{label}:</Text>
        <Pill.Group>
          {items.map((item: string, index: number) => (
            <Pill key={index} withRemoveButton onRemove={() => removeFilter(label, item)} className="2xl:text-md bg-[#D9D9D9] text-[#6D6D6D] font-semibold" >{item}</Pill>
          ))}
        </Pill.Group>
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
    let updatedFilter = { ...filter }; 
    if (Array.isArray((updatedFilter as any)[toCamelCase(label)])) {
      console.log('hey');
      (updatedFilter as any)[toCamelCase(label)] = (updatedFilter as any)[toCamelCase(label)].filter((i: string) => {
        return (item !== i)
      });
    } else if (label === 'Date Added') {
      updatedFilter.dateFrom = '';
      updatedFilter.dateTo = '';
    }
    setFilter(updatedFilter)
  };

  const iconSize: MantineSize = useMatches({
    base: "md",
    xl: "xl"
  });

  const ListFilterSize = useMatches({
    base: "20",
    xl: "30"
  });

  return (
    <div className="w-full rounded-lg  flex flex-row justify-between items-center bg-white h-full ">
      <div className="h-full flex flex-row items-center justify-center ">

        <div className="h-full items-center bg-[#D9D9D9] gap-2 rounded-l-lg flex flex-col p-2 justify-center ">
          <div className="flex items-center gap-2">
            <ListFilter size={ListFilterSize} color="#6d6d6d" />
            <Text fw={500} visibleFrom="md" className="text-xs 2xl:text-lg text-[#6D6D6D]">
              FILTERS APPLIED
            </Text>
          </div>
        </div>

        <div className="flex ">
          {filter.dateFrom && filter.dateTo && renderPills(
            'Date Added',
            [`${new Date(filter.dateFrom).toLocaleDateString()} - ${new Date(filter.dateTo).toLocaleDateString()}`]
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

      </div>

      <div className="pr-2 2xl:pr-10 py-8  flex">
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
