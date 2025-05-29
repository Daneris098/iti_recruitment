import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { DataTable } from 'mantine-datatable';
import { IconCirclePlus, IconPencil, IconArrowsSort, IconTrashFilled, IconCircleX } from "@tabler/icons-react";
import { TextInput } from '@mantine/core';
import { FeedbackStore, HiringSettingsStore } from '@modules/HiringSettings/store';
import { AlertType, feedback, Operation } from '@modules/HiringSettings/types';
import axiosInstance from '@src/api';

const CustomFeedback = forwardRef((_, ref) => {
    const { setValidationMessage, setAlert } = HiringSettingsStore();
    const { applicantFeedback, setApplicantFeedback, hiringFeedback, setHiringFeedback, sortStatusApplicant, sortStatusHiring, setSortStatusApplicant, setSortStatusHiring } = FeedbackStore();

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

    useEffect(() => {
        fetchData()
    }, [sortStatusApplicant, sortStatusHiring])

    const fetchData = async () => {
        const sortValApplicant = `SortBy=${sortStatusApplicant.direction ? '%2B' : '-'}id`;
        const url = `/recruitment/hiring/feedbacks?IsApplicantFeedback=true&${sortValApplicant}`;

        await axiosInstance
            .get(url)
            .then((response) => {
                const feedback: feedback[] = []
                response.data.items.forEach((element: any) => {
                    feedback.push({ id: element.id, feedback: element.description, guid: element.guid })
                });
                setApplicantFeedback(feedback)
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message)
            });

        const sortValHiring = `SortBy=${sortStatusHiring.direction ? '%2B' : '-'}id`;
        const url2 = `/recruitment/hiring/feedbacks?IsApplicantFeedback=false&${sortValHiring}`;
        await axiosInstance
            .get(url2)
            .then((response) => {
                const feedback: feedback[] = []
                response.data.items.forEach((element: any) => {
                    feedback.push({ id: element.id, feedback: element.description, guid: element.guid })
                });
                setHiringFeedback(feedback)
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message)
            });
    };

    const addFeedback = async (formVal: any) => {
        const payload = {
            description: formVal.description,
            isApplicantFeedback: formVal.isApplicantFeedback,
        };
        await axiosInstance
            .post("/recruitment/hiring/feedbacks", payload)
            .then((response) => {
                fetchData()
                setAlert(AlertType.saved);
            })
            .catch((error) => {
                const message = error.response.data.title;
                setValidationMessage(message);
                setAlert(AlertType.validation)
                console.error(message);
            });
    };

    const updateFeedback = async (formVal: any) => {
        const payload = {
            id: formVal.id,
            guid: formVal.guid,
            description: formVal.description,
            isApplicantFeedback: formVal.isApplicantFeedback,
        };
        await axiosInstance
            .post(`/recruitment/hiring/feedbacks/${formVal.id}/update`, payload)
            .then((response) => {
                fetchData()
                setAlert(AlertType.saved);
            })
            .catch((error) => {
                const message = error.response.data.title;
                setValidationMessage(message);
                setAlert(AlertType.validation)
                console.error(message);
            });
    };

    useEffect(() => {
        fetchData()
    }, [])

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
        if (!checkEditIsValid(mode) || (operation != Operation.noOperation && operation != Operation.add)) {
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
        setSelectedRowId2(null);

        if (operation == Operation.add) {
            if (applicantEditableData && Object.keys(applicantEditableData).length > 0) {
                addFeedback({ description: Object.values(applicantEditableData)[0]?.feedback, isApplicantFeedback: true, guid: Object.values(applicantEditableData)[0]?.guid })
            }
            else {
                addFeedback({ description: Object.values(hiringEditableData)[0]?.feedback, isApplicantFeedback: false, guid: Object.values(hiringEditableData)[0]?.guid })
            }
        }
        else if (operation == Operation.edit) {
            if (applicantEditableData && Object.keys(applicantEditableData).length > 0) {
                updateFeedback({ id: Object.values(applicantEditableData)[0]?.id, description: Object.values(applicantEditableData)[0]?.feedback, isApplicantFeedback: true, guid: Object.values(applicantEditableData)[0]?.guid })
            }
            else {
                updateFeedback({ id: Object.values(hiringEditableData)[0]?.id, description: Object.values(hiringEditableData)[0]?.feedback, isApplicantFeedback: false, guid: Object.values(hiringEditableData)[0]?.guid })
            }
        }

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
                        <p>Applicant Feedback <span className={operation != Operation.noOperation && applicantNewRows.length > 0 ? `text-red-500` : `hidden`}>*</span></p>
                        <div className='flex gap-2'>
                            <IconArrowsSort size={24} onClick={() => {
                                setSortStatusApplicant({ columnAccessor: 'name', direction: (!sortStatusApplicant.direction) })

                            }} className="cursor-pointer text-gray-500" />
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
                        <p>Hiring Feedback <span className={operation != Operation.noOperation && hiringNewRows.length > 0 ? `text-red-500 ` : `hidden`}>*</span></p>
                        <div className='flex gap-2'>
                            <IconArrowsSort size={24} className="cursor-pointer text-gray-500" onClick={() => {
                                setSortStatusHiring({ columnAccessor: 'name', direction: (!sortStatusHiring.direction) })

                            }} />
                            <IconCirclePlus size={28} color="green" onClick={() => { addNewRow('hiringFeedback') }} className='cursor-pointer' />
                        </div>
                    </div>
                ), sortable: false,
                render: (data: any) => hiringEditMode[data.id] && data.fieldStatus === 'new' ? (
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


    const checkEditIsValid = (operationFrom?: string) => {
        const fieldsToCheck = ['feedback'];

        if (operationFrom === 'applicantFeedback' && hiringNewRows.length > 0) {
            setValidationMessage(`Please complete unsave changes`);
            setAlert(AlertType.validation)
            return false
        }

        if (operationFrom === 'hiringFeedback' && applicantNewRows.length > 0) {
            setValidationMessage(`Please complete unsave changes`);
            setAlert(AlertType.validation)
            return false
        }

        return !Object.entries(applicantEditableData).some(([_, data]) =>
            fieldsToCheck.some(field => {
                const value = (data as any)[field];
                if ((typeof value === 'string' && value.trim() === '') || value == null) {
                    setValidationMessage(`${field} is empty`);
                    setAlert(AlertType.validation)
                    return true;
                }
                return false;
            })
        ) && !Object.entries(hiringEditableData).some(([_, data]) =>
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
        trigger: 'never',
        allowMultiple: false,
        expanded: {
            recordIds: expandedRowIds,
            onRecordIdsChange: setExpandedRowIds,
        },
        expandable: ({ record: { isNewField } }: any) => { return (!isNewField) },
        content: ({ record: { id } }: any) => {
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
        trigger: 'never',
        allowMultiple: false,
        expanded: {
            recordIds: expandedRowIds2,
            onRecordIdsChange: setExpandedRowIds2,
        },
        expandable: ({ record: { isNewField } }: any) => { return (!isNewField) },
        content: ({ record: { id } }: any) => {
            return (
                <div className='flex gap-2 relative bg-[#DEECFF]'>
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
                        records={[...applicantNewRows, ...applicantFeedback]}
                        columns={(columns as any)['applicantFeedback']}
                        rowExpansion={rowExpansion1}
                    // sortStatus={sortStatusApplicant}
                    // onSortStatusChange={(sort) => {
                    //     setSortStatusApplicant(sort as { columnAccessor: any; direction: "asc" | "desc" })
                    // }}

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
                        records={[...hiringNewRows, ...hiringFeedback]}
                        columns={(columns as any)['hiringFeedback']}
                        rowExpansion={rowExpansion2}
                    // sortStatus={sortStatusHiring}
                    // onSortStatusChange={(sort) => {
                    //     setSortStatusHiring(sort as { columnAccessor: any; direction: "asc" | "desc" })
                    // }}

                    />
                </div>
            </div>
        </div>
    );
});

export default CustomFeedback;
