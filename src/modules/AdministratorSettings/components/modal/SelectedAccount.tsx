import { Button, Checkbox, Modal, Select, TextInput } from '@mantine/core';
import {  useState } from "react";
import { AdministratorSettingsStore } from "@modules/AdministratorSettings/store";
import { selectedDataInitialVal } from '@modules/AdministratorSettings/value';
import avatar from "@assets/avatar.png";
import { IconCaretDownFilled } from '@tabler/icons-react';
import { AlertType } from '../../types';

export default function index() {
    const { setAlert, selectedUser, setSelectedUser } = AdministratorSettingsStore();
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isResetCredential, setIsResetCredential] = useState<boolean>(false)
    const [title, setTitle] = useState('View User Account')

    const handleClose = () => {
        setSelectedUser(selectedDataInitialVal);
        setIsEdit(false);
        setIsResetCredential(false);
        setTitle('View User Account');
    }

    const handleSave = () => {
        if (isEdit) {
            setAlert(AlertType.editSuccess);
        }
        else if (isResetCredential) {
            setAlert(AlertType.resetConfirmation);
        }
        else {
            setAlert(AlertType.saved);
        }
        handleClose();
    }

    const handleReset = () => {
        setIsResetCredential(true);
        setTitle('Reset Credentials')
    }

    const handleEdit = () => {
        setIsEdit(true);
        setTitle('Edit Account Status')
    }


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
                                <div className='flex flex-col gap-5'>
                                    <div className='flex gap-4 items-end'>
                                        <TextInput label="Username" radius={'md'} className='text-sm text-[#6D6D6D] w-[50%]'></TextInput>
                                        <TextInput label="Email" radius={'md'} className='text-sm text-[#6D6D6D] w-[50%]'></TextInput>
                                    </div>
                                    <div className='flex gap-4 items-end'>
                                        <TextInput label="Enter Password" radius={'md'} className='text-sm text-[#6D6D6D] w-[50%]'></TextInput>
                                        <TextInput label="Confirm Password" radius={'md'} className='text-sm text-[#6D6D6D] w-[50%]'></TextInput>
                                    </div>
                                    <div className='flex gap-4 items-end'>
                                        <Checkbox
                                            classNames={{ label:"text-[#6D6D6D] "}}
                                            className='w-[50%]'
                                            label="Generate Password"
                                        />
                                        <Checkbox
                                            classNames={{ label: "text-[#6D6D6D] " }}
                                            className='w-[50%]'
                                            label="Must Change Password upon login"
                                        />
                                    </div>
                                </div>)
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
}