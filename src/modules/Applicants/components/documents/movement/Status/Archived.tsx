import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useFeedbacksStore } from "@src/modules/Applicants/store";
import { IconCaretDownFilled, IconCirclePlus } from "@tabler/icons-react";

export default function ArchivedStatus() {

    const feedbacksComboBox = useCombobox({
        onDropdownClose: () => feedbacksComboBox.resetSelectedOption(),
    })
    const feedbacks = ["Inactive", "Not Qualified", "Budget Constraint", "Add Feedback"]; // Default feedbacks (For Feedbacks DropDown)
    const {
        feedback, setFeedback,
    } = useFeedbacksStore();  // Use Zustand

    return (
        <div>
            {/* Feedbacks field */}
            <div className="pb-4">
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
                                input: "poppins relative flex items-center w-[540px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
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
        </div>
    )
}