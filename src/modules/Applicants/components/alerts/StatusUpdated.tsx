import { Divider } from "@mantine/core";
import { IconCircleCheck, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { useCloseModal } from "@src/modules/Applicants/store";
interface JobGeneratedAlertProps {
    onClose: () => void;
}

export default function JobGeneratedAlert({ onClose }: JobGeneratedAlertProps) {

    const { isDefaultUpdated, setIsDefaultUpdated, setIsViewApplicant, setIsUpdateStatusButtonModalOpen } = useCloseModal();
    useEffect(() => {
        if (isDefaultUpdated) {
            const timer = setTimeout(() => {
                setIsDefaultUpdated(false);
                setIsViewApplicant(false);
                setIsUpdateStatusButtonModalOpen(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isDefaultUpdated]);

    return (
        <div className="p-1 h-[250px]">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px]">Update Status</h1>

                    {/* Exit Icon - Closes modal */}
                    <IconX
                        className="w-[15px] h-[15px] cursor-pointer"
                        onClick={onClose} // Closes modal
                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Checklist Icon */}
            <div className="justify-center flex py-2">
                <IconCircleCheck size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5] mt-7" />
            </div>

            {/* Text prompt */}
            <div>
                <h1 className="font-semibold flex justify-center text-[24px] text-[#6D6D6D]">
                    Status Updated!
                </h1>
            </div>

        </div>
    );
}

// This is the top-level modal. Meaning, this is the last modal you should see as it is the final step in the process.