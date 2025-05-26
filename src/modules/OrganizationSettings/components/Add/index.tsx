import { DataTableColumn } from "mantine-datatable";
import { BranchType, CompanyType, DepartmentType, DivisionType, PositionType, SectionType } from "../../assets/Types";
import { Panel } from "../../assets/Enum";

import { OrganizationSettingsStore } from "../../store";

import AddBranch from "./branch";
import AddCompany from "./company";
import AddSection from "./section";
import AddPosition from "./position";
import AddDivision from "./division";
import AddDepartment from "./department";

type DataColumn = {
  [Panel.branch]: DataTableColumn<BranchType>[];
  [Panel.companyList]: DataTableColumn<CompanyType>[];
  [Panel.departments]: DataTableColumn<DepartmentType>[];
  [Panel.division]: DataTableColumn<DivisionType>[];
  [Panel.positionLevel]: DataTableColumn<PositionType>[];
  [Panel.section]: DataTableColumn<SectionType>[];
};

export default function useColumns(): DataColumn {
  const { addOrg } = OrganizationSettingsStore();

  return {
    [Panel.branch]: AddBranch(addOrg),
    [Panel.companyList]: AddCompany(addOrg),
    [Panel.departments]: AddDepartment(addOrg),
    [Panel.division]: AddDivision(addOrg),
    [Panel.positionLevel]: AddPosition(addOrg),
    [Panel.section]: AddSection(addOrg),
  };
}
