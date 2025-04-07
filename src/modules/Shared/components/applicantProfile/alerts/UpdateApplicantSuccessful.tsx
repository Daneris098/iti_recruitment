import { Divider } from "@mantine/core";
import { IconMessage2Check, IconX } from "@tabler/icons-react";

interface JobGeneratedAlertProps {
    onClose: () => void;
}

export default function JobGeneratedAlert({ onClose }: JobGeneratedAlertProps) {
    return (
        <div className="p-1">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px]">Update Applicant Status</h1>

                    {/* Exit Icon - Closes modal */}
                    <IconX
                        className="w-[15px] h-[15px] cursor-pointer"
                        onClick={onClose} // Closes modal
                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Checklist Icon */}
            <div className="justify-center flex py-4">
                <IconMessage2Check size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
            </div>

            {/* Text prompt */}
            <div>
                <h1 className="font-semibold flex justify-center text-[24px] text-[#6D6D6D] pb-8 pt-2 text-center">
                    Update Applicant Status Successful
                </h1>
            </div>

        </div>
    );
}

// This is the top-level modal. Meaning, this is the last modal you should see as it is the final step in the process.