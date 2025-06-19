import { Select } from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { DateRange } from "@modules/Reports/components/DateRange";
import { useDateRangeStore } from "@shared/hooks/useDateRange";
import { useForm } from "@mantine/form";
import { useFetchReport } from "../services/data";
import { useEffect } from "react";
import { ReportStore } from "../../store";
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
  const { value, setValue } = useDateRangeStore();
  const form = useForm<ActivityReportParams>({
    initialValues: {
      companyId: 0,
      departmentId: 0,
      vacancyId: 0,
      dateFrom: value[0] ?? null,
      dateTo: value[1] ?? null,
      printedBy: 1,
    },
  });

  const { companies, departments, vacancies } = useFetchReport();

  useEffect(() => {
    ReportStore.getState().updateForm("applicantStatusReport", {
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
      <DateRange
        gapValue={20}
        size="md"
        value={value}
        setValue={setValue}
        fLabel="Date Range From"
        lLabel="Date Range to"
        fPlaceholder="Select Start Date"
        lPlaceholder="Select End Date"
      />
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
            const selectedItem: { id: number; name: string } = vacancies!.data?.items.find((item: any) => item.id.toString()! === value) as { id: number; name: string };
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
