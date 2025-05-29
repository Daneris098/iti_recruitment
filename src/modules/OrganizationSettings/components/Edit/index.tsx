import { DataTableRowExpansionProps } from "mantine-datatable";
import { Panel } from "../../assets/Enum";
import { BranchType, CompanyType, DepartmentType, DivisionType, PositionType, SectionType } from "../../assets/Types";
import { OrganizationSettingsStore } from "../../store";
import { useEffect } from "react";

import Branch from "./branch";
import Company from "./company";
import Department from "./department";
import Division from "./division";
import Position from "./position";
import Section from "./section";

type DataExpandRow = {
  [Panel.branch]: DataTableRowExpansionProps<BranchType>;
  [Panel.companyList]: DataTableRowExpansionProps<CompanyType>;
  [Panel.departments]: DataTableRowExpansionProps<DepartmentType>;
  [Panel.division]: DataTableRowExpansionProps<DivisionType>;
  [Panel.positionLevel]: DataTableRowExpansionProps<PositionType>;
  [Panel.section]: DataTableRowExpansionProps<SectionType>;
};

export default function useEdit(): DataExpandRow {
  const { activePanel } = OrganizationSettingsStore();
  const expandedIds = OrganizationSettingsStore((state) => state.expandedIds);
  const setExpanded = OrganizationSettingsStore((state) => state.setExpanded);
  const resetExpandedRows = OrganizationSettingsStore((state) => state.reset);

  useEffect(() => {
    resetExpandedRows();
  }, [activePanel]);

  return {
    [Panel.branch]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: setExpanded },
      content: ({ record }) => <Branch record={record} />,
    },
    [Panel.companyList]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: setExpanded },
      content: ({ record }) => <Company record={record} />,
    },
    [Panel.departments]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: setExpanded },
      content: ({ record }) => <Department record={record} />,
    },
    [Panel.division]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: setExpanded },
      content: ({ record }) => <Division record={record} />,
    },
    [Panel.positionLevel]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: setExpanded },
      content: ({ record }) => <Position record={record} />,
    },
    [Panel.section]: {
      trigger: "never",
      allowMultiple: false,
      expanded: { recordIds: expandedIds, onRecordIdsChange: setExpanded },
      content: ({ record }) => <Section record={record} />,
    },
  };
}
