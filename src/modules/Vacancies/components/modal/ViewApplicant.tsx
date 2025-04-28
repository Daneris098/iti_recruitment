import { Divider, Modal } from "@mantine/core";
import { ApplicantStore, ViewApplicantsDataTableStore } from "../../store";
import { selectedDataVal } from "../../values";
import { useEffect, useState } from "react";
import { VacancyType, StageGroup, Candidate } from "../../types";
import Vacancies from '@src/modules/Vacancies/values/response/Applicants.json';
import { DataTable } from "mantine-datatable";
import { Badge } from '@mantine/core';
import "@modules/Vacancies/style.css"
import { useApplicants } from "@modules/Vacancies/hooks/useApplicants";

export default function index() {
    const { selectedData, setSelectedData, setSelectedApplicant, setIsViewApplicant } = ApplicantStore();
    const [vacancyRecords, setVacancyRecords] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [sortStatus, setSortStatus] = useState<{ columnAccessor: keyof VacancyType; direction: "asc" | "desc" }>({
        columnAccessor: "position", // Use a valid key from VacancyType
        direction: "asc",
    });

    const pageSize = 10;
    const { isFetching, isError, error, data } = useApplicants();

    useEffect(() => {
        // initial val
        // setVacancyRecords(Vacancies); // Type assertion
    }, []);

    useEffect(() => {
        const stageGroup: StageGroup = {
            id: 1,
            applied: [],
            forInterview: [],
            offered: [],
            hired: [],
            archived: [],
        };

        data?.forEach((item: any, index: number) => {
            const applicantStatus: string = item.applicationMovements[item.applicationMovements.length - 1]?.status.name ?? '';
            const firstName: string = item.nameResponse.firstName ?? '';

            const candidate: Candidate = {
                name: firstName,
                id: index + 1,
                status: applicantStatus
            };

            switch (applicantStatus) {
                case 'Applied':
                    stageGroup.applied.push(candidate);
                    break;
                case 'For Interview':
                    stageGroup.forInterview.push(candidate);
                    break;
                case 'Offered':
                    stageGroup.offered.push(candidate);
                    break;
                case 'Hired':
                    stageGroup.hired.push(candidate);
                    break;
                case 'Archived':
                    stageGroup.archived.push(candidate);
                    break;
                default:
                    console.warn(`Unknown status: ${applicantStatus}`);
                    break;
            }
        });

        // Find the maximum length of any stage
        const maxLength = Math.max(
            stageGroup.applied.length,
            stageGroup.forInterview.length,
            stageGroup.offered.length,
            stageGroup.hired.length,
            stageGroup.archived.length
        );

        // Fill the stages with null candidates to match the maximum length
        const fillWithNullCandidates = (stage: Candidate[], length: number): Candidate[] => {
            const fillCount = length - stage.length;
            const nullCandidates = Array(fillCount).fill({ name: null, id: null, status: null });
            return [...stage, ...nullCandidates];
        };

        stageGroup.applied = fillWithNullCandidates(stageGroup.applied, maxLength);
        stageGroup.forInterview = fillWithNullCandidates(stageGroup.forInterview, maxLength);
        stageGroup.offered = fillWithNullCandidates(stageGroup.offered, maxLength);
        stageGroup.hired = fillWithNullCandidates(stageGroup.hired, maxLength);
        stageGroup.archived = fillWithNullCandidates(stageGroup.archived, maxLength);

        const stageGroups: StageGroup[] = [stageGroup];
        const transformed = transformStageGroups(stageGroups);

        // console.log('Vacancies: ', Vacancies)
        // console.log('data: ', data)
        // console.log('stageGroups:', stageGroups);
        // console.log('transformed:', transformed);
        
        setVacancyRecords(transformed)

    }, [selectedData])


    const transformStageGroups = (stageGroups : any) => {
        if (!Array.isArray(stageGroups) || stageGroups.length === 0) return [];

        const group = stageGroups[0]; // Access the object with all stage arrays

        const keys = ['applied', 'forInterview', 'offered', 'hired', 'archived'];
        const length = group.applied.length; // assuming all arrays are the same length

        const result = Array.from({ length }, (_, index) => {
            const vacancy : any = { id: index + 1 };

            keys.forEach(key => {
                vacancy[key] = group[key]?.[index] ?? null;
            });

            return vacancy;
        });

        return result;
    }

    const sortedRecords = [...vacancyRecords].sort((a, b) => {
        if (!sortStatus.columnAccessor) return 0;
        const valueA = a[sortStatus.columnAccessor as keyof VacancyType];
        const valueB = b[sortStatus.columnAccessor as keyof VacancyType];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortStatus.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortStatus.direction === 'asc' ? valueA - valueB : valueB - valueA;
        }
        return 0;
    });

    const paginatedRecords = sortedRecords.slice((page - 1) * pageSize, page * pageSize);

    return (
        <>
            <Modal size={'80%'} opened={selectedData != selectedDataVal} centered onClose={() => setSelectedData(selectedDataVal)} title={'View Applicants'}
                className='text-[#559CDA]' styles={{
                    header: { width: '95%', margin: 'auto', marginTop: '1.5%' },
                    title: { color: "#559CDA", fontSize: 22, fontWeight: 600 },
                }}>
                <div className='m-auto w-[95%] '>
                    <Divider size={1} opacity={'60%'} color="#6D6D6D" className="w-full py-2" />
                    <DataTable
                        className="applicants-datatable"
                        defaultColumnProps={{
                            textAlign: 'right',
                            noWrap: true,
                            ellipsis: true,
                        }}
                        style={{
                            color: "#6D6D6D",
                        }}
                        withColumnBorders
                        withRowBorders={false}
                        withTableBorder
                        borderRadius="sm"
                        records={vacancyRecords}
                        paginationText={({ from, to, totalRecords }) => `Showing data ${from} out ${to} of ${totalRecords} entries (0.225) seconds`}
                        columns={[
                            {
                                accessor: 'applied', render: (data: any) => (<>{data.applied.name}</>),
                                title:
                                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem] applied">
                                        <p>Applied</p>
                                        <Badge color="blue" >8</Badge>
                                    </div>
                                , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.blue[3], background: 'rgb(222, 236, 255, 0.3)', fontWeight: 'normal'}), 
                            },
                            {
                                accessor: 'forInterview', render: (data: any) => (<>{data.forInterview.name}</>),
                                title:
                                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem]">
                                        <p>For Interview</p>
                                        <Badge color="orange">10</Badge>
                                    </div>
                                , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.orange[6], background: 'rgb(255,216,182, 0.3)', fontWeight: 'normal' })
                            },
                            {
                                accessor: 'offered', render: (data: any) => (<>{data.offered.name}</>), title:
                                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem]">
                                        <p>Offered</p>
                                        <Badge color="yellow">9</Badge>
                                    </div>
                                , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.yellow[6], background: 'rgb(255,240,192,0.3)', fontWeight: 'normal' })
                            },
                            {
                                accessor: 'hired', render: (data: any) => (<>{data.hired.name}</>), title:
                                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem]">
                                        <p>Hired</p>
                                        <Badge color="green">10</Badge>
                                    </div>
                                , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.green[6], background: 'rgb(215,255,185, 0.3)', fontWeight: 'normal' })
                            },
                            {
                                accessor: 'archived', render: (data: any) => (<>{data.archived.name}</>), title:
                                    <div className="flex gap-2 p-[0.5rem] rounded-[0.3rem]">
                                        <p>Archived</p>
                                        <Badge color="red">5</Badge>
                                    </div>
                                , textAlign: "left", sortable: true, titleStyle: (theme) => ({ color: theme.colors.red[6], background: "rgb(255,203,199, 0.3)", fontWeight: 'normal' })
                            },
                        ]}
                        totalRecords={vacancyRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={setPage}
                        sortStatus={sortStatus}
                        onCellClick={(val) => {
                            setSelectedApplicant({
                                Applicant_Name: val.record[val.column.accessor]['name'],
                                Position: 'Data Analyst',
                                Status: val.record[val.column.accessor]['status'],
                                Email: 'maxineramsey@pearlessa.com',
                                Phone: '+63 (856) 555-3987',
                                Skills: '',
                                Remarks: '',
                                Application_Date: 'September 20, 2025'
                            })
                            setIsViewApplicant(true)
                        }}
                        onSortStatusChange={(sort) => setSortStatus(sort as { columnAccessor: keyof VacancyType; direction: "asc" | "desc" })}
                    />

                </div>
            </Modal>
        </>

    )
}