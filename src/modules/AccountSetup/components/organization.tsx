import { Divider, Flex, Select, Textarea, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCirclePlus } from "@tabler/icons-react";

export default function index() {
    return (
        <div className="h-full w-[75%] mx-auto flex flex-col gap-2 sm:gap-8">
            <div className="flex flex-col gap-2">
                <p className="text-center">COMPANY LIST</p>
                <Divider size={3} color="#ebe5e5" />
            </div>
            <div className="flex flex-col">
                <div className="flex items-end gap-6 flex-col sm:flex-row">
                    <TextInput radius={"md"} size="md" label="Company Code" placeholder="First Name" className="w-full sm:w-1/2" />
                    <TextInput radius={"md"} size="md" label="Company Label" placeholder="Last Name" className="w-full sm:w-1/2" />
                </div>
                <p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={() => { }}><IconCirclePlus size={20} />Add Company</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-center">BRANCH LIST</p>
                <Divider size={3} color="#ebe5e5" />
            </div>
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
                <Textarea
                    label="Input label"
                    placeholder="Input placeholder"
                />
                <p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={() => { }}><IconCirclePlus size={20} />Add Division</p>
            </div>
         </div>
    )
}