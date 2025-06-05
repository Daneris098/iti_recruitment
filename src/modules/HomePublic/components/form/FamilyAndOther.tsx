import { Divider, MultiSelect, NumberInput, Select, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconCaretDownFilled, IconCirclePlus, IconCircleMinus } from "@tabler/icons-react";
import { FamilyBackground, Step } from "../../types";
import { ApplicationStore } from "../../store";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";

export default function index() {
    const { isMobile } = GlobalStore()
    const formRef = useRef<HTMLFormElement>(null);
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()
    const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
    const myRef = useRef(null);

    useEffect(() => {
        if (applicationForm.familyBackground.otherInformation.specialTechnicalSkills != '') {
            setTechnicalSkills(applicationForm.familyBackground.otherInformation.specialTechnicalSkills.split(','))
        }
    }, [])

    const handleChange = (value: any) => {
        form.setFieldValue('otherInformation.specialTechnicalSkills', applicationForm.familyBackground.otherInformation.specialTechnicalSkills);
        console.log('form.getValues', form.getValues())
        setTechnicalSkills(value);
    };
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.target.value) {
            const newValue = event.target.value.trim();
            form.setFieldValue('otherInformation.specialTechnicalSkills', newValue);
            if (!technicalSkills.includes(newValue)) {
                setTechnicalSkills((prev) => [...prev, newValue]);
                (myRef as any).current.value = "";
            }
            event.preventDefault();
        }
    };

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
            }

        }
    });

    const onSubmit = async (form: FamilyBackground) => {
        const cleanedForm: FamilyBackground = {
            ...form,
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

            if (father.fullname != '' || father.age > 0 || father.occupation != '' || father.contactNumber.toString() != '') {
                if (father.fullname === '') {
                    form.setFieldError(`father.fullname`, 'Fullname is required');
                    invalid = true
                }
                if (father.age <= 0) {
                    form.setFieldError(`father.age`, 'Age is required');
                    invalid = true
                }
                if (father.occupation === '') {
                    form.setFieldError(`father.occupation`, 'Occupation is required');
                    invalid = true
                }
                if (father.contactNumber.toString() === '') {
                    form.setFieldError(`father.contactNumber`, 'Contact Number is required');
                    invalid = true
                }
            }
            if (mother.fullname != '' || mother.age > 0 || mother.occupation != '' || mother.contactNumber.toString() != '') {
                if (mother.fullname === '') {
                    form.setFieldError(`mother.fullname`, 'Fullname is required');
                    invalid = true
                }
                if (mother.age <= 0) {
                    form.setFieldError(`mother.age`, 'Age is required');
                    invalid = true
                }
                if (mother.occupation === '') {
                    form.setFieldError(`mother.occupation`, 'Occupation is required');
                    invalid = true
                }
                if (father.contactNumber.toString() === '') {
                    form.setFieldError(`mother.contactNumber`, 'Contact Number is required');
                    invalid = true
                }
            }

            form.getValues().siblings.forEach((item, index) => {
                if (item.fullname != '' || item.age > 0 || item.occupation != '' || (item.contactNumber != '' && item.contactNumber.toString().length < 11)) {
                    if (item.fullname === '') {
                        form.setFieldError(`siblings.${index}.fullname`, 'Fullname is required');
                        invalid = true
                    };
                    if (item.occupation === '') {
                        form.setFieldError(`siblings.${index}.occupation`, 'Occupation is required');
                        invalid = true
                    }
                    if (item.age <= 0) {
                        form.setFieldError(`siblings.${index}.age`, 'Age is required')
                        invalid = true
                    };
                    if (item.contactNumber === '') {
                        form.setFieldError(`siblings.${index}.contactNumber`, 'Contact Number is required')
                        invalid = true
                    };
                    if (item.contactNumber.toString().length < 11) {
                        form.setFieldError(`siblings.${index}.contactNumber`, 'Contact Number Minimum length 11')
                        invalid = true
                    };
                }
            });
            const spouse = form.getValues().spouse;
            if (spouse?.fullname != '' || spouse?.occupation != '' || spouse.age > 0 || spouse.contactNumber != '' && spouse.contactNumber.toString().length < 11) {
                if (spouse?.fullname == '') {
                    form.setFieldError(`spouse.fullname`, 'Fullname is required');
                    invalid = true
                };
                if (spouse?.occupation == '') {
                    form.setFieldError(`spouse.occupation`, 'Occupation is required');
                    invalid = true
                }
                if (spouse?.age != undefined && spouse.age == 0) {
                    form.setFieldError(`spouse.age`, 'Age is required')
                    invalid = true
                };
                if (spouse?.contactNumber != undefined && spouse.contactNumber == '') {
                    form.setFieldError(`spouse.contactNumber`, 'Contact Number is required')
                    invalid = true
                };
                if (spouse?.contactNumber != undefined && spouse.contactNumber.toString().length < 11) {
                    form.setFieldError(`spouse.contactNumber`, 'Contact Number Minimum length 11')
                    invalid = true
                };
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

                console.log('application form :', applicationForm)
                console.log('form.getValues', form.getValues())

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
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4 relative">
                <p className="font-bold">Family Background</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("father.fullname")} radius='md' w={isMobile ? '25%' : '100%'} label={<p>Father </p>} placeholder="Full Name" />
                    <NumberInput maxLength={11} classNames={{ input: 'poppins text-[#6D6D6D]' }} hideControls min={0} {...form.getInputProps("father.age")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("father.occupation")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                    <NumberInput maxLength={11} hideControls classNames={{ input: 'poppins text-[#6D6D6D]' }}  {...form.getInputProps("father.contactNumber")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("mother.fullname")} radius='md' w={isMobile ? '25%' : '100%'} label={<p>Mother </p>} placeholder="Full Name" />
                    <NumberInput maxLength={11} classNames={{ input: 'poppins text-[#6D6D6D]' }} hideControls min={0}  {...form.getInputProps("mother.age")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                    <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("mother.occupation")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                    <NumberInput maxLength={11} hideControls classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("mother.contactNumber")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                </div>

                {applicationForm.familyBackground.siblings.map((_, index) => (
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} key={form.key(`siblings.${index}.fullname`)} {...form.getInputProps(`siblings.${index}.fullname`)} radius='md' w={isMobile ? '25%' : '100%'} label="Siblings" placeholder="Full Name" />
                        <NumberInput maxLength={11} classNames={{ input: 'poppins text-[#6D6D6D]' }} min={0} hideControls key={form.key(`siblings.${index}.age`)} {...form.getInputProps(`siblings.${index}.age`)} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                        <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps(`siblings.${index}.occupation`)} key={form.key(`siblings.${index}.occupation`)} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                        <NumberInput maxLength={11} hideControls classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps(`siblings.${index}.contactNumber`)} key={form.key(`siblings.${index}.contactNumber`)} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                        {(<div>
                            <IconCircleMinus size={35} className="" onClick={() => { removeField(index) }} />
                        </div>)}
                    </div>
                ))}
                <p className=" w-[12%] text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2" onClick={addFieldCharacter}><IconCirclePlus size={20} />ADD SIBLINGS</p>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput {...form.getInputProps("spouse.fullname")} classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '25%' : '100%'} label="Spouse (If Married)" placeholder="Full Name" />
                    <TextInput {...form.getInputProps("spouse.age")} classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                    <TextInput {...form.getInputProps("spouse.occupation")} classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                    <NumberInput maxLength={11}  {...form.getInputProps("spouse.contactNumber")} hideControls classNames={{ input: 'poppins text-[#6D6D6D]' }} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
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
                    />
                    <Select
                        w={isMobile ? '100%' : '100%'}
                        placeholder={"Age Range"}
                        radius={8}
                        data={["1-12", "13-18", "Age > 19"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    // onChange={(value) => { setFilter({ ...filter, postedDate: `${value}` }) }}
                    />

                </div>

                <p className="font-bold">Other Information</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <MultiSelect rightSection ref={myRef} key={form.getValues().otherInformation.specialTechnicalSkills}  {...form.getInputProps("otherInformation.specialTechnicalSkills")} classNames={{ dropdown: 'hidden', input: 'poppins text-[#6D6D6D]' }} className='w-full' label={<p>Special Technical Skills <span className="text-[#F14336]">*</span></p>} radius='md' placeholder="Enter Keyword to add skills" data={[]} searchable value={technicalSkills} onChange={handleChange} onKeyDown={handleKeyDown} />
                <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("otherInformation.isConvictedCrimeDetails")} radius='md' w={'100%'} label={<p>Have you ever been convicted of a crime ? if yes, please give details. <span className="text-[#F14336]">*</span></p>} placeholder="if you answer yes, please give details." />
                <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("otherInformation.isBeenHospitalizedDetails")} radius='md' w={'100%'} label={<p>Have you ever been hospitalized?if yes, please give details. <span className="text-[#F14336]">*</span></p>} placeholder="if you answer yes, please give details." />
                <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("otherInformation.medicalConditionDetails")} radius='md' w={'100%'} label={<p>Do you have any medical condition that may prevent  you from performing certain types of jobs?please specify. <span className="text-[#F14336]">*</span></p>} placeholder="if you answer yes, please give details." />
                <TextInput classNames={{ input: 'poppins text-[#6D6D6D]' }} {...form.getInputProps("otherInformation.relativeWorkingWithUsDetails")} radius='md' w={'100%'} label={<p>Do you have any relatives/family/people in a relationship with you, who are working with us? <span className="text-[#F14336]">*</span></p>} placeholder="Answer yes or no." />

            </div>
        </form>
    )
}