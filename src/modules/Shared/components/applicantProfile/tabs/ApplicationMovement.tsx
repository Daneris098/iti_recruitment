import { DataTable } from "mantine-datatable";
import { useApplicantIdStore } from "@modules/Shared/store";
import { getCombinedColumns } from "@src/modules/Shared/components/columns";
import { useApplicantsById } from "@modules/Shared/hooks/useSharedApplicants";
import {
    FEEDBACK, MOVEMENT,
    TRANSFERRED, READY_FOR_TRANSFER,
    ALLOWED_ACCESSORS_BASE, ARCHIVED,
    COLUMN_ACCESSOR_DATE_APPLIED, COLUMN_HEADER_DATE
} from "@modules/Shared/utils/constants";

export default function ApplicationMovement({
    status, applicantName: _applicantName, remarks: _remarks
}: { status: string, applicantName: string, remarks: string }) {

    const allowedAccessors = [...ALLOWED_ACCESSORS_BASE];

    const applicantId = useApplicantIdStore((state) => state.id);
    const { data: applicantsById } = useApplicantsById(applicantId);

    const setCommentsMovement = applicantsById?.commentsByID || [];
    const allColumns = getCombinedColumns({ includeApplicants: true });
    const setApplicationMovements = applicantsById?.applicationMovements?.movements || [];
    const filteredColumns = allColumns.filter(col => allowedAccessors.includes(col.accessor));
    const setApplicationDates = applicantsById?.applicationMovements?.movementLastModifiedDate || [];

    const movementsRecords =
        Array.isArray(setApplicationMovements) && Array.isArray(setCommentsMovement)
            ? setApplicationMovements.reverse().map((movement: any, index: number) => ({
                id: `${applicantId}-${index}`,
                movement: formatMovement(movement),
                comments: setCommentsMovement[index] || null,
                applicationDate: setApplicationDates[index] || null,
            })) : [];

    if (status === ARCHIVED) {
        allowedAccessors.push(FEEDBACK);
    }

    const columnsWithComments = [
        ...filteredColumns.filter(col => col.accessor !== MOVEMENT),
        ...filteredColumns.filter(col => col.accessor === MOVEMENT),
    ].map(col => col.accessor === COLUMN_ACCESSOR_DATE_APPLIED ? { ...col, title: COLUMN_HEADER_DATE } : col) // Replace the Column header to "Date";

    function formatMovement(movement: string): string {
        const replacements: Record<string, string> = {
            [READY_FOR_TRANSFER]: TRANSFERRED
        };
        return replacements[movement] || movement
    }

    return (
        <div className="pt-1 pb-40 poppins">
            <div>
                <DataTable
                    columns={columnsWithComments}
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
