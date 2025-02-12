import { DataTable } from 'mantine-datatable';
import { IconCirclePlus } from "@tabler/icons-react";
import { useEffect, useState } from 'react';
import { OrganizationSettingsStore } from '../store';
import { title, description, Company, columns } from '@modules/OrganizationSettings/types';

const PAGE_SIZE = 15;
const data: Company[] = [
    { name: 'John', code: 'insys001', location: 'Quezon City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { name: 'Alice', code: 'insys002', location: 'Caloocan City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { name: 'Bob', code: 'insys003', location: 'Manila City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { name: 'Eve', code: 'insys004', location: 'Mandaluyong City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { name: 'Charlie', code: 'insys005', location: 'Navotas City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' }
];


export default function index() {
    const { activePanel } = OrganizationSettingsStore()
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<Company[]>(data.slice(0, PAGE_SIZE));
    const [searchTerm] = useState('');
    const [sortStatus, setSortStatus] = useState<{ columnAccessor: keyof Company; direction: 'asc' | 'desc' }>({
        columnAccessor: 'name',
        direction: 'asc',
    });

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.code.toLowerCase().includes(searchTerm.toLowerCase())
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
                    {title[activePanel as keyof typeof title]}<IconCirclePlus color="green" />
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
                withTableBorder
                records={records}
                columns={(columns as any)[activePanel]}
                totalRecords={data.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.code.toLowerCase().includes(searchTerm.toLowerCase())
                ).length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={setPage}
                sortStatus={sortStatus}
                onSortStatusChange={(sort) => setSortStatus(sort as { columnAccessor: keyof Company; direction: 'asc' | 'desc' })}
            />
        </div>
    );
}
