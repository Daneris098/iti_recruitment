import { Select, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleMinus } from "@tabler/icons-react";
import { OrganizationSettingsStore } from "../../store";

import { DivisionType } from "../../assets/Types";
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

export default function EditDivision({ record }: { record: DivisionType }) {
  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);
  const editDivision = useForm<EditDivisionProps>({
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
    OrganizationSettingsStore.getState().updateForm("editDivision", editDivision.values);
  }, [editDivision.values]);
  return (
    <div className="flex gap-2 relative bg-[#DEECFF] ">
      <TextInput
        className="w-[10%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.code}
        {...editDivision.getInputProps("code")}
        error={editDivision.values.code === "" ? "Required" : undefined}
      />
      <TextInput
        className="w-[30%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.name}
        {...editDivision.getInputProps("name")}
        error={editDivision.values.name === "" ? "Required" : undefined}
      />
      <TextInput
        className="w-[50%]"
        classNames={{ input: "poppins text-[#6D6D6D]" }}
        defaultValue={record.description}
        {...editDivision.getInputProps("description")}
        error={editDivision.values.description === "" ? "Required" : undefined}
      />
      <div className="w-[10%] flex flex-row items-center gap-10">
        <Select
          radius={8}
          data={["Active", "Inactive"]}
          rightSection={<IconCaretDownFilled size="18" />}
          className="border-none text-sm w-full"
          classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
          styles={{ label: { color: "#6d6d6d" } }}
          {...editDivision.getInputProps("isActive")}
          error={editDivision.values.isActive === null ? "Required" : undefined}
          value={editDivision.values.isActive ? "Active" : "Inactive"}
          onChange={(value) => {
            editDivision.setFieldValue("isActive", value === "Active");
          }}
        />
        <IconCircleMinus className="cursor-pointer hover:scale-125" onClick={resetExpandedRows} />
      </div>
    </div>
  );
}
