import { Select, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleMinus } from "@tabler/icons-react";
import { OrganizationSettingsStore } from "../../store";
import { PositionType } from "../../assets/Types";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

type EditDivisionProps = {
  code: string;
  name: string;
  isActive: boolean;
  id: number;
  guid: string;
  description: string;
};
export default function EditPosition({ record }: { record: PositionType }) {
  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);
  const editPosition = useForm<EditDivisionProps>({
    initialValues: {
      code: record.code ?? 0,
      name: record.name ?? "",
      isActive: record.isActive ?? true,
      id: record.id,
      guid: record.guid,
      description: record.description,
    },
  });

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("editPosition", editPosition.values);
  }, [editPosition.values]);
  return (
    <div className="flex gap-2 relative bg-[#DEECFF] ">
      <TextInput
        className="w-[10%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.code}
        {...editPosition.getInputProps("code")}
        error={editPosition.values.code === "" ? "Required" : undefined}
      />
      <TextInput
        className="w-[30%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.name}
        {...editPosition.getInputProps("name")}
        error={editPosition.values.name === "" ? "Required" : undefined}
      />
      <TextInput
        className="w-[50%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.description}
        {...editPosition.getInputProps("description")}
        error={editPosition.values.description === "" ? "Required" : undefined}
      />
      <div className="w-[10%] flex flex-row items-center gap-10">
        <Select
          radius={8}
          data={["Active", "Inactive"]}
          rightSection={<IconCaretDownFilled size="18" />}
          className="border-none text-sm w-full"
          classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
          styles={{ label: { color: "#6d6d6d" } }}
          {...editPosition.getInputProps("isActive")}
          error={editPosition.values.isActive === null ? "Required" : undefined}
          value={editPosition.values.isActive ? "Active" : "Inactive"}
          onChange={(value) => {
            editPosition.setFieldValue("isActive", value === "Active");
          }}
        />
        <IconCircleMinus className="cursor-pointer hover:scale-125" onClick={resetExpandedRows} />
      </div>
    </div>
  );
}
