import { AppShell, Pagination } from "@mantine/core";
import Filter from "@src/modules/Applicants/components/filter/Filter";
import { DataTable } from "mantine-datatable";
import applicantsColumns from "@src/modules/Applicants/components/columns/Columns";
import { useEffect, useMemo, useState } from "react";
import { useApplicantStore, useCloseModal, usePaginationStore } from "@modules/Applicants/store";
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
    "/interview": "For Interview",
    "/applicants": "All Applicants",
    "/offered": "Offered",
    "/hired": "Hired",
    "/transferee": "For Transfer",
    "/transferred": "Transferred",
    "/archive": "Archived"
  }[location.pathname] || ""

  //initializing applicant, sort and pagination store
  const { records, loadApplicants } = useApplicantStore(); // for records
  const { sortedRecords, setSort, setRecords, columnAccessor, direction } = useSortStore(); // for sorting
  const { page, pageSize, setPage } = usePaginationStore(); // for pagination
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null); // For Document model
  const {isViewApplicant, setIsViewApplicant} = useCloseModal(); // For handling the state of view applicant modal.

  // for json fetching of applicants record from values/response
  useEffect(() => {
    loadApplicants();
  }, []);

  // intially load the records from useApplicationStore().
  // The record rendering will conditionally render the displayed status depending on the 
  // route. For example, if the path is /applied, it will display all the applied status.
  useEffect(() => {
    const statusFilters: Record<string, string | string[]> = {
      "/applied": "Applied",
      "/offered": "Offered",
      "/interview": ["Assessment", "Initial Interview", "Final Interview"],
      "/applicants": ["Hired", "Applied", "Offered", "For Transfer", "Archived", "For Interview"],
      "/hired": "Hired",
      "/transferee": "For Transfer",
      "/transferred": "Transferred",
      "/archive": "Archived",
    };

    // Filtering the records based on the current tab.
    // This will filter the records based on the status of the applicant.
    let filteredRecords = records;
    const filterCriteria = statusFilters[location.pathname];

    if (filterCriteria) {
      if (Array.isArray(filterCriteria)) {
        filteredRecords = records.filter((applicant) => filterCriteria.includes(applicant.Status));
      }
      else {
        filteredRecords = records.filter((applicant) => applicant.Status === filterCriteria)
      }
    }

    setRecords(filteredRecords);
  }, [records, location.pathname, setRecords]);

  // for making sure that the records will be divided into x number of records per page.
  // also responsible for pagination display.
  const paginatedRecords = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedRecords.slice(startIndex, endIndex);
  }, [sortedRecords, page, pageSize]);

  // For handling the state of row clicking of each record.
  // This will make each rendered records clickable.
  const handleRowClick = (applicant: any) => {
    setSelectedApplicant(applicant);
    setIsViewApplicant(true);
  }

  // This is for rendering applicants record for each column.
  // Not only does it render each applicants into the column, 
  // it is also responsible for sorting the records based on the selected column.
  const extendedColumn = applicantsColumns

    // Exclude Feedback Column from the JSON object
    .filter((col) => col.accessor !== "Feedback")
    .map((col) => {
      let updatedCol = { ...col };

      // If the Column from the JSON Object is clickable, then access its column accessor.
      if (col.sortable) {

        // Set the value of isActiveColumn to true if the columnAccessor (from store) 
        // matches the current column.accessor from Defined Columns.
        const isActiveColumn = col.accessor === columnAccessor;
        const icon = isActiveColumn && direction === "asc" ? (  // Ternary operation to avoid deep nested if else.
          <IconArrowsUp size={14}/>  // if Ascending
        ) : (
          <IconArrowsUpDown size={14} /> // Descending
        );

        // If the column header is set to sortable then allow the sorting function to go through.
        // Also this enables the Arrow Icon from DataTable to properly change depending on the
        // Ascending or Descending state of the column. In other words, for sorting animation.
        updatedCol.title = (  // This is for rendering the column title with the icon. 
          <span
            className="job-offers-table cursor-pointer flex items-center gap-1"
            onClick={() => setSort(col.accessor, sortedRecords)}
          >
            {col.title}
            {icon}
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
    <AppShell className="p-4 h-full relative">
      <div className="flex flex-col h-full bg-white rounded-md shadow-md p-6">

        {/* Header */}
        <h1 className="text-[#559CDA] text-[22px] font-semibold mb-1poppins">
          {headerText}
        </h1>

        {/* Filter Component */}
        <FilterDrawer />
        <Filter />

        {/* Table Wrapper (Grows to Fill Space) */}
        <div className="flex-grow overflow-auto poppins">
          <DataTable
            columns={extendedColumn}
            records={paginatedRecords}
            sortIcons={{ sorted: <span></span>, unsorted: <span></span> }}
            onRowClick={({ record }) => handleRowClick(record)}
            rowClassName={() => "cursor-pointer text-[#6D6D6D]"} // Add hover effect
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
        {/* <ApplicantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}> */}
        <ApplicantModal isOpen={isViewApplicant}>
          <ViewApplicant
            Applicant_Name={selectedApplicant?.Applicant_Name}
            Position={selectedApplicant?.Position}
            Status={selectedApplicant?.Status}
            Email={selectedApplicant?.Email}
            Phone={selectedApplicant?.Phone}
            Skills={selectedApplicant?.Skills}
            Remarks={selectedApplicant?.Remarks}
            Application_Date={selectedApplicant?.Application_Date}
            IsJobOffer={selectedApplicant?.isJobOffer}
            onClose={() => setIsViewApplicant(false)}
          />
        </ApplicantModal>

      </div>
    </AppShell>

  );
}