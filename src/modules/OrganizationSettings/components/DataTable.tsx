import { useState, forwardRef, useImperativeHandle } from 'react';
import { DataTable } from 'mantine-datatable';
import { IconCirclePlus, IconPencil, IconCaretDownFilled } from "@tabler/icons-react";
import { TextInput, Select } from '@mantine/core';
import { OrganizationSettingsStore } from '../store';
import { title, description, Company } from '@modules/OrganizationSettings/types';

const PAGE_SIZE = 15;
const initialData: Company[] = [
    { id: 1, name: 'John', code: 'insys001', location: 'Quezon City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 2, name: 'Alice', code: 'insys002', location: 'Caloocan City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 3, name: 'Bob', code: 'insys003', location: 'Manila City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
];

const DataTableComp = forwardRef((_, ref) => {
    const { activePanel } = OrganizationSettingsStore();
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<Company[]>(initialData.slice(0, PAGE_SIZE));
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
    const [editableData, setEditableData] = useState<{ [key: string]: Partial<Company> }>({});
    const [newRows, setNewRows] = useState<Company[]>([]);
    const toggleEditMode = (id: number) => {
        // Toggle the edit mode for the specific code
        setEditMode(prevEditMode => ({
            ...prevEditMode,
            [id]: !prevEditMode[id],
        }));

        // If switching to edit mode, initialize editable data for the selected row
        if (!editMode[id]) {
            const rowData =
                records.find(item => item.id === id) ||
                newRows.find(item => item.id === id);

            if (rowData) {
                setEditableData(prevEditableData => ({
                    ...prevEditableData,
                    [id]: { ...rowData },
                }));
            }
        }
    };

    const handleEditChange = (id: number, field: keyof Company, value: string) => {
        setEditableData(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const addNewRow = () => {
        const uniqueId = + (Math.floor(Math.random() * 100001 + 1))
        const newRow: Company = {
            id: uniqueId,
            code: ``,
            name: '',
            location: '',
            area: '',
            description: '',
            status: 'active',
            division: '',
            department: '',
            departmentHead: '',
        };
        setNewRows(prev => [...prev, newRow]);
        setEditMode(prev => ({ ...prev, [newRow.id]: true }));
        setEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
    };

    const saveAll = () => {
        let isValid = true;
        Object.values(editableData).forEach(data => {
            const trimmedName = data.name?.trim();
            const trimmedCode = data.code?.trim();

            // Validation check: Ensure name and code are not empty after trimming
            if (!trimmedName || !trimmedCode) {
                console.error('Validation failed: Name or Code is empty after trimming.');
                isValid = false;
            }
        });

        if (!isValid) {
            // alert(isValid)
            return
        };

        setRecords(prevRecords => [...prevRecords, ...newRows].map(record => editableData[record.id] ? { ...record, ...editableData[record.id] } : record));
        setNewRows([]);
        setEditMode({});
        setEditableData({});
    };

    const cancelAll = () => {
        setEditMode({});
        setEditableData({});
        setNewRows([]);
    };

    useImperativeHandle(ref, () => ({
        saveAll: () => {
            saveAll()
        },
        cancelAll: () => {
            cancelAll()
        },
        getData: () => {
            return records;
        }
    }));

    const columns: any = {
        companyList: [
            {
                accessor: 'code', title: 'Code', sortable: true,
                render: (data: any) => editMode[data.id] ? (
                    <TextInput
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={editableData[data.id]?.code || data.code}
                        onChange={(e: any) => handleEditChange(data.id, 'code', e.target.value)}
                    />
                ) : data.code,
            },
            {
                accessor: 'name', title: 'Name', sortable: true,
                render: (data: any) => editMode[data.id] ? (
                    <TextInput
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={editableData[data.id]?.name || data.name}
                        onChange={(e: any) => handleEditChange(data.id, 'name', e.target.value)}
                    />
                ) :
                    <p>{data.name}</p>
            },
            {
                accessor: 'status', title: 'Status', sortable: true,
                render: (data: any) => editMode[data.id] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.id, 'status', val)
                        }}
                        defaultValue={editableData[data.id]?.status || data.status}
                    />
                ) :
                    <div className='flex justify-between'>
                        <p>{data.status}</p>
                        <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                            {editMode[data.id] ? '' : <IconPencil />}
                        </div>
                    </div>,
            }
        ],

        branch: [
            'code', 'name', 'location', 'area', 'description', 'status'
        ].map((field: any) => ({
            accessor: field, title: field.charAt(0).toUpperCase() + field.slice(1), sortable: true,
            render: (data: any) => editMode[data.id] ? (
                field === 'status' && editMode[data.id] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.id, 'status', val)
                        }}
                        defaultValue={editableData[data.id]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={(editableData as any)[data.id]?.[field] || data[field]}
                        onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                                    {editMode[data.id] ? '' : <IconPencil />}
                                </div>
                            </div>
                        )
                    }
                </>,
        })),

        section: [
            'code', 'name', 'division', 'department', 'description', 'status'
        ].map((field: any) => ({
            accessor: field, title: field.charAt(0).toUpperCase() + field.slice(1), sortable: true,
            render: (data: any) => editMode[data.id] ? (
                field === 'status' && editMode[data.id] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.id, 'status', val)
                        }}
                        defaultValue={editableData[data.id]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={(editableData as any)[data.id]?.[field] || data[field]}
                        onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                                    {editMode[data.id] ? '' : <IconPencil />}
                                </div>
                            </div>
                        )
                    }
                </>,
        })),
        division: [
            'code', 'name', 'description', 'status'
        ].map((field: any) => ({
            accessor: field, title: field.charAt(0).toUpperCase() + field.slice(1), sortable: true,
            render: (data: any) => editMode[data.id] ? (
                field === 'status' && editMode[data.id] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.id, 'status', val)
                        }}
                        defaultValue={editableData[data.id]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                            value={(editableData as any)[data.id]?.[field] || data[field]}
                            onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                                    {editMode[data.id] ? '' : <IconPencil />}
                                </div>
                            </div>
                        )
                    }
                </>,
        })),
        positionLevel: [
            'code', 'name', 'description', 'status'
        ].map((field: any) => ({
            accessor: field, title: field.charAt(0).toUpperCase() + field.slice(1), sortable: true,
            render: (data: any) => editMode[data.id] ? (
                field === 'status' && editMode[data.id] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.id, 'status', val)
                        }}
                        defaultValue={editableData[data.id]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                            value={(editableData as any)[data.id]?.[field] || data[field]}
                            onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                                    {editMode[data.id] ? '' : <IconPencil />}
                                </div>
                            </div>
                        )
                    }
                </>,
        })),
        departments: [
            'code', 'name', 'departmentHead', 'division', 'description', 'status'
        ].map((field: any) => ({
            accessor: field, title: field.charAt(0).toUpperCase() + field.slice(1), sortable: true,
            render: (data: any) => editMode[data.id] ? (
                field === 'status' && editMode[data.id] ? (
                    <Select
                        classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.id, 'status', val)
                        }}
                        defaultValue={editableData[data.id]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                            value={(editableData as any)[data.id]?.[field] || data[field]}
                            onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                                    {editMode[data.id] ? '' : <IconPencil />}
                                </div>
                            </div>
                        )
                    }
                </>,
        })),
    };


    return (
        <div className="flex flex-col h-full gap-8">
            <div className='flex flex-col'>
                <div className="text-[#559CDA] font-bold flex gap-2 items-center text-lg">
                    {title[activePanel as keyof typeof title]} <IconCirclePlus color="green" onClick={addNewRow} className="cursor-pointer" />
                </div>
                <p className='text-[#6D6D6D] text-sm'>{description[activePanel as keyof typeof description]}</p>
            </div>
            <DataTable
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
                records={[...records, ...newRows]}
                columns={(columns as any)[activePanel]}
                totalRecords={initialData.length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={setPage}
            />
        </div>
    );
});

export default DataTableComp;