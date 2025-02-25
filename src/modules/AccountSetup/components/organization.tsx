import { Divider, Select, Textarea, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { AccountSetupStore } from "@modules/AccountSetup/store"
export default function index() {
    const { form, setForm } = AccountSetupStore()

    const addFieldCompany = () => {
        const updatedCompanyList = [...form.organization.companyList, { id: Date.now(), code: "", name: "" }];
        setForm({ ...form, organization: { ...form.organization, companyList: updatedCompanyList } });
    };

    const removeFieldCompany = (id: number) => {
        const updatedCompanyList = form.organization.companyList.filter(company => company.id !== id);
        setForm({ ...form, organization: { ...form.organization, companyList: updatedCompanyList } });
    };

    const addFieldBranch = () => {
        const updatedBranchList = [...form.organization.branchList, { id: Date.now(), code: "", name: "", location: "", area: "", status: "", description: "" }];
        setForm({ ...form, organization: { ...form.organization, branchList: updatedBranchList } });
    };

    const removeFieldBranch = (id: number) => {
        const updatedBranchList = form.organization.branchList.filter(branch => branch.id !== id);
        setForm({ ...form, organization: { ...form.organization, branchList: updatedBranchList } });
    };

    const addFieldDivision = () => {
        const updatedDivisionList = [...form.organization.divisionList, { id: Date.now(), code: "", name: "", status: "", description: "" }];
        setForm({ ...form, organization: { ...form.organization, divisionList: updatedDivisionList } });
    };

    const removeFieldDivision = (id: number) => {
        const updatedDivisionList = form.organization.divisionList.filter(division => division.id !== id);
        setForm({ ...form, organization: { ...form.organization, divisionList: updatedDivisionList } });
    };

    return (
        <div className="h-full w-[75%] mx-auto flex flex-col gap-2 sm:gap-8">

            <div className="flex flex-col gap-2">
                <p className="text-center">COMPANY LIST</p>
                <Divider size={3} color="#ebe5e5" />
            </div>
            <div className="flex flex-col">
                {form.organization.companyList.map((company, index) =>
                    <div className="flex items-end gap-6 flex-col sm:flex-row relative " key={company.id}>
                        <TextInput radius={"md"} size="md" label="Company Code" placeholder="First Name" className="w-full sm:w-1/2" />
                        <TextInput radius={"md"} size="md" label="Company Label" placeholder="Last Name" className="w-full sm:w-1/2" />
                        {index != 0 && (<IconCircleMinus size={35} className="cursor-pointer absolute right-[-3%]" onClick={() => { removeFieldCompany(company.id) }} />)}
                    </div>
                )}
                <p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={() => { addFieldCompany() }}><IconCirclePlus size={20} />Add Company</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-center">BRANCH LIST</p>
                <Divider size={3} color="#ebe5e5" />
            </div>
            {form.organization.branchList.map((branch, index) => (
                <div className="relative" key={branch.id}>
                    {index != 0 && (<IconCircleMinus size={35} className="cursor-pointer absolute right-[0%] top-[-5%]" onClick={() => { removeFieldBranch(branch.id) }} />)}
                    <div className="flex items-end gap-6 flex-col sm:flex-row">
                        <TextInput radius={"md"} size="md" label="Branch Code" placeholder="Type Branch Code" className="w-full sm:w-1/2" />
                        <TextInput radius={"md"} size="md" label="Branch Name" placeholder="Type Branch Name" className="w-full sm:w-1/2" />
                    </div>
                    <div className="flex items-end gap-6 flex-col sm:flex-row">
                        <Select radius={8} data={["Active", "Inactive"]} className="w-full sm:w-1/2" size="md" label="Branch Location" placeholder="Select City/Municipality" rightSection={<IconCaretDownFilled size='18' />} />
                        <TextInput radius={"md"} size="md" label="Branch Area" placeholder="Type Branch Area" className="w-full sm:w-1/2" />
                    </div>
                    <div>
                        <Select radius={8} data={["Active", "Inactive"]} className="w-full " size="md" label="Status" placeholder="Select Status" rightSection={<IconCaretDownFilled size='18' />} />
                        <Textarea label="Description" placeholder="" />
                        {index == form.organization.branchList.length - 1 && (<p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={() => { addFieldBranch() }}><IconCirclePlus size={20} />Add Branch</p>)}
                    </div>
                    {form.organization.branchList.length > 1 && index != form.organization.branchList.length - 1 && (
                        <Divider size={3} color="#ebe5e5" />
                    )}
                </div>
            ))}

            <div className="flex flex-col gap-2">
                <p className="text-center">DIVISION LIST</p>
                <Divider size={3} color="#ebe5e5" />
            </div>
            {form.organization.divisionList.map((division, index) => (
                <div className="relative" key={division.id}>
                    {index != 0 && (<IconCircleMinus size={35} className="cursor-pointer absolute right-[0%] top-[-5%]" onClick={() => { removeFieldDivision(division.id) }} />)}
                    <div className="flex items-end gap-6 flex-col sm:flex-row">
                        <TextInput radius={"md"} size="md" label="Division Code" placeholder="Type Division Code" className="w-full sm:w-1/2" />
                        <TextInput radius={"md"} size="md" label="Division Name" placeholder="Type Branch Name" className="w-full sm:w-1/2" />
                    </div>
                    <div>
                        <Select radius={8} data={["Active", "Inactive"]} className="w-full " size="md" label="Status" placeholder="Select Status" rightSection={<IconCaretDownFilled size='18' />} />
                        <Textarea label="Description" placeholder="" />
                        {index == form.organization.divisionList.length - 1 && (<p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={() => { addFieldDivision() }}><IconCirclePlus size={20} />Add Division</p>)}
                    </div>
                    {form.organization.divisionList.length > 1 && index != form.organization.divisionList.length - 1 && (
                        <Divider size={3} color="#ebe5e5" />
                    )}
                </div>
            ))}

        </div>
    )
}