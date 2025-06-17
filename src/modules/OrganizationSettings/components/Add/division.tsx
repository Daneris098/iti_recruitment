import { DataTableColumn } from "mantine-datatable";
import { DivisionType } from "../../assets/Types";
import { Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { OrganizationSettingsStore } from "../../store";
import { useEffect } from "react";
import { IconCaretDownFilled, IconCircleMinus, IconPencil } from "@tabler/icons-react";
import { useFetchOrganizationSettings } from "../../services/data";
type AddDivisionProps = {
  code: string;
  name: string;
  isActive: boolean;
  description: string;
  branch: {
    id: number;
    name: string;
  };
};
export default function AddDivision(addOrg: boolean): DataTableColumn<DivisionType>[] {
  const { setAddOrg, setNewRows, expandedIds } = OrganizationSettingsStore();
  const toggleExpand = OrganizationSettingsStore((state) => state.toggleExpand);
  const addDivision = useForm<AddDivisionProps>({
    initialValues: { code: "", name: "", isActive: true, description: "", branch: { id: 0, name: "" } },
  });

  const { branches } = useFetchOrganizationSettings();

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("addDivision", addDivision.values);
  }, [addDivision.values]);

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
            <div className="relative">
              <TextInput
                classNames={{ input: "poppins text-[#6D6D6D]" }}
                placeholder="Code"
                {...addDivision.getInputProps("code")}
                error={addDivision.values.code === "" ? "Code is Required" : undefined}
              />
            </div>
          );
        }

        return row.code;
      },
    },
    {
      accessor: "name",
      title: <div className="flex flex-row gap-3">Name {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      width: "30%",
      sortable: true,
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <TextInput
                classNames={{ input: "poppins text-[#6D6D6D]" }}
                placeholder="Name"
                {...addDivision.getInputProps("name")}
                error={addDivision.values.name === "" ? "Name is Required" : undefined}
              />
            </div>
          );
        }
        return row.name;
      },
    },
    {
      accessor: "branch",
      title: <div className="flex flex-row gap-3">Branch {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "15%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <Select
                radius={8}
                data={branches.data?.items.map((items: any) => ({
                  value: String(items.id),
                  label: items.name,
                }))}
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none text-sm w-full"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                placeholder="Select Company"
                error={addDivision.values.branch.name === "" ? "Branch is Required" : undefined}
                onChange={(value) => {
                  const selectedItem: { id: number; name: string } = branches.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
                  if (selectedItem) {
                    addDivision.setFieldValue("branch.id", selectedItem.id);
                    addDivision.setFieldValue("branch.name", selectedItem.name);
                  }
                }}
              />
            </div>
          );
        }

        return row.branch.name;
      },
    },
    {
      accessor: "description",
      title: "Description",
      width: "50%",
      sortable: true,
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <TextInput classNames={{ input: "poppins text-[#6D6D6D]" }} placeholder="Name" {...addDivision.getInputProps("description")} />
            </div>
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
              {...addDivision.getInputProps("isActive")}
              value={addDivision.values.isActive ? "Active" : "Inactive"}
              onChange={(value) => {
                if (value === "Active") addDivision.setFieldValue("isActive", true);
                else addDivision.setFieldValue("isActive", false);
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
