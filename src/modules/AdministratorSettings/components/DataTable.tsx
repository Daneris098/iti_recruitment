import { DataTable } from 'mantine-datatable';
import { IconCirclePlus } from "@tabler/icons-react";
import { useEffect, useState } from 'react';
import { AdministratorSettingsStore, DialogStore } from '@modules/AdministratorSettings/store';
import { title, description, user, columns } from '@modules/AdministratorSettings/types';

const PAGE_SIZE = 15;
const data = [
    { username: 'insys001', lastname: 'Doe', firstname: 'John', email: 'john.doe@example.com', status: 'Active' },
    { username: 'insys002', lastname: 'Smith', firstname: 'Alice', email: 'alice.smith@example.com', status: 'Active' },
    { username: 'insys003', lastname: 'Johnson', firstname: 'Bob', email: 'bob.johnson@example.com', status: 'Active' },
    { username: 'insys004', lastname: 'Brown', firstname: 'Eve', email: 'eve.brown@example.com', status: 'Active' },
    { username: 'insys005', lastname: 'Williams', firstname: 'Charlie', email: 'charlie.williams@example.com', status: 'Active' }
];



export default function index() {
    const { activePanel, setSelectedUser } = AdministratorSettingsStore()
    const { setAction } = DialogStore()
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<user[]>(data.slice(0, PAGE_SIZE));
    const [searchTerm] = useState('');
    const [sortStatus, setSortStatus] = useState<{ columnAccessor: keyof user; direction: 'asc' | 'desc' }>({
        columnAccessor: 'username',
        direction: 'asc',
    });

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        const filteredData = data.filter(item =>
            item.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sortedData = [...filteredData].sort((a, b) => {
            const valueA = a[sortStatus.columnAccessor];
            const valueB = b[sortStatus.columnAccessor];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortStatus.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }
            return 0;
        });

        setRecords(sortedData.slice(from, to));
    }, [page, searchTerm, sortStatus]);

    return (
        <div className="flex flex-col h-full ">
            <div className='flex flex-col mb-4'>
                <div className="text-[#559CDA] font-bold flex gap-2 items-center">
                    {title[activePanel as keyof typeof title]}<IconCirclePlus className='cursor-pointer' color="green" onClick={() => { setAction('New') }} />
                </div>
                <p className='text-[#6D6D6D]'>{description[activePanel as keyof typeof description]}</p>
            </div>
            <DataTable
                style={{
                    color: "#6D6D6D",
                    fontWeight: 500,
                }}
                styles={{
                    header: {
                        color: "rgba(109, 109, 109, 0.6)",
                        fontWeight: 500,
                    },
                    root: {
                        color: "rgba(0, 0, 0, 0.6)",
                    },
                }}
                paginationText={({ from, to, totalRecords }) => `Showing data ${from} out ${to} of ${totalRecords} entries (0.225) seconds`}
                withTableBorder
                records={records}
                columns={(columns as any)[activePanel]}
                totalRecords={data.filter(item =>
                    item.username.toLowerCase().includes(searchTerm.toLowerCase())
                ).length}
                onRowClick={({ record }) => {
                    setSelectedUser(record)
                }
                }
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={setPage}
                sortStatus={sortStatus}
                onSortStatusChange={(sort) => setSortStatus(sort as { columnAccessor: keyof user; direction: 'asc' | 'desc' })}
            />
        </div>
    );
}
