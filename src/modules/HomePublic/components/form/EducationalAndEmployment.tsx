import { Divider, Popover, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconCalendarMonth, IconCaretDownFilled, IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { EducationalAndEmployment, Step } from "../../types";
import { ApplicationStore } from "../../store";
import { DatePicker, YearPickerInput } from "@mantine/dates";
import dayjs from "dayjs";

export default function index() {
    const { isMobile } = GlobalStore()

    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.educationAndEmployment,
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

    const onSubmit = async (form: EducationalAndEmployment) => {
        console.log(form)
        setApplicationForm({ ...applicationForm, educationAndEmployment: form })
        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper)
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.EducationalAndEmployment && formRef.current) {
            formRef.current.requestSubmit(); // Programmatically trigger form submission
        }
        return (setSubmit(false))
    }, [submit])

    const addFieldCharacter = () => {
        setApplicationForm({
            ...applicationForm, educationAndEmployment: {
                ...applicationForm.educationAndEmployment, employmentRecord: [...form.getValues().employmentRecord, {
                    employerCompany: '',
                    location: '',
                    positionHeld: '',
                    inclusiveDate: {
                        from: '',
                        to: ''
                    },
                    salary: '',
                    reasonForLeaving: '',
                }]
            }
        })
    };

    useEffect(() => {
        form.setValues({ employmentRecord: applicationForm.educationAndEmployment.employmentRecord });
    }, [applicationForm])

    const removeExperience = () => {

    }
    
    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4">
                <p className="font-bold">Educational Background</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput   {...form.getInputProps("educationBackground.nameOfSchool")} radius='md' w={isMobile ? '50%' : '100%'} label="Name of School" placeholder="Name of School" />
                    <TextInput   {...form.getInputProps("educationBackground.educationalLevel")} radius='md' w={isMobile ? '50%' : '100%'} label="Educational Level" placeholder="Educational Level" />
                </div>

                <div className="flex flex-col items-end sm:flex-row gap-4">
                    <TextInput  {...form.getInputProps("educationBackground.course")} radius='md' w={isMobile ? '50%' : '100%'} label="Course" placeholder="Course" />
                    <div className="flex flex-col sm:flex-row items-end gap-4 w-[100%]" >


                        <YearPickerInput
                            {...form.getInputProps("educationBackground.yearsAttended.from")}
                            w={isMobile ? '100%' : '100%'}
                            label="Years Attended"
                            placeholder={"From"}
                            radius={8}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={(value: Date | null) => {
                                form.setFieldValue(
                                    `educationBackground.yearsAttended.from`,
                                    value
                                );
                                console.log(form.getValues())
                            }}
                        />

                        <YearPickerInput
                            {...form.getInputProps("educationBackground.yearsAttended.to")}
                            w={isMobile ? '100%' : '100%'}
                            label=""
                            placeholder={"To"}
                            radius={8}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={(value: Date | null) => {
                                form.setFieldValue(
                                    `educationBackground.yearsAttended.to`,
                                    value
                                );
                                console.log(form.getValues())
                            }}
                        />

                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput   {...form.getInputProps("educationBackground.professionalLiscenses")} radius='md' w={isMobile ? '50%' : '100%'} label="Professional Licenses " placeholder="Professional Licenses " />
                    <TextInput   {...form.getInputProps("educationBackground.certfications")} radius='md' w={isMobile ? '50%' : '100%'} label="Certifications" placeholder="Certifications (Local/International)" />
                </div>

                <div>
                    <p className="font-bold">Employment Record</p>
                </div>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />

                {applicationForm.educationAndEmployment.employmentRecord.map((_, index) => (
                    <div key={index} className="flex flex-col">
                        <IconCircleMinus size={35} className="self-end m-0 p-0" onClick={() => { removeExperience() }} />
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <TextInput
                                {...form.getInputProps(`employmentRecord.${index}.employerCompany`)}
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Employer/Company"
                                placeholder="Employer/Company"
                            />
                            <TextInput
                                {...form.getInputProps(`employmentRecord.${index}.location`)}
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Location"
                                placeholder="Office Location"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <TextInput
                                {...form.getInputProps(`employmentRecord.${index}.positionHeld`)}
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Position Held"
                                placeholder="Position Held"
                            />
                            <div className="flex flex-col sm:flex-row items-end gap-4 w-[100%]">
                                {/* Inclusive Date From */}
                                <Popover position="bottom" shadow="md" trapFocus={true} returnFocus={true}>
                                    <Popover.Target>
                                        <TextInput
                                            key={form.key(`employmentRecord.${index}.inclusiveDate.from`)}
                                            {...form.getInputProps(`employmentRecord.${index}.inclusiveDate.from`)}
                                            radius='md'
                                            w={isMobile ? '25%' : '100%'}
                                            readOnly
                                            label="Inclusive Date"
                                            placeholder="From"
                                            className="w-full cursor-default"
                                            rightSection={<IconCalendarMonth />}
                                            styles={{ label: { color: "#6d6d6d" } }}
                                        />
                                    </Popover.Target>
                                    <Popover.Dropdown className="w-full">
                                        <DatePicker
                                            firstDayOfWeek={0}
                                            {...form.getInputProps(`employmentRecord.${index}.inclusiveDate.from`)}
                                            onChange={(value: Date | null) => {
                                                form.setFieldValue(
                                                    `employmentRecord.${index}.inclusiveDate.from`,
                                                    value ? dayjs(value).format("YYYY-MM-DD") : ''
                                                );
                                                console.log(form.getValues())
                                            }}
                                        />
                                    </Popover.Dropdown>
                                </Popover>

                                {/* Inclusive Date To */}
                                <Popover position="bottom" shadow="md" trapFocus={true} returnFocus={true}>
                                    <Popover.Target>
                                        <TextInput
                                            key={form.key(`employmentRecord.${index}.inclusiveDate.to`)}
                                            {...form.getInputProps(`employmentRecord.${index}.inclusiveDate.to`)}
                                            radius='md'
                                            w={isMobile ? '25%' : '100%'}
                                            readOnly
                                            label=""
                                            placeholder="To"
                                            className="w-full cursor-default"
                                            rightSection={<IconCalendarMonth />}
                                            styles={{ label: { color: "#6d6d6d" } }}
                                        />
                                    </Popover.Target>
                                    <Popover.Dropdown className="w-full">
                                        <DatePicker
                                            firstDayOfWeek={0}
                                            {...form.getInputProps(`employmentRecord.${index}.inclusiveDate.to`)}
                                            onChange={(value: Date | null) => {
                                                form.setFieldValue(
                                                    `employmentRecord.${index}.inclusiveDate.to`,
                                                    value ? dayjs(value).format("YYYY-MM-DD") : ''
                                                );
                                            }}
                                        />
                                    </Popover.Dropdown>
                                </Popover>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <TextInput
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Salary"
                                placeholder="Salary in PESO"
                                {...form.getInputProps(`employmentRecord.${index}.salary`)}
                            />
                            <TextInput
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Reason for Leaving"
                                placeholder="Reason for Leaving"
                                {...form.getInputProps(`employmentRecord.${index}.reasonForLeaving`)}
                            />
                        </div>

                    </div>
                ))}
                <p className="w-[13%] text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2" onClick={addFieldCharacter}><IconCirclePlus size={20} />Add Experience</p>


            </div>
        </form>

    )
}