import { DataTableColumn } from "mantine-datatable";
import { CompanyType } from "../../assets/Types";
import { Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { OrganizationSettingsStore } from "../../store";
import { useEffect } from "react";
import { IconCaretDownFilled, IconCircleMinus, IconPencil } from "@tabler/icons-react";
import { AlertType } from "../../assets/Enum";
type AddCompanyProps = {
  code: string;
  name: string;
  isActive: boolean;
};
export default function AddCompany(addOrg: boolean): DataTableColumn<CompanyType>[] {
  const { setAddOrg, setNewRows, expandedIds, alert } = OrganizationSettingsStore();
  const toggleExpand = OrganizationSettingsStore((state) => state.toggleExpand);
  const addCompany = useForm<AddCompanyProps>({
    initialValues: { code: "", name: "", isActive: true },
  });

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("addCompany", addCompany.values);
    if (alert === AlertType.saved) {
      addCompany.reset();
    }
  }, [addCompany.values, alert]);

  const closeAddRow = () => {
    setAddOrg(false);
    setNewRows([]);
  };

  return [
    {
      accessor: "code",
      title: <div className="flex flex-row gap-3">Code {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      width: "25%",
      sortable: true,
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <TextInput
                classNames={{ input: "poppins text-[#6D6D6D]" }}
                placeholder="Code"
                {...addCompany.getInputProps("code")}
                error={addCompany.values.code === "" ? "Code is Required" : undefined}
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
      width: "50%",
      sortable: true,
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <TextInput
                classNames={{ input: "poppins text-[#6D6D6D]" }}
                placeholder="Name"
                {...addCompany.getInputProps("name")}
                error={addCompany.values.name === "" ? "Name is Required" : undefined}
              />
            </div>
          );
        }
        return row.name;
      },
    },
    {
      accessor: "isActive",
      title: "Status",
      sortable: true,
      width: "25%",
      render: (row: any) =>
        row.id === "NEW" && addOrg ? (
          <div className="flex flex-row items-center justify-between gap-5 ">
            <Select
              radius={8}
              data={["Active", "Inactive"]}
              rightSection={<IconCaretDownFilled size="18" />}
              className="border-none text-sm w-full"
              classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
              styles={{ label: { color: "#6d6d6d" } }}
              {...addCompany.getInputProps("isActive")}
              value={addCompany.values.isActive ? "Active" : "Inactive"}
              onChange={(value) => {
                addCompany.setFieldValue("isActive", value === "Active");
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
