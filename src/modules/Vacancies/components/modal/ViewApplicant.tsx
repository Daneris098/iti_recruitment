import { Divider, Modal } from "@mantine/core";
import { VacancyStore } from "../../store";
import { selectedDataVal } from "../../values";
import { useEffect, useState } from "react";
import { VacancyType } from "../../types";
import Vacancies from '@src/modules/Vacancies/values/response/Applicants.json';
import { DataTable } from "mantine-datatable";
import "@modules/Vacancies/style.css"


export default function index() {
    const { selectedData, setSelectedData } = VacancyStore();
    const [vacancyRecords, setVacancyRecords] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<{ columnAccessor: keyof VacancyType; direction: "asc" | "desc" }>({
        columnAccessor: "position", // Use a valid key from VacancyType
        direction: "asc",
    });

    const pageSize = 10;

    useEffect(() => {
        setVacancyRecords(Vacancies); // Type assertion
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

    return (
        <>
            <Modal size={'80%'} opened={selectedData != selectedDataVal} centered onClose={() => setSelectedData(selectedDataVal)} title={'View Applicant'}
                className='text-[#559CDA]' styles={{
                    header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}>
                <div className='m-auto w-[95%] '>
                    <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                    <DataTable
                        defaultColumnProps={{
                            textAlign: 'right',
                            noWrap: true,
                            ellipsis: true,
                        }}
                        style={{
                            color: "#6D6D6D",
                        }}
                        withColumnBorders
                        withRowBorders={false}
                        withTableBorder
                        borderRadius="sm"
                        highlightOnHover
                        records={paginatedRecords}
                        columns={[
                            { accessor: 'applied', title: 'Applied', textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.blue[6] })},
                            { accessor: 'forInterview', title: 'For Interview', textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.orange[6] }) },
                            { accessor: 'offered', title: 'Offered', textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.yellow[6] }) },
                            { accessor: 'hired', title: 'Hired', textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.green[6] }) },
                            { accessor: 'archived', title: 'Archived', textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.red[6] }) },
                        ]}
                        totalRecords={vacancyRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={setPage}
                        sortStatus={sortStatus}
                        onSortStatusChange={(sort) => setSortStatus(sort as { columnAccessor: keyof VacancyType; direction: "asc" | "desc" })}
                    />

                </div>
            </Modal>
        </>

    )
}