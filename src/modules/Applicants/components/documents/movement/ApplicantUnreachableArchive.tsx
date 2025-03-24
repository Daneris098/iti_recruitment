import { Button, Combobox, Menu, Textarea, TextInput, useCombobox } from "@mantine/core";
import { useDropDownOfferedStore, useFeedbacksStore } from "@src/modules/Applicants/store";
import { IconCaretDownFilled, IconCirclePlus } from "@tabler/icons-react";


interface DropDrowOfferedProps {
    Status: string;
    onClose: () => void;
}

export default function ApplicantUnreachableArchived({ Status }: DropDrowOfferedProps) {

    const feedbacksComboBox = useCombobox({
        onDropdownClose: () => feedbacksComboBox.resetSelectedOption(),
    })
    const feedbacks = ["Inactive", "Not Qualified", "Budget Constraint", "Add Feedback"]; // Default feedbacks (For Feedbacks DropDown)
    const {
        feedback, setFeedback,
    } = useFeedbacksStore();  // Use Zustand

    const {
        setStatus,
        comments, setComments
    } = useDropDownOfferedStore();

    return (
        <div className="p-9">

            <div>
                <h3 className="font-medium text-[#6D6D6D] text-[15px] mb-[-10px] pb-3 poppins">
                    Status <span className="text-[#F14336] poppins">*</span>
                </h3>

                <div>
                    <Menu withinPortal={false}>
                        <Menu.Target>
                            <Button
                                className="
                                                    relative flex items-center w-[540px] h-[56px] px-4
                                                    bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D]
                                                    hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] poppins"
                            >
                                <span className="text-left font-medium text-[#6D6D6D99] ">{Status}</span>
                                <IconCaretDownFilled size={16} className="absolute right-4" />
                            </Button>
                        </Menu.Target>

                        {/* This are the choices the user will initially see upon clicking the Update Status Button inside the view applicants modal. */}
                        <Menu.Dropdown className="border border-gray-300 rounded-[10px]" style={{ width: "540px", fontFamily: "poppins" }}>
                            <Menu.Item onClick={() => setStatus("For Interview")}>For Interview</Menu.Item>
                            <Menu.Item onClick={() => setStatus("Offered")}>Offered</Menu.Item>
                            <Menu.Item onClick={() => setStatus("Archived")}>Archived</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </div>
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
            <div>
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">Comments</h3>
                <Textarea
                    placeholder="Type here"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    autosize
                    minRows={4}
                    classNames={{
                        input: "poppins pt-2 w-[540px] h-[98px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                    }}
                />
            </div>

        </div>
    )
}