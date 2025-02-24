import { Select } from "@mantine/core";

export default function index() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <p className="text-[#559CDA] font-bold">Application Settings</p>
                <p className="text-[#6D6D6D]">Customize your hiring process according to your preferences, including the option to allow applicants to reapply after not advancing to the final stage of the hiring pipeline.</p>
            </div>
            <div className="flex w-[70%] justify-between">
                <Select
                    styles={{ label: { color: "#6D6D6D" }, input: { color: "#6D6D6D" }, options: { color: "#6D6D6D" } }}
                    radius={"md"}
                    label="Allow applicant to re-apply"
                    placeholder="Select Yes or No"
                    data={['Yes', 'No']}
                />
                <Select
                    styles={{ label: { color: "#6D6D6D" }, input: { color: "#6D6D6D" }, options: { color: "#6D6D6D" } }}
                    radius={"md"}
                    label="Allow Re-apply After"
                    placeholder=""
                    data={['6 months', '1 year']}
                />
            </div>
        </div>
    )
}