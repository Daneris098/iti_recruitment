import { IconCaretDownFilled, IconCirclePlus, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import { InteviewerStore } from "@modules/HiringSettings/store"
import { useState, forwardRef, useImperativeHandle } from "react";
import { interviewer } from "@modules/HiringSettings/types"
import { DataTable } from "mantine-datatable";
import { Select, TextInput } from "@mantine/core";


const Interviewers = forwardRef((_, ref) => {
    const { interviewers, setInterviewers } = InteviewerStore()
    const [interviewStagesEditMode, setInterviewStagesEditMode] = useState<{ [key: number]: boolean }>({});
    const [interviewStagesEditableData, setInterviewStagesEditableData] = useState<{ [key: number]: Partial<interviewer> }>({});
    const [interviewStagesNewRows, setInterviewStagesNewRows] = useState<interviewer[]>([]);

    const columns: any =
        [
            {
                accessor: 'feedback', title: ('Stage Name'), sortable: true,
                render: (data: any) => interviewStagesEditMode[data.id] ? (
                    <TextInput
                        value={interviewStagesEditableData[data.id]?.name || data.name}
                        onChange={(e: any) => handleEditChange(data.id, 'name', e.target.value)}
                    />
                ) :
                    <p>{data.name}</p>
            },
            {
                accessor: 'lastModified', title: ('Last Modified'), sortable: true,
                render: (data: any) => (
                    <p>{data.lastModified}</p>

                )
            },
            {
                accessor: 'status', title: 'Status', sortable: true,
                render: (data: any) => interviewStagesEditMode[data.id] ? (
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
                        <IconTrashFilled className='cursor-pointer mt-1 ml-1' onClick={() => {
                            const updatedInterviewStagesEditMode = Object.fromEntries(Object.entries(interviewStagesEditMode).filter(([key]) => key != data.id));
                            const updatedInterviewStagesEditableData = Object.fromEntries(Object.entries(interviewStagesEditableData).filter(([key]) => key != data.id));
                            const updatedInterviewStagesNewRows = interviewStagesNewRows.filter((row) => row.id !== data.id);
                            setInterviewStagesEditMode(updatedInterviewStagesEditMode);
                            setInterviewStagesEditableData(updatedInterviewStagesEditableData);
                            setInterviewStagesNewRows(updatedInterviewStagesNewRows);
                        }} />
                    </div>
                ) :
                    <div className='flex justify-between'>
                        <p>{data.status}</p>
                        <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                            {interviewStagesEditMode[data.id] ? '' : <IconPencil />}
                        </div>
                    </div>
                ,
            },
        ];

    const addNewRow = () => {
        const newRow: interviewer = {
            id: Math.max(...interviewers.map(r => r.id), 0) + (Math.floor(Math.random() * 101 + 1)), // Automatically generate a new id
            name: '',
            status: 'ACTIVE',
            lastModified: '',
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
        const result = [...interviewers, ...interviewStagesNewRows].map((record) =>
            interviewStagesEditableData[record.id] ? { ...record, ...interviewStagesEditableData[record.id] } : record
        );
        setInterviewers(result);

        setInterviewStagesNewRows([]);
        setInterviewStagesEditMode({});
        setInterviewStagesEditableData({});
    };

    const cancelAll = () => {
        setInterviewStagesNewRows([]);
        setInterviewStagesEditMode({});
        setInterviewStagesEditableData({});
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
        <div className="flex flex-col gap-8 h-[100%]">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <p className="text-[#559CDA] font-bold">Interviewers</p>
                    <div>
                        <IconCirclePlus
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
            />
        </div>
    )
})

export default Interviewers;