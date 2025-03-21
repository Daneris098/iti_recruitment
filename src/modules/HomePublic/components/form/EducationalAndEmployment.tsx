import { Divider, MultiSelect, NumberInput, Popover, TextInput } from "@mantine/core";
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
    const [profesionalLicenses, setProfesionalLicenses] = useState<string[][]>([[]]);
    const [certifications, setCertifications] = useState<string[][]>([[]]);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.educationAndEmployment,
        validate: {
            educationBackground: {
                nameOfSchool: (value: string) => value.length === 0 ? "Name of School is required" : null,
                educationalLevel: (value: string) => value.length === 0 ? "Educational Level is required" : null,
                course: (value: string) => value.length === 0 ? "Course is required" : null,
                yearsAttended: {
                    from: (value: Date | string | null) => value == null ? "Year attended from is required" : null,
                    to: (value: Date | string | null) => value == null ? "Year attended to is required" : null,
                }
            },
        }
    });

    useEffect(() => {
        applicationForm.educationAndEmployment.educationBackground.forEach((item, index) => {
            const licensesArr = item.professionalLicenses.split(',')
            const certificationsArr = item.certfications.split(',')

            if (item.professionalLicenses != '') {
                if (index == 0) {
                    setProfesionalLicenses([licensesArr]);
                } else {
                    setProfesionalLicenses((prevValues) => [...prevValues, licensesArr]);
                }
            }

            if (item.certfications != '') {
                if (index == 0) {
                    setCertifications([certificationsArr]);
                } else {
                    setCertifications((prevValues) => [...prevValues, certificationsArr]);
                }
            }
        })
    }, [])

    const increaseLicenses = () => {
        setProfesionalLicenses((prevValues) => [...prevValues, []]);
    };

    const decreaseLicenses = () => {
        setProfesionalLicenses((prevValues) => prevValues.length > 0 ? prevValues.slice(0, -1) : prevValues);
    };

    const increaseCertifications = () => {
        setCertifications((prevValues) => [...prevValues, []]);
    };

    const decreaseCertifications = () => {
        setCertifications((prevValues) => prevValues.length > 0 ? prevValues.slice(0, -1) : prevValues);
    };

    const handleChangeLicenses = (index: number, value: string[]) => {
        const newSelectedValues = [...profesionalLicenses];
        newSelectedValues[index] = value;
        setProfesionalLicenses(newSelectedValues);
    };

    const handleKeyDownLicenses = (index: number, event: any) => {
        if (event.key === 'Enter' && event.target.value) {
            const newValue = event.target.value.trim();
            const newSelectedValues = [...profesionalLicenses];

            // Avoid adding the same value more than once
            if (!newSelectedValues[index].includes(newValue) && newValue != '') {
                newSelectedValues[index] = [...newSelectedValues[index], newValue];
                setProfesionalLicenses(newSelectedValues);
            }
            event.preventDefault();
        }
    };

    const handleChangeCertifications = (index: number, value: string[]) => {
        const newSelectedValues = [...certifications];
        newSelectedValues[index] = value;
        setCertifications(newSelectedValues);
    };

    const handleKeyDownCertifications = (index: number, event: any) => {
        if (event.key === 'Enter' && event.target.value) {
            const newValue = event.target.value.trim();
            const newSelectedValues = [...certifications];

            // Avoid adding the same value more than once
            if (!newSelectedValues[index].includes(newValue) && newValue != '') {
                newSelectedValues[index] = [...newSelectedValues[index], newValue];
                setCertifications(newSelectedValues);
            }
            event.preventDefault();
        }
    };

    const onSubmit = async (form: EducationalAndEmployment) => {
        let educationBackground = form.educationBackground
        for (let i = 0; i < educationBackground.length; i++) {
            educationBackground[i].professionalLicenses = profesionalLicenses[i].toString()
            educationBackground[i].certfications = certifications[i].toString()
        }
        form.educationBackground = educationBackground
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
        decreaseLicenses()
        decreaseCertifications()
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
            let invalid = false
            // form.validate();  
            form.getValues().employmentRecord.forEach((item, index) => {
                if (item.employerCompany != '' || item.location != '' || item.positionHeld != '' || item.inclusiveDate.from != null || item.inclusiveDate.to != null || item.salary > 0 || item.reasonForLeaving != '') {
                    if (item.employerCompany === '') {
                        form.setFieldError(`employmentRecord.${index}.employerCompany`, 'Employer/Company is required');
                        invalid = true
                    }

                    if (item.location === '') {
                        form.setFieldError(`employmentRecord.${index}.location`, 'Location is required');
                        invalid = true
                    }

                    if (item.positionHeld === '') {
                        form.setFieldError(`employmentRecord.${index}.positionHeld`, 'Position Held is required');
                        invalid = true
                    }

                    if (item.inclusiveDate.from === null) {
                        form.setFieldError(`employmentRecord.${index}.inclusiveDate.from`, 'Inclusive date from is required');
                        invalid = true
                    }

                    if (item.inclusiveDate.to === null) {
                        form.setFieldError(`employmentRecord.${index}.inclusiveDate.to`, 'Inclusive date to is required');
                        invalid = true
                    }

                    if (item.salary === 0) {
                        form.setFieldError(`employmentRecord.${index}.salary`, 'Salary is required');
                        invalid = true
                    }

                    if (item.reasonForLeaving === '') {
                        form.setFieldError(`employmentRecord.${index}.reasonForLeaving`, 'Reason for leaving is required');
                        invalid = true
                    }
                }
                else {
                    form.clearFieldError(`employmentRecord.${index}.employerCompany`)
                    form.clearFieldError(`employmentRecord.${index}.location`)
                    form.clearFieldError(`employmentRecord.${index}.positionHeld`)
                    form.clearFieldError(`employmentRecord.${index}.inclusiveDate.from`)
                    form.clearFieldError(`employmentRecord.${index}.inclusiveDate.to`)
                    form.clearFieldError(`employmentRecord.${index}.inclusiveDate.salary`)
                    form.clearFieldError(`employmentRecord.${index}.inclusiveDate.reasonForLeaving`)
                }
            });

            if (!invalid) {
                formRef.current.requestSubmit();
            }
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
                    salary: 0,
                    reasonForLeaving: '',
                }]
            }
        })
    };

    const addEducationBackground = () => {
        increaseLicenses()
        increaseCertifications()
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
                        from: null,
                        to: null,
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
                            <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps(`educationBackground.${index}.nameOfSchool`)} radius='md' w={isMobile ? '50%' : '100%'} label="Name of School" placeholder="Name of School" />
                            <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps(`educationBackground.${index}.educationalLevel`)} radius='md' w={isMobile ? '50%' : '100%'} label="Educational Level" placeholder="Educational Level" />
                            {index != 0 && (<IconCircleMinus size={35} className="absolute right-[0%] -top-[25%] cursor-pointer" onClick={() => { removeEducationBackground(item.id) }} />)}
                        </div>

                        <div className="flex flex-col items-end sm:flex-row gap-4">
                            <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps(`educationBackground.${index}.course`)} radius='md' w={isMobile ? '50%' : '100%'} label="Course" placeholder="Course" />
                            <div className="flex flex-col sm:flex-row items-end gap-4 w-[100%]" >


                                <YearPickerInput
                                    {...form.getInputProps(`educationBackground.${index}.yearsAttended.from`)}
                                    w={isMobile ? '100%' : '100%'}
                                    label="Years Attended"
                                    placeholder={"From"}
                                    radius={8}
                                    rightSection={<IconCaretDownFilled size='18' />}
                                    className="border-none w-full text-sm"
                                    classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
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
                                    classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
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
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                label="Professional Licenses"
                                placeholder={item.professionalLicenses == '' ? 'Professional Licenses' : ''}
                                data={[]}
                                w={isMobile ? '50%' : '100%'}
                                radius='md'
                                searchable
                                value={profesionalLicenses[index]}
                                onChange={(value) => handleChangeLicenses(index, value)}
                                onKeyDown={(event) => handleKeyDownLicenses(index, event)}
                                rightSection
                            />
                            <MultiSelect
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                label="Certifications"
                                placeholder={item.professionalLicenses == '' ? 'Certifications (Local/International)' : ''}
                                data={[]}
                                w={isMobile ? '50%' : '100%'}
                                radius='md'
                                searchable
                                value={certifications[index]}
                                onChange={(value) => handleChangeCertifications(index, value)}
                                onKeyDown={(event) => handleKeyDownCertifications(index, event)}
                                rightSection
                            />
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
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                {...form.getInputProps(`employmentRecord.${index}.employerCompany`)}
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Employer/Company"
                                placeholder="Employer/Company"
                            />
                            <TextInput
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
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
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
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
                                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
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
                                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
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
                            <NumberInput
                                prefix="₱ "
                                hideControls
                                min={0}
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                radius='md'
                                w={isMobile ? '50%' : '100%'}
                                label="Salary"
                                placeholder="Salary in PESO"
                                {...form.getInputProps(`employmentRecord.${index}.salary`)}
                            />
                            <TextInput
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
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