import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { DataTable } from 'mantine-datatable';
import { IconCirclePlus, IconPencil, IconArrowsSort, IconTrashFilled, IconCircleX, IconCaretDownFilled } from "@tabler/icons-react";
import { Select, TextInput } from '@mantine/core';
import { FeedbackStore, HiringSettingsStore } from '@modules/HiringSettings/store';
import { AlertType, feedback, Operation } from '@modules/HiringSettings/types';

const CustomFeedback = forwardRef((_, ref) => {
    const { setValidationMessage, setAlert } = HiringSettingsStore();
    const { applicantFeedback, setApplicantFeedback, hiringFeedback, setHiringFeedback } = FeedbackStore();

    const [applicantEditMode, setApplicantEditMode] = useState<{ [key: number]: boolean }>({});
    const [applicantEditableData, setApplicantEditableData] = useState<{ [key: number]: Partial<feedback> }>({});
    const [applicantNewRows, setApplicantNewRows] = useState<feedback[]>([]);

    const [hiringEditMode, setHiringEditMode] = useState<{ [key: number]: boolean }>({});
    const [hiringEditableData, setHiringEditableData] = useState<{ [key: number]: Partial<feedback> }>({});
    const [hiringNewRows, setHiringNewRows] = useState<feedback[]>([]);

    const [operation, SetOperation] = useState(Operation.noOperation)
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [selectedRowId2, setSelectedRowId2] = useState<number | null>(null);

    type FeedbackMode = "applicantFeedback" | "hiringFeedback";

    const toggleEditMode = (id: number, mode: FeedbackMode) => {
        SetOperation(Operation.edit)
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
        if (!checkEditIsValid() || (operation != Operation.noOperation && operation != Operation.add)) {
            return
        }
        setSelectedRowId(null)
        if (mode === 'applicantFeedback') {
            const newRow: feedback = {
                id: Math.max(...applicantFeedback.map(r => r.id), 0) + (Math.floor(Math.random() * 101 + 1)),
                feedback: '',
                fieldStatus: 'new'
            };
            setApplicantNewRows(prev => [...prev, newRow]);
            setApplicantEditMode(prev => ({ ...prev, [newRow.id]: true }));
            setApplicantEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
        }
        else if (mode === 'hiringFeedback') {
            const newRow: feedback = {
                id: Math.max(...hiringFeedback.map(r => r.id), 0) + (Math.floor(Math.random() * 101 + 1)),
                feedback: '',
                fieldStatus: 'new'
            };
            setHiringNewRows(prev => [...prev, newRow]);
            setHiringEditMode(prev => ({ ...prev, [newRow.id]: true }));
            setHiringEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
        }
        SetOperation(Operation.add)
    };

    const saveAll = () => {
        if (!checkEditIsValid()) {
            return
        }
        setSelectedRowId(null);
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

        setExpandedRowIds([])
        setExpandedRowIds2([])
        SetOperation(Operation.noOperation)
    };

    const cancelAll = () => {
        setSelectedRowId(null);
        setSelectedRowId2(null);

        setApplicantNewRows([]);
        setApplicantEditMode({});
        setApplicantEditableData({});

        setHiringNewRows([]);
        setHiringEditMode({});
        setHiringEditableData({});

        setExpandedRowIds([])
        setExpandedRowIds2([])
        SetOperation(Operation.noOperation)
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
                render: (data: any) => applicantEditMode[data.id] && data.fieldStatus === 'new' ?
                    (
                        <TextInput
                            className='w-full'
                            value={applicantEditableData[data.id]?.feedback || data.feedback}
                            onChange={(e: any) => handleEditChange(data.id, 'feedback', e.target.value, 'applicantFeedback')}
                            rightSection={
                                <div onClick={() => {
                                    const updatedEditMode = Object.fromEntries(Object.entries(applicantEditMode).filter(([key]) => key != data.id));
                                    const updatedApplicantEditableData = Object.fromEntries(Object.entries(applicantEditableData).filter(([key]) => key != data.id));
                                    const updatedNewRows = applicantNewRows.filter((row) => row.id !== data.id);
                                    setApplicantEditableData(updatedApplicantEditableData);
                                    setApplicantEditMode(updatedEditMode);
                                    setApplicantNewRows(updatedNewRows);
                                }}>
                                    {applicantFeedback.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                                </div>
                            }
                        />
                    )
                    :
                    <div className='flex justify-between w-full '>
                        <p>{data.feedback}</p>
                        <div className="cursor-pointer" onClick={() => {
                            if (!checkEditIsValid() || (operation != Operation.noOperation && operation != Operation.edit)) {
                                return
                            }
                            setSelectedRowId(data.id)
                            setExpandedRowIds([data.id])
                            toggleEditMode(data.id, 'applicantFeedback')
                            setApplicantNewRows([]);
                        }}>
                            <IconPencil />
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
                render: (data: any) => hiringEditMode[data.id] && data.fieldStatus === 'new'  ? (
                    <TextInput
                        value={hiringEditableData[data.id]?.feedback || data.feedback}
                        onChange={(e: any) => handleEditChange(data.id, 'feedback', e.target.value, 'hiringFeedback')}
                        rightSection={
                            <div onClick={() => {
                                const updatedHiringEditMode = Object.fromEntries(Object.entries(hiringEditMode).filter(([key]) => key != data.id));
                                const updatedHiringEditableData = Object.fromEntries(Object.entries(hiringEditableData).filter(([key]) => key != data.id));
                                const updatedHiringNewRows = hiringNewRows.filter((row) => row.id !== data.id);
                                setHiringEditMode(updatedHiringEditMode);
                                setHiringEditableData(updatedHiringEditableData);
                                setHiringNewRows(updatedHiringNewRows);
                            }}>
                                {hiringFeedback.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                            </div>
                        }
                    />
                ) : <div className='flex justify-between'>
                    <p>{data.feedback}</p>
                    <div className="cursor-pointer" onClick={() => {
                        if (!checkEditIsValid() || (operation != Operation.noOperation && operation != Operation.edit)) {
                            return
                        }
                        setSelectedRowId2(data.id)
                        setExpandedRowIds2([data.id])
                        toggleEditMode(data.id, 'hiringFeedback')
                        setHiringNewRows([]);

                    }}>
                        <IconPencil />
                    </div>
                </div>,
            },
        ],
    };


    const checkEditIsValid = () => {
        const fieldsToCheck = ['feedback'];
        return !Object.entries(applicantEditableData).some(([key, data]) =>
            fieldsToCheck.some(field => {
                const value = (data as any)[field];
                if ((typeof value === 'string' && value.trim() === '') || value == null) {
                    setValidationMessage(`${field} is empty`);
                    setAlert(AlertType.validation)
                    return true;
                }
                return false;
            })
        ) && !Object.entries(hiringEditableData).some(([key, data]) =>
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


    const [expandedRowIds, setExpandedRowIds] = useState<number[]>([]);
    const [expandedRowIds2, setExpandedRowIds2] = useState<number[]>([]);

    
    const rowExpansion1: any = {
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
                <div className=' flex gap-2 relative bg-[#DEECFF] p-4 -m-4 '>
                    <TextInput
                        className="w-full"
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={applicantEditableData[id]?.feedback ?? ''} // fallback to empty string instead of undefined
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'feedback', e.target.value, 'applicantFeedback')}
                        error={(applicantEditableData[id]?.feedback ?? '').trim() === '' ? 'Required' : undefined}
                    />
                </div>
            )
        },
    };
    const rowExpansion2: any = {
        collapseProps: {
            transitionDuration: 500,
            animateOpacity: true,
            transitionTimingFunction: 'ease-out',
        },
        trigger: 'never',
        allowMultiple: false,
        expanded: {
            recordIds: expandedRowIds2,
            onRecordIdsChange: setExpandedRowIds2,
        },
        expandable: ({ record: { isNewField } }: any) => { return (!isNewField) },
        content: ({ record: { name, id, code, status } }: any) => {
            // console.log('editableData[id]: ', editableData[id]);
            return (
                <div className='flex gap-2 relative bg-[#DEECFF] p-4 -m-4 '>
                    <TextInput
                        className="w-full"
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={hiringEditableData[id]?.feedback ?? ''} // fallback to empty string instead of undefined
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'feedback', e.target.value, 'hiringFeedback')}
                        error={(hiringEditableData[id]?.feedback ?? '').trim() === '' ? 'Required' : undefined}
                    />
                </div>
            )
        },
    };


    return (
        <div className="flex flex-col h-[100%] gap-8  ">
            <div className='flex flex-col mb-4 gap-2'>
                <p className="text-[#559CDA] font-bold">Feedback</p>
                <p className="text-[#6D6D6D]">This section allows you to add custom feedback from both the hiring team (after every interview) and the applicant (upon receiving a job offer). If no feedback is provided by the applicant, select "No Response."</p>
            </div>
            <div className='flex justify-start gap-[15%] h-[78%]'>
                <div className='w-[30%]'>
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
                        withTableBorder
                        records={[...applicantFeedback, ...applicantNewRows]}
                        columns={(columns as any)['applicantFeedback']}
                        rowExpansion={rowExpansion1}
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
                        rowClassName={(row) => row.id === selectedRowId2 ? "bg-[#DEECFF]" : ""}
                        withTableBorder
                        records={[...hiringFeedback, ...hiringNewRows]}
                        columns={(columns as any)['hiringFeedback']}
                        rowExpansion={rowExpansion2}
                    />
                </div>
            </div>
        </div>
    );
});

export default CustomFeedback;
