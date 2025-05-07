import { useApplicantIdStore, useApplicantStore } from "@modules/Applicants/store";
import { DataTable } from "mantine-datatable";
import applicantsColumns from "@src/modules/Applicants/components/columns/Columns";
import { useApplicantsById } from "@src/modules/Applicants/hooks/useApplicant";

interface ViewApplicantsProps {
    applicantName: string;
    status: string;
    remarks: string;
    feedback?: string;
}
export default function ApplicationMovement({ applicantName, status,
    // remarks
}: ViewApplicantsProps) {
    const { records } = useApplicantStore();
    const applicantId = useApplicantIdStore((state) => state.id);
    const { data: applicantsById } = useApplicantsById(applicantId);
    const setApplicationMovements = applicantsById?.applicationMovements?.movements || [];
    const setCommentsMovement = applicantsById?.commentsByID || [];
    const filteredRecords = records.filter(record => record.applicantName === applicantName);

    const movementsRecords = filteredRecords.flatMap(record =>
        Array.isArray(setApplicationMovements) && Array.isArray(setCommentsMovement)
            ? setApplicationMovements.reverse().map((movement: any, index: number) => ({
                ...record,
                id: `${record.id}-${index}`,
                movement: movement === "Ready for Transfer" ? "Transferred" : movement,
                comments: setCommentsMovement[index] || null,
            }))
            : []
    );

    const allowedAccessors = ['applicationDate', 'movement', 'comments'];

    if (status === 'Archived') {
        allowedAccessors.push('feedback');
    }

    const filterColumns = applicantsColumns.filter(col =>
        allowedAccessors.includes(col.accessor)
    );

    const columnsWithComments = [
        ...filterColumns.filter(col => col.accessor !== 'movement'),
        ...filterColumns.filter(col => col.accessor === 'movement')
    ];

    return (
        <div className="pt-1 pb-40 poppins">
            <div>
                <DataTable columns={columnsWithComments}
                    records={movementsRecords}
                    sortIcons={{
                        sorted: <span></span>,
                        unsorted: <span></span>,
                    }}
                    className="poppins font-medium text-[#6D6D6D] text-[14px]"
                />
            </div>
        </div>
    );
}