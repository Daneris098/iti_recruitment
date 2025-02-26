import { Divider, NumberInput, Select, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { AccountSetupStore } from "@modules/AccountSetup/store"
import { useEffect } from "react";
import Dropzone from "@shared/template/Dropzone";
export default function index() {

    const { form, setForm } = AccountSetupStore()

    useEffect(() => {
        console.log(form.hiring.interviewStages)
    }, [])

    const addFieldStage = () => {
        const updatedinterviewStages = [...form.hiring.interviewStages, { id: Date.now(), name: "" }];
        setForm({ ...form, hiring: { ...form.hiring, interviewStages: updatedinterviewStages } });
    };

    const removeFieldStage = (id: number) => {
        const updatedinterviewStages = form.hiring.interviewStages.filter(interviewStages => interviewStages.id !== id);
        setForm({ ...form, hiring: { ...form.hiring, interviewStages: updatedinterviewStages } });
    };

    const addFieldInterviewer = () => {
        const updatedinterviewer = [...form.hiring.interviewers, { id: Date.now(), name: "" }];
        setForm({ ...form, hiring: { ...form.hiring, interviewers: updatedinterviewer } });
    };

    const removeFieldInterviewer = (id: number) => {
        const updatedinterviewer = form.hiring.interviewers.filter(interviewer => interviewer.id !== id);
        setForm({ ...form, hiring: { ...form.hiring, interviewers: updatedinterviewer } });
    };

    return (
        <div className="w-[75%] mx-auto flex flex-col gap-2 sm:gap-8  text-[#6D6D6D] ">
            <div className="flex flex-col gap-2">
                <p className="text-center font-semibold">OFFER RESPONSE PERIOD</p>
                <Divider size={3} color="#ebe5e5" />
            </div>
            <p>Establish the maximum number days for applicants to sign the job offer issued. Once this limit is reached, the job offer automatically marked as declined, and the applicant's status will be updated to Archived.</p>
            <NumberInput radius={"md"} size="md" label="Number of Days" placeholder="Input Number of Days" className="w-full" suffix=" Days" min={1} />

            <div className="flex flex-col gap-2">
                <p className="text-center font-semibold">APPLICATION SETTINGS</p>
                <Divider size={3} color="#ebe5e5" />
            </div>
            <p>Establish the maximum number days for applicants to sign the job offer issued. Once this limit is reached, the job offer automatically marked as declined, and the applicant's status will be updated to Archived.</p>
            <div className="flex gap-4">
                <Select radius={8} data={["Yes", "No"]} className="w-full sm:w-1/2" size="md" label="Allow Applicants to Re-apply" placeholder="Select City/Municipality" rightSection={<IconCaretDownFilled size='18' />} />
                <NumberInput radius={"md"} size="md" label="Allow Re-apply after" placeholder="Input Number of Months" className="w-1/2" suffix=" Months" min={1} max={12} />
            </div>


            <div className="flex flex-col gap-2">
                <p className="text-center font-semibold">INTERVIEW STAGES</p>
                <Divider size={3} color="#ebe5e5" />
            </div>

            <div className="">
                <p>Customize your interview stages to align with your organization's specific recruitment process.</p>
                {form.hiring.interviewStages.map((interview, index) =>
                    <div className="relative " key={interview.id}>
                        {index != 0 && (<IconCircleMinus size={35} className="cursor-pointer absolute right-[-3%] bottom-[0%]" onClick={() => { removeFieldStage(interview.id) }} />)}
                        <TextInput radius={"md"} size="md" label="Interviewer Stage Name" placeholder="Type Name" className="w-full" min={1} />
                        {index === form.hiring.interviewStages.length - 1 && (<p className="w-36 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2 absolute" onClick={() => { addFieldStage() }}><IconCirclePlus size={20} />ADD STAGE</p>)}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-center font-semibold">INTERVIEWER</p>
                <Divider size={3} color="#ebe5e5" />
            </div>
            <div className="">
                <p>List individuals authorized to conduct interview for applicants</p>
                {form.hiring.interviewers.map((interviewer, index) =>
                    <div className="relative " key={interviewer.id}>
                        {index != 0 && (<IconCircleMinus size={35} className="cursor-pointer absolute right-[-3%] bottom-[0%]" onClick={() => { removeFieldInterviewer(interviewer.id) }} />)}
                        <TextInput radius={"md"} size="md" label="Interviewer Name" placeholder="Type Name" className="w-full" min={1} />
                        {index === form.hiring.interviewers.length - 1 && (<p className="w-44 text-sm bg-[#559cda] text-white px-2 py-1 rounded-md font-semibold cursor-pointer flex gap-2 m-2 absolute" onClick={() => { addFieldInterviewer() }}><IconCirclePlus size={20} />ADD INTERVIEWER</p>)}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-center font-bold">JOB OFFER TEMPLATE</p>
                <Divider size={3} color="#ebe5e5" />
            </div>

            <p className="text-[#6D6D6D]">Click to <span className="text-[#559CDA] cursor-pointer underline font-semibold">GENERATE AND DOWNLOAD TEMPLATE</span>. Customize the benefits, then upload the updated Job Offer Template for use during Job Offer Generation.</p>
            <Dropzone />
        </div>
    )
}