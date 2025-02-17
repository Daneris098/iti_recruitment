import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { DataTable } from 'mantine-datatable';
import { IconCirclePlus, IconPencil, IconArrowsSort } from "@tabler/icons-react";
import { TextInput } from '@mantine/core';
import { HiringSettingsStore, FeedbackStore } from '@modules/HiringSettings/store';
import { feedback } from '@modules/HiringSettings/types';

const CustomFeedback = forwardRef((_, ref) => {
    const { applicantFeedback, setApplicantFeedback } = FeedbackStore();
    const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
    const [editableData, setEditableData] = useState<{ [key: number]: Partial<feedback> }>({});
    const [newRows, setNewRows] = useState<feedback[]>([]);


    const toggleEditMode = (id: number) => {
        // Toggle the edit mode for the specific id
        setEditMode(prevEditMode => ({
            ...prevEditMode,
            [id]: !prevEditMode[id],
        }));

        // If switching to edit mode, initialize editable data for the selected row
        if (!editMode[id]) {
            const rowData =
                applicantFeedback.find((item) => item.id === id) ||
                newRows.find(item => item.id === id);

            if (rowData) {
                setEditableData(prevEditableData => ({
                    ...prevEditableData,
                    [id]: { ...rowData },
                }));
            }
        }
    };

    const handleEditChange = (id: number, field: keyof feedback, value: string) => {
        setEditableData(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const addNewRow = () => {
        if (Object.keys(editMode).length === 0) {
            const newRow: feedback = {
                id: Math.max(...applicantFeedback.map(r => r.id), 0) + 1, // Automatically generate a new id
                feedback: '',
            };
            setNewRows(prev => [...prev, newRow]);
            setEditMode(prev => ({ ...prev, [newRow.id]: true }));
            setEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
        }
    };

    const saveAll = () => {
        const result = [...applicantFeedback, ...newRows].map((record) =>
            editableData[record.id] ? { ...record, ...editableData[record.id] } : record
        );
        setApplicantFeedback(result);
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
            saveAll();
        },
        cancelAll: () => {
            cancelAll();
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
                render: (data: any) => editMode[data.id] ? (
                    <TextInput
                        value={editableData[data.id]?.feedback || data.feedback}
                        onChange={(e: any) => handleEditChange(data.id, 'feedback', e.target.value)}
                    />
                ) : <div className='flex justify-between'>
                    <p>{data.feedback}</p>
                    <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                        {editMode[data.id] ? '' : <IconPencil />}
                    </div>
                </div>,
            },
        ],
        hiringTeamFeedback: [
            {
                accessor: 'id', title: 'Applicant Feedback', sortable: true,
                render: (data: any) => editMode[data.id] ? (
                    <TextInput
                        value={editableData[data.id]?.id || data.id}
                        onChange={(e: any) => handleEditChange(data.id, 'id', e.target.value)}
                    />
                ) : data.id,
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
                    records={[...applicantFeedback, ...newRows]}
                    columns={(columns as any)['customFeedback']}
                />
            </div>
        </div>
    );
});

export default CustomFeedback;
