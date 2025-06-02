//#region IMPORTS
import dayjs from "dayjs";
import { DataTable } from "mantine-datatable";
import { PDFViewer } from "@react-pdf/renderer";
import { Pagination, Tabs } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useStatusFilterStore } from "@modules/Shared/store";
import Filter from "@modules/Offers/components/filter/Filter";
import { useApplicantIdStore } from "@modules/Applicants/store";
import PDFModal from "@modules/Offers/components/modal/pdfModal";
import PDFDocument from "@modules/Offers/components/documents/PDF";
import { checkStatus } from "@modules/Offers/components/columns/Columns";
import { useApplicants } from "@modules/Shared/hooks/useSharedApplicants";
import jobOfferColumns from "@modules/Offers/components/columns/Columns";
import FilterDrawer from "@modules/Offers/components/filter/FilterDrawer";
import { useSharedViewAcceptedOffer } from "@modules/Shared/api/useSharedUserService";
import { STATUS_MAP, APPLICANT_FIELDS, JobOffersColumns } from "@modules/Shared/types";
import { useJobOfferStore, useSortStore, FilterStore } from "@src/modules/Offers/store";
import { TabKey, PDFProps, JobOfferRecord, Row, TABSKey, ExtendedPDFProps } from "@modules/Offers/types";

export default function index() {

    const { filter } = FilterStore();
    const { selectedStatusId } = useStatusFilterStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const setApplicantId = useApplicantIdStore((state) => state.setApplicantId);
    const [loadTime, setLoadTime] = useState<number | null>(null);

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
    
    const queryParams: Record<string, any> = {};
    if (filter.applicantName) { queryParams.Name = filter.applicantName }
    if (selectedStatusId) { queryParams.StatusIds = selectedStatusId }

    if (filter.dateGenerated?.[0] || filter.dateGenerated?.[1]) {
        const generatedFrom = filter.dateGenerated[0] ? dayjs(filter.dateGenerated[0]).format("YYYYMMDD") : '';
        const generatedTo = filter.dateGenerated[1] ? dayjs(filter.dateGenerated[1]).format("YYYYMMDD") : '';

        if (generatedFrom && generatedTo) {
            queryParams.DateField = "DateTransaction";
            queryParams.DateFrom = generatedFrom;
            queryParams.DateTo = generatedTo
        }
    }

    if (filter.dateLastUpdated?.[0] || filter.dateLastUpdated?.[1]) {
        const updatedFrom = filter.dateLastUpdated[0] ? dayjs(filter.dateLastUpdated[0]).format("YYYYMMDD") : '';
        const updatedTo = filter.dateLastUpdated[1] ? dayjs(filter.dateLastUpdated[1]).format("YYYYMMDD") : '';

        if (updatedFrom && updatedTo) {
            queryParams.DateField = "DateTransaction";
            queryParams.DateFrom = updatedFrom;
            queryParams.DateTo = updatedTo
        }
    }

    if (filter.dateArchived?.[0] || filter.dateArchived?.[1]) {
        const archivedFrom = filter.dateArchived[0] ? dayjs(filter.dateArchived[0]).format("YYYYMMDD") : '';
        const archivedTo = filter.dateArchived[1] ? dayjs(filter.dateArchived[1]).format("YYYYMMDD") : '';

        if (archivedFrom && archivedTo) {
            queryParams.DateField = 'DateTransaction';
            queryParams.DateFrom = archivedFrom;
            queryParams.DateTo = archivedTo
        }
    }

    const { data: sharedApplicants } = useApplicants(
        page,
        pageSize,
        0,
        queryParams,
        setLoadTime
    );

    const hiredApplicantIds = sharedApplicants?.applicants
        ?.filter(a => a.status === 'Hired')
        ?.map(a => a.id) || [];

    const filterRecords = (tab: TabKey, records: JobOfferRecord[]) => {
        if (tab === "All_offers") return records
        return records.filter(record => record.status === tab);
    };

    //#region STATE & STORE
    const { sortedRecords, setSort } = useSortStore();
    const { activeTab, setActiveTab } = FilterStore();
    const { records, loadCandidates } = useJobOfferStore();
    const [selectedRow, setSelectedRow] = useState<Partial<PDFProps> | null>(null);

    //#endregion
    const filteredRecords = filterRecords(activeTab!, sortedRecords.length > 0 ? sortedRecords : records);
    const paginatedRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);

    const [acceptedOffers, setAcceptedOffers] = useState<any[]>([]);

    useEffect(() => {
        if (!hiredApplicantIds.length) return;

        Promise.all(hiredApplicantIds.map(id => useSharedViewAcceptedOffer.getAcceptedOfferId(id)))
            .then(setAcceptedOffers)
            .catch(console.error);
    }, [hiredApplicantIds]);

    // HOOKS
    useEffect(() => {
        if (!sharedApplicants?.applicants || !acceptedOffers.length || !hiredApplicantIds.length) return;

        const startTime = performance.now();

        // Build a map of applicantId -> acceptedOffer using hiredApplicantIds
        const offerMap = hiredApplicantIds.reduce((map, id, index) => {
            map[id] = acceptedOffers[index]; // acceptedOffers[i] corresponds to hiredApplicantIds[i]
            return map;
        }, {} as Record<number | string, any>);

        // Merge each applicant with their accepted offer
        const applicantsWithOffers = sharedApplicants.applicants.map(applicant => ({
            ...applicant,
            acceptedOffer: offerMap[applicant.id] ?? null,
        }));

        // Transform the merged applicant data
        const transformed: JobOffersColumns[] = applicantsWithOffers
            .filter(applicant => {
                const lastStatus = applicant.generalApplicant?.applicationMovements?.at(-1)?.status?.name;
                return !!lastStatus && lastStatus in STATUS_MAP;
            })
            .map(applicant => {
                const result = {} as JobOffersColumns;

                for (const key in APPLICANT_FIELDS) {
                    if (key === 'status') {
                        const rawStatus = applicant.generalApplicant?.applicationMovements?.at(-1)?.status?.name;
                        result.status = STATUS_MAP[rawStatus as keyof typeof STATUS_MAP];
                    } else if (key === 'attachments') {
                        // Assign accepted offer filename if exists
                        result.attachments = applicant.acceptedOffer?.data?.[0]?.name ?? '';
                    } else {
                        result[key as keyof JobOffersColumns] = APPLICANT_FIELDS[key](applicant) ?? '';
                    }
                }

                return result;
            });

        loadCandidates(transformed);

        const endTime = performance.now();
        setLoadTime((endTime - startTime) / 1000);
    }, [sharedApplicants?.applicants, acceptedOffers]);

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
        All_offers: ["id", "applicantName", "dateGenerated", "dateLastUpdated", "remarks", "status", "attachments"],
        Archived: ["id", "applicantName", "dateGenerated", "dateLastUpdated", "status", "remarks", "attachments"],
    };
    //#endregion

    //#region FUNCTIONS
    const handleRowClick = (row: ExtendedPDFProps) => {
        setApplicantId(row.applicantId!);
        setSelectedRow(row);
    };

    const renderCell = (col: { accessor: string }, row: Row) => {

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
