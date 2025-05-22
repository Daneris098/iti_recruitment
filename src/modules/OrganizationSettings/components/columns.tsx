import { DataTableColumn } from "mantine-datatable";
import { BranchType, CompanyType, DepartmentType, DivisionType, PositionType, SectionType } from "../assets/Types";
import { Panel } from "../assets/Enum";

import { OrganizationSettingsStore } from "../store";

import AddBranch from "./Add/branch";
import AddCompany from "./Add/company";
import AddSection from "./Add/section";
import AddPosition from "./Add/position";
import AddDivision from "./Add/division";
import AddDepartment from "./Add/department";
import { useEffect } from "react";

type DataColumn = {
  [Panel.branch]: DataTableColumn<BranchType>[];
  [Panel.companyList]: DataTableColumn<CompanyType>[];
  [Panel.departments]: DataTableColumn<DepartmentType>[];
  [Panel.division]: DataTableColumn<DivisionType>[];
  [Panel.positionLevel]: DataTableColumn<PositionType>[];
  [Panel.section]: DataTableColumn<SectionType>[];
};

export default function useColumns(): DataColumn {
  const { addOrg, activePanel, setSortBy, setPage } = OrganizationSettingsStore();

  useEffect(() => {
    setSortBy("");
    setPage(1);
  }, [activePanel]);

  return {
    [Panel.branch]: AddBranch(addOrg),
    [Panel.companyList]: AddCompany(addOrg),
    [Panel.departments]: AddDepartment(addOrg),
    [Panel.division]: AddDivision(addOrg),
    [Panel.positionLevel]: AddPosition(addOrg),
    [Panel.section]: AddSection(addOrg),
  };
}
