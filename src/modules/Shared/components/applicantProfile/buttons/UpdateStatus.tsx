{/*This is basically the component for Update Status Button inside the view applicant under the "current status" text*/ }
import { Divider, Modal, Textarea } from "@mantine/core";
import { Menu, Button } from "@mantine/core";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";

import { useDropDownOfferedStore } from "@modules/Shared/components/applicantProfile/store"
import { useStatusStore } from "@modules/Shared/components/applicantProfile/store";
import { useCloseModal } from "@modules/Shared/components/applicantProfile/store";

import ScheduleInterviewAlert from "@modules/Shared/components/applicantProfile/alerts/AddtoCalendar";
import JobGeneratedAlert from "@modules/Shared/components/applicantProfile/alerts/JobGeneratedAlert";
import FeedbackSent from "@modules/Shared/components/applicantProfile/alerts/FeedbackSent";
import StatusUpdatedAlert from "@modules/Shared/components/applicantProfile/alerts/StatusUpdated";

import ArchivedStatus from "@modules/Shared/components/applicantProfile/movement/Status/Archived";
import OfferedStatus from "@modules/Shared/components/applicantProfile/movement/Status/Offered";
import HiredStatus from "@modules/Shared/components/applicantProfile/movement/Status/Hired";
import TransferredStatus from "@modules/Shared/components/applicantProfile/movement/Status/Transferred";
import ForInterviewStatus from "@modules/Shared/components/applicantProfile/movement/Status/ForInterview";

import ScheduleInterview from "@modules/Shared/components/applicantProfile/movement/ScheduleInterview";
import { useEffect } from "react";

interface UpdateStatusProps {
  Status: string;
  onClose: () => void;
}

export default function UpdateStatus({ onClose, Status }: UpdateStatusProps) {

  const { selectedStatus, setSelectedStatus } = useStatusStore();
  const {
    comments, setComments
  } = useDropDownOfferedStore();

  const {
    isDefaultUpdated, setIsDefaultUpdated,
    isOffered, setIsOffered,
    setIsModalOpen,
    setIsUpdateStatusButtonModalOpen,
    isFeedbackSent, setIsFeedbackSent,
    isScheduleInterview,
    setIsScheduleInterview,
    isDropdownOpen, setIsDropdownOpen,
    setIsContactApplicant, isContactApplicant,
    setIsViewApplicant,
    setIsAddtoCalendar
  } = useCloseModal();

  const handleStatusClick = (status: "Offered" | "Archived" | "Hired" | "For Interview") => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };


  // For Interview 
  const handleDropdownToggle = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents triggering parent button's onClick`
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  let handleClick = () => { }; // Default empty function
  let buttonText = "Update" // Default button text

  if (selectedStatus === "Archived") {
    buttonText = "Save Feedback";
    handleClick = () => {
      setIsDropdownOpen(false);  //  Close dropdown when clicking "Save Feedback"
      setIsFeedbackSent(true); // Set to true to show the feedback sent alert

      // This might confuse other developers why some buttons have delays like this.
      // I put a delay here because the modal dependencies of the corresponding buttons for this is not deeply nested and only rely on single modal.
      // However, some of the buttons calls for 2 or 3 child modals therefore, I cannot locally define a delay for them unlike this one.
      // The whole function runs when the component (selected status) has been set to "Archived". Then the button text will be changed to "Save feedback".
      // Upon completion of the runtime, the relevant modals will eventually closed after a second.
      setTimeout(() => {
        setIsFeedbackSent(false);
        setIsUpdateStatusButtonModalOpen(false);
        setIsViewApplicant(false);
        setSelectedStatus(null)
      }, 1000);
    };
  }
  else if (selectedStatus === "For Interview") {
    buttonText = "Schedule Interview"
    handleClick = () => {
      setIsScheduleInterview(true);
      setIsDropdownOpen(false);  //  Close dropdown when clicking "Schedule Interview"
    };
  } else if (selectedStatus === "Offered") {
    buttonText = "Generate Offer"
    handleClick = () => setIsOffered(true);
  }
  else if (selectedStatus === "Hired") {
    buttonText = "Upload";
    handleClick = () => {
      setIsFeedbackSent(true);

      setIsDropdownOpen(false);  //  Close dropdown when clicking "Save Feedback"
      setTimeout(() => {
        setIsFeedbackSent(false);
        setIsViewApplicant(false);
        setIsUpdateStatusButtonModalOpen(false);
        setSelectedStatus(null)
        onClose();  // Close DropDown.tsx
      }, 1000);
    };
  }
  else {
    buttonText = "Update"
    handleClick = () => {
      setIsDefaultUpdated(true);
    }
  }

  // This is the array of possible drop down options for update status button depending on the user's selected status.
  const statusOptions = {
    Applied: ["For Interview", "Offered", "Archived"],
    "Final Interview": ["Offered", "Archived"],
    "Initial Interview": ["Offered", "Archived"],
    "Assessment": ["Offered", "Archived"],
    "For Interview": ["Offered", "Archived"],
    Offered: ["Hired", "Archived"],
    Hired: [],
    "For Transfer": ["Transferred", "Archived"],
    Transferred: [],
    Archived: [],
  } as const;

  type ApplicantStatus = keyof typeof statusOptions;

  // Ensure Status is a valid key
  let availableStatuses: readonly string[] =
    Object.keys(statusOptions).includes(Status)
      ? statusOptions[Status as ApplicantStatus]
      : [];

  return (
    // Container
    <div className="w-full h-full p-6 rounded-lg ">

      {/* Header */}
      <div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-[22px] font-semibold text-[#559CDA]">
              Update Applicant Status
            </h2>
            <IconX
              onClick={() => setIsUpdateStatusButtonModalOpen(false)}
              className="w-[15px] h-[15px] cursor-pointer" />
          </div>

          {/* Divider */}
          <Divider size={2} color="#A8A8A899" className="w-full mt-2" />
        </div>

        {selectedStatus !== "Transferred" && (
          <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4">
            Status
            <span className="text-[#F14336]">
              *
            </span>
          </h3>
        )}
      </div>

      <div className="">

        <div>
          <>
            {/* Setting this will hide the "Update Status" button when the user is transferred*/}
            {selectedStatus !== "Transferred" && (
              <Menu withinPortal={false}>
                <Menu.Target>
                  <Button className="relative flex items-center w-full h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D]">
                    <span className="text-left text-[#6D6D6D99] font-medium text-[16px]">
                      {selectedStatus ?? Status}
                    </span>
                    <IconCaretDownFilled size={16} className="absolute right-4" />
                  </Button>

                </Menu.Target>

                <div>
                  {/* For Dynamically rendering the dropdown options based on the application movement. */}
                  <Menu.Dropdown className="border-1 border-[#6D6D6D] rounded-[10px]" style={{ width: "522px" }}>
                    {availableStatuses.length > 0 ? (
                      availableStatuses.map((status) => (
                        <Menu.Item key={status} onClick={() => handleStatusClick(status as "For Interview" | "Offered" | "Archived" | "Hired")}>
                          {status}
                        </Menu.Item>
                      ))
                    ) : (
                      <Menu.Item disabled>No status options available</Menu.Item>
                    )}
                  </Menu.Dropdown>
                </div>
              </Menu>
            )}
          </>

          {/* dito */}

          {/* If the modal is trigger and set to true, open the drop down menu. This is the composition of dynamically rendered dropdown choices. */}
          <form>

            {/* Initial Form */}
            <>
              {selectedStatus && (
                <></>
              )}
            </>

            {/* These Components are conditionally called depending on the selected status of the user. */}
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
              <ArchivedStatus
                Status={Status}
              />
            )}

            {/* Hired Status */}
            <>
              {selectedStatus === "Hired" && (
                <HiredStatus />
              )}
            </>
            {/* End of Hired Status */}

            {/* Transferred Status */}
            <>
              {selectedStatus === "Transferred" && (
                <TransferredStatus />
              )}
            </>
            {/* End of Transferred Status */}

            {/* Comment and suggestion text input */}
            {/* If the selected Status is "Hired" then do not show the comment and suggestion text input */}
            {(selectedStatus !== "Hired" && selectedStatus !== "Transferred" && selectedStatus && Status !== "Offered") && (
              <div className="pt-4">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">Comments</h3>
                <Textarea
                  placeholder="Type here"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  autosize
                  minRows={4}
                  classNames={{
                    input: "poppins pt-2 w-full h-[98px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                  }}
                />
              </div>

            )}

            {/* Submit Button should appear below comments */}
            {/* Buttons Section */}
            {(selectedStatus !== "Transferred") && (
              <div className="flex justify-between pt-6">
                <Button onClick={() => {
                  setIsUpdateStatusButtonModalOpen(false);
                  // onClose()
                }}
                  className="bg-transparent text-[#559CDA] px-6 py-1 rounded-lg border-[#559CDA] font-medium text-[14px] poppins">
                  Cancel
                </Button>

                {/* Button with Dropdown Icon */}
                <div className="relative">
                  <Button
                    onClick={handleClick} // Triggers modal (Schedule Interview)
                    className="custom-gradient text-white px-6 py-1 rounded-lg font-medium text-[14px] poppins"
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
                  {/* This dropdown button is only visible when the selected status is "For Interview" under the "Schedule Interview" button */}
                  {isDropdownOpen && (
                    <div className=" w-full border-[#559CDA] pt-1 poppins">
                      <Button
                        className="poppins w-full px-4 bg-white border border-[#559CDA] text-[#559CDA] text-[14px] font-medium rounded-lg hover:bg-white hover:text-[#559CDA]"
                        onClick={() => {
                          setIsContactApplicant(true)
                        }}

                      >
                        Add to Calendar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* This is the update successful modal. This modal is the default modal. */}
        <Modal withCloseButton={false} centered opened={isDefaultUpdated} onClose={() => setIsDefaultUpdated(false)} >
          <StatusUpdatedAlert
            onClose={() => {
              setIsUpdateStatusButtonModalOpen(false);
              setIsDefaultUpdated(false);
              onClose();
            }} />
        </Modal>

        {/* This modal will be activated when the  the user clicked the button "Generate Offer" from update status form 
       and is reponsible for generating a PDF of the offer letter. */}
        <Modal withCloseButton={false}  centered opened={isOffered} onClose={() => setIsOffered(false)}>
          <JobGeneratedAlert
            title={selectedStatus}
            onClose={() => setIsOffered(false)} />
        </Modal>

        {/* Modal that will appear when the user selected archived status and clicked on the save feedback button. */}
        <Modal withCloseButton={false}  centered opened={isFeedbackSent} onClose={() => setIsFeedbackSent(false)}>
          <FeedbackSent
            selectedStatus={selectedStatus}
            onClose={() => {
              setIsFeedbackSent(false);
              setIsViewApplicant(false);
            }}
          />
        </Modal>

        {/* This modal will be called when the selected status is equivalent to "For Interview" and the "Schedule Interview button has been clicked." */}
        <Modal withCloseButton={false}  centered opened={isScheduleInterview} onClose={() => setIsScheduleInterview(false)}>
          <ScheduleInterview onClose={() => {
            // If the user clicked the "Schedule Interview button and then proceeded to click "No", 
            // Set the selected status into "Archive" to re-render the update status form with the archived status.
            setSelectedStatus("Archived")
            setIsScheduleInterview(false);
            setIsAddtoCalendar(false)
          }} />
        </Modal>

        {/* This modal will appear if the user clicks on the "Add to Calendar" 
          button under the Schedule interview of update applicant status modal. */}
        <Modal withCloseButton={false}  centered opened={isContactApplicant} onClose={() => setIsContactApplicant(false)}>
          <ScheduleInterviewAlert onClose={() => setIsContactApplicant(false)}/>
        </Modal>

      </div>
    </div >
  );
}

// This modal will appear when you clicked the Update Status button under the status section of applicant profile