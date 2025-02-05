import { Divider, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { ApplicationStore } from "@modules/Home/store";

export default function Index() {
    const { isMobile } = GlobalStore();
    const formRef = useRef<HTMLFormElement>(null);
    const { applicationForm } = ApplicationStore();

    // Ensure applicationForm.reference is always an array
    const [characterReferences, setCharacterReferences] = useState<any[]>(
        Array.isArray(applicationForm.reference) ? applicationForm.reference :
            [{ fullname: "", company: "", positionHeld: "", contactNo: "" }]
    );

    useEffect(() => {
        if (!Array.isArray(applicationForm.reference)) {
            setCharacterReferences([{ fullname: "", company: "", positionHeld: "", contactNo: "" }]);
        } else {
            setCharacterReferences(applicationForm.reference);
        }
    }, [applicationForm.reference]);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { characterReference: characterReferences },
        validate: {
            characterReference: {
                fullname: (value: string) => value.length === 0 ? "Fullname is required" : null,
                company: (value: string) => value.length === 0 ? "Company is required" : null,
                positionHeld: (value: string) => value.length === 0 ? "Position Held is required" : null,
                contactNo: (value: string) => value.length === 0 ? "Contact No is required" : null,
            },
        },
    });

    const onSubmit = async () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    const addFieldCharacter = () => {
        const updatedReferences = [...characterReferences,{ fullname: "", company: "", positionHeld: "", contactNo: "" }];
        setCharacterReferences(updatedReferences);
        form.setValues({ characterReference: updatedReferences });
    };

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4">
                <div>
                    <p
                        className="absolute mt-7 ml-24 sm:mt-0 sm:ml-[23rem] text-sm bg-[#D7FFB9] text-[#5A9D27] px-2 rounded-full font-semibold cursor-pointer"
                        onClick={addFieldCharacter}
                    >
                        Add Field
                    </p>
                    <p className="font-bold">Character Reference (NOT FAMILY MEMBERS)</p>
                </div>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full" />
                <div className="flex flex-col gap-4">
                    {characterReferences.map((_, index) => (
                        <div key={index} className="flex flex-col sm:flex-row gap-4 items-end">
                            <TextInput
                                {...form.getInputProps(`characterReference.${index}.fullname`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                label={`Character Reference ${index + 1}`}
                                placeholder="Full Name"
                            />
                            <TextInput
                                {...form.getInputProps(`characterReference.${index}.company`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                placeholder="Company"
                            />
                            <TextInput
                                {...form.getInputProps(`characterReference.${index}.positionHeld`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                placeholder="Position Held"
                            />
                            <TextInput
                                {...form.getInputProps(`characterReference.${index}.contactNo`)}
                                radius="md"
                                w={isMobile ? '25%' : '100%'}
                                placeholder="Contact Number"
                            />
                        </div>
                    ))}
                </div>
                <button type="submit" className="bg-green-500 px-4 py-2 text-white rounded-md">
                    Submit
                </button>
            </div>
        </form>
    );
}
