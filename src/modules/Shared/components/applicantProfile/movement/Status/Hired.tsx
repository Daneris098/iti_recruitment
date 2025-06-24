// import CustomDatePicker from "@modules/Applicants/components/picker/DatePicker"
// import { IconCloudUpload } from "@tabler/icons-react";
// import { useState } from "react";

// // interface HiredProps {
// //     Status: string
// // }

// export default function Hired() {
//     const [selectedDate, setSelectedDate] = useState<string | null>(null);
//     return (
//         <div>
//             <div>
//                 <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins">
//                     Start Date <span className="text-[#F14336]">*</span>
//                 </h3>
//                 <CustomDatePicker
//                     label=""
//                     value={selectedDate}
//                     onChange={setSelectedDate}
//                     placeholder="Enter Date"
//                 />
//             </div>

//             <p className="mt-4 mb-4 font-medium text-[14px] text-[#6D6D6D] poppins">
//                 Please upload the job offer signed by both the authorized signatories and the applicant.
//                 <span className="text-[#F14336] poppins">*</span>
//             </p>

//             <div className="bg-[#d5d5d599] h-[223px]  poppins py-5 border-2 border-dashed border-[#6D6D6D] rounded-lg flex flex-col justify-center items-center">
//                 {/* Upload Icon */}
//                 <div className="flex justify-center">
//                     <IconCloudUpload className="text-[#559CDA]" size={70} stroke={1} />
//                 </div>


//                 <div className="flex flex-col justify-center items-center pt-4  space-y-1 text-center poppins">
//                     <p className="mb-2 font-semibold text-[15px] text-[#6D6D6D] poppins">
//                         Drag & drop files or{" "}
//                         <label
//                             htmlFor="file-upload" // Associate this label with the FileInput
//                             className="text-[#559CDA] underline underline-offset-4 cursor-pointer poppins"
//                         >
//                             Browse
//                         </label>
//                     </p>
//                     <p className="text-[12px] text-[#6D6D6D] poppins">Supported formats: PDF, DOC</p>
//                     <p className="text-[12px] text-[#6D6D6D] poppins">Max File Size: 25MB</p>
//                     <p className="text-[12px] text-[#6D6D6D] poppins">File Upload Limit: 1</p>

//                 </div>
//             </div>
//         </div>
//     )
// }