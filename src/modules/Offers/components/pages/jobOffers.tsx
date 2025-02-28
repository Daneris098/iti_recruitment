import Filter from "@modules/Offers/components/filter/Filter";
import FilterDrawer from "@modules/Offers/components/filter/FilterDrawer";
import jobOfferColumns from "@modules/Offers/components/columns/Columns";
import { AppShell, Pagination, Tabs } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import PDFModal from "@modules/Offers/components/modal/pdfModal";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "@modules/Offers/components/documents/PDF";
import { IconArrowsUp, IconArrowsUpDown, IconFileCheck, IconFileX } from "@tabler/icons-react";
import { useJobOfferStore, useSortStore, usePaginationStore, FilterStore } from "@src/modules/Offers/components/store";
import { checkStatus } from "@modules/Offers/components/columns/Columns";

export default function index() {
    const { activeTab, setActiveTab } = FilterStore(); 
    const { page, pageSize, setPage, getPaginatedRecords } = usePaginationStore();
    const { records, loadCandidates } = useJobOfferStore();
    const { sortedRecords, setSort, columnAccessor, direction } = useSortStore();

    useEffect(() => {
        loadCandidates();
    }, [loadCandidates]);

    const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);
    // const [activeTab, setActiveTab] = useState("All_offers");
    const handleRowClick = (row: any) => {
        setSelectedRow(row);
    };

    const TABS = [
        { value: "All_offers", label: "All Job Offers" },
        { value: "Generated", label: "Generated" },
        { value: "Accepted", label: "Accepted" },
        { value: "Archived", label: "Archived" },
    ];

    const filterRecords = (tab: string, records: any[]) => {
        if (tab === "Generated") return records.filter(record => record.Status === "Generated");
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
            const isGenerated = row.Status?.toLowerCase() === "generated";
            const Icon = isGenerated ? IconFileX : IconFileCheck;
            const cursorClass = isGenerated ? "cursor-not-allowed opacity-50" : "cursor-pointer";

            return (
                <span
                    className={`flex justify-center ${cursorClass}`}
                    onClick={!isGenerated ? () => handleRowClick(row) : undefined}
                >
                    {row.Attachments ? <Icon size={18} className="text-gray-600" /> : null}
                </span>
            );
        }

        return (
            <span onClick={() => handleRowClick(row)} className="cursor-pointer">
                {row[col.accessor]}
            </span>
        );
    };

    const enhancedColumns = jobOfferColumns.map((col) => ({
        ...col,
        title: col.sortable ? (
            <span
                className="job-offers-table cursor-pointer flex items-center gap-1"
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
            <div className="flex flex-col h-full bg-white rounded-md shadow-md p-6 overflow-hidden">
                <Tabs
                       value={activeTab}
                       onChange={setActiveTab} // ✅ Update Zustand store directly
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

                    <div className="pt-1">
                        <FilterDrawer />
                        <Filter />
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                        {TABS.map((tab) => (
                            <Tabs.Panel key={tab.value} value={tab.value} className="flex flex-1 overflow-hidden">
                                <div className="flex-grow overflow-auto">
                                    <DataTable
                                        className="w-full"
                                        columns={enhancedColumns}
                                        records={filterRecords(tab.value, paginatedRecords)}
                                        sortIcons={{ sorted: <span></span>, unsorted: <span></span> }}
                                        highlightOnHover
                                    />
                                </div>
                            </Tabs.Panel>
                        ))}
                    </div>
                </Tabs>

                <div className="flex justify-between items-center mt-auto pt-2">
                    <p className="job-offers-table text-sm">
                        {`Showing data ${(page - 1) * pageSize + 1} to ${Math.min(
                            page * pageSize,
                            records.length
                        )} of ${records.length} entries`}
                    </p>
                    <Pagination value={page} onChange={setPage} total={Math.ceil(records.length / pageSize)} siblings={1} size="sm" />
                </div>
            </div>

            <PDFModal isOpen={!!selectedRow} onClose={() => setSelectedRow(null)}>
                {selectedRow && (
                    <PDFViewer width="100%" height="600" style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
                        <MyDocument {...selectedRow} />
                    </PDFViewer>
                )}
            </PDFModal>
        </AppShell>
    );
}
