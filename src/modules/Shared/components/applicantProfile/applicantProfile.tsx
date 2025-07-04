// import { useState } from "react";
// import { useCloseModal } from "@modules/Shared/components/applicantProfile/store"
// import { Divider, Modal, Tabs } from "@mantine/core";
// import { IconFileUpload, IconX } from "@tabler/icons-react";
// import profileImage from '@src/assets/jane.png'
// import PersonalDetails from "@src/modules/Shared/components/applicantProfile/documents/tabs/PersonalDetails";
// import TransferDetails from "@modules/Shared/components/applicantProfile/documents/tabs/TransferDetails";
// import ApplicationMovement from "@src/modules/Shared/components/applicantProfile/documents/tabs/ApplicationMovement";
// import UpdateStatus from "@src/modules/Shared/components/applicantProfile/buttons/UpdateStatus";
// import TransferPosition from "@src/modules/Shared/components/applicantProfile/buttons/TransferPosition"
// import GenerateNewOffer from "@modules/Shared/components/applicantProfile/buttons/GenerateNewOffer"
// import MyDocument from "@modules/Offers/components/documents/PDF"
// import { PDFViewer } from "@react-pdf/renderer";
// interface Applicant {
//     applicantName: string,
//     position: string,
//     status: string,
//     skills: string,
//     email: string,
//     phone: string,
//     remarks: string,
//     applicationDate: string,
//     // ApplicantId: number,
// }

// interface ViewApplicantsProps {
//     applicant: Applicant;
//     isOpen: boolean;
//     setIsOpen: (data: boolean) => void;
//     onClose: () => void;
// }

// export default function index({ applicant, isOpen, setIsOpen, onClose }: ViewApplicantsProps) {
//     const {
//         //  ApplicantId,
//         applicantName, email, phone, applicationDate, position, remarks, status, skills } = applicant


//     //For checking the status of selected employee to properly return the proper color
//     const statusColors: Record<string, string> = {
//         "Applied": "bg-[#559CDA]",
//         "For Interview": "bg-[#ED8028] ",
//         "Hired": "bg-[#5A9D27]",
//         "Offered": "bg-[#FEC001]",
//         "For Transfer": "bg-[#9B51E0]",
//         "Archived": "bg-[#FF554A]",
//         "Transferred": "bg-[#6D6D6D]",
//         "Assessment": "bg-[#ED8028]",
//         "Final Interview": "bg-[#FEC001]",
//         "Initial Interview": "bg-[#559CDA]",
//     }

//     const viewPDFStatuses = ['Offered', 'Hired', 'For Transfer', 'Transferred'];
//     const { isUpdateStatusButtonModalOpen, setIsUpdateStatusButtonModalOpen, isGenerateNewOffer, setIsGenerateNewOffer, setIsOffered } = useCloseModal();
//     const [isViewPDF, setIsViewPDF] = useState(false);
//     const [isTransferPosition, setIsTransferPosition] = useState(false)
//     const forInterviewStatus = ["Assessment", "Final Interview", "Initial Interview"].includes(status)
//     const bgColorForInterview = forInterviewStatus ? "bg-[#ED8028]" : statusColors[status] || "bg-[#559CDA]";
//     const forInterviewDisplayText = forInterviewStatus ? "For Interview" : status;
//     const onCloseAll = () => {
//         setIsTransferPosition(false);
//         setIsOffered(false);
//         setIsOpen(false)
//     };

//     return (
//         <Modal size={'65%'} opened={isOpen} onClose={() => { setIsOpen(false) }} withCloseButton={false} >
//             <div className="h-[85vh] w-full p-4">

//                 {/* Header & Divider (Full Width) */}
//                 <div className='h-[6%]'>
//                     <div className="flex justify-between items-center">
//                         <p className='text-[#559CDA] font-medium text-[22px] mb-1'>Applicant Profile</p>
//                         <div className="flex items-center space-x-2">
//                             <IconFileUpload stroke={1} className="w-[20px] h-[25px]" />
//                             <IconX stroke={1} onClick={() => setIsOpen(false)}
//                                 className="cursor-pointer w-[20px] h-[25px]"
//                             />
//                         </div>
//                     </div>
//                     <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
//                 </div>

//                 <div className='h-[90%] w-full overflow-hidden '>


//                     {/* Two Column Layout */}
//                     <div className="flex h-full">

//                         {/* Left Section */}
//                         <div className="w-1/4 p-2 sticky top-0 "> {/*Originally 2/6 */}

//                             {/* Profile Image & Name (Left Aligned) */}
//                             <div className="flex flex-col items-left mt-3">
//                                 <img src={profileImage} className="w-[100px] h-[100px] shadow-sm rounded-full" />
//                                 <p className="text-[#559CDA] text-[20px] font-bold mt-2">{applicantName ?? "No Data"}</p>
//                                 <p className='text-[#6D6D6D] text-[12px] font-medium'>{position ?? "No Data"}</p>
//                             </div>

//                             {/* Status Section */}
//                             <div className="mt-8 text-[#6D6D6D] text-[12px]">

//                                 {/* Header */}
//                                 <h1 className="text-[#6D6D6D] pb-1">Current Status</h1>
//                                 <div className='space-y-2'>

//                                     {/* Changes background colors of the status based on the current status while maintaining the For Interview status and its proper styling*/}
//                                     <p className={`text-white rounded-[10px] text-[14px] w-[194px] h-[30px] flex items-center justify-center font-semibold ${bgColorForInterview}`}>
//                                         {forInterviewDisplayText}
//                                     </p>

//                                     {/* Hide the Update Status button if the current status is equivalent to either "Hired" or "Transferred" */}
//                                     {status !== 'Hired' && status !== 'Transferred' && (
//                                         <p className={`text-white rounded-[10px] bg-[#559CDA] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold
//                                     ${status === 'Archived' ? 'cursor-not-allowed' : 'cursor-pointer'}`}

//                                             onClick={status !== 'Archived' ? () => setIsUpdateStatusButtonModalOpen(true) : undefined}>
//                                             {status === 'Archived' ? "Inactive" : "Update Status"}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Contact Info */}
//                             <div className="mt-8 text-[12px] text-[#6D6D6D] space-y-3 poppins">
//                                 <h1 className="text-[12px] poppins">Location</h1>
//                                 <p className="font-bold text-[#6D6D6D] text-[14px] poppins">United States</p>

//                                 <h2 className="text-[12px]">Email</h2>
//                                 <p className="font-bold text-[#6D6D6D] text-[14px] break-words poppins">{email ?? "No Data"}</p>

//                                 <h3 className="text-[12px]">Phone</h3>
//                                 <p className="font-bold text-[#6D6D6D] text-[14px] poppins">{phone ?? "No Data"}</p>
//                             </div>

//                             {/* Skills Section */}
//                             <div className="mt-8 text-[#6D6D6D] text-[12px] poppins">
//                                 <h1>Skills</h1>
//                                 <div className="flex gap-2 mt-2 flex-wrap">
//                                     {skills
//                                         ? skills.split(", ").map((skill, index) => (
//                                             <p key={index} className="flex rounded-[10px] text-[#6D6D6D] bg-[#D9D9D9] w-auto px-3 h-[21px] font-semibold text-[12px] items-center justify-center">
//                                                 {skill}
//                                             </p>
//                                         ))
//                                         : <p className="text-[#6D6D6D] poppins">No Skills Listed</p>} {/* Display this text when there are no skills */}
//                                 </div>
//                             </div>

//                             {/* Conditional Start Date */}
//                             {(status === "For Transfer" || status === "Transferred" || status === "Hired") && (
//                                 <div className="mt-3 text-[#6D6D6D] text-[12px] poppins">
//                                     <h1>Start Date</h1>
//                                     <div className="flex gap-2 mt-2 flex-wrap">
//                                         {applicationDate}
//                                     </div>
//                                 </div>
//                             )}

//                             <div className="mt-3 pb-6">
//                                 {status !== 'Archived' && (
//                                     <p className="text-white rounded-[10px] poppins bg-[#559CDA] text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold cursor-pointer"

//                                         onClick={() => {
//                                             if (viewPDFStatuses.includes(status)) {
//                                                 setIsViewPDF(true);
//                                             }
//                                             else if (status === 'For Interview' || status === 'Final Interview' || status === 'Initial Interview' || status === 'Assessment' || status === 'Applied') {
//                                                 setIsTransferPosition(true);
//                                             }
//                                             else {
//                                                 setIsUpdateStatusButtonModalOpen(false);
//                                             }
//                                         }}>
//                                         {status === 'Hired' || status === 'Offered' || status === 'For Transfer' || status === 'Transferred' ? 'View PDF' : "Transfer Position"}
//                                     </p>
//                                 )}

//                                 {status === 'Offered' && (
//                                     <p className="text-white rounded-[10px] bg-[#6D6D6D] poppins text-[10px] w-[194px] h-[30px] flex items-center justify-center font-semibold cursor-pointer mt-2"
//                                         onClick={() => setIsGenerateNewOffer(true)}>
//                                         Generate new Offer
//                                     </p>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Right Section */}
//                         <div className="w-4/5 p-4  overflow-y-auto ">

//                             <Tabs defaultValue="personal">
//                                 <Tabs.List className="text-[#6D6D6D] space-x-6 pb-2 poppins">
//                                     {[
//                                         { value: "personal", label: "Personal Details" },
//                                         { value: "application", label: "Application Movement" },
//                                         ...(status === 'Transferred') ? [{ value: "transfer_details", label: "Transfer Details" }] : []
//                                     ].map((tab) => (
//                                         <Tabs.Tab
//                                             key={tab.value}
//                                             value={tab.value}
//                                             className="poppins font-semibold text-[16px] transition-colors data-[active=true]:text-[#559CDA] data-[active=false]:text-[#6D6D6D] p-0 pb-2"
//                                         >
//                                             {tab.label}
//                                         </Tabs.Tab>
//                                     ))}
//                                 </Tabs.List>

//                                 {/* Peronsal Details Tab */}
//                                 <Tabs.Panel value="personal">
//                                     <PersonalDetails
//                                         Position={position}
//                                     />
//                                 </Tabs.Panel>

//                                 {/* Application movement Tab */}
//                                 <Tabs.Panel value="application">
//                                     <ApplicationMovement
//                                         Applicant_Name={applicantName}
//                                         Status={status}
//                                         Remarks={remarks}
//                                     />
//                                 </Tabs.Panel>

//                                 {status === 'Transferred' && (
//                                     <Tabs.Panel value="transfer_details">
//                                         <TransferDetails />
//                                     </Tabs.Panel>
//                                 )}

//                             </Tabs>
//                         </div>
//                     </div>
//                 </div>

//                 <Modal radius={"md"} size={"35%"} withCloseButton={false} centered opened={isUpdateStatusButtonModalOpen} onClose={onClose}>
//                     <UpdateStatus
//                         Status={status}
//                         onClose={onCloseAll}
//                     />
//                 </Modal>

//                 <Modal radius={"md"} size={"35%"} withCloseButton={false} centered opened={isTransferPosition} onClose={onCloseAll}>
//                     <TransferPosition
//                         Applicant_Name={applicantName}
//                         onClose={onCloseAll} />
//                 </Modal>

//                 <Modal radius={"md"} size={"35%"} withCloseButton={false} centered opened={isGenerateNewOffer} onClose={onClose}>
//                     <GenerateNewOffer
//                         ApplicantName={applicantName}
//                         onClose={() => setIsGenerateNewOffer(false)} />
//                 </Modal>

//                 <Modal size={'50%'} centered opened={isViewPDF} onClose={() => setIsViewPDF(false)}>
//                     <div className="h-[80vh]">
//                         <PDFViewer width="100%" height={"100%"} style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
//                             <MyDocument
//                                 applicantName={applicantName}
//                                 position={position}
//                                 department=""
//                                 remarks=""
//                                 salaryMonthly=""
//                                 salaryYearly=""
//                                 noteSalary=""
//                                 meritIncrease=""
//                                 descriptionVL=""
//                                 descriptionSL=""
//                                 descriptionBL=""
//                                 benefitPaternity=""
//                                 benefitMaternity=""
//                                 descriptionTranspo=""
//                                 acknowledgement=""
//                             />
//                         </PDFViewer>
//                     </div>
//                 </Modal>
//             </div>
//         </Modal >
//     )
// }