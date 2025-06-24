// import { Combobox, TextInput, useCombobox } from "@mantine/core";
// import { useFeedbacksStore } from "@src/modules/Applicants/store";
// import { IconCaretDownFilled, IconCirclePlus, IconCloudUpload } from "@tabler/icons-react";

// import { ViewApplicantsProps } from "@modules/Applicants/store"

// export default function ArchivedStatus({ Status } : Pick<ViewApplicantsProps, "Status">) {

//     const feedbacksComboBox = useCombobox({
//         onDropdownClose: () => feedbacksComboBox.resetSelectedOption(),
//     })

//     const applicantFeedbackComboBox = useCombobox({
//         onDropdownClose: () => applicantFeedbackComboBox.resetSelectedOption(),
//     })

//     const feedbacks = ["Inactive", "Not Qualified", "Budget Constraint", "Add Feedback"]; // Default feedbacks (For Feedbacks DropDown)
//     const applicantsFeedbacks = ["Salary Mismatch", "Better Offer", "No Response", "Add Applicant Feedback"];

//     const {
//         feedback, setFeedback,
//         applicantFeedback, setApplicantFeedback
//     } = useFeedbacksStore();  // Use Zustand

//     // This is to check if the Status is either of these. If yes, then translate their status to for interview.
//     // Also, to check if the current status if equivalent to For Interview.
//     const forInterviewStatus = ["Assessment", "Final Interview", "Initial Interview"].includes(Status)
//     const forInterviewDisplayText = forInterviewStatus ? "For Interview" : Status;

//     return (
//         <div>
//             {/* Feedbacks field */}
//             <div className="pt-4">

//                 {/* If the Current Status is either Applied or For Interview and then the user chose update status with the selected status equals to Archived. */}
//                 {(Status === "Applied" || forInterviewDisplayText && Status !== "Offered") && (
//                     <div>
//                         <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
//                             Feedback <span className="text-[#F14336]">*</span>
//                         </h3>

//                         <Combobox store={feedbacksComboBox} withinPortal={false}>
//                             <Combobox.Target>
//                                 <TextInput
//                                     value={feedback}
//                                     onChange={(e) => setFeedback(e.currentTarget.value)}
//                                     onFocus={() => feedbacksComboBox.openDropdown()}
//                                     rightSection={<IconCaretDownFilled size={16} />}
//                                     placeholder="Select feedback below"
//                                     classNames={{
//                                         input: "poppins relative flex items-center w-full h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
//                                     }}
//                                     required
//                                 />
//                             </Combobox.Target>

//                             {feedbacks.length > 0 && (
//                                 <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins ">
//                                     {feedbacks.map((feedback) => (
//                                         <Combobox.Option
//                                             key={feedback}
//                                             value={feedback}
//                                             onClick={() => {
//                                                 setFeedback(feedback);
//                                                 feedbacksComboBox.closeDropdown();
//                                             }}
//                                             className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center poppins"
//                                         >
//                                             <span>{feedback}</span>
//                                             {feedback === "Add Feedback" && <IconCirclePlus className="text-[#5A9D27] ml-auto w-[18] h-[18px] poppins" />}
//                                         </Combobox.Option>
//                                     ))}
//                                 </Combobox.Dropdown>
//                             )}
//                         </Combobox>
//                     </div>
//                 )}

//                 {Status === "Offered" && (
//                     <div>
//                         <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
//                             Applicant Feedback <span className="text-[#F14336]">*</span>
//                         </h3>

//                         <Combobox store={applicantFeedbackComboBox} withinPortal={false}>
//                             <Combobox.Target>
//                                 <TextInput
//                                     value={applicantFeedback}
//                                     onChange={(e) => setApplicantFeedback(e.currentTarget.value)}
//                                     onFocus={() => applicantFeedbackComboBox.openDropdown()}
//                                     rightSection={<IconCaretDownFilled size={16} />}
//                                     placeholder="Applicant Feedback"
//                                     classNames={{
//                                         input: "poppins relative flex items-center  h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
//                                     }}
//                                     required
//                                 />
//                             </Combobox.Target>

//                             {applicantsFeedbacks.length > 0 && (
//                                 <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins ">
//                                     {applicantsFeedbacks.map((applicantFeedback) => (
//                                         <Combobox.Option
//                                             key={applicantFeedback}
//                                             value={applicantFeedback}
//                                             onClick={() => {
//                                                 setApplicantFeedback(applicantFeedback);
//                                                 applicantFeedbackComboBox.closeDropdown();
//                                             }}
//                                             className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center poppins"
//                                         >
//                                             <span>{applicantFeedback}</span>
//                                             {applicantFeedback === "Add Applicant Feedback" && <IconCirclePlus className="text-[#5A9D27] ml-auto w-[18] h-[18px] poppins" />}
//                                         </Combobox.Option>
//                                     ))}
//                                 </Combobox.Dropdown>
//                             )}
//                         </Combobox>

//                         <p className="mt-4 mb-4 font-medium text-[14px] text-[#6D6D6D] poppins">
//                             Please upload the job offer signed by both the authorized signatories and the applicant.
//                             <span className="text-[#F14336] poppins">*</span>
//                         </p>

//                         <div className="bg-[#d5d5d599] h-[223px]  poppins py-5 border-2 border-dashed border-[#6D6D6D] rounded-lg flex flex-col justify-center items-center">
//                             {/* Upload Icon */}
//                             <div className="flex justify-center">
//                                 <IconCloudUpload className="text-[#559CDA]" size={70} stroke={1} />
//                             </div>


//                             <div className="flex flex-col justify-center items-center pt-4  space-y-1 text-center poppins">
//                                 <p className="mb-2 font-semibold text-[15px] text-[#6D6D6D] poppins">
//                                     Drag & drop files or{" "}
//                                     <label
//                                         htmlFor="file-upload" // Associate this label with the FileInput
//                                         className="text-[#559CDA] underline underline-offset-4 cursor-pointer poppins"
//                                     >
//                                         Browse
//                                     </label>
//                                 </p>
//                                 <p className="text-[12px] text-[#6D6D6D] poppins">Supported formats: PDF, DOC</p>
//                                 <p className="text-[12px] text-[#6D6D6D] poppins">Max File Size: 25MB</p>
//                                 <p className="text-[12px] text-[#6D6D6D] poppins">File Upload Limit: 1</p>

//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }