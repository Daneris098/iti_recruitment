// import { Button, Divider } from "@mantine/core";
// import { IconX } from "@tabler/icons-react";
// import ScheduleInterviewAlert from "@src/modules/Applicants/components/alerts/AddtoCalendar"
// // import JobGeneratedModal from "@modules/Applicants/components/modal/jobGenerated";
// import { useCloseModal } from "@src/modules/Applicants/store";
// import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
// interface ApplicantContactProps {
//     onClose: () => void;
//     updateSelectedStatus: () => void;
// }

// export default function ApplicantContactNumber({ onClose, updateSelectedStatus }: ApplicantContactProps) {

//     const { isAddtoCalendar, setIsAddtoCalendar } = useCloseModal();

//     return (
//         <div className="p-2 w-full h-full">
//             {/* Header */}
//             <div>
//                 <div className="flex justify-between items-center">
//                     <h1 className="font-semibold text-[#559CDA] text-[22px] poppins">
//                         Applicant Contact Number
//                     </h1>

//                     {/* Exit Icon - Closes modal */}
//                     <IconX
//                         className="w-[15px] h-[15px] cursor-pointer"
//                         onClick={() => {
//                             onClose(); // Close FeedbackSent modal
//                         }}
//                     />
//                 </div>
//                 <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
//             </div>


//             {/* Text prompt */}
//             <div className="text-center pt-14">
//                 <h1 className="font-semibold text-[22px] text-[#6D6D6D] poppins">
//                     You can call/contact Jane Cooper here: <br />
//                     <span className="text-[#559CDA]">+63916735673</span>
//                 </h1>
//                 <p className="mt-2 italic text-[#6D6D6D] text-[16px] poppins pt-6">Choose "Add to Calendar" if you reached the applicant via phone call/text. Otherwise, choose "Archive".</p>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-center space-x-8 pt-12 pb-2">
//                 {/*YES*/}
//                 <Button className="br-gradient w-[191px] h-[42px] rounded-[10px] poppins"
//                     onClick={() => setIsAddtoCalendar(true)}
//                 >{"add to calendar".toUpperCase()}</Button>

//                 {/*Archive*/}
//                 <Button
//                     className="
//                     w-[152px] h-[42px]
//                     bg-white
//                     text-[#559CDA] rounded-[10px] border border-1
//                     border-[#559CDA]
//                     hover:text-[#559CDA]
//                     hover:bg-white poppins"
//                     onClick={updateSelectedStatus}
//                 >
//                     {"archive".toUpperCase()}
//                 </Button>
//             </div>

//             <div>
//                 <ModalWrapper
//                     isOpen={isAddtoCalendar}
//                     overlayClassName="job-offer-modal-overlay"
//                     contentClassName="job-generated"
//                     onClose={() => { }}
//                 >
//                     <ScheduleInterviewAlert onClose={() => setIsAddtoCalendar(false)} />

//                 </ModalWrapper>
//             </div>
//         </div>
//     );
// }
