
import { useEffect, useState } from "react";
import { IconLoader2, IconUserCheck } from "@tabler/icons-react";
import { useCreateForTransfer } from "@src/modules/Shared/hooks/useSharedApplicants";
import { useApplicantIdStore, useCloseModal, useSelectedApplicantsStore, useStatusStore } from "@src/modules/Applicants/store";
export default function TransferApplicantLoader() {

    const { mutate: transferApplicants } = useCreateForTransfer();

    const totalTransfers = 10;
    const [transferred, setTransferred] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const {
        setisForTransfer,
        setIsViewApplicant,
        setIsForMultipleTransfer,
        setIsForTransferLoader, setIsOffered,
        setIsGenerateNewOffer, setIsModalOpen,
        setIsUpdateStatusButtonModalOpen } = useCloseModal();

    const { setSelectedStatus } = useStatusStore();

    const applicantId = useApplicantIdStore((state) => state.id);
    const selectedIds = useSelectedApplicantsStore((state) => state.selectedIds);
    const transferIds = selectedIds.length > 0 ? selectedIds : [applicantId]

    useEffect(() => {
        const runTransfer = async () => {
            if (transferred < totalTransfers) {
                const timer = setTimeout(() => {
                    setTransferred((prev) => prev + 1);
                }, 200);
                return () => clearTimeout(timer);
            } else {
                setIsLoading(false);
                const closeTimer = setTimeout(async () => {
                    try {
                        transferApplicants({
                            applicantIds: transferIds
                        });
                    } catch (e) {
                        console.error(e);
                    }
                    setIsUpdateStatusButtonModalOpen(false);
                    setIsForTransferLoader(false);
                    setisForTransfer(false);
                    setSelectedStatus(null);
                    setIsViewApplicant(false);
                    setIsOffered(false);
                    setIsGenerateNewOffer(false);
                    setIsModalOpen(false);
                    setIsForMultipleTransfer(false);
                }, 1500);
                return () => clearTimeout(closeTimer);
            }
        };

        const cleanup = runTransfer();
        return () => {
            if (cleanup instanceof Function) cleanup();
        };
    }, [transferred, totalTransfers, applicantId]);


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
                ) : (<IconUserCheck className="text-[#559CDA]" size={110} stroke={1} />)}
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
