import { IconAlarmPlus, IconCalendarPlus, IconFileCheck, IconFileExcel, IconUserPin, IconUsers, IconUserUp } from "@tabler/icons-react";
import { ChartNoAxesCombined, Trello } from "lucide-react";
import { Reports } from "@modules/Reports/types"
export const reports = [
    {
        title:'Generate Applicant Source Report',
        icon: <IconUserUp strokeWidth={1} />,
        name: "Source Efficiency Report",
        description: "Analyzes the effectiveness of various recruiting sources.",
        type: Reports.sourceEfficiencyReport
    },
    {
        title: 'Generate Applicant Location Summary',
        icon: <IconUserPin strokeWidth={1} />,
        name: "Location Summary",
        description: " Provides an overview of applicant locations and distribution.",
        type: Reports.locationSummary
    },
    {
        title: 'Generate Position Report',
        icon: <IconUsers strokeWidth={1} />,
        name: "Position Report",
        description: "Provides an overview of open positions and candidate progress",
        type: Reports.positionReport
    },
    {
        title: 'Generate Time to Fill Report',
        icon: <IconCalendarPlus strokeWidth={1} />,
        name: "Time to Fill",
        description: "Summary of the duration between job posting and position fulfillment.",
        type: Reports.timeToFill
    },
    {
        title: 'Generate Applicant Status Report',
        icon: <ChartNoAxesCombined strokeWidth={1} />,
        name: "Applicant Status Report",
        description: "Provide summary of applicants under specific status.",
        type: Reports.applicantStatusReport
    },
    {
        title: 'Generate Recruitment Activity Report',
        icon: <Trello strokeWidth={1} />,
        name: "Recruitment Activity Report",
        description: "Summary of interview attendance and job offers extended.",
        type: Reports.recruitmentActivityReport
    },
    {
        title: 'Generate Time to Hire Report',
        icon: <IconAlarmPlus strokeWidth={1} />,
        name: "Time to Hire",
        description: "Tracks duration of the hiring process from application to hire.",
        type: Reports.timeToHire
    },
    {
        title: 'Generate Offer Acceptance Report',
        icon: <IconFileCheck strokeWidth={1} />,
        name: "Offer Acceptance Report",
        description: "Analysis of offer acceptance rates by department.",
        type: Reports.offerAcceptanceReport
    },
    {
        title: 'Generate Offer Rejection Summary',
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

export const offerAcceptanceData = [
    { month: "Jan", IT: 50, Accounting: 75, Sales: 16.67, HR: 8.33, Admin: 4.17 },
    { month: "Feb", IT: 50, Accounting: 63.16, Sales: 21.05, HR: 15.79, Admin: 5.26 },
    { month: "Mar", IT: 40, Accounting: 80.57, Sales: 20, HR: 15, Admin: 8 },
    { month: "Apr", IT: 25, Accounting: 20, Sales: 80, HR: 40, Admin: 12 },
    { month: "May", IT: 57.14, Accounting: 40, Sales: 85.71, HR: 35.71, Admin: 14.29 },
    { month: "Jun", IT: 75, Accounting: 60, Sales: 80, HR: 45, Admin: 18 },
    { month: "Jul", IT: 25, Accounting: 84.62, Sales: 38.46, HR: 46.15, Admin: 19.23 },
    { month: "Aug", IT: 45, Accounting: 52.94, Sales: 41.18, HR: 47.06, Admin: 17.65 },
    { month: "Sep", IT: 69.23, Accounting: 70, Sales: 30.77, HR: 53.85, Admin: 20.77 },
    { month: "Oct", IT: 32, Accounting: 85.71, Sales: 42.86, HR: 46.43, Admin: 22.86 },
    { month: "Nov", IT: 76, Accounting: 62.5, Sales: 56.25, HR: 46.88, Admin: 21.88 },
    { month: "Dec", IT: 78, Accounting: 72.73, Sales: 27.27, HR: 45.45, Admin: 36.36 },
];