import { Button, Divider, Drawer, Flex, MultiSelect, Text, useMatches, } from "@mantine/core";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
// import { useMediaQuery } from "@mantine/hooks";
import { FilterStore, FilterItemsStore } from "@modules/Vacancies/store";
import { cleanFilterVal, filterVal } from "@modules/Vacancies/values";
import { useEffect } from "react";
import { DateRange } from "../DateRange";
import { useDateRangeStore } from "@shared/hooks/useDateRange";
import axiosInstance from "@src/api";
// import { queryClient } from "@src/client/queryClient";

export default function DrawerFilter() {
  // const [value, setValue] = useState<Date | null>(null);
  // const { value, setValue } = useDateRangeStore();
  // const isMobile = useMediaQuery("(max-width: 425px)");

  const { filterDrawer, setFilterDrawer, filter, setFilter, clearFilter, setClearFilter, setIsFiltered, } = FilterStore();
  const { companies, departments, status, vacancies, setCompanies, setDepartments, setInterviewers, setStatus, setVacancies } = FilterItemsStore();
  const { value, setValue } = useDateRangeStore();

  // useEffect(() => {
  //   // setFilter({ ...filter, dateFrom: (value[0]?.toString() || ''), dateTo: (value[1]?.toString() || '') })
  // }, [value])

  // useEffect(() => {
  // setValue([null, null])
  // }, [])

  // const [companies, setCompanies] = useState([]);
  // const [companies, setCompanies] = useState([
  //   { id: 1, value: 'Company A', label: 'Company A' },
  //   { id: 2, value: 'Company B', label: 'Company B' },
  //   { id: 3, value: 'Company C', label: 'Company C' },
  //   { id: 4, value: 'Company D', label: 'Company D' },
  // ]);
  // const [departments, setDepartments] = useState([]);
  // const [interviewers, setInterviewers] = useState([]);
  // const [status, setStatus] = useState([]);
  // const [vacancies, setVacancies] = useState([]);

  const fetchLookups = async () => {
    await axiosInstance
      .get("/recruitment/organization/companies")
      .then((response) => {
        const map = response.data.items.map((item: any) => {
          return {
            id: item.id,
            value: item.name,
            label: item.name,
          }
        });
        setCompanies(map)
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;
        console.error(message)
      });

    await axiosInstance
      .get("/recruitment/organization/departments")
      .then((response) => {
        const map = response.data.items.map((item: any) => {
          return {
            id: item.id,
            value: item.name,
            label: item.name,
          }
        });
        setDepartments(map)
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;
        console.error(message)
      });

    await axiosInstance
      .get("/recruitment/hiring/interviewers")
      .then((response) => {
        const map = response.data.items.map((item: any) => {
          return {
            id: item.id,
            value: item.name,
            label: item.name,
          }
        });
        setInterviewers(map)
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;
        console.error(message)
      });

    await axiosInstance
      .get("/general/vacancy-status")
      .then((response) => {
        const map = response.data.items.map((item: any) => {
          return {
            id: item.id,
            value: item.name,
            label: item.name,
          }
        });
        setStatus(map)
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;
        console.error(message)
      });

    await axiosInstance
      .get("/recruitment/vacancies")
      .then((response) => {
        const map = response.data.items.map((item: any) => {
          return {
            id: item.id,
            value: item.position,
            label: item.position,
          }
        });
        const uniqueMap = map.filter((item: any, index: any, self: any) =>
          index === self.findIndex((t: any) => t.value === item.value)
        );
        setVacancies(uniqueMap)
      })
      .catch((error) => {
        const message = error.response.data.errors[0].message;
        console.error(message)
      });

  };

  useEffect(() => {
    fetchLookups()
  }, [])

  useEffect(() => {
    console.log('filter: ', filter)
  }, [filter])

  const clear = () => {
    setFilter(cleanFilterVal)
    setIsFiltered(false)
  }

  useEffect(() => {
    const formatDate = (date: Date) => {
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const yyyy = date.getFullYear();
      return `${mm}${dd}${yyyy}`;
    };

    const updatedFilter = { ...filter };

    if (value[0] != null) {
      updatedFilter.dateFrom = formatDate(value[0]);
    }

    if (value[1] != null) {
      updatedFilter.dateTo = formatDate(value[1]);
    }

    setFilter(updatedFilter);
  }, [value]);

  useEffect(() => {
    clear()
    return (
      setClearFilter(false)
    )
  }, [clearFilter])

  const drawerFilterSize = useMatches({
    base: "100%",
    xs: "30.8%",
    sm: "22.8%",
    md: "18.8%",
    lg: "18.8%",
    xl: "16.8%",
  });

  const buttonSize = useMatches({
    base: "xs",
    xl: "sm",
  });

  // const gapValue = useMatches({
  //   base: 2,
  //   xl: 4,
  // });

  const inputSize = useMatches({
    base: 'xs',
    xl: 'md',
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
      <div className="w-full h-full flex flex-col justify-between text-[#6D6D6D]">
        <div className="flex flex-col gap-2 2xl:gap-4">

          <Flex className="w-full" direction="column" gap={10}>
            <Flex direction="row" justify="space-between">
              <Text fw={600} fz={22} c="#559CDA">
                Filter By
              </Text>
              <IconX
                className="cursor-pointer"
                onClick={() => setFilterDrawer(false)}
                size={25}
                color="gray"
              />
            </Flex>
            <Divider size={2} color="#c9cac9" className="w-full" />
          </Flex>

          <MultiSelect
            value={filter.company}
            size={inputSize}
            label="Company"
            placeholder={filter.company.length > 0 ? '' : "Company"}
            radius={8}
            data={companies}
            rightSection={<IconCaretDownFilled size='18' />}
            className="border-none w-full text-sm"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, company: value })}
          />
          <MultiSelect
            searchable
            value={filter.vacancy}
            size={inputSize}
            label="Vacancy"
            placeholder={filter.vacancy.length > 0 ? '' : "Vacancy"}
            radius={8}
            data={vacancies}
            rightSection={<IconCaretDownFilled size='18' />}
            className="border-none w-full text-sm"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, vacancy: value })}
          />
          <Divider size={0.5} color="#edeeed" className="w-full" />
          <p className="text-[#6d6d6d]">Published Date Range</p>
          <DateRange
            gapValue={12}
            size="md"
            value={value}
            setValue={setValue}
            fLabel="From"
            lLabel="To"
            fPlaceholder="Start Date"
            lPlaceholder="End Date"
            isColumn
          />

          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            value={filter.department}
            size={inputSize}
            placeholder={filter.department.length > 0 ? "" : "Department"}
            label="Department"
            radius={8}
            data={departments}
            rightSection={<IconCaretDownFilled size='18' />}
            className="border-none w-full text-sm"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, department: value })}
          />

          <Divider size={0.5} color="#edeeed" className="w-full" />
          <MultiSelect
            value={filter.status}
            size={inputSize}
            placeholder={filter.status.length > 0 ? "" : "Select Status"}
            label="Status"
            radius={8}
            data={status}
            rightSection={<IconCaretDownFilled size='18' />}
            className="border-none w-full"
            styles={{ label: { color: "#6d6d6d" } }}
            onChange={(value) => setFilter({ ...filter, status: value })}
          />

        </div>


        <Flex className="w-full " justify="flex-end" gap={10} >
          <Button
            onClick={clear}
            variant="outline"
            size={buttonSize}
            radius={10}
            w={100}
            children={<Text fw={500} className="text-sm">CLEAR</Text>}
          />
          <Button
            onClick={() => {
              setIsFiltered(true);
              setFilterDrawer(false);
              // queryClient.refetchQueries({ queryKey: ["recruitment/vacancies"], type: 'active' });
            }}
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
