import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import profileImage from '@src/assets/jane.png';
import { Divider, Tabs } from "@mantine/core";
import { IconFileUpload, IconX } from "@tabler/icons-react";
import ViewPDF from "@modules/Applicants/components/modal/pdfModal";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import { StatusBadge } from "@modules/Shared/utils/ApplicantModal/statusColors";
import { SkillChip } from "@src/modules/Shared/utils/ApplicantModal/skillChips";
import { getTabs } from "@modules/Shared/utils/ApplicantModal/tabConfiguration";
import { getDisplayStatus } from "@modules/Shared/utils/ApplicantModal/getStatus";
import { TextRenderer } from "@modules/Shared/utils/ApplicantModal/textRenderer";
import { useApplicantsById } from "@src/modules/Shared/hooks/useSharedApplicants";
import { ActionButton } from "@src/modules/Shared/utils/ApplicantModal/actionButton";
import PDFDocument from "@modules/Applicants/components/documents/pdf/ApplicantsPDF";
import UpdateStatus from "@src/modules/Applicants/components/documents/buttons/UpdateStatus";
import GenerateNewOffer from "@modules/Applicants/components/documents/buttons/GenerateNewOffer";
import { useApplicantIdStore, useCloseModal, ViewApplicantsProps } from "@modules/Applicants/store";
import TransferPosition from "@src/modules/Applicants/components/documents/buttons/TransferPosition";

export default function ViewApplicant({ applicantName, Position, Status, Email, Phone, Remarks, onClose, Application_Date, IsJobOffer, Acknowledgement, Department }: ViewApplicantsProps) {

    const applicantId = useApplicantIdStore((state) => state.id);
    const { data: applicantsById } = useApplicantsById(applicantId);

    const {
        isUpdateStatusButtonModalOpen, setIsUpdateStatusButtonModalOpen,
        isGenerateNewOffer, setIsGenerateNewOffer,
        setIsOffered, isTransferPosition,
        setIsTransferPosition
    } = useCloseModal();

    const [isViewPDF, setIsViewPDF] = useState(false);
    const forInterviewDisplayText = getDisplayStatus(Status);
    const changeTabs = getTabs({ applicantName, status: Status, remarks: Remarks });

    const onCloseAll = () => {
        setIsTransferPosition(false);
        setIsOffered(false);
        onClose();
    };

    return (
        <div className="h-screen w-full p-4">

            {/* Header & Divider (Full Width) */}
            <div className="w-full">
                <div className="flex justify-between items-center">
                    <TextRenderer as="p" className='text-[#559CDA] font-medium text-[22px] mb-1'>Applicant Profile</TextRenderer>
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
                        <TextRenderer as="p" className='text-[#559CDA] text-[20px] font-bold mt-2'>{applicantName ?? "No Data"}</TextRenderer>
                        <TextRenderer as="p" className='text-[#6D6D6D] text-[12px] font-medium'>{Position ?? "No Data"}</TextRenderer>
                    </div>

                    {/* Status Section */}
                    <div className="mt-8 text-[#6D6D6D] text-[12px]">

                        {/* Header */}
                        <TextRenderer as="h1" className='text-[#6D6D6D] pb-1'>Current Status</TextRenderer>
                        <div className='space-y-2'>

                            {/* Changes background colors of the status based on the current status while maintaining the For Interview status and its proper styling*/}
                            <StatusBadge Status={forInterviewDisplayText} />

                            {/* Hide the Update Status button if the current status is equivalent to either "Hired" or "Transferred" */}
                            {Status !== 'Hired' && Status !== 'Transferred' && (

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
                        <TextRenderer as="h1" className='text-[12px] poppins'>Location</TextRenderer>
                        <TextRenderer as="p" className='font-bold text-[#6D6D6D] text-[14px] poppins'>United States</TextRenderer>

                        <TextRenderer as="h2" className='text-[12px]'>Email</TextRenderer>
                        <TextRenderer as="p" className='font-bold text-[#6D6D6D] text-[14px] break-words poppins'>{Email ?? "No Data"}</TextRenderer>

                        <TextRenderer as="h3" className='text-[12px]'>Phone</TextRenderer>
                        <TextRenderer as="p" className='font-bold text-[#6D6D6D] text-[14px] poppins'>{Phone ?? "No Data"}</TextRenderer>
                    </div>

                    {/* Skills Section */}
                    <div className="mt-8 text-[#6D6D6D] text-[12px] poppins">
                        <TextRenderer as='h1'>Skills</TextRenderer>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {applicantsById?.generalInformation?.skills?.length ? (
                                applicantsById.generalInformation.skills.map((skill: string, index: number) => (
                                    <SkillChip key={index} skill={skill} />
                                ))
                            ) : (
                                <TextRenderer as="p" className='text-[#6D6D6D] poppins'>No Skills Listed</TextRenderer>
                            )}
                        </div>
                    </div>

                    {/* Conditional Start Date */}
                    {(Status === "For Transfer" || Status === "Transferred" || Status === "Hired") && (
                        <div className="mt-3 text-[#6D6D6D] text-[12px] poppins">
                            <TextRenderer as='h1'>Start Date</TextRenderer>
                            <div className="flex gap-2 mt-2 flex-wrap font-semibold">
                                {Application_Date}
                            </div>
                        </div>
                    )}

                    <>
                        {IsJobOffer === "Yes" && (
                            <div>
                                <TextRenderer as="h1" className='mt-8 text-[#6D6D6D] text-[12px] poppins'>Job Offer</TextRenderer>
                            </div>
                        )}
                    </>

                    {/* Transfer Position */}
                    <div className="mt-3 pb-6">
                        {/* If the Status of the applicant is equivalent to Hired then, the button will 
                            display the generated PDF For the applicant per se. 
                            Otherwise, Transfer position modal will appear. */}
                        {(IsJobOffer === 'Yes' || Status !== 'Archived') && (
                            <ActionButton
                                status={Status}
                                onPDFView={() => setIsViewPDF(true)}
                                onTransfer={() => setIsTransferPosition(true)}
                            />
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
                            {changeTabs.map((tab) => (
                                <Tabs.Tab
                                    key={tab.value}
                                    value={tab.value}
                                    className="poppins font-semibold text-[16px] transition-colors data-[active=true]:text-[#559CDA] data-[active=false]:text-[#6D6D6D] p-0 pb-2">
                                    {tab.label}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>

                        {changeTabs.map((tab) => (
                            <Tabs.Panel key={tab.value} value={tab.value}>
                                {tab.component}
                            </Tabs.Panel>
                        ))}
                    </Tabs>
                </div>
            </div>

            {/* These modals are independent of each other.
             <UpdateStatusModal> for updating the status of the applicant. 
            <TransferPositionModal> for updating the position of the applied job and so on. */}
            <div>
                <ModalWrapper
                    isOpen={isUpdateStatusButtonModalOpen}
                    overlayClassName="update-status-modal-overlay"
                    contentClassName="update-status-offered-modal-content"
                    onClose={() => { }}
                >
                    <UpdateStatus
                        Status={Status}
                        onClose={onCloseAll}
                        IsJobOffer={IsJobOffer}
                        Name={applicantName}
                    />
                </ModalWrapper>

                <ModalWrapper
                    isOpen={isTransferPosition}
                    overlayClassName="modal-overlay"
                    contentClassName="update-status-offered-modal-content"
                    onClose={onCloseAll}
                >
                    <TransferPosition
                        Applicant_Name={applicantName}
                        onClose={() => setIsTransferPosition(false)} />
                </ModalWrapper>

                <ModalWrapper
                    isOpen={isGenerateNewOffer}
                    overlayClassName="modal-overlay"
                    contentClassName="update-status-offered-modal-content"
                    onClose={() => { }}
                >
                    <GenerateNewOffer
                        ApplicantName={applicantName}
                        onClose={() => setIsGenerateNewOffer(false)} />
                </ModalWrapper>
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
        </div >
    )
}
// Applicant Profile Modal
// This modal will appear when you clicked a record in Applicants table.