import { Avatar, Button, PasswordInput, Tabs, TextInput } from "@mantine/core";
import avatar from "@assets/avatar.png";
import "@modules/ProfileSettings/style.css"
export const ProfileSettings = () => {

    return (
        <div className="bg-white h-full  rounded-md">
            <div className="h-[15%] br-gradient rounded-t-md flex flex-col items-center">
                <div className=" flex items-center justify-between w-[90%] m-auto">
                    <div className="flex flex-col">
                        <p className="sm:text-3xl text-white ">Profile Settings</p>
                        <p className="sm:text-xl text-white ">Customize your profile.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button className="rounded-md" color="white" variant="outline">Cancel</Button>
                        <Button className="rounded-md">Save</Button>
                    </div>
                </div>
            </div>
            <Tabs defaultValue="profileDetails" variant="default" className=" h-[75%]">
                <Tabs.List className="px-4">
                    <Tabs.Tab value="profileDetails" className="text-[#559CDA]">
                        Profile Details
                    </Tabs.Tab>
                    <Tabs.Tab value="changePassword" className="text-[#559CDA]">
                        Change Password
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="profileDetails" className="border-[2px] border-blue-300 rounded-md px-4 m-4 h-full p-4 sm:p-8 overflow-auto">
                    <div className=" text-[#559CDA] font-bold">Profile Details</div>
                    <p className="text-md text-[#6D6D6D]">Modify your name, username, and email to keep your details up to date. All fields must not be empty.</p>
                    <img
                        src={avatar}
                        alt="it's me"
                        className="place-self-center cursor-pointer h-[40%]"
                    />
                    <div className="flex gap-2 flex-col sm:flex-row">
                        <TextInput className="sm:w-[25%]" radius='md' label="Last Name" value="Cooper" />
                        <TextInput className="sm:w-[25%]" radius='md' label="First Name" value="Jane" />
                        <TextInput className="sm:w-[25%]" radius='md' label="Middle Name" value="Andrade" />
                        <TextInput className="sm:w-[25%]" radius='md' label="Name Extension"  />
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row">
                        <TextInput className="sm:w-[33%]" radius='md' label="Email" value="janecooper@gmail.com" />
                        <TextInput className="sm:w-[33%]" radius='md' label="Username" value="janecooper32"/>
                        <PasswordInput className="sm:w-[33%]" radius='md' label="Password" value="password"/>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="changePassword" className="border-[2px] border-blue-300 rounded-md px-4 m-4  p-4 sm:p-8-full">
                    <div className=" text-[#559CDA] font-bold">Change Password</div>
                    <p className="text-md text-[#6D6D6D]">Passwords should contain at least one capital letter, a number, and a special character.</p>
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
