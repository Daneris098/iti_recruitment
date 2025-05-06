import { DataTable } from 'mantine-datatable';
import { IconCirclePlus } from "@tabler/icons-react";
import { useEffect, useState } from 'react';
import { AdministratorSettingsStore, DialogStore } from '@modules/AdministratorSettings/store';
import { title, description, user, columns } from '@modules/AdministratorSettings/types';
import { useUser } from "@modules/AdministratorSettings/hooks/useUser";

export default function index() {
    const PAGE_SIZE = 15;
    const { activePanel, setSelectedUser } = AdministratorSettingsStore()
    const { setAction } = DialogStore()
    const [page, setPage] = useState(1);
    const { data } = useUser();
    const [sortStatus, setSortStatus] = useState<{ columnAccessor: keyof user; direction: 'asc' | 'desc' }>({
        columnAccessor: 'username',
        direction: 'asc',
    });

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
                records={data}
                columns={(columns as any)[activePanel]}
                totalRecords={data?.length}
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
