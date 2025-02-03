import { Divider, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { EducationBackground, Step } from "../../types";
import { ApplicationStore } from "../../store";

export default function index() {
    const { isMobile } = GlobalStore()

    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.educationBackground,
        validate: {
            // nameOfSchool: (value: string) => value.length === 0 ? "Name Of School is required" : null,
            // educationalLevel: (value: string) => value.length === 0 ? "Educational Level is required" : null,
            // course: (value: string) => value.length === 0 ? "Course is required" : null,
            // professionalLiscenses: (value: string) => value.length === 0 ? "Professional Liscenses is required" : null,
            // certfications: (value: string) => value.length === 0 ? "Certfications is required" : null,
            // yearsAttended: {
            //     from: (value: string) => value.length === 0 ? "Years Attended From is required" : null,
            //     to: (value: string) => value.length === 0 ? "Years Attended To is required" : null,
            // },

        }
    });

    const onSubmit = async (form: EducationBackground) => {
        setApplicationForm({ ...applicationForm, educationBackground: form })
        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper)
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.EducationalAndEmployment && formRef.current) {
            formRef.current.requestSubmit(); // Programmatically trigger form submission
        }
        return (setSubmit(false))
    }, [submit])

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4">
                <p className="font-bold">Educational Background</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput   {...form.getInputProps("nameOfSchool")} radius='md' w={isMobile ? '50%' : '100%'} label="Name of School" placeholder="Name of School" />
                    <TextInput   {...form.getInputProps("educationalLevel")} radius='md' w={isMobile ? '50%' : '100%'} label="Educational Level" placeholder="Educational Level" />
                </div>

                <div className="flex flex-col items-end sm:flex-row gap-4">
                    <TextInput  {...form.getInputProps("course")} radius='md' w={isMobile ? '50%' : '100%'} label="Course" placeholder="Course" />
                    <div className="flex flex-col sm:flex-row items-end gap-4 w-[100%]" >
                        <Select
                            {...form.getInputProps("yearsAttended.from")}
                            w={isMobile ? '100%' : '100%'}
                            label="Years Attended"
                            placeholder={"From"}
                            radius={8}
                            data={["2020", "2021", "2022"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                        />
                        <Select
                            {...form.getInputProps("yearsAttended.to")}
                            w={isMobile ? '100%' : '100%'}
                            placeholder={"To"}
                            radius={8}
                            data={["2020", "2021", "2022"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                        />

                    </div>
                </div>
                <div>
                    <p className="absolute ml-[11rem] text-sm bg-[#D7FFB9] text-[#5A9D27] px-2 rounded-full font-semibold cursor-pointer">Add Experience</p>
                    <p className="font-bold">Employment Record</p>
                </div>
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
                            placeholder={ "From"}
                            radius={8}
                            data={["2020", "2021", "2022"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                        />
                        <Select
                            w={isMobile ? '100%' : '100%'}
                            placeholder={"To"}
                            radius={8}
                            data={["2020", "2021", "2022"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                        />

                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Salary" placeholder="Salary in PESO" />
                    <TextInput radius='md' w={isMobile ? '50%' : '100%'} label="Reason for Leaving" placeholder="Reason for Leaving" />
                </div>



            </div>
        </form>

    )
}