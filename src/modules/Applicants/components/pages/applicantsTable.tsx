//#region IMPORTS
import dayjs from "dayjs";
import { Divider } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useMemo, useState } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Button, Modal, Pagination } from "@mantine/core";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  usePaginationStore,
  useSelectedApplicantsStore,
  FilterStore, useCloseModal,
  useSortStore, useApplicantStore
} from "@modules/Applicants/store";
import { useApplicantIdStore, useLoadTimeStore } from '@src/modules/Shared/store';
import Filter from "@src/modules/Applicants/components/filter/Filter";
import { Applicant, ApplicantRoute } from "@src/modules/Shared/types";
import ViewApplicant from "@src/modules/Shared/components/viewApplicants";
import { getCombinedColumns } from "@src/modules/Shared/components/columns";
import ModalWrapper from "@modules/Applicants/components/modal/modalWrapper";
import { useApplicants } from "@src/modules/Shared/hooks/useSharedApplicants";
import FilterDrawer from "@modules/Applicants/components/filter/FilterDrawer";
import { usePositionFilterStore, useStatusFilterStore, useApplicantNameStore } from "@modules/Shared/store";
import { ApplicantRoutes } from "@modules/Applicants/constants/tableRoute/applicantRoute";
import TransferredStatus from "@modules/Applicants/components/documents/movement/Status/Transferred";

export default function index() {

  const location = useLocation();
  const { filter } = FilterStore();
  const { selectedStatusId } = useStatusFilterStore();
  const { selectedPositionId } = usePositionFilterStore();

  const allColumns = getCombinedColumns({ includeApplicants: true });

  const { isForMultipleTransfer, setIsForMultipleTransfer } = useCloseModal();

  const currentRoute = Object.values(ApplicantRoutes).find(
    (route) => route.path === location.pathname
  );

  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

  const headerText = currentRoute?.label;
  const isTransfereePath = currentRoute?.path === "/transferee";

  //#region STORES
  const { setPage } = usePaginationStore();
  // const records = useApplicantStore((s) => s.records)
  const { sortedRecords, setSort, setRecords } = useSortStore();
  const { isViewApplicant, setIsViewApplicant } = useCloseModal();

  const setApplicantId = useApplicantIdStore((state) => state.setApplicantId);

  const setApplicantRecords = useApplicantStore((s) => s.setApplicantRecords);
  const setApplicantName = useApplicantNameStore((state) => state.setApplicantName);
  const setSelectedIds = useSelectedApplicantsStore((state) => state.setSelectedIds);

  const loadTime = useLoadTimeStore((s) => s.loadTime);
  const setLoadTime = useLoadTimeStore((s) => s.setLoadTime);

  //local states
  // const [loadTime, setLoadTime] = useState<number | null>(null);

  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);

  //region FUNCTIONS
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = (newPage: number) => {
    const statusArray = extractStatusArray(currentRoute);
    const statusIds = statusArray.join(",");

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set("page", String(newPage));
      params.set("pageSize", String(pageSize));
      params.set("statusIds", statusIds);
      return params;
    });
  };

  const handleRowClick = async (applicant: any) => {
    setSelectedApplicant(applicant);
    setApplicantId(applicant.id);
    setIsViewApplicant(true);
  };

  useEffect(() => {
    if (selectedApplicant?.applicantName) {
      const fullName = selectedApplicant?.generalApplicant.nameResponse.formalName;
      // const fullName = selectedApplicant?.
      setApplicantName(fullName);
    }
  }, [selectedApplicant, setApplicantName]);

  const { page, pageSize } = useMemo(() => {
    return {
      page: parseInt(searchParams.get("page") || "1"),
      pageSize: parseInt(searchParams.get("pageSize") || "30"),
    };
  }, [searchParams]);

  const queryParams: Record<string, any> = {};
  if (filter.applicantName) { queryParams.Name = filter.applicantName; }
  if (selectedPositionId) { queryParams.PositionIds = selectedPositionId; }
  if (selectedStatusId) { queryParams.StatusIds = selectedStatusId; }

  if (filter.dateUpdated?.[0] || filter.dateUpdated?.[1]) {
    const from = filter.dateUpdated[0]
      ? dayjs(filter.dateUpdated[0]).format('YYYYMMDD')
      : '';
    const to = filter.dateUpdated[1]
      ? dayjs(filter.dateUpdated[1]).format('YYYYMMDD')
      : '';

    if (from && to) {
      queryParams.DateField = "DateTransaction";
      queryParams.DateFrom = from;
      queryParams.DateTo = to;
    }
  }

  const { data: getApplicants, isLoading } = useApplicants(
    1,
    10000,
    queryParams,
    setLoadTime
  );

  //#region HOOKS
  //Data population
  useEffect(() => {
    if (!isLoading && getApplicants) {
      setApplicantRecords(getApplicants.applicants);
      setPage(page);
    }
  }, [isLoading, getApplicants, page, setApplicantRecords, setPage]);

  //#region HELPER FUNCTIONS
  // intially load the records from useApplicationStore().
  // The record rendering will conditionally render the displayed status depending on the 
  // route. For example, if the path is /applied, it will display all the applied status.
  const getCurrentRoute = (pathname: string): ApplicantRoute | undefined =>
    Object.values(ApplicantRoutes).find(route => route.path === pathname);

  const extractStatusArray = (
    route?: ApplicantRoute | undefined
  ): string[] => {
    if (!route?.status) return [];

    // Handle both string and readonly array cases
    // The spread operator creates a new regular string array
    return Array.isArray(route.status) ? [...route.status] : [route.status];
  };

  const filterApplicantsByStatus = (
    applicants: Applicant[],
    statusArray: string[]
  ): Applicant[] => {
    const lowerStatusArray = statusArray.map((s) => s.toLowerCase());
    return applicants.filter((applicant) =>
      lowerStatusArray.includes(applicant.status.toLowerCase())
    );
  };

  const transformToTransferredStatus = (applicants: Applicant[]) =>
    applicants.map((applicant) => ({
      ...applicant,
      status: "Transferred"
    }));


  useEffect(() => {
    if (!getApplicants) return;

    const currentRoute = getCurrentRoute(location.pathname);
    const statusArray = extractStatusArray(currentRoute);

    let filtered = filterApplicantsByStatus(getApplicants.applicants, statusArray);

    if (statusArray.includes("Ready for Transfer")) {
      filtered = transformToTransferredStatus(filtered);
    }

    setApplicantRecords(getApplicants.applicants);
    setRecords(filtered);
  }, [getApplicants, location.pathname]);

  // This is for rendering applicants record for each column.
  // Not only does it render each applicants into the column, 
  // it is also responsible for sorting the records based on the selected column.
  // const extendedColumn = applicantsColumns
  const extendedColumn = allColumns
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
            className="job-offers-table cursor-pointer flex items-center gap-1 text-[#5E6670]"
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

  //#region MAIN
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
            records={sortedRecords.slice((page - 1) * pageSize, page * pageSize)}
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
            records={sortedRecords.slice((page - 1) * pageSize, page * pageSize)}
            onRowClick={({ record }) => handleRowClick(record)}
            rowClassName={() => "cursor-pointer text-[#6D6D6D]"}
          />
        )}
      </div>

      {/* Pagination and Footer (Sticky at Bottom) */}
      <div className="flex justify-between items-center p-2.5">
        {/* Record count */}
        <p className="job-offers-table text-sm">
          {`Showing data ${sortedRecords.length === 0 ? 0 : (page - 1) * pageSize + 1
            } to ${Math.min(page * pageSize, sortedRecords.length)} of ${Math.min(page * pageSize, sortedRecords.length)} entries`}
          {loadTime !== null && ` found in (${loadTime.toFixed(3)}) seconds`}
        </p>

        {/* Pagination */}
        <Pagination
          value={page}
          onChange={handlePageChange}
          total={Math.ceil(getApplicants?.total! / pageSize)}
          siblings={1}
          size="sm"
        />
      </div>

      {/* View Applicant Modal */}
      <ModalWrapper
        isOpen={isViewApplicant}
        overlayClassName="modal-overlay"
        contentClassName="modal-content"
        onClose={() => setIsViewApplicant(false)}
      >
        <ViewApplicant
          location={selectedApplicant?.location}
          applicantName={selectedApplicant?.applicantName}
          position={selectedApplicant?.position}
          status={selectedApplicant?.status}
          email={selectedApplicant?.email}
          phone={selectedApplicant?.phone}
          skills={selectedApplicant?.skills}
          remarks={selectedApplicant?.remarks}
          applicationDate={selectedApplicant?.applicationDate}
          IsJobOffer={selectedApplicant?.isJobOffer}
          onClose={() => setIsViewApplicant(false)}
        />
      </ModalWrapper>

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