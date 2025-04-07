import { useState, forwardRef, useImperativeHandle } from 'react';
import { DataTable } from 'mantine-datatable';
import { IconCirclePlus, IconPencil, IconArrowsSort, IconTrashFilled } from "@tabler/icons-react";
import { TextInput } from '@mantine/core';
import { FeedbackStore } from '@modules/HiringSettings/store';
import { feedback } from '@modules/HiringSettings/types';

const CustomFeedback = forwardRef((_, ref) => {
    const { applicantFeedback, setApplicantFeedback, hiringFeedback, setHiringFeedback } = FeedbackStore();

    const [applicantEditMode, setApplicantEditMode] = useState<{ [key: number]: boolean }>({});
    const [applicantEditableData, setApplicantEditableData] = useState<{ [key: number]: Partial<feedback> }>({});
    const [applicantNewRows, setApplicantNewRows] = useState<feedback[]>([]);

    const [hiringEditMode, setHiringEditMode] = useState<{ [key: number]: boolean }>({});
    const [hiringEditableData, setHiringEditableData] = useState<{ [key: number]: Partial<feedback> }>({});
    const [hiringNewRows, setHiringNewRows] = useState<feedback[]>([]);


    const toggleEditMode = (id: number, mode: string) => {
        if (mode === 'applicantFeedback') {
            // Toggle the edit mode for the specific id
            setApplicantEditMode(prevEditMode => ({
                ...prevEditMode,
                [id]: !prevEditMode[id],
            }));

            // If switching to edit mode, initialize editable data for the selected row
            if (!applicantEditMode[id]) {
                const rowData =
                    applicantFeedback.find((item) => item.id === id) ||
                    applicantNewRows.find(item => item.id === id);

                if (rowData) {
                    setApplicantEditableData(prevEditableData => ({
                        ...prevEditableData,
                        [id]: { ...rowData },
                    }));
                }
            }
        }
        else if (mode === 'hiringFeedback') {
            // Toggle the edit mode for the specific id
            setHiringEditMode(prevEditMode => ({
                ...prevEditMode,
                [id]: !prevEditMode[id],
            }));

            // If switching to edit mode, initialize editable data for the selected row
            if (!hiringEditMode[id]) {
                const rowData =
                    hiringFeedback.find((item) => item.id === id) ||
                    hiringNewRows.find(item => item.id === id);

                if (rowData) {
                    setHiringEditableData(prevEditableData => ({
                        ...prevEditableData,
                        [id]: { ...rowData },
                    }));
                }
            }
        }
    };

    const handleEditChange = (
        id: number,
        field: keyof feedback,
        value: string,
        mode: string) => {
        if (mode === 'applicantFeedback') {
            setApplicantEditableData(prev => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    [field]: value,
                },
            }));
        } else if (mode === 'hiringFeedback') {
            setHiringEditableData(prev => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    [field]: value,
                },
            }));
        }
    };

    const addNewRow = (mode: string) => {
        if (mode === 'applicantFeedback') {
            const newRow: feedback = {
                id: Math.max(...applicantFeedback.map(r => r.id), 0) + (Math.floor(Math.random() * 101 + 1)), // Automatically generate a new id
                feedback: '',
            };
            setApplicantNewRows(prev => [...prev, newRow]);
            setApplicantEditMode(prev => ({ ...prev, [newRow.id]: true }));
            setApplicantEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
        }
        else if (mode === 'hiringFeedback') {
            const newRow: feedback = {
                id: Math.max(...hiringFeedback.map(r => r.id), 0) + (Math.floor(Math.random() * 101 + 1)), // Automatically generate a new id
                feedback: '',
            };
            setHiringNewRows(prev => [...prev, newRow]);
            setHiringEditMode(prev => ({ ...prev, [newRow.id]: true }));
            setHiringEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
        }
    };

    const saveAll = () => {
        const result = [...applicantFeedback, ...applicantNewRows].map((record) =>
            applicantEditableData[record.id] ? { ...record, ...applicantEditableData[record.id] } : record
        );
        setApplicantFeedback(result);


        const result2 = [...hiringFeedback, ...hiringNewRows].map((record) =>
            hiringEditableData[record.id] ? { ...record, ...hiringEditableData[record.id] } : record
        );
        setHiringFeedback(result2);


        setApplicantNewRows([]);
        setApplicantEditMode({});
        setApplicantEditableData({});

        setHiringNewRows([]);
        setHiringEditMode({});
        setHiringEditableData({});
    };

    const cancelAll = () => {
        setApplicantNewRows([]);
        setApplicantEditMode({});
        setApplicantEditableData({});

        setHiringNewRows([]);
        setHiringEditMode({});
        setHiringEditableData({});
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
        applicantFeedback: [
            {
                accessor: 'feedback', title: (
                    <div className='flex justify-between'>
                        <p>Applicant Feedback</p>
                        <div className='flex gap-2'>
                            <IconArrowsSort size={24} className="cursor-pointer text-gray-500" />
                            <IconCirclePlus size={28} color="green" onClick={() => { addNewRow('applicantFeedback') }} className='cursor-pointer' />
                        </div>
                    </div>
                ), sortable: false,
                render: (data: any) => applicantEditMode[data.id] ? (
                    <TextInput
                        value={applicantEditableData[data.id]?.feedback || data.feedback}
                        onChange={(e: any) => handleEditChange(data.id, 'feedback', e.target.value, 'applicantFeedback')}
                        rightSection={<IconTrashFilled className='cursor-pointer' onClick={() => {
                            const updatedEditMode = Object.fromEntries(Object.entries(applicantEditMode).filter(([key]) => key != data.id));
                            const updatedApplicantEditableData = Object.fromEntries(Object.entries(applicantEditableData).filter(([key]) => key != data.id));
                            const updatedNewRows = applicantNewRows.filter((row) => row.id !== data.id);
                            setApplicantEditableData(updatedApplicantEditableData);
                            setApplicantEditMode(updatedEditMode);
                            setApplicantNewRows(updatedNewRows);
                        }} />}
                    />
                ) : <div className='flex justify-between'>
                    <p>{data.feedback}</p>
                    <div className="cursor-pointer" onClick={() => toggleEditMode(data.id, 'applicantFeedback')}>
                        {applicantEditMode[data.id] ? '' : <IconPencil />}
                    </div>
                </div>,
            },
        ],
        hiringFeedback: [
            {
                accessor: 'feedback', title: (
                    <div className='flex justify-between'>
                        <p>Hiring Feedback</p>
                        <div className='flex gap-2'>
                            <IconArrowsSort size={24} className="cursor-pointer text-gray-500" />
                            <IconCirclePlus size={28} color="green" onClick={() => { addNewRow('hiringFeedback') }} className='cursor-pointer' />
                        </div>
                    </div>
                ), sortable: false,
                render: (data: any) => hiringEditMode[data.id] ? (
                    <TextInput
                        value={hiringEditableData[data.id]?.feedback || data.feedback}
                        onChange={(e: any) => handleEditChange(data.id, 'feedback', e.target.value, 'hiringFeedback')}
                        rightSection={<IconTrashFilled className='cursor-pointer' onClick={() => {
                            const updatedHiringEditMode = Object.fromEntries(Object.entries(hiringEditMode).filter(([key]) => key != data.id));
                            const updatedHiringEditableData = Object.fromEntries(Object.entries(hiringEditableData).filter(([key]) => key != data.id));
                            const updatedHiringNewRows = hiringNewRows.filter((row) => row.id !== data.id);
                            setHiringEditMode(updatedHiringEditMode);
                            setHiringEditableData(updatedHiringEditableData);
                            setHiringNewRows (updatedHiringNewRows);
                        }} />}
                    />
                ) : <div className='flex justify-between'>
                    <p>{data.feedback}</p>
                    <div className="cursor-pointer" onClick={() => toggleEditMode(data.id, 'hiringFeedback')}>
                        {hiringEditMode[data.id] ? '' : <IconPencil />}
                    </div>
                </div>,
            },
        ],
    };

    return (
        <div className="flex flex-col h-[100%] gap-8  ">
            <div className='flex flex-col mb-4 gap-2'>
                <p className="text-[#559CDA] font-bold">Feedback</p>
                <p className="text-[#6D6D6D]">This section allows you to add custom feedback from both the hiring team (after every interview) and the applicant (upon receiving a job offer). If no feedback is provided by the applicant, select "No Response."</p>
            </div>
            <div className='flex justify-start gap-[15%] h-[78%]'>
                <div className='w-[30%] '>
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
                        records={[...applicantFeedback, ...applicantNewRows]}
                        columns={(columns as any)['applicantFeedback']}
                    />
                </div>
                <div className='w-[30%] '>
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
                        records={[...hiringFeedback, ...hiringNewRows]}
                        columns={(columns as any)['hiringFeedback']}
                    />
                </div>
            </div>
        </div>
    );
});

export default CustomFeedback;
