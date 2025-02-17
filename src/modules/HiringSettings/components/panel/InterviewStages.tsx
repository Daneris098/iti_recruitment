import { IconArrowsSort, IconCaretDownFilled, IconCirclePlus, IconPencil } from "@tabler/icons-react";
import { InteviewStagesStore } from "@modules/HiringSettings/store"
import { useState, forwardRef, useImperativeHandle } from "react";
import { interviewStage } from "@modules/HiringSettings/types"
import { DataTable } from "mantine-datatable";
import { Select, TextInput } from "@mantine/core";


const InterviewStage = forwardRef((_, ref) => {
    const { interviewStage, setInterviewStage } = InteviewStagesStore()
    const [interviewStagesEditMode, setInterviewStagesEditMode] = useState<{ [key: number]: boolean }>({});
    const [interviewStagesEditableData, setInterviewStagesEditableData] = useState<{ [key: number]: Partial<interviewStage> }>({});
    const [interviewStagesNewRows, setInterviewStagesNewRows] = useState<interviewStage[]>([]);

    const columns: any =
        [
            {
                accessor: 'feedback', title: ('Stage Name'), sortable: false,
                render: (data: any) => interviewStagesEditMode[data.id] ? (
                    <TextInput
                        value={interviewStagesEditableData[data.id]?.stageName || data.feedback}
                        onChange={(e: any) => handleEditChange(data.id, 'stageName', e.target.value)}
                    />
                ) :
                    <p>{data.stageName}</p>
            },
            {
                accessor: 'status', title: 'Status', sortable: true,
                render: (data: any) => interviewStagesEditMode[data.id] ? (
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
                ) :
                    <p>{data.status}</p>
                ,
            },
            {
                accessor: 'lastModified', title: ('Last Modified'), sortable: false,
                render: (data: any) => (
                    <div className='flex justify-between'>
                        <p>{data.lastModified}</p>
                        <div className="cursor-pointer" onClick={() => toggleEditMode(data.id)}>
                            {interviewStagesEditMode[data.id] ? '' : <IconPencil />}
                        </div>
                    </div>
                )
            },
        ];

    const addNewRow = () => {
        const newRow: interviewStage = {
            id: Math.max(...interviewStage.map(r => r.id), 0) + 1, // Automatically generate a new id
            stageName: '',
            status: '',
            lastModified: '',
        };
        setInterviewStagesNewRows(prev => [...prev, newRow]);
        setInterviewStagesEditMode(prev => ({ ...prev, [newRow.id]: true }));
        setInterviewStagesEditableData(prev => ({ ...prev, [newRow.id]: newRow }));
    };


    const handleEditChange = (
        id: number,
        field: keyof interviewStage,
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
        const result = [...interviewStage, ...interviewStagesNewRows].map((record) =>
            interviewStagesEditableData[record.id] ? { ...record, ...interviewStagesEditableData[record.id] } : record
        );
        setInterviewStage(result);

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
        <div className="flex flex-col">
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
                records={[...interviewStage, ...interviewStagesNewRows]}
                columns={columns}
            />
        </div>
    )
})

export default InterviewStage;