import 'mantine-datatable/styles.layer.css';
import { DataTable } from 'mantine-datatable';
import Vacancies from '@src/modules/Vacancies/values/response/Vacancies.json';
import { useEffect, useState } from 'react';
import { VacancyType } from '../types';
import { VacancyStore } from '../store';

enum StatusColor {
    Published = '#5A9D27',
    Closed = '#ED8028',
    Overdue = '#FF554A',
}

export default function index() {
    const { setSelectedData } = VacancyStore();
    const [vacancyRecords, setVacancyRecords] = useState<VacancyType[]>([]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<{ columnAccessor: keyof VacancyType; direction: "asc" | "desc" }>({
        columnAccessor: "position", // Use a valid key from VacancyType
        direction: "asc",
    });

    const pageSize = 10;

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
            records={paginatedRecords}
            columns={[
                { accessor: 'position', title: 'Vacancy', textAlign: "left", sortable: true },
                {
                    accessor: 'datePublish',
                    title: 'Publish Date',
                    textAlign: "left",
                    sortable: true,
                    render: ({ datePublish }) => formatDate(datePublish)
                },
                { accessor: 'interviewer', title: 'Interviewer', textAlign: "left", sortable: true },
                { accessor: 'department', title: 'Department', textAlign: "left", sortable: true },
                { accessor: 'quantity', title: 'Quantity', textAlign: "center", sortable: true },
                {
                    accessor: 'status',
                    title: 'Status',
                    textAlign: "center",
                    sortable: true,
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
                        <div className='rounded-xl p-1 text-center border border-black cursor-pointer' onClick={() => { setSelectedData(data) }}>
                            View Applicant
                        </div>
                    ),
                },
            ]}
            totalRecords={vacancyRecords.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            sortStatus={sortStatus}
            onSortStatusChange={(sort) => setSortStatus(sort as { columnAccessor: keyof VacancyType; direction: "asc" | "desc" })}

        />
    );
}