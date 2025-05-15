import { Button, Divider, Tabs } from "@mantine/core";
import { IconFileUpload, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useApplicantIdStore, useCloseModal, ViewApplicantsProps } from "@modules/Applicants/store"
import { PDFViewer } from "@react-pdf/renderer";
import profileImage from '@src/assets/jane.png';
import PersonalDetails from "@src/modules/Applicants/components/documents/tabs/PersonalDetails";
import TransferDetails from "@modules/Applicants/components/documents/tabs/TransferDetails";
import ApplicationMovement from "@src/modules/Applicants/components/documents/tabs/ApplicationMovement";
import UpdateStatus from "@src/modules/Applicants/components/documents/buttons/UpdateStatus";
import UpdateStatusModal from "@modules/Applicants/components/modal/updateStatus";
import TransferPositionModal from "@src/modules/Applicants/components/modal/transferPositionModal";
import TransferPosition from "@src/modules/Applicants/components/documents/buttons/TransferPosition";
import GenerateNewOffer from "@modules/Applicants/components/documents/buttons/GenerateNewOffer";
import ApplicantModal from "@modules/Applicants/components/modal/dropdownOfferedModal"
import ViewPDF from "@modules/Applicants/components/modal/pdfModal";
import PDFDocument from "@modules/Applicants/components/documents/pdf/ApplicantsPDF";
// import { useApplicantsById } from "@src/modules/Applicants/hooks/useApplicant";
import { useApplicantsById } from "@src/modules/Shared/hooks/useSharedApplicants";

export default function ViewApplicant({ applicantName, Position, Status, Email, Phone, Remarks, onClose, Application_Date, IsJobOffer, Acknowledgement, Department }: ViewApplicantsProps) {

    //For checking the status of selected employee to properly return the proper color
    const statusColors: Record<string, string> = {
        "Applied": "bg-[#559CDA]",
        "For Interview": "bg-[#ED8028] ",
        "Hired": "bg-[#5A9D27]",
        "Offered": "bg-[#FEC001]",
        "For Transfer": "bg-[#9B51E0]",
        "Archived": "bg-[#FF554A]",
        "Transferred": "bg-[#6D6D6D]",
        "Assessment": "bg-[#ED8028]",
        "Final Interview": "bg-[#FEC001]",
        "Initial Interview": "bg-[#559CDA]",
        // 'Ready for Transfer': 'bg-[#6D6D6D]',
    }

    const applicantId = useApplicantIdStore((state) => state.id);
    const { data: applicantsById } = useApplicantsById(applicantId)

    const viewPDFStatuses = ['Offered', 'Hired', 'For Transfer', 'Transferred'];
    const { isUpdateStatusButtonModalOpen, setIsUpdateStatusButtonModalOpen, isGenerateNewOffer, setIsGenerateNewOffer, setIsOffered, isTransferPosition, setIsTransferPosition } = useCloseModal();
    const [isViewPDF, setIsViewPDF] = useState(false); // Open the View PDF Modal
    // const [isTransferPosition, setIsTransferPosition] = useState(false) // Set the Transferred Modal to True upon triggering

    // Excluding these three status types to the current status field.
    const forInterviewStatus = ["Assessment", "Final Interview", "Initial Interview"].includes(Status)
    const bgColorForInterview = forInterviewStatus ? "bg-[#ED8028]" : statusColors[Status] || "bg-[#559CDA]";
    // const forInterviewDisplayText = forInterviewStatus ? "For Interview" : Status;
    const getDisplayStatus = () => {
        if (forInterviewStatus) return "For Interview";
        // if (Status === "Ready for Transfer") return "Transferred";
        return Status;
    };

    const forInterviewDisplayText = getDisplayStatus();

    const onCloseAll = () => {
        setIsTransferPosition(false);
        setIsOffered(false);
        onClose(); // This closes ViewApplicant.tsx completely
    };

    return (
        <div className="h-screen w-full p-4">

            {/* Header & Divider (Full Width) */}
            <div className="w-full">
                <div className="flex justify-between items-center">
                    <p className='text-[#559CDA] font-medium text-[22px] mb-1'>Applicant Profile</p>
                    <div className="flex items-center space-x-2">
                        <IconFileUpload stroke={1} className="w-[20px] h-[25px]" />
                        <IconX stroke={1} onClick={onClose}
                            className="cursor-pointer w-[20px] h-[25px]"
                        />
                    </div>
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Two Column Layout */}
            <div className="flex h-full">

                {/* Left Section */}
                <div className="w-1/4 p-2 sticky top-0 h-screen overflow-y-auto"> {/*Originally 2/6 */}

                    {/* Profile Image & Name (Left Aligned) */}
                    <div className="flex flex-col items-left mt-3">
                        <img src={profileImage} className="w-[100px] h-[100px] shadow-sm rounded-full" />
                        <p className="text-[#559CDA] text-[20px] font-bold mt-2">{applicantName ?? "No Data"}</p>
                        <p className='text-[#6D6D6D] text-[12px] font-medium'>{Position ?? "No Data"}</p>
                    </div>

                    {/* Status Section */}
                    <div className="mt-8 text-[#6D6D6D] text-[12px]">

                        {/* Header */}
                        <h1 className="text-[#6D6D6D] pb-1">Current Status</h1>
                        <div className='space-y-2'>

                            {/* Changes background colors of the status based on the current status while maintaining the For Interview status and its proper styling*/}
                            <p className={`text-white rounded-[10px] text-[14px] w-[194px] h-[30px] flex items-center justify-center font-semibold ${bgColorForInterview}`}>
                                {forInterviewDisplayText}
                                {/* {getDisplayStatus} */}
                            </p>

                            {/* Hide the Update Status button if the current status is equivalent to either "Hired" or "Transferred" */}
                            {Status !== 'Hired' && Status !== 'Ready for Transfer' && (

                                // If the current Status is equals to "Archived" then use cursor-disabled.
                                <p className={`text-white rounded-[10px] bg-[#559CDA] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold 
                                    ${Status === 'Archived' ? 'cursor-not-allowed' : 'cursor-pointer'}`}

                                    // If the current Status is equals to "Archived" then disable the button and change its text to "Inactive"
                                    // onClick={Status !== 'Archived' ? () => setIsModalOpen(true) : undefined}>
                                    onClick={Status !== 'Archived' ? () => setIsUpdateStatusButtonModalOpen(true) : undefined}>
                                    {Status === 'Archived' ? "Inactive" : "Update Status"}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-8 text-[12px] text-[#6D6D6D] space-y-3 poppins">
                        <h1 className="text-[12px] poppins">Location</h1>
                        <p className="font-bold text-[#6D6D6D] text-[14px] poppins">United States</p>

                        <h2 className="text-[12px]">Email</h2>
                        <p className="font-bold text-[#6D6D6D] text-[14px] break-words poppins">{Email ?? "No Data"}</p>

                        <h3 className="text-[12px]">Phone</h3>
                        <p className="font-bold text-[#6D6D6D] text-[14px] poppins">{Phone ?? "No Data"}</p>
                    </div>

                    {/* Skills Section */}
                    <div className="mt-8 text-[#6D6D6D] text-[12px] poppins">
                        <h1>Skills</h1>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {applicantsById?.generalInformation.skills?.length ? (
                                applicantsById.generalInformation.skills.map((skill: string, index: number) => (
                                    <p
                                        key={index}
                                        className="flex rounded-[10px] text-[#6D6D6D] bg-[#D9D9D9] w-auto px-3 h-[21px] font-semibold text-[12px] items-center justify-center"
                                    >
                                        {skill}
                                    </p>
                                ))
                            ) : (
                                <p className="text-[#6D6D6D] poppins">No Skills Listed</p>
                            )}
                        </div>
                    </div>

                    {/* Conditional Start Date */}
                    {(Status === "For Transfer" || Status === "Transferred" || Status === "Hired") && (
                        <div className="mt-3 text-[#6D6D6D] text-[12px] poppins">
                            <h1>Start Date</h1>
                            <div className="flex gap-2 mt-2 flex-wrap font-semibold">
                                {Application_Date}
                            </div>

                            {/* <h1>Job Offer</h1>
                            <div className="flex gap-2 mt-2 flex-wrap font-semibold">
                                {IsJobOffer}
                            </div> */}
                        </div>
                    )}

                    <>
                        {IsJobOffer === "Yes" && (
                            <div>
                                <h1 className="mt-8 text-[#6D6D6D] text-[12px] poppins">Job Offer</h1>
                            </div>
                        )}
                    </>

                    {/* Transfer Position */}
                    <div className="mt-3 pb-6">

                        {/* IF status is equivalent to 'Archived' then no button should appear. */}
                        {/* {Status !== 'Archived' && ( */}
                        {(IsJobOffer === 'Yes' || Status !== 'Archived') && (
                            <Button className="text-white rounded-[10px] poppins bg-[#559CDA] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold cursor-pointer"

                                onClick={() => {
                                    if (viewPDFStatuses.includes(Status)) {
                                        setIsViewPDF(true);
                                    }
                                    else if (Status === 'For Interview' || Status === 'Final Interview' || Status === 'Initial Interview' || Status === 'Assessment' || Status === 'Applied') {
                                        setIsTransferPosition(true);
                                    }
                                    else {
                                        // setIsModalOpen(true);
                                        setIsUpdateStatusButtonModalOpen(false);
                                    }
                                }}>

                                {/* If the Status of the applicant is equivalent to Hired then, the button will 
                                    display the generated PDF For the applicant per se. 
                                    Otherwise, Transfer position modal will appear. */}
                                {Status === 'Hired' || Status === 'Offered' || Status === 'For Transfer' || Status === 'Transferred' ? 'View PDF' : "Transfer Position"}
                            </Button>
                        )}

                        {Status === 'Offered' && (
                            <p className="text-white rounded-[10px] bg-[#6D6D6D] poppins text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold cursor-pointer mt-2"
                                onClick={() => setIsGenerateNewOffer(true)}>
                                Generate new Offer
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-4/5 p-4 overflow-y-auto h-screen">
                    <Tabs defaultValue="personal">
                        <Tabs.List className="text-[#6D6D6D] space-x-6 pb-2 poppins">
                            {[
                                { value: "personal", label: "Personal Details" },
                                { value: "application", label: "Application Movement" },

                                //Spread operator is use to conditionally add new tab. When Status is equivalent to Transferred. Otherwise the preceding two tabs will render.
                                // ...(Status === 'Transferred') ? [{ value: "transfer_details", label: "Transfer Details" }] : []
                            ].map((tab) => (
                                <Tabs.Tab
                                    key={tab.value}
                                    value={tab.value}
                                    className="poppins font-semibold text-[16px] transition-colors data-[active=true]:text-[#559CDA] data-[active=false]:text-[#6D6D6D] p-0 pb-2"
                                >
                                    {tab.label}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>

                        {/* Peronsal Details Tab */}
                        <Tabs.Panel value="personal">
                            <PersonalDetails />
                        </Tabs.Panel>

                        {/* Application movement Tab */}
                        <Tabs.Panel value="application">
                            <ApplicationMovement
                                applicantName={applicantName}
                                status={Status}
                                remarks={Remarks}
                            />
                        </Tabs.Panel>

                        {Status === 'Transferred' && (
                            <Tabs.Panel value="transfer_details">
                                <TransferDetails />
                            </Tabs.Panel>
                        )}

                    </Tabs>
                </div>
            </div>

            {/* These modals are independent of each other.
             <UpdateStatusModal> for updating the status of the applicant. 
            <TransferPositionModal> for updating the position of the applied job and so on. */}
            <div>
                {/* <UpdateStatusModal isOpen={isModalOpen} onClose={onCloseAll}> */}
                <UpdateStatusModal isOpen={isUpdateStatusButtonModalOpen} >
                    <UpdateStatus
                        Status={Status}
                        onClose={onCloseAll}
                        IsJobOffer={IsJobOffer}
                        Name={applicantName}
                    />
                </UpdateStatusModal>

                <TransferPositionModal isOpen={isTransferPosition} onClose={onCloseAll}>
                    <TransferPosition
                        Applicant_Name={applicantName}
                        onClose={() => setIsTransferPosition(false)} />
                </TransferPositionModal>

                <ApplicantModal isOpen={isGenerateNewOffer}>
                    <GenerateNewOffer
                        ApplicantName={applicantName}
                        onClose={() => setIsGenerateNewOffer(false)} />
                </ApplicantModal>
            </div>

            {/* PDF */}
            <ViewPDF isOpen={isViewPDF} onClose={() => setIsViewPDF(false)}>
                <PDFViewer width="100%" height="891" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                    <PDFDocument
                        applicantName={applicantName}
                        Position={Position}
                        Remarks={Remarks}
                        Acknowledgement={Acknowledgement}
                        Department={Department}

                    />
                </PDFViewer>
            </ViewPDF>
        </div>
    )
}
// Applicant Profile Modal
// This modal will appear when you clicked a record in Applicants table.