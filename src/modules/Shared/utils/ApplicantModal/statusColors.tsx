
export function StatusBadge({ Status }: { Status: string }) {
    const statusColors: Record<string, string> = {
        "Applied": "bg-[#559CDA]",
        "For Interview": "bg-[#ED8028]",
        "Hired": "bg-[#5A9D27]",
        "Offered": "bg-[#FEC001]",
        "For Transfer": "bg-[#9B51E0]",
        "Archived": "bg-[#FF554A]",
        "Transferred": "bg-[#6D6D6D]",
        "Assessment": "bg-[#ED8028]",
        "Final Interview": "bg-[#FEC001]",
        "Initial Interview": "bg-[#559CDA]",
    };

    const forInterviewStatus = ["Assessment", "Final Interview", "Initial Interview"].includes(Status);
    const bgColor = forInterviewStatus ? "bg-[#ED8028]" : statusColors[Status] || "bg-[#559CDA]";
    const displayText = forInterviewStatus ? "For Interview" : Status;

    return (
        <p className={`text-white rounded-[10px] text-[14px] w-[194px] h-[30px] flex items-center justify-center font-semibold ${bgColor}`
        }>
            {displayText}
        </p>
    );
}
