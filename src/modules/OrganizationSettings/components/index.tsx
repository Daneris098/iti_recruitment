import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { IconCirclePlus } from "@tabler/icons-react";
import { OrganizationSettingsStore } from "../store";
import useRecords from "./records";
import useColumns from "./columns";
import { Description, Panel, Title } from "../assets/Enum";
import useEdit from "./Edit/";
import { OrganizationItem } from "../assets/Types";

import { useAddOrganizationSettings } from "../services/add";
import { useEditOrganizationSettings } from "../services/edit";

const DataTableComp = forwardRef((_, ref) => {
  const { activePanel, addOrg, setAddOrg, expandedIds, setNewRows, newRows, sortBy, setSortBy, time, page, setPage, ascDesc, toggleAscDesc } = OrganizationSettingsStore();
  const { addBranch, addCompany, addDepartment, addDivision, addPosition, addSection } = useAddOrganizationSettings();
  const { editBranch, editCompany, editDepartment, editDivision, editPosition, editSection } = useEditOrganizationSettings();

  const AddBranchData = OrganizationSettingsStore((state) => state.getForm("addBranch"));
  const AddCompanyData = OrganizationSettingsStore((state) => state.getForm("addCompany"));
  const AddDepartmentData = OrganizationSettingsStore((state) => state.getForm("addDepartment"));
  const AddDivisionData = OrganizationSettingsStore((state) => state.getForm("addDivision"));
  const AddPositionData = OrganizationSettingsStore((state) => state.getForm("addPosition"));
  const AddSectionData = OrganizationSettingsStore((state) => state.getForm("addSection"));

  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);
  useImperativeHandle(ref, () => ({
    saveAll: () => {
      saveAll();
    },
    cancelAll: () => {
      cancelAll();
    },
  }));

  const dataRecords = useRecords();
  const dataColumns = useColumns();
  const dataExpandedRow = useEdit();

  const [rows, setRows] = useState<OrganizationItem[]>([]);

  useEffect(() => {
    setRows(dataRecords[activePanel as Panel] ?? []);
  }, [dataRecords, Panel, rows]);

  const addNewRow = () => {
    const newRow = { id: "NEW" };
    setAddOrg(true);
    setNewRows([newRow]);
    resetExpandedRows();
  };

  const editActions: Record<Panel, () => void> = {
    [Panel.branch]: () => editBranch(String(expandedIds)),
    [Panel.companyList]: () => editCompany(String(expandedIds)),
    [Panel.departments]: () => editDepartment(String(expandedIds)),
    [Panel.division]: () => editDivision(String(expandedIds)),
    [Panel.positionLevel]: () => editPosition(String(expandedIds)),
    [Panel.section]: () => editSection(String(expandedIds)),
  };

  const addActions: Record<Panel, () => void> = {
    [Panel.branch]: () => addBranch(AddBranchData!),
    [Panel.companyList]: () => addCompany(AddCompanyData!),
    [Panel.departments]: () => addDepartment(AddDepartmentData!),
    [Panel.division]: () => addDivision(AddDivisionData!),
    [Panel.positionLevel]: () => addPosition(AddPositionData!),
    [Panel.section]: () => addSection(AddSectionData!),
  };

  const saveAll = () => {
    if (addOrg) {
      (addActions as any)[activePanel]?.();
      setAddOrg(false);
      setNewRows([]);
    } else if (!addOrg) {
      (editActions as any)[activePanel]?.();
      resetExpandedRows();
    }
  };

  const cancelAll = () => {
    if (addOrg) {
      setAddOrg(false);
      setNewRows([]);
    } else if (!addOrg) {
      resetExpandedRows();
    }
  };

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<OrganizationItem>>({
    columnAccessor: sortBy,
    direction: ascDesc ? "asc" : "desc",
  });

  const handleSortChange = (status: DataTableSortStatus<OrganizationItem>) => {
    setSortStatus(status);
    setSortBy(status.columnAccessor);
    toggleAscDesc();
  };

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex flex-col">
        <div className="text-[#559CDA] font-bold flex gap-2 items-center text-lg">
          {Title[activePanel as keyof typeof Title]} <IconCirclePlus color="green" onClick={addNewRow} className="cursor-pointer" />
        </div>
        <p className="text-[#6D6D6D] text-sm">{Description[activePanel as keyof typeof Description]}</p>
      </div>
      <DataTable
        key="code"
        styles={{ header: { color: "rgba(109, 109, 109, 0.6)", fontWeight: 500 }, root: { color: "rgba(0, 0, 0, 0.6)" } }}
        paginationText={({ from, to, totalRecords }) => `Showing data ${from} out ${to} of ${totalRecords} entries ${time} seconds`}
        withTableBorder
        rowClassName={(row: any) => (row.id === expandedIds[0] ? "bg-[#DEECFF]" : "")}
        records={[...newRows, ...rows]}
        columns={(dataColumns as any)[activePanel]}
        totalRecords={rows.length}
        recordsPerPage={30}
        page={page}
        onPageChange={setPage}
        rowExpansion={(dataExpandedRow as any)[activePanel]}
        sortStatus={sortStatus}
        onSortStatusChange={handleSortChange}
      />
    </div>
  );
});

export default DataTableComp;
