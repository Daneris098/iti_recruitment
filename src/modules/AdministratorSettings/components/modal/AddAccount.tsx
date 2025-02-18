import { Modal, Divider, Button, Select, TextInput, Textarea, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { useRef } from "react";
import { useDateRangeStore } from "@shared/hooks/useDateRange";
import { AdministratorSettingsStore, DialogStore } from "@modules/AdministratorSettings/store";
import { AlertType } from '../../types';

export default function index() {
    const { action, setAction } = DialogStore()
    const { setAlert } = AdministratorSettingsStore();
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {},
        validate: {
            // firstChoice: (value: string) => value.length === 0 ? "First choice is required" : null,
            // desiredSalary: (value: number) => value <= 0 ? "Desired salary must be greater than 0" : null,
            // startDateAvailability: (value: string) => value.length === 0 ? "Start date availability is required" : null,
        }
    });

    const onSubmit = async () => {
    };



    return (
        <Modal size={'40%'} opened={action != ''} centered onClose={() => setAction('')} title={'Create Account'}
            className='text-[#559CDA]' styles={{
                header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
            }} >
            <div className='m-auto w-[95%] '>

                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                <form ref={formRef} onSubmit={form.onSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <div className='flex gap-4'>
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("")} radius='md' size="lg" label="Last Name" placeholder="Enter last name" />
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("")} radius='md' size="lg" label="First Name" placeholder="Enter first name" />
                    </div>
                    <div className='flex gap-4'>
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("")} radius='md' size="lg" label="Middle Name" placeholder="Enter middle name" />
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("")} radius='md' size="lg" label="Name Extension" placeholder="Enter name extension" />
                    </div>
                    <div className='flex gap-4'>
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("")} radius='md' size="lg" label="Email" placeholder="Enter email address" />
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("")} radius='md' size="lg" label="Username" placeholder="Enter username" />
                    </div>
                    <div className='flex gap-4'>
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("")} radius='md' size="lg" label="Enter Password" placeholder="Enter password" />
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("")} radius='md' size="lg" label="Confirm Password" placeholder="Confirm password" />
                    </div>
                    <div className='flex flex-col gap-8 mt-4'>
                        <div className='flex gap-4'>
                            <Checkbox
                                className="w-[50%]"
                                defaultChecked
                                label="Generate Password"
                            />
                            <Checkbox
                                className="w-[50%] "
                                defaultChecked
                                label="Must change password upon login"
                            />
                        </div>
                        <div className='flex justify-between'>
                            <Button
                                variant="outline"
                                className=" w-[25%] self-end"
                                radius={10}
                                onClick={() => { }}
                            >CANCEL</Button>
                            <Button
                                variant="transparent"
                                className="br-gradient border-none text-white w-[30%] self-end"
                                radius={10}
                                onClick={() => { }}
                            >GENERATE ACCOUNT</Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}