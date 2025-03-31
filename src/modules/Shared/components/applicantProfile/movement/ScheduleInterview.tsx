import { Button, Divider, Modal } from "@mantine/core";
import { IconUserQuestion, IconX } from "@tabler/icons-react";
import { useCloseModal } from "@src/modules/Applicants/store";

import ScheduleInterviewAlert from "@src/modules/Applicants/components/alerts/AddtoCalendar"
import ScheduleInterviewModal from "@modules/Applicants/components/modal/scheduleInterview";
interface ApplicantNotReachableProps {
    onClose: () => void;

}

export default function ApplicantNotReachable({ onClose }: ApplicantNotReachableProps) {



    const {
        isApplicantUnreachableArchive, setIsApplicantUnreachableArchive,
        isScheduleInterview, setIsScheduleInterview,
        isAddtoCalendar, setIsAddtoCalendar,
    } = useCloseModal();

    return (
        <div className="p-1 w-full h-full">

            {(isScheduleInterview && !isApplicantUnreachableArchive) && (
                <div>
                    {/* Header */}
                    <div>
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">
                                Applicant Not Reachable
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

                    {/* Checklist Icon */}
                    <div className="justify-center flex py-4">
                        <IconUserQuestion size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
                    </div>

                    {/* Text prompt */}
                    <div className="text-center">
                        <h1 className="font-semibold text-[24px] text-[#6D6D6D] poppins">
                            Applicant cannot be reached via email. <br />
                            Would you like to call instead?
                        </h1>
                        <p className="mt-2 italic text-[#6D6D6D] text-[16px] poppins">If you choose NO, the applicant will be put in archived.</p>
                    </div>

                </div>
            )}

            {(isApplicantUnreachableArchive) && ((

                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">
                            Applicant Contact Number
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

                    {/* Text prompt */}
                    <div className="text-center pt-14">
                        <h1 className="font-semibold text-[22px] text-[#6D6D6D] poppins">
                            You can call/contact Jane Cooper here: <br />
                            <span className="text-[#559CDA]">+63916735673</span>
                        </h1>
                        <p className="mt-2 italic text-[#6D6D6D] text-[16px] poppins pt-6">Choose "Add to Calendar" if you reached the applicant via phone call/text. Otherwise, choose "Archive".</p>
                    </div>

                </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-center space-x-8 pt-8 pb-2">

                {/*YES / ADD TO CALENDAR*/}
                <Button
                    className={`h-[42px] rounded-[10px] poppins ${isScheduleInterview && !isApplicantUnreachableArchive ? "br-gradient w-[152px]" : "br-gradient text-white w-[191px]"}`}

                    // If the user clicked the "Schedule Interview" button
                    // Then conditionally render the button with the "Add to Calendar" text or "Yes".
                    // The function checks if the schedule interview button is activated AND the applicant hasn't clicked the "NO" button yet.
                    // Else, the process will be concluded and the "Feedback Sent!" will eventually appear.
                    onClick={() => {
                        if (isScheduleInterview && !isApplicantUnreachableArchive) {
                            setIsApplicantUnreachableArchive(true); // Set isApplicantUnreachableArchive to true. Setting its current value to true 
                            // will render the modal with "Applicant Contact number" header.
                        } else {
                            setIsAddtoCalendar(true); // Open Schedule Interview Alert.
                        }
                    }}
                >
                    {/* If Schedule Interview button is true, then the modal will have a buttons ["Yes" OR "NO"].
                    Else, ["ADD TO CALENDAR" OR "ARCHIVE"]. */}
                    {isScheduleInterview && !isApplicantUnreachableArchive ? "YES".toUpperCase() : "ADD TO CALENDAR".toUpperCase()}
                </Button>

                {/*NO / ARCHIVE*/}
                <Button
                    className="
                    w-[152px] h-[42px] 
                    bg-white 
                    text-[#559CDA] rounded-[10px] border border-1 
                    border-[#559CDA] 
                    hover:text-[#559CDA]
                    hover:bg-white poppins"

                    onClick={() => {
                        setIsApplicantUnreachableArchive(false); // Close this modal
                        setIsScheduleInterview(true);  // Make sure the first modal appears
                        setIsAddtoCalendar(false);  // Ensure other modals are closed

                        onClose(); // Close modal
                    }}
                >
                    {isScheduleInterview && !isApplicantUnreachableArchive ? "no".toUpperCase() : "archive".toUpperCase()}
                </Button>
            </div>

            <div>
                <Modal opened={isAddtoCalendar} onClose={() => setIsAddtoCalendar(false)}>
                    <ScheduleInterviewAlert onClose={() => setIsAddtoCalendar(false)} />
                </Modal>
            </div>
        </div>
    );
}
