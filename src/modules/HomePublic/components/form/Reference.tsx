import { Divider, Checkbox, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import { ApplicationStore } from "../../store";
import { Reference, Step } from "../../types";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";

export default function index() {
    const { isMobile } = GlobalStore()
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: applicationForm.reference,
        validate: {
            characterReference: {
                fullname: (value: string) => value.length === 0 ? "Fullname is required" : null,
                company: (value: string) => value.length === 0 ? "Company is required" : null,
                positionHeld: (value: string) => value.length === 0 ? "Position Held is required" : null,
                ContactNo: (value: string) => value.length === 0 ? "ContactNo is required" : null,
            },
            employmentReference: {
                fullname: (value: string) => value.length === 0 ? "Fullname is required" : null,
                company: (value: string) => value.length === 0 ? "Company is required" : null,
                positionHeld: (value: string) => value.length === 0 ? "Position Held is required" : null,
                ContactNo: (value: string) => value.length === 0 ? "ContactNo is required" : null,
            },
        },
    });


    const onSubmit = async (form: Reference) => {
        setApplicationForm({ ...applicationForm, reference: form })
        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper)
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.Reference && formRef.current) {
            formRef.current.requestSubmit();
        }
        return (setSubmit(false))
    }, [submit])


    const addFieldCharacter = () => {
        setApplicationForm({ ...applicationForm, reference: { ...form.getValues(), characterReference: [...form.getValues().characterReference, { fullname: "", company: "", positionHeld: "", ContactNo: "" }] } })
    };
    
    const removeFieldCharacter = (index: number) => {
        const updatedCharacterReference = [...form.getValues().characterReference]; 
        updatedCharacterReference.splice(index, 1); 
    
        setApplicationForm({
            ...applicationForm,
            reference: {
                ...applicationForm.reference,
                characterReference: updatedCharacterReference, 
            }
        });
    };
    
    const removeFieldEmployment = (index: number) => {
        const updatedEmploymentReference = [...form.getValues().employmentReference]; 
        updatedEmploymentReference.splice(index, 1); 
    
        setApplicationForm({
            ...applicationForm,
            reference: {
                ...applicationForm.reference,
                employmentReference: updatedEmploymentReference, 
            }
        });
    };

    const addFieldEmployment = () => {
        setApplicationForm({ ...applicationForm, reference: { ...form.getValues(), employmentReference: [...form.getValues().employmentReference, { fullname: "", company: "", positionHeld: "", ContactNo: "" }] } })
    };

    useEffect(() => {
        form.setValues({ characterReference: applicationForm.reference.characterReference });
        form.setValues({ employmentReference: applicationForm.reference.employmentReference });
    }, [applicationForm])

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4 ">
                <div>
                    <p className="font-bold">Character Reference (NOT FAMILY MEMBERS)</p>
                </div>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col gap-4" key={applicationForm.reference.characterReference.length}>
                    {applicationForm.reference.characterReference.map((_, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 items-end">
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`characterReference.${index}.fullname`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                label={`Character Reference ${index + 1}`}
                                placeholder="Full Name"
                            />
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`characterReference.${index}.company`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                placeholder="Company"
                            />
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`characterReference.${index}.positionHeld`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                placeholder="Position Held"
                            />
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`characterReference.${index}.ContactNo`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                placeholder="Contact Number"
                            />
                            {index === applicationForm.reference.characterReference.length - 1 && index > 0 && (<div>
                                <IconCircleMinus size={35} className="" onClick={() => { removeFieldCharacter(index) }} />
                            </div>)}
                        </div>
                    ))}
                    <p className="w-[20%] text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 " onClick={addFieldCharacter}><IconCirclePlus size={20} />Add Character Reference</p>

                </div>

                <div>
                    <p className="font-bold">Employment Reference (NOT FAMILY MEMBERS)</p>
                </div>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col gap-4">
                    {applicationForm.reference.employmentReference.map((_, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 items-end">
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`employmentReference.${index}.fullname`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                label={`Employment Reference ${index + 1}`}
                                placeholder="Full Name"
                            />
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`employmentReference.${index}.company`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                placeholder="Company"
                            />
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`employmentReference.${index}.positionHeld`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                placeholder="Position Held"
                            />
                            <TextInput
                                classNames={{ input: 'poppins' }}
                                {...form.getInputProps(`employmentReference.${index}.ContactNo`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                placeholder="Contact Number"
                            />
                             {index === applicationForm.reference.employmentReference.length - 1 && index > 0 && (<div>
                                <IconCircleMinus size={35} className="" onClick={() => { removeFieldEmployment(index) }} />
                            </div>)}
                        </div>
                    ))}
                    <p className="w-[20%] text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 " onClick={addFieldEmployment}><IconCirclePlus size={20} />Add Employment Reference</p>

                </div>
                <p className="font-bold">Application Source</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <p>How did you learn about our vacancy? How did you apply in our company? *</p>
                <div className="flex gap-2 sm:gap-0">
                    <Checkbox
                        className="w-[33%]"
                        defaultChecked
                        label="Employee Refereal"
                    />
                    <Checkbox
                        className="w-[33%] "
                        defaultChecked
                        label="Jobstreet"
                    />
                    <Checkbox
                        className="w-[33%] truncate"
                        defaultChecked
                        label="Headhunter"
                    />
                </div>
                <div className="flex  gap-2 sm:gap-0">
                    <Checkbox
                        className="w-[33%]"
                        defaultChecked
                        label="Word of Mouth"
                    />
                    <Checkbox
                        className="w-[33%]"
                        defaultChecked
                        label="Walk-in"
                    />
                    <Checkbox
                        className="w-[33%]"
                        defaultChecked
                        label="Others"
                    />
                </div>
            </div>
        </form>
    )
}