import { DataTableColumn } from "mantine-datatable";
import { SectionType } from "../../assets/Types";
import { Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { OrganizationSettingsStore } from "../../store";
import { useEffect } from "react";
import { IconCaretDownFilled, IconCircleMinus, IconPencil } from "@tabler/icons-react";
import { useFetchOrganizationSettings } from "../../services/data";
type AddSectionProps = {
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
};
export default function AddSection(addOrg: boolean): DataTableColumn<SectionType>[] {
  const { setAddOrg, setNewRows, expandedIds } = OrganizationSettingsStore();
  const toggleExpand = OrganizationSettingsStore((state) => state.toggleExpand);
  const addSection = useForm<AddSectionProps>({
    initialValues: {
      code: "",
      name: "",
      isActive: true,
      description: "",
      division: {
        id: 0,
        name: "",
      },
      department: {
        id: 0,
        name: "",
      },
    },
  });

  const { divisions, departments } = useFetchOrganizationSettings();

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("addSection", addSection.values);
  }, [addSection.values]);

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
            <div className="relative">
              <TextInput
                classNames={{ input: "poppins text-[#6D6D6D]" }}
                placeholder="Code"
                {...addSection.getInputProps("code")}
                error={addSection.values.code === "" ? "Code is required" : null}
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
      sortable: true,
      width: "20%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <TextInput
                classNames={{ input: "poppins text-[#6D6D6D]" }}
                {...addSection.getInputProps("name")}
                placeholder="Name"
                error={addSection.values.name === "" ? "Name is required" : null}
              />
            </div>
          );
        }

        return row.name;
      },
    },
    {
      accessor: "division",
      title: <div className="flex flex-row gap-3">Division {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "20%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
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
                error={addSection.values.division.name === "" ? "Division is required" : null}
                onChange={(value) => {
                  const selectedItem: { id: number; name: string } = divisions.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
                  if (selectedItem) {
                    addSection.setFieldValue("division.id", selectedItem.id);
                    addSection.setFieldValue("division.name", selectedItem.name);
                  }
                }}
              />
            </div>
          );
        }

        return row.division.name;
      },
    },
    {
      accessor: "department",
      title: <div className="flex flex-row gap-3">Department {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "20%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <Select
                radius={8}
                data={departments.data?.items.map((division: any) => ({
                  value: String(division.id),
                  label: division.name,
                }))}
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none text-sm w-full"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                placeholder="Select Division"
                error={addSection.values.department.name === "" ? "Department is required" : null}
                onChange={(value) => {
                  const selectedItem: { id: number; name: string } = departments.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
                  if (selectedItem) {
                    addSection.setFieldValue("department.id", selectedItem.id);
                    addSection.setFieldValue("department.name", selectedItem.name);
                  }
                }}
              />
            </div>
          );
        }

        return row.department.name;
      },
    },
    {
      accessor: "description",
      title: "Description",
      sortable: true,
      width: "20%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <TextInput classNames={{ input: "poppins text-[#6D6D6D]" }} placeholder="Description" {...addSection.getInputProps("description")} />
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
      width: "25%",
      render: (row: any) =>
        row.id === "NEW" && addOrg ? (
          <div className="flex flex-row items-center justify-between gap-5">
            <Select
              radius={8}
              data={[
                { value: String(1), label: "Active" },
                { value: String(0), label: "Inactive" },
              ]}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none text-sm w-full"
              classNames={{ label: "p-1", input: "poppins text-[#6D6Ddepartments6D]" }}
              styles={{ label: { color: "#6d6d6d" } }}
              defaultValue={row.isActive ? "Inactive" : "Active"}
              onChange={(value) => {
                if (value === "Active") addSection.setFieldValue("isActive", true);
                else addSection.setFieldValue("isActive", false);
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
