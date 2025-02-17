import { IconCirclePlus } from "@tabler/icons-react";

export default function index() {
    return (
        <div className="flex flex-col">
            <div className="flex gap-2">
                <p className="text-[#559CDA] font-bold">Custom Interviewer Stages</p>
                <div>
                    <IconCirclePlus
                        style={{ height: "100%" }}
                        stroke={1.5}
                        color="#5A9D27"
                    />
                </div>
            </div>
            <p className="text-[#6D6D6D]">Customize your interview to align with your orgazination's recruitment process.</p>
        </div>
    )
}