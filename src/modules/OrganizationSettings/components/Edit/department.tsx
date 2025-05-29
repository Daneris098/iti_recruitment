import { DepartmentType } from "../../assets/Types";
import { Select, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleMinus } from "@tabler/icons-react";
import { OrganizationSettingsStore } from "../../store";
import { useForm } from "@mantine/form";
import { useFetchOrganizationSettings } from "../../services/data";
import { useEffect } from "react";

type EditDepartmentProps = {
  code: string;
  name: string;
  isActive: boolean;
  description: string;
  division: {
    id: number;
    name: string;
  };
  head: string;
  guid: string;
  id: number;
};
export default function EditDepartment({ record }: { record: DepartmentType }) {
  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);

  const editDepartment = useForm<EditDepartmentProps>({
    initialValues: {
      code: record.code ?? 0,
      name: record.name ?? "",
      isActive: record.isActive ?? true,
      description: record.description ?? "",
      division: {
        id: record.division.id ?? 0,
        name: record.division.name ?? "",
      },
      head: record.head ?? "",
      guid: record.guid,
      id: record.id,
    },
  });

  const { divisions } = useFetchOrganizationSettings();

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("editDepartment", editDepartment.values);
  }, [editDepartment.values]);

  return (
    <div className="flex gap-2 relative bg-[#DEECFF] ">
      <TextInput
        className="w-[10%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.code}
        {...editDepartment.getInputProps("code")}
        error={editDepartment.values.code === "" ? "Required" : undefined}
      />
      <TextInput
        className="w-[20%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.name}
        {...editDepartment.getInputProps("name")}
        error={editDepartment.values.name === "" ? "Required" : undefined}
      />
      <TextInput
        className="w-[15%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.head}
        {...editDepartment.getInputProps("head")}
        error={editDepartment.values.head === "" ? "Required" : undefined}
      />
      <Select
        radius={8}
        data={divisions.data?.items.map((division: any) => ({
          value: String(division.id),
          label: division.name,
        }))}
        rightSection={<IconCaretDownFilled size="18" />}
        className="w-[15%] border-none text-sm"
        classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
        styles={{ label: { color: "#6d6d6d" } }}
        placeholder="Select Area"
        defaultValue={String(editDepartment.values.division.id)}
        onChange={(value) => {
          const selectedItem = divisions.data?.items.find((item) => item.id.toString() === value);
          if (selectedItem) {
            editDepartment.setFieldValue("division.id", selectedItem.id);
            editDepartment.setFieldValue("division.name", selectedItem.name);
          }
        }}
      />
      <TextInput className="w-[30%]" classNames={{ input: "poppins text-[#6D6D6D]" }} defaultValue={record.description} {...editDepartment.getInputProps("description")} />
      <div className="w-[10%] flex flex-row items-center gap-10">
        <Select
          radius={8}
          data={["Active", "Inactive"]}
          rightSection={<IconCaretDownFilled size="18" />}
          className="border-none text-sm w-full"
          classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
          styles={{ label: { color: "#6d6d6d" } }}
          error={editDepartment.values.isActive === null ? "Required" : undefined}
          value={editDepartment.values.isActive ? "Active" : "Inactive"}
          onChange={(value) => {
            editDepartment.setFieldValue("isActive", value === "Active");
          }}
        />
        <IconCircleMinus className="cursor-pointer hover:scale-125" onClick={resetExpandedRows} />
      </div>
    </div>
  );
}
