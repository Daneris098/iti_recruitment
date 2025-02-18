import { Button, PasswordInput, Tabs, TextInput } from "@mantine/core";
import avatar from "@assets/avatar.png";
import "@modules/ProfileSettings/style.css"
import Modals from "@modules/ProfileSettings/modal"
import { ProfileSettingsStore } from "@modules/ProfileSettings/store"
import { AlertType } from "./types";
import bg2 from '@assets/bg2.png';
import { useState, useRef, useEffect } from "react";

export const ProfileSettings = () => {
    const { setAlert, activePanel, setActivePanel } = ProfileSettingsStore()
    // Create refs for both tabs
    const profileDetailsTabRef = useRef(null);
    const changePasswordTabRef = useRef(null);

    // Function to switch to Profile Details tab
    const switchToProfileDetails = () => {
        if (profileDetailsTabRef.current) {
            (profileDetailsTabRef.current as any).click(); // Simulates a click
        }
    };

    // Function to switch to Change Password tab
    const switchToChangePassword = () => {
        if (changePasswordTabRef.current) {
            (changePasswordTabRef.current as any).click(); // Simulates a click
        }
    };


    useEffect(() => {
        if (activePanel === 'profileDetails') {
            switchToProfileDetails()
        }
        else if (activePanel === 'changePassword') {
            switchToChangePassword()
        }
    }, [activePanel])

    return (
        <div className="bg-white h-full  rounded-md">
            <Modals />
            <div style={{ backgroundImage: `url(${bg2})` }} className="bg-cover bg-center h-[15%] br-gradient rounded-t-md flex flex-col items-center">
                <div className=" flex items-center gap-4 sm:gap-0 sm:justify-between w-[90%] m-auto">
                    <div className="flex flex-col">
                        <p className="sm:text-3xl text-white font-bold">Profile Settings</p>
                        <p className="sm:text-xl text-white ">Customize your profile.</p>
                    </div>
                    <div className="flex gap-2   sm:w-[15%] ">
                        <Button className="text-xs rounded-md w-[52%]" onClick={() => { setAlert(AlertType.cancel) }} color="white" variant="outline">Cancel</Button>
                        <Button className="text-xs rounded-md w-[48%]" onClick={() => { setAlert(AlertType.saved) }}>Save</Button>
                    </div>
                </div>
            </div>
            <Tabs defaultValue="profileDetails" variant="default" className=" h-[75%] p-2" onChange={(val) => { setActivePanel(`${val}`) }}>
                <Tabs.List className="px-4">
                    <Tabs.Tab value="profileDetails" className={` ${activePanel === 'profileDetails' ? 'text-[#559CDA]' : 'text-gray-500'}`} ref={profileDetailsTabRef}
                    >
                        Profile Details
                    </Tabs.Tab>
                    <Tabs.Tab value="changePassword" className={` ${activePanel === 'changePassword' ? 'text-[#559CDA]' : 'text-gray-500'}`} ref={changePasswordTabRef}>
                        Change Password
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="profileDetails" className="border-[2px] border-blue-300 rounded-md px-4 m-4 h-full p-4 sm:p-8 overflow-auto flex flex-col gap-8">

                    <div>
                        <div className=" text-[#559CDA] font-bold">Profile Details</div>
                        <p className="text-md text-[#6D6D6D]">Modify your name, username, and email to keep your details up to date. All fields must not be empty.</p>
                    </div>

                    <div className="place-self-center bg-gray-300 w-40 h-40 rounded-full overflow-hidden flex items-center justify-center">
                        <img
                            src={avatar}
                            alt="it's me"
                            className="cursor-pointer h-full w-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 flex-col sm:flex-row">
                            <TextInput className="sm:w-[25%]" radius='md' label="Last Name" value="Cooper" />
                            <TextInput className="sm:w-[25%]" radius='md' label="First Name" value="Jane" />
                            <TextInput className="sm:w-[25%]" radius='md' label="Middle Name" value="Andrade" />
                            <TextInput className="sm:w-[25%]" radius='md' label="Name Extension" />
                        </div>
                        <div className="flex gap-2 flex-col sm:flex-row">
                            <TextInput className="sm:w-[50%]" radius='md' label="Email" value="janecooper@gmail.com" />
                            <TextInput className="sm:w-[50%]" radius='md' label="Username" value="janecooper32" />
                        </div>
                    </div>

                </Tabs.Panel>

                <Tabs.Panel value="changePassword" className="border-[2px] border-blue-300 rounded-md px-4 m-4  p-4 sm:p-8 h-full flex flex-col gap-8">
                    <div>
                        <div className=" text-[#559CDA] font-bold">Change Password</div>
                        <p className="text-md text-[#6D6D6D]">Passwords should contain at least one capital letter, a number, and a special character.</p>
                    </div>
                    
                    <div className="flex gap-2 items-end">
                        <PasswordInput label="Current Password" className="w-[33%]" radius='md' value="password" />
                        <PasswordInput label="New Password" className="w-[33%]" radius='md' value="password" />
                        <PasswordInput label="Confirm Password" className="w-[33%]" radius='md' value="password" />
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default ProfileSettings;
