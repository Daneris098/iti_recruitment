import CustomDatePicker from "@modules/Applicants/components/picker/DatePicker"
// import { IconCloudUpload } from "@tabler/icons-react";
import { useState } from "react";
import DropZone from "@modules/Applicants/components/dropzone/Dropzone";

export default function Hired() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
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
        </div>
    )
}