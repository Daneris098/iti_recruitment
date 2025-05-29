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
  location: {
    id: number;
    name: string;
  };
  area: {
    id: number;
    name: string;
  };
};

export default function EditBranch({ record }: { record: BranchType }) {
  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);

  const editBranch = useForm<EditBranchProps>({
    initialValues: {
      code: record.code ?? "",
      name: record.name ?? "",
      isActive: record.isActive ?? true,
      description: record.description ?? "",
      location: {
        id: record.location?.id ?? 0,
        name: record.location?.name ?? "",
      },
      area: {
        id: record.area?.id ?? 0,
        name: record.area?.name ?? "",
      },
      id: record.id,
      guid: record.guid,
    },
  });

  const { locations, areas } = useFetchOrganizationSettings();

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
          data={locations.data?.items.map((location: any) => ({
            value: String(location.id),
            label: location.name,
          }))}
          rightSection={<IconCaretDownFilled size="18" />}
          className="w-[15%] border-none text-sm"
          classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
          styles={{ label: { color: "#6d6d6d" } }}
          placeholder="Select Location"
          value={String(editBranch.values.location.id)}
          onChange={(value) => {
            const selectedItem: { id: number; name: string } = locations.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
            if (selectedItem) {
              editBranch.setFieldValue("location.id", selectedItem.id);
              editBranch.setFieldValue("location.name", selectedItem.name);
            }
          }}
        />
        <Select
          radius={8}
          data={areas.data?.items.map((area: any) => ({
            value: String(area.id),
            label: area.name,
          }))}
          rightSection={<IconCaretDownFilled size="18" />}
          className="w-[15%] border-none text-sm"
          classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
          styles={{ label: { color: "#6d6d6d" } }}
          placeholder="Select Area"
          value={String(editBranch.values.area.id)}
          onChange={(value) => {
            const selectedItem: { id: number; name: string } = areas.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
            if (selectedItem) {
              editBranch.setFieldValue("area.id", selectedItem.id);
              editBranch.setFieldValue("area.name", selectedItem.name);
            }
          }}
        />
        <TextInput
          className="w-[25%]"
          classNames={{ input: "poppins text-[#6D6D6D]" }}
          defaultValue={record.description}
          {...editBranch.getInputProps("description")}
          error={editBranch.values.description === "" ? "Required" : undefined}
        />
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
