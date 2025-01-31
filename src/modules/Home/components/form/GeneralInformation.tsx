import {  Divider, Select, TextInput } from "@mantine/core";
import {  useForm } from '@mantine/form';
import { GlobalStore } from "@src/utils/GlobalStore";
import { ApplicationStore } from "@modules/Home/store"
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
// import { GeneralInformationVal } from "../../values";
import { Step, GeneralInformation } from '@modules/Home/types';

export default function index() {
    const { isMobile } = GlobalStore()
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.generalInformation,
        validate: {
            firstChoice: (value: string) => value.length === 0 ? "First choice is required" : null,
            secondChoice: (value: string) => value.length === 0 ? "Second choice is required" : null,
            desiredSalary: (value: number) => value <= 0 ? "Desired salary must be greater than 0" : null,
            // startDateAvailability: (value: string) => value.length === 0 ? "Start date availability is required" : null,

            // personalInformation: {
            //     fullname: {
            //         firstName: (value: string) => value.length === 0 ? "First name is required" : null,
            //         lastName: (value: string) => value.length === 0 ? "Last name is required" : null,
            //     },
            //     presentAddress: {
            //         // city: (value: string) => value.length === 0 ? "City is required" : null,
            //         zipCode: (value: string) => value.length === 0 ? "Zip code is required" : null,
            //     },
            //     permanentAddress: {
            //         // city: (value: string) => value.length === 0 ? "City is required" : null,
            //         // zipCode: (value: string) => value.length === 0 ? "Zip code is required" : null,
            //     },
            //     dateOfBirth: (value: string) => value.length === 0 ? "Date of birth is required" : null,
            //     age: (value: number) => value <= 0 ? "Age must be greater than 0" : null,
            //     mobileNumber: (value: string) => value.length < 10 ? "Enter a valid mobile number" : null,
            //     workingEmailAddress: (value: string) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? "Enter a valid email address" : null,
            // }
        }
    });

    const onSubmit = async (form: GeneralInformation) => {
        setApplicationForm({...applicationForm, generalInformation: form})
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
                    <TextInput {...form.getInputProps("startDateAvailability")} radius='md' w={isMobile ? '50%' : '100%'} label="Availability to Start" placeholder="Select Date" />
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
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Present Address" placeholder="Unit no." />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="House no." />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Street" />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Subdivision" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Barangay" />
                    <TextInput {...form.getInputProps("personalInformation.presentAddress.city")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="City" />
                    <TextInput {...form.getInputProps("personalInformation.presentAddress.zipCode")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Zip Code" />
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
                    <TextInput  {...form.getInputProps("personalInformation.dateOfBirth")} radius='md' w={isMobile ? '25%' : '100%'} label="Date of birth" placeholder="Date of Birth" />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Place of birth" placeholder="Place of birth" />
                    <TextInput  {...form.getInputProps("personalInformation.age")} radius='md' w={isMobile ? '25%' : '100%'} label="Age" placeholder="Age" />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Religion" placeholder="Religion" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput  {...form.getInputProps("personalInformation.mobileNumber")} radius='md' w={isMobile ? '33%' : '100%'} label="Mobile Number" placeholder="Mobile Number (+63)" />
                    <TextInput  {...form.getInputProps("personalInformation.workingEmailAddress")} radius='md' w={isMobile ? '33%' : '100%'} label="Working Email Address" placeholder="Email Address" />
                    <TextInput radius='md' w={isMobile ? '33%' : '100%'} label="Landline Number" placeholder="Landline Number" />
                </div>

            </div>

        </form>

    )
}