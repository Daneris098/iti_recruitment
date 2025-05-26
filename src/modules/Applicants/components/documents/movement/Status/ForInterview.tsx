import { IconCaretDownFilled } from "@tabler/icons-react";
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { useDropDownOfferedStore } from "@src/modules/Applicants/store";
import DatePicker from "@modules/Applicants/components/picker/DatePicker"
import TimePicker from "@modules/Applicants/components/picker/TimePicker";
import interviewJSON from "@modules/Applicants/constants/json/interview.json";

export default function ForInterview() {

    const {
        getInterviewer, setInterviewer,
        interviewDate, setInterviewDate,
        interviewTime, setInterviewTime,
        setInterviewerID, setInterviewStages,
        setInterviewStagesId, interviewStages,
        interviewLocation, setInterviewLocation
    } = useDropDownOfferedStore();
    const interviewerCombobox = useCombobox({ onDropdownClose: () => interviewerCombobox.resetSelectedOption(), })
    const interviewStagesComboBox = useCombobox({ onDropdownClose: () => interviewStagesComboBox.resetSelectedOption(), })

    const interviewerOptions = interviewJSON[0].interviewer.map((interviewer) => ({
        value: interviewer.id,
        label: interviewer.name
    }));

    const interviewStagesOptions = interviewJSON[0].interviewStages.map((interviewStages) => ({
        value: interviewStages.id,
        label: interviewStages.name
    }))

    return (
        <div>
            <div>
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins">
                    Interview Stages <span className="text-[#F14336] poppins">*</span>
                </h3>
                <Combobox store={interviewStagesComboBox} withinPortal={false}>
                    <Combobox.Target>
                        <TextInput
                            value={interviewStages}
                            onChange={(e) => setInterviewStages(e.currentTarget.value)}
                            // onFocus={() => interviewerCombobox.openDropdown()}
                            onFocus={(e) => {
                                if (document.activeElement === e.currentTarget) {
                                    interviewStagesComboBox.openDropdown();
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

                    {interviewStagesOptions.length > 0 && (
                        <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                            {interviewStagesOptions.map((interviewStages) => (
                                <Combobox.Option
                                    key={interviewStages.value}
                                    value={interviewStages.label}
                                    onClick={() => {
                                        setInterviewStages(interviewStages.label);
                                        setInterviewStagesId(interviewStages.value);
                                        interviewStagesComboBox.closeDropdown();
                                    }}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition poppins"
                                >
                                    {interviewStages.label}
                                </Combobox.Option>
                            ))}
                        </Combobox.Dropdown>
                    )}
                </Combobox>
            </div>

            <div className="flex gap-4 pt-4">
                <div className="w-1/2">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Date <span className="text-[#F14336]">*</span>
                    </h3>

                    <DatePicker
                        label=""
                        value={interviewDate}
                        onChange={(date) => {
                            setInterviewDate(date ?? "No valid Date");
                        }}
                        placeholder="mm-dd-yyyy"
                    />


                </div>

                <div className="w-1/2">
                    <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins">
                        Time <span className="text-[#F14336]">*</span>
                    </h3>
                    <TimePicker selectedTime={interviewTime} onTimeChange={setInterviewTime} />
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

                    {interviewerOptions.length > 0 && (
                        <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                            {interviewerOptions.map((interview) => (
                                <Combobox.Option
                                    key={interview.value}
                                    value={interview.label}
                                    onClick={() => {
                                        setInterviewer(interview.label);
                                        setInterviewerID(interview.value);
                                        interviewerCombobox.closeDropdown();
                                    }}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition poppins"
                                >
                                    {interview.label}
                                </Combobox.Option>
                            ))}
                        </Combobox.Dropdown>
                    )}
                </Combobox>
            </div>
            <div>
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pb-1 poppins pt-4">
                    Location <span className="text-[#F14336]">*</span>
                </h3>
                <TextInput
                    type="text"
                    placeholder="Set Interview Location"
                    value={interviewLocation}
                    onChange={(e) => setInterviewLocation(e.target.value)}
                    classNames={{
                        input: "poppins relative flex items-center w-full h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                    }}
                    required
                />
            </div>
        </div>
    )
}