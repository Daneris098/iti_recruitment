import { Button, Combobox, Divider, Menu, Textarea, TextInput, useCombobox } from "@mantine/core";
import { IconChevronDown, IconCirclePlus, IconX } from "@tabler/icons-react";
import { useFeedbacksStore } from "@modules/Applicants/store"

interface DropDownArchiveddProps {
    onClose: () => void;
}

export default function DropDownArchived({ onClose }: DropDownArchiveddProps) {

    const {
        status, setStatus,
        feedback, setFeedback,
        comments, setComments
    } = useFeedbacksStore();  // Use Zustand

    const feedbacks = ["Inactive", "Not Qualified", "Budget Constraint", "Add Feedback"]; // Default feedbacks (For Feedbacks DropDown)

    // To activate the comboBox of feedbacks field.
    const feedbacksComboBox = useCombobox({
        onDropdownClose: () => feedbacksComboBox.resetSelectedOption(),
    })

    return (
        <div className="p-9">

            {/* Header */}
            <div >
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-[#559CDA] text-[22px]">Update Applicant Status</h1>
                    <IconX className="w-[15px] h-[15px] cursor-pointer" onClick={onClose}
                    />
                </div>
                <Divider size={2} color="#6D6D6D99" className="w-full mt-2" />
            </div>

            {/* Start of form */}
            <form className="space-y-4 mt-4">

                {/* Status Dropdown */}
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1">
                        Status <span className="text-[#F14336]">*</span>
                    </h3>

                    <div>
                        <Menu withinPortal={false}>
                            <Menu.Target>
                                <Button
                                    className="relative flex items-center w-[540px] h-[56px] px-4
                                    bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D]
                                    hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D]">
                                    <span className="text-left font-medium text-[#6D6D6D99] ">
                                        {status}
                                    </span>
                                    <IconChevronDown size={16} className="absolute right-4" />
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown className="border border-[#6D6D6D]">
                                <Menu.Item onClick={() => setStatus("For Interview")}>For Interview</Menu.Item>
                                <Menu.Item onClick={() => setStatus("Offered")}>Offered</Menu.Item>
                                <Menu.Item onClick={() => setStatus("Archived")}>Archived</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </div>

                {/* Feedbacks field */}
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1">
                        Feedback <span className="text-[#F14336]">*</span>
                    </h3>
                    <Combobox store={feedbacksComboBox} withinPortal={false}>
                        <Combobox.Target>
                            <TextInput
                                value={feedback}
                                onChange={(e) => setFeedback(e.currentTarget.value)}
                                onFocus={() => feedbacksComboBox.openDropdown()}
                                rightSection={<IconChevronDown size={16} />}
                                placeholder="Select feedback below"
                                classNames={{
                                    input: "relative flex items-center w-[540px] h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                                }}
                                required
                            />
                        </Combobox.Target>

                        {feedbacks.length > 0 && (
                            <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg">
                                {feedbacks.map((feedback) => (
                                    <Combobox.Option
                                        key={feedback}
                                        value={feedback}
                                        onClick={() => {
                                            setFeedback(feedback);
                                            feedbacksComboBox.closeDropdown();
                                        }}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition flex items-center">
                                        <span>{feedback}</span>
                                        {feedback === "Add Feedback" && <IconCirclePlus className="text-[#5A9D27] ml-auto w-[18] h-[18px]" />}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Dropdown>
                        )}
                    </Combobox>
                </div>

                {/* Comment and suggestion text input */}
                <div>
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1">
                        Comments
                    </h3>
                    <Textarea
                        placeholder="Type here"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        autosize
                        minRows={4}
                        classNames={{
                            input: "w-[540px] h-[98px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                        }}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-between pt-4">
                    <Button className="bg-transparent text-[#559CDA] px-6 py-3 rounded-lg border-[#559CDA] font-medium text-[15px]"
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" className="custom-gradient  text-white px-6 py-3 rounded-lg">
                        {"Generate Offer".toUpperCase()}
                    </Button>
                </div>
                
            </form>
        </div>
    )
}
