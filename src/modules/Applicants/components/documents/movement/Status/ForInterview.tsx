import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useDropDownOfferedStore } from "@src/modules/Applicants/store";
import DatePicker from "@modules/Applicants/components/picker/DatePicker"
import TimePicker from "@modules/Applicants/components/picker/TimePicker";
import { useState } from "react";
import { IconCaretDownFilled } from "@tabler/icons-react";


export default function ForInterview() {


    const {
        fullName, setFullName,
        getInterviewer, setInterviewer,
    } = useDropDownOfferedStore();

    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const [selectedTime, setSelectedTime] = useState("");

    const interviewerCombobox = useCombobox({
        onDropdownClose: () => interviewerCombobox.resetSelectedOption(),
    })


    // These are just a hardcoded information. This will be removed during the integration with the backend.
    const Interviewer = ["HR Kristia", "HR Andrea", "HR Jera"];

    return (
        <div>
            {/*  Name */}
            <div className="pt-4">
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                    Interview Stages <span className="text-[#F14336]">*</span>
                </h3>
                <TextInput
                    type="text"
                    placeholder="Type Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    classNames={{
                        input: "poppins relative flex items-center w-full h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                    }}
                    required
                />
            </div>

            <div className="flex gap-4 pt-4">
                <div className="w-1/2">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Date <span className="text-[#F14336]">*</span>
                    </h3>

                    <DatePicker
                        label=""
                        value={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                        }}
                        placeholder="mm-dd-yyyy"
                    />


                </div>

                <div className="w-1/2">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Time <span className="text-[#F14336]">*</span>
                    </h3>
                    <TimePicker selectedTime={selectedTime} onTimeChange={setSelectedTime} />
                </div>
            </div>

            <div>
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins">
                    Interviewer <span className="text-[#F14336] poppins">*</span>
                </h3>
                <Combobox store={interviewerCombobox} withinPortal={false}>
                    <Combobox.Target>
                        <TextInput
                            value={getInterviewer}
                            onChange={(e) => setInterviewer(e.currentTarget.value)}
                            // onFocus={() => interviewerCombobox.openDropdown()}
                            onFocus={(e) => {
                                if (document.activeElement === e.currentTarget) {
                                    interviewerCombobox.openDropdown();
                                }
                            }}
                            rightSection={<IconCaretDownFilled size={16} />}
                            placeholder="Select Interviewer"
                            classNames={{
                                input: "poppins relative flex items-center w-wull h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                            }}
                            required
                        />
                    </Combobox.Target>

                    {Interviewer.length > 0 && (
                        <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                            {Interviewer.map((interview) => (
                                <Combobox.Option
                                    key={interview}
                                    value={interview}
                                    onClick={() => {
                                        setInterviewer(interview);
                                        interviewerCombobox.closeDropdown();
                                    }}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition poppins"
                                >
                                    {interview}
                                </Combobox.Option>
                            ))}
                        </Combobox.Dropdown>
                    )}
                </Combobox>
            </div>
        </div>
    )
}