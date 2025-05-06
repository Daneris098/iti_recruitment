import { Button, Checkbox, Modal, PasswordInput, Select, TextInput } from '@mantine/core';
import {  forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AdministratorSettingsStore } from "@modules/AdministratorSettings/store";
import { ResetCredentialFormVal, selectedDataInitialVal } from '@modules/AdministratorSettings/value';
import avatar from "@assets/avatar.png";
import { IconCaretDownFilled } from '@tabler/icons-react';
import { AlertType, ResetCredentialForm } from '../../types';
import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import authApi from '@src/api/authApi';

const SelectedAccount = forwardRef((_, ref) => {

    const { setAlert, selectedUser, setSelectedUser, setResetCredentials } = AdministratorSettingsStore();
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isResetCredential, setIsResetCredential] = useState<boolean>(false)
    const [title, setTitle] = useState('View User Account')
    const [isGenerated, setIsGenerated] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);
    const queryClient = useQueryClient();

    const handleClose = () => {
        setSelectedUser(selectedDataInitialVal);
        setIsEdit(false);
        setIsResetCredential(false);
        setTitle('View User Account');
    }

    const handleReset = () => {
        setIsResetCredential(true);
        setTitle('Reset Credentials')
    }

    const handleEdit = () => {
        setIsEdit(true);
        setTitle('Edit Account Status')
    }

    useEffect(() => {
        form.setFieldValue('username', selectedUser.username)
        form.setFieldValue('email', selectedUser.email)
    }, [selectedUser])

    const form = useForm({  
        mode: 'uncontrolled',
        initialValues: ResetCredentialFormVal,
        validate: {
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

    const onSubmit = async (formValues: ResetCredentialForm) => {
        const payload = {
            ...formValues,
            isGenerated
        };
        await authApi
            .post("/auth/" + selectedUser.id +"/reset-password", payload)
            .then(() => {
                queryClient.refetchQueries({ queryKey: ["auth/users"], type: 'active' });
                handleClose()
            })
            .catch((error) => {
                const message = error.response?.data?.errors?.[0]?.message || 'Something went wrong';
                console.error(message);
            });
    };

    const handleSave = () => {
        if (isEdit) {
            (async () => {
                const payload = {
                    username: selectedUser.username,
                    isActive: selectedUser.status === 'Active' ? true : false
                };
                await authApi
                    .post("/auth/" + selectedUser.id + "/update", payload)
                    .then(() => {
                        setAlert(AlertType.editSuccess);
                        queryClient.refetchQueries({ queryKey: ["auth/users"], type: 'active' });
                        handleClose()
                    })
                    .catch((error) => {
                        const message = error.response?.data?.errors?.[0]?.message || 'Something went wrong';
                        console.error(message);
                    });
            })();
        }
        else if (isResetCredential) {
            form.validate();
            setResetCredentials(form.getValues());
            setAlert(AlertType.resetConfirmation);   
        }
        else {
            setAlert(AlertType.saved);
        }
        // handleClose();
    }

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

    useImperativeHandle(ref, () => ({
        submit: () => {
            formRef.current?.requestSubmit()
        }
    }));

    return (
        <Modal size={'60%'} opened={selectedUser != selectedDataInitialVal} centered onClose={() => { handleClose() }} title={title}
            radius={'md'}
            className='' styles={{
                header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
            }} >
            <div className='flex flex-col '>
                <div className='flex'>
                    <div className='flex flex-col  w-[30%]'>
                        <div className='bg-gray-100'>
                            <img
                                src={avatar}
                                alt="it's me"
                                className="cursor-pointer  object-cover"
                            />
                        </div>
                        <p className='text-[#559CDA] text-xl poppins font-bold'>{selectedUser.firstname + " " + selectedUser.lastname}</p>
                        <p className='text-[#6D6D6D] text-sm poppins'>Account Status: </p>

                        {isEdit ? (
                            <Select
                                radius={8}
                                data={["Active", "Inactive"]}
                                rightSection={<IconCaretDownFilled size='18' color='white' />}
                                className="border-none w-full text-sm "
                                classNames={{ label: "p-1", input: "bg-[#5A9D27]  text-white text-center poppins" }}
                                styles={{ label: { color: "#6d6d6d" } }}
                                onChange={(val: any) => {
                                    setSelectedUser({
                                        ...selectedUser,
                                        status: val
                                    });
                                }}
                                defaultValue={selectedUser.status}
                            />) : (
                            <div className='bg-[#5A9D27] text-center text-white rounded-lg p-1.5 poppins'>{selectedUser.status}</div>
                        )}

                    </div>
                    <div className='flex flex-col pl-4 grow justify-between h-[28rem]'>
                        {!isResetCredential ?
                            (<div className='flex flex-col gap-4 '>
                                <div className='flex flex-col'>
                                    <p className='text-sm text-[#6D6D6D]'>Email: </p>
                                    <p className='font-bold text-sm text-[#6D6D6D]'>{selectedUser.email}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-sm text-[#6D6D6D]'>Username: </p>
                                    <p className='font-bold text-sm text-[#6D6D6D]'>{selectedUser.username}</p>
                                </div>
                            </div>
                            ) :
                            (
                                <form ref={formRef} onSubmit={form.onSubmit(onSubmit)} className='flex flex-col gap-5'>
                                    <div className='flex flex-col gap-5'>
                                        <div className='flex gap-4 items-end'>
                                            <TextInput {...form.getInputProps("username")} key={form.key('username')} disabled label="Username" radius={'md'} className='text-sm text-[#6D6D6D] w-[50%]'></TextInput>
                                            <TextInput {...form.getInputProps("email")} key={form.key('email')} disabled label="Email" radius={'md'} className='text-sm text-[#6D6D6D] w-[50%]'></TextInput>
                                        </div>
                                        <div className='flex gap-4 items-end'>
                                            <PasswordInput {...form.getInputProps("password")} key={form.key('password')} label="Enter Password" radius={'md'} className='text-sm text-[#6D6D6D] w-[50%]'></PasswordInput>
                                            <PasswordInput {...form.getInputProps("rePassword")} key={form.key('rePassword')} label="Confirm Password" radius={'md'} className='text-sm text-[#6D6D6D] w-[50%]'></PasswordInput>
                                        </div>
                                        <div className='flex gap-4 items-end'>
                                            <Checkbox
                                                className="w-[50%]"
                                                checked={isGenerated}
                                                onChange={(event) => setIsGenerated(event.currentTarget.checked)}
                                                label="Generate Password"
                                            />  
                                        </div>
                                    </div>
                                </form>
                            )
                        }
                        {isEdit || isResetCredential ? (
                            <Button className='rounded-md w-[50%] br-gradient border-none poppins self-end ' radius={'md'} onClick={() => { handleSave() }}>SAVE CHANGES</Button>
                        ) : (
                            <div className='flex gap-4 '>
                                <Button className='rounded-md w-[50%] poppins' variant='outline' onClick={() => { handleReset() }}>RESET CREDENTIALS</Button>
                                <Button className='rounded-md w-[50%] br-gradient border-none poppins' onClick={() => { handleEdit() }}>EDIT STATUS</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
})

export default SelectedAccount;