import { Divider, Select, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconCaretDownFilled } from "@tabler/icons-react";

export default function index() {
    const { isMobile } = GlobalStore()
    return (
        <div className="text-[#6D6D6D] flex flex-col gap-4">
            <p className="font-bold">Educational Background</p>
            <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Name of School" placeholder="Name of School" />
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Educational Level" placeholder="Educational Level" />
            </div>

            <div className="flex flex-col items-end sm:flex-row gap-4">
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Course" placeholder="Course" />
                <div className="flex flex-col sm:flex-row items-end gap-4 w-[100%] " >

                    <Select
                        w={isMobile ? '100%' : '100%'}
                        label="Years Attended"
                        // placeholder={filter.postedDate != null ? '' : "First Choice"}
                        radius={8}
                        data={["2020", "2021", "2022"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    // onChange={(value) => { setFilter({ ...filter, postedDate: `${value}` }) }}
                    />
                    <Select
                        w={isMobile ? '100%' : '100%'}
                        // placeholder={filter.postedDate != null ? '' : "First Choice"}
                        radius={8}
                        data={["2020", "2021", "2022"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    // onChange={(value) => { setFilter({ ...filter, postedDate: `${value}` }) }}
                    />

                </div>
            </div>

            <p className="font-bold">Employment Record</p>
            <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Employer/Company" placeholder="Employer/Company" />
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Location" placeholder="Office Location" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Position Held" placeholder="Position Held" />
                <div className="flex flex-col sm:flex-row items-end gap-4 w-[100%] " >

                    <Select
                        w={isMobile ? '100%' : '100%'}
                        label="Inclusive Date"
                        // placeholder={filter.postedDate != null ? '' : "First Choice"}
                        radius={8}
                        data={["2020", "2021", "2022"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    // onChange={(value) => { setFilter({ ...filter, postedDate: `${value}` }) }}
                    />
                    <Select
                        w={isMobile ? '100%' : '100%'}
                        // placeholder={filter.postedDate != null ? '' : "First Choice"}
                        radius={8}
                        data={["2020", "2021", "2022"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    // onChange={(value) => { setFilter({ ...filter, postedDate: `${value}` }) }}
                    />

                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Salary" placeholder="Salary in PESO" />
                <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Reason for Leaving" placeholder="Reason for Leaving" />
            </div>



        </div>
    )
}