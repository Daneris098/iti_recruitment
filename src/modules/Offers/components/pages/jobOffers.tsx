//#region IMPORTS
import { DataTable } from "mantine-datatable";
import { PDFViewer } from "@react-pdf/renderer";
import { Pagination, Tabs } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Filter from "@modules/Offers/components/filter/Filter";
import { IconFileCheck, IconFileX } from "@tabler/icons-react";
import PDFModal from "@modules/Offers/components/modal/pdfModal";
import PDFDocument from "@modules/Offers/components/documents/PDF";
import { checkStatus } from "@modules/Offers/components/columns/Columns";
import { useApplicants } from "@modules/Shared/hooks/useSharedApplicants";
import jobOfferColumns from "@modules/Offers/components/columns/Columns";
import FilterDrawer from "@modules/Offers/components/filter/FilterDrawer";
import { TabKey, PDFProps, JobOfferRecord, Row, TABSKey } from "@modules/Offers/types";
import { STATUS_MAP, APPLICANT_FIELDS, JobOffersColumns } from "@modules/Shared/types";
import { useJobOfferStore, useSortStore, FilterStore, useViewAcceptedOfferId } from "@src/modules/Offers/store";

import { useApplicantIdStore } from "@modules/Applicants/store";
interface ExtendedPDFProps extends PDFProps {
    applicantId?: number;
}
export default function index() {
    const applicantId = useApplicantIdStore((state) => state.id);
    const setApplicantId = useApplicantIdStore((state) => state.setApplicantId);

    console.log(applicantId)
   

    const [searchParams, setSearchParams] = useSearchParams();

    const { page, pageSize } = useMemo(() => {
        return {
            page: parseInt(searchParams.get("page") || "1"),
            pageSize: parseInt(searchParams.get("pageSize") || "30"),
        };
    }, [searchParams]);

    const handlePageChange = (newPage: number) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set("page", String(newPage));
            params.set("pageSize", String(pageSize));
            return params;
        })
    }
    const filterRecords = (tab: TabKey, records: JobOfferRecord[]) => {
        if (tab === "All_offers") return records
        return records.filter(record => record.status === tab);
    };

    //#region STATE & STORE
    const { sortedRecords, setSort } = useSortStore();
    const { activeTab, setActiveTab } = FilterStore();
    const { records, loadCandidates } = useJobOfferStore();
    const [loadTime, setLoadTime] = useState<number | null>(null);
    const { data: sharedApplicants } = useApplicants(page, pageSize, {}, setLoadTime);
    const [selectedRow, setSelectedRow] = useState<Partial<PDFProps> | null>(null);
    //#endregion

    const filteredRecords = filterRecords(activeTab!, sortedRecords.length > 0 ? sortedRecords : records);
    const paginatedRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);

    // HOOKS
    useEffect(() => {
        if (!sharedApplicants?.items) return;

        // Transform the applicants into an array of JobOffersColumns objects
        const transformedApplicants: JobOffersColumns[] = sharedApplicants.items
            .filter(applicant => {
                const lastStatus = applicant.applicationMovements.at(-1)?.status.name;
                return lastStatus && lastStatus in STATUS_MAP;
            })
            .map(applicant => {

                // Create an object that matches the JobOffersColumns type
                const result = {} as JobOffersColumns;

                // Populate the object with transformed fields and ensure no undefined values
                Object.entries(APPLICANT_FIELDS).forEach(([key, transformFn]) => {

                    // Cast the key to keyof JobOffersColumns to access the property
                    const typedKey = key as keyof JobOffersColumns;

                    // Assign the value to the result object
                    result[typedKey] = transformFn(applicant) ?? '';
                });
                return result;
            });

        loadCandidates(transformedApplicants);
    }, [sharedApplicants]);

    // #region CONSTANTS
    const TABS = [
        { value: TABSKey.AllOffers, label: "All Job Offers" },
        { value: TABSKey.Pending, label: "Pending" },
        { value: TABSKey.Accepted, label: "Accepted" },
        { value: TABSKey.Archived, label: "Archived" },
    ]

    const columnSets: Record<TabKey, string[]> = {
        Pending: ["id", "applicantName", "dateGenerated", "dateLastUpdated", "status"],
        Accepted: ["id", "applicantName", "dateGenerated", "dateLastUpdated", "status", "attachments"],
        All_offers: ["id", "applicantName", "dateGenerated", "dateLastUpdated", "status", "attachments"],
        Archived: ["id", "applicantName", "dateGenerated", "dateLastUpdated", "status", "remarks", "attachments"],
    };
    //#endregion

    //#region FUNCTIONS
    const handleRowClick = (row: ExtendedPDFProps) => {
        setApplicantId(row.applicantId!);
        setSelectedRow(row);
    };
    debugger;

    const renderCell = (col: { accessor: string }, row: Row) => {
        if (col.accessor === "attachments") {
            if (!row.attachments) return null;
            const isPending = row.status?.toLowerCase() === 'pending';
            const Icon = isPending ? IconFileX : IconFileCheck;

            return (
                <span className="flex justify-center mr-5">
                    <Icon className="text-gray-600 w-[34px] h-[34px] stroke-1" />
                </span>
            );
        }

        let content = col.accessor === "status" ? checkStatus(row.status) : row[col.accessor as keyof Row];

        return <span className={`flex items-center ${col.accessor === 'status' ? 'flex items-center justify-center' : ''}`}
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

    //#region MAIN
    return (
        <div className="h-full flex flex-col">
            {/* Main content wrapper */}
            <div className="flex flex-col bg-white rounded-md shadow-md p-6 poppins flex-grow h-full">
                {/* Tabs */}
                <Tabs value={activeTab} onChange={(value) => setActiveTab(value as TabKey)} defaultValue="All_offers" className="flex flex-col h-full">
                    <div className="flex-shrink-0">
                        <Tabs.List>
                            {TABS.map((tab) => (
                                <Tabs.Tab key={tab.value} value={tab.value} className="font-medium text-[#5E6670] text-base">
                                    {tab.label}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                        {/* Filters */}
                        <div className="py-6">
                            <FilterDrawer />
                            <Filter />
                        </div>
                    </div>

                    {/* Tab panels - content area with flex-grow to push pagination down */}
                    <div className="flex-grow overflow-hidden flex flex-col">
                        {TABS.map((tab) => (
                            <Tabs.Panel key={tab.value} value={tab.value} className="h-full flex flex-col">
                                <div className="flex-grow overflow-auto">
                                    <DataTable
                                        className="poppins text-[#6D6D6D] font-normal text-[16px]"
                                        columns={enhancedColumns}
                                        records={filterRecords(activeTab!, paginatedRecords)}
                                        highlightOnHover
                                        onRowClick={({ record }) => {
                                            const isPending = record.status?.toLowerCase() === 'pending';
                                            if (!isPending) {
                                                handleRowClick(record);
                                            }
                                        }}
                                        rowClassName={({ status }) =>
                                            status?.toLowerCase() === 'pending' ? 'cursor-not-allowed' : 'cursor-pointer'
                                        }
                                    />
                                </div>
                            </Tabs.Panel>
                        ))}
                    </div>

                    {/* Footer for pagination and record count - will stay at bottom */}
                    <div className="flex-shrink-0 mt-4 pt-2 border-t flex justify-between items-center">
                        <p className="job-offers-table text-sm poppins">
                            {`Showing data ${(page - 1) * pageSize + 1} to ${Math.min(
                                page * pageSize,
                                filteredRecords.length
                            )} of ${filteredRecords.length} entries`}
                            {loadTime !== null && ` found in (${loadTime.toFixed(3)}) seconds`}
                        </p>
                        <Pagination
                            value={page}
                            onChange={handlePageChange}
                            total={Math.ceil(filteredRecords.length / pageSize)}
                            siblings={1}
                            size="sm"
                        />
                    </div>
                </Tabs>
            </div>

            {/* PDF Modal */}
            <PDFModal isOpen={!!selectedRow} onClose={() => setSelectedRow(null)} header="Generate Job Offer">
                {selectedRow && (
                    <PDFViewer width="100%" height="891" style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
                        <PDFDocument {...selectedRow} />
                    </PDFViewer>
                )}
            </PDFModal>
        </div>
    );
}
