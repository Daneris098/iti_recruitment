import { DataTableColumn } from "mantine-datatable";
import { BranchType } from "../../assets/Types";
import { Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { OrganizationSettingsStore } from "../../store";
import { useEffect } from "react";
import { IconCaretDownFilled, IconCircleMinus, IconPencil } from "@tabler/icons-react";
import { useFetchOrganizationSettings } from "../../services/data";
import { AlertType } from "../../assets/Enum";
type AddBranchProps = {
  code: string;
  name: string;
  isActive: boolean;
  description: string;
  company: {
    id: number;
    name: string;
  };
  location: string;
  area: string;
};
export default function AddBranch(addOrg: boolean): DataTableColumn<BranchType>[] {
  const { setAddOrg, setNewRows, expandedIds, alert } = OrganizationSettingsStore();
  const toggleExpand = OrganizationSettingsStore((state) => state.toggleExpand);

  const addBranch = useForm<AddBranchProps>({
    initialValues: {
      code: "",
      name: "",
      isActive: true,
      description: "",
      company: {
        id: 0,
        name: "",
      },
      location: "",
      area: "",
    },
  });

  const { companies } = useFetchOrganizationSettings();

  useEffect(() => {
    OrganizationSettingsStore.getState().updateForm("addBranch", addBranch.values);
    if (alert === AlertType.saved) {
      addBranch.reset();
    }
  }, [addBranch.values, alert]);

  const closeAddRow = () => {
    setAddOrg(false);
    setNewRows([]);
  };

  return [
    {
      accessor: "code",
      title: <div className="flex flex-row gap-3 relative">Code {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      width: "10%",
      sortable: true,
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <TextInput
                classNames={{ input: "poppins text-[#6D6D6D]", error: "relative" }}
                placeholder="Code"
                {...addBranch.getInputProps("code")}
                error={addBranch.values.code === "" ? "Code is Required" : undefined}
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
      width: "25%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <TextInput
                classNames={{ input: "poppins text-[#6D6D6D]" }}
                placeholder="Name"
                {...addBranch.getInputProps("name")}
                error={addBranch.values.name === "" ? "Name is Required" : undefined}
              />
            </div>
          );
        }

        return row.name;
      },
    },
    {
      accessor: "company",
      title: <div className="flex flex-row gap-3">Company {expandedIds.length === 1 || addOrg ? <Text color="red">*</Text> : ""}</div>,
      sortable: true,
      width: "15%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return (
            <div className="relative">
              <Select
                radius={8}
                data={companies.data?.items.map((items: any) => ({
                  value: String(items.id),
                  label: items.name,
                }))}
                rightSection={<IconCaretDownFilled size="18" />}
                className="border-none text-sm w-full"
                classNames={{ label: "p-1", input: "poppins text-[#6D6D6D]" }}
                styles={{ label: { color: "#6d6d6d" } }}
                placeholder="Select Company"
                error={addBranch.values.company.name === "" ? "Company is Required" : undefined}
                onChange={(value) => {
                  const selectedItem: { id: number; name: string } = companies.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
                  if (selectedItem) {
                    addBranch.setFieldValue("company.id", selectedItem.id);
                    addBranch.setFieldValue("company.name", selectedItem.name);
                  }
                }}
              />
            </div>
          );
        }

        return row.company.name;
      },
    },
    {
      accessor: "location",
      title: <div className="flex flex-row gap-3">Location</div>,
      sortable: true,
      width: "15%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return <TextInput classNames={{ input: "poppins text-[#6D6D6D]" }} placeholder="Location" {...addBranch.getInputProps("location")} />;
        }

        return row.location;
      },
    },
    {
      accessor: "area",
      title: <div className="flex flex-row gap-3">Area </div>,
      sortable: true,
      width: "15%",
      render: (row: any) => {
        if (row.id === "NEW" && addOrg) {
          return <TextInput classNames={{ input: "poppins text-[#6D6D6D]" }} placeholder="Area" {...addBranch.getInputProps("area")} />;
        }

        return row.area;
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
            <div className="relative">
              <TextInput classNames={{ input: "poppins text-[#6D6D6D]" }} placeholder="Description" {...addBranch.getInputProps("description")} />
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
              {...addBranch.getInputProps("isActive")}
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
