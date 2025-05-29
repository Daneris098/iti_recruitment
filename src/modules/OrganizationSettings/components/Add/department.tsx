import { DataTableColumn } from "mantine-datatable";
import { DepartmentType } from "../../assets/Types";
import { Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { OrganizationSettingsStore } from "../../store";
import { useEffect } from "react";
import { IconCaretDownFilled, IconCircleMinus, IconPencil } from "@tabler/icons-react";
import { useFetchOrganizationSettings } from "../../services/data";
type AddDepartmentProps = {
  code: string;
  name: string;
  isActive: boolean;
  description: string;
  division: {
    id: number;
    name: string;
  };
  head: string;
};
export default function AddDepartment(addOrg: boolean): DataTableColumn<DepartmentType>[] {
  const { setAddOrg, setNewRows, expandedIds } = OrganizationSettingsStore();
  const toggleExpand = OrganizationSettingsStore((state) => state.toggleExpand);
  const addDepartment = useForm<AddDepartmentProps>({
    initialValues: {
      code: "D-1",
      name: "Department 1",
      isActive: true,
      description: "Department 1 Description",
      division: {
        id: 0,
        name: "",
      },
      head: "Juan Dela Cruz",
    },
  });

  const { divisions } = useFetchOrganizationSettings();

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("addDepartment", addDepartment.values);
  }, [addDepartment.values]);

  const closeAddRow = () => {
    setAddOrg(false);
    setNewRows([]);
  };

  return [
    {
      accessor: "code",
      title: <div className="flex flex-row gap-3">Code {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "10%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Code"
              {...addDepartment.getInputProps("code")}
              error={addDepartment.values.code === "" ? "Required" : undefined}
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
      width: "20%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Name"
              {...addDepartment.getInputProps("name")}
              error={addDepartment.values.name === "" ? "Required" : undefined}
            />
          );
        }

        return row.name;
      },
    },
    {
      accessor: "head",
      title: <div className="flex flex-row gap-3">Department Head {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "15%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Department Head"
              {...addDepartment.getInputProps("head")}
              error={addDepartment.values.head === "" ? "Required" : undefined}
            />
          );
        }

        return row.head;
      },
    },
    {
      accessor: "division",
      title: <div className="flex flex-row gap-3">Division {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "15%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <Select
              radius={8}
              data={divisions.data?.items.map((division: any) => ({
                value: String(division.id),
                label: division.name,
              }))}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none text-sm w-full"
              classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
              styles={{ label: { color: "#6d6d6d" } }}
              placeholder="Select Division"
              onChange={(value) => {
                const selectedItem = divisions.data?.items.find((item: any) => item.id.toString() === value);
                if (selectedItem) {
                  addDepartment.setFieldValue("division.id", selectedItem.id);
                  addDepartment.setFieldValue("division.name", selectedItem.name);
                }
              }}
            />
          );
        }

        return row.division.name;
      },
    },
    {
      accessor: "description",
      title: "Description",
      sortable: true,
      width: "30%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Description"
              {...addDepartment.getInputProps("description")}
              error={addDepartment.values.description === "" ? "Required" : undefined}
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
      width: "25%",
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
              defaultValue={row.isActive ? "Inactive" : "Active"}
              onChange={(value) => {
                if (value === "Active") {
                  addDepartment.setFieldValue("isActive", true);
                } else {
                  addDepartment.setFieldValue("isActive", false);
                }
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
