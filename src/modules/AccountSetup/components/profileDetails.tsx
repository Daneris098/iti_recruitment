import { Divider, TextInput } from "@mantine/core";

export default function index() {
    return (
        <div className="h-full w-[75%] mx-auto flex flex-col gap-2 sm:gap-8 text-[#6D6D6D] font-semibold">
            <div className="flex flex-col gap-2">
                <p className="text-center">PROFILE DETAILS</p>
                <Divider size={3} color="#ebe5e5" />
            </div>
            <div className="flex flex-col sm:flex-row items-end gap-2">
                <TextInput radius={"md"} size="md" label="Full Name" placeholder="First Name" className="w-full sm:w-1/2" />
                <TextInput radius={"md"} size="md" placeholder="Last Name" className="w-full sm:w-1/2" />
            </div>
            <div className="flex flex-col sm:flex-row items-end gap-2 ">
                <TextInput radius={"md"} size="md" placeholder="Middle Name" className="w-full sm:w-1/2" />
                <TextInput radius={"md"} size="md" placeholder="Suffix (Jr. Sr. etc.)" className="w-full sm:w-1/2" />
            </div>
        </div>
    )
}