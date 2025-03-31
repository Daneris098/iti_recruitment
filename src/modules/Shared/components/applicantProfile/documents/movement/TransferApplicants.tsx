
import { useCloseModal, useStatusStore } from "@src/modules/Shared/components/applicantProfile/store";
import { IconLoader2, IconUserCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
interface ApplicantContactProps {
    onClose: () => void;
}

export default function TransferApplicantLoader({ onClose }: ApplicantContactProps) {

    const totalTransfers = 10;
    const [transferred, setTransferred] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { resetTransferState, setIsViewApplicant, setIsUpdateStatusButtonModalOpen, setisForTransfer, setIsForTransferLoader, setIsOffered, setIsGenerateNewOffer, setIsModalOpen } = useCloseModal();
    const { setSelectedStatus } = useStatusStore();

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
                setIsForTransferLoader(false);
                setisForTransfer(false);
                setSelectedStatus(null);
                setIsViewApplicant(false);
                setIsOffered(false);
                setIsGenerateNewOffer(false);
                setIsModalOpen(false);
            }, 1500);

            return () => clearTimeout(closeTimer); // Cleanup on unmount
        }
    }, [transferred, totalTransfers, onClose, resetTransferState]);

    return (
        <div className="p-1 w-full h-full">

            {/* Icon */}
            <div className="justify-center flex items-center pt-16">
                {isLoading ? (
                    <IconLoader2
                        className="text-[#559CDA] animate-spin"
                        size={110}
                        stroke={1}
                    />
                ) : (
                    <IconUserCheck className="text-[#559CDA]" size={110} stroke={1} />

                )}

            </div>

            {/* Text prompt */}
            <div className="text-center">
                <h1 className="font-semibold text-[22px] text-[#6D6D6D] poppins">
                    {transferred} out of {totalTransfers} transfers successful!
                </h1>
            </div>
        </div>
    );
}
