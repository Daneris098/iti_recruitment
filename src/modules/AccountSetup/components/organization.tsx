import { Divider, Select, Textarea, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { AccountSetupStore } from "@modules/AccountSetup/store"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useForm } from "@mantine/form";
import { formValue } from "../values";
import { Step, AlertType } from "../types";
const Organization = forwardRef((_, ref) => {
    const { accountSetupForm, setAccountSetupForm, activeStepper, setActiveStepper, setAlert } = AccountSetupStore()

    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
        submit,
    }));

    const form = useForm({
        mode: "uncontrolled",
        initialValues: formValue.organization,
        validate: {
            companyList: {
                code: (value: string) => value.length === 0 ? "Code is required" : null,
                name: (value: string) => value.length === 0 ? "Name is required" : null,
            },
            branchList: {
                code: (value: string) => value.length === 0 ? "Code is required" : null,
                name: (value: string) => value.length === 0 ? "Name is required" : null,
                location: (value: string) => value.length === 0 ? "Location is required" : null,
                area: (value: string) => value.length === 0 ? "Area is required" : null,
                status: (value: string) => value.length === 0 ? "Status is required" : null,
            },
            divisionList: {
                code: (value: string) => value.length === 0 ? "Code is required" : null,
                name: (value: string) => value.length === 0 ? "Name is required" : null,
                status: (value: string) => value.length === 0 ? "Status is required" : null,
                description: (value: string) => value.length === 0 ? "Description is required" : null,
            },
        },
    });

    useEffect(() => {
        console.log('branchList: ', form.values.branchList)
    }, [form])

    const submit = () => {
        formRef.current?.requestSubmit();
    }

    const onSubmit = async () => {
        if (activeStepper < ((Object.keys(Step).length / 2) - 1)) {
            setActiveStepper(activeStepper + 1)
        }
        else {
            setAlert(AlertType.save)
        }
    }

    useEffect(() => {
        form.setValues({
            companyList: accountSetupForm.organization.companyList,
            branchList: accountSetupForm.organization.branchList,
            divisionList: accountSetupForm.organization.divisionList,
        });
    }, [accountSetupForm])


    const addFieldCompany = () => {
        const updatedCompanyList = [...form.getValues().companyList, { id: Date.now(), code: "", name: "" }];
        setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, companyList: updatedCompanyList } });
    };

    const removeFieldCompany = (id: number) => {
        const updatedCompanyList = accountSetupForm.organization.companyList.filter(company => company.id !== id);
        setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, companyList: updatedCompanyList } });
    };

    const addFieldBranch = () => {
        const updatedBranchList = [...form.getValues().branchList, { id: Date.now(), code: "", name: "", location: "", area: "", status: "", description: "" }];
        setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, branchList: updatedBranchList } });
    };

    const removeFieldBranch = (id: number) => {
        const updatedBranchList = accountSetupForm.organization.branchList.filter(branch => branch.id !== id);
        setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, branchList: updatedBranchList } });
    };

    const addFieldDivision = () => {
        const updatedDivisionList = [...form.getValues().divisionList, { id: Date.now(), code: "", name: "", status: "", description: "" }];
        setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, divisionList: updatedDivisionList } });
    };

    const removeFieldDivision = (id: number) => {
        const updatedDivisionList = accountSetupForm.organization.divisionList.filter(division => division.id !== id);
        setAccountSetupForm({ ...accountSetupForm, organization: { ...accountSetupForm.organization, divisionList: updatedDivisionList } });
    };

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)} >
            <div className="h-full w-[75%] mx-auto flex flex-col gap-2 sm:gap-8 text-[#6D6D6D]">

                <div className="flex flex-col gap-2">
                    <p className="text-center font-semibold">COMPANY LIST</p>
                    <Divider size={3} color="#ebe5e5" />
                </div>
                <div className="flex flex-col">
                    {accountSetupForm.organization.companyList.map((company, index) =>
                        <div className="flex items-end gap-6 flex-col sm:flex-row relative ">
                            <TextInput  {...form.getInputProps(`companyList.${index}.code`)} classNames={{ input: 'poppins text-[#6D6D6D] ' }} radius={"md"} size="md" label="Company Code" placeholder="First Name" className="w-full sm:w-1/2" />
                            <TextInput {...form.getInputProps(`companyList.${index}.name`)} classNames={{ input: 'poppins text-[#6D6D6D] ' }} radius={"md"} size="md" label="Company Label" placeholder="Last Name" className="w-full sm:w-1/2" />
                            {index != 0 && (<IconCircleMinus size={35} className="cursor-pointer absolute right-[-3%]" onClick={() => { removeFieldCompany(company.id) }} />)}
                        </div>
                    )}
                    <p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={() => { addFieldCompany() }}><IconCirclePlus size={20} />Add Company</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-center font-semibold">BRANCH LIST</p>
                    <Divider size={3} color="#ebe5e5" />
                </div>

                {accountSetupForm.organization.branchList.map((branch, index) => (
                    <div className="relative flex flex-col gap-4" key={branch.id}>
                        {index != 0 && (<IconCircleMinus size={35} className="cursor-pointer absolute right-[0%] top-[-5%]" onClick={() => { removeFieldBranch(branch.id) }} />)}
                        <div className="flex items-end gap-6 flex-col sm:flex-row">
                            <TextInput {...form.getInputProps(`branchList.${index}.code`)} classNames={{ input: 'poppins text-[#6D6D6D] ' }} radius={"md"} size="md" label="Branch Code" placeholder="Type Branch Code" className="w-full sm:w-1/2" />
                            <TextInput {...form.getInputProps(`branchList.${index}.name`)} classNames={{ input: 'poppins text-[#6D6D6D] ' }} radius={"md"} size="md" label="Branch Name" placeholder="Type Branch Name" className="w-full sm:w-1/2" />
                        </div>
                        <div className="flex items-end gap-6 flex-col sm:flex-row">
                            <Select {...form.getInputProps(`branchList.${index}.location`)} classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }} radius={8} data={["Quezon City", "Caloocan City"]} className="w-full sm:w-1/2" size="md" label="Branch Location" placeholder="Select City/Municipality" rightSection={<IconCaretDownFilled size='18' />} />
                            <TextInput {...form.getInputProps(`branchList.${index}.area`)} classNames={{ input: 'poppins text-[#6D6D6D] ' }} radius={"md"} size="md" label="Branch Area" placeholder="Type Branch Area" className="w-full sm:w-1/2" />
                        </div>
                        <Select {...form.getInputProps(`branchList.${index}.status`)} classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }} radius={8} data={["Active", "Inactive"]} className="w-full " size="md" label="Status" placeholder="Select Status" rightSection={<IconCaretDownFilled size='18' />} />
                        <div>
                            <Textarea classNames={{ input: 'poppins text-[#6D6D6D] ' }} label="Description" placeholder="" />
                            {index == accountSetupForm.organization.branchList.length - 1 && (<p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={() => { addFieldBranch() }}><IconCirclePlus size={20} />Add Branch</p>)}
                        </div>
                        {accountSetupForm.organization.branchList.length > 1 && index != accountSetupForm.organization.branchList.length - 1 && (
                            <Divider size={3} color="#ebe5e5" />
                        )}
                    </div>
                ))}

                <div className="flex flex-col gap-2">
                    <p className="text-center font-semibold">DIVISION LIST</p>
                    <Divider size={3} color="#ebe5e5" />
                </div>
                {accountSetupForm.organization.divisionList.map((division, index) => (
                    <div className="relative flex flex-col gap-4" key={division.id}>
                        {index != 0 && (<IconCircleMinus size={35} className="cursor-pointer absolute right-[0%] top-[-5%]" onClick={() => { removeFieldDivision(division.id) }} />)}
                        <div className="flex items-end gap-6 flex-col sm:flex-row">
                            <TextInput {...form.getInputProps(`divisionList.${index}.code`)} classNames={{ input: 'poppins text-[#6D6D6D] ' }} radius={"md"} size="md" label="Division Code" placeholder="Type Division Code" className="w-full sm:w-1/2" />
                            <TextInput {...form.getInputProps(`divisionList.${index}.name`)} classNames={{ input: 'poppins text-[#6D6D6D] ' }} radius={"md"} size="md" label="Division Name" placeholder="Type Branch Name" className="w-full sm:w-1/2" />
                        </div>
                        <Select {...form.getInputProps(`divisionList.${index}.status`)} radius={8} data={["Active", "Inactive"]} className="w-full " classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D] ' }} size="md" label="Status" placeholder="Select Status" rightSection={<IconCaretDownFilled size='18' />} />
                        <div>
                            <Textarea label="Description" placeholder="" classNames={{ input: 'poppins text-[#6D6D6D] ' }} />{index == accountSetupForm.organization.divisionList.length - 1 && (<p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={() => { addFieldDivision() }}><IconCirclePlus size={20} />Add Division</p>)}
                        </div>
                        {accountSetupForm.organization.divisionList.length > 1 && index != accountSetupForm.organization.divisionList.length - 1 && (
                            <Divider size={3} color="#ebe5e5" />
                        )}
                    </div>
                ))}

            </div>
        </form>
    )
})
export default Organization;