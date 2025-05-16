import { useApplicantStore } from "@modules/Applicants/store";
import { DataTable } from "mantine-datatable";
import applicantsColumns from "@src/modules/Applicants/components/columns/Columns";

interface ViewApplicantsProps {
    Applicant_Name: string;
    Status: string;
    Remarks: string;
    Feedback?: string;
}

export default function ApplicationMovement({ Applicant_Name, Status, Remarks }: ViewApplicantsProps) {
    const { records } = useApplicantStore();

    // Filter records based on props (Applicant_Name & Status)
    const filteredRecords = records.filter(record =>
        record.applicantName === Applicant_Name && record.status === Status
    );

    // Filter columns to only include Application_Date, Status, and Remarks (Comments)
    const filterColumns = applicantsColumns.filter(col =>
        ['Application_Date', 'Status'].includes(col.accessor) ||
        (col.accessor === 'Feedback' && Status === 'Archived')
    );

    // Add Comments column manually via props
    const columnsWithComments = [
        ...filterColumns.filter(col => col.accessor !== 'Status'), // All columns except Status
        {
            accessor: 'Remarks',
            title: <span className='job-offers-table'>Comments</span>,
            render: () => <span>{Remarks}</span>,
        },
        ...filterColumns.filter(col => col.accessor === 'Status') // Move Status to the end
    ];


    return (
        <div className="pt-1">
            <div>
                <DataTable columns={columnsWithComments}
                    records={filteredRecords}
                    sortIcons={{
                        sorted: <span></span>,  // Empty element to remove default icon
                        unsorted: <span></span>,
                    }}
                    className="p-0"
                />
            </div>
        </div>
    );
}
