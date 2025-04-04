import { Divider } from "@mantine/core";
import { IconCircleCheck, IconX } from "@tabler/icons-react";
import { useCloseModal } from "@src/modules/Applicants/store";
import { useStatusStore } from "@src/modules/Applicants/store";
interface TransferEmployeeProps {
    onClose: () => void;
    Employee_Name: string
}

export default function TransferEmployee({ onClose, Employee_Name }: TransferEmployeeProps) {

    const { setIsTransferEmployeePosition, setIsTransferEmployee } = useCloseModal();
    const { setSelectedStatus } = useStatusStore();

    return (
        <div className="p-1">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px]">Transfer Success</h1>

                    {/* Exit Icon - Closes modal */}
                    <IconX
                        className="w-[15px] h-[15px] cursor-pointer"
                        onClick={() => {
                            setTimeout(() => {
                                onClose();
                                setIsTransferEmployee(false);
                                setSelectedStatus(null);
                                setIsTransferEmployeePosition(false);
                            }, 1000); // 1 second delay
                        }}

                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Checklist Icon */}
            <div className="justify-center flex py-2">
                <IconCircleCheck size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
            </div>

            {/* Text prompt */}
            <div>
                <h1 className="font-semibold flex justify-center text-[24px] text-[#6D6D6D] text-center pb-4 pt-4">
                    You've successfully transferred  {Employee_Name} to HRDotNet
                </h1>
            </div>
        </div>
    );
}

// This is the top-level modal. Meaning, this is the last modal you should see as it is the final step in the process.