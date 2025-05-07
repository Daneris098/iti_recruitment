import '@modules/Offers/styles/index.css'
import Filter from "@modules/Offers/components/filter/Filter";
import FilterDrawer from "@modules/Offers/components/filter/FilterDrawer";
import jobOfferColumns from "@modules/Offers/components/columns/Columns";
import { Pagination, Tabs } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import PDFModal from "@modules/Offers/components/modal/pdfModal";
import { PDFViewer } from "@react-pdf/renderer";

import { IconFileCheck, IconFileX } from "@tabler/icons-react";
import { useJobOfferStore, useSortStore, usePaginationStore, FilterStore } from "@src/modules/Offers/store";
import { checkStatus } from "@modules/Offers/components/columns/Columns";
import { TabKey, PDFProps, JobOfferRecord, Row } from "@modules/Offers/types"
import PDFDocument from "@modules/Offers/components/documents/PDF";

export default function index() {

    //#region STATE & STORE
    const { activeTab, setActiveTab } = FilterStore();
    const { page, pageSize, setPage, getPaginatedRecords } = usePaginationStore();
    const { records, loadCandidates } = useJobOfferStore();
    const { sortedRecords, setSort } = useSortStore();
    const paginatedRecords = getPaginatedRecords(sortedRecords.length > 0 ? sortedRecords : records);

    const [loadTime, setLoadTime] = useState<number | null>(null);
    const [selectedRow, setSelectedRow] = useState<Partial<PDFProps> | null>(null);
    //#endregion

    // HOOKS
    useEffect(() => {
        const startTime = performance.now();
        loadCandidates();
        const endTime = performance.now();
        setLoadTime((endTime - startTime) / 1000);
    }, [loadCandidates]);

    // #region CONSTANTS
    enum TABSKey {
        AllOffers = "All_offers",
        Pending = "Pending",
        Accepted = "Accepted",
        Archived = "Archived"
    }

    const TABS = [
        { value: TABSKey.AllOffers, label: "All Job Offers" },
        { value: TABSKey.Pending, label: "Pending" },
        { value: TABSKey.Accepted, label: "Accepted" },
        { value: TABSKey.Archived, label: "Archived" },
    ]

    const columnSets: Record<TabKey, string[]> = {
        Pending: ["id", "Applicant_Name", "Date_Generated", "Date_Last_Updated", "Status"],
        Accepted: ["id", "Applicant_Name", "Date_Generated", "Date_Last_Updated", "Status", "Attachments"],
        All_offers: ["id", "Applicant_Name", "Date_Generated", "Date_Last_Updated", "Status", "Attachments"],
        Archived: ["id", "Applicant_Name", "Date_Generated", "Date_Last_Updated", "Status", "Remarks", "Attachments"],
    };
    //#endregion

    //#region FUNCTIONS
    const handleRowClick = (row: Partial<PDFProps>) => {
        setSelectedRow(row);
    };

    const filterRecords = (tab: TabKey, records: JobOfferRecord[]) => {
        if (tab === "All_offers") return records
        return records.filter(record => record.Status === tab);
    };

    const renderCell = (col: { accessor: string }, row: Row) => {
        if (col.accessor === "Attachments") {
            if (!row.Attachments) return null;
            const isPending = row.Status?.toLowerCase() === 'pending';
            const Icon = isPending ? IconFileX : IconFileCheck;

            return (
                <span className="flex justify-center mr-5">
                    <Icon className="text-gray-600 w-[34px] h-[34px] stroke-1" />
                </span>
            );
        }

        let content = col.accessor === "Status" ? checkStatus(row.Status) : row[col.accessor as keyof Row];

        return <span className={`flex items-center ${col.accessor === 'Status' ? 'flex items-center justify-center' : ''}`}
        >{content}
        </span>
    };

    const getFilteredColumns = (tab: TabKey) => {
        if (!Object.hasOwn(columnSets, tab)) return [];

        return jobOfferColumns.filter(col => columnSets[tab as TabKey]?.includes(col.accessor));
    }

    const enhancedColumns = getFilteredColumns(activeTab!).map((col) => ({
        ...col,
        title: col.sortable ? (
            <span onClick={() => setSort(col.accessor, records)}>
                {col.title}
            </span>
        ) : col.title,
        render: (row: JobOfferRecord) => renderCell(col, row),
    }));
    //#endregion

    return (
        <div className='h-full relative'>
            <div className="flex flex-col h-full bg-white rounded-md shadow-md p-6 overflow-hidden poppins">
                <Tabs
                    value={activeTab}
                    onChange={() => setActiveTab}
                    defaultValue="All_offers">
                    <Tabs.List>
                        {TABS.map((tab) => (
                            <Tabs.Tab key={tab.value} value={tab.value} className='font-medium text-[#5E6670] text-base'>
                                {tab.label}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>

                    <div className="py-6">
                        <FilterDrawer />
                        <Filter />
                    </div>

                    {TABS.map((tab) => (
                        <Tabs.Panel key={tab.value} value={tab.value} >
                            <DataTable
                                className="poppins text-[#6D6D6D] font-normal text-[16px]"
                                columns={enhancedColumns}
                                records={filterRecords(activeTab!, paginatedRecords)}
                                highlightOnHover
                                onRowClick={({ record }) => {
                                    const isPending = record.Status?.toLowerCase() === 'pending';
                                    if (!isPending) {
                                        handleRowClick(record);
                                    }
                                }}
                                rowClassName={({ Status }) =>
                                    Status?.toLowerCase() === 'pending' ? 'cursor-not-allowed' : 'cursor-pointer'
                                }
                            />
                        </Tabs.Panel>
                    ))}
                </Tabs>

                <div className="flex justify-between items-center mt-auto pt-2">
                    <p className="job-offers-table text-sm poppins">
                        {`Showing data ${(page - 1) * pageSize + 1} to ${Math.min(
                            page * pageSize,
                            records.length
                        )} of ${records.length} entries`}
                        {loadTime !== null && ` found in (${loadTime.toFixed(3)}) seconds`}
                    </p>
                    <Pagination value={page} onChange={setPage} total={Math.ceil(records.length / pageSize)} siblings={1} size="sm" />
                </div>
            </div>

            <PDFModal isOpen={!!selectedRow} onClose={() => setSelectedRow(null)} header="Generate Job Offer">
                {selectedRow && (
                    <PDFViewer width="100%" height="891" style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
                        <PDFDocument
                            {...selectedRow}
                        />
                    </PDFViewer>
                )}
            </PDFModal>

        </div>
    );
}
