import { Divider, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { formValue } from "@modules/AccountSetup/values"
import { forwardRef, useImperativeHandle, useRef } from "react";
import { AccountSetupStore } from "../store";
import { AlertType, Step } from "../types";

const ProfileDetails = forwardRef((_, ref) => {
    const { activeStepper, setActiveStepper, setAlert } = AccountSetupStore()
    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
        submit,
    }));

    const form = useForm({
        mode: "uncontrolled",
        initialValues: formValue.profile,
        validate: {
            name: {
                firstName: (value: string) => value.length === 0 ? "First name is required" : null,
                lastName: (value: string) => value.length === 0 ? "Last name is required" : null,
            }
        },
    });

    const submit = () => {
        formRef.current?.requestSubmit();
    }

    const onSubmit = async () => {
        if (activeStepper < ((Object.keys(Step).length / 2) - 1)) {
            setActiveStepper(activeStepper + 1)
        }
        else {
            setAlert(AlertType.save)
        }
    }

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)} >
            <div className="h-full w-[75%] mx-auto flex flex-col gap-2 sm:gap-8 text-[#6D6D6D] ">
                <div className="flex flex-col gap-2">
                    <p className="text-center font-semibold">PROFILE DETAILS</p>
                    <Divider size={3} color="#ebe5e5" />
                </div>
                <div className="flex flex-col sm:flex-row items-end gap-2">
                    <TextInput radius={"md"}  {...form.getInputProps("name.firstName")} classNames={{ input: 'poppins text-[#6D6D6D]   ' }} size="md" label={<p>Full Name <span className="text-[#A8A8A8] text-sm font-light"> (Write N/A if not applicable)</span></p>} placeholder="First Name" className="w-full sm:w-1/2" />
                    <TextInput radius={"md"}  {...form.getInputProps("name.lastName")} classNames={{ input: 'poppins text-[#6D6D6D] ' }} size="md" placeholder="Last Name" className="w-full sm:w-1/2" />
                </div>
                <div className="flex flex-col sm:flex-row items-end gap-2 ">
                    <TextInput radius={"md"} classNames={{ input: 'poppins text-[#6D6D6D] ' }} size="md" placeholder="Middle Name" className="w-full sm:w-1/2" />
                    <TextInput radius={"md"} classNames={{ input: 'poppins text-[#6D6D6D] ' }} size="md" placeholder="Suffix (Jr. Sr. etc.)" className="w-full sm:w-1/2" />
                </div>
            </div>
        </form>
    )
})

export default ProfileDetails;