import 'mantine-datatable/styles.layer.css';
import { DataTable } from 'mantine-datatable';
import { useEffect } from 'react';
import { VacancyType } from '../types';
import { VacancyStore, ApplicantStore, DataTableStore } from '../store';
import { useVacancies } from "@modules/Vacancies/hooks/useVacancies";
import { useQueryClient } from '@tanstack/react-query';
import { selectedDataVal } from '../values';

enum StatusColor {
    Published = '#5A9D27',
    Closed = '#ED8028',
    Overdue = '#FF554A',
}

export default function index() {
    const { page, pageSize, sortStatus, setPage, setSortStatus, time } = DataTableStore();
    const { selectedData, setSelectedData } = ApplicantStore();
    const { isFetching, data } = useVacancies();
    const { setSelectedVacancy } = VacancyStore();
    const queryClient = useQueryClient();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    useEffect(() => {
        if (selectedData != selectedDataVal) {
            queryClient.refetchQueries({ queryKey: ["recruitment/applicants"], type: 'active' });
        }
    }, [selectedData])

    return (
        <DataTable
            style={{
                color: "#6D6D6D",
            }}
            withTableBorder
            borderRadius="sm"
            highlightOnHover
            fetching={isFetching}
            loaderType="dots"
            loaderSize="lg"
            loaderColor="blue"
            loaderBackgroundBlur={1}
            columns={[
                { accessor: 'position', title: 'Vacancy', textAlign: "left", sortable: true },
                {
                    accessor: 'datePublish', title: 'Publish Date', textAlign: "left", sortable: true,
                    render: ({ datePublish }) => formatDate(datePublish)
                },
                { accessor: 'interviewer', title: 'Interviewer', textAlign: "left", sortable: true },
                { accessor: 'department', title: 'Department', textAlign: "left", sortable: true },
                { accessor: 'quantity', title: 'Quantity', textAlign: "center", sortable: true },
                { accessor: 'totalApplicant', title: 'Total Applicant', textAlign: "center", sortable: true },
                {
                    accessor: 'status', title: 'Status', textAlign: "center", sortable: true,
                    render: ({ status }) => (
                        <div className='rounded-xl text-white text-center p-1' style={{ background: StatusColor[status as keyof typeof StatusColor] || 'gray' }}>
                            {status}
                        </div>
                    ),
                },
                {
                    accessor: '',
                    title: 'Action',
                    textAlign: "center",
                    render: (data) => (
                        <div className='rounded-xl p-1 text-center border border-[#6D6D6D] cursor-pointer text-[#6D6D6D]' onClick={(e) => {
                            e.stopPropagation();
                            setSelectedData(data);
                        }}>
                            View Applicants
                        </div>
                    ),
                },
            ]}
            paginationText={({ from, to, totalRecords }) => `Showing data ${from} to ${to} of ${totalRecords} entries (${time}) seconds`}
            records={data}
            totalRecords={data?.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            sortStatus={sortStatus}
            onSortStatusChange={(sort) => setSortStatus(sort as { columnAccessor: keyof VacancyType; direction: "asc" | "desc" })}
            onRowClick={(val) => { setSelectedVacancy(val.record) }}
        />
    );
}