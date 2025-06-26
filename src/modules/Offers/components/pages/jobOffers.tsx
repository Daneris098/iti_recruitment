//#region IMPORTS
import dayjs from "dayjs";
import { DataTable } from "mantine-datatable";
import { Pagination, Tabs } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useStatusFilterStore } from "@modules/Shared/store";
import Filter from "@modules/Offers/components/filter/Filter";
import { useApplicantIdStore } from "@modules/Applicants/store";
import PDFModal from "@modules/Offers/components/modal/pdfModal";
import { checkStatus } from "@modules/Offers/components/columns/Columns";
import { useApplicants } from "@modules/Shared/hooks/useSharedApplicants";
import jobOfferColumns from "@modules/Offers/components/columns/Columns";
import FilterDrawer from "@modules/Offers/components/filter/FilterDrawer";
import { PDFViewer } from "@modules/Shared/components/pdfViewer/PDFViewer";
import { IconFile, IconFileCheck, IconFileX } from "@tabler/icons-react";
import { useSharedViewAcceptedOffer } from "@modules/Shared/api/useSharedUserService";
import { STATUS_MAP, APPLICANT_FIELDS, JobOffersColumns } from "@modules/Shared/types";
import { TabKey, PDFProps, JobOfferRecord, Row, TABSKey, ExtendedPDFProps } from "@modules/Offers/types";
import { getApplicantPDFPath, getPendingApplicantPDFPath } from "@modules/Shared/utils/PdfViewer/pdfUtils";
import { useJobOfferStore, FilterStore, useJobOfferSortStore as useSortStore } from "@src/modules/Offers/store";
import {
    OF, FOUND_IN,
    PAGE, PAGE_SIZE,
    TO, TOTAL_ENTRIES,
    STATUS_HIRED, OFFERS_TAB,
    LABEL_PENDING, LABEL_ACCEPTED,
    DATE_TRANSACTION, DATE_FORMAT,
    STATUS, ATTACHMENTS, LABEL_OFFERS,
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
    const applicantId = useApplicantIdStore((state) => state.id);

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

    const { data: sharedApplicants } = useApplicants(
        page,
        pageSize,
        queryParams,
        setLoadTime
    );

    const hiredApplicantIds = useMemo(() => {
        return sharedApplicants?.applicants
            ?.filter(a => a.status === STATUS_HIRED)
            ?.map(a => a.id) || [];
    }, [sharedApplicants?.applicants]);

    const filterRecords = (tab: TabKey, records: JobOfferRecord[]) => {
        if (tab === OFFERS_TAB) return records
        return records.filter(record => record.status === tab);
    };

    //#region STATE & STORE
    const { columnAccessor, direction, setSort, sortedRecords, setRecords } = useSortStore();
    const { activeTab, setActiveTab } = FilterStore();
    const { records, loadCandidates } = useJobOfferStore();
    const [selectedRow, setSelectedRow] = useState<Partial<PDFProps> | null>(null);

    //#endregion
    const filteredRecords = filterRecords(activeTab!, sortedRecords.length > 0 ? sortedRecords : records);
    // const paginatedRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);

    const createOfferMap = (acceptedOffers: { applicantId: number, offer: any[] }[]) => {
        return acceptedOffers.reduce((map, { applicantId, offer }) => {
            map[applicantId] = offer;
            return map;
        }, {} as Record<string | number, any>);
    };


    const mergeApplicantsWithOffers = (applicants: any[], offerMap: Record<number | string, any>) => {
        return applicants.map(applicant => ({
            ...applicant,
            acceptedOffer: offerMap[applicant.id] ?? null,
        }));
    }
    // debugger;
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
                const rawStatus = applicant.generalApplicant?.applicationMovements?.at(-1)?.status?.name;
                const status = STATUS_MAP[rawStatus as keyof typeof STATUS_MAP];

                if (status === "Accepted") {
                    result.attachments = applicant.generalApplicant.nameResponse.firstName;
                } else {
                    result.attachments = '';
                }
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
    const [acceptedOffers, setAcceptedOffers] = useState<any[]>([]);

    useEffect(() => {
        if (hiredApplicantIds.length === 0) return;
        Promise.all(
            hiredApplicantIds.map(id =>
                useSharedViewAcceptedOffer
                    .getAcceptedOfferId(id)
                    .then(res => ({ id, offer: res.data }))
                    .catch(() => ({ id, offer: null }))
            )

        ).then(results => {
            const offers = results
                .filter(result => result.offer !== null)
                .map(result => result.offer);
            setAcceptedOffers(offers);
        });

    }, [hiredApplicantIds]);

    useEffect(() => {

        if (!sharedApplicants?.applicants || hasLoaded || !acceptedOffers) return;
        const offerMap = createOfferMap(acceptedOffers);
        const applicantsWithOffers = mergeApplicantsWithOffers(sharedApplicants.applicants, offerMap);
        const transformedColumns = transformApplicants(applicantsWithOffers);
        loadCandidates(transformedColumns);
        setRecords(transformedColumns);
        setHasLoaded(true);
    }, [sharedApplicants?.applicants, acceptedOffers, hasLoaded]);

    //#region FUNCTIONS
    const handleRowClick = (row: ExtendedPDFProps) => {
        const id = (row as any).id || row.applicantId;

        if (row.status !== "Accepted" && row.status !== "Pending") { return; }

        if (id) {
            setApplicantId(id);
            setSelectedRow({ ...row, applicantId: id });
        } else {
            console.warn("applicantId is missing in row:", row);
        }
    };

    const renderCell = (col: { accessor: string }, row: Row) => {
        let content = col.accessor === STATUS ? checkStatus(row.status) : row[col.accessor as keyof Row];
        // Determine cursor class based on status
        const cursorClass = row.status !== "Accepted" && row.status !== "Pending" ? "cursor-not-allowed" : "cursor-pointer";

        if (col.accessor === ATTACHMENTS) {
            const isPending = row.status?.toLowerCase() === LABEL_PENDING.toLowerCase();
            const isAccepted = row.status?.toLowerCase() === LABEL_ACCEPTED.toLowerCase();

            let Icon;
            if (isPending) Icon = IconFile;
            else if (isAccepted) Icon = IconFileCheck;
            else Icon = IconFileX;

            return (
                <span className="flex justify-center mr-5">
                    <Icon className="text-gray-600 w-[34px] h-[34px] stroke-1" />
                </span>
            );
        }

        return (
            <span className={`flex items-center ${col.accessor === STATUS ? 'flex items-center justify-center' : ''} ${cursorClass}`}>
                {content}
            </span>
        );
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
    const accessToken = sessionStorage.getItem("accessToken") ?? "";

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
                                        sortStatus={{ columnAccessor, direction }}
                                        onSortStatusChange={({ columnAccessor, direction }) =>
                                            setSort(String(columnAccessor), records, direction)
                                        }
                                        records={filterRecords(activeTab!, sortedRecords.slice((page - 1) * pageSize, page * pageSize))}
                                        highlightOnHover
                                        onRowClick={({ record }) => {
                                            const isPending = record.status?.toLowerCase() === LABEL_PENDING;
                                            if (!isPending) {
                                                handleRowClick(record);
                                            }
                                        }}
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
            <PDFModal
                isOpen={!!selectedRow}
                onClose={() => setSelectedRow(null)}
                header={HEADER_GENERATE_JOB_OFFER}
            >
                {selectedRow && (
                    <PDFViewer
                        identifier={applicantId}
                        token={accessToken}
                        getApplicantStatus={async () =>
                            (selectedRow.status as "Accepted" | "Pending")
                        }
                        getPdfPathFnHired={getApplicantPDFPath}
                        getPdfPathFnPending={getPendingApplicantPDFPath}
                    />
                )}
            </PDFModal>
        </div>
    );
}
