import { Divider, Select, TextInput } from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { AccountSetupStore } from "@modules/AccountSetup/store";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useForm } from "@mantine/form";
import { Step, AlertType } from "../types";
import { useAccountSetupAPI } from "../services";

const Organization = forwardRef((_, ref) => {
  const { accountSetupForm, activeStepper, setActiveStepper, setAlert } = AccountSetupStore();

  const formRef = useRef<HTMLFormElement>(null);

  const company = AccountSetupStore((state) => state.getForm("companySetup"));
  const division = AccountSetupStore((state) => state.getForm("divisionSetup"));
  const branch = AccountSetupStore((state) => state.getForm("branchSetup"));
  useImperativeHandle(ref, () => ({ submit }));

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      company: {
        name: company?.name ?? "C-100",
        code: company?.code ?? "Company 100",
        isActive: company?.isActive ?? true,
      },
      division: {
        name: division?.name ?? "DV-100",
        code: division?.code ?? "Division 100",
        isActive: division?.isActive ?? true,
        description: "",
      },
      branch: {
        name: branch?.name ?? "B-100",
        code: branch?.code ?? "Branch 100",
        isActive: branch?.isActive ?? true,
        description: "",
        location: { id: 0, name: "" },
        area: { id: 0, name: "" },
      },
    },
    validate: {
      company: {
        name: (value) => (value === "" ? "Company Name is required" : null),
        code: (value) => (value === "" ? "Company Code is required" : null),
      },
      division: {
        name: (value) => (value === "" ? "Division Name is required" : null),
        code: (value) => (value === "" ? "Division Code is required" : null),
      },
      branch: {
        name: (value) => (value === "" ? "Branch Name is required" : null),
        code: (value) => (value === "" ? "Branch Code is required" : null),
        location: {
          name: (value) => (value === "" ? "Branch Location is required" : null),
        },
        area: {
          name: (value) => (value === "" ? "Branch Area is required" : null),
        },
      },
    },
  });

  const submit = () => {
    formRef.current?.requestSubmit();
  };

  useEffect(() => {
    const validations = form.validate();
    console.log(validations.errors);
    console.log(form.values);
  }, [form.values]);

  const { locations, areas } = useAccountSetupAPI();

  const onSubmit = async (values: typeof form.values) => {
    const validations = form.validate();
    console.log(values);
    if (!validations.hasErrors) {
      if (activeStepper < Object.keys(Step).length / 2 - 1) setActiveStepper(activeStepper + 1);
      else setAlert(AlertType.save);
      AccountSetupStore.getState().updateForm("branchSetup", values.branch);
      AccountSetupStore.getState().updateForm("companySetup", values.company);
      AccountSetupStore.getState().updateForm("divisionSetup", values.division);
    }
  };

  // const addFieldCompany = () => {
  //   const updatedCompanyList = [...form.getValues().companyList, { id: Date.now(), code: "", name: "" }];
  //   setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, companyList: updatedCompanyList } });
  // };

  // const removeFieldCompany = (id: number) => {
  //   const updatedCompanyList = accountSetupForm.organization.companyList.filter((company) => company.id !== id);
  //   setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, companyList: updatedCompanyList } });
  // };

  // const addFieldBranch = () => {
  //   const updatedBranchList = [...form.getValues().branchList, { id: Date.now(), code: "", name: "", location: "", area: "", status: "", description: "" }];
  //   setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, branchList: updatedBranchList } });
  // };

  // const removeFieldBranch = (id: number) => {
  //   const updatedBranchList = accountSetupForm.organization.branchList.filter((branch) => branch.id !== id);
  //   setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, branchList: updatedBranchList } });
  // };

  // const addFieldDivision = () => {
  //   const updatedDivisionList = [...form.getValues().divisionList, { id: Date.now(), code: "", name: "", status: "", description: "" }];
  //   setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, divisionList: updatedDivisionList } });
  // };

  // const removeFieldDivision = (id: number) => {
  //   const updatedDivisionList = accountSetupForm.organization.divisionList.filter((division) => division.id !== id);
  //   setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, divisionList: updatedDivisionList } });
  // };

  return (
    <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
      <div className="h-full w-[75%] mx-auto flex flex-col gap-2 sm:gap-8 text-[#6D6D6D]">
        <div className="flex flex-col gap-2">
          <p className="text-center font-semibold">COMPANY LIST</p>
          <Divider size={3} color="#ebe5e5" />
        </div>

        {accountSetupForm.organization.companyList.map((index) => (
          <div className="flex items-end gap-6 flex-col sm:flex-row relative" key={index.id}>
            <TextInput
              withAsterisk
              {...form.getInputProps(`company.code`)}
              classNames={{ input: "poppins text-[#6D6D6D] " }}
              radius={"md"}
              size="md"
              label="Company Code"
              placeholder="Type Company Code"
              className="w-full sm:w-1/2"
            />
            <TextInput
              withAsterisk
              {...form.getInputProps(`company.name`)}
              classNames={{ input: "poppins text-[#6D6D6D] " }}
              radius={"md"}
              size="md"
              label="Company Name"
              placeholder="Type Company Name"
              className="w-full sm:w-1/2"
            />
            {/* {index != 0 && (
                  <IconCircleMinus
                    size={35}
                    className="cursor-pointer absolute right-[-3%]"
                    onClick={() => {
                      removeFieldCompany(company.id);
                    }}
                  />
                )} */}
            {/* <p
            className="mt-6 w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2"
            onClick={() => {
              addFieldCompany();
            }}>
            <IconCirclePlus size={20} />
            Add Company
          </p> */}
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <p className="text-center font-semibold">BRANCH LIST</p>
          <Divider size={3} color="#ebe5e5" />
        </div>

        {accountSetupForm.organization.branchList.map((_, index) => (
          <div className="relative flex flex-col gap-4" key={index}>
            {/* {index != 0 && (
              <IconCircleMinus
                size={35}
                className="cursor-pointer absolute right-[0%] top-[-5%]"
                onClick={() => {
                  removeFieldBranch(branch.id);
                }}
              />
            )} */}
            <div className="flex items-end gap-6 flex-col sm:flex-row">
              <TextInput
                withAsterisk
                {...form.getInputProps(`branch.code`)}
                classNames={{ input: "poppins text-[#6D6D6D] " }}
                radius={"md"}
                size="md"
                label="Branch Code"
                placeholder="Type Branch Code"
                className="w-full sm:w-1/2"
              />
              <TextInput
                withAsterisk
                {...form.getInputProps(`branch.name`)}
                classNames={{ input: "poppins text-[#6D6D6D] " }}
                radius={"md"}
                size="md"
                label="Branch Name"
                placeholder="Type Branch Name"
                className="w-full sm:w-1/2"
              />
            </div>
            <div className="flex items-end gap-6 flex-col sm:flex-row">
              <Select
                withAsterisk
                error={form.errors["branch.location.name"]}
                classNames={{ input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                radius={8}
                data={locations.data?.items.map((division: any) => ({
                  value: String(division.id),
                  label: division.name,
                }))}
                className="w-full sm:w-1/2"
                size="md"
                label="Branch Location"
                placeholder="Select City/Municipality"
                rightSection={<IconCaretDownFilled size="18" />}
                onChange={(value) => {
                  const selectedItem: { id: number; name: string } = locations.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
                  if (selectedItem) {
                    form.setFieldValue("branch.location.id", selectedItem.id);
                    form.setFieldValue("branch.location.name", selectedItem.name);
                  }
                }}
              />
              <Select
                withAsterisk
                error={form.errors["branch.area.name"]}
                classNames={{ input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
                radius={8}
                data={areas.data?.items.map((division: any) => ({
                  value: String(division.id),
                  label: division.name,
                }))}
                className="w-full sm:w-1/2"
                size="md"
                label="Branch Location"
                placeholder="Select City/Municipality"
                rightSection={<IconCaretDownFilled size="18" />}
                onChange={(value) => {
                  const selectedItem: { id: number; name: string } = areas.data?.items.find((item: any) => item.id.toString() === value) as { id: number; name: string };
                  if (selectedItem) {
                    form.setFieldValue("branch.area.id", selectedItem.id);
                    form.setFieldValue("branch.area.name", selectedItem.name);
                  }
                }}
              />
            </div>
            <Select
              withAsterisk
              {...form.getInputProps(`branch.isActive`)}
              classNames={{ input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D]" }}
              radius={8}
              data={[
                { value: String(1), label: "Active" },
                { value: String(0), label: "Inactive" },
              ]}
              className="w-full "
              size="md"
              label="Status"
              placeholder="Select Status"
              rightSection={<IconCaretDownFilled size="18" />}
              defaultValue={form.values.branch.isActive ? "1" : "0"}
              onChange={(value) => {
                form.setFieldValue("branch.isActive", value === "Active");
              }}
            />
            {/* <div>
              <Textarea classNames={{ input: "poppins text-[#6D6D6D] " }} label="Description" placeholder="" />
              {index == accountSetupForm.organization.branchList.length - 1 && (
                <p
                  className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2"
                  onClick={() => {
                    addFieldBranch();
                  }}>
                  <IconCirclePlus size={20} />
                  Add Branch
                </p>
              )}
            </div> */}
            {accountSetupForm.organization.branchList.length > 1 && index != accountSetupForm.organization.branchList.length - 1 && <Divider size={3} color="#ebe5e5" />}
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <p className="text-center font-semibold">DIVISION LIST</p>
          <Divider size={3} color="#ebe5e5" />
        </div>

        {accountSetupForm.organization.divisionList.map((_, index) => (
          <div className="relative flex flex-col gap-4" key={index}>
            {/* {index != 0 && (
              <IconCircleMinus
                size={35}
                className="cursor-pointer absolute right-[0%] top-[-5%]"
                onClick={() => {
                  removeFieldDivision(division.id);
                }}
              />
            )} */}
            <div className="flex items-end gap-6 flex-col sm:flex-row">
              <TextInput
                withAsterisk
                {...form.getInputProps(`division.code`)}
                classNames={{ input: "poppins text-[#6D6D6D] " }}
                radius={"md"}
                size="md"
                label="Division Code"
                placeholder="Type Division Code"
                className="w-full sm:w-1/2"
              />
              <TextInput
                withAsterisk
                {...form.getInputProps(`division.name`)}
                classNames={{ input: "poppins text-[#6D6D6D] " }}
                radius={"md"}
                size="md"
                label="Division Name"
                placeholder="Type Branch Name"
                className="w-full sm:w-1/2"
              />
            </div>
            <Select
              withAsterisk
              {...form.getInputProps(`division.isActive`)}
              radius={8}
              data={[
                { value: String(1), label: "Active" },
                { value: String(0), label: "Inactive" },
              ]}
              className="w-full "
              classNames={{ input: "poppins text-[#6D6D6D] ", dropdown: "poppins text-[#6D6D6D] " }}
              size="md"
              label="Status"
              placeholder="Select Status"
              rightSection={<IconCaretDownFilled size="18" />}
              defaultValue={form.values.branch.isActive ? "1" : "0"}
              onChange={(value) => {
                form.setFieldValue("division.isActive", value === "1");
              }}
            />
            {/* <div>
              <Textarea label="Description" placeholder="" classNames={{ input: "poppins text-[#6D6D6D] " }} />
              {index == accountSetupForm.organization.divisionList.length - 1 && (
                <p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={() => addFieldDivision()}>
                  <IconCirclePlus size={20} />
                  Add Division
                </p>
              )}
            </div> */}
            {accountSetupForm.organization.divisionList.length > 1 && index != accountSetupForm.organization.divisionList.length - 1 && <Divider size={3} color="#ebe5e5" />}
          </div>
        ))}
      </div>
    </form>
  );
});
export default Organization;
