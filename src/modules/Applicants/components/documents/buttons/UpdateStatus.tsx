{/*This is basically the component for Update Status Button inside the view applicant under the "current status" text*/ }
import { toast } from 'sonner';
import { useEffect, useState } from "react";
import { useHiredStartDate } from "@modules/Shared/store";
import { useStatusStore } from "@src/modules/Applicants/store";
import { Divider, Textarea, Menu, Button } from "@mantine/core";
import { useApplicantIdStore } from "@src/modules/Shared/store";
import { IconCaretDownFilled, IconX } from "@tabler/icons-react";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import FeedbackSent from "@src/modules/Applicants/components/alerts/FeedbackSent";
import HiredStatus from "@modules/Applicants/components/documents/movement/Status/Hired";
import StatusUpdatedAlert from "@src/modules/Applicants/components/alerts/StatusUpdated";
import JobGeneratedAlert from "@src/modules/Applicants/components/alerts/JobGeneratedAlert";
import ScheduleInterviewAlert from "@src/modules/Applicants/components/alerts/AddtoCalendar";
import OfferedStatus from "@modules/Applicants/components/documents/movement/Status/Offered";
import ArchivedStatus from "@modules/Applicants/components/documents/movement/Status/Archived";
import TransferredStatus from "@modules/Applicants/components/documents/movement/Status/Transferred";
import ForInterviewStatus from "@modules/Applicants/components/documents/movement/Status/ForInterview";
import ScheduleInterview from "@src/modules/Applicants/components/documents/movement/ScheduleInterview";
import TransferApplicantLoader from "@modules/Applicants/components/documents/movement/TransferApplicants";
import { useCreateHired, usePOSTArchive, usePOSTForInterview } from "@modules/Shared/hooks/useSharedApplicants";
import { useDropDownOfferedStore, useCloseModal, useFeedbacksStore, useFileUploadStore } from "@modules/Applicants/store";
import { HandleStatusClickTypes, StatusType, statusTransitions, ApplicantMovementStatus } from "@modules/Applicants/types";

interface UpdateStatusProps {
  Status: string;
  onClose: () => void;
  IsJobOffer: string;
  Name: string;
}

export default function UpdateStatus({ onClose, Status }: UpdateStatusProps) {
  const [, setIsOpen] = useState(false);

  useEffect(() => {
    if (Status === 'For Interview') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [Status]);

  const { mutateAsync: movementHired } = useCreateHired();
  const { mutateAsync: movementArchive } = usePOSTArchive();
  const { mutateAsync: movementScheduleInterview } = usePOSTForInterview();

  const { file } = useFileUploadStore();
  const { selectedDate } = useHiredStartDate();
  const { feedback, applicantFeedback } = useFeedbacksStore();
  const { selectedStatus, setSelectedStatus } = useStatusStore();

  const {
    interviewTime,
    comments, setComments,
    setAmount,
    interviewStages, interviewerId,
    interviewLocation, interviewDate,
    getInterviewer, interviewStagesId
  } = useDropDownOfferedStore();

  const {
    setIsViewApplicant,
    setIsAddtoCalendar,
    isScheduleInterview,
    setIsGenerateNewOffer,
    setIsScheduleInterview,
    isOffered, setIsOffered,
    isForTransfer, setIsModalOpen,
    setIsUpdateStatusButtonModalOpen,
    isFeedbackSent, setIsFeedbackSent,
    // isDropdownOpen,
    setIsDropdownOpen,
    isDefaultUpdated, setIsDefaultUpdated,
    setIsContactApplicant, isContactApplicant,
  } = useCloseModal();

  const applicantId = useApplicantIdStore((state) => state.id);
  const handleStatusClick = (status: HandleStatusClickTypes) => {
    setSelectedStatus(status.StatusClick);
    setIsModalOpen(true);
  };

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const resetAll = () => {
    setIsDropdownOpen(false);
    setIsViewApplicant(false);
    setIsModalOpen(false);
    setIsUpdateStatusButtonModalOpen(false);
    setIsGenerateNewOffer(false);
    setIsOffered(false);
    setSelectedStatus(null);
  };

  /* ------------------------------------------------------------------ */
  /* declaration‑driven config ---------------------------------------- */
  /* ------------------------------------------------------------------ */
  type StatusKey = "Archived" | "For Interview" | "Offered" | "Hired" | "Default";

  const statusMap: Record<StatusKey, { label: string; onClick: () => Promise<void> | void }> =
  {
    Archived: {
      label: "Save Feedback",
      onClick: async () => {
        try {
          await movementArchive({
            ApplicantId: applicantId,
            File: file,
            Feedback: feedback,
            ApplicantFeedback: applicantFeedback,
            Comment: comments,
          });
          toast.success("Feedback Saved!");
          setIsFeedbackSent(true);

          await delay(1000);
          setIsFeedbackSent(false);
          resetAll();
        } catch (e: any) {
          toast.error(
            e?.status === 500
              ? "Please fill all the required fields"
              : "Failed to Update Status"
          );
        }
      },
    },

    "For Interview": {
      label: "Add to Calendar",
      onClick: async () => {
        try {
          await movementScheduleInterview({
            ApplicantId: applicantId,
            Date: interviewDate,
            Time: interviewTime,
            Location: interviewLocation,
            Interviewer: { Id: interviewerId, Name: getInterviewer },
            InterviewStage: { Id: interviewStagesId, Name: interviewStages },
            Order: interviewStagesId,
            Comment: comments,
          });

          setIsContactApplicant(true);
          setIsDropdownOpen(false);

          await delay(1000);
          setIsContactApplicant(false);
          setIsUpdateStatusButtonModalOpen(false);
          setSelectedStatus(null);
        } catch (e) {
          toast.error("Please fill all the required fields");
        }
      },
    },

    Offered: {
      label: "Generate Offer",
      onClick: () => {
        setIsOffered(true);
      },
    },

    Hired: {
      label: "Upload",
      onClick: async () => {
        try {
          await movementHired({
            ApplicantId: applicantId,
            FileAttachment: file ?? null,
            Order: interviewStagesId,
            DateStart: selectedDate,
          });
          toast.success("Applicant is now Hired!");
          setIsFeedbackSent(true);
          setIsDropdownOpen(false);

          await delay(1000);
          setIsFeedbackSent(false);
          resetAll();
          onClose();
        }
        catch (error: any) {
          toast.error("Error updating status.");
        }
      },
    },

    Default: {
      label: "Update",
      onClick: () => {
        setIsDefaultUpdated(true);
        delay(1000).then(() => {
          setIsDefaultUpdated(false);
          setSelectedStatus(null);
        });
      },
    },
  };

  /* ------------------------------------------------------------------ */
  /* derive current handler + label ----------------------------------- */
  /* ------------------------------------------------------------------ */
  const effectiveStatus = selectedStatus ?? Status;
  const key = (effectiveStatus in statusMap
    ? (effectiveStatus as StatusKey)
    : "Default") as StatusKey;

  const { label: buttonText, onClick: handleClick } = statusMap[key];
  // const { label: buttonText, onClick: handleClick } = statusMap[key];


  // This is the array of possible drop down options for update status button depending on the user's selected status.
  let availableStatuses = (
    Object.keys(statusTransitions).includes(Status)
      ? (statusTransitions[Status as ApplicantMovementStatus] as StatusType[])
      : []
  );

  return (
    // Container
    <div className="w-full h-full p-6 rounded-lg shadow-md">

      {/* Header */}
      <div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-[22px] font-semibold text-[#559CDA]">
              {/* Update Applicant Status */}
              {selectedStatus === "Transferred" ? "Transfer Applicant" : "Update Applicant Status"}
            </h2>
            <IconX
              onClick={() => {
                setIsUpdateStatusButtonModalOpen(false);
                setSelectedStatus(null);
                setIsModalOpen(false);
              }}
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
                <Menu.Dropdown className="border-1 border-[#6D6D6D] rounded-[10px]" style={{ width: "559px" }}>
                  {availableStatuses.length > 0 ? (
                    availableStatuses.map((status) => (
                      <Menu.Item key={status}
                        onClick={() => handleStatusClick({ StatusClick: status })}
                      >
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
            {/* {selectedStatus === "For Interview" && (
              <ForInterviewStatus />
            )} */}
            {effectiveStatus === 'For Interview' && (
              <>
                <ForInterviewStatus />

                {/* Comments box only while the user hasn’t chosen an alternative status */}
                {!selectedStatus && (
                  <div className="pt-4">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                      Comments
                    </h3>
                    <Textarea
                      placeholder="Type here"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      autosize
                      minRows={4}
                      classNames={{
                        input:
                          "poppins pt-2 w-[560px] h-[98px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                      }}
                    />
                  </div>
                )}
              </>
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
            {selectedStatus === "Transferred" && !isForTransfer && (
              <TransferredStatus />
            )}

            {isForTransfer && (
              <TransferApplicantLoader
              //  onClose={onClose} 
              />
            )}

            {/* {(Status === 'For Interview' && !selectedStatus) && (
              <ForInterviewStatus />
            )} */}

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
                  input: "poppins pt-2 w-[560px] h-[98px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
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
                setSelectedStatus(null);
                setIsModalOpen(false);
                setComments("");
                setAmount(0);
              }}
                className="bg-transparent text-[#559CDA] px-6 py-1 rounded-lg border-[#559CDA] font-medium text-[14px] poppins">
                Cancel
              </Button>

              {/* Button with Dropdown Icon */}
              <div className="relative">
                <Button
                  onClick={handleClick}
                  className="custom-gradient text-white px-6 py-1 rounded-lg font-medium text-[14px] poppins"
                >
                  {buttonText.toUpperCase()}
                  {/* {selectedStatus === "For Interview" && (
                    <span onClick={(e) => handleDropdownToggle(e)}>
                      <IconCaretDownFilled size={20} className="ml-1 cursor-pointer hover:text-[#559CDA]" />
                    </span>
                  )} */}
                </Button>

                {/* Dropdown Menu */}
                {/* For dropdown menu of schedule interview */}
                {/* This dropdown button is only visible when the selected status is "For Interview" under the "Schedule Interview" button */}
                {/* {isDropdownOpen && (
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
                )} */}
              </div>
            </div>
          )}
        </form>
      </div>

      {/* This is the update successful modal. This modal is the default modal. */}
      <ModalWrapper
        isOpen={isDefaultUpdated}
        overlayClassName="job-offer-modal-overlay"
        contentClassName="job-generated"
        onClose={() => { }}
      >
        <StatusUpdatedAlert
          onClose={() => {
            setIsUpdateStatusButtonModalOpen(false);
            setIsDefaultUpdated(false);
            onClose();
          }} />
      </ModalWrapper>

      {/* This modal will be activated when the  the user clicked the button "Generate Offer" from update status form 
       and is reponsible for generating a PDF of the offer letter. */}
      <ModalWrapper
        isOpen={isOffered}
        overlayClassName="job-offer-modal-overlay"
        contentClassName="job-generated"
        onClose={() => { }}
      >
        <JobGeneratedAlert
          title={selectedStatus}
          onClose={() => setIsOffered(false)} />
      </ModalWrapper>

      {/* Modal that will appear when the user selected archived status and clicked on the save feedback button. */}
      <ModalWrapper
        isOpen={isFeedbackSent}
        overlayClassName="job-offer-modal-overlay"
        contentClassName="job-generated"
        onClose={() => { }}
      >
        <FeedbackSent
          selectedStatus={selectedStatus}
          onClose={() => {
            setIsFeedbackSent(false);
            setIsViewApplicant(false);
          }}
        />
      </ModalWrapper>

      {/* This modal will be called when the selected status is equivalent to "For Interview" and the "Schedule Interview button has been clicked." */}
      <ModalWrapper
        isOpen={isScheduleInterview}
        overlayClassName="applicant-unreachable-modal-overlay"
        contentClassName="applicant-unreachable"
        onClose={() => { }}
      >
        <ScheduleInterview onClose={() => {

          // If the user clicked the "Schedule Interview button and then proceeded to click "No", 
          // Set the selected status into "Archive" to re-render the update status form with the archived status.
          // setIsUpdateStatusButtonModalOpen(false);
          setSelectedStatus("Archived")
          setIsScheduleInterview(false);
          setIsAddtoCalendar(false)
        }} />
      </ModalWrapper>


      {/* This modal will appear if the user clicks on the "Add to Calendar" 
          button under the Schedule interview of update applicant status modal. */}
      <ModalWrapper
        isOpen={isContactApplicant}
        overlayClassName="applicant-unreachable-modal-overlay"
        contentClassName="applicant-unreachable"
        onClose={() => { }}
      >
        <ScheduleInterviewAlert onClose={() => setIsContactApplicant(false)} />
      </ModalWrapper>
    </div >
  );
}

// This modal will appear when you clicked the Update Status button under the status section of applicant profile