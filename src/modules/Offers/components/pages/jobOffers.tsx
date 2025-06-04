//#region IMPORTS
import dayjs from "dayjs";
import { DataTable } from "mantine-datatable";
import { PDFViewer } from "@react-pdf/renderer";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Pagination, Tabs } from "@mantine/core";
import { useStatusFilterStore } from "@modules/Shared/store";
import Filter from "@modules/Offers/components/filter/Filter";
import { IconFileCheck, IconFileX } from "@tabler/icons-react";
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
import {
    OF, FOUND_IN,
    PAGE, PAGE_SIZE,
    TO, TOTAL_ENTRIES,
    STATUS_HIRED, OFFERS_TAB,
    LABEL_PENDING, LABEL_ACCEPTED,
    DATE_TRANSACTION, DATE_FORMAT,
    STATUS, ATTACHMENTS, LABEL_OFFERS,
    CURSOR_NOT_ALLOWED, CURSOR_POINTER,
    BASE_COLUMNS_WITH_STATUS_ATTACHMENTS,
    DEFAULT_PAGE_COUNT, DEFAULT_PAGE_NUMBER,
    LABEL_ARCHIVED, BASE_COLUMNS_WITH_STATUS,
    COMPUTED_SECONDS, HEADER_GENERATE_JOB_OFFER,
    BASE_COLUMNS_WITH_REMARKS, SHOWING_TOTAL_DATA,
} from "@modules/Shared/utils/constants";

export default function index() {

    const { filter } = FilterStore();
    const queryParams: Record<string, any> = {};
    const { selectedStatusId } = useStatusFilterStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loadTime, setLoadTime] = useState<number | null>(null);
    const setApplicantId = useApplicantIdStore((state) => state.setApplicantId);

    // #region CONSTANTS
    const TABS = [
        { value: TABSKey.AllOffers, label: LABEL_OFFERS },
        { value: TABSKey.Pending, label: LABEL_PENDING },
        { value: TABSKey.Accepted, label: LABEL_ACCEPTED },
        { value: TABSKey.Archived, label: LABEL_ARCHIVED },
    ]

    const columnSets: Record<TabKey, string[]> = {
        Pending: BASE_COLUMNS_WITH_STATUS,
        Accepted: BASE_COLUMNS_WITH_STATUS_ATTACHMENTS,
        All_offers: BASE_COLUMNS_WITH_REMARKS,
        Archived: BASE_COLUMNS_WITH_REMARKS
    };

    const { page, pageSize } = useMemo(() => {
        return {
            page: parseInt(searchParams.get(PAGE) || DEFAULT_PAGE_NUMBER),
            pageSize: parseInt(searchParams.get(PAGE_SIZE) || DEFAULT_PAGE_COUNT),
        };
    }, [searchParams]);

    const { data: sharedApplicants } = useApplicants(
        page,
        pageSize,
        0,
        queryParams,
        setLoadTime
    );

    const hiredApplicantIds = sharedApplicants?.applicants
        ?.filter(a => a.status === STATUS_HIRED)
        ?.map(a => a.id) || [];

    const filterRecords = (tab: TabKey, records: JobOfferRecord[]) => {
        if (tab === OFFERS_TAB) return records
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

    const handlePageChange = (newPage: number) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set(PAGE, String(newPage));
            params.set(PAGE_SIZE, String(pageSize));
            return params;
        })
    }

    if (filter.applicantName) { queryParams.Name = filter.applicantName }
    if (selectedStatusId) { queryParams.StatusIds = selectedStatusId }

    if (filter.dateGenerated?.[0] || filter.dateGenerated?.[1]) {
        const generatedFrom = filter.dateGenerated[0] ? dayjs(filter.dateGenerated[0]).format(DATE_FORMAT) : '';
        const generatedTo = filter.dateGenerated[1] ? dayjs(filter.dateGenerated[1]).format(DATE_FORMAT) : '';

        if (generatedFrom && generatedTo) {
            queryParams.DateField = DATE_TRANSACTION;
            queryParams.DateFrom = generatedFrom;
            queryParams.DateTo = generatedTo
        }
    }

    if (filter.dateLastUpdated?.[0] || filter.dateLastUpdated?.[1]) {
        const updatedFrom = filter.dateLastUpdated[0] ? dayjs(filter.dateLastUpdated[0]).format(DATE_FORMAT) : '';
        const updatedTo = filter.dateLastUpdated[1] ? dayjs(filter.dateLastUpdated[1]).format(DATE_FORMAT) : '';

        if (updatedFrom && updatedTo) {
            queryParams.DateField = DATE_TRANSACTION;
            queryParams.DateFrom = updatedFrom;
            queryParams.DateTo = updatedTo
        }
    }

    if (filter.dateArchived?.[0] || filter.dateArchived?.[1]) {
        const archivedFrom = filter.dateArchived[0] ? dayjs(filter.dateArchived[0]).format(DATE_FORMAT) : '';
        const archivedTo = filter.dateArchived[1] ? dayjs(filter.dateArchived[1]).format(DATE_FORMAT) : '';

        if (archivedFrom && archivedTo) {
            queryParams.DateField = DATE_TRANSACTION;
            queryParams.DateFrom = archivedFrom;
            queryParams.DateTo = archivedTo
        }
    }

    const createOfferMap = (hiredApplicantsIds: any[], acceptedOffers: any[]) => {
        return hiredApplicantsIds.reduce((map, id, index) => {
            map[id] = acceptedOffers[index];
            return map;
        }, {} as Record<string | number, any>);
    }

    const mergeApplicantsWithOffers = (applicants: any[], offerMap: Record<number | string, any>) => {
        return applicants.map(applicant => ({
            ...applicant,
            acceptedOffer: offerMap[applicant.id] ?? null,
        }));
    }

    const filterValidApplicants = (applicants: any[]) => {
        return applicants.filter(applicant => {
            const lastStatus = applicant.generalApplicant?.applicationMovements?.at(-1)?.status?.name;
            return !!lastStatus && lastStatus in STATUS_MAP;
        })
    }

    const transformApplicantToColumn = (applicant: any): JobOffersColumns => {
        const result = {} as JobOffersColumns;

        for (const key in APPLICANT_FIELDS) {
            if (key === STATUS) {
                const rawStatus = applicant.generalApplicant?.applicationMovements?.at(-1)?.status?.name;
                result.status = STATUS_MAP[rawStatus as keyof typeof STATUS_MAP];
            } else if (key === ATTACHMENTS) {
                result.attachments = applicant.acceptedOffer?.data?.[0]?.name ?? '';
            } else {
                result[key as keyof JobOffersColumns] = APPLICANT_FIELDS[key](applicant) ?? '';
            }
        }
        return result;
    };

    const transformApplicants = (applicantsWithOffers: any[]): JobOffersColumns[] => {
        const validApplicants = filterValidApplicants(applicantsWithOffers);
        return validApplicants.map(transformApplicantToColumn)
    }

    const [hasLoaded, setHasLoaded] = useState(false);
    // HOOKS
    useEffect(() => {
        if (hasLoaded || !sharedApplicants?.applicants || !hiredApplicantIds.length) return;

        const fetchAndLoad = async () => {
            const startTime = performance.now();

            const accepted = await Promise.all(
                hiredApplicantIds.map(id => useSharedViewAcceptedOffer.getAcceptedOfferId(id))
            );

            const offerMap = createOfferMap(hiredApplicantIds, accepted);
            const applicantsWithOffers = mergeApplicantsWithOffers(sharedApplicants.applicants, offerMap);
            const transformedColumns = transformApplicants(applicantsWithOffers);

            loadCandidates(transformedColumns);

            const endTime = performance.now();
            setLoadTime((endTime - startTime) / 1000);
            setHasLoaded(true); // Prevent re-loading
        };

        fetchAndLoad().catch(console.error);
    }, [sharedApplicants?.applicants, hiredApplicantIds, hasLoaded]);

    //#region FUNCTIONS
    const handleRowClick = (row: ExtendedPDFProps) => {
        setApplicantId(row.applicantId!);
        setSelectedRow(row);
    };

    const renderCell = (col: { accessor: string }, row: Row) => {

        let content = col.accessor === STATUS ? checkStatus(row.status) : row[col.accessor as keyof Row];

        if (col.accessor === ATTACHMENTS) {
            if (!row.attachments) return null;
            const isPending = row.status?.toLowerCase() === LABEL_PENDING.toLowerCase();
            const Icon = isPending ? IconFileX : IconFileCheck;

            return (
                <span className="flex justify-center mr-5">
                    <Icon className="text-gray-600 w-[34px] h-[34px] stroke-1" />
                </span>
            );
        }

        return <span className={`flex items-center ${col.accessor === STATUS ? 'flex items-center justify-center' : ''}`}
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
                <Tabs value={activeTab} onChange={(value) => setActiveTab(value as TabKey)} defaultValue={OFFERS_TAB} className="flex flex-col h-full">
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
                                            const isPending = record.status?.toLowerCase() === LABEL_PENDING;
                                            if (!isPending) {
                                                handleRowClick(record);
                                            }
                                        }}
                                        rowClassName={({ status }) =>
                                            status?.toLowerCase() === LABEL_PENDING.toLowerCase() ? CURSOR_NOT_ALLOWED : CURSOR_POINTER
                                        }
                                    />
                                </div>
                            </Tabs.Panel>
                        ))}
                    </div>

                    {/* Footer for pagination and record count - will stay at bottom */}
                    <div className="flex-shrink-0 mt-4 pt-2 border-t flex justify-between items-center text-[#6D6D6D]">
                        <p className="job-offers-table text-sm poppins">
                            {`${SHOWING_TOTAL_DATA} ${(page - 1) * pageSize + 1} ${TO} ${Math.min(
                                page * pageSize,
                                filteredRecords.length
                            )} ${OF} ${filteredRecords.length} ${TOTAL_ENTRIES}`}
                            {loadTime !== null && ` ${FOUND_IN} (${loadTime.toFixed(3)}) ${COMPUTED_SECONDS}`}
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
            <PDFModal isOpen={!!selectedRow} onClose={() => setSelectedRow(null)} header={HEADER_GENERATE_JOB_OFFER}>
                {selectedRow && (
                    <PDFViewer width="100%" height="891" style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
                        <PDFDocument {...selectedRow} />
                    </PDFViewer>
                )}
            </PDFModal>
        </div>
    );
}
