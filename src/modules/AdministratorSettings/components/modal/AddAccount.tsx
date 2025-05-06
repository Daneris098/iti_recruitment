import { Modal, Divider, Button, TextInput, Checkbox, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState } from "react";
import { AdministratorSettingsStore, DialogStore } from "@modules/AdministratorSettings/store";
import { AlertType, UserForm } from '@modules/AdministratorSettings/types';
import { UserFormVal } from '@modules/AdministratorSettings/value';
import axiosInstance from "@src/api/authApi";
import { useQueryClient } from '@tanstack/react-query';

export default function index() {
    const { setAlert, setNewlyAddedUser } = AdministratorSettingsStore();
    const { action, setAction } = DialogStore();
    const formRef = useRef<HTMLFormElement>(null);
    const queryClient = useQueryClient();
    const [isGenerated, setIsGenerated] = useState(true);

    const generatePassword = (length = 8) => {
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const number = "0123456789";
        const symbol = "@";

        const all = upper + lower + number + symbol;

        let password = [
            upper[Math.floor(Math.random() * upper.length)],
            lower[Math.floor(Math.random() * lower.length)],
            number[Math.floor(Math.random() * number.length)],
            symbol[Math.floor(Math.random() * symbol.length)],
        ];

        for (let i = password.length; i < length; i++) {
            password.push(all[Math.floor(Math.random() * all.length)]);
        }

        return password.sort(() => Math.random() - 0.5).join('');
    };

    const form = useForm({  
        mode: 'uncontrolled',
        initialValues: UserFormVal,
        validate: {
            firstName: (value: string) => value.length === 0 ? "Firstname is required" : null,
            lastName: (value: string) => value.length === 0 ? "Lastname is required" : null,
            email: (value: string) => value.length === 0 ? "Email is required" : null,
            username: (value: string) => value.length === 0 ? "Username is required" : null,
            password: (value: string) => {
                if (value.length === 0) return "Password is required";
                if (value.length < 8) return "Password must be at least 8 characters long";
                if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
                if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                if (!/[^A-Za-z0-9]/.test(value)) return "Password must contain at least one symbol";
                return null;
            },
            rePassword: (value: string, values: { password: string }) => {
                if (value.length === 0) return "Repassword is required";
                if (value !== values.password) return "Passwords do not match";
                return null;
            },
        }
    });

    useEffect(() => {
        if (isGenerated) {
            const newPassword = generatePassword();
            form.setValues({
                ...form.getValues(),
                password: newPassword,
                rePassword: newPassword,
            });
        } else {
            form.setValues({
                ...form.getValues(),
                password: '',
                rePassword: '',
            });
        }
    }, [isGenerated]);

    const onSubmit = async (formValues: UserForm) => {
        const payload = {
            ...formValues,
            isGenerated
        };
        console.log('payload: ', payload)
        await axiosInstance
            .post("/auth/register", payload)
            .then(() => {
                queryClient.refetchQueries({ queryKey: ["auth/users"], type: 'active' });
                setAction('');
                setAlert(AlertType.createAccountSuccess);
                setNewlyAddedUser(formValues);
            })
            .catch((error) => {
                const message = error.response?.data?.errors?.[0]?.message || 'Something went wrong';
                console.error(message);
            });
    };

    return (
        <Modal
            size={'40%'}
            opened={action !== ''}
            centered
            onClose={() => setAction('')}
            title={'Create Account'}
            className='text-[#559CDA]'
            styles={{
                header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
            }}
        >
            <div className='m-auto w-[95%] '>
                <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                <form ref={formRef} onSubmit={form.onSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <div className='flex gap-4'>
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("lastName")} key={form.key('lastName')} radius='md' size="lg" label="Last Name" placeholder="Enter last name" />
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("firstName")} key={form.key('firstName')} radius='md' size="lg" label="First Name" placeholder="Enter first name" />
                    </div>
                    <div className='flex gap-4'>
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("middleName")} key={form.key('middleName')} radius='md' size="lg" label="Middle Name" placeholder="Enter middle name" />
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("extension")} key={form.key('extension')} radius='md' size="lg" label="Name Extension" placeholder="Enter name extension" />
                    </div>
                    <div className='flex gap-4'>
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("email")} key={form.key('email')} radius='md' size="lg" label="Email" placeholder="Enter email address" />
                        <TextInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("username")} key={form.key('username')} radius='md' size="lg" label="Username" placeholder="Enter username" />
                    </div>
                    <div className='flex gap-4'>
                        <PasswordInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("password")} key={form.key('password')} radius='md' size="lg" label="Enter Password" placeholder="Enter password" />
                        <PasswordInput className='w-[50%] text-[#6D6D6D]' classNames={{ input: 'poppins' }} {...form.getInputProps("rePassword")} key={form.key('rePassword')} radius='md' size="lg" label="Confirm Password" placeholder="Confirm password" />
                    </div>
                    <div className='flex flex-col gap-8 mt-4'>
                        <div className='flex gap-4'>
                            <Checkbox
                                className="w-[50%]"
                                checked={isGenerated}
                                onChange={(event) => setIsGenerated(event.currentTarget.checked)}
                                label="Generate Password"
                            />
                        </div>
                        <div className='flex justify-between'>
                            <Button
                                variant="outline"
                                className=" w-[25%] self-end"
                                radius={10}
                                onClick={() => setAction('')}
                            >CANCEL</Button>
                            <Button
                                variant="transparent"
                                className="br-gradient border-none text-white w-[30%] self-end"
                                radius={10}
                                onClick={() => { formRef.current?.requestSubmit() }}
                            >GENERATE ACCOUNT</Button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
