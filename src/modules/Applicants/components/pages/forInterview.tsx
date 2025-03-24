import { AppShell } from "@mantine/core";
import ApplicantsMainTable from "@modules/Applicants/components/pages/applicantsTable";

export default function index() {
    return (
        <AppShell className="h-full relative">
            <ApplicantsMainTable />
        </AppShell>
    )
}