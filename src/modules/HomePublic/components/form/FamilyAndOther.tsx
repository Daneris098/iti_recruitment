import { Divider, NumberInput, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconCirclePlus, IconCircleMinus, IconPlus } from "@tabler/icons-react";
import { FamilyBackground, Step } from "../../types";
import { ApplicationStore } from "../../store";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { PillsInput, Pill, Combobox, useCombobox } from '@mantine/core';

export default function index() {
    const skillsFieldRef = useRef<HTMLInputElement>(null);
    const { isMobile } = GlobalStore()
    const formRef = useRef<HTMLFormElement>(null);
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()
    const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });
    const values = technicalSkills.map((item) => (
        <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
            {item}
        </Pill>
    ));

    const handleAdd = () => {
        const newValue = search.trim();
        if (newValue !== "" && !technicalSkills.includes(newValue)) {
            setTechnicalSkills((prev) => [...prev, newValue]);
            setSearch("");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const newValue = event.currentTarget.value.trim();
            if (newValue !== "" && !technicalSkills.includes(newValue)) {
                setTechnicalSkills((prev) => [...prev, newValue]);
                setSearch("");
            }
            event.preventDefault(); // Prevent form submission or default behavior
        }
    };


    const handleValueRemove = (val: string) => {
        setTechnicalSkills((prev) => prev.filter(item => item != val));
        form.setFieldValue('otherInformation.specialTechnicalSkills', val);
    }


    useEffect(() => {
        if (applicationForm.familyBackground.otherInformation.specialTechnicalSkills != '') {
            setTechnicalSkills(applicationForm.familyBackground.otherInformation.specialTechnicalSkills.split(','))
        }
    }, [])

    useEffect(() => {
        const newVal = technicalSkills.length > 0 ? technicalSkills.toString() : '';
        form.setFieldValue('otherInformation.specialTechnicalSkills', newVal);
    }, [technicalSkills])

    const form = useForm({
        mode: 'controlled',
        initialValues: applicationForm.familyBackground,
        validate: {
            // father: {
            //     fullname: (value: string) => !value.trim() ? "Fullname is required" : null,
            //     age: (value: number) => value <= 0 ? "Age is required" : null,
            //     occupation: (value: string) => !value.trim() ? "Occupation is required" : null,
            //     contactNumber: (value: string | number) => !value.toString().trim() ? "Contact Number is required" : value.toString().length < 11 ? "Contact Number Minimum length 11" : null,
            // },
            // mother: {
            //     fullname: (value: string) => !value.trim() ? "Fullname is required" : null,
            //     age: (value: number) => value <= 0 ? "Age is required" : null,
            //     occupation: (value: string) => !value.trim() ? "Occupation is required" : null,
            //     contactNumber: (value: string | number) => !value.toString().trim() ? "Contact Number is required" : value.toString().length < 11 ? "Contact Number Minimum length 11" : null,
            // },
            otherInformation: {
                specialTechnicalSkills: (value: string) => !value.trim() ? "Required" : null,
                isConvictedCrimeDetails: (value: string) => !value.trim() ? "Required" : null,
                isBeenHospitalizedDetails: (value: string) => !value.trim() ? "Required" : null,
                medicalConditionDetails: (value: string) => !value.trim() ? "Required" : null,
                relativeWorkingWithUsDetails: (value: string) => !value.trim() ? "Required" : null,
            },
            children: {
                ageRange: {
                    min: (value: number, values) => values.children.numberOfChildren && value < 0 ? "Age range from is required" : null,
                    max: (value: number, values) => values.children.numberOfChildren && value <= 0 ? "Age range to is required" : null
                }
            }
        }
    });

    const onSubmit = async (form: FamilyBackground) => {
        const cleanedForm: FamilyBackground = {
            ...form,
            father: { ...form.father, age: form.father.age == '' ? 0 : form.father.age },
            mother: { ...form.mother, age: form.mother.age == '' ? 0 : form.mother.age },
            children: { ...form.children, numberOfChildren: form.children.numberOfChildren == '' ? 0 : form.children.numberOfChildren },
            siblings: form.siblings?.filter(sibling => sibling.fullname.trim() !== ''),
            otherInformation: {
                ...form.otherInformation,
                specialTechnicalSkills: technicalSkills.toString()
            }
        };
        setApplicationForm({
            ...applicationForm,
            familyBackground: cleanedForm
        });

        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper);
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.FamilyAndOther && formRef.current) {
            let invalid = false
            const father = form.getValues().father
            const mother = form.getValues().mother

            if (father.fullname != '' || (father.age != '' && Number(father.age) > 0) || father.occupation != '' || father.contactNumber.toString() != '') {
                if (father.fullname === '') {
                    form.setFieldError(`father.fullname`, 'Fullname is required');
                    form.getInputNode?.(`father.fullname`)?.focus();
                    invalid = true
                }
                // if (father.age == '' || Number(father.age) <= 0) {
                //     form.setFieldError(`father.age`, 'Age is required');
                //     form.getInputNode?.(`father.age`)?.focus();
                //     invalid = true
                // }
                // if (father.occupation === '') {
                //     form.setFieldError(`father.occupation`, 'Occupation is required');
                //     form.getInputNode?.(`father.occupation`)?.focus();
                //     invalid = true
                // }
                // if (father.contactNumber.toString() === '' || isNaN(Number(father.contactNumber))) {
                //     form.setFieldError(`father.contactNumber`, 'Contact Number is required and must be a number');
                //     form.getInputNode?.(`father.contactNumber`)?.focus();
                //     invalid = true;
                // }
            }
            if (mother.fullname != '' || (mother.age != '' && Number(mother.age) > 0) || mother.occupation != '' || mother.contactNumber.toString() != '') {
                if (mother.fullname === '') {
                    form.setFieldError(`mother.fullname`, 'Fullname is required');
                    form.getInputNode?.(`mother.fullname`)?.focus();
                    invalid = true
                }
                // if (mother.age == '' || Number(mother.age) <= 0) {
                //     form.setFieldError(`mother.age`, 'Age is required');
                //     form.getInputNode?.(`mother.age`)?.focus();
                //     invalid = true
                // }
                // if (mother.occupation === '') {
                //     form.setFieldError(`mother.occupation`, 'Occupation is required');
                //     form.getInputNode?.(`mother.occupation`)?.focus();
                //     invalid = true
                // }
                // if (mother.contactNumber.toString() === '' || isNaN(Number(mother.contactNumber))) {
                //     form.setFieldError(`mother.contactNumber`, 'Contact Number is required and must be a number');
                //     form.getInputNode?.(`mother.contactNumber`)?.focus();
                //     invalid = true;
                // }
            }

            form.getValues().siblings.forEach((item, index) => {
                if (item.fullname != '' || item.age > 0 || item.occupation != '' || (item.contactNumber != '' && item.contactNumber.toString() != '')) {
                    if (item.fullname === '') {
                        form.setFieldError(`siblings.${index}.fullname`, 'Fullname is required');
                        form.getInputNode?.(`siblings.${index}.fullname`)?.focus();
                        invalid = true
                    };
                    // if (item.occupation === '') {
                    //     form.setFieldError(`siblings.${index}.occupation`, 'Occupation is required');
                    //     form.getInputNode?.(`siblings.${index}.occupation`)?.focus();
                    //     invalid = true
                    // }
                    // if (item.age <= 0) {
                    //     form.setFieldError(`siblings.${index}.age`, 'Age is required')
                    //     form.getInputNode?.(`siblings.${index}.age`)?.focus();
                    //     invalid = true
                    // };
                    // if (item.contactNumber.toString() === '' || isNaN(Number(item.contactNumber))) {
                    //     form.setFieldError(`siblings.${index}.contactNumber`, 'Contact Number is required and must be a number')
                    //     form.getInputNode?.(`siblings.${index}.contactNumber`)?.focus();
                    //     invalid = true
                    // };
                }
            });
            const spouse = form.getValues().spouse;
            if (spouse?.fullname != '' || spouse?.occupation != '' || (spouse.age != '' && Number(spouse.age) > 0) || spouse.contactNumber != '' && spouse.contactNumber.toString().length < 11 && spouse != undefined) {
                if (spouse?.fullname == '') {
                    form.setFieldError(`spouse.fullname`, 'Fullname is required');
                    form.getInputNode?.(`spouse.fullname`)?.focus();
                    invalid = true
                };
                // if (spouse?.occupation == '') {
                //     form.setFieldError(`spouse.occupation`, 'Occupation is required');
                //     invalid = true
                // }
                // if (spouse && Number(spouse.age) <= 0) {
                //     form.setFieldError(`spouse.age`, 'Age is required')
                //     form.getInputNode?.(`spouse.age`)?.focus();
                //     invalid = true
                // };
                // if (spouse?.contactNumber != undefined && spouse.contactNumber == '') {
                //     form.setFieldError(`spouse.contactNumber`, 'Contact Number is required')
                //     form.getInputNode?.(`spouse.contactNumber`)?.focus();
                //     invalid = true
                // };
                // if (spouse?.contactNumber != undefined && spouse.contactNumber.toString().length < 11) {
                //     form.setFieldError(`spouse.contactNumber`, 'Contact Number Minimum length 11')
                //     form.getInputNode?.(`spouse.contactNumber`)?.focus();
                //     invalid = true
                // };
            }
            if (!invalid) {
                formRef.current.requestSubmit();
            }
        }
        return (setSubmit(false))
    }, [submit])

    useEffect(() => {
        if (activeStepper === Step.FamilyAndOther) {
            if (form.getValues().siblings.length <= 0) {
                const siblings = [
                    {
                        fullname: '',
                        age: 0,
                        occupation: '',
                        contactNumber: '',
                    },
                ];

                setApplicationForm({
                    ...applicationForm,
                    familyBackground: { ...applicationForm.familyBackground, siblings: siblings }
                });
            }
        }
    }, [activeStepper])

    const addFieldCharacter = () => {
        setApplicationForm({
            ...applicationForm, familyBackground: {
                ...applicationForm.familyBackground, siblings: [...form.getValues().siblings, {
                    fullname: '',
                    age: 0,
                    occupation: '',
                    contactNumber: '',
                }]
            }
        })
    };

    const removeField = (index: number) => {
        const updatedSiblings = [...form.getValues().siblings]; // Clone the array
        updatedSiblings.splice(index, 1); // Remove the item at the given index

        setApplicationForm({
            ...applicationForm,
            familyBackground: {
                ...applicationForm.familyBackground,
                siblings: updatedSiblings, // Set the updated array
            }
        });
    };


    useEffect(() => {
        form.setValues({ siblings: applicationForm.familyBackground.siblings });
    }, [applicationForm])

    return (
        <form
            ref={formRef}
            onSubmit={
                (e) => {
                    e.preventDefault(); // Prevent default submission first
                    const isValid = form.validate(); // Runs validation on all fields
                    if (!isValid.hasErrors) {
                        onSubmit(form.values); // Proceed with submission
                    } else {
                        const firstErrorPath = Object.keys(isValid.errors)[0];
                        if (firstErrorPath === 'otherInformation.specialTechnicalSkills') {
                            skillsFieldRef.current?.focus();
                        }
                        form.getInputNode(firstErrorPath)?.focus();
                    }
                }}
        >
            <div className="text-[#6D6D6D] flex flex-col gap-4 relative">
                <p className="font-bold">Family Background</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("father.fullname")} radius='md' w={isMobile ? '25%' : '100%'} label={<p>Father </p>} placeholder="Full Name" />
                    <NumberInput maxLength={11} classNames={{ input: 'poppins text-[#6D6D6D]' }} hideControls min={0} {...form.getInputProps("father.age")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("father.occupation")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                    <TextInput maxLength={11} inputMode="numeric" classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("father.contactNumber")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("mother.fullname")} radius='md' w={isMobile ? '25%' : '100%'} label={<p>Mother </p>} placeholder="Full Name" />
                    <NumberInput maxLength={11} classNames={{ input: 'poppins text-[#6D6D6D]' }} hideControls min={0}  {...form.getInputProps("mother.age")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("mother.occupation")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                    <TextInput maxLength={11} inputMode="numeric" classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("mother.contactNumber")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                </div>

                {applicationForm.familyBackground.siblings.map((_, index) => (
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} key={form.key(`siblings.${index}.fullname`)} {...form.getInputProps(`siblings.${index}.fullname`)} radius='md' w={isMobile ? '25%' : '100%'} label="Siblings" placeholder="Full Name" />
                        <NumberInput maxLength={11} classNames={{ input: 'poppins text-[#6D6D6D]' }} min={0} hideControls key={form.key(`siblings.${index}.age`)} {...form.getInputProps(`siblings.${index}.age`)} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps(`siblings.${index}.occupation`)} key={form.key(`siblings.${index}.occupation`)} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                        <TextInput maxLength={11} inputMode="numeric" classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps(`siblings.${index}.contactNumber`)} key={form.key(`siblings.${index}.contactNumber`)} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                        {(<div>
                            <IconCircleMinus size={35} className="" onClick={() => { removeField(index) }} />
                        </div>)}
                    </div>
                ))}
                <p className="w-full sp:w-[12%] text-sm bg-[#559cda] text-white sp:px-2 sp:py-1 p-3 rounded-md font-semibold cursor-pointer flex gap-2 " onClick={addFieldCharacter}><IconCirclePlus size={20} />ADD SIBLINGS</p>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput {...form.getInputProps("spouse.fullname")} classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '25%' : '100%'} label="Spouse (If Married)" placeholder="Full Name" />
                    <NumberInput maxLength={11} hideControls {...form.getInputProps("spouse.age")} classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                    <TextInput {...form.getInputProps("spouse.occupation")} classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                    <TextInput maxLength={11}  {...form.getInputProps("spouse.contactNumber")} inputMode="numeric" classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                </div>

                <div className="flex flex-col sm:flex-row items-end gap-4 w-[100%] " >

                    <NumberInput
                        {...form.getInputProps("children.numberOfChildren")}
                        hideControls
                        w={isMobile ? '100%' : '100%'}
                        label="Children (if any)"
                        placeholder={"Number of Children"}
                        radius={8}
                        className="border-none w-full text-sm "
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        min={0}
                        onChange={(val) => {
                            form.setFieldValue('children.numberOfChildren', val)
                            if (val == 0 || val == '') {
                                form.setFieldValue('children.ageRange.min', 0)
                                form.setFieldValue('children.ageRange.max', 0)
                            }
                        }}
                    />

                    <NumberInput
                        disabled={form.getValues().children.numberOfChildren == '' || Number(form.getValues().children.numberOfChildren) <= 0}
                        {...form.getInputProps("children.ageRange.min")}
                        hideControls
                        w={isMobile ? '100%' : '100%'}
                        label="Age Range"
                        placeholder={"Min"}
                        radius={8}
                        className="border-none w-full text-sm "
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        min={0}
                    />

                    <NumberInput
                        disabled={form.getValues().children.numberOfChildren == '' || Number(form.getValues().children.numberOfChildren) <= 0}
                        {...form.getInputProps("children.ageRange.max")}
                        hideControls
                        w={isMobile ? '100%' : '100%'}
                        label=""
                        placeholder={"Max"}
                        radius={8}
                        className="border-none w-full text-sm "
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        min={0}
                    />

                </div>

                <p className="font-bold">Other Information</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />

                <div className="flex items-center  gap-2">
                    <Combobox store={combobox}  >
                        <Combobox.DropdownTarget>
                            <PillsInput label="Special Technical Skills" className="flex-grow" radius={8} onClick={() => combobox.openDropdown()} key={form.getValues().otherInformation.specialTechnicalSkills} {...form.getInputProps("otherInformation.specialTechnicalSkills")}>
                                <Pill.Group>
                                    {values}
                                    <Combobox.EventsTarget>
                                        <PillsInput.Field
                                            ref={skillsFieldRef}
                                            onFocus={() => combobox.openDropdown()}
                                            onBlur={() => combobox.closeDropdown()}
                                            value={search}
                                            placeholder="Enter Keyword to add skills"
                                            onChange={(event) => {
                                                combobox.updateSelectedOptionIndex();
                                                setSearch(event.currentTarget.value);
                                            }}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </Combobox.EventsTarget>
                                </Pill.Group>
                            </PillsInput>
                        </Combobox.DropdownTarget>
                    </Combobox>
                    <IconPlus className="cursor-pointer mt-5" onClick={() => { handleAdd() }} />
                </div>


                {/* <MultiSelect
                    rightSection ref={myRef}
                    key={form.getValues().otherInformation.specialTechnicalSkills} {...form.getInputProps("otherInformation.specialTechnicalSkills")}
                    classNames={{ dropdown: 'hidden', input: 'poppins text-[#6D6D6D]' }}
                    className='w-full' label={<p>Special Technical Skills <span className="text-[#F14336]">*</span></p>} radius='md' placeholder="Enter Keyword to add skills"
                    data={[]} searchable value={technicalSkills} onChange={handleChange} onKeyDown={handleKeyDown} /> */}

                <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("otherInformation.isConvictedCrimeDetails")} radius='md' w={'100%'} label={<p>Have you ever been convicted of a crime ? if yes, please give details. <span className="text-[#F14336]">*</span></p>} placeholder="if you answer yes, please give details." />
                <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("otherInformation.isBeenHospitalizedDetails")} radius='md' w={'100%'} label={<p>Have you ever been hospitalized?if yes, please give details. <span className="text-[#F14336]">*</span></p>} placeholder="if you answer yes, please give details." />
                <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("otherInformation.medicalConditionDetails")} radius='md' w={'100%'} label={<p>Do you have any medical condition that may prevent  you from performing certain types of jobs?please specify. <span className="text-[#F14336]">*</span></p>} placeholder="if you answer yes, please give details." />
                <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("otherInformation.relativeWorkingWithUsDetails")} radius='md' w={'100%'} label={<p>Do you have any relatives/family/people in a relationship with you, who are working with us? <span className="text-[#F14336]">*</span></p>} placeholder="Answer yes or no." />

            </div>
        </form>
    )
}