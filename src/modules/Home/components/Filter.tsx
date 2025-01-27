import { IconCirclePlus, IconTrash } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { ActionIcon, Pill, Text } from "@mantine/core";
import { HomeStore } from "@src/modules/Home/store";

export default function Filter() {
  const { setFilterDrawer, filter, setFilter, setClearFilter } = HomeStore();
  const renderPills = (label: any, items: any) => {
    return (
      <div className="flex flex-row items-center gap-7 mx-8 visibleFrom:md" >
        <Text>{label}:</Text>
        <Pill.Group>
          {items.map((item: string, index: number) => (
            <Pill key={index} withRemoveButton onRemove={() => removeFilter(label, item)} >{item}</Pill>
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
      .replace(/\s+/g, '');  // Remove spaces
  };

  const removeFilter = (label: string, item: any) => {
    let updatedFilter = { ...filter }; // Make a copy of the filter to modify it
    if (Array.isArray((updatedFilter as any)[toCamelCase(label)])) {
      console.log('hey');
      (updatedFilter as any)[toCamelCase(label)] = (updatedFilter as any)[toCamelCase(label)].filter((i: string) => {
        console.log('item', item)
        console.log('i', i)
        console.log('condition ', (item !== i))
        return (item !== i)
      });
    } else if (label === 'Date Added') {
      updatedFilter.dateFrom = '';
      updatedFilter.dateTo = '';
    }
    setFilter(updatedFilter)
  };


  return (
    <div className="w-full rounded-md  flex flex-row justify-between items-center bg-white h-full text-gray-600">
      <div className="h-full flex flex-row items-center justify-center ">


        <div className="h-full items-center bg-[#eeeeee] gap-2 rounded-l-md flex p-2">
          <ListFilter size={20} color="#6d6d6d" />
          <Text fw={500} visibleFrom="md" className="text-xs 2xl:text-sm">
            FILTERS APPLIED
          </Text>
        </div>


        <div className="flex">
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

      <div className="pr-2 2xl:pr-10 py-8 2xl:gap-5 flex">
        <ActionIcon
          onClick={() => setFilterDrawer(true)}
          variant="transparent"
          color="gray"
          size="md"
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
          size="md"
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
