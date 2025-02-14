import { useState, forwardRef, useImperativeHandle, useEffect, } from 'react';
import { DataTable } from 'mantine-datatable';
import { IconCirclePlus, IconPencil, IconArrowsSort } from "@tabler/icons-react";
import { TextInput } from '@mantine/core';
import { HiringSettingsStore } from '@modules/HiringSettings/store';
import { Company } from '@modules/HiringSettings/types';

const PAGE_SIZE = 15;
const initialData: Company[] = [
    { feedback: 'Great', code: 'insys001' },
    { feedback: 'Good', code: 'insys002' },
    { feedback: 'Bad', code: 'insys003' },
];

const CustomFeedback = forwardRef((_, ref) => {
    const { activePanel } = HiringSettingsStore();
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
                feedback: '',
            };
            setNewRows(prev => [...prev, newRow]);
            setEditMode(prev => ({ ...prev, [newRow.code]: true }));
            setEditableData(prev => ({ ...prev, [newRow.code]: newRow }));
        }
    };

    const saveAll = () => {
      

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
        customFeedback: [
            {

                accessor: 'feedback', title: (
                    <div className='flex justify-between'>
                        <p>Applicant Feedback</p>
                        <div className='flex'>
                            <IconArrowsSort size={24} className="cursor-pointer text-gray-500" />
                            <IconCirclePlus size={28} color="green" onClick={addNewRow} className='cursor-pointer' />
                        </div>
                    </div>
                ), sortable: false,
                render: (data: any) => editMode[data.code] ? (
                    <TextInput
                        value={editableData[data.code]?.feedback || data.feedback}
                        onChange={(e: any) => handleEditChange(data.feedback, 'feedback', e.target.value)}
                    />
                ) : <div className='flex justify-between'>
                    <p>{data.feedback}</p>
                    <div className="cursor-pointer" onClick={() => toggleEditMode(data.code)}>
                        {editMode[data.code] ? '' : <IconPencil />}
                    </div>
                </div>,
            },
        ],
        hiringTeamFeedback: [
            {
                accessor: 'code', title: 'Applicant Feedback', sortable: true,
                render: (data: any) => editMode[data.code] ? (
                    <TextInput
                        value={editableData[data.code]?.code || data.code}
                        onChange={(e: any) => handleEditChange(data.code, 'code', e.target.value)}
                    />
                ) : data.code,
            },
        ],
    };


    return (
        <div className="flex flex-col h-[100%]">
            <div className='flex flex-col mb-4'>
                <p className="text-[#559CDA] font-bold">Feedback</p>
                <p className="text-[#6D6D6D]">This section allows you to add custom feedback from both the hiring team (after every interview) and the applicant (upon receiving a job offer). If no feedback is provided by the applicant, select "No Response."</p>
            </div>
            <div className='w-[30%] h-full'>
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
                    columns={(columns as any)['customFeedback']}
                    // totalRecords={initialData.length}
                    // recordsPerPage={PAGE_SIZE}
                    // page={page}
                    // onPageChange={setPage}
                />
            </div>
        </div>
    );
});

export default CustomFeedback;