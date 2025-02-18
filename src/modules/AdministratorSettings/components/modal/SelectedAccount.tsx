import { Button, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef } from "react";
import { AdministratorSettingsStore, DialogStore } from "@modules/AdministratorSettings/store";
import { selectedDataInitialVal } from '@modules/AdministratorSettings/value';
import avatar from "@assets/avatar.png";

export default function index() {
    const { action, setAction } = DialogStore()
    const { setAlert, selectedUser, setSelectedUser } = AdministratorSettingsStore();

    const onSubmit = async () => {
    };

    useEffect(() => {
        console.log('selectedUser: ', selectedUser)
    }, [selectedUser])

    return (
        <Modal size={'40%'} opened={selectedUser != selectedDataInitialVal} centered onClose={() => setSelectedUser(selectedDataInitialVal)} title={'View User Account'}
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
                        <div className='bg-[#5A9D27] text-center text-white rounded-lg p-1.5 poppins'>{selectedUser.status}</div>
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
                        <div className='flex gap-4 '>
                            <Button className='rounded-md w-[50%]' variant='outline'>RESET CREDENTIALS</Button>
                            <Button className='rounded-md w-[50%] br-gradient border-none'>EDIT STATUS</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}