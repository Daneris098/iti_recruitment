import { Divider } from "@mantine/core";
import { useCloseModal, useStatusStore } from "@src/modules/Applicants/store";
import { IconBrandTelegram, IconX } from "@tabler/icons-react";
import { useEffect } from "react";

export default function AddtoCalendar({ onClose }: { onClose: () => void }) {

    const {
        isScheduleInterview, setIsScheduleInterview,
        isUpdateStatusButtonModalOpen, setIsUpdateStatusButtonModalOpen,
        isViewApplicant, setIsViewApplicant,
        isAddtoCalendar,
        setIsAddtoCalendar, setIsDropdownOpen,
        setIsApplicantUnreachableArchive
    } = useCloseModal();

    const { setSelectedStatus } = useStatusStore();

    useEffect(() => {
        if (setIsScheduleInterview) {
            const timer = setTimeout(() => {
                setIsScheduleInterview(false);
                setIsUpdateStatusButtonModalOpen(false);
                setSelectedStatus(null);
                setIsUpdateStatusButtonModalOpen(false);
                setIsViewApplicant(false);
                setIsAddtoCalendar(false);
                setIsDropdownOpen(false);
                setIsApplicantUnreachableArchive(false);
                onClose();
            }, 1000); // Close modals after 1 second

            return () => clearTimeout(timer);
        }
    }, [isViewApplicant, isUpdateStatusButtonModalOpen, isScheduleInterview, isAddtoCalendar]);


    return (
        <div className="p-1">

            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px]">Schedule Interview</h1>

                    {/* Exit Icon - Closes modal */}
                    <IconX
                        className="w-[15px] h-[15px] cursor-pointer"
                        onClick={() => {
                            setIsScheduleInterview(false);
                            setIsUpdateStatusButtonModalOpen(false);
                            setIsViewApplicant(false);
                            onClose();
                        }} // Closes modal

                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Checklist Icon */}
            <div className="justify-center flex py-2">
                <IconBrandTelegram size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
            </div>

            {/* Text prompt */}
            <div>
                <h1 className="font-semibold flex justify-center text-[24px] text-[#6D6D6D] pb-6 text-center">
                    You have successfully scheduled an interview.
                </h1>
            </div>
        </div>
    );
}

// This modal will appear when you click "Add to calendar" under schedule interview drop-down.
// If the chosen status in update status drop-down is equals to "For Interview" then this modal is involved.