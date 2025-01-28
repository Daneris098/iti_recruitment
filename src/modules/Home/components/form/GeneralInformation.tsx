import { Divider, Select, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconCaretDownFilled } from "@tabler/icons-react";

export default function index() {
    const { isMobile } = GlobalStore()
    return (
        <div className="text-[#6D6D6D] flex flex-col gap-4">
            <p className="font-bold">General Information</p>
            <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <Select
                    w={isMobile ? '25%' : '100%'}
                    label="Position Applying for - First Choice"
                    // placeholder={filter.postedDate != null ? '' : "First Choice"}
                    radius={8}
                    data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                    rightSection={<IconCaretDownFilled size='18' />}
                    className="border-none w-full text-sm"
                    classNames={{label:"p-1"}}
                    styles={{ label: { color: "#6d6d6d" } }}
                    // onChange={(value) => { setFilter({ ...filter, postedDate: `${value}` }) }}
                />

                {/* <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Position Applying for - First Choice" placeholder="First Choice" /> */}
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Position Applying for - Second Choice" placeholder="Second Choice" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Desired Salary" placeholder="Desired Salary in PESO" />
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Availability to Start" placeholder="Select Date" />
            </div>

            <p className="font-bold">Personal Information</p>
            <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Full Name" placeholder="Last Name" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="First Name" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Middle Name" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Suffix(Jr. Sr. etc.)" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Present Address" placeholder="Unit no." />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="House no." />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Street" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Subdivision" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Barangay" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="City" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Zip Code" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Living Arrangement" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Permanent Address" placeholder="Unit no." />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="House no." />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Street" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Subdivision" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Barangay" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="City" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Zip Code" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Living Arrangement" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Date of birth" placeholder="Unit no." />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Place of birth" placeholder="Place of birth" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Age" placeholder="Age" />
                <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Religion" placeholder="Religion" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '33%' : '100%'} label="Mobile Number" placeholder="Mobile Number (+63)" />
                <TextInput radius='md' w={isMobile ? '33%' : '100%'} label="Working Email Address" placeholder="Email Address" />
                <TextInput radius='md' w={isMobile ? '33%' : '100%'} label="Landline Number" placeholder="Landline Number" />
            </div>

        </div>
    )
}