import { useFetchOrganization } from "../services/data";
import { Panel } from "../assets/Enum";

type TotalRecords = {
  [Panel.branch]: number;
  [Panel.companyList]: number;
  [Panel.departments]: number;
  [Panel.division]: number;
  [Panel.positionLevel]: number;
  [Panel.section]: number;
};

export default function useTotalRecords(): TotalRecords {
  const { useBranches, useCompanies, useDepartments, useDivisions, usePositions, useSections } = useFetchOrganization();

  return {
    [Panel.branch]: useBranches().data?.total!,
    [Panel.companyList]: useCompanies().data?.total!,
    [Panel.departments]: useDepartments().data?.total!,
    [Panel.division]: useDivisions().data?.total!,
    [Panel.positionLevel]: usePositions().data?.total!,
    [Panel.section]: useSections().data?.total!,
  };
}
