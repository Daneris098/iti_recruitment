// import { Button, Modal } from "@mantine/core";
// import { useCloseModal, useStatusStore } from "@src/modules/Shared/components/applicantProfile/store";
// import { IconUserQuestion } from "@tabler/icons-react";
// import TransferApplicants from "@modules/Shared/components/applicantProfile/documents/movement/TransferApplicants";


// export default function Transferred() {

//     const { isForTransferLoader, setIsForTransferLoader } = useCloseModal();

//     const { setSelectedStatus } = useStatusStore();



//     return (
//         <div className="p-1 w-full h-full">

//             {/* Checklist Icon */}
//             <div className="justify-center flex py-1">
//                 <IconUserQuestion size={26} style={{ width: "90px", height: "90px" }} className="text-[#559CDA] stroke-[0.5]" />
//             </div>

//             {/* Text prompt */}
//             <div className="text-center">
//                 <h1 className="font-semibold text-[24px] text-[#6D6D6D] poppins">
//                     Would you like to transfer the selected applicant(s) to HRDotNet?
//                 </h1>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-center space-x-8 pt-8 pb-2">
//                 {/*YES*/}
//                 <Button className="br-gradient w-[152px] h-[42px] rounded-[10px] poppins"
//                     onClick={() => {
//                         setIsForTransferLoader(true); // Re-enable transfer
//                     }}
//                 >
//                     {"yes".toUpperCase()}
//                 </Button>

//                 {/*NO*/}
//                 <Button
//                     className="
//                                 w-[152px] h-[42px]
//                                 bg-white
//                                 text-[#559CDA] rounded-[10px] border border-1
//                                 border-[#559CDA]
//                                 hover:text-[#559CDA]
//                                 hover:bg-white poppins"
//                     onClick={() => {
//                         setSelectedStatus(null)
//                     }}
//                 >
//                     {"no".toUpperCase()}
//                 </Button>
//             </div>

//             {/* This modal will be called when the selectedStatus === Transferred and the user agrees to transfer applicants to hrdotnet. */}
//             <Modal centered withCloseButton={false} opened={isForTransferLoader} onClose={() => setIsForTransferLoader(false)}>
//                 <TransferApplicants
//                     onClose={() => setIsForTransferLoader(false)}
//                 />
//             </Modal>
//         </div>
//     )
// }