import { DataTable } from 'mantine-datatable';
import { IconCirclePlus } from "@tabler/icons-react";
import { useEffect, useState } from 'react';

const PAGE_SIZE = 15;

type Company = {
    name: string;
    code: string;
};

const data: Company[] = [
    { name: 'John', code: 'insys001' },
    { name: 'Alice', code: 'insys002' },
    { name: 'Bob', code: 'insys003' },
    { name: 'Eve', code: 'insys004' },
    { name: 'Charlie', code: 'insys005' }
];

export default function CompanyList() {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<Company[]>(data.slice(0, PAGE_SIZE));
    const [searchTerm, setSearchTerm] = useState('');
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
                    Company List <IconCirclePlus color="green" />
                </div>
                <p>List all your companies below.</p>
            </div>
            <DataTable
                withTableBorder
                records={records}
                columns={[
                    { accessor: 'name', title: 'Name', sortable: true },
                    { accessor: 'code', title: 'Code', sortable: true },
                ]}
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
