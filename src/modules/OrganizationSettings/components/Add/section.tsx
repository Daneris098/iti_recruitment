import { DataTableColumn } from "mantine-datatable";
import { SectionType } from "../../assets/Types";
import { Select, TextInput } from "@mantine/core";
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
  const { setAddOrg, setNewRows } = OrganizationSettingsStore();
  const toggleExpand = OrganizationSettingsStore((state) => state.toggleExpand);
  const addSection = useForm<AddSectionProps>({
    initialValues: {
      code: "S-1",
      name: "Section 1",
      isActive: true,
      description: "Section 1 Description",
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
      title: "Code",
      sortable: true,
      width: "10%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Code"
              {...addSection.getInputProps("code")}
              error={addSection.values.code === "" ? "Required" : undefined}
            />
          );
        }

        return row.code;
      },
    },
    {
      accessor: "name",
      title: "Name",
      sortable: true,
      width: "20%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Name"
              {...addSection.getInputProps("name")}
              error={addSection.values.name === "" ? "Required" : undefined}
            />
          );
        }

        return row.name;
      },
    },
    {
      accessor: "division",
      title: "Division",
      sortable: true,
      width: "20%",
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
                const selectedItem = divisions.data?.items.find((item) => item.id.toString() === value);
                if (selectedItem) {
                  addSection.setFieldValue("division.id", selectedItem.id);
                  addSection.setFieldValue("division.name", selectedItem.name);
                }
              }}
            />
          );
        }

        return row.division.name;
      },
    },
    {
      accessor: "department",
      title: "Department",
      sortable: true,
      width: "20%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
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
              onChange={(value) => {
                const selectedItem = departments.data?.items.find((item) => item.id.toString() === value);
                if (selectedItem) {
                  addSection.setFieldValue("department.id", selectedItem.id);
                  addSection.setFieldValue("department.name", selectedItem.name);
                }
              }}
            />
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
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Description"
              {...addSection.getInputProps("description")}
              error={addSection.values.description === "" ? "Required" : undefined}
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
              classNames={{ label: "p-1", input: "poppins text-[#6D6Ddepartments6D]" }}
              styles={{ label: { color: "#6d6d6d" } }}
              defaultValue={row.isActive ? "Inactive" : "Active"}
              onChange={(value) => {
                if (value === "Active") {
                  addSection.setFieldValue("isActive", true);
                } else {
                  addSection.setFieldValue("isActive", false);
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
