import { TextInput } from "@mantine/core";

export default function index() {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-[#559CDA] font-bold">Offer Response Period</p>
            <p className="text-[#6D6D6D]">Establish the maximum number of days for applicants to sign the job offers issued. Once this limit is reached, the job offer will be automatically marked as declined, and the applicant's status will be updated to Archived."</p>
            <TextInput className="w-36 text-[#6D6D6D]" radius={"md"} value="3 days" label="Number of Days *"/>
        </div>
    )
}