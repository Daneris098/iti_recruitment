import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useFeedbacksStore } from "@src/modules/Applicants/store";
import { IconCaretDownFilled, IconCirclePlus } from "@tabler/icons-react";
import { ViewApplicantsProps } from "@modules/Applicants/store"
import DropZone from "@modules/Applicants/components/dropzone/Dropzone";

export default function ArchivedStatus({ Status }: Pick<ViewApplicantsProps, "Status">) {

    const feedbacksComboBox = useCombobox({ onDropdownClose: () => feedbacksComboBox.resetSelectedOption(), })
    const applicantFeedbackComboBox = useCombobox({ onDropdownClose: () => applicantFeedbackComboBox.resetSelectedOption(), })
    const feedbacks = ["Inactive", "Not Qualified", "Budget Constraint", "Add Feedback"];
    const applicantsFeedbacks = ["Salary Mismatch", "Better Offer", "No Response", "Add Applicant Feedback"];
    const { feedback, setFeedback, applicantFeedback, setApplicantFeedback } = useFeedbacksStore();

    // This is to check if the Status is either of these. If yes, then translate their status to for interview.
    // Also, to check if the current status if equivalent to For Interview.
    const forInterviewStatus = ["Assessment", "Final Interview", "Initial Interview"].includes(Status)
    const forInterviewDisplayText = forInterviewStatus ? "For Interview" : Status;

    return (
        <div>
            {/* Feedbacks field */}
            <div className="pt-4">

                {/* If the Current Status is either Applied or For Interview and then the user chose update status with the selected status equals to Archived. */}
                {(Status === "Applied" || forInterviewDisplayText && Status !== "Offered") && (
                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                            Feedback <span className="text-[#F14336]">*</span>
                        </h3>

                        <Combobox store={feedbacksComboBox} withinPortal={false}>
                            <Combobox.Target>
                                <TextInput
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.currentTarget.value)}
                                    onFocus={() => feedbacksComboBox.openDropdown()}
                                    rightSection={<IconCaretDownFilled size={16} />}
                                    placeholder="Select feedback below"
                                    classNames={{
                                        input: "poppins relative flex items-center w-[560px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                    }}
                                    required
                                />
                            </Combobox.Target>

                            {feedbacks.length > 0 && (
                                <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins ">
                                    {feedbacks.map((feedback) => (
                                        <Combobox.Option
                                            key={feedback}
                                            value={feedback}
                                            onClick={() => {
                                                setFeedback(feedback);
                                                feedbacksComboBox.closeDropdown();
                                            }}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center poppins"
                                        >
                                            <span>{feedback}</span>
                                            {feedback === "Add Feedback" && <IconCirclePlus className="text-[#5A9D27] ml-auto w-[18] h-[18px] poppins" />}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Dropdown>
                            )}
                        </Combobox>
                    </div>
                )}

                {Status === "Offered" && (
                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                            Applicant Feedback <span className="text-[#F14336]">*</span>
                        </h3>

                        <Combobox store={applicantFeedbackComboBox} withinPortal={false}>
                            <Combobox.Target>
                                <TextInput
                                    value={applicantFeedback}
                                    onChange={() => { }}
                                    onFocus={() => applicantFeedbackComboBox.openDropdown()}
                                    rightSection={<IconCaretDownFilled size={16} />}
                                    placeholder="Applicant Feedback"
                                    classNames={{
                                        input: "cursor-pointer poppins relative flex items-center w-[560px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                    }}
                                    required
                                />
                            </Combobox.Target>

                            {applicantsFeedbacks.length > 0 && (
                                <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins ">
                                    {applicantsFeedbacks.map((applicantFeedback) => (
                                        <Combobox.Option
                                            key={applicantFeedback}
                                            value={applicantFeedback}
                                            onClick={() => {
                                                setApplicantFeedback(applicantFeedback);
                                                applicantFeedbackComboBox.closeDropdown();
                                            }}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center poppins"
                                        >
                                            <span>{applicantFeedback}</span>
                                            {applicantFeedback === "Add Applicant Feedback" && <IconCirclePlus className="text-[#5A9D27] ml-auto w-[18] h-[18px] poppins" />}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Dropdown>
                            )}
                        </Combobox>

                        <p className="mt-4 mb-4 font-medium text-[14px] text-[#6D6D6D] poppins">
                            Please upload the job offer signed by both the authorized signatories and the applicant.
                            <span className="text-[#F14336] poppins">*</span>
                        </p>
                        <DropZone />
                    </div>
                )}
            </div>
        </div>
    )
}