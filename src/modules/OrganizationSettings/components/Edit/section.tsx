import { Select, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleMinus } from "@tabler/icons-react";
import { OrganizationSettingsStore } from "../../store";
import { SectionType } from "../../assets/Types";
import { useForm } from "@mantine/form";
import { useFetchOrganization } from "../../services/data";
import { useEffect } from "react";

type EditSectionProps = {
  code: string;
  name: string;
  isActive: boolean;
  description: string;
  division: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
  id: number;
  guid: string;
};

export default function EditSection({ record }: { record: SectionType }) {
  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);
  const editSection = useForm<EditSectionProps>({
    initialValues: {
      code: record.code ?? 0,
      name: record.name ?? "",
      isActive: record.isActive ?? true,
      description: record.description ?? "",
      division: {
        id: record.division.id ?? 0,
        name: record.division.name ?? "",
      },
      department: {
        id: record.department.id ?? 0,
        name: record.department.name ?? "",
      },
      id: record.id,
      guid: record.guid,
    },
  });

  const { useDivisions, useDepartments } = useFetchOrganization();

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("editSection", editSection.values);
  }, [editSection.values]);

  return (
    <div className="flex gap-2 relative bg-[#DEECFF] ">
      <TextInput
        className="w-[10%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.code}
        {...editSection.getInputProps("code")}
        error={editSection.values.code === "" ? "Required" : undefined}
      />
      <TextInput
        className="w-[20%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.name}
        {...editSection.getInputProps("name")}
        error={editSection.values.name === "" ? "Required" : undefined}
      />
      <Select
        radius={8}
        data={useDivisions().data?.items.map((division: any) => ({
          value: String(division.id),
          label: division.name,
        }))}
        rightSection={<IconCaretDownFilled size="18" />}
        className="border-none text-sm w-[20%]"
        classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
        styles={{ label: { color: "#6d6d6d" } }}
        placeholder="Select Division"
        value={String(editSection.values.division.id)}
        onChange={(value) => {
          const selectedItem: { id: number; name: string } = useDivisions().data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
          if (selectedItem) {
            editSection.setFieldValue("division.id", selectedItem.id);
            editSection.setFieldValue("division.name", selectedItem.name);
          }
        }}
      />
      <Select
        radius={8}
        data={useDepartments().data?.items.map((department: any) => ({
          value: String(department.id),
          label: department.name,
        }))}
        rightSection={<IconCaretDownFilled size="18" />}
        className="border-none text-sm w-[20%]"
        classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
        styles={{ label: { color: "#6d6d6d" } }}
        placeholder="Select Department"
        value={String(editSection.values.department.id)}
        onChange={(value) => {
          const selectedItem: { id: number; name: string } = useDepartments().data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
          if (selectedItem) {
            editSection.setFieldValue("department.id", selectedItem.id);
            editSection.setFieldValue("department.name", selectedItem.name);
          }
        }}
      />
      <TextInput className="w-[20%]" classNames={{ input: "poppins text-[#6D6D6D]" }} defaultValue={record.description} {...editSection.getInputProps("description")} />
      <div className="w-[10%] flex flex-row items-center gap-10">
        <Select
          radius={8}
          data={["Active", "Inactive"]}
          rightSection={<IconCaretDownFilled size="18" />}
          className="border-none text-sm w-full"
          classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
          styles={{ label: { color: "#6d6d6d" } }}
          {...editSection.getInputProps("isActive")}
          error={editSection.values.isActive === null ? "Required" : undefined}
          value={editSection.values.isActive ? "Active" : "Inactive"}
          onChange={(value) => {
            editSection.setFieldValue("isActive", value === "Active");
          }}
        />
        <IconCircleMinus className="cursor-pointer hover:scale-125" onClick={resetExpandedRows} />
      </div>
    </div>
  );
}
