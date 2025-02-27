import { IconAlarmPlus, IconCalendarPlus, IconFileCheck, IconFileExcel, IconUserPin, IconUsers, IconUserUp } from "@tabler/icons-react";
import { ChartNoAxesCombined, Trello } from "lucide-react";
import { Reports } from "@modules/Reports/types"
export const reports = [
    {
        icon: <IconUserUp strokeWidth={1} />,
        name: "Source Efficiency Report",
        description: "Analyzes the effectiveness of various recruiting sources.",
        type: Reports.sourceEfficiencyReport
    },
    {
        icon: <IconUserPin strokeWidth={1} />,
        name: "Location Summary",
        description: " Provides an overview of applicant locations and distribution.",
        type: Reports.locationSummary
    },
    {
        icon: <IconUsers strokeWidth={1} />,
        name: "Position Report",
        description: "Provides an overview of open positions and candidate progress",
        type: Reports.positionReport
    },
    {
        icon: <IconCalendarPlus strokeWidth={1} />,
        name: "Time to Fill",
        description: "Summary of the duration between job posting and position fulfillment.",
        type: Reports.timeToFill
    },
    {
        icon: <ChartNoAxesCombined strokeWidth={1} />,
        name: "Applicant Status Report",
        description: "Provide summary of applicants under specific status.",
        type: Reports.applicantStatusReport
    },
    {
        icon: <Trello strokeWidth={1} />,
        name: "Recruitment Activity Report",
        description: "Summary of interview attendance and job offers extended.",
        type: Reports.recruitmentActivityReport
    },
    {
        icon: <IconAlarmPlus strokeWidth={1} />,
        name: "Time to Hire",
        description: "Tracks duration of the hiring process from application to hire.",
        type: Reports.timeToHire
    },
    {
        icon: <IconFileCheck strokeWidth={1} />,
        name: "Offer Acceptance Report",
        description: "Analysis of offer acceptance rates by department.",
        type: Reports.offerAcceptanceReport
    },
    {
        icon: <IconFileExcel strokeWidth={1}  />,
        name: "Offer Rejection Summary",
        description: "Provide summary of applicants' feedback on declined offers.",
        type: Reports.offerRejectionSummary
    }
]

export const source = [
    'Employee Referal',
    'JobStreet',
    'Walk-in',
    'Word of Mouth',
    'Head Hunter',
    'Others',
]