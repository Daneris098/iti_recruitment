import { Button, Modal, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState } from "react";
import { AdministratorSettingsStore, DialogStore } from "@modules/AdministratorSettings/store";
import { selectedDataInitialVal } from '@modules/AdministratorSettings/value';
import avatar from "@assets/avatar.png";
import { IconCaretDownFilled } from '@tabler/icons-react';
import { AlertType, user } from '../../types';

export default function index() {
    const { setAlert, selectedUser, setSelectedUser } = AdministratorSettingsStore();
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const onSubmit = async () => {
    };

    return (
        <Modal size={'40%'} opened={selectedUser != selectedDataInitialVal} centered onClose={() => { setSelectedUser(selectedDataInitialVal); setIsEdit(false); }} title={'View User Account'}
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
                    <div className='flex flex-col pl-4 grow justify-between h-80'>
                        <div className='flex flex-col gap-4 '>
                            <div className='flex flex-col'>
                                <p className='text-sm text-[#6D6D6D]'>Email: </p>
                                <p className='font-bold text-sm text-[#6D6D6D]'>{selectedUser.email}</p>
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-sm text-[#6D6D6D]'>Username: </p>
                                <p className='font-bold text-sm text-[#6D6D6D]'>{selectedUser.username}</p>
                            </div>
                        </div>
                        {!isEdit ? (
                            <div className='flex gap-4 '>
                                <Button className='rounded-md w-[50%] poppins' variant='outline'>RESET CREDENTIALS</Button>
                                <Button className='rounded-md w-[50%] br-gradient border-none poppins' onClick={() => { setIsEdit(true) }}>EDIT STATUS</Button>
                            </div>
                        ) : (
                                <Button className='rounded-md w-[50%] br-gradient border-none poppins self-end' onClick={() => { setAlert(AlertType.saved); setSelectedUser(selectedDataInitialVal); }}>SAVE CHANGES</Button>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
}