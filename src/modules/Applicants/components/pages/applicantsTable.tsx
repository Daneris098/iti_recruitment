import { Divider } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Button, Modal, Pagination } from "@mantine/core";
import { useLocation, useSearchParams } from "react-router-dom";
import { useApplicants } from "@src/modules/Applicants/hooks/useApplicant"
import { ApplicantRoutes } from "@modules/Applicants/constants/tableRoute/applicantRoute";
import {
  useCloseModal,
  useSortStore,
  useApplicantStore,
  usePaginationStore,
  useApplicantIdStore,
  useSelectedApplicantsStore,
  FilterStore
} from "@modules/Applicants/store";

import Filter from "@src/modules/Applicants/components/filter/Filter";
import FilterDrawer from "@modules/Applicants/components/filter/FilterDrawer";
import ApplicantModal from "@modules/Applicants/components/modal/applicantProfile";
import applicantsColumns from "@src/modules/Applicants/components/columns/Columns";
import ViewApplicant from "@src/modules/Applicants/components/documents/main/ViewApplicant";
import TransferredStatus from "@modules/Applicants/components/documents/movement/Status/Transferred";

export default function index() {

  const { filter } = FilterStore();

  const location = useLocation();
  const { isForMultipleTransfer, setIsForMultipleTransfer } = useCloseModal();
  const currentRoute = Object.values(ApplicantRoutes).find(
    (route) => route.path === location.pathname
  );
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

  const headerText = currentRoute?.label;
  const isTransfereePath = currentRoute?.path === "/transferee";

  //stores
  const { setPage } = usePaginationStore();
  const records = useApplicantStore((s) => s.records)
  const { sortedRecords, setSort, setRecords } = useSortStore();
  const { isViewApplicant, setIsViewApplicant } = useCloseModal();

  const setApplicantId = useApplicantIdStore((state) => state.setApplicantId);
  
  const setApplicantRecords = useApplicantStore((s) => s.setApplicantRecords);
  const setSelectedIds = useSelectedApplicantsStore((state) => state.setSelectedIds);

  //local states
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [hasCheckedFirstPage, setHasCheckedFirstPage] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);

  // functions
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set("page", String(newPage));
      params.set("pageSize", String(pageSize));
      return params;
    });
  };

  const handleRowClick = async (applicant: any) => {
    setSelectedApplicant(applicant);
    setApplicantId(applicant.id);
    setIsViewApplicant(true);
  };

  // memo
  const { page, pageSize } = useMemo(() => {
    return {
      page: parseInt(searchParams.get("page") || "1"),
      pageSize: parseInt(searchParams.get("pageSize") || "30"),
    };
  }, [searchParams]);

  // const { data: applicants, isLoading } = useApplicants(page, pageSize);
  const { data: applicants, isLoading } = useApplicants(page, pageSize, {
    name: filter.applicantName,
    company: filter.company,
    status: filter.status
  });
  //hooks
  useEffect(() => {
    if (isLoading && startTime === null) {
      setStartTime(performance.now());
    }
    if (!isLoading && applicants && startTime !== null) {
      const { applicants: applicantList } = applicants;
      setApplicantRecords(applicantList); // this will populate your sortedRecords

      setPage(page);
      const endTime = performance.now();
      setLoadTime((endTime - startTime) / 1000);
      setStartTime(null);
    }
  }, [isLoading, applicants, startTime, setApplicantRecords, setPage]);

  // intially load the records from useApplicationStore().
  // The record rendering will conditionally render the displayed status depending on the 
  // route. For example, if the path is /applied, it will display all the applied status.
  useEffect(() => {
    const currentRoute = Object.values(ApplicantRoutes).find(
      (route) => route.path === location.pathname
    );

    const statusArray: string[] = Array.isArray(currentRoute?.status)
      ? [...currentRoute.status]
      : currentRoute?.status
        ? [currentRoute.status]
        : [];

    if (applicants && statusArray.length > 0) {
      let filteredRecords = applicants.applicants.filter((applicant) => {
        const status = applicant.status.toLowerCase();
        return statusArray.some(
          (statusFilter) => status === statusFilter.toLowerCase()
        );
      });

      // Transform status to "Transferred" for display
      if (statusArray.includes("Ready for Transfer")) {
        filteredRecords = filteredRecords.map((applicant) => ({
          ...applicant,
          status: "Transferred",
        }));
      }

      setRecords(filteredRecords);

      if (!hasCheckedFirstPage && page === 1) {
        const startIndex = (page - 1) * pageSize;
        const firstPageRecords = filteredRecords.slice(
          startIndex,
          startIndex + pageSize
        );

        if (firstPageRecords.length === 0) {
          setPage(page + 1);
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("page", String(page + 1));
            return params;
          });
        }

        setHasCheckedFirstPage(true);
      }
    }
  }, [
    location.pathname,
    applicants,
    page,
    pageSize,
    setRecords,
    setPage,
    setSearchParams,
  ]);

  // This is for rendering applicants record for each column.
  // Not only does it render each applicants into the column, 
  // it is also responsible for sorting the records based on the selected column.
  const extendedColumn = applicantsColumns

    // Exclude Feedback Column from the JSON object
    .filter((col: any) => col.accessor !== "feedback" && col.accessor !== 'movement' && col.accessor !== "comments")
    .map((col) => {
      let updatedCol = { ...col };

      // If the Column from the JSON Object is clickable, then access its column accessor.
      if (col.sortable) {

        // If the column header is set to sortable then allow the sorting function to go through.
        // Also this enables the Arrow Icon from DataTable to properly change depending on the
        // Ascending or Descending state of the column. In other words, for sorting animation.
        updatedCol.title = (  // This is for rendering the column title with the icon. 
          <span
            className="job-offers-table cursor-pointer flex items-center gap-1"
            onClick={() => setSort(col.accessor, sortedRecords)}
          >
            {col.title}
          </span>
        );
      } else {
        updatedCol.title = col.title; // If the column is not sortable then don't allow the sorting animation.
      }

      return updatedCol; // return the header column regardless whether it is sortable or not.
    });

  // main
  return (
    // Container
    <div className="rounded-md h-full flex flex-col gap-5 p-6 bg-white relative">

      {/* Header */}
      <h1 className="text-[#559CDA] text-2xl font-bold poppins ml-2 flex justify-between">
        {headerText}
        {isTransfereePath && (
          <Button
            className="bg-[#559CDA] rounded-lg w-32 h-9 poppins font-semibold text-xs tracking-wide"
            onClick={() => {
              setIsForMultipleTransfer(true);
            }}
          >
            <span className="mr-2">
              <IconArrowUpRight size={20} stroke={2} />
            </span>
            TRANSFER
          </Button>
        )}
      </h1>

      {/* Filter Component */}
      <FilterDrawer />
      <Filter />

      {/* Table Wrapper (Grows to Fill Space) */}
      <div className="flex-grow overflow-auto poppins">
        {isTransfereePath && (
          <DataTable
            columns={extendedColumn}
            records={sortedRecords}
            // withrowselection="true"
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={(records) => {
              setSelectedRecords(records);
              const ids = records.map((record) => record.id);
              setSelectedIds(ids);
            }}
            onRowClick={({ record }) => handleRowClick(record)}
            rowClassName={() => "cursor-pointer text-[#6D6D6D]"}
          />
        )}

        {!isTransfereePath && (
          <DataTable
            columns={extendedColumn}
            records={sortedRecords}
            onRowClick={({ record }) => handleRowClick(record)}
            rowClassName={() => "cursor-pointer text-[#6D6D6D]"}
          />
        )}

      </div>

      {/* Pagination and Footer (Sticky at Bottom) */}
      <div className="flex justify-between items-center p-2.5">
        {/* Record count */}
        <p className="job-offers-table text-sm">
          {`Showing data ${(page - 1) * pageSize + 1} to ${Math.min(
            page * pageSize,
            records.length
          )} of ${applicants?.total} entries`}
          {loadTime !== null && ` found in (${loadTime.toFixed(3)}) seconds`}
        </p>

        {/* Pagination */}
        <Pagination
          value={page}
          onChange={handlePageChange}
          total={Math.ceil(applicants?.total! / pageSize)}
          siblings={1}
          size="sm"
        />
      </div>

      {/* View Applicant Modal */}
      <ApplicantModal isOpen={isViewApplicant}>
        <ViewApplicant
          applicantName={selectedApplicant?.applicantName}
          Position={selectedApplicant?.position}
          Status={selectedApplicant?.status}
          Email={selectedApplicant?.email}
          Phone={selectedApplicant?.phone}
          Skills={selectedApplicant?.skills}
          Remarks={selectedApplicant?.remarks}
          Application_Date={selectedApplicant?.applicationDate}
          IsJobOffer={selectedApplicant?.isJobOffer}
          onClose={() => setIsViewApplicant(false)}
        />
      </ApplicantModal>

      <Modal
        opened={isForMultipleTransfer}
        onClose={() => setIsForMultipleTransfer(false)}
        title={
          <div className="text-[22px] font-semibold text-[#559CDA]">
            Transfer Applicants
          </div>
        }
        centered
        size="lg"
        overlayProps={{
          opacity: 0.5,
          blur: 1,
        }}
      >
        <Divider size={2} color="#A8A8A899" className="w-full" />
        <TransferredStatus />
      </Modal>

    </div>
  );
}