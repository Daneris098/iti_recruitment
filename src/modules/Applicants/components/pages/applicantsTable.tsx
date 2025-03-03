import { AppShell, Pagination } from "@mantine/core";
import Filter from "@src/modules/Applicants/components/filter/Filter";
import { DataTable } from "mantine-datatable";
import applicantsColumns from "@src/modules/Applicants/components/columns/Columns";
import { useEffect, useMemo, useState } from "react";
import { useApplicantStore, usePaginationStore } from "@modules/Applicants/store";
import { useSortStore } from "@modules/Applicants/store"
import { IconArrowsUp, IconArrowsUpDown } from "@tabler/icons-react";
import FilterDrawer from "@modules/Applicants/components/filter/FilterDrawer"
import ApplicantModal from "@modules/Applicants/components/modal/applicantProfile";
import ViewApplicant from "@src/modules/Applicants/components/documents/main/ViewApplicant"
import { useLocation } from "react-router-dom";

export default function index() {

  // For conditionally rendering table header based on their corresponding route.
  const location = useLocation();
  const headerText = {
    "/applied": "Applied",
    "/for-interview": "For Interview",
    "/applicants": "All Applicants",
    "/offered": "Offered"
  }[location.pathname] || ""

  //initializing applicant, sort and pagination store
  const { records, loadApplicants } = useApplicantStore(); // for records
  const { sortedRecords, setSort, setRecords, columnAccessor, direction } = useSortStore(); // for sorting
  const { page, pageSize, setPage } = usePaginationStore(); // for pagination
  const [isModalOpen, setIsModalOpen] = useState(false); // Initial state: closed // for Modal
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null); // For Document model

  // for json fetching of applicants record from values/response
  useEffect(() => {
    loadApplicants();
  }, []);

  // intially load the records from useApplicationStore().
  // The record rendering will conditionally render the displayed status depending on the 
  // route. For example, if the route is /applied, it will display the applied
  useEffect(() => {
    let filteredRecords = records;

    if (location.pathname === "/applied") {
      filteredRecords = records.filter((applicant) => applicant.Status === "Applied")
    }
    else if (location.pathname === "/offered") {
      filteredRecords = records.filter((applicant) => applicant.Status === "Offered")
    }
    else if (location.pathname === "/interview") {
      filteredRecords = records.filter((applicant) => ["Assessment", "Initial Interview", "Final Interview"].includes(applicant.Status))
    }
    else if (location.pathname === "/applicants") {
      filteredRecords = records.filter((applicant) =>
        ["Hired", "Applied", "Offered", "For Transfer", "Archived", "For Interview"].includes(applicant.Status));
    }
    else if (location.pathname === "/hired") {
      filteredRecords = records.filter((applicant) => applicant.Status === "Hired");
    }
    else if (location.pathname === "/transferee") {
      filteredRecords = records.filter((applicant) => applicant.Status === "For Transfer");
    }
    else if (location.pathname === "/transferred") {
      filteredRecords = records.filter((applicant) => applicant.Status === "Transferred");
    }
    else if (location.pathname === "/archive") {
      filteredRecords = records.filter((applicant) => applicant.Status === "Archived");
    }

    setRecords(filteredRecords);
  }, [records, location.pathname, setRecords])

  // for making sure that the records will be divided into x number of records per page.
  // also responsible for pagination display.
  const paginatedRecords = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedRecords.slice(startIndex, endIndex);
  }, [sortedRecords, page, pageSize]);

  const handleRowClick = (applicant: string) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  }

  // This is for rendering applicants record for each column.
  // Not only does it render each applicants into the column, 
  // it is also responsible for sorting the records based on the selected column.
  const enhancedColumns = applicantsColumns.map((col) => {

    // Handle sorting logic
    if (col.sortable) {
      const isActiveColumn = col.accessor === columnAccessor;
      const icon =
        isActiveColumn && direction === "asc" ? (<IconArrowsUp size={14} />) : (<IconArrowsUpDown size={14} />);
      col = {
        ...col,
        title: (
          <span
            className="job-offers-table cursor-pointer flex items-center gap-1"
            onClick={() => setSort(col.accessor, sortedRecords)}
          >
            {col.title}
            {icon}
          </span>
        ),
      };
    }

    // Handle row click functionality
    return {
      ...col,
      render: (row: any) => {
        if (col.render) {
          return (
            <span onClick={() => handleRowClick(row)} className="cursor-pointer">
              {col.render(row)}
            </span>
          );
        }

        if (["Applicant_Name", "Email", "Phone_Number", "Position", "Status", "Application_Date"].includes(col.accessor)) {
          return (
            <span className="cursor-pointer text-black" onClick={() => handleRowClick(row)}>
              {row[col.accessor]}
            </span>
          );
        }

        return row[col.accessor];
      },
    };
  });

  // main
  return (
    <AppShell className="p-4 h-full relative">
    {/* Container */}
    <div className="flex flex-col h-full bg-white rounded-md shadow-md p-6">

      {/* Header */}
      <h1 className="text-[#559CDA] text-[22px] font-semibold mb-1">
        {headerText}
      </h1>

      {/* Filter Component */}
      <FilterDrawer />
      <Filter />

      {/* Table Wrapper (Grows to Fill Space) */}
      <div className="flex-grow overflow-auto">
        <DataTable
          columns={enhancedColumns}
          records={paginatedRecords}
          sortIcons={{ sorted: <span></span>, unsorted: <span></span> }}
        />
      </div>

      {/* Pagination and Footer (Sticky at Bottom) */}
      <div className="flex justify-between items-center mt-auto pt-2">
        {/* Record count */}
        <p className="job-offers-table text-sm">
          {`Showing data ${(page - 1) * pageSize + 1} to ${Math.min(
            page * pageSize,
            records.length
          )} of ${records.length} entries`}
        </p>

        {/* Pagination */}
        <Pagination
          value={page}
          onChange={setPage}
          total={Math.ceil(records.length / pageSize)}
          siblings={1}
          size="sm"
        />
      </div>

      {/* View Applicant Modal */}
      <ApplicantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ViewApplicant
          Applicant_Name={selectedApplicant?.Applicant_Name}
          Position={selectedApplicant?.Position}
          Status={selectedApplicant?.Status}
          Email={selectedApplicant?.Email}
          Phone={selectedApplicant?.Phone_Number}
          Skills={selectedApplicant?.Skills}
          Remarks={selectedApplicant?.Remarks}
          onClose={() => setIsModalOpen(false)}
        />
      </ApplicantModal>

    </div>
  </AppShell>

  );
}