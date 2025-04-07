import { Divider } from "@mantine/core";
import { IconMessage2Check, IconX } from "@tabler/icons-react";

interface JobGeneratedAlertProps {
    onClose: () => void;
    selectedStatus: string | null;
}

export default function JobGeneratedAlert({ onClose, selectedStatus }: JobGeneratedAlertProps) {

    return (

        <div className="p-1">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">

                        {/* If the selected status from drop down === "Hired" Then Feedback else Save Feedback.*/}
                        {selectedStatus === "Hired" ? "Feedback" : "Save Feedback"}
                    </h1>

                    {/* Exit Icon - Closes modal */}
                    <IconX
                        className="w-[15px] h-[15px] cursor-pointer"
                        onClick={() => {
                            onClose();
                        }}

                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2 poppins" />
            </div>

            {/* Checklist Icon */}
            <div className="justify-center flex py-4">
                <IconMessage2Check size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
            </div>

            {/* Text prompt */}
            <div>
                <h1 className="font-semibold flex justify-center text-[24px] text-[#6D6D6D] poppins">
                    {/* Feedback sent! */}
                    {selectedStatus === "Hired" ? "Feedback Saved!" : "Feedback sent!"}
                </h1>
            </div>
        </div>
    );
}

// This is the top-level modal. Meaning, this is the last modal you should see as it is the final step in the process.