import { IconCaretDownFilled, IconCirclePlus, IconCircleX, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import { useState, forwardRef, useImperativeHandle } from "react";
import { DataTable } from "mantine-datatable";
import { ApplicationSourceStore, HiringSettingsStore } from "@modules/HiringSettings/store"
import { AlertType, applicationSource, Operation } from "@modules/HiringSettings/types"
import { Select, TextInput } from "@mantine/core";


const ApplicationSource = forwardRef((_, ref) => {
    const { applicationSources, setApplicationSources } = ApplicationSourceStore()
    const [applicationEditMode, setApplicationEditMode] = useState<{ [key: number]: boolean }>({});
    const [applicationEditableData, setApplicationEditableData] = useState<{ [key: number]: Partial<applicationSource> }>({});
    const [applicationNewRow, setApplcationNewRow] = useState<applicationSource[]>([]);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [operation, SetOperation] = useState(Operation.noOperation)
    const { setValidationMessage, setAlert } = HiringSettingsStore();
 
    const columns: any =
        [
            {
                accessor: 'sourceName', title: ('Source Name'), sortable: true,
                render: (data: any) => applicationEditMode[data.id] && data.fieldStatus === 'new' ? (
                    <TextInput
                        value={applicationEditableData[data.id]?.sourceName || data.sourceName}
                        onChange={(e: any) => handleEditChange(data.id, 'sourceName', e.target.value)}
                    />
                ) :
                    <p>{data.sourceName}</p>
            },
            {
                accessor: 'lastModified', title: ('Last Modified'), sortable: true,
                render: (data: any) => applicationEditMode[data.id] && data.fieldStatus === 'new' ?
                    <TextInput
                        disabled
                        className="w-full cursor-default"
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        value={applicationEditableData[data.id]?.lastModified || data.lastModified}
                    />
                    : <p>{data.lastModified}</p>
            },
            {
                accessor: 'status', title: 'Status', sortable: true,
                render: (data: any) => applicationEditMode[data.id] && data.fieldStatus === 'new' ? (
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
                            defaultValue={applicationEditableData[data.id]?.status || data.status}
                        />
                        <div className='cursor-pointer mt-1 ml-1' onClick={() => {
                            const updatedApplicationEditMode = Object.fromEntries(Object.entries(applicationEditMode).filter(([key]) => key != data.id));
                            const updatedapplicationEditableData = Object.fromEntries(Object.entries(applicationEditableData).filter(([key]) => key != data.id));
                            const updatedApplicationNewRow = applicationNewRow.filter((row) => row.id !== data.id);
                            setApplicationEditMode(updatedApplicationEditMode);
                            setApplicationEditableData(updatedapplicationEditableData);
                            setApplcationNewRow(updatedApplicationNewRow);
                        }}>
                            {applicationSources.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
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
                            setApplcationNewRow([]);
                        }}>
                            <IconPencil />
                        </div>
                    </div>
                ,
            },
        ];

      const checkEditIsValid = () => {
          const fieldsToCheck = ['sourceName'];
          return !Object.entries(applicationEditableData).some(([data]) =>
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
    
    const addNewRow = () => {
        if (!checkEditIsValid() || (operation != Operation.noOperation && operation != Operation.add)) {
            return
        }
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        const newRow: applicationSource = {
            id: Math.max(...applicationSources.map(r => r.id), 0) + (Math.floor(Math.random() * 101 + 1)), // Automatically generate a new id
            sourceName: '',
            fieldStatus: 'new',
            status: 'ACTIVE',
            lastModified: currentDate,
        };
        setApplcationNewRow(prev => [...prev, newRow]);
        setApplicationEditMode(prev => ({ ...prev, [newRow.id]: true }));
        setApplicationEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
    };


    const handleEditChange = (
        id: number,
        field: keyof applicationSource,
        value: string) => {

        setApplicationEditableData(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));

    };

    const toggleEditMode = (id: number) => {
        setApplicationEditMode(prevEditMode => ({
            ...prevEditMode,
            [id]: !prevEditMode[id],
        }));
        if (!applicationEditMode[id]) {
            const rowData =
                applicationSources.find((item) => item.id === id) ||
                applicationNewRow.find(item => item.id === id);

            if (rowData) {
                setApplicationEditableData(prevEditableData => ({
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
        const result = [...applicationSources, ...applicationNewRow].map((record) => {
            const merged = applicationEditableData[record.id] ? { ...record, ...applicationEditableData[record.id] } : record;
            const { fieldStatus, ...rest } = merged;
            return rest;
        });
        setApplicationSources(result);
        setApplcationNewRow([]);
        setApplicationEditMode({});
        setApplicationEditableData({});
        setSelectedRowId(null);
        setExpandedRowIds([])
        SetOperation(Operation.noOperation)

    };

    const cancelAll = () => {
        setApplcationNewRow([]);
        setApplicationEditMode({});
        setApplicationEditableData({});
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
                        value={applicationEditableData[id]?.sourceName ?? ''} // fallback to empty string instead of undefined
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(id, 'sourceName', e.target.value)}
                        error={(applicationEditableData[id]?.sourceName ?? '').trim() === '' ? 'Required' : undefined}
                    />
                    <TextInput
                        disabled
                        className="w-full cursor-default"
                        classNames={{ input: 'poppins text-[#6D6D6D]' }}
                        styles={{ label: { color: "#6d6d6d" } }}
                        value={applicationEditableData[id]?.lastModified || lastModified}
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
                        defaultValue={applicationEditableData[id]?.status || status}
                    />
                </div>
            )
        },
    };
    

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <p className="text-[#559CDA] font-bold">Application Source</p>
                    <div>
                        <IconCirclePlus
                            style={{ height: "100%" }}
                            color="#5A9D27"
                            onClick={addNewRow}
                        />
                    </div>
                </div>
                <p className="text-[#6D6D6D]">List all application sources of your company.</p>
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
                withTableBorder
                records={[...applicationSources, ...applicationNewRow]}
                columns={columns}
                rowExpansion={rowExpansion1}
            />
        </div>
    )
})

export default ApplicationSource;