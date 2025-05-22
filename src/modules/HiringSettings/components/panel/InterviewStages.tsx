import { IconCaretDownFilled, IconCirclePlus, IconCircleX, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import { InteviewStagesStore, HiringSettingsStore } from "@modules/HiringSettings/store"
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { AlertType, interviewStage, Operation, panel } from "@modules/HiringSettings/types"
import { DataTable } from "mantine-datatable";
import { NumberInput, Select, TextInput } from "@mantine/core";
import axiosInstance from "@src/api";


const InterviewStage = forwardRef((_, ref) => {
    const { interviewStage, setInterviewStage } = InteviewStagesStore();
    const { setValidationMessage, setAlert, activePanel } = HiringSettingsStore();
    const [interviewStagesEditMode, setInterviewStagesEditMode] = useState<{ [key: number]: boolean }>({});
    const [interviewStagesEditableData, setInterviewStagesEditableData] = useState<{ [key: number]: Partial<interviewStage> }>({});
    const [interviewStagesNewRows, setInterviewStagesNewRows] = useState<interviewStage[]>([]);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [operation, SetOperation] = useState(Operation.noOperation)

    const columns: any =
        [
            {
                accessor: 'sequenceNo', title: ('Sequence No'), sortable: true,
                render: (data: any) => interviewStagesEditMode[data.id] && data.fieldStatus === 'new' ? (
                    <NumberInput
                        value={interviewStagesEditableData[data.id]?.sequenceNo || data.sequenceNo}
                        onChange={(e: any) => handleEditChange(data.id, 'sequenceNo', e)}
                    />
                ) :
                    <p>{data.sequenceNo}</p>
            },
            {
                accessor: 'stageName', title: ('Stage Name'), sortable: true,
                render: (data: any) => interviewStagesEditMode[data.id] && data.fieldStatus === 'new' ? (
                    <TextInput
                        value={interviewStagesEditableData[data.id]?.stageName || data.stageName}
                        onChange={(e: any) => handleEditChange(data.id, 'stageName', e.target.value)}
                    />
                ) :
                    <p>{data.stageName}</p>
            },
            {
                accessor: 'lastModified', title: ('Last Modified'), sortable: true,
                render: (data: any) => interviewStagesEditMode[data.id] && data.fieldStatus === 'new' ?
                    <TextInput
                        disabled
                        className="w-full cursor-default"
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        value={interviewStagesEditableData[data.id]?.lastModified || data.lastModified}
                    />
                    : <p>{data.lastModified}</p>
            },
            {
                accessor: 'status', title: 'Status', sortable: true,
                render: (data: any) => interviewStagesEditMode[data.id] && data.fieldStatus === 'new' ? (
                    <div className="flex ">
                        <Select
                            radius={8}
                            data={["ACTIVE", "INACTIVE"]}
                            rightSection={<IconCaretDownFilled size='18' />}
                            className="border-none w-full text-sm"
                            classNames={{ label: "p-1" }}
                            styles={{ label: { color: "#6d6d6d" } }}
                            onChange={(val: any) => {
                                handleEditChange(data.id, 'status', val)
                            }}
                            defaultValue={interviewStagesEditableData[data.id]?.status || data.status}
                        />
                        <div className='cursor-pointer mt-1 ml-1' onClick={() => {
                            const updatedInterviewStagesEditMode = Object.fromEntries(Object.entries(interviewStagesEditMode).filter(([key]) => key != data.id));
                            const updatedInterviewStagesEditableData = Object.fromEntries(Object.entries(interviewStagesEditableData).filter(([key]) => key != data.id));
                            const updatedInterviewStagesNewRows = interviewStagesNewRows.filter((row) => row.id !== data.id);
                            setInterviewStagesEditMode(updatedInterviewStagesEditMode);
                            setInterviewStagesEditableData(updatedInterviewStagesEditableData);
                            setInterviewStagesNewRows(updatedInterviewStagesNewRows);
                        }}>
                            {interviewStage.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                        </div>
                    </div>
                ) :
                    <div className='flex justify-between'>
                        <p>{data.status}</p>
                        <div className="cursor-pointer" onClick={() => {
                            if (!checkEditIsValid() || (operation != Operation.noOperation && operation != Operation.edit)) {
                                return
                            }
                            setSelectedRowId(data.id)
                            setExpandedRowIds([data.id])
                            toggleEditMode(data.id)
                            setInterviewStagesNewRows([]);
                        }}>
                            <IconPencil />
                        </div>
                    </div>
                ,
            },
        ];

    const checkEditIsValid = () => {
        const fieldsToCheck = ['sequenceNo', 'stageName', 'status'];
        return !Object.entries(interviewStagesEditableData).some(([_, data]) =>
            fieldsToCheck.some(field => {
                const value = (data as any)[field];
                if ((typeof value === 'string' && value.trim() === '') || value == null) {
                    setValidationMessage(`${field} is empty`);
                    setAlert(AlertType.validation)
                    return true;
                }
                return false;
            })
        )
    };

    const fetchData = async () => {
        await axiosInstance
            .get("/recruitment/hiring/interview-stages")
            .then((response) => {
                const map = response.data.items.map((item: any) => {
                    return {
                        stageName: item.name,
                        sequenceNo: item.sequenceNo,
                        status: item.isActive ? 'ACTIVE' : 'INACTIVE',
                        id: item.id,
                        guid: item.guid,
                        lastModified: item.dateModified
                    }
                });
                setInterviewStage(map)
            })
            .catch((error) => {
                const message = error.response.data.errors[0].message;
                console.error(message)
            });
    };

    const addInterviewStage = async (formVal: any) => {
        const payload = {
            id: formVal.id,
            guid: formVal.guid,
            createdById: 0,
            dateCreated: "2025-05-22T06:12:13.082Z",
            dateModified: "2025-05-22T06:12:13.082Z",
            name: formVal.stageName,
            sequenceNo: formVal.sequenceNo,
            isActive: formVal.isActive
        };
        await axiosInstance
            .post("/recruitment/hiring/interview-stages", payload)
            .then((response) => {
                fetchData()
            })
            .catch((error) => {
                const message = error.response.data.title;
                setValidationMessage(message);
                setAlert(AlertType.validation)
                console.error(message);
            });
    };

    const updateInterviewStage = async (formVal: any) => {
        const payload = {
            id: formVal.id,
            guid: formVal.guid,
            createdById: 0,
            dateCreated: "2025-05-22T06:12:13.082Z",
            dateModified: "2025-05-22T06:12:13.082Z",
            name: formVal.stageName,
            sequenceNo: formVal.sequenceNo,
            isActive: formVal.isActive
        };
        await axiosInstance
            .post(`/recruitment/hiring/interview-stages/${formVal.id}/update`, payload)
            .then((response) => {
                fetchData()
            })
            .catch((error) => {
                const message = error.response.data.title;
                setValidationMessage(message);
                setAlert(AlertType.validation)
                console.error(message);
            });
    };


    useEffect(() => {
        if (activePanel === panel.interviewStages) {
            fetchData()
        }
    }, [activePanel])

    const addNewRow = () => {
        if (!checkEditIsValid() || (operation != Operation.noOperation && operation != Operation.add)) {
            return
        }
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }); // Format: Feb 17, 2025

        const newRow: interviewStage = {
            id: Math.max(...interviewStage.map(r => r.id), 0) + (Math.floor(Math.random() * 101 + 1)),
            stageName: '',
            status: 'ACTIVE',
            fieldStatus: 'new',
            lastModified: currentDate,
        };

        setInterviewStagesNewRows(prev => [...prev, newRow]);
        setInterviewStagesEditMode(prev => ({ ...prev, [newRow.id]: true }));
        setInterviewStagesEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
        SetOperation(Operation.add)
    };

    const handleEditChange = (
        id: number,
        field: keyof interviewStage,
        value: string | number) => {
        setInterviewStagesEditableData(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));

    };

    const toggleEditMode = (id: number) => {
        SetOperation(Operation.edit)
        setInterviewStagesEditMode(prevEditMode => ({
            ...prevEditMode,
            [id]: !prevEditMode[id],
        }));
        if (!interviewStagesEditMode[id]) {
            const rowData =
                interviewStage.find((item) => item.id === id) ||
                interviewStagesNewRows.find(item => item.id === id);

            if (rowData) {
                setInterviewStagesEditableData(prevEditableData => ({
                    ...prevEditableData,
                    [id]: { ...rowData },
                }));
            }
        }
    };

    const saveAll = () => {
        if (!checkEditIsValid()) {
            return
        }

        if (operation == Operation.add) {
            if (interviewStagesEditableData && Object.keys(interviewStagesEditableData).length > 0) {
                addInterviewStage({
                    id: Object.values(interviewStagesEditableData)[0]?.id,
                    guid: Object.values(interviewStagesEditableData)[0]?.guid,
                    stageName: Object.values(interviewStagesEditableData)[0]?.stageName,
                    sequenceNo: Object.values(interviewStagesEditableData)[0]?.sequenceNo,
                    isActive: Object.values(interviewStagesEditableData)[0]?.status === 'ACTIVE',
                })
            }
        }
        else if (operation == Operation.edit) {
            if (interviewStagesEditableData && Object.keys(interviewStagesEditableData).length > 0) {
                updateInterviewStage({
                    id: Object.values(interviewStagesEditableData)[0]?.id,
                    guid: Object.values(interviewStagesEditableData)[0]?.guid,
                    stageName: Object.values(interviewStagesEditableData)[0]?.stageName,
                    sequenceNo: Object.values(interviewStagesEditableData)[0]?.sequenceNo,
                    isActive: Object.values(interviewStagesEditableData)[0]?.status === 'ACTIVE',
                })
            }
        }


        // setInterviewStage(result);
        setInterviewStagesNewRows([]);
        setInterviewStagesEditMode({});
        setInterviewStagesEditableData({});
        setSelectedRowId(null);
        setExpandedRowIds([])
        SetOperation(Operation.noOperation)
    };

    const cancelAll = () => {
        setInterviewStagesNewRows([]);
        setInterviewStagesEditMode({});
        setInterviewStagesEditableData({});
        setSelectedRowId(null);
        setExpandedRowIds([])
        SetOperation(Operation.noOperation)
    };

    useImperativeHandle(ref, () => ({
        saveAll: () => {
            saveAll()
        },
        cancelAll: () => {
            cancelAll()
        }
    }));

    const [expandedRowIds, setExpandedRowIds] = useState<number[]>([]);
    const rowExpansion1: any = {
        trigger: 'never',
        allowMultiple: false,
        expanded: {
            recordIds: expandedRowIds,
            onRecordIdsChange: setExpandedRowIds,
        },
        expandable: ({ record: { isNewField } }: any) => { return (!isNewField) },
        content: ({ record: { id, status, lastModified } }: any) => {
            return (
                <div className=' flex gap-2 relative'>
                    <TextInput
                        className="w-full"
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={interviewStagesEditableData[id]?.sequenceNo ?? ''} // fallback to empty string instead of undefined
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'sequenceNo', e.target.value)}
                        error={interviewStagesEditableData[id]?.sequenceNo === undefined || interviewStagesEditableData[id]?.sequenceNo === null ? 'Required' : undefined}

                    />
                    <TextInput
                        className="w-full"
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={interviewStagesEditableData[id]?.stageName ?? ''} // fallback to empty string instead of undefined
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'stageName', e.target.value)}
                        error={(interviewStagesEditableData[id]?.stageName ?? '').trim() === '' ? 'Required' : undefined}
                    />
                    <TextInput
                        disabled
                        className="w-full cursor-default"
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        value={interviewStagesEditableData[id]?.lastModified || lastModified}
                    />
                    <Select
                        radius={8}
                        data={["ACTIVE", "INACTIVE"]}
                        rightSection={<IconCaretDownFilled size='18' />}
                        className="border-none w-full text-sm"
                        classNames={{ label: "p-1" }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        onChange={(val: any) => { handleEditChange(id, 'status', val) }}
                        defaultValue={interviewStagesEditableData[id]?.status || status}
                    />
                </div>
            )
        },
    };


    return (
        <div className="flex flex-col gap-8 h-[100%]">
            <div className="flex flex-col gap-2 ">
                <div className="flex gap-2">
                    <p className="text-[#559CDA] font-bold">Custom Interview Stages</p>
                    <div>
                        <IconCirclePlus
                            style={{ height: "100%" }}
                            color="#5A9D27"
                            onClick={addNewRow}
                        />
                    </div>
                </div>
                <p className="text-[#6D6D6D]">Customize your interview stages to align with your organization's specific recruitment process.</p>
            </div>
            <DataTable
                className=" mx-2"
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
                records={[...interviewStage, ...interviewStagesNewRows]}
                columns={columns}
                rowClassName={(row) => row.id === selectedRowId ? "bg-[#DEECFF]" : ""}
                rowExpansion={rowExpansion1}
            />
        </div>
    )
})

export default InterviewStage;