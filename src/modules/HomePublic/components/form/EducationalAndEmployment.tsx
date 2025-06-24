import { Divider, Flex, NumberInput, Popover, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconCalendarMonth, IconCaretDownFilled, IconCircleMinus, IconCirclePlus, IconPlus } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { EducationalAndEmployment, Step, EmploymentRecord, EducationBackground } from "../../types";
import { ApplicationStore } from "../../store";
import { DatePicker, YearPickerInput } from "@mantine/dates";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useMediaQuery } from "@mantine/hooks";
import { PillsInput, Pill, Combobox, useCombobox } from '@mantine/core';

export default function index() {
    const { isMobile } = GlobalStore()
    const [vacancyDuration, setVacancyDuration] = useState<[Date | null, Date | null]>([null, null]);
    const isGreaterThanSp = useMediaQuery("(min-width: 769px)");
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()
    const [profesionalLicenses, setProfesionalLicenses] = useState<string[][]>([[]]);
    const [certifications, setCertifications] = useState<string[][]>([[]]);
    const [opened, setOpened] = useState(false);
    const [opened2, setOpened2] = useState(false);
    const togglePopover = (index: number, isStart: boolean) => {
        setOpened((prev: any) => ({
            ...prev,
            [index]: isStart ? !prev[index] : false,
        }));
        setOpened2((prev: any) => ({
            ...prev,
            [index]: isStart ? false : !prev[index],
        }));
    };
    const [professionaLicensesInput, setProfessionaLicensesInput] = useState<string[]>([]);
    const [certificationsInput, setCertificationsInput] = useState<string[]>([]);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const valuesComputed = (index: number, mode: string) => {
        if (mode === 'professionaLicenses')
            return profesionalLicenses[index]?.length
                ? profesionalLicenses[index].map((item) => (
                    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(mode, item, index)}>
                        {item}
                    </Pill>
                ))
                : <></>;
        else
            return certifications[index]?.length
                ? certifications[index].map((item) => (
                    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(mode, item, index)}>
                        {item}
                    </Pill>
                ))
                : <></>;
    }

    const handleAdd = (mode: string, index: number) => {
        if (mode === 'professionaLicenses') {
            const rawValue = professionaLicensesInput[index];
            const newValue = rawValue.trim();
            if (newValue !== '' && !profesionalLicenses[index]?.includes(newValue)) {
                setProfesionalLicenses((prev) => {
                    const updated = [...prev];
                    if (!Array.isArray(updated[index])) {
                        updated[index] = [];
                    }
                    const newVal = [...updated[index], newValue];
                    updated[index] = newVal;
                    form.setFieldValue(`educationBackground.${index}.professionalLicenses`, newVal);
                    return updated;
                });
                setProfessionaLicensesInput((prev) => {
                    const updated = [...prev];
                    updated[index] = '';
                    return updated;
                });
            }
        } else {
            const rawValue = certificationsInput[index];
            const newValue = rawValue.trim();
            if (newValue !== '' && !certifications[index]?.includes(newValue)) {
                setCertifications((prev) => {
                    const updated = [...prev];
                    if (!Array.isArray(updated[index])) {
                        updated[index] = [];
                    }
                    const newVal = [...updated[index], newValue];
                    updated[index] = newVal;
                    form.setFieldValue(`educationBackground.${index}.certifications`, newVal);
                    return updated;
                });
                setCertificationsInput((prev) => {
                    const updated = [...prev];
                    updated[index] = '';
                    return updated;
                });
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, mode: string, index: number) => {
        if (event.key === 'Enter') {
            const newValue = event.currentTarget.value.trim();
            if (newValue === '') {
                event.preventDefault(); // prevent Enter from submitting empty/whitespace input
                return;
            }

            if (mode === 'professionaLicenses') {
                if (!profesionalLicenses[index]?.includes(newValue)) {
                    setProfesionalLicenses((prev) => {
                        const updated = [...prev];
                        if (!Array.isArray(updated[index])) {
                            updated[index] = [];
                        }
                        const newVal = [...updated[index], newValue];
                        updated[index] = newVal;
                        form.setFieldValue(`educationBackground.${index}.professionalLicenses`, newVal);
                        return updated;
                    });

                    setProfessionaLicensesInput((prev) => {
                        const updated = [...prev];
                        updated[index] = '';
                        return updated;
                    });
                }
            } else {
                if (!certifications[index]?.includes(newValue)) {
                    setCertifications((prev) => {
                        const updated = [...prev];
                        if (!Array.isArray(updated[index])) {
                            updated[index] = [];
                        }
                        const newVal = [...updated[index], newValue];
                        updated[index] = newVal;
                        form.setFieldValue(`educationBackground.${index}.certifications`, newVal);
                        return updated;
                    });

                    setCertificationsInput((prev) => {
                        const updated = [...prev];
                        updated[index] = '';
                        return updated;
                    });
                }
            }

            event.preventDefault(); // prevent default after handling valid input
        }
    };


    const handleValueRemove = (mode: string, val: string, index: number) => {
        if (mode == 'professionaLicenses') {
            setProfesionalLicenses((prev) => {
                const updated = [...prev];
                const newVal = updated[index].filter((item) => item !== val);
                updated[index] = newVal;
                form.setFieldValue(`educationBackground.${index}.professionalLicenses`, newVal);
                return updated;
            });
        }
        else {
            setCertifications((prev) => {
                const updated = [...prev];
                const newVal = updated[index].filter((item) => item !== val);
                updated[index] = newVal;
                form.setFieldValue(`educationBackground.${index}.certifications`, newVal);
                return updated;
            });
        }
    };

    const form = useForm({
        mode: 'controlled',
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
            if (item.professionalLicenses != undefined && item.professionalLicenses !== '') {
                const licensesArr = item.professionalLicenses.split(',');
                if (index === 0) {
                    setProfesionalLicenses([licensesArr]);
                } else {
                    setProfesionalLicenses((prevValues) => [...prevValues, licensesArr]);
                }
            }

            if (item.certifications != undefined && item.certifications !== '') {
                const certificationsArr = item.certifications.split(',');
                if (index === 0) {
                    setCertifications([certificationsArr]);
                } else {
                    setCertifications((prevValues) => [...prevValues, certificationsArr]);
                }
            }
        });
    }, []);


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


    const onSubmit = async (form: EducationalAndEmployment) => {
        let educationBackground = form.educationBackground
        for (let i = 0; i < educationBackground.length; i++) {
            if (profesionalLicenses[i] !== undefined && profesionalLicenses[i] !== null) {
                educationBackground[i].professionalLicenses = profesionalLicenses[i].toString();
            }
            if (certifications[i] !== undefined && certifications[i] !== null) {
                educationBackground[i].certifications = certifications[i].toString();
            }
            // educationBackground[i].professionalLicenses = profesionalLicenses[i].toString()
            // educationBackground[i].certifications = certifications[i].toString()
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
                if (item.employerCompany != '' || item.location != '' || item.positionHeld != '' || item.inclusiveDate.from != null || item.inclusiveDate.to != null || (item.salary != '' && Number(item.salary) > 0) || item.reasonForLeaving != '') {
                    if (item.employerCompany === '') {
                        form.setFieldError(`employmentRecord.${index}.employerCompany`, 'Employer/Company is required');
                        form.getInputNode?.(`employmentRecord.${index}.employerCompany`)?.focus();
                        invalid = true
                    }

                    if (item.location === '') {
                        form.setFieldError(`employmentRecord.${index}.location`, 'Location is required');
                        form.getInputNode?.(`employmentRecord.${index}.location`)?.focus();
                        invalid = true
                    }

                    if (item.positionHeld === '') {
                        form.setFieldError(`employmentRecord.${index}.positionHeld`, 'Position Held is required');
                        form.getInputNode?.(`employmentRecord.${index}.positionHeld`)?.focus();
                        invalid = true
                    }

                    if (item.inclusiveDate.from == null || item.inclusiveDate.from == "") {
                        form.setFieldError(`employmentRecord.${index}.inclusiveDate.from`, 'Inclusive date from is required');
                        form.getInputNode?.(`employmentRecord.${index}.inclusiveDate.from`)?.focus();
                        invalid = true
                    }

                    if (item.inclusiveDate.to == null || item.inclusiveDate.to == "") {
                        form.setFieldError(`employmentRecord.${index}.inclusiveDate.to`, 'Inclusive date to is required');
                        form.getInputNode?.(`employmentRecord.${index}.inclusiveDate.to`)?.focus();
                        invalid = true
                    }

                    if (item.salary === 0) {
                        form.setFieldError(`employmentRecord.${index}.salary`, 'Salary is required');
                        form.getInputNode?.(`employmentRecord.${index}.salary`)?.focus();

                        invalid = true
                    }

                    if (item.reasonForLeaving === '') {
                        form.setFieldError(`employmentRecord.${index}.reasonForLeaving`, 'Reason for leaving is required');
                        form.getInputNode?.(`employmentRecord.${index}.reasonForLeaving`)?.focus();
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

            form.getValues().employmentRecord.forEach((item) => {
                if (item.salary === '') {
                    item.salary = 0
                }
            })

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
                ...applicationForm.educationAndEmployment,
                educationBackground: [...form.getValues().educationBackground],
                employmentRecord: [...form.getValues().employmentRecord, {
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
                ...applicationForm.educationAndEmployment,
                employmentRecord: [...form.getValues().employmentRecord],
                educationBackground: [...form.getValues().educationBackground, {
                    id: uniqueId,
                    nameOfSchool: '',
                    educationalLevel: '',
                    course: '',
                    yearsAttended: {
                        from: null,
                        to: null,
                    },
                    professionalLicenses: '',
                    certifications: '',
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

    useEffect(() => {
        if (vacancyDuration[0] != null && vacancyDuration[1] != null) {
            setOpened(false)
            setOpened2(false)
        }
    }, [vacancyDuration])

    return (
        <form
            ref={formRef}
            onSubmit={
                async (e) => {
                    e.preventDefault(); // Prevent default submission first
                    const isValid = form.validate(); // Runs validation on all fields
                    if (!isValid.hasErrors) {
                        const values = form.getValues(); // safely get form values
                        await onSubmit(values);
                    } else {
                        const firstErrorPath = Object.keys(isValid.errors)[0];
                        form.getInputNode(firstErrorPath)?.focus();
                    }
                }}
        >
            <div className="text-[#6D6D6D] flex flex-col gap-4">

                <p className="font-bold">Educational Background</p>
                {applicationForm.educationAndEmployment.educationBackground.map((item: EducationBackground, index) => (
                    <div key={item.id} className="flex flex-col gap-4 relative ">

                        <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                        <div className="flex flex-col sm:flex-row gap-4 items-end relative">
                            <TextInput withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps(`educationBackground.${index}.nameOfSchool`)} radius='md' w={isMobile ? '50%' : '100%'} label="Name of School" placeholder="Name of School" />
                            <TextInput withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps(`educationBackground.${index}.educationalLevel`)} radius='md' w={isMobile ? '50%' : '100%'} label="Educational Level" placeholder="Educational Level" />
                            {index != 0 && (<IconCircleMinus size={35} className="absolute right-[0%] -top-[10%] sp:-top-[25%] cursor-pointer" onClick={() => { removeEducationBackground(item.id) }} />)}
                        </div>

                        <div className="flex flex-col items-end sm:flex-row gap-4">
                            <TextInput withAsterisk classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps(`educationBackground.${index}.course`)} radius='md' w={isMobile ? '50%' : '100%'} label="Course" placeholder="Course" />
                            <div className="flex  items-end gap-4 w-[100%]" >


                                <YearPickerInput
                                    withAsterisk
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
                                    maxDate={new Date()}
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
                            <div className="flex items-center w-full sp:w-1/2">
                                <Combobox store={combobox}  >
                                    <Combobox.DropdownTarget>
                                        <PillsInput label="Professional Licenses" className="flex-grow" radius={8} onClick={() => combobox.openDropdown()}   {...form.getInputProps(`educationBackground.${index}.professionalLicenses`)} >
                                            <Pill.Group>
                                                {valuesComputed(index, 'professionaLicenses')}
                                                <Combobox.EventsTarget>
                                                    <PillsInput.Field
                                                        onFocus={() => combobox.openDropdown()}
                                                        onBlur={() => combobox.closeDropdown()}
                                                        value={professionaLicensesInput[index]}
                                                        placeholder="Enter Keyword to add Professiona Licenses"
                                                        onChange={(event) => {
                                                            combobox.updateSelectedOptionIndex();
                                                            const value = event?.target?.value ?? '';
                                                            setProfessionaLicensesInput((prev) => {
                                                                const updated = [...prev];
                                                                updated[index] = value;
                                                                return updated;
                                                            });

                                                        }}
                                                        onKeyDown={(event) => handleKeyDown(event, 'professionaLicenses', index)}
                                                    />
                                                </Combobox.EventsTarget>
                                            </Pill.Group>
                                        </PillsInput>
                                    </Combobox.DropdownTarget>
                                </Combobox>
                                <IconPlus className="cursor-pointer mt-5 ml-1" onClick={() => { handleAdd('professionaLicenses', index) }} />
                            </div>
                            <div className="flex items-center w-full sp:w-1/2">
                                <Combobox store={combobox}  >
                                    <Combobox.DropdownTarget>
                                        <PillsInput label="Certifications" className="flex-grow" radius={8} onClick={() => combobox.openDropdown()}   {...form.getInputProps(`educationBackground.${index}.certifications`)} >
                                            <Pill.Group>
                                                {valuesComputed(index, 'certifications')}
                                                <Combobox.EventsTarget>
                                                    <PillsInput.Field
                                                        onFocus={() => combobox.openDropdown()}
                                                        onBlur={() => combobox.closeDropdown()}
                                                        value={certificationsInput[index]}
                                                        placeholder="Enter Keyword to add Certifications (Local/International)"
                                                        onChange={(event) => {
                                                            console.log('event: ', event.currentTarget.value)
                                                            combobox.updateSelectedOptionIndex();
                                                            const value = event?.target?.value ?? '';
                                                            setCertificationsInput((prev) => {
                                                                const updated = [...prev];
                                                                updated[index] = value;
                                                                return updated;
                                                            });

                                                        }}
                                                        onKeyDown={(event) => handleKeyDown(event, 'certifications', index)}
                                                    />
                                                </Combobox.EventsTarget>
                                            </Pill.Group>
                                        </PillsInput>
                                    </Combobox.DropdownTarget>
                                </Combobox>
                                <IconPlus className="cursor-pointer mt-5 ml-1" onClick={() => { handleAdd('certifications', index) }} />
                            </div>
                        </div>

                    </div>
                ))}
                <p className="sp:w-40 text-sm bg-[#559cda] text-white p-3 sp:px-2 sp:py-1 rounded-lg justify-center font-semibold cursor-pointer flex gap-2 m-1" onClick={addEducationBackground}><IconCirclePlus size={20} />ADD EDUCATION</p>


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
                            {index != 0 && (<IconCircleMinus size={35} className="absolute right-[0%] -top-[10%] sp:-top-[25%] cursor-pointer" onClick={() => { removeEmploymentRecord(item.id) }} />)}
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

                                <Flex
                                    direction="row"
                                    justify="space-between"
                                    gap={12}
                                    className="w-full items-end"
                                >

                                    <Popover opened={(opened as any)[index]} position="bottom" shadow="md" trapFocus returnFocus>
                                        <Popover.Target>
                                            <TextInput
                                                radius="md"
                                                size="sm"
                                                readOnly
                                                label="Inclusive Dates"
                                                placeholder="Start Date"
                                                className="w-full cursor-default"
                                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                                rightSection={<IconCalendarMonth />}
                                                styles={{ label: { color: "#6d6d6d" } }}
                                                {...form.getInputProps(`employmentRecord.${index}.inclusiveDate.from`)}
                                                key={form.key(`employmentRecord.${index}.inclusiveDate.from`)}
                                                onClick={() => togglePopover(index, true)}
                                            />
                                        </Popover.Target>
                                        <Popover.Dropdown className="w-full">
                                            <DatePicker
                                                firstDayOfWeek={0}
                                                numberOfColumns={isGreaterThanSp ? 2 : 1}
                                                type="range"
                                                value={vacancyDuration}
                                                onChange={(e) => {
                                                    if (e[0])
                                                        form.setFieldValue(`employmentRecord.${index}.inclusiveDate.from`, DateTimeUtils.dayWithDate(e[0].toString()));
                                                    else
                                                        form.setFieldValue(`employmentRecord.${index}.inclusiveDate.from`, null);

                                                    if (e[1])
                                                        form.setFieldValue(`employmentRecord.${index}.inclusiveDate.to`, DateTimeUtils.dayWithDate(e[1].toString()));
                                                    else
                                                        form.setFieldValue(`employmentRecord.${index}.inclusiveDate.to`, null);

                                                    setVacancyDuration(e);
                                                }}
                                            />
                                        </Popover.Dropdown>
                                    </Popover>

                                    <Popover opened={(opened2 as any)[index]} position="bottom" shadow="md">
                                        <Popover.Target>
                                            <TextInput
                                                required
                                                radius="md"
                                                size="sm"
                                                readOnly
                                                label=""
                                                placeholder="End Date"
                                                rightSection={<IconCalendarMonth />}
                                                className="w-full"
                                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                                styles={{ label: { color: "#6d6d6d" } }}
                                                {...form.getInputProps(`employmentRecord.${index}.inclusiveDate.to`)}
                                                key={form.key(`employmentRecord.${index}.inclusiveDate.to`)}
                                                onClick={() => togglePopover(index, false)}
                                            />
                                        </Popover.Target>
                                        <Popover.Dropdown>
                                            <DatePicker
                                                numberOfColumns={isGreaterThanSp ? 2 : 1}
                                                type="range"
                                                value={vacancyDuration}
                                                onChange={(e) => {
                                                    if (e[0])
                                                        form.setFieldValue(`employmentRecord.${index}.inclusiveDate.from`, DateTimeUtils.dayWithDate(e[0].toString()));
                                                    else
                                                        form.setFieldValue(`employmentRecord.${index}.inclusiveDate.from`, null);
                                                    if (e[1])
                                                        form.setFieldValue(`employmentRecord.${index}.inclusiveDate.to`, DateTimeUtils.dayWithDate(e[1].toString()));
                                                    else
                                                        form.setFieldValue(`employmentRecord.${index}.inclusiveDate.to`, null);
                                                    setVacancyDuration(e);
                                                }}
                                            />
                                        </Popover.Dropdown>
                                    </Popover>


                                </Flex>

                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <NumberInput
                                prefix="₱ "
                                hideControls
                                min={0}
                                minLength={0}
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
                <p className="justify-center sp:w-40 text-sm bg-[#559cda] text-white p-3 sp:px-2 sp:py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-1" onClick={addEmploymentRecord}><IconCirclePlus size={20} />ADD EXPERIENCE</p>


            </div>
        </form>

    )
}