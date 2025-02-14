import { useState, forwardRef, useImperativeHandle, useEffect, } from 'react';
import { DataTable } from 'mantine-datatable';
import { IconCirclePlus, IconPencil, IconCaretDownFilled, IconTrash } from "@tabler/icons-react";
import { TextInput, Select } from '@mantine/core';
import { OrganizationSettingsStore } from '../store';
import { title, description, Company } from '@modules/OrganizationSettings/types';

const PAGE_SIZE = 15;
const initialData: Company[] = [
    { name: 'John', code: 'insys001', location: 'Quezon City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { name: 'Alice', code: 'insys002', location: 'Caloocan City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { name: 'Bob', code: 'insys003', location: 'Manila City', area: 'North 3', description: 'SM Downtown', status: 'active', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
];

const DataTableComp = forwardRef((_, ref) => {
    const { activePanel } = OrganizationSettingsStore();
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<Company[]>(initialData.slice(0, PAGE_SIZE));
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
    const [editableData, setEditableData] = useState<{ [key: string]: Partial<Company> }>({});
    const [newRows, setNewRows] = useState<Company[]>([]);


    useEffect(() => {
        console.log('editMode: ', editMode)
    }, [editMode])

    const toggleEditMode = (code: string) => {
        // Toggle the edit mode for the specific code
        setEditMode(prevEditMode => ({
            ...prevEditMode,
            [code]: !prevEditMode[code],
        }));

        // If switching to edit mode, initialize editable data for the selected row
        if (!editMode[code]) {
            const rowData =
                records.find(item => item.code === code) ||
                newRows.find(item => item.code === code);

            if (rowData) {
                setEditableData(prevEditableData => ({
                    ...prevEditableData,
                    [code]: { ...rowData },
                }));
            }
        }
    };

    const handleEditChange = (code: string, field: keyof Company, value: string) => {
        setEditableData(prev => ({
            ...prev,
            [code]: {
                ...prev[code],
                [field]: value,
            },
        }));
    };

    const addNewRow = () => {
        if (Object.keys(editMode).length === 0) {
            const newRow: Company = {
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
            setEditMode(prev => ({ ...prev, [newRow.code]: true }));
            setEditableData(prev => ({ ...prev, [newRow.code]: newRow }));
        }
    };

    const saveAll = () => {
        let isValid = true;
        Object.values(editableData).forEach(data => {
            const trimmedName = data.name?.trim();
            const trimmedCode = data.code?.trim();

            console.log('name:', trimmedName);
            console.log('code:', trimmedCode);

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

        setRecords(prevRecords => [...prevRecords, ...newRows].map(record => editableData[record.code] ? { ...record, ...editableData[record.code] } : record));
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
        }
    }));

    const columns: any = {
        companyList: [
            {
                accessor: 'code', title: 'Code', sortable: true,
                render: (data: any) => editMode[data.code] ? (
                    <TextInput
                        value={editableData[data.code]?.code || data.code}
                        onChange={(e: any) => handleEditChange(data.code, 'code', e.target.value)}
                    />
                ) : data.code,
            },
            {
                accessor: 'name', title: 'Name', sortable: true,
                render: (data: any) => editMode[data.code] ? (
                    <TextInput
                        value={editableData[data.code]?.name || data.name}
                        onChange={(e: any) => handleEditChange(data.code, 'name', e.target.value)}
                    />
                ) :
                    <p>{data.name}</p>
            },
            {
                accessor: 'status', title: 'Status', sortable: true,
                render: (data: any) => editMode[data.code] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.code, 'status', val)
                        }}
                        defaultValue={editableData[data.code]?.status || data.status}
                    />
                ) :
                    <div className='flex justify-between'>
                        <p>{data.status}</p>
                        <div className="cursor-pointer" onClick={() => toggleEditMode(data.code)}>
                            {editMode[data.code] ? '' : <IconPencil />}
                        </div>
                    </div>,
            }
        ],

        branch: [
            'code', 'name', 'location', 'area', 'description', 'status'
        ].map((field: any) => ({
            accessor: field, title: field.charAt(0).toUpperCase() + field.slice(1), sortable: true,
            render: (data: any) => editMode[data.code] ? (
                field === 'status' && editMode[data.code] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.code, 'status', val)
                        }}
                        defaultValue={editableData[data.code]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        value={(editableData as any)[data.code]?.[field] || data[field]}
                        onChange={(e: any) => handleEditChange(data.code, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.code)}>
                                    {editMode[data.code] ? '' : <IconPencil />}
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
            render: (data: any) => editMode[data.code] ? (
                field === 'status' && editMode[data.code] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.code, 'status', val)
                        }}
                        defaultValue={editableData[data.code]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        value={(editableData as any)[data.code]?.[field] || data[field]}
                        onChange={(e: any) => handleEditChange(data.code, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.code)}>
                                    {editMode[data.code] ? '' : <IconPencil />}
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
            render: (data: any) => editMode[data.code] ? (
                field === 'status' && editMode[data.code] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.code, 'status', val)
                        }}
                        defaultValue={editableData[data.code]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        value={(editableData as any)[data.code]?.[field] || data[field]}
                        onChange={(e: any) => handleEditChange(data.code, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.code)}>
                                    {editMode[data.code] ? '' : <IconPencil />}
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
            render: (data: any) => editMode[data.code] ? (
                field === 'status' && editMode[data.code] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.code, 'status', val)
                        }}
                        defaultValue={editableData[data.code]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        value={(editableData as any)[data.code]?.[field] || data[field]}
                        onChange={(e: any) => handleEditChange(data.code, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.code)}>
                                    {editMode[data.code] ? '' : <IconPencil />}
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
            render: (data: any) => editMode[data.code] ? (
                field === 'status' && editMode[data.code] ? (
                    <Select
                        radius={8}
                        data={["active", "inactive"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => {
                            handleEditChange(data.code, 'status', val)
                        }}
                        defaultValue={editableData[data.code]?.status || data.status}
                    />
                ) : (
                    <TextInput
                        value={(editableData as any)[data.code]?.[field] || data[field]}
                        onChange={(e: any) => handleEditChange(data.code, field, e.target.value)}
                    />
                )
            ) :
                <>
                    {field != 'status' ? (
                        <p>{data[field]}</p>) :
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => toggleEditMode(data.code)}>
                                    {editMode[data.code] ? '' : <IconPencil />}
                                </div>
                            </div>
                        )
                    }
                </>,
        })),
    };


    return (
        <div className="flex flex-col h-full">
            <div className='flex flex-col mb-4'>
                <div className="text-[#559CDA] font-bold flex gap-2 items-center">
                    {title[activePanel as keyof typeof title]} <IconCirclePlus color="green" onClick={addNewRow} className="cursor-pointer" />
                </div>
                <p className='text-[#6D6D6D]'>{description[activePanel as keyof typeof description]}</p>
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