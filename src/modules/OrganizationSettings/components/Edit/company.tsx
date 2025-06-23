import { CompanyType } from "../../assets/Types";
import { Select, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleMinus } from "@tabler/icons-react";
import { OrganizationSettingsStore } from "../../store";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

type EditCompanyProps = {
  code: string;
  name: string;
  isActive: boolean;
  guid: string;
  id: number;
};

export default function EditCompany({ record }: { record: CompanyType }) {
  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);

  const editCompany = useForm<EditCompanyProps>({
    initialValues: {
      code: record.code ? record.code : "",
      name: record.name ? record.name : "",
      isActive: record.isActive ? record.isActive : true,
      guid: record.guid,
      id: record.id,
    },
  });

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("editCompany", editCompany.values);
  }, [editCompany.values]);

  return (
    <form>
      <div className="flex gap-2 relative bg-[#DEECFF] ">
        <TextInput
          className="w-[25%]"
          classNames={{ input: "poppins text-[#6D6D6D]" }}
          defaultValue={record.code}
          {...editCompany.getInputProps("code")}
          error={editCompany.values.code === "" ? "Required" : undefined}
        />
        <TextInput
          className="w-[50%]"
          classNames={{ input: "poppins text-[#6D6D6D]" }}
          defaultValue={record.name}
          {...editCompany.getInputProps("name")}
          error={editCompany.values.name === "" ? "Required" : undefined}
        />
        <div className="w-[25%] flex flex-row items-center gap-10">
          <Select
            radius={8}
            data={["Active", "Inactive"]}
            rightSection={<IconCaretDownFilled size="18" />}
            className="border-none text-sm w-full"
            classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
            styles={{ label: { color: "#6d6d6d" } }}
            {...editCompany.getInputProps("isActive")}
            error={editCompany.values.isActive === null ? "Required" : undefined}
            value={editCompany.values.isActive ? "Active" : "Inactive"}
            onChange={(value) => {
              editCompany.setFieldValue("isActive", value === "Active");
            }}
          />
          <IconCircleMinus className="cursor-pointer hover:scale-125" onClick={resetExpandedRows} />
        </div>
      </div>
    </form>
  );
}
