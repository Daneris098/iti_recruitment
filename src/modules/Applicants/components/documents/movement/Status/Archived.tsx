import { useState, useEffect } from "react";
import { ViewApplicantsProps } from "@modules/Applicants/store";
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useFeedbacksStore } from "@src/modules/Applicants/store";
import { interviewStagesOption } from "@modules/Applicants/types";
import DropZone from "@modules/Applicants/components/dropzone/Dropzone";
import { useDropDownOfferedStore } from "@src/modules/Applicants/store";
import { IconCaretDownFilled, IconCirclePlus } from "@tabler/icons-react";
import { useGetHiringAndApplicantFeedbacks } from "@modules/Shared/hooks/useSharedApplicants";

export default function ArchivedStatus({ Status }: Pick<ViewApplicantsProps, "Status">) {
    const { feedbacks, setFeedbacks } = useDropDownOfferedStore();

    const {
        setFeedbacksId,
        feedback, setFeedback,
        applicantFeedback, setApplicantFeedback,
    } = useFeedbacksStore();

    const { data: hiringFeedback } = useGetHiringAndApplicantFeedbacks(false);
    const { data: applicantFeedbacks } = useGetHiringAndApplicantFeedbacks(true);

    const [getHiringFeedback, setHiringFeedback] = useState<interviewStagesOption[]>([]);
    const [getApplicantFeedback, setApplicantFeedbackDropdown] = useState<interviewStagesOption[]>([]);

    useEffect(() => {
        if (!applicantFeedbacks || !hiringFeedback) return;

        const feedbacks = applicantFeedbacks.map((feeds: any) => ({
            value: feeds.id,
            label: feeds.description,
        }));

        const hiringFeedbacksDropdown = hiringFeedback.map((hiringFeeds: any) => ({
            value: hiringFeeds.id,
            label: hiringFeeds.description,
        }));

        hiringFeedbacksDropdown.push({ value: "custom_add_feedback", label: "Add Applicant Feedback" });
        feedbacks.push({ value: "custom_add_feedback", label: "Add Feedback" });

        setHiringFeedback(hiringFeedbacksDropdown);
        setApplicantFeedbackDropdown(feedbacks);
    }, [applicantFeedbacks, hiringFeedback]);

    useEffect(() => {
        if (getApplicantFeedback.length > 0) {
            setFeedbacks([getApplicantFeedback[0].label]);
            setFeedbacksId(getApplicantFeedback[0].value);
        }
    }, [getApplicantFeedback]);

    const feedbacksComboBox = useCombobox({
        onDropdownClose: () => feedbacksComboBox.resetSelectedOption(),
    });

    const applicantFeedbackComboBox = useCombobox({
        onDropdownClose: () => applicantFeedbackComboBox.resetSelectedOption(),
    });

    const [customFeedback, setCustomFeedback] = useState("");
    const [showCustomFeedbackInput, setShowCustomFeedbackInput] = useState(false);

    const [customApplicantFeedback, setCustomApplicantFeedback] = useState("");
    const [showCustomApplicantFeedbackInput, setShowCustomApplicantFeedbackInput] = useState(false);

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
                                {getHiringFeedback.map((item) => (
                                    <Combobox.Option
                                        key={item.value}
                                        value={item.label}
                                        onClick={() => {
                                            if (item.label === "Add Applicant Feedback") {
                                                setShowCustomFeedbackInput(true);
                                                feedbacksComboBox.closeDropdown();
                                            } else {
                                                setFeedback(item.label);
                                                feedbacksComboBox.closeDropdown();
                                            }
                                        }}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center poppins"
                                    >
                                        <span>{item.label}</span>
                                        {item.label === "Add Applicant Feedback" && (
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
                                        const trimmed = customFeedback.trim();
                                        const exists = getHiringFeedback.some(item => item.label === trimmed);

                                        if (trimmed && !exists) {
                                            const updated = [...getHiringFeedback];
                                            const nextId = updated
                                                .filter(it => typeof it.value === "number")
                                                .reduce((max, it) => Math.max(max, Number(it.value)), 0) + 1;

                                            updated.splice(-1, 0, { label: trimmed, value: nextId });

                                            setHiringFeedback(updated);
                                            setFeedback(trimmed);
                                            setFeedbacks([...feedbacks.slice(0, -1), trimmed]);

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
                                {getApplicantFeedback.map((item) => (
                                    <Combobox.Option
                                        key={item.value}
                                        value={item.label}
                                        onClick={() => {
                                            if (item.label === "Add Feedback") {
                                                setShowCustomApplicantFeedbackInput(true);
                                                applicantFeedbackComboBox.closeDropdown();
                                            } else {
                                                setApplicantFeedback(item.label);
                                                applicantFeedbackComboBox.closeDropdown();
                                            }
                                        }}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center poppins"
                                    >
                                        <span>{item.label}</span>
                                        {item.label === "Add Feedback" && (
                                            <IconCirclePlus className="text-[#559CDA] ml-auto w-[18px] h-[18px]" />
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
                                    className="bg-[#559CDA] hover:bg-[#3e7bb9] text-white text-sm px-4 py-2 rounded poppins"
                                    onClick={() => {
                                        const trimmed = customApplicantFeedback.trim();
                                        const exists = getApplicantFeedback.some(item => item.label === trimmed);

                                        if (trimmed && !exists) {
                                            const updated = [...getApplicantFeedback];
                                            const nextId = updated
                                                .filter(it => typeof it.value === "number")
                                                .reduce((max, it) => Math.max(max, Number(it.value)), 0) + 1;

                                            updated.splice(-1, 0, { label: trimmed, value: nextId });

                                            setApplicantFeedbackDropdown(updated);
                                            setHiringFeedback(updated);
                                            setApplicantFeedback(trimmed);

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
                            Please upload the job offer signed by both the authorized signatories and the applicant.
                            <span className="text-[#F14336]">*</span>
                        </p>
                        <DropZone />
                    </div>
                )}
            </div>
        </div>
    );
}
