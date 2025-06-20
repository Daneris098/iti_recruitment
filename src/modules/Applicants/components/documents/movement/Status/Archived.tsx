import { useState, useEffect } from "react";
import { ViewApplicantsProps } from "@modules/Applicants/store";
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useFeedbacksStore } from "@src/modules/Applicants/store";
import { interviewStagesOption } from "@modules/Applicants/types";
import DropZone from "@modules/Applicants/components/dropzone/Dropzone";
import { useDropDownOfferedStore } from "@src/modules/Applicants/store";
import { IconCaretDownFilled, IconCirclePlus } from "@tabler/icons-react";
import { useGetHiringAndApplicantFeedbacks, useUpdateApplicantFeedback } from "@modules/Shared/hooks/useSharedApplicants";

export default function ArchivedStatus({
    Status,
}: Pick<ViewApplicantsProps, "Status">) {
    /* ---------------------------------------------------------------------- */
    /*  GLOBAL STORES                                                          */
    /* ---------------------------------------------------------------------- */
    const { feedbacks, setFeedbacks } = useDropDownOfferedStore();
    const {
        setFeedbacksId,
        feedback,
        setFeedback,
        applicantFeedback,
        setApplicantFeedback,
    } = useFeedbacksStore();

    /* ---------------------------------------------------------------------- */
    /*  SERVER DATA                                                             */
    /* ---------------------------------------------------------------------- */
    const { data: hiringFeedback } = useGetHiringAndApplicantFeedbacks(false);
    const { data: applicantFeedbacks } = useGetHiringAndApplicantFeedbacks(true);
    
    const { mutate: saveFeedback } = useUpdateApplicantFeedback();

    /* ---------------------------------------------------------------------- */
    /*  LOCAL STATE                                                            */
    /* ---------------------------------------------------------------------- */
    const [getHiringFeedback, setHiringFeedback] =
        useState<interviewStagesOption[]>([]);
    const [getApplicantFeedback, setApplicantFeedbackDropdown] =
        useState<interviewStagesOption[]>([]);

    /* dropdown stores */
    const feedbacksComboBox = useCombobox({
        onDropdownClose: () => feedbacksComboBox.resetSelectedOption(),
    });
    const applicantFeedbackComboBox = useCombobox({
        onDropdownClose: () => applicantFeedbackComboBox.resetSelectedOption(),
    });

    /* ad‑hoc custom feedback inputs */
    const [customFeedback, setCustomFeedback] = useState("");
    const [showCustomFeedbackInput, setShowCustomFeedbackInput] = useState(false);

    const [customApplicantFeedback, setCustomApplicantFeedback] = useState("");
    const [showCustomApplicantFeedbackInput, setShowCustomApplicantFeedbackInput] =
        useState(false);

    /* ---------------------------------------------------------------------- */
    /*  EFFECTS: build dropdown options                                        */
    /* ---------------------------------------------------------------------- */
    useEffect(() => {
        if (!applicantFeedbacks || !hiringFeedback) return;

        const applicantOpts = applicantFeedbacks.map((f: any) => ({
            value: f.id,
            label: f.description,
        }));
        const hiringOpts = hiringFeedback.map((f: any) => ({
            value: f.id,
            label: f.description,
        }));

        hiringOpts.push({ value: "custom_add_feedback", label: "Add Applicant Feedback" });
        applicantOpts.push({ value: "custom_add_feedback", label: "Add Feedback" });

        setHiringFeedback(hiringOpts);
        setApplicantFeedbackDropdown(applicantOpts);
    }, [applicantFeedbacks, hiringFeedback]);

    /* auto‑select first applicant feedback */
    useEffect(() => {
        if (getApplicantFeedback.length > 0) {
            setFeedbacks([getApplicantFeedback[0].label]);
            setFeedbacksId(getApplicantFeedback[0].value);
        }
    }, [getApplicantFeedback]);

    /* ---------------------------------------------------------------------- */
    /*  HELPERS                                                                */
    /* ---------------------------------------------------------------------- */
    const persistFeedback = (description: string, isApplicantFeedback: boolean) => {
        /* 🚀 new payload: only description + isApplicantFeedback */
        saveFeedback({ description, isApplicantFeedback });
    };

    const forInterviewStatus = ["Assessment", "Final Interview", "Initial Interview"].includes(
        Status
    );
    const forInterviewDisplayText = forInterviewStatus ? "For Interview" : Status;

    /* ---------------------------------------------------------------------- */
    /*  RENDER                                                                 */
    /* ---------------------------------------------------------------------- */
    return (
        <div>
            <div className="pt-4">
                {(Status === "Applied" || (forInterviewDisplayText && Status !== "Offered")) && (
                    <div>
                        <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                            Feedback <span className="text-[#F14336]">*</span>
                        </h3>

                        {/* ---------------- Hiring Feedback Dropdown ---------------- */}
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

                        {/* custom hiring feedback */}
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
                                        const exists = getHiringFeedback.some((i) => i.label === trimmed);

                                        if (trimmed && !exists) {
                                            const updated = [...getHiringFeedback];
                                            const nextId =
                                                updated
                                                    .filter((i) => typeof i.value === "number")
                                                    .reduce((m, i) => Math.max(m, Number(i.value)), 0) + 1;

                                            updated.splice(-1, 0, { label: trimmed, value: nextId });

                                            setHiringFeedback(updated);
                                            setFeedback(trimmed);
                                            setFeedbacks([...feedbacks.slice(0, -1), trimmed]);

                                            persistFeedback(trimmed, false); // 🔥 save hiring feedback

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

                {/* ------------------------------------------------------------------ */}
                {/*  APPLICANT FEEDBACK (Status === "Offered")                          */}
                {/* ------------------------------------------------------------------ */}
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

                        {/* custom applicant feedback */}
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
                                        const exists = getApplicantFeedback.some((i) => i.label === trimmed);

                                        if (trimmed && !exists) {
                                            const updated = [...getApplicantFeedback];
                                            const nextId =
                                                updated
                                                    .filter((i) => typeof i.value === "number")
                                                    .reduce((m, i) => Math.max(m, Number(i.value)), 0) + 1;

                                            updated.splice(-1, 0, { label: trimmed, value: nextId });

                                            setApplicantFeedbackDropdown(updated);
                                            setHiringFeedback(updated);
                                            setApplicantFeedback(trimmed);

                                            persistFeedback(trimmed, true); // 🔥 save applicant feedback

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
