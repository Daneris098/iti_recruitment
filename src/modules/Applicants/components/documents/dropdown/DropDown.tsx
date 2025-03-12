{/*This is the component that will appear with dynamic update status fiels when you choose a status from the update status drop down menu.*/}

import { Button, Divider, Menu, Textarea, useCombobox } from "@mantine/core";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
import { useDropDownOfferedStore } from "@modules/Applicants/store"
import { useCloseModal } from "@modules/Applicants/store"
import { useStatusStore } from "@modules/Applicants/store"
import ScheduleInterviewAlert from "@src/modules/Applicants/components/alerts/AddtoCalendar"
import TransferApplicants from "@modules/Applicants/components/documents/movement/TransferApplicants";
import JobGeneratedModal from "@modules/Applicants/components/modal/jobGenerated"
import ApplicantUnreachable from "@modules/Applicants/components/modal/applicantUnReachable"
import JobGeneratedAlert from "@src/modules/Applicants/components/alerts/JobGeneratedAlert"
import FeedbackSent from "@src/modules/Applicants/components/alerts/FeedbackSent";
import ScheduleInterview from "@src/modules/Applicants/components/documents/movement/ScheduleInterview";
import ArchivedStatus from "@modules/Applicants/components/documents/movement/Status/Archived";
import OfferedStatus from "@modules/Applicants/components/documents/movement/Status/Offered";
import HiredStatus from "@modules/Applicants/components/documents/movement/Status/Hired";
import TransferredStatus from "@modules/Applicants/components/documents/movement/Status/Transferred";
import ForInterviewStatus from "@modules/Applicants/components/documents/movement/Status/ForInterview";
import TransferApplicantLoader from "@modules/Applicants/components/documents/movement/TransferApplicants";

interface DropDrowOfferedProps {
    Status: string;
    onClose: () => void;
}

export default function DropDown({ onClose, Status,
    // onCloseAll
}: DropDrowOfferedProps) {

    const { selectedStatus } = useStatusStore();
    const {
        setStatus,
        comments, setComments
    } = useDropDownOfferedStore();

    const {
        isModalOpen, setIsModalOpen,
        isFeedbackSent, setIsFeedbackSent,
        isScheduleInterview, setIsScheduleInterview,
        isForTransfer, setisForTransfer,
        isDropdownOpen, setIsDropdownOpen,
        isContactApplicant, setIsContactApplicant,
        setIsApplicantNotReachable
    } = useCloseModal();

    // To activate the comboBox of feedbacks field.
    const feedbacksComboBox = useCombobox({
        onDropdownClose: () => feedbacksComboBox.resetSelectedOption(),
    })

    let handleClick = () => { }; // Default empty function
    let buttonText = "Submit"

    if (selectedStatus === "Archived") {
        buttonText = "Save Feedback";
        handleClick = () => {
            setIsFeedbackSent(true);

            setIsDropdownOpen(false);  //  Close dropdown when clicking "Save Feedback"
            setTimeout(() => {
                setIsFeedbackSent(false);
                // onCloseAll(); // Close both DropDown and UpdateStatus

            }, 1000);
        };
    }
    else if (selectedStatus === "For Interview") {
        buttonText = "Schedule Interview"
        handleClick = () => {
            setIsScheduleInterview(true);
        };
    } else if (selectedStatus === "Offered") {
        buttonText = "Generate Offer"
        handleClick = () => setIsModalOpen(true);
    }
    else if (selectedStatus === "Hired") {
        buttonText = "Upload";
        handleClick = () => {
            setIsFeedbackSent(true);

            setIsDropdownOpen(false);  //  Close dropdown when clicking "Save Feedback"
            setTimeout(() => {
                setIsFeedbackSent(false);
                onClose();  // Close DropDown.tsx
            }, 1000);
        };
    }


    // This function dyanmically render the Header text based on the selected status.
    // If the selected status === 'Transferred' change the header text to Transfer Applicants.
    let headerText = ""
    if (selectedStatus === "Transferred") {
        headerText = "Transfer Applicants"
    }
    else {
        headerText = "Update Applicant Status"
    }

    // For Interview 
    const handleDropdownToggle = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevents triggering parent button's onClick
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        // Container
        <div className="p-9">
            <div>
                {/* Header */}
                <div className="flex justify-between items-center poppins">
                    <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">
                        {headerText}
                    </h1>
                    <IconX
                        className="w-[15px] h-[15px] cursor-pointer"
                        onClick={onClose}
                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Form */}
            <form className="space-y-4 mt-4">
                <>
                    {selectedStatus !== "Transferred" && (
                        <div>
                            <h3 className="font-medium text-[#6D6D6D] text-[15px] mb-[-10px] pb-3 poppins">
                                Status <span className="text-[#F14336] poppins">*</span>
                            </h3>

                            <div>
                                <Menu withinPortal={false}>
                                    <Menu.Target>
                                        <Button
                                            className="
                                        relative flex items-center w-[540px] h-[56px] px-4
                                        bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D]
                                        hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] poppins"
                                        >
                                            <span className="text-left font-medium text-[#6D6D6D99] ">{Status}</span>
                                            <IconCaretDownFilled size={16} className="absolute right-4" />
                                        </Button>
                                    </Menu.Target>

                                    {/* This are the choices the user will initially see upon clicking the Update Status Button inside the view applicants modal. */}
                                    <Menu.Dropdown className="border border-gray-300 rounded-[10px]" style={{ width: "540px", fontFamily: "poppins" }}>
                                        <Menu.Item onClick={() => setStatus("For Interview")}>For Interview</Menu.Item>
                                        <Menu.Item onClick={() => setStatus("Offered")}>Offered</Menu.Item>
                                        <Menu.Item onClick={() => setStatus("Archived")}>Archived</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </div>
                        </div>
                    )}
                </>

                {/* For Interview Status */}
                <>
                    {/* If the chosen status from Update Applicant Drop down is "For Interview" then show the below form fields */}
                    {selectedStatus === "For Interview" && (
                        <ForInterviewStatus />
                    )}
                </>

                {/* Offered Status */}
                <>
                    {selectedStatus === 'Offered' && (
                        <OfferedStatus />
                    )}
                </>
                {/* End of Offered Status */}

                {/* Archived Status */}
                {selectedStatus === "Archived" && (
                    <ArchivedStatus />
                )}

                {/* Hired Status */}
                <>
                    {selectedStatus === "Hired" && (
                        <HiredStatus />
                    )}
                </>
                {/* End of Hired Status */}

                {/* Transferred Status */}
                {/* If selectedStatus === "Transferred" AND isForTransfer is false, it renders TransferredStatus 
                This means that initially, before clicking "YES", the TransferredStatus modal is displayed. if isForTransfer is 
                true, it renders TransferApplicantLoader instead
                This happens after clicking "YES" in TransferredStatus
                */}
                <>
                    {selectedStatus === "Transferred" && !isForTransfer && (
                        <TransferredStatus onClose={onClose} />
                    )}

                    {isForTransfer && (
                        <TransferApplicantLoader onClose={onClose} />
                    )}
                </>
                {/* End of Transferred Status */}

                {/* Comment and suggestion text input */}
                {/* If the selected Status is "Hired" then do not show the comment and suggestion text input */}
                {(selectedStatus !== "Hired" && selectedStatus !== "Transferred") && (
                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">Comments</h3>
                        <Textarea
                            placeholder="Type here"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            autosize
                            minRows={4}
                            classNames={{
                                input: "poppins pt-2 w-[540px] h-[98px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                            }}
                        />
                    </div>

                )}

                {/* Submit Button should appear below comments */}
                {/* Buttons Section */}
                {(selectedStatus && selectedStatus !== "Transferred") && (
                    <div className="flex justify-between pt-4">
                        <Button onClick={onClose} className="bg-transparent text-[#559CDA] px-6 py-3 rounded-lg border-[#559CDA] font-medium text-[14px] poppins">
                            Cancel
                        </Button>

                        {/* Button with Dropdown Icon */}
                        <div className="relative">
                            <Button
                                onClick={handleClick} // Triggers modal (Schedule Interview)
                                // onClick={() => setIsApplicantNotReachable(true)}
                                className="custom-gradient text-white px-6 py-3 rounded-lg font-medium text-[14px] poppins"
                            >
                                {buttonText.toUpperCase()}
                                {selectedStatus === "For Interview" && (
                                    <span onClick={(e) => handleDropdownToggle(e)}>
                                        <IconCaretDownFilled size={20} className="ml-1 cursor-pointer hover:text-[#559CDA]" />
                                    </span>
                                )}
                            </Button>

                            {/* Dropdown Menu */}
                            {/* For dropdown menu of schedule interview */}
                            {isDropdownOpen && (
                                <div className=" w-full border-[#559CDA] pt-1 poppins">
                                    <Button
                                        className="poppins w-full px-4 bg-white border border-[#559CDA] text-[#559CDA] text-[14px] font-medium rounded-lg hover:bg-white hover:text-[#559CDA]"
                                        onClick={() => setIsContactApplicant(true)}
                                    >
                                        Add to Calendar
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </form>

            {/* Modals responsible for Alerts and child modal components */}
            <div>

                {/* Modal that will be called when selectedStatus === "Offered" */}
                <JobGeneratedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <JobGeneratedAlert
                        title={selectedStatus}
                        onClose={() => setIsModalOpen(false)} />
                </JobGeneratedModal>

                {/* Modal that will appear when the user selected archived status and clicked on the save feedback button */}
                <JobGeneratedModal isOpen={isFeedbackSent} onClose={() => setIsFeedbackSent(false)}>
                    <FeedbackSent
                        selectedStatus={selectedStatus}
                        onClose={() => setIsFeedbackSent(false)}
                    />
                </JobGeneratedModal>

                {/* Applicant Not Reachable */}
                {/* <ApplicantUnreachable isOpen={isScheduleInterview} onClose={() => setIsScheduleInterview(false)}>
                    <ScheduleInterview
                        onClose={() => setIsScheduleInterview(false)}
                    />
                </ApplicantUnreachable> */}
                <ApplicantUnreachable isOpen={isScheduleInterview} onClose={() => setIsApplicantNotReachable(false)}>
                    <ScheduleInterview
                        onClose={() => setIsScheduleInterview(false)}
                    />
                </ApplicantUnreachable>


                {/* This modal will be called when the selectedStatus === Transferred and the user agrees to transfer applicants to hrdotnet. */}
                <ApplicantUnreachable isOpen={isForTransfer} onClose={() => setisForTransfer(false)}>
                    <TransferApplicants
                        onClose={() => setisForTransfer(false)}
                    />
                </ApplicantUnreachable>

                {/* This modal will appear if the user clicks on the "Add to Calendar" 
                button under the Schedule interview of update applicant status modal*/}
                <ApplicantUnreachable isOpen={isContactApplicant} onClose={() => setIsContactApplicant(false)}>
                    <ScheduleInterviewAlert onClose={() => setIsContactApplicant(false)}
                    //  onCloseAllModal={onCloseAllModal} 
                    />
                </ApplicantUnreachable>
            </div>
        </div>
    )
}