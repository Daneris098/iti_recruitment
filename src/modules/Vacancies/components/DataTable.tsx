import 'mantine-datatable/styles.layer.css';
import { DataTable } from 'mantine-datatable';
import Vacancies from '@src/modules/Vacancies/values/response/Vacancies.json';
import { useEffect, useState } from 'react';
import { VacancyType } from '../types';
import { VacancyStore, ApplicantStore, DataTableStore } from '../store';
import { useVacancies } from "@modules/Vacancies/hooks/useVacancies";

enum StatusColor {
    Published = '#5A9D27',
    Closed = '#ED8028',
    Overdue = '#FF554A',
}

export default function index() {
    const { setSelectedData } = ApplicantStore();
    const { setSelectedVacancy } = VacancyStore();
    const [vacancyRecords, setVacancyRecords] = useState<VacancyType[]>([]);
    // const [page, setPage] = useState(1);
    // const pageSize = 10;
    // const [sortStatus, setSortStatus] = useState<{ columnAccessor: keyof VacancyType; direction: "asc" | "desc" }>({ columnAccessor: "position", direction: "asc" });
    const { isFetching, isError, error, data } = useVacancies();
    const {totalRecords, page, pageSize, sortStatus,setPage, setPageSize, setSortStatus, time} = DataTableStore();


    useEffect(() => {
        setVacancyRecords(Vacancies as VacancyType[]); // Type assertion    
    }, []);

    const sortedRecords = [...vacancyRecords].sort((a, b) => {
        if (!sortStatus.columnAccessor) return 0;
        const valueA = a[sortStatus.columnAccessor as keyof VacancyType];
        const valueB = b[sortStatus.columnAccessor as keyof VacancyType];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortStatus.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortStatus.direction === 'asc' ? valueA - valueB : valueB - valueA;
        }
        return 0;
    });

    const paginatedRecords = sortedRecords.slice((page - 1) * pageSize, page * pageSize);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };


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
                        <div className='rounded-xl p-1 text-center border border-[#6D6D6D] cursor-pointer text-[#6D6D6D]' onClick={(e) => { e.stopPropagation(); setSelectedData(data); }}>
                            View Applicants
                        </div>
                    ),
                },
            ]}
            paginationText={({ from, to, totalRecords }) => `Showing data ${from} out ${to} of ${totalRecords} entries (${time}) seconds`}

            // totalRecords={vacancyRecords.length}
            // records={paginatedRecords}      

            records={data}
            totalRecords={totalRecords}

            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            sortStatus={sortStatus}
            onSortStatusChange={(sort) => setSortStatus(sort as { columnAccessor: keyof VacancyType; direction: "asc" | "desc" })}
            onRowClick={(val) => {
                setSelectedVacancy(val.record)
            }}
        />
    );
}