import { Flex, Select } from "@mantine/core";
import { IconCalendarMonth, IconCaretDownFilled } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useFetchReport } from "../services/data";
import { ReportStore } from "../../store";
import { useEffect } from "react";
import { DatePickerInput } from "@mantine/dates";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

interface ActivityReportParams {
  companyId: number;
  departmentId: number;
  vacancyId: number;
  dateFrom: number | Date | null;
  dateTo: number | Date | null;
  printedBy: number;
}

export default function index() {
  const form = useForm<ActivityReportParams>({
    initialValues: {
      companyId: 0,
      departmentId: 0,
      vacancyId: 0,
      dateFrom: null,
      dateTo: null,
      printedBy: 0,
    },
  });

  const { companies, departments, vacancies } = useFetchReport();

  useEffect(() => {
    ReportStore.getState().updateForm("activityReport", {
      ...form.values,
      dateFrom: DateTimeUtils.isoToDateDefault(String(form.values.dateFrom)),
      dateTo: DateTimeUtils.isoToDateDefault(String(form.values.dateTo)),
    });
  }, [form.values]);

  return (
    <div className="flex flex-col gap-4">
      <Select
        classNames={{ input: "poppins text-[#6D6D6D]", dropdown: "poppins text-[#6D6D6D]" }}
        radius={8}
        data={companies.data?.items.map((items: any) => ({
          value: String(items.id),
          label: items.name,
        }))}
        className="w-full text-[#6D6D6D]"
        size="md"
        label="Company"
        placeholder="Select Company"
        onChange={(value) => {
          const selectedItem: { id: number; name: string } = companies.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
          if (selectedItem) {
            form.setFieldValue("companyId", selectedItem.id);
          }
        }}
        rightSection={<IconCaretDownFilled size="18" />}
      />
      <Flex direction="row" justify="space-between" gap={12} className="w-full items-end">
        <DatePickerInput
          label="Date Range From"
          placeholder="Date Range From"
          className="w-full text-[#6D6D6D]"
          size="md"
          {...form.getInputProps("dateFrom")}
          key={form.key("dateFrom")}
          onChange={(e) => {
            form.setFieldValue("dateFrom", e);
          }}
          radius={8}
          rightSection={<IconCalendarMonth className="cursor-pointer" />}
          classNames={{ input: "poppins text-[#6D6D6D]" }}
        />
        <DatePickerInput
          label="Date Range To"
          placeholder="Date Range To"
          className="w-full text-[#6D6D6D]"
          size="md"
          {...form.getInputProps("dateTo")}
          key={form.key("dateTo")}
          onChange={(e) => {
            form.setFieldValue("dateTo", e);
          }}
          radius={8}
          rightSection={<IconCalendarMonth className="cursor-pointer" />}
          classNames={{ input: "poppins text-[#6D6D6D]" }}
        />
      </Flex>

      <div className="flex gap-6">
        <Select
          classNames={{ input: "poppins text-[#6D6D6D]", dropdown: "poppins text-[#6D6D6D]" }}
          radius={8}
          data={departments.data?.items.map((items: any) => ({
            value: String(items.id),
            label: items.name,
          }))}
          className="w-full text-[#6D6D6D]"
          size="md"
          label="Department"
          placeholder="Specify Department"
          onChange={(value) => {
            const selectedItem: { id: number; name: string } = departments.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
            if (selectedItem) {
              form.setFieldValue("departmentId", selectedItem.id);
            }
          }}
          rightSection={<IconCaretDownFilled size="18" />}
        />
        <Select
          classNames={{ input: "poppins text-[#6D6D6D]", dropdown: "poppins text-[#6D6D6D]" }}
          radius={8}
          data={vacancies!.data?.items.map((items: any) => ({
            value: String(items.id),
            label: items.position,
          }))}
          className="w-full text-[#6D6D6D]"
          size="md"
          label="Position"
          placeholder="Specify Position"
          onChange={(value) => {
            const selectedItem: { id: number; name: string } = vacancies!.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
            if (selectedItem) {
              form.setFieldValue("vacancyId", selectedItem.id);
            }
          }}
          rightSection={<IconCaretDownFilled size="18" />}
        />
      </div>
    </div>
  );
}
