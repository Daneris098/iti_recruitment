import { DataTableColumn } from "mantine-datatable";
import { DivisionType } from "../../assets/Types";
import { Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { OrganizationSettingsStore } from "../../store";
import { useEffect } from "react";
import { IconCaretDownFilled, IconCircleMinus, IconPencil } from "@tabler/icons-react";
type AddDivisionProps = {
  code: string;
  name: string;
  isActive: boolean;
  description: string;
};
export default function AddDivision(addOrg: boolean): DataTableColumn<DivisionType>[] {
  const { setAddOrg, setNewRows, expandedIds } = OrganizationSettingsStore();
  const toggleExpand = OrganizationSettingsStore((state) => state.toggleExpand);
  const addDivision = useForm<AddDivisionProps>({
    initialValues: { code: "D-1", name: "Division 1", isActive: true, description: "Division 1 Description" },
  });

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
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Code"
              {...addDivision.getInputProps("code")}
              error={addDivision.values.code === "" ? "Required" : undefined}
            />
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
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Name"
              {...addDivision.getInputProps("name")}
              error={addDivision.values.code === "" ? "Required" : undefined}
            />
          );
        }
        return row.name;
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
            <TextInput
              classNames={{ input: "poppins text-[#6D6D6D]" }}
              placeholder="Name"
              {...addDivision.getInputProps("description")}
              error={addDivision.values.code === "" ? "Required" : undefined}
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
              {...addDivision.getInputProps("isActive")}
              error={addDivision.values.isActive === null ? "Required" : undefined}
              value={addDivision.values.isActive ? "Active" : "Inactive"}
              onChange={(value) => {
                if (value === "Active") {
                  addDivision.setFieldValue("isActive", true);
                } else {
                  addDivision.setFieldValue("isActive", false);
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
