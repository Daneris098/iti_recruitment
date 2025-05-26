import { DataTableColumn } from "mantine-datatable";
import { BranchType } from "../../assets/Types";
import { Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { OrganizationSettingsStore } from "../../store";
import { useEffect } from "react";
import { IconCaretDownFilled, IconCircleMinus, IconPencil } from "@tabler/icons-react";
import { useFetchOrganizationSettings } from "../../services/data";
type AddBranchProps = {
  code: string;
  name: string;
  isActive: boolean;
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
export default function AddBranch(addOrg: boolean): DataTableColumn<BranchType>[] {
  const { setAddOrg, setNewRows, expandedIds } = OrganizationSettingsStore();
  const toggleExpand = OrganizationSettingsStore((state) => state.toggleExpand);

  const addBranch = useForm<AddBranchProps>({
    initialValues: {
      code: "B-1",
      name: "Branch 1",
      isActive: true,
      description: "Branch Description",
      location: {
        id: 0,
        name: "",
      },
      area: {
        id: 0,
        name: "",
      },
    },
  });

  const { locations, areas } = useFetchOrganizationSettings();

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("addBranch", addBranch.values);
  }, [addBranch.values]);

  const closeAddRow = () => {
    setAddOrg(false);
    setNewRows([]);
  };

  return [
    {
      accessor: "code",
      title: <div className="flex flex-row gap-3">Code {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      width: "10%",
      sortable: true,
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Code"
              {...addBranch.getInputProps("code")}
              error={addBranch.values.code === "" ? "Required" : undefined}
            />
          );
        }

        return row.code;
      },
    },
    {
      accessor: "name",
      title: <div className="flex flex-row gap-3">Name {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "25%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Name"
              {...addBranch.getInputProps("name")}
              error={addBranch.values.name === "" ? "Required" : undefined}
            />
          );
        }

        return row.name;
      },
    },
    {
      accessor: "location",
      title: <div className="flex flex-row gap-3">Location {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "15%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <Select
              radius={8}
              data={locations.data?.items.map((division: any) => ({
                value: String(division.id),
                label: division.name,
              }))}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none text-sm w-full"
              classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
              styles={{ label: { color: "#6d6d6d" } }}
              placeholder="Select Location"
              onChange={(value) => {
                const selectedItem = locations.data?.items.find((item) => item.id.toString() === value);
                if (selectedItem) {
                  addBranch.setFieldValue("location.id", selectedItem.id);
                  addBranch.setFieldValue("location.name", selectedItem.name);
                }
              }}
            />
          );
        }

        return row.location.name;
      },
    },
    {
      accessor: "area",
      title: <div className="flex flex-row gap-3">Area {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "15%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <Select
              radius={8}
              data={areas.data?.items.map((area: any) => ({
                value: String(area.id),
                label: area.name,
              }))}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none text-sm w-full"
              classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
              styles={{ label: { color: "#6d6d6d" } }}
              placeholder="Select Area"
              onChange={(value) => {
                const selectedItem = areas.data?.items.find((item) => item.id.toString() === value);
                if (selectedItem) {
                  addBranch.setFieldValue("area.id", selectedItem.id);
                  addBranch.setFieldValue("area.name", selectedItem.name);
                }
              }}
            />
          );
        }

        return row.area.name;
      },
    },
    {
      accessor: "description",
      title: "Description",
      sortable: true,
      width: "25%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Description"
              {...addBranch.getInputProps("description")}
              error={addBranch.values.description === "" ? "Required" : undefined}
            />
          );
        }

        return row.description;
      },
    },
    {
      accessor: "isActive",
      title: "Status",
      sortable: true,
      width: "10%",
      render: (row: any) =>
        row.id === "NEW" && addOrg ? (
          <div className="flex flex-row items-center justify-between gap-5">
            <Select
              radius={8}
              data={["Active", "Inactive"]}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none text-sm w-full"
              classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
              styles={{ label: { color: "#6d6d6d" } }}
              {...addBranch.getInputProps("isActive")}
              error={addBranch.values.isActive === null ? "Required" : undefined}
              value={addBranch.values.isActive ? "Active" : "Inactive"}
              onChange={(value) => {
                addBranch.setFieldValue("isActive", value === "Active");
              }}
            />
            <IconCircleMinus className="cursor-pointer" onClick={closeAddRow} />
          </div>
        ) : (
          <div className="flex justify-between">
            <p>{row.isActive ? "Active" : "Inactive"}</p>
            <IconPencil className="cursor-pointer" onClick={() => toggleExpand(row.id)} />
          </div>
        ),
    },
  ];
}
