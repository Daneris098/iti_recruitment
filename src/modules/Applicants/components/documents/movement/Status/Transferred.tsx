import { Button } from "@mantine/core";
import { IconUserQuestion } from "@tabler/icons-react";
import ForTransfer from "@modules/Applicants/components/modal/forTransfer";
import { useCloseModal, useStatusStore } from "@src/modules/Applicants/store";
import TransferApplicants from "@modules/Applicants/components/documents/movement/TransferApplicants";

export default function Transferred() {

    const { setSelectedStatus } = useStatusStore();
    const { isForTransferLoader, setIsForTransferLoader, setIsForMultipleTransfer } = useCloseModal();

    return (
        <div className="p-1 w-full h-full">

            {/* Checklist Icon */}
            <div className="justify-center flex py-1">
                <IconUserQuestion size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
            </div>

            {/* Text prompt */}
            <div className="text-center">
                <h1 className="font-semibold text-[24px] text-[#6D6D6D] poppins">
                    Would you like to transfer the selected applicant(s) to HRDotNet?
                </h1>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-8 pt-8 pb-2">
                {/*YES*/}
                <Button className="br-gradient w-[152px] h-[42px] rounded-[10px] poppins"
                    onClick={() => {
                        setIsForTransferLoader(true);
                    }}
                >
                    {"yes".toUpperCase()}
                </Button>

                {/*NO*/}
                <Button
                    className="
                                w-[152px] h-[42px] 
                                bg-white 
                                text-[#559CDA] rounded-[10px] border border-1 
                                border-[#559CDA] 
                                hover:text-[#559CDA]
                                hover:bg-white poppins"
                    onClick={() => {
                        setSelectedStatus(null);
                        setIsForMultipleTransfer(false);
                    }}
                >
                    {"no".toUpperCase()}
                </Button>
            </div>

            {/* This modal will be called when the selectedStatus === Transferred and the user agrees to transfer applicants to hrdotnet. */}
            <ForTransfer isOpen={isForTransferLoader} onClose={() => setIsForTransferLoader(false)}>
                <TransferApplicants
                    // onClose={() => setIsForTransferLoader(false) }
                />
            </ForTransfer>
        </div>
    )
}