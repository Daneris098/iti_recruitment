import { Divider, Checkbox, TextInput } from "@mantine/core";
import { GlobalStore } from "@src/utils/GlobalStore";
import { useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import { ApplicationStore } from "../../store";
import { referenceValue } from "../../values";
import { Reference, Step } from "../../types";

export default function index() {
    const { isMobile } = GlobalStore()
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm } = ApplicationStore()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: referenceValue,
        validate: {
            characterReference: {
                fullname: (value: string) => value.length === 0 ? "Fullname is required" : null,
                company: (value: string) => value.length === 0 ? "Company is required" : null,
                positionHeld: (value: string) => value.length === 0 ? "Position Held Number is required" : null,
                ContactNo: (value: string) => value.length === 0 ? "ContactNo is required" : null,
            },
            // employmentReference: {
            //     fullname: (value: string) => value.length === 0 ? "Fullname is required" : null,
            //     company: (value: string) => value.length === 0 ? "Company is required" : null,
            //     positionHeld: (value: string) => value.length === 0 ? "Position Held Number is required" : null,
            //     ContactNo: (value: string) => value.length === 0 ? "ContactNo is required" : null,
            // },
        }
    });


    const onSubmit = async (form: Reference) => {
        setApplicationForm({ ...applicationForm, reference: form })
        setActiveStepper(activeStepper < Step.Photo ? activeStepper + 1 : activeStepper)
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.Reference && formRef.current) {
            formRef.current.requestSubmit(); // Programmatically trigger form submission
        }
        return (setSubmit(false))
    }, [submit])

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-[#6D6D6D] flex flex-col gap-4 ">
                <div>

                    <p className="absolute mt-7 ml-24 sm:mt-0 sm:ml-[23rem] text-sm bg-[#D7FFB9] text-[#5A9D27] px-2 rounded-full font-semibold cursor-pointer">Add Experience</p>
                    <p className="font-bold">Character Reference (NOT FAMILY MEMBERS)</p>

                </div>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput  {...form.getInputProps("characterReference.fullname")} radius='md' w={isMobile ? '25%' : '100%'} label="Character Reference 1" placeholder="Full Name" />
                    <TextInput  {...form.getInputProps("characterReference.company")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Company" />
                    <TextInput  {...form.getInputProps("characterReference.positionHeld")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Position Held" />
                    <TextInput  {...form.getInputProps("characterReference.ContactNo")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
                </div>

                <p className="font-bold">Employment Reference (NOT FAMILY MEMBERS)</p>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full " />
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <TextInput  {...form.getInputProps("employmentReference.fullname")} radius='md' w={isMobile ? '25%' : '100%'} label="Character Reference 1" placeholder="Full Name" />
                    <TextInput  {...form.getInputProps("employmentReference.company")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Company" />
                    <TextInput  {...form.getInputProps("employmentReference.positionHeld")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Position Held" />
                    <TextInput  {...form.getInputProps("employmentReference.ContactNo")} radius='md' w={isMobile ? '25%' : '100%'} placeholder="Contact Number" />
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