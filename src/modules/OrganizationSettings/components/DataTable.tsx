import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { DataTable, DataTableRowExpansionProps } from 'mantine-datatable';
import { IconCirclePlus, IconPencil, IconCaretDownFilled, IconTrashFilled, IconCircleX } from "@tabler/icons-react";
import { TextInput, Select, Stack } from '@mantine/core';
import { OrganizationSettingsStore } from '../store';
import { title, description, Company, AlertType, panel } from '@modules/OrganizationSettings/types';
import { divide } from 'lodash';

const PAGE_SIZE = 15;
const initialData: Company[] = [
    { id: 1, name: 'John', code: 'insys001', location: 'Quezon City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 2, name: 'Alice', code: 'insys002', location: 'Caloocan City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 3, name: 'Bob', code: 'insys003', location: 'Manila City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 4, name: 'John', code: 'insys001', location: 'Quezon City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 5, name: 'Alice', code: 'insys002', location: 'Caloocan City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 6, name: 'Bob', code: 'insys003', location: 'Manila City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 7, name: 'John', code: 'insys001', location: 'Quezon City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 8, name: 'Alice', code: 'insys002', location: 'Caloocan City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 9, name: 'Bob', code: 'insys003', location: 'Manila City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 10, name: 'John', code: 'insys001', location: 'Quezon City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 11, name: 'Alice', code: 'insys002', location: 'Caloocan City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 12, name: 'Bob', code: 'insys003', location: 'Manila City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 13, name: 'John', code: 'insys001', location: 'Quezon City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 14, name: 'Alice', code: 'insys002', location: 'Caloocan City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
    { id: 15, name: 'Bob', code: 'insys003', location: 'Manila City', area: 'North 3', description: 'SM Downtown', status: 'ACTIVE', division: 'Quezon City', department: 'North 3', departmentHead: 'Jane Cooper' },
];

const DataTableComp = forwardRef((_, ref) => {
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const { activePanel, setAlert, setValidationMessage } = OrganizationSettingsStore();
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState<Company[]>(initialData.slice(0, PAGE_SIZE));
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
    const [editableData, setEditableData] = useState<{ [key: string]: Partial<Company> }>({});
    const [newRows, setNewRows] = useState<Company[]>([]);

    const departmentTitles: { [key: string]: string } = {
        code: 'Code',
        name: 'Name',
        departmentHead: 'Department Head',
        division: 'Division',
        description: 'Description',
        status: 'Status'
    };

    const toggleEditMode = (id: number) => {
        // Toggle the edit mode for the specific row
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
                setEditableData(prevEditableData => {
                    if (prevEditableData[id]) {
                        // rowData already exists in editableData, skip updating
                        return prevEditableData;
                    }

                    return {
                        ...prevEditableData,
                        [id]: { ...rowData },
                    };
                });

            }
        }
    };

    const handleEditChange = (id: number, field: keyof Company, value: string | boolean) => {
        setEditableData(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const addNewRow = () => {
        setSelectedRowId(null)
        if (newRows.length > 0) {
            return
        }
        const uniqueId = + (Math.floor(Math.random() * 100001 + 1))
        const newRow: Company = {
            id: uniqueId,
            code: ``,
            name: '',
            location: '',
            area: '',
            description: '',
            status: 'ACTIVE',
            division: '',
            department: '',
            departmentHead: '',
            isNewField: true,
            touched: false,
        };
        setExpandedRowIds([])
        setNewRows(prev => [...prev, newRow]);
        setEditMode(prev => ({ ...prev, [newRow.id]: true }));
        setEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
    };

    const saveAll = async () => {
        if (!checkEditIsValid()) {
            return
        }
        setSelectedRowId(null);
        // await new Promise(resolve => setTimeout(resolve, 100));
        setRecords(prevRecords => [...prevRecords, ...newRows].map(record => editableData[record.id] ? { ...record, ...editableData[record.id] } : record));
        setNewRows([]);
        setEditMode({});
        setEditableData({});
        setExpandedRowIds([])
        setAlert(AlertType.saved);
    };

    const checkEditIsValid = () => {
        const fieldsToCheck = ['code', 'name', 'status'];
        return !Object.entries(editableData).some(([key, data]) =>
            fieldsToCheck.some(field => {
                const value = (data as any)[field];
                if ((typeof value === 'string' && value.trim() === '') || value == null) {
                    setValidationMessage(`${field} is empty`);
                    setAlert(AlertType.validation)
                    return true;
                }
                return false;
            })
        );
    };


    const cancelAll = () => {
        setSelectedRowId(null);
        setEditMode({});
        setEditableData({});
        setNewRows([]);
        setExpandedRowIds([])
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
                render: (data: any) => editMode[data.id] && data.isNewField ? (
                    <TextInput
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={editableData[data.id]?.code || data.code}
                        onChange={(e: any) => handleEditChange(data.id, 'code', e.target.value)}
                        error={editableData[data.id]?.touched && (editableData[data.id]?.code ?? '').trim() === '' ? 'Required' : undefined}
                        onBlur={() => { handleEditChange(data.id, 'touched', true); }}
                    />

                ) : data.code,
            },
            {
                accessor: 'name', title: 'Name', sortable: true,
                render: (data: any) => editMode[data.id] && data.isNewField ? (
                    <TextInput
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={editableData[data.id]?.name || data.name}
                        onChange={(e: any) => handleEditChange(data.id, 'name', e.target.value)}
                        error={editableData[data.id]?.touched && (editableData[data.id]?.name ?? '').trim() === '' ? 'Required' : undefined}
                        onBlur={() => { handleEditChange(data.id, 'touched', true); }}
                    />
                ) : data.name,
            },
            {
                accessor: 'status', title: 'Status', sortable: true,
                render: (data: any) => editMode[data.id] && data.isNewField ? (
                    <div className='flex'>
                        <Select
                            radius={8}
                            data={["ACTIVE", "INACTIVE"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={(val: any) => { handleEditChange(data.id, 'status', val) }}
                            defaultValue={editableData[data.id]?.status || data.status}
                            error={editableData[data.id]?.touched && (editableData[data.id]?.status ?? '').trim() === '' ? 'Required' : undefined}
                            onBlur={() => { handleEditChange(data.id, 'touched', true); }}

                        />
                        <div className='cursor-pointer mt-1 ml-1' onClick={() => {
                            const updatedEditMode = Object.fromEntries(Object.entries(editMode).filter(([key]) => key != data.id));
                            const updatedEditableData = Object.fromEntries(Object.entries(editableData).filter(([key]) => key != data.id));
                            const updatedNewRows = newRows.filter((row) => row.id !== data.id);
                            setEditMode(updatedEditMode);
                            setEditableData(updatedEditableData);
                            setNewRows(updatedNewRows);
                        }}>
                            {records.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                        </div>

                    </div>
                ) :
                    <div className='flex justify-between'>
                        <p>{data.status}</p>
                        <div className="cursor-pointer" onClick={() => {
                            if (!checkEditIsValid()) {
                                return
                            }
                            setSelectedRowId(data.id)
                            setExpandedRowIds([data.id])
                            toggleEditMode(data.id)
                            setNewRows([]);
                        }}>
                            {<IconPencil />}
                        </div>
                    </div>,
            }
        ],

        branch: [
            'code', 'name', 'location', 'area', 'description', 'status'
        ].map((field: any) => ({
            accessor: field, title: field.charAt(0).toUpperCase() + field.slice(1), sortable: true,
            render: (data: any) => editMode[data.id] ? (
                field === 'status' && editMode[data.id] && data.isNewField ? (
                    // new field status view
                    <div className='flex'>
                        <Select
                            radius={8}
                            data={["ACTIVE", "INACTIVE"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={(val: any) => { handleEditChange(data.id, 'status', val) }}
                            defaultValue={editableData[data.id]?.status || data.status}
                        />
                        <div className='cursor-pointer mt-1 ml-1' onClick={() => {
                            const updatedEditMode = Object.fromEntries(Object.entries(editMode).filter(([key]) => key != data.id));
                            const updatedEditableData = Object.fromEntries(Object.entries(editableData).filter(([key]) => key != data.id));
                            const updatedNewRows = newRows.filter((row) => row.id !== data.id);
                            setEditMode(updatedEditMode);
                            setEditableData(updatedEditableData);
                            setNewRows(updatedNewRows);
                        }} >
                            {records.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                        </div>
                    </div>
                ) : data.isNewField ? (
                    <>
                        {/* new field view */}
                        <TextInput
                            className='relative'
                            classNames={{ input: 'poppins text-[#6D6D6D]' }}
                            value={(editableData as any)[data.id]?.[field] || data[field]}
                            onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                            error={editableData[data.id]?.touched && ((editableData as any)[data.id][field] ?? '').trim() === '' ? 'Required' : undefined}
                            onBlur={() => { handleEditChange(data.id, 'touched', true); }}
                        />
                    </>
                ) : (
                    // selected row to edit view
                    <div className='flex justify-between'>
                        <p>{data[field]}</p>
                        {field === 'status' && <div className="cursor-pointer" onClick={() => {
                            if (!checkEditIsValid()) { return }
                            setSelectedRowId(data.id)
                            setExpandedRowIds([data.id])
                            toggleEditMode(data.id)
                            setNewRows([]);
                        }}>
                            {<IconPencil />}
                        </div>}
                    </div>
                )
            ) :
                <>
                    {field != 'status' ? (
                        //  initial views non status field
                        <p>{data[field]}</p>) :
                        //  initial views status field
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => {
                                    if (!checkEditIsValid()) {
                                        return
                                    }
                                    setSelectedRowId(data.id)
                                    setExpandedRowIds([data.id])
                                    toggleEditMode(data.id)
                                    setNewRows([]);
                                }}>
                                    {<IconPencil />}
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
                field === 'status' && editMode[data.id] && data.isNewField ? (
                    <div className='flex'>
                        <Select
                            radius={8}
                            data={["ACTIVE", "INACTIVE"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={(val: any) => {
                                handleEditChange(data.id, 'status', val)
                            }}
                            defaultValue={editableData[data.id]?.status || data.status}
                        />
                        <div className='cursor-pointer mt-1 ml-1' onClick={() => {
                            const updatedEditMode = Object.fromEntries(Object.entries(editMode).filter(([key]) => key != data.id));
                            const updatedEditableData = Object.fromEntries(Object.entries(editableData).filter(([key]) => key != data.id));
                            const updatedNewRows = newRows.filter((row) => row.id !== data.id);
                            setEditMode(updatedEditMode);
                            setEditableData(updatedEditableData);
                            setNewRows(updatedNewRows);
                        }}>
                            {records.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                        </div>
                    </div>
                ) : data.isNewField ? (
                    <>
                        {/* new field view */}
                        <TextInput
                            className='relative'
                            classNames={{ input: 'poppins text-[#6D6D6D]' }}
                            value={(editableData as any)[data.id]?.[field] || data[field]}
                            onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                            error={editableData[data.id]?.touched && ((editableData as any)[data.id][field] ?? '').trim() === '' ? 'Required' : undefined}
                            onBlur={() => { handleEditChange(data.id, 'touched', true); }}
                        />
                    </>
                ) : (
                    // selected row to edit view
                    <div className='flex justify-between'>
                        <p>{data[field]}</p>
                        {field === 'status' && <div className="cursor-pointer" onClick={() => {
                            if (!checkEditIsValid()) { return }
                            setSelectedRowId(data.id)
                            setExpandedRowIds([data.id])
                            toggleEditMode(data.id)
                            setNewRows([]);
                        }}>
                            {<IconPencil />}
                        </div>}
                    </div>
                )
            ) :
                <>
                    {field != 'status' ? (
                        //  initial views non status field
                        <p>{data[field]}</p>) :
                        //  initial views status field
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => {
                                    if (!checkEditIsValid()) {
                                        return
                                    }
                                    setSelectedRowId(data.id)
                                    setExpandedRowIds([data.id])
                                    toggleEditMode(data.id)
                                    setNewRows([]);
                                }}>
                                    {<IconPencil />}
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
                field === 'status' && editMode[data.id] && data.isNewField ? (
                    <div className='flex'>
                        <Select
                            radius={8}
                            data={["ACTIVE", "INACTIVE"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={(val: any) => {
                                handleEditChange(data.id, 'status', val)
                            }}
                            defaultValue={editableData[data.id]?.status || data.status}
                        />
                        <div className='cursor-pointer mt-1 ml-1' onClick={() => {
                            const updatedEditMode = Object.fromEntries(Object.entries(editMode).filter(([key]) => key != data.id));
                            const updatedEditableData = Object.fromEntries(Object.entries(editableData).filter(([key]) => key != data.id));
                            const updatedNewRows = newRows.filter((row) => row.id !== data.id);
                            setEditMode(updatedEditMode);
                            setEditableData(updatedEditableData);
                            setNewRows(updatedNewRows);
                        }}>
                            {records.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                        </div>
                    </div>

                ) : data.isNewField ? (
                    <>
                        {/* new field view */}
                        <TextInput
                            className='relative'
                            classNames={{ input: 'poppins text-[#6D6D6D]' }}
                            value={(editableData as any)[data.id]?.[field] || data[field]}
                            onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                            error={editableData[data.id]?.touched && ((editableData as any)[data.id][field] ?? '').trim() === '' ? 'Required' : undefined}
                            onBlur={() => { handleEditChange(data.id, 'touched', true); }}
                        />
                    </>
                ) : (
                    // selected row to edit view
                    <div className='flex justify-between'>
                        <p>{data[field]}</p>
                        {field === 'status' && <div className="cursor-pointer" onClick={() => {
                            if (!checkEditIsValid()) { return }
                            setSelectedRowId(data.id)
                            setExpandedRowIds([data.id])
                            toggleEditMode(data.id)
                            setNewRows([]);
                        }}>
                            {<IconPencil />}
                        </div>}
                    </div>
                )
            ) :
                <>
                    {field != 'status' ? (
                        //  initial views non status field
                        <p>{data[field]}</p>) :
                        //  initial views status field
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => {
                                    if (!checkEditIsValid()) {
                                        return
                                    }
                                    setSelectedRowId(data.id)
                                    setExpandedRowIds([data.id])
                                    toggleEditMode(data.id)
                                    setNewRows([]);
                                }}>
                                    {<IconPencil />}
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
                field === 'status' && editMode[data.id] && data.isNewField ? (
                    <div className='flex'>
                        <Select
                            radius={8}
                            data={["ACTIVE", "INACTIVE"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={(val: any) => {
                                handleEditChange(data.id, 'status', val)
                            }}
                            defaultValue={editableData[data.id]?.status || data.status}
                        />

                        <div className='cursor-pointer mt-1 ml-1' onClick={() => {
                            const updatedEditMode = Object.fromEntries(Object.entries(editMode).filter(([key]) => key != data.id));
                            const updatedEditableData = Object.fromEntries(Object.entries(editableData).filter(([key]) => key != data.id));
                            const updatedNewRows = newRows.filter((row) => row.id !== data.id);
                            setEditMode(updatedEditMode);
                            setEditableData(updatedEditableData);
                            setNewRows(updatedNewRows);
                        }}>
                            {records.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                        </div>

                    </div>
                ) : data.isNewField ? (
                    <>
                        {/* new field view */}
                        <TextInput
                            className='relative'
                            classNames={{ input: 'poppins text-[#6D6D6D]' }}
                            value={(editableData as any)[data.id]?.[field] || data[field]}
                            onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                            error={editableData[data.id]?.touched && ((editableData as any)[data.id][field] ?? '').trim() === '' ? 'Required' : undefined}
                            onBlur={() => { handleEditChange(data.id, 'touched', true); }}
                        />
                    </>
                ) : (
                    // selected row to edit view
                    <div className='flex justify-between'>
                        <p>{data[field]}</p>
                        {field === 'status' && <div className="cursor-pointer" onClick={() => {
                            if (!checkEditIsValid()) { return }
                            setSelectedRowId(data.id)
                            setExpandedRowIds([data.id])
                            toggleEditMode(data.id)
                            setNewRows([]);
                        }}>
                            {<IconPencil />}
                        </div>}
                    </div>
                )
            ) :
                <>
                    {field != 'status' ? (
                        //  initial views non status field
                        <p>{data[field]}</p>) :
                        //  initial views status field
                        (
                            <div className='flex justify-between'>
                                <p>{data[field]}</p>
                                <div className="cursor-pointer" onClick={() => {
                                    if (!checkEditIsValid()) {
                                        return
                                    }
                                    setSelectedRowId(data.id)
                                    setExpandedRowIds([data.id])
                                    toggleEditMode(data.id)
                                    setNewRows([]);
                                }}>
                                    {<IconPencil />}
                                </div>
                            </div>
                        )
                    }
                </>,
        })),

        departments: [
            'code', 'name', 'departmentHead', 'division', 'description', 'status'
        ].map((field: any) => {
            const title = departmentTitles[field] || (field.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + field.replace(/([A-Z])/g, ' $1').slice(1));
            return {
                accessor: field,
                title: title,
                sortable: true,
                render: (data: any) => editMode[data.id] ? (
                    field === 'status' && editMode[data.id] && data.isNewField ? (
                        <div className='flex'>
                            <Select
                                classNames={{ input: 'poppins text-[#6D6D6D] ', dropdown: 'poppins text-[#6D6D6D]' }}
                                radius={8}
                                data={["ACTIVE", "INACTIVE"]}
                                rightSection={<IconCaretDownFilled size='18' />}
                                className="border-none w-full text-sm"
                                styles={{ label: { color: "#6d6d6d" } }}
                                onChange={(val: any) => {
                                    handleEditChange(data.id, 'status', val)
                                }}
                                defaultValue={editableData[data.id]?.status || data.status}
                            />
                            <div className='cursor-pointer mt-1 ml-1' onClick={() => {
                                const updatedEditMode = Object.fromEntries(Object.entries(editMode).filter(([key]) => key != data.id));
                                const updatedEditableData = Object.fromEntries(Object.entries(editableData).filter(([key]) => key != data.id));
                                const updatedNewRows = newRows.filter((row) => row.id !== data.id);
                                setEditMode(updatedEditMode);
                                setEditableData(updatedEditableData);
                                setNewRows(updatedNewRows);
                            }}>
                                {records.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                            </div>
                        </div>
                    ) : data.isNewField ? (
                        <>
                            {/* new field view */}
                            <TextInput
                                className='relative'
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={(editableData as any)[data.id]?.[field] || data[field]}
                                onChange={(e: any) => handleEditChange(data.id, field, e.target.value)}
                                error={editableData[data.id]?.touched && ((editableData as any)[data.id][field] ?? '').trim() === '' ? 'Required' : undefined}
                                onBlur={() => { handleEditChange(data.id, 'touched', true); }}
                            />
                        </>
                    ) : (
                        // selected row to edit view
                        <div className='flex justify-between'>
                            <p>{data[field]}</p>
                            {field === 'status' && <div className="cursor-pointer" onClick={() => {
                                if (!checkEditIsValid()) { return }
                                setSelectedRowId(data.id)
                                setExpandedRowIds([data.id])
                                toggleEditMode(data.id)
                                setNewRows([]);
                            }}>
                                {<IconPencil />}
                            </div>}
                        </div>
                    )
                ) :
                    <>
                        {field != 'status' ? (
                            //  initial views non status field
                            <p>{data[field]}</p>) :
                            //  initial views status field
                            (
                                <div className='flex justify-between'>
                                    <p>{data[field]}</p>
                                    <div className="cursor-pointer" onClick={() => {
                                        if (!checkEditIsValid()) {
                                            return
                                        }
                                        setSelectedRowId(data.id)
                                        setExpandedRowIds([data.id])
                                        toggleEditMode(data.id)
                                        setNewRows([]);
                                    }}>
                                        {<IconPencil />}
                                    </div>
                                </div>
                            )
                        }
                    </>,
            }
        }),
    };

    useEffect(() => {
        console.log('editableData: ', editableData)
    }, [editableData])

    const [expandedRowIds, setExpandedRowIds] = useState<number[]>([]);
    const rowExpansion2: any = {
        collapseProps: {
            transitionDuration: 500,
            animateOpacity: true,
            transitionTimingFunction: 'ease-out',
        },
        trigger: 'never',
        allowMultiple: false,
        expanded: {
            recordIds: expandedRowIds,
            onRecordIdsChange: setExpandedRowIds,
        },
        expandable: ({ record: { isNewField } }: any) => { return (!isNewField) },
        content: ({ record: { name, id, code, status } }: any) => {
            // console.log('editableData[id]: ', editableData[id]);
            return (
                <>
                    {activePanel === panel.companyList ? (
                        <div className='flex gap-2 relative bg-[#DEECFF] p-4 -m-4 '>
                            <TextInput
                                className="w-1/3"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.code ?? ''} // fallback to empty string instead of undefined
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'code', e.target.value)}
                                error={(editableData[id]?.code ?? '').trim() === '' ? 'Required' : undefined}
                            />

                            <TextInput
                                className=' w-1/3'
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.name}
                                onChange={(e: any) => handleEditChange(id, 'name', e.target.value)}
                                error={(editableData[id]?.name ?? '').trim() === '' ? 'Required' : undefined}
                            />
                            <Select
                                radius={8}
                                data={["ACTIVE", "INACTIVE"]}
                                rightSection={<IconCaretDownFilled size='18' />}
                                className="border-none text-sm w-1/3"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                styles={{ label: { color: "#6d6d6d" } }}
                                onChange={(val: any) => { handleEditChange(id, 'status', val) }}
                                error={(editableData[id]?.status ?? '').trim() === '' ? 'Required' : undefined}
                                defaultValue={editableData[id]?.status || status}
                            />
                        </div>
                    ) : activePanel === panel.branch ? (
                        <div className='flex gap-2 relative bg-[#DEECFF] p-4 -m-4 '>
                            <TextInput
                                className="w-[14%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.code ?? ''} // fallback to empty string instead of undefined
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'code', e.target.value)}
                                error={(editableData[id]?.code ?? '').trim() === '' ? 'Required' : undefined}
                            />

                            <TextInput
                                className="w-[14%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.name}
                                onChange={(e: any) => handleEditChange(id, 'name', e.target.value)}
                                error={(editableData[id]?.name ?? '').trim() === '' ? 'Required' : undefined}
                            />

                            <TextInput
                                className="w-[19%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.location}
                                onChange={(e: any) => handleEditChange(id, 'location', e.target.value)}
                                error={(editableData[id]?.location ?? '').trim() === '' ? 'Required' : undefined}
                            />
                            <TextInput
                                className="w-[14%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.area ?? ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'area', e.target.value)}
                                error={(editableData[id]?.area ?? '').trim() === '' ? 'Required' : undefined}
                            />

                            <TextInput
                                className="w-[20%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.description}
                                onChange={(e: any) => handleEditChange(id, 'description', e.target.value)}
                                error={(editableData[id]?.description ?? '').trim() === '' ? 'Required' : undefined}
                            />
                            <Select
                                radius={8}
                                data={["ACTIVE", "INACTIVE"]}
                                rightSection={<IconCaretDownFilled size='18' />}
                                className="border-none text-sm w-[16%]"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                styles={{ label: { color: "#6d6d6d" } }}
                                onChange={(val: any) => { handleEditChange(id, 'status', val) }}
                                error={(editableData[id]?.status ?? '').trim() === '' ? 'Required' : undefined}
                                defaultValue={editableData[id]?.status || status}
                            />
                        </div>
                    ) : activePanel === panel.section ? (
                        <div className='flex gap-2 relative bg-[#DEECFF] p-4 -m-4 '>
                            <TextInput
                                className="w-[14%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.code ?? ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'code', e.target.value)}
                                error={(editableData[id]?.code ?? '').trim() === '' ? 'Required' : undefined}
                            />

                            <TextInput
                                className="w-[14%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.name}
                                onChange={(e: any) => handleEditChange(id, 'name', e.target.value)}
                                error={(editableData[id]?.name ?? '').trim() === '' ? 'Required' : undefined}
                            />

                            <TextInput
                                className="w-[19%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.division}
                                onChange={(e: any) => handleEditChange(id, 'division', e.target.value)}
                                error={(editableData[id]?.division ?? '').trim() === '' ? 'Required' : undefined}
                            />
                            <TextInput
                                className="w-[14%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.department ?? ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'department', e.target.value)}
                                error={(editableData[id]?.department ?? '').trim() === '' ? 'Required' : undefined}
                            />

                            <TextInput
                                className="w-[20%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.description}
                                onChange={(e: any) => handleEditChange(id, 'description', e.target.value)}
                                error={(editableData[id]?.description ?? '').trim() === '' ? 'Required' : undefined}
                            />
                            <Select
                                radius={8}
                                data={["ACTIVE", "INACTIVE"]}
                                rightSection={<IconCaretDownFilled size='18' />}
                                className="border-none text-sm w-[16%]"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                styles={{ label: { color: "#6d6d6d" } }}
                                onChange={(val: any) => { handleEditChange(id, 'status', val) }}
                                error={(editableData[id]?.status ?? '').trim() === '' ? 'Required' : undefined}
                                defaultValue={editableData[id]?.status || status}
                            />

                        </div>
                    ) : activePanel === panel.division ? (
                        <div className='flex gap-2 relative bg-[#DEECFF] p-4 -m-4 '>
                            <TextInput
                                className="w-[20%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.code ?? ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'code', e.target.value)}
                                error={(editableData[id]?.code ?? '').trim() === '' ? 'Required' : undefined}
                            />

                            <TextInput
                                className="w-[23%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.name}
                                onChange={(e: any) => handleEditChange(id, 'name', e.target.value)}
                                error={(editableData[id]?.name ?? '').trim() === '' ? 'Required' : undefined}
                            />



                            <TextInput
                                className="w-[32%]"
                                classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                value={editableData[id]?.description}
                                onChange={(e: any) => handleEditChange(id, 'description', e.target.value)}
                                error={(editableData[id]?.description ?? '').trim() === '' ? 'Required' : undefined}
                            />

                            <Select
                                radius={8}
                                data={["ACTIVE", "INACTIVE"]}
                                rightSection={<IconCaretDownFilled size='18' />}
                                className="border-none text-sm w-[23%]"
                                classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                styles={{ label: { color: "#6d6d6d" } }}
                                onChange={(val: any) => { handleEditChange(id, 'status', val) }}
                                error={(editableData[id]?.status ?? '').trim() === '' ? 'Required' : undefined}
                                defaultValue={editableData[id]?.status || status}
                            />

                        </div>
                    ) :
                        activePanel === panel.positionLevel ? (
                            <div className='flex gap-2 relative bg-[#DEECFF] p-4 -m-4 '>
                                <TextInput
                                    className="w-[20%]"
                                    classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                    value={editableData[id]?.code ?? ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'code', e.target.value)}
                                    error={(editableData[id]?.code ?? '').trim() === '' ? 'Required' : undefined}
                                />

                                <TextInput
                                    className="w-[23%]"
                                    classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                    value={editableData[id]?.name}
                                    onChange={(e: any) => handleEditChange(id, 'name', e.target.value)}
                                    error={(editableData[id]?.name ?? '').trim() === '' ? 'Required' : undefined}
                                />

                                <TextInput
                                    className="w-[32%]"
                                    classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                    value={editableData[id]?.description}
                                    onChange={(e: any) => handleEditChange(id, 'description', e.target.value)}
                                    error={(editableData[id]?.description ?? '').trim() === '' ? 'Required' : undefined}
                                />

                                <Select
                                    radius={8}
                                    data={["ACTIVE", "INACTIVE"]}
                                    rightSection={<IconCaretDownFilled size='18' />}
                                    className="border-none text-sm w-[23%]"
                                    classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                    styles={{ label: { color: "#6d6d6d" } }}
                                    onChange={(val: any) => { handleEditChange(id, 'status', val) }}
                                    error={(editableData[id]?.status ?? '').trim() === '' ? 'Required' : undefined}
                                    defaultValue={editableData[id]?.status || status}
                                />

                            </div>
                        ) :
                            activePanel === panel.departments ? (
                                <div className='flex gap-2 relative bg-[#DEECFF] p-4 -m-4 '>
                                    <TextInput
                                        className="w-[14%]"
                                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                        value={editableData[id]?.code ?? ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'code', e.target.value)}
                                        error={(editableData[id]?.code ?? '').trim() === '' ? 'Required' : undefined}
                                    />

                                    <TextInput
                                        className="w-[14%]"
                                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                        value={editableData[id]?.name}
                                        onChange={(e: any) => handleEditChange(id, 'name', e.target.value)}
                                        error={(editableData[id]?.name ?? '').trim() === '' ? 'Required' : undefined}
                                    />

                                    <TextInput
                                        className="w-[19%]"
                                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                        value={editableData[id]?.departmentHead}
                                        onChange={(e: any) => handleEditChange(id, 'departmentHead', e.target.value)}
                                        error={(editableData[id]?.departmentHead ?? '').trim() === '' ? 'Required' : undefined}
                                    />
                                    <TextInput
                                        className="w-[14%]"
                                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                        value={editableData[id]?.division ?? ''}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'division', e.target.value)}
                                        error={(editableData[id]?.division ?? '').trim() === '' ? 'Required' : undefined}
                                    />

                                    <TextInput
                                        className="w-[20%]"
                                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                                        value={editableData[id]?.description}
                                        onChange={(e: any) => handleEditChange(id, 'description', e.target.value)}
                                        error={(editableData[id]?.description ?? '').trim() === '' ? 'Required' : undefined}
                                    />
                                    <Select
                                        radius={8}
                                        data={["ACTIVE", "INACTIVE"]}
                                        rightSection={<IconCaretDownFilled size='18' />}
                                        className="border-none text-sm w-[16%]"
                                        classNames={{ label: "p-1", input: 'poppins text-[#6D6D6D]' }}
                                        styles={{ label: { color: "#6d6d6d" } }}
                                        onChange={(val: any) => { handleEditChange(id, 'status', val) }}
                                        error={(editableData[id]?.status ?? '').trim() === '' ? 'Required' : undefined}
                                        defaultValue={editableData[id]?.status || status}
                                    />

                                </div>
                            ) :
                                (<></>)}
                </>
            )
        },
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
                rowClassName={(row) => row.id === selectedRowId ? "bg-[#DEECFF]" : ""}
                paginationText={({ from, to, totalRecords }) => `Showing data ${from} out ${to} of ${totalRecords} entries (0.225) seconds`}
                withTableBorder
                records={[...newRows, ...records]}
                columns={(columns as any)[activePanel]}
                totalRecords={initialData.length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={setPage}
                rowExpansion={rowExpansion2}
            />
        </div>
    );
});

export default DataTableComp;