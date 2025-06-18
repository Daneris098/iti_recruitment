import { useEffect, useState } from "react";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useApplicantIdStore } from "@src/modules/Shared/store";
import { Combobox, TextInput, useCombobox } from "@mantine/core";
import { interviewStagesOption } from "@modules/Applicants/types";
import { useDropDownOfferedStore } from "@src/modules/Applicants/store";
import DatePicker from "@modules/Applicants/components/picker/DatePicker"
import TimePicker from "@modules/Applicants/components/picker/TimePicker";
import { useViewInterviewStages, useViewInterviewers } from "@modules/Shared/hooks/useSharedApplicants"
import { fetchApplicantByIdService, } from '@src/modules/Shared/utils/GetApplicantById/applicantServiceById';

export default function ForInterview() {
    const [, setError] = useState<unknown>(null);
    const [, setIsLoading] = useState(false);

    const token = sessionStorage.getItem("accessToken") ?? undefined;
    const applicantId = useApplicantIdStore((state) => state.id);

    const [applicant, setApplicant] = useState<any | null>(null);

    useEffect(() => {
        if (!applicantId || !token) return;

        setIsLoading(true);
        fetchApplicantByIdService(applicantId, token)
            .then(setApplicant)
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [applicantId, token]);

    const { data: getInterviewStages } = useViewInterviewStages();
    const { data: getInterviewers } = useViewInterviewers();

    const [interviewStagesOptions, setInterviewStagesOptions] = useState<interviewStagesOption[]>([]);
    const [getInterViewerNames, setInterviewerNames] = useState<interviewStagesOption[]>([]);

    const interviewStagesFromLastSchedule = applicant?.interviewSchedules?.at(-1)?.schedule?.interviewStage;

    useEffect(() => {
        if (!getInterviewStages || !getInterviewers) return;

        const interviewStages = getInterviewStages.stages.map((stage: any) => ({
            value: stage.id,
            label: stage.name,
        }));
        setInterviewStagesOptions(interviewStages);

        const interviewersName = getInterviewers.interviewersName.map((names: any) => ({
            value: names.id,
            label: names.name
        }))
        setInterviewerNames(interviewersName);

    }, [getInterviewStages]);

    useEffect(() => {
        if (interviewStagesFromLastSchedule) {
            setInterviewStages(interviewStagesFromLastSchedule.name);
            setInterviewStagesId(interviewStagesFromLastSchedule.id);
        }
    }, [interviewStagesFromLastSchedule]);

    const {
        getInterviewer, setInterviewer,
        interviewDate, setInterviewDate,
        interviewTime, setInterviewTime,
        setInterviewerID, setInterviewStages,
        setInterviewStagesId, interviewStages,
        interviewLocation, setInterviewLocation
    } = useDropDownOfferedStore();
    const interviewerCombobox = useCombobox({ onDropdownClose: () => interviewerCombobox.resetSelectedOption() })
    const interviewStagesComboBox = useCombobox({ onDropdownClose: () => interviewStagesComboBox.resetSelectedOption() })

    const defaultLocation = "12 Catanduanes, Quezon City, 1105 Metro Manila";

    const handleBlur = () => {
        if (!interviewLocation.trim()) {
            setInterviewLocation(defaultLocation);
        }
    };

    useEffect(() => {
        if (Array.isArray(interviewStagesOptions) && interviewStagesOptions.length > 0) {
            const [firstStage] = interviewStagesOptions;
            if (firstStage?.label && firstStage?.value !== undefined) {
                setInterviewStages(firstStage.label);
                setInterviewStagesId(firstStage.value);
            }
        }

        if (Array.isArray(getInterViewerNames) && getInterViewerNames.length > 0) {
            const [firstInterviewer] = getInterViewerNames;
            if (firstInterviewer?.label && firstInterviewer?.value !== undefined) {
                setInterviewer(firstInterviewer.label);
                setInterviewerID(firstInterviewer.value);
            }
        }
    }, [interviewStagesOptions, getInterViewerNames]);


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
                            onFocus={(e) => {
                                if (document.activeElement === e.currentTarget) {
                                    interviewStagesComboBox.openDropdown();
                                }
                            }}
                            rightSection={<IconCaretDownFilled size={16} />}
                            placeholder="Select Interviewer"
                            classNames={{
                                input: "poppins relative flex items-center w-full h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
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

                    {getInterViewerNames.length > 0 && (
                        <Combobox.Dropdown className="border border-gray-300 rounded-md shadow-lg poppins">
                            {getInterViewerNames.map((interview) => (
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
                    placeholder={defaultLocation}
                    value={interviewLocation}
                    onChange={(e) => setInterviewLocation(e.currentTarget.value)}
                    onBlur={handleBlur}
                    classNames={{
                        input:
                            "poppins relative flex items-center w-full h-[56px] px-4 bg-white border border-[#6D6D6D] rounded-lg text-[#6D6D6D] hover:bg-white hover:border-[#6D6D6D] hover:text-[#6D6D6D] text-[14px] text-[#6D6D6D99]",
                    }}
                    required
                />
            </div>
        </div >
    )
}