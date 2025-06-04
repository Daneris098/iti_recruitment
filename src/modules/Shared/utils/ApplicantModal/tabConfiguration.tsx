import PersonalDetails from "@src/modules/Applicants/components/documents/tabs/PersonalDetails";
import ApplicationMovement from "@src/modules/Applicants/components/documents/tabs/ApplicationMovement";
import TransferDetails from "@src/modules/Applicants/components/documents/tabs/TransferDetails";

interface TabParams {
    applicantName: string;
    status: string;
    remarks: string;
}
// debugger;
export const getTabs = ({ applicantName, status, remarks }: TabParams) => [
    {
        value: "personal",
        label: "Personal Details",
        component: <PersonalDetails />,
    },
    {
        value: "application",
        label: "Application Movement",
        component: (
            <ApplicationMovement
                applicantName={applicantName}
                status={status}
                remarks={remarks}
            />
        ),
    },
    ...(status === "Transferred"
        ? [
            {
                value: "transfer_details",
                label: "Transfer Details",
                component: <TransferDetails />,
            },
        ]
        : []),
];
