import { Divider } from "@mantine/core";
import { useCloseModal } from "@src/modules/Applicants/store";
import { IconBrandTelegram, IconX } from "@tabler/icons-react";
import { useEffect } from "react";

interface AddtoCalendarAlertProps {
    onClose: () => void;
    // selectedStatus: string | null;
    // onCloseAllModal: () => void;
}

export default function AddtoCalendar({ onClose,
    // onCloseAllModal
}: AddtoCalendarAlertProps) {

    const {
        isContactApplicant, setIsContactApplicant,
        isAddtoCalendar, setIsAddtoCalendar,
        setIsScheduleInterview, setIsUpdatedStatusModalOpen,
        setIsUpdateStatusButtonModalOpen, setIsApplicantNotReachable,
        setIsViewApplicant
    } = useCloseModal();

    useEffect(() => {
        if (isContactApplicant || isAddtoCalendar) {
            const timer = setTimeout(() => {
                // setIsContactApplicant(false);
                setIsAddtoCalendar(false); // For closing the Add Calendar
                setIsScheduleInterview(false); // For closing the applicant not reachable modal
                setIsApplicantNotReachable(false); // For Closing the Applicant Contact Number modal
                setIsViewApplicant(false); // For Closing the View Applicant Modal
                setIsContactApplicant(false); // for closing the Add to calendar dropdown under schedule interview button
                setIsUpdatedStatusModalOpen(false); // For Closing the Update Applicant Status (For Interview) modal
                setIsUpdateStatusButtonModalOpen(false); // For closing the Update Status Button
            }, 1000); // Closes modal after 1 second

            return () => clearTimeout(timer); // Cleanup timeout on unmount
        }
    }, [isContactApplicant, setIsAddtoCalendar]);

    // useEffect(() => {
    //     if (isContactApplicant) {
    //         onCloseAllModal(); // Close all modals when isContactApplicant is true
    //         const timer = setTimeout(() => {
    //             setIsContactApplicant(false);
    //             setisAddtoCalendar(false);
    //         }, 1000); // Closes modal after 1 second

    //         return () => clearTimeout(timer); // Cleanup timeout on unmount
    //     }
    // }, [isContactApplicant, onCloseAllModal, setIsContactApplicant, setisAddtoCalendar]);


    return (
        <div className="p-1">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px]">Schedule Interview</h1>

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