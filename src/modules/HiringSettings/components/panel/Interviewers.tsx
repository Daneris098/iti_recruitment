import { IconCaretDownFilled, IconCirclePlus, IconCircleX, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import { InteviewerStore, HiringSettingsStore } from "@modules/HiringSettings/store"
import { useState, forwardRef, useImperativeHandle } from "react";
import { AlertType, interviewer, Operation } from "@modules/HiringSettings/types"
import { DataTable } from "mantine-datatable";
import { Select, TextInput } from "@mantine/core";

const Interviewers = forwardRef((_, ref) => {
    const { setValidationMessage, setAlert } = HiringSettingsStore();
    const { interviewers, setInterviewers } = InteviewerStore()
    const [interviewStagesEditMode, setInterviewStagesEditMode] = useState<{ [key: number]: boolean }>({});
    const [interviewStagesEditableData, setInterviewStagesEditableData] = useState<{ [key: number]: Partial<interviewer> }>({});
    const [interviewStagesNewRows, setInterviewStagesNewRows] = useState<interviewer[]>([]);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [operation, SetOperation] = useState(Operation.noOperation)

    const columns: any =
        [
            {
                accessor: 'name', title: ('Interviewer'), sortable: true,
                render: (data: any) => interviewStagesEditMode[data.id] && data.fieldStatus === 'new' ? (
                    <TextInput
                        value={interviewStagesEditableData[data.id]?.name || data.name}
                        onChange={(e: any) => handleEditChange(data.id, 'name', e.target.value)}
                    />
                ) :
                    <p>{data.name}</p>
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
                    <div className="flex">
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
                            {interviewers.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
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
        const fieldsToCheck = ['name'];
        return !Object.entries(interviewStagesEditableData).some(([key, data]) =>
            fieldsToCheck.some(field => {
                const value = (data as any)[field];
                console.log('value: ', value)
                if ((typeof value === 'string' && value.trim() === '') || value == null) {
                    setValidationMessage(`${field} is empty`);
                    setAlert(AlertType.validation)
                    return true;
                }
                return false;
            })
        )
    };

    const addNewRow = () => {
        if (!checkEditIsValid() || (operation != Operation.noOperation && operation != Operation.add)) {
            return
        }
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        const newRow: interviewer = {
            id: Math.max(...interviewers.map(r => r.id), 0) + (Math.floor(Math.random() * 101 + 1)), 
            fieldStatus: 'new',
            name: '',
            status: 'ACTIVE',
            lastModified: currentDate,
        };
        setInterviewStagesNewRows(prev => [...prev, newRow]);
        setInterviewStagesEditMode(prev => ({ ...prev, [newRow.id]: true }));
        setInterviewStagesEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
    };


    const handleEditChange = (
        id: number,
        field: keyof interviewer,
        value: string) => {

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
                interviewers.find((item) => item.id === id) ||
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
        const result = [...interviewers, ...interviewStagesNewRows].map((record) => {
            const merged = interviewStagesEditableData[record.id] ? { ...record, ...interviewStagesEditableData[record.id] } : record;
            const { fieldStatus, ...rest } = merged;
            return rest;
        }); 
        setInterviewers(result);
        setInterviewStagesNewRows([]);
        setInterviewStagesEditMode({});
        setInterviewStagesEditableData({});
        setExpandedRowIds([])
        setSelectedRowId(null);
        SetOperation(Operation.noOperation)
    };

    const cancelAll = () => {
        setInterviewStagesNewRows([]);
        setInterviewStagesEditMode({});
        setInterviewStagesEditableData({});
        setExpandedRowIds([])
        setSelectedRowId(null);
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
        content: ({ record: { name, id, code, status, lastModified } }: any) => {
            return (
                <div className=' flex gap-2 relative  '>
                    <TextInput
                        className="w-full"
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        value={interviewStagesEditableData[id]?.name ?? ''} // fallback to empty string instead of undefined
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'name', e.target.value)}
                        error={(interviewStagesEditableData[id]?.name ?? '').trim() === '' ? 'Required' : undefined}
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
                        onChange={(val: any) => {
                            handleEditChange(id, 'status', val)
                        }}
                        defaultValue={interviewStagesEditableData[id]?.status || status}
                    />
                </div>
            )
        },
    };


    return (
        <div className="flex flex-col gap-8 h-[100%]">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <p className="text-[#559CDA] font-bold">Interviewers</p>
                    <div>
                        <IconCirclePlus
                            className="cursor-pointer"
                            style={{ height: "100%" }}
                            color="#5A9D27"
                            onClick={addNewRow}
                        />
                    </div>
                </div>
                <p className="text-[#6D6D6D]">List individuals to conduct interviews for applicants</p>
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
                records={[...interviewers, ...interviewStagesNewRows]}
                columns={columns}
                rowClassName={(row) => row.id === selectedRowId ? "bg-[#DEECFF]" : ""}
                rowExpansion={rowExpansion1}
            />
        </div>
    )
})

export default Interviewers;