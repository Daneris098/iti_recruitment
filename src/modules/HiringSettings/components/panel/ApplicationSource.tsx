import { IconCaretDownFilled, IconCirclePlus, IconCircleX, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import { useState, forwardRef, useImperativeHandle } from "react";
import { DataTable } from "mantine-datatable";
import { ApplicationSourceStore } from "@modules/HiringSettings/store"
import { applicationSource } from "@modules/HiringSettings/types"
import { Select, TextInput } from "@mantine/core";


const ApplicationSource = forwardRef((_, ref) => {
    const { applicationSources, setApplicationSources } = ApplicationSourceStore()
    const [applicationEditMode, setApplicationEditMode] = useState<{ [key: number]: boolean }>({});
    const [applicationEditableData, setApplicationEditableData] = useState<{ [key: number]: Partial<applicationSource> }>({});
    const [applicationNewRow, setApplcationNewRow] = useState<applicationSource[]>([]);

    const columns: any =
        [
            {
                accessor: 'sourceName', title: ('Source Name'), sortable: true,
                render: (data: any) => applicationEditMode[data.id] ? (
                    <TextInput
                        value={applicationEditableData[data.id]?.sourceName || data.sourceName}
                        onChange={(e: any) => handleEditChange(data.id, 'sourceName', e.target.value)}
                    />
                ) :
                    <p>{data.sourceName}</p>
            },
            {
                accessor: 'lastModified', title: ('Last Modified'), sortable: true,
                render: (data: any) => applicationEditMode[data.id] ?
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
                render: (data: any) => applicationEditMode[data.id] ? (
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
                            const updatedInterviewStagesEditableData = Object.fromEntries(Object.entries(applicationEditableData).filter(([key]) => key != data.id));
                            const updatedApplicationNewRow = applicationNewRow.filter((row) => row.id !== data.id);
                            setApplicationEditMode(updatedApplicationEditMode);
                            setApplicationEditableData(updatedInterviewStagesEditableData);
                            setApplcationNewRow(updatedApplicationNewRow);
                        }}>
                            {applicationSources.some((item) => item.id === data.id) ? <IconCircleX className='cursor-pointer' /> : <IconTrashFilled className='cursor-pointer' />}
                        </div>

                    </div>
                ) :
                    <div className='flex justify-between'>
                        <p>{data.status}</p>
                        <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                            {applicationEditMode[data.id] ? '' : <IconPencil />}
                        </div>
                    </div>
                ,
            },
        ];

    const addNewRow = () => {
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        const newRow: applicationSource = {
            id: Math.max(...applicationSources.map(r => r.id), 0) + (Math.floor(Math.random() * 101 + 1)), // Automatically generate a new id
            sourceName: '',
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
        const result = [...applicationSources, ...applicationNewRow].map((record) =>
            applicationEditableData[record.id] ? { ...record, ...applicationEditableData[record.id] } : record
        );
        setApplicationSources(result);

        setApplcationNewRow([]);
        setApplicationEditMode({});
        setApplicationEditableData({});
    };

    const cancelAll = () => {
        setApplcationNewRow([]);
        setApplicationEditMode({});
        setApplicationEditableData({});
    };

    useImperativeHandle(ref, () => ({
        saveAll: () => {
            saveAll()
        },
        cancelAll: () => {
            cancelAll()
        }
    }));



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
                withTableBorder
                records={[...applicationSources, ...applicationNewRow]}
                columns={columns}
            />
        </div>
    )
})

export default ApplicationSource;