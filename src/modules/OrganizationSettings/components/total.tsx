import { useFetchOrganizationSettings } from "../services/data";
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
  const { branches, companies, departments, divisions, positions, sections } = useFetchOrganizationSettings();

  return {
    [Panel.branch]: branches.data?.total!,
    [Panel.companyList]: companies.data?.total!,
    [Panel.departments]: departments.data?.total!,
    [Panel.division]: divisions.data?.total!,
    [Panel.positionLevel]: positions.data?.total!,
    [Panel.section]: sections.data?.total!,
  };
}
