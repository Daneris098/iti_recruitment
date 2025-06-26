import { useFetchOrganization } from "../services/data";
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
  const { useBranches, useCompanies, useDepartments, useDivisions, usePositions, useSections } = useFetchOrganization();

  return {
    [Panel.branch]: useBranches().data?.items as BranchType[],
    [Panel.companyList]: useCompanies().data?.items as CompanyType[],
    [Panel.departments]: useDepartments().data?.items as DepartmentType[],
    [Panel.division]: useDivisions().data?.items as DivisionType[],
    [Panel.positionLevel]: usePositions().data?.items as PositionType[],
    [Panel.section]: useSections().data?.items as SectionType[],
  };
}
