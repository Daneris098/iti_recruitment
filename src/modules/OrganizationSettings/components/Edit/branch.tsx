import { Select, TextInput } from "@mantine/core";
import { BranchType } from "../../assets/Types";
import { IconCaretDownFilled, IconCircleMinus } from "@tabler/icons-react";
import { OrganizationSettingsStore } from "../../store";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useFetchOrganizationSettings } from "../../services/data";

type EditBranchProps = {
  code: string;
  name: string;
  isActive: boolean;
  id: number;
  guid: string;
  description: string;
  company: {
    id: number;
    name: string;
  };
  location: string;
  area: string;
};

export default function EditBranch({ record }: { record: BranchType }) {
  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);

  const editBranch = useForm<EditBranchProps>({
    initialValues: {
      code: record.code ?? "",
      name: record.name ?? "",
      isActive: record.isActive ?? true,
      description: record.description ?? "",
      company: {
        id: record.company?.id ?? 0,
        name: record.company?.name ?? "",
      },
      location: record.location ?? "",
      area: record.area ?? "",
      id: record.id,
      guid: record.guid,
    },
  });

  const { companies } = useFetchOrganizationSettings();

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("editBranch", editBranch.values);
  }, [editBranch.values]);

  return (
    <form>
      <div className="flex gap-2 relative bg-[#DEECFF] ">
        <TextInput
          className="w-[10%]"
          classNames={{ input: "poppins text-[#6D6D6D]" }}
          defaultValue={record.code}
          {...editBranch.getInputProps("code")}
          error={editBranch.values.code === "" ? "Required" : undefined}
        />
        <TextInput
          className="w-[25%]"
          classNames={{ input: "poppins text-[#6D6D6D]" }}
          defaultValue={record.name}
          {...editBranch.getInputProps("name")}
          error={editBranch.values.name === "" ? "Required" : undefined}
        />
        <Select
          radius={8}
          data={companies.data?.items.map((items: any) => ({
            value: String(items.id),
            label: items.name,
          }))}
          rightSection={<IconCaretDownFilled size="18" />}
          className="w-[15%] border-none text-sm"
          classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
          styles={{ label: { color: "#6d6d6d" } }}
          placeholder="Select Company"
          value={String(editBranch.values.company.id)}
          onChange={(value) => {
            const selectedItem: { id: number; name: string } = companies.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
            if (selectedItem) {
              editBranch.setFieldValue("company.id", selectedItem.id);
              editBranch.setFieldValue("company.name", selectedItem.name);
            }
          }}
        />
        <TextInput
          className="w-[15%]"
          classNames={{ input: "poppins text-[#6D6D6D]" }}
          defaultValue={record.location}
          {...editBranch.getInputProps("location")}
          error={editBranch.values.location === "" ? "Required" : undefined}
        />
        <TextInput
          className="w-[15%]"
          classNames={{ input: "poppins text-[#6D6D6D]" }}
          defaultValue={record.area}
          {...editBranch.getInputProps("area")}
          error={editBranch.values.area === "" ? "Required" : undefined}
        />
        <TextInput className="w-[25%]" classNames={{ input: "poppins text-[#6D6D6D]" }} defaultValue={record.description} {...editBranch.getInputProps("description")} />
        <div className="w-[10%] flex flex-row items-center gap-10">
          <Select
            radius={8}
            data={["Active", "Inactive"]}
            rightSection={<IconCaretDownFilled size="18" />}
            className="border-none text-sm w-full"
            classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
            styles={{ label: { color: "#6d6d6d" } }}
            {...editBranch.getInputProps("isActive")}
            error={editBranch.values.isActive === null ? "Required" : undefined}
            value={editBranch.values.isActive ? "Active" : "Inactive"}
            onChange={(value) => {
              editBranch.setFieldValue("isActive", value === "Active");
            }}
          />
          <IconCircleMinus className="cursor-pointer hover:scale-125" onClick={resetExpandedRows} />
        </div>
      </div>
    </form>
  );
}
