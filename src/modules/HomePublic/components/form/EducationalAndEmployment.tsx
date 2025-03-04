import { Divider, MultiSelect, Popover, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconCalendarMonth, IconCaretDownFilled, IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { EducationalAndEmployment, Step, EmploymentRecord, EducationBackground } from "../../types";
import { ApplicationStore } from "../../store";
import { DatePicker, YearPickerInput } from "@mantine/dates";
import dayjs from "dayjs";

export default function index() {
    const { isMobile } = GlobalStore()

    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()


    const [profesionalLicense, setProfesionalLicense] = useState<string[][]>([[]]);

    useEffect(() => {
        applicationForm.educationAndEmployment.educationBackground.forEach((item, index) => {
            const arr = item.professionalLicenses.split(',')
            if (index == 0) {
                setProfesionalLicense([arr]);
            } else {
                setProfesionalLicense((prevValues) => [...prevValues, arr]);
            }
        })
    }, [])

    const increaseSelectedValues = () => {
        setProfesionalLicense((prevValues) => [...prevValues, []]);
    };

    const decreaseSelectedValues = () => {
        setProfesionalLicense((prevValues) => prevValues.length > 0 ? prevValues.slice(0, -1) : prevValues);
    };

    const handleChange = (index: number, value: string[]) => {
        const newSelectedValues = [...profesionalLicense];
        newSelectedValues[index] = value;
        setProfesionalLicense(newSelectedValues);
    };

    const handleKeyDown = (index: number, event: any) => {
        if (event.key === 'Enter' && event.target.value) {
            const newValue = event.target.value.trim();
            const newSelectedValues = [...profesionalLicense];

            // Avoid adding the same value more than once
            if (!newSelectedValues[index].includes(newValue)) {
                newSelectedValues[index] = [...newSelectedValues[index], newValue];
                setProfesionalLicense(newSelectedValues);
            }
            event.preventDefault();
        }
    };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.educationAndEmployment,
        validate: {
            // educationBackground: {
            //     nameOfSchool: (value: string) => value.length === 0 ? "Name of School is required" : null,
            // },
        }
    });

    const onSubmit = async (form: EducationalAndEmployment) => {
        // just map the form here
        let educationBackground = form.educationBackground
        console.log('form: ', form)
        console.log('educationBackground: ', form.educationBackground)
        console.log('profesionalLicense: ', profesionalLicense)

        for (let i = 0; i < educationBackground.length; i++) {
            educationBackground[i].professionalLicenses = profesionalLicense[i].toString()
        }

        console.log('updated educationBackground: ', educationBackground)
        form.educationBackground = educationBackground
        console.log('updated form: ', form)
        setApplicationForm({ ...applicationForm, educationAndEmployment: form })
        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper)
    };

    const removeEmploymentRecord = (id: number) => {
        const employmentRecord = applicationForm.educationAndEmployment.employmentRecord
        const updatedEmploymentRecords = employmentRecord.filter((item: EmploymentRecord) => item.id != id)
        setApplicationForm({
            ...applicationForm, educationAndEmployment: {
                ...applicationForm.educationAndEmployment, employmentRecord: updatedEmploymentRecords
            }
        })
    }

    const removeEducationBackground = (id: number) => {
        decreaseSelectedValues()
        const educationBackground = applicationForm.educationAndEmployment.educationBackground
        const updatedEmploymentRecords = educationBackground.filter((item: EducationBackground) => item.id != id)
        setApplicationForm({
            ...applicationForm, educationAndEmployment: {
                ...applicationForm.educationAndEmployment, educationBackground: updatedEmploymentRecords
            }
        })
    }

    useEffect(() => {
        if (submit === true && activeStepper === Step.EducationalAndEmployment && formRef.current) {
            formRef.current.requestSubmit(); // Programmatically trigger form submission
        }
        return (setSubmit(false))
    }, [submit])

    const addEmploymentRecord = () => {
        const employmentRecord = applicationForm.educationAndEmployment.employmentRecord
        const employmentRecordLength = employmentRecord.length
        const uniqueId = employmentRecord[employmentRecordLength - 1].id + (Math.floor(Math.random() * 101 + 1))


        setApplicationForm({
            ...applicationForm, educationAndEmployment: {
                ...applicationForm.educationAndEmployment, employmentRecord: [...form.getValues().employmentRecord, {
                    id: uniqueId,
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

    const addEducationBackground = () => {
        increaseSelectedValues()
        const educationBackground = applicationForm.educationAndEmployment.educationBackground
        const educationBackgroundLength = educationBackground.length
        const uniqueId = educationBackground[educationBackgroundLength - 1].id + (Math.floor(Math.random() * 101 + 1))


        setApplicationForm({
            ...applicationForm, educationAndEmployment: {
                ...applicationForm.educationAndEmployment, educationBackground: [...form.getValues().educationBackground, {
                    id: uniqueId,
                    nameOfSchool: '',
                    educationalLevel: '',
                    course: '',
                    yearsAttended: {
                        from: '',
                        to: '',
                    },
                    professionalLicenses: '',
                    certfications: '',
                }]
            }
        })
    };

    useEffect(() => {
        form.setValues({
            employmentRecord: applicationForm.educationAndEmployment.employmentRecord,
            educationBackground: applicationForm.educationAndEmployment.educationBackground
        });
    }, [applicationForm])

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4">

                <p className="font-bold">Educational Background</p>
                {applicationForm.educationAndEmployment.educationBackground.map((item: EducationBackground, index) => (
                    <div key={item.id} className="flex flex-col gap-4 relative ">

                        <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                        <div className="flex flex-col sm:flex-row gap-4 items-end relative">
                            <TextInput classNames={{ input: 'poppins' }}   {...form.getInputProps(`educationBackground.${index}.nameOfSchool`)} radius='md' w={isMobile ? '50%' : '100%'} label="Name of School" placeholder="Name of School" />
                            <TextInput classNames={{ input: 'poppins' }}  {...form.getInputProps(`educationBackground.${index}.educationalLevel`)} radius='md' w={isMobile ? '50%' : '100%'} label="Educational Level" placeholder="Educational Level" />
                            {index != 0 && (<IconCircleMinus size={35} className="absolute right-[0%] -top-[25%] cursor-pointer" onClick={() => { removeEducationBackground(item.id) }} />)}
                        </div>

                        <div className="flex flex-col items-end sm:flex-row gap-4">
                            <TextInput classNames={{ input: 'poppins' }} {...form.getInputProps(`educationBackground.${index}.course`)} radius='md' w={isMobile ? '50%' : '100%'} label="Course" placeholder="Course" />
                            <div className="flex flex-col sm:flex-row items-end gap-4 w-[100%]" >


                                <YearPickerInput
                                    {...form.getInputProps(`educationBackground.${index}.yearsAttended.from`)}
                                    w={isMobile ? '100%' : '100%'}
                                    label="Years Attended"
                                    placeholder={"From"}
                                    radius={8}
                                    rightSection={<IconCaretDownFilled size='18' />}
                                    className="border-none w-full text-sm"
                                    classNames={{ label: "p-1", input: 'poppins' }}
                                    styles={{ label: { color: "#6d6d6d" } }}
                                    onChange={(value: Date | null) => {
                                        form.setFieldValue(
                                            `educationBackground.${index}.yearsAttended.from`,
                                            value
                                        );
                                    }}
                                />

                                <YearPickerInput
                                    {...form.getInputProps(`educationBackground.${index}.yearsAttended.to`)}
                                    w={isMobile ? '100%' : '100%'}
                                    label=""
                                    placeholder={"To"}
                                    radius={8}
                                    rightSection={<IconCaretDownFilled size='18' />}
                                    className="border-none w-full text-sm"
                                    classNames={{ label: "p-1", input: 'poppins' }}
                                    styles={{ label: { color: "#6d6d6d" } }}
                                    onChange={(value: Date | null) => {
                                        form.setFieldValue(
                                            `educationBackground.${index}.yearsAttended.to`,
                                            value
                                        );
                                    }}
                                />

                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <MultiSelect
                                classNames={{ input: 'poppins' }}
                                label="Professional Licenses "
                                placeholder="Professional Licenses "
                                data={[]}
                                w={isMobile ? '50%' : '100%'}
                                radius='md'
                                searchable
                                value={profesionalLicense[index]}
                                onChange={(value) => handleChange(index, value)}
                                onKeyDown={(event) => handleKeyDown(index, event)}
                                rightSection
                            />
                            {/* <TextInput classNames={{ input: 'poppins' }}  {...form.getInputProps(`educationBackground.${index}.professionalLiscenses`)} radius='md' w={isMobile ? '50%' : '100%'} label="Professional Licenses " placeholder="Professional Licenses " /> */}
                            <TextInput classNames={{ input: 'poppins' }}  {...form.getInputProps(`educationBackground.${index}.certfications`)} radius='md' w={isMobile ? '50%' : '100%'} label="Certifications" placeholder="Certifications (Local/International)" />
                        </div>

                    </div>
                ))}
                <p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-1" onClick={addEducationBackground}><IconCirclePlus size={20} />ADD EDUCATION</p>


                <p className="font-bold">Employment Record</p>
                {applicationForm.educationAndEmployment.employmentRecord.map((item: EmploymentRecord, index) => (
                    <div key={item.id} className="flex flex-col gap-4 relative ">

                        <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full pb-4" />
                        <div className="flex flex-col sm:flex-row gap-4 items-end relative">
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`employmentRecord.${index}.employerCompany`)}
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Employer/Company"
                                placeholder="Employer/Company"
                            />
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`employmentRecord.${index}.location`)}
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Location"
                                placeholder="Office Location"
                            />
                            {index != 0 && (<IconCircleMinus size={35} className="absolute right-[0%] -top-[25%] cursor-pointer" onClick={() => { removeEmploymentRecord(item.id) }} />)}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <TextInput
                                classNames={{ input: 'poppins' }}
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
                                            classNames={{ label: "p-1", input: 'poppins' }}
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
                                            classNames={{ label: "p-1", input: 'poppins' }}
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
                                classNames={{ input: 'poppins' }}
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Salary"
                                placeholder="Salary in PESO"
                                {...form.getInputProps(`employmentRecord.${index}.salary`)}
                            />
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Reason for Leaving"
                                placeholder="Reason for Leaving"
                                {...form.getInputProps(`employmentRecord.${index}.reasonForLeaving`)}
                            />
                        </div>

                    </div>
                ))}
                <p className="w-40 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-1" onClick={addEmploymentRecord}><IconCirclePlus size={20} />ADD EXPERIENCE</p>


            </div>
        </form>

    )
}