import { Divider, Checkbox, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";

export default function index() {
    const { isMobile } = GlobalStore()
    return (
        <div className="text-[#6D6D6D] flex flex-col gap-4">

            <p className="font-bold">Character Reference (NOT FAMILY MEMBERS)</p>
            <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Character Reference 1" placeholder="Full Name" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Company" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Position Held" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
            </div>

            <p className="font-bold">Employment Reference (NOT FAMILY MEMBERS)</p>
            <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Character Reference 1" placeholder="Full Name" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Company" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Position Held" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
            </div>

            <p className="font-bold">Application Source</p>
            <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
            <p>How did you learn about our vacancy? How did you apply in our company? *</p>
            <div className="flex gap-2 sm:gap-0">
                <Checkbox
                    className="w-[33%]"
                    defaultChecked
                    label="Employee Refereal"
                />
                <Checkbox
                    className="w-[33%] "
                    defaultChecked
                    label="Jobstreet"
                />
                <Checkbox
                    className="w-[33%] truncate"
                    defaultChecked
                    label="Headhunter"
                />
            </div>
            <div className="flex  gap-2 sm:gap-0">
                <Checkbox
                    className="w-[33%]"
                    defaultChecked
                    label="Word of Mouth"
                />
                <Checkbox
                    className="w-[33%]"
                    defaultChecked
                    label="Walk-in"
                />
                <Checkbox
                    className="w-[33%]"
                    defaultChecked
                    label="Others"
                />
            </div>
        </div>
    )
}