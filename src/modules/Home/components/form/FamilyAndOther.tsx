import { Divider, Flex, Select, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { FamilyBackground, Step } from "../../types";
import { ApplicationStore } from "../../store";
import { useEffect, useRef } from "react";
import { useForm } from "@mantine/form";

export default function index() {
    const { isMobile } = GlobalStore()
    const formRef = useRef<HTMLFormElement>(null);
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.familyBackground,
        validate: {
            // nameOfSchool: (value: string) => value.length === 0 ? "Name Of School is required" : null,
            father: {
                fullname: (value: string) => value.length === 0 ? "Fullname is required" : null,
                age: (value: number) => value <= 0 ? "Age is required" : null,
                occupation: (value: string) => value.length === 0 ? "Occupations is required" : null,
                contactNumber: (value: string) => value.length === 0 ? "Contact Number is required" : null,
            },
            mother: {
                fullname: (value: string) => value.length === 0 ? "Fullname is required" : null,
                age: (value: number) => value <= 0 ? "Age is required" : null,
                occupation: (value: string) => value.length === 0 ? "Occupations is required" : null,
                contactNumber: (value: string) => value.length === 0 ? "Contact Number is required" : null,
            },

        }
    });
    const onSubmit = async (form: FamilyBackground) => {
        console.log(form)
        setApplicationForm({ ...applicationForm, familyBackground: form })
        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper)
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.FamilyAndOther && formRef.current) {
            formRef.current.requestSubmit(); // Programmatically trigger form submission
        }
        return (setSubmit(false))
    }, [submit])

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

    useEffect(() => {
        form.setValues({ siblings: applicationForm.familyBackground.siblings });
    }, [applicationForm])


    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4">
                <p className="font-bold">Family Background</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput {...form.getInputProps("father.fullname")} radius='md' w={isMobile ? '25%' : '100%'} label="Father" placeholder="Full Name" />
                    <TextInput {...form.getInputProps("father.age")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                    <TextInput {...form.getInputProps("father.occupation")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                    <TextInput {...form.getInputProps("father.contactNumber")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput {...form.getInputProps("mother.fullname")} radius='md' w={isMobile ? '25%' : '100%'} label="Mother" placeholder="Full Name" />
                    <TextInput {...form.getInputProps("mother.age")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                    <TextInput {...form.getInputProps("mother.occupation")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                    <TextInput {...form.getInputProps("mother.contactNumber")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                </div>
                {applicationForm.familyBackground.siblings.map((_, index) => (
                    <div className="flex flex-col sm:flex-row gap-4 items-end" >
                        <TextInput {...form.getInputProps(`siblings.${index}.fullname`)} radius='md' w={isMobile ? '25%' : '100%'} label={
                            <Flex justify="center" gap={2} direction='row' align='center'>
                                <p>Siblings</p>
                                {index === 0 && (<p className="m-2 text-sm bg-[#D7FFB9] text-[#5A9D27] px-2 rounded-full font-semibold cursor-pointer"
                                    onClick={addFieldCharacter}
                                >Add Field
                                </p>
                                )}
                            </Flex>
                        } placeholder="Full Name" />

                        <TextInput {...form.getInputProps(`siblings.${index}.age`)} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                        <TextInput {...form.getInputProps(`siblings.${index}.occupation`)} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                        <TextInput {...form.getInputProps(`siblings.${index}.contactNumber`)} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                    </div>
                ))}
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} label="Spouse (If Married)" placeholder="Full Name" />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Age" />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Occupation" />
                    <TextInput radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                </div>

                <div className="flex flex-col sm:flex-row items-end gap-4 w-[100%] " >

                    <Select
                        w={isMobile ? '100%' : '100%'}
                        label="Children if (Any)"
                        placeholder={"Number of Children"}
                        radius={8}
                        data={["1", "2", "3"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    // onChange={(value) => { setFilter({ ...filter, postedDate: `${value}` }) }}
                    />
                    <Select
                        w={isMobile ? '100%' : '100%'}
                        placeholder={"Age Range"}
                        radius={8}
                        data={["1-12", "13-18", "Age > 19"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                    // onChange={(value) => { setFilter({ ...filter, postedDate: `${value}` }) }}
                    />

                </div>

                <p className="font-bold">Other Information</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <TextInput {...form.getInputProps("otherInformation.specialTechnicalSkills")} radius='md' w={'100%'} label="Special Technical Skills" placeholder="Enter Keyword to add skills" />
                <TextInput {...form.getInputProps("otherInformation.isConvictedCrimeDetails")} radius='md' w={'100%'} label="Have you ever been convicted of a crime ? if yes, please give details." placeholder="if you answer yes, please give details." />
                <TextInput {...form.getInputProps("otherInformation.isBeenHospitalizedDetails")} radius='md' w={'100%'} label="Have you ever been hospitalized ? if yes, please give details." placeholder="if you answer yes, please give details." />
                <TextInput {...form.getInputProps("otherInformation.medicalConditionDetails")} radius='md' w={'100%'} label="Do you have any medical condition that may prevent  you from performing certain types of jobs ? please specify." placeholder="if you answer yes, please give details." />
                <TextInput {...form.getInputProps("otherInformation.relativeWorkingWithUsDetails")} radius='md' w={'100%'} label="Do you have any relatives/family/people in a relationship with you, who are working with us?" placeholder="Answer yes or no." />

            </div>
        </form>
    )
}