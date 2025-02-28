import { Divider, Tabs } from "@mantine/core";
import { IconFileUpload, IconX } from "@tabler/icons-react";
import profileImage from '@src/assets/jane.png'
import PersonalDetails from "@src/modules/Applicants/components/documents/tabs/PersonalDetails";
import TransferDetails from "@modules/Applicants/components/documents/tabs/TransferDetails";
import ApplicationMovement from "@src/modules/Applicants/components/documents/tabs/ApplicationMovement";
import UpdateStatus from "@src/modules/Applicants/components/documents/buttons/UpdateStatus";
import UpdateStatusModal from "@modules/Applicants/components/modal/updateStatus";
import { useState } from "react";
import TransferPositionModal from "@src/modules/Applicants/components/modal/transferPositionModal";
import TransferPosition from "@src/modules/Applicants/components/documents/buttons/TransferPosition"
import { ViewApplicantsProps } from "@modules/Applicants/store"
import GenerateNewOffer from "@modules/Applicants/components/documents/buttons/GenerateNewOffer"
import ApplicantModal from "../../modal/dropdownOfferedModal";
import ViewPDF from "@modules/Offers/components/modal/pdfModal"
import MyDocument from "@modules/Offers/components/documents/PDF"
import { PDFViewer } from "@react-pdf/renderer";
export default function ViewApplicant({ Applicant_Name, Position, Status, Email, Phone, Skills, Remarks, onClose }: ViewApplicantsProps) {

    //For checking the status of selected employee to properly return the proper color
    const statusColors: Record<string, string> = {
        "Applied": "bg-[#559CDA]",
        "For Interview": "bg-[#ED8028] ",
        "Hired": "bg-[#5A9D27]",
        "Offered": "bg-[#FEC001]",
        "For Transfer": "bg-[#9B51E0]",
        "Archived": "bg-[#FF554A]",
        "Transferred": "bg-[#6D6D6D]"
    }

    const viewPDFStatuses = ['Offered', 'Hired', 'For Transfer', 'Transferred'];

    const [isModalOpen, setIsModalOpen] = useState(false); // Initial state: 

    const [isOffered, setIsOffered] = useState(false); // Set the Offered Modal to True upon triggering

    const [isViewPDF, setIsViewPDF] = useState(false); // Open the View PDF Modal

    const [isTransferPosition, setIsTransferPosition] = useState(false) // Set the Transferred Modal to True upon triggering

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
                <div className="w-1/3 p-2 sticky top-0 h-screen overflow-y-auto"> {/*Originally 2/6 */}

                    {/* Profile Image & Name (Left Aligned) */}
                    <div className="flex flex-col items-left mt-3">
                        <img src={profileImage} className="w-[100px] h-[100px] shadow-sm rounded-full" />
                        <p className="text-[#559CDA] text-[20px] font-bold mt-2">{Applicant_Name ?? "No Data"}</p>
                        <p className='text-[#6D6D6D] text-[12px] font-medium'>{Position ?? "No Data"}</p>
                    </div>

                    {/* Status Section */}
                    <div className="mt-8 text-[#6D6D6D] text-[12px]">

                        {/* Header */}
                        <h1 className="text-[#559CDA] pb-1">Current Status</h1>
                        <div className='space-y-2'>

                            {/* Changes background colors of the status based on the current status */}
                            <p className={`text-white rounded-[10px] bg-[#559CDA] text-[14px] w-[194px] h-[30px] flex items-center justify-center font-semibold
                                ${statusColors[Status] || "bg-[#559CDA]"}`}>
                                {Status}
                            </p>

                            {/* Hide the Update Status button if the current status is equivalent to either "Hired" or "Transferred" */}
                            {Status !== 'Hired' && Status !== 'Transferred' && (

                                // If the current Status is equals to "Archived" then use cursor-disabled.
                                <p className={`text-white rounded-[10px] bg-[#559CDA] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold 
                                    ${Status === 'Archived' ? 'cursor-not-allowed' : 'cursor-pointer'}`}

                                    // If the current Status is equals to "Archived" then disable the button and change its text to "Inactive"
                                    onClick={Status !== 'Archived' ? () => setIsModalOpen(true) : undefined}>
                                    {Status === 'Archived' ? "Inactive" : "Update Status"}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-8 text-[12px] text-[#6D6D6D] space-y-3">
                        <h1 className="text-[12px]">Location</h1>
                        <p className="font-bold text-[#6D6D6D] text-[14px]">United States</p>

                        <h2 className="text-[12px]">Email</h2>
                        <p className="font-bold text-[#6D6D6D] text-[14px]">{Email ?? "No Data"}</p>

                        <h3 className="text-[12px]">Phone</h3>
                        <p className="font-bold text-[#6D6D6D] text-[14px]">{Phone ?? "No Data"}</p>
                    </div>

                    {/* Skills Section */}
                    <div className="mt-8 text-[#6D6D6D] text-[12px]">
                        <h1>Skills</h1>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {Skills
                                ? Skills.split(", ").map((skill, index) => (
                                    <p key={index} className="flex rounded-[10px] text-[#6D6D6D] bg-[#D9D9D9] w-auto px-3 h-[21px] font-semibold text-[12px] items-center justify-center">
                                        {skill}
                                    </p>
                                ))
                                : <p className="text-gray-500">No Skills Listed</p>} {/* Display this text when there are no skills */}
                        </div>
                    </div>

                    {/* Transfer Position */}
                    <div className="mt-3 pb-6">

                        {/* IF status is equivalent to 'Archived' then no button should appear. */}
                        {Status !== 'Archived' && (
                            <p className="text-white rounded-[10px] bg-[#559CDA] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold cursor-pointer"

                                onClick={() => {
                                    if (viewPDFStatuses.includes(Status)) {
                                        setIsViewPDF(true);
                                    }
                                    else if (Status === 'For Interview' || Status === 'Final Interview' || Status === 'Initial Interview' || Status === 'Assessment') {
                                        setIsTransferPosition(true);
                                    }
                                    else {
                                        setIsModalOpen
                                    }
                                }}>

                                {/* If the Status of the applicant is equivalent to Hired then, the button will 
                                    display the generated PDF For the applicant per se. 
                                    Otherwise, Transfer position modal will appear. */}
                                {Status === 'Hired' || Status === 'Offered' || Status === 'For Transfer' || Status === 'Transferred' ? 'View PDF' : "Transfer Position"}
                            </p>
                        )}

                        {Status === 'Offered' && (
                            <p className="text-white rounded-[10px] bg-[#6D6D6D] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold cursor-pointer mt-2"
                                onClick={() => setIsOffered(true)}>
                                Generate new Offer
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-4/5 p-4 overflow-y-auto h-screen">
                    <Tabs defaultValue="personal">
                        <Tabs.List>
                            {[
                                { value: "personal", label: "Personal Details" },
                                { value: "application", label: "Application Movement" },

                                //Spread operator is use to conditionally add new tab. When Status is equivalent to Transferred. Otherwise the preceding two tabs will render.
                                ...(Status === 'Transferred') ? [{ value: "transfer_details", label: "Transfer Details" }] : []
                            ].map((tab) => (
                                <Tabs.Tab
                                    key={tab.value}
                                    value={tab.value}
                                    className="font-semibold text-[14px] transition-colors data-[active=true]:text-[#559CDA] data-[active=false]:text-[#6D6D6D]"
                                >
                                    {tab.label}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>

                        {/* Peronsal Details Tab */}
                        <Tabs.Panel value="personal">
                            <PersonalDetails
                                Position={Position}
                            />
                        </Tabs.Panel>

                        {/* Application movement Tab */}
                        <Tabs.Panel value="application">
                            <ApplicationMovement
                                Applicant_Name={Applicant_Name}
                                Status={Status}
                                Remarks={Remarks}
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
                <UpdateStatusModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <UpdateStatus onClose={() => setIsModalOpen(false)} />
                </UpdateStatusModal>

                <TransferPositionModal isOpen={isTransferPosition} onClose={() => setIsTransferPosition(false)}>
                    <TransferPosition onClose={onClose}
                        Applicant_Name={Applicant_Name} />
                </TransferPositionModal>

                <ApplicantModal isOpen={isOffered} onClose={() => setIsOffered(false)}>
                    <GenerateNewOffer
                        ApplicantName={Applicant_Name}
                        onClose={onClose} />
                </ApplicantModal>

            </div>

            {/* PDF */}
            <ViewPDF isOpen={isViewPDF} onClose={() => setIsViewPDF(false)}>
                <PDFViewer width="100%" height="600" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                    <MyDocument
                        Name={Applicant_Name}
                        Position={Position}
                        Department={null}
                        Remarks={Status}
                        Salary_Monthly={null}
                        Salary_Yearly={null}
                        Note_Salary={null}
                        Merit_Increase={null}
                        Description_VL={null}
                        Description_SL={null}
                        Description_BL={null}
                        Benefit_Paternity={null}
                        Benefit_Maternity={null}
                        Description_Transpo={null}
                        Acknowledgement={null}
                    />
                </PDFViewer>
            </ViewPDF>

        </div>
    )
}

// Applicant Profile Modal
// This modal will appear when you clicked a record in Applicants table.