import { useHiredStartDate } from "@modules/Shared/store";
import DropZone from "@modules/Applicants/components/dropzone/Dropzone";
import CustomDatePicker from "@modules/Applicants/components/picker/DatePicker";
import { IconPaperclip, IconTrash } from "@tabler/icons-react";
import { useFileUploadStore } from "@src/modules/Applicants/store";

export default function Hired() {
    const { selectedDate, setSelectedDate } = useHiredStartDate();
    const { fileName, clearFile } = useFileUploadStore();
    return (
        <div>
            <div>
                <h3 className="font-medium text-[#6D6D6D] text-[15px] pt-4 poppins">
                    Start Date <span className="text-[#F14336]">*</span>
                </h3>
                <CustomDatePicker
                    label=""
                    value={selectedDate}
                    onChange={setSelectedDate}
                    placeholder="Enter Date"
                />
            </div>

            <p className="mt-4 mb-4 font-medium text-[14px] text-[#6D6D6D] poppins">
                Please upload the job offer signed by both the authorized signatories and the applicant.
                <span className="text-[#F14336] poppins">*</span>
            </p>
            <DropZone />
            {fileName && (
                <div className="text-left mt-2 border-[1.5px] border-[#6D6D6D] p-3 rounded-md">
                    <div className="flex justify-center items-center gap-2 text-[13px] text-[#6D6D6D] poppins">
                        <IconPaperclip size={14} />
                        <span>{fileName}</span>
                        <IconTrash
                            className="text-[#6D6D6D] cursor-pointer ml-[80px]"
                            size={22}
                            onClick={clearFile}
                        />
                    </div>
                </div>
            )}

        </div>
    )
}