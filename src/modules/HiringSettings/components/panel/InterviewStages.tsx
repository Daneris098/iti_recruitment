import { IconCirclePlus } from "@tabler/icons-react";

export default function index() {
    return (
        <div className="flex flex-col">
            <div className="flex gap-2">
                <p className="text-[#559CDA] font-bold">Custom Interview Stages</p>
                <div>
                    <IconCirclePlus
                        style={{  height: "100%" }}
                        stroke={1.5}
                        color="#5A9D27"
                    />
                </div>
            </div>
            <p className="text-[#6D6D6D]">Customize your interview stages to align with your organization's specific recruitment process.</p>
        </div>
    )
}