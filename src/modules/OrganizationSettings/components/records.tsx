import { useFetchOrganizationSettings } from "../services/data";
import { BranchType, CompanyType, DepartmentType, DivisionType, PositionType, SectionType } from "../assets/Types";
import { Panel } from "../assets/Enum";

type DataRecords = {
  [Panel.branch]: BranchType[];
  [Panel.companyList]: CompanyType[];
  [Panel.departments]: DepartmentType[];
  [Panel.division]: DivisionType[];
  [Panel.positionLevel]: PositionType[];
  [Panel.section]: SectionType[];
};

export default function useRecords(): DataRecords {
  const { branches, companies, departments, divisions, positions, sections } = useFetchOrganizationSettings();

  return {
    [Panel.branch]: branches.data?.items as BranchType[],
    [Panel.companyList]: companies.data?.items as CompanyType[],
    [Panel.departments]: departments.data?.items as DepartmentType[],
    [Panel.division]: divisions.data?.items as DivisionType[],
    [Panel.positionLevel]: positions.data?.items as PositionType[],
    [Panel.section]: sections.data?.items as SectionType[],
  };
}
