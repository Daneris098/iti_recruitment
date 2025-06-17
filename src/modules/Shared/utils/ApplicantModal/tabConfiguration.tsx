import PersonalDetails from '@src/modules/Shared/components/viewApplicants/tabs/PersonalDetails';
import TransferDetails from '@src/modules/Shared/components/viewApplicants/tabs/TransferDetails';
import ApplicationMovement from '@src/modules/Shared/components/viewApplicants/tabs/ApplicationMovement';
interface TabParams {
    applicantName: string;
    status: string;
    remarks: string;
}

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
