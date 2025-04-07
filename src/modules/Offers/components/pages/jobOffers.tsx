import '@modules/Offers/styles/index.css'
import Filter from "@modules/Offers/components/filter/Filter";
import FilterDrawer from "@modules/Offers/components/filter/FilterDrawer";
import jobOfferColumns from "@modules/Offers/components/columns/Columns";
import { AppShell, Pagination, Tabs } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import PDFModal from "@modules/Offers/components/modal/pdfModal";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "@modules/Offers/components/documents/PDF";
import { IconArrowsUp, IconArrowsUpDown, IconFileCheck, IconFileX } from "@tabler/icons-react";
import { useJobOfferStore, useSortStore, usePaginationStore, FilterStore } from "@src/modules/Offers/store";
import { checkStatus } from "@modules/Offers/components/columns/Columns";
import { PDFProps } from "@modules/Offers/types"


export default function index() {
    const { activeTab, setActiveTab } = FilterStore();
    const { page, pageSize, setPage, getPaginatedRecords } = usePaginationStore();
    const { records, loadCandidates } = useJobOfferStore();
    const { sortedRecords, setSort, columnAccessor, direction } = useSortStore();

    useEffect(() => {
        loadCandidates();
    }, [loadCandidates]);

    const [selectedRow, setSelectedRow] = useState<Partial<PDFProps> | null>(null);

    const handleRowClick = (row: any) => {
        setSelectedRow(row);
    };

    const TABS = [
        { value: "All_offers", label: "All Job Offers" },
        { value: "Pending", label: "Pending" },
        { value: "Accepted", label: "Accepted" },
        { value: "Archived", label: "Archived" },
    ];

    const filterRecords = (tab: string, records: any[]) => {
        if (tab === "Pending") return records.filter(record => record.Status === "Pending");
        if (tab === "Archived") return records.filter(record => record.Status === "Archived");
        if (tab === "Accepted") return records.filter(record => record.Status === "Accepted");
        return records;
    };

    const paginatedRecords = getPaginatedRecords(sortedRecords.length > 0 ? sortedRecords : records);

    const renderCell = (col: any, row: any) => {
        if (col.accessor === "Status") {
            return (
                <span onClick={() => handleRowClick(row)} className="cursor-pointer">
                    {checkStatus(row.Status)}
                </span>
            );
        }

        if (col.accessor === "Attachments") {
            const isPending = row.Status?.toLowerCase() === "pending";
            const Icon = isPending ? IconFileX : IconFileCheck;
            const cursorClass = isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer";

            return (
                <span
                    className={`flex justify-center ${cursorClass}`}
                    onClick={!isPending ? () => handleRowClick(row) : undefined}
                >
                    {row.Attachments ? <Icon className="text-gray-600 w-[34px] h-[34px] stroke-1" /> : null}
                </span>
            );
        }

        return (
            <span onClick={() => handleRowClick(row)} className="cursor-pointer">
                {row[col.accessor]}
            </span>
        );
    };

    const [loadTime, setLoadTime] = useState<number | null>(null);

    useEffect(() => {
        const startTime = performance.now();

        loadCandidates(); // Load your data

        const endTime = performance.now();
        setLoadTime((endTime - startTime) / 1000); // Convert to seconds
    }, [loadCandidates]);

    const getFilteredColumns = (tab: string) => {
        const columnSets: Record<string, string[]> = {
            Pending: ["id", "Applicant_Name", "Date_Generated", "Date_Last_Updated", "Status"],
            Accepted: ["id", "Applicant_Name", "Date_Generated", "Date_Last_Updated", "Status", "Attachments"],
            All_offers: ["id", "Applicant_Name", "Date_Generated", "Date_Last_Updated", "Status", "Attachments"],
            Archived: ["id", "Applicant_Name", "Date_Generated", "Date_Last_Updated", "Status", "Remarks", "Attachments"],
        };

        return jobOfferColumns.filter(col => columnSets[tab]?.includes(col.accessor));
    };
    const enhancedColumns = getFilteredColumns(activeTab!).map((col) => ({
        ...col,
        title: col.sortable ? (
            <span
                className="job-offers-table cursor-pointer flex justify-between items-center poppins font-medium text-[14px] w-full"
                onClick={() => setSort(col.accessor, records)}
            >
                {col.title}
                {col.accessor === columnAccessor && direction === "asc" ? (
                    <IconArrowsUp size={14} />
                ) : (
                    <IconArrowsUpDown size={14} />
                )}
            </span>
        ) : col.title,
        render: (row: any) => renderCell(col, row),
    }));
    return (
        <AppShell className="p-4 h-full relative">
            <div className="flex flex-col h-full bg-white rounded-md shadow-md p-6 overflow-hidden poppins">
                <Tabs
                    value={activeTab}
                    onChange={setActiveTab}
                    defaultValue="All_offers"
                    className="flex flex-col max-h-[900px] min-h-[400px]"
                >
                    <Tabs.List>
                        {TABS.map((tab) => (
                            <Tabs.Tab key={tab.value} value={tab.value}>
                                {tab.label}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>

                    <div className="py-3">
                        <FilterDrawer />
                        <Filter />
                    </div>

                    <div className="flex-1 flex overflow-hidden poppins">
                        {TABS.map((tab) => (
                            <Tabs.Panel key={tab.value} value={tab.value} className="flex flex-1 overflow-hidden poppins">
                                <div className="flex-grow overflow-auto">
                                    <DataTable
                                        className="poppins text-[#6D6D6D] font-normal text-[16px]"
                                        columns={enhancedColumns}
                                        records={filterRecords(activeTab!, paginatedRecords)}
                                        sortIcons={{ sorted: <span></span>, unsorted: <span></span> }}
                                        highlightOnHover
                                    />
                                </div>
                            </Tabs.Panel>
                        ))}
                    </div>
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
        </AppShell>
    );
}
