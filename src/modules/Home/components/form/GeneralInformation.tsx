import { Divider, Select, TextInput, Popover } from "@mantine/core";
import { useForm } from '@mantine/form';
import { GlobalStore } from "@src/utils/GlobalStore";
import { ApplicationStore } from "@modules/Home/store"
import { IconCalendarMonth, IconCaretDownFilled } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { Step, GeneralInformation } from '@modules/Home/types';
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { cn } from "@src/lib/utils";

export default function index() {
    const { isMobile } = GlobalStore()
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.generalInformation,
        validate: {
            firstChoice: (value: string) => value.length === 0 ? "First choice is required" : null,
            desiredSalary: (value: number) => value <= 0 ? "Desired salary must be greater than 0" : null,
            startDateAvailability: (value: string) => value.length === 0 ? "Start date availability is required" : null,

            personalInformation: {
                fullname: {
                    firstName: (value: string) => value.length === 0 ? "First name is required" : null,
                    lastName: (value: string) => value.length === 0 ? "Last name is required" : null,
                },
                presentAddress: {
                    unitNo: (value: string) => value.length === 0 ? "Unit No is required" : null,
                    houseNo: (value: string) => value.length === 0 ? "House No is required" : null,
                    street: (value: string) => value.length === 0 ? "Street is required" : null,
                    subdivision: (value: string) => value.length === 0 ? "Subdivision is required" : null,
                    barangay: (value: string) => value.length === 0 ? "Barangay is required" : null,
                    city: (value: string) => value.length === 0 ? "City is required" : null,
                    zipCode: (value: string) => value.length === 0 ? "Zip code is required" : null,
                    livingArrangement: (value: string) => value.length === 0 ? "Living arrangement is required" : null,
                },

                permanentAddress: {
                    unitNo: (value: string) => value.length === 0 ? "Unit No is required" : null,
                    houseNo: (value: string) => value.length === 0 ? "House No is required" : null,
                    street: (value: string) => value.length === 0 ? "Street is required" : null,
                    subdivision: (value: string) => value.length === 0 ? "Subdivision is required" : null,
                    barangay: (value: string) => value.length === 0 ? "Barangay is required" : null,
                    city: (value: string) => value.length === 0 ? "City is required" : null,
                    zipCode: (value: string) => value.length === 0 ? "Zip code is required" : null,
                    livingArrangement: (value: string) => value.length === 0 ? "Address type is required" : null,
                },


                dateOfBirth: (value: string) => value.length === 0 ? "Date of birth is required" : null,
                placeOfBirth: (value: string) => value.length === 0 ? "Places of birth is required" : null,
                religion: (value: string) => value.length === 0 ? "Religion is required" : null,
                age: (value: number) => value <= 0 ? "Age must be greater than 0" : null,
                sex: (value: string) => value.length === 0 ? "Sex is required" : null,
                height: (value: string) => value.length === 0 ? "Height is required" : null,
                weight: (value: string) => value.length === 0 ? "Weight is required" : null,
                civilStatus: (value: string) => value.length === 0 ? "Civil Status is required" : null,
                mobileNumber: (value: string) => value.length < 10 ? "Enter a valid mobile number" : null,
                workingEmailAddress: (value: string) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? "Enter a valid email address" : null,
                landlineNumber: (value: string) => value.length < 10 ? "Enter a valid mobile number" : null,
            }
        }
    });

    const onSubmit = async (form: GeneralInformation) => {
        setApplicationForm({ ...applicationForm, generalInformation: form })
        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper)
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.GeneralInformation && formRef.current) {
            formRef.current.requestSubmit(); // Programmatically trigger form submission
        }
        return (setSubmit(false))
    }, [submit])

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4">
                <p className="font-bold">General Information</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <Select
                        {...form.getInputProps("firstChoice")}
                        w={isMobile ? '25%' : '100%'}
                        label="Position Applying for - First Choice"
                        placeholder={"First Choice"}
                        radius={8}
                        data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />

                    <Select
                        {...form.getInputProps("secondChoice")}
                        w={isMobile ? '25%' : '100%'}
                        label="Position Applying for - Second Choice"
                        placeholder={"Second Choice"}
                        radius={8}
                        data={["Software Engineer", "Web Developer", "Mobile Developer", "QA"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />

                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <TextInput {...form.getInputProps("desiredSalary")} radius='md' w={isMobile ? '50%' : '100%'} label="Desired Salary" placeholder="Desired Salary in PESO" />
                    <Popover
                        position="bottom"
                        shadow="md"
                        trapFocus={true}
                        returnFocus={true}
                    >
                        <Popover.Target>
                            <TextInput
                                {...form.getInputProps("startDateAvailability")}
                                key={form.key('startDateAvailability')}
                                radius='md' w={isMobile ? '25%' : '100%'}
                                readOnly
                                label='Availability to Start'
                                placeholder='Select Date'
                                className="w-full cursor-default"
                                rightSection={<IconCalendarMonth />}
                                styles={{ label: { color: "#6d6d6d" } }}
                            />
                        </Popover.Target>
                        <Popover.Dropdown className="w-full">
                            <DatePicker firstDayOfWeek={0}  {...form.getInputProps("startDateAvailability")} onChange={(value: Date | null) => { form.setFieldValue("startDateAvailability", value ? dayjs(value).format("YYYY-MM-DD") : '') }} />
                        </Popover.Dropdown>
                    </Popover>
                </div>

                <p className="font-bold">Personal Information</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput   {...form.getInputProps("personalInformation.fullname.lastName")} radius='md' w={isMobile ? '25%' : '100%'} label="Full Name" placeholder="Last Name" />
                    <TextInput   {...form.getInputProps("personalInformation.fullname.firstName")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="First Name" />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Middle Name" />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Suffix(Jr. Sr. etc.)" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput {...form.getInputProps("personalInformation.presentAddress.unitNo")} key={form.key('personalInformation.presentAddress.unitNo')} radius='md' w={isMobile ? '25%' : '100%'} label="Present Address" placeholder="Unit no." />
                    <TextInput {...form.getInputProps("personalInformation.presentAddress.houseNo")} key={form.key('personalInformation.presentAddress.houseNo')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="House no." />
                    <TextInput {...form.getInputProps("personalInformation.presentAddress.street")} key={form.key('personalInformation.presentAddress.street')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Street" />
                    <TextInput {...form.getInputProps("personalInformation.presentAddress.subdivision")} key={form.key('personalInformation.presentAddress.subdivision')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Subdivision" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <Select
                        {...form.getInputProps("personalInformation.presentAddress.barangay")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Barangay"}
                        radius={8}
                        data={["1", "2", "3", "4"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    <Select
                        {...form.getInputProps("personalInformation.presentAddress.city")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"City"}
                        radius={8}
                        data={["Caloocan City", "Quezon City", "Manila City"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    <Select
                        {...form.getInputProps("personalInformation.presentAddress.zipCode")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Zip Code"}
                        radius={8}
                        data={["1400", "1500", "1600"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    <Select
                        {...form.getInputProps("personalInformation.presentAddress.livingArrangement")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Living Arrangement"}
                        radius={8}
                        data={["RELATIVES", "OWNED", "RENTED", "WILLING TO RELOCATE"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    {/* <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Living Arrangement" /> */}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className={cn("w-[100%]", isMobile && "w-[25%]")}>
                        <div onClick={() => {
                            form.setValues({
                                ...form.getValues(),
                                personalInformation: {
                                    ...form.getValues().personalInformation, // Preserve all existing fields
                                    permanentAddress: form.getValues().personalInformation.presentAddress,
                                },
                            });
                        }} className="absolute ml-36 sm:ml-40 text-xs sm:text-sm bg-[#D7FFB9] text-[#5A9D27] sm:px-2 rounded-full font-semibold cursor-pointer">SAME AS PRESENT ADDRESS</div>
                        <TextInput {...form.getInputProps("personalInformation.permanentAddress.unitNo")} key={form.key('personalInformation.permanentAddress.unitNo')} radius='md' w={isMobile ? '25%' : '100%'} label="Permanent Address" placeholder="Unit no." />
                    </div>
                    <TextInput {...form.getInputProps("personalInformation.permanentAddress.houseNo")} key={form.key('personalInformation.permanentAddress.houseNo')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="House no." />
                    <TextInput {...form.getInputProps("personalInformation.permanentAddress.street")} key={form.key('personalInformation.permanentAddress.street')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Street" />
                    <TextInput {...form.getInputProps("personalInformation.permanentAddress.subdivision")} key={form.key('personalInformation.permanentAddress.subdivision')} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Subdivision" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <Select
                        key={form.key('personalInformation.permanentAddress.barangay')}
                        {...form.getInputProps("personalInformation.permanentAddress.barangay")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Barangay"}
                        radius={8}
                        data={["1", "2", "3", "4"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    <Select
                        key={form.key('personalInformation.permanentAddress.city')}
                        {...form.getInputProps("personalInformation.permanentAddress.city")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"City"}
                        radius={8}
                        data={["Caloocan City", "Quezon City", "Manila City"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    <Select
                        key={form.key('personalInformation.permanentAddress.zipCode')}
                        {...form.getInputProps("personalInformation.permanentAddress.zipCode")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Zip Code"}
                        radius={8}
                        data={["1400", "1500", "1600"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                    <Select
                        key={form.key('personalInformation.permanentAddress.livingArrangement')}
                        {...form.getInputProps("personalInformation.permanentAddress.livingArrangement")}
                        w={isMobile ? '25%' : '100%'}
                        placeholder={"Living Arrangement"}
                        radius={8}
                        data={["RELATIVES", "OWNED", "RENTED", "WILLING TO RELOCATE"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <Popover
                        position="bottom"
                        shadow="md"
                        trapFocus={true}
                        returnFocus={true}
                    >
                        <Popover.Target>
                            <TextInput
                                {...form.getInputProps("personalInformation.dateOfBirth")}
                                key={form.key('personalInformation.dateOfBirth')}
                                radius='md' w={isMobile ? '25%' : '100%'}
                                readOnly
                                label='Date of Birth'
                                placeholder='Select Date'
                                className="w-full cursor-default"
                                rightSection={<IconCalendarMonth />}
                                styles={{ label: { color: "#6d6d6d" } }}
                            />
                        </Popover.Target>
                        <Popover.Dropdown className="w-full">
                            <DatePicker firstDayOfWeek={0}  {...form.getInputProps("personalInformation.dateOfBirth")} onChange={(value: Date | null) => { form.setFieldValue("personalInformation.dateOfBirth", value ? dayjs(value).format("YYYY-MM-DD") : '') }} />
                        </Popover.Dropdown>
                    </Popover>

                    <TextInput {...form.getInputProps("personalInformation.placeOfBirth")} radius='md' w={isMobile ? '25%' : '100%'} label="Place of birth" placeholder="Place of birth" />
                    <TextInput {...form.getInputProps("personalInformation.age")} radius='md' w={isMobile ? '25%' : '100%'} label="Age" placeholder="Age" />
                    <TextInput {...form.getInputProps("personalInformation.sex")} radius='md' w={isMobile ? '25%' : '100%'} label="Sex" placeholder="Sex" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput {...form.getInputProps("personalInformation.height")} radius='md' w={isMobile ? '25%' : '100%'} label="Height" placeholder="Height" />
                    <TextInput {...form.getInputProps("personalInformation.weight")} radius='md' w={isMobile ? '25%' : '100%'} label="Weight" placeholder="Weight" />
                    <TextInput {...form.getInputProps("personalInformation.civilStatus")} radius='md' w={isMobile ? '25%' : '100%'} label="Civil Status" placeholder="Civil Status" />
                    <TextInput {...form.getInputProps("personalInformation.religion")} radius='md' w={isMobile ? '25%' : '100%'} label="Religion" placeholder="Religion" />
                </div>



                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput {...form.getInputProps("personalInformation.mobileNumber")} radius='md' w={isMobile ? '33%' : '100%'} label="Mobile Number" placeholder="Mobile Number (+63)" />
                    <TextInput {...form.getInputProps("personalInformation.workingEmailAddress")} radius='md' w={isMobile ? '33%' : '100%'} label="Working Email Address" placeholder="Email Address" />
                    <TextInput {...form.getInputProps("personalInformation.landlineNumber")} radius='md' w={isMobile ? '33%' : '100%'} label="Landline Number" placeholder="Landline Number" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput  {...form.getInputProps("personalInformation.governmentIdOrNumber.sssNo")} radius='md' w={isMobile ? '33%' : '100%'} label="Government ID/Numbers" placeholder="SSs No." />
                    <TextInput  {...form.getInputProps("personalInformation.governmentIdOrNumber.pagibigNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Pagibig-No." />
                    <TextInput {...form.getInputProps("personalInformation.governmentIdOrNumber.philheathNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Philhealth No." />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput {...form.getInputProps("personalInformation.governmentIdOrNumber.tinNo")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="TIN ID" />
                    <TextInput {...form.getInputProps("personalInformation.governmentIdOrNumber.driversLiscence")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Drivers License" />
                    <TextInput {...form.getInputProps("personalInformation.governmentIdOrNumber.passport")} radius='md' w={isMobile ? '33%' : '100%'} placeholder="Passport" />
                </div>


            </div>

        </form>

    )
}