import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useFeedbacksStore } from "@src/modules/Applicants/store";
import { IconCaretDownFilled, IconCirclePlus } from "@tabler/icons-react";
import { ViewApplicantsProps } from "@modules/Applicants/store";
import DropZone from "@modules/Applicants/components/dropzone/Dropzone";
import { useState } from "react";

export default function ArchivedStatus({ Status }: Pick<ViewApplicantsProps, "Status">) {
    const feedbacksComboBox = useCombobox({
        onDropdownClose: () => feedbacksComboBox.resetSelectedOption(),
    });

    const applicantFeedbackComboBox = useCombobox({
        onDropdownClose: () => applicantFeedbackComboBox.resetSelectedOption(),
    });

    const { feedback, setFeedback, applicantFeedback, setApplicantFeedback } = useFeedbacksStore();

    const [feedbacks, setFeedbacks] = useState([
        "Inactive",
        "Not Qualified",
        "Budget Constraint",
        "Add Feedback",
    ]);
    const [applicantsFeedbacks, setApplicantsFeedbacks] = useState([
        "Salary Mismatch",
        "Better Offer",
        "No Response",
        "Add Applicant Feedback",
    ]);

    const [showCustomFeedbackInput, setShowCustomFeedbackInput] = useState(false);
    const [customFeedback, setCustomFeedback] = useState("");

    const [showCustomApplicantFeedbackInput, setShowCustomApplicantFeedbackInput] = useState(false);
    const [customApplicantFeedback, setCustomApplicantFeedback] = useState("");

    const forInterviewStatus = ["Assessment", "Final Interview", "Initial Interview"].includes(Status);
    const forInterviewDisplayText = forInterviewStatus ? "For Interview" : Status;

    return (
        <div>
            <div className="pt-4">
                {(Status === "Applied" || (forInterviewDisplayText && Status !== "Offered")) && (
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
                                    placeholder="Select feedback"
                                    classNames={{
                                        input:
                                            "poppins relative flex items-center w-[560px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                    }}
                                    required
                                />
                            </Combobox.Target>

                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                                {feedbacks.map((item) => (
                                    <Combobox.Option
                                        key={item}
                                        value={item}
                                        onClick={() => {
                                            if (item === "Add Feedback") {
                                                setShowCustomFeedbackInput(true);
                                                feedbacksComboBox.closeDropdown();
                                            } else {
                                                setFeedback(item);
                                                feedbacksComboBox.closeDropdown();
                                            }
                                        }}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center poppins"
                                    >
                                        <span>{item}</span>
                                        {item === "Add Feedback" && (
                                            <IconCirclePlus className="text-[#5A9D27] ml-auto w-[18px] h-[18px]" />
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Dropdown>
                        </Combobox>

                        {showCustomFeedbackInput && (
                            <div className="mt-2 flex gap-2 items-center">
                                <TextInput
                                    value={customFeedback}
                                    onChange={(e) => setCustomFeedback(e.currentTarget.value)}
                                    placeholder="Enter custom feedback"
                                    className="w-[560px]"
                                />
                                <button
                                    className="bg-[#5A9D27] hover:bg-[#4d8a20] text-white text-sm px-4 py-2 rounded poppins"
                                    onClick={() => {
                                        if (customFeedback && !feedbacks.includes(customFeedback)) {
                                            const updated = [...feedbacks];
                                            updated.splice(-1, 0, customFeedback); // insert before last
                                            setFeedbacks(updated);
                                            setFeedback(customFeedback);
                                            setCustomFeedback("");
                                            setShowCustomFeedbackInput(false);
                                        }
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        )}
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
                                        input:
                                            "cursor-pointer poppins relative flex items-center w-[560px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                    }}
                                    required
                                />
                            </Combobox.Target>

                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                                {applicantsFeedbacks.map((item) => (
                                    <Combobox.Option
                                        key={item}
                                        value={item}
                                        onClick={() => {
                                            if (item === "Add Applicant Feedback") {
                                                setShowCustomApplicantFeedbackInput(true);
                                                applicantFeedbackComboBox.closeDropdown();
                                            } else {
                                                setApplicantFeedback(item);
                                                applicantFeedbackComboBox.closeDropdown();
                                            }
                                        }}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center poppins"
                                    >
                                        <span>{item}</span>
                                        {item === "Add Applicant Feedback" && (
                                            <IconCirclePlus className="text-[#5A9D27] ml-auto w-[18px] h-[18px]" />
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Dropdown>
                        </Combobox>

                        {showCustomApplicantFeedbackInput && (
                            <div className="mt-2 flex gap-2 items-center">
                                <TextInput
                                    value={customApplicantFeedback}
                                    onChange={(e) => setCustomApplicantFeedback(e.currentTarget.value)}
                                    placeholder="Enter custom applicant feedback"
                                    className="w-[560px]"
                                />
                                <button
                                    className="bg-[#559CDA] hover:bg-[#559CDA] text-white text-sm px-4 py-2 rounded poppins"
                                    onClick={() => {
                                        if (
                                            customApplicantFeedback &&
                                            !applicantsFeedbacks.includes(customApplicantFeedback)
                                        ) {
                                            const updated = [...applicantsFeedbacks];
                                            updated.splice(-1, 0, customApplicantFeedback);
                                            setApplicantsFeedbacks(updated);
                                            setApplicantFeedback(customApplicantFeedback);
                                            setCustomApplicantFeedback("");
                                            setShowCustomApplicantFeedbackInput(false);
                                        }
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        )}

                        <p className="mt-4 mb-4 font-medium text-[14px] text-[#6D6D6D] poppins">
                            Please upload the job offer signed by both the authorized signatories and the
                            applicant. <span className="text-[#F14336]">*</span>
                        </p>
                        <DropZone />
                    </div>
                )}
            </div>
        </div>
    );
}
