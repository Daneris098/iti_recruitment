import { Divider } from "@mantine/core";
import { useCloseModal } from "@src/modules/Applicants/store";
import { IconLoader2, IconUserCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
interface ApplicantContactProps {
    onClose: () => void;
}

export default function TransferApplicantLoader({ onClose }: ApplicantContactProps) {

    const totalTransfers = 10;
    const [transferred, setTransferred] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { resetTransferState, setIsViewApplicant, setIsUpdateStatusButtonModalOpen } = useCloseModal();

    useEffect(() => {
        if (transferred < totalTransfers) {
            const timer = setTimeout(() => {
                setTransferred((prev) => prev + 1);
            }, 200);
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
    
            // Wait 1 second before closing modal
            const closeTimer = setTimeout(() => {
                setIsUpdateStatusButtonModalOpen(false);
                setIsViewApplicant(false);
                resetTransferState(); // Reset Zustand modal states
                onClose();            // Close modal
            }, 1500);
    
            return () => clearTimeout(closeTimer); // Cleanup on unmount
        }
    }, [transferred, totalTransfers, onClose, resetTransferState]);
    


    return (
        <div className="p-1 w-full h-full">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">
                        Transfer Applicants
                    </h1>

                    {/* Exit Icon - Closes modal */}
                    <IconX
                        className="w-[15px] h-[15px] cursor-pointer"
                        onClick={() => {
                            onClose(); // Close FeedbackSent modal
                        }}
                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Icon */}
            <div className="justify-center flex py-4">
                {isLoading ? (
                    <IconLoader2
                        className="text-[#559CDA] animate-spin"
                        size={90}
                        stroke={1}
                    />
                ) : (
                    <IconUserCheck className="text-[#559CDA]" size={90} stroke={1} />

                )}

            </div>

            {/* Text prompt */}
            <div className="text-center">
                <h1 className="font-semibold text-[22px] text-[#6D6D6D] poppins pb-8">
                    {transferred} out of {totalTransfers} transfers successful!
                </h1>
            </div>
        </div>
    );
}
